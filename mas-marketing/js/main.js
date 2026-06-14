document.getElementById('yr').textContent=new Date().getFullYear();
const motionOff = matchMedia('(prefers-reduced-motion: reduce)').matches;
const isMobile = ()=>innerWidth<=820;

/* nav + menu */
const nav=document.getElementById('nav');
const toggle=document.getElementById('toggle'),links=document.getElementById('links');
toggle.addEventListener('click',()=>{toggle.classList.toggle('open');links.classList.toggle('open')});
links.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>{toggle.classList.remove('open');links.classList.remove('open')}));

/* hero entrance */
const hero=document.querySelector('.hero');
addEventListener('load',()=>hero.classList.add('in'));
setTimeout(()=>hero.classList.add('in'),200);

/* reveal observer */
const io=new IntersectionObserver((es)=>{es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target);}})},{threshold:.15,rootMargin:'0px 0px -8% 0px'});
document.querySelectorAll('.rv,.clip').forEach(el=>io.observe(el));

/* client marquees with real logos */
const logos={disney:'assets/clients/disney.png',prime:'assets/clients/prime.png',
  globo:'assets/clients/globoplay.png',paris:'assets/clients/paris.png',wb:'assets/clients/wb.png'};
const wall=[
  {img:'disney.png'},{img:'prime.png'},{img:'netflix.png'},{img:'google.png'},{img:'wb.png'},
  {img:'youtube.png'},{img:'spongebob.png'},{img:'nestle.png'},{img:'neutrogena.png'},{img:'tinder.png'},
  {img:'globoplay.png'},{img:'paris.png'},{img:'d1-sports.png'},{img:'weather-channel.png'}
  // H&M: no logo uploaded yet — add {img:'hm.png'} once it exists, or use {t:'H&M'}
];
function chipHTML(c){
  if(c.img) return `<div class="chip" data-cur><img src="assets/clients/${c.img}" alt="" loading="lazy"></div>`;
  return `<div class="chip text" data-cur>${c.t}${c.s?`<small>${c.s}</small>`:''}</div>`;
}
function fillRow(el,list){el.innerHTML=(list.map(chipHTML).join('')).repeat(2);}
const half=Math.ceil(wall.length/2);
fillRow(document.getElementById('mq1'),wall.slice(0,half).concat(wall.slice(0,half)));
fillRow(document.getElementById('mq2'),wall.slice(half).concat(wall.slice(half)));

/* ================= PORTFOLIO ================= */
/* NOTE: copy + metrics below are editable placeholders — swap for real
   case details. Add real media by setting `img:'<base64-or-url>'` on a
   project (tile + hero), and fill the gallery/hero slots. */
const projects=[
  {client:'Disney+', logo:'disney', cat:'Distribution', size:'t-big',
   title:'Streaming Launch Social Engine',
   tagline:'Distribution · Social · Always-on',
   lead:'Turning a platform launch into an always-on attention machine.',
   brief:'A global streaming launch needed momentum that outlived the release window — not a one-week spike, but a system that compounds.',
   work:'We built a daily distribution engine: platform-native edits, a posting cadence tuned to the algorithm, and paid amplification layered on the highest-performing organic cuts.',
   divisions:['MAS Distro','FAM','MAS Marketing'],
   metrics:[{v:120,suf:'M+',l:'Organic impressions'},{v:18,suf:'%',l:'Lift in sign-ups'},{v:4.2,suf:'×',l:'Engagement vs benchmark'}]},

  {client:'Prime Video', logo:'prime', cat:'Production', size:'t-tall',
   title:'Tentpole Campaign Films',
   tagline:'Production · Cinematic · Social',
   lead:'Cinematic storytelling, cut for every feed.',
   brief:'A tentpole title needed a content system spanning hero trailers down to thumb-stopping vertical clips.',
   work:'Our FAM team produced the hero film and a full library of derivative cuts — each graded, captioned, and formatted per platform.',
   divisions:['FAM','MAS Distro'],
   metrics:[{v:60,suf:'+',l:'Assets delivered'},{v:9,suf:'M',l:'Views in week one'},{v:3.1,suf:'×',l:'Watch-through rate'}]},

  {client:'Warner Bros', logo:'wb', cat:'Production', size:'',
   title:'Franchise Content Series',
   tagline:'Production · Editorial',
   lead:'A repeatable content series fans return for.',
   brief:'Sustaining attention between releases for a major franchise.',
   work:'We designed an episodic social series — format, look, and pacing — then produced and scheduled it as an ongoing drumbeat.',
   divisions:['FAM','MAS Distro'],
   metrics:[{v:24,suf:'',l:'Episodes shipped'},{v:42,suf:'%',l:'Follower growth'},{v:2.4,suf:'×',l:'Saves vs avg'}]},

  {client:'Globoplay', logo:'globo', cat:'Distribution', size:'',
   title:'Audience Growth Program',
   tagline:'Distribution · Paid · Lifecycle',
   lead:'Built for reach in a competitive market.',
   brief:'Grow a streaming audience in one of the most crowded content markets in the world.',
   work:'We ran a localized organic + paid program, testing hooks daily and reallocating spend toward the winners in near-real-time.',
   divisions:['MAS Distro','MAS AI'],
   metrics:[{v:200,suf:'M+',l:'Reach delivered'},{v:31,suf:'%',l:'CPA reduction'},{v:5,suf:'×',l:'ROAS on top sets'}]},

  {client:'Paris Filmes', logo:'paris', cat:'Branding', size:'',
   title:'Theatrical Brand Toolkit',
   tagline:'Branding · Strategy · Identity',
   lead:'A foundation that scales across every release.',
   brief:'A distributor needed a flexible identity system to anchor campaign after campaign.',
   work:'MAS Marketing built the positioning, visual system, and content guardrails — the bedrock the production and distribution teams build on.',
   divisions:['MAS Marketing','FAM'],
   metrics:[{v:1,suf:'',l:'Unified system'},{v:12,suf:'+',l:'Campaigns powered'},{v:100,suf:'%',l:'On-brand output'}]},

  {client:'Evens Saint Clair', logo:null, cat:'athletes', size:'t-wide',
   title:'Athlete Brand Build',
   tagline:'Athletes · Personal Brand · Content',
   lead:'Building a pro athlete into a media brand.',
   brief:'Translate on-field equity into an audience and opportunities off it.',
   work:'From narrative and visual identity to a weekly content and posting system — we built the personal brand from the ground up and kept it consistent.',
   divisions:['MAS Marketing','FAM','MAS Distro'],
   metrics:[{v:7,suf:'-fig',l:'Reach unlocked'},{v:3,suf:'×',l:'Follower growth'},{v:5,suf:'+',l:'Brand deals'}]},

  {client:'Nestlé', logo:null, cat:'ai', size:'',
   title:'AI Content Workflows',
   tagline:'AI · Automation · Data',
   lead:'Smarter production through intelligent systems.',
   brief:'Scale content output without scaling headcount or losing quality.',
   work:'MAS AI deployed agents and workflows for ideation, asset versioning, and performance tagging — surfacing what to make next from first-party data.',
   divisions:['MAS AI','MAS Distro'],
   metrics:[{v:70,suf:'%',l:'Faster turnaround'},{v:3.5,suf:'×',l:'Output per week'},{v:1,suf:'',l:'Data engine'}]}
];

const grid=document.getElementById('portGrid');
function ghostOf(p){const a=p.client.replace(/[^A-Za-z]/g,'');return (a.slice(0,2)||'MAS').toUpperCase();}
function tileHTML(p,i){
  return `<article class="tile ${p.size||''} tile-rev" data-cat="${p.cat.toLowerCase()}" data-id="${i}" data-cur style="transition-delay:${(i%3)*0.09}s">
    <div class="tile-bg">${p.img?`<img src="${p.img}" alt="">`:`<span class="tile-ghost">${ghostOf(p)}</span>`}</div>
    <div class="tile-lines"></div><div class="tile-veil"></div>
    <div class="tile-play"></div>
    <div class="tile-body">
      <span class="tile-cat">${p.cat}</span>
      <div class="tile-client">${p.client}</div>
      <h3 class="tile-title">${p.title}</h3>
      <span class="tile-more">View case <em>&rarr;</em></span>
    </div>
  </article>`;
}
grid.innerHTML=projects.map(tileHTML).join('');
let portBgs=[...grid.querySelectorAll('.tile-bg')];
grid.querySelectorAll('.tile-rev').forEach(el=>io.observe(el));
grid.querySelectorAll('.tile').forEach(t=>t.addEventListener('click',()=>openCase(+t.dataset.id,t)));

/* FLIP filtering */
const filterBar=document.getElementById('filters');
function flip(container,mutate){
  const first=new Map();
  [...container.children].forEach(el=>{if(el.style.display!=='none')first.set(el,el.getBoundingClientRect());});
  mutate();
  [...container.children].forEach(el=>{
    if(el.style.display==='none')return;
    el.classList.add('in');
    const f=first.get(el),l=el.getBoundingClientRect();
    if(!f){el.animate([{opacity:0,transform:'scale(.94) translateY(22px)'},{opacity:1,transform:'none'}],{duration:520,easing:'cubic-bezier(.16,1,.3,1)'});return;}
    const dx=f.left-l.left,dy=f.top-l.top;
    if(dx||dy)el.animate([{transform:`translate(${dx}px,${dy}px)`},{transform:'none'}],{duration:600,easing:'cubic-bezier(.16,1,.3,1)'});
  });
}
filterBar.querySelectorAll('.filter').forEach(btn=>btn.addEventListener('click',()=>{
  filterBar.querySelector('.filter.active')?.classList.remove('active');
  btn.classList.add('active');
  const cat=btn.dataset.cat;
  flip(grid,()=>{[...grid.children].forEach(t=>{t.style.display=(cat==='all'||t.dataset.cat===cat)?'':'none';});});
}));

/* ===== case overlay ===== */
const caseEl=document.getElementById('case');
const caseScroll=document.getElementById('caseScroll');
const casePanel=caseEl.querySelector('.case-panel');
let current=0,lockY=0;
function metricHTML(m){return `<div class="metric"><div class="v" data-to="${m.v}" data-suf="${m.suf||''}">0</div><div class="l">${m.l}</div></div>`;}
function phHTML(type,lab,dims){return `<div class="ph" data-type="${type}" data-cur><div class="ic"></div><span class="lab">${lab}</span><span class="dims">${dims}</span></div>`;}
function buildCase(p){
  const pill=p.logo?`<span class="case-pill"><img src="${logos[p.logo]}" alt=""></span>`:`<span class="case-pill text">${p.client}</span>`;
  const next=(current+1)%projects.length;
  caseScroll.innerHTML=`
    <div class="case-hero">${phHTML('video','Case hero — drop reel/photo','16:9').replace('class="ph"','class="ph"')}<div class="veil"></div>
      <div class="case-head">${pill}<h2 class="case-title">${p.title}</h2><div class="case-tagline">${p.tagline}</div></div>
    </div>
    <div class="case-body">
      <div class="case-stagger">
        <p class="case-lead">${p.lead}</p>
        <div class="case-cols">
          <div class="case-col"><h4>The brief</h4><p>${p.brief}</p></div>
          <div class="case-col"><h4>What we did</h4><p>${p.work}</p>
            <div class="cdivs">${p.divisions.map(d=>`<span>${d}</span>`).join('')}</div></div>
        </div>
        <div class="case-metrics">${p.metrics.map(metricHTML).join('')}</div>
        <div class="case-gallery">${phHTML('image','Gallery — wide','16:10')}<div class="stack">${phHTML('image','Still','1:1')}${phHTML('video','Clip','9:16')}</div></div>
        <div class="case-foot">
          <span class="lab">Next project</span>
          <button class="case-next" id="caseNext" data-cur>${projects[next].client} <em>&rarr;</em></button>
        </div>
      </div>
    </div>`;
  bindCursor(caseScroll);
  caseScroll.querySelector('#caseNext').addEventListener('click',()=>openCase(next));
  caseScroll.querySelectorAll('.ph').forEach(c=>c.addEventListener('mousemove',e=>{const r=c.getBoundingClientRect();c.style.setProperty('--mx',((e.clientX-r.left)/r.width*100)+'%');c.style.setProperty('--my',((e.clientY-r.top)/r.height*100)+'%');}));
}
function countUp(el){
  const to=parseFloat(el.dataset.to),suf=el.dataset.suf||'',dec=(to%1!==0)?1:0,dur=1300,t0=performance.now();
  (function s(t){const k=Math.min(1,(t-t0)/dur),e=1-Math.pow(1-k,3);el.innerHTML=(to*e).toFixed(dec)+(suf?`<em>${suf}</em>`:'');if(k<1)requestAnimationFrame(s);})(t0);
}
function openCase(i,el){
  current=i;buildCase(projects[i]);
  if(el){const r=el.getBoundingClientRect();casePanel.style.transformOrigin=`${(r.left+r.width/2)/innerWidth*100}% ${(r.top+r.height/2)/innerHeight*100}%`;}
  else casePanel.style.transformOrigin='50% 30%';
  lockY=scrollY;
  const sw=innerWidth-document.documentElement.clientWidth;
  document.body.style.overflow='hidden';document.body.style.paddingRight=sw+'px';
  caseEl.classList.add('open');caseEl.setAttribute('aria-hidden','false');
  caseScroll.scrollTop=0;
  setTimeout(()=>caseScroll.querySelectorAll('.metric .v').forEach(countUp),450);
}
function closeCase(){
  caseEl.classList.remove('open');caseEl.setAttribute('aria-hidden','true');
  document.body.style.overflow='';document.body.style.paddingRight='';
}
document.getElementById('caseClose').addEventListener('click',closeCase);
caseEl.querySelector('[data-close]').addEventListener('click',closeCase);
addEventListener('keydown',e=>{if(e.key==='Escape'&&caseEl.classList.contains('open'))closeCase();});

/* count-up for section stat */
const countObs=new IntersectionObserver((es)=>{es.forEach(e=>{if(e.isIntersecting){countUp(e.target);countObs.unobserve(e.target);}})},{threshold:.6});
document.querySelectorAll('[data-count]').forEach(el=>countObs.observe(el));


/* cursor */
const dot=document.querySelector('.cursor'),ring=document.querySelector('.cursor-ring');
let mx=innerWidth/2,my=innerHeight/2,rx=mx,ry=my;
addEventListener('mousemove',e=>{mx=e.clientX;my=e.clientY;dot.style.left=mx+'px';dot.style.top=my+'px';});
(function loop(){rx+=(mx-rx)*.18;ry+=(my-ry)*.18;ring.style.left=rx+'px';ring.style.top=ry+'px';requestAnimationFrame(loop);})();
function bindCursor(root=document){root.querySelectorAll('[data-cur]').forEach(n=>{n.addEventListener('mouseenter',()=>document.body.classList.add('cur-hover'));n.addEventListener('mouseleave',()=>document.body.classList.remove('cur-hover'));});}
bindCursor();
addEventListener('mouseout',e=>{if(!e.relatedTarget){dot.style.opacity=0;ring.style.opacity=0;}});
addEventListener('mouseover',()=>{dot.style.opacity=1;ring.style.opacity=1;});

/* division glow follow */
document.querySelectorAll('.ph').forEach(c=>{
  c.addEventListener('mousemove',e=>{const r=c.getBoundingClientRect();c.style.setProperty('--mx',((e.clientX-r.left)/r.width*100)+'%');c.style.setProperty('--my',((e.clientY-r.top)/r.height*100)+'%');});
});

/* ---- scroll engine: progress, parallax, manifesto, pinned divisions ---- */
const progress=document.getElementById('progress');
const heroMark=document.getElementById('heroMark');
const statement=document.getElementById('statement');
const words=[...statement.querySelectorAll('.w')];
const pin=document.getElementById('pin'),track=document.getElementById('track'),prog=document.getElementById('prog');
const dots=[...prog.querySelectorAll('.pd')];
let ticking=false;

function onScroll(){
  const y=scrollY,vh=innerHeight;
  const max=document.body.scrollHeight-vh;
  progress.style.transform=`scaleX(${Math.min(1,y/max)})`;

  if(!motionOff){
    // hero parallax
    if(y<vh){
      heroMark.style.transform=`translateY(calc(-50% + ${y*0.18}px)) translateX(${y*0.04}px)`;
      const hc=hero.querySelector('.wrap'); hc.style.transform=`translateY(${y*0.12}px)`; hc.style.opacity=`${1-y/vh*0.9}`;
    }
    // ambient drift
    document.querySelector('.b2').style.transform=`translateY(${y*-0.05}px)`;
    document.querySelector('.b3').style.transform=`translateY(${y*-0.08}px)`;
  }

  // manifesto word brighten
  const r=statement.getBoundingClientRect();
  const p=Math.max(0,Math.min(1,(vh*0.82 - r.top)/(r.height + vh*0.35)));
  const lit=Math.round(p*words.length);
  words.forEach((w,i)=>w.classList.toggle('lit',i<lit));

  // portfolio tile parallax
  if(!motionOff && portBgs.length){
    for(const bg of portBgs){
      const t=bg.parentElement.getBoundingClientRect();
      if(t.bottom<0||t.top>vh)continue;
      const off=((t.top+t.height/2)-vh/2)/vh;
      bg.style.transform=`translateY(${off*-26}px) scale(1.12)`;
    }
  }

  // pinned horizontal divisions
  if(!isMobile()){
    const pr=pin.getBoundingClientRect();
    const total=pin.offsetHeight-vh;
    const pp=Math.max(0,Math.min(1,(-pr.top)/total));
    const shift=(track.scrollWidth - innerWidth);
    track.style.transform=`translateX(${-pp*shift}px)`;
    const active=Math.min(dots.length-1,Math.floor(pp*dots.length*0.999));
    dots.forEach((d,i)=>d.classList.toggle('on',i===active));
  } else {
    track.style.transform='';
  }
  ticking=false;
}
addEventListener('scroll',()=>{if(!ticking){requestAnimationFrame(onScroll);ticking=true;}},{passive:true});
addEventListener('resize',onScroll);
onScroll();

/* contact -> mailto */
document.getElementById('send').addEventListener('click',()=>{
  const n=f_name.value.trim(),em=f_email.value.trim(),d=f_div.value,m=f_msg.value.trim();
  const body=`Name: ${n}%0D%0AEmail: ${em}%0D%0ANeed: ${d}%0D%0A%0D%0A${encodeURIComponent(m)}`;
  location.href=`mailto:hello@masmarketing.com?subject=${encodeURIComponent('New inquiry — '+(n||'Website'))}&body=${body}`;
});