(this["webpackJsonptweries-app"]=this["webpackJsonptweries-app"]||[]).push([[0],{15:function(e){e.exports=JSON.parse('{"domain":"dev-17-x3zfb.auth0.com","clientId":"iqgFXkcTFo9l80i7llzcurmrfgVsn3TZ"}')},23:function(e){e.exports=JSON.parse('{"a":"1.2.0"}')},28:function(e,t,r){e.exports=r(48)},47:function(e,t,r){},48:function(e,t,r){"use strict";r.r(t);var n=r(13),a=r(21),c=r.n(a),o=r(8),s=r.n(o),i=r(0),u=r.n(i),l=r(22),p=r(10),f=r(3),h=r(2),m=r.n(h),d=r(4),b=r(5),g=r.n(b),E=r(25),v=r(11),w=r(9),y=r(23),T="https://tweries-api.herokuapp.com",O="HIDE_TAGS_V1",S="SHOW_INFO",x=280,j="\n";function N(){return(N=Object(d.a)(m.a.mark((function e(){var t,r;return m.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,fetch("".concat(T,"/api/v2/health"));case 2:return t=e.sent,e.next=5,t.json();case 5:return r=e.sent,e.abrupt("return",r);case 7:case"end":return e.stop()}}),e)})))).apply(this,arguments)}var k=function(){return N.apply(this,arguments)};function _(){return(_=Object(d.a)(m.a.mark((function e(t){var r,n,a,c,o;return m.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return r=t.inReplyToTweetUrl,n=t.items,a=t.userId,e.next=3,fetch("".concat(T,"/api/v2/tweetstorm"),{body:JSON.stringify({inReplyToTweetUrl:r,items:n,userId:a}),headers:{"Content-Type":"application/json"},method:"POST"});case 3:return c=e.sent,e.next=6,c.json();case 6:return o=e.sent,e.abrupt("return",o);case 8:case"end":return e.stop()}}),e)})))).apply(this,arguments)}var A=function(e){return _.apply(this,arguments)},C={"github.com/Tweries":"github.com/Tweries",Tweries:"Tweries","@TweriesApp":"@TweriesApp"};var I=function(e){var t=e.healthy,r=e.version;return u.a.createElement("footer",{className:"flex flex-col items-center text-sm"},u.a.createElement("ul",{className:"flex"},u.a.createElement("li",{className:"m-1"},u.a.createElement("a",{href:"https://github.com/Tweries",rel:"noopener noreferrer",target:"_blank"},C["github.com/Tweries"])),u.a.createElement("li",{className:"m-1"},u.a.createElement("a",{href:"https://twitter.com/TweriesApp",rel:"noopener noreferrer",target:"_blank"},C["@TweriesApp"]))),u.a.createElement("p",{className:g()({"text-green-800":t,"text-red-800":!t})},C.Tweries," v",r," \xa9 ",(new Date).getFullYear()," "))},R={"Log out":"Log out"};var H=function(e){var t=e.logout,r=e.user,n=Object(i.useState)(r.picture),a=Object(f.a)(n,2),c=a[0],o=a[1];return u.a.createElement(u.a.Fragment,null,u.a.createElement("p",{className:"flex items-center"},u.a.createElement("img",{alt:r.name,className:"border tweries-border-color rounded-full",onError:function(){return o("./square.svg")},src:c}),u.a.createElement("span",{className:"px-2"},r.name)),u.a.createElement("button",{className:"px-4 underline","data-testid":"logout",onClick:function(){return t({returnTo:window.location.href})},type:"button"},R["Log out"]))};function P(){return(P=Object(d.a)(m.a.mark((function e(t){var r,n,a,c;return m.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return r=t.inReplyToTweetUrl,n=t.userId,e.next=3,fetch("".concat(T,"/api/v2/tweet"),{body:JSON.stringify({tweetUrl:r,userId:n}),headers:{"Content-Type":"application/json"},method:"POST"});case 3:return a=e.sent,e.next=6,a.json();case 6:return c=e.sent,e.abrupt("return",c);case 8:case"end":return e.stop()}}),e)})))).apply(this,arguments)}var U=function(e){return P.apply(this,arguments)},D={"If you want to reply to a specific Tweet:":"If you want to reply to a specific Tweet:","Optional: reply to Tweet URL":"Optional: reply to Tweet URL","URL goes here":"URL goes here"};var W=function(e){var t=e.callback,r=e.onChange,n=e.tweetUrl,a=e.userId,c=Object(i.useState)(!1),o=Object(f.a)(c,2),s=o[0],l=o[1],p=Object(i.useState)(!1),h=Object(f.a)(p,2),b=h[0],E=h[1];return Object(i.useEffect)((function(){function e(){return(e=Object(d.a)(m.a.mark((function e(){var r;return m.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,U({inReplyToTweetUrl:n,userId:a});case 3:r=e.sent,console.log(r),r.data?(t(null,r.data),l(!0),E(!1)):(t(r.error),l(!1),E(!1)),e.next=13;break;case 8:e.prev=8,e.t0=e.catch(0),t(e.t0),l(!1),E(!1);case 13:case"end":return e.stop()}}),e,null,[[0,8]])})))).apply(this,arguments)}n&&a&&(E(!0),function(){e.apply(this,arguments)}())}),[t,n,a]),u.a.createElement(u.a.Fragment,null,u.a.createElement("label",{className:"pb-1 text-sm",htmlFor:"reply-to"},D["If you want to reply to a specific Tweet:"]),u.a.createElement("textarea",{className:g()("p-2 tweries-border",{"tweries-background-color-blue-white":!0===b||""===n,"bg-green-200":!1===b&&""!==n&&s,"bg-red-200":!1===b&&""!==n&&!s}),"data-testid":"reply-to",name:"reply-to",onChange:function(e){var t=e.target.value;r(t)},placeholder:D["URL goes here"],rows:1,value:n}))};function G(e){var t=e.notification,r=e.onClick;if(t){var n=t.message,a=t.type;return u.a.createElement("p",{className:g()("border flex justify-between mb-2 p-2 rounded",{"bg-green-100 border-green-800 text-green-800":"success"===a,"bg-red-100 border-red-800 text-red-800":"danger"===a})},u.a.createElement("span",null,n),u.a.createElement("button",{className:"font-bold","data-testid":"dismiss",onClick:r,type:"button"},"\xd7"))}return null}G.defaultProps={notification:null};var L=G;var F=function(e,t){var r=Object(i.useState)((function(){try{var r=window.localStorage.getItem(e);return r?JSON.parse(r):t}catch(n){return console.log(n),t}})),n=Object(f.a)(r,2),a=n[0],c=n[1];return[a,function(t){try{var r=t instanceof Function?t(a):t;c(r),window.localStorage.setItem(e,JSON.stringify(r))}catch(n){console.log(n)}}]},M=r(6),Y=r.n(M),J="_/_";var z=function(e){function t(e,t){var r=["-","\u2013",".",",",";","!","?"].map((function(e){return{key:e,value:Y.a.lastIndexOf(t,e)}})).sort((function(e,t){return e.value>t.value?-1:e.value<t.value?1:0}))[0];return-1!==r.value&&function(e,t){return" "===Y.a.substr(t,e+1,1)}(r.value,t)&&!function(e,t){return e===t}(e,t)&&(t=Y.a.substr(t,0,r.value+1)),t}function r(e,t){return void 0===e&&void 0===t?" ".concat(J):0===e&&1===t?"":" ".concat(e+1,"/").concat(t)}return function(e){var n=e.hashtags,a=e.linefeed,c=e.source;null!==a&&void 0!==a&&""!==a||(a=j);for(var o=function(e,t){var r=t.slice();return e===j&&(r=r.replace(/\n+/g,j)),r}(a,c),s=[];0!==o.length;){var i=void 0,u=void 0;u=n.length>0?x-n.length-1-r().length:x-r().length,-1!==(i=Y.a.prune(o,u,"")).indexOf(a)?(i=Y.a.substr(i,0,i.indexOf(a)),o=Y.a.substr(o,i.length+a.length)):(i=t(o,i),o=Y.a.substr(o,i.length+1)),s.push(i)}return s.map((function(e,t){var a,c=r(t,s.length);return a=n.length>0?"".concat(Y.a.trim(e)," ").concat(n).concat(c):"".concat(Y.a.trim(e)).concat(c),{id:"_".concat(Math.random().toString(36).substr(2,9)),tweet:a}}))}},V=r(26);var q=function(e){var t=e.feature;return{hashtags:"",healthy:!1,items:z(t)({hashtags:"",linefeed:j,source:""}),linefeed:j,notification:null,source:"",userId:null}};function B(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function K(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?B(r,!0).forEach((function(t){Object(p.a)(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):B(r).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}var X={APPEND_SCREEN_NAME:"APPEND_SCREEN_NAME",CHANGE_HASHTAGS:"CHANGE_HASHTAGS",CHANGE_SOURCE:"CHANGE_SOURCE",CHANGE_TWEET:"CHANGE_TWEET",DISMISS_TOAST:"DISMISS_TOAST",RESET_TWEETSTORM:"RESET_TWEETSTORM",SET_HEALTHY:"SET_HEALTHY",SET_USER_ID:"SET_USER_ID"};var Z=function(e){return function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:q({feature:e}),r=arguments.length>1?arguments[1]:void 0;switch(r.type){case X.APPEND_SCREEN_NAME:var n="@".concat(r.value," ").concat(t.source);return K({},t,{items:z(e)({hashtags:t.hashtags,linefeed:t.linefeed,source:n}),source:n});case X.CHANGE_HASHTAGS:return K({},t,{hashtags:r.value,items:z(e)({hashtags:r.value,linefeed:t.linefeed,source:t.source})});case X.CHANGE_SOURCE:return K({},t,{items:z(e)({hashtags:t.hashtags,linefeed:t.linefeed,source:r.value}),source:r.value});case X.CHANGE_TWEET:return K({},t,{items:Object(V.a)(t.items).map((function(e){return e.id===r.value.id&&(e.tweet=r.value.tweet),e}))});case X.DISMISS_TOAST:return K({},t,{notification:null});case X.RESET_TWEETSTORM:return K({},q({feature:e}),{healthy:t.healthy,notification:r.value,userId:t.userId});case X.SET_HEALTHY:return K({},t,{healthy:r.value});case X.SET_USER_ID:return K({},t,{userId:r.value});default:return t}}},$=r(27),Q=r(24),ee=r.n(Q),te=function(){return window.history.replaceState({},document.title,window.location.pathname)},re=u.a.createContext(),ne=function(){return Object(i.useContext)(re)};function ae(e){var t=e.length,r=0===t?null:t,n="tweet"===e.type;return u.a.createElement("p",{className:g()("text-right text-xs",{"text-gray-700":!n||n&&t<=x,"text-red-500 ":n&&t>x})},"\xa0",r)}ae.defaultProps={type:""};var ce=ae,oe={Tweet:"Tweet"};var se=function(e){var t=e.disabled,r=e.onClick,n=e.waiting;return u.a.createElement("button",{disabled:t,className:g()("bg-gray-300 border border-gray-500 font-bold my-4 px-6 py-2 rounded self-center",{"tweries-background-color-blue-button":!t,"cursor-auto":t}),"data-testid":"tweet",onClick:r,type:"button"},n?u.a.createElement(w.a,{icon:v.b,spin:!0}):oe.Tweet)};function ie(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}var ue={"...":"...","Edits can be made in the boxes below before publishing":"Edits can be made in the boxes below before publishing","Log in":"Log in","Start typing, to insert a break prior to reaching 280 characters please use Newline(s)":"Start typing, to insert a break prior to reaching 280 characters please use Newline(s)",Tags:"Tags",Tweet:"Tweet",Tweries:"Tweries","Type your thoughts here":"Type your thoughts here","What's happening?":"What's happening?","When 280 characters just isn't enough":"When 280 characters just isn't enough","Your tweetstorm has been created!":"Your tweetstorm has been created!","#":"#","#hashtags":"#hashtags"};var le=function(e){var t=e.initialState,r=e.reducer,n=ne(),a=n.isAuthenticated,c=n.loading,s=n.loginWithRedirect,l=n.logout,h=n.user,b=Object(o.useFeature)();function T(e,t){e&&(console.log(e),$({type:X.SET_HEALTHY,value:!1})),t&&(console.log(t),$({type:X.SET_HEALTHY,value:!t.error}))}Object(i.useEffect)((function(){function e(){return(e=Object(d.a)(m.a.mark((function e(){return m.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,k();case 3:T(null,e.sent),e.next=10;break;case 7:e.prev=7,e.t0=e.catch(0),T(e.t0);case 10:case"end":return e.stop()}}),e,null,[[0,7]])})))).apply(this,arguments)}!function(){e.apply(this,arguments)}()}),[]),Object(i.useEffect)((function(){a&&h&&$({type:X.SET_USER_ID,value:h.sub})}),[a,h]);var j=F("hashtags",""),N=Object(f.a)(j,2),_=N[0],C=N[1],R=F("source",""),P=Object(f.a)(R,2),U=P[0],D=P[1],G=Object(i.useReducer)(r,function(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?ie(r,!0).forEach((function(t){Object(p.a)(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):ie(r).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}({},t,{hashtags:_,items:z(b)({hashtags:_,linefeed:t.linefeed,source:U}),source:U})),M=Object(f.a)(G,2),Y=M[0],J=Y.hashtags,V=Y.healthy,q=Y.items,B=Y.notification,K=Y.source,Z=Y.userId,$=M[1];Object(i.useEffect)((function(){if(B){var e=setTimeout((function(){$({type:X.DISMISS_TOAST})}),3e3);return function(){return clearTimeout(e)}}}),[B]);var Q=Object(i.useState)(""),ee=Object(f.a)(Q,2),te=ee[0],re=ee[1],ae=Object(i.useState)(!1),oe=Object(f.a)(ae,2),le=oe[0],pe=oe[1];function fe(e,t){var r=ue["Your tweetstorm has been created!"],n="success";(e||t.error)&&(r=e?e.message:t.error.message,n="danger"),console.log(e,t),$({type:X.RESET_TWEETSTORM,value:{message:r,type:n}}),C(""),re(""),D(""),pe(!1)}function he(){return(he=Object(d.a)(m.a.mark((function e(){return m.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return pe(!0),e.prev=1,e.next=4,A({inReplyToTweetUrl:te,items:q,userId:Z});case 4:fe(null,e.sent),e.next=11;break;case 8:e.prev=8,e.t0=e.catch(1),fe(e.t0);case 11:case"end":return e.stop()}}),e,null,[[1,8]])})))).apply(this,arguments)}var me=Object(i.useCallback)((function(e,t){t&&$({type:X.APPEND_SCREEN_NAME,value:t.user.screen_name})}),[]);return c?u.a.createElement("article",{className:"container content-center mx-auto m-1 p-4 text-center"},ue["..."]):u.a.createElement("article",{className:"container content-center mx-auto m-1 p-4"},u.a.createElement("header",{className:"flex flex-row justify-between"},a?u.a.createElement(H,{logout:l,user:h}):u.a.createElement("span",{className:"my-4"})),u.a.createElement("h1",{className:"font-bold my-4 text-5xl text-center tweries-font-family"},ue.Tweries),u.a.createElement("h2",{className:"my-4 text-center"},ue["When 280 characters just isn't enough"]),u.a.createElement("p",{className:"my-4 text-center"},u.a.createElement(w.a,{className:"tweries-color-blue",icon:E.a,size:"3x"})),a?u.a.createElement("form",{className:"flex flex-col",onSubmit:function(e){return e.preventDefault()}},u.a.createElement(W,{callback:me,onChange:re,tweetUrl:te,userId:Z}),u.a.createElement("p",{className:"italic py-4 text-sm"},ue["Start typing, to insert a break prior to reaching 280 characters please use Newline(s)"]),u.a.createElement("textarea",{className:"p-2 tweries-background-color-blue-white tweries-border","data-testid":"source",name:"source",onChange:function(e){$({type:X.CHANGE_SOURCE,value:e.target.value}),D(e.target.value)},placeholder:ue["Type your thoughts here"],rows:8,value:K}),u.a.createElement(ce,{length:K.length}),!b.active(O)&&u.a.createElement(u.a.Fragment,null,u.a.createElement("label",{className:"pb-1 text-sm",htmlFor:"hashtags"},ue.Tags),u.a.createElement("textarea",{className:"p-2 tweries-background-color-blue-white tweries-border","data-testid":"hashtags",name:"hashtags",onChange:function(e){$({type:X.CHANGE_HASHTAGS,value:e.target.value}),C(e.target.value)},placeholder:ue["#"],rows:1,type:"text",value:J}),u.a.createElement(ce,{length:J.length})),q.length>0&&[u.a.createElement("p",{className:"italic py-4 text-sm",key:"copy"},ue["Edits can be made in the boxes below before publishing"]),u.a.createElement("ul",{className:"flex flex-col","data-testid":"list",key:"list"},q.map((function(e,t){return u.a.createElement("li",{className:"flex flex-col",key:t},u.a.createElement("label",{className:"pb-1 text-sm",htmlFor:e.id},"".concat(ue.Tweet," #").concat(t+1)),function(e){return u.a.createElement("textarea",{className:g()("p-2 tweries-background-color-blue-white",{"tweries-border":e.tweet.length<=x,"border-2 border-red-500":e.tweet.length>x}),name:e.id,onChange:function(t){$({type:X.CHANGE_TWEET,value:{id:e.id,tweet:t.target.value}})},rows:4,value:e.tweet})}(e),u.a.createElement(ce,{length:e.tweet.length,type:"tweet"}))})))],u.a.createElement(se,{disabled:!a||!q.length>0||!V||q.find((function(e){return e.tweet.length>x})),onClick:function(){return he.apply(this,arguments)},waiting:le})):u.a.createElement(u.a.Fragment,null,u.a.createElement("p",{className:"flex justify-center my-4"},u.a.createElement("button",{className:"font-bold px-6 py-2 rounded tweries-background-color-blue-button","data-testid":"login",onClick:function(){return s({})},type:"button"},ue["Log in"])),b.active(S)&&u.a.createElement("p",{className:"flex justify-center my-4"},u.a.createElement(w.a,{className:"tweries-color-black",icon:v.a,size:"1x"}))),u.a.createElement(L,{notification:B,onClick:function(){return $({type:X.DISMISS_TOAST})}}),u.a.createElement(I,{healthy:V,version:y.a}))};var pe=function(e){var t=e.logEvent,r=e.reducer;return function(e,n){var a=r(e,n);switch(n.type){case X.CHANGE_HASHTAGS:case X.CHANGE_SOURCE:case X.CHANGE_TWEET:break;default:t(n.type,n.value)}return a}},fe=(r(47),r(15)),he=["FEATURE_V1",O],me=r(16);var de=function(){me.a.initialize("UA-54446639-10"),me.a.pageview("/")};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));Object(l.render)(u.a.createElement((function(e){var t=e.children,r=e.onRedirectCallback,n=void 0===r?te:r,a=Object($.a)(e,["children","onRedirectCallback"]),c=Object(i.useState)(),o=Object(f.a)(c,2),s=o[0],l=o[1],p=Object(i.useState)(),h=Object(f.a)(p,2),b=h[0],g=h[1],E=Object(i.useState)(),v=Object(f.a)(E,2),w=v[0],y=v[1],T=Object(i.useState)(!0),O=Object(f.a)(T,2),S=O[0],x=O[1],j=Object(i.useState)(!1),N=Object(f.a)(j,2),k=N[0],_=N[1];Object(i.useEffect)((function(){(function(){var e=Object(d.a)(m.a.mark((function e(){var t,r,c,o,s;return m.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,ee()(a);case 2:if(t=e.sent,y(t),!window.location.search.includes("code=")){e.next=10;break}return e.next=7,t.handleRedirectCallback();case 7:r=e.sent,c=r.appState,n(c);case 10:return e.next=12,t.isAuthenticated();case 12:if(o=e.sent,l(o),!o){e.next=19;break}return e.next=17,t.getUser();case 17:s=e.sent,g(s);case 19:x(!1);case 20:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}})()()}),[]);var A=function(){var e=Object(d.a)(m.a.mark((function e(){var t,r,n=arguments;return m.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t=n.length>0&&void 0!==n[0]?n[0]:{},_(!0),e.prev=2,e.next=5,w.loginWithPopup(t);case 5:e.next=10;break;case 7:e.prev=7,e.t0=e.catch(2),console.error(e.t0);case 10:return e.prev=10,_(!1),e.finish(10);case 13:return e.next=15,w.getUser();case 15:r=e.sent,g(r),l(!0);case 18:case"end":return e.stop()}}),e,null,[[2,7,10,13]])})));return function(){return e.apply(this,arguments)}}(),C=function(){var e=Object(d.a)(m.a.mark((function e(){var t;return m.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return x(!0),e.next=3,w.handleRedirectCallback();case 3:return e.next=5,w.getUser();case 5:t=e.sent,x(!1),l(!0),g(t);case 9:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}();return u.a.createElement(re.Provider,{value:{isAuthenticated:s,user:b,loading:S,popupOpen:k,loginWithPopup:A,handleRedirectCallback:C,getIdTokenClaims:function(){return w.getIdTokenClaims.apply(w,arguments)},loginWithRedirect:function(){return w.loginWithRedirect.apply(w,arguments)},getTokenSilently:function(){return w.getTokenSilently.apply(w,arguments)},getTokenWithPopup:function(){return w.getTokenWithPopup.apply(w,arguments)},logout:function(){return w.logout.apply(w,arguments)}}},t)}),{client_id:fe.clientId,domain:fe.domain,onRedirectCallback:function(e){window.history.replaceState({},document.title,e&&e.targetUrl?e.targetUrl:window.location.pathname)},redirect_uri:window.location.origin},u.a.createElement(n.AmplitudeProvider,{amplitudeInstance:c.a.getInstance(),apiKey:"7cbe8a9a37db4f88f06c79a387943cca"},u.a.createElement(n.Amplitude,null,(function(e){return function(e){de();var t=Object(o.setFeatures)(he);return u.a.createElement(s.a,{features:he},u.a.createElement(le,{initialState:q({feature:t}),reducer:pe({logEvent:e,reducer:Z(t)})}))}(e.logEvent)})))),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()}))}},[[28,1,2]]]);
//# sourceMappingURL=main.84bd1c1a.chunk.js.map