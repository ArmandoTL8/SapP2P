var oCtrl_Menu;

sap.ui.define(["jquery.sap.global", "sap/ui/core/mvc/Controller", "sap/m/MessageBox"],
		function(jQuery, Controller, MessageBox) {

	var oView;
	
	return Controller.extend("com.axiomasoluciones.wisemobile.Modulo_WiseMobile.Main.controller.Menu", {
		
	_formFragments : {},
	
		onInit : function() {
			oCtrl_Menu = this;
			
			console.log("onInit called - com.axiomasoluciones.wisemobile.Modulo_WiseMobile.Login.controller.Login");

	        sap.ui.core.UIComponent.getRouterFor(this).attachRouteMatched(function(oEvent) {
	        	var sRoute = oEvent.getParameter("name");
	        	
	        	if ("Menu" === sRoute) {
	        		
	        	}
	        });
	        
	        this._formFragments.Avisos = sap.ui.xmlfragment("com.axiomasoluciones.wisemobile.Modulo_WiseMobile.GondiQA.view.fragments.Avisos",this);
			this.onGetFiltersXTable();
			this.onGetCombosLocales();
	        
			if(Lifnr!=null){
				oCtrl_Menu.oServ_Sociedades_ZW18();
			}
	        oCtrl_Menu.oServ_Sociedades_ZW12();
	        oCtrl_Menu.oServ_Estatus_ZW12();
	        oCtrl_Menu.oServ_Monedas_ZW18();
	        
	        //Este es el mensaje SOAP, dentro de las etiquetas <CI>'+ $('#ci').val() +'</CI> hacemos uso de una función JQuery para obtener valor que está en el campo de texto
		},
		
		onAfterRendering: function(oEvt) {
			
			if(Lifnr!=null){
				oC_Modulo_WiseMobile.oServ_ListadoAvisosPopUp();	
			}			
		},
		
/*		oServ_Sociedades_ZW18 : function() {
			
			var soapMessage = '<soap:Envelope xmlns:soap="http://www.w3.org/2003/05/soap-envelope" xmlns:urn="urn:sap-com:document:sap:rfc:functions">';
				soapMessage=soapMessage+'<soap:Header/>';
				soapMessage=soapMessage+'<soap:Body>';
				soapMessage=soapMessage+'<urn:ZW18_COMPANY_CODE_LIST>';
				soapMessage=soapMessage+'<IV_LIFNR>3500000612</IV_LIFNR>';
				soapMessage=soapMessage+'</urn:ZW18_COMPANY_CODE_LIST>';
				soapMessage=soapMessage+'</soap:Body>';
				soapMessage=soapMessage+'</soap:Envelope>';
		     
	        //Llamamos a la función AJAX de JQuery
	        $.ajax({
	            url: webServiceURL_ZW18,
	            type: "POST",
	            cache: false,
	            data: soapMessage,
	            contentType: "application/soap+xml; charset=utf-8",
	            headers:{
	            	"Authorization": "Basic " + btoa( oUsuario+":"+oPassword),
	            	"accept-language": oLenguaje
	            },
	            success: OnSuccess,
	            error: OnError
	        });
	        
	        var oParameters = '<soap:Envelope xmlns:soap="http://www.w3.org/2003/05/soap-envelope" xmlns:urn="urn:sap-com:document:sap:rfc:functions">'
			+'<soap:Header/>'
			+'<soap:Body>'
			+'<urn:ZW18_COMPANY_CODE_LIST>'
			+'<IV_LIFNR>3500000612</IV_LIFNR>'
			+'</urn:ZW18_COMPANY_CODE_LIST>'
			+'</soap:Body>'
			+'</soap:Envelope>';
	        
	        oModelService.loadDataNew(webServiceURL_ZW18, handleSuccess, handleError, oParameters, true, 'POST');
			
			function handleSuccess(oData) {
				alert("OK");
			}
			
			function handleError(e) {
				// Display message
				alert("Error");
			}
		},
*/
		xmlToJson : function(xml) {
        	 
        	  // Create the return object
        	  var obj = {};
        	 
        	  if ( xml.nodeType == 1 ) { // element
        	    // do attributes
        	    if ( xml.attributes.length > 0 ) {
        	    obj["@attributes"] = {};
        	      for ( var j = 0; j < xml.attributes.length; j++ ) {
        	        var attribute = xml.attributes.item( j );
        	        obj["@attributes"][attribute.nodeName] = attribute.nodeValue;
        	      }
        	    }
        	  } else if ( xml.nodeType == 3 ) { // text
        	    obj = xml.nodeValue;
        	  }
        	 
        	  // do children
        	  if ( xml.hasChildNodes() ) {
        	    for( var i = 0; i < xml.childNodes.length; i++ ) {
        	      var item = xml.childNodes.item(i);
        	      var nodeName = item.nodeName;
        	      if ( typeof(obj[nodeName] ) == "undefined" ) {
        	        obj[nodeName] = oCtrl_Menu.xmlToJson( item );
        	      } else {
        	        if ( typeof( obj[nodeName].push ) == "undefined" ) {
        	          var old = obj[nodeName];
        	          obj[nodeName] = [];
        	          obj[nodeName].push( old );
        	        }
        	        obj[nodeName].push( oCtrl_Menu.xmlToJson( item ) );
        	      }
        	    }
        	  }
        	  return obj;
        	},
        

		createContent : function() {
			console.log('createContent called -  com.axiomasoluciones.wisemobile.Modulo_WiseMobile.Login.controller.Login');
		},

   		back : function(evt) {
			window.history.go(-1);
		},

		onPress: function(oEvt) {
			var that = this;
			oBusyDialog.open();

			var oKey = oEvt.getSource().getCustomData()[0].getKey();
			
			setTimeout(function() {
				
				var oRouter = sap.ui.core.UIComponent.getRouterFor(that);
				
				switch(oKey){
					
					case "app":
						oRouter.navTo("Aplicaciones", {}, false);
						break;
					case "colores":
						oRouter.navTo("Color", {}, false);
						break;
					case "usuarios":
						oRouter.navTo("Usuarios", {}, false);
						break;
					case "grupos":
						oRouter.navTo("Grupos", {}, false);
						break;
					case "roles":
						oRouter.navTo("Roles", {}, false);
						break;
						
					case "mod1":
						oRouter.navTo("Main_PCG", {}, false);
						break
					
					case "mod2":
						oRouter.navTo("Main_PG", {}, false);
						
						if(Lifnr!=null){
							var oDialog = new sap.m.Dialog({
								title:"{i18n>Popup.Avisos.Title}",
								contentWidth:"100%",
								content:[
									oCtrl_Menu._formFragments.Avisos
								],
								buttons:[
									new sap.m.Button({
										text: "{i18n>Popup.Avisos.Button.Cancelar}",
										press: function(oEvt){
											oDialog.close();
										}
									})
								],
								beforeOpen: function(oEvt){												
								},
								beforeClose: function(oEvt){
									oDialog.removeAllContent();
								},
								afterClose: function(oEvt){
									oDialog.destroy();
								}
							});
							oDialog.open();
							
						}
						break;
					
					default: 
						var oText = oCnt_FHelps.f_readTranslate("No-View");
						oCnt_FHelps.f_showMessage("WARNING", oText );
						oBusyDialog.close();
				}

			}, 500);
		},
		
		onGetFiltersXTable: function(){
			
			var data = oFilters.returnData();
			moFiltros.setData(data);
			moFiltros.refresh();
		},
		
		onGetCombosLocales: function(){
			// RECUERDA QUE EL MODELO DEBE ESTAR INICIALIZADO COMO: {}
			var data = oCombos.returnData();
			var oModelCombos = sap.ui.getCore().getModel("mCombos");
			Object.assign( oModelCombos.getData(), data );
			oModelCombos.refresh();
		},
		
		oServ_Sociedades_ZW12 : function() {
			var soapMessage = '<soap:Envelope xmlns:soap="http://www.w3.org/2003/05/soap-envelope" xmlns:urn="urn:sap-com:document:sap:soap:functions:mc-style"><soap:Header/><soap:Body><urn:Zw12FmWsGetCompanyList/></soap:Body></soap:Envelope>';
		     
	        //Llamamos a la función AJAX de JQuery
	        $.ajax({
	            url: webServiceURL,
	            type: "POST",
	            cache: false,
	            data: soapMessage,
	            contentType: "application/soap+xml; charset=utf-8",
	            headers:{
	            	"Authorization": "Basic " + btoa( oUsuario+":"+oPassword),
	            	"accept-language": oLenguaje
	            },
	            success: OnSuccess,
	            error: OnError
	        });
	        
	        function OnSuccess(data, status)
	        {
	        	var json=xml2json(data);
	        	
	            sap.ui.getCore().getModel("mCombos").setProperty("/SOCIEDADES_ZW12", json);//revisar datos
	            
	            var length=sap.ui.getCore().getModel("mCombos").getProperty("/SOCIEDADES_ZW12/env:Envelope/env:Body/n0:Zw12FmWsGetCompanyListResponse/ImOutCompanyList/item").length;
            	var mData=sap.ui.getCore().getModel("mCombos").getProperty("/SOCIEDADES_ZW12/env:Envelope/env:Body/n0:Zw12FmWsGetCompanyListResponse/ImOutCompanyList/item");
            	
	            if(length==undefined){
	            	sap.ui.getCore().getModel("mCombos").setProperty("/SOCIEDADES_ZW12", [mData]);//revisar datos
		            
	            }else{
	            	sap.ui.getCore().getModel("mCombos").setProperty("/SOCIEDADES_ZW12",mData);//revisar datos
		            
	            }
	        }
	        function OnError(request, status, error)  //Función que se ejecuta si ocurre algún error
	        {
	            oCnt_FHelps.f_showMessage("ERROR", error);
	        }
		},
		
		oServ_Estatus_ZW12 : function() {
			var soapMessage = '<soap:Envelope xmlns:soap="http://www.w3.org/2003/05/soap-envelope" xmlns:urn="urn:sap-com:document:sap:soap:functions:mc-style"><soap:Header/><soap:Body><urn:Zw12FmWsGetStatusList/></soap:Body></soap:Envelope>';
		     
	        //Llamamos a la función AJAX de JQuery
	        $.ajax({
	            url: webServiceURL,
	            type: "POST",
	            cache: false,
	            data: soapMessage,
	            contentType: "application/soap+xml; charset=utf-8",
	            headers:{
	            	"Authorization": "Basic " + btoa( oUsuario+":"+oPassword),
	            	"accept-language": oLenguaje
	            },
	            success: OnSuccess,
	            error: OnError
	        });
	        
	        function OnSuccess(data, status)
	        {
	        	var json=xml2json(data);	        	
	        	
	            sap.ui.getCore().getModel("mCombos").setProperty("/ESTATUS_ZW12", json);//revisar datos
	            
	            var length=sap.ui.getCore().getModel("mCombos").getProperty("/ESTATUS_ZW12/env:Envelope/env:Body/n0:Zw12FmWsGetStatusListResponse/ImOutStatusList/item").length;
            	var mData=sap.ui.getCore().getModel("mCombos").getProperty("/ESTATUS_ZW12/env:Envelope/env:Body/n0:Zw12FmWsGetStatusListResponse/ImOutStatusList/item");
            	
	            if(length==undefined){
	            	sap.ui.getCore().getModel("mCombos").setProperty("/ESTATUS_ZW12", [mData]);//revisar datos
		            
	            }else{
	            	sap.ui.getCore().getModel("mCombos").setProperty("/ESTATUS_ZW12",mData);//revisar datos
		            
	            }
	        }
	        function OnError(request, status, error)  //Función que se ejecuta si ocurre algún error
	        {
	            oCnt_FHelps.f_showMessage("ERROR", error);
	        }
		},
		
		
		oServ_Monedas_ZW18 : function() {
			var soapMessage = '<soap:Envelope xmlns:soap="http://www.w3.org/2003/05/soap-envelope" xmlns:urn="urn:sap-com:document:sap:rfc:functions">';
				soapMessage=soapMessage+'<soap:Header/>';
				soapMessage=soapMessage+'<soap:Body>';
				soapMessage=soapMessage+'<urn:ZW18_GET_CURR_LIST>';
				soapMessage=soapMessage+'<IV_BUKRS>1173</IV_BUKRS>';
				if(oLenguaje=="ES"){
					soapMessage=soapMessage+'<IV_LANGUAGE>S</IV_LANGUAGE>';
				}
				if(oLenguaje=="EN"){
					soapMessage=soapMessage+'<IV_LANGUAGE>E</IV_LANGUAGE>';
				}
				
				soapMessage=soapMessage+'</urn:ZW18_GET_CURR_LIST>';
				soapMessage=soapMessage+'</soap:Body>';
				soapMessage=soapMessage+'</soap:Envelope>';
		     
	        //Llamamos a la función AJAX de JQuery
	        $.ajax({
	            url: webServiceURL_ZW18,
	            type: "POST",
	            cache: false,
	            data: soapMessage,
	            contentType: "application/soap+xml; charset=utf-8",
	            headers:{
	            	"Authorization": "Basic " + btoa( oUsuario+":"+oPassword),
	            	"accept-language": oLenguaje
	            },
	            success: OnSuccess,
	            error: OnError
	        });
	        
	        function OnSuccess(data, status)
	        {
	        	var json=xml2json(data);
	            	        	
	        	sap.ui.getCore().getModel("mCombos").setProperty("/MONEDAS_ZW18", json);//revisar datos
	            sap.ui.getCore().getModel("mCombos").refresh();
	            
	            
	            var length=sap.ui.getCore().getModel("mCombos").getProperty("/MONEDAS_ZW18/env:Envelope/env:Body/n0:ZW18_GET_CURR_LISTResponse/ET_CURRENCY/item").length;
	            
	            if(length==undefined){
	            	
	            	var mData=sap.ui.getCore().getModel("mCombos").getProperty("/MONEDAS_ZW18/env:Envelope/env:Body/n0:ZW18_GET_CURR_LISTResponse/ET_CURRENCY/item");
	            	
	            	sap.ui.getCore().getModel("mCombos").setProperty("/MONEDAS_ZW18", [mData]);//revisar datos
		            sap.ui.getCore().getModel("mCombos").refresh();
	            }else{
	            	var mData=sap.ui.getCore().getModel("mCombos").getProperty("/MONEDAS_ZW18/env:Envelope/env:Body/n0:ZW18_GET_CURR_LISTResponse/ET_CURRENCY/item");
	            	
	            	sap.ui.getCore().getModel("mCombos").setProperty("/MONEDAS_ZW18",mData);//revisar datos
		            sap.ui.getCore().getModel("mCombos").refresh();
	            }
	        }
	        function OnError(request, status, error)  //Función que se ejecuta si ocurre algún error
	        {
	            oCnt_FHelps.f_showMessage("ERROR", error);
	        }
		},
		
		oServ_Sociedades_ZW18 : function() {
			var soapMessage = '<soap:Envelope xmlns:soap="http://www.w3.org/2003/05/soap-envelope" xmlns:urn="urn:sap-com:document:sap:rfc:functions">';
				soapMessage=soapMessage+'<soap:Header/>';
				soapMessage=soapMessage+'<soap:Body>';
				soapMessage=soapMessage+'<urn:ZW18_COMPANY_CODE_LIST>';
				soapMessage=soapMessage+'<IV_LIFNR>'+Lifnr+'</IV_LIFNR>';
				soapMessage=soapMessage+'</urn:ZW18_COMPANY_CODE_LIST>';
				soapMessage=soapMessage+'</soap:Body>';
				soapMessage=soapMessage+'</soap:Envelope>';
		     
	        //Llamamos a la función AJAX de JQuery
	        $.ajax({
	            url: webServiceURL_ZW18,
	            type: "POST",
	            cache: false,
	            data: soapMessage,
	            contentType: "application/soap+xml; charset=utf-8",
	            headers:{
	            	"Authorization": "Basic " + btoa( oUsuario+":"+oPassword),
	            	"accept-language": oLenguaje
	            },
	            success: OnSuccess,
	            error: OnError
	        });
	        
	        function OnSuccess(data, status)
	        {
	        	var json=xml2json(data);
	        	
	        	sap.ui.getCore().getModel("mCombos").setProperty("/SOCIEDADES_ZW18", json);//revisar datos
	            
	            var length=sap.ui.getCore().getModel("mCombos").getProperty("/SOCIEDADES_ZW18/env:Envelope/env:Body/n0:ZW18_COMPANY_CODE_LISTResponse/ET_BUKRSLIST/item").length;
            	var mData=sap.ui.getCore().getModel("mCombos").getProperty("/SOCIEDADES_ZW18/env:Envelope/env:Body/n0:ZW18_COMPANY_CODE_LISTResponse/ET_BUKRSLIST/item");
            	
	            if(length==undefined){
	            	sap.ui.getCore().getModel("mCombos").setProperty("/SOCIEDADES_ZW18", [mData]);//revisar datos
		            
	            }else{
	            	sap.ui.getCore().getModel("mCombos").setProperty("/SOCIEDADES_ZW18",mData);//revisar datos
		            
				}
	        }
	        function OnError(request, status, error)  //Función que se ejecuta si ocurre algún error
	        {
	            oCnt_FHelps.f_showMessage("ERROR", error);
	        }
		},
		
		
		
		
	});

});