var oCtrl_Cambio;

sap.ui.define(["jquery.sap.global", "sap/ui/core/mvc/Controller", "sap/m/MessageBox"],
		function(jQuery, Controller, MessageBox) {

	var oView;

	return Controller.extend("com.axiomasoluciones.wisemobile.Modulo_WiseMobile.Login.controller.CambioPassword", {
		
		_formFragments : {},
		
		onInit : function() {
			oCtrl_Cambio = this;
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
			var password=oView.byId('myPassword').getValue();
			var passwordN=oView.byId('myPasswordNuevo').getValue();
						
			if(oCnt_FHelps.f_Inputs([oView.byId('myPassword'), oView.byId('myPasswordNuevo') ]) == true){
								
				function oFunction(oData){
					
					sap.ui.getCore().getModel("mCambio").setData(oData);
		            sap.ui.getCore().getModel("mCambio").refresh();
		            
		            var oObjeto=sap.ui.getCore().getModel("mCambio").getProperty("/env:Envelope/env:Body/n0:Zw20FmWsPassChangeResponse/ExOutReturn/item");
					
					var Type=oObjeto.Type;
		            var Message=oObjeto.Message;
		            
		            if(Type=="S")
	            	{
		            	var router = sap.ui.core.UIComponent.getRouterFor(oCtrl_Login);
		            	router.navTo("Menu",{},false);
		            	oCnt_FHelps.f_showMessage("INFORMATION", Message, undefined, oCnt_FHelps.f_readTranslate("Exito.title") );
		            	
	            	}else{
	            		oCnt_FHelps.f_showMessage("INFORMATION", Message, undefined, oCnt_FHelps.f_readTranslate("Error.title") );
	            	}
		            
		            
				}
				
				var oObject={
						Usuario:oUsuario_login,
						Password:password,
						PasswordNuevo:passwordN
				}
				
				oC_Modulo_WiseMobile.oServ_CambioPass(oObject,oFunction);
				
			}
		},
		
		
		
		
	});

});