AUI.add("aui-parse-content",function(d){var m=d.Lang,c=m.isString,g=d.config.doc,o="append",a="documentElement",p="firstChild",j="head",n="host",f="innerHTML",h="ParseContent",e="queue",l="script",i="src",k={"":1,"text/javascript":1};var b=d.Component.create({NAME:h,NS:h,ATTRS:{queue:{value:null}},EXTENDS:d.Plugin.Base,prototype:{initializer:function(){var q=this;b.superclass.initializer.apply(this,arguments);q.set(e,new d.AsyncQueue());q._bindAOP();},globalEval:function(s){var t=d.getDoc();var r=t.one(j)||t.get(a);var q=g.createElement(l);q.type="text/javascript";if(s){q.text=m.trim(s);}r.appendChild(q).remove();},parseContent:function(s){var q=this;var r=q._clean(s);q._dispatch(r);return r;},_bindAOP:function(){var r=this;var q=function(v){var u=Array.prototype.slice.call(arguments);var t=r.parseContent(v);u.splice(0,1,t.fragment);return new d.Do.AlterArgs(null,u);};this.doBefore("insert",q);this.doBefore("replaceChild",q);var s=function(u){var t=r.parseContent(u);return new d.Do.AlterArgs(null,[t.fragment]);};this.doBefore("replace",s);this.doBefore("setContent",s);},_clean:function(s){var q={};var r=d.Node.create("<div></div>");r.append("<div>_</div>");if(c(s)){d.DOM.addHTML(r,s,o);}else{r.append(s);}q.js=r.all(l).filter(function(t){return k[t.getAttribute("type").toLowerCase()];});q.js.each(function(u,t){u.remove();});r.get(p).remove();q.fragment=r.get("childNodes").toFrag();return q;},_dispatch:function(s){var r=this;var q=r.get(e);s.js.each(function(u,t){var v=u.get(i);if(v){q.add({autoContinue:false,fn:function(){d.Get.script(v,{onEnd:function(w){w.purge();q.run();}});},timeout:0});}else{q.add({fn:function(){var w=u._node;r.globalEval(w.text||w.textContent||w.innerHTML||"");},timeout:0});}});q.run();}}});d.namespace("Plugin").ParseContent=b;},"@VERSION@",{requires:["async-queue","aui-base","plugin"],skinnable:false});