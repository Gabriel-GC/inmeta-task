import{c as d,J as f,K as I,l as c,d as g,o as r,b as i,n as v,g as x,f as w,i as k,e as u,j as p,t as b}from"./index-DqGm47UV.js";/**
 * @license lucide-vue-next v0.372.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const S=d("CheckIcon",[["path",{d:"M20 6 9 17l-5-5",key:"1gmf2c"}]]);/**
 * @license lucide-vue-next v0.372.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const $=d("ImageOffIcon",[["line",{x1:"2",x2:"22",y1:"2",y2:"22",key:"a6p6uj"}],["path",{d:"M10.41 10.41a2 2 0 1 1-2.83-2.83",key:"1bzlo9"}],["line",{x1:"13.5",x2:"6",y1:"13.5",y2:"21",key:"1q0aeu"}],["line",{x1:"18",x2:"21",y1:"12",y2:"15",key:"5mozeu"}],["path",{d:"M3.59 3.59A1.99 1.99 0 0 0 3 5v14a2 2 0 0 0 2 2h14c.55 0 1.052-.22 1.41-.59",key:"mmje98"}],["path",{d:"M21 15V5a2 2 0 0 0-2-2H9",key:"43el77"}]]);/**
 * @license lucide-vue-next v0.372.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const N=d("InfoIcon",[["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}],["path",{d:"M12 16v-4",key:"1dtifu"}],["path",{d:"M12 8h.01",key:"e9boi3"}]]);/**
 * @license lucide-vue-next v0.372.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const j=d("PlusIcon",[["path",{d:"M5 12h14",key:"1ays0h"}],["path",{d:"M12 5v14",key:"s699le"}]]);/**
 * @license lucide-vue-next v0.372.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const R=d("RefreshCcwIcon",[["path",{d:"M21 12a9 9 0 0 0-9-9 9.75 9.75 0 0 0-6.74 2.74L3 8",key:"14sxne"}],["path",{d:"M3 3v5h5",key:"1xhq8a"}],["path",{d:"M3 12a9 9 0 0 0 9 9 9.75 9.75 0 0 0 6.74-2.74L21 16",key:"1hlbsb"}],["path",{d:"M16 16h5v5",key:"ccwih5"}]]);/**
 * @license lucide-vue-next v0.372.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const D=d("SearchIcon",[["circle",{cx:"11",cy:"11",r:"8",key:"4ej97u"}],["path",{d:"m21 21-4.3-4.3",key:"1qie3q"}]]),m={async listAll(e=1,t=10){const{data:a}=await f.get("/cards",{params:{page:e,rpp:t}});return a},async listMe(){const{data:e}=await f.get("/me/cards");return e},async addCard(e){await f.post("/me/cards",{cardIds:e})},async deleteCard(e){await f.delete(`/me/cards/${e}`)}},O=I("cards",()=>{const e=c([]),t=c([]),a=c(!1),o=c(1),n=c(!0);async function y(){a.value=!0;try{e.value=await m.listMe()}finally{a.value=!1}}async function h(l=!1){if(l&&(t.value=[],o.value=1,n.value=!0),!(!n.value||a.value)){a.value=!0;try{const s=await m.listAll(o.value,10);t.value=[...t.value,...s.list],n.value=s.more,o.value++}catch(s){console.error("Erro ao carregar cartas globais:",s)}finally{a.value=!1}}}async function C(l){const s=Array.isArray(l)?l:[l];await m.addCard(s),await y()}async function M(l){e.value=e.value.filter(s=>s.id!==l)}return{myCards:e,globalCards:t,isLoading:a,hasMoreGlobal:n,fetchMyCards:y,fetchGlobalCards:h,addCard:C,removeCard:M}}),z={key:0,class:"absolute inset-0 animate-pulse bg-dark/10"},B=["src","alt"],L={key:2,class:"flex flex-col items-center justify-center h-full text-dark/20 p-4 text-center"},A=g({__name:"SafeImage",props:{src:{},alt:{},class:{}},setup(e){const t=c(!1),a=c(!0),o=()=>{t.value=!0,a.value=!1},n=()=>{a.value=!1};return(y,h)=>(r(),i("div",{class:v(["relative overflow-hidden bg-dark/5",y.$props.class])},[a.value?(r(),i("div",z)):x("",!0),t.value?(r(),i("div",L,[w(k($),{size:32}),h[0]||(h[0]=u("span",{class:"text-[10px] font-bold uppercase mt-2"},"Imagem indisponível",-1))])):(r(),i("img",{key:1,src:e.src,alt:e.alt,class:v(["w-full h-full object-cover transition-opacity duration-300",{"opacity-0":a.value,"opacity-100":!a.value}]),onError:o,onLoad:n,loading:"lazy"},null,42,B))],2))}}),E={class:"aspect-[2/3] overflow-hidden bg-surface relative"},q={class:"p-4 bg-white border-t border-dark/5"},P={class:"font-bold text-sm truncate text-dark"},V={class:"text-[10px] text-dark/40 truncate uppercase font-semibold mt-1"},H=g({__name:"CardItem",props:{card:{},selectable:{type:Boolean},selected:{type:Boolean},deletable:{type:Boolean}},emits:["select","delete"],setup(e){return(t,a)=>(r(),i("div",{class:v(["group relative bg-white rounded-2xl overflow-hidden shadow-soft border border-dark/5 transition-all",e.selected?"ring-2 ring-primary border-transparent":"",e.selectable?"cursor-pointer":""]),onClick:a[0]||(a[0]=o=>e.selectable?t.$emit("select",e.card):null)},[u("div",E,[w(A,{src:e.card.imageUrl,alt:e.card.name,class:"w-full h-full transition-transform duration-500"},null,8,["src","alt"]),e.selectable?(r(),i("div",{key:0,class:v(["absolute top-3 right-3 w-8 h-8 rounded-full flex items-center justify-center shadow-lg transition-colors",e.selected?"bg-primary text-white":"bg-white/80 backdrop-blur-md text-dark group-hover:bg-primary group-hover:text-white"])},[e.selected?(r(),p(k(S),{key:0,size:16})):(r(),p(k(j),{key:1,size:16}))],2)):x("",!0)]),u("div",q,[u("h3",P,b(e.card.name),1),u("p",V,"ID: #"+b(e.card.id.slice(-6)),1)])],2))}});export{N as I,j as P,R,D as S,H as _,O as u};
