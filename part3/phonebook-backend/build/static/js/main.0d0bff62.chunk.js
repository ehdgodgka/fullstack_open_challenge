(this.webpackJsonpphonebook=this.webpackJsonpphonebook||[]).push([[0],{16:function(e,t,n){e.exports=n(40)},21:function(e,t,n){},40:function(e,t,n){"use strict";n.r(t);var a=n(0),r=n.n(a),c=n(14),o=n.n(c),u=(n(21),n(2)),i=function(e){var t=e.style,n=e.message;return n?r.a.createElement("div",{className:"noti ".concat(t)},n):null},s=function(e){var t=e.persons,n=Object(a.useState)(""),c=Object(u.a)(n,2),o=c[0],i=c[1];return r.a.createElement(r.a.Fragment,null,"filter shown with",r.a.createElement("input",{value:o,onChange:function(e){i(e.target.value)}}),o&&t.filter((function(e){return!e.name.toLowerCase().indexOf(o.toLowerCase())})).map((function(e){return r.a.createElement("li",{key:e.name},e.name," ",e.number)})))},l=n(4),m=n.n(l),f=n(15),d=n(3),p=n.n(d),b="/api/persons",E=function(){return p.a.get(b)},v=function(e){return p.a.post(b,e)},h=function(e,t){return p.a.put("".concat(b,"/").concat(e),t)},g=function(e){return p.a.delete("".concat(b,"/").concat(e))},y=function(e){var t=e.persons,n=e.setPersons,c=e.setNotification,o=e.notiTimer,i=e.setNotiTimer,s=Object(a.useState)(""),l=Object(u.a)(s,2),d=l[0],p=l[1],b=Object(a.useState)(""),E=Object(u.a)(b,2),g=E[0],y=E[1],T=function(){var e=Object(f.a)(m.a.mark((function e(a){var r;return m.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:a.preventDefault(),v(r={name:d,number:g}).then((function(e){o&&clearTimeout(o),i(setTimeout((function(){return c({})}),3e3)),c({style:"success",message:"Added ".concat(r.name)}),n(t.concat(e.data))})).catch((function(e){if(w()){if(window.confirm("".concat(d," already existed. do you want to update?"))){var a=w().id;h(a,r).then((function(e){o&&clearTimeout(o),i(setTimeout((function(){return c({})}),3e3)),c({style:"success",message:"Updated ".concat(r.name)}),n((function(){return t.map((function(t){return t.name===d?e.data:t}))}))})).catch((function(e){c({style:"error",message:e.response.data.message})}))}}else c({style:"error",message:e.response.data.message})}));case 3:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),w=function(){return t.find((function(e){return e.name===d}))};return r.a.createElement("form",{onSubmit:T},r.a.createElement("div",null,"name:",r.a.createElement("input",{value:d,onChange:function(e){p(e.target.value)}})),r.a.createElement("div",null,"number: ",r.a.createElement("input",{value:g,onChange:function(e){y(e.target.value)}})),r.a.createElement("div",null,r.a.createElement("button",{type:"submit"},"add")))},T=function(e){var t=e.persons,n=e.setPersons,a=e.setNotification,c=e.notiTimer,o=e.setNotiTimer;return r.a.createElement("ul",null,t.map((function(e){return r.a.createElement("li",{key:e.name},e.name," ",e.number,r.a.createElement("button",{onClick:function(){return function(e){var r=e.id,u=e.name;window.confirm("delete ".concat(u,"?"))&&g(r).then((function(e){n(t.filter((function(e){return e.id!==r}))),c&&clearTimeout(c),o(setTimeout((function(){return a({})}),3e3)),a({style:"success",message:"".concat(u," deleted")})})).catch((function(e){c&&clearTimeout(c),o(setTimeout((function(){return a({})}),3e3)),a({style:"error",message:"".concat(u,"' was already removed from server")}),n(t.filter((function(e){return e.id!==r})))}))}(e)}},"delete"))})))},w=function(){var e=Object(a.useState)([]),t=Object(u.a)(e,2),n=t[0],c=t[1],o=Object(a.useState)({}),l=Object(u.a)(o,2),m=l[0],f=l[1],d=Object(a.useState)(null),p=Object(u.a)(d,2),b=p[0],v=p[1];return Object(a.useEffect)((function(){E().then((function(e){c(e.data)}))}),[]),r.a.createElement("div",null,r.a.createElement("h2",null,"Phonebook"),r.a.createElement(i,{style:m.style,message:m.message}),r.a.createElement(s,{persons:n}),r.a.createElement("h2",null,"add a new"),r.a.createElement(y,{persons:n,setPersons:c,setNotification:f,notiTimer:b,setNotiTimer:v}),r.a.createElement("h2",null,"Numbers"),r.a.createElement(T,{persons:n,setPersons:c,setNotification:f,notiTimer:b,setNotiTimer:v}))};o.a.render(r.a.createElement(r.a.StrictMode,null,r.a.createElement(w,null)),document.getElementById("root"))}},[[16,1,2]]]);
//# sourceMappingURL=main.0d0bff62.chunk.js.map