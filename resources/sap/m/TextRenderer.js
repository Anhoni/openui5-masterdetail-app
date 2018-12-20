/*!
 * UI development toolkit for HTML5 (OpenUI5)
 * (c) Copyright 2009-2018 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/core/Renderer","sap/ui/core/library","sap/m/HyphenationSupport"],function(e,t,i){"use strict";var a=t.TextDirection;var r={};r.render=function(t,r){var s=r.getWidth(),n=r.getText(true),d=r.getTextDirection(),p=r.getTooltip_AsString(),l=r.getMaxLines(),x=r.getWrapping(),o=r.getTextAlign(),w=r.getRenderWhitespace();t.write("<span");t.writeControlData(r);t.addClass("sapMText");t.addClass("sapUiSelectable");if(!x||l==1){t.addClass("sapMTextNoWrap")}else if(x){if(n&&n.length>0&&!/\s/.test(n)){t.addClass("sapMTextBreakWord")}}s?t.addStyle("width",s):t.addClass("sapMTextMaxWidth");if(d!==a.Inherit){t.writeAttribute("dir",d.toLowerCase())}p&&t.writeAttributeEscaped("title",p);if(o){o=e.getTextAlign(o,d);if(o){t.addStyle("text-align",o)}}if(w){var g=x?"sapMTextRenderWhitespaceWrap":"sapMTextRenderWhitespace";t.addClass(g)}i.writeHyphenationClass(t,r);t.writeClasses();t.writeStyles();t.write(">");if(r.hasMaxLines()){this.renderMaxLines(t,r)}else{this.renderText(t,r)}t.write("</span>")};r.renderMaxLines=function(e,t){e.write("<span");e.writeAttribute("id",t.getId()+"-inner");e.addClass("sapMTextMaxLine");if(t.canUseNativeLineClamp()){e.addClass("sapMTextLineClamp");e.addStyle("-webkit-line-clamp",t.getMaxLines())}e.writeClasses();e.writeStyles();e.write(">");this.renderText(e,t);e.write("</span>")};r.renderText=function(e,t){var a=i.getTextForRender(t,"main");e.writeEscaped(a)};return r},true);