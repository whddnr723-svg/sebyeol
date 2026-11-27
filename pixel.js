/* ---------- pixel art characters (ASCII only).
   Pix paints shapes pixel by pixel with a 3-tone ramp [light, base, dark] and a checker dither on band edges,
   then traces a dark outline. PIXU[id](star, stage, mood) returns a painted Pix; drawSprite uses it when present. ---------- */
function Pix(W,H){
  let px=new Array(W*H).fill(null);
  const set=(x,y,c)=>{x=Math.floor(x);y=Math.floor(y);if(x>=0&&y>=0&&x<W&&y<H&&c)px[y*W+x]=c;};
  const tone=(v,p,x,y)=>typeof p==='string'?p:v>.42?p[2]:v>.26&&(x+y)%2?p[2]:v<-.5?p[0]:v<-.34&&(x+y)%2?p[0]:p[1];
  const ell=(cx,cy,rx,ry,p)=>{for(let y=Math.floor(cy-ry);y<=cy+ry;y++)for(let x=Math.floor(cx-rx);x<=cx+rx;x++){const nx=(x+.5-cx)/rx,ny=(y+.5-cy)/ry;if(nx*nx+ny*ny<=1)set(x,y,tone(nx*.75+ny*.55,p,x,y));}};
  const rect=(x0,y0,w,h,p)=>{for(let y=y0;y<y0+h;y++)for(let x=x0;x<x0+w;x++)set(x,y,tone(((x+.5-x0)/w-.5)*1.7+((y+.5-y0)/h-.5)*.4,p,x,y));};
  const poly=(pts,p)=>{let x0=1e9,x1=-1e9,y0=1e9,y1=-1e9;for(const [x,y] of pts){x0=Math.min(x0,x);x1=Math.max(x1,x);y0=Math.min(y0,y);y1=Math.max(y1,y);}
    for(let y=Math.floor(y0);y<=y1;y++)for(let x=Math.floor(x0);x<=x1;x++){let ins=false;const qx=x+.5,qy=y+.5;
      for(let i=0,j=pts.length-1;i<pts.length;j=i++){const [xi,yi]=pts[i],[xj,yj]=pts[j];if((yi>qy)!==(yj>qy)&&qx<(xj-xi)*(qy-yi)/(yj-yi)+xi)ins=!ins;}
      if(ins)set(x,y,tone(((qx-x0)/(x1-x0||1)-.5)*1.7+((qy-y0)/(y1-y0||1)-.5)*.4,p,x,y));}};
  const line=(x0,y0,x1,y1,c)=>{const n=Math.max(Math.abs(x1-x0),Math.abs(y1-y0))||1;for(let i=0;i<=n;i++)set(Math.round(x0+(x1-x0)*i/n),Math.round(y0+(y1-y0)*i/n),c);};
  const outline=c=>{const o=px.slice();for(let y=0;y<H;y++)for(let x=0;x<W;x++){if(px[y*W+x])continue;
      if((x>0&&px[y*W+x-1])||(x<W-1&&px[y*W+x+1])||(y>0&&px[(y-1)*W+x])||(y<H-1&&px[(y+1)*W+x]))o[y*W+x]=c;}px=o;};
  const paint=(c,s,ox,oy)=>{for(let y=0;y<H;y++)for(let x=0;x<W;x++){const k=px[y*W+x];if(k){c.fillStyle=k;c.fillRect(ox+x*s,oy+y*s,s,s);}}};
  return {W,H,set,ell,rect,poly,line,outline,paint};
}
const PX_SKIN=['#f8e09a','#e8bd66','#b98636'],PX_INK='#2a1a14',PX_OL='#2a1a14';
const PXC={red:['#f58a78','#d6453f','#962828'],blue:['#7ea8ea','#3f6fb5','#27467c'],navy:['#565c8e','#2f3560','#1a1e3c'],green:['#9ad6a0','#5aa86b','#3a7a4a'],
  dgreen:['#6fae6a','#3d7a45','#24502c'],white:['#ffffff','#ebe7da','#b7b19e'],hemp:['#e6d4aa','#b8a074','#7f6a46'],black:['#56525e','#26232c','#121016'],
  purple:['#b79cf0','#7a5cc9','#4b3590'],brown:['#c79a62','#9a6a3a','#6a4322'],boot:['#7a6a58','#463a30','#281f19'],steel:['#ffffff','#d6dee9','#8d99ae'],
  gold:['#fff0a0','#ffc94d','#b8862a'],wood:['#e0b878','#c79a5e','#8a6436'],hair:['#55505e','#2c2832','#151218'],orange:['#f2a866','#d4782f','#94501a'],
  crimson:['#e8707a','#b3334a','#701c2c'],gray:['#ffffff','#dcdcdc','#a6a6a6']};
function pxFace(p,cx,ey,o){o=o||{};for(const ex of [cx-5,cx+3]){if(o.hurt){p.line(ex-1,ey+1,ex+2,ey+1,PX_INK);continue;}
    p.set(ex,ey,o.eye||PX_INK);p.set(ex,ey+1,o.eye||PX_INK);p.set(ex+1,ey+1,o.eye||PX_INK);p.set(ex,ey+2,o.eye||PX_INK);p.set(ex+1,ey+2,o.eye||PX_INK);p.set(ex+1,ey,'#fff');if(!o.noBrow)p.line(ex-1,ey-2,ex+2,ey-2,o.brow||'#2a2018');}
  if(o.noCheek)return;p.set(cx-7,ey+3,'#e89878');p.set(cx-6,ey+3,'#e89878');p.set(cx+5,ey+3,'#e89878');p.set(cx+6,ey+3,'#e89878');
  if(!o.noMouth){if(o.angry)p.line(cx-1,ey+5,cx+1,ey+6,'#9c4a3a');else p.line(cx-1,ey+5,cx+1,ey+5,'#9c4a3a');}}
/* right-hand weapons; the right hand sits at (35.5,35) */
function pxWeapon(p,w,m){
  if(w==='sword'){p.rect(36,6,2,26,m);p.set(36,5,m[0]);p.rect(33,32,8,2,PXC.gold);p.rect(36,34,2,5,PXC.boot);}
  else if(w==='great'){p.rect(35,1,3,31,m);p.rect(31,32,10,2,PXC.gold);p.rect(35,34,3,6,PXC.crimson);}
  else if(w==='staff'){p.rect(36,9,2,45,PXC.wood);p.rect(34,1,6,9,['#fffbe0','#f5e9b0','#c9b878']);p.line(36,3,37,3,'#c0392b');p.line(35,5,38,5,'#c0392b');p.line(36,7,37,7,'#c0392b');}
  else if(w==='sling'){p.line(36,46,36,33,PXC.wood[2]);p.line(37,46,37,33,PXC.wood[1]);p.line(36,33,33,26,PXC.wood[1]);p.line(37,33,40,26,PXC.wood[1]);p.line(33,26,36,29,'#5a4030');p.line(36,29,40,26,'#5a4030');p.ell(36.5,23.5,1.9,1.9,m);}
  else if(w==='bow'){for(let y=10;y<=46;y++){const x=39-Math.round(5*Math.sin(Math.PI*(y-10)/36));p.set(x,y,PXC.wood[1]);p.set(x+1,y,PXC.wood[2]);}p.line(39,10,39,46,'#f1f0e6');}
  else if(w==='dagger'){p.rect(36,25,2,10,m);p.set(36,24,m[0]);p.rect(35,35,4,1,PXC.gold);p.rect(36,36,2,3,PXC.boot);p.rect(5,34,2,8,m);p.rect(4,33,4,1,PXC.gold);}
}
/* one human body; o: robe, belt, pant, hair, hat, weapon, wcol, long, trim, armor, eye, extra */
function pxHuman(st,mood,o){
  const walk=mood>=3?mood-2:0,dl=walk===1?-2:walk===2?1:0,dr=walk===1?1:walk===2?-2:0,au=mood===2;
  const p=Pix(42,58),metal=st>2?PXC.gold:PXC.steel,S=o.skin||PX_SKIN;
  if(o.halo)for(let a=0;a<360;a+=4){const r=a%8?15.5:17.5,q=a*Math.PI/180;p.set(20.5+Math.cos(q)*r,15+Math.sin(q)*r,a%8?'#ffe58a':'#fff6c8');}
  if(st>2||o.cape)p.poly([[10,24],[31,24],[37,53],[4,53]],o.cape||PXC.crimson);
  if(o.long){p.poly([[12,25],[29,25],[35,55],[6,55]],o.robe);p.rect(19,25,4,30,o.trim||o.robe);}
  else{p.rect(13,42,6,9+dl,o.pant||PXC.navy);p.rect(22,42,6,9+dr,o.pant||PXC.navy);p.rect(12,50+dl,7,4,PXC.boot);p.rect(22,50+dr,7,4,PXC.boot);
    p.poly([[11,24],[30,24],[33,46],[8,46]],o.robe);p.poly([[8,40],[33,40],[34,46],[7,46]],o.robe);}
  p.poly([[15,24],[26,24],[20.5,33]],o.collar||PXC.white);p.poly([[18,24],[23,24],[20.5,29]],S);
  if(o.armor){p.poly([[12,25],[29,25],[28,36],[13,36]],o.armor);p.ell(9,27,5,3.8,o.armor);p.ell(32,27,5,3.8,o.armor);p.line(20,26,20,35,o.armor[2]);}
  if(!o.long||o.belt){p.rect(9,35,23,3,st>1?metal:(o.belt||PXC.brown));p.rect(18,38,3,5,st>1?metal:(o.belt||PXC.brown));}
  p.ell(8.5,31-dr*.5,4,7.5,o.sleeve||o.robe);p.ell(32.5,au?26:30-dl*.5,4,7,o.sleeve||o.robe);p.ell(8,38.5-dr*.5,2.6,2.6,S);
  if(au){const q={set:(x,y,c)=>p.set(x+1,y-6,c),rect:(x,y,w,h,c)=>p.rect(x+1,y-6,w,h,c),line:(a,b,c2,d,c)=>p.line(a+1,b-6,c2+1,d-6,c),ell:(x,y,rx,ry,c)=>p.ell(x+1,y-6,rx,ry,c)};pxWeapon(q,o.weapon,o.wcol||metal);p.ell(36.5,29,2.8,2.8,S);}
  else{pxWeapon(p,o.weapon,o.wcol||metal);p.ell(35.5,35-dl*.5,2.8,2.8,S);}
  const hd=o.hat;
  if(hd==='hood'||hd==='mask')p.ell(20.5,14,11.5,12,o.hood);
  p.ell(20.5,14,9.5,10,S);
  if(hd!=='hood'&&hd!=='mask'&&hd!=='helm'){p.ell(20.5,9,10,7.5,o.hair||PXC.hair);p.ell(20.5,17,8.5,7.5,S);}
  if(hd==='hood'){p.ell(20.5,17,8,8,S);p.poly([[12,9],[29,9],[24,5],[17,5]],o.hood);}
  if(hd==='helm'){p.ell(20.5,9.5,10.5,8,o.helmC||PXC.gold);p.rect(10,11,21,2,o.helmC||['#ecc060','#b8862a','#7a5a1a']);p.ell(20.5,17,8.5,7,S);p.poly([[19,3],[26,0],[31,4],[22,5]],o.plume||PXC.white);}
  if(hd==='band'||hd==='hero'){p.ell(20.5,1.5,3.2,3,o.hair||PXC.hair);}
  if(hd==='band'){p.rect(11,8,19,3,o.band||PXC.red);p.poly([[29,8],[37,12],[35,15],[29,11]],o.band||PXC.red);p.poly([[29,9],[34,18],[32,19],[28,11]],o.band||PXC.red);}
  if(hd==='hero')p.rect(11,8,19,2,o.band||PXC.blue);
  if(hd==='gat'){p.rect(15,0,11,8,PXC.black);p.rect(15,6,11,2,PXC.crimson);p.ell(20.5,9,15,3.2,PXC.black);p.line(10,11,11,22,'#c9a05a');p.line(31,11,30,22,'#c9a05a');}
  if(o.tips){p.ell(13.5,7,2.2,1.6,PXC.gold);p.ell(27.5,7,2.2,1.6,PXC.gold);p.ell(20.5,2.5,2.6,1.3,PXC.gold);}
  if(hd==='mask'){p.rect(12,13,17,5,S);pxFace(p,20.5,15,{eye:o.eye,hurt:mood===1,noCheek:1,noBrow:1});}
  else if(o.faceFn)o.faceFn(p,mood);else pxFace(p,20.5,hd==='hood'?17:15,{eye:o.eye,hurt:mood===1,angry:mood===2});
  if(o.extra)o.extra(p);
  p.outline(PX_OL);return p;
}
const PIXU={
  hanbyeol:(st,stage,mood)=>pxHuman(1,mood,{robe:PXC.hemp,pant:PXC.brown,hat:'hero',band:stage>=3?PXC.gold:PXC.blue,weapon:'sword',
    wcol:stage>=3?PXC.gold:stage>=1?PXC.steel:PXC.wood,eye:stage>=2?'#c98f1a':null,tips:stage>=3,halo:stage>=4,cape:stage>=4?PXC.gold:null}),
  sword:(st,g,mood)=>pxHuman(st,mood,{robe:PXC.blue,hat:'band',weapon:'sword'}),
  sling:(st,g,mood)=>pxHuman(st,mood,{robe:PXC.green,pant:PXC.brown,hair:PXC.orange,hat:st>1?'band':null,band:st>2?PXC.gold:PXC.red,weapon:'sling',wcol:st>2?['#ffd9a0','#ff8a3d','#b84e10']:PXC.gray}),
  mage:(st,g,mood)=>pxHuman(st,mood,{robe:PXC.white,trim:PXC.purple,long:1,hat:'gat',weapon:'staff',sleeve:PXC.white,cape:st>2?PXC.purple:null}),
  archer:(st,g,mood)=>pxHuman(st,mood,{robe:PXC.dgreen,pant:PXC.brown,hat:'hood',hood:st>2?PXC.gold:PXC.green,weapon:'bow',cape:st>2?PXC.dgreen:null,
    extra:st>1?p=>p.poly([[27,4],[33,0],[30,6]],st>2?PXC.gold:PXC.red):null}),
  ninja:(st,g,mood)=>pxHuman(st,mood,{robe:PXC.navy,pant:PXC.black,hat:'mask',hood:PXC.black,weapon:'dagger',collar:PXC.black,belt:PXC.crimson,cape:st>2?PXC.crimson:null}),
  paladin:(st,g,mood)=>pxHuman(Math.max(st,2),mood,{robe:PXC.crimson,armor:PXC.gold,hat:'helm',weapon:'great',wcol:PXC.steel,cape:st>2?PXC.white:PXC.crimson})
};
const PIXCACHE={};
function pixCanvas(id,st,stage,mood){const k=id+'|'+st+'|'+stage+'|'+mood;if(PIXCACHE[k])return PIXCACHE[k];
  const p=PIXU[id](st||1,stage||0,mood||0),v=document.createElement('canvas');v.width=p.W;v.height=p.H;p.paint(v.getContext('2d'),1,0,0);return PIXCACHE[k]=v;}
/* draws a pixel character into drawSprite's -1..1 box, feet at .88 */
function drawPixInBox(c,id,st,stage,mood){const v=pixCanvas(id,st,stage,mood),h=2.0*Math.max(1,v.height/64),w=h*v.width/v.height,sm=c.imageSmoothingEnabled;
  c.imageSmoothingEnabled=false;c.drawImage(v,-w/2+.03,.9-h,w,h);c.imageSmoothingEnabled=sm;}

/* ---------- batch 2: the moon folk (beasts, a bird, goblin spirits) ---------- */
Object.assign(PXC,{pink:['#ffd0d6','#ee8e98','#b85a66'],gray2:['#c8ccd8','#9aa0b5','#6a7088'],bearB:['#c08a5e','#9c6a45','#6a4428'],
  fox:['#ffb766','#ee8a34','#b85c18'],ink:['#5a5868','#2f2f3d','#17171f'],silver:['#ffffff','#e6ebf7','#aab6d0'],
  eyeY:['#fff7b0','#ffe566','#d6b62a'],eyeB:['#cfe8ff','#3d8bff','#1f4f9a'],eyeG:['#f0ffb0','#c8e04a','#8aa020'],
  flameO:['#ffe9a8','#ff8a3d','#c0461a'],flameB:['#dff4ff','#5aa2ff','#2a5ab0'],flameY:['#fffbe0','#ffd24a','#e09a1a'],
  rock:['#c8ccda','#8b8fa3','#5f6377'],shade:['#7a62b8','#3a2a5c','#1d1433'],cream:['#fff7e6','#e8d2b0','#b89a70'],moss:['#9ad06a','#5f9a3c','#3a6a24']});
function pxEyes(p,y,col,mood,xs){for(const [i,ex] of (xs||[14,27]).entries()){const L=i===0;
  if(mood===1){p.line(ex,y+2,ex+4,y+1,PX_INK);continue;}
  p.rect(ex+1,y+1,3,2,col);p.set(ex+2,y+1,PX_INK);p.set(ex+2,y+2,PX_INK);p.set(L?ex+1:ex+3,y+1,'#ffffff');
  p.line(ex,L?y:y+1,ex+4,L?y+1:y,PX_INK);p.set(L?ex-1:ex+5,y-1,PX_INK);p.line(L?ex+1:ex+3,y+3,L?ex+3:ex+1,y+3,PX_INK);
  const st=mood===2?1:0;if(L)p.line(ex-1,y-2-st,ex+3,y-1+st,PX_INK);else p.line(ex+1,y-1+st,ex+5,y-2-st,PX_INK);}}
function pxFlame(p,cx,cy,w,h,r){p.ell(cx,cy+h*.3,w,h*.55,r);p.poly([[cx-w*.85,cy+h*.15],[cx-w*.2,cy-h*.55],[cx,cy-h],[cx+w*.35,cy-h*.45],[cx+w*.85,cy+h*.15]],r);}
/* sitting four-legged beast; o: body, belly, ears 'point'|'round', inner, tail 'bushy'|'thin'|'fox'|null, tails, eye, extra, stripes */
function pxBeast(st,mood,o){const p=Pix(46,58),B=o.body,W=o.belly||PXC.white;
  if(o.aura)for(let a=0;a<360;a+=5){const q=a*Math.PI/180,r=a%10?19.5:21.5;p.set(23+Math.cos(q)*r,29+Math.sin(q)*r*1.25,o.aura);}
  if(o.tail==='bushy'){p.poly([[33,46],[40,40],[43,29],[39,27],[37,37],[31,42]],o.tailc||B);p.ell(40.5,28,2.8,2.8,o.tip||W);}
  else if(o.tail==='thin')for(let i=0;i<15;i++)p.ell(34+i*.65,46-i*1.5+Math.sin(i/2)*1.4,1.5,1.5,B);
  else if(o.tail==='fox'){const n=o.tails||1;for(let i=0;i<n;i++){const a=n>1?-2.75+i*2.6/(n-1):-1.1;for(let t=0;t<8;t++)p.ell(29+Math.cos(a)*t*2.7,44+Math.sin(a)*t*2.7,2.9-t*.17,2.9-t*.17,t>6?W:B);}}
  p.ell(23,41,o.wide?15:13,12.5,B);p.ell(23,44,7.5,9.5,W);
  const wk=mood>=3?mood-2:0,l1=wk===1?-2:0,l2=wk===2?-2:0;p.rect(12,46,7,8+l1,B);p.rect(27,46,7,8+l2,B);p.ell(15.5,54+l1,4.5,2.6,o.paw||W);p.ell(30.5,54+l2,4.5,2.6,o.paw||W);
  if(o.stripes)for(const [x0,y0,x1,y1] of [[11,36,14,38],[11,41,14,43],[35,36,32,38],[35,41,32,43]])p.line(x0,y0,x1,y1,o.stripes);
  if(o.ears==='round'){for(const ex of [10.5,35.5]){p.ell(ex,8,5,5,B);p.ell(ex,8.5,2.4,2.4,o.inner||W);}}
  else{p.poly([[6,15],[9,0],[17,10]],B);p.poly([[40,15],[37,0],[29,10]],B);p.poly([[9,12],[9.5,5],[14,10]],o.inner||PXC.pink);p.poly([[37,12],[36.5,5],[32,10]],o.inner||PXC.pink);
    if(o.earTip){p.poly([[8,4],[9,0],[11,3]],o.earTip);p.poly([[38,4],[37,0],[35,3]],o.earTip);}}
  if(o.ruff){const R=o.ruffc||W;for(const s of [-1,1]){const X=x=>23+s*x;p.poly([[X(10),16],[X(17),20],[X(12),22],[X(17),26],[X(11),27],[X(14),31],[X(7),29]],R);}
    p.poly([[14,30],[32,30],[29,34],[26,32],[23,36],[20,32],[17,34]],R);}
  p.ell(23,18,14,12,B);
  if(o.snout){p.poly([[16,20],[30,20],[28,28],[23,31],[18,28]],o.muzzle||W);}else p.ell(23,24,8,5.5,o.muzzle||W);
  if(o.stripes){p.line(22,7,22,11,o.stripes);p.line(24,7,24,11,o.stripes);p.line(10,17,13,18,o.stripes);p.line(36,17,33,18,o.stripes);}
  pxEyes(p,15,o.eye||PXC.eyeY,mood);
  const ny=o.snout?26:21;p.rect(21,ny,4,2,o.nose||PXC.ink);p.line(23,ny+2,23,ny+3,PX_INK);
  if(mood===2||o.fangs){p.rect(20,ny+4,6,1,'#7a2030');p.poly([[20,ny+3],[21,ny+3],[20.5,ny+6]],'#ffffff');p.poly([[25,ny+3],[26,ny+3],[25.5,ny+6]],'#ffffff');}
  else{p.line(19,ny+4,22,ny+3,PX_INK);p.line(27,ny+4,24,ny+3,PX_INK);}
  if(o.claws)for(const x of [13,16,28,31])p.line(x,55,x,57,'#ffffff');
  if(o.extra)o.extra(p);p.outline(PX_OL);return p;}
function pxBird(st,mood){const p=Pix(46,58),wing=PXC.brown,wl=[0,9,11,13][st],fl=mood===3?-4:mood===4?3:0;
  for(const s of [-1,1]){p.ell(23+s*13,32+fl,6+st,wl+2,wing);if(st>2)p.ell(23+s*17,42,3,4,PXC.gold);for(let i=0;i<3;i++)p.line(23+s*(10+i*2),26+i*3,23+s*(13+i*2),40+i*3,PXC.brown[2]);}
  p.ell(23,37,9,13,PXC.brown);p.ell(23,41,5.5,8.5,PXC.cream);for(const y of [36,40,44])p.line(21,y,25,y+1,PXC.cream[2]);
  for(const x of [18,26]){p.line(x,49,x,54,PXC.gold[2]);p.line(x,54,x-2,55,PXC.gold[2]);p.line(x,54,x+2,55,PXC.gold[2]);}
  if(st>1)p.poly([[17,10],[19,0],[22,8],[24,-1],[26,8],[29,1],[29,11]],st>2?PXC.gold:PXC.brown);
  p.ell(23,17,9,9,PXC.white);for(const ex of [18,26])p.ell(ex+1,15,3,3,PXC.eyeY);pxEyes(p,14,PXC.eyeY,mood,[16,25]);
  if(mood===2){p.poly([[19,19],[27,19],[23,23]],PXC.gold);p.poly([[20,24],[26,24],[23,27]],['#ffd28a','#e09a1a','#a06a10']);}else p.poly([[19,19],[27,19],[23,26]],PXC.gold);
  p.outline(PX_OL);return p;}
function pxGoblinFire(st,mood){const p=Pix(46,58),o=st>2?PXC.flameB:PXC.flameO,inner=st>2?PXC.silver:PXC.flameY;
  if(st>1){pxFlame(p,9,40,6,12,o);pxFlame(p,37,40,6,12,o);}
  pxFlame(p,23,32,14,24,o);p.poly([[21,10],[23,3],[25,10]],PXC.white);pxFlame(p,23,40,8,13,inner);
  pxEyes(p,34,PXC.eyeY,mood,[15,26]);p.set(13,39,'#ff9a8a');p.set(14,39,'#ff9a8a');p.set(32,39,'#ff9a8a');p.set(33,39,'#ff9a8a');
  if(mood===2)p.rect(21,41,5,2,'#7a2030');else p.line(21,41,25,41,PX_INK);p.outline(PX_OL);return p;}
function pxRockGob(st,mood){const p=Pix(46,58),cr=st>2?PXC.gold:['#dff8ff','#6fe3ff','#2aa0c0'];
  p.poly([[6,55],[3,30],[10,13],[23,9],[36,13],[43,28],[40,55]],PXC.rock);p.poly([[10,13],[23,9],[36,13],[30,19],[16,19]],['#e0e4ee','#b8bcca','#8b8fa3']);
  p.line(10,14,16,22,PXC.rock[2]);p.line(16,22,13,30,PXC.rock[2]);p.line(33,19,36,30,PXC.rock[2]);
  p.poly([[20,10],[23,0],[26,10]],PXC.white);
  if(st===1)p.ell(15,13,6,2.5,PXC.moss);else{p.poly([[12,14],[13,2],[17,12]],cr);p.poly([[30,12],[34,3],[35,14]],cr);if(st>2)p.poly([[5,26],[1,15],[9,22]],cr);}
  p.ell(4,40,3,4,PXC.rock);p.ell(42,40,3,4,PXC.rock);pxEyes(p,26,PXC.eyeY,mood,[14,27]);
  if(mood===2)p.rect(18,36,10,3,'#3a2030');else p.line(19,36,27,36,PX_INK);p.outline(PX_OL);return p;}
function pxShade(st,mood){const p=Pix(46,58),S=PXC.shade;
  if(st>2)for(let a=0;a<360;a+=6){const q=a*Math.PI/180;p.set(23+Math.cos(q)*20,28+Math.sin(q)*24,'#8a6af0');}
  const pts=[[5,54],[4,24],[10,8],[23,4],[36,8],[42,24],[41,54]];for(let x=41;x>=5;x-=4)pts.push([x-2,x%8?49:55]);p.poly(pts,S);
  p.ell(15,18,4,7,['#9a82d8','#6a52a8','#3a2a5c']);p.poly([[14,8],[17,0],[20,8]],PXC.white);p.poly([[27,8],[30,0],[33,8]],PXC.white);
  if(st>1){p.ell(5,40,4,8,S);p.ell(41,40,4,8,S);}
  const ec=st>2?PXC.eyeY:PXC.silver;for(const ex of [15,27]){if(mood===1){p.line(ex,24,ex+4,24,'#fff');continue;}p.ell(ex+2,23,3.4,mood===2?2:4,ec);p.rect(ex+2,22,1,3,'#6a4bd0');}
  if(mood===2)p.rect(19,32,8,3,'#0c0818');p.outline(PX_OL);return p;}
Object.assign(PIXU,{
  wolf:(st,g,mood)=>pxBeast(st,mood,{body:PXC.gray2,belly:PXC.silver,tail:'bushy',eye:st>2?PXC.eyeB:PXC.eyeY,aura:st>2?'#bfe6ff':null,
    extra:st>1?p=>{p.rect(13,28,20,3,st>2?PXC.gold:PXC.red);p.line(14,13,18,19,'#e0455a');}:null}),
  bear:(st,g,mood)=>pxBeast(st,mood,{body:PXC.bearB,belly:PXC.cream,ears:'round',inner:PXC.cream,wide:1,
    extra:p=>{if(st>1){p.ell(10,31,5,4,PXC.steel);p.ell(36,31,5,4,PXC.steel);}if(st>2){p.poly([[15,8],[15,2],[19,5],[23,0],[27,5],[31,2],[31,8]],PXC.gold);}}}),
  fox:(st,g,mood)=>pxBeast(st,mood,{body:PXC.fox,belly:PXC.white,tail:'fox',tails:[0,3,5,9][st],earTip:PXC.ink,
    extra:p=>{p.ell(6,46,3.2,3.2,PXC.purple);p.set(5,45,'#fff');if(st>2)p.poly([[21,6],[23,2],[25,6],[23,10]],PXC.gold);}}),
  panther:(st,g,mood)=>pxBeast(st,mood,{body:PXC.ink,belly:['#7a7a8c','#55556a','#33334a'],tail:'thin',eye:st>2?PXC.eyeY:PXC.eyeG,muzzle:['#6a6a7c','#4a4a5c','#2a2a3a'],
    nose:PXC.pink,aura:st>2?'#8a5cf0':null,extra:st>1?p=>{p.rect(13,28,20,3,PXC.purple);p.ell(23,30,2,2,st>2?PXC.gold:['#dff8ff','#6fe3ff','#2aa0c0']);}:null}),
  wolfking:(st,g,mood)=>pxBeast(st,mood,{body:PXC.silver,belly:PXC.white,tail:'bushy',tip:PXC.eyeB,eye:PXC.eyeB,inner:['#cfe0ff','#9fb4ff','#6a80d0'],aura:'#bfe6ff',
    extra:p=>{p.set(22,9,'#ffc94d');p.set(23,8,'#ffc94d');p.set(24,9,'#ffc94d');p.set(22,10,'#ffc94d');p.rect(13,28,20,3,PXC.gold);if(st>1)p.poly([[15,6],[15,0],[19,3],[23,-1],[27,3],[31,0],[31,6]],PXC.gold);}}),
  hawk:(st,g,mood)=>pxBird(st,mood),
  ember:(st,g,mood)=>pxGoblinFire(st,mood),
  rock:(st,g,mood)=>pxRockGob(st,mood),
  shade:(st,g,mood)=>pxShade(st,mood)});

/* ---------- batch 3: the dawn folk (spirits of wind and lightning, dragons, a serpent) ---------- */
Object.assign(PXC,{mint:['#e6fffb','#a9efe6','#5fbfb4'],volt:['#fffbe0','#ffe566','#e0a81a'],dgn:['#a8e07a','#6ab04a','#3f7a2a'],
  dgnBelly:['#fff4c8','#f3e3a0','#c8b06a'],sal:['#ffb070','#f07a2f','#b04a10'],star:['#c8d0ff','#7a86f0','#4a50b0'],
  teal:['#8ad6d6','#3a9a9a','#1f6060'],ruby:['#ff9080','#d0403a','#8a1e1e'],pearl:['#ffffff','#dff6ff','#9fd0e6']});
function pxDragon(st,mood,o){const p=Pix(46,58),B=o.body,ws=o.wings||0;
  if(o.aura)for(let a=0;a<360;a+=5){const q=a*Math.PI/180,r=a%10?20:22;p.set(23+Math.cos(q)*r,29+Math.sin(q)*r*1.2,o.aura);}
  if(ws)for(const s of [-1,1]){const X=x=>23+s*x;p.poly([[X(9),30],[X(12+ws*.9),12-ws*.3],[X(14+ws),34],[X(10+ws*.6),33],[X(12+ws*.7),44],[X(9),40]],o.wing||B);
    p.line(X(9),30,X(12+ws*.9),12-ws*.3,(o.wing||B)[2]);p.line(X(10),32,X(14+ws),34,(o.wing||B)[2]);}
  p.poly([[31,50],[40,49],[44,42],[42,38],[39,44],[32,45]],B);if(o.tailFire)pxFlame(p,42,36,3,6,PXC.flameO);else p.poly([[42,38],[45,34],[44,41]],o.horn);
  p.ell(23,41,12,12,B);p.ell(23,44,7,9,o.belly||PXC.dgnBelly);for(const y of [39,43,47])p.line(18,y,28,y,(o.belly||PXC.dgnBelly)[2]);
  const wk=mood>=3?mood-2:0,l1=wk===1?-2:0,l2=wk===2?-2:0;p.rect(13,47,6,7+l1,B);p.rect(27,47,6,7+l2,B);for(const x of [13,16])p.set(x,54+l1,'#fff');for(const x of [27,30])p.set(x,54+l2,'#fff');
  p.poly([[13,13],[9,1],[17,9]],o.horn);p.poly([[33,13],[37,1],[29,9]],o.horn);
  p.ell(23,18,12,10.5,B);for(const x of [19,23,27])p.poly([[x-2,9],[x,4],[x+2,9]],o.ridge||(B===PXC.dgn?PXC.dgnBelly:o.horn));
  p.ell(23,24,8,5,o.snout||o.belly||PXC.dgnBelly);p.set(20,22,PX_INK);p.set(26,22,PX_INK);
  pxEyes(p,14,o.eye||PXC.eyeY,mood,[14,27]);
  if(mood===2){p.rect(19,26,8,2,'#7a2030');p.set(19,26,'#fff');p.set(26,26,'#fff');}else p.line(19,27,27,27,PX_INK);
  if(o.extra)o.extra(p);p.outline(PX_OL);return p;}
function pxCrown(p,y){p.poly([[16,y+6],[16,y],[19.5,y+3],[23,y-1],[26.5,y+3],[30,y],[30,y+6]],PXC.gold);p.set(23,y+3,'#e0455a');}
function pxSerpent(st,mood){const p=Pix(46,58),B=PXC.teal;
  for(let a=0;a<360;a+=12){const q=a*Math.PI/180;p.set(23+Math.cos(q)*21,30+Math.sin(q)*25,'rgba(191,239,255,.9)');}
  for(let i=0;i<14;i++){const t=i/13,x=23+Math.sin(t*Math.PI*2.2)*11,y=54-t*30;p.ell(x,y,6.5-t*1.5,4.5,B);}
  for(let i=0;i<14;i+=2){const t=i/13,x=23+Math.sin(t*Math.PI*2.2)*11,y=54-t*30;p.line(x-2,y+2,x+2,y+2,PXC.pearl[1]);}
  p.ell(23,17,10,9,B);p.ell(23,23,7,4.5,PXC.pearl);p.poly([[15,11],[11,2],[19,8]],PXC.white);p.poly([[31,11],[35,2],[27,8]],PXC.white);
  for(const s of [-1,1])p.line(23+s*6,24,23+s*14,30+(st>1?4:0),PXC.pearl[2]);
  pxEyes(p,13,st>2?PXC.eyeY:PXC.eyeB,mood,[14,27]);if(mood===2)p.rect(20,25,6,2,'#7a2030');
  p.ell(8,40,3.4,3.4,PXC.pearl);p.set(7,39,'#fff');if(st>2)pxCrown(p,2);p.outline(PX_OL);return p;}
function pxCloud(st,mood){const p=Pix(46,58),M=PXC.mint;
  if(st>2)for(let a=0;a<360;a+=6){const q=a*Math.PI/180;p.set(23+Math.cos(q)*21,32+Math.sin(q)*12,'#ffc94d');}
  p.poly([[17,44],[29,44],[25,57],[22,57]],M);for(const [x,y,r] of [[13,32,9],[33,32,9],[23,24,11],[23,38,10]])p.ell(x,y,r,r,M);
  for(let i=0;i<8;i++){const q=Math.PI*.9+i*.42;p.set(21+Math.cos(q)*5,17+Math.sin(q)*5,'#4fbfb4');}
  if(st>1)for(const s of [-1,1])for(let i=0;i<10;i++){const q=i*.6;p.set(23+s*(19+Math.cos(q)*3),24+Math.sin(q)*3,st>2?'#ffc94d':'#7fe0d6');}
  pxEyes(p,28,PXC.ink,mood,[15,26]);p.set(12,34,'#ff9a8a');p.set(13,34,'#ff9a8a');p.set(32,34,'#ff9a8a');p.set(33,34,'#ff9a8a');
  if(mood===2)p.rect(21,35,5,2,'#3a6a6a');else p.line(21,35,25,35,PX_INK);p.outline(PX_OL);return p;}
function pxVolt(st,mood){const p=Pix(46,58),n=[0,8,10,12][st],V=st>2?['#fff4d0','#ffb347','#c0701a']:PXC.volt;
  for(let i=0;i<n;i++){const a=i*Math.PI*2/n,b=Math.PI/n;p.poly([[23+Math.cos(a-b)*11,32+Math.sin(a-b)*11],[23+Math.cos(a)*21,32+Math.sin(a)*21],[23+Math.cos(a+b)*11,32+Math.sin(a+b)*11]],V);}
  p.ell(23,32,13,13,st>2?['#ffffff','#fffbe0','#f0d880']:PXC.volt);p.poly([[25,20],[18,31],[23,31],[20,40],[29,28],[24,28]],['#ffd28a','#ff9a2f','#c0601a']);
  pxEyes(p,30,PXC.ink,mood,[15,26]);if(mood===2)p.rect(21,38,5,2,'#7a2030');else p.line(21,38,25,38,PX_INK);
  if(st>1)for(let i=0;i<st*2;i++){const a=i*Math.PI/st+.4;p.ell(23+Math.cos(a)*21,32+Math.sin(a)*21,1.3,1.3,'#ffffff');}
  p.outline(PX_OL);return p;}
Object.assign(PIXU,{
  wind:(st,g,mood)=>pxCloud(st,mood),
  bolt:(st,g,mood)=>pxVolt(st,mood),
  whelp:(st,g,mood)=>pxDragon(st,mood,{body:PXC.dgn,horn:st>2?PXC.gold:PXC.white,wings:[0,6,8,10][st],
    extra:p=>{if(st>1)p.poly([[18,30],[28,30],[26,36],[23,38],[20,36]],st>2?PXC.gold:PXC.steel);if(st>2){pxCrown(p,0);pxFlame(p,38,22,3,6,PXC.flameO);}}}),
  salam:(st,g,mood)=>pxDragon(st,mood,{body:PXC.sal,belly:['#ffe8c0','#ffd08a','#c89a50'],horn:PXC.ruby,ridge:PXC.flameY,tailFire:1,
    extra:p=>{const f=st>2?PXC.flameB:PXC.flameO;pxFlame(p,17,5,2.6,5,f);pxFlame(p,23,3,3,6,f);pxFlame(p,29,5,2.6,5,f);if(st>1)p.ell(6,44,2.8,2.8,PXC.flameY);}}),
  stardrake:(st,g,mood)=>pxDragon(st,mood,{body:PXC.star,belly:['#ffffff','#dfe4ff','#a8b0e8'],horn:PXC.gold,wing:['#8a96ff','#5a64d0','#353c90'],wings:[0,9,11,13][st],aura:st>2?'#c8d0ff':null,
    extra:p=>{for(const [x,y] of [[17,40],[29,38],[23,46]])p.set(x,y,'#fff');if(st>1){p.set(3,8,'#ffc94d');p.set(2,9,'#ffc94d');p.set(4,9,'#ffc94d');p.set(3,10,'#ffc94d');}if(st>2)pxCrown(p,0);}}),
  wyvern:(st,g,mood)=>pxSerpent(st,mood),
  elder:(st,g,mood)=>pxDragon(st,mood,{body:PXC.ruby,belly:PXC.dgnBelly,horn:PXC.gold,ridge:PXC.gold,wing:['#e88070','#a83030','#6a1a1a'],wings:[0,12,13,14][st],aura:'#ffd28a',
    extra:p=>{for(const s of [-1,1])p.line(23+s*5,25,23+s*14,31,PXC.gold[0]);if(st>1)pxCrown(p,0);}})});

/* ---------- batch 4: the five generals and the Golden Star; batch 5: enemies and mid bosses ---------- */
Object.assign(PXC,{dsteel:['#b8c0d0','#6f7890','#3f465c'],zomb:['#c0e8a8','#8fce7a','#4f8a40'],bone:['#ffffff','#f1f0e6','#b8b4a0'],
  ogreS:['#f08a80','#d85a50','#8a2a24'],goblin:['#a8d0f0','#6fa8dc','#3a6a9a'],tigerP:['#fff2a0','#e8c94d','#a8862a'],
  bat:['#b08fe6','#8d5fd0','#5a3490'],bomb:['#6a6a7a','#2a2a36','#121218'],dblue:['#6a8ad0','#3a50a0','#1f2a60'],ghost:['#7a86c8','#3a4470','#1d2240'],
  lgold:['#fffbe0','#f2e2a0','#c8b06a']});
const pxBeard=(p,c)=>{p.poly([[15,20],[26,20],[24,26],[20.5,28],[17,26]],c);p.line(18,21,23,21,'#9c4a3a');};
function pxGoblinGen(st,mood){const p=Pix(46,58),S=PXC.goblin;
  p.rect(12,44,8,8,PXC.tigerP);p.rect(26,44,8,8,PXC.tigerP);for(const x of [14,18,28,32])p.line(x,45,x,51,PX_INK);p.ell(15.5,54,4.5,2.6,S);p.ell(30.5,54,4.5,2.6,S);
  p.ell(23,36,15,11,S);p.poly([[9,40],[37,40],[36,48],[10,48]],PXC.tigerP);for(const x of [13,19,25,31])p.line(x,41,x+2,47,PX_INK);
  p.rect(37,6,4,28,PXC.wood);p.ell(39,9,5,7,PXC.wood);for(const [x,y] of [[36,6],[42,9],[37,13],[41,15]])p.set(x,y,'#ffffff');p.ell(39,34,3.5,3.5,S);p.ell(6,36,3.5,3.5,S);
  p.ell(23,17,12,11,S);p.poly([[20,7],[23,-1],[26,7]],PXC.bone);
  for(const ex of [14,27])p.ell(ex+2.5,16,4,3.6,PXC.white);pxEyes(p,14,PXC.eyeY,mood,[14,27]);
  p.rect(17,23,12,3,'#7a2030');p.set(18,22,'#fff');p.set(19,22,'#fff');p.set(27,22,'#fff');p.set(26,22,'#fff');
  p.outline(PX_OL);return p;}
function pxGhostGen(st,mood){const p=Pix(46,58),G=PXC.ghost;
  p.rect(39,4,2,52,PXC.wood);p.poly([[37,6],[40,-2],[43,6]],PXC.steel);
  const pts=[[6,54],[5,24],[11,10],[23,7],[35,10],[41,24],[40,54]];for(let x=40;x>=6;x-=4)pts.push([x-2,x%8?49:55]);p.poly(pts,G);
  p.poly([[11,26],[35,26],[33,42],[13,42]],PXC.dsteel);p.line(23,27,23,41,PXC.dsteel[2]);
  p.ell(23,12,12,8,PXC.black);p.rect(10,13,26,2,PXC.black);p.poly([[21,5],[23,-1],[25,5]],PXC.gold);
  for(const ex of [16,27]){if(mood===1){p.line(ex,19,ex+3,19,'#ffffff');continue;}p.ell(ex+1.5,19,2.4,3,['#ffffff','#bfe6ff','#6a9ad0']);}
  p.ell(39,36,3,3,G);p.outline(PX_OL);return p;}
function pxSerpentC(st,mood,B,eye){const p=Pix(46,58);
  p.ell(23,6,14,4,['#e8eef8','#a8b4c8','#6a7488']);for(let i=0;i<6;i++)p.line(14+i*3.5,10,13+i*3.5,13,'#9fe3ff');
  for(let i=0;i<14;i++){const t=i/13,x=23+Math.sin(t*Math.PI*2.2)*11,y=56-t*28;p.ell(x,y,6.5-t*1.5,4.5,B);}
  for(let i=0;i<14;i+=2){const t=i/13,x=23+Math.sin(t*Math.PI*2.2)*11,y=56-t*28;p.line(x-2,y+2,x+2,y+2,PXC.pearl[1]);}
  p.ell(23,21,10,8.5,B);p.ell(23,26,7,4,PXC.pearl);p.poly([[15,15],[11,7],[19,12]],PXC.gold);p.poly([[31,15],[35,7],[27,12]],PXC.gold);
  for(const s of [-1,1])p.line(23+s*6,27,23+s*15,33,PXC.gold[0]);pxEyes(p,17,eye,mood,[14,27]);if(mood===2)p.rect(20,28,6,2,'#7a2030');
  p.ell(7,44,3.6,3.6,PXC.pearl);p.outline(PX_OL);return p;}
function pxBat(st,mood){const p=Pix(46,58),B=PXC.bat;
  for(const s of [-1,1]){const X=x=>23+s*x;p.poly([[X(7),30],[X(22),14],[X(21),34],[X(17),30],[X(15),38],[X(11),33],[X(9),38]],['#9a72d8','#7a4bb0','#4a2a80']);p.line(X(7),30,X(22),14,'#4a2a80');}
  p.poly([[14,22],[15,10],[20,19]],B);p.poly([[32,22],[31,10],[26,19]],B);p.ell(23,32,10,10,B);p.ell(23,37,5,4,['#d0b8f6','#b08fe6','#8d5fd0']);
  pxEyes(p,27,['#ffb0c0','#ff4d6a','#a01a30'],mood,[16,25]);p.rect(20,35,7,1,PX_INK);p.set(20,36,'#fff');p.set(26,36,'#fff');p.outline(PX_OL);return p;}
function pxBomb(st,mood){const p=Pix(46,58);p.line(23,16,27,8,PXC.wood[2]);p.line(24,16,28,8,PXC.wood[1]);
  for(let a=0;a<360;a+=45){const q=a*Math.PI/180;p.line(28,7,28+Math.cos(q)*4,7+Math.sin(q)*4,a%90?'#ffd24a':'#ff8a3d');}
  p.ell(23,37,17,17,PXC.bomb);p.ell(17,30,4,3,['#9a9aaa','#6a6a7a','#4a4a5a']);p.rect(18,17,10,4,PXC.dsteel);
  pxEyes(p,33,['#ffb0c0','#ff4d6a','#a01a30'],mood,[14,27]);for(let i=0;i<4;i++)p.line(17+i*3,44,18+i*3,42+(i%2)*2,'#ffffff');
  p.ell(13,54,4,2.4,PXC.boot);p.ell(33,54,4,2.4,PXC.boot);p.outline(PX_OL);return p;}
function pxDemon(st,mood,B,crown){const p=Pix(46,58),D=[B[1],B[2],'#120a12'];
  for(const s of [-1,1]){const X=x=>23+s*x;p.poly([[X(8),26],[X(22),8],[X(21),30],[X(17),27],[X(16),36],[X(10),32]],D);p.line(X(8),26,X(22),8,'#120a12');}
  p.rect(12,46,8,8,D);p.rect(26,46,8,8,D);p.ell(23,38,14,12,B);for(const y of [34,38,42])p.line(17,y,29,y,B[0]);
  p.poly([[13,12],[6,0],[16,7]],PXC.bone);p.poly([[33,12],[40,0],[30,7]],PXC.bone);p.ell(23,17,12,11,B);
  for(const ex of [14,27])p.poly([[ex,15],[ex+5,13],[ex+5,18]],PXC.eyeY);if(mood===2)p.rect(17,23,12,3,'#3a0f18');else p.line(17,24,29,23,PX_INK);
  p.poly([[17,23],[19,23],[18,27]],PXC.white);p.poly([[27,23],[29,23],[28,27]],PXC.white);if(crown)pxCrown(p,0);p.outline(PX_OL);return p;}
Object.assign(PIXU,{
  mugyeol:(st,g,mood)=>pxHuman(Math.max(st,2),mood,{robe:PXC.navy,armor:PXC.dsteel,hat:'helm',helmC:PXC.dsteel,plume:PXC.crimson,weapon:'sword',wcol:PXC.steel,cape:PXC.crimson,
    faceFn:(p,m)=>{pxFace(p,20.5,15,{hurt:m===1,noMouth:1,noCheek:1});pxBeard(p,PXC.hair);}}),
  duduri:(st,g,mood)=>pxGoblinGen(st,mood),
  baeksan:(st,g,mood)=>pxBeast(st,mood,{body:PXC.silver,belly:PXC.white,tail:'bushy',tailc:PXC.silver,tip:PXC.ink,stripes:PX_INK,eye:PXC.eyeB,
    extra:p=>{p.rect(13,28,20,3,PXC.dblue);p.ell(23,30,2,2,PXC.gold);}}),
  mireu:(st,g,mood)=>pxSerpentC(st,mood,PXC.dblue,PXC.eyeY),
  gaon:(st,g,mood)=>pxGhostGen(st,mood),
  geumbyeol:(st,g,mood)=>pxHuman(3,mood,{robe:PXC.gold,trim:PXC.white,long:1,sleeve:PXC.gold,hair:PXC.lgold,hat:null,weapon:'none',cape:PXC.gold,halo:1,eye:'#c98f1a',
    extra:p=>{p.poly([[10,9],[7,34],[12,30]],PXC.lgold);p.poly([[31,9],[34,34],[29,30]],PXC.lgold);pxCrown(p,1);}}),
  grunt:(st,g,mood)=>pxHuman(1,mood,{robe:['#9a7ab8','#6b4f8a','#3f2a5a'],pant:['#7a6a8a','#4a3a5a','#2a1f3a'],skin:PXC.zomb,hair:PXC.dgreen,weapon:'none',collar:['#9a7ab8','#6b4f8a','#3f2a5a'],
    faceFn:(p,m)=>{p.line(14,15,17,18,PX_INK);p.line(17,15,14,18,PX_INK);p.rect(23,15,3,3,'#ffffff');p.set(24,16,PX_INK);p.line(16,21,25,22,PX_INK);p.line(27,10,30,12,PXC.zomb[2]);}}),
  bat:(st,g,mood)=>pxBat(st,mood),
  skull:(st,g,mood)=>pxHuman(1,mood,{robe:PXC.black,pant:PXC.black,skin:PXC.bone,hat:'hood',hood:PXC.black,weapon:'bow',collar:PXC.black,
    faceFn:(p,m)=>{p.rect(15,15,4,4,PX_INK);p.rect(23,15,4,4,PX_INK);p.set(16,16,'#ff4d6a');p.set(24,16,'#ff4d6a');p.set(20,20,PX_INK);p.set(21,20,PX_INK);for(let x=16;x<26;x+=2)p.line(x,23,x,24,PX_INK);}}),
  ogre:(st,g,mood)=>pxHuman(1,mood,{robe:PXC.brown,pant:PXC.ogreS,skin:PXC.ogreS,hair:PXC.hair,weapon:'great',wcol:PXC.wood,collar:PXC.ogreS,
    faceFn:(p,m)=>{pxFace(p,20.5,15,{hurt:m===1,angry:1,noCheek:1});p.poly([[15,20],[17,20],[16,24]],PXC.bone);p.poly([[24,20],[26,20],[25,24]],PXC.bone);p.poly([[12,6],[9,-1],[15,4]],PXC.bone);p.poly([[29,6],[32,-1],[26,4]],PXC.bone);}}),
  shield:(st,g,mood)=>pxHuman(1,mood,{robe:PXC.dsteel,skin:PXC.zomb,hat:'helm',helmC:PXC.dsteel,plume:PXC.dsteel,weapon:'sword',wcol:PXC.steel,
    extra:p=>{p.poly([[0,26],[13,26],[13,42],[6.5,50],[0,42]],['#dfe6f2','#b8c2d8','#7a849a']);p.poly([[6,31],[9,37],[6,43],[3,37]],PXC.crimson);}}),
  shaman:(st,g,mood)=>pxHuman(1,mood,{robe:['#8a6aaa','#5a3f7a','#33224a'],long:1,sleeve:['#8a6aaa','#5a3f7a','#33224a'],skin:['#f0e4c8','#d9c9a8','#a89870'],hat:'band',
    band:['#7af0c0','#3ad29f','#1f8a64'],hair:PXC.black,weapon:'staff',
    faceFn:(p,m)=>{pxFace(p,20.5,15,{eye:'#1f8f6a',hurt:m===1,noCheek:1,noMouth:1});p.line(14,19,18,19,'#c0392b');p.line(23,19,27,19,'#c0392b');p.poly([[18,21],[23,21],[20.5,25]],'#c0392b');}}),
  bomber:(st,g,mood)=>pxBomb(st,mood),
  boss5:(st,g,mood)=>pxDemon(st,mood,['#b89af0','#6a3fc0','#3a1f80'],0),
  boss10:(st,g,mood)=>pxDemon(st,mood,['#f09aa8','#b3334a','#6a1424'],0),
  boss15:(st,g,mood)=>pxDemon(st,mood,['#9ae0c0','#23805a','#0f4a32'],0),
  boss20:(st,g,mood)=>pxDemon(st,mood,['#8a7ab8','#2a2440','#141024'],1)});
