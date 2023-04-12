var oCtrl_EstatusCotizaciones;
var EstatusCotizaciones_flag = false;

sap.ui.define(["jquery.sap.global", "sap/ui/core/mvc/Controller", "sap/m/MessageBox", "sap/ui/model/Filter", "sap/ui/model/FilterOperator", "sap/m/TablePersoController",'sap/m/MessageToast'], 
		function(jQuery, Controller, MessageBox, Filter, FilterOperator, TablePersoController,MessageToast) {

	var oView;

	return Controller.extend("com.axiomasoluciones.wisemobile.Modulo_WiseMobile.GondiQA.controller.EstatusCotizaciones", {

		onInit : function() {
			oCtrl_EstatusCotizaciones = this;
   			oView = this.getView();
			
			console.log("onInit called - com.axiomasoluciones.wisemobile.Modulo_WiseMobile.GondiQA.controller.EstatusCotizaciones");
			
			this.f_createAllFiltersPanel();
	        
			sap.ui.core.UIComponent.getRouterFor(this).attachRouteMatched(function(oEvent) {
	        	var sRoute = oEvent.getParameter("name");
	        	
	        	if ("OrdnCompraXFacturar" === sRoute) {
	        		
	        	}
	        });	
	        
			// attach handlers for validation errors
			sap.ui.getCore().attachValidationError(function(oEvt) {
				var control = oEvt.getParameter("element");
				if (control && control.setValueState) {
					control.setValueState("Error");
				}
			});
			sap.ui.getCore().attachValidationSuccess(function(oEvt) {
				var control = oEvt.getParameter("element");
				if (control && control.setValueState) {
					control.setValueState("None");
				}
			});

		},

		createContent : function() {
			console.log('createContent called -  com.axiomasoluciones.wisemobile.Modulo_WiseMobile.GondiQA.controller.OrdnCompraXFacturar');
		},
		
		f_createAllFiltersPanel: function(oEvt){
			oC_Modulo_WiseMobile.f_createFilterPanel("ESTATUS_COTIZACIONES", oCtrl_EstatusCotizaciones, "idPage", 4);
		},
		
		onAfterRendering: function(oEvt) {
			
			oCnt_FHelps.f_LimpiarMonitorBusq(this);
			sap.ui.getCore().getModel("mTablesEstCotizaciones").setData({DOC_ESTCOTIZACIONES:[]});//revisar datos
			oCtrl_EstatusCotizaciones.byId("idCountTableEstatusCotizaciones").setText("(0)");
			if(EstatusCotizaciones_flag == true)
				return;
			
			EstatusCotizaciones_flag = true;
				
			var oTableID = oView.byId("idTableEstatusCotizaciones");
   			// Hidden/view Columns
   			DemoPersoService.setMyPersData( oTableID );
   			
   			// init and activate controller
			this._oTPC = new TablePersoController({
				table: oTableID,
				//specify the first part of persistence ids e.g. 'demoApp-productsTable-dimensionsCol'
				componentName: "demoApp",
				persoService: DemoPersoService,
			}).activate();
		},
		
   		onPersoPress: function(oEvt) {
  			this._oTPC.openDialog();
		},
		
		onDownload: function(oEvt) {
			MessageToast.show(" Descargando..");
			
			var sPath=oEvt.getSource().mAggregations.customData[0].oPropagatedProperties.oBindingContexts.mTablesEstCotizaciones.sPath;
			var oObject=sap.ui.getCore().getModel("mTablesEstCotizaciones").getProperty(sPath);
			
			function oFunction(oData){
				
				sap.ui.getCore().getModel("mMessages").setData(oData);//revisar datos
	            sap.ui.getCore().getModel("mMessages").refresh();
	            
	            var pdf=sap.ui.getCore().getModel("mMessages").getProperty("/env:Envelope/env:Body/n0:ZW18_GET_PO_FORMResponse/ES_PDF");
	            //oCnt_FHelps.f_showMessage("INFORMATION", oObject.MESSAGE );
	            var blob = oCnt_FHelps.converBase64toBlob(pdf, 'application/pdf');
	            //window.open("data:application/pdf;base64," + Base64.encode(pdf));
	            var blobURL = URL.createObjectURL(blob);
	            window.open(blobURL);
			}
			
			
			oCtrl_EstatusCotizaciones.oServ_DescargaPdf(oObject,oFunction);
		},
		
		
		
		oServ_DescargaPdf : function(oObject,callback) {
			
			var soapMessage = '<soap:Envelope xmlns:soap="http://www.w3.org/2003/05/soap-envelope" xmlns:urn="urn:sap-com:document:sap:rfc:functions">';
				soapMessage=soapMessage+'<soap:Header/>';
				soapMessage=soapMessage+'<soap:Body>';
				soapMessage=soapMessage+'<urn:ZW18_GET_PO_FORM>';
				soapMessage=soapMessage+'<IV_EBELN>'+oObject.EBELN+'</IV_EBELN>';
				soapMessage=soapMessage+'<IV_EBELP>'+oObject.EBELP+'</IV_EBELP>';
				soapMessage=soapMessage+'</urn:ZW18_GET_PO_FORM>';
				soapMessage=soapMessage+'</soap:Body>';
				soapMessage=soapMessage+'</soap:Envelope>';
		     
	        //Llamamos a la función AJAX de JQuery
	        $.ajax({
	            url: webServiceURL_ZWS,
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
	        	callback(json);
	            
	        }
	        function OnError(request, status, error)  //Función que se ejecuta si ocurre algún error
	        {
	            oCnt_FHelps.f_showMessage("ERROR", error);
	        }
		}
		
		
		
	});

});