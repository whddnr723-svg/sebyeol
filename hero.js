/* ---------- style C: tall, sharp, cleanly painted people (ASCII only).
   48x64 canvas, feet near y=62. Clean 3-tone ramps (no dither), hue-shifted shadows, rim light, coloured outline.
   mood: 0 idle, 1 hurt, 2 attack, 3/4 walking frames. ---------- */
function hx(c){if(typeof c!=='string'||c[0]!=='#')return null;return [parseInt(c.slice(1,3),16),parseInt(c.slice(3,5),16),parseInt(c.slice(5,7),16)];}
const toHex=a=>'#'+a.map(v=>Math.max(0,Math.min(255,Math.round(v))).toString(16).padStart(2,'0')).join('');
function ramp(base){const b=hx(base);return [toHex(b.map((v,i)=>v+(255-v)*.38+[12,6,-10][i])),base,toHex(b.map((v,i)=>v*.58+[10,14,42][i]))];}
function Pix2(W,H){
  let px=new Array(W*H).fill(null);
  const set=(x,y,c)=>{x=Math.floor(x);y=Math.floor(y);if(x>=0&&y>=0&&x<W&&y<H&&c)px[y*W+x]=c;};
  const tone=(v,p)=>typeof p==='string'?p:v>.34?p[2]:v<-.42?p[0]:p[1];
  const ell=(cx,cy,rx,ry,p)=>{for(let y=Math.floor(cy-ry);y<=cy+ry;y++)for(let x=Math.floor(cx-rx);x<=cx+rx;x++){const nx=(x+.5-cx)/rx,ny=(y+.5-cy)/ry;if(nx*nx+ny*ny<=1)set(x,y,tone(nx*.75+ny*.55,p));}};
  const rect=(x0,y0,w,h,p)=>{for(let y=y0;y<y0+h;y++)for(let x=x0;x<x0+w;x++)set(x,y,tone(((x+.5-x0)/w-.5)*1.7+((y+.5-y0)/h-.5)*.4,p));};
  const poly=(pts,p)=>{let x0=1e9,x1=-1e9,y0=1e9,y1=-1e9;for(const [x,y] of pts){x0=Math.min(x0,x);x1=Math.max(x1,x);y0=Math.min(y0,y);y1=Math.max(y1,y);}
    for(let y=Math.floor(y0);y<=y1;y++)for(let x=Math.floor(x0);x<=x1;x++){let ins=false;const qx=x+.5,qy=y+.5;
      for(let i=0,j=pts.length-1;i<pts.length;j=i++){const [xi,yi]=pts[i],[xj,yj]=pts[j];if((yi>qy)!==(yj>qy)&&qx<(xj-xi)*(qy-yi)/(yj-yi)+xi)ins=!ins;}
      if(ins)set(x,y,tone(((qx-x0)/(x1-x0||1)-.5)*1.7+((qy-y0)/(y1-y0||1)-.5)*.4,p));}};
  const line=(x0,y0,x1,y1,c)=>{const n=Math.max(Math.abs(x1-x0),Math.abs(y1-y0))||1;for(let i=0;i<=n;i++)set(Math.round(x0+(x1-x0)*i/n),Math.round(y0+(y1-y0)*i/n),c);};
  const get=(x,y)=>x>=0&&y>=0&&x<W&&y<H?px[y*W+x]:null;
  const rim=k=>{const o=px.slice();for(let y=0;y<H;y++)for(let x=0;x<W;x++){const c=px[y*W+x];if(!c)continue;const a=hx(c);if(!a)continue;
      if(!get(x-1,y)||!get(x,y-1))o[y*W+x]=toHex(a.map(v=>v+(255-v)*k));}px=o;};
  const selout=()=>{const o=px.slice();for(let y=0;y<H;y++)for(let x=0;x<W;x++){if(px[y*W+x])continue;
      const n=[[x+1,y,.26],[x,y+1,.24],[x-1,y,.2],[x,y-1,.2]].map(([a,b,k])=>[get(a,b),k]).find(q=>q[0]);if(!n)continue;
      const a=hx(n[0]);o[y*W+x]=a?toHex(a.map((v,i)=>v*n[1]+[10,6,24][i])):'#2a1a14';}px=o;};
  const paint=(c,s,ox,oy)=>{for(let y=0;y<H;y++)for(let x=0;x<W;x++){const k=px[y*W+x];if(k){c.fillStyle=k;c.fillRect(ox+x*s,oy+y*s,s,s);}}};
  return {W,H,set,ell,rect,poly,line,get,rim,selout,paint};
}
function pxHero(o,mood){
  mood=mood||0;const p=Pix2(48,64),I='#2a1830',r=c=>typeof c==='string'&&c[0]==='#'?ramp(c):c;
  const S=r(o.skin||'#efc58a'),robe=r(o.robe),trim=r(o.trim||o.robe),skirt=r(o.skirt||o.robe),pant=r(o.pant||'#2f3560'),boot=r(o.boot||'#4a3a30'),belt=r(o.belt||'#8a5a32'),
    knot=r(o.knot||o.belt||'#8a5a32'),hair=r(o.hair||'#2c2832'),cape=o.cape&&r(o.cape),armor=o.armor&&r(o.armor),paul=o.pauldron&&r(o.pauldron),helm=o.helm&&r(o.helm),
    wpn=r(o.wcol||'#d6dee9'),guard=r(o.guard||'#8a6a4a'),hilt=r(o.hilt||'#4a3a30'),tassel=o.tassel&&r(o.tassel),W=o.weapon||'blade';
  const walk=mood>=3?mood-2:0,lL=walk===1?-2:0,lR=walk===2?-2:0,atk=mood===2,ay=atk?-4:0;
  /* cape and ribbons blowing right */
  if(cape){p.poly([[15,23],[33,23],[45,48],[40,47],[37,56],[31,52],[26,60],[12,60]],cape);p.line(34,30,40,46,cape[2]);p.line(28,34,30,52,cape[2]);p.line(20,40,19,56,cape[2]);}
  if(o.ribbon){const rb=r(o.ribbon);p.poly([[28,6],[40,3],[44,7],[36,8]],rb);p.poly([[28,8],[38,11],[41,15],[33,12]],rb);}
  if(W==='blade'&&!o.noSheath){p.poly([[13,36],[16,37],[9,52],[6,51]],r(o.sheath||'#3a2a2e'));p.line(12,40,14,41,guard[1]);}
  /* legs or a long robe */
  if(o.long){p.poly([[14,35],[34,35],[39,60],[9,60]],skirt);p.line(24,36,24,60,trim[1]);p.line(19,40,16,59,skirt[2]);p.line(29,40,32,59,skirt[2]);
    p.ell(17,61,4,2,boot);p.ell(31,61,4,2,boot);}
  else{p.poly([[17,44],[23,44],[21,57+lL],[15,57+lL]],pant);p.poly([[26,44],[32,44],[36,57+lR],[30,57+lR]],pant);p.line(18,50+lL,20,50+lL,pant[0]);p.line(31,50+lR,33,50+lR,pant[0]);
    p.poly([[13,56+lL],[22,56+lL],[22,62+lL],[12,62+lL]],boot);p.poly([[29,56+lR],[38,56+lR],[39,62+lR],[29,62+lR]],boot);p.line(13,56+lL,22,56+lL,boot[0]);p.line(29,56+lR,38,56+lR,boot[0]);
    p.poly([[15,35],[33,35],[37,49],[11,49]],skirt);
    if(o.plates)for(const y of [39,43,47]){p.line(13,y,35,y,skirt[2]);p.line(13,y-1,35,y-1,skirt[0]);}else{p.line(19,37,17,48,skirt[2]);p.line(29,37,31,48,skirt[2]);}
    p.line(24,36,24,49,skirt[2]);}
  /* torso with crossed collar, armour, emblem, belt and knot */
  p.poly([[14,21],[34,21],[33,27],[31,36],[17,36],[15,27]],robe);p.line(18,30,20,35,robe[2]);p.line(30,30,28,35,robe[2]);
  if(armor){p.poly([[16,24],[32,24],[30,35],[18,35]],armor);for(const y of [27,30,33]){for(let x=18;x<31;x+=3)p.set(x,y,armor[2]);p.line(18,y-1,30,y-1,armor[0]);}}
  p.poly([[19,21],[23,21],[29,33],[26,33]],trim);p.poly([[29,21],[25,21],[22,26],[24,27]],trim);
  if(o.emblem){p.ell(24,29,3,3,r('#ffc94d'));p.set(24,29,'#fff6c8');for(const [dx,dy] of [[0,-4],[4,0],[0,4],[-4,0]])p.set(24+dx,29+dy,'#ffe58a');}
  p.rect(15,34,19,3,belt);p.line(15,34,33,34,belt[0]);p.ell(18,36,1.6,1.6,knot);p.line(17,37,16,43,knot[1]);p.line(19,37,19,44,knot[1]);
  if(paul){p.ell(14,24,5,4,paul);p.ell(34,24,5,4,paul);p.line(10,26,18,26,paul[2]);p.line(30,26,38,26,paul[2]);p.set(12,22,'#ffffff');p.set(32,22,'#ffffff');}
  if(o.shield){const sh=r(o.shield);p.poly([[2,26],[14,26],[14,42],[8,50],[2,42]],sh);p.poly([[8,31],[11,37],[8,43],[5,37]],r('#c0303c'));p.set(4,28,'#ffffff');}
  /* left arm; right arm and weapon (raised when attacking) */
  p.poly([[12,24],[16,24],[15,37],[11,37]],r(o.sleeve||o.robe));p.ell(13,38.5,2.2,2.2,S);
  if(W==='dagger'){p.rect(12,39,2,8,wpn);p.set(12,47,wpn[0]);p.line(10,39,15,39,guard[1]);}
  p.poly([[31,24],[35,24],[39,33+ay],[36,35+ay]],r(o.sleeve||o.robe));
  const hx0=38,hy0=35.5+ay;
  if(W==='blade'||W==='club'){const th=W==='club';for(let i=0;i<30;i++){const x=Math.round(37+i*.33),y=Math.round(34+ay-i*1.05);p.set(x,y,i<26?wpn[1]:wpn[0]);p.set(x+1,y,wpn[2]);if(i<26||th)p.set(x-1,y,wpn[0]);if(th){p.set(x+2,y,wpn[2]);if(i%5===2)p.set(x-2,y,'#ffffff');}}
    if(!th){p.set(42,18+ay,'#ffffff');p.line(34,36+ay,41,33+ay,guard[1]);p.line(34,37+ay,41,34+ay,guard[2]);}p.line(36,36+ay,35,40+ay,hilt[1]);p.line(37,36+ay,36,40+ay,hilt[2]);}
  else if(W==='staff'){p.rect(38,4+ay,2,56,r('#9a6a3a'));if(o.orb){p.ell(39,3+ay,3.5,3.5,r(o.orb));p.set(38,2+ay,'#ffffff');}else{p.rect(36,-1+ay,6,9,r('#f5e9b0'));p.line(38,1+ay,39,1+ay,'#c0392b');p.line(37,3+ay,40,3+ay,'#c0392b');p.line(38,5+ay,39,5+ay,'#c0392b');}}
  else if(W==='bow'){for(let y=10;y<=52;y++){const x=42+Math.round(4*Math.sin(Math.PI*(y-10)/42));p.set(x,y+ay,wpn[1]);p.set(x+1,y+ay,wpn[2]);}p.line(42,10+ay,42,52+ay,'#f1f0e6');
    if(atk){p.line(30,34+ay,42,34+ay,'#f1e2c0');p.set(30,34+ay,'#ffffff');}}
  else if(W==='sling'){p.line(39,44+ay,39,33+ay,r('#9a6a3a')[1]);p.line(39,33+ay,36,26+ay,r('#9a6a3a')[1]);p.line(39,33+ay,42,26+ay,r('#9a6a3a')[1]);p.line(36,26+ay,39,29+ay,'#5a4030');p.line(39,29+ay,42,26+ay,'#5a4030');p.ell(39,23+ay,2,2,wpn);}
  else if(W==='dagger'){p.rect(37,24+ay,2,11,wpn);p.set(37,23+ay,wpn[0]);p.line(35,35+ay,41,35+ay,guard[1]);}
  p.ell(hx0,hy0,2.3,2.3,S);if(tassel&&(W==='blade')){p.line(35,40+ay,33,46+ay,tassel[1]);p.line(36,40+ay,35,47+ay,tassel[2]);}
  /* neck, head with jaw and ears */
  p.rect(22,18,5,4,S);p.line(22,20,26,20,S[2]);
  if(o.hat==='hood'||o.hat==='mask'){const hd=r(o.hood);p.ell(24,11,10,10,hd);p.poly([[30,8],[38,14],[35,17],[30,12]],hd);}
  p.ell(24,10,7,6.5,S);p.poly([[17,9],[31,9],[31,13],[28,18],[24,20.5],[20,18],[17,13]],S);p.ell(16.5,12.5,1.3,2,S);p.ell(31.5,12.5,1.3,2,S);p.line(28,17,25,20,S[2]);
  if(o.horns){const hn=r('#f1f0e6');p.poly([[17,6],[13,-1],[19,4]],hn);p.poly([[31,6],[35,-1],[29,4]],hn);}
  /* hair or headgear */
  const bare=o.hat!=='hood'&&o.hat!=='mask'&&o.hat!=='gat-only';
  if(bare){p.ell(24,5.5,7.8,4,hair);p.poly([[17,8],[18,9],[20,7],[22,8.5],[24,6],[26,8.5],[28,7],[30,9],[31,7]],hair);p.poly([[17,7],[16,16],[18,11]],hair);p.poly([[31,7],[32,16],[30,11]],hair);
    if(o.longHair){p.poly([[16,8],[13,30],[18,24]],hair);p.poly([[32,8],[35,30],[30,24]],hair);}
    if(!helm&&o.hat!=='gat'){p.poly([[16,6],[18,1],[21,4],[24,0],[27,4],[30,1],[32,6]],hair);p.ell(24,1.8,2.6,2.2,hair);}
    p.line(20,4,23,3,hair[0]);p.line(25,3,27,4,hair[0]);}
  if(o.tips){const gd=r('#ffc94d');p.set(18,8,gd[0]);p.set(30,8,gd[0]);p.line(16,12,16,15,gd[1]);p.line(32,12,32,15,gd[1]);p.line(22,1,26,1,gd[0]);}
  if(o.wrap){const wr=r(o.wrap);p.ell(24,5,8,4,wr);p.line(17,7,31,7,wr[2]);}
  if(o.band){const bd=r(o.band);p.rect(17,5,14,2,bd);p.line(17,5,30,5,bd[0]);}
  if(o.hat==='gat'){const bk=r('#26232c');p.rect(18,-1,12,6,bk);p.ell(24,5,15,2.4,bk);p.rect(18,3,12,1,r(o.gatband||'#a83440'));p.line(11,7,14,18,'#c9a05a');p.line(37,7,34,18,'#c9a05a');}
  if(helm){p.ell(24,6,8.5,5.5,helm);p.rect(15,8,18,2,helm);p.line(24,1,24,9,helm[2]);p.set(20,3,'#ffffff');p.set(21,3,'#ffffff');
    if(o.plume){const pl=r(o.plume);p.poly([[24,2],[30,-2],[34,3],[27,4]],pl);p.poly([[24,2],[29,0],[31,5]],pl);}}
  if(o.crown){const gd=r('#ffc94d');p.poly([[18,4],[18,-1],[21,2],[24,-2],[27,2],[30,-1],[30,4]],gd);p.set(24,1,'#e0455a');}
  /* face */
  if(o.faceFn)o.faceFn(p,mood,S,I);
  else{const ec=o.eye||'#5a3a2a',ec2=hx(ec)?toHex(hx(ec).map(v=>v*.55)):ec;
    for(const [ex,s] of [[19,-1],[26,1]]){
      if(mood===1){p.line(ex,12,ex+1,13,I);p.line(ex+1,13,ex+3,12,I);}
      else{p.line(ex,12,ex+3,12,I);p.set(s<0?ex-1:ex+4,11,I);const ix=ex+(s<0?2:1),wx=ex+(s<0?1:2);
        p.set(ix,13,ec2);p.set(ix,14,ec);p.set(wx,13,'#ffffff');p.set(wx,14,'#ffffff');p.set(ex+(s<0?0:3),13,S[2]);p.set(ix+(s<0?1:-1),13,I);p.line(ex+(s<0?0:1),15,ex+(s<0?2:3),15,S[2]);}
      if(o.hat!=='mask'){if(atk)p.line(ex-(s<0?1:0),9,ex+3+(s>0?1:0),10+(s<0?1:0)-(s<0?0:1)+ (s<0?0:0),o.brow||hair[1]);
        else p.line(ex-(s<0?1:0),9+(s<0?1:0),ex+3+(s>0?1:0),9+(s>0?1:0),o.brow||hair[1]);}}
    if(o.hat==='mask'){const hd=r(o.hood);p.poly([[17,15],[31,15],[29,20],[24,21],[19,20]],hd);}
    else{p.set(24,15,S[2]);p.set(25,16,S[2]);if(atk)p.rect(23,18,3,1,'#7a2a30');else p.line(23,18,25,18,'#a05a48');p.set(24,19,S[2]);}
    if(o.beard){const bd=r(o.beard);p.poly([[19,16],[29,16],[27,22],[24,24],[21,22]],bd);p.line(22,17,26,17,bd[2]);p.line(21,19,22,21,bd[0]);}
    if(o.paint){p.line(18,16,19,18,'#c0303c');p.line(29,16,30,18,'#c0303c');}}
  p.rim(.28);p.selout();
  if(o.glow&&(W==='blade'))for(let i=0;i<30;i+=2){const x=Math.round(37+i*.33),y=Math.round(34+ay-i*1.05);for(const [dx,dy] of [[-2,0],[2,1],[-1,-1]])if(!p.get(x+dx,y+dy))p.set(x+dx,y+dy,i%4?o.glow:'#ffffff');}
  if(o.glow&&W!=='blade')for(const [x,y] of [[36,0],[43,2],[44,8],[35,7]])if(!p.get(x,y+ay))p.set(x,y+ay,o.glow);
  if(o.sparks)for(const [x,y] of [[6,20],[42,40],[9,8],[44,26],[4,44],[40,54],[12,30]]){if(!p.get(x,y)){p.set(x,y,'#fff6c8');p.set(x+1,y,'#ffe58a');p.set(x-1,y,'#ffe58a');p.set(x,y+1,'#ffe58a');p.set(x,y-1,'#ffe58a');}}
  if(o.halo)for(let a=0;a<360;a+=10){const q=a*Math.PI/180,rr=a%20?11:13;const x=24+Math.cos(q)*rr,y=10+Math.sin(q)*rr;if(!p.get(Math.floor(x),Math.floor(y)))p.set(x,y,a%20?'#ffe58a':'#fff6c8');}
  return p;}

/* star 1 plain, star 2 seasoned, star 3 hero */
const HERO={
  sword:[
    {robe:'#8a7a5a',trim:'#5a4a36',pant:'#4a4038',belt:'#6a4a2a',wrap:'#7a6a50',wcol:'#b8c0d0',guard:'#6a4a2a'},
    {robe:'#3f6fb5',trim:'#ece6d6',belt:'#8a5a32',knot:'#c0303c',band:'#c0303c',ribbon:'#c0303c',pauldron:'#8a6a4a',hilt:'#c0303c',tassel:'#c0303c',guard:'#b8c0d0'},
    {robe:'#ece6d6',trim:'#3f6fb5',skirt:'#3f6fb5',boot:'#3a3046',belt:'#e0a93a',band:'#e0a93a',ribbon:'#e0a93a',armor:'#c8d0e0',pauldron:'#d6dee9',cape:'#c0303c',
      wcol:'#bfe6ff',guard:'#e0a93a',hilt:'#3f6fb5',tassel:'#e0a93a',glow:'#9fe3ff',sparks:1}],
  sling:[
    {robe:'#7a8a5a',trim:'#5a6a3a',pant:'#5a4a38',belt:'#6a4a2a',hair:'#8a4a22',weapon:'sling',wcol:'#9aa0b5'},
    {robe:'#5aa86b',trim:'#ece6d6',pant:'#4a3a2a',belt:'#8a5a32',hair:'#b0602a',band:'#c0303c',ribbon:'#c0303c',weapon:'sling',wcol:'#b8c0d0'},
    {robe:'#3d8b55',trim:'#e0a93a',pant:'#2f3560',belt:'#e0a93a',hair:'#c06a2a',band:'#e0a93a',ribbon:'#e0a93a',pauldron:'#8a6a4a',cape:'#2f7d4f',weapon:'sling',wcol:'#ff8a3d',glow:'#ffb070',sparks:1}],
  mage:[
    {robe:'#d8d0c0',trim:'#8a7a9a',long:1,hat:'gat',weapon:'staff',belt:'#6a5a7a'},
    {robe:'#ece6d6',trim:'#7a5cc9',long:1,hat:'gat',gatband:'#7a5cc9',weapon:'staff',belt:'#7a5cc9',pauldron:'#b8a8d8'},
    {robe:'#f4f0e6',trim:'#7a5cc9',long:1,hat:'gat',gatband:'#e0a93a',weapon:'staff',orb:'#7fe0ff',belt:'#e0a93a',cape:'#4b3a9a',glow:'#9fe3ff',sparks:1}],
  archer:[
    {robe:'#5a6a4a',trim:'#4a5a3a',pant:'#4a4038',belt:'#6a4a2a',hat:'hood',hood:'#5a6a4a',weapon:'bow',wcol:'#9a6a3a'},
    {robe:'#3d7a45',trim:'#ece6d6',pant:'#3a3a2a',belt:'#8a5a32',hat:'hood',hood:'#2f7d4f',weapon:'bow',wcol:'#c0c8d8',pauldron:'#8a6a4a'},
    {robe:'#2f6a3f',trim:'#e0a93a',pant:'#2f3560',belt:'#e0a93a',hat:'hood',hood:'#e0a93a',weapon:'bow',wcol:'#ffd45a',armor:'#7a8a6a',cape:'#2f6a3f',glow:'#ffe58a',sparks:1}],
  ninja:[
    {robe:'#3a3a4a',trim:'#2a2a3a',pant:'#26232c',belt:'#4a3a3a',hat:'mask',hood:'#2a2a36',weapon:'dagger',wcol:'#b8c0d0'},
    {robe:'#2f3a5c',trim:'#1f2740',pant:'#1f2740',belt:'#c0303c',knot:'#c0303c',hat:'mask',hood:'#1f2740',weapon:'dagger',wcol:'#d6dee9',ribbon:'#c0303c'},
    {robe:'#1a1a28',trim:'#c0303c',pant:'#121218',belt:'#e0a93a',knot:'#c0303c',hat:'mask',hood:'#1a1a28',weapon:'dagger',wcol:'#ffd0d8',ribbon:'#c0303c',cape:'#7a2030',glow:'#ff8a9a',sparks:1}],
  paladin:[
    {robe:'#a83440',trim:'#ece6d6',skirt:'#c09040',plates:1,armor:'#c09040',pant:'#8a2a34',boot:'#6a4a2a',belt:'#8a2a34',helm:'#c09040',guard:'#c09040',hilt:'#8a2a34'},
    {robe:'#a83440',trim:'#ece6d6',skirt:'#e0a93a',plates:1,armor:'#e8b03a',pauldron:'#f0c04a',emblem:1,pant:'#8a2a34',boot:'#6a4a2a',belt:'#8a2a34',helm:'#e8b03a',plume:'#ece6d6',cape:'#ece6d6',guard:'#e0a93a',hilt:'#8a2a34',tassel:'#e0a93a'},
    {robe:'#ece6d6',trim:'#ffc94d',skirt:'#ffc94d',plates:1,armor:'#ffd45a',pauldron:'#ffe07a',emblem:1,pant:'#a83440',boot:'#8a5a2a',belt:'#a83440',helm:'#ffd45a',plume:'#ffffff',cape:'#ffc94d',
      wcol:'#fff6c8',guard:'#ffc94d',hilt:'#a83440',tassel:'#ffffff',glow:'#ffe58a',sparks:1,halo:1}],
  mugyeol:[
    {robe:'#6a4a3a',trim:'#8a6a4a',skirt:'#7a5a40',plates:1,armor:'#8a6a4a',pant:'#26232c',belt:'#5a3a22',helm:'#6a5a50',wcol:'#b8c0d0',guard:'#4a4040',hilt:'#26232c',beard:'#2c2832'},
    {robe:'#a83440',trim:'#e0a93a',skirt:'#6f7890',plates:1,armor:'#6f7890',pauldron:'#7a84a0',pant:'#26232c',knot:'#c0303c',helm:'#6f7890',plume:'#c0303c',cape:'#a83440',guard:'#4a5068',hilt:'#26232c',tassel:'#c0303c',beard:'#2c2832'},
    {robe:'#7a1e2c',trim:'#ffc94d',skirt:'#3a3c52',plates:1,armor:'#3a3c52',pauldron:'#e0a93a',pant:'#1a1820',boot:'#2a2230',belt:'#e0a93a',knot:'#ffc94d',helm:'#e0a93a',plume:'#e8303c',cape:'#e8303c',
      wcol:'#ffe0e0',guard:'#e0a93a',hilt:'#1a1820',tassel:'#ffc94d',beard:'#2c2832',glow:'#ff8a8a',sparks:1}]};
/* the hero grows with each freed general: stages 0..5 */
const HERO_HB=[
  {robe:'#c8b48a',trim:'#8a7a5a',pant:'#5a4a38',belt:'#6a4a2a',band:'#3f6fb5',wcol:'#c79a5e',guard:'#6a4a2a'},
  {robe:'#d8c8a0',trim:'#3f6fb5',pant:'#4a4038',belt:'#6a4a2a',band:'#3f6fb5',ribbon:'#3f6fb5',wcol:'#d6dee9',guard:'#8a6a4a',hilt:'#3f6fb5'},
  {robe:'#ece6d6',trim:'#3f6fb5',pant:'#2f3560',belt:'#8a5a32',band:'#3f6fb5',ribbon:'#3f6fb5',wcol:'#d6dee9',guard:'#b8c0d0',hilt:'#3f6fb5',tassel:'#3f6fb5',eye:'#c98f1a'},
  {robe:'#ece6d6',trim:'#3f6fb5',pant:'#2f3560',belt:'#e0a93a',band:'#e0a93a',ribbon:'#e0a93a',pauldron:'#d6dee9',wcol:'#ffd45a',guard:'#e0a93a',hilt:'#3f6fb5',tassel:'#3f6fb5',eye:'#c98f1a',tips:1},
  {robe:'#ece6d6',trim:'#3f6fb5',pant:'#2f3560',belt:'#e0a93a',band:'#e0a93a',ribbon:'#e0a93a',pauldron:'#e0a93a',cape:'#e0a93a',wcol:'#ffd45a',guard:'#e0a93a',hilt:'#3f6fb5',tassel:'#3f6fb5',eye:'#c98f1a',tips:1,glow:'#ffe58a'},
  {robe:'#fff8e8',trim:'#e0a93a',pant:'#2f3560',belt:'#e0a93a',band:'#e0a93a',ribbon:'#e0a93a',pauldron:'#ffc94d',cape:'#ffc94d',wcol:'#fff6c8',guard:'#ffc94d',hilt:'#3f6fb5',tassel:'#ffffff',eye:'#c98f1a',tips:1,glow:'#ffe58a',sparks:1,halo:1}];
const HERO_ONE={
  geumbyeol:{robe:'#ffd45a',trim:'#fff8e8',skirt:'#ffd45a',long:1,sleeve:'#ffd45a',hair:'#f2e2a0',longHair:1,crown:1,weapon:'none',cape:'#ffc94d',eye:'#c98f1a',halo:1,sparks:1,belt:'#fff8e8'},
  grunt:{robe:'#6b4f8a',trim:'#4a3a5a',pant:'#4a3a5a',belt:'#3a2a3a',skin:'#8fce7a',hair:'#3f6a3a',weapon:'none',
    faceFn:(p,m,S,I)=>{p.line(19,12,22,15,I);p.line(22,12,19,15,I);p.rect(26,12,3,3,'#ffffff');p.set(27,13,I);p.line(22,18,27,19,I);p.line(28,6,31,9,S[2]);}},
  skull:{robe:'#26232c',trim:'#3a3350',pant:'#1a1820',belt:'#3a3350',skin:'#f1f0e6',hat:'hood',hood:'#26232c',weapon:'bow',wcol:'#d8d6c8',
    faceFn:(p,m,S,I)=>{p.rect(19,11,4,4,I);p.rect(26,11,4,4,I);p.set(20,12,'#ff4d6a');p.set(27,12,'#ff4d6a');p.set(24,16,I);p.set(25,16,I);for(let x=21;x<28;x+=2)p.line(x,18,x,19,I);}},
  ogre:{robe:'#8a5a32',trim:'#6a4422',skirt:'#8a5a32',pant:'#a8423f',belt:'#4a3020',skin:'#d85a50',hair:'#26232c',horns:1,weapon:'club',wcol:'#9a6a3a',
    faceFn:(p,m,S,I)=>{for(const ex of [19,26]){p.line(ex,12,ex+3,12,I);p.rect(ex+1,13,2,2,'#ffe566');}p.line(18,10,22,11,I);p.line(30,10,26,11,I);p.rect(21,17,7,2,'#5a1820');p.set(21,16,'#ffffff');p.set(27,16,'#ffffff');}},
  shield:{robe:'#6f7890',trim:'#4f566b',skirt:'#6f7890',pant:'#4f566b',belt:'#3a3a4a',skin:'#8fce7a',helm:'#9aa5bd',plume:'#9aa5bd',shield:'#b8c2d8',noSheath:1,
    faceFn:(p,m,S,I)=>{for(const ex of [19,26]){p.line(ex,12,ex+3,12,I);p.rect(ex+1,13,2,2,'#ffffff');p.set(ex+2,14,I);}p.line(22,18,26,18,I);}},
  shaman:{robe:'#5a3f7a',trim:'#3ad29f',long:1,sleeve:'#5a3f7a',skin:'#d9c9a8',hair:'#26232c',band:'#3ad29f',ribbon:'#3ad29f',weapon:'staff',orb:'#3ad29f',paint:1,eye:'#1f8f6a',belt:'#3ad29f'}};
const PIXHERO={};
for(const id in HERO)PIXHERO[id]=(st,g,mood)=>pxHero(HERO[id][Math.max(0,Math.min(2,(st||1)-1))],mood);
PIXHERO.hanbyeol=(st,stage,mood)=>pxHero(HERO_HB[Math.max(0,Math.min(5,stage||0))],mood);
for(const id in HERO_ONE)PIXHERO[id]=(st,g,mood)=>pxHero(HERO_ONE[id],mood);
Object.assign(PIXU,PIXHERO);
