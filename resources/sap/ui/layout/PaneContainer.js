/*!
 * OpenUI5
 * (c) Copyright 2009-2020 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["./library","sap/ui/core/Element","./AssociativeSplitter","sap/ui/core/library"],function(t,e,i,n){"use strict";var r=n.Orientation;var o=e.extend("sap.ui.layout.PaneContainer",{metadata:{library:"sap.ui.layout",properties:{orientation:{type:"sap.ui.core.Orientation",group:"Behavior",defaultValue:r.Horizontal}},defaultAggregation:"panes",aggregations:{panes:{type:"sap.ui.core.Element",multiple:true,singularName:"pane"}}}});o.prototype.init=function(){this._oSplitter=new i({orientation:this.getOrientation(),height:"100%"})};o.prototype.exit=function(){this._oSplitter.destroy();this._oSplitter=null};o.prototype.setOrientation=function(t){this._oSplitter.setOrientation(t);return this.setProperty("orientation",t)};o.prototype._getPanesInInterval=function(t){return this.getPanes().filter(function(e){return e instanceof sap.ui.layout.SplitPane&&e._isInInterval(t)})};o.prototype.setLayoutData=function(t){this._oSplitter.setLayoutData(t);return this};o.prototype.insertPane=function(t,e){var i=this.insertAggregation("panes",t,e),n={onAfterRendering:function(){this.triggerResize();this.removeEventDelegate(n)}};if(t instanceof o&&t._oSplitter){t._oSplitter.addEventDelegate(n,t._oSplitter)}return i};o.prototype.removePane=function(t){var e=this.removeAggregation("panes",t),i={onAfterRendering:function(){this.triggerResize();this.removeEventDelegate(i)}};this.getPanes().forEach(function(t){if(t instanceof o&&t._oSplitter){t._oSplitter.addEventDelegate(i,t._oSplitter)}});return e};return o});