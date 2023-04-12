var oCtrl_ListadoFacturas;
var ListadoFacturas_flag = false;

sap.ui.define(["jquery.sap.global", "sap/ui/core/mvc/Controller", "sap/m/MessageBox", "sap/ui/model/Filter", 
	"sap/ui/model/FilterOperator", "sap/m/TablePersoController",'sap/m/MessageToast'], 
		function(jQuery, Controller, MessageBox, Filter, FilterOperator, TablePersoController,MessageToast) {

	var oView;

	return Controller.extend("com.axiomasoluciones.wisemobile.Modulo_WiseMobile.GondiQA.controller.ListadoFacturas", {

		onInit : function() {
			oCtrl_ListadoFacturas = this;
   			oView = this.getView();
			
			console.log("onInit called - com.axiomasoluciones.wisemobile.Modulo_WiseMobile.GondiQA.controller.ListadoFacturas");
			
			this.f_createAllFiltersPanel();
	        
			sap.ui.core.UIComponent.getRouterFor(this).attachRouteMatched(function(oEvent) {
	        	var sRoute = oEvent.getParameter("name");
	        	
	        	if ("ListadoFacturas" === sRoute) {
	        		
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
			console.log('createContent called -  com.axiomasoluciones.wisemobile.Modulo_WiseMobile.GondiQA.controller.ListadoFacturas');
		},
		
		f_createAllFiltersPanel: function(oEvt){
			oC_Modulo_WiseMobile.f_createFilterPanel("LISTADOFACTURA", oCtrl_ListadoFacturas, "idPage", 3);
		},
		
		onAfterRendering: function(oEvt) {
			
			// LIMPIAR MONITOR DE BUSQUEDA (EN CASO LO HALLA)
			oCnt_FHelps.f_LimpiarMonitorBusq(this);
			if(ListadoFacturas_flag == true)
				return;
			
			ListadoFacturas_flag = true;
				
			var oTableID = oView.byId("idTableListadoFacturas");
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
		
		f_PreparingTableHTMLToExport : function() {
			MessageToast.show(" Descargando..");
			/*var datos = oCore.getModel("mTables").getData().LISTADOFACTURAS;
			
			var d = '<tr>'+
				'<th>TipoSolicitudDsc</th>'+
				'<th>Fecha</th>'+
				'<th>ZIDSOLICITUD</th>'+
				'</tr>';
			
			var d = '<tr>';
			for(var i=1; i<=8;i++){
				d = d + '<th>'+oCnt_FHelps.f_readTranslate("ListadoFacturas.Monitor.Table.Column."+i)+'</th>';
			}
			d = d + '</tr>';

			for (var i = 1; i < datos.length; i++) {
				d+= '<tr>'+
				'<td>'+datos[i].Factura+'</td>'+
				'<td>'+datos[i].NoDoc+'</td>'+
				'<td>'+datos[i].ImporteSinIva+'</td>'+
				'<td>'+datos[i].Moneda+'</td>'+
				'<td>'+datos[i].VenNeto+'</td>'+
				'<td>'+datos[i].FechaPago+'</td>'+
				'<td>'+datos[i].Fecha+'</td>'+
				'<td>'+datos[i].Estado+'</td>'+
				'</tr>';
			}
			$("idVListadoFacturas--idTableListadoFacturas-listUl").append(d);
			
			tableToExcel("idVListadoFacturas--idTableListadoFacturas-listUl", "Hoja 1");*/
		},
		
		
	});

});