AUI.add("aui-rating",function(x){var s=x.Lang,P=s.isBoolean,al=s.isNumber,t=s.isString,F=function(A){return(A instanceof x.NodeList);},r=function(A){return(A instanceof x.Node);},R="a",y="",ah="boundingBox",S="canReset",h="clearfix",J="contentBox",O="defaultSelected",N="disabled",G=".",X="element",l="elements",U="",Z="helper",B="hover",aa="href",i="javascript:;",H="id",o="input",ac="inputName",aj="label",an="labelNode",Q="name",ab="nodeName",v="off",C="on",z="rating",b="selectedIndex",j="showTitle",I="size",T="title",af="value",a="itemClick",am="itemSelect",c="itemOut",Y="itemOver",n=x.getClassName,M=n(Z,h),ak=n(z,aj,X),g=n(z,X),V=n(z,X,B),k=n(z,X,v),E=n(z,X,C),p='<div class="'+ak+'"></div>',f={tagName:"a",attrs:""},e={tagName:"a",attrs:'href="'+i+'"'},w='<a href="'+i+'"></a>',q="<span></span>",d=' class="'+g+'"',W=function(L){var ao=L?e:f;var A=["<",ao.tagName,ao.attrs,d,">","</",ao.tagName,">"];return A.join("");};var u=x.Component.create({NAME:"rating",ATTRS:{disabled:{value:false,validator:P},canReset:{value:true,validator:P},defaultSelected:{value:0,writeOnce:true,validator:al},elements:{validator:F},hiddenInput:{validator:r},inputName:{value:y,validator:t},label:{value:y,validator:t},labelNode:{valueFn:function(){return x.Node.create(p);},validator:r},selectedIndex:{value:-1,validator:al},showTitle:{value:true,validator:P},size:{value:5,validator:function(A){return al(A)&&(A>0);}},title:null,value:null},HTML_PARSER:{elements:function(A){return A.all(G+g);},label:function(L){var A=L.one(G+ak);if(A){return A.html();}},labelNode:G+ak},prototype:{initializer:function(){var A=this;A.inputElementsData={};A.after("labelChange",this._afterSetLabel);},renderUI:function(){var A=this;var L=A.get(J);L.addClass(M);A._parseInputElements();A._renderLabel();A._renderElements();},bindUI:function(){var A=this;A._createEvents();A.on("click",A._handleClickEvent);A.on("mouseover",A._handleMouseOverEvent);A.on("mouseout",A._handleMouseOutEvent);},syncUI:function(){var A=this;A._syncElements();A._syncLabelUI();},clearSelection:function(){var A=this;A.get(l).each(function(L){L.removeClass(E);L.removeClass(V);});},select:function(ap){var av=this;var aq=av.get(b);var at=av.get(S);if(at&&(aq==ap)){ap=-1;}av.set(b,ap);var L=av.get(b);var ao=av._getInputData(L);var ar=(T in ao)?ao.title:y;var au=(af in ao)?ao.value:L;av.fillTo(L);av.set(T,ar);av.set(af,au);var A=av.get("hiddenInput");A.setAttribute(T,ar);A.setAttribute(af,au);},fillTo:function(L,ao){var A=this;A.clearSelection();if(L>=0){A.get(l).some(function(aq,ap){aq.addClass(ao||E);return(ap==Math.floor(L));});}},indexOf:function(L){var A=this;return A.get(l).indexOf(L);},_canFireCustomEvent:function(L){var A=this;var ao=L.domEvent.target;return !A.get(N)&&ao.hasClass(g);},_createElements:function(){var L=this;var ar=[];var A=W(L.get(N));for(var ap=0,ao=this.get(I);ap<ao;ap++){ar.push(A);}var aq=x.DOM.create(ar.join(""));return new x.NodeList(aq.childNodes);},_createEvents:function(){var A=this;var L=function(ao,ap){A.publish(ao,{defaultFn:ap,queuable:false,emitFacade:true,bubbles:true});};L(a,this._defRatingItemClickFn);L(am,this._defRatingItemSelectFn);L(Y,this._defRatingItemOverFn);L(c,this._defRatingItemOutFn);},_defRatingItemClickFn:function(ao){var A=this;var L=ao.domEvent;A.fire(am,{delegateEvent:ao,domEvent:L,ratingItem:L.target});},_defRatingItemSelectFn:function(L){var A=this;var ao=L.domEvent.target;A.select(A.indexOf(ao));},_defRatingItemOutFn:function(L){var A=this;A.fillTo(A.get(b));},_defRatingItemOverFn:function(ao){var A=this;var L=A.indexOf(ao.domEvent.target);A.fillTo(L,V);},_parseInputElements:function(){var A=this;var ap=A.get(ah);var L=ap.all(o);var aq=L.size();var ao=A.get(ac);var ar=x.Node.create('<input type="hidden" />');if(aq>0){ao=ao||L.item(0).getAttribute(Q);A.set(I,aq);var at=ap.getElementsByTagName("label");L.each(function(ax,aw){var ay=ax.get(H);var av=U;if(ay){var au=at.filter('[for="'+ay+'"]');if(au.size()){av=au.item(0).html();}}A.inputElementsData[aw]={content:av,value:ax.getAttribute(af)||aw,title:ax.getAttribute(T)};});at.remove(true);L.remove(true);}if(ao){ar.setAttribute(Q,ao);ap.appendChild(ar);}A.set("hiddenInput",ar);},_renderLabel:function(){var A=this;A.get(J).append(A.get(an));},_renderElements:function(ao){var A=this;var L=A.get(J);var ao=A.get(l);if(!ao.size()){ao=A._createElements();A.set(l,ao);}ao.each(function(aq,ap){var at=A._getInputData(ap);var ar=at.content;var au=at.title||A.get(T)||ar;if(ar||au){aq.html(ar||au);}if(au&&A.get(j)){aq.setAttribute(T,au);}if(!aq.attr(aa)&&(aq.get(ab).toLowerCase()==R)){aq.setAttribute(aa,i);}});L.append(ao.getDOM());},_syncElements:function(){var L=this;var A=L.get(O)-1;L.set(b,A);L.select();},_syncLabelUI:function(){var A=this;var L=A.get(aj);A.get(an).html(L);},_getInputData:function(L){var A=this;return A.inputElementsData[L]||{};},_handleClickEvent:function(L){var A=this;if(A._canFireCustomEvent(L)){A.fire(a,{delegateEvent:L,domEvent:L.domEvent});}},_handleMouseOutEvent:function(L){var A=this;if(A._canFireCustomEvent(L)){A.fire(c,{delegateEvent:L,domEvent:L.domEvent});}},_handleMouseOverEvent:function(L){var A=this;if(A._canFireCustomEvent(L)){A.fire(Y,{delegateEvent:L,domEvent:L.domEvent});}},_afterSetLabel:function(A){this._syncLabelUI();}}});var K="down",ag="thumb",ai="ThumbRating",D="up",ae=n(z,ag,K),ad=n(z,ag,D);var m=x.Component.create({NAME:ai,ATTRS:{size:{value:2,readOnly:true}},EXTENDS:u,prototype:{renderUI:function(){var A=this;m.superclass.renderUI.apply(this,arguments);var L=A.get(l);L.addClass(k);L.item(0).addClass(ad);L.item(1).addClass(ae);},fillTo:function(A,L){this.clearSelection();if(A>=0){this.get(l).item(A).addClass(L||E);}},_syncElements:function(){}}});x.Rating=u;x.StarRating=u;x.ThumbRating=m;},"1.5.0",{requires:["aui-base"],skinnable:true});