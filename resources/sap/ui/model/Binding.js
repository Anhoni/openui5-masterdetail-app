/*!
 * OpenUI5
 * (c) Copyright 2009-2020 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/base/EventProvider","./ChangeReason","./DataState","sap/base/Log","sap/base/util/each"],function(t,e,a,n,i){"use strict";var s;var o=[];var h=t.extend("sap.ui.model.Binding",{constructor:function(e,a,n,i){t.apply(this);this.oModel=e;this.bRelative=!a.startsWith("/");this.sPath=a;this.oContext=n;this.vMessages=undefined;this.mParameters=i;this.bInitial=false;this.bSuspended=false;this.oDataState=null},metadata:{abstract:true,publicMethods:["getPath","getContext","getModel","attachChange","detachChange","refresh","isInitial","attachDataStateChange","detachDataStateChange","attachAggregatedDataStateChange","detachAggregatedDataStateChange","attachDataRequested","detachDataRequested","attachDataReceived","detachDataReceived","suspend","resume","isSuspended"]}});h.prototype.getPath=function(){return this.sPath};h.prototype.getContext=function(){return this.oContext};h.prototype.setContext=function(t){if(this.oContext!=t){sap.ui.getCore().getMessageManager().removeMessages(this.getDataState().getControlMessages(),true);this.oContext=t;this.oDataState=null;this._fireChange({reason:e.Context})}};h.prototype.getMessages=function(){return this.vMessages};h.prototype.getDataState=function(){if(!this.oDataState){this.oDataState=new a}return this.oDataState};h.prototype.getModel=function(){return this.oModel};h.prototype.attachChange=function(t,e){if(!this.hasListeners("change")){this.oModel.addBinding(this)}this.attachEvent("change",t,e)};h.prototype.detachChange=function(t,e){this.detachEvent("change",t,e);if(!this.hasListeners("change")){this.oModel.removeBinding(this)}};h.prototype.attachDataStateChange=function(t,e){this.attachEvent("DataStateChange",t,e)};h.prototype.detachDataStateChange=function(t,e){this.detachEvent("DataStateChange",t,e)};h.prototype.attachAggregatedDataStateChange=function(t,e){this.attachEvent("AggregatedDataStateChange",t,e)};h.prototype.detachAggregatedDataStateChange=function(t,e){this.detachEvent("AggregatedDataStateChange",t,e)};h.prototype._fireChange=function(t){this.fireEvent("change",t)};h.prototype.attachDataRequested=function(t,e){this.attachEvent("dataRequested",t,e)};h.prototype.detachDataRequested=function(t,e){this.detachEvent("dataRequested",t,e)};h.prototype.fireDataRequested=function(t){this.fireEvent("dataRequested",t)};h.prototype.attachDataReceived=function(t,e){this.attachEvent("dataReceived",t,e)};h.prototype.detachDataReceived=function(t,e){this.detachEvent("dataReceived",t,e)};h.prototype.fireDataReceived=function(t){this.fireEvent("dataReceived",t)};h.prototype.updateRequired=function(t){return t&&this.getModel()===t};h.prototype.hasValidation=function(){return!!this.getType()};h.prototype.checkUpdate=function(t){if(this.bSuspended&&!t){return}this._fireChange({reason:e.Change})};h.prototype.refresh=function(t){if(this.bSuspended&&!t){return}this.checkUpdate(t)};h.prototype.initialize=function(){if(!this.bSuspended){this.checkUpdate(true)}return this};h.prototype._refresh=function(t){this.refresh(t)};h.prototype.isResolved=function(){if(this.bRelative&&!this.oContext){return false}return true};h.prototype.isInitial=function(){return this.bInitial};h.prototype.isRelative=function(){return this.bRelative};h.prototype.attachEvents=function(t){if(!t){return this}var e=this;i(t,function(t,a){var i="attach"+t.substring(0,1).toUpperCase()+t.substring(1);if(e[i]){e[i](a)}else{n.warning(e.toString()+" has no handler for event '"+t+"'")}});return this};h.prototype.detachEvents=function(t){if(!t){return this}var e=this;i(t,function(t,a){var i="detach"+t.substring(0,1).toUpperCase()+t.substring(1);if(e[i]){e[i](a)}else{n.warning(e.toString()+" has no handler for event '"+t+"'")}});return this};h.prototype.attachRefresh=function(t,e){this.attachEvent("refresh",t,e)};h.prototype.detachRefresh=function(t,e){this.detachEvent("refresh",t,e)};h.prototype._fireRefresh=function(t){this.fireEvent("refresh",t)};h.prototype.suspend=function(){this.bSuspended=true};h.prototype.isSuspended=function(){return this.bSuspended};h.prototype.resume=function(){this.bSuspended=false;this.checkUpdate()};h.prototype.destroy=function(){this.bIsBeingDestroyed=true;sap.ui.getCore().getMessageManager().removeMessages(this.getDataState().getControlMessages(),true);t.prototype.destroy.apply(this,arguments);this.bIsBeingDestroyed=false};h.prototype.checkDataState=function(t){var e=this.oModel?this.oModel.resolve(this.sPath,this.oContext):null;this._checkDataState(e,t)};h.prototype._checkDataState=function(t,e){if(!e||t&&t in e){var a=this;var n=this.getDataState();var i=function(){a.fireEvent("AggregatedDataStateChange",{dataState:n});n.changed(false);a.bFiredAsync=false};this._checkDataStateMessages(n,t);if(n&&n.changed()){if(this.mEventRegistry["DataStateChange"]){this.fireEvent("DataStateChange",{dataState:n})}if(this.bIsBeingDestroyed){i()}else if(this.mEventRegistry["AggregatedDataStateChange"]&&!this.bFiredAsync){r(i);this.bFiredAsync=true}}}};h.prototype._checkDataStateMessages=function(t,e){if(e){t.setModelMessages(this.oModel.getMessagesByPath(e))}};function r(t){if(!s){s=setTimeout(function(){s=undefined;var t=o;o=[];t.forEach(function(t){t()})},0)}o.push(t)}return h});