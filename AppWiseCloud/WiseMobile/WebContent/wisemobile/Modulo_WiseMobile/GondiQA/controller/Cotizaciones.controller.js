var oCtrl_Cotizaciones;
var Cotizaciones_flag = false;

sap.ui.define(["jquery.sap.global", "sap/ui/core/mvc/Controller", "sap/m/MessageBox", "sap/ui/model/Filter", "sap/ui/model/FilterOperator", "sap/m/TablePersoController"], 
		function(jQuery, Controller, MessageBox, Filter, FilterOperator, TablePersoController) {

	var oView;

	return Controller.extend("com.axiomasoluciones.wisemobile.Modulo_WiseMobile.GondiQA.controller.Cotizaciones", {

		onInit : function() {
			oCtrl_Cotizaciones = this;
   			oView = this.getView();
			
			console.log("onInit called - com.axiomasoluciones.wisemobile.Modulo_WiseMobile.GondiQA.controller.Cotizaciones");
			
			this.f_createAllFiltersPanel();
	        
			sap.ui.core.UIComponent.getRouterFor(this).attachRouteMatched(function(oEvent) {
	        	var sRoute = oEvent.getParameter("name");
	        	
	        	if ("Cotizaciones" === sRoute) {
	        		
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
			oC_Modulo_WiseMobile.f_createFilterPanel("COTIZACIONES", oCtrl_Cotizaciones, "idPage", 3);
		},
		
		onAfterRendering: function(oEvt) {
			
			// LIMPIAR MONITOR DE BUSQUEDA (EN CASO LO HALLA)
			oCnt_FHelps.f_LimpiarMonitorBusq(this);
			sap.ui.getCore().getModel("mTablesCotizaciones").setData({DOC_COTIZACIONES:[]});//revisar datos
			oCtrl_Cotizaciones.byId("idCountTableCotizaciones").setText("(0)");
        	
			if(Cotizaciones_flag == true)
				return;
			
			Cotizaciones_flag = true;
				
			var oTableID = oView.byId("idTableCotizaciones");
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
		
		onPressAgregarOferta: function(oEvt){
			
			var oTable = oView.byId("idTableCotizaciones");
		    var length = oTable.getSelectedItems().length;
		    
		    if(length==0){
		    	var oText = oCnt_FHelps.f_readTranslate("No-Table-Rows-Selected");
				oCnt_FHelps.f_showMessage("WARNING", oText);
			}
        	else if(length >= 1){
        		var idx = oTable.indexOfItem(oTable.getSelectedItem()); // getSelectedItems
        		var oNameModel = oTable.getBindingInfo("items").model; // "mTables"
	   			var oModel = oCore.getModel( oNameModel );
	   			var oPath = oTable.getBindingInfo("items").path;
	   			
	   			var oObject = oModel.getProperty(oPath+"/"+ idx);
	   			
	   			this.f_PopUp_AgregarOferta(oObject);
        	}
		},
		
		
		f_PopUp_AgregarOferta: function(oObject,oEvt) {
			
			var oObject1={
					ANFNR:oObject.EBELN,
					ANFPS:oObject.EBELP,
					NETPR:"",
					WAERS:"",
					EEIND:"",
					TEXT_RFQ:""
			};
			
			oCore.getModel("mOferta").setProperty("/", oObject1);
			
			var that = this;
			var aInputs = [
				
				new sap.m.Input({value:"{mOferta>/ANFNR}" ,enabled:false }),
				new sap.m.Input({value:"{mOferta>/ANFPS}",enabled:false  }),				
				new sap.m.DatePicker({ displayFormat: "yyyy-MM-dd", value:"{mOferta>/EEIND}",valueFormat:"yyyy-MM-dd"}),
				new sap.m.Input({value:"{mOferta>/NETPR}"}),
				new sap.m.Select({
					selectedKey:"{mOferta>/WAERS}",
					forceSelection : false,
					items: {
						path: "mCombos>/MONEDAS_ZW18",
						template:  new sap.ui.core.Item({ key:"{mCombos>WAERS}", text:"{mCombos>LTEXT}"})
					}
				}),
				
				new sap.m.TextArea({
					  value:"{mOferta>/TEXT_RFQ}", 
					  editable: true,
					  wrapping: sap.ui.core.Wrapping.Soft
					})
			];
			
			var oFileUploaderPDF=new sap.ui.unified.FileUploader({
				name: "testpdf",
				//uploadUrl: "../../../../upload/",
				sendXHR: true,
				value: "",
				//width: "400px",
				tooltip: "Cargar PDF",
				placeholder: "Cargar PDF...",
				fileType: ["pdf"],
				maximumFileSize: 2,
				uploadOnChange: false,
				multiple: true,
				buttonText: "Seleccionar archivo.",
				//additionalData: "abc=123&test=456",
				fileSizeExceed: function (oEvent) {
					var fileSize = oEvent.getParameter("fileSize"),
						fileName = oEvent.getParameter("fileName");
					oCnt_FHelps.f_showMessage("WARNING", "The chosen file '" + fileName + "' is " + fileSize + " MB big, this exceeds the maximum filesize of " + oEvent.getSource().getMaximumFileSize() + " MB.");
				}
			});
			
			var oDialog = new sap.m.Dialog({
				customHeader: new sap.m.Bar({
					contentMiddle: new sap.m.Label({
						text: "{i18n>Cotizaciones.Popup.title}"
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
									new sap.m.Label({ text : "{i18n>Cotizaciones.Popup.Form.1}" }),
									aInputs[0],
									new sap.m.Label({ text : "{i18n>Cotizaciones.Popup.Form.2}" }),
									aInputs[1],
									new sap.m.Label({ text : "{i18n>Cotizaciones.Popup.Form.3}" }),
									aInputs[2],
									new sap.m.Label({ text : "{i18n>Cotizaciones.Popup.Form.4}" }),
									aInputs[3],
									new sap.m.Label({ text : "{i18n>Cotizaciones.Popup.Form.5}" }),
									aInputs[4],
									new sap.m.Label({ text : "{i18n>Cotizaciones.Popup.Form.6}" }),
									oFileUploaderPDF,
									new sap.m.Label({ text : "{i18n>Cotizaciones.Popup.Form.7}" }),
									aInputs[5],
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
						text: "{i18n>Cotizaciones.Popup.Form.Button.1}",
						press:function(){
							
							if(oCnt_FHelps.f_Inputs([aInputs[0],aInputs[1],aInputs[2],aInputs[3],aInputs[4],aInputs[5],oFileUploaderPDF]) == false){					
								return;
								
							}
							/*
							function oFunction(oData){
								
								sap.ui.getCore().getModel("mMessages").setData(oData);//revisar datos
					            sap.ui.getCore().getModel("mMessages").refresh();
					            
					            var oObjeto=sap.ui.getCore().getModel("mMessages").getProperty("/env:Envelope/env:Body/n0:ZW18_UP_QUOTATIONResponse/ET_RETURN");
					            oCnt_FHelps.f_showMessage("INFORMATION", oObjeto.Message, undefined, oCnt_FHelps.f_readTranslate("Exito.title") );
								 
							}
							
							var oObject=oCtrl_EnvioFacturas.getView().getModel("mOferta").getData();
							
							oObject.PROP_PDF = mFiles["data_file_pdf"] != undefined ? mFiles["data_file_pdf"].replace("data:application/pdf;base64,","") : "" ;
							oCtrl_Cotizaciones.oServ_EnviarOferta(oObject,oFunction);
							*/
							///////
							
							
							var domRef_pdf = oFileUploaderPDF.getFocusDomRef();
			  				var file_pdf = domRef_pdf.files[0];
			  				var data_file_pdf;
			  				
			  					
			  					var oFunction2 =  function(File64pdf){
			  						data_file_pdf = File64pdf;
			  						
			  						function oFunction(oData){
										
										sap.ui.getCore().getModel("mMessages").setData(oData);//revisar datos
							            sap.ui.getCore().getModel("mMessages").refresh();
							            
							            var oDatos=sap.ui.getCore().getModel("mMessages").getProperty("/env:Envelope/env:Body/n0:ZW18_UP_QUOTATIONResponse/ET_RETURN").item;
							           
							            function oFunction1(oData){
							            	setTimeout(function() {
							            		oCtrl_Cotizaciones.byId("FilterPanel").getButton_Search().firePress()
											}, 500);
							            	
							            }
							            var length=oDatos.length;
							            if(oDatos.length==undefined){
							            	
							            	if(oDatos.TYPE=="S"){
						            			oCnt_FHelps.f_showMessage("INFORMATION", oDatos.MESSAGE, oFunction1, oCnt_FHelps.f_readTranslate("Exito.title") );						            			
						            		}
						            		if(oDatos.TYPE=="E"){
						            			oCnt_FHelps.f_showMessage("INFORMATION", oDatos.MESSAGE, oFunction1, oCnt_FHelps.f_readTranslate("Error.title") );
						            		}
						            		if(oDatos.TYPE=="W"){
						            			oCnt_FHelps.f_showMessage("INFORMATION", oDatos.MESSAGE, oFunction1, oCnt_FHelps.f_readTranslate("Warning.title") );
						            		}
						            		
							            }else{
							            	for(i=0;i<length;i++){
							            		if(oDatos[i].TYPE=="S"){
							            			oCnt_FHelps.f_showMessage("INFORMATION", oDatos[i].MESSAGE, oFunction1, oCnt_FHelps.f_readTranslate("Exito.title") );							     
							            		}
							            		if(oDatos[i].TYPE=="E"){
							            			oCnt_FHelps.f_showMessage("INFORMATION", oDatos[i].MESSAGE, oFunction1, oCnt_FHelps.f_readTranslate("Error.title") );
							            		}
							            		if(oDatos[i].TYPE=="W"){
							            			oCnt_FHelps.f_showMessage("INFORMATION", oDatos[i].MESSAGE, oFunction1, oCnt_FHelps.f_readTranslate("Warning.title") );
							            		}
							            		
							            	}
							            	
							            }
							            
										 
									}
									
									var oObject=oCtrl_Cotizaciones.getView().getModel("mOferta").getData();
									
									oObject.PROP_PDF = data_file_pdf.replace("data:application/pdf;base64,","");
									oCtrl_Cotizaciones.oServ_EnviarOferta(oObject,oFunction);
									
			 
			  					}
			  					oDialog.close();
			  					oCnt_FHelps.f_ToBase64Binary(file_pdf, oFunction2);
			  				
							
						}
					})
				]
			});
			
			oDialog.open();
		},
		
		oServ_EnviarOferta : function(oObject,callback) {
			
			if(oObject.EEIND!=""){
				var fecha= (oObject.EEIND).split('-');
				oObject.EEIND=((fecha[2].length==1)?("0"+fecha[2]):(fecha[2]))+"."+((fecha[1].length==1)?("0"+fecha[1]):(fecha[1]))+"."+fecha[0];
			}
			
			var soapMessage = '<soap:Envelope xmlns:soap="http://www.w3.org/2003/05/soap-envelope" xmlns:urn="urn:sap-com:document:sap:rfc:functions">';
				soapMessage=soapMessage+'<soap:Header/>';
				soapMessage=soapMessage+'<soap:Body>';
				soapMessage=soapMessage+'<urn:ZW18_UP_QUOTATION>';
				soapMessage=soapMessage+'<IS_UP_QUOTATION_IN>';
				soapMessage=soapMessage+'<ANFNR>'+oObject.ANFNR+'</ANFNR>';
				soapMessage=soapMessage+'<ANFPS>'+oObject.ANFPS+'</ANFPS>';
				soapMessage=soapMessage+'<NETPR>'+oObject.NETPR+'</NETPR>';
				soapMessage=soapMessage+'<PROP_PDF>'+oObject.PROP_PDF+'</PROP_PDF>';
				soapMessage=soapMessage+'<WAERS>'+oObject.WAERS+'</WAERS>';
				soapMessage=soapMessage+'<EEIND>'+oObject.EEIND+'</EEIND>';
				soapMessage=soapMessage+'<TEXT_RFQ>'+oObject.TEXT_RFQ+'</TEXT_RFQ>';
				soapMessage=soapMessage+'</IS_UP_QUOTATION_IN>';
				soapMessage=soapMessage+'</urn:ZW18_UP_QUOTATION>';
				soapMessage=soapMessage+'</soap:Body>';
				soapMessage=soapMessage+'</soap:Envelope>';
				
				oBusyDialog_d.setText(oCnt_FHelps.f_readTranslate("EnviandoSolicitud.text"));
				oBusyDialog_d.open();
	     
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
	            oBusyDialog_d.close();
	        	callback(json);
	        	
	        }
	        function OnError(request, status, error)  //Función que se ejecuta si ocurre algún error
	        {
	            oCnt_FHelps.f_showMessage("ERROR", error);
	            oBusyDialog_d.close();
	        }
		},
		
	});

});