(this["webpackJsonpchina-musk"]=this["webpackJsonpchina-musk"]||[]).push([[0],[,,,,,,function(e){e.exports=JSON.parse('{"domain":"dev-17-x3zfb.auth0.com","clientId":"iqgFXkcTFo9l80i7llzcurmrfgVsn3TZ"}')},,,,function(e){e.exports=JSON.parse('{"a":"0.4.2"}')},,,function(e,t,n){e.exports=n(25)},,,,,,,,,function(e,t,n){},function(e,t,n){},function(e,t,n){},function(e,t,n){"use strict";n.r(t);var a=n(0),r=n.n(a),o=n(8),c=n(2),i=n.n(c),u=n(5),l=n(1),s=n(12),d=n(9),h=n.n(d),p=function(){return window.history.replaceState({},document.title,window.location.pathname)},f=r.a.createContext(),g=function(){return Object(a.useContext)(f)},m=n(6),b=n(10),v=(n(22),function(){var e=g(),t=e.isAuthenticated,n=e.loginWithRedirect,o=e.logout,c=e.user,i=e.getIdTokenClaims,u=e.getTokenSilently,l=e.getTokenWithPopup;return Object(a.useEffect)((function(){t&&console.log(JSON.stringify(c,0,2))}),[i,u,l,t,c]),r.a.createElement("header",{className:"NavBar"},t?[r.a.createElement("button",{key:"button",onClick:function(){return o({returnTo:window.location.href})}},"Log out"),r.a.createElement("img",{alt:c.name,key:"img",src:c.picture})]:r.a.createElement("button",{onClick:function(){return n({})}},"Log in"))}),w={hashtags:"#QueenFTW",items:[],source:"Mama, just killed a man\nPut a gun against his head\nPulled my trigger, now he's dead\nMama, life had just begun\nBut now I've gone and thrown it all away\n[..]\nMama, ooh\nDidn't mean to make you cry\nIf I'm not back again this time tomorrow\nCarry on, carry on\nAs if nothing really matters\n[..]\nToo late, my time has come\nSends shivers down my spine\nBody's aching all the time\nGoodbye everybody, I've got to go\nGotta leave you all behind and face the truth"},y=n(11),O=n(3),E=n.n(O),k="[..]",j=280,S="_/_";function T(e,t){return void 0===e&&void 0===t?S:"".concat(e+1,"/").concat(t)}var x=function(e,t){for(var n=e.slice(),a=[];0!==n.length;){var r=E.a.prune(n,j-T().length-t.length-2,"");r.indexOf(k)>-1?(r=E.a.substr(r,0,r.indexOf(k)),n=E.a.substr(n,r.length+4)):n=E.a.substr(n,r.length+1),a.push(r)}return a.map((function(e,n){var r="".concat(T(n,a.length)," ").concat(E.a.trim(e)," ").concat(t);return{length:r.length,tweet:r}}))};function C(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,a)}return n}function P(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?C(n,!0).forEach((function(t){Object(y.a)(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):C(n).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}var R=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:w,t=arguments.length>1?arguments[1]:void 0;switch(t.type){case"CHANGE_HASHTAGS":return P({},e,{hashtags:t.value});case"CHANGE_SOURCE":return P({},e,{source:t.value});case"GENERATE_TWEETSTORM":return P({},e,{items:x(e.source,e.hashtags)});default:return e}};n(23);var A=function(e){return function(t,n){return e(t,n)}};var W=function(){var e=g().loading,t=Object(a.useReducer)(A(R),w),n=Object(l.a)(t,2),o=n[0],c=o.hashtags,i=o.items,u=o.source,s=n[1];return e?r.a.createElement("article",null,"..."):r.a.createElement("article",null,r.a.createElement(v,null),r.a.createElement("h1",null,"Serial Twitter"),r.a.createElement("form",{onSubmit:function(e){return e.preventDefault()}},r.a.createElement("textarea",{"data-testid":"source",rows:16,value:u,onChange:function(e){return s({type:"CHANGE_SOURCE",value:e.target.value})}}),r.a.createElement("input",{"data-testid":"hashtags",onChange:function(e){return s({type:"CHANGE_HASHTAGS",value:e.target.value})},type:"text",value:c}),r.a.createElement("button",{"data-testid":"generate",onClick:function(){return s({type:"GENERATE_TWEETSTORM"})}},"Generate Tweetstorm"),r.a.createElement("ul",{"data-testid":"list"},i.map((function(e,t){return r.a.createElement("li",{key:t},r.a.createElement("textarea",{readOnly:!0,rows:8,value:e.tweet}))}))),r.a.createElement("button",{"data-testid":"tweet",onClick:function(){return console.log("now:",new Date)}},"Tweet")),r.a.createElement("footer",null,"v",b.a))};n(24),Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));Object(o.render)(r.a.createElement((function(e){var t=e.children,n=e.onRedirectCallback,o=void 0===n?p:n,c=Object(s.a)(e,["children","onRedirectCallback"]),d=Object(a.useState)(),g=Object(l.a)(d,2),m=g[0],b=g[1],v=Object(a.useState)(),w=Object(l.a)(v,2),y=w[0],O=w[1],E=Object(a.useState)(),k=Object(l.a)(E,2),j=k[0],S=k[1],T=Object(a.useState)(!0),x=Object(l.a)(T,2),C=x[0],P=x[1],R=Object(a.useState)(!1),A=Object(l.a)(R,2),W=A[0],G=A[1];Object(a.useEffect)((function(){(function(){var e=Object(u.a)(i.a.mark((function e(){var t,n,a,r,u;return i.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,h()(c);case 2:if(t=e.sent,S(t),!window.location.search.includes("code=")){e.next=10;break}return e.next=7,t.handleRedirectCallback();case 7:n=e.sent,a=n.appState,o(a);case 10:return e.next=12,t.isAuthenticated();case 12:if(r=e.sent,b(r),!r){e.next=19;break}return e.next=17,t.getUser();case 17:u=e.sent,O(u);case 19:P(!1);case 20:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}})()()}),[]);var N=function(){var e=Object(u.a)(i.a.mark((function e(){var t,n,a=arguments;return i.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t=a.length>0&&void 0!==a[0]?a[0]:{},G(!0),e.prev=2,e.next=5,j.loginWithPopup(t);case 5:e.next=10;break;case 7:e.prev=7,e.t0=e.catch(2),console.error(e.t0);case 10:return e.prev=10,G(!1),e.finish(10);case 13:return e.next=15,j.getUser();case 15:n=e.sent,O(n),b(!0);case 18:case"end":return e.stop()}}),e,null,[[2,7,10,13]])})));return function(){return e.apply(this,arguments)}}(),I=function(){var e=Object(u.a)(i.a.mark((function e(){var t;return i.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return P(!0),e.next=3,j.handleRedirectCallback();case 3:return e.next=5,j.getUser();case 5:t=e.sent,P(!1),b(!0),O(t);case 9:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}();return r.a.createElement(f.Provider,{value:{isAuthenticated:m,user:y,loading:C,popupOpen:W,loginWithPopup:N,handleRedirectCallback:I,getIdTokenClaims:function(){return j.getIdTokenClaims.apply(j,arguments)},loginWithRedirect:function(){return j.loginWithRedirect.apply(j,arguments)},getTokenSilently:function(){return j.getTokenSilently.apply(j,arguments)},getTokenWithPopup:function(){return j.getTokenWithPopup.apply(j,arguments)},logout:function(){return j.logout.apply(j,arguments)}}},t)}),{client_id:m.clientId,domain:m.domain,onRedirectCallback:function(e){window.history.replaceState({},document.title,e&&e.targetUrl?e.targetUrl:window.location.pathname)},redirect_uri:window.location.href},r.a.createElement(W,null)),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()}))}],[[13,1,2]]]);
//# sourceMappingURL=main.4ffb4c60.chunk.js.map