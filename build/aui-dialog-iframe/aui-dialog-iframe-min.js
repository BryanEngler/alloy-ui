AUI.add("aui-dialog-iframe",function(c){var i=c.Lang,d=c.getClassName,h="iframe",k=d("dialog",h,"bd"),l=d("dialog",h,"node"),e=d("dialog",h,"root","node"),g=[l],b='<iframe class="{cssClass}" frameborder="0" id="{id}" name="{id}" src="{uri}"></iframe>',f=c.Widget.UI_SRC,j={src:f};var a=c.Component.create({ATTRS:{bindLoadHandler:{validator:i.isFunction,value:function(){var m=this;m.node.on("load",c.bind(m.fire,m,"load"));}},closeOnEscape:{value:true},iframeCssClass:{value:"",setter:"_setIframeCssClass"},iframeId:{valueFn:function(){var m=this;return m.get("id")||c.guid();}},uri:{}},EXTENDS:c.Plugin.Base,NAME:h,NS:h,prototype:{initializer:function(n){var m=this;m._host=m.get("host");m.publish("load",{defaultFn:m._defaultLoadIframeFn});m.afterHostMethod("renderUI",c.debounce(m._afterRenderUI,50,m),m);},destructor:function(){var m=this;m._host.set("bodyContent",m._previousBodyContent);m.node.remove(true);},_afterDialogVisibleChange:function(n){var m=this;m._uiSetMonitor(n.newVal);},_afterMaskVisibleChange:function(n){var m=this;m._uiSetMonitor(!n.newVal);},_afterRenderUI:function(){var m=this;m._plugIframe();m._bindEvents();var n=m._bodyNode;n.plug(c.LoadingMask);var o=n.loadingmask;o.overlayMask.after("visibleChange",m._afterMaskVisibleChange,m);o.show();},_afterUriChange:function(n){var m=this;if(n.src!=f){m._uiSetUri(n.newVal);}},_bindEvents:function(){var m=this;m.afterHostEvent("heightChange",m._updateIframeSize,m);m.afterHostEvent("widthChange",m._updateIframeSize,m);m.afterHostEvent("visibleChange",m._afterDialogVisibleChange);m.after("uriChange",m._afterUriChange);var n=m.get("bindLoadHandler");n.call(m);},_defaultLoadIframeFn:function(o){var m=this;var n=m.node;try{var q=n.get("contentWindow.document");q.get("documentElement").addClass(e);m.set("uri",q.get("location.href"),j);if(m.get("closeOnEscape")){c.on("key",function(r){m._host.close();},[q],"down:27");}}catch(p){}m._bodyNode.loadingmask.hide();},_plugIframe:function(){var m=this;m._previousBodyContent=m._host.get("bodyContent");var n=i.sub(b,{cssClass:m.get("iframeCssClass"),id:m.get("iframeId"),uri:m.get("uri")});var p=c.Node.create(n);p.plug(c.Plugin.ResizeIframe);p.resizeiframe.addTarget(m);m._host.set("bodyContent",p);var o=m._host.bodyNode;o.addClass(k);m._bodyNode=o;m.node=p;},_setIframeCssClass:function(m){g[1]=m;return g.join(" ");},_uiSetMonitor:function(o){var m=this;var n=m.node.resizeiframe;if(o){n.restartMonitor();}else{n.pauseMonitor();}},_uiSetUri:function(n){var m=this;if(m._bodyNode.loadingmask){m._bodyNode.loadingmask.show();}m.node.attr("src",n);},_updateIframeSize:function(p){var m=this;var n=m._bodyNode;var o=m.node;var q=m._updateIframeSizeUI;if(!q){q=function(){var r=n.getStyle("height");o.resizeiframe.set("height",r);n.loadingmask.refreshMask();};m._updateIframeSizeUI=q;}c.setTimeout(q,50);}}});c.Plugin.DialogIframe=a;},"1.5.0",{skinnable:true,requires:["aui-base","aui-loading-mask","aui-resize-iframe","plugin"]});