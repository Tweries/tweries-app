(this["webpackJsonpchina-musk"]=this["webpackJsonpchina-musk"]||[]).push([[0],{10:function(e){e.exports=JSON.parse('{"a":"0.8.1"}')},14:function(e,t,n){e.exports=n(26)},23:function(e,t,n){},24:function(e,t,n){},25:function(e,t,n){},26:function(e,t,n){"use strict";n.r(t);var a=n(0),r=n.n(a),c=n(9),o=n(1),i=n(6),u=n.n(i),l=n(10),s=n(3),h=n.n(s),p=n(5),f=n(13),d=n(11),g=n.n(d),m=function(){return window.history.replaceState({},document.title,window.location.pathname)},v=r.a.createContext(),b=function(){return Object(a.useContext)(v)},E=(n(23),function(e){var t=e.dispatch,n=b(),c=n.isAuthenticated,o=n.loginWithRedirect,i=n.logout,u=n.user;return Object(a.useEffect)((function(){c&&t({type:"SET_USER_ID",value:u.sub})}),[t,c,u]),r.a.createElement("header",{className:"NavBar"},c?[r.a.createElement("img",{alt:u.name,key:"img",src:u.picture}),r.a.createElement("span",{key:"span"},r.a.createElement("span",{"aria-label":"hello",role:"img"},"\ud83d\udc4b")," ",u.name),r.a.createElement("button",{key:"button",onClick:function(){return i({returnTo:window.location.href})}},"Log out")]:r.a.createElement("button",{onClick:function(){return o({})}},"Log in"))}),O=n(2),y=n.n(O),w="[..]",S=280,k="_/_";function T(e,t){return void 0===e&&void 0===t?k:"".concat(e+1,"/").concat(t)}var j=function(e,t){for(var n=e.slice(),a=[];0!==n.length;){var r=void 0;(r=t.length>0?y.a.prune(n,S-t.length-T().length-2,""):y.a.prune(n,S-T().length-1,"")).indexOf(w)>-1?(r=y.a.substr(r,0,r.indexOf(w)),n=y.a.substr(n,r.length+4)):n=y.a.substr(n,r.length+1),a.push(r)}return a.map((function(e,n){var r;return{length:(r=t.length>0?"".concat(y.a.trim(e)," ").concat(t," ").concat(T(n,a.length)):"".concat(y.a.trim(e)," ").concat(T(n,a.length))).length,tweet:r}}))},x={hashtags:"",healthy:!1,items:j("",""),source:"",userId:null},C=n(12);function _(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,a)}return n}function R(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?_(n,!0).forEach((function(t){Object(C.a)(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):_(n).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}var A=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:x,t=arguments.length>1?arguments[1]:void 0;switch(t.type){case"CHANGE_HASHTAGS":return R({},e,{hashtags:t.value,items:j(e.source,t.value)});case"CHANGE_SOURCE":return R({},e,{items:j(t.value,e.hashtags),source:t.value});case"RESET_TWEETSTORM":return R({},x,{healthy:e.healthy,userId:e.value});case"SET_HEALTHY":return R({},e,{healthy:t.value});case"SET_USER_ID":return R({},e,{userId:t.value});default:return e}};n(24);var H=function(e){return function(t,n){return e(t,n)}},P="https://china-musk-api.herokuapp.com";var W=function(){var e=b(),t=e.isAuthenticated,n=e.loading;Object(a.useEffect)((function(){fetch("".concat(P,"/api/v1/health")).then((function(e){return e.json()})).then((function(e){console.log(e),m({type:"SET_HEALTHY",value:!0})})).catch((function(e){console.log(e),m({type:"SET_HEALTHY",value:!1})}))}),[]);var c=Object(a.useReducer)(H(A),x),i=Object(o.a)(c,2),s=i[0],h=s.hashtags,p=s.healthy,f=s.items,d=s.source,g=s.userId,m=i[1];function v(){return!t||!f.length>0||!p}return n?r.a.createElement("article",null,"..."):r.a.createElement("article",null,r.a.createElement(E,{dispatch:m}),r.a.createElement("h1",null,"Tweries"),r.a.createElement("form",{onSubmit:function(e){return e.preventDefault()}},r.a.createElement("small",null,"Start typing, to insert a break prior to reaching 280 characters please use [..]"),r.a.createElement("textarea",{"data-testid":"source",placeholder:"What's happening?",rows:8,value:d,onChange:function(e){return m({type:"CHANGE_SOURCE",value:e.target.value})}}),r.a.createElement("textarea",{"data-testid":"hashtags",onChange:function(e){return m({type:"CHANGE_HASHTAGS",value:e.target.value})},placeholder:"#hashtags",rows:1,type:"text",value:h}),r.a.createElement("ul",{"data-testid":"list"},f.map((function(e,t){return r.a.createElement("li",{key:t},r.a.createElement("textarea",{readOnly:!0,rows:4,value:e.tweet}))}))),r.a.createElement("button",{className:u()("App__button",{"App__button--disabled":v()}),"data-testid":"tweet",disabled:v(),onClick:function(){fetch("".concat(P,"/api/v1/tweetstorm"),{body:JSON.stringify({items:f,userId:g}),headers:{"Content-Type":"application/json"},method:"POST"}).then((function(e){return e.json()})).then((function(e){console.log(e),m({type:"RESET_TWEETSTORM"})})).catch((function(e){console.log(e),m({type:"RESET_TWEETSTORM"})}))}},"Tweet")),r.a.createElement("footer",{className:u()({healthy:p})},"v",l.a))},I=n(7);n(25),Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));Object(c.render)(r.a.createElement((function(e){var t=e.children,n=e.onRedirectCallback,c=void 0===n?m:n,i=Object(f.a)(e,["children","onRedirectCallback"]),u=Object(a.useState)(),l=Object(o.a)(u,2),s=l[0],d=l[1],b=Object(a.useState)(),E=Object(o.a)(b,2),O=E[0],y=E[1],w=Object(a.useState)(),S=Object(o.a)(w,2),k=S[0],T=S[1],j=Object(a.useState)(!0),x=Object(o.a)(j,2),C=x[0],_=x[1],R=Object(a.useState)(!1),A=Object(o.a)(R,2),H=A[0],P=A[1];Object(a.useEffect)((function(){(function(){var e=Object(p.a)(h.a.mark((function e(){var t,n,a,r,o;return h.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,g()(i);case 2:if(t=e.sent,T(t),!window.location.search.includes("code=")){e.next=10;break}return e.next=7,t.handleRedirectCallback();case 7:n=e.sent,a=n.appState,c(a);case 10:return e.next=12,t.isAuthenticated();case 12:if(r=e.sent,d(r),!r){e.next=19;break}return e.next=17,t.getUser();case 17:o=e.sent,y(o);case 19:_(!1);case 20:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}})()()}),[]);var W=function(){var e=Object(p.a)(h.a.mark((function e(){var t,n,a=arguments;return h.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t=a.length>0&&void 0!==a[0]?a[0]:{},P(!0),e.prev=2,e.next=5,k.loginWithPopup(t);case 5:e.next=10;break;case 7:e.prev=7,e.t0=e.catch(2),console.error(e.t0);case 10:return e.prev=10,P(!1),e.finish(10);case 13:return e.next=15,k.getUser();case 15:n=e.sent,y(n),d(!0);case 18:case"end":return e.stop()}}),e,null,[[2,7,10,13]])})));return function(){return e.apply(this,arguments)}}(),I=function(){var e=Object(p.a)(h.a.mark((function e(){var t;return h.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return _(!0),e.next=3,k.handleRedirectCallback();case 3:return e.next=5,k.getUser();case 5:t=e.sent,_(!1),d(!0),y(t);case 9:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}();return r.a.createElement(v.Provider,{value:{isAuthenticated:s,user:O,loading:C,popupOpen:H,loginWithPopup:W,handleRedirectCallback:I,getIdTokenClaims:function(){return k.getIdTokenClaims.apply(k,arguments)},loginWithRedirect:function(){return k.loginWithRedirect.apply(k,arguments)},getTokenSilently:function(){return k.getTokenSilently.apply(k,arguments)},getTokenWithPopup:function(){return k.getTokenWithPopup.apply(k,arguments)},logout:function(){return k.logout.apply(k,arguments)}}},t)}),{client_id:I.clientId,domain:I.domain,onRedirectCallback:function(e){window.history.replaceState({},document.title,e&&e.targetUrl?e.targetUrl:window.location.pathname)},redirect_uri:window.location.href},r.a.createElement(W,null)),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()}))},7:function(e){e.exports=JSON.parse('{"domain":"dev-17-x3zfb.auth0.com","clientId":"iqgFXkcTFo9l80i7llzcurmrfgVsn3TZ"}')}},[[14,1,2]]]);
//# sourceMappingURL=main.17f57c44.chunk.js.map