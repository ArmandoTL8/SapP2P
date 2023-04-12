var oCtrl_Login;

sap.ui.define(["jquery.sap.global", "sap/ui/core/mvc/Controller", "sap/m/MessageBox"],
		function(jQuery, Controller, MessageBox) {

	var oView;
	var oBusyDialog_a;

	return Controller.extend("com.axiomasoluciones.wisemobile.Modulo_WiseMobile.Login.controller.Login", {
		
		_formFragments : {},
		
		onInit : function() {
			oCtrl_Login = this;
			oView = this.getView();
			
			//oView.byId("idComboLangu").setSelectedKey(sLangu);
			console.log("onInit called - com.axiomasoluciones.wisemobile.Modulo_WiseMobile.Login.controller.Login");

	        sap.ui.core.UIComponent.getRouterFor(this).attachRouteMatched(function(oEvent) {
	        	var sRoute = oEvent.getParameter("name");
	        	
	        	if ("Login" === sRoute) {
	        		oCore.byId("idBtnBack_2").setVisible(false);
	        		oCore.byId("idBtnCambiarContra").setVisible(false);
	        	}
	        	else{
	        		oCore.byId("idBtnBack_2").setVisible(true);
	        		oCore.byId("idBtnCambiarContra").setVisible(true);
	        	}
	        	var oView_temp = oEvent.getParameter("view");
	        	oView_temp.bindElement({ path: "/Table", model: "mManageControls" });
	        });	
	        
	        if(oBusyDialog_a == undefined)
				oBusyDialog_a = new sap.m.BusyDialog({
					title	: oCnt_FHelps.f_readTranslate("Wait.title")
				});
	        
	        this._formFragments.Sociedades = sap.ui.xmlfragment("com.axiomasoluciones.wisemobile.Modulo_WiseMobile.GondiQA.view.fragments.Sociedades",this);
				        
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
			
			oView.addEventDelegate({
   				// not added the controller as delegate to avoid controller functions with similar names as the events
				onAfterShow : jQuery.proxy(function(oEvt) {
					if(!oEvt.firstTime) TntToolPage_Borde(false);
   					/*
   					if(oEvt.firstTime) {
   						setTimeout(function() {
   							$('head').append('<style>.sapMSelectListItemBaseSelected{background: #f8d7d7; !important;}</style>');
   							$('head').append('<style>.sapMBtnInner{color: #bc2423;}</style>');
   						}, 2000);
   					}
   					*/
   				}, this),
   				
   			});

		},

		createContent : function() {
			console.log('createContent called -  com.axiomasoluciones.wisemobile.Modulo_WiseMobile.Login.controller.Login');
		},
		/*
		onPasswordChange : function(oEvt) {
			console.log('onPasswordChange called -  com.axiomasoluciones.wisemobile.Modulo_WiseMobile.Login.controller.Login');
			var oView = this.getView();
		},
		*/
		onPress : function(oEvt) {
			var that = this;
			/** ASVRAMIREZ
			 * INICIO DE SESION CON IMPLEMENTACION CON COLORES Y AMAZON WEB SERVICES
			 */
			/*
			var oUsuario= oView.byId('myUser').getValue();
			var oClave 	= oView.byId('myPassword').getValue();
			
			if(oCnt_FHelps.f_Inputs([oView.byId('myUser'), oView.byId('myPassword') ]) == true){
				//if(oUsuario=="VRAMIREZ" && oClave=="demoWise"){
					
					oCore.User.User = oUsuario;
					oCore.User.Password = oClave;
					
					var router = sap.ui.core.UIComponent.getRouterFor(this);
					
					var ofunction = function(){
						oCore.User.Sesion = true;
						router.navTo("Menu",{},false);
						// AQUI VIENEN LOS COLORES
						// INICIO
						var oData = oCore.getModel("mCombinaciones").getProperty("/COMBINACIONES/combinaciones");
						var oComb;
						
						for(var i=0; i<oData.length; i++){
							if(oData[i].activo == "X"){
								oComb = jQuery.extend({}, oData[i] );
								break;
							}
						}
						
						if(oComb == undefined) return;

						for(var j=1; j<=15; j++){
							//if(oComb["c"+i] != undefined)
							var oOpc 		= j;
							var oData 		= jQuery.extend(true, [], oCore.getModel("mColores").getProperty("/"+oOpc) );
							//var CoAntiguo = oCore.getModel("mColores").getProperty("/Colores/"+oOpc);
							var CoNuevo		= oComb["c"+j];
							
							for(var i=0; i< oData.length; i++){
								
								if(j==15){/*
									CoAntiguo = CoAntiguo.split(",");
									var c1_CoAntiguo = CoAntiguo[0];
									var c2_CoAntiguo = CoAntiguo[1];
									var c3_CoAntiguo = CoAntiguo[2];-/
									var re;
									
									CoNuevo = CoNuevo.split(",");
									var c1_CoNuevo = CoNuevo[0];
									var c2_CoNuevo = CoNuevo[1];
									var c3_CoNuevo = CoNuevo[2];
									
									var css = oData[i].cssString;
									
									re = new RegExp("XXX", 'g');
									css = css.replace(re,c1_CoNuevo);
									
									re = new RegExp("YYY", 'g');
									css = css.replace(re,c2_CoNuevo);
									
									re = new RegExp("ZZZ", 'g');
									css = css.replace(re,c3_CoNuevo);

									oCnt_FHelps.f_StyleString( css , oOpc , (c1_CoNuevo+","+c2_CoNuevo+","+c3_CoNuevo) );
								}
								else{
									var re = new RegExp("XXX", 'g');
									var css = oData[i].cssString.replace(re, CoNuevo);
									oCnt_FHelps.f_StyleString( css , oOpc, CoNuevo);
								}
								
							}
						}
						// FIN
					}
					
					var ofunctionS = function(){
						oCnt_FHelps.oServ_CombinacXUser(undefined, undefined, ofunction);
					};
					
					oCnt_FHelps.oServ_getToken(undefined, ofunctionS);
//				
//				}
//				else{
//			    	var oText = oCnt_FHelps.f_readTranslate("Login-error");
//					oCnt_FHelps.f_showMessage("ERROR", oText);
//				}
				
			}			
			*/
			/** ASVRAMIREZ
			 * FIN
			 */
			
			// EL SGTE ACCESO ES LA FORMA TRADICIONAL SIMPLE, LOGIN PASSWORD Y ACCESO A LA APLICACIÓN
			oUsuario_login 	= oView.byId('myUser').getValue();
			oPassword_login 	= oView.byId('myPassword').getValue();
			oLenguaje 	= oView.byId('idComboLangu').getSelectedKey();
			oMandante	= oView.byId('idComboMandante').getSelectedKey();
			
			
			switch (oMandante) {
			case "500":
				webServiceURL=ip_apache_dev + oPath_copa_ini + oMandante + oPath_copa_fin;
				webServiceURL_ZW18=ip_apache_dev + oPath_enfa_ini + oMandante + oPath_enfa_fin;
				webServiceURL_ZW18_2=ip_apache_dev + oPath_enfa_ini_2 + oMandante + oPath_enfa_fin_2;
				webServiceURL_ZWS=ip_apache_dev + oPath_coti_ini + oMandante + oPath_coti_fin;
				webServiceURL_ZW20=ip_apache_dev + oPath_login_ini + oMandante + oPath_login_fin;
				webServiceURL_ZW04=ip_apache_dev + oPath_aprob_ini + oMandante + oPath_aprob_fin;
				break;
			case "600":
				webServiceURL=ip_apache_qas + oPath_copa_ini + oMandante + oPath_copa_fin;
				webServiceURL_ZW18=ip_apache_qas + oPath_enfa_ini + oMandante + oPath_enfa_fin;
				webServiceURL_ZW18_2=ip_apache_qas + oPath_enfa_ini_2 + oMandante + oPath_enfa_fin_2;
				webServiceURL_ZWS=ip_apache_qas + oPath_coti_ini + oMandante + oPath_coti_fin;
				webServiceURL_ZW20=ip_apache_qas + oPath_login_ini + oMandante + oPath_login_fin;
				webServiceURL_ZW04=ip_apache_qas + oPath_aprob_ini + oMandante + oPath_aprob_fin;
				break;
			case "700":
				webServiceURL=ip_apache_prd + oPath_copa_ini + oMandante + oPath_copa_fin;
				webServiceURL_ZW18=ip_apache_prd + oPath_enfa_ini + oMandante + oPath_enfa_fin;
				webServiceURL_ZW18_2=ip_apache_prd + oPath_enfa_ini_2 + oMandante + oPath_enfa_fin_2;
				webServiceURL_ZWS=ip_apache_prd + oPath_coti_ini + oMandante + oPath_coti_fin;
				webServiceURL_ZW20=ip_apache_prd + oPath_login_ini + oMandante + oPath_login_fin;
				webServiceURL_ZW04=ip_apache_prd + oPath_aprob_ini + oMandante + oPath_aprob_fin;
				break;

			default:
				break;
			}
			
			
			if(oCnt_FHelps.f_Inputs([oView.byId('myUser'), oView.byId('myPassword') ]) == true){
								
				function oFunction(oData){
					
					sap.ui.getCore().getModel("mUser").setData(oData);
		            sap.ui.getCore().getModel("mUser").refresh();
		            
		            var oObjeto=sap.ui.getCore().getModel("mUser").getProperty("/env:Envelope/env:Body/n0:Zw20FmWsLoginUserResponse/ImOutLogin");
							            
					var Type=sap.ui.getCore().getModel("mUser").getProperty("/env:Envelope/env:Body/n0:Zw20FmWsLoginUserResponse/ImReturn/item").Type;
		            var Message=sap.ui.getCore().getModel("mUser").getProperty("/env:Envelope/env:Body/n0:Zw20FmWsLoginUserResponse/ImReturn/item").Message;
		            
		            if(Type=="S"){
		            	
		            	
		            	
		            	var oDialog = new sap.m.Dialog({
							title:"{i18n>Popup.Sociedades.Title}",
							contentWidth:"30%",
							content:[
								oCtrl_Login._formFragments.Sociedades
							],
							buttons:[
								new sap.m.Button({
									text: "{i18n>Popup.Sociedades.Button.Cancelar}",
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
						oCtrl_Login.oServ_Sociedades_ZW20();
		            	/**/
		            }else{
		            	oCnt_FHelps.f_showMessage("ERROR", Message, undefined, oCnt_FHelps.f_readTranslate("Error.title") );
		            }
				}
				
				
				 oCtrl_Login.oServ_Login(oFunction);
				
			}
		},
		
		oServ_Login: function(callback) {
			var soapMessage = '<soap:Envelope xmlns:soap="http://www.w3.org/2003/05/soap-envelope" xmlns:urn="urn:sap-com:document:sap:soap:functions:mc-style">';
			soapMessage=soapMessage+'<soap:Header/>';
			soapMessage=soapMessage+'<soap:Body>';
			soapMessage=soapMessage+'<urn:Zw20FmWsLoginUser>';
			soapMessage=soapMessage+'<ExInCredentials>';
			soapMessage=soapMessage+'<User>'+oUsuario_login+'</User>';
			soapMessage=soapMessage+'<Pwd>'+oPassword_login+'</Pwd>';
			if(oLenguaje=="ES"){
				soapMessage=soapMessage+'<Language>S</Language>';
			}
			if(oLenguaje=="EN"){
				soapMessage=soapMessage+'<Language>E</Language>';
			}
			soapMessage=soapMessage+'</ExInCredentials>';
			soapMessage=soapMessage+'</urn:Zw20FmWsLoginUser>';
			soapMessage=soapMessage+'</soap:Body>';
			soapMessage=soapMessage+'</soap:Envelope>';
			
			oBusyDialog.open();
			//Llamamos a la función AJAX de JQuery
	        $.ajax({
	            url: webServiceURL_ZW20,
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
	            oBusyDialog.close();
	            
	        }
	        function OnError(request, status, error)  //Función que se ejecuta si ocurre algún error
	        {
	        	var oText = oCnt_FHelps.f_readTranslate("Login-error");
				oCnt_FHelps.f_showMessage("ERROR", oText);
				oBusyDialog.close();
	        }
		},
		
		oServ_Sociedades_ZW20 : function() {
			var soapMessage = '<soap:Envelope xmlns:soap="http://www.w3.org/2003/05/soap-envelope" xmlns:urn="urn:sap-com:document:sap:soap:functions:mc-style">';
				soapMessage=soapMessage+'<soap:Header/>';
				soapMessage=soapMessage+'<soap:Body>';
				soapMessage=soapMessage+'<urn:Zw20FmWsGetCompanyList/>';
				soapMessage=soapMessage+'</soap:Body>';
				soapMessage=soapMessage+'</soap:Envelope>';
		     
			oBusyDialog.open();
	        //Llamamos a la función AJAX de JQuery
	        $.ajax({
	            url: webServiceURL_ZW20,
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
	        	
	        	sap.ui.getCore().getModel("mCombos").setProperty("/SOCIEDADES_ZW20", json);//revisar datos
	            
	        	var mData=sap.ui.getCore().getModel("mCombos").getProperty("/SOCIEDADES_ZW20/env:Envelope/env:Body/n0:Zw20FmWsGetCompanyListResponse/EtBukrsList/item");
	            var length=mData.length;
            	
            	
	            if(length==undefined){
	            	sap.ui.getCore().getModel("mCombos").setProperty("/SOCIEDADES_ZW20", [mData]);//revisar datos
		            
	            }else{
	            	sap.ui.getCore().getModel("mCombos").setProperty("/SOCIEDADES_ZW20",mData);//revisar datos
		            
				}
	            
	            oBusyDialog.close();
	        }
	        function OnError(request, status, error)  //Función que se ejecuta si ocurre algún error
	        {
	            oCnt_FHelps.f_showMessage("ERROR", error);
	        }
		},
		
		oServ_Configuracion: function(oObject,callback) {
			var soapMessage = '<soap:Envelope xmlns:soap="http://www.w3.org/2003/05/soap-envelope" xmlns:urn="urn:sap-com:document:sap:soap:functions:mc-style">';
			soapMessage=soapMessage+'<soap:Header/>';
			soapMessage=soapMessage+'<soap:Body>';
			soapMessage=soapMessage+'<urn:Zw20FmWsGetConfig>';
			soapMessage=soapMessage+'<ExInGetConfig>';
			soapMessage=soapMessage+'<Bukrs>'+oObject.Bukrs+'</Bukrs>';
			soapMessage=soapMessage+'<Userweb>'+oUsuario_login+'</Userweb>';
			if(oLenguaje=="ES"){
				soapMessage=soapMessage+'<Language>S</Language>';
			}
			if(oLenguaje=="EN"){
				soapMessage=soapMessage+'<Language>E</Language>';
			}
			soapMessage=soapMessage+'</ExInGetConfig>';
			soapMessage=soapMessage+'</urn:Zw20FmWsGetConfig>';
			soapMessage=soapMessage+'</soap:Body>';
			soapMessage=soapMessage+'</soap:Envelope>';
	    
			//Llamamos a la función AJAX de JQuery
	        $.ajax({
	            url: webServiceURL_ZW20,
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
	        	var oText = oCnt_FHelps.f_readTranslate("Login-error");
				oCnt_FHelps.f_showMessage("ERROR", oText);
	        }
		},
		
		oServ_SuplerData: function(oObject) {
			var soapMessage = '<soap:Envelope xmlns:soap="http://www.w3.org/2003/05/soap-envelope" xmlns:urn="urn:sap-com:document:sap:rfc:functions">';
				soapMessage=soapMessage+'<soap:Header/>';
				soapMessage=soapMessage+'<soap:Body>';
				soapMessage=soapMessage+'<urn:ZW18_SUPPLIER_DATA>';
				soapMessage=soapMessage+'<IV_BUKRS>'+oObject.Bukrs+'</IV_BUKRS>';
				soapMessage=soapMessage+'<IV_LIFNR>'+Lifnr+'</IV_LIFNR>';
				soapMessage=soapMessage+'</urn:ZW18_SUPPLIER_DATA>';
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
	        	var mModel=sap.ui.getCore().getModel("mSupler");
	            
	            mModel.setData(json);//revisar datos
	            mModel.refresh();	            
	            
	            var mData=mModel.getProperty("/env:Envelope/env:Body/n0:ZW18_SUPPLIER_DATAResponse/ES_SUPP_DATA_OUT");
	            Name=mData.NAME1;   	
	            
	        }
	        function OnError(request, status, error)  //Función que se ejecuta si ocurre algún error
	        {
	        	var oText = oCnt_FHelps.f_readTranslate("Login-error");
				oCnt_FHelps.f_showMessage("ERROR", oText);
	        }
		},
		
		onChangeSociedad: function(oEvt) {
			
			var sPath =oEvt.oSource._aSelectedPaths[0];
			var oObject=sap.ui.getCore().getModel("mCombos").getProperty(sPath);
			
			function oFunction(oData){
				
				var mModel=sap.ui.getCore().getModel("mConfiguracion");
	            
	            mModel.setData(oData);//revisar datos
	            mModel.refresh();
	            
	            
	            var mData=mModel.getProperty("/env:Envelope/env:Body/n0:Zw20FmWsGetConfigResponse/ExOutMenuwebE");
	            Bname=mData.Bname;
	            var mDataV=mModel.getProperty("/env:Envelope/env:Body/n0:Zw20FmWsGetConfigResponse/ExOutMenuwebV");
	            
	            Lifnr=mDataV.Lifnr;
	            oCtrl_Login.oServ_SuplerData(oObject);
	            
	            mData.AppPurreq=(mData.AppPurreq=="X")?(true):(false);
	            mData.AppPurord=(mData.AppPurord=="X")?(true):(false);
	            mData.AppInvwpo=(mData.AppInvwpo=="X")?(true):(false);
	            mData.AppTrareq=(mData.AppTrareq=="X")?(true):(false);
	            mData.AppTraexp=(mData.AppTraexp=="X")?(true):(false);
	            mData.AppInvdif=(mData.AppInvdif=="X")?(true):(false);
	            
	            mDataV.InvOcCfdi=(mDataV.InvOcCfdi=="X")?(true):(false);
	            mDataV.InvOcNormal=(mDataV.InvOcNormal=="X")?(true):(false);
	            mDataV.InvWoOcCfdi=(mDataV.InvWoOcCfdi=="X")?(true):(false);
	            mDataV.InvWoOcNormal=(mDataV.InvWoOcNormal=="X")?(true):(false);
	            mDataV.InvListStatus=(mDataV.InvListStatus=="X")?(true):(false);
	            mDataV.InvListPo=(mDataV.InvListPo=="X")?(true):(false);
	            mDataV.InvAccStatus=(mDataV.InvAccStatus=="X")?(true):(false);
	            mDataV.InvRecStatus=(mDataV.InvRecStatus=="X")?(true):(false);
	            mDataV.InvRfqCreate=(mDataV.InvRfqCreate=="X")?(true):(false);
	            mDataV.InvRfqListStatus=(mDataV.InvRfqListStatus=="X")?(true):(false);	            
	            mDataV.PayListStatus=(mDataV.PayListStatus=="X")?(true):(false);
	            mDataV.InvMessage=(mDataV.InvMessage=="X")?(true):(false);
	            mDataV.InvMailboxWCfdi=(mDataV.InvMailboxWCfdi=="X")?(true):(false);
	            mDataV.InvMailboxWoCfdi=(mDataV.InvMailboxWoCfdi=="X")?(true):(false);
	            mDataV.InvGetMailbox=(mDataV.InvGetMailbox=="X")?(true):(false);
	            mDataV.InvChangePassword=(mDataV.InvChangePassword=="X")?(true):(false);
	            mDataV.InvBusinessAreaList=(mDataV.InvBusinessAreaList=="X")?(true):(false);	            
	            mDataV.InvAddOtherPdf=(mDataV.InvAddOtherPdf=="X")?(true):(false);
	            mDataV.InvWoOcCfdiIc=(mDataV.InvWoOcCfdiIc=="X")?(true):(false);
	            mDataV.InvWoOcNormalIc=(mDataV.InvWoOcNormalIc=="X")?(true):(false);
	            mDataV.InvQuotation=(mDataV.InvQuotation=="X")?(true):(false);
	            mDataV.InvStatusQuotation=(mDataV.InvStatusQuotation=="X")?(true):(false);
	            mDataV.InvCreditMemo=(mDataV.InvCreditMemo=="X")?(true):(false);
	            mDataV.InvWoCreditMemo=(mDataV.InvWoCreditMemo=="X")?(true):(false);
	            
	            /*if(mDataV.InvOcCfdi==true){exite_permisoVen=true;}
	            if(mDataV.InvOcNormal==true){exite_permisoVen=true;}
	            if(mDataV.InvWoOcCfdi==true){exite_permisoVen=true;}
	            if(mDataV.InvWoOcNormal==true){exite_permisoVen=true;}
	            if(mDataV.InvListStatus==true){exite_permisoVen=true;}	            
	            if(mDataV.InvListPo==true){exite_permisoVen=true;}
	            if(mDataV.InvAccStatus==true){exite_permisoVen=true;}	            
	            if(mDataV.InvRecStatus==true){exite_permisoVen=true;}	            
	            if(mDataV.InvRfqCreate==true){exite_permisoVen=true;}
	            if(mDataV.InvRfqListStatus==true){exite_permisoVen=true;}
	            if(mDataV.PayListStatus==true){exite_permisoVen=true;}
	            if(mDataV.InvMessage==true){exite_permisoVen=true;}	            
	            if(mDataV.InvMailboxWCfdi==true){exite_permisoVen=true;}
	            if(mDataV.InvMailboxWoCfdi==true){exite_permisoVen=true;}
	            if(mDataV.InvGetMailbox==true){exite_permisoVen=true;}
	            if(mDataV.InvChangePassword==true){exite_permisoVen=true;}
	            if(mDataV.InvBusinessAreaList==true){exite_permisoVen=true;}
	            if(mDataV.InvAddOtherPdf==true){exite_permisoVen=true;}
	            if(mDataV.InvWoOcCfdiIc==true){exite_permisoVen=true;}
	            if(mDataV.InvWoOcNormalIc==true){exite_permisoVen=true;}
	            if(mDataV.InvQuotation==true){exite_permisoVen=true;}
	            if(mDataV.InvStatusQuotation==true){exite_permisoVen=true;}
	            if(mDataV.InvCreditMemo==true){exite_permisoVen=true;}
	            if(mDataV.InvWoCreditMemo==true){exite_permisoVen=true;}*/
	            
	            sesion=true;
            	var router = sap.ui.core.UIComponent.getRouterFor(oCtrl_Login);
    			router.navTo("Menu",{},false);
    			
    			var oText = oCnt_FHelps.f_readTranslate("Login-successful");
    			sap.m.MessageToast.show(oText);
    			   	
	            mModel.setData([{PERMISOS:[mData]},{PERMISOSV:[mDataV]}]);		            	
	            
	            
	            /*if(exite_permisoVen==true && LifnrVen==null){
					oCnt_FHelps.f_showMessage("INFORMATION", oCnt_FHelps.f_readTranslate("Popup.Message.1"), undefined, oCnt_FHelps.f_readTranslate("Exito.title") );					
				}*/
	            
	            /*if(Username==null){
	            	oCnt_FHelps.f_showMessage("INFORMATION", oCnt_FHelps.f_readTranslate("Popup.Message.2"), undefined, oCnt_FHelps.f_readTranslate("Exito.title") );
	            }*/
            
			}
			
			
			oCtrl_Login.oServ_Configuracion(oObject,oFunction);
			
		},
		onChangeIdioma: function(oEvt) {
			var that = this;
			
			var oId 	= oView.byId('idComboLangu').getSelectedKey();
			
			
			oCnt_FHelps.languageChange(
					oId,
					function(){
//							var router = sap.ui.core.UIComponent.getRouterFor(oCtrl_Quiniela);
//							router.navTo("Quiniela");
					}
				);
			
			
		},
		
		onPressCambiar: function(oEvt) {
			var router = sap.ui.core.UIComponent.getRouterFor(oCtrl_Login);
			router.navTo("Cambio",{},false);			
		},
		
		onPressOlvidar: function(oEvt) {
			var aInputs = [
				
				new sap.m.Input({
					  editable: true
					}),
				new sap.m.Input({
					  editable: true
					})
			];
			
			var oDialog = new sap.m.Dialog({
				customHeader: new sap.m.Bar({
					contentMiddle: new sap.m.Label({
						text: "{i18n>OlvideContrasena.Title}"
					}),
					contentRight: new sap.m.Button({
						icon: "sap-icon://decline",
						press: function() {
							oDialog.close();
						}
					})
				}),
				
				content:[
					new sap.m.VBox({
						items:[
							new sap.ui.layout.form.SimpleForm({
								editable:true,
								layout:"ResponsiveGridLayout",
								labelSpanXL:3, labelSpanL:3, labelSpanM:3, labelSpanS:12,
								adjustLabelSpan:false,
								emptySpanXL:4, emptySpanL:4, emptySpanM:4, emptySpanS:0,
								columnsXL:1, columnsL:1, columnsM:1,
								singleContainerFullSize:false,
								content:[
									new sap.m.Label({ text : "{i18n>OlvideContrasena.Label.1}" }),
									aInputs[0],
									new sap.m.Label({ text : "{i18n>OlvideContrasena.Label.2}" }),
									aInputs[1],
								]
							})
						]
					})
				],
				beforeClose: function(oEvt){
					oDialog.removeAllContent();
				},
				afterClose:function(){
					oDialog.destroy();
				},
				buttons:[
					new sap.m.Button({
						text: "{i18n>OlvideContrasena.Button.1}",
						press:function(){
							
							if(oCnt_FHelps.f_Inputs([aInputs[0], aInputs[1]]) == true){
								
								var oObject={
										Usuario:aInputs[0].getValue(),
										Correo:aInputs[1].getValue()
								}
								
								function oFunction(oData){
									oBusyDialog_a.close();
									sap.ui.getCore().getModel("mMessages").setData(oData);//revisar datos
						            sap.ui.getCore().getModel("mMessages").refresh();
						            
						            var oObjeto=sap.ui.getCore().getModel("mMessages").getProperty("/env:Envelope/env:Body/n0:Zw20FmWsSendTokenResponse/ExReturn");
						            
						            
						            if(oObjeto.Type=="S"){
						            	var aInputs1 = [
						    				
						    				new sap.m.Input({
						    					  editable: true
						    					}),
						    				new sap.m.Input({
						    					  editable: true
						    					}),
						    				new sap.m.Input({
						    					  editable: true
						    					}),
						    				new sap.m.Input({
						    					  editable: true,
						    					  type: "Password"
						    					}),
						    				new sap.m.Input({
						    					  editable: true,
						    					  type: "Password"
						    					})
						    			];
						    			
						    			var oDialog1 = new sap.m.Dialog({
						    				customHeader: new sap.m.Bar({
						    					contentMiddle: new sap.m.Label({
						    						text: "{i18n>OlvideContrasena.Title.2}"
						    					}),
						    					contentRight: new sap.m.Button({
						    						icon: "sap-icon://decline",
						    						press: function() {
						    							oDialog1.close();
						    						}
						    					})
						    				}),
						    				
						    				content:[
						    					new sap.m.VBox({
						    						items:[
						    							new sap.ui.layout.form.SimpleForm({
						    								editable:true,
						    								layout:"ResponsiveGridLayout",
						    								labelSpanXL:3, labelSpanL:3, labelSpanM:3, labelSpanS:12,
						    								adjustLabelSpan:false,
						    								emptySpanXL:4, emptySpanL:4, emptySpanM:4, emptySpanS:0,
						    								columnsXL:1, columnsL:1, columnsM:1,
						    								singleContainerFullSize:false,
						    								content:[
						    									new sap.m.Label({ text : "{i18n>OlvideContrasena.Label.1}" }),
						    									aInputs1[0],
						    									new sap.m.Label({ text : "{i18n>OlvideContrasena.Label.2}" }),
						    									aInputs1[1],
						    									new sap.m.Label({ text : "{i18n>OlvideContrasena.Label.3}" }),
						    									aInputs1[2],
						    									new sap.m.Label({ text : "{i18n>OlvideContrasena.Label.4}" }),
						    									aInputs1[3],
						    									new sap.m.Label({ text : "{i18n>OlvideContrasena.Label.5}" }),
						    									aInputs1[4],
						    								]
						    							})
						    						]
						    					})
						    				],
						    				beforeClose: function(oEvt){
						    					oDialog1.removeAllContent();
						    				},
						    				afterClose:function(){
						    					oDialog1.destroy();
						    				},
						    				buttons:[
						    					new sap.m.Button({
						    						text: "{i18n>OlvideContrasena.Button.3}",
						    						press:function(){
						    							
						    							if(oCnt_FHelps.f_Inputs([aInputs1[0], aInputs1[1], aInputs1[2], aInputs1[3], aInputs1[4]]) == true){
						    								
						    								if(aInputs1[3].getValue()==aInputs1[4].getValue())
						    									{
							    									var oObject={
								    										Usuario:aInputs1[0].getValue(),
								    										Correo:aInputs1[1].getValue(),
								    										Codigo:aInputs1[2].getValue(),
								    										Password:"",
								    										PasswordNuevo:aInputs1[4].getValue()
								    								}
								    								
								    								function oFunction(oData){
								    									oBusyDialog.close();
								    									sap.ui.getCore().getModel("mMessages").setData(oData);//revisar datos
								    						            sap.ui.getCore().getModel("mMessages").refresh();
								    						            
								    						            var oObjeto=sap.ui.getCore().getModel("mMessages").getProperty("/env:Envelope/env:Body/n0:Zw20FmWsValidateTokenResponse/ExReturn");
								    						            						    						            
								    						            if(oObjeto.Type=="S"){
								    						            	
								    						            	function oFunction1(oData){
										    									
										    									sap.ui.getCore().getModel("mCambio").setData(oData);
										    						            sap.ui.getCore().getModel("mCambio").refresh();
										    						            
										    						            var oObjeto=sap.ui.getCore().getModel("mCambio").getProperty("/env:Envelope/env:Body/n0:Zw20FmWsPassChangeResponse/ExOutReturn/item");
										    									
										    									var Type=oObjeto.Type;
										    						            var Message=oObjeto.Message;
										    						            
										    						            oCnt_FHelps.f_showMessage("INFORMATION", Message, undefined, oCnt_FHelps.f_readTranslate("Exito.title") );
										    						            oDialog.close();
										    						            oDialog1.close();
										    						            
										    								}
								    						            	oCnt_FHelps.f_showMessage("INFORMATION", oObjeto.Message, undefined, oCnt_FHelps.f_readTranslate("Exito.title") );
								    						            	oC_Modulo_WiseMobile.oServ_CambioPass(oObject,oFunction1);
								    						            }else{
								    						            	oCnt_FHelps.f_showMessage("INFORMATION", oObjeto.Message, undefined, oCnt_FHelps.f_readTranslate("Error.title") );
								    						            }
								    								}
								    								
								    								oCtrl_Login.oServ_ValidateToken(oObject,oFunction);
						    									}else{
						    										oCnt_FHelps.f_showMessage("INFORMATION", oCnt_FHelps.f_readTranslate("OlvideContrasena.Message.2"), undefined, oCnt_FHelps.f_readTranslate("Error.title") );
						    									}
						    								
						    								
						    							}
						    							
						    							
						    						}
						    					}),
						    					new sap.m.Button({
						    						text: "{i18n>OlvideContrasena.Button.2}",
						    						press:function(){
						    							oDialog1.close();
						    							
						    						}
						    					})
						    				]
						    			});
						    			
						    			oDialog1.open();
						    			oCnt_FHelps.f_showMessage("INFORMATION", oObjeto.Message, undefined, oCnt_FHelps.f_readTranslate("Exito.title") );
						            }
								}
								oCtrl_Login.oServ_EnvioToken(oObject,oFunction);
							}
							
							
						}
					}),
					new sap.m.Button({
						text: "{i18n>OlvideContrasena.Button.2}",
						press:function(){
							oDialog.close();
							
						}
					})
				]
			});
			
			oDialog.open();
		},
		
		oServ_EnvioToken: function(oObject,callback) {
			oMandante	= oView.byId('idComboMandante').getSelectedKey();	
			oLenguaje 	= oView.byId('idComboLangu').getSelectedKey();
			
			var soapMessage = '<soap:Envelope xmlns:soap="http://www.w3.org/2003/05/soap-envelope" xmlns:urn="urn:sap-com:document:sap:soap:functions:mc-style">';
				soapMessage=soapMessage+'<soap:Header/>';
				soapMessage=soapMessage+'<soap:Body>';
				soapMessage=soapMessage+'<urn:Zw20FmWsSendToken>';
				soapMessage=soapMessage+'<ImCredentials>';
				soapMessage=soapMessage+'<User>'+oObject.Usuario+'</User>';
				soapMessage=soapMessage+'<Mail>'+oObject.Correo+'</Mail>';
				if(oLenguaje=="ES"){
					soapMessage=soapMessage+'<Language>S</Language>';
				}
				if(oLenguaje=="EN"){
					soapMessage=soapMessage+'<Language>E</Language>';
				}
				soapMessage=soapMessage+'</ImCredentials>';
				soapMessage=soapMessage+'</urn:Zw20FmWsSendToken>';
				soapMessage=soapMessage+'</soap:Body>';
				soapMessage=soapMessage+'</soap:Envelope>';		
				
			webServiceURL_ZW20=ip_apache_dev + oPath_login_ini + oMandante + oPath_login_fin;
			oBusyDialog_a.setText(oCnt_FHelps.f_readTranslate("OlvideContrasena.Message.1"));
			oBusyDialog_a.open();
			//Llamamos a la función AJAX de JQuery
	        $.ajax({
	            url: webServiceURL_ZW20,
	            type: "POST",
	            cache: false,
	            data: soapMessage,
	            contentType: "application/soap+xml; charset=utf-8",
	            headers:{
	            	"Authorization": "Basic " + btoa( oUsuario1+":"+oPassword1),
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
	        	var oText = oCnt_FHelps.f_readTranslate("Login-error");
				oCnt_FHelps.f_showMessage("ERROR", oText);
				oBusyDialog_a.close();
	        }
		},
		
		oServ_ValidateToken: function(oObject,callback) {
			var soapMessage = '<soap:Envelope xmlns:soap="http://www.w3.org/2003/05/soap-envelope" xmlns:urn="urn:sap-com:document:sap:soap:functions:mc-style">';
				soapMessage=soapMessage+'<soap:Header/>';
				soapMessage=soapMessage+'<soap:Body>';
				soapMessage=soapMessage+'<urn:Zw20FmWsValidateToken>';
				soapMessage=soapMessage+'<ImCredentials>';
				soapMessage=soapMessage+'<User>'+oObject.Usuario+'</User>';
				soapMessage=soapMessage+'<Mail>'+oObject.Correo+'</Mail>';
				soapMessage=soapMessage+'<Token>'+oObject.Codigo+'</Token>';
				if(oLenguaje=="ES"){
					soapMessage=soapMessage+'<Language>S</Language>';
				}
				if(oLenguaje=="EN"){
					soapMessage=soapMessage+'<Language>E</Language>';
				}
				soapMessage=soapMessage+'</ImCredentials>';
				soapMessage=soapMessage+'</urn:Zw20FmWsValidateToken>';
				soapMessage=soapMessage+'</soap:Body>';
				soapMessage=soapMessage+'</soap:Envelope>';		
				
				oBusyDialog.open();
			//Llamamos a la función AJAX de JQuery
	        $.ajax({
	            url: webServiceURL_ZW20,
	            type: "POST",
	            cache: false,
	            data: soapMessage,
	            contentType: "application/soap+xml; charset=utf-8",
	            headers:{
	            	"Authorization": "Basic " + btoa( oUsuario1+":"+oPassword1),
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
	        	var oText = oCnt_FHelps.f_readTranslate("Login-error");
				oCnt_FHelps.f_showMessage("ERROR", oText);
	        }
		},
		
		toChangePassword: function(){
			var oView = this.getView();
			var router = sap.ui.core.UIComponent.getRouterFor(this);
			router.navTo("cambiar-password", {Userweb: oView.byId('myUser').getValue()}, false);
		}
	});

});