/*!
 * UI development toolkit for HTML5 (OpenUI5)
 * (c) Copyright 2009-2016 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */

// Provides control controls.TablePagVRD.
sap.ui.define([
	'jquery.sap.global', 'sap/ui/core/Control', 'sap/ui/core/IntervalTrigger', 'sap/ui/core/ScrollBar', 'sap/ui/core/delegate/ItemNavigation', 'sap/ui/core/theming/Parameters', 'sap/ui/model/SelectionModel', 'sap/ui/model/ChangeReason', './Row', './library', 'sap/ui/core/IconPool', 'jquery.sap.dom'
], function(q, C, I, S, a, P, b, c, R, d, e) {
    //"use strict";
	/**
	 * Constructor for a new Table.
	 *
	 * @param {string} [sId] ID for the new control, generated automatically if no ID is given
	 * @param {object} [mSettings] initial settings for the new control
	 * @class The P13nFilterPanel control is used to define filter-specific settings for table personalization.
	 * @extends sap.ui.table.Table
	 * @version 1.36.15
	 * @constructor
	 * @public
	 * @since 1.26.0
	 * @alias controls.TablePagVRD
	 * @ui5-metamodel This control/element also will be described in the UI5 (legacy) designtime metamodel
	 */
    
    var style=document.createElement("link");
    style.rel="stylesheet";
    style.type="text/css";
    style.href="wisemobile/Public/LibControls/TablePag/library.css";
    document.head.appendChild(style);
    
    var T = C.extend('controls.TablePagVRD', {
        metadata: {
            library: 'sap.ui.table',
            properties: {
                width: {
                    type: 'sap.ui.core.CSSSize',
                    group: 'Dimension',
                    defaultValue: 'auto'
                },
                rowHeight: {
                    type: 'int',
                    group: 'Appearance',
                    defaultValue: null
                },
                columnHeaderHeight: {
                    type: 'int',
                    group: 'Appearance',
                    defaultValue: null
                },
                columnHeaderVisible: {
                    type: 'boolean',
                    group: 'Appearance',
                    defaultValue: true
                },
                visibleRowCount: {
                    type: 'int',
                    group: 'Appearance',
                    defaultValue: 10
                },
                firstVisibleRow: {
                    type: 'int',
                    group: 'Appearance',
                    defaultValue: 0
                },
                selectionMode: {
                    type: 'sap.ui.table.SelectionMode',
                    group: 'Behavior',
                    defaultValue: sap.ui.table.SelectionMode.Multi
                },
                selectionBehavior: {
                    type: 'sap.ui.table.SelectionBehavior',
                    group: 'Behavior',
                    defaultValue: sap.ui.table.SelectionBehavior.RowSelector
                },
                selectedIndex: {
                    type: 'int',
                    group: 'Appearance',
                    defaultValue: -1
                },
                editable: {
                    type: 'boolean',
                    group: 'Behavior',
                    defaultValue: true
                },
                navigationMode: {
                    type: 'sap.ui.table.NavigationMode',
                    group: 'Behavior',
                    defaultValue: sap.ui.table.NavigationMode.Scrollbar
                },
                threshold: {
                    type: 'int',
                    group: 'Appearance',
                    defaultValue: 100
                },
                enableColumnReordering: {
                    type: 'boolean',
                    group: 'Behavior',
                    defaultValue: true
                },
                enableGrouping: {
                    type: 'boolean',
                    group: 'Behavior',
                    defaultValue: false
                },
                showColumnVisibilityMenu: {
                    type: 'boolean',
                    group: 'Appearance',
                    defaultValue: false
                },
                showNoData: {
                    type: 'boolean',
                    group: 'Appearance',
                    defaultValue: true
                },
                visibleRowCountMode: {
                    type: 'sap.ui.table.VisibleRowCountMode',
                    group: 'Appearance',
                    defaultValue: sap.ui.table.VisibleRowCountMode.Fixed
                },
                minAutoRowCount: {
                    type: 'int',
                    group: 'Appearance',
                    defaultValue: 5
                },
                fixedColumnCount: {
                    type: 'int',
                    group: 'Appearance',
                    defaultValue: 0
                },
                fixedRowCount: {
                    type: 'int',
                    group: 'Appearance',
                    defaultValue: 0
                },
                fixedBottomRowCount: {
                    type: 'int',
                    group: 'Appearance',
                    defaultValue: 0
                },
                enableColumnFreeze: {
                    type: 'boolean',
                    group: 'Behavior',
                    defaultValue: false
                },
                enableCellFilter: {
                    type: 'boolean',
                    group: 'Behavior',
                    defaultValue: false
                },
                showOverlay: {
                    type: 'boolean',
                    group: 'Appearance',
                    defaultValue: false
                },
                enableSelectAll: {
                    type: 'boolean',
                    group: 'Behavior',
                    defaultValue: true
                },
                enableCustomFilter: {
                    type: 'boolean',
                    group: 'Behavior',
                    defaultValue: false
                },
                enableBusyIndicator: {
                    type: 'boolean',
                    group: 'Behavior',
                    defaultValue: false
                },
                allowColumnReordering: {
                    type: 'boolean',
                    group: 'Behavior',
                    defaultValue: true,
                    deprecated: true
                },
                noDataText: {
                    type: 'string',
                    group: 'Appearance',
                    defaultValue: null,
                    deprecated: true
                }
            },
            defaultAggregation: 'columns',
            aggregations: {
                title: {
                    type: 'sap.ui.core.Control',
                    altTypes: ['string'],
                    multiple: false
                },
                footer: {
                    type: 'sap.ui.core.Control',
                    altTypes: ['string'],
                    multiple: false
                },
                toolbar: {
                    type: 'sap.ui.core.Toolbar',
                    multiple: false
                },
                extension: {
                    type: 'sap.ui.core.Control',
                    multiple: true,
                    singularName: 'extension'
                },
                columns: {
                    type: 'sap.ui.table.Column',
                    multiple: true,
                    singularName: 'column',
                    bindable: 'bindable'
                },
                rows: {
                    type: 'sap.ui.table.Row',
                    multiple: true,
                    singularName: 'row',
                    bindable: 'bindable'
                },
                noData: {
                    type: 'sap.ui.core.Control',
                    altTypes: ['string'],
                    multiple: false
                }
            },
            associations: {
                groupBy: {
                    type: 'sap.ui.table.Column',
                    multiple: false
                }
            },
            events: {
                rowSelectionChange: {
                    parameters: {
                        rowIndex: {
                            type: 'int'
                        },
                        rowContext: {
                            type: 'object'
                        },
                        rowIndices: {
                            type: 'int[]'
                        },
                        userInteraction: {
                            type: 'boolean'
                        }
                    }
                },
                columnSelect: {
                    allowPreventDefault: true,
                    parameters: {
                        column: {
                            type: 'sap.ui.table.Column'
                        }
                    }
                },
                columnResize: {
                    allowPreventDefault: true,
                    parameters: {
                        column: {
                            type: 'sap.ui.table.Column'
                        },
                        width: {
                            type: 'sap.ui.core.CSSSize'
                        }
                    }
                },
                columnMove: {
                    allowPreventDefault: true,
                    parameters: {
                        column: {
                            type: 'sap.ui.table.Column'
                        },
                        newPos: {
                            type: 'int'
                        }
                    }
                },
                sort: {
                    allowPreventDefault: true,
                    parameters: {
                        column: {
                            type: 'sap.ui.table.Column'
                        },
                        sortOrder: {
                            type: 'sap.ui.table.SortOrder'
                        },
                        columnAdded: {
                            type: 'boolean'
                        }
                    }
                },
                filter: {
                    allowPreventDefault: true,
                    parameters: {
                        column: {
                            type: 'sap.ui.table.Column'
                        },
                        value: {
                            type: 'string'
                        }
                    }
                },
                group: {
                    allowPreventDefault: true,
                    parameters: {
                        column: {
                            type: 'sap.ui.table.Column'
                        }
                    }
                },
                columnVisibility: {
                    allowPreventDefault: true,
                    parameters: {
                        column: {
                            type: 'sap.ui.table.Column'
                        },
                        visible: {
                            type: 'boolean'
                        }
                    }
                },
                cellClick: {
                    allowPreventDefault: true,
                    parameters: {
                        cellControl: {
                            type: 'sap.ui.core.Control'
                        },
                        cellDomRef: {
                            type: 'Object'
                        },
                        rowIndex: {
                            type: 'int'
                        },
                        columnIndex: {
                            type: 'int'
                        },
                        columnId: {
                            type: 'string'
                        },
                        rowBindingContext: {
                            type: 'sap.ui.model.Context'
                        }
                    }
                },
                cellContextmenu: {
                    allowPreventDefault: true,
                    parameters: {
                        cellControl: {
                            type: 'sap.ui.core.Control'
                        },
                        cellDomRef: {
                            type: 'Object'
                        },
                        rowIndex: {
                            type: 'int'
                        },
                        columnIndex: {
                            type: 'int'
                        },
                        columnId: {
                            type: 'string'
                        },
                        rowBindingContext: {
                            type: 'sap.ui.model.Context'
                        }
                    }
                },
                columnFreeze: {
                    allowPreventDefault: true,
                    parameters: {
                        column: {
                            type: 'sap.ui.table.Column'
                        }
                    }
                },
                customFilter: {
                    column: {
                        type: 'sap.ui.table.Column'
                    },
                    value: {
                        type: 'string'
                    }
                }
            }
        },
		renderer: function(r, t) {
        	this.renderHeader = function(r, t, o) {
                r.write('<div');
                r.addClass('sapUiTableHdr');
                r.writeClasses();
                if (t._bAccMode) {
                    r.writeAttribute('role', 'heading');
                    r.writeAttribute('data-sap-ui-table-acc-covered', 'overlay,nodata');
                }
                r.write('>');
                r.renderControl(o);
                r.write('</div>');
            };
            this.renderToolbar = function(r, t, o) {
                r.write('<div');
                r.addClass('sapUiTableTbr');
                if (typeof o.getStandalone !== 'function') {
                    r.addClass('sapUiTableMTbr');
                }
                r.writeClasses();
                r.write('>');
                if (typeof o.getStandalone === 'function' && o.getStandalone()) {
                    o.setStandalone(false);
                }
                if (sap.m && sap.m.Toolbar && o instanceof sap.m.Toolbar) {
                    o.setDesign(P.get('sapUiTableToolbarDesign'), true);
                }
                r.renderControl(o);
                r.write('</div>');
            };
            this.renderExtensions = function(r, t, e) {
                for (var i = 0, l = e.length; i < l; i++) {
                    this.renderExtension(r, t, e[i]);
                }
            };
            this.renderExtension = function(r, t, e) {
                r.write('<div');
                r.addClass('sapUiTableExt');
                r.writeClasses();
                r.write('>');
                r.renderControl(e);
                r.write('</div>');
            };
            this.renderTable = function(r, t) {
                r.write('<div');
                r.addClass('sapUiTableCCnt');
                r.writeClasses();
                r.write('>');
                r.write('<div');
                r.addClass('sapUiTableCtrlBefore');
                r.writeClasses();
                r.writeAttribute('tabindex', '0');
                r.write('></div>');
                this.renderRowHdr(r, t);
                this.renderTableCtrl(r, t);
                this.renderVSb(r, t);
                r.write('</div>');
                this.renderHSb(r, t);
            };
            this.renderFooter = function(r, t, f) {
                r.write('<div');
                r.addClass('sapUiTableFtr');
                r.writeClasses();
                r.write('>');
                r.renderControl(f);
                r.write('</div>');
            };
            this.renderVariableHeight = function(r, t) {
                r.write('<div id="' + t.getId() + '-sb" tabIndex="-1"');
                r.addClass('sapUiTableSplitterBar');
                r.addStyle('height', '5px');
                r.writeClasses();
                r.writeStyles();
                r.write('>');
                r.write('</div>');
            };
            this.renderColHdr = function(r, t) {
                r.write('<div');
                r.addClass('sapUiTableColHdrCnt');
                r.writeClasses();
                if (t.getColumnHeaderHeight() > 0) {
                    r.addStyle('height', (t.getColumnHeaderHeight() * t._getHeaderRowCount()) + 'px');
                }
                if (t._bAccMode && (t.getSelectionMode() === sap.ui.table.SelectionMode.None || t.getSelectionBehavior() === sap.ui.table.SelectionBehavior.RowOnly)) {
                    r.writeAttribute('role', 'row');
                }
                r.writeStyles();
                r.write('>');
                this.renderColRowHdr(r, t);
                var c = t.getColumns();
                if (t.getFixedColumnCount() > 0) {
                    r.write('<div');
                    r.addClass('sapUiTableColHdrFixed');
                    r.writeClasses();
                    r.write('>');
                    for (var h = 0; h < t._getHeaderRowCount(); h++) {
                        r.write('<div');
                        r.addClass('sapUiTableColHdr');
                        r.writeClasses();
                        r.addStyle('min-width', t._getColumnsWidth(0, t.getFixedColumnCount()) + 'px');
                        r.writeStyles();
                        r.write('>');
                        var s = 1;
                        for (var i = 0, l = t.getFixedColumnCount(); i < l; i++) {
                            if (c[i] && c[i].shouldRender()) {
                                if (s <= 1) {
                                    this.renderCol(r, t, c[i], i, h);
                                    var H = c[i].getHeaderSpan();
                                    if (q.isArray(H)) {
                                        s = c[i].getHeaderSpan()[h] + 1;
                                    } else {
                                        s = parseInt(c[i].getHeaderSpan(), 10) + 1;
                                    }
                                } else {
                                    this.renderCol(r, t, c[i], i, h, true);
                                }
                                if (h == 0) {
                                    this.renderColRsz(r, t, c[i], i);
                                }
                                s--;
                            }
                        }
                        r.write("<p style=\"clear: both;\"></p>");
                        r.write('</div>');
                    }
                    r.write('</div>');
                }
                r.write('<div');
                r.addClass('sapUiTableColHdrScr');
                r.writeClasses();
                if (t.getFixedColumnCount() > 0) {
                    if (t._bRtlMode) {
                        r.addStyle('margin-right', '0');
                    } else {
                        r.addStyle('margin-left', '0');
                    }
                    r.writeStyles();
                }
                r.write('>');
                for (var h = 0; h < t._getHeaderRowCount(); h++) {
                    r.write('<div');
                    r.addClass('sapUiTableColHdr');
                    r.writeClasses();
                    r.addStyle('min-width', t._getColumnsWidth(t.getFixedColumnCount(), c.length) + 'px');
                    r.writeStyles();
                    r.write('>');
                    var s = 1;
                    for (var i = t.getFixedColumnCount(), l = c.length; i < l; i++) {
                        if (c[i].shouldRender()) {
                            if (s <= 1) {
                                this.renderCol(r, t, c[i], i, h);
                                var H = c[i].getHeaderSpan();
                                if (q.isArray(H)) {
                                    s = c[i].getHeaderSpan()[h] + 1;
                                } else {
                                    s = parseInt(c[i].getHeaderSpan(), 10) + 1;
                                }
                            } else {
                                this.renderCol(r, t, c[i], i, h, true);
                            }
                            if (h == 0) {
                                this.renderColRsz(r, t, c[i], i);
                            }
                            s--;
                        }
                    }
                    r.write("<p style=\"clear: both;\"></p>");
                    r.write('</div>');
                }
                r.write('</div>');
                r.write('</div>');
            };
            this.renderAriaAttributes = function(r, a, A) {
                if (A) {
                    for (var k in a) {
                        var m = a[k];
                        if (m.escaped) {
                            r.writeAttributeEscaped(k, m.value);
                        } else {
                            r.writeAttribute(k, m.value);
                        }
                    }
                }
            };
            this.getAriaAttributesForRowHdr = function(t) {
                return {
                    'aria-label': {
                        //value: t._oResBundle.getText('TBL_SELECT_ALL_KEY'),
                    	value: t._oResBundle.getText('TBL_ROW_SELECT_KEY')+" / "+t._oResBundle.getText('TBL_ROW_DESELECT_KEY'),
                        escaped: true
                    }
                };
            };
            this.renderColRowHdr = function(r, t) {
                r.write('<div');
                r.writeAttribute('id', t.getId() + '-selall');
                var s = t.getSelectionMode();
                if ((s == 'Multi' || s == 'MultiToggle') && t.getEnableSelectAll()) {
                    r.writeAttributeEscaped('title', t._oResBundle.getText('TBL_SELECT_ALL'));
                    if (t._getSelectableRowCount() == 0 || t._getSelectableRowCount() !== t.getSelectedIndices().length) {
                        r.addClass('sapUiTableSelAll');
                    }
                    r.addClass('sapUiTableSelAllEnabled');
                }
                r.addClass('sapUiTableColRowHdr');
                r.writeClasses();
                r.writeAttribute('tabindex', '-1');
                var a = this.getAriaAttributesForRowHdr(t);
                this.renderAriaAttributes(r, a, t._bAccMode);
                r.write('>');
                if (t.getSelectionMode() !== sap.ui.table.SelectionMode.Single) {
                    r.write('<div');
                    r.addClass('sapUiTableColRowHdrIco');
                    r.writeClasses();
                    if (t.getColumnHeaderHeight() > 0) {
                        r.addStyle('height', t.getColumnHeaderHeight() + 'px');
                    }
                    r.write('>');
                    r.write('</div>');
                }
                r.write('</div>');
            };
            this.getAriaAttributesForCol = function(t, c, C) {
                var a = {};
                if (c._menuHasItems()) {
                    a['aria-haspopup'] = {
                        value: 'true'
                    };
                }
                a.role = {
                    value: 'columnheader'
                };
                if (C < t.getFixedColumnCount()) {
                    a['aria-labelledby'] = {
                        value: c.getId() + ' ' + t.getId() + '-ariafixedcolumn'
                    };
                }
                return a;
            };
            this.renderCol = function(r, t, c, i, h, I) {
                var l;
                if (c.getMultiLabels().length > 0) {
                    l = c.getMultiLabels()[h];
                } else if (h == 0) {
                    l = c.getLabel();
                }
                r.write('<div');
                if (h === 0) {
                    r.writeElementData(c);
                } else {
                    r.writeAttribute('id', c.getId() + '_' + h);
                }
                r.writeAttribute('data-sap-ui-colid', c.getId());
                r.writeAttribute('data-sap-ui-colindex', i);
                r.writeAttribute('tabindex', '-1');
                var a = this.getAriaAttributesForCol(t, c, i);
                this.renderAriaAttributes(r, a, t._bAccMode);
                r.addClass('sapUiTableCol');
                if (t.getFixedColumnCount() === i + 1) {
                    r.addClass('sapUiTableColLastFixed');
                }
                r.writeClasses();
                r.addStyle('width', c.getWidth());
                if (t.getColumnHeaderHeight() > 0) {
                    r.addStyle('height', t.getColumnHeaderHeight() + 'px');
                }
                if (I) {
                    r.addStyle('display', 'none');
                }
                r.writeStyles();
                var s = c.getTooltip_AsString();
                if (s) {
                    r.writeAttributeEscaped('title', s);
                }
                r.write('><div');
                r.addClass('sapUiTableColCell');
                r.writeClasses();
                var H = this.getHAlign(c.getHAlign(), t._bRtlMode);
                if (H) {
                    r.addStyle('text-align', H);
                }
                r.writeStyles();
                r.write('>');
                r.write("<div id=\"" + c.getId() + "-icons\" class=\"sapUiTableColIcons\"></div>");
                if (l) {
                    r.renderControl(l);
                }
                r.write('</div></div>');
            };
            this.renderColRsz = function(r, t, c, i) {
                if (c.getResizable()) {
                    r.write('<div');
                    r.writeAttribute('id', c.getId() + '-rsz');
                    r.writeAttribute('data-sap-ui-colindex', i);
                    r.writeAttribute('tabindex', '-1');
                    r.addClass('sapUiTableColRsz');
                    r.writeClasses();
                    r.addStyle('left', t._bRtlMode ? '99000px' : '-99000px');
                    r.writeStyles();
                    r.write('></div>');
                }
            };
            this.renderRowHdr = function(r, t) {
                r.write('<div');
                r.addClass('sapUiTableRowHdrScr');
                r.writeAttribute('data-sap-ui-table-acc-covered', 'overlay,nodata');
                r.writeClasses();
                r.write('>');
                for (var a = 0, c = t.getRows().length; a < c; a++) {
                    this.renderRowHdrRow(r, t, t.getRows()[a], a);
                }
                r.write('</div>');
            };
            this.getAriaAttributesForRowHdrRow = function(t, r) {
                var a = {
                    'aria-labelledby': {
                        value: t.getId() + '-rownumberofrows ' + r.getId() + '-rowselecttext'
                    }
                };
                var s = t.getSelectionMode();
                if (s !== sap.ui.table.SelectionMode.None) {
                    a['title'] = {
                        value: t._oResBundle.getText('TBL_ROW_SELECT')
                    };
                    a['aria-selected'] = {
                        value: 'false'
                    };
                    if (s === sap.ui.table.SelectionMode.Multi) {
                        if (t.getSelectedIndices().length > 1) {
                            a['aria-label'] = {
                                value: t._oResBundle.getText('TBL_ROW_SELECT_MULTI_KEY')
                            };
                        }
                    } else {
                        a['aria-label'] = {
                            value: t._oResBundle.getText('TBL_ROW_SELECT_KEY')
                        };
                    }
                }
                return a;
            };
            this.renderRowHdrRow = function(r, t, R, i) {
                r.write('<div');
                r.writeAttribute('id', t.getId() + '-rowsel' + i);
                r.writeAttribute('data-sap-ui-rowindex', i);
                r.addClass('sapUiTableRowHdr');
                if (R._bHidden) {
                    r.addClass('sapUiTableRowHidden');
                }
                r.writeClasses();
                if (t.getRowHeight() > 0) {
                    r.addStyle('height', t.getRowHeight() + 'px');
                }
                r.writeAttribute('tabindex', '-1');
                var a = this.getAriaAttributesForRowHdrRow(t, R);
                this.renderAriaAttributes(r, a, t._bAccMode);
                var c = [];
                q.each(R.getCells(), function(I, C) {
                    c.push(R.getId() + '-col' + I);
                });
                r.writeStyles();
                r.write('></div>');
            };
            this.renderTableCtrl = function(r, t) {
                if (t.getFixedColumnCount() > 0) {
                    r.write('<div');
                    r.addClass('sapUiTableCtrlScrFixed');
                    r.writeClasses();
                    r.write('>');
                    this.renderTableControl(r, t, true);
                    r.write('<span');
                    r.writeAttribute('id', t.getId() + '-ariafixedcolumn');
                    r.addStyle('position', 'absolute');
                    r.addStyle('top', '-20000px');
                    r.writeStyles();
                    r.write('>');
                    r.write(t._oResBundle.getText('TBL_FIXED_COLUMN'));
                    r.write('</div>');
                }
                r.write('<div');
                r.addClass('sapUiTableCtrlScr');
                r.writeClasses();
                if (t.getFixedColumnCount() > 0) {
                    if (t._bRtlMode) {
                        r.addStyle('margin-right', '0');
                    } else {
                        r.addStyle('margin-left', '0');
                    }
                    r.writeStyles();
                }
                r.write('>');
                r.write('<div');
                r.addClass('sapUiTableCtrlCnt');
                r.writeClasses();
                r.write('>');
                this.renderTableControl(r, t, false);
                r.write('</div>');
                r.write('<div');
                r.addClass('sapUiTableCtrlAfter');
                r.writeClasses();
                r.writeAttribute('tabindex', '0');
                r.write('></div>');
                r.write('</div>');
                r.write('<div');
                r.addClass('sapUiTableCtrlEmpty');
                r.writeClasses();
                r.writeAttribute('tabindex', '0');
                r.write('>');
                if (t.getNoData() && t.getNoData() instanceof sap.ui.core.Control) {
                    r.renderControl(t.getNoData());
                } else {
                    r.write('<span');
                    r.addClass('sapUiTableCtrlEmptyMsg');
                    r.writeClasses();
                    r.write('>');
                    if (typeof t.getNoData() === 'string' || t.getNoData() instanceof String) {
                        r.writeEscaped(t.getNoData());
                    } else if (t.getNoDataText()) {
                        r.writeEscaped(t.getNoDataText());
                    } else {
                        r.writeEscaped((t._oResBundle.hasText('TBL_NO_DATA')==true)? t._oResBundle.getText('TBL_NO_DATA') : oCnt_FHelps.f_readTranslate("Table-NoDataText") );
                    }
                    r.write('</span>');
                }
                r.write('</div>');
            };
            this.renderTableControl = function(r, t, f) {
                var s, e;
                if (f) {
                    s = 0;
                    e = t.getFixedColumnCount();
                } else {
                    s = t.getFixedColumnCount();
                    e = t.getColumns().length;
                }
                var F = t.getFixedRowCount();
                var i = t.getFixedBottomRowCount();
                var R = t.getRows();
                if (F > 0) {
                    this.renderTableControlCnt(r, t, f, s, e, true, false, 0, F);
                }
                this.renderTableControlCnt(r, t, f, s, e, false, false, F, R.length - i);
                if (i > 0) {
                    this.renderTableControlCnt(r, t, f, s, e, false, true, R.length - i, R.length);
                }
            };
            this.getAriaAttributesForTableControlCntColTh = function(c, h) {
                var a = {
                    'role': {
                        value: 'columnheader'
                    },
                    'scope': {
                        value: 'col'
                    }
                };
                if (h) {
                    a['aria-owns'] = {
                        value: '' + c.getId()
                    };
                    a['aria-labelledby'] = {
                        value: '' + c.getId()
                    };
                }
                return a;
            };
            this.renderTableControlCnt = function(r, t, f, s, e, F, b, S, E) {
                r.write('<table');
                var i = t.getId() + '-table';
                if (f) {
                    i += '-fixed';
                    r.addClass('sapUiTableCtrlFixed');
                } else {
                    r.addClass('sapUiTableCtrlScroll');
                }
                if (F) {
                    i += '-fixrow';
                    r.addClass('sapUiTableCtrlRowFixed');
                } else if (b) {
                    i += '-fixrow-bottom';
                    r.addClass('sapUiTableCtrlRowFixedBottom');
                } else {
                    r.addClass('sapUiTableCtrlRowScroll');
                }
                r.writeAttribute('id', i);
                if (t._bAccMode) {
                    r.writeAttribute('role', 'grid');
                }
                r.addClass('sapUiTableCtrl');
                r.writeClasses();
                r.addStyle('min-width', t._getColumnsWidth(s, e) + 'px');
                if (f && (!!sap.ui.Device.browser.firefox || !!sap.ui.Device.browser.chrome || !!sap.ui.Device.browser.safari)) {
                    r.addStyle('width', t._getColumnsWidth(s, e) + 'px');
                }
                r.writeStyles();
                r.write('>');
                r.write('<thead>');
                r.write('<tr');
                r.addClass('sapUiTableCtrlCol');
                if (S == 0) {
                    r.addClass('sapUiTableCtrlFirstCol');
                }
                r.writeClasses();
                r.write('>');
                var c = t.getColumns();
                if (t.getSelectionMode() !== sap.ui.table.SelectionMode.None && t.getSelectionBehavior() !== sap.ui.table.SelectionBehavior.RowOnly) {
                    r.write('<th');
                    r.addStyle('width', '0px');
                    r.writeStyles();
                    if (S == 0) {
                        var a = this.getAriaAttributesForTableControlCntColTh(C);
                        this.renderAriaAttributes(r, a, t._bAccMode);
                        r.writeAttribute('id', t.getId() + '_colsel');
                    }
                    r.write('></th>');
                } else {
                    if (c.length === 0) {
                        r.write('<th></th>');
                    }
                }
                for (var d = s, g = e; d < g; d++) {
                    var C = c[d];
                    if (C && C.shouldRender()) {
                        r.write('<th');
                        r.addStyle('width', C.getWidth());
                        r.writeStyles();
                        if (S == 0) {
                            var a = this.getAriaAttributesForTableControlCntColTh(C, true);
                            this.renderAriaAttributes(r, a, t._bAccMode);
                            r.writeAttribute('id', t.getId() + '_col' + d);
                        }
                        r.writeAttribute('data-sap-ui-headcolindex', d);
                        r.write('>');
                        if (S == 0 && t._getHeaderRowCount() == 0) {
                            if (C.getMultiLabels().length > 0) {
                                r.renderControl(C.getMultiLabels()[0]);
                            } else {
                                r.renderControl(C.getLabel());
                            }
                        }
                        r.write('</th>');
                    }
                }
                if (!f && t._hasOnlyFixColumnWidths() && c.length > 0) {
                    r.write('<th></th>');
                }
                r.write('</tr>');
                r.write('</thead>');
                r.write('<tbody>');
                var v = t._getVisibleColumns();
                var h = t._hasOnlyFixColumnWidths();
                var R = t.getRows();
                var m = t._getAriaTextsForSelectionMode(true);
                var j = t._getSelectOnCellsAllowed();
                for (var k = S, g = E; k < g; k++) {
                    this.renderTableRow(r, t, R[k], k, f, s, e, false, v, h, m, j);
                }
                r.write('</tbody>');
                r.write('</table>');
            };
            this.getAriaAttributesForRowTr = function(t, r, c) {
                var a = {};
                a['role'] = {
                    value: 'row'
                };
                if (t.getSelectionMode() !== sap.ui.table.SelectionMode.None) {
                    a['aria-selected'] = {
                        value: 'false'
                    };
                }
                return a;
            };
            this.getAriaAttributesForRowTd = function(t, r, R, c) {
                var a = {};
                if (t.getSelectionMode() !== sap.ui.table.SelectionMode.None && t.getSelectionBehavior() !== sap.ui.table.SelectionBehavior.RowOnly) {
                    a['role'] = {
                        value: 'rowheader'
                    };
                } else {
                    if (c.length === 0) {
                        a['role'] = {
                            value: 'gridcell'
                        };
                    }
                }
                a['headers'] = {
                    value: t.getId() + '_colsel'
                };
                a['aria-owns'] = {
                    value: t.getId() + '-rowsel' + R
                };
                a['role'] = {
                    value: 'rowheader'
                };
                if (t.getSelectionMode() !== sap.ui.table.SelectionMode.None) {
                    a['aria-selected'] = {
                        value: 'false'
                    };
                }
                return a;
            };
            this.renderTableRow = function(r, t, R, i, f, s, e, F, v, h, m, S) {
                r.write('<tr');
                r.addClass('sapUiTableTr');
                if (f) {
                    r.writeAttribute('id', R.getId() + '-fixed');
                } else {
                    r.writeElementData(R);
                }
                if (R._bHidden) {
                    r.addClass('sapUiTableRowHidden');
                }
                if (i % 2 === 0) {
                    r.addClass('sapUiTableRowEven');
                } else {
                    r.addClass('sapUiTableRowOdd');
                }
                r.writeClasses();
                r.writeAttribute('data-sap-ui-rowindex', i);
                if (t.getRowHeight() > 0) {
                    r.addStyle('height', t.getRowHeight() + 'px');
                }
                r.writeStyles();
                var a = this.getAriaAttributesForRowTr(t);
                this.renderAriaAttributes(r, a, t._bAccMode);
                r.write('>');
                var c = R.getCells();
                if ((t.getSelectionMode() !== sap.ui.table.SelectionMode.None && t.getSelectionBehavior() !== sap.ui.table.SelectionBehavior.RowOnly) || c.length === 0) {
                    r.write('<td');
                    var a = this.getAriaAttributesForRowTd(t, R, i, c);
                    this.renderAriaAttributes(r, a, t._bAccMode);
                    r.write('>');
                    if (t._bAccMode) {
                        r.write('<div');
                        r.writeAttribute('id', R.getId() + '-rowselecttext');
                        r.addClass('sapUiTableAriaRowSel');
                        r.writeClasses();
                        r.write('>');
                        r.write('</div>');
                    }
                    r.write('</td>');
                }
                for (var b = 0, d = c.length; b < d; b++) {
                    this.renderTableCell(r, t, R, c[b], b, f, s, e, v);
                }
                if (!f && h && c.length > 0) {
                    r.write('<td></td>');
                }
                r.write('</tr>');
                q.sap.delayedCall(0, this, function() {
                    R._updateSelection(t, m, S);
                });
            };
            this.getAriaAttributesForCell = function(t, f, r, c, C, o) {
                var a = {};
                a['headers'] = {
                    value: t.getId() + '_col' + C
                };
                a['role'] = {
                    value: 'gridcell'
                };
                var R = t.getId() + '-rownumberofrows';
                var m = c.getMultiLabels();
                var M = m.length;
                var l = '';
                if (t.getColumnHeaderVisible()) {
                    var s = c.getId();
                    l = s;
                    if (M > 1) {
                        for (var i = 1; i < M; i++) {
                            l += ' ' + s + '_' + i;
                        }
                    }
                } else {
                    var L;
                    if (M == 0) {
                        L = c.getLabel();
                        if (L) {
                            l = L.getId();
                        }
                    } else {
                        for (var i = 0; i < M; i++) {
                            L = m[i];
                            if (L) {
                                l += ' ' + L.getId() + ' ';
                            }
                        }
                    }
                }
                var b = R + ' ' + t.getId() + '-ariadesc ' + l;
                b += ' ' + o.getId();
                var d = '';
                if (f) {
                    b += ' ' + t.getId() + '-ariafixedcolumn';
                }
                a['aria-labelledby'] = {
                    value: b
                };
                a['aria-describedby'] = {
                    value: t.getId() + '-toggleedit' + d
                };
                if (t.getSelectionMode() !== sap.ui.table.SelectionMode.None) {
                    a['aria-selected'] = {
                        value: 'false'
                    };
                }
                return a;
            };
            this.renderTableCell = function(r, t, R, c, C, f, s, e, v) {
                var i = c.data('sap-ui-colindex');
                var o = t.getColumns()[i];
                if (o.shouldRender() && s <= i && e > i) {
                    r.write('<td');
                    var I = R.getId() + '-col' + C;
                    r.writeAttribute('id', I);
                    r.writeAttribute('tabindex', '-1');
                    var a = this.getAriaAttributesForCell(t, f, R, o, i, c);
                    this.renderAriaAttributes(r, a, t._bAccMode);
                    var h = this.getHAlign(o.getHAlign(), t._bRtlMode);
                    if (h) {
                        r.addStyle('text-align', h);
                    }
                    r.writeStyles();
                    if (v.length > 0 && v[0] === o) {
                        r.addClass('sapUiTableTdFirst');
                    }
                    if (o.getGrouped()) {
                        r.addClass('sapUiTableTdGroup');
                    }
                    r.writeClasses();
                    r.write('><div');
                    r.addClass('sapUiTableCell');
                    r.writeClasses();
                    if (t.getRowHeight() && t.getVisibleRowCountMode() == sap.ui.table.VisibleRowCountMode.Auto) {
                        r.addStyle('max-height', t.getRowHeight() + 'px');
                    }
                    r.writeStyles();
                    r.write('>');
                    this.renderTableCellControl(r, t, c, C);
                    r.write('</div></td>');
                }
            };
            this.renderTableCellControl = function(r, t, c, C) {
                r.renderControl(c);
            };
            this.renderVSb = function(r, t) {
                r.write('<div');
                r.addClass('sapUiTableVSb');
                r.writeClasses();
                r.write('>');
                r.renderControl(t._oVSb);
                r.write('</div>');
            };
            this.renderHSb = function(r, t) {
                r.write('<div');
                r.addClass('sapUiTableHSb');
                r.writeClasses();
                r.write('>');
                r.renderControl(t._oHSb);
                r.write('</div>');
            };
            this.renderTabElement = function(r, c) {
                r.write("<div");
                if (c) {
                    r.addClass(c);
                    r.writeClasses();
                }
                r.writeAttribute("tabindex", "0");
                r.write("></div>");
            };
            this.getHAlign = function(h, r) {
                switch (h) {
                    case sap.ui.core.HorizontalAlign.Center:
                        return 'center';
                    case sap.ui.core.HorizontalAlign.End:
                    case sap.ui.core.HorizontalAlign.Right:
                        return r ? 'left' : 'right';
                }
                return r ? 'right' : 'left';
            };
        	
        	
            t._createRows();
            r.write('<div');
            if (t._bAccMode) {
                var a = [];
                if (t.getToolbar()) {
                    a.push(t.getToolbar().getId());
                }
                a.push(t.getId() + '-table');
                r.writeAttribute('aria-owns', a.join(' '));
                r.writeAttribute('aria-readonly', 'true');
                if (t.getTitle()) {
                    r.writeAttribute('aria-labelledby', t.getTitle().getId());
                }
                if (t.getSelectionMode() === sap.ui.table.SelectionMode.Multi) {
                    r.writeAttribute('aria-multiselectable', 'true');
                }
            }
            r.writeControlData(t);
            r.addClass('sapUiTable');
            r.addClass('sapUiTablePaginator');
            r.addClass('sapUiTableSelMode' + t.getSelectionMode());
            if (t.getColumnHeaderVisible()) {
                r.addClass('sapUiTableCHdr');
            }
            if (t.getSelectionMode() !== sap.ui.table.SelectionMode.None && t.getSelectionBehavior() !== sap.ui.table.SelectionBehavior.RowOnly) {
                r.addClass('sapUiTableRSel');
            }
            var s = sap.ui.table.TableHelper.addTableClass();
            if (s) {
                r.addClass(s);
            }
            r.addClass('sapUiTableSelMode' + t.getSelectionMode());
            if (t.getNavigationMode() === sap.ui.table.NavigationMode.Scrollbar) {
                r.addClass('sapUiTableVScr');
            }
            if (t.getEditable()) {
                r.addClass('sapUiTableEdt');
            }
            r.addClass('sapUiTableShNoDa');
            if (t.getShowNoData() && t._getRowCount() === 0) {
                r.addClass('sapUiTableEmpty');
            }
            if (t.getEnableGrouping()) {
                r.addClass('sapUiTableGrouping');
            }
            r.writeClasses();
            if (t.getWidth()) {
                r.addStyle('width', t.getWidth());
            }
            r.writeStyles();
            r.write('>');
            if (t.getTitle()) {
                this.renderHeader(r, t, t.getTitle());
            }
            if (t.getToolbar()) {
                this.renderToolbar(r, t, t.getToolbar());
            }
            if (t.getExtension() && t.getExtension().length > 0) {
                this.renderExtensions(r, t, t.getExtension());
            }
            r.write('<div');
            r.addClass('sapUiTableCnt');
            r.writeClasses();
            r.writeAttribute('data-sap-ui-fastnavgroup', 'true');
            if (t._bAccMode) {
                r.writeAttribute('aria-describedby', t.getId() + '-ariacount');
            }
            r.write('>');
            this.renderColHdr(r, t);
            this.renderTable(r, t);
            if (t._bAccMode) {
                r.write('<span');
                r.writeAttribute('id', t.getId() + '-ariadesc');
                r.addStyle('position', 'absolute');
                r.addStyle('top', '-20000px');
                r.writeStyles();
                r.write('>');
                if (t.getTitle() && t.getTitle().getText && t.getTitle().getText() != '') {
                    r.writeEscaped(t.getTitle().getText());
                } else {
                    r.write(t._oResBundle.getText('TBL_TABLE'));
                }
                r.write('</span>');
                r.write('<span');
                r.writeAttribute('id', t.getId() + '-ariacount');
                r.addStyle('position', 'absolute');
                r.addStyle('top', '-20000px');
                r.writeStyles();
                r.write('>');
                r.write('</span>');
                r.write('<span');
                r.writeAttribute('id', t.getId() + '-toggleedit');
                r.addStyle('position', 'absolute');
                r.addStyle('top', '-20000px');
                r.writeStyles();
                r.write('>');
                r.write(t._oResBundle.getText('TBL_TOGGLE_EDIT_KEY'));
                r.write('</span>');
                r.write('<span');
                r.writeAttribute('id', t.getId() + '-selectrow');
                r.addStyle('position', 'absolute');
                r.addStyle('top', '-20000px');
                r.writeStyles();
                r.write('>');
                r.write(t._oResBundle.getText('TBL_ROW_SELECT_KEY'));
                r.write('</span>');
                r.write('<span');
                r.writeAttribute('id', t.getId() + '-selectrowmulti');
                r.addStyle('position', 'absolute');
                r.addStyle('top', '-20000px');
                r.writeStyles();
                r.write('>');
                r.write(t._oResBundle.getText('TBL_ROW_SELECT_MULTI_KEY'));
                r.write('</span>');
                r.write('<span');
                r.writeAttribute('id', t.getId() + '-deselectrow');
                r.addStyle('position', 'absolute');
                r.addStyle('top', '-20000px');
                r.writeStyles();
                r.write('>');
                r.write(t._oResBundle.getText('TBL_ROW_DESELECT_KEY'));
                r.write('</span>');
                r.write('<span');
                r.writeAttribute('id', t.getId() + '-deselectrowmulti');
                r.addStyle('position', 'absolute');
                r.addStyle('top', '-20000px');
                r.writeStyles();
                r.write('>');
                r.write(t._oResBundle.getText('TBL_ROW_DESELECT_MULTI_KEY'));
                r.write('</span>');
                r.write('<span');
                r.writeAttribute('id', t.getId() + '-rownumberofrows');
                r.addStyle('position', 'absolute');
                r.addStyle('top', '-20000px');
                r.writeStyles();
                r.write('>');
                r.write('</span>');
            }
            r.write('</div>');
            if (t.getNavigationMode() === sap.ui.table.NavigationMode.Paginator) {
                r.write('<div');
                r.addClass('sapUiTablePaginator');
                r.writeClasses();
                r.write('>');
                if (!t._oPaginator) {
                    q.sap.require('sap.ui.commons.Paginator');
                    t._oPaginator = new sap.ui.commons.Paginator(t.getId() + '-paginator');
                    t._oPaginator.attachPage(q.proxy(t.onvscroll, t));
                }
                r.renderControl(t._oPaginator);
                r.write('</div>');
            }
            if (t.getFooter()) {
                this.renderFooter(r, t, t.getFooter());
            }
            if (t.getVisibleRowCountMode() == sap.ui.table.VisibleRowCountMode.Interactive) {
                this.renderVariableHeight(r, t);
            }
            r.write('</div>');
        }
    });
    T.ResizeTrigger = new I(300);
    e.insertFontFaceStyle();
    T.prototype.init = function() {
        this._iBaseFontSize = parseFloat(q('body').css('font-size')) || 16;
        this._oResBundle = sap.ui.getCore().getLibraryResourceBundle('sap.ui.table');
        this._bAccMode = sap.ui.getCore().getConfiguration().getAccessibility();
        this._bRtlMode = sap.ui.getCore().getConfiguration().getRTL();
        this._initSelectionModel(sap.ui.model.SelectionModel.MULTI_SELECTION);
        this._iColMinWidth = 20;
        if ('ontouchstart' in document) {
            this._iColMinWidth = 88;
        }
        this._oCalcColumnWidths = [];
        this._aIdxCols2Cells = [];
        this._aVisibleColumns = [];
        var f = {
            onAfterRendering: function(E) {
                E.srcControl.$('sb').attr('tabindex', '-1').css('outline', 'none');
            }
        };
        this._oVSb = new S(this.getId() + '-vsb', {
            size: '100%'
        });
        this._oVSb._bLargeDataScrolling = false;
        this._oVSb.attachScroll(this.onvscroll, this);
        this._oVSb.addDelegate(f);
        this._oHSb = new S(this.getId() + '-hsb', {
            size: '100%',
            contentSize: '0px',
            vertical: false
        });
        this._oHSb.attachScroll(this.onhscroll, this);
        this._oHSb.addDelegate(f);
        this._bActionMode = false;
        this._iLastFixedColIndex = -1;
        this._bInheritEditableToControls = false;
        this._bAllowColumnHeaderTextSelection = false;
        this._bCallUpdateTableCell = false;
        this._iTimerDelay = 250;
        this._doubleclickDelay = 300;
        this._clicksRegistered = 0;
        this._bjQueryLess18 = q.sap.Version(q.fn.jquery).compareTo('1.8') < 0;
        this._iDataRequestedCounter = 0;
        this._bDataRequestedListenersAttached = false;
    };
    T.prototype.exit = function() {
        this._oVSb.destroy();
        this._oHSb.destroy();
        if (this._oPaginator) {
            this._oPaginator.destroy();
        }
        this._destroyItemNavigation();
        this._cleanUpTimers();
        this._detachEvents();
    };
    T.prototype.onThemeChanged = function() {
        if (this.getDomRef()) {
            this.invalidate();
        }
    };
    T.prototype.onBeforeRendering = function() {
        this._cleanUpTimers();
        this._detachEvents();
    };
    T.prototype.onAfterRendering = function() {
        this._bOnAfterRendering = true;
        var $ = this.$();
        if ('ontouchstart' in document) {
            $.addClass('sapUiTableTouch');
        }
        this._renderOverlay();
        this._updateVSb(true);
        this._updateTableContent();
        this._handleResize();
        this._attachEvents();
        var f = this.getColumns();
        for (var i = 0, l = f.length; i < l; i++) {
            if (f[i].getVisible()) {
                f[i]._restoreIcons();
            }
        }
        if (!this._bAllowColumnHeaderTextSelection) {
            this._disableTextSelection($.find('.sapUiTableColHdrCnt'));
        }
        this._bOnAfterRendering = false;
        this._initItemNavigation();
        if (this._bDetermineVisibleCols === true) {
            this._determineVisibleCols();
            this._bDetermineVisibleCols = false;
        }
    };
    T.prototype._renderOverlay = function() {
        var $ = this.$(),
            f = $.find('.sapUiTableOverlay'),
            s = this.getShowOverlay();
        if (s && f.length === 0) {
            f = q('<div>').addClass('sapUiOverlay sapUiTableOverlay').css('z-index', '1');
            $.append(f);
        } else if (!s) {
            f.remove();
        }
    };
    T.prototype.setShowOverlay = function(s) {
        this.setProperty('showOverlay', s, true);
        this._renderOverlay();
        return this;
    };
    T.prototype._updateTableContent = function() {
        this._updateNoData();
        this._updateSelection();
        if (this._modifyRow) {
            q.each(this.getRows(), function(i, r) {
                this._modifyRow(i + this.getFirstVisibleRow(), r.$());
                this._modifyRow(i + this.getFirstVisibleRow(), r.$('fixed'));
            }.bind(this));
        }
        var B = this.getBinding('rows');
        var f = this.getFixedRowCount();
        var F = this.getFixedBottomRowCount();
        var v = this.getVisibleRowCount();
        q.each(this.getRows(), function(i, r) {
            var $ = r.getDomRefs(true);
            if ($.rowSelector) {
                if (r.getBindingContext() && this._isRowSelectable(r.getIndex())) {
                    $.rowSelector.attr('title', this._oResBundle.getText('TBL_ROW_SELECT'));
                } else {
                    $.rowSelector.attr('title', '');
                }
            }
            if (f > 0) {
                $.row.toggleClass('sapUiTableFixedTopRow', i < f);
                $.row.toggleClass('sapUiTableFixedLastTopRow', i == f - 1);
            }
            if (F > 0) {
                var g = false;
                if (B) {
                    if (B.getLength() >= v) {
                        g = (i == v - F - 1);
                    } else {
                        g = (this.getFirstVisibleRow() + i) == (B.getLength() - F - 1) && (this.getFirstVisibleRow() + i) < B.getLength();
                    }
                }
                $.row.toggleClass('sapUiTableFixedPreBottomRow', g);
            }
        }.bind(this));
        this._updateRowHeader();
        if (this._bOnAfterRendering && (this._bCallUpdateTableCell || typeof this._updateTableCell === 'function')) {
            var o = this.mBindingInfos['rows'];
            q.each(this.getRows(), function(i, r) {
                var A = this.getFirstVisibleRow() + i;
                q.each(r.getCells(), function(i, g) {
                    if (g._updateTableCell) {
                        g._updateTableCell(g, g.getBindingContext(o && o.model), g.$().closest('td'), A);
                    }
                    if (this._updateTableCell) {
                        this._updateTableCell(g, g.getBindingContext(o && o.model), g.$().closest('td'), A);
                    }
                });
            }.bind(this));
        }
    };
    T.prototype._initItemNavigation = function() {
        var $ = this.$();
        var f = this._getVisibleColumnCount();
        var t = f;
        var h = this.getSelectionMode() !== sap.ui.table.SelectionMode.None && this.getSelectionBehavior() !== sap.ui.table.SelectionBehavior.RowOnly;
        if (!this._oColHdrItemNav) {
            this._oColHdrItemNav = new a();
            this._oColHdrItemNav.setCycling(false);
            this.addDelegate(this._oColHdrItemNav);
        }
        var g = [];
        if (this.getFixedColumnCount() == 0) {
            g = $.find('.sapUiTableCtrl td[tabindex]').get();
        } else {
            var j = this.$().find('.sapUiTableCtrlFixed.sapUiTableCtrlRowFixed');
            var k = this.$().find('.sapUiTableCtrlScroll.sapUiTableCtrlRowFixed');
            var l = this.$().find('.sapUiTableCtrlFixed.sapUiTableCtrlRowScroll');
            var m = this.$().find('.sapUiTableCtrlScroll.sapUiTableCtrlRowScroll');
            var n = this.$().find('.sapUiTableCtrlFixed.sapUiTableCtrlRowFixedBottom');
            var o = this.$().find('.sapUiTableCtrlScroll.sapUiTableCtrlRowFixedBottom');
            for (var i = 0; i < this.getVisibleRowCount(); i++) {
                g = g.concat(j.find('tr[data-sap-ui-rowindex="' + i + '"]').find('td[tabindex]').get());
                g = g.concat(k.find('tr[data-sap-ui-rowindex="' + i + '"]').find('td[tabindex]').get());
                g = g.concat(l.find('tr[data-sap-ui-rowindex="' + i + '"]').find('td[tabindex]').get());
                g = g.concat(m.find('tr[data-sap-ui-rowindex="' + i + '"]').find('td[tabindex]').get());
                g = g.concat(n.find('tr[data-sap-ui-rowindex="' + i + '"]').find('td[tabindex]').get());
                g = g.concat(o.find('tr[data-sap-ui-rowindex="' + i + '"]').find('td[tabindex]').get());
            }
        }
        var p = g.length;
        var r = 0;
        if (h) {
            var s = $.find('.sapUiTableRowHdr').get();
            for (var i = s.length - 1; i >= 0; i--) {
                g.splice(i * f, 0, s[i]);
                p++;
            }
            p--;
            t++;
            r = 1;
        }
        if (this.getColumnHeaderVisible()) {
            g = $.find('.sapUiTableCol').get().concat(g);
        }
        if (h && this.getColumnHeaderVisible()) {
            var u = $.find('.sapUiTableColRowHdr').get();
            for (var i = this._getHeaderRowCount() - 1; i >= 0; i--) {
                g.splice(i * f, 0, u[0]);
            }
        }
        if (!this._oItemNavigation) {
            this._iLastSelectedDataRow = this._getHeaderRowCount();
            this._oItemNavigation = new a();
            this._oItemNavigation.setTableMode(true);
            this._oItemNavigation.attachEvent(a.Events.BeforeFocus, function(E) {
                this.$('ariadesc').text('');
            }, this);
            this._oItemNavigation.attachEvent(a.Events.AfterFocus, function(E) {
                var v = Math.floor(E.getParameter('index') / this._oItemNavigation.iColumns);
                if (v > 0) {
                    this._iLastSelectedDataRow = v;
                }
            }, this);
            this.addDelegate(this._oItemNavigation);
        }
        this._oItemNavigation.setColumns(t);
        this._oItemNavigation.setRootDomRef($.find('.sapUiTableCnt').get(0));
        this._oItemNavigation.setItemDomRefs(g);
        this._oItemNavigation.setFocusedIndex(r);
    };
    T.prototype._destroyItemNavigation = function() {
        if (this._oItemNavigation) {
            this._oItemNavigation.destroy();
            this._oItemNavigation = undefined;
        }
    };
    T.prototype.getFocusInfo = function() {
        var i = this.$().find(':focus').attr('id');
        if (i) {
            return {
                customId: i
            };
        } else {
            return sap.ui.core.Element.prototype.getFocusInfo.apply(this, arguments);
        }
    };
    T.prototype.applyFocusInfo = function(f) {
        if (f && f.customId) {
            this.$().find('#' + f.customId).focus();
        } else {
            sap.ui.core.Element.prototype.getFocusInfo.apply(this, arguments);
        }
        return this;
    };
    T.prototype.setTitle = function(t) {
        var o = t;
        if (typeof(t) === 'string' || t instanceof String) {
            o = sap.ui.table.TableHelper.createTextView({
                text: t,
                width: '100%'
            });
            o.addStyleClass('sapUiTableHdrTitle');
        }
        this.setAggregation('title', o);
        return this;
    };
    T.prototype.setFooter = function(f) {
        var F = f;
        if (typeof(f) === 'string' || f instanceof String) {
            F = sap.ui.table.TableHelper.createTextView({
                text: f,
                width: '100%'
            });
        }
        this.setAggregation('footer', F);
        return this;
    };
    T.prototype.setSelectionMode = function(s) {
        this.clearSelection();
        if (s === sap.ui.table.SelectionMode.Single) {
            this._oSelection.setSelectionMode(b.SINGLE_SELECTION);
        } else {
            this._oSelection.setSelectionMode(b.MULTI_SELECTION);
        }
        this.setProperty('selectionMode', s);
        return this;
    };
    T.prototype.setFirstVisibleRow = function(r, o) {
        this.setProperty('firstVisibleRow', r, true);
        if (this.getBinding('rows') && !this._bRefreshing) {
            this.updateRows();
        }
        this._updateAriaRowOfRowsText(true);
        if (o && !this._$AriaLiveDomRef && this._bAccMode) {
            if (this._ariaLiveTimer) {
                q.sap.clearDelayedCall(this._ariaLiveTimer);
            }
            var s = function() {
                if (this._oItemNavigation) {
                    this._$AriaLiveDomRef = q(this._oItemNavigation.getFocusedDomRef()).attr('aria-live', 'rude');
                    var t = this;
                    var f = function() {
                        if (t._$AriaLiveDomRef) {
                            t._$AriaLiveDomRef.removeAttr('aria-live');
                            delete t._$AriaLiveDomRef;
                        }
                    };
                    q.sap.delayedCall(0, this, f);
                    delete this._ariaLiveTimer;
                }
            };
            this._ariaLiveTimer = q.sap.delayedCall(60, this, s);
        }
        return this;
    };
    T.prototype.getAllowColumnReordering = function() {
        q.sap.log.warning('getAllowColumnReordering is deprecated - please use getEnableColumnReordering!');
        return T.prototype.getEnableColumnReordering.apply(this, arguments);
    };
    T.prototype.setAllowColumnReordering = function() {
        q.sap.log.warning('setAllowColumnReordering is deprecated - please use setEnableColumnReordering!');
        return T.prototype.setEnableColumnReordering.apply(this, arguments);
    };
    T.getMetadata().getAggregation('rows')._doesNotRequireFactory = true;
    T.prototype.bindRows = function(B, t, s, f) {
        if (typeof B === 'string' && (t instanceof sap.ui.model.Sorter || q.isArray(s) && s[0] instanceof sap.ui.model.Filter)) {
            f = s;
            s = t;
            t = undefined;
        }
        return this.bindAggregation('rows', B, t, s, f);
    };
    T.prototype._bindAggregation = function(n, p, t, s, f) {
        sap.ui.core.Element.prototype._bindAggregation.apply(this, arguments);
        var B = this.getBinding('rows');
        if (n === 'rows' && B) {
            B.attachChange(this._onBindingChange, this);
        }
        this._initSelectionModel(sap.ui.model.SelectionModel.MULTI_SELECTION);
        if (B && this.isTreeBinding('rows') && !B.hasListeners('selectionChanged')) {
            B.attachSelectionChanged(this._onSelectionChanged, this);
        }
        return this;
    };
    T.prototype._initSelectionModel = function(s) {
        if (this._oSelection) {
            this._oSelection.detachSelectionChanged(this._onSelectionChanged, this);
        }
        this._oSelection = new sap.ui.model.SelectionModel(s);
        this._oSelection.attachSelectionChanged(this._onSelectionChanged, this);
        return this;
    };
    T.prototype._onBindingChange = function(E) {
        var r = typeof(E) === 'object' ? E.getParameter('reason') : E;
        if (r === 'sort' || r === 'filter') {
            this.clearSelection();
            this.setFirstVisibleRow(0);
        }
    };
    T.prototype.unbindAggregation = function(n, s) {
        var B = this.getBinding('rows');
        if (n === 'rows' && B) {
            B.detachChange(this._onBindingChange);
            this._restoreAppDefaultsColumnHeaderSortFilter();
            this._invalidateColumnMenus();
            this.updateRows();
        }
        s = n === 'rows' && this.isBound('rows');
        return sap.ui.core.Element.prototype.unbindAggregation.apply(this, [n, s]);
    };
    T.prototype.setVisibleRowCountMode = function(v) {
        this.setProperty('visibleRowCountMode', v);
        this._handleRowCountMode();
        return this;
    };
    T.prototype.setVisibleRowCount = function(v) {
        if (v != null && !isFinite(v)) {
            return this;
        }
        if (v <= (this.getFixedRowCount() + this.getFixedBottomRowCount())) {
            q.sap.log.error('Table: ' + this.getId() + " visibleRowCount('" + v + "') must be bigger than number of fixed rows('" + (this.getFixedRowCount() + this.getFixedBottomRowCount()) + "')");
            return this;
        }
        v = this.validateProperty('visibleRowCount', v);
        if (this.getBinding('rows') && this.getBinding('rows').getLength() <= v) {
            this.setProperty('firstVisibleRow', 0);
        }
        this.setProperty('visibleRowCount', v);
        return this;
    };
    T.prototype.setTooltip = function(t) {
        q.sap.log.warning('The aggregation tooltip is not supported for sap.ui.table.Table');
        return this.setAggregation('tooltip', t, true);
    };
    T.prototype.refreshRows = function(E) {
        var r = typeof(E) === 'object' ? E.getParameter('reason') : E;
        if (r == sap.ui.model.ChangeReason.Refresh) {
            this._attachBindingListener();
        }
        this._bBusyIndicatorAllowed = true;
        this._bRefreshing = true;
        this._onBindingChange(E);
        this._updateBindingContexts(true);
        this._bRefreshing = false;
    };
    T.prototype.updateRows = function(r) {
        this._setBusy(r ? {
            changeReason: r
        } : false);
        var s = this.getFirstVisibleRow();
        s = Math.max(s, 0);
        if (this.getNavigationMode() === sap.ui.table.NavigationMode.Scrollbar && this._getRowCount() > 0) {
            s = Math.min(s, Math.max(this._getRowCount() - this.getVisibleRowCount(), 0));
        }
        this.setProperty('firstVisibleRow', s, true);
        if (this._oVSb.getScrollPosition() !== s) {
            this._oVSb.setScrollPosition(s);
            this._updateAriaRowOfRowsText(true);
        }
        if (this._oPaginator && this.getNavigationMode() === sap.ui.table.NavigationMode.Paginator) {
            var n = 1;
            if (s < this.getBinding('rows').getLength()) {
                n = Math.ceil((s + 1) / this.getVisibleRowCount());
            }
            if (n !== this._oPaginator.getCurrentPage()) {
                this.setProperty('firstVisibleRow', (n - 1) * this.getVisibleRowCount(), true);
                this._oPaginator.setCurrentPage(n);
                if (this._oPaginator.getDomRef()) {
                    this._oPaginator.rerender();
                }
            }
        }
        if (this.getDomRef()) {
            var D = (r == c.Change ? 0 : 50);
            this._sBindingTimer = this._sBindingTimer || q.sap.delayedCall(D, this, function() {
                if (!this.bIsDestroyed) {
                    this._determineVisibleCols();
                    this._updateBindingContexts();
                    this._updateVSb();
                    this._updateTableContent();
                    this._sBindingTimer = undefined;
                    this.fireEvent('_rowsUpdated');
                }
            });
        }
    };
    T.prototype.insertRow = function() {
        q.sap.log.error("The control manages the rows aggregation. The method \"insertRow\" cannot be used programmatically!");
    };
    T.prototype.addRow = function() {
        q.sap.log.error("The control manages the rows aggregation. The method \"addRow\" cannot be used programmatically!");
    };
    T.prototype.removeRow = function() {
        q.sap.log.error("The control manages the rows aggregation. The method \"removeRow\" cannot be used programmatically!");
    };
    T.prototype.removeAllRows = function() {
        q.sap.log.error("The control manages the rows aggregation. The method \"removeAllRows\" cannot be used programmatically!");
    };
    T.prototype.destroyRows = function() {
        q.sap.log.error("The control manages the rows aggregation. The method \"destroyRows\" cannot be used programmatically!");
    };
    T.prototype.autoResizeColumn = function(i) {
        var o = this.getColumns()[i];
        this._iColumnResizeStart = null;
        var n = this._calculateAutomaticColumnWidth(i);
        if (n == null) {
            return;
        }
        o._iNewWidth = n;
        this._oCalcColumnWidths[i] = o._iNewWidth;
        this._onColumnResized(null, i);
    };
    T.prototype._attachEvents = function() {
        var $ = this.$();
        $.find('.sapUiTableColHdrScr').scroll(q.proxy(this._oncolscroll, this));
        $.find('.sapUiTableCtrlScr').scroll(q.proxy(this._oncntscroll, this));
        $.find('.sapUiTableCtrlScrFixed').scroll(q.proxy(this._oncntscroll, this));
        $.find('.sapUiTableCtrlScrFixed, .sapUiTableColHdrFixed').on('scroll.sapUiTablePreventFixedAreaScroll', function(E) {
            E.target.scrollLeft = 0;
        });
        $.find('.sapUiTableRowHdr').hover(function() {
            q(this).addClass('sapUiTableRowHvr');
            var i = $.find('.sapUiTableRowHdr').index(this);
            $.find('.sapUiTableCtrlFixed > tbody > tr').filter(':eq(' + i + ')').addClass('sapUiTableRowHvr');
            $.find('.sapUiTableCtrlScroll > tbody > tr').filter(':eq(' + i + ')').addClass('sapUiTableRowHvr');
        }, function() {
            q(this).removeClass('sapUiTableRowHvr');
            $.find('.sapUiTableCtrlFixed > tbody > tr').removeClass('sapUiTableRowHvr');
            $.find('.sapUiTableCtrlScroll > tbody > tr').removeClass('sapUiTableRowHvr');
        });
        $.find('.sapUiTableCtrlFixed > tbody > tr').hover(function() {
            q(this).addClass('sapUiTableRowHvr');
            var i = $.find('.sapUiTableCtrlFixed > tbody > tr').index(this);
            $.find('.sapUiTableRowHdr').filter(':eq(' + (i) + ')').addClass('sapUiTableRowHvr');
            $.find('.sapUiTableCtrlScroll > tbody > tr').filter(':eq(' + i + ')').addClass('sapUiTableRowHvr');
        }, function() {
            q(this).removeClass('sapUiTableRowHvr');
            $.find('.sapUiTableRowHdr').removeClass('sapUiTableRowHvr');
            $.find('.sapUiTableCtrlScroll > tbody > tr').removeClass('sapUiTableRowHvr');
        });
        $.find('.sapUiTableCtrlScroll > tbody > tr').hover(function() {
            q(this).addClass('sapUiTableRowHvr');
            var i = $.find('.sapUiTableCtrlScroll > tbody > tr').index(this);
            $.find('.sapUiTableRowHdr').filter(':eq(' + i + ')').addClass('sapUiTableRowHvr');
            $.find('.sapUiTableCtrlFixed > tbody > tr').filter(':eq(' + i + ')').addClass('sapUiTableRowHvr');
        }, function() {
            q(this).removeClass('sapUiTableRowHvr');
            $.find('.sapUiTableRowHdr').removeClass('sapUiTableRowHvr');
            $.find('.sapUiTableCtrlFixed > tbody > tr').removeClass('sapUiTableRowHvr');
        });
        $.find('.sapUiTableColRsz').mousedown(q.proxy(this._onColumnResizeStart, this));
        this._enableColumnAutoResizing();
        T.ResizeTrigger.addListener(this._checkTableSize, this);
        this._oHSb.bind($.find('.sapUiTableCtrlScr').get(0));
        this._oVSb.bind($.find('.sapUiTableCtrlScr').get(0));
        this._oHSb.bind($.find('.sapUiTableCtrlScrFixed').get(0));
        this._oVSb.bind($.find('.sapUiTableCtrlScrFixed').get(0));
        this._oVSb.bind($.find('.sapUiTableRowHdrScr').get(0));
        q('body').bind('webkitTransitionEnd transitionend', q.proxy(function(E) {
            if (q(E.target).has($).length > 0) {
                this._handleResize();
            }
        }, this));
    };
    T.prototype._detachEvents = function() {
        var $ = this.$();
        $.find('.sapUiTableRowHdrScr').unbind();
        $.find('.sapUiTableColHdrScr').unbind();
        $.find('.sapUiTableCtrl > tbody > tr').unbind();
        $.find('.sapUiTableRowHdr').unbind();
        T.ResizeTrigger.removeListener(this._checkTableSize, this);
        $.find('.sapUiTableColRsz').unbind();
        this._oHSb.unbind($.find('.sapUiTableCtrlScr').get(0));
        this._oVSb.unbind($.find('.sapUiTableCtrlScr').get(0));
        this._oHSb.unbind($.find('.sapUiTableCtrlScrFixed').get(0));
        this._oVSb.unbind($.find('.sapUiTableCtrlScrFixed').get(0));
        this._oVSb.unbind($.find('.sapUiTableRowHdrScr').get(0));
        $.find('.sapUiTableCtrlScrFixed, .sapUiTableColHdrFixed').unbind('scroll.sapUiTablePreventFixedAreaScroll');
        q('body').unbind('webkitTransitionEnd transitionend');
    };
    T.prototype._cleanUpTimers = function() {
        if (this._sBindingTimer) {
            q.sap.clearDelayedCall(this._sBindingTimer);
            this._sBindingTimer = undefined;
        }
        if (this._sScrollBarTimer) {
            q.sap.clearDelayedCall(this._sScrollBarTimer);
            this._sScrollBarTimer = undefined;
        }
        if (this._sDelayedMenuTimer) {
            q.sap.clearDelayedCall(this._sDelayedMenuTimer);
            this._sDelayedMenuTimer = undefined;
        }
        if (this._sDelayedActionTimer) {
            q.sap.clearDelayedCall(this._sDelayedActionTimer);
            this._sDelayedActionTimer = undefined;
        }
        if (this._sColHdrPosTimer) {
            q.sap.clearDelayedCall(this._sColHdrPosTimer);
            this._sColHdrPosTimer = undefined;
        }
        if (this._visibleRowCountTimer) {
            q.sap.clearDelayedCall(this._visibleRowCountTimer);
            this._visibleRowCountTimer = undefined;
        }
        T.ResizeTrigger.removeListener(this._checkTableSize, this);
    };
    T.prototype._getFixedBottomRowContexts = function(B) {
        var f = this.getFixedBottomRowCount();
        var v = this.getVisibleRowCount();
        var g;
        if (f > 0 && (v - f) < B.getLength()) {
            g = B.getContexts(B.getLength() - f, f, 1);
        } else {
            g = [];
        }
        return g;
    };
    T.prototype._createRows = function(s) {
        var f = this.getFirstVisibleRow();
        var v = this.getVisibleRowCount();
        s = s === undefined ? f : s;
        var t = new R(this.getId() + '-rows');
        var g = this.getColumns();
        var h = 0;
        for (var i = 0, l = g.length; i < l; i++) {
            if (g[i].getVisible()) {
                var o = g[i].getTemplate();
                if (o) {
                    var j = o.clone('col' + i);
                    if (this._bInheritEditableToControls && !this.getEditable() && j.setEditable) {
                        j.setEditable(false);
                    }
                    j.data('sap-ui-colindex', i);
                    j.data('sap-ui-colid', g[i].getId());
                    t.addCell(j);
                    this._aIdxCols2Cells[i] = h++;
                }
            }
        }
        this.destroyAggregation('rows', true);
        var k;
        var B = this.getBinding('rows');
        var m = this.mBindingInfos['rows'];
        if (B && v > 0) {
            var n = this.getThreshold() ? Math.max(this.getVisibleRowCount(), this.getThreshold()) : 0;
            var F = this.getFixedBottomRowCount();
            k = B.getContexts(s, v - F, n);
            this._setBusy({
                requestedLength: v - F,
                receivedLength: k.length,
                contexts: k
            });
            var p = [];
            p = this._getFixedBottomRowContexts(B);
            k = k.concat(p);
            if (F > 0 && (v - F) < B.getLength()) {
                this._setBusy({
                    requestedLength: F,
                    receivedLength: p.length,
                    contexts: p
                });
            }
        }
        for (var i = 0; i < v; i++) {
            var j = t.clone('row' + i);
            if (k && k[i]) {
                j.setBindingContext(k[i], m.model);
                j._bHidden = false;
            } else {
                if (m) {
                    j.setBindingContext(null, m.model);
                } else {
                    j.setBindingContext(null);
                }
                j._bHidden = true;
            }
            this.addAggregation('rows', j, true);
        }
        t.destroy();
    };
	/**
	 * Adds some entity <code>oObject</code> to the aggregation identified by <code>sAggregationName</code>.
	 *
	 * If the given object is not valid with regard to the aggregation (if it is not an instance
	 * of the type specified for that aggregation) or when the method is called for an aggregation
	 * of cardinality 0..1, then an Error is thrown (see {@link #validateAggregation}.
	 *
	 * If the aggregation already has content, the new object will be added after the current content.
	 * If the new object was already contained in the aggregation, it will be moved to the end.
	 *
	 * <b>Note:</b> This method is a low-level API as described in <a href="#lowlevelapi">the class documentation</a>.
	 * Applications or frameworks must not use this method to generically add an object to an aggregation.
	 * Use the concrete method add<i>XYZ</i> for aggregation 'XYZ' or the generic {@link #applySettings} instead.
	 *
	 * @param {string}
	 *            sAggregationName the string identifying the aggregation that <code>oObject</code> should be added to.
	 * @param {sap.ui.base.ManagedObject}
	 *            oObject the object to add; if empty, nothing is added
	 * @param {boolean}
	 *            [bSuppressInvalidate] if true, this ManagedObject as well as the added child are not marked as changed
	 * @return {sap.ui.base.ManagedObject} Returns <code>this</code> to allow method chaining
	 * @protected
	 */
    T.prototype.addAggregation = function(sAggregationName, oObject, bSuppressInvalidate) {
    	if (!oObject) {
			return this;
		}
		oObject = this.validateAggregation(sAggregationName, oObject, /* multiple */ true);

		var aChildren = this.mAggregations[sAggregationName];
		if (!aChildren) {
			aChildren = this.mAggregations[sAggregationName] = [oObject];
		} else {
			aChildren.push(oObject);
		}
		oObject.setParent(this, sAggregationName, bSuppressInvalidate);
		return this;
    };
    /**
	 * Checks whether the given value is of the proper type for the given aggregation name.
	 *
	 * This method is already called by {@link #setAggregation}, {@link #addAggregation} and {@link #insertAggregation}.
	 * In many cases, subclasses of ManagedObject don't need to call it again in their mutator methods.
	 *
	 * @param {string} sAggregationName the name of the aggregation
	 * @param {sap.ui.base.ManagedObject|any} oObject the aggregated object or a primitive value
	 * @param {boolean} bMultiple whether the caller assumes the aggregation to have cardinality 0..n
	 * @return {sap.ui.base.ManagedObject|any} the passed object
	 * @throws Error if no aggregation with the given name is found or the given value does not fit to the aggregation type
	 * @protected
	 */
    T.prototype.validateAggregation = function(sAggregationName, oObject, bMultiple) {
		var oMetadata = this.getMetadata(),
			oAggregation = oMetadata.getManagedAggregation(sAggregationName), // public or private
			aAltTypes,
			oType,
			i,
			msg;

		if (!oAggregation) {
			throw new Error("Aggregation \"" + sAggregationName + "\" does not exist in " + this);
		}

		if (oAggregation.multiple !== bMultiple ) {
			throw new Error("Aggregation '" + sAggregationName + "' of " + this + " used with wrong cardinality (declared as " + (oAggregation.multiple ? "0..n" : "0..1") + ")");
		}

		//Null is a valid value for 0..1 aggregations
		if (!oAggregation.multiple && !oObject) {
			return oObject;
		}

		oType = jQuery.sap.getObject(oAggregation.type);
		// class types
		if ( typeof oType === "function" && oObject instanceof oType ) {
			return oObject;
		}
		// interfaces
		if ( oObject && oObject.getMetadata && oObject.getMetadata().isInstanceOf(oAggregation.type) ) {
			return oObject;
		}
//		AXIOMA - ASVRAMIREZ 16/01/2018
		// MetaData
		if ( oObject.getMetadata().getName() == oAggregation.type ) {
			return oObject;
		}
		// alternative types
		aAltTypes = oAggregation.altTypes;
		if ( aAltTypes && aAltTypes.length ) {
			// for primitive types, null or undefined is valid as well
			if ( oObject == null ) {
				return oObject;
			}
			for (i = 0; i < aAltTypes.length; i++) {
				oType = DataType.getType(aAltTypes[i]);
				if (oType instanceof DataType) {
					if (oType.isValid(oObject)) {
						return oObject;
					}
				}
			}
		}

		// TODO make this stronger again (e.g. for FormattedText)
		msg = "\"" + oObject + "\" is not valid for aggregation \"" + sAggregationName + "\" of " + this;
		if ( DataType.isInterfaceType(oAggregation.type) ) {
			jQuery.sap.assert(false, msg);
			return oObject;
		} else {
		  throw new Error(msg);
		}
	};
    T.prototype._updateHSb = function() {
        var $ = this.$();
        var i = $.find('.sapUiTableCtrlScroll').width();
        if (!!sap.ui.Device.browser.safari) {
            i = Math.max(i, this._getColumnsWidth(this.getFixedColumnCount()));
        }
        if (i > $.find('.sapUiTableCtrlScr').width()) {
            if (!$.hasClass('sapUiTableHScr')) {
                $.addClass('sapUiTableHScr');
                if (!!sap.ui.Device.browser.safari) {
                    var f = $.find('.sapUiTableCtrlScroll, .sapUiTableColHdrScr > .sapUiTableColHdr');
                    if (this._bjQueryLess18) {
                        f.width(i);
                    } else {
                        f.outerWidth(i);
                    }
                }
            }
            var s = $.find('.sapUiTableCtrlFixed').width();
            if ($.find('.sapUiTableRowHdrScr:visible').length > 0) {
                s += $.find('.sapUiTableRowHdrScr').width();
            }
            var g = $.find('.sapUiTableHSb');
            if (this._bRtlMode) {
                g.css('padding-right', s + 'px');
            } else {
                g.css('padding-left', s + 'px');
            }
            var m = g.parent().width();
            g.css('max-width', m + 'px');
            this._oHSb.setContentSize(i + 'px');
            if (this._oHSb.getDomRef()) {
                this._oHSb.rerender();
            }
        } else {
            if ($.hasClass('sapUiTableHScr')) {
                $.removeClass('sapUiTableHScr');
                if (!!sap.ui.Device.browser.safari) {
                    $.find('.sapUiTableCtrlScroll, .sapUiTableColHdr').css('width', '');
                }
            }
        }
        this._syncHeaderAndContent();
    };
    T.prototype._updateVSb = function(o) {
        var $ = this.$();
        var D = false;
        var f = false;
        var B = this.getBinding('rows');
        if (B) {
            var F = this.getFixedRowCount();
            if (F > 0) {
                var O = $.find('.sapUiTableCtrl.sapUiTableCtrlRowScroll.sapUiTableCtrlScroll')[0].offsetTop;
                this.$().find('.sapUiTableVSb').css('top', (O - 1) + 'px');
                f = true;
            }
            var i = this.getFixedBottomRowCount();
            if (i > 0) {
                var g = $.find('.sapUiTableCtrl.sapUiTableCtrlRowScroll.sapUiTableCtrlScroll')[0].offsetHeight;
                this.$().find('.sapUiTableVSb').css('height', g + 'px');
                f = true;
            }
            var l = B.getLength();
            var s = Math.max(0, (l || 0) - this.getVisibleRowCount());
            if (this._oPaginator && this.getNavigationMode() === sap.ui.table.NavigationMode.Paginator) {
                var n = Math.ceil((l || 0) / this.getVisibleRowCount());
                this._oPaginator.setNumberOfPages(n);
                var p = Math.min(n, Math.ceil((this.getFirstVisibleRow() + 1) / this.getVisibleRowCount()));
                this.setProperty('firstVisibleRow', (Math.max(p, 1) - 1) * this.getVisibleRowCount(), true);
                this._oPaginator.setCurrentPage(p);
                if (this._oPaginator.getDomRef()) {
                    this._oPaginator.rerender();
                }
                if ($.hasClass('sapUiTableVScr')) {
                    $.removeClass('sapUiTableVScr');
                }
                if (this._sScrollBarTimer != undefined) {
                    q.sap.clearDelayedCall(this._sScrollBarTimer);
                }
            } else {
                if (s > 0) {
                    if (!$.hasClass('sapUiTableVScr')) {
                        $.addClass('sapUiTableVScr');
                        D = true;
                    }
                } else {
                    if (l > 0) {
                        this.setFirstVisibleRow(0);
                    }
                    if ($.hasClass('sapUiTableVScr')) {
                        $.removeClass('sapUiTableVScr');
                        D = true;
                    }
                }
                if (o || f || s !== this._oVSb.getSteps() || this.getFirstVisibleRow() !== this._oVSb.getScrollPosition()) {
                    q.sap.clearDelayedCall(this._sScrollBarTimer);
                    this._sScrollBarTimer = undefined;
                    this._sScrollBarTimer = q.sap.delayedCall(o ? 0 : 250, this, function() {
                        var s = 0;
                        if (B) {
                            s = Math.max(0, (B.getLength() || 0) - this.getVisibleRowCount());
                        }
                        if ($) {
                            $.toggleClass('sapUiTableVScr', s > 0);
                        }
                        this._oVSb.setSteps(s);
                        if (this._oVSb.getDomRef()) {
                            this._oVSb.rerender();
                        }
                        this._oVSb.setScrollPosition(this.getFirstVisibleRow());
                        this._sScrollBarTimer = undefined;
                    });
                }
            }
        } else {
            if (this._oPaginator && this.getNavigationMode() === sap.ui.table.NavigationMode.Paginator) {
                this._oPaginator.setNumberOfPages(0);
                this._oPaginator.setCurrentPage(0);
                if (this._oPaginator.getDomRef()) {
                    this._oPaginator.rerender();
                }
            } else {
                if ($.hasClass('sapUiTableVScr')) {
                    $.removeClass('sapUiTableVScr');
                    D = true;
                }
            }
        }
        if (D && !this._bOnAfterRendering) {
            this._handleResize();
        }
    };
    T.prototype._updateBindingContexts = function(s) {
        var r = this.getRows(),
            B = this.getBinding('rows'),
            o = this.mBindingInfos['rows'],
            f, g, F, i = this.getFixedRowCount(),
            h = this.getFixedBottomRowCount(),
            v = this.getVisibleRowCount();
        if (B) {
            var t;
            if ((i > 0 || h > 0) && r.length > 0) {
                var j = i + h;
                t = this.getThreshold() ? Math.max((this.getVisibleRowCount() - j), this.getThreshold()) : 0;
                var k = Math.max(0, r.length - j);
                g = B.getContexts(this.getFirstVisibleRow() + i, k, t);
                this._setBusy({
                    requestedLength: k,
                    receivedLength: g.length,
                    contexts: g
                });
                if (i > 0) {
                    f = B.getContexts(0, i);
                    this._setBusy({
                        requestedLength: i,
                        receivedLength: f.length,
                        contexts: f
                    });
                    g = f.concat(g);
                }
                var F = this._getFixedBottomRowContexts(B);
                g = g.concat(F);
                if (h > 0 && (v - h) < B.getLength()) {
                    this._setBusy({
                        requestedLength: h,
                        receivedLength: F.length,
                        contexts: F
                    });
                }
            } else if (r.length > 0) {
                t = this.getThreshold() ? Math.max(this.getVisibleRowCount(), this.getThreshold()) : 0;
                g = B.getContexts(this.getFirstVisibleRow(), r.length, t);
                this._setBusy({
                    requestedLength: r.length,
                    receivedLength: g.length,
                    contexts: g
                });
            }
        }
        if (!s) {
            for (var l = r.length - 1; l >= 0; l--) {
                var m = g ? g[l] : undefined;
                var n = r[l];
                if (n) {
                    var A = this.getFirstVisibleRow() + l;
                    this._updateRowBindingContext(n, m, o && o.model, A);
                }
            }
        }
    };
    T.prototype._updateRowBindingContext = function(r, o, m, A) {
        var f = r.getCells();
        var $ = r.getDomRefs(true).row;
        r.setBindingContext(o, m);
        if (o && o instanceof sap.ui.model.Context) {
            for (var i = 0, l = this._aVisibleColumns.length; i < l; i++) {
                var g = this._aIdxCols2Cells[this._aVisibleColumns[i]];
                if (f[g]) {
                    this._updateCellBindingContext(f[g], o, m, A);
                }
            }
            $.removeClass('sapUiTableRowHidden');
            r._bHidden = false;
        } else {
            $.addClass('sapUiTableRowHidden');
            $.removeClass('sapUiTableFixedPreBottomRow sapUiTableFixedTopRow');
            r._bHidden = true;
            for (var i = 0, l = this._aVisibleColumns.length; i < l; i++) {
                var g = this._aIdxCols2Cells[this._aVisibleColumns[i]];
                if (f[g]) {
                    this._updateCellBindingContext(f[g], o, m, A);
                }
            }
        }
    };
    T.prototype._updateCellBindingContext = function(o, f, m, A) {
        if (this._bCallUpdateTableCell && o._updateTableCell) {
            o._updateTableCell(o, f, o.$().closest('td'), A);
        }
        if (typeof this._updateTableCell === 'function') {
            this._updateTableCell(o, f, o.$().closest('td'), A);
        }
    };
    T.prototype._hasData = function() {
        var B = this.getBinding('rows');
        if (!B || (B.getLength() || 0) === 0) {
            return false;
        }
        return true;
    };
    T.prototype._updateNoData = function() {
        if (this.getShowNoData()) {
            var B = this.getBinding('rows');
            if (!this._hasData()) {
                if (!this.$().hasClass('sapUiTableEmpty')) {
                    this.$().addClass('sapUiTableEmpty');
                }
                this.$('ariacount').text(this._oResBundle.getText('TBL_DATA_ROWS', [0]));
            } else {
                if (this.$().hasClass('sapUiTableEmpty')) {
                    this.$().removeClass('sapUiTableEmpty');
                }
                this.$('ariacount').text(this._oResBundle.getText('TBL_DATA_ROWS', [(B.getLength() || 0)]));
            }
        }
    };
    T.prototype._determineVisibleCols = function() {
        var $ = this.$(),
            t = this;
        if ($.hasClass('sapUiTableHScr')) {
            var r = this._bRtlMode;
            var s = this._oHSb.getNativeScrollPosition();
            if (r && sap.ui.Device.browser.firefox && s < 0) {
                s = s * -1;
            }
            var f = s + this._getScrollWidth();
            if (this._iOldScrollLeft !== s || this._iOldScrollRight !== f || this._bForceVisibleColCalc) {
                var L = r ? $.find('.sapUiTableCtrlScroll').width() : 0;
                if ((sap.ui.Device.browser.internet_explorer || sap.ui.Device.browser.firefox) && r) {
                    L = 0;
                }
                this._aVisibleColumns = [];
                for (var i = 0, l = this.getFixedColumnCount(); i < l; i++) {
                    this._aVisibleColumns.push(i);
                }
                var g = $.find('.sapUiTableCtrl.sapUiTableCtrlScroll .sapUiTableCtrlFirstCol > th[data-sap-ui-headcolindex]');
                g.each(function(j, E) {
                    var w = q(E).width();
                    if (r && sap.ui.Device.browser.chrome) {
                        L -= w;
                    }
                    if (L + w >= s && L <= f) {
                        t._aVisibleColumns.push(parseInt(q(E).data('sap-ui-headcolindex'), 10));
                    }
                    if (!r || (sap.ui.Device.browser.internet_explorer || sap.ui.Device.browser.firefox)) {
                        L += w;
                    }
                });
                this._iOldScrollLeft = s;
                this._iOldScrollRight = f;
                this._bForceVisibleColCalc = false;
            }
        } else {
            this._aVisibleColumns = [];
            var h = this.getColumns();
            for (var i = 0, l = h.length; i < l; i++) {
                if (h[i].shouldRender()) {
                    this._aVisibleColumns.push(i);
                }
            }
        }
    };
    T.prototype._enableColumnAutoResizing = function() {
        var t = this;
        q.each(this.getColumns(), function(i, o) {
            if (!!o.getAutoResizable()) {
                var $ = q.find('.sapUiTableColRsz[data-sap-ui-colindex=' + i + ']');
                if ($) {
                    t._bindSimulatedDoubleclick($, null, t._onAutomaticColumnResize);
                }
            }
        });
    };
    T.prototype.removeColumn = function(o) {
        var r = this.removeAggregation('columns', o);
        this._bDetermineVisibleCols = true;
        if (typeof o === 'number' && o > -1) {
            o = this.getColumns()[o];
        }
        var i = q.inArray(o, this._aSortedColumns);
        if (this._iNewColPos === undefined && i >= 0) {
            this._aSortedColumns.splice(i, 1);
        }
        return r;
    };
    T.prototype.removeAllColumns = function() {
        var r = this.removeAllAggregation('columns');
        this._aSortedColumns = [];
        return r;
    };
    T.prototype.destroyColumns = function() {
        var r = this.destroyAggregation('columns');
        this._aSortedColumns = [];
        return r;
    };
    T.prototype.addColumn = function(o) {
        var t = this;
        this.addAggregation('columns', o);
        o.attachEvent('_widthChanged', function(E) {
            t._bForceVisibleColCalc = true;
        });
        this._bDetermineVisibleCols = true;
        return this;
    };
    T.prototype.insertColumn = function(o, i) {
        var t = this;
        this.insertAggregation('columns', o, i);
        o.attachEvent('_widthChanged', function() {
            t._bForceVisibleColCalc = true;
        });
        this._bDetermineVisibleCols = true;
        return this;
    };
    T.prototype._getRowCount = function() {
        var B = this.getBinding('rows');
        return B ? (B.getLength() || 0) : 0;
    };
    T.prototype._getSelectableRowCount = function() {
        return this._getRowCount();
    };
    T.prototype._getScrollTop = function() {
        if (this.$().hasClass('sapUiTableVScr')) {
            return this._oVSb.getScrollPosition() || 0;
        } else {
            if (this.getNavigationMode() === sap.ui.table.NavigationMode.Paginator) {
                return (((this._oPaginator.getCurrentPage() || 1) - 1) * this.getVisibleRowCount());
            } else {
                return 0;
            }
        }
    };
    T.prototype._getScrollWidth = function() {
        return this.$().find('.sapUiTableCtrlScr').width();
    };
    T.prototype._getScrollHeight = function() {
        return this.$().find('.sapUiTableCtrlScr').height();
    };
    T.prototype._getVisibleColumns = function() {
        var f = [];
        var g = this.getColumns();
        for (var i = 0, l = g.length; i < l; i++) {
            if (g[i].shouldRender()) {
                f.push(g[i]);
            }
        }
        return f;
    };
    T.prototype._getVisibleColumnCount = function() {
        return this._getVisibleColumns().length;
    };
    T.prototype._getHeaderRowCount = function() {
        if (!this.getColumnHeaderVisible()) {
            return 0;
        } else if (!this._useMultiHeader()) {
            return 1;
        }
        var h = 0;
        q.each(this._getVisibleColumns(), function(i, o) {
            h = Math.max(h, o.getMultiLabels().length);
        });
        return h;
    };
    T.prototype._useMultiHeader = function() {
        var u = false;
        q.each(this._getVisibleColumns(), function(i, o) {
            if (o.getMultiLabels().length > 0) {
                u = true;
                return false;
            }
        });
        return u;
    };
    T.prototype._getColumnsWidth = function(s, E) {
        var f = this.getColumns();
        var g = 0;
        if (s !== 0 && !s) {
            s = 0;
        }
        if (E !== 0 && !E) {
            E = f.length;
        }
        for (var i = s, l = E; i < l; i++) {
            if (f[i] && f[i].shouldRender()) {
                g += this._CSSSizeToPixel(f[i].getWidth());
            }
        }
        return g;
    };
    T.prototype._CSSSizeToPixel = function(s, r) {
        var p = this._iColMinWidth;
        if (s) {
            if (q.sap.endsWith(s, 'px')) {
                p = parseInt(s, 10);
            } else if (q.sap.endsWith(s, 'em') || q.sap.endsWith(s, 'rem')) {
                p = Math.ceil(parseFloat(s) * this._getBaseFontSize());
            }
        }
        if (r) {
            return p + 'px';
        } else {
            return parseInt(p, 10);
        }
    };
    T.prototype._getBaseFontSize = function() {
        return this._iBaseFontSize;
    };
    T.prototype._handleResize = function() {
        if (!this.getDomRef()) {
            return;
        }
        this._updateHSb();
        this._updateColumnHeader();
        this._updateRowHeader();
        this._handleRowCountMode();
    };
    T.prototype._checkTableSize = function() {
        if (!this.getDomRef()) {
            return;
        }
        var p = this.getDomRef().parentNode,
            h = p.offsetHeight,
            w = p.offsetWidth;
        if (p != this._lastParent || h != this._lastParentHeight || w != this._lastParentWidth) {
            this._handleResize();
            this._lastParent = p;
            this._lastParentHeight = h;
            this._lastParentWidth = w;
            if (this.getBinding('rows')) {
                this.updateRows();
            }
        }
    };
    T.prototype._handleRowCountMode = function() {
        if (this.getVisibleRowCountMode() == sap.ui.table.VisibleRowCountMode.Auto) {
            var $ = this.$();
            var i = $.parent().height();
            var r = this._calculateRowsToDisplay(i);
            if (isNaN(r)) {
                return;
            }
            var t = this;
            this._visibleRowCountTimer = setTimeout(function() {
                t.setVisibleRowCount(r);
            }, 0);
        }
    };
    T.prototype._updateRowHeader = function() {
        if (this.getFixedRowCount() >= 0 || this.getFixedColumnCount() >= 0 || this.getRowHeight() <= 0) {
            var $ = this.$();
            var f = $.find('.sapUiTableCtrlFixed > tbody > tr');
            var g = $.find('.sapUiTableCtrlScroll > tbody > tr');
            var h = $.find('.sapUiTableRowHdr');
            if (this.getFixedColumnCount() > 0 && !this.getRowHeight()) {
                f.css('height', '');
                g.css('height', '');
            }
            for (var i = 0, l = g.length; i < l; i++) {
                var H = Math.max(f[i] ? (f[i].getBoundingClientRect().bottom - f[i].getBoundingClientRect().top) : 0, g[i] ? (g[i].getBoundingClientRect().bottom - g[i].getBoundingClientRect().top) : 0);
                if (this._bjQueryLess18) {
                    q(h[i]).height(H);
                    if (this.getFixedColumnCount() > 0 && !this.getRowHeight()) {
                        q(f[i]).height(H);
                        q(g[i]).height(H);
                    }
                } else {
                    q(h[i]).outerHeight(H);
                    if (this.getFixedColumnCount() > 0 && !this.getRowHeight()) {
                        q(f[i]).outerHeight(H);
                        q(g[i]).outerHeight(H);
                    }
                }
            }
        }
    };
    T.prototype._syncColumnHeaders = function(u) {
        var D = this.getDomRef();
        if (!D) {
            return;
        }
        var $ = this.$();
        var r = D.getBoundingClientRect();
        var t = r.right - r.left;
        var v = this._getVisibleColumns();
        if (v.length == 0) {
            return;
        }
        var f = 0;
        var g = this._bRtlMode;
        var l = g ? 99000 : -99000;
        var h = $.find('.sapUiTableColHdr');
        var k = $.find('.sapUiTableCtrlFirstCol > th');
        var H = this.getSelectionMode() !== sap.ui.table.SelectionMode.None && this.getSelectionBehavior() !== sap.ui.table.SelectionBehavior.RowOnly;
        if (H && k.length > 0) {
            var o = k.get(0);
            f = o.getBoundingClientRect().right - o.getBoundingClientRect().left;
            k = k.not(':nth-child(1)');
        }
        var m = {};
        k.each(function(A, E) {
            var B = E.getAttribute('data-sap-ui-headcolindex');
            var F = E.getBoundingClientRect();
            var G;
            var V = v[A];
            if (V) {
                G = F.right - F.left;
            }
            if (A == 0) {
                G += f;
            }
            var J = v[A] ? v[A].getHeaderSpan() : 1,
                K = [],
                L;
            if (J) {
                if (!q.isArray(J)) {
                    J = [J];
                }
                q.each(J, function(Q, U) {
                    J[Q] = Math.max(U, 1);
                });
                L = J;
            } else {
                L = [1];
            }
            for (var i = 0; i < L.length; i++) {
                K[i] = {
                    width: G,
                    span: 1
                };
                for (var j = 1; j < L[i]; j++) {
                    var M = k[A + j];
                    var N = M.getBoundingClientRect();
                    if (M) {
                        K[i].width += N.right - N.left;
                        K[i].span = L[i];
                    }
                }
            }
            if (V) {
                var O = document.getElementById(V.getId() + '-rsz');
                m[B] = {
                    domRefColumnTh: E,
                    domRefColumnDivs: [],
                    domRefColumnResizer: O,
                    domRefColumnResizerPosition: undefined,
                    rect: F,
                    aHeaderData: K
                };
            }
        });
        var n = h.find('.sapUiTableCol');
        n.each(function(j, E) {
            var A = parseInt(E.getAttribute('data-sap-ui-colindex'), 10);
            var B = m[A];
            B.domRefColumnDivs.push(E);
            var F = 0;
            if (B) {
                if (!g) {
                    F = B.rect.right - r.left;
                } else {
                    F = B.rect.left - r.left;
                }
            }
            if (!F || F <= 0 || F >= t) {
                F = l;
            }
            B.domRefColumnResizerPosition = F;
        });
        q.each(m, function(j, A) {
            for (var i = 0; i < A.domRefColumnDivs.length; i++) {
                var B = A.aHeaderData[0];
                if (A.aHeaderData[i]) {
                    B = A.aHeaderData[i];
                }
                A.domRefColumnDivs[i].style.width = B.width + 'px';
                A.domRefColumnDivs[i].setAttribute('data-sap-ui-colspan', B.span);
                if (A.domRefColumnResizer) {
                    A.domRefColumnResizer.style.left = A.domRefColumnResizerPosition + 'px';
                }
            }
        });
        var p = this._getHeaderRowCount();
        var s = this.getColumnHeaderHeight() > 0;
        if (!s && !u) {
            var w = $.find('.sapUiTableColHdrCnt,.sapUiTableColRowHdr');
            var x = n.length;
            for (var i = 0; i < x; i++) {
                n[i].style.height = 'auto';
            }
            w.height('auto');
            var y = Math.max(h.height(), w.height());
            var z = Math.floor(y / p);
            if (this._bjQueryLess18) {
                n.height(z);
                w.height(y);
            } else {
                n.outerHeight(z);
                w.outerHeight(y);
            }
        }
    };
    T.prototype._updateColumnHeader = function(u) {
        if (this._sColHdrPosTimer) {
            q.sap.clearDelayedCall(this._sColHdrPosTimer);
        }
        if (this._bOnAfterRendering) {
            this._syncColumnHeaders.apply(this, arguments);
        } else {
            this._sColHdrPosTimer = q.sap.delayedCall(150, this, this._syncColumnHeaders, arguments);
        }
    };
    T.prototype._disableTextSelection = function(E) {
        q(E || document.body).attr('unselectable', 'on').css({
            '-moz-user-select': 'none',
            '-webkit-user-select': 'none',
            'user-select': 'none'
        }).bind('selectstart', function(o) {
            o.preventDefault();
            return false;
        });
    };
    T.prototype._enableTextSelection = function(E) {
        q(E || document.body).attr('unselectable', 'off').css({
            '-moz-user-select': '',
            '-webkit-user-select': '',
            'user-select': ''
        }).unbind('selectstart');
    };
    T.prototype._clearTextSelection = function() {
        if (window.getSelection) {
            if (window.getSelection().empty) {
                window.getSelection().empty();
            } else if (window.getSelection().removeAllRanges) {
                window.getSelection().removeAllRanges();
            }
        } else if (document.selection && document.selection.empty) {
            try {
                document.selection.empty();
            } catch (f) {}
        }
    };
    T.prototype.onvscroll = function(E) {
        this._leaveActionMode();
        this.setFirstVisibleRow(this._getScrollTop(), true);
    };
    T.prototype._syncHeaderAndContent = function() {
        if (!this._bSyncScrollLeft) {
            this._bSyncScrollLeft = true;
            var $ = this.$();
            var s = this._oHSb.getNativeScrollPosition();
            $.find('.sapUiTableCtrlScr').scrollLeft(s);
            if (!!sap.ui.Device.browser.webkit && this._bRtlMode) {
                var o = $.find('.sapUiTableColHdrScr').get(0);
                s = o.scrollWidth - o.clientWidth - this._oHSb.getScrollPosition();
            }
            $.find('.sapUiTableColHdrScr').scrollLeft(s);
            this._bSyncScrollLeft = false;
        }
    };
    T.prototype.onhscroll = function(E) {
        if (!this._bOnAfterRendering) {
            this._syncHeaderAndContent();
            this._updateColumnHeader(true);
            if (this.getBinding('rows')) {
                this.updateRows();
            }
        }
    };
    T.prototype._oncolscroll = function(E) {
        if (!this._bSyncScrollLeft) {
            var $ = this.$().find('.sapUiTableColHdrScr');
            if (!!sap.ui.Device.browser.webkit && this._bRtlMode) {
                var s = this.$().find('.sapUiTableColHdrScr').get(0);
                this._oHSb.setScrollPosition(s.scrollWidth - s.clientWidth - $.scrollLeft());
            } else {
                this._oHSb.setNativeScrollPosition($.scrollLeft());
            }
        }
    };
    T.prototype._oncntscroll = function(E) {
        if (!this._bSyncScrollLeft) {
            var $ = this.$().find('.sapUiTableCtrlScr');
            this._oHSb.setNativeScrollPosition($.scrollLeft());
        }
    };
    T.prototype.onmousedown = function(E) {
        var l = E.button === 0;
        var i = this._isTouchMode(E);
        if (l) {
            var $ = q(E.target);
            var f = this.$('sb');
            if (E.target == f[0]) {
                q(document.body).bind('selectstart', q.proxy(this._splitterSelectStart, this));
                var o = f.offset();
                var h = f.height();
                var w = f.width();
                q(document.body).append("<div id=\"" + this.getId() + "-ghost\" class=\"sapUiHSBGhost\" style =\" height:" + h + 'px; width:' + w + 'px; left:' + o.left + 'px; top:' + o.top + "px\" ></div>");
                f.append("<div id=\"" + this.getId() + "-overlay\" style =\"left: 0px;" + " right: 0px; bottom: 0px; top: 0px; position:absolute\" ></div>");
                var D = q(document);
                if (i) {
                    D.bind('touchend', q.proxy(this._onGhostMouseRelease, this));
                    D.bind('touchmove', q.proxy(this._onGhostMouseMove, this));
                } else {
                    D.bind('mouseup', q.proxy(this._onGhostMouseRelease, this));
                    D.bind('mousemove', q.proxy(this._onGhostMouseMove, this));
                }
                this._disableTextSelection();
                return;
            }
            var g = $.closest('.sapUiTableCol');
            if (g.length === 1) {
                this._bShowMenu = true;
                this._sDelayedMenuTimer = q.sap.delayedCall(200, this, function() {
                    this._bShowMenu = false;
                });
                var j = this._isTouchMode(E) && ($.hasClass('sapUiTableColDropDown') || $.hasClass('sapUiTableColResizer'));
                if (this.getEnableColumnReordering() && !j) {
                    var k = parseInt(g.attr('data-sap-ui-colindex'), 10);
                    if (k > this._iLastFixedColIndex) {
                        var m = this.getColumns()[k];
                        this._sDelayedActionTimer = q.sap.delayedCall(200, this, function() {
                            this._onColumnMoveStart(m, i);
                        });
                    }
                }
            }
            var n = !!(E.metaKey || E.ctrlKey);
            if (!!sap.ui.Device.browser.firefox && n) {
                E.preventDefault();
            }
        }
    };
    T.prototype.onmouseup = function(E) {
        q.sap.clearDelayedCall(this._sDelayedActionTimer);
        if (E.isMarked()) {
            return;
        }
        if (this.$().find('.sapUiTableCtrl td :focus').length > 0) {
            this._enterActionMode(this.$().find('.sapUiTableCtrl td :focus'));
        } else {
            this._leaveActionMode(E);
        }
    };
    T.prototype.onclick = function(E) {
        q.sap.clearDelayedCall(this._sDelayedActionTimer);
        if (E.isMarked()) {
            return;
        }
        if (!this._findAndfireCellEvent(this.fireCellClick, E)) {
            this._onSelect(E);
        } else {
            E.preventDefault();
        }
    };
    T.prototype.oncontextmenu = function(E) {
        var t = q(E.target);
        var h = t.closest('.sapUiTableCol');
        if (h.length > 0) {
            var o = sap.ui.getCore().byId(h.attr('data-sap-ui-colid'));
            if (o) {
                o._openMenu(h[0], false);
            }
            E.preventDefault();
        } else {
            if (this._findAndfireCellEvent(this.fireCellContextmenu, E, this._oncellcontextmenu)) {
                E.preventDefault();
            }
        }
    };
    T.prototype._oncellcontextmenu = function(p) {
        if (this.getEnableCellFilter()) {
            if (!this._oContextMenu) {
                q.sap.require('sap.ui.unified.Menu');
                q.sap.require('sap.ui.unified.MenuItem');
                this._oContextMenu = new sap.ui.unified.Menu(this.getId() + '-contextmenu');
                this.addDependent(this._oContextMenu);
            }
            var o = sap.ui.getCore().byId(p.columnId);
            var s = o.getFilterProperty();
            if (o && o.isFilterableByMenu() && p.rowBindingContext) {
                this._oContextMenu.destroyItems();
                this._oContextMenu.addItem(new sap.ui.unified.MenuItem({
                    text: this._oResBundle.getText('TBL_FILTER'),
                    select: [function() {
                        var g = this.getContextByIndex(p.rowIndex);
                        var v = g.getProperty(s);
                        if (this.getEnableCustomFilter()) {
                            this.fireCustomFilter({
                                column: o,
                                value: v
                            });
                        } else {
                            this.filter(o, v);
                        }
                    }, this]
                }));
                var f = sap.ui.core.Popup.Dock;
                this._oContextMenu.open(false, p.cellDomRef, f.BeginTop, f.BeginBottom, p.cellDomRef, 'none none');
                return true;
            }
        }
    };
    T.prototype._bindSimulatedDoubleclick = function(f, g, D) {
        var h = 'click';
        var t = this;
        if (!!sap.ui.Device.support.touch) {
            h = 'touchend';
        }
        q(f).on(h, function(E) {
            E.preventDefault();
            E.stopPropagation();
            t._clicksRegistered = t._clicksRegistered + 1;
            if (t._clicksRegistered < 2) {
                t._singleClickTimer = q.sap.delayedCall(t._doubleclickDelay, t, function() {
                    t._clicksRegistered = 0;
                    if (g) {
                        g.call(t, E);
                    }
                }, [E]);
            } else {
                q.sap.clearDelayedCall(t._singleClickTimer);
                t._clicksRegistered = 0;
                D.call(t, E);
            }
        });
    };
    T.prototype._findAndfireCellEvent = function(f, E, g) {
        var $ = q(E.target);
        var h = $.closest("td[role='gridcell']");
        var i = h.attr('id');
        var m = /.*-row(\d*)-col(\d*)/i.exec(i);
        var j = false;
        if (m) {
            var r = m[1];
            var k = m[2];
            var o = this.getRows()[r];
            var l = o && o.getCells()[k];
            var n = o && o.getIndex();
            var s = l.data('sap-ui-colid');
            var p;
            if (this.getBindingInfo('rows')) {
                p = o.getBindingContext(this.getBindingInfo('rows').model);
            }
            var t = {
                rowIndex: n,
                columnIndex: k,
                columnId: s,
                cellControl: l,
                rowBindingContext: p,
                cellDomRef: h.get(0)
            };
            j = !f.call(this, t);
            if (!j && typeof g === 'function') {
                t.cellDomRef = h[0];
                j = g.call(this, t);
            }
        }
        return j;
    };
    T.prototype.getFocusDomRef = function() {
        if (!this._oItemNavigation) {
            this._initItemNavigation();
        }
        return this._oItemNavigation.getFocusedDomRef() || C.prototype.getFocusDomRef.apply(this, arguments);
    };
    T.prototype.onfocusin = function(E) {
        var $ = q(E.target);
        var n = this.$().hasClass('sapUiTableEmpty');
        var f = $.hasClass('sapUiTableCtrlBefore');
        this._updateAriaRowOfRowsText();
        if (!this._bIgnoreFocusIn && (f || $.hasClass('sapUiTableCtrlAfter'))) {
            this.$('ariadesc').text(this._oResBundle.getText('TBL_TABLE'));
            this._leaveActionMode();
            if (q.contains(this.$().find('.sapUiTableColHdrCnt')[0], E.target)) {
                q(this._oItemNavigation.getFocusedDomRef() || this._oItemNavigation.getRootDomRef()).focus();
            } else {
                if (f) {
                    if (n) {
                        this._bIgnoreFocusIn = true;
                        this.$().find('.sapUiTableCtrlEmpty').focus();
                        this._bIgnoreFocusIn = false;
                    } else {
                        this._oItemNavigation.focusItem(this._oItemNavigation.getFocusedIndex() % this._oItemNavigation.iColumns, E);
                    }
                } else {
                    this._oItemNavigation.focusItem((this._oItemNavigation.getFocusedIndex() % this._oItemNavigation.iColumns) + (this._oItemNavigation.iColumns * this._iLastSelectedDataRow), E);
                }
            }
            if (!n) {
                E.preventDefault();
            }
        } else if (q.sap.endsWith(E.target.id, '-rsz')) {
            E.preventDefault();
            E.stopPropagation();
        }
    };
    T.prototype._getAbsoluteRowIndex = function(r) {
        var i = 0;
        var f = this.getFirstVisibleRow();
        var F = this.getFixedBottomRowCount();
        var v = this.getVisibleRowCount();
        var g = v - F;
        if (F > 0 && r >= g) {
            i = this.getBinding().getLength() - v + r;
        } else {
            i = f + r;
        }
        return i;
    };
    T.prototype._onSelect = function(E) {
        var $ = q(E.target);
        var s = E.shiftKey;
        var f = !!(E.metaKey || E.ctrlKey);
        var g = $.closest('.sapUiTableCol');
        if (this._bShowMenu && g.length === 1) {
            var i = parseInt(g.attr('data-sap-ui-colindex'), 10);
            var o = this.getColumns()[i];
            if ($.hasClass('sapUiTableColDropDown')) {
                var h = this.fireColumnSelect({
                    column: o
                });
                if (h) {
                    o._openMenu(g[0], E.type == 'keyup');
                }
            } else {
                this._onColumnSelect(o, g[0], this._isTouchMode(E), E.type == 'keyup');
            }
            return;
        }
        var j = $.closest('.sapUiTableRowHdr');
        if (j.length === 1) {
            var i = parseInt(j.attr('data-sap-ui-rowindex'), 10);
            this._onRowSelect(this._getAbsoluteRowIndex(i), s, f);
            return;
        }
        var k;
        if (E.target) {
            var l = q(E.target).closest('td');
            if (l.length > 0) {
                k = l[0];
            }
        }
        if (k && k.getAttribute('role') == 'gridcell' && (this.getSelectionBehavior() === sap.ui.table.SelectionBehavior.Row || this.getSelectionBehavior() === sap.ui.table.SelectionBehavior.RowOnly)) {
            var j = $.closest('.sapUiTableCtrl > tbody > tr');
            if (j.length === 1) {
                var i = parseInt(j.attr('data-sap-ui-rowindex'), 10);
                this._onRowSelect(this._getAbsoluteRowIndex(i), s, f);
                return;
            }
        }
        if (q.sap.containsOrEquals(this.getDomRef('selall'), E.target)) {
            this._toggleSelectAll();
            return;
        }
    };
    T.prototype._isRowSelectable = function(r) {
        return true;
    };
    T.prototype._onRowSelect = function(r, s, f) {
        if (!!sap.ui.Device.browser.internet_explorer && s) {
            this._clearTextSelection();
        }
        var B = this.getBinding('rows');
        if (!B) {
            return;
        }
        if (r < 0 || r >= (B.getLength() || 0)) {
            return;
        }
        if (!this._isRowSelectable(r)) {
            return;
        }
        this._iSourceRowIndex = r;
        var o = this.getSelectionMode();
        if (o !== sap.ui.table.SelectionMode.None) {
            if (o === sap.ui.table.SelectionMode.Single) {
                if (!this.isIndexSelected(r)) {
                    this.setSelectedIndex(r);
                } else {
                    this.clearSelection();
                }
            } else {
                if (o === sap.ui.table.SelectionMode.MultiToggle) {
                    f = true;
                }
                if (s) {
                    var i = this.getSelectedIndex();
                    if (i >= 0) {
                        this.addSelectionInterval(i, r);
                    } else {
                        this.setSelectedIndex(r);
                    }
                } else {
                    if (!this.isIndexSelected(r)) {
                        if (f) {
                            this.addSelectionInterval(r, r);
                        } else {
                            this.setSelectedIndex(r);
                        }
                    } else {
                        if (f) {
                            this.removeSelectionInterval(r, r);
                        } else {
                            if (this._getSelectedIndicesCount() === 1) {
                                this.clearSelection();
                            } else {
                                this.setSelectedIndex(r);
                            }
                        }
                    }
                }
            }
        }
        this._iSourceRowIndex = undefined;
    };
    T.prototype._onColumnSelect = function(o, D, i, w) {
        if (i && (o.getResizable() || o._menuHasItems())) {
            var $ = q(D);
            var f = $.find('.sapUiTableColCell');
            if ($.find('.sapUiTableColCellMenu').length < 1) {
                f.hide();
                var s = '';
                if (o._menuHasItems()) {
                    s = "<div class='sapUiTableColDropDown'></div>";
                }
                var g = '';
                if (o.getResizable()) {
                    g = "<div class='sapUiTableColResizer''></div>";
                }
                var h = q("<div class='sapUiTableColCellMenu'>" + s + g + '</div>');
                $.append(h);
                $.bind('focusout', function() {
                    this.cell.show();
                    this.menu.remove();
                    this.self.unbind('focusout');
                }.bind({
                    cell: f,
                    menu: h,
                    self: $
                }));
                if (o.getResizable()) {
                    $.find('.sapUiTableColResizer').bind('touchstart', q.proxy(this._onColumnResizeStart, this));
                }
            }
            return;
        }
        var E = this.fireColumnSelect({
            column: o
        });
        if (E) {
            o._openMenu(D, w);
        }
    };
    T.prototype._onColumnMoveStart = function(o, i) {
        this._disableTextSelection();
        var $ = o.$();
        var f = parseInt($.attr('data-sap-ui-colindex'), 10);
        if (f < this.getFixedColumnCount()) {
            return;
        }
        this.$().addClass('sapUiTableDragDrop');
        this._$colGhost = $.clone().removeAttr('id');
        $.css({
            'opacity': '.25'
        });
        this._$colGhost.addClass('sapUiTableColGhost').css({
            'left': -10000,
            'top': -10000,
            'position': 'absolute',
            'z-index': this.$().zIndex() + 10
        });
        this.$().find('.sapUiTableCol').each(function(h, E) {
            var $ = q(this);
            $.css({
                position: 'relative'
            });
            $.data('pos', {
                left: $.position().left,
                center: $.position().left + $.outerWidth() / 2,
                right: $.position().left + $.outerWidth()
            });
        });
        this._$colGhost.appendTo(document.body);
        var g = q(document.body);
        if (i) {
            g.bind('touchmove', q.proxy(this._onColumnMove, this));
            g.bind('touchend', q.proxy(this._onColumnMoved, this));
        } else {
            g.mousemove(q.proxy(this._onColumnMove, this));
            g.mouseup(q.proxy(this._onColumnMoved, this));
        }
    };
    T.prototype._onColumnMove = function(E) {
        var $ = this.$();
        var l = E.pageX;
        var L = E.pageY;
        if (E && this._isTouchMode(E)) {
            l = E.targetTouches[0].pageX;
            L = E.targetTouches[0].pageY;
            E.stopPropagation();
            E.preventDefault();
        }
        var r = this._bRtlMode;
        var i = l - $.offset().left;
        var D = parseInt(this._$colGhost.attr('data-sap-ui-colindex'), 10);
        var f = this.getColumns()[D].$();
        var o = this._iNewColPos;
        this._iNewColPos = D;
        var t = this;
        $.find('.sapUiTableCol').each(function(g, h) {
            var j = q(h);
            var k = parseInt(j.attr('data-sap-ui-colindex'), 10);
            var H = sap.ui.getCore().byId(j.attr('data-sap-ui-colid')).getHeaderSpan();
            var s;
            if (H) {
                if (q.isArray(H)) {
                    s = H[0];
                } else {
                    s = H;
                }
            } else {
                s = 1;
            }
            if (j.get(0) !== f.get(0)) {
                var p = j.data('pos');
                var B = i >= p.left && i <= p.center;
                var A = i >= p.center && i <= p.right;
                if (!r) {
                    if (B) {
                        t._iNewColPos = k;
                    } else if (A) {
                        t._iNewColPos = k + s;
                    } else {
                        t._iNewColPos = t._iNewColPos;
                    }
                } else {
                    if (A) {
                        t._iNewColPos = k;
                    } else if (B) {
                        t._iNewColPos = k + s;
                    } else {
                        t._iNewColPos = t._iNewColPos;
                    }
                }
                if ((B || A) && k > D) {
                    t._iNewColPos--;
                }
            }
        });
        if (this._iNewColPos <= this._iLastFixedColIndex) {
            this._iNewColPos = o;
        }
        if (this._iNewColPos < this.getFixedColumnCount()) {
            this._iNewColPos = o;
        }
        this._animateColumnMove(D, o, this._iNewColPos);
        this._$colGhost.css({
            'left': l + 5,
            'top': L + 5
        });
    };
    T.prototype._animateColumnMove = function(f, o, n) {
        var r = this._bRtlMode;
        var D = this.getColumns()[f].$();
        if (o !== n) {
            for (var i = Math.min(o, n), l = Math.max(o, n); i <= l; i++) {
                var g = this.getColumns()[i];
                if (i !== f && g.getVisible()) {
                    g.$().stop(true, true).animate({
                        left: '0px'
                    });
                }
            }
            var O = 0;
            if (n < f) {
                for (var i = n; i < f; i++) {
                    var g = this.getColumns()[i];
                    if (g.getVisible()) {
                        var $ = g.$();
                        O -= $.outerWidth();
                        $.stop(true, true).animate({
                            left: D.outerWidth() * (r ? -1 : 1) + 'px'
                        });
                    }
                }
            } else {
                for (var i = f + 1, l = n + 1; i < l; i++) {
                    var g = this.getColumns()[i];
                    if (g.getVisible()) {
                        var $ = g.$();
                        O += $.outerWidth();
                        $.stop(true, true).animate({
                            left: D.outerWidth() * (r ? 1 : -1) + 'px'
                        });
                    }
                }
            }
            D.stop(true, true).animate({
                left: O * (r ? -1 : 1) + 'px'
            });
        }
    };
    T.prototype._onColumnMoved = function(E) {
        this.$().removeClass('sapUiTableDragDrop');
        var D = parseInt(this._$colGhost.attr('data-sap-ui-colindex'), 10);
        var o = this.getColumns()[D];
        var B = q(document.body);
        B.unbind('touchmove', this._onColumnMove);
        B.unbind('touchend', this._onColumnMoved);
        B.unbind('mousemove', this._onColumnMove);
        B.unbind('mouseup', this._onColumnMoved);
        this._$colGhost.remove();
        this._$colGhost = undefined;
        this._enableTextSelection();
        var f = this.fireColumnMove({
            column: o,
            newPos: this._iNewColPos
        });
        var m = D < this._iNewColPos;
        if (f && this._iNewColPos !== undefined && this._iNewColPos !== D) {
            this.removeColumn(o);
            this.insertColumn(o, this._iNewColPos);
            var h = o.getHeaderSpan(),
                s;
            if (h) {
                if (q.isArray(h)) {
                    s = h[0];
                } else {
                    s = h;
                }
            } else {
                s = 1;
            }
            if (s > 1) {
                if (!m) {
                    this._iNewColPos++;
                }
                for (var i = 1; i < s; i++) {
                    var g = this.getColumns()[m ? D : D + i];
                    this.removeColumn(g);
                    this.insertColumn(g, this._iNewColPos);
                    this.fireColumnMove({
                        column: g,
                        newPos: this._iNewColPos
                    });
                    if (!m) {
                        this._iNewColPos++;
                    }
                }
            }
            this._oColHdrItemNav.setFocusedIndex(this._iNewColPos);
        } else {
            this._animateColumnMove(D, this._iNewColPos, D);
            o.$().css({
                'backgroundColor': '',
                'backgroundImage': '',
                'opacity': ''
            });
        }
        setTimeout(function() {
            var O = this._oItemNavigation.getFocusedIndex();
            this._oItemNavigation.focusItem(0, E);
            this._oItemNavigation.focusItem(O, E);
        }.bind(this), 0);
        delete this._iNewColPos;
    };
    T.prototype._onAutomaticColumnResize = function(E) {
        var i, o, h, m, f = 1,
            r = false;
        q.sap.log.debug('doubleclick fired');
        this._disableTextSelection();
        this._$colResize = q(E.target);
        this._$colResize.addClass('sapUiTableColRszActive');
        var p = parseInt(this._$colResize.prevAll('.sapUiTableCol').first().attr('data-sap-ui-colindex'), 10);
        i = parseInt(this._$colResize.attr('data-sap-ui-colindex'), 10);
        if (p != i) {
            r = true;
        }
        if (r) {
            o = this.getColumns()[p];
            h = o.getHeaderSpan();
            if (h instanceof Array) {
                m = Math.max.apply(Math, h);
            } else if (!!h) {
                m = h;
            }
            if (i + h - 1 != p) {
                f = m;
                i = p + m;
            }
        }
        if (f > 1) {
            while (i > p) {
                i--;
                this.autoResizeColumn(i);
            }
        } else {
            this.autoResizeColumn(i);
        }
        E.preventDefault();
        E.stopPropagation();
    };
    T.prototype._getResizerIdForColumn = function(i, f) {
        if (f > 0) {
            f--;
        }
        var o = this.getColumns()[this._aIdxCols2Cells[i + f]];
        return o.getId() + '-rsz';
    };
    T.prototype._onColumnResizeStart = function(E) {
        if (this._isTouchMode(E)) {
            this._iColumnResizeStart = E.targetTouches[0].pageX;
            this._disableTextSelection();
            var $ = q(E.target).closest('.sapUiTableCol');
            var i = parseInt($.attr('data-sap-ui-colindex'), 10);
            var f = $.attr('data-sap-ui-colspan');
            var r = this._getResizerIdForColumn(i, f);
            this._$colResize = q.sap.byId(r);
            q(document.body).bind('touchmove', q.proxy(this._onColumnResize, this));
            q(document.body).bind('touchend', q.proxy(this._onColumnResized, this));
            return;
        }
        var l = E.button === 0;
        if (l) {
            this._iColumnResizeStart = E.pageX;
            this._disableTextSelection();
            this._$colResize = q(E.target);
            q(document.body).mousemove(q.proxy(this._onColumnResize, this)).mouseup(q.proxy(this._onColumnResized, this));
        }
    };
    T.prototype._onColumnResize = function(E) {
        var l;
        if (this._isTouchMode(E)) {
            l = E.targetTouches[0].pageX;
            E.stopPropagation();
            E.preventDefault();
        } else {
            l = E.pageX;
        }
        if (this._iColumnResizeStart && l < this._iColumnResizeStart + 3 && l > this._iColumnResizeStart - 3) {
            return;
        }
        if (this._isTouchMode(E)) {
            this._$colResize.addClass('sapUiTableColTouchRszActive');
        } else {
            this._$colResize.addClass('sapUiTableColRszActive');
        }
        var $ = this.$();
        var r = this._bRtlMode;
        var i = parseInt(this._$colResize.attr('data-sap-ui-colindex'), 10);
        var o = this.getColumns()[i];
        var f = $.find(".sapUiTableCtrlFirstCol > th[data-sap-ui-headcolindex='" + i + "']");
        var g = f.position().left;
        var w;
        if (!r) {
            if (this.getFixedColumnCount() > 0 && i >= this.getFixedColumnCount()) {
                var F = $.find('.sapUiTableColHdrFixed').width();
                g = g + F;
                g = g - $.find('.sapUiTableCtrlScr').scrollLeft();
            }
            var O = $.find('.sapUiTableCtrlFirstCol > th:first').offset().left;
            var h = l - O;
            w = h - g;
        } else {
            var s;
            if (this.getFixedColumnCount() > 0 && i < this.getFixedColumnCount()) {
                s = $.find('.sapUiTableCtrlScrFixed');
            } else {
                s = $.find('.sapUiTableCtrlScr');
            }
            var j = s.scrollLeft();
            if (sap.ui.Device.browser.internet_explorer) {
                j = s[0].scrollWidth - j - s[0].clientWidth;
            } else if (sap.ui.Device.browser.firefox) {
                j = j + s[0].scrollWidth - s[0].clientWidth;
            }
            var D = g - j - l + s.offset().left;
            w = f.outerWidth() + D;
        }
        w = Math.max(w, this._iColMinWidth);
        var k = $.find('.sapUiTableCnt').offset().left;
        var m = l - k;
        m -= this._$colResize.width() / 2;
        this._$colResize.css('left', m);
        o._iNewWidth = w;
    };
    T.prototype._onColumnResized = function(E, i) {
        var f;
        if (!this._$colResize && (i === null || i === undefined)) {
            return;
        }
        if (i === null || i === undefined) {
            f = parseInt(this._$colResize.attr('data-sap-ui-colindex'), 10);
        } else {
            f = i;
        }
        var o = this.getColumns()[f];
        var r = false;
        if (o._iNewWidth) {
            var w;
            var A = this.$().find('.sapUiTableCtrl').width();
            if (!this._checkPercentageColumnWidth()) {
                w = o._iNewWidth + 'px';
            } else {
                var g = Math.round(100 / A * o._iNewWidth);
                w = g + '%';
            }
            if (this._updateColumnWidth(o, w, true)) {
                this._resizeDependentColumns(o, w);
            }
            delete o._iNewWidth;
            r = true;
        }
        var B = q(document.body);
        B.unbind('touchmove', this._onColumnResize);
        B.unbind('touchend', this._onColumnResized);
        B.unbind('mousemove', this._onColumnResize);
        B.unbind('mouseup', this._onColumnResized);
        o.focus();
        if (this._$colResize) {
            this._$colResize.removeClass('sapUiTableColTouchRszActive sapUiTableColRszActive');
            this._$colResize = undefined;
        }
        this._enableTextSelection();
        if (r) {
            this.invalidate();
        }
    };
    T.prototype._resizeDependentColumns = function(o, w) {
        if (this._checkPercentageColumnWidth()) {
            var v = this._getVisibleColumns();
            var f;
            q.each(v, function(u, x) {
                if (o === x) {
                    f = u;
                }
            });
            var O = 0;
            var l = v.length - 1;
            var t;
            if (f === undefined) {
                t = 0;
            } else {
                t = parseInt(w, 10);
            }
            var p = 0;
            var g = [];
            var h = this;
            q.each(v, function(u, x) {
                var y = h._getColumnPercentageWidth(x);
                if ((((f === l && u < f) || ((f !== l) && u > f)) && x.getFlexible()) || f === undefined) {
                    O += x.$().outerWidth();
                    p += y;
                    g.push(x);
                } else if (u !== f) {
                    t += y;
                }
            });
            var j = t;
            q.each(g, function(u, x) {
                var y = h._getColumnPercentageWidth(x);
                var N = Math.round((100 - j) / p * y);
                if (u === g.length - 1) {
                    N = 100 - t;
                } else {
                    t += N;
                }
                h._updateColumnWidth(x, N + '%');
            });
        } else if (!this._hasOnlyFixColumnWidths()) {
            var v = this._getVisibleColumns(),
                A = this.$().find('.sapUiTableCtrl').width(),
                f, r = 0,
                L = 0,
                k = 0,
                n = 0;
            q.each(v, function(u, x) {
                if (!q.sap.endsWith(x.getWidth(), 'px') && !q.sap.endsWith(x.getWidth(), 'em') && !q.sap.endsWith(x.getWidth(), 'rem')) {
                    n++;
                    return false;
                }
                if (f != undefined) {
                    k += this._CSSSizeToPixel(x.getWidth());
                    r++;
                } else if (o !== x) {
                    L += this._CSSSizeToPixel(x.getWidth());
                }
                if (o === x) {
                    f = u;
                    L += this._CSSSizeToPixel(w);
                }
            }.bind(this));
            if (n > 0 || (L + k > A)) {
                return;
            }
            A -= L;
            for (var i = f + 1; i < v.length; i++) {
                var o = v[i],
                    m = this._CSSSizeToPixel(o.getWidth()),
                    s = m / k * 100,
                    N = A / 100 * s;
                this._updateColumnWidth(o, Math.round(N) + 'px');
            }
        }
    };
    T.prototype._getColumnPercentageWidth = function(o) {
        var s = o.getWidth();
        var i = parseInt(o.getWidth(), 10);
        var t = this.$().find('.sapUiTableCtrl').width();
        if (q.sap.endsWith(s, 'px') || q.sap.endsWith(s, 'em') || q.sap.endsWith(s, 'rem')) {
            i = Math.round(100 / t * i);
        } else if (!q.sap.endsWith(s, '%')) {
            i = Math.round(100 / t * o.$().width());
        }
        return i;
    };
    T.prototype._updateColumnWidth = function(o, w, f) {
        var E = true;
        if (f) {
            E = this.fireColumnResize({
                column: o,
                width: w
            });
        }
        if (E) {
            o.setProperty('width', w, true);
            this.$().find('th[aria-owns="' + o.getId() + '"]').css('width', w);
        }
        return E;
    };
    T.prototype._checkPercentageColumnWidth = function() {
        var f = this.getColumns();
        var h = false;
        q.each(f, function(i, o) {
            if (q.sap.endsWith(o.getWidth(), '%')) {
                h = true;
                return false;
            }
        });
        return h;
    };
    T.prototype._hasOnlyFixColumnWidths = function() {
        var o = true;
        q.each(this.getColumns(), function(i, f) {
            var w = f.getWidth();
            if (f.getFlexible() || !w || w.substr(-2) !== 'px') {
                o = false;
                return false;
            }
        });
        return o;
    };
    T.prototype.pushSortedColumn = function(o, A) {
        if (!A) {
            this._aSortedColumns = [];
        }
        this._aSortedColumns.push(o);
    };
    T.prototype.getSortedColumns = function() {
        return this._aSortedColumns;
    };
    T.prototype.sort = function(o, s, A) {
        if (q.inArray(o, this.getColumns()) >= 0) {
            o.sort(s === sap.ui.table.SortOrder.Descending, A);
        }
    };
    T.prototype.filter = function(o, v) {
        if (q.inArray(o, this.getColumns()) >= 0) {
            o.filter(v);
        }
    };
    T.prototype._getSelectOnCellsAllowed = function() {
        var s = this.getSelectionBehavior();
        var f = this.getSelectionMode();
        return f !== sap.ui.table.SelectionMode.None && (s === sap.ui.table.SelectionBehavior.Row || s === sap.ui.table.SelectionBehavior.RowOnly);
    };
    T.prototype._getAriaTextsForSelectionMode = function(f, s) {
        if (!s) {
            s = this.getSelectionMode();
        }
        var r = this._oResBundle;
        var t = {
            mouse: {
                rowSelect: '',
                rowDeselect: ''
            },
            keyboard: {
                rowSelect: '',
                rowDeselect: ''
            }
        };
        var i = this._getSelectedIndicesCount();
        if (s === sap.ui.table.SelectionMode.Single) {
            t.mouse.rowSelect = r.getText('TBL_ROW_SELECT');
            t.mouse.rowDeselect = r.getText('TBL_ROW_DESELECT');
            t.keyboard.rowSelect = r.getText('TBL_ROW_SELECT_KEY');
            t.keyboard.rowDeselect = r.getText('TBL_ROW_DESELECT_KEY');
        } else if (s === sap.ui.table.SelectionMode.Multi) {
            t.mouse.rowSelect = r.getText('TBL_ROW_SELECT_MULTI');
            t.mouse.rowDeselect = r.getText('TBL_ROW_DESELECT_MULTI');
            t.keyboard.rowSelect = r.getText('TBL_ROW_SELECT_MULTI_KEY');
            t.keyboard.rowDeselect = r.getText('TBL_ROW_DESELECT_MULTI_KEY');
            if (f === true) {
                if (i === 1) {
                    t.mouse.rowDeselect = r.getText('TBL_ROW_DESELECT');
                    t.keyboard.rowDeselect = r.getText('TBL_ROW_DESELECT_KEY');
                } else if (i === 0) {
                    t.mouse.rowSelect = r.getText('TBL_ROW_SELECT');
                    t.keyboard.rowSelect = r.getText('TBL_ROW_SELECT_KEY');
                }
            }
        } else if (s === sap.ui.table.SelectionMode.MultiToggle) {
            t.mouse.rowSelect = r.getText('TBL_ROW_SELECT_MULTI_TOGGLE');
            t.mouse.rowDeselect = r.getText('TBL_ROW_DESELECT');
            t.keyboard.rowSelect = r.getText('TBL_ROW_SELECT_MULTI_TOGGLE_KEY');
            t.keyboard.rowDeselect = r.getText('TBL_ROW_DESELECT_KEY');
            if (f === true && i === 0) {
                t.mouse.rowSelect = r.getText('TBL_ROW_SELECT');
                t.keyboard.rowSelect = r.getText('TBL_ROW_SELECT_KEY');
            }
        }
        return t;
    };
    T.prototype._updateSelection = function() {
        if (this.getSelectionMode() === sap.ui.table.SelectionMode.None) {
            return;
        }
        var t = this._getAriaTextsForSelectionMode(true);
        var s = this._getSelectOnCellsAllowed();
        var r = this.getRows();
        for (var i = 0; i < r.length; i++) {
            var o = r[i];
            o._updateSelection(this, t, s);
        }
        this.setProperty('selectedIndex', this.getSelectedIndex(), true);
    };
    T.prototype._onSelectionChanged = function(E) {
        var r = E.getParameter('rowIndices');
        var i = this._iSourceRowIndex !== undefined ? this._iSourceRowIndex : this.getSelectedIndex();
        this._updateSelection();
        var s = this.getSelectionMode();
        if (s === 'Multi' || s === 'MultiToggle') {
            this.$('selall').attr('title', this._oResBundle.getText('TBL_SELECT_ALL')).addClass('sapUiTableSelAll');
        }
        this.fireRowSelectionChange({
            rowIndex: i,
            rowContext: this.getContextByIndex(i),
            rowIndices: r,
            userInteraction: this._iSourceRowIndex !== undefined
        });
    };
    T.prototype.getContextByIndex = function(i) {
        var B = this.getBinding('rows');
        return i >= 0 && B ? B.getContexts(i, 1)[0] : null;
    };
    T.prototype.getSelectedIndex = function() {
        return this._oSelection.getLeadSelectedIndex();
    };
    T.prototype.setSelectedIndex = function(i) {
        if (i === -1) {
            this.clearSelection();
        } else {
            this._oSelection.setSelectionInterval(i, i);
        }
        return this;
    };
    T.prototype.clearSelection = function() {
        this._oSelection.clearSelection();
        return this;
    };
    T.prototype.selectAll = function() {
        var s = this.getSelectionMode();
        if (!this.getEnableSelectAll() || (s != 'Multi' && s != 'MultiToggle')) {
            return this;
        }
        var B = this.getBinding('rows');
        if (B) {
            this._oSelection.setSelectionInterval((B.getLength() || 0) - 1, 0);
            this.$('selall').attr('title', this._oResBundle.getText('TBL_DESELECT_ALL')).removeClass('sapUiTableSelAll');
        }
        return this;
    };
    T.prototype.getSelectedIndices = function() {
        return this._oSelection.getSelectedIndices();
    };
    T.prototype.addSelectionInterval = function(i, f) {
        this._oSelection.addSelectionInterval(i, f);
        return this;
    };
    T.prototype.setSelectionInterval = function(i, f) {
        this._oSelection.setSelectionInterval(i, f);
        return this;
    };
    T.prototype.removeSelectionInterval = function(i, f) {
        this._oSelection.removeSelectionInterval(i, f);
        return this;
    };
    T.prototype.isIndexSelected = function(i) {
        return this._oSelection.isSelectedIndex(i);
    };
    T.prototype._scrollNext = function() {
        if (this.getFirstVisibleRow() < this._getRowCount() - this.getVisibleRowCount()) {
            this.setFirstVisibleRow(Math.min(this.getFirstVisibleRow() + 1, this._getRowCount() - this.getVisibleRowCount()));
        }
    };
    T.prototype._scrollPrevious = function() {
        if (this.getFirstVisibleRow() > 0) {
            this.setFirstVisibleRow(Math.max(this.getFirstVisibleRow() - 1, 0));
        }
    };
    T.prototype._scrollPageUp = function() {
        this.setFirstVisibleRow(Math.max(this.getFirstVisibleRow() - this.getVisibleRowCount(), 0));
    };
    T.prototype._scrollPageDown = function() {
        this.setFirstVisibleRow(Math.min(this.getFirstVisibleRow() + this.getVisibleRowCount() - this.getFixedBottomRowCount(), this._getRowCount() - this.getVisibleRowCount()));
    };
    T.prototype._isTopRow = function(E) {
        var $ = q(E.target);
        var r = parseInt($.add($.parent()).filter('[data-sap-ui-rowindex]').attr('data-sap-ui-rowindex'), 10);
        var f = this.getFixedRowCount();
        if (f > 0 && r >= f) {
            return r === f;
        }
        return r === 0;
    };
    T.prototype._isBottomRow = function(E) {
        var $ = q(E.target);
        var r = parseInt($.add($.parent()).filter('[data-sap-ui-rowindex]').attr('data-sap-ui-rowindex'), 10);
        var f = this.getFixedBottomRowCount();
        if (f > 0 && r <= this.getVisibleRowCount() - 1 - f) {
            return r === this.getVisibleRowCount() - 1 - f;
        }
        return r === this.getVisibleRowCount() - 1;
    };
    T.prototype._enterActionMode = function(f) {
        if (f.length > 0 && !this._bActionMode) {
            if (f.filter(':sapTabbable').length == 0) {
                return;
            }
            this._bActionMode = true;
            this.removeDelegate(this._oItemNavigation);
            q(this._oItemNavigation.getFocusedDomRef()).attr('tabindex', '-1');
            f.filter(':sapTabbable').eq(0).focus();
        }
    };
    T.prototype._leaveActionMode = function(E) {
        if (this._bActionMode) {
            this._bActionMode = false;
            this.addDelegate(this._oItemNavigation);
            q(this._oItemNavigation.getFocusedDomRef()).attr('tabindex', '0');
            if (E) {
                if (q(E.target).closest("td[tabindex='-1']").length > 0) {
                    var i = q(this._oItemNavigation.aItemDomRefs).index(q(E.target).closest("td[tabindex='-1']").get(0));
                    this._oItemNavigation.focusItem(i, null);
                } else {
                    if (q.sap.containsOrEquals(this.$().find('.sapUiTableCCnt').get(0), E.target)) {
                        this._oItemNavigation.focusItem(this._oItemNavigation.getFocusedIndex(), null);
                    }
                }
            } else {
                this._oItemNavigation.focusItem(this._oItemNavigation.getFocusedIndex(), null);
            }
        }
    };
    T.prototype._getFocusedRowIndex = function() {
        var f = this._oItemNavigation.iFocusedIndex;
        var i = this._oItemNavigation.iColumns;
        var s = f % i;
        var g = this.getFirstVisibleRow() + (f - s) / i;
        if (!this.getColumnHeaderVisible()) {
            g++;
        }
        return g - 1;
    };
    T.prototype._isFocusedRowSelected = function() {
        var s = this._getFocusedRowIndex();
        var i = this.isIndexSelected(s);
        var f = (this._oItemNavigation.iFocusedIndex % this._oItemNavigation.iColumns == 0);
        if (f) {
            return i;
        } else {
            var h = this.getSelectionMode() !== sap.ui.table.SelectionMode.None && this.getSelectionBehavior() !== sap.ui.table.SelectionBehavior.RowOnly;
            if (h) {
                return null;
            } else {
                return i;
            }
        }
    };
    T.prototype.onkeyup = function(E) {
        if (!this._bEventSapSelect === true) {
            return;
        }
        this._bEventSapSelect = false;
        if (E.keyCode !== q.sap.KeyCodes.ENTER && E.keyCode !== q.sap.KeyCodes.SPACE && E.keyCode !== q.sap.KeyCodes.F4 || E.srcControl !== this && q.inArray(E.srcControl, this.getRows()) === -1 && q.inArray(E.srcControl, this.getColumns()) === -1) {
            return;
        }
        var p = q(E.target).closest('.sapUiTableGroupHeader');
        if (p.length > 0) {
            var r = this.getFirstVisibleRow() + parseInt(p.attr('data-sap-ui-rowindex'), 10);
            var B = this.getBinding('rows');
            if (B) {
                if (B.isExpanded(r)) {
                    B.collapse(r);
                } else {
                    B.expand(r);
                }
            }
            E.preventDefault();
            return;
        }
        this._bShowMenu = true;
        this._onSelect(E);
        this._bShowMenu = false;
        E.preventDefault();
    };
    T.prototype.onsapselect = function() {
        this._bEventSapSelect = true;
    };
    T.prototype.onsapselectmodifiers = function() {
        this._bEventSapSelect = true;
    };
    T.prototype.onsapspace = function(E) {
        var $ = q(E.target);
        if (((this.getSelectionBehavior() == sap.ui.table.SelectionBehavior.Row || this.getSelectionBehavior() == sap.ui.table.SelectionBehavior.RowOnly) && E.srcControl instanceof sap.ui.table.Row) || $.hasClass('sapUiTableRowHdr') || $.hasClass('sapUiTableColRowHdr') || $.hasClass('sapUiTableCol')) {
            E.preventDefault();
        }
    };
    T.prototype.onkeydown = function(E) {
        var $ = this.$();
        if (!this._bActionMode && E.keyCode == q.sap.KeyCodes.F2 || E.keyCode == q.sap.KeyCodes.ENTER) {
            if ($.find('.sapUiTableCtrl td:focus').length > 0) {
                this._enterActionMode($.find('.sapUiTableCtrl td:focus').find(':sapFocusable'));
                E.preventDefault();
                E.stopPropagation();
            }
        } else if (this._bActionMode && E.keyCode == q.sap.KeyCodes.F2) {
            this._leaveActionMode(E);
        } else if (E.keyCode == q.sap.KeyCodes.TAB && this._bActionMode) {
            if (this.getFixedColumnCount() > 0) {
                var f = q(E.target);
                if (f.is('td[role=gridcell]') == false) {
                    f = f.parents('td[role=gridcell]');
                }
                var g = f.parent('tr[data-sap-ui-rowindex]');
                var h = g.closest('.sapUiTableCtrl');
                var r = parseInt(g.attr('data-sap-ui-rowindex'), 10);
                var i = g.find('td[role=gridcell]');
                var j = i.index(f);
                var t = i.length;
                if (j === (t - 1)) {
                    var k;
                    if (h.hasClass('sapUiTableCtrlFixed')) {
                        k = $.find('.sapUiTableCtrl.sapUiTableCtrlScroll');
                    } else {
                        k = $.find('.sapUiTableCtrl.sapUiTableCtrlFixed');
                        r++;
                        if (r == this.getVisibleRowCount()) {
                            r = 0;
                        }
                    }
                    var l = k.find("tr[data-sap-ui-rowindex='" + r + "']");
                    var m = l.find("td :sapFocusable[tabindex='0']").first();
                    if (m.length > 0) {
                        m.focus();
                        E.preventDefault();
                    }
                }
            }
        } else if (E.keyCode == q.sap.KeyCodes.A && (E.metaKey || E.ctrlKey)) {
            var o = this._oItemNavigation;
            var F = o.getFocusedIndex();
            this._toggleSelectAll();
            o.focusItem(F, E);
            E.preventDefault();
            E.stopImmediatePropagation(true);
        } else if (E.keyCode === q.sap.KeyCodes.F10 && (E.shiftKey)) {
            this.oncontextmenu(E);
        }
    };
    T.prototype.onsapescape = function(E) {
        this._leaveActionMode(E);
    };
    T.prototype.onsaptabprevious = function(E) {
        var $ = this.$();
        if (this._bActionMode) {
            this._leaveActionMode();
            E.preventDefault();
        } else {
            var i = this._oItemNavigation;
            var n = this.$().hasClass('sapUiTableEmpty');
            var s = $.find('.sapUiTableCCnt')[0];
            var f = q.contains(s, E.target);
            if (f && this.getColumnHeaderVisible()) {
                var g = i.getFocusedIndex() % i.iColumns;
                i.focusItem(g, E);
                E.preventDefault();
            } else if (i.getFocusedDomRef() === E.target && q.sap.containsOrEquals(s, E.target) || (!this.getColumnHeaderVisible() && n && f)) {
                this._bIgnoreFocusIn = true;
                $.find('.sapUiTableCtrlBefore').focus();
                this._bIgnoreFocusIn = false;
            }
        }
    };
    T.prototype.onsaptabnext = function(E) {
        var $ = this.$();
        if (this._bActionMode) {
            this._leaveActionMode();
            E.preventDefault();
        } else {
            var i = this._oItemNavigation;
            var f = q.contains($.find('.sapUiTableColHdrCnt')[0], E.target);
            var n = this.$().hasClass('sapUiTableEmpty');
            if (f && !n) {
                i.focusItem(i.getFocusedIndex() + i.iColumns * this._iLastSelectedDataRow, E);
                E.preventDefault();
            } else if (i.getFocusedDomRef() === E.target || (n && f)) {
                this._bIgnoreFocusIn = true;
                $.find('.sapUiTableCtrlAfter').focus();
                this._bIgnoreFocusIn = false;
            }
        }
    };
    T.prototype._updateAriaRowOfRowsText = function(f) {
        var A = document.getElementById(this.getId() + '-rownumberofrows');
        if (!A) {
            return;
        }
        var i = this._oItemNavigation;
        if (i) {
            var g = i.getFocusedIndex();
            var h = g % i.iColumns;
            var F = this.getFirstVisibleRow();
            var t = this._getRowCount();
            var r = Math.floor(g / i.iColumns) + F + 1 - this._getHeaderRowCount();
            var s = (this._oResBundle.hasText('TBL_NO_DATA')== true)? this._oResBundle.getText('TBL_ROW_ROWCOUNT', [r, t]) : oCnt_FHelps.f_readTranslate("TBL_ROW_ROWCOUNT_LINE")+" "+r+" "+oCnt_FHelps.f_readTranslate("TBL_ROW_ROWCOUNT_OF")+" "+t;
            if (r > 0 && h === 0 || f) {
                A.innerText = s;
            } else {
                A.innerText = ' ';
            }
        }
    };
    T.prototype.onsapdown = function(E) {
        if (!this._bActionMode && this._isBottomRow(E)) {
            if (this.getFirstVisibleRow() != this._getRowCount() - this.getVisibleRowCount()) {
                E.stopImmediatePropagation(true);
                if (this.getNavigationMode() === sap.ui.table.NavigationMode.Scrollbar) {
                    this._scrollNext();
                } else {
                    this._scrollPageDown();
                }
            }
        }
        E.preventDefault();
    };
    T.prototype.onsapdownmodifiers = function(E) {
        if (E.shiftKey) {
            var f = this._getFocusedRowIndex();
            var i = this._isFocusedRowSelected();
            if (i === true) {
                this.addSelectionInterval(f + 1, f + 1);
            } else if (i === false) {
                this.removeSelectionInterval(f + 1, f + 1);
            }
            if (this._isBottomRow(E)) {
                this._scrollNext();
            }
        } else if (E.altKey) {
            this._toggleGroupHeader(E);
        }
    };
    T.prototype.onsapupmodifiers = function(E) {
        if (E.shiftKey) {
            var f = this._getFocusedRowIndex();
            var i = this._isFocusedRowSelected();
            if (i === true) {
                this.addSelectionInterval(f - 1, f - 1);
            } else if (i === false) {
                this.removeSelectionInterval(f - 1, f - 1);
            }
            if (this._isTopRow(E)) {
                if (this.getFirstVisibleRow() != 0) {
                    E.stopImmediatePropagation(true);
                }
                this._scrollPrevious();
            }
        } else if (E.altKey) {
            this._toggleGroupHeader(E);
        }
    };
    T.prototype.onsapup = function(E) {
        if (!this._bActionMode && this._isTopRow(E)) {
            if (this.getFirstVisibleRow() != 0) {
                E.stopImmediatePropagation(true);
            }
            if (this.getNavigationMode() === sap.ui.table.NavigationMode.Scrollbar) {
                this._scrollPrevious();
            } else {
                this._scrollPageUp();
            }
        }
        E.preventDefault();
    };
    T.prototype.onsappagedown = function(E) {
        if (!this._bActionMode) {
            var $ = this.$();
            var i = this._oItemNavigation;
            var r = (this.getSelectionBehavior() !== sap.ui.table.SelectionBehavior.RowOnly);
            var h = $.find('.sapUiTableColHdrScr>.sapUiTableColHdr').length;
            if (this.getColumnHeaderVisible() && i.iFocusedIndex < (i.iColumns * h)) {
                var f = i.iFocusedIndex % i.iColumns;
                if ((i.iFocusedIndex <= (i.iColumns * h) && i.iFocusedIndex >= (i.iColumns * h) - i.iColumns) || (f === 0 && r)) {
                    this.setFirstVisibleRow(0);
                    i.focusItem(i.iColumns * h + f, E);
                } else {
                    i.focusItem(i.iColumns * h - i.iColumns + f, E);
                }
                E.stopImmediatePropagation(true);
            } else {
                if (this._isBottomRow(E)) {
                    this._scrollPageDown();
                }
                var F = this.getFixedBottomRowCount();
                if (this.getFirstVisibleRow() === this._getRowCount() - this.getVisibleRowCount()) {
                    F = 0;
                }
                var g = (i.aItemDomRefs.length / i.iColumns) - F;
                var f = i.iFocusedIndex % i.iColumns;
                var j = (g - 1) * i.iColumns + f;
                i.focusItem(j, E);
                E.stopImmediatePropagation(true);
            }
            E.preventDefault();
        }
    };
    T.prototype.onsappagedownmodifiers = function(E) {
        if (!this._bActionMode && E.altKey) {
            var i = this._oItemNavigation;
            var r = (this.getSelectionBehavior() !== sap.ui.table.SelectionBehavior.RowOnly);
            var f = i.iFocusedIndex % i.iColumns;
            var n;
            if (f == 0 && r) {
                n = 1;
            } else {
                var v = this._aVisibleColumns.length;
                var m = this._getVisibleColumns().length;
                if (!r) {
                    m--;
                }
                if (v === 0) {
                    n = m;
                } else {
                    n = Math.min(m, f + v);
                }
            }
            i.focusItem(i.iFocusedIndex - (f - n), E);
            E.stopImmediatePropagation(true);
            E.preventDefault();
        }
    };
    T.prototype.onsappageup = function(E) {
        if (!this._bActionMode) {
            var $ = this.$();
            var i = this._oItemNavigation;
            var r = (this.getSelectionBehavior() !== sap.ui.table.SelectionBehavior.RowOnly);
            var h = $.find('.sapUiTableColHdrScr>.sapUiTableColHdr').length;
            var f = i.iFocusedIndex % i.iColumns;
            if (this.getColumnHeaderVisible() && i.iFocusedIndex < (i.iColumns * h)) {
                if (i.iFocusedIndex > i.iColumns) {
                    i.focusItem(f, E);
                }
                E.stopImmediatePropagation(true);
            } else {
                if (this.getColumnHeaderVisible() && this.getFirstVisibleRow() == 0 && this._isTopRow(E)) {
                    if (r && f === 0) {
                        i.focusItem(f, E);
                    } else {
                        i.focusItem(i.iColumns * h - i.iColumns + f, E);
                    }
                    E.stopImmediatePropagation(true);
                } else {
                    var g = this.getColumnHeaderVisible() ? i.iColumns * h : 0;
                    i.focusItem(g + f, E);
                    E.stopImmediatePropagation(true);
                    if (this._isTopRow(E)) {
                        this._scrollPageUp();
                    }
                }
            }
            E.preventDefault();
        }
    };
    T.prototype.onsappageupmodifiers = function(E) {
        if (!this._bActionMode && E.altKey) {
            var i = this._oItemNavigation;
            var r = (this.getSelectionBehavior() !== sap.ui.table.SelectionBehavior.RowOnly);
            var f = i.iFocusedIndex % i.iColumns;
            if (f > 0) {
                var n;
                if (f == 1 && r) {
                    n = 0;
                } else {
                    var v = this._aVisibleColumns.length;
                    if (v === 0) {
                        if (r) {
                            n = 1;
                        } else {
                            n = 0;
                        }
                    } else {
                        var m = 1;
                        if (!r) {
                            m = 0;
                        }
                        n = Math.max(m, f - v);
                    }
                }
                i.focusItem(i.iFocusedIndex - (f - n), E);
            }
            E.stopImmediatePropagation(true);
            E.preventDefault();
        }
    };
    T.prototype.onsaphome = function(E) {
        var i = (this.getSelectionBehavior() == sap.ui.table.SelectionBehavior.RowOnly);
        var f = q(E.target).parents('.sapUiTableGroupHeader').length > 0;
        if (f) {
            E.stopImmediatePropagation(true);
            return;
        }
        var F = this._oItemNavigation.iFocusedIndex;
        var g = this._oItemNavigation.iColumns;
        var s = F % g;
        var o = 0;
        if (!i) {
            o = 1;
        }
        if (s > this.getFixedColumnCount() + o) {
            E.stopImmediatePropagation(true);
            this._oItemNavigation.focusItem(F - s + this.getFixedColumnCount() + o, null);
        } else if (!i) {
            if (s > 1) {
                E.stopImmediatePropagation(true);
                this._oItemNavigation.focusItem(F - s + 1, null);
            } else if (s == 1) {
                E.stopImmediatePropagation(true);
                this._oItemNavigation.focusItem(F - 1, null);
            } else {
                E.stopImmediatePropagation(true);
            }
        }
    };
    T.prototype.onsapend = function(E) {
        var i = q(E.target).parents('.sapUiTableGroupHeader').length > 0;
        if (i) {
            E.stopImmediatePropagation(true);
            return;
        }
        var f = this._oItemNavigation.iFocusedIndex;
        var g = this._oItemNavigation.iColumns;
        var s = f % g;
        var h = (this.getSelectionBehavior() !== sap.ui.table.SelectionBehavior.RowOnly);
        var o = 0;
        if (!h) {
            o = 1;
        }
        if (s === 0 && h) {
            E.stopImmediatePropagation(true);
            this._oItemNavigation.focusItem(f + 1, null);
        } else if (s < this.getFixedColumnCount() - o) {
            E.stopImmediatePropagation(true);
            this._oItemNavigation.focusItem(f - s + this.getFixedColumnCount() - o, null);
        }
    };
    T.prototype.onsaphomemodifiers = function(E) {
        if (E.metaKey || E.ctrlKey) {
            var $ = this.$();
            var t = $.find('.sapUiTableColHdrCnt')[0];
            var i = q.contains(t, E.target);
            if (i) {
                E.stopImmediatePropagation(true);
                return;
            }
            var f = this._oItemNavigation.iFocusedIndex;
            var g = this._oItemNavigation.iColumns;
            var s = Math.ceil(f / g) - 1;
            var h = f % g;
            if (this.getColumnHeaderVisible()) {
                if (s == 1) {
                    E.stopImmediatePropagation(true);
                    this._oItemNavigation.focusItem(h, E);
                } else if (s > 1) {
                    E.stopImmediatePropagation(true);
                    this.setFirstVisibleRow(0);
                    var j = h + g;
                    this._oItemNavigation.focusItem(j, E);
                }
            } else {
                E.stopImmediatePropagation(true);
                this.setFirstVisibleRow(0);
                var j = f - s * g;
                this._oItemNavigation.focusItem(j, E);
            }
        }
    };
    T.prototype.onsapendmodifiers = function(E) {
        if (E.metaKey || E.ctrlKey) {
            var $ = this.$();
            var t = $.find('.sapUiTableColHdrCnt')[0];
            var i = q.contains(t, E.target);
            var f = this._oItemNavigation.iFocusedIndex;
            var g = this._oItemNavigation.iColumns;
            var s = f % g;
            E.stopImmediatePropagation(true);
            if (i) {
                this._oItemNavigation.focusItem(f + g, E);
            } else {
                this.setFirstVisibleRow(this._getRowCount() - this.getVisibleRowCount());
                var h = this._oItemNavigation.aItemDomRefs.length - (g - s);
                this._oItemNavigation.focusItem(h, E);
            }
        }
    };
    T.prototype.onsapleft = function(E) {
        this._collapseGroupHeader(E);
    };
    T.prototype.onsapright = function(E) {
        this._expandGroupHeader(E);
    };
    T.prototype._toggleGroupHeader = function(E) {
        var p = q(E.target).closest('.sapUiTableGroupHeader');
        if (p.length > 0) {
            var r = this.getFirstVisibleRow() + parseInt(p.attr('data-sap-ui-rowindex'), 10);
            var B = this.getBinding('rows');
            if (B && B.isExpanded(r)) {
                B.collapse(r);
            } else {
                B.expand(r);
            }
            E.preventDefault();
            E.stopImmediatePropagation();
        }
    };
    T.prototype._collapseGroupHeader = function(E) {
        var p = q(E.target).closest('.sapUiTableGroupHeader');
        if (p.length > 0) {
            var r = this.getFirstVisibleRow() + parseInt(p.attr('data-sap-ui-rowindex'), 10);
            var B = this.getBinding('rows');
            if (B && B.isExpanded(r)) {
                B.collapse(r);
            }
            E.preventDefault();
            E.stopImmediatePropagation();
        }
    };
    T.prototype._expandGroupHeader = function(E) {
        var p = q(E.target).closest('.sapUiTableGroupHeader');
        if (p.length > 0) {
            var r = this.getFirstVisibleRow() + parseInt(p.attr('data-sap-ui-rowindex'), 10);
            var B = this.getBinding('rows');
            if (B && !B.isExpanded(r)) {
                B.expand(r);
            }
            E.preventDefault();
            E.stopImmediatePropagation();
        }
    };
    T.prototype.onsapleftmodifiers = function(E) {
        var t = q(E.target);
        if (t.hasClass('sapUiTableCol')) {
            var f = parseInt(t.attr('data-sap-ui-colindex'), 10),
                v = this._getVisibleColumns(),
                o = v[this._aVisibleColumns.indexOf(f)];
            if (E.shiftKey) {
                var n = parseInt(o.getWidth(), 10) - 16;
                o.setWidth((n > 20 ? n : 20) + 'px');
                E.preventDefault();
                E.stopImmediatePropagation();
            } else if (E.ctrlKey || E.metaKey) {
                if (f - 1 >= 0) {
                    var N = 0;
                    for (var p = this._aVisibleColumns.indexOf(f) - 1; p >= 0; p--) {
                        N = this._aVisibleColumns[p];
                        if (v[p].$().css('display') !== 'none') {
                            break;
                        }
                    }
                    this.removeColumn(o);
                    this.insertColumn(o, N);
                    var h = o.getHeaderSpan();
                    if (h > 1) {
                        for (var i = 1; i < h; i++) {
                            o = v[f + i];
                            this.removeColumn(o);
                            this.insertColumn(o, N + i);
                        }
                    }
                }
                E.preventDefault();
                E.stopImmediatePropagation();
            }
        }
    };
    T.prototype.onsaprightmodifiers = function(E) {
        var t = q(E.target);
        if (t.hasClass('sapUiTableCol')) {
            var f = parseInt(t.attr('data-sap-ui-colindex'), 10);
            var v = this._getVisibleColumns();
            var p = this._aVisibleColumns.indexOf(f);
            var o = v[p];
            if (E.shiftKey) {
                o.setWidth(parseInt(o.getWidth(), 10) + 16 + 'px');
                E.preventDefault();
                E.stopImmediatePropagation();
            } else if (E.ctrlKey || E.metaKey) {
                var h = o.getHeaderSpan();
                if (p < v.length - h) {
                    var n = v[p + 1].getHeaderSpan(),
                        N = this._aVisibleColumns[p + n];
                    for (var i = h - 1; i >= 0; i--) {
                        o = v[p + i];
                        this.removeColumn(o);
                        this.insertColumn(o, N + i);
                    }
                }
                E.preventDefault();
                E.stopImmediatePropagation();
            }
        }
    };
    T.prototype.setGroupBy = function(v) {
        var g = v;
        if (typeof g === 'string') {
            g = sap.ui.getCore().byId(g);
        }
        var r = false;
        if (g && g instanceof sap.ui.table.Column) {
            if (q.inArray(g, this.getColumns()) === -1) {
                throw new Error('Column has to be part of the columns aggregation!');
            }
            var E = this.fireGroup({
                column: g,
                groupedColumns: [g.getId()],
                type: sap.ui.table.GroupEventType.group
            });
            var o = sap.ui.getCore().byId(this.getGroupBy());
            if (o) {
                o.setGrouped(false);
                r = true;
            }
            if (E && g instanceof sap.ui.table.Column) {
                g.setGrouped(true);
            }
        }
        if (!g || r) {
            var B = this.getBindingInfo('rows');
            delete B.binding;
            this._bindAggregation('rows', B);
        }
        return this.setAssociation('groupBy', g);
    };
    T.prototype.getBinding = function(n) {
        n = n || 'rows';
        var B = sap.ui.core.Element.prototype.getBinding.call(this, n);
        if (this.getEnableGrouping()) {
            q.sap.require('sap.ui.model.ClientListBinding');
            var g = sap.ui.getCore().byId(this.getGroupBy());
            var f = g && g.getGrouped() && n === 'rows' && B && B instanceof sap.ui.model.ClientListBinding;
            if (f && !B._modified) {
                B._modified = true;
                this._modifyRow = function(r, $) {
                    this.$().find('.sapUiTableRowHdrScr').css('display', 'block');
                    var m = this.$().find("div[data-sap-ui-rowindex='" + $.attr('data-sap-ui-rowindex') + "']");
                    if (B.isGroupHeader(r)) {
                        $.addClass('sapUiTableGroupHeader sapUiTableRowHidden');
                        var s = B.isExpanded(r) ? 'sapUiTableGroupIconOpen' : 'sapUiTableGroupIconClosed';
                        m.html("<div class=\"sapUiTableGroupIcon " + s + "\" tabindex=\"-1\">" + B.getTitle(r) + '</div>');
                        m.addClass('sapUiTableGroupHeader').removeAttr('title');
                    } else {
                        $.removeClass('sapUiTableGroupHeader');
                        m.html('');
                        m.removeClass('sapUiTableGroupHeader');
                    }
                };
                this.onclick = function(E) {
                    if (q(E.target).hasClass('sapUiTableGroupIcon')) {
                        var $ = q(E.target).parents('[data-sap-ui-rowindex]');
                        if ($.length > 0) {
                            var r = this.getFirstVisibleRow() + parseInt($.attr('data-sap-ui-rowindex'), 10);
                            var B = this.getBinding('rows');
                            if (B.isExpanded(r)) {
                                B.collapse(r);
                                q(E.target).removeClass('sapUiTableGroupIconOpen').addClass('sapUiTableGroupIconClosed');
                            } else {
                                B.expand(r);
                                q(E.target).removeClass('sapUiTableGroupIconClosed').addClass('sapUiTableGroupIconOpen');
                            }
                        }
                    } else {
                        if (T.prototype.onclick) {
                            T.prototype.onclick.apply(this, arguments);
                        }
                    }
                };
                var p = g.getSortProperty();
                B.sort(new sap.ui.model.Sorter(p));
                var l = B.getLength(),
                    h = B.getContexts(0, l);
                var k;
                var j = 0;
                for (var i = l - 1; i >= 0; i--) {
                    var N = h[i].getProperty(p);
                    if (!k) {
                        k = N;
                    }
                    if (k !== N) {
                        var G = h[i + 1].getModel().getContext('/sap.ui.table.GroupInfo' + i);
                        G.__groupInfo = {
                            oContext: h[i + 1],
                            name: k,
                            count: j,
                            groupHeader: true,
                            expanded: true
                        };
                        h.splice(i + 1, 0, G);
                        k = N;
                        j = 0;
                    }
                    j++;
                }
                var G = h[0].getModel().getContext('/sap.ui.table.GroupInfo');
                G.__groupInfo = {
                    oContext: h[0],
                    name: k,
                    count: j,
                    groupHeader: true,
                    expanded: true
                };
                h.splice(0, 0, G);
                q.extend(B, {
                    getLength: function() {
                        return h.length;
                    },
                    getContexts: function(s, l) {
                        return h.slice(s, s + l);
                    },
                    isGroupHeader: function(m) {
                        var o = h[m];
                        return o && o.__groupInfo && o.__groupInfo.groupHeader;
                    },
                    getTitle: function(m) {
                        var o = h[m];
                        return o && o.__groupInfo && o.__groupInfo.name + ' - ' + o.__groupInfo.count;
                    },
                    isExpanded: function(m) {
                        var o = h[m];
                        return this.isGroupHeader(m) && o.__groupInfo && o.__groupInfo.expanded;
                    },
                    expand: function(m) {
                        if (this.isGroupHeader(m) && !h[m].__groupInfo.expanded) {
                            for (var i = 0; i < h[m].__childs.length; i++) {
                                h.splice(m + 1 + i, 0, h[m].__childs[i]);
                            }
                            delete h[m].__childs;
                            h[m].__groupInfo.expanded = true;
                            this._fireChange();
                        }
                    },
                    collapse: function(m) {
                        if (this.isGroupHeader(m) && h[m].__groupInfo.expanded) {
                            h[m].__childs = h.splice(m + 1, h[m].__groupInfo.count);
                            h[m].__groupInfo.expanded = false;
                            this._fireChange();
                        }
                    }
                });
            }
        }
        return B;
    };
    T.prototype.resetGrouping = function() {
        var B = this.getBinding('rows');
        if (B && B._modified) {
            this.$().find('.sapUiTableRowHdrScr').css('display', '');
            this.onclick = T.prototype.onclick;
            this._modifyRow = undefined;
            var o = this.getBindingInfo('rows');
            this.unbindRows();
            this.bindRows(o);
        }
    };
    T.prototype.setEnableGrouping = function(E) {
        this.setProperty('enableGrouping', E);
        if (!E) {
            this.resetGrouping();
        }
        this._invalidateColumnMenus();
        return this;
    };
    T.prototype.setEnableCustomFilter = function(E) {
        this.setProperty('enableCustomFilter', E);
        this._invalidateColumnMenus();
        return this;
    };
    T.prototype.setEnableColumnFreeze = function(E) {
        this.setProperty('enableColumnFreeze', E);
        this._invalidateColumnMenus();
        return this;
    };
    T.prototype.setShowColumnVisibilityMenu = function(s) {
        this.setProperty('showColumnVisibilityMenu', s);
        this._invalidateColumnMenus();
        return this;
    };
    T.prototype.setFixedColumnCount = function(f) {
        var g = this._getVisibleColumns();
        var h = g[f - 1] && g[f - 1].getHeaderSpan();
        if (h) {
            var H;
            if (q.isArray(h)) {
                H = parseInt(h[0], 10);
            } else {
                H = parseInt(h, 10);
            }
            f += H - 1;
        }
        var $ = this.$().find('.sapUiTableCtrlFirstCol > th');
        for (var i = 0; i < f; i++) {
            var o = g[i];
            if (o) {
                var j = q.inArray(o, this.getColumns());
                if (!o.getWidth()) {
                    o.setWidth($.filter("[data-sap-ui-headcolindex='" + j + "']").width() + 'px');
                }
            }
        }
        this.setProperty('fixedColumnCount', f);
        this._invalidateColumnMenus();
        return this;
    };
    T.prototype.setFixedRowCount = function(f) {
        if (!(parseInt(f, 10) >= 0)) {
            q.sap.log.error('Number of fixed rows must be greater or equal 0');
            return this;
        }
        if ((f + this.getFixedBottomRowCount()) < this.getVisibleRowCount()) {
            this.setProperty('fixedRowCount', f);
        } else {
            q.sap.log.error("Table '" + this.getId() + "' fixed rows('" + (f + this.getFixedBottomRowCount()) + "') must be smaller than numberOfVisibleRows('" + this.getVisibleRowCount() + "')");
        }
        return this;
    };
    T.prototype.setFixedBottomRowCount = function(f) {
        if (!(parseInt(f, 10) >= 0)) {
            q.sap.log.error('Number of fixed bottom rows must be greater or equal 0');
            return this;
        }
        if ((f + this.getFixedRowCount()) < this.getVisibleRowCount()) {
            this.setProperty('fixedBottomRowCount', f);
        } else {
            q.sap.log.error("Table '" + this.getId() + "' fixed rows('" + (f + this.getFixedRowCount()) + "') must be smaller than numberOfVisibleRows('" + this.getVisibleRowCount() + "')");
        }
        return this;
    };
    T.prototype._invalidateColumnMenus = function() {
        var f = this.getColumns();
        for (var i = 0, l = f.length; i < l; i++) {
            f[i].invalidateMenu();
        }
    };
    T.prototype._splitterSelectStart = function(E) {
        E.preventDefault();
        E.stopPropagation();
        return false;
    };
    T.prototype._isTouchMode = function(E) {
        return !!E.originalEvent['touches'];
    };
    T.prototype._onGhostMouseRelease = function(E) {
        var s = this.getDomRef('ghost');
        var l = this._isTouchMode(E) ? E.changedTouches[0].pageY : E.pageY;
        var n = l - this.$().offset().top;
        this.setVisibleRowCount(this._calculateRowsToDisplay(n));
        q(s).remove();
        this.$('overlay').remove();
        q(document.body).unbind('selectstart', this._splitterSelectStart);
        var D = q(document);
        D.unbind('touchend', this._onGhostMouseRelease);
        D.unbind('touchmove', this._onGhostMouseMove);
        D.unbind('mouseup', this._onGhostMouseRelease);
        D.unbind('mousemove', this._onGhostMouseMove);
        this._enableTextSelection();
    };
    T.prototype._onGhostMouseMove = function(E) {
        var s = this.getDomRef('ghost');
        var l = this._isTouchMode(E) ? E.targetTouches[0].pageY : E.pageY;
        var m = this.$().offset().top;
        if (l > m) {
            q(s).css('top', l + 'px');
        }
    };
    T.prototype._calculateRowsToDisplay = function(h) {
        var m = this.getMinAutoRowCount() || 5;
        if (!h) {
            return m;
        }
        var $ = this.$();
        if (!$.get(0)) {
            return m;
        }
        var u = this._calculateUsedHeight($.find('.sapUiTableCCnt'), $);
        var r = this.getRows();
        if (!r.length) {
            return m;
        }
        var D = r[0].getDomRefs(true);
        var f = D.rowFixedPart || D.rowScrollPart;
        var i = f.outerHeight();
        if (!i) {
            var s = 'sap.ui.table.Table:sapUiTableRowHeight';
            if ($.parents().hasClass('sapUiSizeCompact')) {
                s = 'sap.ui.table.Table:sapUiTableCompactRowHeight';
            }
            i = parseInt(P.get(s), 10);
        }
        var M = window.innerHeight - 2 * i;
        var g = h - u;
        var A = Math.min(g, M);
        return Math.max((this.getFixedRowCount() + this.getFixedBottomRowCount()) + 1, Math.max(m, Math.floor((A + 1) / i)));
    };
    T.prototype._calculateUsedHeight = function($, f) {
        if (!$ || $.length == 0 || !f || $.is(f)) {
            return 0;
        }
        return Math.max(0, f.height() - $.height());
    };
    T.prototype.setShowNoData = function(s) {
        this.setProperty('showNoData', s, true);
        s = this.getProperty('showNoData');
        if (!s) {
            this.$().removeClass('sapUiTableEmpty');
        } else {
            this._updateNoData();
        }
        return this;
    };
    T.prototype.setNoDataText = function(t) {
        this.setProperty('noDataText', t, true);
        this.$().find('.sapUiTableCtrlEmptyMsg').text(t);
    };
    T.prototype.exportData = function(s) {
        q.sap.require('sap.ui.core.util.Export');
        s = s || {};
        if (!s.rows) {
            var B = this.getBinding('rows'),
                o = this.getBindingInfo('rows');
            var f = B.aFilters.concat(B.aApplicationFilters);
            s.rows = {
                path: o.path,
                model: o.model,
                sorter: B.aSorters,
                filters: f,
                parameters: o.parameters
            };
        }
        if (!s.exportType) {
            q.sap.require('sap.ui.core.util.ExportTypeCSV');
            s.exportType = new sap.ui.core.util.ExportTypeCSV();
        }
        var m = s.rows.model;
        if (!m) {
            var p = s.rows.path;
            var g = p.indexOf('>');
            if (g > 0) {
                m = p.substr(0, g);
            }
        }
        if (!s.columns) {
            s.columns = [];
            var h = this.getColumns();
            for (var i = 0, l = h.length; i < l; i++) {
                var j = h[i];
                if (j.getSortProperty()) {
                    s.columns.push({
                        name: j.getLabel().getText(),
                        template: {
                            content: {
                                path: j.getSortProperty(),
                                model: m
                            }
                        }
                    });
                }
            }
        }
        var E = new sap.ui.core.util.Export(s);
        this.addDependent(E);
        return E;
    };
    T.prototype._calculateAutomaticColumnWidth = function(f) {
        var t = ['sap.m.Text', 'sap.m.Label', 'sap.m.Link', 'sap.ui.commons.TextView', 'sap.ui.commons.Label', 'sap.ui.commons.Link'];
        var $ = this.$();
        var h = 0;
        var g = $.find('td[headers=\"' + this.getId() + '_col' + f + '\"]').children('div');
        var o = this.getColumns();
        var j = o[f];
        if (!j) {
            return null;
        }
        var H = j.getHeaderSpan();
        var k = j.getLabel();
        var l = this;
        var m = j.getTemplate();
        var n = q.inArray(m.getMetadata().getName(), t) != -1 || sap.ui.commons && sap.ui.commons.TextField && m instanceof sap.ui.commons.TextField || sap.m && sap.m.Input && m instanceof sap.m.Input;
        var p = document.createElement('div');
        document.body.appendChild(p);
        q(p).addClass('sapUiTableHiddenSizeDetector');
        var r = j.getMultiLabels();
        if (r.length == 0 && !!k) {
            r = [k];
        }
        if (r.length > 0) {
            q.each(r, function(v, L) {
                var w;
                if (!!L.getText()) {
                    q(p).text(L.getText());
                    h = p.scrollWidth;
                } else {
                    h = L.$().scrollWidth;
                }
                h = h + $.find('#' + j.getId() + '-icons').first().width();
                $.find('.sapUiTableColIcons#' + j.getId() + '_' + v + '-icons').first().width();
                if (H instanceof Array && H[v] > 1) {
                    w = H[v];
                } else if (H > 1) {
                    w = H;
                }
                if (!!w) {
                    var i = w - 1;
                    while (i > f) {
                        h = h - (l._oCalcColumnWidths[f + i] || 0);
                        i -= 1;
                    }
                }
            });
        }
        var s = Math.max.apply(null, g.map(function() {
            var _ = q(this);
            return parseInt(_.css('padding-left'), 10) + parseInt(_.css('padding-right'), 10) + parseInt(_.css('margin-left'), 10) + parseInt(_.css('margin-right'), 10);
        }).get());
        var u = Math.max.apply(null, g.children().map(function() {
            var w = 0,
                W = 0;
            var _ = q(this);
            var i = _.text() || _.val();
            if (n) {
                q(p).text(i);
                W = p.scrollWidth;
            } else {
                W = this.scrollWidth;
            }
            if (h > W) {
                W = h;
            }
            w = W + parseInt(_.css('margin-left'), 10) + parseInt(_.css('margin-right'), 10) + s + 1;
            return w;
        }).get());
        q(p).remove();
        return Math.max(u, this._iColMinWidth);
    };
    T.prototype._onPersoApplied = function() {
        var f = this.getColumns();
        var s = [];
        for (var i = 0, l = f.length; i < l; i++) {
            var o = f[i];
            if (o.getSorted()) {
                s.push(new sap.ui.model.Sorter(o.getSortProperty(), o.getSortOrder() === sap.ui.table.SortOrder.Descending));
            }
        }
        if (s.length > 0 && this.getBinding('rows')) {
            this.getBinding('rows').sort(s);
        }
        this.refreshRows();
    };
    T.prototype._toggleSelectAll = function() {
        if (!this.$('selall').hasClass('sapUiTableSelAll')) {
            this._iSourceRowIndex = -1;
            this.clearSelection();
        } else {
            this._iSourceRowIndex = 0;
            this.selectAll();
        }
        if (!!sap.ui.Device.browser.internet_explorer) {
            this.$('selall').focus();
        }
        this._iSourceRowIndex = undefined;
    };
    T.prototype._restoreAppDefaultsColumnHeaderSortFilter = function() {
        var f = this.getColumns();
        q.each(f, function(i, o) {
            o._restoreAppDefaults();
        });
    };
    T.prototype._setBusy = function(p) {
        var B, i, s;
        if (!this.getEnableBusyIndicator() || !this._bBusyIndicatorAllowed) {
            return;
        }
        B = this.getBinding('rows');
        if (!B) {
            return;
        }
        this.setBusy(false);
        if (p) {
            if (p.contexts && p.contexts.length !== undefined) {
                s = false;
                for (i = 0; i < p.contexts.length; i++) {
                    if (p.contexts[i] === undefined) {
                        s = true;
                        break;
                    }
                }
            } else if (p.changeReason === c.Expand) {
                this.setBusy(true);
            }
            var l = B.getLength();
            if (s || (B.isInitial()) || (p.receivedLength === 0 && this._iDataRequestedCounter !== 0) || (p.receivedLength < p.requestedLength && p.receivedLength !== l && p.receivedLength !== l - this.getFirstVisibleRow())) {
                this.setBusy(true);
            }
        }
    };
    T.prototype.setEnableBusyIndicator = function(v) {
        this.setProperty('enableBusyIndicator', v, true);
    };
    T.prototype.setColumnHeaderVisible = function(f) {
        this.setProperty('columnHeaderVisible', f);
        this._iLastSelectedDataRow = this._getHeaderRowCount();
    };
    T.prototype._attachDataRequestedListeners = function() {
        var B = this.getBinding('rows');
        if (B) {
            B.detachDataRequested(this._onBindingDataRequestedListener, this);
            B.detachDataReceived(this._onBindingDataReceivedListener, this);
            this._iDataRequestedCounter = 0;
            B.attachDataRequested(this._onBindingDataRequestedListener, this);
            B.attachDataReceived(this._onBindingDataReceivedListener, this);
        }
    };
    T.prototype._onBindingDataRequestedListener = function(E) {
        if (E.getSource() == this.getBinding('rows')) {
            this._iDataRequestedCounter++;
        }
    };
    T.prototype._onBindingDataReceivedListener = function(E) {
        if (E.getSource() == this.getBinding('rows')) {
            this._iDataRequestedCounter--;
        }
    };
    T.prototype._attachBindingListener = function() {
        this._attachDataRequestedListeners();
    };
    T.prototype._setLargeDataScrolling = function(l) {
        if (this._oVSb) {
            this._oVSb._bLargeDataScrolling = !!l;
        } else {
            q.sap.log.error("Vertical Scrollbar wasn't initialized yet.");
        }
    };
    T.prototype._getSelectedIndicesCount = function() {
        return this.getSelectedIndices().length;
    };
    return T;
}, true);