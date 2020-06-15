/*!
 * OpenUI5
 * (c) Copyright 2009-2020 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/core/library"],function(i){"use strict";var t=i.Orientation;var e={};e.render=function(i,e){var r=e.getOrientation()===t.Horizontal;var a=r?"sapUiLoSplitterH":"sapUiLoSplitterV";var s=sap.ui.getCore().getConfiguration().getAnimation();i.write("<div");i.writeControlData(e);i.addClass("sapUiLoSplitter");i.addClass(a);if(s&&!e._liveResize){i.addClass("sapUiLoSplitterAnimated")}i.writeClasses();i.addStyle("width",e.getWidth());i.addStyle("height",e.getHeight());i.writeStyles();i.write(">");this.renderInitialContent(i,e);i.write("</div>")};e.renderInitialContent=function(i,e){var r=e.getId();var a=e.getOrientation()===t.Horizontal;var s=a?"width":"height";var o=e._getContentAreas();var n=o.length;var l=e.getCalculatedSizes();for(var d=0;d<n;++d){var p=o[d].getLayoutData();var v="0";if(l[d]){v=l[d]+"px"}else if(p){v=p.getSize()}i.write("<section "+'id="'+r+"-content-"+d+'" '+'style="'+s+": "+v+';" '+'class="sapUiLoSplitterContent">');i.renderControl(o[d]);i.write("</section>");if(d<n-1){i.write('<div id="'+r+"-splitbar-"+d+'" '+'role="separator" '+'title="'+e._getText("SPLITTER_MOVE")+'" '+'class="sapUiLoSplitterBar" '+'aria-orientation="'+(a?"vertical":"horizontal")+'" '+'tabindex="0">');this.renderSplitterBarGripAndDecorations(i,a);i.write("</div>")}}i.write('<div id="'+r+'-overlay" class="sapUiLoSplitterOverlay" style="display: none;">'+'<div id="'+r+'-overlayBar" class="sapUiLoSplitterOverlayBar">');this.renderSplitterBarGripAndDecorations(i,a);i.write("</div>"+"</div>")};e.renderSplitterBarGripAndDecorations=function(i,t){var e=t?"sap-icon://vertical-grip":"sap-icon://horizontal-grip";i.write("<div");i.addClass("sapUiLoSplitterBarDecorationBefore");i.writeClasses();i.write(">");i.write("</div>");i.write("<div");i.addClass("sapUiLoSplitterBarGrip");i.writeClasses();i.write(">");i.writeIcon(e,["sapUiLoSplitterBarGripIcon"]);i.write("</div>");i.write("<div");i.addClass("sapUiLoSplitterBarDecorationAfter");i.writeClasses();i.write(">");i.write("</div>")};return e},true);