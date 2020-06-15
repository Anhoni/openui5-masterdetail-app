/*!
 * OpenUI5
 * (c) Copyright 2009-2020 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["./BaseTreeModifier","sap/ui/base/ManagedObject","sap/base/util/merge","sap/ui/util/XMLHelper","sap/ui/core/mvc/EventHandlerResolver","sap/base/util/includes","sap/base/util/ObjectPath","sap/base/util/isPlainObject","sap/ui/core/Fragment"],function(t,e,n,r,i,a,o,s){"use strict";var g={targets:"xmlTree",setVisible:function(t,e){if(e){t.removeAttribute("visible")}else{t.setAttribute("visible",e)}},getVisible:function(t){return this.getProperty(t,"visible")},setStashed:function(t,e){if(!e){t.removeAttribute("stashed")}else{t.setAttribute("stashed",e)}this.setVisible(t,!e)},getStashed:function(t){return this.getProperty(t,"stashed")||!this.getProperty(t,"visible")},bindProperty:function(t,e,n){t.setAttribute(e,"{"+n+"}")},unbindProperty:function(t,e){t.removeAttribute(e)},_setProperty:function(t,e,n,r){var i=this._getSerializedValue(n);if(r){i=this._escapeCurlyBracketsInString(i)}t.setAttribute(e,i)},setProperty:function(t,e,n){this._setProperty(t,e,n,true)},getProperty:function(t,n){var r=t.getAttribute(n);var i=this.getControlMetadata(t).getProperty(n);if(i){var a=i.getType();if(r===null){r=i.getDefaultValue()||a.getDefaultValue()}else{var o=e.bindingParser(r,undefined,true);if(s(o)){if(o.path||o.parts){r=undefined}else{r=o}}else{r=a.parseValue(o||r)}}}return r},isPropertyInitial:function(t,e){var n=t.getAttribute(e);return n==null},setPropertyBinding:function(t,e,n){if(typeof n!=="string"){throw new Error("For XML, only strings are supported to be set as property binding.")}t.setAttribute(e,n)},getPropertyBinding:function(t,n){var r=t.getAttribute(n);if(r){var i=e.bindingParser(r,undefined,true);if(i&&(i.path||i.parts)){return i}}},createControl:function(t,e,n,r,i,a){var o,s,g;if(!this.bySelector(r,e,n)){var u=t.split(".");var l="";if(u.length>1){s=u.pop();l=u.join(".")}var f=n.ownerDocument.createElementNS(l,s);o=this.getControlIdBySelector(r,e);if(o){f.setAttribute("id",o)}if(i){this.applySettings(f,i)}return a?Promise.resolve(f):f}else{g=new Error("Can't create a control with duplicated ID "+o);if(a){return Promise.reject(g)}throw g}},applySettings:function(t,e){var n=this.getControlMetadata(t);var r=n.getJSONKeys();Object.keys(e).forEach(function(n){var i=r[n];var a=e[n];switch(i._iKind){case 0:this._setProperty(t,n,a,false);break;case 3:this.setAssociation(t,n,a);break;default:throw new Error("Unsupported in applySettings on XMLTreeModifier: "+n)}}.bind(this))},_byId:function(t,e){if(e){if(e.ownerDocument&&e.ownerDocument.getElementById&&e.ownerDocument.getElementById(t)){return e.ownerDocument.getElementById(t)}else{return e.querySelector("[id='"+t+"']")}}},getId:function(t){return t.getAttribute("id")},getParent:function(t){var e=t.parentNode;if(!this.getId(e)&&!this._isExtensionPoint(e)){e=e.parentNode}return e},_getLocalName:function(t){return t.localName||t.baseName||t.nodeName},getControlType:function(t){return this._getControlTypeInXml(t)},setAssociation:function(t,e,n){if(typeof n!=="string"){n=this.getId(n)}t.setAttribute(e,n)},getAssociation:function(t,e){return t.getAttribute(e)},getAllAggregations:function(t){var e=this.getControlMetadata(t);return e.getAllAggregations()},getAggregation:function(t,e){var n=this._findAggregationNode(t,e);var r=this._isSingleValueAggregation(t,e);if(!n){if(r&&this._isAltTypeAggregation(t,e)){return this.getProperty(t,e)}return r?undefined:[]}var i=this._getControlsInAggregation(t,n);if(r){return i[0]}return i},insertAggregation:function(t,e,n,r,i){var a=this._findAggregationNode(t,e);if(!a){var o=t.namespaceURI;a=this.createControl(o+"."+e,undefined,i);t.appendChild(a)}if(r>=a.childElementCount){a.appendChild(n)}else{var s=this._getControlsInAggregation(t,a)[r];a.insertBefore(n,s)}},removeAggregation:function(t,e,n){var r=this._findAggregationNode(t,e);r.removeChild(n)},removeAllAggregation:function(t,e){var n=this._findAggregationNode(t,e);if(t===n){var r=this._getControlsInAggregation(t,t);r.forEach(function(e){t.removeChild(e)})}else{t.removeChild(n)}},_findAggregationNode:function(t,e){var n;var r=this._children(t);for(var i=0;i<r.length;i++){var a=r[i];if(a.localName===e){n=a;break}}if(!n&&this._isDefaultAggregation(t,e)){n=t}return n},_isDefaultAggregation:function(t,e){var n=this.getControlMetadata(t);var r=n.getDefaultAggregation();return r&&e===r.name},_isNotNamedAggregationNode:function(t,e){var n=this.getAllAggregations(t);var r=n[e.localName];return t.namespaceURI!==e.namespaceURI||!r},_isSingleValueAggregation:function(t,e){var n=this.getAllAggregations(t);var r=n[e];return!r.multiple},_isAltTypeAggregation:function(t,e){var n=this.getControlMetadata(t);var r=n.getAllAggregations()[e];return!!r.altTypes},_isExtensionPoint:function(t){return this._getControlTypeInXml(t)==="sap.ui.core.ExtensionPoint"},getControlMetadata:function(t){return this._getControlMetadataInXml(t)},_getControlsInAggregation:function(t,e){var n=Array.prototype.slice.call(this._children(e));return n.filter(this._isNotNamedAggregationNode.bind(this,t))},_children:function(t){if(t.children){return t.children}else{var e=[];for(var n=0;n<t.childNodes.length;n++){var r=t.childNodes[n];if(r.nodeType===r.ELEMENT_NODE){e.push(r)}}return e}},getBindingTemplate:function(t,e){var n=this._findAggregationNode(t,e);if(n){var r=this._children(n);if(r.length===1){return r[0]}}},updateAggregation:function(t,e){},findIndexInParentAggregation:function(t){var e,n,r;e=this.getParent(t);if(!e){return-1}n=this.getParentAggregationName(t,e);r=this.getAggregation(e,n);if(Array.isArray(r)){r=r.filter(function(t){if(this._isExtensionPoint(t)){return true}return!this.getProperty(t,"stashed")}.bind(this));return r.indexOf(t)}else{return 0}},getParentAggregationName:function(t,e){var n,r;if(!e.isSameNode(t.parentNode)){n=false}else{n=this._isNotNamedAggregationNode(e,t)}if(n){r=this.getControlMetadata(e).getDefaultAggregationName()}else{r=this._getLocalName(t.parentNode)}return r},findAggregation:function(t,e){var n=this.getControlMetadata(t);var r=n.getAllAggregations();if(r){return r[e]}},validateType:function(t,e,n,r,i){var a=e.type;if(e.multiple===false&&this.getAggregation(n,e.name)&&this.getAggregation(n,e.name).length>0){return false}var o=sap.ui.xmlfragment({fragmentContent:r});if(!Array.isArray(o)){o=[o]}var s=this._isInstanceOf(o[i],a)||this._hasInterface(o[i],a);o.forEach(function(t){t.destroy()});return s},instantiateFragment:function(t,e,n){var i;var a=r.parse(t);a=this._checkAndPrefixIdsInFragment(a,e);if(a.localName==="FragmentDefinition"){i=this._getElementNodeChildren(a)}else{i=[a]}i.forEach(function(t){if(this._byId(t.getAttribute("id"),n)){throw Error("The following ID is already in the view: "+t.getAttribute("id"))}}.bind(this));return i},destroy:function(t){var e=t.parentNode;if(e){e.removeChild(t)}},_getFlexCustomData:function(t,e){if(!t){return undefined}return t.getAttributeNS("sap.ui.fl",e)},attachEvent:function(t,e,n,r){if(typeof o.get(n)!=="function"){throw new Error("Can't attach event because the event handler function is not found or not a function.")}var s=this.getProperty(t,e)||"";var g=i.parse(s);var u=n;var l=["$event"];if(r){l.push(JSON.stringify(r))}u+="("+l.join(",")+")";if(!a(g,u)){g.push(u)}t.setAttribute(e,g.join(";"))},detachEvent:function(t,e,n){if(typeof o.get(n)!=="function"){throw new Error("Can't attach event because the event handler function is not found or not a function.")}var r=this.getProperty(t,e)||"";var a=i.parse(r);var s=a.findIndex(function(t){return t.includes(n)});if(s>-1){a.splice(s,1)}if(a.length){t.setAttribute(e,a.join(";"))}else{t.removeAttribute(e)}},bindAggregation:function(t,e,n,r){this.bindProperty(t,e,n.path);this.insertAggregation(t,e,n.template,0,r)},unbindAggregation:function(t,e){if(t.hasAttribute(e)){t.removeAttribute(e);this.removeAllAggregation(t,e)}},getExtensionPointInfo:function(t,e){if(e&&t){var n=Array.prototype.slice.call(e.getElementsByTagNameNS("sap.ui.core","ExtensionPoint"));var r=n.filter(function(e){return e.getAttribute("name")===t});var i=r.length===1?r[0]:undefined;if(i){var a=this.getParent(i);var o={parent:a,aggregationName:this.getParentAggregationName(i,a),index:this.findIndexInParentAggregation(i)+1,defaultContent:Array.prototype.slice.call(this._children(i))};return o}}}};return n({},t,g)},true);