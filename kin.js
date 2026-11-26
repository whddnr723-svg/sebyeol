/* ---------- the other folk as humanoids (ASCII only): the pxHero body with an animal, dragon, goblin or spirit head,
   tails, wings, paws and claws, a fur collar or scales, a race badge (moon = dal-byeol, star = saet-byeol),
   and floating wisp bodies for spirits. Loaded after hero.js. ---------- */
function pxHead(p,o,mood,r,I){
  const F=r(o.skin),L=r(o.fur2||'#f1ece0'),E=r(o.eye||'#ffd23a'),t=o.head,atk=mood===2;
  const eyes=y=>{for(const [ex,lf] of [[19,1],[26,0]]){
      if(mood===1){p.line(ex,y+1,ex+3,y+1,I);continue;}
      p.rect(ex,y+1,4,2,E);p.set(ex+(lf?2:1),y+1,I);p.set(ex+(lf?2:1),y+2,I);p.set(ex+(lf?1:2),y+1,'#ffffff');
      p.line(ex,lf?y:y+1,ex+3,lf?y+1:y,I);p.set(lf?ex-1:ex+4,y-1,I);
      if(lf)p.line(ex-1,y-2-(atk?1:0),ex+3,y-1+(atk?1:0),I);else p.line(ex,y-1+(atk?1:0),ex+4,y-2-(atk?1:0),I);}};
  const fangs=y=>{p.rect(21,y,7,1,'#7a2030');p.poly([[21,y-1],[22,y-1],[21.5,y+2]],'#ffffff');p.poly([[26,y-1],[27,y-1],[26.5,y+2]],'#ffffff');};
  const pink=r('#f0a5b0');
  if(t==='canine'||t==='cat'||t==='bear'){
    /* big ears so the folk reads from far away */
    if(t==='bear'){p.ell(15.5,3,4.6,4.6,F);p.ell(32.5,3,4.6,4.6,F);p.ell(15.5,3.5,2.4,2.4,L);p.ell(32.5,3.5,2.4,2.4,L);}
    else{const hgt=t==='cat'?-2:-6;p.poly([[13,10],[14,hgt],[23,5]],F);p.poly([[35,10],[34,hgt],[25,5]],F);p.poly([[16,7],[15.5,hgt+4],[20,5]],pink);p.poly([[32,7],[32.5,hgt+4],[28,5]],pink);
      if(o.fox||o.tiger){const dk=r(o.tiger?'#2a2a36':'#3a2a2a');p.poly([[13.5,0],[14,hgt],[17,-1]],dk);p.poly([[34.5,0],[34,hgt],[31,-1]],dk);}}
    if(o.ruff)for(const s of [-1,1]){const X=x=>24+s*x;p.poly([[X(7),10],[X(13),12],[X(9),14],[X(13),17],[X(8),17],[X(11),21],[X(5),19]],F);}
    p.ell(24,10,t==='bear'?9.5:9,8.5,F);
    if(o.tiger){const k=r('#2a2a36');p.line(24,2,24,6,k[1]);p.line(21,3,22,6,k[1]);p.line(27,3,26,6,k[1]);p.line(15,9,18,10,k[1]);p.line(33,9,30,10,k[1]);p.line(15,12,18,12,k[1]);p.line(33,12,30,12,k[1]);}
    if(o.moon){const g='#ffc94d';p.set(24,2,g);p.set(23,3,g);p.set(23,4,g);p.set(24,5,g);}
    eyes(t==='bear'?6:7);
    /* long muzzle for dogs, short round one for cats and bears */
    if(t==='canine'){p.poly([[18,12],[30,12],[29,18],[24,22],[19,18]],L);p.rect(22,13,5,3,r('#2f2f3d'));p.set(23,13,'#8a8aa0');if(atk||o.fangs)fangs(19);else{p.line(20,19,24,18,I);p.line(28,19,24,18,I);}}
    else{p.ell(24,14.5,t==='bear'?6:5,4.5,L);p.rect(22,12,5,2,t==='cat'?pink:r('#2f2f3d'));if(atk)fangs(17);else{p.line(21,16,24,15,I);p.line(27,16,24,15,I);}}
    if(t==='cat')for(const s of [-1,1]){p.line(24+s*5,14,24+s*12,12,'#ffffff');p.line(24+s*5,15,24+s*12,17,'#ffffff');}}
  else if(t==='hawk'){p.poly([[16,5],[18,-4],[22,2],[24,-5],[27,2],[31,-3],[33,6]],F);p.ell(24,9,8.5,8.5,L);
    for(const ex of [20,28])p.ell(ex,8,2.8,2.8,r('#f4b63a'));eyes(6);
    p.poly([[20,11],[29,11],[28,15],[24,21],[22,15]],r('#f4b63a'));p.line(24,15,24,20,r('#c08a1a')[2]);if(atk)p.line(22,15,26,15,'#7a2030');}
  else if(t==='dragon'||t==='serpent'){const hn=r(o.horn||'#f1f0e6');
    /* long swept horns and a crest */
    p.poly([[18,6],[6,-4],[10,1],[13,4],[19,2]],hn);p.poly([[30,6],[42,-4],[38,1],[35,4],[29,2]],hn);
    for(const x of [20,24,28])p.poly([[x-2,3],[x,-3],[x+2,3]],o.ridge?r(o.ridge):L);
    p.ell(24,8,8.5,7,F);p.poly([[17,9],[31,9],[31,17],[24,21],[17,17]],F);p.poly([[19,15],[29,15],[27,20],[21,20]],L);
    for(const [x,y] of [[18,11],[30,11],[17,14],[31,14]])p.set(x,y,F[2]);
    p.set(22,13,I);p.set(26,13,I);eyes(5);if(atk)fangs(17);else p.line(20,17,28,17,I);
    if(t==='serpent')for(const s of [-1,1]){const g=r('#ffc94d')[0];p.line(24+s*5,16,24+s*13,21,g);p.line(24+s*13,21,24+s*14,26,g);p.line(24+s*14,26,24+s*12,29,g);}
    if(o.fire){const f=r('#ff8a3d'),y=r('#ffd24a');p.poly([[19,2],[21,-4],[23,2]],f);p.poly([[23,1],[24,-5],[26,1]],y);p.poly([[26,2],[28,-4],[30,2]],f);}}
  else if(t==='goblin'||t==='spirit'||t==='ghost'){
    if(t==='ghost'){const hm=r('#26232c');p.ell(24,10,7.5,7,F);p.ell(24,5,9,5.5,hm);p.rect(15,7,18,2,hm);p.poly([[22,1],[24,-3],[26,1]],r('#ffc94d'));
      for(const ex of [20,27])if(mood===1)p.line(ex-1,12,ex+2,12,'#ffffff');else p.ell(ex,12,1.8,2.2,r('#bfe6ff'));p.poly([[18,15],[30,15],[28,19],[20,19]],r('#3a4470'));}
    else{p.ell(24,10,7.5,7,F);p.poly([[17,9],[31,9],[30,14],[27,18],[24,19.5],[21,18],[18,14]],F);
      /* pointed ears for spirits and goblins */
      p.poly([[17,10],[11,7],[17,14]],F);p.poly([[31,10],[37,7],[31,14]],F);
      const h=o.hairT;
      if(h==='flame'){const a=r('#ff7a2f'),b=r('#ffd24a');p.poly([[15,9],[13,-1],[18,3],[19,-6],[24,0],[26,-7],[29,0],[34,-3],[33,9]],a);p.poly([[19,6],[21,-1],[24,4],[27,-2],[29,6]],b);}
      else if(h==='crystal'){const c=r(o.acc2||'#6fe3ff');p.ell(24,5,8.5,4.5,r('#6f7387'));p.poly([[17,5],[15,-4],[21,3]],c);p.poly([[22,3],[24,-6],[26,3]],c);p.poly([[27,3],[33,-3],[31,6]],c);}
      else if(h==='smoke'){const s=r('#3a2a5c');for(const [x,y,rr] of [[18,4,4.5],[24,1,5],[30,4,4.5],[14,10,3.2],[34,10,3.2],[13,16,2.4],[35,16,2.4]])p.ell(x,y,rr,rr,s);}
      else if(h==='cloud'){const c=r('#e6fffb');for(const [x,y,rr] of [[17,6,4.5],[22,1,5],[28,2,5],[33,7,4],[14,12,3],[34,13,3],[12,18,2.4],[36,19,2.4]])p.ell(x,y,rr,rr,c);}
      else if(h==='spark'){const y=r('#ffd93b');for(let i=0;i<7;i++){const a=Math.PI*(1.05+i*0.15);p.poly([[24+Math.cos(a)*6,8+Math.sin(a)*5],[24+Math.cos(a+.1)*15,8+Math.sin(a+.1)*13],[24+Math.cos(a+.2)*6,8+Math.sin(a+.2)*5]],y);}p.ell(24,5,8,4,y);}
      else if(h==='wild'){const k=r('#26232c');p.poly([[15,9],[14,1],[18,4],[20,-1],[23,3],[27,-1],[29,4],[33,1],[33,9]],k);}
      if(t==='goblin'){const hn=r('#f1f0e6');if(o.oneHorn)p.poly([[22,1],[24,-7],[26,1]],hn);else{p.poly([[18,3],[15,-5],[20,1]],hn);p.poly([[30,3],[33,-5],[28,1]],hn);}}
      eyes(8);
      if(o.marks){const m=r(o.marks)[0];p.line(18,13,19,15,m);p.line(30,13,29,15,m);p.set(24,4,m);}
      if(t==='goblin'){if(atk)fangs(16);else{p.line(22,16,26,16,I);p.set(21,15,'#ffffff');p.set(27,15,'#ffffff');}}else{p.set(24,13,F[2]);if(atk)p.rect(23,16,3,1,'#7a2a30');else p.line(23,16,25,16,'#a05a48');}}}
}
/* tails swing out to the left (away from the weapon) so they show; wings spread behind */
function pxBack(p,o,st,r){
  const F=r(o.skin),L=r(o.fur2||'#f1ece0');
  if(o.wings){const W=r(o.wings),u=o._sw?2:0;p.poly([[18,24],[3,4+u],[7,18+u],[0,17+u],[6,26],[1,30],[12,32]],W);p.poly([[30,24],[45,4+u],[41,18+u],[48,17+u],[42,26],[47,30],[36,32]],W);
    p.line(18,24,3,4,W[2]);p.line(30,24,45,4,W[2]);p.line(16,26,7,18,W[2]);p.line(32,26,41,18,W[2]);}
  const q=o._sw?1:0;
  if(o.tail==='bushy'){p.poly([[18,40],[9,46],[3-q*2,42-q],[1-q*3,33-q*3],[3-q*2,27-q*4],[7-q,31-q*3],[7,38],[16,37]],F);p.poly([[1-q*3,33-q*3],[3-q*2,27-q*4],[6-q,30-q*3],[4-q*2,34-q*3]],L);}
  else if(o.tail==='fox'){const n=Math.max(1,st*2-1);for(let i=0;i<n;i++){const a=(n>1?Math.PI*(0.95+i*0.38/(n-1)):Math.PI*1.1)+(q?.12:0);
      for(let k=0;k<8;k++)p.ell(18+Math.cos(a)*k*2.4,42+Math.sin(a)*k*2.4-k*k*.12,3-k*.12,3-k*.12,k>5?L:F);}}
  else if(o.tail==='thin')for(let i=0;i<20;i++)p.ell(17-i*.75,44-i*1.1+Math.sin(i/2.4+(q?1.2:0))*2,1.6,1.6,F);
  else if(o.tail==='dragon'){p.poly([[20,42],[10,48-q],[3,56-q*3],[1,61-q*4],[5,60-q*3],[12,54-q],[20,48]],F);for(const [x,y] of [[13,48],[8,52],[4,57]])p.poly([[x-2,y],[x-2,y-4],[x+1,y-1]],L);}
}
/* legs: clawed paws for fur and scale folk, a floating wisp for spirits */
function pxLegs(p,o,r,lL,lR){
  const F=r(o.skin),pant=r(o.pant||'#2f3560'),skirt=r(o.robe);
  if(o.body==='wisp'){const w=r(o.wisp||o.robe);
    p.poly([[14,40],[34,40],[33,50],[29,56],[24,60],[26,63],[19,60],[16,52]],w);p.poly([[18,48],[30,48],[27,56],[22,59]],r(o.wisp2||'#ffffff'));
    p.poly([[15,35],[33,35],[36,46],[12,46]],skirt);p.line(24,36,24,46,skirt[2]);return;}
  const fL=o._fL||0,fR=-fL;p.poly([[17,44],[23,44],[21+fL,56+lL],[15+fL,56+lL]],pant);p.poly([[26,44],[32,44],[36+fR,56+lR],[30+fR,56+lR]],pant);
  /* bare paws with three claws */
  for(const [x,d] of [[17+fL,lL],[33+fR,lR]]){p.ell(x,59+d,5,3,F);p.line(x-4,58+d,x+3,58+d,F[0]);for(const cx of [x-3,x,x+3]){p.set(cx,62+d,'#f4f0e6');p.set(cx+1,62+d,'#f4f0e6');}}
  p.poly([[15,35],[33,35],[37,49],[11,49]],skirt);p.line(19,37,17,48,skirt[2]);p.line(29,37,31,48,skirt[2]);p.line(24,36,24,49,skirt[2]);
  if(o.body==='scale')for(let y=38;y<48;y+=3)for(let x=14+(y%2);x<35;x+=4)p.set(x,y,skirt[0]);
}
/* in front of the body: fur collar or scales, claws, race badge, spirit sparkles */
function pxFront(p,o,r,mood,hx,hy){
  const F=r(o.skin),L=r(o.fur2||'#f1ece0');
  if(o.body==='fur')p.poly([[14,21],[34,21],[35,24],[32,23],[30,27],[27,24],[24,28],[21,24],[18,27],[16,23],[13,24]],L);
  if(o.body==='scale'){for(const [x,y] of [[13,28],[14,31],[13,34],[35,28],[34,31]])p.set(x,y,F[0]);p.poly([[15,21],[33,21],[30,24],[18,24]],F);}
  if(o.body!=='wisp')for(const [x,y] of [[13,38.5],[hx,hy]]){p.set(x-2,y+2,'#f4f0e6');p.set(x,y+3,'#f4f0e6');p.set(x+2,y+2,'#f4f0e6');}
  /* race badge on the chest: crescent moon for dal-byeol, four-point star for saet-byeol */
  if(o.rc==='moon'){p.ell(19.5,27,3,3,r('#ffd45a'));p.ell(20.8,26.3,2.4,2.4,r(o.robe));p.set(18,26,'#fff6c8');}
  else if(o.rc==='star'){const y=r('#9ff0ff');p.poly([[19.5,23],[21,26.5],[19.5,30],[18,26.5]],y);p.poly([[16,26.5],[19.5,25.5],[23,26.5],[19.5,27.5]],y);p.set(19.5,26.5,'#ffffff');}
  if(o.body==='wisp')for(const [x,y] of [[6,20],[42,28],[4,40],[44,46],[9,54],[40,12]]){const c=r(o.wisp||'#ffffff')[0];p.set(x,y,c);p.set(x+1,y,c);p.set(x,y+1,c);}
}
/* who each folk is: head, body kind, race badge, fur and outfit colours, class (war blade, arc bow, mag staff, asn dagger) */
const KIN={
  wolf:{head:'canine',body:'fur',rc:'moon',claw:1,skin:'#9aa0b5',fur2:'#e8ecf4',eye:'#ffd23a',tail:'bushy',ruff:1,k:'war',robe:'#4a5a7a',acc:'#c0303c'},
  bear:{head:'bear',body:'fur',rc:'moon',skin:'#9c6a45',fur2:'#e8c9a0',eye:'#5a3a1a',k:'war',robe:'#6a5a3a',acc:'#b8c0d0'},
  fox:{arm:'fire',el:'#7fd8ff',head:'canine',fox:1,body:'fur',rc:'moon',skin:'#ee8a34',fur2:'#fff4e8',eye:'#ffd23a',tail:'fox',ruff:1,k:'mag',robe:'#7a5cc9',acc:'#e0a93a'},
  panther:{arm:'stalk',head:'cat',body:'fur',rc:'moon',skin:'#3a3a4a',fur2:'#5a5a6a',eye:'#c8e04a',tail:'thin',k:'asn',robe:'#2a2a36',acc:'#8a5cf0'},
  hawk:{arm:'talon',head:'hawk',body:'fur',rc:'moon',skin:'#8a5a3a',fur2:'#f7f4ec',eye:'#ffd23a',wings:'#7a4a2a',k:'arc',robe:'#6a4a2a',acc:'#e0a93a'},
  wolfking:{arm:'stalk',head:'canine',body:'fur',rc:'moon',skin:'#e6ebf7',fur2:'#ffffff',eye:'#3d8bff',tail:'bushy',ruff:1,fangs:1,moon:1,k:'asn',robe:'#2f3a6a',acc:'#ffc94d'},
  ember:{arm:'fire',el:'#ff7a2f',head:'spirit',body:'wisp',rc:'moon',hairT:'flame',skin:'#f08a4a',eye:'#ffe566',marks:'#ffd24a',wisp:'#ff7a2f',wisp2:'#ffd24a',k:'mag',robe:'#8a2a1a',acc:'#ffb347'},
  rock:{head:'goblin',body:'fur',rc:'moon',hairT:'crystal',skin:'#8b8fa3',fur2:'#6f7387',eye:'#ffe566',k:'club',robe:'#5a5a6a',acc:'#6fe3ff'},
  shade:{arm:'shadow',el:'#8a6af0',head:'goblin',body:'wisp',rc:'moon',hairT:'smoke',skin:'#7a62b8',eye:'#fff6c8',wisp:'#3a2a5c',wisp2:'#7a62b8',k:'asn',robe:'#2a1f40',acc:'#8a6af0'},
  wind:{arm:'wind',el:'#bff6ee',head:'spirit',body:'wisp',rc:'star',hairT:'cloud',skin:'#bfeee8',eye:'#2a8a8a',marks:'#5fbfb4',wisp:'#bff6ee',wisp2:'#ffffff',k:'arc',robe:'#5fbfb4',acc:'#ffffff'},
  bolt:{arm:'bolt',el:'#ffe14a',head:'spirit',body:'wisp',rc:'star',hairT:'spark',skin:'#ffe9a0',eye:'#c06a10',marks:'#e0a020',wisp:'#ffd93b',wisp2:'#fff6c8',k:'mag',robe:'#e0a020',acc:'#ffffff'},
  whelp:{head:'dragon',body:'scale',rc:'star',skin:'#6ab04a',fur2:'#f3e3a0',eye:'#ffd23a',tail:'dragon',k:'war',robe:'#3a6a2a',acc:'#e0a93a'},
  salam:{arm:'salam',el:'#ff8a3d',head:'dragon',body:'scale',rc:'star',fire:1,skin:'#f07a2f',fur2:'#ffd08a',horn:'#8a2a1a',eye:'#ffe566',tail:'dragon',k:'arc',robe:'#8a3a1a',acc:'#ffb347'},
  stardrake:{arm:'drake',el:'#a9b6ff',head:'dragon',body:'scale',rc:'star',skin:'#7a86f0',fur2:'#dfe4ff',horn:'#ffc94d',eye:'#ffd23a',tail:'dragon',wings:'#5a64d0',k:'mag',robe:'#2a2a6a',acc:'#ffc94d'},
  wyvern:{arm:'serpent',el:'#9fe3ff',head:'serpent',body:'scale',rc:'star',skin:'#3a9a9a',fur2:'#dff6ff',eye:'#ffd23a',tail:'dragon',k:'asn',robe:'#1f4a55',acc:'#9fd6d0'},
  elder:{arm:'drake',el:'#ff6a3a',head:'dragon',body:'scale',rc:'star',skin:'#d0403a',fur2:'#ffd9a0',horn:'#ffc94d',ridge:'#ffc94d',eye:'#ffd23a',tail:'dragon',wings:'#a83030',k:'mag',robe:'#6a1a1a',acc:'#ffc94d'},
  duduri:{head:'goblin',body:'fur',hairT:'wild',oneHorn:1,skin:'#6fa8dc',fur2:'#26232c',eye:'#ffe566',k:'club',robe:'#c89a3a',acc:'#e8c94d'},
  baeksan:{arm:'stalk',head:'canine',tiger:1,body:'fur',ruff:1,fangs:1,skin:'#eef0f6',fur2:'#ffffff',eye:'#3d8bff',tail:'bushy',k:'asn',robe:'#3a5a9a',acc:'#e0a93a'},
  mireu:{arm:'drake',el:'#7fd8ff',head:'serpent',body:'scale',skin:'#3a50a0',fur2:'#dff6ff',horn:'#ffc94d',eye:'#ffd23a',tail:'dragon',k:'mag',robe:'#1f2a60',acc:'#ffc94d'},
  gaon:{head:'ghost',body:'wisp',skin:'#b8c4e8',wisp:'#8a94c8',wisp2:'#c8d0f0',k:'war',robe:'#3a4470',acc:'#c8d0e0'}};
function kinOpts(d,st){
  const W=d.arm?d.arm:d.claw?'claw':d.fist?'fist':{war:'blade',arc:'bow',mag:'staff',asn:'dagger',club:'club'}[d.k];
  const o=Object.assign({},d,{weapon:W,trim:d.acc,orb:d.acc,belt:'#6a4a2a',knot:d.acc,pant:'#2f3560',noSheath:1,
    wcol:W==='club'?'#9a6a3a':W==='bow'?'#9a6a3a':'#c8d0dc',hilt:'#4a3a30',guard:'#8a6a4a'});
  if(d.head!=='hawk')o.wings=st>=2?d.wings:null;
  if(st>=2){o.pauldron='#8a8fa8';o.tassel=d.acc;o.belt='#8a5a32';o.guard='#b8c0d0';}
  if(st>=3){o.armor=d.k==='mag'||d.body==='wisp'?null:'#c8d0e0';o.cape=d.acc;o.belt='#e0a93a';o.guard='#e0a93a';o.glow=d.acc;o.sparks=1;o.pauldron='#e0a93a';
    if(W==='blade'||W==='dagger')o.wcol='#e8f4ff';if(W==='bow')o.wcol='#ffd45a';}
  return o;}
/* pxHero with folk head, tail, wings, paws and badge */
function pxKin(id,st,mood){const o=kinOpts(KIN[id],st);return pxHero(Object.assign(o,{_back:pxBack,_head:pxHead,_legs:pxLegs,_front:pxFront,_st:st}),mood);}
for(const id in KIN){STRIKE[id]=1;WEAPON[id]=kinOpts(KIN[id],1).weapon;}
for(const id in KIN)PIXU[id]=(st,g,mood)=>pxKin(id,Math.max(1,Math.min(3,st||1)),mood);
