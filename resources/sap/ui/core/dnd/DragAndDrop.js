/*!
 * OpenUI5
 * (c) Copyright 2009-2020 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/Device","../UIArea","sap/base/util/extend","sap/ui/thirdparty/jquery","sap/ui/dom/jquery/control"],function(e,t,r,n){"use strict";var i={},o=null,a=null,f=null,g=[],s=[],u=null,l,d,p,c,D,h={},v;function m(e,t){if(!e){return}if(e.addStyleClass){e.addStyleClass(t)}else{e.$().addClass(t)}}function w(e,t){if(!e){return}if(e.removeStyleClass){e.removeStyleClass(t)}else{e.$().removeClass(t)}}function b(e,t){var r=n(e.target).control(0,true);if(!r){return}var i=n.Event(null,e);i.type=t;r.getUIArea()._handleEvent(i)}function C(e){return!e.disabled&&/^(input|textarea)$/.test(e.localName)}function E(t,r){if(e.browser.msie||!t||!t.getDragGhost){return}var i=t.getDragGhost();if(!i){return}if(!p){p=n('<div class="sapUiDnDGhostContainer"></div>');n(document.body).append(p)}p.append(i);window.setTimeout(function(){p.empty()},0);var o=r.originalEvent;o.dataTransfer.setDragImage(i,o.offsetX,o.offsetY)}function y(t){var r={},n,i=t.originalEvent.dataTransfer,a=function(t,r){if(i&&t=="text"||e.browser!="msie"&&e.browser!="edge"){i.setData(t,r)}};return{setData:function(e,t){t=""+t;r[e]=t;a(e,t)},getData:function(e){return r[e]},setTextData:function(e){e=""+e;r["text/plain"]=e;r["text"]=e;a("text/plain",e);a("text",e)},getTextData:function(){return r["text/plain"]},setComplexData:function(e,t){r[e]=t},getComplexData:function(e){return r[e]},getIndicator:function(){return l&&l[0]},setIndicatorConfig:function(e){n=e},getIndicatorConfig:function(e){return n},getDragControl:function(){return o},getDropControl:function(){return f},setDropControl:function(e){f=e},getDropInfo:function(){return s[0]||null},getDropPosition:function(){return c}}}function S(e){o=a=f=u=null;c="";g=[];s=[]}function x(){if(l){return l}if(!e.browser.msie){d=n("<div class='sapUiDnDIndicatorWrapper'></div>")}l=n("<div class='sapUiDnDIndicator'></div>");if(!d){n(sap.ui.getCore().getStaticAreaRef()).append(l)}else{n(sap.ui.getCore().getStaticAreaRef()).append(d);l.appendTo(d)}return l}function A(){if(l){l.removeAttr("style").hide();h={}}}function O(e,t,n,i){if(!t){return}var o=e.dragSession&&e.dragSession.getIndicatorConfig(),a=t.getBoundingClientRect(),f=window.pageYOffset,g=window.pageXOffset,s=x(),u,l={},d={top:a.top+f,bottom:a.bottom+f,left:a.left+g,right:a.right+g,width:a.width,height:a.height};if(!n||n=="On"){u="On";i=""}else if(i=="Horizontal"){var p=e.pageX-d.left;l.height=d.height;l.top=d.top;if(n=="Between"){l.width="";if(p<d.width*.5){u="Before";l.left=d.left}else{u="After";l.left=d.right}}else if(n=="OnOrBetween"){if(p<d.width*.25){u="Before";l.left=d.left;l.width=""}else if(p>d.width*.75){u="After";l.left=d.right;l.width=""}else{u="On"}}if(u!="On"&&sap.ui.getCore().getConfiguration().getRTL()){u=u=="After"?"Before":"After"}}else{var c=e.pageY-d.top;l.width=d.width;l.left=d.left;if(n=="Between"){l.height="";if(c<d.height*.5){u="Before";l.top=d.top}else{u="After";l.top=d.bottom}}else if(n=="OnOrBetween"){if(c<d.height*.25){u="Before";l.top=d.top;l.height=""}else if(c>d.height*.75){u="After";l.top=d.bottom;l.height=""}else{u="On"}}}if(o&&o.display=="none"){return u}if(u=="On"){l.top=d.top;l.left=d.left;l.width=d.width;l.height=d.height;n=u}else{n="Between"}if(h.top!=l.top||h.left!=l.left||h.width!=l.width||h.height!=l.height){s.attr("data-drop-layout",i);s.attr("data-drop-position",n);s.css(r(l,o)).show();h=l}return u}function T(e){var t=e.getParent(),r=e.getDragDropConfig?e.getDragDropConfig():[],n=t&&t.getDragDropConfig?t.getDragDropConfig():[];return r.concat(n)}function I(e){var t=T(e);return t.filter(function(t){return t.isDraggable(e)})}function B(e,t,r){var n=T(e);t=t||[];return n.filter(function(e){return!e.isA("sap.ui.core.dnd.IDragInfo")}).concat(t).filter(function(n){if(!n.isDroppable(e,r)){return false}var i=n.getGroupName();if(!i){return true}return t.some(function(e){return e.getGroupName()==i})})}function N(e,t){e.preventDefault();var r=t.getDropEffect().toLowerCase();e.originalEvent.dataTransfer.dropEffect=r}function U(e,t,r){var n=t.getTargetAggregation();if(!n){return O(e,r.getDomRef())}var i;if(e.getMark("DragWithin")==n){i=r.getDomRefForSetting(n)}i=i||r.getDomRef();return O(e,i,t.getDropPosition(true),t.getDropLayout(true))}i.preprocessEvent=function(e){if(u&&e.type.indexOf("dr")==0){e.dragSession=u}var t="onbefore"+e.type;if(i[t]){i[t](e)}};i.postprocessEvent=function(e){var t="onafter"+e.type;if(i[t]){i[t](e)}};i.onbeforemousedown=function(t){if((e.browser.msie||e.browser.firefox||e.browser.edge)&&C(t.target)){v=n(t.target).closest("[data-sap-ui-draggable=true]").prop("draggable",false)[0]}};i.onbeforemouseup=function(e){if(v){v.draggable=true;v=null}};i.onbeforedragstart=function(t){if(!t.target.draggable){return}if(C(document.activeElement)){t.target.getAttribute("data-sap-ui-draggable")&&t.preventDefault();return}o=n(t.target).control(0,true);if(!o){return}g=I(o);if(!g.length){return}if(e.browser.firefox&&t.originalEvent.dataTransfer.types.length===0){t.originalEvent.dataTransfer.setData("ui5/dummyDataForFirefox","data")}t.dragSession=u=y(t)};i.onafterdragstart=function(e){if(!g.length||e.isDefaultPrevented()){S();return}g=e.isMarked("NonDraggable")?[]:g.filter(function(t){return t.fireDragStart(e)});if(!g.length){e.preventDefault();S();return}E(o,e);m(o,"sapUiDnDDragging");n("html").addClass("sapUiDnDNoScrolling")};i.onbeforedragenter=function(e){var t=n(e.target).control(0,true);if(t&&a===t){e.setMark("DragWithin","SameControl")}else{D=Date.now();a=t}var r=[];f=t;for(var i=0;i<20&&f;i++,f=f.getParent()){r=B(f,g,e);if(r.length){break}}if(e.getMark("DragWithin")!="SameControl"){s=r;if(u){u.setIndicatorConfig(null)}}if(!s.length){f=null}else if(!u){e.dragSession=u=y(e)}};i.onafterdragenter=function(e){if(!f||e.isMarked("NonDroppable")){s=[]}else if(e.getMark("DragWithin")!="SameControl"){s=s.filter(function(t){return t.fireDragEnter(e)})}var t=s[0];if(!t||t.getDropEffect()=="None"){A();c=""}else{N(e,t);c=U(e,t,f)}};i.onbeforedragover=function(e){var t=Date.now();if(t-D>=1e3){b(e,"longdragover");D=t}};i.onafterdragover=function(e){var t=s[0];if(!t||t.getDropEffect()=="None"){return}s.forEach(function(t){t.fireDragOver(e)});N(e,t);if(t&&t.getDropPosition(true)=="On"){return}c=U(e,t,f)};i.onbeforedrop=function(e){if(s.length){e.preventDefault()}};i.onafterdrop=function(e){s.forEach(function(t){t.fireDrop(e)});this.iDragEndTimer=window.requestAnimationFrame(this.onafterdragend.bind(this,e))};i.onafterdragend=function(e){this.iDragEndTimer=window.cancelAnimationFrame(this.iDragEndTimer);g.forEach(function(t){t.fireDragEnd(e)});w(o,"sapUiDnDDragging");n("html").removeClass("sapUiDnDNoScrolling");A();S()};t.addEventPreprocessor(i.preprocessEvent);t.addEventPostprocessor(i.postprocessEvent);return i},true);