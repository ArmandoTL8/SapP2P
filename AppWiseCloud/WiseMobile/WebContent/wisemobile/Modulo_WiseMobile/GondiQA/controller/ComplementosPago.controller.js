var oCtrl_ComplementosPago;
var ComplementosPago_flag = false;
var oBusyDialog_c;

sap.ui.define(["jquery.sap.global", "sap/ui/core/mvc/Controller", "sap/m/MessageBox", "sap/ui/model/Filter", "sap/ui/model/FilterOperator", "sap/m/TablePersoController"], 
		function(jQuery, Controller, MessageBox, Filter, FilterOperator, TablePersoController) {

	var oView;

	return Controller.extend("com.axiomasoluciones.wisemobile.Modulo_WiseMobile.GondiQA.controller.ComplementosPago", {

		onInit : function() {
			oCtrl_ComplementosPago = this;
   			oView = this.getView();
			
			console.log("onInit called - com.axiomasoluciones.wisemobile.Modulo_WiseMobile.GondiQA.controller.ComplementosPago");
			
			this.f_createAllFiltersPanel();
	        
			sap.ui.core.UIComponent.getRouterFor(this).attachRouteMatched(function(oEvent) {
	        	var sRoute = oEvent.getParameter("name");
	        	
	        	if ("ComplementosPago" === sRoute) {
	        		
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
			console.log('createContent called -  com.axiomasoluciones.wisemobile.Modulo_WiseMobile.GondiQA.controller.ComplementosPago');
		},
		
		f_createAllFiltersPanel: function(oEvt){
			oC_Modulo_WiseMobile.f_createFilterPanel("COMPLEMENTOS", this, "idPage", 3);
		},
		
		onBeforeShow:function(){
			var oTableID = oView.byId("idTableComplementosPago");
			oControl = oCtrl_ComplementosPago.getView().byId("idPage").removeContent(0);
			
			if(oCtrl_ComplementosPago.f_createAllFiltersPanel() != true){					
				oTableID.removeSelections();
				oTableID.setGrowingThreshold(5);
				
				sap.ui.getCore().getModel("mTablesListadoDocComp").setData({DOC_COMPENSADOS:[]});//revisar datos
	            sap.ui.getCore().getModel("mTablesListadoDocComp").refresh();
				
				
			}
			
            setTimeout(function(){
  			  oControl.destroy();
  			}, 250);
   			
		},		
		
		onAfterRendering: function(oEvt) {
			
			// LIMPIAR MONITOR DE BUSQUEDA (EN CASO LO HALLA)
			oCnt_FHelps.f_LimpiarMonitorBusq(this);
			if(ComplementosPago_flag == true)
				return;
			
			ComplementosPago_flag = true;
				
			var oTableID = oView.byId("idTableComplementosPago");
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

		onPressCargarXML: function(oEvt) {
			var that = this;
			
			var oTable = oView.byId("idTableComplementosPago");
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
	   			oCore.getModel("mComplemento").setProperty("/", oObject);
	   			/*
	   			 * AQUI VIENE
	   			 */
	   			var oFileUploaderXML = new sap.ui.unified.FileUploader({
					name: "testxml",
					//uploadUrl: "../../../../upload/",
					sendXHR: true,
					value: "",
					//width: "400px",
					tooltip: "Upload your file to the local server.",
					placeholder: "Choose a file for uploading...",
					fileType: ["xml"],
					maximumFileSize: 2,
					uploadOnChange: false,
					multiple: true,
					buttonText: "Browse...",
					//additionalData: "abc=123&test=456",
					fileSizeExceed: function (oEvent) {
						var fileSize = oEvent.getParameter("fileSize"),
							fileName = oEvent.getParameter("fileName");
						oCnt_FHelps.f_showMessage("WARNING", "The chosen file '" + fileName + "' is " + fileSize + " MB big, this exceeds the maximum filesize of " + oEvent.getSource().getMaximumFileSize() + " MB.");
					}
				});
	   			
	   			var oFileUploaderPDF = new sap.ui.unified.FileUploader({
					name: "testpdf",
					//uploadUrl: "../../../../upload/",
					sendXHR: true,
					value: "",
					//width: "400px",
					tooltip: "Upload your file to the local server.",
					placeholder: "Choose a file for uploading...",
					fileType: ["pdf"],
					maximumFileSize: 2,
					uploadOnChange: false,
					multiple: true,
					buttonText: "Browse...",
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
							text: "{i18n>ComplementosPago.CargarXML.Popup.title}"
						}),
						contentRight: new sap.m.Button({
							icon: "sap-icon://decline",
							press: function() {
								oDialog.close();
							}
						})
					}),
					content:[
						new sap.ui.layout.form.Form({
							editable: true,
							layout: new sap.ui.layout.form.ResponsiveGridLayout(),
							formContainers: [
								new sap.ui.layout.form.FormContainer({
									formElements: [
										new sap.ui.layout.form.FormElement({
											label: "{i18n>ComplementosPago.CargarXML.Popup.Form.Label.1}",
											fields: [
												new sap.m.Input({value:"{mComplemento>/Bukrs}", enabled: false})
											]
										}),
										new sap.ui.layout.form.FormElement({
											label: "{i18n>ComplementosPago.CargarXML.Popup.Form.Label.2}",
											fields: [
												new sap.m.Input({value:"{mComplemento>/Belnr}", enabled: false})
											]
										}),
										new sap.ui.layout.form.FormElement({
											label: "{i18n>ComplementosPago.CargarXML.Popup.Form.Label.3}",
											fields: [
												new sap.m.Input({value:"{mComplemento>/Gjahr}", enabled: false})
											]
										}),
										new sap.ui.layout.form.FormElement({
											label: "{i18n>ComplementosPago.CargarXML.Popup.Form.Label.4}",
											fields: [
												oFileUploaderXML
											]
										}),
										new sap.ui.layout.form.FormElement({
											label: "{i18n>ComplementosPago.CargarXML.Popup.Form.Label.5}",
											fields: [
												oFileUploaderPDF
											]
										})
									]
								})
							]
						})
						
					],
					buttons:[
						new sap.m.Button({
							text: "{i18n>Popup.Button.Enviar}",
							press: function(oEvt){
								
								var oForm = oView.byId("idFormEnvioFacturas");
								
								if(oCnt_FHelps.f_Inputs([oFileUploaderXML,oFileUploaderPDF]) == true){
									oDialog.close();
									
					              	var domRef_xml = oFileUploaderXML.getFocusDomRef();
					              	var domRef_pdf = oFileUploaderPDF.getFocusDomRef();
					  				var file_xml = domRef_xml.files[0];
					  				var file_pdf = domRef_pdf.files[0];
					  				var data_file_xml;
					  				var data_file_pdf;
					  				
					  				var oFunction1 =  function(File64xml){
					  					
					  					data_file_xml = File64xml;
					  					
					  					var oFunction2 =  function(File64pdf){
					  						data_file_pdf = File64pdf;
					  						
											function oFunction(oData){
												
												sap.ui.getCore().getModel("mMessages").setData(oData);
									            
									            var length=sap.ui.getCore().getModel("mMessages").getProperty("/env:Envelope/env:Body/n0:Zw12FmWsSaveXmlDataResponse/ImOutReturn/item").length;	            
									            var mData=sap.ui.getCore().getModel("mMessages").getProperty("/env:Envelope/env:Body/n0:Zw12FmWsSaveXmlDataResponse/ImOutReturn/item");
									            
									            if(length==undefined){
									            	sap.ui.getCore().getModel("mMessages").setData([mData]);
									            }else{
									            	sap.ui.getCore().getModel("mMessages").setData(mData);									            
									            }
									            
									            ////////////
									            var oObjeto=sap.ui.getCore().getModel("mMessages").getData()[0];
												
									            function oFunction3(oData){
									            	setTimeout(function() {
									            		oCtrl_ComplementosPago.byId("FilterPanel").getButton_Search().firePress();
													}, 500);
									            	
									            }
									            
									            if(oObjeto.Type=="E"){
													 oCnt_FHelps.f_showMessage("WARNING", oObjeto.Message, oFunction3, oCnt_FHelps.f_readTranslate("ComplementosPago.Error.Popup.title") );													 
												 }else{
													 oCnt_FHelps.f_showMessage("INFORMATION", oObjeto.Message, oFunction3, oCnt_FHelps.f_readTranslate("Exito.title") );													 
												 }
												 
												 
											}
					  						
											// CONSULTA : https://www.browserling.com/tools/file-to-base64
					  						oObject.binario_xml = data_file_xml.replace("data:text/xml;base64,","");
											oObject.binario_pdf = data_file_pdf.replace("data:application/pdf;base64,","");
											oCtrl_ComplementosPago.oServ_EnviarCargarXML(oObject,oFunction);
					  					}
					  					
					  					oCnt_FHelps.f_ToBase64Binary(file_pdf, oFunction2);
					  				}
					  				
					  				oCnt_FHelps.f_ToBase64Binary(file_xml, oFunction1);
									
									// open dialog
		
									// simulate end of operation
		
								}
								
															
							}
						}),
						new sap.m.Button({
							text: "{i18n>Popup.Button.Cancelar}",
							press: function(oEvt){
								oDialog.close();
							}
						}),
					],
					beforeClose: function(oEvt){
						var oContent = oDialog.removeAllContent();
					},
					afterClose: function(oEvt){
						oDialog.destroy();
					}
				});
				oDialog.open();
        	}
		},
		
		_convertArrayBufferFileToBinary: function(result){
			var bytes  = new Uint8Array(result);
            var length = bytes.byteLength;
            var binary = "";
            for (var i = 0; i < length; i++) {
                binary += String.fromCharCode(bytes[i]);
            }
            return binary;
		},
		
		_b64EncodeStringUTF8: function(str){
			return btoa(encodeURIComponent(str).replace(/%([0-9A-F]{2})/g, function(match, p1) {
		        return String.fromCharCode('0x' + p1);
		    }));
		},
		
		
		onPressError: function(oEvt) {
			var that = this;
			
			var oTable = oView.byId("idTableComplementosPago");
		    var length = oTable.getSelectedItems().length;
		   
		    if(length!=1){
		    	var oText = oCnt_FHelps.f_readTranslate("No-Table-Rows-Selected");
				oCnt_FHelps.f_showMessage("WARNING", oText);
			}
        	else{
        		var idx = oTable.indexOfItem(oTable.getSelectedItem()); // getSelectedItems
        		var oNameModel = oTable.getBindingInfo("items").model; // "mTables"
	   			var oModel = oCore.getModel( oNameModel );
	   			var oPath = oTable.getBindingInfo("items").path;
	   			
	   			var oObject = oModel.getProperty(oPath+"/"+ idx);
	   			/*
	   			 * AQUI VIENE
	   			 */
	   		if(that.Table_Error == undefined)
	   			that.Table_Error = new sap.m.Table("idTableError",{
					growing: true,
					growingThreshold: 5,
					growingScrollToLoad : true,
					selectionChange : function(e) {
						sap.m.MessageToast.show("selection is changed");
					},
					itemPress : function(e) {
						sap.m.MessageToast.show("item is pressed");
					},
					headerToolbar: new sap.m.Toolbar({
						content : [
							new sap.m.ToolbarSpacer(),
							new sap.m.Button({
								icon: "sap-icon://table-column",
								press: function(oEvt){
									var oTable = oEvt.getSource().getParent().getParent();
									oCtrl_Main_P2P.onPersoPress(oEvt, oTable);
								}
							})
						]
					}),
					columns :  [
						new sap.m.Column("idCol45",{
							width : "2.5rem",
							header : new sap.m.Label({
								text : "Pos"
							})
						}),
						new sap.m.Column("idCol46",{
							header : new sap.m.Label({
								text : "{i18n>ComplementosPago.Error.Popup.Table.Column.1}"
							})
						}),
						new sap.m.Column("idCol47",{
							header : new sap.m.Label({
								text : "{i18n>ComplementosPago.Error.Popup.Table.Column.2}"
							})
						})
					]
				}).bindItems({
					path: "mTablesError>/ERROR",
					template : 
						new sap.m.ColumnListItem({
							vAlign: "Middle",
							detailPress: function() {
								setTimeout(function() {
									sap.m.MessageToast.show("detail is pressed");
								}, 10);
							},
							cells : [
								new sap.m.Text({ text : "{mTablesError>No}" }),
								new sap.m.Text({ text : "{mTablesError>Type}" }),
								new sap.m.Text({ text : "{mTablesError>Message}" })
							]
						})
				});
	   			
	   			//if(oObject.Flgerr=="X"){
	   				oCtrl_ComplementosPago.oServ_ListarErrorLog(oObject);	
	   			
	   				var oDialog = new sap.m.Dialog({
						contentWidth: "100%",
						customHeader: new sap.m.Bar({
							contentMiddle: new sap.m.Label({
								text: "{i18n>ComplementosPago.Error.Popup.title}"
							}),
							contentRight: new sap.m.Button({
								icon: "sap-icon://decline",
								press: function() {
									oDialog.close();
								}
							})
						}),
						content:[
							new sap.ui.layout.form.Form({
								editable: true,
								layout: new sap.ui.layout.form.ResponsiveGridLayout(),
								formContainers: [
									new sap.ui.layout.form.FormContainer({
										formElements: [
											new sap.ui.layout.form.FormElement({
												label: "{i18n>ComplementosPago.Error.Popup.Form.Label.1}",
												fields: [
													new sap.m.Input({value:oObject.Bukrs, enabled: false})
												]
											}),
											new sap.ui.layout.form.FormElement({
												label: "{i18n>ComplementosPago.Error.Popup.Form.Label.2}",
												fields: [
													new sap.m.Input({value:oObject.Belnr, enabled: false})
												]
											}),
											new sap.ui.layout.form.FormElement({
												label: "{i18n>ComplementosPago.Error.Popup.Form.Label.3}",
												fields: [
													new sap.m.Input({value:oObject.Gjahr, enabled: false})
												]
											})
										]
									})
								]
							}),
							that.Table_Error
						],
						buttons:[
							new sap.m.Button({
								text: "{i18n>Popup.Button.Cancelar}",
								press: function(oEvt){
									oDialog.close();
								}
							})
						],
						beforeOpen: function(oEvt){

							if(oCtrl_Main_P2P._oTPC_Core["idTableError"] == undefined){
								var oTableID = oCore.byId("idTableError");
					   			// Hidden/view Columns
					   			DemoPersoService.setMyPersData( oTableID );
					   			
					   			// init and activate controller
					   			oCtrl_Main_P2P._oTPC_Core["idTableError"] = new TablePersoController({
									table: oTableID,
									//specify the first part of persistence ids e.g. 'demoApp-productsTable-dimensionsCol'
									componentName: "demoApp",
									persoService: DemoPersoService,
								}).activate();
							}
						},
						beforeClose: function(oEvt){
							oDialog.removeAllContent();
						},
						afterClose: function(oEvt){
							oDialog.destroy();
						}
					});
					oDialog.open();
					oBusyDialog.open();
	   			//}
				
			}
		},
		
		f_PopUp_DocRelac: function(oObject) {
			var that = this;
			oCtrl_ComplementosPago.oServ_ListarDocumentosRelacionados(oObject);
		if(that.Table_DocRelac == undefined)
			that.Table_DocRelac =new sap.m.Table("idTableDocRelac",{
				growing: true,
				growingThreshold: 5,
				growingScrollToLoad : true,
				selectionChange : function(e) {
					sap.m.MessageToast.show("selection is changed");
				},
				itemPress : function(e) {
					sap.m.MessageToast.show("item is pressed");
				},
				headerToolbar: new sap.m.Toolbar({
					content : [
						new sap.m.ToolbarSpacer(),
						new sap.m.Button({
							icon: "sap-icon://table-column",
							press: function(oEvt){
								var oTable = oEvt.getSource().getParent().getParent();
								oCtrl_Main_P2P.onPersoPress(oEvt, oTable);
							}
						})
					]
				}),
				columns :  [
					new sap.m.Column("idCol51",{
						width : "1.5rem",
						header : new sap.m.Label({
							text : "Pos"
						})
					}),
					new sap.m.Column("idCol52",{
						header : new sap.m.Label({
							text : "{i18n>ComplementosPago.DocRelac.Popup.Table.Column.1}"
						})
					}),
					new sap.m.Column("idCol53",{
						header : new sap.m.Label({
							text : "{i18n>ComplementosPago.DocRelac.Popup.Table.Column.2}"
						})
					}),
					new sap.m.Column("idCol54",{
						hAlign: "Center",
						header : new sap.m.Label({
							text : "{i18n>ComplementosPago.DocRelac.Popup.Table.Column.3}"
						})
					}),
					new sap.m.Column("idCol55",{
						minScreenWidth: "Tablet",
						demandPopin: true,
						header : new sap.m.Label({
							text : "{i18n>ComplementosPago.DocRelac.Popup.Table.Column.4}"
						})
					}),
					new sap.m.Column("idCol56",{
						minScreenWidth: "Tablet",
						demandPopin: true,
						hAlign: "Center",
						header : new sap.m.Label({
							text : "{i18n>ComplementosPago.DocRelac.Popup.Table.Column.5}"
						})
					}),
					new sap.m.Column("idCol57",{
						minScreenWidth: "Tablet",
						demandPopin: true,
						header : new sap.m.Label({
							text : "{i18n>ComplementosPago.DocRelac.Popup.Table.Column.6}"
						})
					}),
					new sap.m.Column("idCol58",{
						minScreenWidth: "Tablet",
						demandPopin: true,
						hAlign: "Center",
						header : new sap.m.Label({
							text : "{i18n>ComplementosPago.DocRelac.Popup.Table.Column.7}"
						})
					}),
					new sap.m.Column("idCol59",{
						minScreenWidth: "Tablet",
						demandPopin: true,
						header : new sap.m.Label({
							text : "{i18n>ComplementosPago.DocRelac.Popup.Table.Column.8}"
						})
					}),
					new sap.m.Column("idCol60",{
						minScreenWidth: "Tablet",
						demandPopin: true,
						hAlign: "Center",
						header : new sap.m.Label({
							text : "{i18n>ComplementosPago.DocRelac.Popup.Table.Column.9}"
						})
					}),
					new sap.m.Column("idCol61",{
						minScreenWidth: "Tablet",
						demandPopin: true,
						header : new sap.m.Label({
							text : "{i18n>ComplementosPago.DocRelac.Popup.Table.Column.10}"
						})
					}),
					new sap.m.Column("idCol62",{
						minScreenWidth: "Tablet",
						demandPopin: true,
						hAlign: "Center",
						header : new sap.m.Label({
							text : "{i18n>ComplementosPago.DocRelac.Popup.Table.Column.11}"
						})
					}),
					new sap.m.Column("idCol63",{
						minScreenWidth: "Tablet",
						demandPopin: true,
						header : new sap.m.Label({
							text : "{i18n>ComplementosPago.DocRelac.Popup.Table.Column.12}"
						})
					}),
					new sap.m.Column("idCol64",{
						minScreenWidth: "Tablet",
						demandPopin: true,
						hAlign: "Center",
						header : new sap.m.Label({
							text : "{i18n>ComplementosPago.DocRelac.Popup.Table.Column.13}"
						})
					})
				]
			}).bindItems({
				path: "mTablesDocumentosRelac>/DOC_RELAC",
				template : 
					new sap.m.ColumnListItem({
						vAlign: "Middle",
						detailPress: function() {
							setTimeout(function() {
								sap.m.MessageToast.show("detail is pressed");
							}, 10);
						},
						cells : [
							new sap.m.Text({ text : "{mTablesDocumentosRelac>No}" }),
							new sap.m.Text({ text : "{mTablesDocumentosRelac>IdDocpay}" }),
							new sap.m.Text({ text : "{mTablesDocumentosRelac>XblnrDocr}" }),
							new sap.m.Text({ text : "{mTablesDocumentosRelac>UuidDocrel}" }),
							new sap.m.Text({ text : "{mTablesDocumentosRelac>Paymeth}" }),
							new sap.m.Text({ text : "{mTablesDocumentosRelac>Idparcialidad}" }),
							new sap.m.Text({ text : "{mTablesDocumentosRelac>WaersDoc}" }),
							new sap.m.Text({ text : "{mTablesDocumentosRelac>ExchrateDoc}" }),
							new sap.m.Text({ text : "{mTablesDocumentosRelac>AmtprebalDoc}" }),
							new sap.m.Text({ text : "{mTablesDocumentosRelac>AmtpaidDoc}" }),
							new sap.m.Text({ text : "{mTablesDocumentosRelac>AmtoutbalDoc}" }),
							new sap.m.Text({ text : "{mTablesDocumentosRelac>BukrsDocrel}" }),
							new sap.m.Text({ text : "{mTablesDocumentosRelac>BelnrDocrel}" }),
							new sap.m.Text({ text : "{mTablesDocumentosRelac>GjahrDocrel}" })
						]
					})
			});
			
			var oDialog = new sap.m.Dialog({
				contentWidth: "100%",
				customHeader: new sap.m.Bar({
					contentMiddle: new sap.m.Label({
						text: "{i18n>ComplementosPago.DocRelac.Popup.title}"
					}),
					contentRight: new sap.m.Button({
						icon: "sap-icon://decline",
						press: function() {
							oDialog.close();
						}
					})
				}),
				content:[
					new sap.ui.layout.form.Form({
						editable: true,
						layout: new sap.ui.layout.form.ResponsiveGridLayout(),
						formContainers: [
							new sap.ui.layout.form.FormContainer({
								formElements: [
									new sap.ui.layout.form.FormElement({
										label: "{i18n>ComplementosPago.DocRelac.Popup.Form.Label.1}",
										fields: [
											new sap.m.Input({value:"{mDocumento>/Bukrs}",enabled:false})
										]
									}),
									new sap.ui.layout.form.FormElement({
										label: "{i18n>ComplementosPago.DocRelac.Popup.Form.Label.2}",
										fields: [
											new sap.m.Input({value:"{mDocumento>/Belnr}",enabled:false})
										]
									}),
									new sap.ui.layout.form.FormElement({
										label: "{i18n>ComplementosPago.DocRelac.Popup.Form.Label.3}",
										fields: [
											new sap.m.Input({value:"{mDocumento>/Gjahr}",enabled:false})
										]
									}),
									new sap.ui.layout.form.FormElement({
										label: "{i18n>ComplementosPago.DocRelac.Popup.Form.Label.4}",
										fields: [
											new sap.m.Input({value:"{mDocumento>/Paymeans}",enabled:false})
										]
									}),
									new sap.ui.layout.form.FormElement({
										label: "{i18n>ComplementosPago.DocRelac.Popup.Form.Label.5}",
										fields: [
											new sap.m.Input({value:"{mDocumento>/Payamtdoc}",enabled:false})
										]
									}),
									new sap.ui.layout.form.FormElement({
										label: "{i18n>ComplementosPago.DocRelac.Popup.Form.Label.6}",
										fields: [
											new sap.m.Input({value:"{mDocumento>/Waerspaydoc}",enabled:false})
										]
									})
								]
							})
						]
					}),
					that.Table_DocRelac
				],
				buttons:[
					new sap.m.Button({
						text: "{i18n>Popup.Button.Cancelar}",
						press: function(oEvt){
							oDialog.close();
						}
					})
				],
				beforeOpen: function(oEvt){

					if(oCtrl_Main_P2P._oTPC_Core["idTableDocRelac"] == undefined){
						var oTableID = oCore.byId("idTableDocRelac");
			   			// Hidden/view Columns
			   			DemoPersoService.setMyPersData( oTableID );
			   			
			   			// init and activate controller
			   			oCtrl_Main_P2P._oTPC_Core["idTableDocRelac"] = new TablePersoController({
							table: oTableID,
							//specify the first part of persistence ids e.g. 'demoApp-productsTable-dimensionsCol'
							componentName: "demoApp",
							persoService: DemoPersoService,
						}).activate();
					}
				},
				beforeClose: function(oEvt){
					oDialog.removeAllContent();
				},
				afterClose: function(oEvt){
					oDialog.destroy();
				}
			});
			oDialog.open();
			oBusyDialog.open();
		},
		
		onPressDetPagos: function(oEvt) {
			var that = this;
			
			var oTable = oView.byId("idTableComplementosPago");
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
	   			oCore.getModel("mComplemento").setProperty("/", oObject);
	   			/*
	   			 * AQUI VIENE
	   			 */
	   		oCtrl_ComplementosPago.	oServ_ListarDetallePagos(oObject);
	   		if(that.Table_DetPagos == undefined)
		   		that.Table_DetPagos =new sap.m.Table("idTableDetPagos",{
					mode: "MultiSelect",
					growing: true,
					growingThreshold: 5,
					growingScrollToLoad : true,
					headerToolbar: new sap.m.Toolbar({
						content : [
							new sap.m.ToolbarSpacer(),
							new sap.m.Button({
								text : "{i18n>ComplementosPago.DetPagos.Popup.Table.Toolbar.Button.1}",
								press: function(oEvt){
									
									var oTable = oEvt.getSource().getParent().getParent();
								    var length = oTable.getSelectedItems().length;
								   
								    if(length!=1){
								    	var oText = oCnt_FHelps.f_readTranslate("No-Table-Rows-Selected");
										oCnt_FHelps.f_showMessage("WARNING", oText);
									}
						        	else{
						        		var idx = oTable.indexOfItem(oTable.getSelectedItem()); // getSelectedItems
						        		var oNameModel = oTable.getBindingInfo("items").model; // "mTables"
							   			var oModel = oCore.getModel( oNameModel );
							   			var oPath = oTable.getBindingInfo("items").path;
							   			
							   			var oObject = oModel.getProperty(oPath+"/"+ idx);
							   			oCore.getModel("mDocumento").setProperty("/", oObject);
							   			/*
							   			 * AQUI VIENE
							   			 */
							   			oCtrl_ComplementosPago.f_PopUp_DocRelac(oObject);
						        	}
								}
							}),
							new sap.m.Button({
								icon: "sap-icon://table-column",
								press: function(oEvt){
									var oTable = oEvt.getSource().getParent().getParent();
									oCtrl_Main_P2P.onPersoPress(oEvt, oTable);
								}
							})
						]
					}),
					selectionChange : function(e) {
						//sap.m.MessageToast.show("selection is changed");
					},
					itemPress : function(e) {
						//sap.m.MessageToast.show("item is pressed");
					},
					columns :  [
						new sap.m.Column("idCol70",{
							width : "1.5rem",
							header : new sap.m.Label({
								text : "Pos"
							})
						}),
						new sap.m.Column("idCol71",{
							header : new sap.m.Label({
								text : "{i18n>ComplementosPago.DetPagos.Popup.Table.Column.1}"
							})
						}),
						new sap.m.Column("idCol72",{
							header : new sap.m.Label({
								text : "{i18n>ComplementosPago.DetPagos.Popup.Table.Column.2}"
							})
						}),
						new sap.m.Column("idCol73",{
							hAlign: "Center",
							minScreenWidth: "Tablet",
							demandPopin: true,
							header : new sap.m.Label({
								text : "{i18n>ComplementosPago.DetPagos.Popup.Table.Column.3}"
							})
						}),
						new sap.m.Column("idCol74",{
							minScreenWidth: "Tablet",
							demandPopin: true,
							header : new sap.m.Label({
								text : "{i18n>ComplementosPago.DetPagos.Popup.Table.Column.4}"
							})
						}),
						new sap.m.Column("idCol75",{
							minScreenWidth: "Tablet",
							demandPopin: true,
							hAlign: "Center",
							header : new sap.m.Label({
								text : "{i18n>ComplementosPago.DetPagos.Popup.Table.Column.5}"
							})
						}),
						new sap.m.Column("idCol76",{
							minScreenWidth: "Tablet",
							demandPopin: true,
							header : new sap.m.Label({
								text : "{i18n>ComplementosPago.DetPagos.Popup.Table.Column.6}"
							})
						}),
						new sap.m.Column("idCol77",{
							minScreenWidth: "Tablet",
							demandPopin: true,
							hAlign: "Center",
							header : new sap.m.Label({
								text : "{i18n>ComplementosPago.DetPagos.Popup.Table.Column.7}"
							})
						}),
						new sap.m.Column("idCol78",{
							minScreenWidth: "Tablet",
							demandPopin: true,
							header : new sap.m.Label({
								text : "{i18n>ComplementosPago.DetPagos.Popup.Table.Column.8}"
							})
						}),
						new sap.m.Column("idCol79",{
							minScreenWidth: "Tablet",
							demandPopin: true,
							hAlign: "Center",
							header : new sap.m.Label({
								text : "{i18n>ComplementosPago.DetPagos.Popup.Table.Column.9}"
							})
						}),
						new sap.m.Column("idCol80",{
							minScreenWidth: "Tablet",
							demandPopin: true,
							header : new sap.m.Label({
								text : "{i18n>ComplementosPago.DetPagos.Popup.Table.Column.10}"
							})
						}),
						new sap.m.Column("idCol81",{
							minScreenWidth: "Tablet",
							demandPopin: true,
							hAlign: "Center",
							header : new sap.m.Label({
								text : "{i18n>ComplementosPago.DetPagos.Popup.Table.Column.11}"
							})
						}),
						new sap.m.Column("idCol82",{
							minScreenWidth: "Tablet",
							demandPopin: true,
							header : new sap.m.Label({
								text : "{i18n>ComplementosPago.DetPagos.Popup.Table.Column.12}"
							})
						}),
						new sap.m.Column("idCol83",{
							minScreenWidth: "Tablet",
							demandPopin: true,
							hAlign: "Center",
							header : new sap.m.Label({
								text : "{i18n>ComplementosPago.DetPagos.Popup.Table.Column.13}"
							})
						}),
						new sap.m.Column("idCol84",{
							minScreenWidth: "Tablet",
							demandPopin: true,
							header : new sap.m.Label({
								text : "{i18n>ComplementosPago.DetPagos.Popup.Table.Column.14}"
							})
						}),
						new sap.m.Column("idCol85",{
							minScreenWidth: "Tablet",
							demandPopin: true,
							hAlign: "Center",
							header : new sap.m.Label({
								text : "{i18n>ComplementosPago.DetPagos.Popup.Table.Column.15}"
							})
						})
					]
				}).bindItems({
					path: "mTablesDetallePago>/DOC_PAGO",
					template : 
						new sap.m.ColumnListItem({
							vAlign: "Middle",
							detailPress: function() {
								setTimeout(function() {
									sap.m.MessageToast.show("detail is pressed");
								}, 10);
							},
							cells : [
								new sap.m.Text({ text : "{mTablesDetallePago>No}" }),
								new sap.m.Text({ text : "{mTablesDetallePago>IdDocpay}" }),
								new sap.m.Text({ text : "{mTablesDetallePago>BukrsPay}" }),
								new sap.m.Text({ text : "{mTablesDetallePago>BelnrPay}" }),
								new sap.m.Text({ text : "{mTablesDetallePago>GjahrPay}" }),
								new sap.m.Text({ text : "{mTablesDetallePago>Paymeans}" }),
								new sap.m.Text({ text : "{mTablesDetallePago>Payamtdoc}" }),
								new sap.m.Text({ text : "{mTablesDetallePago>Subtotal}" }),
								new sap.m.Text({ text : "{mTablesDetallePago>ImpuestoTras}" }),
								new sap.m.Text({ text : "{mTablesDetallePago>ImpuestoRete}" }),
								new sap.m.Text({ text : "{mTablesDetallePago>Waerspaydoc}" }),
								new sap.m.Text({ text : "{mTablesDetallePago>Payexchrat}" }),
								new sap.m.Text({ text : "{mTablesDetallePago>BlartpayTxt}" }),
								new sap.m.Text({ text : "{mTablesDetallePago>UmskzTxt}" }),
								new sap.m.Text({ text : "{mTablesDetallePago>XblnrPay}" }),
								new sap.m.Text({ text : "{mTablesDetallePago>Ebeln}" }),
							]
						})
				});
	   			
				var oDialog = new sap.m.Dialog({
					contentWidth: "100%",
					customHeader: new sap.m.Bar({
						contentMiddle: new sap.m.Label({
							text: "{i18n>ComplementosPago.DetPagos.Popup.title}"
						}),
						contentRight: new sap.m.Button({
							icon: "sap-icon://decline",
							press: function() {
								oDialog.close();
							}
						})
					}),
					content:[
						new sap.ui.layout.form.Form({
							editable: true,
							layout: new sap.ui.layout.form.ResponsiveGridLayout(),
							formContainers: [
								new sap.ui.layout.form.FormContainer({
									formElements: [
										new sap.ui.layout.form.FormElement({
											label: "{i18n>ComplementosPago.DetPagos.Popup.Form.Label.1}",
											fields: [
												new sap.m.Input({value:"{mComplemento>/Bukrs}", enabled: false})
											]
										}),
										new sap.ui.layout.form.FormElement({
											label: "{i18n>ComplementosPago.DetPagos.Popup.Form.Label.2}",
											fields: [
												new sap.m.Input({value:"{mComplemento>/Belnr}", enabled: false})
											]
										}),
										new sap.ui.layout.form.FormElement({
											label: "{i18n>ComplementosPago.DetPagos.Popup.Form.Label.3}",
											fields: [
												new sap.m.Input({value:"{mComplemento>/Gjahr}", enabled: false})
											]
										})
									]
								})
							]
						}),
						that.Table_DetPagos
					],
					buttons:[
						new sap.m.Button({
							text: "{i18n>Popup.Button.Cancelar}",
							press: function(oEvt){
								oDialog.close();
							}
						})
					],
					beforeOpen: function(oEvt){

						if(oCtrl_Main_P2P._oTPC_Core["idTableDetPagos"] == undefined){
							var oTableID = oCore.byId("idTableDetPagos");
				   			// Hidden/view Columns
				   			DemoPersoService.setMyPersData( oTableID );
				   			
				   			// init and activate controller
				   			oCtrl_Main_P2P._oTPC_Core["idTableDetPagos"] = new TablePersoController({
								table: oTableID,
								//specify the first part of persistence ids e.g. 'demoApp-productsTable-dimensionsCol'
								componentName: "demoApp",
								persoService: DemoPersoService,
							}).activate();
						}
					},
					beforeClose: function(oEvt){
						oDialog.removeAllContent();
					},
					afterClose: function(oEvt){
						oDialog.destroy();
					}
				});
				oDialog.open();
				oBusyDialog.open();
        	}
		},
		
		onPressOpciones: function(oEvt){
			var that = this;
			var oButton = oEvt.getSource();
			
			if(this._actsheet == undefined)
				this._actsheet = new sap.m.ActionSheet({
					placement:"Auto",
					buttons:[
							new sap.m.Button({
								text: "{i18n>ComplementosPago.Monitor.Table.Toolbar.Button.1}",
								press: function(oEvt){
									that.onPressCargarXML(oEvt);
								}
							}),
							new sap.m.Button({
								text: "{i18n>ComplementosPago.Monitor.Table.Toolbar.Button.2}",
								press: function(oEvt){
									that.onPressError(oEvt);
								}
							}),
							new sap.m.Button({
								text: "{i18n>ComplementosPago.Monitor.Table.Toolbar.Button.3}",
								press: function(oEvt){
									that.onPressDetPagos(oEvt);
								}
							})
					]
				});

			this._actsheet.openBy(oButton);
		},
		
		oServ_EnviarCargarXML : function(oObject,callback) {
			var that = this;
			
			var soapMessage = '<soap:Envelope xmlns:soap="http://www.w3.org/2003/05/soap-envelope" xmlns:urn="urn:sap-com:document:sap:soap:functions:mc-style">';
			soapMessage=soapMessage+'<soap:Header/>';
			soapMessage=soapMessage+'<soap:Body>';
			soapMessage=soapMessage+'<urn:Zw12FmWsSaveXmlData>';
			soapMessage=soapMessage+'<ExInXmlData>';
			soapMessage=soapMessage+'<Bukrs>'+oObject.Bukrs+'</Bukrs>';
			soapMessage=soapMessage+'<Belnr>'+oObject.Belnr+'</Belnr>';
			soapMessage=soapMessage+'<Gjahr>'+oObject.Gjahr+'</Gjahr>';
			soapMessage=soapMessage+'<Xmlbin>'+oObject.binario_xml+'</Xmlbin>';
			soapMessage=soapMessage+'<Pdfbin>'+oObject.binario_pdf+'</Pdfbin>';
			soapMessage=soapMessage+'</ExInXmlData>';
			soapMessage=soapMessage+'</urn:Zw12FmWsSaveXmlData>';
			soapMessage=soapMessage+'</soap:Body>';
			soapMessage=soapMessage+'</soap:Envelope>';
			
			if(that.oBusyDialog_c == undefined)
				that.oBusyDialog_c = new sap.m.BusyDialog({
					title	: oCnt_FHelps.f_readTranslate("Wait.title"),
				    text	: oCnt_FHelps.f_readTranslate("CargarXML.Wait.text"),
				});
			
			that.oBusyDialog_c.open();
			
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
	        	callback(json);
	        	
	            that.oBusyDialog_c.close();
	        }
	        function OnError(request, status, error)  //Función que se ejecuta si ocurre algún error
	        {
	            oCnt_FHelps.f_showMessage("ERROR", error);
	            that.oBusyDialog_c.close();
	        }
		},
		
		oServ_ListarErrorLog : function(oObject) {
			var soapMessage = '<soap:Envelope xmlns:soap="http://www.w3.org/2003/05/soap-envelope" xmlns:urn="urn:sap-com:document:sap:soap:functions:mc-style">';
			soapMessage=soapMessage+'<soap:Header/>';
			soapMessage=soapMessage+'<soap:Body>';
			soapMessage=soapMessage+'<urn:Zw12FmWsGetErrorLog>';
			soapMessage=soapMessage+'<ExInLogError>';
			soapMessage=soapMessage+'<Bukrs>'+oObject.Bukrs+'</Bukrs>';
			soapMessage=soapMessage+'<Belnr>'+oObject.Belnr+'</Belnr>';
			soapMessage=soapMessage+'<Gjahr>'+oObject.Gjahr+'</Gjahr>';
			soapMessage=soapMessage+'</ExInLogError>';
			soapMessage=soapMessage+'</urn:Zw12FmWsGetErrorLog>';
			soapMessage=soapMessage+'</soap:Body>';
			soapMessage=soapMessage+'</soap:Envelope>';
		     
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
	        	sap.ui.getCore().getModel("mTablesError").setData(json);
	            
	        	var Type=sap.ui.getCore().getModel("mTablesError").getProperty("/env:Envelope/env:Body/n0:Zw12FmWsGetErrorLogResponse/EtReturn").item.Type;
	            var Message=sap.ui.getCore().getModel("mTablesError").getProperty("/env:Envelope/env:Body/n0:Zw12FmWsGetErrorLogResponse/EtReturn").item.Message;
	            
	            if(Type=="S"){
	            	var length=sap.ui.getCore().getModel("mTablesError").getProperty("/env:Envelope/env:Body/n0:Zw12FmWsGetErrorLogResponse/ImOutLogError/item").length;	            
		            
		            if(length==undefined){
		            	
		            	var mData=sap.ui.getCore().getModel("mTablesError").getProperty("/env:Envelope/env:Body/n0:Zw12FmWsGetErrorLogResponse/ImOutLogError/item");
		            	mData.No=1;
		            	sap.ui.getCore().getModel("mTablesError").setData({ERROR:[mData]});//revisar datos
			            sap.ui.getCore().getModel("mTablesError").refresh();
		            }else{
		            	var mData=sap.ui.getCore().getModel("mTablesError").getProperty("/env:Envelope/env:Body/n0:Zw12FmWsGetErrorLogResponse/ImOutLogError/item");
		            	
		            	for(i=0;i<mData.length;i++){
		            		mData[i].No=i+1;
		            	}
		            	
		            	sap.ui.getCore().getModel("mTablesError").setData({ERROR:mData});//revisar datos
			            sap.ui.getCore().getModel("mTablesError").refresh();
		            }
	            }else{
	            	oCnt_FHelps.f_showMessage("INFORMATION", Message, undefined, oCnt_FHelps.f_readTranslate("Error.title") );
	            }
	            oBusyDialog.close();
	        }
	        function OnError(request, status, error)  //Función que se ejecuta si ocurre algún error
	        {
	            oCnt_FHelps.f_showMessage("ERROR", error);
	        }
		},
		
		oServ_ListarDetallePagos : function(oObject) {
			
			var soapMessage = '<soap:Envelope xmlns:soap="http://www.w3.org/2003/05/soap-envelope" xmlns:urn="urn:sap-com:document:sap:soap:functions:mc-style">';
			soapMessage=soapMessage+'<soap:Header/>';
			soapMessage=soapMessage+'<soap:Body>';
			soapMessage=soapMessage+'<urn:Zw12FmWsGetPayments>';
			soapMessage=soapMessage+'<ExInPaymentData>';
			soapMessage=soapMessage+'<Bukrs>'+oObject.Bukrs+'</Bukrs>';
			soapMessage=soapMessage+'<Belnr>'+oObject.Belnr+'</Belnr>';
			soapMessage=soapMessage+'<Gjahr>'+oObject.Gjahr+'</Gjahr>';
			soapMessage=soapMessage+'</ExInPaymentData>';
			soapMessage=soapMessage+'</urn:Zw12FmWsGetPayments>';
			soapMessage=soapMessage+'</soap:Body>';
			soapMessage=soapMessage+'</soap:Envelope>';
		     
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
	        	sap.ui.getCore().getModel("mTablesDetallePago").setData(json);
	        	
	        	var Type=sap.ui.getCore().getModel("mTablesDetallePago").getProperty("/env:Envelope/env:Body/n0:Zw12FmWsGetPaymentsResponse/EtReturn").item.Type;
	            var Message=sap.ui.getCore().getModel("mTablesDetallePago").getProperty("/env:Envelope/env:Body/n0:Zw12FmWsGetPaymentsResponse/EtReturn").item.Message;
	            
	            if(Type=="S"){
	            	var length=sap.ui.getCore().getModel("mTablesDetallePago").getProperty("/env:Envelope/env:Body/n0:Zw12FmWsGetPaymentsResponse/ImOutPaymentData/item").length;	            
		            
		            if(length==undefined){
		            	
		            	var mData=sap.ui.getCore().getModel("mTablesDetallePago").getProperty("/env:Envelope/env:Body/n0:Zw12FmWsGetPaymentsResponse/ImOutPaymentData/item");
		            	mData.No=1;
		            	sap.ui.getCore().getModel("mTablesDetallePago").setData({DOC_PAGO:[mData]});//revisar datos
			            sap.ui.getCore().getModel("mTablesDetallePago").refresh();
		            }else{
		            	var mData=sap.ui.getCore().getModel("mTablesDetallePago").getProperty("/env:Envelope/env:Body/n0:Zw12FmWsGetPaymentsResponse/ImOutPaymentData/item");
		            	
		            	for(i=0;i<mData.length;i++){
		            		mData[i].No=i+1;
		            	}
		            	
		            	sap.ui.getCore().getModel("mTablesDetallePago").setData({DOC_PAGO:mData});//revisar datos
			            sap.ui.getCore().getModel("mTablesDetallePago").refresh();
		            }
	            }else{
	            	oCnt_FHelps.f_showMessage("INFORMATION", Message, undefined, oCnt_FHelps.f_readTranslate("Error.title") );
	            }
	            
	            oBusyDialog.close();
	            
	        }
	        function OnError(request, status, error)  //Función que se ejecuta si ocurre algún error
	        {
	            oCnt_FHelps.f_showMessage("ERROR", error);
	        }
		},
		
		oServ_ListarDocumentosRelacionados : function(oObject) {
			var soapMessage = '<soap:Envelope xmlns:soap="http://www.w3.org/2003/05/soap-envelope" xmlns:urn="urn:sap-com:document:sap:soap:functions:mc-style">';
			soapMessage=soapMessage+'<soap:Header/>';
			soapMessage=soapMessage+'<soap:Body>';
			soapMessage=soapMessage+'<urn:Zw12FmWsGetLinkedDocs>';
			soapMessage=soapMessage+'<ExInLinkedDocs>';
			soapMessage=soapMessage+'<Bukrs>'+oObject.Bukrs+'</Bukrs>';
			soapMessage=soapMessage+'<Belnr>'+oObject.Belnr+'</Belnr>';
			soapMessage=soapMessage+'<Gjahr>'+oObject.Gjahr+'</Gjahr>';
			soapMessage=soapMessage+'<IdDocpay>'+oObject.IdDocpay+'</IdDocpay>';
			soapMessage=soapMessage+'</ExInLinkedDocs>';
			soapMessage=soapMessage+'</urn:Zw12FmWsGetLinkedDocs>';
			soapMessage=soapMessage+'</soap:Body>';
			soapMessage=soapMessage+'</soap:Envelope>';
		     
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
	        	sap.ui.getCore().getModel("mTablesDocumentosRelac").setData(json);
	            
	        	var Type=sap.ui.getCore().getModel("mTablesDocumentosRelac").getProperty("/env:Envelope/env:Body/n0:Zw12FmWsGetLinkedDocsResponse/EtReturn").item.Type;
	            var Message=sap.ui.getCore().getModel("mTablesDocumentosRelac").getProperty("/env:Envelope/env:Body/n0:Zw12FmWsGetLinkedDocsResponse/EtReturn").item.Message;
	            
	        	if(Type=="S"){
	        		var length=sap.ui.getCore().getModel("mTablesDocumentosRelac").getProperty("/env:Envelope/env:Body/n0:Zw12FmWsGetLinkedDocsResponse/ImOutLinkedDocs/item").length;
		            
		            if(length==undefined){
		            	
		            	var mData=sap.ui.getCore().getModel("mTablesDocumentosRelac").getProperty("/env:Envelope/env:Body/n0:Zw12FmWsGetLinkedDocsResponse/ImOutLinkedDocs/item");
		            	mData.No=1;
		            	sap.ui.getCore().getModel("mTablesDocumentosRelac").setData({DOC_RELAC:[mData]});//revisar datos
			            sap.ui.getCore().getModel("mTablesDocumentosRelac").refresh();
		            }else{
		            	var mData=sap.ui.getCore().getModel("mTablesDocumentosRelac").getProperty("/env:Envelope/env:Body/n0:Zw12FmWsGetLinkedDocsResponse/ImOutLinkedDocs/item");
		            	
		            	for(i=0;i<mData.length;i++){
		            		mData[i].No=i+1;
		            	}
		            	
		            	sap.ui.getCore().getModel("mTablesDocumentosRelac").setData({DOC_RELAC:mData});//revisar datos
			            sap.ui.getCore().getModel("mTablesDocumentosRelac").refresh();
		            }
	            }else{
	            	oCnt_FHelps.f_showMessage("INFORMATION", Message, undefined, oCnt_FHelps.f_readTranslate("Error.title") );
	            }
	            
	        	oBusyDialog.close();
	        }
	        function OnError(request, status, error)  //Función que se ejecuta si ocurre algún error
	        {
	            oCnt_FHelps.f_showMessage("ERROR", error);
	        }
		},
				
	});

});