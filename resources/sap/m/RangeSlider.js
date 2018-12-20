/*!
 * UI development toolkit for HTML5 (OpenUI5)
 * (c) Copyright 2009-2018 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/core/InvisibleText","sap/base/Log","./Slider","./SliderTooltip","./SliderUtilities","./RangeSliderRenderer","sap/ui/thirdparty/jquery"],function(t,e,i,a,o,n,s){"use strict";var l=i.extend("sap.m.RangeSlider",{metadata:{library:"sap.m",properties:{value2:{type:"float",group:"Data",defaultValue:100},range:{type:"float[]",group:"Data",defaultValue:[0,100]}},designtime:"sap/m/designtime/RangeSlider.designtime"}});l.prototype.init=function(){var e,a,o;i.prototype.init.call(this,arguments);this._bInitialRangeChecks=true;this._bRTL=sap.ui.getCore().getConfiguration().getRTL();this._aInitialFocusRange=this.getRange();this._oResourceBundle=sap.ui.getCore().getLibraryResourceBundle("sap.m");this._ariaUpdateDelay=[];e=new t({text:this._oResourceBundle.getText("RANGE_SLIDER_LEFT_HANDLE")});a=new t({text:this._oResourceBundle.getText("RANGE_SLIDER_RIGHT_HANDLE")});o=new t({text:this._oResourceBundle.getText("RANGE_SLIDER_RANGE_HANDLE")});this.destroyAggregation("_handlesLabels",true);this.addAggregation("_handlesLabels",e);this.addAggregation("_handlesLabels",a);this.addAggregation("_handlesLabels",o);this._mHandleTooltip={start:{handle:null,tooltip:null,label:e},end:{handle:null,tooltip:null,label:a}}};l.prototype.exit=function(){this._oResourceBundle=null;this._aInitialFocusRange=null;this._liveChangeLastValue=null;this._mHandleTooltip.start.handle=null;this._mHandleTooltip.start.tooltip=null;this._mHandleTooltip.start.label=null;this._mHandleTooltip.end.handle=null;this._mHandleTooltip.end.tooltip=null;this._mHandleTooltip.end.label=null;this._ariaUpdateDelay=null};l.prototype.onBeforeRendering=function(){var t=this.getRange();if(this.getShowAdvancedTooltip()){this.initAndSyncTooltips(["leftTooltip","rightTooltip"]);this._storeTooltipsMetadata()}this._bInitialRangeChecks=false;this._iDecimalPrecision=this.getDecimalPrecisionOfNumber(this.getStep());this.setRange(t);this._validateProperties();this._syncScaleUsage()};l.prototype.onAfterRendering=function(){i.prototype.onAfterRendering.apply(this,arguments);var t=this.getRange();this._mHandleTooltip.start.handle=this.getDomRef("handle1");this._mHandleTooltip.end.handle=this.getDomRef("handle2");this._recalculateStyles();this._updateHandle(this._mHandleTooltip.start.handle,t[0]);this._updateHandle(this._mHandleTooltip.end.handle,t[1]);if(this.getShowAdvancedTooltip()&&t[0]>t[1]){this._swapTooltips(t)}};l.prototype._storeTooltipsMetadata=function(){var t=this.getUsedTooltips();if(!this._mHandleTooltip.start.tooltip){this._mHandleTooltip.start.tooltip=t[0]}if(!this._mHandleTooltip.end.tooltip){this._mHandleTooltip.end.tooltip=t[1]}this._mHandleTooltip.bTooltipsSwapped=false};l.prototype._recalculateRange=function(){var t,e,i,a,o=this._bRTL?"right":"left";t=[parseFloat(this._mHandleTooltip.start.handle.style[o]),parseFloat(this._mHandleTooltip.end.handle.style[o])];e=Math.min.apply(Math,t)+"%";i=100-Math.max.apply(Math,t)+"%";a=this.getDomRef("progress");if(this._bRTL){a.style.left=i;a.style.right=e}else{a.style.left=e;a.style.right=i}};l.prototype.getClosestHandleDomRef=function(t){var e=this._mHandleTooltip.start.handle,i=this._mHandleTooltip.end.handle,a=Math.abs(t.pageX-e.offsetLeft-this._fSliderPaddingLeft-this._fSliderOffsetLeft),o=Math.abs(t.clientX-i.offsetLeft-this._fSliderPaddingLeft-this._fSliderOffsetLeft);return a>o?i:e};l.prototype._getIndexOfHandle=function(t){if(t&&t.getAttribute&&t.getAttribute("data-range-val")==="start"){return 0}else if(t&&t.getAttribute&&t.getAttribute("data-range-val")==="end"){return 1}else{return-1}};l.prototype._getHandleForTooltip=function(t){var e=t===this._mHandleTooltip.start.tooltip?this._mHandleTooltip.start.handle:this._mHandleTooltip.end.handle;return e};l.prototype._updateHandle=function(t,e){var i=this._mHandleTooltip.start.handle===t?this._mHandleTooltip.start.tooltip:this._mHandleTooltip.end.tooltip,a=this.getRange(),o=this._getIndexOfHandle(t),n=this._getPercentOfValue(e);a[o]=e;this._updateRangePropertyDependencies(a);this._updateHandleDom(t,a,o,e,n);if(this.getShowAdvancedTooltip()){this._updateTooltipContent(i,e);this._adjustTooltipsContainer()}this._recalculateRange()};l.prototype._updateHandleDom=function(t,e,i,a,o){var n,s=this.getRenderer().CSS_CLASS,l=this.getDomRef("input");if(!!this.getName()){l.setAttribute(t.getAttribute("data-range-val"),this.toFixed(e[i],this._iDecimalPrecision));l.setAttribute("value",this.getValue())}if(this._bRTL){t.style.right=o+"%"}else{t.style.left=o+"%"}if(this.getShowHandleTooltip()&&!this.getShowAdvancedTooltip()){t.title=this._formatValueByCustomElement(a)}n=e[0]===e[1];this.$("handle1").toggleClass(s+"HandleOverlap",n);this.$("handle2").toggleClass(s+"HandleOverlap",n);clearTimeout(this._ariaUpdateDelay[i]);this._ariaUpdateDelay[i]=setTimeout(this["_updateHandleAria"].bind(this,t,a),100)};l.prototype._updateHandleAria=function(t,e){var i=this.getRange(),a=this.getDomRef("progress"),o=this.toFixed(e,this._iDecimalPrecision),n=this._formatValueByCustomElement(o);i[0]=this.toFixed(i[0],this._iDecimalPrecision);i[1]=this.toFixed(i[1],this._iDecimalPrecision);this._updateHandlesAriaLabels();this._updateHandleAriaAttributeValues(t,e,n);if(a){a.setAttribute("aria-valuenow",i.join("-"));a.setAttribute("aria-valuetext",this._oResourceBundle.getText("RANGE_SLIDER_RANGE_ANNOUNCEMENT",i.map(this._formatValueByCustomElement,this)))}};l.prototype._updateHandlesAriaLabels=function(){var t=this.getRange(),e=this._mHandleTooltip.start.label;if(t[0]>t[1]&&!this._mHandleTooltip.bAriaHandlesSwapped||t[0]<t[1]&&this._mHandleTooltip.bAriaHandlesSwapped){this._mHandleTooltip.start.label=this._mHandleTooltip.end.label;this._mHandleTooltip.end.label=e;if(this._mHandleTooltip.start.handle){this._mHandleTooltip.start.handle.setAttribute("aria-labelledby",this._mHandleTooltip.start.label.getId())}if(this._mHandleTooltip.end.handle){this._mHandleTooltip.end.handle.setAttribute("aria-labelledby",this._mHandleTooltip.end.label.getId())}this._mHandleTooltip.bAriaHandlesSwapped=!this._mHandleTooltip.bAriaHandlesSwapped}};l.prototype._updateTooltipContent=function(t,e){var i=this.toFixed(e,this._iDecimalPrecision);t.setValue(parseFloat(i))};l.prototype._swapTooltips=function(t){var e=this._mHandleTooltip.start.tooltip;if(t[0]>=t[1]&&!this._mHandleTooltip.bTooltipsSwapped||t[0]<=t[1]&&this._mHandleTooltip.bTooltipsSwapped){this._mHandleTooltip.start.tooltip=this._mHandleTooltip.end.tooltip;this._mHandleTooltip.end.tooltip=e;this._updateTooltipContent(this._mHandleTooltip.start.tooltip,t[0]);this._updateTooltipContent(this._mHandleTooltip.end.tooltip,t[1]);if(this.getInputsAsTooltips()){this._mHandleTooltip.start.handle.setAttribute("aria-controls",this._mHandleTooltip.start.tooltip.getId());this._mHandleTooltip.end.handle.setAttribute("aria-controls",this._mHandleTooltip.end.tooltip.getId())}this._mHandleTooltip.bTooltipsSwapped=!this._mHandleTooltip.bTooltipsSwapped}};l.prototype._adjustTooltipsContainer=function(){var t=this.getAggregation("_tooltipContainer");if(!t.getDomRef()){return}t.repositionTooltips(this.getMin(),this.getMax());this._swapTooltips(this.getRange())};l.prototype.getUsedTooltips=function(){var t=this.getCustomTooltips(),e=this.getAggregation("_defaultTooltips")||[];return t.length>1?t:e};l.prototype.handleTooltipChange=function(t){this.updateTooltipsPositionAndState(t.getSource(),Number(t.getParameter("value")))};l.prototype.updateTooltipsPositionAndState=function(t,e){var i,a,o=this._mHandleTooltip.bTooltipsSwapped;e=this._adjustRangeValue(e);i=this._mHandleTooltip.start.tooltip===t?this._mHandleTooltip.start.handle:this._mHandleTooltip.end.handle;this._updateHandle(i,e);if(o!==this._mHandleTooltip.bTooltipsSwapped){a=this._mHandleTooltip.start.tooltip!==t?this._mHandleTooltip.start.tooltip:this._mHandleTooltip.end.tooltip;a.focus()}this._fireChangeAndLiveChange({range:this.getRange()});this.updateAdvancedTooltipDom()};l.prototype._updateDOMAfterSetters=function(t,e,i){var a,o;if(this.getDomRef()){a=this._getPercentOfValue(t);o=i===1?this._mHandleTooltip.end:this._mHandleTooltip.start;this._updateHandleDom(o.handle,e,i,t,a);if(this.getShowAdvancedTooltip()){this._updateTooltipContent(o.tooltip,t)}return true}return false};l.prototype.setRange=function(t){t=t.map(this._adjustRangeValue,this);this._updateRangePropertyDependencies(t);if(this._updateDOMAfterSetters(t[0],t,0)&&this._updateDOMAfterSetters(t[1],t,1)){this._recalculateRange()}return this};l.prototype.setStep=function(t){this._validateProperties();this._iDecimalPrecision=this.getDecimalPrecisionOfNumber(t);return this.setProperty("step",t)};l.prototype.setValue=function(t){var e=this.getRange();if(typeof t!=="number"||!isFinite(t)){return this}t=this._adjustRangeValue(t);e[0]=t;this._updateRangePropertyDependencies(e);if(this._updateDOMAfterSetters(e[0],e,0)){this._recalculateRange()}return this};l.prototype.setValue2=function(t){var e=this.getRange();t=this._adjustRangeValue(t);e[1]=t;this._updateRangePropertyDependencies(e);if(this._updateDOMAfterSetters(e[1],e,1)){this._recalculateRange()}return this};l.prototype._updateRangePropertyDependencies=function(t){var e=Array.isArray(t)?t.slice():[],i=this._iDecimalPrecision?this._iDecimalPrecision:0,a=Number(e[0].toFixed(i)),o=Number(e[1].toFixed(i));if(this.getProperty("value")!==a){this.setProperty("value",a,true);e[0]=a}if(this.getProperty("value2")!==o){this.setProperty("value2",o,true);e[1]=o}this.setProperty("range",e,true)};l.prototype._calculateHandlePosition=function(t){var e=this.getMax(),i=this.getMin(),a;a=(t-this._fSliderPaddingLeft-this._fSliderOffsetLeft)/this._fSliderWidth*(e-i)+i;if(this._bRTL){a=this._convertValueToRtlMode(a)}return this._adjustRangeValue(a)};l.prototype._adjustRangeValue=function(t){var i=this.getMax(),a=this.getMin(),o=this.getStep(),n;if(this._bInitialRangeChecks){return t}n=Math.abs((t-a)%o);if(n!==0){t=n*2>=o?t+o-n:t-n}if(t<a){e.warning("Warning: "+"Min value ("+t+") not in the range: ["+a+","+i+"]",this);t=a}else if(t>i){e.warning("Warning: "+"Max value ("+t+") not in the range: ["+a+","+i+"]",this);t=i}return t};l.prototype.ontouchstart=function(t){var e=t.targetTouches[0],i=this.getRenderer().CSS_CLASS,a="."+i,n,l,r,h,p,d,g,u,_,f,c,m;if(!this.getEnabled()){return}t.setMarked();if(t.target.className.indexOf("sapMInput")===-1){t.preventDefault()}this._recalculateStyles();if(["number","text"].indexOf(t.target.type)>-1){return}r=this._calculateHandlePosition(e.pageX);p=this.getRange();h=[this._mHandleTooltip.start.handle,this._mHandleTooltip.end.handle];d=this._getIndexOfHandle(t.target);g=h.reduce(function(t,e){return Math.abs(t-e.offsetLeft)},0);n=Math.min.apply(Math,p);l=Math.max.apply(Math,p);m=this.$("handle1").outerWidth()/2;_=Math.abs(this.getMin())+Math.abs(this.getMax());f=m*100/this.$("inner").outerWidth();c=f/100*_;if(r<n||r<n+c||r>l||r>l-c||g<=o.CONSTANTS.RANGE_MOVEMENT_THRESHOLD){h=[this.getClosestHandleDomRef(e)];this._updateHandle(h[0],r);this._fireChangeAndLiveChange({range:this.getRange()})}else if(d!==-1){h=[this.getDomRef(d===0?"handle1":"handle2")]}s(document).on("touchend"+a+" touchcancel"+a+" mouseup"+a,this._ontouchend.bind(this,h)).on("touchmove"+a+(t.originalEvent.type!=="touchstart"?" mousemove"+a:""),this._ontouchmove.bind(this,r,this.getRange(),h));h.map(function(t){if(t.className.indexOf(i+"HandlePressed")===-1){t.className+=" "+i+"HandlePressed"}});u=h.length===1?h[0]:this.getDomRef("progress");setTimeout(u["focus"].bind(u),0)};l.prototype._ontouchmove=function(t,e,i,a){var o,n,s,l,r=a.targetTouches?a.targetTouches[0].pageX:a.pageX,h=this.getMax(),p=this.getMin(),d=[],g=[];a.preventDefault();a.setMarked();if(a.isMarked("delayedMouseEvent")||!this.getEnabled()||a.button){return}o=this._calculateHandlePosition(r)-t;for(var u=0;u<e.length;u++){d[u]=e[u]+o}g=this._getNormalizedRange(this.getRange(),e,i);n=d.every(function(t,e){return t===g[e]});s=d.every(function(t){return t>=p&&t<=h});l=g.indexOf(p)>-1||g.indexOf(h)>-1;if(!n){if(i.length===1||s||!l){i.map(function(t){this._updateHandle(t,e[this._getIndexOfHandle(t)]+o)},this)}this.getShowAdvancedTooltip()&&this._adjustTooltipsContainer();g=this._getNormalizedRange(this.getRange(),e,i)}this._triggerLiveChange();this.setRange(g)};l.prototype.updateAdvancedTooltipDom=function(){this.getAggregation("_tooltipContainer").repositionTooltips(this.getMin(),this.getMax())};l.prototype._triggerLiveChange=function(){var t,e=this.getRange();this._liveChangeLastValue=this._liveChangeLastValue||[];t=e.some(function(t,e){return t!==this._liveChangeLastValue[e]},this);if(t){this._liveChangeLastValue=e.slice();this.fireLiveChange({range:e})}};l.prototype._getNormalizedRange=function(t,e,i){var a=this.getMax(),o=this.getMin(),n=Math.abs(e[0]-e[1]),s=[],l,r;for(l=0;l<t.length;l++){s[l]=t[l]<o?o:t[l];s[l]=t[l]>a?a:s[l];if(i.length===2){if(s[0]==o){s[1]=s[0]+n}else{r=Math.abs(l-1);s[r]=s[l]<=o?s[l]+n:s[r];s[r]=s[l]>=a?s[l]-n:s[r]}}}return s};l.prototype._ontouchend=function(t,e){var i=this.getRange(),a=this.getRenderer().CSS_CLASS;e.setMarked();t&&t.map(function(t){t.className=t.className.replace(new RegExp(" ?"+a+"HandlePressed","gi"),"")});s(document).off("."+a);this._recalculateRange();if(this._aInitialFocusRange[0]!==i[0]||this._aInitialFocusRange[1]!==i[1]){this._aInitialFocusRange=Array.prototype.slice.call(i);this.fireChange({range:i})}if(this.getShowAdvancedTooltip()){this._updateTooltipContent(this._mHandleTooltip.start.tooltip,i[0]);this._updateTooltipContent(this._mHandleTooltip.end.tooltip,i[1])}};l.prototype.onfocusin=function(t){var e=this.getAggregation("_tooltipContainer");if(this.getShowAdvancedTooltip()){e.show(this);this._adjustTooltipsContainer()}if(!(document.activeElement===this.getFocusDomRef())){this._aInitialFocusRange=this.getRange()}};l.prototype.getFocusDomRef=function(){return this.getDomRef("progress")};l.prototype._updateSliderValues=function(t,e){var i=this.getRange(),a=this.getMax(),o=this.getMin(),n=Math.max.apply(null,i),s=Math.min.apply(null,i),l=this._getIndexOfHandle(e),r=t<0?-1:1,h=l>-1?[e]:[this._mHandleTooltip.start.handle,this._mHandleTooltip.end.handle];if(h.length===1){s=n=i[l]}if(n+t>a){t=r*(Math.abs(a)-Math.abs(n))}else if(s+t<o){t=r*(Math.abs(s)-Math.abs(o))}h.map(function(e){this._updateHandle(e,i[this._getIndexOfHandle(e)]+t)},this)};l.prototype.onkeydown=function(t){var e=this.getInputsAsTooltips(),i=this.getShowAdvancedTooltip(),a=t.keyCode===o.CONSTANTS.F2_KEYCODE,n=t.target===this._mHandleTooltip.start.handle,l=s(t.target).hasClass(o.CONSTANTS.HANDLE_CLASS);if(a&&i&&e&&l){this._mHandleTooltip[n?"start":"end"].tooltip.focus()}};l.prototype.onsapincrease=function(t){t.preventDefault();t.setMarked();if(this.getEnabled()){this._updateSliderValues(this.getStep(),t.target);this._fireChangeAndLiveChange({range:this.getRange()})}};l.prototype.onsapplus=l.prototype.onsapincrease;l.prototype.onsapincreasemodifiers=function(t){if(t.altKey){return}t.preventDefault();t.stopPropagation();t.setMarked();if(this.getEnabled()){this._updateSliderValues(this._getLongStep(),t.target);this._fireChangeAndLiveChange({range:this.getRange()})}};l.prototype.onsappageup=l.prototype.onsapincreasemodifiers;l.prototype.onsapdecrease=function(t){t.preventDefault();t.setMarked();if(this.getEnabled()){this._updateSliderValues(-1*this.getStep(),t.target);this._fireChangeAndLiveChange({range:this.getRange()})}};l.prototype.onsapminus=l.prototype.onsapdecrease;l.prototype.onsapdecreasemodifiers=function(t){if(t.altKey){return}t.preventDefault();t.stopPropagation();t.setMarked();if(this.getEnabled()){this._updateSliderValues(-1*this._getLongStep(),t.target);this._fireChangeAndLiveChange({range:this.getRange()})}};l.prototype.onsappagedown=l.prototype.onsapdecreasemodifiers;l.prototype.onsaphome=function(t){var e=0,i,a,o;t.setMarked();t.preventDefault();e=this._getIndexOfHandle(t.target);i=this.getRange()[e];o=this.getMin();if(this.getEnabled()&&i!==o){a=e===1?this._mHandleTooltip.end:this._mHandleTooltip.start;this._updateHandle(a.handle,o);this._fireChangeAndLiveChange({range:this.getRange()})}};l.prototype.onsapend=function(t){t.setMarked();t.preventDefault();if(this.getEnabled()){this._updateSliderValues(this.getMax(),t.target);this._fireChangeAndLiveChange({range:this.getRange()})}};l.prototype.onsapescape=function(){this.setRange(this._aInitialFocusRange);this._fireChangeAndLiveChange({range:this.getRange()})};return l});