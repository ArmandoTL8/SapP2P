/*!
 * UI development toolkit for HTML5 (OpenUI5)
 * (c) Copyright 2009-2016 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define([
	'jquery.sap.global', 'sap/ui/core/Element', './library'
], function(q, E, l) {
    //'use strict';
    var R = E.extend('sap.ui.table.Row', {
        metadata: {
            library: 'sap.ui.table',
            defaultAggregation: 'cells',
            aggregations: {
                cells: {
                    type: 'sap.ui.core.Control',
                    multiple: true,
                    singularName: 'cell'
                }
            }
        }
    });
    R.prototype.getIndex = function() {
        var t = this.getParent();
        if (t) {
            var r = t.indexOfRow(this);
            var n = t.getFixedRowCount();
            if (n > 0 && r < n) {
                return r;
            }
            var N = t.getFixedBottomRowCount();
            var v = t.getVisibleRowCount();
            if (N > 0 && r >= v - N) {
                var b = t.getBinding('rows');
                if (b && b.getLength() >= v) {
                    return b.getLength() - (v - r);
                } else {
                    return r;
                }
            }
            var f = t.getFirstVisibleRow();
            return f + r;
        }
        return -1;
    };
    R.prototype.getDomRefs = function(j) {
        var d = {};
        var a = q.sap.domById;
        if (j === true) {
            a = q.sap.byId;
        }
        var t = this.getParent();
        if (t) {
            var r = t.indexOfRow(this);
            d.rowSelector = a(t.getId() + '-rowsel' + r);
        }
        d.rowScrollPart = a(this.getId());
        d.rowFixedPart = a(this.getId() + '-fixed');
        d.rowSelectorText = a(this.getId() + '-rowselecttext');
        if (j === true) {
            d.row = d.rowScrollPart;
            if (d.rowSelector && d.rowSelector.length > 0) {
                d.row = d.row.add(d.rowSelector);
            } else {
                d.rowSelector = undefined;
            }
            if (d.rowFixedPart.length > 0) {
                d.row = d.row.add(d.rowFixedPart);
            } else {
                d.rowFixedPart = undefined;
            }
        }
        return d;
    };
    R.prototype._updateSelection = function(t, T, s) {
        var i = t.isIndexSelected(this.getIndex());
        var d = this.getDomRefs(true);
        var S = 'rowSelect';
        if (i) {
            S = 'rowDeselect';
        }
        if (d.rowSelector) {
            d.rowSelector.attr('title', T.mouse[S]);
            d.rowSelector.attr('aria-label', T.keyboard[S]);
        }
        if (d.rowSelectorText) {
            d.rowSelectorText.text(T.keyboard[S]);
        }
        var r = d.rowScrollPart;
        if (d.rowFixedPart) {
            r = r.add(d.rowFixedPart);
        }
        if (s) {
            r.attr('title', T.mouse[S]);
            r.attr('aria-label', T.keyboard[S]);
        } else {
            r.removeAttr('title');
            r.removeAttr('aria-label');
        }
        if (d.row) {
            d.row.toggleClass('sapUiTableRowSel', i);
            d.row.children('td').add(d.row).attr('aria-selected', i.toString());
        }
    };
    return R;
}, true);