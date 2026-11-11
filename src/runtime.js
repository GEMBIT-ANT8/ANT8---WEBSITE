/* ANT8 website runtime (no dependencies). Data comes from /assets/data.js, generated at build time. */
(() => {
"use strict";
const { CONFIG, TWIN, ASSESS, LEVELS, DOMAIN_W, DOMAIN_SVC, SERVICES } = window.ANT8;
if (window.I18N && window.ANT8_LANG) I18N.init(window.ANT8_I18N, window.ANT8_LANG);
const $ = (s,c=document)=>c.querySelector(s);
const $$ = (s,c=document)=>[...c.querySelectorAll(s)];
function scrollToId(id){ const el=document.getElementById(id); if(!el) return; el.scrollIntoView({behavior: matchMedia("(prefers-reduced-motion: reduce)").matches?"auto":"smooth"}); }

/* Hero video: only loads when a source is configured; poster/illustration otherwise. */
function initHeroVideo(){
  const v = CONFIG.heroVideo, box = $("#heromedia");
  const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
  const saveData = navigator.connection && navigator.connection.saveData;
  const mobile = matchMedia("(max-width: 760px)").matches;
  const src = mobile ? (v.mobileMp4 || "") : v.mp4;
  if (!src || reduce || saveData) return;
  const vid = document.createElement("video");
  Object.assign(vid,{muted:true,loop:true,playsInline:true,autoplay:true,preload:"metadata"});
  vid.setAttribute("muted",""); vid.setAttribute("playsinline",""); vid.setAttribute("aria-hidden","true");
  if (v.poster) vid.poster = v.poster;
  if (v.webm && !mobile){ const s=document.createElement("source"); s.src=v.webm; s.type="video/webm"; vid.appendChild(s); }
  const s2=document.createElement("source"); s2.src=src; s2.type="video/mp4"; vid.appendChild(s2);
  vid.addEventListener("error",()=>vid.remove(),true);
  vid.addEventListener("playing",()=>{ const f=box.querySelector(".hero-fallback"); if(f) f.style.display="none"; },{once:true});
  box.appendChild(vid);
  vid.play().catch(()=>{ vid.remove(); });
}

function initTwin(){
  const tabs = $$(".twin-tab"), out = $("#twinsteps"), panel=$("#twinpanel");
  const show = i=>{
    tabs.forEach((t,j)=>{ t.setAttribute("aria-selected", j===i); t.tabIndex = j===i?0:-1; });
    panel.setAttribute("aria-labelledby","tt"+i);
    const d = TWIN[i];
    out.innerHTML = `<div class="twin-step twin-anim"><dt>On the floor</dt><dd>${d.floor}</dd></div><div class="twin-step sys twin-anim"><dt>In the system</dt><dd>${d.sys}</dd></div><div class="twin-step twin-anim"><dt>Back on the floor</dt><dd>${d.back}</dd></div>`;
  };
  tabs.forEach((t,i)=>{ t.addEventListener("click",()=>show(i)); t.addEventListener("keydown",e=>{
    let n=null; if(e.key==="ArrowDown"||e.key==="ArrowRight") n=(i+1)%tabs.length; if(e.key==="ArrowUp"||e.key==="ArrowLeft") n=(i-1+tabs.length)%tabs.length;
    if(n!==null){ e.preventDefault(); show(n); tabs[n].focus(); } }); });
  show(0);
}

function initFilters(){
  $$("[data-filter]").forEach(b=>b.addEventListener("click",()=>{
    const f=b.dataset.filter; let shown=0;
    $$(".chip[data-filter]").forEach(c=>c.setAttribute("aria-pressed", c.dataset.filter===f));
    $$("#insightlist [data-kind]").forEach(el=>{ const on = f==="All" || el.dataset.kind===f; el.style.display = on?"":"none"; if(on) shown++; });
    $(".cards").style.display = $$(".cards [data-kind]").some(el=>el.style.display!=="none")?"":"none";
    $("#emptyfilter").style.display = shown?"none":"";
  }));
}

/* Assessment engine: Warehouse Maturity Assessment (33 questions, 11 domains, 1–5) */
let AS = null;
const SEC_PER_Q = 20;
function level(v){ let l=LEVELS[0][1]; for(const [m,n] of LEVELS) if(v>=m) l=n; return l; }
function initAssessment(){
  AS = { sel: ASSESS.map(()=>true), flat: [], i: 0, ans: {}, started: false };
  drawPick(); drawResult();
}
function drawPick(){
  const box=$("#asq"), n=ASSESS.reduce((a,d,i)=>a+(AS.sel[i]?d.qs.length:0),0);
  box.innerHTML = `<p class="as-step">1 · Choose your areas</p>
  <h3 class="as-q" style="margin-top:10px">Which parts of your operation do you want to score?</h3>
  <p class="muted" style="font-size:.9375rem;margin-bottom:16px">All 11 are selected. Leave out what doesn’t apply; you can stop at any time and see the score so far.</p>
  <div class="as-areas" role="group" aria-label="Areas to assess">${ASSESS.map((d,i)=>`<label class="as-area"><input type="checkbox" data-d="${i}" ${AS.sel[i]?"checked":""}><span>${d.d}</span><small>${d.qs.length}</small></label>`).join("")}</div>
  <div class="as-nav"><span class="muted" style="font-size:.875rem">${n} questions · about ${Math.max(1,Math.round(n*SEC_PER_Q/60))} minutes</span><button class="btn btn-teal btn-sm" type="button" id="asstart" ${n?"":"disabled"}>Start</button></div>`;
  $$(".as-area input",box).forEach(c=>c.onchange=()=>{ AS.sel[+c.dataset.d]=c.checked; drawPick(); const el=$(`.as-area input[data-d="${c.dataset.d}"]`); if(el) el.focus(); });
  $("#asstart").onclick=()=>{ AS.flat=[]; ASSESS.forEach((d,di)=>{ if(AS.sel[di]) d.qs.forEach((q,qi)=>AS.flat.push({di,qi,t:d.d,q:q[0],o:q[1],nr:q[2],key:di+"-"+qi})); }); AS.i=0; AS.started=true; drawQ(); drawResult(); focusQ(); };
}
function drawQ(){
  const {flat,i,ans}=AS, box=$("#asq");
  if (i>=flat.length){ box.innerHTML = `<p class="as-step">2 · Rate your operation</p><h3 class="as-q" style="margin-top:12px">Done. Your score is ready.</h3><p class="muted">Want a first step per area? Fill in the form below and talk it through with an expert.</p><div class="as-nav"><button class="as-back" type="button" id="asb">← Back</button><button class="btn btn-teal btn-sm" type="button" id="asreset">Start again</button></div>`;
    $("#asb").onclick=()=>{AS.i=flat.length-1;drawQ();focusQ();}; $("#asreset").onclick=()=>{initAssessment();}; return; }
  const q=flat[i], dq=flat.filter(f=>f.di===q.di), pos=dq.indexOf(q)+1, cur=ans[q.key];
  box.innerHTML = `<p class="as-step">2 · Rate your operation</p>
  <div class="as-top" style="margin-top:12px"><span>${q.t}</span><span>${pos} of ${dq.length} · ${i+1}/${flat.length}</span></div>
  <div class="prog" aria-hidden="true"><i style="width:${(i/flat.length)*100}%"></i></div>
  <h3 class="as-q" id="asqh">${q.q}</h3>
  <div class="as-opts" role="radiogroup" aria-labelledby="asqh">${q.o.map((o,k)=>`<button type="button" class="as-opt lv" role="radio" aria-checked="${cur===k+1}" data-k="${k+1}"><span class="lvn">${k+1}</span><span>${o}</span></button>`).join("")}
  <button type="button" class="as-idk" role="radio" aria-checked="${cur===0}" data-k="0">Not applicable / don’t know</button></div>
  <div class="as-nav"><button class="as-back" type="button" id="asb">← ${i===0?"Areas":"Back"}</button><span style="display:flex;gap:16px;align-items:center"><button class="as-idk" type="button" id="asfin">Finish now</button><button class="btn btn-teal btn-sm" type="button" id="asn" ${cur===undefined?"disabled":""}>${i===flat.length-1?"See my score":"Next"}</button></span></div>`;
  $$(".as-opts [data-k]",box).forEach(b=>b.onclick=()=>{ AS.ans[q.key]=+b.dataset.k; drawQ(); drawResult(); $("#asn").focus(); });
  $("#asb").onclick=()=>{ if(AS.i===0){ AS.started=false; drawPick(); return; } AS.i--; drawQ(); focusQ(); };
  $("#asn").onclick=()=>{ AS.i++; drawQ(); drawResult(); focusQ(); };
  $("#asfin").onclick=()=>{ AS.i=flat.length; drawQ(); drawResult(); };
}
function focusQ(){ const el=$("#asq .as-opt[aria-checked=true]")||$("#asq .as-opt")||$("#asreset")||$("#asstart"); if(el) el.focus({preventScroll:true}); }
function scores(){
  return ASSESS.map((d,di)=>{ let s=0,a=0; d.qs.forEach((q,qi)=>{ const r=AS.ans[di+"-"+qi]; if(r>0){ s+=r; a++; } });
    return { theme:d.d, di, v: a ? Math.round(s/(5*a)*100) : null, answered:a, n:d.qs.length, sel:AS.sel[di] }; });
}
function overall(sc){ const on=sc.filter(s=>s.v!==null); if(!on.length) return null;
  const w=on.reduce((t,s)=>t+DOMAIN_W[s.di],0); return Math.round(on.reduce((t,s)=>t+s.v*DOMAIN_W[s.di],0)/w); }
function reportLines(){
  const sc=scores(), total=overall(sc);
  const lines=[`Overall: ${total===null?"not scored":total+"/100 ("+level(total)+")"}`,"",...sc.filter(s=>s.sel).map(s=>`${s.theme}: ${s.v===null?"not answered":s.v+"/100 ("+level(s.v)+")"} · ${s.answered}/${s.n} answered`)];
  const detail=["","Ratings (1–5, 0 = not applicable):",...AS.flat.filter(f=>AS.ans[f.key]!==undefined).map(f=>`Q${f.nr} ${f.q}: ${AS.ans[f.key]}`)];
  return {summary:lines, detail};
}
function drawResult(){
  const box=$("#asr"), sc=scores(), total=overall(sc), shown=sc.filter(s=>s.sel);
  if (total===null){ box.innerHTML = `<p class="as-step" style="color:#C9D6D5">3 · Your score</p><div class="score-big"><b>–</b><span>/ 100</span></div><p class="as-empty">Your score builds up as you answer: one bar per area, using the same scoring as our assessment workbook. Your weakest area is highlighted.</p>
    <div class="bars">${shown.map(s=>`<div class="bar"><div class="lbl"><span>${s.theme}</span><b>–</b></div><div class="trk"><i style="width:0"></i></div></div>`).join("")}</div>`; return; }
  const scored=sc.filter(s=>s.v!==null), low=scored.reduce((a,b)=>b.v<a.v?b:a), done=AS.i>=AS.flat.length;
  const svcId=DOMAIN_SVC[low.theme], svc=SERVICES.find(x=>x.id===svcId);
  box.innerHTML = `<p class="as-step" style="color:#C9D6D5">3 · Your score${done?"":" (so far)"}</p>
  <div class="score-big"><b>${total}</b><span>/ 100</span></div><span class="level">Level: ${level(total)}</span>
  <div class="bars">${shown.map(s=>{ const isLow=s.theme===low.theme;
    return `<div class="bar ${isLow?"low":""}"><div class="lbl"><span>${s.theme}${isLow?" · start here":""}</span><b>${s.v===null?"–":s.v}</b></div><div class="trk"><i style="width:${s.v||0}%"></i></div>${s.v!==null?`<p>${level(s.v)} · ${s.answered} of ${s.n} answered</p>`:""}</div>`; }).join("")}</div>
  ${done&&svc?`<p style="margin-top:20px;font-size:.9375rem">First step: <a class="link" href="/services/#${svcId}">${svc.name}</a></p>`:""}`;
}

/* Forms: validation, then POST to CONFIG.formEndpoint. If no endpoint is configured or it fails, fall back to a prefilled email. */
function initForm(form){
  const kind=form.dataset.kind, status=form.querySelector(".form-status");
  form.addEventListener("submit",e=>{
    e.preventDefault(); let ok=true, first=null;
    form.querySelectorAll(".field").forEach(f=>{
      const el=f.querySelector("input,textarea,select"); if(!el) return; let bad=false;
      if (el.type==="checkbox") bad=!el.checked;
      else if (el.required && !el.value.trim()) bad=true;
      else if (el.type==="email" && el.value && !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(el.value.trim())) bad=true;
      else if (el.type==="email" && el.required && !el.value) bad=true;
      f.classList.toggle("invalid",bad); el.setAttribute("aria-invalid",bad);
      if (bad){ ok=false; if(!first) first=el; }
    });
    if (form.website && form.website.value) return; // honeypot
    if (!ok){ first.focus(); return; }
    const d=Object.fromEntries(new FormData(form));
    let subject, lines, full=null;
    if (kind==="report"){
      const rl=reportLines();
      subject=`Assessment report request: ${d.company}`;
      lines=[`Name: ${d.name}`,`Company: ${d.company}`,`Job title: ${d.job||"-"}`,`Email: ${d.email}`,`Phone: ${d.phone||"-"}`,"",...rl.summary];
      full=[...lines,...rl.detail];
    } else {
      subject=`Website enquiry: ${d.topic} (${d.company})`;
      lines=[`Name: ${d.name}`,`Company: ${d.company}`,`Email: ${d.email}`,`Phone: ${d.phone||"-"}`,`Topic: ${d.topic}`,"",d.msg];
    }
    const href=`mailto:${CONFIG.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(lines.join("\n")).slice(0,1900)}`;
    const mailFallback=(lead)=>{ status.innerHTML = `${lead} Your email app should open with everything filled in; press send there. Nothing opened? <a href="${href}">Open the email</a> or write to <a href="mailto:${CONFIG.email}">${CONFIG.email}</a>.`; status.classList.add("show"); window.location.href = href; };
    const btn=form.querySelector('button[type="submit"]');
    if (!CONFIG.formEndpoint || location.protocol==="file:"){ mailFallback(""); return; }
    btn.disabled=true; const label=btn.textContent; btn.textContent="Sending…";
    fetch(CONFIG.formEndpoint,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({kind,subject,body:(full||lines).join("\n"),email:d.email,name:d.name,website:d.website||""})})
      .then(r=>{ if(!r.ok) throw new Error(r.status); return r.json(); })
      .then(()=>{ status.innerHTML = kind==="report" ? "Thanks. Your report request is in; a senior expert gets back to you." : "Thanks. Your message is in; a senior expert gets back to you, usually within one working day."; status.classList.add("show"); form.reset(); })
      .catch(()=>mailFallback("We couldn’t send your message from the website."))
      .finally(()=>{ btn.disabled=false; btn.textContent=label; });
  });
  form.addEventListener("input",e=>{ const f=e.target.closest(".field"); if(f && f.classList.contains("invalid")){ f.classList.remove("invalid"); e.target.removeAttribute("aria-invalid"); } });
}


/* Carousels: arrow buttons + scroll-snap track */
function initCarousels(){
  document.querySelectorAll("[data-carousel]").forEach(c=>{
    const track=c.querySelector(".track"), prev=c.querySelector("[data-prev]"), next=c.querySelector("[data-next]");
    if(!track||!prev||!next) return;
    const step=()=>{ const s=track.querySelector(".slide"); return s ? s.getBoundingClientRect().width+16 : 300; };
    const smooth=matchMedia("(prefers-reduced-motion: reduce)").matches?"auto":"smooth";
    prev.addEventListener("click",()=>track.scrollBy({left:-step(),behavior:smooth}));
    next.addEventListener("click",()=>track.scrollBy({left:step(),behavior:smooth}));
    const upd=()=>{ prev.disabled=track.scrollLeft<4; next.disabled=track.scrollLeft+track.clientWidth>=track.scrollWidth-4; };
    track.addEventListener("scroll",upd,{passive:true}); window.addEventListener("resize",upd); upd();
  });
}
/* Generic tabs ([data-tabs] with role=tab buttons controlling role=tabpanel elements) */
function initTabs(){
  document.querySelectorAll("[data-tabs]").forEach(root=>{
    const tabs=[...root.querySelectorAll('[role="tab"]')];
    const show=i=>tabs.forEach((t,j)=>{ const on=i===j; t.setAttribute("aria-selected",on); t.tabIndex=on?0:-1; const p=document.getElementById(t.getAttribute("aria-controls")); if(p) p.hidden=!on; });
    tabs.forEach((t,i)=>{ t.addEventListener("click",()=>show(i)); t.addEventListener("keydown",e=>{ let n=null;
      if(e.key==="ArrowRight"||e.key==="ArrowDown") n=(i+1)%tabs.length; if(e.key==="ArrowLeft"||e.key==="ArrowUp") n=(i-1+tabs.length)%tabs.length;
      if(n!==null){ e.preventDefault(); show(n); tabs[n].focus(); } }); });
  });
}
/* Mega menu: hover on desktop (CSS), click/keyboard via the chevron button */
function initMega(){
  const li=document.querySelector(".has-mega"); if(!li) return;
  const btn=li.querySelector(".mega-btn");
  const set=on=>{ li.classList.toggle("open",on); btn.setAttribute("aria-expanded",on); };
  btn.addEventListener("click",e=>{ e.stopPropagation(); set(!li.classList.contains("open")); });
  document.addEventListener("click",e=>{ if(!li.contains(e.target)) set(false); });
  document.addEventListener("keydown",e=>{ if(e.key==="Escape" && li.classList.contains("open")){ set(false); btn.focus(); } });
  li.querySelectorAll(".mega a").forEach(a=>a.addEventListener("click",()=>set(false)));
  li.addEventListener("mouseleave",()=>set(false));
}

/* Animated isometric scenes (hero + shorts) with a shared pause control */
function initIso(){
  if (!window.ISO) return;
  const mobile = matchMedia("(max-width: 760px)").matches;
  document.querySelectorAll("canvas[data-iso]").forEach(cv=>{ const s=cv.dataset.iso;
    ISO.mount(cv, s, s==="hero" ? {fit:"contain", align: mobile?[.5,.08]:[.98,.78], zoom: mobile?.95:.86, drift:true} : {fit:"contain", zoom:1.38, align:[.5,.55]}); });
  const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
  const sync = ()=>document.querySelectorAll("[data-anim-toggle]").forEach(x=>{ x.setAttribute("aria-pressed", ISO.paused); x.textContent = ISO.paused ? "Play animation" : "Pause animation"; });
  document.querySelectorAll("[data-anim-toggle]").forEach(b=>{ if (reduce) { b.hidden = true; return; } b.onclick=()=>{ ISO.setPaused(!ISO.paused); sync(); }; });
  sync();
}

/* ---------- Global behaviour ---------- */
const header=$("#header");
function onScroll(){ header.classList.toggle("scrolled", window.scrollY > 40); }
function openMenu(){ $("#mpanel").classList.add("open"); $("#menubtn").setAttribute("aria-expanded","true"); document.body.style.overflow="hidden"; $("#menuclose").focus(); }
function closeMenu(){ const p=$("#mpanel"); if(!p.classList.contains("open")) return; p.classList.remove("open"); $("#menubtn").setAttribute("aria-expanded","false"); document.body.style.overflow=""; }
document.addEventListener("click",e=>{
  const a=e.target.closest("[data-scroll]"); if(!a) return;
  e.preventDefault(); scrollToId(a.dataset.scroll);
});
$("#menubtn").addEventListener("click",openMenu);
$("#menuclose").addEventListener("click",()=>{ closeMenu(); $("#menubtn").focus(); });
$$("#mpanel a").forEach(a=>a.addEventListener("click",closeMenu));
document.addEventListener("keydown",e=>{ if(e.key==="Escape") closeMenu(); });
window.addEventListener("scroll",onScroll,{passive:true}); onScroll();

const reviewBtn=$("#reviewtoggle");
if (reviewBtn){
  const setReview=on=>{ document.documentElement.classList.toggle("review",on); reviewBtn.setAttribute("aria-pressed",on); reviewBtn.textContent="Review mode: "+(on?"on":"off"); };
  reviewBtn.addEventListener("click",()=>setReview(!document.documentElement.classList.contains("review")));
  setReview(true);
}

const page=document.body.dataset.page;
initMega();
if (page==="home"){ initIso(); initHeroVideo(); initTwin(); initCarousels(); initTabs(); }
if (page==="assessment") initAssessment();
if (page==="insights") initFilters();
if (page==="contact"){ const t=new URLSearchParams(location.search).get("topic"); const sel=$("#f-topic"); if(t && sel && [...sel.options].some(o=>o.value===t)) sel.value=t; }
$$("form.form").forEach(initForm);
})();
