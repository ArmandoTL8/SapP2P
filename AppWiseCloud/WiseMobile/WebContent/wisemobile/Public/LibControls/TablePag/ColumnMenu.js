/*!
 * UI development toolkit for HTML5 (OpenUI5)
 * (c) Copyright 2009-2016 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(['jquery.sap.global', 'sap/ui/core/RenderManager', './library', 'sap/ui/unified/Menu', 'sap/ui/unified/MenuItem'], function(q, R, a, M, b) {
    //'use strict';
    var C = M.extend('sap.ui.table.ColumnMenu', {
        metadata: {
            library: 'sap.ui.table'
        }
    });
    C.prototype.init = function() {
        if (M.prototype.init) {
            M.prototype.init.apply(this, arguments);
        }
        this.addStyleClass('sapUiTableColumnMenu');
        this.oResBundle = sap.ui.getCore().getLibraryResourceBundle('sap.ui.table');
        this._bInvalidated = true;
        this._iPopupClosedTimeoutId = null;
        this._oColumn = null;
        this._oTable = null;
        this._attachPopupClosed();
    };
    C.prototype.exit = function() {
        if (M.prototype.exit) {
            M.prototype.exit.apply(this, arguments);
        }
        window.clearTimeout(this._iPopupClosedTimeoutId);
        this._detachEvents();
        this._oColumn = this._oTable = null;
    };
    C.prototype.onThemeChanged = function() {
        if (this.getDomRef()) {
            this._invalidate();
        }
    };
    C.prototype.setParent = function(p) {
        this._detachEvents();
        this._invalidate();
        this._updateReferences(p);
        this._attachEvents();
        return M.prototype.setParent.apply(this, arguments);
    };
    C.prototype._updateReferences = function(p) {
        this._oColumn = p;
        if (p) {
            this._oTable = this._oColumn.getParent();
            if (this._oTable) {}
        }
    };
    C.prototype._attachEvents = function() {
        if (this._oTable) {
            this._oTable.attachColumnVisibility(this._invalidate, this);
            this._oTable.attachColumnMove(this._invalidate, this);
        }
    };
    C.prototype._detachEvents = function() {
        if (this._oTable) {
            this._oTable.detachColumnVisibility(this._invalidate, this);
            this._oTable.detachColumnMove(this._invalidate, this);
        }
    };
    C.prototype._invalidate = function() {
        this._bInvalidated = true;
    };
    C.prototype._attachPopupClosed = function() {
        var t = this;
        if (!sap.ui.Device.support.touch) {
            this.getPopup().attachClosed(function() {
                t._iPopupClosedTimeoutId = window.setTimeout(function() {
                    if (t._oColumn) {
                        if (t._lastFocusedDomRef) {
                            t._lastFocusedDomRef.focus();
                        } else {
                            t._oColumn.focus();
                        }
                    }
                }, 0);
            });
        }
    };
    C.prototype.open = function() {
        if (this._bInvalidated) {
            this._bInvalidated = false;
            this.destroyItems();
            this._addMenuItems();
        }
        if (this.getItems().length > 0) {
            this._lastFocusedDomRef = arguments[4];
            M.prototype.open.apply(this, arguments);
        }
    };
    C.prototype._addMenuItems = function() {
        if (this._oColumn) {
            this._addSortMenuItem(false);
            this._addSortMenuItem(true);
            this._addFilterMenuItem();
            this._addGroupMenuItem();
            this._addFreezeMenuItem();
            this._addColumnVisibilityMenuItem();
        }
    };
    C.prototype._addSortMenuItem = function(d) {
        var c = this._oColumn;
        if (c.isSortableByMenu()) {
            var D = d ? 'desc' : 'asc';
            var i = d ? 'sort-descending' : 'sort-ascending';
            if (c.getSortProperty() && c.getShowSortMenuEntry()) {
                this.addItem(this._createMenuItem(D, 'TBL_SORT_' + D.toUpperCase(), i, function(e) {
                    c.sort(d, e.getParameter('ctrlKey') === true);
                }));
            }
        }
    };
    C.prototype._addFilterMenuItem = function() {
        var c = this._oColumn;
        var t = c.getParent();
        var e = false;
        if (t) {
            e = t.getEnableCustomFilter();
        }
        if (c.isFilterableByMenu()) {
            if (e) {
                this.addItem(this._createMenuItem('filter', 'TBL_FILTER_ITEM', 'filter', function() {
                    t.fireCustomFilter({
                        column: c
                    });
                }));
            } else {
                this.addItem(this._createMenuTextFieldItem('filter', 'TBL_FILTER', 'filter', c.getFilterValue(), function() {
                    c.filter(this.getValue());
                }));
            }
        }
    };
    C.prototype._addGroupMenuItem = function() {
        var c = this._oColumn;
        var t = this._oTable;
        if (c.isGroupableByMenu()) {
            if (t && t.getEnableGrouping() && c.getSortProperty()) {
                this.addItem(this._createMenuItem('group', 'TBL_GROUP', null, q.proxy(function() {
                    t.setGroupBy(c);
                }, this)));
            }
        }
    };
    C.prototype._addFreezeMenuItem = function() {
        var c = this._oColumn;
        var t = this._oTable;
        if (t && t.getEnableColumnFreeze()) {
            var i = q.inArray(c, t.getColumns());
            var I = i + 1 == t.getFixedColumnCount();
            this.addItem(this._createMenuItem('freeze', I ? 'TBL_UNFREEZE' : 'TBL_FREEZE', null, function() {
                var e = t.fireColumnFreeze({
                    column: c
                });
                if (e) {
                    if (I) {
                        t.setFixedColumnCount(0);
                    } else {
                        t.setFixedColumnCount(i + 1);
                    }
                }
            }));
        }
    };
    C.prototype._addColumnVisibilityMenuItem = function() {
        var t = this._oTable;
        if (t && t.getShowColumnVisibilityMenu()) {
            var c = this._createMenuItem('column-visibilty', 'TBL_COLUMNS');
            this.addItem(c);
            var o = new M(c.getId() + '-menu');
            o.addStyleClass('sapUiTableColumnVisibilityMenu');
            c.setSubmenu(o);
            var d = t.getColumns();
            if (t.getColumnVisibilityMenuSorter && typeof t.getColumnVisibilityMenuSorter === 'function') {
                var s = t.getColumnVisibilityMenuSorter();
                if (typeof s === 'function') {
                    d = d.sort(s);
                }
            }
            var B = t.getBinding();
            var A = sap.ui.model && sap.ui.model.analytics && B instanceof sap.ui.model.analytics.AnalyticalBinding;
            for (var i = 0, l = d.length; i < l; i++) {
                var e = d[i];
                if (A && e instanceof sap.ui.table.AnalyticalColumn) {
                    var Q = B.getAnalyticalQueryResult();
                    var E = Q.getEntityType();
                    var m = B.getModel().getProperty('/#' + E.getTypeDescription().name + '/' + e.getLeadingProperty() + '/sap:visible');
                    if (m && (m.value === 'false' || m.value === false)) {
                        continue;
                    }
                }
                var f = this._createColumnVisibilityMenuItem(o.getId() + '-item-' + i, e);
                o.addItem(f);
            }
        }
    };
    C.prototype._createColumnVisibilityMenuItem = function(i, c) {
        var t = c.getName() || (c.getLabel() && c.getLabel().getText ? c.getLabel().getText() : null);
        return new b(i, {
            text: t,
            icon: c.getVisible() ? 'sap-icon://accept' : null,
            select: q.proxy(function(e) {
                var m = e.getSource();
                var v = !c.getVisible();
                if (v || this._oTable._getVisibleColumnCount() > 1) {
                    var T = c.getParent();
                    var E = true;
                    //if (T && (T instanceof sap.ui.table.Table || T instanceof sap.ui.table.DataTable)) {
                    if (T && (T instanceof sap.ui.table.Table || T instanceof controls.TablePagVRD)) {
                        E = T.fireColumnVisibility({
                            column: c,
                            newVisible: v
                        });
                    }
                    if (E) {
                        c.setVisible(v);
                    }
                    m.setIcon(v ? 'sap-icon://accept' : null);
                }
            }, this)
        });
    };
    C.prototype._createMenuItem = function(i, t, I, h) {
        return new b(this.getId() + '-' + i, {
            text: (this.oResBundle.hasText(t)==true)? this.oResBundle.getText(t) : oCnt_FHelps.f_readTranslate(t),
            icon: I ? 'sap-icon://' + I : null,
            select: h || function() {}
        });
    };
    C.prototype._createMenuTextFieldItem = function(i, t, I, v, h) {
        q.sap.require('sap.ui.unified.MenuTextFieldItem');
        h = h || function() {};
        return new sap.ui.unified.MenuTextFieldItem(this.getId() + '-' + i, {
            label: (this.oResBundle.hasText(t)==true)? this.oResBundle.getText(t) : oCnt_FHelps.f_readTranslate(t),
            icon: I ? 'sap-icon://' + I : null,
            value: v,
            select: h || function() {}
        });
    };
    C.prototype._setFilterValue = function(v) {
        var c = this.getParent();
        var t = (c ? c.getParent() : undefined);
        var f = sap.ui.getCore().byId(this.getId() + '-filter');
        if (f && (t && !t.getEnableCustomFilter())) {
            f.setValue(v);
        }
        return this;
    };
    C.prototype._setFilterState = function(f) {
        var c = this.getParent();
        var t = (c ? c.getParent() : undefined);
        var F = sap.ui.getCore().byId(this.getId() + '-filter');
        if (F && (t && !t.getEnableCustomFilter())) {
            F.setValueState(f);
        }
        return this;
    };
    return C;
}, true);