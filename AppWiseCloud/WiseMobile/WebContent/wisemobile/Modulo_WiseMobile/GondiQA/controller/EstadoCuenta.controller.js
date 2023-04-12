var oCtrl_EstadoCuenta_Gondi;
var EstadoCuenta_Gondi_flag = false;

sap.ui.define(["jquery.sap.global", "sap/ui/core/mvc/Controller", "sap/m/MessageBox", "sap/ui/model/Filter", "sap/ui/model/FilterOperator", "sap/m/TablePersoController"], 
		function(jQuery, Controller, MessageBox, Filter, FilterOperator, TablePersoController) {
	
	var oView;

	return Controller.extend("com.axiomasoluciones.wisemobile.Modulo_WiseMobile.GondiQA.controller.EstadoCuenta", {

		onInit : function() {
			oCtrl_EstadoCuenta_Gondi = this;
   			oView = this.getView();
			
			console.log("onInit called - com.axiomasoluciones.wisemobile.Modulo_WiseMobile.GondiQA.controller.EstadoCuenta");

			this.f_createAllFiltersPanel();
	        
	        sap.ui.core.UIComponent.getRouterFor(this).attachRouteMatched(function(oEvent) {
	        	var sRoute = oEvent.getParameter("name");
	        	
	        	if ("EstadoCuenta_Gondi" === sRoute) {
	        		
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
		
		onAfterRendering : function(oEvt) {
			
			// LIMPIAR MONITOR DE BUSQUEDA (EN CASO LO HALLA)
			oCnt_FHelps.f_LimpiarMonitorBusq(this);
			if(EstadoCuenta_Gondi_flag == true)
				return;
			
			EstadoCuenta_Gondi_flag = true;
			
   			var oTableID_1 = oView.byId("idTablePartidasAbiertas");
   			// Hidden/view Columns
   			DemoPersoService.setMyPersData( oTableID_1 );
   			
   			// init and activate controller
			this._oTPC_1 = new TablePersoController({
				table: oTableID_1,
				//specify the first part of persistence ids e.g. 'demoApp-productsTable-dimensionsCol'
				componentName: "demoApp",
				persoService: DemoPersoService,
			}).activate();
			

   			var oTableID_2 = oView.byId("idTablePartidasCompensadas");
   			// Hidden/view Columns
   			DemoPersoService.setMyPersData( oTableID_2, "EstadoCuenta_Gondi", 10);
   			
   			// init and activate controller
			this._oTPC_2 = new TablePersoController({
				table: oTableID_2,
				//specify the first part of persistence ids e.g. 'demoApp-productsTable-dimensionsCol'
				componentName: "demoApp",
				persoService: DemoPersoService,
			}).activate();
   		},
   		
   		onPersoPress: function(oEvt) {
			var oTable = oEvt.getSource().getParent().getParent();
   			
			if(oTable.getId().indexOf("idTablePartidasAbiertas") != -1 )
				this._oTPC_1.openDialog();
			else if(oTable.getId().indexOf("idTablePartidasCompensadas") != -1 )
				this._oTPC_2.openDialog();
		},

		createContent : function() {
			console.log('createContent called -  com.axiomasoluciones.wisemobile.Modulo_WiseMobile.GondiQA.controller.EstadoCuenta');
		},
		
		f_createAllFiltersPanel: function(oEvt){
			oC_Modulo_WiseMobile.f_createFilterPanel("ESTADOCUENTA", oCtrl_EstadoCuenta_Gondi, "idPage", 1);
			//
			var oWorkTo = "PartidasAbiertas";
			oView.byId("idCountTable" + oWorkTo).setText("(0)");
			var oTable = oView.byId("idTable" + oWorkTo);
			oTable.setGrowingThreshold(5);
			oTable.bindItems({
		        path: "mTables>/XXX",
		        template: oTable.getBindingInfo("items").template
		    });
			//
			oWorkTo = "PartidasCompensadas";
			oView.byId("idCountTable" + oWorkTo).setText("(0)");
			var oTable = oView.byId("idTable" + oWorkTo);
			oTable.setGrowingThreshold(5);
			oTable.bindItems({
		        path: "mTables>/XXX",
		        template: oTable.getBindingInfo("items").template
		    });
			//

			var oBtn1 = new sap.m.Button({ text:"{i18n>Conforme}" });
			var oBtn2 = new sap.m.Button({ text:"{i18n>Conforme}" });
			
			//oView.byId("idPage").getContent()[0].getHeaderToolbar().addContent(oBtn1);
			//oView.byId("idPage").getContent()[0].getHeaderToolbar().addContent(oBtn2);
			
			return true;
		},

		f_bindTable: function(oEvt){
			
			var oWorkTo = "PartidasAbiertas";
			var oCount = oCore.getModel("mTables").getProperty("/"+oWorkTo.toUpperCase()).length;
			oView.byId("idCountTable" + oWorkTo).setText("("+oCount+")");
			var oTable = oView.byId("idTable" + oWorkTo);
			oTable.setGrowingThreshold(5);
			oTable.bindItems({
		        path: "mTables>/"+oWorkTo.toUpperCase(),
		        template: oTable.getBindingInfo("items").template
		    });
			//
			oWorkTo = "PartidasCompensadas";
			var oCount = oCore.getModel("mTables").getProperty("/"+oWorkTo.toUpperCase()).length;
			oView.byId("idCountTable" + oWorkTo).setText("("+oCount+")");
			var oTable = oView.byId("idTable" + oWorkTo);
			oTable.setGrowingThreshold(5);
			oTable.bindItems({
		        path: "mTables>/"+oWorkTo.toUpperCase(),
		        template: oTable.getBindingInfo("items").template
		    });
			
			return true;
		},

		onSettingsTable: function(oEvt){
			var oTable = oEvt.getSource().getParent().getParent();
			var oNameModel = oTable.getBindingInfo("items").model; // "mTables"
			var oModel = oCore.getModel( oNameModel );
			var oPath = oTable.getBindingInfo("items").path;
			var oPosCountT = oTable.getHeaderToolbar().getContent().length-1;
			var oCountTable = oTable.getHeaderToolbar().getContent()[oPosCountT];
			
			var aCampos = [ 
				{key : "Importe",   text : oCnt_FHelps.f_readTranslate("EstadoCuenta_Gondi.Table.1.Column.7")}, 
				{key : "Moneda", text : oCnt_FHelps.f_readTranslate("EstadoCuenta_Gondi.Table.1.Column.8")}, 
				{key : "DocCompensacion", text : oCnt_FHelps.f_readTranslate("EstadoCuenta_Gondi.Table.1.Column.9")}, 
				{key : "FechaCompensacion", text : oCnt_FHelps.f_readTranslate("EstadoCuenta_Gondi.Table.1.Column.10")}
			];
			
			var aVSFItems = [];
			
			for (var i = 0; i < aCampos.length; i++) {
				var itemTemplate = new sap.m.ViewSettingsItem({text:"{mTables>"+aCampos[i].key+"}", key:"{mTables>"+aCampos[i].key+"}"});
				
				var viewSettingsFilterItem = new sap.m.ViewSettingsFilterItem({
					text: aCampos[i].text,
					key: aCampos[i].key,
					multiSelect:false
				});
				
				viewSettingsFilterItem.setModel(oModel,"mTables");
				viewSettingsFilterItem.bindAggregation("items","mTables>"+oPath,itemTemplate);
				
				aVSFItems.push(viewSettingsFilterItem);
			}
			
			var viewSettings = new sap.m.ViewSettingsDialog({
				title: oCnt_FHelps.f_readTranslate("ViewSettings.Dialog.Title"),
				filterSearchOperator:"Contains",
				confirm: function(oEvent){
					var mParams = oEvent.getParameters(),
						oBinding = oTable.getBinding("items"),
						sPath,
						bDescending,
						aSorters = [],
						aFilters = [];

					sPath = mParams.sortItem.getKey();
					bDescending = mParams.sortDescending;
					aSorters.push(new sap.ui.model.Sorter(sPath, bDescending));

					// apply the selected sort and group settings
					oBinding.sort(aSorters);
					
					//Para filtros locales
					
					mParams.filterItems.forEach(function(oItem) {
						var oValue = oItem.getKey(),
							oKey = oItem.getParent().getKey(),
							oFilter = new Filter(oKey, "EQ", oValue);
						aFilters.push(oFilter);
					});

					// apply filter settings
					oBinding.filter(aFilters);
					
					oCountTable.setText("("+oBinding.aIndices.length+")");
					//oCtrl_Datos_Maestros.byId("idCountTableClientes").setText("("+oBinding.aIndices.length+")");
				},
				sortItems: [
					new sap.m.ViewSettingsItem({text: oCnt_FHelps.f_readTranslate("EstadoCuenta_Gondi.Table.1.Column.1"), key:"NoDocumento", selected:true}),
					new sap.m.ViewSettingsItem({text: oCnt_FHelps.f_readTranslate("EstadoCuenta_Gondi.Table.1.Column.3"), key:"ClaseDocumento"}),
				],
				
				filterItems:[
					aVSFItems
				]
			});
			
			viewSettings.open();
		},
		
		onPressExportar: function(oEvt){
			var oTableId = "idTablePartidasAbiertas";
			
			oCnt_FHelps.f_ExportarXLSX(oTableId, oView);
		}
		
	});

});