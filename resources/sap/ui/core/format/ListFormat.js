/*!
 * UI development toolkit for HTML5 (OpenUI5)
 * (c) Copyright 2009-2018 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/core/Locale","sap/ui/core/LocaleData","sap/base/Log","sap/ui/thirdparty/jquery"],function(t,e,r,a){"use strict";var o=function(){throw new Error};o.oDefaultListFormat={type:"standard",style:"wide"};o.getInstance=function(t,e){return this.createInstance(t,e)};o.createInstance=function(r,o){var i=Object.create(this.prototype);if(r instanceof t){o=r;r=undefined}if(!o){o=sap.ui.getCore().getConfiguration().getFormatSettings().getFormatLocale()}i.oLocale=o;i.oLocaleData=e.getInstance(o);i.oOriginalFormatOptions=a.extend({},this.oDefaultListFormat,r);return i};o.prototype.format=function(t){if(!Array.isArray(t)){r.error("ListFormat can only format with an array given.");return""}var e=this.oOriginalFormatOptions,o,i,n,s,p,l,c=[].concat(t),f,u;o=this.oLocaleData.getListFormat(e.type,e.style);if(a.isEmptyObject(o)){r.error("No list pattern exists for the provided format options (type, style).");return""}function g(t,e){var r=t[0];for(var a=1;a<t.length;a++){r=e.replace("{0}",r);r=r.replace("{1}",t[a])}return r}if(o[c.length]){i=o[c.length];for(var h=0;h<c.length;h++){i=i.replace("{"+h+"}",c[h])}n=i}else if(c.length<2){n=c.toString()}else{f=c.shift();l=c.pop();u=c;s=o.start.replace("{0}",f);l=o.end.replace("{1}",l);p=g(u,o.middle);n=s.replace("{1}",l.replace("{0}",p))}return n};o.prototype.parse=function(t){if(typeof t!=="string"){r.error("ListFormat can only parse a String.");return[]}var e=[],i=[],n=[],s=[],p=[],l=this.oOriginalFormatOptions,c,f=/\{[01]\}/g,u,g,h,y,m;if(!l){l=o.oDefaultListFormat}c=this.oLocaleData.getListFormat(l.type,l.style);if(a.isEmptyObject(c)){r.error("No list pattern exists for the provided format options (type, style).");return[]}h=c.start.replace(f,"");y=c.middle.replace(f,"");m=c.end.replace(f,"");i=t.split(h);e=e.concat(i.shift());s=i.join(h).split(m);u=s.pop();n=s.join(m).split(y);e=e.concat(n);e.push(u);if(i.length<1||n.length<1||s.length<1){g=c["2"].replace(f,"");p=t.split(g);if(p.length===2){return p}if(t){return[t]}else{return[]}}return e};return o});