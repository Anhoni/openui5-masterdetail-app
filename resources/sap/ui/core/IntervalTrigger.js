/*!
 * UI development toolkit for HTML5 (OpenUI5)
 * (c) Copyright 2009-2018 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["../base/Object","./EventBus","sap/base/assert","sap/ui/thirdparty/jquery"],function(t,e,i,r){"use strict";var s="sapUiIntervalTrigger-event";var n=t.extend("sap.ui.core.IntervalTrigger",{constructor:function(i){t.apply(this);this._oEventBus=new e;this._delayedCallId=null;this._triggerProxy=r.proxy(o,this);this._iInterval=0;if(i){this.setInterval(i)}}});var o=function(){clearTimeout(this._delayedCallId);var t=this._oEventBus._defaultChannel.hasListeners(s);if(this._iInterval>0&&t){this._oEventBus.publish(s);this._delayedCallId=setTimeout(this._triggerProxy.bind(this),this._iInterval)}};n.prototype.destroy=function(){t.prototype.destroy.apply(this,arguments);delete this._triggerProxy;this._oEventBus.destroy();delete this._oEventBus};n.prototype.setInterval=function(t){i(typeof t==="number","Interval must be an integer value");if(this._iInterval!==t){this._iInterval=t;this._triggerProxy()}};n.prototype.addListener=function(t,e){this._oEventBus.subscribe(s,t,e);this._triggerProxy()};n.prototype.removeListener=function(t,e){this._oEventBus.unsubscribe(s,t,e)};n.prototype.getInterface=function(){return this};return n});