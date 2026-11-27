/* ---------- v2 characters drawn one by one (ASCII only): four-tone painter Pix4, small helpers, and the units
   already redrawn. Loaded after kin.js; a unit painted here replaces its PIXU entry. ---------- */
function ramp4(base){const b=hx(base);return [toHex(b.map((v,i)=>v+(255-v)*.42+[14,8,-8][i])),base,toHex(b.map((v,i)=>v*.72+[6,8,24][i])),toHex(b.map((v,i)=>v*.45+[8,10,34][i]))];}
function Pix4(W,H){
  let px=new Array(W*H).fill(null);
  const set=(x,y,c)=>{x=Math.floor(x);y=Math.floor(y);if(x>=0&&y>=0&&x<W&&y<H&&c)px[y*W+x]=c;};
  const R=c=>typeof c==='string'&&c[0]==='#'&&c.length===7?ramp4(c):c;
  const tone=(v,p0)=>{const p=R(p0);if(typeof p==='string')return p;if(p.length===3)return v>.34?p[2]:v<-.42?p[0]:p[1];return v<-.45?p[0]:v<.2?p[1]:v<.62?p[2]:p[3];};
  const ell=(cx,cy,rx,ry,p,lx,ly)=>{lx=lx==null?-.6:lx;ly=ly==null?-.6:ly;for(let y=Math.floor(cy-ry);y<=cy+ry;y++)for(let x=Math.floor(cx-rx);x<=cx+rx;x++){const nx=(x+.5-cx)/rx,ny=(y+.5-cy)/ry,d=nx*nx+ny*ny;if(d<=1)set(x,y,tone(-(nx*lx+ny*ly)*.9+d*.35,p));}};
  const poly=(pts,p,k)=>{k=k||1;let x0=1e9,x1=-1e9,y0=1e9,y1=-1e9;for(const [x,y] of pts){x0=Math.min(x0,x);x1=Math.max(x1,x);y0=Math.min(y0,y);y1=Math.max(y1,y);}
    for(let y=Math.floor(y0);y<=y1;y++)for(let x=Math.floor(x0);x<=x1;x++){let ins=false;const qx=x+.5,qy=y+.5;
      for(let i=0,j=pts.length-1;i<pts.length;j=i++){const [xi,yi]=pts[i],[xj,yj]=pts[j];if((yi>qy)!==(yj>qy)&&qx<(xj-xi)*(qy-yi)/(yj-yi)+xi)ins=!ins;}
      if(ins)set(x,y,tone((((qx-x0)/(x1-x0||1)-.5)*1.5+((qy-y0)/(y1-y0||1)-.5)*.7)*k,p));}};
  const line=(x0,y0,x1,y1,c)=>{const n=Math.max(Math.abs(x1-x0),Math.abs(y1-y0))||1;for(let i=0;i<=n;i++)set(Math.round(x0+(x1-x0)*i/n),Math.round(y0+(y1-y0)*i/n),c);};
  const get=(x,y)=>x>=0&&y>=0&&x<W&&y<H?px[y*W+x]:null;
  /* light from the upper left: a thin bright rim; then a coloured outline from each neighbour's darkest tone */
  const finish=()=>{let o=px.slice();for(let y=0;y<H;y++)for(let x=0;x<W;x++){const c=px[y*W+x];if(!c)continue;if(!get(x-1,y)||!get(x,y-1)){const a=hx(c);if(a)o[y*W+x]=toHex(a.map(v=>v+(255-v)*.22));}}px=o;
    o=px.slice();for(let y=0;y<H;y++)for(let x=0;x<W;x++){if(px[y*W+x])continue;const n=[get(x+1,y),get(x,y+1),get(x-1,y),get(x,y-1)].find(Boolean);if(!n)continue;const a=hx(n);o[y*W+x]=a?toHex(a.map((v,i)=>v*.22+[12,8,26][i])):'#1e1428';}px=o;};
  const paint=(c,s,ox,oy)=>{for(let y=0;y<H;y++)for(let x=0;x<W;x++){const k=px[y*W+x];if(k){c.fillStyle=k;c.fillRect(ox+x*s,oy+y*s,s,s);}}};
  return {W,H,set,ell,poly,line,get,finish,paint,R};
}
const INK='#24182e';
/* sharp eyes looking forward-right, brows, at eye line y */
function v2eyes(p,x1,x2,y,iris,brow){for(const [ex,lf] of [[x1,1],[x2,0]]){p.line(ex,y,ex+3,y,INK);p.set(lf?ex-1:ex+4,y-1,INK);p.set(ex+1,y+1,iris);p.set(ex+2,y+1,INK);p.set(ex+1,y+2,INK);p.set(ex+2,y+2,iris);p.set(lf?ex:ex+3,y+1,'#ffffff');
  p.line(lf?ex-1:ex,y-3,lf?ex+3:ex+4,lf?y-2:y-3,brow);}}

/* one eye at (x,y), 4 wide: lash line on top, white, 2x2 iris with pupil and a highlight, soft lower lid.
   left=true for the viewer's left eye (outer corner on the left). lash = extra lash flick for long lashes */
function v2eye(p,x,y,iris,skinShade,left,lash){const ir=p.R(iris);
  p.line(x,y,x+3,y,INK);p.set(left?x-1:x+4,y+(lash?-1:0),INK);if(lash)p.set(left?x-2:x+5,y-1,INK);
  p.set(x,y+1,'#f6f2ea');p.set(x+3,y+1,'#f6f2ea');p.set(x,y+2,'#d9d2c8');p.set(x+3,y+2,'#d9d2c8');
  p.set(x+1,y+1,ir[2]);p.set(x+2,y+1,ir[3]);p.set(x+1,y+2,ir[1]);p.set(x+2,y+2,ir[2]);p.set(x+1,y+1,'#ffffff');
  p.line(x+1,y+3,x+2,y+3,skinShade);}
/* a ribbon through points, r thick */
function v2ribbon(p,pts,r,c){for(let i=0;i<pts.length-1;i++){const [x0,y0]=pts[i],[x1,y1]=pts[i+1],n=Math.ceil(Math.hypot(x1-x0,y1-y0));for(let k=0;k<=n;k++){const t=k/n,w=r*(1-(i+t)/(pts.length-1)*.5);p.ell(x0+(x1-x0)*t,y0+(y1-y0)*t,w,w,c);}}}
/* a limb as a quad from (ax,ay) to (bx,by), width wa at the start and wb at the end */
function v2limb(p,ax,ay,bx,by,wa,wb,c){const d=Math.hypot(bx-ax,by-ay)||1,nx=-(by-ay)/d,ny=(bx-ax)/d;p.poly([[ax+nx*wa,ay+ny*wa],[bx+nx*wb,by+ny*wb],[bx-nx*wb,by-ny*wb],[ax-nx*wa,ay-ny*wa]],c);}

function v2tuft(p,x,y,a,len,c){const cx=Math.cos(a),sy=Math.sin(a),px=-sy,py=cx;p.poly([[x+px*1.6,y+py*1.6],[x+cx*len,y+sy*len],[x-px*1.6,y-py*1.6]],c);}

/* ---------- moon bear (Moonstar folk): black fur, white crescent, long muzzle, shoulder hump, shaggy edge, long claws.
   mood: 0 idle, 1 hurt, 2 paw raised, 3/4 walking, 5 swipe with claw trails, 11 bite (head forward, jaws wide);
   free poses (strings) become 5 when they carry claw rakes, else 2. star 2 adds prayer beads, star 3 a golden crescent and claws. ---------- */
function pxMoonBear(st,mood){
  if(typeof mood==='string')mood=mood.split(',')[3].split('+').indexOf('C')>=0?5:2;
  if(mood===6)mood=5;if(mood===8)mood=2;if(mood===9||mood===7)mood=0;
  const p=Pix4(64,72),F='#2d2a33',L='#bca88e',N='#241c20',fd=p.R(F),gold=st>=3,claw=gold?'#ffd45a':'#ece6d8',crest=gold?'#ffd45a':'#f2ede0',eye='#e0a040';
  const walk=mood===3?1:mood===4?2:0,fL=walk===1?-3:walk===2?3:0,lift=walk?1:0,bite=mood===11,hdx=bite?3:0,hdy=bite?1:0;
  /* hind legs */
  for(const [x,dx,f] of [[24,-1,fL],[40,1,-fL]]){const up=f<0?lift:0;p.poly([[x-7,50],[x+7,50],[x+6+f,63-up],[x-6+f,63-up]],F);p.ell(x+dx+f,66.5-up,8,3.6,F);for(const d of [-4,-1,2,5])p.line(x+dx+f+d,68-up,x+dx+f+d+1,70-up,claw);}
  /* body, hump, shaggy edge, fur strokes */
  p.ell(31,42,18,15,F);p.ell(34,44,9,10,F);p.ell(25,26,15,10,F);
  for(const [x,y,a] of [[12,24,3.6],[15,19,4.1],[21,16,4.4],[27,15,4.7],[11,32,3.3],[12,40,3.1],[13,48,2.8],[18,55,2.3]])v2tuft(p,x,y,a,4,F);
  for(const [x,y] of [[20,30],[17,38],[24,47],[40,32],[44,44],[28,36]]){p.line(x,y,x+1,y+2,fd[3]);p.line(x+2,y,x+1,y+2,fd[3]);}
  /* the crescent on the chest (golden and glowing at star 3) */
  if(gold)for(const [x,y] of [[20,29],[46,29],[33,46]])p.ell(x,y,2.5,2.5,'#7a5a20');
  p.poly([[22,30],[27,30],[33,38],[39,30],[44,30],[33,44]],crest);p.line(23,31,33,43,p.R(crest)[2]);
  /* prayer beads from star 2 */
  if(st>=2){for(let i=0;i<11;i++){const t=Math.PI*(.15+i*.07),x=31+Math.cos(t)*14,y=24+Math.sin(t)*8;p.ell(x,y,1.8,1.8,'#9a6a3a');p.set(x-.6,y-.6,'#e0b07a');}p.ell(31,32,2.3,2.3,gold?'#ffd45a':'#c8343c');}
  /* far arm */
  v2limb(p,22,32,19,50,5.5,4.5,fd[2]);p.ell(19,53,5,4,fd[2]);for(const d of [-3,-1,1,3])p.line(19+d,56,19+d+1,59,'#c9c2b0');
  /* near arm by frame */
  if(mood===2){v2limb(p,40,30,46,20,6,5,F);v2limb(p,46,20,48,13,5,4.5,F);p.ell(48,10,5.6,4.6,F);p.ell(48,11,3,2,L);for(const d of [-4,-1.5,1,3.5])p.line(48+d,7,48+d+1,3,claw);}
  else if(mood===5){v2limb(p,40,30,50,40,6,5,F);v2limb(p,50,40,53,45,5,5,F);p.ell(54,47,5.8,4.6,F);p.ell(54,48,3,2,L);for(const d of [-4,-1.5,1,3.5])p.line(54+d,50,54+d+1,53,claw);
    for(const o of [0,4,8])for(let i=0;i<18;i++){const x=Math.round(42+o+i*.7),y=Math.round(8+i*1.9);p.set(x,y,i%3?'#ffffff':'#ffd6d6');}}
  else{const sw=bite?-2:0;v2limb(p,40,30,45+sw,46,6,5,F);v2limb(p,45+sw,46,47+sw,52,5,5,F);p.ell(48+sw,55,5.8,4.6,F);p.ell(48+sw,56,3,2,L);for(const d of [-4,-1.5,1,3.5]){p.line(48+sw+d,58,48+sw+d+1,61,claw);p.set(48+sw+d+2,62,claw);}}
  for(let i=0;i<14;i++)p.set(Math.round(38.5+i*.42),Math.round(32+i*1.4),fd[3]);
  /* head (forward when biting): ears, skull, muzzle, nose */
  const X=hdx,Y=hdy;p.ell(25+X,10+Y,3.4,3.2,F);p.ell(25+X,10.4+Y,1.7,1.6,L);p.ell(34+X,8.5+Y,3.2,3,F);p.ell(34+X,9+Y,1.6,1.5,L);
  p.ell(32+X,16+Y,9.5,8.5,F);for(const [x,y,a] of [[23,16,3.3],[24,21,2.6],[29,23,2]])v2tuft(p,x+X,y+Y,a,3,F);
  p.poly([[34+X,13+Y],[44+X,14+Y],[47+X,17+Y],[46+X,21+Y],[40+X,23+Y],[33+X,22+Y]],L);p.ell(45.5+X,15.6+Y,2.4,1.9,N);p.set(45+X,15+Y,'#6a6068');
  const W='#ece6d8';
  if(bite||mood===2||mood===5){p.poly([[36+X,21+Y],[47+X,20+Y],[45+X,27+Y],[38+X,26+Y]],'#4a141c');p.poly([[39+X,24+Y],[45+X,23.5+Y],[44+X,26+Y],[40+X,26+Y]],'#d86a7a');
    for(const x of [38,41,44])p.poly([[x+X,21+Y],[x+1.4+X,21+Y],[x+.7+X,23.6+Y]],W);for(const x of [39,43])p.poly([[x+X,26+Y],[x+1.4+X,26+Y],[x+.7+X,23.8+Y]],W);}
  else{p.line(37+X,22+Y,45+X,21+Y,'#4a141c');p.poly([[39+X,22+Y],[40.5+X,22+Y],[39.8+X,25+Y]],W);p.poly([[43+X,21.6+Y],[44.4+X,21.6+Y],[43.7+X,24.4+Y]],W);}
  /* eyes: small and deep; shut when hurt */
  for(const ex of [31,37]){if(mood===1){p.line(ex-.5+X,13+Y,ex+2+X,14+Y,'#1a1214');continue;}p.ell(ex+1+X,13.5+Y,2.2,1.6,'#1a1214');p.set(ex+X,13+Y,eye);p.set(ex+1+X,13+Y,eye);p.set(ex+X,13+Y,'#fff6c8');}
  p.line(29+X,11+Y,34+X,(mood===2||mood===5||bite?13:12)+Y,fd[3]);p.line(35+X,(mood===2||mood===5||bite?13:12)+Y,39+X,11+Y,fd[3]);
  p.set(31+X,8+Y,crest);p.set(30+X,9+Y,crest);p.set(30+X,10+Y,crest);p.set(31+X,11+Y,crest);
  if(gold)for(const [x,y] of [[6,22],[58,10],[8,50],[57,40]]){p.set(x,y,'#fff6c8');p.set(x+1,y,'#ffe58a');p.set(x-1,y,'#ffe58a');p.set(x,y+1,'#ffe58a');p.set(x,y-1,'#ffe58a');}
  p.finish();return p;}
PIXU.bear=(st,g,mood)=>pxMoonBear(Math.max(1,Math.min(3,st||1)),mood);STRIKE.bear=1;WEAPON.bear='claw';

/* ---------- people: the right hand and weapon follow a pose (hand x, y, weapon angle, trail letters).
   Numbered frames map to poses; free poses from hero.js MOVES (48-wide body) are shifted onto this 64x72 body. ---------- */
const V2BLADE={0:[47,41,-0.98,''],7:[47,41,-0.98,''],1:[47,42,-0.9,''],3:[47,41,-0.98,''],4:[47,41,-0.98,''],
  8:[44,32,-1.72,''],2:[44,23,-1.45,''],6:[54,31,-0.05,'A'],5:[51,41,1.25,'D'],9:[50,41,-0.55,''],11:[51,41,1.25,'D']};
function v2pose(mood,table,dx,dy){if(typeof mood==='string'){const q=mood.split(',');return [+q[0]+(dx==null?8:dx),+q[1]+(dy==null?6:dy),+q[2],q[3]||''];}return table[mood]||table[0];}
/* swing trails around the shoulder and speed lines behind the hand */
function v2trail(p,tr,hx,hy,a,glow){const T=new Set(tr.split('+')),gl=p.R(glow||'#dff1ff'),wh='#ffffff';
  const arc=(cx,cy,R,a0,a1,w)=>{for(let t=a0;t<=a1;t+=.03)for(let k=0;k<w;k++)p.set(Math.round(cx+Math.cos(t)*(R-k)),Math.round(cy+Math.sin(t)*(R-k)),k?gl[0]:wh);};
  if(T.has('A'))arc(38,36,24,-1.55,-.05,3);if(T.has('D'))arc(38,36,18,-1.45,.6,2);if(T.has('U'))arc(38,36,20,-1.8,1.0,2);if(T.has('H'))arc(34,38,22,-.7,.7,3);
  if(T.has('T'))for(const d of [-3,0,3])p.line(hx-Math.cos(a)*14-Math.sin(a)*d,hy-Math.sin(a)*14+Math.cos(a)*d,hx-Math.cos(a)*5-Math.sin(a)*d,hy-Math.sin(a)*5+Math.cos(a)*d,wh);
  if(T.has('G')){const gx=hx+Math.cos(a)*24,gy=Math.min(68,hy+Math.sin(a)*24);for(const [dx,dy,r] of [[-6,0,3],[0,-2,3.6],[6,0,3],[-10,2,2],[10,2,2]])p.ell(gx+dx,gy+dy,r,r*.8,p.R('#a89070'));for(const [dx,dy] of [[-4,-6],[3,-8],[8,-5]])p.set(gx+dx,gy+dy,'#d8c8a8');}
  if(T.has('smoke')){const sm=p.R('#4a4060');for(const [x,y,r] of [[18,62,5],[28,66,6],[40,64,5],[12,52,3.5],[46,54,3.5]])p.ell(x,y,r,r*.8,sm);}}

/* wandering swordsman: straw hat, scarf ends in the wind, fitted travel coat, sash and gourd, leg wraps.
   star 2: deeper coat, leather shoulder guard, red tassel; star 3: white coat with gold trim, longer scarf, shining blade */
function pxSword2(st,mood){
  const p=Pix4(64,72),S='#f0c48e',hair='#2c2630',straw='#c9a24a',wrap='#ddd6c4',scarf='#c8343c',
    coat=st>=3?'#e9e4d6':st>=2?'#2f3d70':'#3f4c7e',inner=st>=3?'#3f4c7e':'#e9e4d6',trim=st>=3?'#e0a93a':null,pant=st>=3?'#3a3f5a':'#5b5f70',sash=st>=3?'#e0a93a':'#7a2f2a',
    steel=st>=3?'#e8f4ff':'#c9d2de',glow=st>=3?'#bfe6ff':null;
  const [hx,hy,ang,tr]=v2pose(mood,V2BLADE),walk=mood===3?1:mood===4?2:0,fL=walk===1?-3:walk===2?3:0,la=walk===1?3:walk===2?-3:0,hurt=mood===1;
  /* scarf ends (longer at star 3) */
  const sl=st>=3?6:0;v2ribbon(p,[[38,24],[45,25],[51,22],[58+sl,25],[62+sl,23]],1.8,scarf);v2ribbon(p,[[38,26],[45,30],[52,28],[57+sl,33]],1.5,scarf);
  if(tr)v2trail(p,tr,hx,hy,ang,glow);
  /* legs */
  for(const [x,f] of [[25,fL],[34,-fL]]){const up=f<0&&walk?1:0;p.poly([[x,53],[x+6,53],[x+6+f,64-up],[x+f,64-up]],pant);for(const y of [56,59,62])p.line(x+f*(y-53)/11,y-up,x+6+f*(y-53)/11,y-up,p.R(wrap)[1]);
    p.poly([[x-1+f,64-up],[x+8+f,64-up],[x+9+f,69-up],[x-2+f,69-up]],straw);p.line(x-1+f,66-up,x+8+f,66-up,p.R(straw)[2]);}
  /* coat */
  p.poly([[22,25],[42,25],[41,40],[47,56],[17,56],[23,40]],coat);for(const x of [24,29,35,40])p.line(x+(x<32?-1:1),44,x+(x<32?-4:4),55,p.R(coat)[2]);
  p.poly([[17,54],[47,54],[47,56],[17,56]],trim||p.R(coat)[3]);
  p.poly([[28,25],[32,25],[34,34],[31,34]],inner);p.poly([[36,25],[33,25],[30,31],[32,32]],inner);p.line(34,34,30,26,p.R(coat)[3]);
  if(trim){p.line(28,25,34,35,trim);p.line(22,25,23,40,trim);p.line(42,25,41,40,trim);}
  p.poly([[23,38],[41,38],[41,42],[23,42]],sash);p.ell(26,40,2.2,2,sash);p.poly([[24,41],[27,41],[26,50],[23,49]],sash);
  p.line(40,42,40,44,'#5a3a22');p.ell(40.5,46,2.4,2.2,'#d9c39a');p.ell(40.5,50.5,3.2,3.4,'#d9c39a');p.line(38,48,43,48,'#8a5a2a');
  /* left arm, swinging while walking */
  v2limb(p,23,27,19+la,43,3,5,coat);p.line(15+la,43,24+la,43,p.R(coat)[3]);p.ell(19.5+la,45,2.4,2.2,S);
  if(st>=2){p.ell(41,27,5,3.6,st>=3?'#e0a93a':'#7a5232');p.line(37,28,45,28,p.R(st>=3?'#e0a93a':'#7a5232')[3]);}
  /* right arm to the hand, then the sword and the hand over its grip */
  v2limb(p,41,27,hx-1,hy-1,3,4.2,coat);
  pxBladeAt(p,'blade',p.R(steel),p.R(st>=3?'#e0a93a':'#8a6a3a'),p.R('#4a3a30'),hx,hy,ang);
  if(st>=2){const c=Math.cos(ang),s=Math.sin(ang);v2ribbon(p,[[hx-c*4,hy-s*4],[hx-c*5,hy-s*5+4],[hx-c*4,hy-s*4+8]],1,scarf);}
  if(glow&&!tr){const c=Math.cos(ang),s=Math.sin(ang);for(let i=6;i<26;i+=3)p.set(hx+c*i-s*2,hy+s*i+c*2,'#ffffff');}
  p.ell(hx,hy,2.6,2.4,S);
  /* head */
  p.poly([[29,19],[35,19],[35,25],[29,25]],S);p.ell(32,23.5,8,3.2,scarf);p.line(25,24,39,24,p.R(scarf)[2]);p.ell(38,25,2.2,2,scarf);
  p.ell(32,14,7,7.5,S);p.poly([[25,13],[39,13],[38,18],[35,21],[32,22],[29,21],[26,18]],S);p.ell(24.6,15,1.4,2.2,S);p.ell(39.4,15,1.4,2.2,S);
  p.poly([[25,9],[39,9],[40,14],[37,11],[33,12],[29,11],[26,14],[24,13]],hair);p.poly([[24,12],[26,12],[24,20]],hair);p.poly([[40,12],[38,12],[40,20]],hair);
  for(let x=26;x<=38;x++)p.set(x,12,p.R(S)[2]);for(let x=27;x<=37;x++)if(x%2)p.set(x,13,p.R(S)[2]);
  if(hurt){p.line(27,16,30,15,INK);p.line(33,15,36,16,INK);}else{v2eye(p,27,14,'#6a4a2e',p.R(S)[2],true);v2eye(p,33,14,'#6a4a2e',p.R(S)[2],false);}
  const fierce=tr||mood===2||mood===8;p.line(26,fierce?11:12,30,13,hair);p.line(34,13,38,fierce?11:12,hair);
  p.set(32,16,p.R(S)[2]);p.set(32,17,p.R(S)[2]);p.set(33,18,p.R(S)[3]);
  if(fierce)p.poly([[30,19],[34,19],[33,21],[31,21]],'#7a2a30');else{p.line(30,20,33,20,'#9a5040');p.set(34,19,'#9a5040');}
  for(const [x,y] of [[37,18],[36,19],[35,20],[34,21]])p.set(x,y,p.R(S)[2]);
  /* straw hat; gold band at star 3 */
  p.poly([[12,11],[32,1],[52,11],[48,13],[16,13]],straw);for(let i=0;i<5;i++)p.line(32,2,16+i*9,12,p.R(straw)[2]);p.line(14,12,50,12,p.R(straw)[3]);
  p.line(25,8,39,8,st>=3?'#e0a93a':'#3a2a22');p.line(26,13,28,21,'#7a5a3a');p.line(38,13,36,21,'#7a5a3a');
  if(st>=3)for(const [x,y] of [[6,30],[58,8],[8,54]]){p.set(x,y,'#fff6c8');p.set(x+1,y,'#ffe58a');p.set(x-1,y,'#ffe58a');p.set(x,y+1,'#ffe58a');p.set(x,y-1,'#ffe58a');}
  p.finish();return p;}
PIXU.sword=(st,g,mood)=>pxSword2(Math.max(1,Math.min(3,st||1)),mood);

/* a long bow held at (hx,hy) aimed at angle a: limbs curve back from the grip, gold tips; drawn = string pulled to the
   cheek with an arrow on it. Returns where the drawing hand sits. */
function v2bow(p,hx,hy,a,drawn,wood,gold,glow){const c=Math.cos(a),s=Math.sin(a),px=-s,py=c,L=27,wd=p.R(wood);
  for(let t=-1;t<=1.0001;t+=.025){const b=6*(1-t*t)*(drawn?1.25:1),x=hx-c*(b-3)+px*L*t,y=hy-s*(b-3)+py*L*t,tip=Math.abs(t)>.84;p.set(x,y,tip?gold:wd[1]);p.set(x+c,y+s,tip?p.R(gold)[2]:wd[2]);}
  const e1=[hx+c*3+px*L,hy+s*3+py*L],e2=[hx+c*3-px*L,hy+s*3-py*L],nk=drawn?[hx-c*13,hy-s*13]:[hx+c*2,hy+s*2];
  p.line(e1[0],e1[1],nk[0],nk[1],'#f1ece0');p.line(e2[0],e2[1],nk[0],nk[1],'#f1ece0');
  if(drawn){p.line(nk[0],nk[1],hx+c*9,hy+s*9,glow||'#e8d6b0');p.set(hx+c*10,hy+s*10,'#ffffff');for(const d of [-1,1])p.set(nk[0]-c+px*d,nk[1]-s+py*d,'#c8343c');}
  return nk;}
const V2BOW={0:[49,33,0,''],1:[49,34,.05,''],3:[49,33,0,''],4:[49,33,0,''],7:[49,33,0,''],2:[50,31,0,'B'],8:[50,31,0,'B'],5:[51,31,0,'T'],6:[51,31,0,'T'],9:[49,33,0,''],11:[51,31,0,'T']};

/* divine archer: slim and tall, hooded cloak, quiver, gold-trimmed vest, long golden bow.
   star 2: gold edge on the cloak and a gold bracer; star 3: white-and-gold cloak, glowing arrow, sparkles */
function pxArcher2(st,mood){
  const p=Pix4(64,72),S='#f2cba0',hair='#4a3424',gold='#e3b341',pant='#2c3048',boot='#5a3a26',
    cloak=st>=3?'#e9e4d6':'#2f6b45',tunic=st>=3?'#3d8b55':'#4f8a5a',vest='#6b4a2e',edge=st>=2?gold:null,glow=st>=3?'#fff2a0':null;
  let [hx,hy,ang,tr]=v2pose(mood,V2BOW);const drawn=tr.indexOf('B')>=0,walk=mood===3?1:mood===4?2:0,fL=walk===1?-3:walk===2?3:0,hurt=mood===1,act=drawn||tr.indexOf('T')>=0||mood===2;
  if(typeof mood==='string'&&!drawn)tr='T';
  /* cloak behind, quiver and fletchings */
  p.poly([[23,20],[41,20],[44,62],[36,66],[27,63],[19,66]],cloak);p.line(25,30,22,62,p.R(cloak)[3]);p.line(39,30,42,60,p.R(cloak)[3]);
  if(edge){p.line(19,66,23,21,edge);p.line(44,62,41,21,edge);}
  p.poly([[17,12],[22,10],[29,36],[24,38]],'#7a4e2c');p.line(19,13,26,37,p.R('#7a4e2c')[3]);p.line(18,15,23,13,gold);p.line(23,31,28,29,gold);
  for(const [x,y,c] of [[15,4,'#f4f0e6'],[18,2,'#c8343c'],[21,3,'#f4f0e6']]){p.poly([[x,y],[x+3,y-1],[x+4,y+6],[x+1,y+7]],c);p.line(x+2,y+6,x+4,y+11,'#8a6a3a');}
  /* legs and boots */
  for(const [x,f] of [[27,fL],[33,-fL]]){const up=f<0&&walk?1:0;p.poly([[x,48],[x+5,48],[x+5+f,61-up],[x+f,61-up]],pant);p.poly([[x-1+f,59-up],[x+6+f,59-up],[x+7+f,69-up],[x-1+f,69-up]],boot);p.line(x-1+f,60-up,x+6+f,60-up,gold);}
  /* tunic, vest, strap, emblem, belt */
  p.poly([[25,38],[39,38],[42,50],[22,50]],tunic);p.line(32,40,32,49,p.R(tunic)[3]);
  p.poly([[25,21],[39,21],[40,38],[24,38]],vest);for(const x of [25,39])p.line(x,22,x+(x<32?-1:1),38,gold);
  p.poly([[37,21],[40,22],[27,39],[24,38]],'#4a3020');
  p.ell(32,28,2.8,2.8,gold);p.set(31,27,'#fff6c8');for(const [dx,dy] of [[0,-4],[4,0],[0,4],[-4,0]])p.set(32+dx,28+dy,gold);
  p.poly([[23,37],[41,37],[41,40],[23,40]],'#3a2a20');p.set(32,38,gold);p.set(33,38,gold);
  /* bow arm to the grip, bracer, bow, then the drawing hand at the string */
  v2limb(p,38,23,hx-1,hy,2.6,2.4,tunic);{const mx=(38+hx)/2+2,my=(23+hy)/2+1;v2limb(p,mx-2,my-1,mx+2,my+1,2.8,2.8,st>=2?gold:vest);}
  const nk=v2bow(p,hx,hy,ang,drawn,st>=3?'#e3b341':'#8a5a32',gold,glow);
  if(tr.indexOf('T')>=0)for(const d of [-3,0,3])p.line(hx+8,hy+d,hx+15,hy+d,'#ffffff');
  p.ell(hx,hy,2.3,2.3,S);
  const dh=drawn?nk:[29,32];v2limb(p,26,23,dh[0],dh[1],2.6,2.3,tunic);p.ell(dh[0],dh[1],2.2,2.1,S);
  /* hood and face */
  p.poly([[30,17],[34,17],[34,21],[30,21]],S);
  p.ell(32,10,8,8.5,cloak);p.poly([[24,11],[40,11],[41,20],[23,20]],cloak);if(edge){p.line(24,11,23,20,edge);p.line(40,11,41,20,edge);}
  p.ell(32,11.5,6.2,6.6,S);p.poly([[26,11],[38,11],[37,15],[34.5,18],[32,19],[29.5,18],[27,15]],S);
  p.poly([[26,6],[38,6],[37,8],[33,7.4],[30,8],[26,9.5]],hair);p.poly([[26,8],[27.5,9],[26.5,14]],hair);
  if(hurt){p.line(27,12,30,11,INK);p.line(34,11,37,12,INK);}
  else{v2eye(p,27,10,'#2f9a5a',p.R(S)[2],true,1);v2eye(p,33,10,'#2f9a5a',p.R(S)[2],false,1);}
  if(act){p.line(26,9,30,9,'#7a5434');p.line(34,9,38,9,'#7a5434');}else{p.line(26,8,29,7,'#7a5434');p.set(30,8,'#7a5434');p.line(35,7,38,8,'#7a5434');p.set(34,8,'#7a5434');}
  p.set(27,14,'#f2a0a0');p.set(28,14,'#f2a0a0');p.set(37,14,'#f2a0a0');p.set(36,14,'#f2a0a0');
  p.set(32,13,p.R(S)[2]);p.line(31,16,33,16,'#b8665a');p.set(32,17,'#e88a80');
  p.line(24,10,24,18,p.R(cloak)[3]);p.line(40,10,40,18,p.R(cloak)[3]);
  if(st>=3)for(const [x,y] of [[10,20],[58,8],[12,44]]){p.set(x,y,'#fff6c8');p.set(x+1,y,'#ffe58a');p.set(x-1,y,'#ffe58a');p.set(x,y+1,'#ffe58a');p.set(x,y-1,'#ffe58a');}
  p.finish();return p;}
PIXU.archer=(st,g,mood)=>pxArcher2(Math.max(1,Math.min(3,st||1)),mood);

/* a staff held at (hx,hy) at angle a (pointing to the top end): wood shaft, a paper talisman at the top or a glowing orb */
function v2staff(p,hx,hy,a,orb,cast){const c=Math.cos(a),s=Math.sin(a),wd=p.R('#8a5a32');
  for(let i=-24;i<=22;i++){p.set(hx+c*i,hy+s*i,wd[1]);p.set(hx+c*i-s,hy+s*i+c,wd[2]);}
  const tx=hx+c*25,ty=hy+s*25;
  if(orb){p.ell(tx,ty,3.8,3.8,orb);p.set(tx-1,ty-1,'#ffffff');for(let i=0;i<8;i++){const t=i/8*6.28;p.set(tx+Math.cos(t)*6,ty+Math.sin(t)*6,p.R(orb)[0]);}}
  else{p.poly([[tx-3,ty-4],[tx+3,ty-4],[tx+3,ty+5],[tx-3,ty+5]],'#f5e9b0');p.line(tx,ty-3,tx,ty+4,'#c0392b');p.line(tx-2,ty-1,tx+2,ty-1,'#c0392b');p.line(tx-2,ty+2,tx+2,ty+2,'#c0392b');}
  if(cast)for(const [dx,dy,r] of [[-9,-6,0],[9,-9,1],[-11,6,1],[11,5,0]]){const x=tx+dx,y=ty+dy;p.poly([[x-1.6,y-3],[x+1.6,y-3],[x+1.6,y+3],[x-1.6,y+3]],'#ffe27a');p.line(x,y-2,x,y+2,'#d23a3a');if(r)p.set(x-1,y,'#d23a3a');}}
const V2STAFF={0:[46,42,-1.57,''],1:[46,43,-1.5,''],3:[46,42,-1.57,''],4:[46,42,-1.57,''],7:[46,42,-1.57,''],
  2:[44,32,-1.45,'S'],8:[44,32,-1.45,'S'],5:[50,34,-0.35,'S'],6:[50,34,-0.35,'S'],11:[50,34,-0.35,'S'],9:[46,42,-1.57,'']};

/* young sage (Taoist): black gat, wide-sleeved long robe, yellow sash hung with talismans, talisman staff.
   star 2: indigo sleeveless vest; star 3: white robe with gold trim, glowing orb staff, four talismans circling */
function pxMage2(st,mood){
  const p=Pix4(64,72),S='#f1caa0',hair='#26222c',robe=st>=3?'#f4f1e8':'#dcd8cc',trim=st>=3?'#e0a93a':'#3b3f6e',sash='#e0b83a',gat='#24222c';
  let [hx,hy,ang,tr]=v2pose(mood,V2STAFF);const cast=tr.indexOf('S')>=0,walk=mood===3?1:mood===4?2:0,fL=walk===1?-2:walk===2?2:0,la=walk===1?2:walk===2?-2:0,hurt=mood===1;
  /* gat strings and the long robe falling to the ankles (hem sways while walking) */
  p.poly([[22,24],[42,24],[45,64],[19+fL,66],[17,64]],robe);for(const x of [24,29,35,40])p.line(x,30,x+(x<32?-3:3)+fL,64,p.R(robe)[2]);
  p.line(32,26,32+fL,65,trim);p.poly([[17,63],[45,63],[45,66],[17,66]],trim);
  for(const x of [24,36]){p.ell(x+(x<32?fL:-fL),68,4,2,'#2c2630');p.line(x-3+(x<32?fL:-fL),67,x+3+(x<32?fL:-fL),67,'#4a4450');}
  /* crossed collar */
  p.poly([[28,24],[32,24],[34,33],[31,33]],trim);p.poly([[36,24],[33,24],[30,30],[32,31]],trim);
  /* star 2+: sleeveless vest */
  if(st>=2){const v=st>=3?'#3b5ea8':'#3b3f6e';p.poly([[21,24],[30,24],[31,52],[18,55]],v);p.poly([[43,24],[34,24],[33,52],[46,55]],v);for(const x of [24,40])p.line(x,30,x+(x<32?-2:2),52,p.R(v)[3]);p.line(30,25,31,52,st>=3?trim:p.R(v)[0]);p.line(34,25,33,52,st>=3?trim:p.R(v)[0]);}
  /* yellow sash with hanging talismans */
  p.poly([[22,37],[42,37],[42,41],[22,41]],sash);p.ell(27,39,2,1.8,sash);
  for(const [x,y] of [[25,41],[30,42],[38,41]]){p.poly([[x-1.6,y],[x+1.6,y],[x+1.6,y+7],[x-1.6,y+7]],'#ffe27a');p.line(x,y+1,x,y+6,'#d23a3a');p.set(x-1,y+3,'#d23a3a');}
  /* left arm: wide sleeve, hand in a sign at the chest when casting */
  if(cast){v2limb(p,23,27,27,35,3,5,robe);p.ell(28,34,2.3,2.2,S);p.line(28,30,28,32,S);}
  else{v2limb(p,23,27,18+la,43,3,6,robe);p.line(13+la,44,24+la,44,trim);p.ell(18.5+la,46,2.4,2.2,S);}
  /* right arm, staff, hand */
  v2limb(p,41,27,hx-1,hy-1,3,5,robe);{const c=Math.cos(Math.atan2(hy-27,hx-41)),s=Math.sin(Math.atan2(hy-27,hx-41));p.line(hx-1-s*5,hy-1+c*5,hx-1+s*5,hy-1-c*5,trim);}
  v2staff(p,hx,hy,ang,st>=3?'#7fe0ff':null,cast);
  p.ell(hx,hy,2.4,2.3,S);
  /* star 3: four talismans circling the body */
  if(st>=3)for(const [x,y] of [[10,30],[54,22],[8,52],[56,50]]){p.poly([[x-1.6,y-3],[x+1.6,y-3],[x+1.6,y+3],[x-1.6,y+3]],'#ffe27a');p.line(x,y-2,x,y+2,'#d23a3a');}
  /* head: face, hair, gat with its strings and beads */
  p.poly([[29,19],[35,19],[35,24],[29,24]],S);
  p.ell(32,14,6.8,7.4,S);p.poly([[25.5,13],[38.5,13],[37.5,18],[35,21],[32,22],[29,21],[26.5,18]],S);p.ell(25,15,1.3,2,S);p.ell(39,15,1.3,2,S);
  p.poly([[25,10],[39,10],[39,13],[36,11.5],[32,12],[28,11.5],[25,13]],hair);p.poly([[24.5,11],[26,11],[25,17]],hair);p.poly([[39.5,11],[38,11],[39,17]],hair);
  if(hurt){p.line(27,15,30,15,INK);p.line(34,15,37,15,INK);}
  else{v2eye(p,27,14,'#3a2a3a',p.R(S)[2],true);v2eye(p,33,14,'#3a2a3a',p.R(S)[2],false);for(const x of [27,33])p.line(x,14,x+3,14,INK);}
  p.line(26,cast?11:12,30,12,hair);p.line(34,12,38,cast?11:12,hair);
  p.set(32,17,p.R(S)[2]);if(cast)p.poly([[30.5,19],[33.5,19],[33,20.5],[31,20.5]],'#7a2a30');else p.line(31,20,33,20,'#a05a48');
  p.ell(32,9,15,2.2,gat);p.line(18,9,46,9,p.R(gat)[0]);p.poly([[26,9],[38,9],[37,2],[27,2]],gat);p.line(27,7,37,7,st>=2?'#7a5cc9':'#3a3644');
  for(let i=0;i<6;i++){p.set(23-i*.2,11+i*2,'#c9a05a');p.set(41+i*.2,11+i*2,'#c9a05a');}p.ell(22,23,1.4,1.4,'#e0b07a');p.ell(42,23,1.4,1.4,'#e0b07a');
  if(st>=3)for(const [x,y] of [[6,14],[58,8]]){p.set(x,y,'#fff6c8');p.set(x+1,y,'#ffe58a');p.set(x-1,y,'#ffe58a');p.set(x,y+1,'#ffe58a');p.set(x,y-1,'#ffe58a');}
  p.finish();return p;}
PIXU.mage=(st,g,mood)=>pxMage2(Math.max(1,Math.min(3,st||1)),mood);

/* a short dagger at (hx,hy), angle a; edge = poison or glow colour along the blade */
function v2dagger(p,hx,hy,a,edge,steel){const c=Math.cos(a),s=Math.sin(a),st=p.R(steel||'#c9d2de');
  for(let i=1;i<13;i++){p.set(hx+c*i,hy+s*i,st[i<11?1:0]);p.set(hx+c*i-s,hy+s*i+c,st[2]);if(edge&&i>2&&i%2)p.set(hx+c*i+s,hy+s*i-c,edge);}
  p.line(hx-s*3,hy+c*3,hx+s*3,hy-c*3,'#8a6a3a');p.line(hx,hy,hx-c*3,hy-s*3,'#3a2a22');}
const V2DAG={0:[45,42,1.35,''],1:[45,43,1.2,''],3:[45,42,1.35,''],4:[45,42,1.35,''],7:[45,42,1.35,''],
  2:[42,30,-0.6,''],8:[42,30,-0.6,''],5:[56,34,0,'T'],6:[56,34,0,'T'],9:[45,42,1.35,''],11:[56,34,0,'T']};

/* the assassin: low ready stance, close-fitting black clothes, black mask over the lower face, hair tied back,
   arm and leg wraps, reverse-grip dagger wet with poison, poison vial and star pouch.
   star 2: red sash and a second dagger on the back; star 3: gold trim, long crimson scarf, glowing red blade */
function pxNinja2(st,mood){
  const p=Pix4(64,72),S='#e9c09a',hair='#1c1a22',cloth=st>=3?'#1a1824':'#2c2a36',wrap='#5a5868',mask='#16141c',sash=st>=2?'#b8303a':'#4a3a3a',gold='#e0a93a',
    edge=st>=3?'#ff7a8a':'#7be36a';
  let [hx,hy,ang,tr]=v2pose(mood,V2DAG);const walk=mood===3?1:mood===4?2:0,fL=walk===1?-3:walk===2?3:0,la=walk===1?2:walk===2?-2:0,hurt=mood===1,act=!!tr||mood===2;
  const star=typeof mood==='string'&&ang<-.3;
  /* long scarf / hair tail streaming back */
  v2ribbon(p,[[30,10],[22,9],[14,12],[8,10]],2,hair);
  if(st>=3)v2ribbon(p,[[28,24],[18,26],[10,24],[2,28]],2,'#b8303a');else v2ribbon(p,[[28,24],[20,27],[14,26]],1.6,sash);
  if(st>=2){p.line(16,22,30,44,'#3a2a22');p.line(15,21,17,23,'#c9d2de');p.line(14,20,15,21,'#c9d2de');}
  if(tr)v2trail(p,tr,hx,hy,ang,st>=3?'#ffb0b8':'#c8ffd0');
  /* legs in a low, wide stance with wraps */
  for(const [x0,x1,f] of [[27,20,fL],[35,42,-fL]]){const up=f<0&&walk?1:0;p.poly([[x0-3,46],[x0+3,46],[x1+3+f,58],[x1-2+f,60]],cloth);p.poly([[x1-3+f,58-up],[x1+3+f,58-up],[x1+3+f,66-up],[x1-3+f,66-up]],wrap);
    for(const y of [60,63])p.line(x1-3+f,y-up,x1+3+f,y-up,p.R(wrap)[2]);p.poly([[x1-4+f,66-up],[x1+5+f,66-up],[x1+6+f,69-up],[x1-4+f,69-up]],mask);}
  /* torso, a little lowered and leaning in */
  p.poly([[24,26],[40,26],[41,46],[23,46]],cloth);p.line(32,27,31,45,p.R(cloth)[3]);p.poly([[27,26],[32,26],[34,33],[31,33]],p.R(cloth)[0]);
  p.poly([[23,40],[41,40],[41,44],[23,44]],sash);if(st>=3){p.line(23,40,41,40,gold);p.line(24,26,23,46,gold);p.line(40,26,41,46,gold);}
  p.ell(23,44.5,1.5,2,'#7be36a');p.set(23,43,'#c8ffd0');p.set(23,42,'#5a4a3a');p.poly([[37,44],[41,44],[41,48],[37,48]],'#3a2e36');p.set(39,46,'#c9d2de');
  /* left arm: guard up when attacking, low while walking */
  const lh=act?[26,33]:[19+la,42];v2limb(p,24,28,lh[0],lh[1],2.6,2.4,cloth);v2limb(p,(24+lh[0])/2,(28+lh[1])/2,lh[0],lh[1],2.6,2.4,wrap);p.ell(lh[0],lh[1]+1,2.1,2,S);
  /* right arm, dagger (or a star being thrown), hand */
  v2limb(p,40,28,hx-1,hy-1,2.8,2.4,cloth);v2limb(p,(40+hx)/2,(28+hy)/2,hx-1,hy-1,2.8,2.4,wrap);
  if(star){p.poly([[hx+6,hy-6],[hx+8,hy-3],[hx+11,hy-3],[hx+8,hy-1],[hx+9,hy+2],[hx+6,hy],[hx+3,hy+2],[hx+4,hy-1],[hx+1,hy-3],[hx+4,hy-3]],'#d6dee9');}
  else v2dagger(p,hx,hy,ang,edge,st>=3?'#e8f4ff':null);
  p.ell(hx,hy,2.2,2.1,S);
  /* head: hair tied back, mask over the lower face, sharp eyes */
  p.poly([[29,19],[35,19],[35,25],[29,25]],mask);
  p.ell(32,14,6.8,7.4,S);p.poly([[25.5,13],[38.5,13],[37.5,18],[35,21],[32,22],[29,21],[26.5,18]],mask);
  p.poly([[25,7],[39,7],[39.5,12],[36,10],[32,11],[28,10],[24.5,12]],hair);p.ell(29,7,4,3,hair);p.ell(30,6,2,2,sash);
  p.line(26,15,38,15,p.R(mask)[0]);
  if(hurt){p.line(27,13,30,13,INK);p.line(34,13,37,13,INK);}
  else{v2eye(p,27,12,st>=3?'#c8303a':'#4a3a2a',p.R(S)[2],true);v2eye(p,33,12,st>=3?'#c8303a':'#4a3a2a',p.R(S)[2],false);}
  p.line(26,act?9:10,30,11,hair);p.line(34,11,38,act?9:10,hair);
  if(st>=3)for(const [x,y] of [[6,40],[58,14],[54,56]]){p.set(x,y,'#ffd0d8');p.set(x+1,y,'#ff8a9a');p.set(x-1,y,'#ff8a9a');p.set(x,y+1,'#ff8a9a');p.set(x,y-1,'#ff8a9a');}
  p.finish();return p;}
PIXU.ninja=(st,g,mood)=>pxNinja2(Math.max(1,Math.min(3,st||1)),mood);

/* a sling in the hand at (hx,hy): strap along angle a with the stone pocket at its end; empty after a throw */
function v2sling(p,hx,hy,a,stone,thrown){const c=Math.cos(a),s=Math.sin(a);p.line(hx,hy,hx+c*9-s,hy+s*9+c,'#6a4424');p.line(hx,hy,hx+c*9+s,hy+s*9-c,'#8a5a32');
  if(!thrown){p.ell(hx+c*10,hy+s*10,2.3,2.3,stone);p.set(hx+c*10-1,hy+s*10-1,'#ffffff');}}
const V2SLING={0:[44,50,1.45,''],1:[44,51,1.4,''],3:[44,50,1.45,''],4:[44,50,1.45,''],7:[44,50,1.45,''],
  2:[40,26,-2.3,''],8:[40,26,-2.3,''],5:[52,38,-0.3,'T'],6:[52,38,-0.3,'T'],9:[44,50,1.45,''],11:[52,38,-0.3,'T']};

/* sling boy: small frame and a big head, braided hair with a red ribbon, short jacket with rolled sleeves, trousers with
   knee wraps, straw sandals, a pouch of stones, freckles and a grin. star 2: green jacket, red headband, leather bracer;
   star 3: blue jacket with gold trim and a fire stone */
function pxSling2(st,mood){
  const p=Pix4(64,72),S='#f2c896',hair='#3a2a22',jacket=st>=3?'#3d6fb8':st>=2?'#5aa86b':'#d8c8a0',pant=st>=3?'#2f3560':'#7a6a50',wrap='#e6ddc8',straw='#c9a24a',gold='#e0a93a',
    stone=st>=3?'#ff8a3d':'#9aa0b5';
  let [hx,hy,ang,tr]=v2pose(mood,V2SLING,8,14);const walk=mood===3?1:mood===4?2:0,fL=walk===1?-3:walk===2?3:0,la=walk===1?2:walk===2?-2:0,hurt=mood===1,act=!!tr||mood===2;
  const T=new Set(tr.split('+')),thrown=T.has('T');
  /* braid with a red ribbon swinging behind */
  v2ribbon(p,[[25,22],[21,28],[19,35]],1.8,hair);v2ribbon(p,[[19,35],[17,39],[20,42]],1.2,'#c8343c');
  /* legs: short trousers, knee wraps, sandals */
  for(const [x,f] of [[25,fL],[34,-fL]]){const up=f<0&&walk?1:0;p.poly([[x,48],[x+6,48],[x+6+f,62-up],[x+f,62-up]],pant);p.poly([[x+f*.6,56-up],[x+6+f*.6,56-up],[x+6+f,61-up],[x+f,61-up]],wrap);
    p.poly([[x-1+f,62-up],[x+7+f,62-up],[x+8+f,68-up],[x-2+f,68-up]],straw);p.line(x-1+f,65-up,x+7+f,65-up,p.R(straw)[2]);}
  /* short jacket with a ribbon tie, belt pouch of stones */
  p.poly([[23,33],[41,33],[42,49],[22,49]],jacket);p.poly([[29,33],[33,33],[35,40],[32,40]],'#f4f0e6');p.poly([[36,33],[33,33],[30,38],[32,39]],'#f4f0e6');
  if(st>=3){p.line(22,49,42,49,gold);p.line(23,33,22,49,gold);p.line(41,33,42,49,gold);}
  p.poly([[31,40],[33,40],[35,47],[33,47]],'#c8343c');
  p.poly([[22,46],[42,46],[42,49],[22,49]],'#6a4a2a');p.ell(39,51,3,3,'#8a6a4a');p.line(37,49,41,49,'#5a3a22');p.set(38,52,'#b8bcc8');p.set(40,51,'#b8bcc8');
  if(T.has('W'))for(let i=0;i<10;i++){const t=i/10*6.28;p.set(hx+Math.cos(t)*9,hy+Math.sin(t)*9,'#ffffff');}
  /* left arm with rolled sleeve */
  const lh=act?[26,41]:[19+la,50];v2limb(p,24,35,lh[0],lh[1],2.6,2.2,jacket);p.ell(lh[0],lh[1]+1,2.1,2,S);
  /* right arm, bracer, sling and hand */
  v2limb(p,40,35,hx-1,hy-1,2.8,2.2,jacket);if(st>=2){const mx=(40+hx)/2,my=(35+hy)/2;v2limb(p,mx,my,(mx+hx)/2,(my+hy)/2,2.6,2.4,'#8a5a32');}
  v2sling(p,hx,hy,ang,stone,thrown);if(thrown)for(const d of [-3,0,3])p.line(hx+6,hy+d,hx+13,hy+d,'#ffffff');
  p.ell(hx,hy,2.2,2.1,S);
  /* big head: face, freckles, grin, hair with bangs */
  p.poly([[29,28],[35,28],[35,33],[29,33]],S);
  p.ell(32,22,8.2,8.4,S);p.poly([[24.5,21],[39.5,21],[38,27],[35,30],[32,31],[29,30],[26,27]],S);p.ell(23.6,23,1.5,2.2,S);p.ell(40.4,23,1.5,2.2,S);
  p.ell(32,15.5,8.6,5,hair);p.poly([[24,16],[27,20],[30,17],[33,20],[36,17],[39,20],[40,16]],hair);p.poly([[23.5,17],[25.5,17],[24,23]],hair);
  if(st>=2){p.poly([[24,16.5],[40,16.5],[40,18.5],[24,18.5]],'#c8343c');p.poly([[24,17],[19,15],[20,19]],'#c8343c');}
  if(hurt){p.line(27,23,30,23,INK);p.line(34,23,37,23,INK);p.line(31,28,33,28,'#a05a48');}
  else{v2eye(p,27,22,'#5a3a22',p.R(S)[2],true);v2eye(p,33,22,'#5a3a22',p.R(S)[2],false);
    if(act)p.poly([[29.5,27],[34.5,27],[33.5,29.5],[30.5,29.5]],'#7a2a30');else{p.line(29,27,35,27,'#9a5040');p.line(30,28,34,28,'#ffffff');}}
  for(const [x,y] of [[27,26],[28,27],[36,26],[37,27]])p.set(x,y,'#d89a6a');
  p.line(26,act?19:20,30,20,hair);p.line(34,20,38,act?19:20,hair);
  if(st>=3)for(const [x,y] of [[8,30],[56,18],[10,56]]){p.set(x,y,'#fff6c8');p.set(x+1,y,'#ffe58a');p.set(x-1,y,'#ffe58a');p.set(x,y+1,'#ffe58a');p.set(x,y-1,'#ffe58a');}
  p.finish();return p;}
PIXU.sling=(st,g,mood)=>pxSling2(Math.max(1,Math.min(3,st||1)),mood);

/* Sun Knight (legendary): broad armoured frame, red studded armour coat with gold studs, gold shoulder plates, sun disc
   on the chest, helmet with a sun crest and plume, red cape. star 2: white plume, longer cape; star 3: radiant sun halo,
   golden shining blade */
function pxPaladin2(st,mood){
  const p=Pix4(64,72),S='#e9b98a',red='#b0303a',gold='#e3b341',iron='#6a7088',boot='#4a3a30',cape=st>=3?'#ffd45a':'#a82a34',plume=st>=2?'#f4f0e6':'#c8343c',
    steel=st>=3?'#fff2b0':'#d6dee9';
  const [hx,hy,ang,tr]=v2pose(mood,V2BLADE),walk=mood===3?1:mood===4?2:0,fL=walk===1?-3:walk===2?3:0,la=walk===1?2:walk===2?-2:0,hurt=mood===1,act=!!tr||mood===2||mood===8;
  /* star 3: sun halo rays behind */
  if(st>=3)for(let i=0;i<16;i++){const t=i/16*6.283,r0=13,r1=i%2?19:23;p.line(32+Math.cos(t)*r0,16+Math.sin(t)*r0,32+Math.cos(t)*r1,16+Math.sin(t)*r1,i%2?'#ffe58a':'#fff6c8');}
  /* cape */
  const cl=st>=2?6:0;p.poly([[20,26],[44,26],[50,60+cl],[42,58+cl],[36,64+cl],[28,60+cl],[14,62+cl]],cape);p.line(24,32,18,60+cl,p.R(cape)[3]);p.line(40,32,46,58+cl,p.R(cape)[3]);
  if(tr)v2trail(p,tr,hx,hy,ang,st>=3?'#fff2a0':null);
  /* armoured legs: greaves and boots */
  for(const [x,f] of [[24,fL],[34,-fL]]){const up=f<0&&walk?1:0;p.poly([[x,54],[x+7,54],[x+7+f,64-up],[x+f,64-up]],iron);p.line(x+f*.5,58-up,x+7+f*.5,58-up,gold);
    p.poly([[x-1+f,63-up],[x+8+f,63-up],[x+9+f,69-up],[x-1+f,69-up]],boot);p.line(x-1+f,64-up,x+8+f,64-up,p.R(boot)[0]);}
  /* studded armour coat to the knees, gold studs, split skirt */
  p.poly([[19,26],[45,26],[46,44],[48,58],[16,58],[18,44]],red);p.line(32,44,32,58,p.R(red)[3]);
  for(let y=30;y<57;y+=4)for(let x=20+(y%8?2:0);x<45;x+=4)p.set(x,y,y<44||Math.abs(x-32)>1?gold:p.R(red)[3]);
  p.poly([[16,56],[48,56],[48,58],[16,58]],gold);
  /* belt, sun disc */
  p.poly([[19,42],[45,42],[45,46],[19,46]],'#4a2e22');p.ell(32,44,2.6,2.2,gold);
  p.ell(32,34,5,5,gold);p.ell(32,34,3,3,'#fff2b0');for(let i=0;i<8;i++){const t=i/8*6.283;p.set(32+Math.cos(t)*7,34+Math.sin(t)*7,gold);}
  /* gold shoulder plates */
  for(const s of [-1,1]){const sx=32+s*13;p.ell(sx,27,7,5,gold);p.line(sx-6,29,sx+6,29,p.R(gold)[3]);p.line(sx-6,31,sx+6,31,red);}
  /* left arm: gauntlet held at the side, raised as a guard when striking */
  const lh=act?[24,36]:[17+la,46];v2limb(p,20,29,lh[0],lh[1],3.4,3,red);p.ell(lh[0],lh[1]+1,3,2.7,iron);
  /* right arm, the sword, gauntlet */
  v2limb(p,44,29,hx-1,hy-1,3.4,3,red);
  pxBladeAt(p,'blade',p.R(steel),p.R(gold),p.R('#7a2a2a'),hx,hy,ang);
  if(st>=3&&!tr){const c=Math.cos(ang),s=Math.sin(ang);for(let i=6;i<26;i+=3){p.set(hx+c*i-s*2,hy+s*i+c*2,'#ffffff');p.set(hx+c*i+s*2,hy+s*i-c*2,'#ffe58a');}}
  p.ell(hx,hy,3,2.7,iron);
  /* head: strong jaw, stern eyes, helmet with sun crest, cheek guards, plume */
  p.poly([[28,19],[36,19],[36,25],[28,25]],S);
  p.ell(32,15,7,7.2,S);p.poly([[25,14],[39,14],[38.5,19],[36,22.5],[32,23.5],[28,22.5],[25.5,19]],S);
  if(hurt){p.line(27,15,30,15,INK);p.line(34,15,37,15,INK);}
  else{v2eye(p,27,14,'#5a3a22',p.R(S)[2],true);v2eye(p,33,14,'#5a3a22',p.R(S)[2],false);}
  p.line(26,act?12:13,30,13,'#4a2e22');p.line(34,13,38,act?12:13,'#4a2e22');
  p.set(32,17,p.R(S)[2]);p.set(32,18,p.R(S)[2]);if(act)p.poly([[30,20],[34,20],[33.5,22],[30.5,22]],'#7a2a30');else p.line(30,21,34,21,'#8a4a3a');
  p.line(26,20,29,23,p.R(S)[2]);p.line(38,20,35,23,p.R(S)[2]);
  p.ell(32,8,9,6,gold);p.poly([[23,8],[41,8],[42,12],[22,12]],gold);p.line(22,11,42,11,p.R(gold)[3]);p.line(32,3,32,11,p.R(gold)[3]);
  p.poly([[22,11],[25,11],[25,19],[22,17]],gold);p.poly([[42,11],[39,11],[39,19],[42,17]],gold);
  p.ell(32,3,3,3,'#fff2b0');for(let i=0;i<6;i++){const t=-Math.PI+i*Math.PI/5;p.set(32+Math.cos(t)*5,3+Math.sin(t)*5,gold);}
  v2ribbon(p,[[34,2],[41,-1],[47,2],[50,7]],2.4,plume);
  if(st>=3)for(const [x,y] of [[6,36],[58,30],[8,58],[56,60]]){p.set(x,y,'#fff6c8');p.set(x+1,y,'#ffe58a');p.set(x-1,y,'#ffe58a');p.set(x,y+1,'#ffe58a');p.set(x,y-1,'#ffe58a');}
  p.finish();return p;}
PIXU.paladin=(st,g,mood)=>pxPaladin2(Math.max(1,Math.min(3,st||1)),mood);

/* Hanbyeol, the 17-year-old hero, Goldstar reborn. He grows with each general freed (stage 0-5), each leaving a gift:
   0 village boy with a wooden sword; 1 Mugyeol's real sword and a bracer; 2 Duduri's goblin bead charm and an indigo vest;
   3 Baeksan's white tiger fur collar; 4 Mireu's blue cloud cloak; 5 awakened: white robe with gold, a gold star on the brow,
   a shining gold sword and starlight */
function pxHanbyeol2(stage,mood){
  const g=Math.max(0,Math.min(5,stage||0)),p=Pix4(64,72),S='#f0c48e',hair='#22202a',gold='#e3b341',
    jacket=g>=5?'#f4f1e8':'#d8c8a0',pant=g>=5?'#3a3f6e':'#6a6458',band=g>=5?gold:'#3d6fb8',
    steel=g>=5?'#fff2b0':g>=1?'#d6dee9':null;
  const [hx,hy,ang,tr]=v2pose(mood,V2BLADE,8,7),walk=mood===3?1:mood===4?2:0,fL=walk===1?-3:walk===2?3:0,la=walk===1?2:walk===2?-2:0,hurt=mood===1,act=!!tr||mood===2||mood===8;
  /* stage 4+: blue cloud cloak behind */
  if(g>=4){const ck=g>=5?'#3d6fb8':'#2f5a9a';p.poly([[21,27],[43,27],[49,62],[40,60],[33,66],[26,61],[15,63]],ck);
    for(const [x,y] of [[22,46],[36,54],[42,40]]){p.ell(x,y,3,2,p.R(ck)[0]);p.ell(x+3,y-1,2.4,1.8,p.R(ck)[0]);}if(g>=5){p.line(15,63,21,28,gold);p.line(49,62,43,28,gold);}}
  /* headband tails */
  v2ribbon(p,[[38,10],[45,11],[51,9],[56,12]],1.4,band);
  if(tr)v2trail(p,tr,hx,hy,ang,g>=5?'#fff2a0':null);
  /* legs, leg wraps, sandals / boots */
  for(const [x,f] of [[25,fL],[34,-fL]]){const up=f<0&&walk?1:0;p.poly([[x,51],[x+6,51],[x+6+f,63-up],[x+f,63-up]],pant);p.poly([[x+f*.7,58-up],[x+6+f*.7,58-up],[x+6+f,62-up],[x+f,62-up]],'#e6ddc8');
    p.poly([[x-1+f,63-up],[x+8+f,63-up],[x+9+f,69-up],[x-2+f,69-up]],g>=3?'#4a3a30':'#c9a24a');}
  /* jacket to the hips, collar, belt */
  p.poly([[23,27],[41,27],[42,52],[22,52]],jacket);p.poly([[28,27],[32,27],[34,36],[31,36]],'#f4f0e6');p.poly([[36,27],[33,27],[30,33],[32,34]],'#f4f0e6');
  if(g>=5){p.line(22,52,42,52,gold);p.line(23,27,22,52,gold);p.line(41,27,42,52,gold);p.line(28,27,34,37,gold);}
  /* stage 2+: indigo vest */
  if(g>=2&&g<5){p.poly([[22,28],[29,28],[30,50],[21,52]],'#3b3f6e');p.poly([[42,28],[35,28],[34,50],[43,52]],'#3b3f6e');}
  p.poly([[22,43],[42,43],[42,47],[22,47]],g>=5?gold:'#6a4a2a');
  /* stage 2+: Duduri's blue goblin bead charm */
  if(g>=2){p.line(26,47,26,50,'#c8343c');p.ell(26,52,2.2,2.2,'#4fb0e0');p.set(25,51,'#ffffff');}
  /* stage 3+: Baeksan's white tiger fur collar with stripes */
  if(g>=3){for(let i=0;i<9;i++){const x=21+i*2.8;p.poly([[x-2.2,26],[x+2.2,26],[x,31+(i%2)*2]],'#f4f2ec');}for(const x of [24,30,36,40])p.line(x,27,x+1,29,'#2a2a36');}
  /* left arm */
  const lh=act?[25,38]:[19+la,47];v2limb(p,24,30,lh[0],lh[1],2.8,2.4,jacket);p.ell(lh[0],lh[1]+1,2.2,2.1,S);
  /* right arm, bracer, sword (wooden at stage 0) */
  v2limb(p,40,30,hx-1,hy-1,2.8,2.4,jacket);if(g>=1){const mx=(40+hx)/2,my=(30+hy)/2;v2limb(p,mx,my,(mx+hx)/2,(my+hy)/2,2.6,2.4,g>=5?gold:'#8a5a32');}
  if(g===0){const c=Math.cos(ang),s=Math.sin(ang),w=p.R('#a8743e');for(let i=2;i<24;i++){p.set(hx+c*i,hy+s*i,w[1]);p.set(hx+c*i-s,hy+s*i+c,w[2]);}p.line(hx-s*3,hy+c*3,hx+s*3,hy-c*3,'#6a4424');}
  else{pxBladeAt(p,'blade',p.R(steel),p.R(g>=5?gold:'#8a6a3a'),p.R('#3a2a22'),hx,hy,ang);const c=Math.cos(ang),s=Math.sin(ang);v2ribbon(p,[[hx-c*4,hy-s*4],[hx-c*5,hy-s*5+4],[hx-c*4,hy-s*4+8]],1,'#c8343c');
    if(g>=5&&!tr)for(let i=6;i<26;i+=3){p.set(hx+c*i-s*2,hy+s*i+c*2,'#ffffff');p.set(hx+c*i+s*2,hy+s*i-c*2,'#ffe58a');}}
  p.ell(hx,hy,2.3,2.2,S);
  /* head: a determined young face, black hair tied up with a band */
  p.poly([[29,20],[35,20],[35,26],[29,26]],S);
  p.ell(32,15,7,7.4,S);p.poly([[25,14],[39,14],[38,19],[35,22.5],[32,23.5],[29,22.5],[26,19]],S);p.ell(24.6,16,1.4,2.2,S);p.ell(39.4,16,1.4,2.2,S);
  p.ell(32,9,8,4.6,hair);p.poly([[24,10],[27,14],[30,11],[33,14],[36,11],[39,14],[40,10]],hair);p.poly([[24,10],[25.5,10],[24.5,18]],hair);p.poly([[40,10],[38.5,10],[39.5,18]],hair);
  p.ell(32,4,3,2.6,hair);p.poly([[24,10.5],[40,10.5],[40,12.5],[24,12.5]],band);
  if(g>=5){p.set(32,15,'#fff6c8');p.set(31,16,gold);p.set(33,16,gold);p.set(32,17,gold);p.set(32,14,gold);}
  if(hurt){p.line(27,17,30,17,INK);p.line(34,17,37,17,INK);}
  else{const ir=g>=5?'#c98f1a':'#4a3a2a';v2eye(p,27,16,ir,p.R(S)[2],true);v2eye(p,33,16,ir,p.R(S)[2],false);}
  p.line(26,act?13:14,30,14,hair);p.line(34,14,38,act?13:14,hair);
  p.set(32,19,p.R(S)[2]);if(act)p.poly([[30,21],[34,21],[33.5,22.5],[30.5,22.5]],'#7a2a30');else p.line(30.5,21.5,33.5,21.5,'#9a5040');
  if(g>=5)for(const [x,y] of [[6,24],[58,16],[8,52],[56,46],[46,4]]){p.set(x,y,'#fff6c8');p.set(x+1,y,'#ffe58a');p.set(x-1,y,'#ffe58a');p.set(x,y+1,'#ffe58a');p.set(x,y-1,'#ffe58a');}
  p.finish();return p;}
PIXU.hanbyeol=(st,stage,mood)=>pxHanbyeol2(stage,mood);

/* a long blade of length n at (hx,hy), angle a: wide steel with a fuller line, guard and a long grip */
function v2longblade(p,hx,hy,a,n,steel,guard,hilt){const c=Math.cos(a),s=Math.sin(a),st=p.R(steel);
  for(let i=2;i<n;i++){const x=hx+c*i,y=hy+s*i,tip=i>n-4;p.set(x,y,tip?st[0]:st[1]);p.set(x-s,y+c,st[2]);p.set(x+s,y-c,st[0]);if(!tip&&i>4){p.set(x-2*s,y+2*c,st[3]||st[2]);}if(i>5&&i<n-5&&i%3===0)p.set(x,y,'#ffffff');}
  p.line(hx+c*2-s*5,hy+s*2+c*5,hx+c*2+s*5,hy+s*2-c*5,p.R(guard)[1]);p.line(hx+c*3-s*5,hy+s*3+c*5,hx+c*3+s*5,hy+s*3-c*5,p.R(guard)[2]);
  p.line(hx,hy,hx-c*6,hy-s*6,p.R(hilt)[1]);p.ell(hx-c*7,hy-s*7,1.3,1.3,guard);}

/* General Mugyeol, General of the Sword: big armoured veteran, black iron lamellar with dark red cords, helmet with a tall
   red horsehair crest, full beard and a scar, a long sword, dark red cape. star 2: gold shoulder plates; star 3: gold helmet,
   a crimson-glowing long sword */
function pxMugyeol2(st,mood){
  const p=Pix4(64,72),S='#d9a678',iron='#3a3c48',cord='#8a2430',gold='#e3b341',beard='#24202a',cape='#6a1a24',crest='#c8343c',
    helm=st>=3?gold:'#4a4c5a',shoulder=st>=2?gold:'#4a4c5a',steel=st>=3?'#ffd8d8':'#c9d2de';
  const [hx,hy,ang,tr]=v2pose(mood,V2BLADE),walk=mood===3?1:mood===4?2:0,fL=walk===1?-3:walk===2?3:0,la=walk===1?2:walk===2?-2:0,hurt=mood===1,act=!!tr||mood===2||mood===8;
  /* cape */
  p.poly([[19,26],[45,26],[51,64],[42,61],[34,67],[26,62],[13,65]],cape);p.line(23,32,17,62,p.R(cape)[3]);p.line(41,32,47,60,p.R(cape)[3]);
  if(tr)v2trail(p,tr,hx,hy,ang,st>=3?'#ffb0b8':'#d8dde8');
  /* legs: iron greaves, boots */
  for(const [x,f] of [[24,fL],[34,-fL]]){const up=f<0&&walk?1:0;p.poly([[x-1,54],[x+7,54],[x+7+f,64-up],[x-1+f,64-up]],iron);for(const y of [57,60])p.line(x-1+f*.5,y-up,x+7+f*.5,y-up,p.R(iron)[0]);
    p.poly([[x-2+f,63-up],[x+8+f,63-up],[x+9+f,69-up],[x-2+f,69-up]],'#2a2228');}
  /* lamellar armour: rows of small plates laced with red cords */
  p.poly([[18,26],[46,26],[47,44],[49,58],[15,58],[17,44]],iron);
  for(let y=29;y<58;y+=3){p.line(17,y,47,y,p.R(iron)[3]);for(let x=19+(y%2);x<47;x+=3)p.set(x,y-1,p.R(iron)[0]);}
  for(const x of [22,32,42])p.line(x,27,x,57,cord);p.poly([[15,55],[49,55],[49,58],[15,58]],cord);
  p.poly([[18,42],[46,42],[46,46],[18,46]],'#2a1a1a');p.ell(32,44,2.6,2.2,gold);
  /* shoulder plates */
  for(const s of [-1,1]){const sx=32+s*14;p.ell(sx,27,7.5,5.5,shoulder);for(const y of [27,29,31])p.line(sx-6,y,sx+6,y,p.R(shoulder)[3]);p.line(sx-6,32,sx+6,32,cord);}
  /* left arm */
  const lh=act?[24,37]:[16+la,47];v2limb(p,19,29,lh[0],lh[1],3.6,3.2,iron);p.ell(lh[0],lh[1]+1,3,2.7,'#2a2228');
  /* right arm, long sword, gauntlet */
  v2limb(p,45,29,hx-1,hy-1,3.6,3.2,iron);
  v2longblade(p,hx,hy,ang,34,steel,st>=3?gold:'#8a6a3a','#3a2a22');
  if(st>=3&&!tr){const c=Math.cos(ang),s=Math.sin(ang);for(let i=6;i<34;i+=3)p.set(hx+c*i-s*3,hy+s*i+c*3,'#ff9aa8');}
  p.ell(hx,hy,3,2.7,'#2a2228');
  /* head: stern face, heavy brows, scar, full beard */
  p.poly([[28,19],[36,19],[36,25],[28,25]],S);
  p.ell(32,15,7.2,7.4,S);p.poly([[25,14],[39,14],[38.5,19],[36,22],[32,23],[28,22],[25.5,19]],S);
  if(hurt){p.line(27,15,30,15,INK);p.line(34,15,37,15,INK);}
  else{v2eye(p,27,14,'#3a2414',p.R(S)[2],true);v2eye(p,33,14,'#3a2414',p.R(S)[2],false);}
  p.line(26,act?11:12,30,act?13:13,beard);p.line(26,12,30,14,beard);p.line(34,act?13:13,38,act?11:12,beard);p.line(34,14,38,12,beard);
  p.line(35,15,38,21,'#b86a6a');
  p.poly([[25,18],[39,18],[38,24],[35,29],[32,30],[29,29],[26,24]],beard);p.poly([[29,19],[35,19],[34,21],[30,21]],S);
  if(act)p.poly([[30,21],[34,21],[33,23.5],[31,23.5]],'#6a1a24');else p.line(30,22,34,22,'#5a1a20');
  for(const [x,y] of [[27,26],[31,28],[36,25]])p.set(x,y,p.R(beard)[0]);
  /* helmet with cheek guards and a tall horsehair crest */
  p.ell(32,8.5,9,6,helm);p.poly([[23,8],[41,8],[42,12],[22,12]],helm);p.line(22,11,42,11,p.R(helm)[3]);for(let x=24;x<41;x+=3)p.set(x,9,p.R(helm)[0]);
  p.poly([[22,11],[25,11],[25,19],[22,17]],helm);p.poly([[42,11],[39,11],[39,19],[42,17]],helm);
  p.line(32,1,32,4,gold);v2ribbon(p,[[32,1],[30,-3],[24,-2],[18,2],[14,8]],2.6,crest);
  if(st>=3)for(const [x,y] of [[6,36],[58,26],[56,58]]){p.set(x,y,'#ffd0d8');p.set(x+1,y,'#ff8a9a');p.set(x-1,y,'#ff8a9a');p.set(x,y+1,'#ff8a9a');p.set(x,y-1,'#ff8a9a');}
  p.finish();return p;}
PIXU.mugyeol=(st,g,mood)=>pxMugyeol2(Math.max(1,Math.min(3,st||1)),mood);

/* wolf (Moonstar folk): three-quarter view facing right, long snout with a black nose, tall pointed ears, a ruff, yellow eyes,
   digitigrade legs, a bushy white-tipped tail, grey fur with a white chest and muzzle, a leather harness with a moon buckle.
   Frames like the bear: 2 paw raised, 5 swipe with claw trails, 11 bite, 3/4 walking, 1 hurt.
   star 2: bone necklace and an arm band; star 3: iron shoulder guard, gold crescent, red cloth, fierce glowing eyes */
function pxWolf2(st,mood,o){o=o||{};const moon=!!o.moon;
  if(typeof mood==='string')mood=mood.split(',')[3].split('+').indexOf('C')>=0?5:2;
  if(mood===6)mood=5;if(mood===8)mood=2;if(mood===9||mood===7)mood=0;
  const p=Pix4(64,72),F=moon?'#dfe5f4':'#8a90a6',W=moon?'#ffffff':'#eef0f4',N='#1e1a22',fd=p.R(F),claw='#ece6d8',eye=moon?'#7fd0ff':st>=3?'#ffe14a':'#f0c030',strap=moon?'#2f3a6a':'#5a3a24';
  /* moon wolf: a big moon rising behind the head, a night-blue star cloak over the shoulders */
  if(moon){for(let y=0;y<=32;y++)for(let x=2;x<=30;x++){const a=Math.hypot(x-16,y-16)<=12,b=Math.hypot(x-11,y-12)<=10;if(a&&!b)p.set(x,y,'#9fd6ff');}}
  const walk=mood===3?1:mood===4?2:0,fL=walk===1?-3:walk===2?3:0,bite=mood===11,X=bite?3:0,Y=bite?1:0;
  /* bushy tail sweeping back and up, white tip */
  v2ribbon(p,[[20,46],[12,46],[7,41],[5,33],[7,27]],3.6,F);p.ell(7,26,3,3.4,W);for(const [x,y] of [[10,46],[6,39],[5,32]])v2tuft(p,x,y,3.4,3,F);
  /* digitigrade legs: thigh, shin back to the hock, paw */
  for(const [x,f] of [[24,fL],[38,-fL]]){const up=f<0&&walk?1:0;p.ell(x,52,5.5,6.5,F);v2limb(p,x+1,56,x+4+f,62-up,4,3,F);v2limb(p,x+4+f,62-up,x+1+f,66-up,3,2.6,F);
    p.ell(x+3+f,68-up,4.5,2.3,F);for(const d of [-2,0,2])p.line(x+5+f+d,68-up,x+6+f+d,70-up,claw);}
  /* lean deep-chested body, white chest, ruff */
  p.ell(30,40,12,13,F);p.ell(35,40,6,10,W);for(const [x,y] of [[18,36],[20,46],[26,50]]){p.line(x,y,x+1,y+2,fd[3]);p.line(x+2,y,x+1,y+2,fd[3]);}
  for(const [x,y,a] of [[20,26,3.8],[24,23,4.3],[30,22,4.7],[18,32,3.4],[40,26,-0.3],[42,32,0.1]])v2tuft(p,x,y,a,4.5,F);
  /* harness, belt with moon buckle, short cloth */
  p.poly([[37,26],[41,28],[24,50],[21,48]],strap);p.poly([[19,48],[43,48],[43,51],[19,51]],strap);
  p.ell(31,49.5,2.4,2.2,st>=3?'#ffd45a':'#c9c2b0');p.ell(32.2,49,1.8,1.8,strap);
  p.poly([[26,50],[37,50],[36,57],[27,57]],moon?'#3b4fa0':st>=3?'#a8303a':'#2f3a5a');
  if(moon){p.ell(34,36,5.5,5,'#c9d2e6');p.ell(34,36,3.6,3.4,'#fff3c4');p.ell(35.4,35,2.8,2.8,'#c9d2e6');}
  if(st>=2&&!moon){for(let i=0;i<7;i++){const t=Math.PI*(.2+i*.1),x=32+Math.cos(t)*9,y=27+Math.sin(t)*5;p.poly([[x-1,y],[x+1,y],[x,y+3]],'#f1ece0');}}
  if(moon){p.poly([[19,25],[43,25],[46,34],[40,32],[33,36],[26,32],[17,35]],'#22285a');p.line(17,35,19,25,'#c9d2e6');p.line(46,34,43,25,'#c9d2e6');for(const [x,y] of [[22,29],[30,31],[38,29],[42,31]])p.set(x,y,'#fff6c8');}
  if(st>=(moon?2:3)){const sg=moon?'#c9d2e6':'#5a5f70';p.ell(40,29,6,4.6,sg);for(const y of [28,30,32])p.line(35,y,45,y,p.R(sg)[3]);p.set(37,27,'#ffffff');}
  /* far arm */
  v2limb(p,23,32,20,48,4,3.2,fd[2]);p.ell(20,50,3.6,3,fd[2]);for(const d of [-2,0,2])p.line(20+d,52,20+d+1,55,'#c9c2b0');
  /* near arm by frame */
  const arm=(ax,ay,bx,by,px,py,up)=>{v2limb(p,ax,ay,bx,by,4.4,3.6,F);v2limb(p,bx,by,px,py,3.6,3.2,F);p.ell(px,py,4.2,3.6,F);for(const d of [-3,-1,1,3])p.line(px+d,py+(up?-3:3),px+d+1,py+(up?-7:7),claw);
    if(st>=2){const mx=(bx+px)/2,my=(by+py)/2;v2limb(p,mx-1,my,mx+1,my,3.8,3.8,moon?(st>=3?'#ffd45a':'#c9d2e6'):st>=3?'#c8343c':strap);}};
  if(mood===2)arm(38,30,44,22,47,12,1);
  else if(mood===5){arm(38,30,48,40,53,46,0);for(const o of [0,4,8])for(let i=0;i<18;i++){const x=Math.round(41+o+i*.7),y=Math.round(8+i*1.9);p.set(x,y,i%3?'#ffffff':'#ffd6d6');}}
  else arm(38,30,43+(bite?-2:0),44,45+(bite?-2:0),52,0);
  /* head: ears, skull, ruff cheeks, long snout, nose, jaws */
  p.poly([[26+X,10+Y],[27+X,-1+Y],[32+X,8+Y]],F);p.poly([[27.5+X,8+Y],[28+X,2+Y],[30.5+X,7+Y]],'#d8a0a8');
  p.poly([[33+X,8+Y],[37+X,-2+Y],[39+X,10+Y]],F);p.poly([[35+X,7+Y],[37+X,1+Y],[38+X,8+Y]],'#d8a0a8');
  p.ell(32+X,15+Y,8,7,F);for(const [x,y,a] of [[25,16,3.2],[26,21,2.5],[31,23,2]])v2tuft(p,x+X,y+Y,a,3.4,F);
  p.poly([[35+X,13+Y],[47+X,15+Y],[50+X,17+Y],[48+X,20+Y],[38+X,21+Y],[33+X,19+Y]],F);p.poly([[37+X,17+Y],[48+X,18+Y],[46+X,21+Y],[37+X,21+Y]],W);p.ell(49+X,16.2+Y,1.9,1.5,N);
  const open=bite||mood===2||mood===5;
  if(open){p.poly([[37+X,20+Y],[49+X,19+Y],[46+X,25+Y],[38+X,24+Y]],'#4a141c');p.poly([[39+X,22+Y],[46+X,22+Y],[45+X,24+Y],[40+X,24+Y]],'#d86a7a');
    for(const x of [39,43,46])p.poly([[x+X,20+Y],[x+1.3+X,20+Y],[x+.6+X,22.6+Y]],'#ffffff');for(const x of [40,44])p.poly([[x+X,24+Y],[x+1.3+X,24+Y],[x+.6+X,21.8+Y]],'#ffffff');}
  else{p.line(38+X,21+Y,47+X,20+Y,N);p.poly([[44+X,20.5+Y],[45.3+X,20.5+Y],[44.6+X,23+Y]],'#ffffff');}
  if(mood===1){p.line(31+X,13+Y,34+X,14+Y,N);p.line(36+X,13+Y,38+X,13+Y,N);}
  else for(const ex of [31,36]){p.poly([[ex+X,13+Y],[ex+3+X,12.4+Y],[ex+2.6+X,14.4+Y],[ex+X,14.6+Y]],eye);p.set(ex+1+X,13+Y,N);p.set(ex+1+X,14+Y,N);p.line(ex-1+X,(open?11:12)+Y,ex+3+X,12+Y,N);}
  if(moon){const g='#ffd45a';p.set(33+X,9+Y,g);p.set(32+X,10+Y,g);p.set(32+X,11+Y,g);p.set(33+X,12+Y,g);
    if(st>=3){p.poly([[26+X,8+Y],[28+X,3+Y],[31+X,6+Y],[33+X,1+Y],[35+X,6+Y],[38+X,3+Y],[40+X,8+Y]],g);p.set(33+X,4+Y,'#7fd0ff');}}
  if(st>=3){if(!moon)p.line(30+X,10+Y,33+X,18+Y,'#d8909a');for(const [x,y] of [[6,14],[58,30],[56,58]]){p.set(x,y,'#fff6c8');p.set(x+1,y,'#ffe58a');p.set(x-1,y,'#ffe58a');p.set(x,y+1,'#ffe58a');p.set(x,y-1,'#ffe58a');}}
  p.finish();return p;}
PIXU.wolf=(st,g,mood)=>pxWolf2(Math.max(1,Math.min(3,st||1)),mood);
PIXU.wolfking=(st,g,mood)=>pxWolf2(Math.max(1,Math.min(3,st||1)),mood,{moon:1});WEAPON.wolfking=WEAPON.wolfking||'stalk';

/* foxfire / fire effects at the hand: fb small orb, fb2 big orb ahead, ring of orbs, burst around the body, gather above the head */
function v2fire(p,tr,hx,hy,a,el){const T=new Set(tr.split('+')),c=Math.cos(a),s=Math.sin(a),E=p.R(el);
  const orb=(x,y,r)=>{p.ell(x,y,r+1,r+1,E[2]);p.ell(x,y,r,r,el);p.ell(x-r*.3,y-r*.3,r*.45,r*.45,'#ffffff');for(let i=0;i<4;i++)p.set(x-1+i,y-r-2-(i%2),E[0]);};
  if(T.has('fb'))orb(hx+c*4,hy+s*4-2,2.6);if(T.has('fb2'))orb(hx+c*9,hy+s*9,4.4);
  if(T.has('ring'))for(let i=0;i<8;i++){const t=i/8*6.283;p.ell(hx+Math.cos(t)*10,hy+Math.sin(t)*10,1.6,1.6,el);}
  if(T.has('burst'))for(let i=0;i<12;i++){const t=i/12*6.283,x=32+Math.cos(t)*24,y=38+Math.sin(t)*28;p.poly([[x-1.6,y],[x+Math.cos(t)*5,y+Math.sin(t)*5],[x+1.6,y]],el);}
  if(T.has('gather'))for(let i=0;i<8;i++){const t=i/8*6.283;p.set(32+Math.cos(t)*14,10+Math.sin(t)*6,'#ffffff');p.set(33+Math.cos(t)*14,10+Math.sin(t)*6,el);}
  if(T.has('T'))for(const d of [-3,0,3])p.line(hx-c*12-s*d,hy-s*12+c*d,hx-c*4-s*d,hy-s*4+c*d,'#ffffff');}
const V2CAST={0:[46,40,-0.4,'fb'],1:[46,41,-0.4,''],3:[46,40,-0.4,'fb'],4:[46,40,-0.4,'fb'],7:[46,40,-0.4,'fb'],
  2:[44,28,-1.3,'fb+gather'],8:[44,28,-1.3,'fb+gather'],5:[52,34,-0.1,'fb2+T'],6:[52,34,-0.1,'fb2+T'],11:[52,34,-0.1,'fb2+T'],9:[46,40,-0.4,'fb']};

/* gumiho mystic (Moonstar folk, fox sorceress): fox face with a slim snout, big ears, lined amber eyes, orange fur and a white
   muzzle, purple jacket and long skirt with wide sleeves, blue foxfire in the palm, tails fanning behind: 3, 6, then nine at star 3 */
function pxFox2(st,mood){
  const p=Pix4(64,72),F='#e8873a',W='#fff4e8',N='#2a1a20',jacket=st>=3?'#5a3aa8':'#7a5cc9',skirt=st>=3?'#2a2060':'#3a2f6a',el='#7fd8ff',gold='#e3b341';
  let [hx,hy,ang,tr]=v2pose(mood,V2CAST);const walk=mood===3?1:mood===4?2:0,fL=walk===1?-2:walk===2?2:0,hurt=mood===1,act=tr.indexOf('fb2')>=0||tr.indexOf('gather')>=0||tr.indexOf('burst')>=0||tr.indexOf('ring')>=0;
  /* tails fanning out behind */
  const n=st>=3?9:st>=2?6:3;for(let i=0;i<n;i++){const t=Math.PI*(n>1?1.0+i*.55/(n-1):1.2),bend=.35,ex=27+Math.cos(t)*26,ey=46+Math.sin(t)*30,mx=27+Math.cos(t-bend)*14,my=46+Math.sin(t-bend)*16;
    v2ribbon(p,[[28,50],[mx,my],[ex,ey]],4.4,F);p.ell(ex,ey,3.2,3.2,W);p.line(mx,my,(mx+ex)/2,(my+ey)/2,p.R(F)[0]);}
  if(tr)v2fire(p,tr.split('+').filter(x=>x==='burst'||x==='gather'||x==='ring').join('+')||'-',hx,hy,ang,el);
  /* long skirt to the ankles (hem sways), shoes */
  p.poly([[22,40],[42,40],[46,66],[18+fL,67],[18,66]],skirt);for(const x of [26,32,38])p.line(x,42,x+(x-32)*.3+fL,66,p.R(skirt)[2]);
  for(const x of [26,37])p.ell(x+(x<32?fL:-fL),68.5,3.6,1.8,'#2a1a20');
  /* jacket with a ribbon tie, wide sleeves */
  p.poly([[23,25],[41,25],[42,41],[22,41]],jacket);p.poly([[28,25],[32,25],[34,33],[31,33]],W);p.poly([[36,25],[33,25],[30,30],[32,31]],W);
  p.poly([[31,33],[34,33],[37,44],[34,44]],'#c8343c');p.line(22,41,42,41,st>=2?gold:p.R(jacket)[3]);
  if(st>=2){for(let i=0;i<5;i++)p.set(26+i*3,42,gold);}
  /* left arm: sleeve, hand in a sign when casting */
  const lh=act?[27,34]:[19,44];v2limb(p,24,28,lh[0],lh[1],3,5.5,jacket);p.ell(lh[0],lh[1]+1,2.1,2,F);
  /* right arm out with foxfire in the palm */
  v2limb(p,40,28,hx-1,hy,3,5,jacket);p.ell(hx,hy,2.2,2.1,F);
  if(tr)v2fire(p,tr.split('+').filter(x=>x==='fb'||x==='fb2'||x==='T').join('+')||'-',hx,hy,ang,el);
  /* head: big ears, slim snout, white muzzle, lined eyes, hair ornament */
  p.poly([[25,12],[24,-1],[31,9]],F);p.poly([[26.5,9],[26,3],[29.5,8]],'#f2b0b8');p.poly([[34,8],[39,-2],[40,11]],F);p.poly([[36,7],[38.5,1],[38.6,8]],'#f2b0b8');
  p.poly([[24,1],[26,-1],[26,3]],N);p.poly([[38,-1],[40,-2],[39.5,2]],N);
  p.ell(32,15,7.5,7,F);for(const [x,y,a] of [[25,17,3.1],[26,22,2.5]])v2tuft(p,x,y,a,3,F);
  p.poly([[34,14],[44,16],[46,18],[43,21],[35,22],[31,20]],W);p.ell(45.4,17.2,1.6,1.3,N);
  p.poly([[26,17],[31,18],[33,23],[28,22]],W);
  if(hurt){p.line(30,13,33,14,N);p.line(35,13,38,13,N);}
  else for(const ex of [29,35]){p.poly([[ex,13.5],[ex+3,12.6],[ex+3,14.6],[ex,14.8]],'#f0b030');p.set(ex+1,13,N);p.set(ex+1,14,N);p.line(ex-1,12.5,ex+4,11.6,N);p.set(ex+4,11,'#c8343c');}
  if(act)p.poly([[38,20.5],[43,20],[42,22.5],[38.5,22.5]],'#7a2030');else p.line(38,21,43,20.5,N);
  p.ell(29,7,2.2,2.2,'#c8343c');p.line(29,7,26,3,gold);p.set(26,3,gold);
  if(st>=3){p.poly([[28,5],[30,1],[32,4],[34,0],[36,4]],gold);for(const [x,y] of [[6,12],[58,8],[56,56]]){p.set(x,y,'#e8fbff');p.set(x+1,y,el);p.set(x-1,y,el);p.set(x,y+1,el);p.set(x,y-1,el);}}
  p.finish();return p;}
PIXU.fox=(st,g,mood)=>pxFox2(Math.max(1,Math.min(3,st||1)),mood);

/* ink panther (Moonstar folk, assassin): sleek cat head with a short muzzle, round ears, whiskers and green-gold eyes,
   black fur with ink-wash rosettes, a long thin tail curling at the tip, a low crouch, claws; ink drops fly when it strikes.
   Frames like the wolf. star 2: purple scarf; star 3: gold collar, violet glowing eyes, ink sparkles */
function pxPanther2(st,mood){
  if(typeof mood==='string')mood=mood.split(',')[3].split('+').indexOf('C')>=0?5:2;
  if(mood===6)mood=5;if(mood===8)mood=2;if(mood===9||mood===7)mood=0;
  const p=Pix4(64,72),F='#2e2c38',R='#4a4858',N='#0e0c12',fd=p.R(F),claw='#ece6d8',eye=st>=3?'#c08aff':'#c8e04a',scarf='#7a4ac8';
  const walk=mood===3?1:mood===4?2:0,fL=walk===1?-3:walk===2?3:0,bite=mood===11,X=bite?3:0,Y=bite?1:0,open=bite||mood===2||mood===5;
  const spots=(cx,cy,rx,ry,n,seed)=>{let s=seed;for(let i=0;i<n;i++){s=(s*9301+49297)%233280;const a=s/233280*6.283;s=(s*9301+49297)%233280;const d=Math.sqrt(s/233280);const x=cx+Math.cos(a)*rx*d,y=cy+Math.sin(a)*ry*d;
    for(const [dx,dy] of [[-1,0],[1,0],[0,-1],[0,1]])p.set(x+dx,y+dy,R);}};
  /* long thin tail with a curl */
  for(let i=0;i<26;i++){const t=i/25,x=20-t*16+Math.sin(t*3)*2,y=48-t*20-Math.sin(t*5)*3;p.ell(x,y,1.9-t*.4,1.9-t*.4,F);}p.ell(5,26,2.2,2.2,F);p.ell(7,24,1.6,1.6,F);
  /* crouched digitigrade legs */
  for(const [x,f] of [[25,fL],[38,-fL]]){const up=f<0&&walk?1:0;p.ell(x,54,5.5,6,F);v2limb(p,x+1,58,x+5+f,63-up,3.6,2.8,F);v2limb(p,x+5+f,63-up,x+2+f,67-up,2.8,2.4,F);
    p.ell(x+4+f,68.5-up,4,2,F);for(const d of [-2,0,2])p.line(x+6+f+d,69-up,x+7+f+d,70-up,claw);}
  /* lean body, rosettes */
  p.ell(30,43,10.5,11,F);spots(30,43,8.5,9,8,7);
  /* neck joining the head to the body */
  v2limb(p,31,34,33,20,6.5,5.5,F);spots(31,27,4,4,3,5);for(const [x,y] of [[20,40],[24,50]]){p.line(x,y,x+1,y+2,fd[3]);p.line(x+2,y,x+1,y+2,fd[3]);}
  p.poly([[19,49],[42,49],[42,52],[19,52]],'#3a2a4a');p.poly([[27,51],[36,51],[35,57],[28,57]],'#4a3a6a');
  if(st>=2){v2ribbon(p,[[38,30],[30,32],[22,30],[14,32],[8,30]],1.6,scarf);p.ell(36,32,6,3,scarf);}
  if(st>=3){p.ell(34,31,5.5,2.4,'#ffd45a');p.ell(34,34,1.6,1.6,'#c08aff');}
  /* far arm */
  v2limb(p,24,35,21,50,3.6,3,fd[2]);p.ell(21,52,3.2,2.8,fd[2]);for(const d of [-2,0,2])p.line(21+d,54,21+d+1,57,'#c9c2b0');
  /* near arm by frame; ink drops on the swipe */
  const arm=(bx,by,px,py,up)=>{v2limb(p,37,33,bx,by,4,3.2,F);v2limb(p,bx,by,px,py,3.2,2.8,F);p.ell(px,py,3.8,3.2,F);for(const d of [-3,-1,1,3])p.line(px+d,py+(up?-3:3),px+d+1,py+(up?-7:7),claw);};
  if(mood===2)arm(43,25,46,15,1);
  else if(mood===5){arm(47,41,52,47,0);for(const o of [0,4,8])for(let i=0;i<18;i++){const x=Math.round(41+o+i*.7),y=Math.round(10+i*1.9);p.set(x,y,i%3?'#d8d0f0':'#7a6a9a');}
    for(const [x,y,r] of [[56,30,1.6],[59,38,1.2],[54,22,1],[60,46,1.4]])p.ell(x,y,r,r,N);}
  else arm(42+(bite?-2:0),46,44+(bite?-2:0),53,0);
  /* head: round ears, short muzzle, whiskers */
  p.poly([[25+X,11+Y],[26+X,1+Y],[32+X,7+Y]],F);p.poly([[26.8+X,8+Y],[27.2+X,3.5+Y],[30+X,6.6+Y]],'#7a5a7a');
  p.poly([[35+X,6+Y],[40+X,-1+Y],[42+X,10+Y]],F);p.poly([[37+X,6+Y],[39.6+X,1.6+Y],[40.4+X,7.6+Y]],'#7a5a7a');
  p.ell(33+X,15+Y,9.5,8.4,F);spots(33+X,12+Y,6,3,5,11);
  p.ell(41+X,18.5+Y,5.4,3.8,R);p.ell(45+X,17+Y,1.8,1.3,N);
  if(open){p.poly([[37+X,19+Y],[45+X,18.6+Y],[43+X,23+Y],[38+X,22.5+Y]],'#4a141c');for(const x of [38,42])p.poly([[x+X,19+Y],[x+1.3+X,19+Y],[x+.6+X,21.4+Y]],'#ffffff');for(const x of [39,42.5])p.poly([[x+X,22.6+Y],[x+1.3+X,22.6+Y],[x+.6+X,20.4+Y]],'#ffffff');}
  else{p.line(39+X,20+Y,44+X,19.6+Y,N);}
  for(const s of [-1,1]){p.line(40+X,18+Y+s,48+X,17+Y+s*2,'#d8d4e0');}
  if(mood===1){p.line(31+X,13+Y,34+X,14+Y,N);p.line(36+X,13+Y,38+X,13+Y,N);}
  else for(const ex of [31,36]){p.poly([[ex+X,13+Y],[ex+3+X,12.2+Y],[ex+2.6+X,14.6+Y],[ex+X,14.6+Y]],eye);p.line(ex+1.5+X,12.6+Y,ex+1.5+X,14.4+Y,N);p.line(ex-1+X,(open?11:12)+Y,ex+3+X,12+Y,N);}
  if(st>=3)for(const [x,y] of [[8,14],[58,10],[56,56]]){p.set(x,y,'#e8d8ff');p.set(x+1,y,'#9a6ad8');p.set(x-1,y,'#9a6ad8');p.set(x,y+1,'#9a6ad8');p.set(x,y-1,'#9a6ad8');}
  p.finish();return p;}
PIXU.panther=(st,g,mood)=>pxPanther2(Math.max(1,Math.min(3,st||1)),mood);

/* a feathered wing from the shoulder (sx,sy) toward angle a, length len: covert band plus primary feathers fanned out */
function v2wing(p,sx,sy,a,len,col,bar,tip){const c=Math.cos(a),s=Math.sin(a),px=-s,py=c;
  p.poly([[sx+px*4,sy+py*4],[sx+c*len*.55+px*6,sy+s*len*.55+py*6],[sx+c*len*.55-px*3,sy+s*len*.55-py*3],[sx-px*3,sy-py*3]],col);
  for(let i=0;i<6;i++){const t=(i-2.5)*.16,cc=Math.cos(a+t),ss=Math.sin(a+t),bx=sx+c*len*.45+px*(i-2)*1.6,by=sy+s*len*.45+py*(i-2)*1.6;
    v2limb(p,bx,by,bx+cc*len*.6,by+ss*len*.6,1.8,1.1,i%2?col:p.R(col)[2]);p.set(bx+cc*len*.55,by+ss*len*.55,tip||bar);}
  for(let k=1;k<4;k++)p.line(sx+c*len*.15*k+px*4,sy+s*len*.15*k+py*4,sx+c*len*.15*k-px*3,sy+s*len*.15*k-py*3,bar);}

/* hunting hawk (Moonstar folk, archer): hooked yellow beak, fierce yellow eyes under a dark brow stripe, brown-and-white barred
   plumage, wings for arms, scaly yellow legs with black talons, falconry jesses and a white name tag (sichimi) on the tail.
   frames: wings folded idle; 2 wings spread; 'feath' wing flap throwing feathers; 5 talons forward. star 2: red jesses and a
   bell; star 3: gold bell, gold wing tips, wind sparkles */
function pxHawk2(st,mood){
  let tk=[];if(typeof mood==='string'){tk=mood.split(',')[3].split('+');mood=tk.indexOf('feath')>=0?'F':tk.indexOf('C')>=0?5:2;}
  if(mood===6||mood===11)mood=5;if(mood===8)mood=2;if(mood===9||mood===7)mood=0;
  const p=Pix4(64,72),B='#8a5a36',W='#f4efe2',bar='#5a3a22',Y='#f0c030',N='#1a1410',tip=st>=3?'#ffd45a':null;
  const walk=mood===3?1:mood===4?2:0,hop=walk===1?-2:0,strike=mood===5,spread=mood===2,flap=mood==='F';
  /* tail fan with the white name tag */
  for(const [a,l] of [[2.0,16],[2.25,17],[2.5,15]]){v2limb(p,30,50,30+Math.cos(a)*l,50+Math.sin(a)*l,3,2.2,B);}
  for(const y of [58,61])p.line(20,y,27,y,bar);p.poly([[17,60],[21,60],[21,67],[17,67]],'#fbfbf4');p.line(18,62,20,62,'#c8343c');p.line(18,64,20,64,'#2a2a2a');
  /* far wing behind */
  if(spread)v2wing(p,26,30,-2.3,30,p.R(B)[2],bar,tip);else if(flap)v2wing(p,26,30,-0.5,28,p.R(B)[2],bar,tip);else v2wing(p,22,31,1.85,26,p.R(B)[2],bar,tip);
  /* legs: scaly, talons; forward when striking */
  for(const [x,f] of [[27,0],[35,0]]){const lx=strike?x+10:x,ly=strike?56:62+hop;v2limb(p,x,48,lx,ly,2.4,1.8,B);v2limb(p,lx,ly,lx+(strike?3:0),ly+6,1.6,1.4,Y);
    const fx=lx+(strike?3:0),fy=ly+6;for(const d of [-2,0,2])p.line(fx,fy,fx+d+(strike?2:1),fy+3,N);p.line(fx,fy,fx-2,fy+2,N);
    p.line(lx-1,ly-1,lx+1,ly-1,st>=2?'#c8343c':'#7a5232');}
  if(st>=2){p.ell(39+(strike?10:0),56,1.6,1.6,st>=3?'#ffd45a':'#c9c2b0');}
  /* body: barred chest, brown back */
  v2limb(p,32,32,34,19,6.5,5.5,B);p.ell(35,26,4,4,W);
  p.ell(31,40,11,12,B);p.ell(34,41,7,10,W);for(let y=34;y<51;y+=3)for(let x=29;x<40;x+=3)p.set(x+(y%2),y,bar);
  /* near wing */
  if(spread)v2wing(p,36,30,-0.9,32,B,bar,tip);else if(flap)v2wing(p,36,30,0.15,30,B,bar,tip);else if(strike)v2wing(p,36,30,-2.7,30,B,bar,tip);else v2wing(p,41,31,1.4,25,B,bar,tip);
  if(flap)for(const [x,y] of [[52,20],[58,28],[54,36],[60,16]]){p.poly([[x,y],[x+5,y-2],[x+7,y],[x+5,y+2]],W);p.line(x,y,x+7,y,bar);}
  /* head: brown crown, white cheek, dark stripe through the eye, hooked beak */
  p.ell(34,16,8,7.4,B);p.ell(36,18,5.5,4.5,W);p.line(30,15,42,15,N);p.line(30,16,40,16,p.R(B)[3]);
  p.poly([[40,15],[46,16],[48,20],[45,22],[44,19],[40,19]],Y);p.poly([[45,19],[48,20],[46,23],[44.5,21]],p.R(Y)[3]);p.set(42,16.5,N);
  if(strike||flap||spread)p.line(41,20,45,21,'#7a2030');
  if(mood===1)p.line(35,14,38,14,N);else{p.ell(36.5,13.8,1.8,1.6,Y);p.set(36.5,13.6,N);p.set(36,13,'#ffffff');p.line(34,12,39,11.5,N);}
  for(const [x,y,a] of [[27,14,3.4],[28,19,2.8]])v2tuft(p,x,y,a,3,B);
  if(st>=3)for(const [x,y] of [[8,20],[58,40],[10,48]]){p.set(x,y,'#ffffff');p.set(x+1,y,'#bff6ee');p.set(x-1,y,'#bff6ee');p.set(x,y+1,'#bff6ee');p.set(x,y-1,'#bff6ee');}
  p.finish();return p;}
PIXU.hawk=(st,g,mood)=>pxHawk2(Math.max(1,Math.min(3,st||1)),mood);

/* goblin flame (dokkaebi-bul): a small imp whose body below the waist is a flickering flame tail, one little horn,
   big eyes and a fanged grin, flame hair, throws fire from its hands. The fire turns blue as it ranks up:
   star 1 orange, star 2 blue-green ghost fire, star 3 white-blue with a gold horn ring and sparkles */
function pxEmber2(st,mood){
  const p=Pix4(64,72),hot=st>=3?['#e8fbff','#7fd8ff','#3d8bff']:st>=2?['#c8fff0','#4fd8c8','#2a8aa0']:['#fff0a0','#ffa040','#e0502a'],
    skin=st>=3?'#9ad8ff':st>=2?'#7ac8c0':'#f08a4a',N='#2a1420',horn='#f1ece0',el=hot[1];
  let [hx,hy,ang,tr]=v2pose(mood,V2CAST,8,10);const walk=mood===3||mood===4,sway=mood===3?2:mood===4?-2:0,hurt=mood===1,act=/fb2|gather|burst|ring/.test(tr);
  /* flame tail: layered tongues of fire, swaying */
  for(const [w,c,dy] of [[13,hot[2],0],[10,hot[1],2],[6,hot[0],5]]){p.poly([[32-w,40],[32+w,40],[32+w*.7+sway,52+dy],[34+sway*1.6,66],[30+sway,58+dy],[27+sway*2,64],[32-w*.8+sway,52+dy]],c);}
  for(const [x,y] of [[20,34],[44,30],[18,48],[46,46]])p.poly([[x-1.4,y+2],[x,y-3],[x+1.4,y+2]],hot[1]);
  if(tr)v2fire(p,tr.split('+').filter(x=>x==='burst'||x==='gather'||x==='ring').join('+')||'-',hx,hy,ang,el);
  /* small torso with a belly glow */
  p.ell(32,36,9,9,skin);p.ell(32,38,5,5,hot[0]);
  /* arms: little claws; fire in the right palm */
  const lh=act?[25,32]:[22,42];v2limb(p,26,32,lh[0],lh[1],2.4,2,skin);p.ell(lh[0],lh[1],2,2,skin);
  v2limb(p,38,32,hx-1,hy,2.4,2,skin);p.ell(hx,hy,2,2,skin);
  v2fire(p,(tr?tr.split('+').filter(x=>x==='fb'||x==='fb2'||x==='T').join('+'):'')||(walk||hurt?'-':'fb'),hx,hy,ang,el);
  /* big round head, flame hair, one horn, big eyes, fanged grin */
  for(const [x,y,h] of [[22,14,10],[27,9,13],[33,7,15],[39,9,12],[43,14,9]])p.poly([[x-3,y+6],[x,y+6-h],[x+3,y+6]],hot[1]);
  for(const [x,y,h] of [[27,12,8],[33,10,10],[38,12,7]])p.poly([[x-2,y+5],[x,y+5-h],[x+2,y+5]],hot[0]);
  p.ell(32,20,10,9,skin);p.ell(22,21,2,3,skin);p.ell(42,21,2,3,skin);
  p.poly([[31,11],[33,4],[35,11]],horn);if(st>=3)p.line(31,10,35,10,'#ffd45a');
  if(hurt){p.line(25,19,29,20,N);p.line(35,20,39,19,N);}
  else for(const [ex,lf] of [[25,1],[35,0]]){p.ell(ex+2,19.5,2.6,3,'#ffffff');p.ell(ex+2+(lf?.6:.6),20,1.5,1.9,N);p.set(ex+1.5,18.6,'#ffffff');p.line(lf?ex:ex+1,16,lf?ex+4:ex+5,lf?17:16,N);}
  p.poly([[26,24],[38,24],[36,28],[28,28]],N);p.poly([[28,24],[30,24],[29,26.5]],'#ffffff');p.poly([[34,24],[36,24],[35,26.5]],'#ffffff');if(act||!hurt)p.ell(32,27,2,1,'#e05a6a');
  if(st>=3)for(const [x,y] of [[8,24],[56,14],[10,56],[56,54]]){p.set(x,y,'#ffffff');p.set(x+1,y,el);p.set(x-1,y,el);p.set(x,y+1,el);p.set(x,y-1,el);}
  p.finish();return p;}
PIXU.ember=(st,g,mood)=>pxEmber2(Math.max(1,Math.min(3,st||1)),mood);

/* a dokkaebi club at (hx,hy), angle a: a thick wooden club widening to the end, iron studs, gold bands at star 3 */
function v2club(p,hx,hy,a,gold){const c=Math.cos(a),s=Math.sin(a),wd=p.R('#8a5a32');
  for(let i=-4;i<26;i++){const w=i<4?1.4:1.4+(i-4)*.17;for(let k=-Math.ceil(w);k<=Math.ceil(w);k++){if(Math.abs(k)>w)continue;p.set(hx+c*i-s*k,hy+s*i+c*k,k<-w*.3?wd[0]:k>w*.4?wd[2]:wd[1]);}}
  for(const [i,k] of [[10,-2],[13,2],[16,-3],[19,2],[22,-3],[22,3],[18,0],[24,0]]){p.set(hx+c*i-s*k,hy+s*i+c*k,'#d6dee9');p.set(hx+c*i-s*k+1,hy+s*i+c*k,'#5a5f70');}
  if(gold)for(const i of [8,25]){for(let k=-5;k<=5;k++)p.set(hx+c*i-s*k*.6,hy+s*i+c*k*.6,'#ffd45a');}}

/* stone goblin (dokkaebi): squat and wide, cracked grey stone skin with moss, two horns, blue crystals on the shoulders,
   underbite with tusks, small glowing eyes, tiger-skin loincloth, a studded club. star 2: more crystals and an iron bracelet;
   star 3: glowing crystal veins, gold-banded club */
function pxRock2(st,mood){
  const p=Pix4(64,72),G='#8b8fa3',M='#6a8a5a',N='#1e1a22',cry=st>=3?'#9ff4ff':'#6fe3ff',tiger='#e0a040';
  const [hx,hy,ang,tr]=v2pose(mood,V2BLADE,8,8),walk=mood===3?1:mood===4?2:0,fL=walk===1?-3:walk===2?3:0,hurt=mood===1,act=!!tr||mood===2||mood===8;
  if(tr)v2trail(p,tr,hx,hy,ang,'#e8e0c8');
  /* short thick legs, big feet */
  for(const [x,f] of [[24,fL],[39,-fL]]){const up=f<0&&walk?1:0;p.poly([[x-6,52],[x+6,52],[x+6+f,64-up],[x-6+f,64-up]],G);p.ell(x+f,66.5-up,8,3.6,G);for(const d of [-4,0,4])p.line(x+f+d,67-up,x+f+d+1,69-up,p.R(G)[3]);}
  /* wide stone body with cracks and moss */
  p.ell(32,42,17,15,G);for(const [x0,y0,x1,y1] of [[22,34,26,40],[26,40,24,46],[38,32,42,38],[40,44,44,48]])p.line(x0,y0,x1,y1,p.R(G)[3]);
  for(const [x,y,r] of [[19,40,3],[44,36,2.4],[30,32,2.2]])p.ell(x,y,r,r*.7,M);
  if(st>=3)for(const [x0,y0,x1,y1] of [[22,34,26,40],[38,32,42,38]])p.line(x0+1,y0,x1+1,y1,cry);
  /* tiger-skin loincloth with stripes */
  p.poly([[18,48],[46,48],[44,58],[20,58]],tiger);for(const x of [22,28,34,40])p.line(x,49,x+2,56,'#2a2020');p.line(18,48,46,48,'#5a3a22');
  /* crystals on the shoulders (more at star 2) */
  const cs=st>=2?[[17,24,9],[21,22,7],[45,23,9],[42,21,7],[49,27,6]]:[[18,24,8],[46,24,8]];
  for(const [x,y,h] of cs){p.poly([[x-2.4,y+3],[x,y-h+3],[x+2.4,y+3]],cry);p.line(x,y-h+4,x,y+2,'#ffffff');}
  /* far arm */
  const lh=act?[22,40]:[14,50];v2limb(p,19,32,lh[0],lh[1],5,4.4,p.R(G)[2]);p.ell(lh[0],lh[1]+2,4.4,3.8,p.R(G)[2]);
  /* near arm, club, fist */
  v2limb(p,45,32,hx-1,hy-1,5,4.4,G);if(st>=2){const mx=(45+hx)/2,my=(32+hy)/2;v2limb(p,mx-1,my,mx+1,my,4.8,4.8,'#5a5f70');}
  v2club(p,hx,hy,ang,st>=3);p.ell(hx,hy,4.2,3.8,G);
  /* head: low on the shoulders, horns, heavy brow, small glowing eyes, underbite with tusks */
  p.poly([[23,8],[20,-1],[27,6]],'#f1ece0');p.poly([[41,8],[44,-1],[37,6]],'#f1ece0');
  p.ell(32,15,11,9,G);p.ell(27,9,3,2,M);
  p.poly([[22,11],[42,11],[40,14],[24,14]],p.R(G)[3]);
  if(hurt){p.line(25,15,29,15,N);p.line(35,15,39,15,N);}
  else for(const ex of [25,35]){p.ell(ex+2,15,2.4,1.6,N);p.set(ex+1,15,'#ffe14a');p.set(ex+2,15,'#ffe14a');}
  p.poly([[24,19],[40,19],[38,25],[26,25]],p.R(G)[2]);p.line(25,20,39,20,N);
  for(const x of [26,37])p.poly([[x,21],[x+2,21],[x+1,15]],'#f1ece0');
  if(act)p.poly([[28,20],[36,20],[35,23],[29,23]],'#4a141c');
  if(st>=3)for(const [x,y] of [[6,30],[58,18],[56,52]]){p.set(x,y,'#ffffff');p.set(x+1,y,cry);p.set(x-1,y,cry);p.set(x,y+1,cry);p.set(x,y-1,cry);}
  p.finish();return p;}
PIXU.rock=(st,g,mood)=>pxRock2(Math.max(1,Math.min(3,st||1)),mood);

/* shadow goblin: a smoky imp that dissolves into shadow below the waist (floats), long thin arms with long shadow claws,
   a tattered smoke hood with two small horns, glowing white eyes and a crescent grin. frames: idle hover, claw rake (C),
   crouch in smoke (smoke), claws driven into the ground with shadow spikes (gs). star 2: violet flame eyes, longer claws;
   star 3: violet rim glow, golden eyes, sparkles */
function pxShade2(st,mood){
  let tk=[];if(typeof mood==='string')tk=mood.split(',')[3].split('+');
  const has=t=>tk.indexOf(t)>=0,rake=has('C')||mood===5||mood===6,smoke=has('smoke'),spike=has('gs'),raise=mood===2||mood===8||(typeof mood==='string'&&!rake&&!smoke&&!spike);
  const p=Pix4(64,72),B='#3a2a5c',D='#1e1430',L='#6a4ab0',eye=st>=3?'#ffd45a':st>=2?'#d8a0ff':'#fff6c8',cl=st>=2?13:10;
  const walk=mood===3||mood===4,sway=mood===3?2:mood===4?-2:0,hurt=mood===1,bob=smoke?6:0;
  /* rim glow at star 3 */
  if(st>=3){p.ell(32,30+bob,17,22,'#5a2a9a');}
  /* smoky lower body trailing into wisps */
  for(const [x,y,r] of [[32,44,10],[28+sway,52,8],[36+sway,54,7],[30+sway*1.5,60,5.5],[38+sway*1.5,62,4],[26+sway*2,66,3]])p.ell(x,y+bob*.5,r,r*.85,B);
  for(const [x,y,r] of [[24,58,2.4],[42,58,2],[34,68,2]])p.ell(x+sway,y,r,r,D);
  if(smoke||spike){const sm=p.R('#4a4060');for(const [x,y,r] of [[14,62,5],[24,66,6],[42,66,5.5],[52,60,4]])p.ell(x,y,r,r*.8,sm);}
  if(spike)for(const [x,h] of [[44,14],[50,10],[56,16],[38,9]])p.poly([[x-2.4,68],[x,68-h],[x+2.4,68]],D);
  /* torso */
  p.ell(32,34+bob,9,10,B);p.ell(32,36+bob,5,6,L);
  /* arms with long claws */
  const claw=(sx,sy,hx,hy,a)=>{v2limb(p,sx,sy,hx,hy,2.4,1.8,B);for(const d of [-2,0,2]){const c=Math.cos(a+d*.12),s=Math.sin(a+d*.12);p.line(hx+d*.6,hy,hx+c*cl+d*.6,hy+s*cl,D);p.set(hx+c*cl+d*.6,hy+s*cl,'#c8b8ff');}};
  if(rake){claw(25,30+bob,18,40,1.3);claw(39,30+bob,50,40,0.9);for(const o of [0,4,8])for(let i=0;i<18;i++){const x=Math.round(42+o+i*.7),y=Math.round(12+i*1.9);p.set(x,y,i%3?'#d8c8ff':'#7a5ab0');}}
  else if(spike){claw(25,30+bob,22,50,1.5);claw(39,30+bob,42,52,1.4);}
  else if(raise){claw(25,30+bob,20,18,-1.9);claw(39,30+bob,46,18,-1.2);}
  else{claw(25,30+bob,17,42,1.7);claw(39,30+bob,47,42,1.4);}
  /* hood of smoke with horns, face */
  for(const [x,y,r] of [[24,16,5],[40,16,5],[32,10,7],[26,24,4],[38,24,4]])p.ell(x,y+bob,r,r,B);
  p.poly([[24,10+bob],[22,2+bob],[27,8+bob]],'#c9c2d8');p.poly([[40,10+bob],[42,2+bob],[37,8+bob]],'#c9c2d8');
  p.ell(32,18+bob,7.5,7,D);
  if(hurt){p.line(27,17+bob,30,18+bob,eye);p.line(34,18+bob,37,17+bob,eye);}
  else for(const ex of [28,35]){p.poly([[ex-2,16+bob],[ex+2,15+bob],[ex+2,18+bob],[ex-1,18.5+bob]],eye);p.set(ex,16+bob,'#ffffff');}
  for(let i=0;i<9;i++){const x=28+i,y=22+bob+Math.round(Math.sin(i/8*Math.PI)*1.6);p.set(x,y,eye);}
  for(const x of [29,32,35])p.set(x,23+bob,eye);
  if(st>=3)for(const [x,y] of [[8,24],[56,12],[52,56]]){p.set(x,y,'#ffe8ff');p.set(x+1,y,'#b07aff');p.set(x-1,y,'#b07aff');p.set(x,y+1,'#b07aff');p.set(x,y-1,'#b07aff');}
  p.finish();return p;}
PIXU.shade=(st,g,mood)=>pxShade2(Math.max(1,Math.min(3,st||1)),mood);

/* ---------- shared for the spirits, dragons and the rest: attack tokens from a free pose, and their effects ---------- */
function v2tk(mood){return typeof mood==='string'?mood.split(',')[3].split('+'):[];}
function v2zig(p,x0,y0,x1,y1,el,n){let px0=x0,py0=y0;n=n||7;for(let i=1;i<=n;i++){const t=i/n,x=x0+(x1-x0)*t+(i<n?(i%2?3:-3):0),y=y0+(y1-y0)*t+(i<n?(i%2?-2:2):0);p.line(px0,py0,x,y,'#ffffff');p.line(px0+1,py0,x+1,y,el);px0=x;py0=y;}}
/* effects by token: fb/fb2/ring/burst/gather/T (v2fire), zap, zapd, breath and spit from the mouth (mx,my), wblade, gust, tail, C rakes */
function v2fx(p,tk,hx,hy,a,el,mx,my){const T=new Set(tk),E=p.R(el);
  const fire=tk.filter(t=>['fb','fb2','ring','burst','gather','T'].indexOf(t)>=0);if(fire.length)v2fire(p,fire.join('+'),hx,hy,a,el);
  if(T.has('zap'))v2zig(p,hx+2,hy,63,hy-2,el);
  if(T.has('zapd'))v2zig(p,54,0,57,62,el,8);
  if(T.has('breath'))for(let i=0;i<24;i++){const w=1+i*.42;for(let j=-w;j<=w;j++)if((i+Math.round(j))%3!==0)p.set(mx+1+i,my+j+i*.12,i<5?'#ffffff':i<13?E[0]:E[1]);}
  if(T.has('spit')){p.ell(mx+7,my,3,3,el);p.ell(mx+6,my-1,1.3,1.3,'#ffffff');for(const d of [-2,0,2])p.line(mx+1,my+d,mx+4,my+d,E[0]);}
  if(T.has('wblade'))for(let t=-1.2;t<=1.2;t+=.04)for(let k=0;k<3;k++)p.set(hx+9+Math.cos(t)*(9-k),hy+Math.sin(t)*(11-k),k?E[0]:'#ffffff');
  if(T.has('gust'))for(const d of [-6,-2,2,6])for(let i=0;i<16;i++)p.set(hx+3+i,hy+d+Math.sin(i/2+d)*1.5,i%4?E[0]:'#ffffff');
  if(T.has('tail'))for(let t=1.9;t<=3.7;t+=.04)for(let k=0;k<3;k++)p.set(24+Math.cos(t)*(20-k),50+Math.sin(t)*(12-k),k?E[0]:'#ffffff');
  if(T.has('W'))for(let i=0;i<10;i++){const t=i/10*6.28;p.set(hx+Math.cos(t)*9,hy+Math.sin(t)*9,'#ffffff');}
  if(T.has('C'))for(const o of [0,4,8])for(let i=0;i<18;i++)p.set(Math.round(41+o+i*.7),Math.round(10+i*1.9),i%3?'#ffffff':'#ffd6d6');}
const V2SPELL={0:[44,40,-0.4,''],1:[44,41,-0.4,''],3:[44,40,-0.4,''],4:[44,40,-0.4,''],7:[44,40,-0.4,''],9:[44,40,-0.4,''],
  2:[44,26,-1.3,'gather'],8:[44,26,-1.3,'gather'],5:[52,34,-0.1,'fb2'],6:[52,34,-0.1,'fb2'],11:[52,34,-0.1,'fb2']};
function v2spark(p,pts,c){for(const [x,y] of pts){p.set(x,y,'#ffffff');p.set(x+1,y,c);p.set(x-1,y,c);p.set(x,y+1,c);p.set(x,y-1,c);}}

/* wind spirit (Dawnstar folk, archer): pale teal skin, swirling cloud hair, a light sleeveless robe, scarves streaming,
   a whirlwind for a lower body; throws wind blades and gusts. star 2: more scarves, jade beads; star 3: white-gold glow,
   cloud crown, sparkles */
function pxWind2(st,mood){
  const p=Pix4(64,72),S='#c8f0ea',robe='#6fc8bc',el='#bff6ee',cloud='#f2fffc',jade='#3aa878';
  let [hx,hy,ang]=v2pose(mood,V2SPELL,8,8);const tk=v2tk(mood),walk=mood===3?2:mood===4?-2:0,hurt=mood===1,act=tk.length>0||mood===2||mood===5;
  /* scarves streaming back */
  v2ribbon(p,[[26,24],[16,22],[8,26],[2,22]],1.8,el);v2ribbon(p,[[38,24],[30,30],[20,34],[10,32]],1.6,robe);if(st>=2)v2ribbon(p,[[34,40],[24,44],[14,42],[6,46]],1.4,el);
  /* whirlwind lower body */
  for(let i=0;i<7;i++){const y=44+i*3.6,w=11-i*1.3,x=32+walk*(i/6);p.ell(x,y,w,1.8,i%2?el:'#ffffff');}
  for(let i=0;i<10;i++){const t=i*.7,y=44+i*2.4;p.set(32+Math.cos(t)*(11-i)+walk*.5,y,robe);}
  /* robe and torso */
  p.poly([[25,24],[39,24],[42,44],[22,44]],robe);p.line(32,26,32,43,p.R(robe)[2]);p.ell(32,30,4,3,p.R(robe)[0]);
  if(st>=2){for(let i=0;i<7;i++){const t=Math.PI*(.2+i*.1);p.ell(32+Math.cos(t)*7,24+Math.sin(t)*4,1.2,1.2,jade);}}
  /* arms */
  const lh=act?[26,32]:[20,40];v2limb(p,25,27,lh[0],lh[1],2.2,1.8,S);p.ell(lh[0],lh[1],1.9,1.9,S);
  v2limb(p,39,27,hx-1,hy,2.2,1.8,S);p.ell(hx,hy,1.9,1.9,S);
  v2fx(p,tk.length?tk:(act?['gather']:[]),hx,hy,ang,el,0,0);
  /* head with cloud hair */
  p.ell(32,15,7,7.4,S);p.poly([[25,14],[39,14],[37.5,19],[35,21.5],[32,22.5],[29,21.5],[26.5,19]],S);
  for(const [x,y,r] of [[24,12,4.4],[28,7,5],[34,5,5.4],[40,9,4.6],[42,15,3.4],[22,18,3]])p.ell(x,y,r,r,cloud);
  if(st>=3){p.poly([[26,6],[28,1],[31,4],[33,0],[35,4],[38,1],[40,6]],'#ffd45a');}
  if(hurt){p.line(27,15,30,15,'#2a5a5a');p.line(34,15,37,15,'#2a5a5a');}
  else{v2eye(p,27,14,'#2a8a8a',p.R(S)[2],true,1);v2eye(p,33,14,'#2a8a8a',p.R(S)[2],false,1);}
  p.line(31,19,33,19,act?'#7a3a40':'#5a8a88');
  if(st>=3)v2spark(p,[[8,12],[56,10],[54,54],[6,44]],'#fff2a0');
  p.finish();return p;}

/* thunder spirit (Dawnstar folk, mage): golden energy body, spiky lightning hair, sharp eyes, a lightning tail below,
   crackling arcs; a ring of thunder drums behind from star 2 (4 drums), star 3 eight glowing drums and sparkles */
function pxBolt2(st,mood){
  const p=Pix4(64,72),S='#ffe9a0',body='#f0b830',el='#ffe14a',N='#5a3a10';
  let [hx,hy,ang]=v2pose(mood,V2SPELL,8,8);const tk=v2tk(mood),hurt=mood===1,act=tk.length>0||mood===2||mood===5,sw=mood===3?2:mood===4?-2:0;
  /* drum ring */
  if(st>=2){const n=st>=3?8:4;for(let i=0;i<n;i++){const t=-Math.PI*(.15+i*.7/(n-1)),x=32+Math.cos(t)*24,y=26+Math.sin(t)*20;p.ell(x,y,3.6,3,st>=3?'#e0a93a':'#a8743e');p.ell(x,y,2,1.6,'#f4e0b0');p.set(x,y,'#c8343c');}
    for(let t=-Math.PI*.95;t<=-.05;t+=.05)p.set(32+Math.cos(t)*24,26+Math.sin(t)*20,'#8a5a32');}
  /* lightning tail */
  v2zig(p,32,44,32+sw,68,el,5);v2zig(p,30,46,26+sw,66,el,4);p.poly([[24,40],[40,40],[36,52],[28,52]],body);
  /* torso */
  p.poly([[24,24],[40,24],[41,42],[23,42]],body);p.poly([[30,28],[34,28],[33,32],[35,32],[30,39],[31,34],[29,34]],'#ffffff');
  for(const [x,y] of [[20,30],[44,34],[18,44],[46,46]])p.poly([[x,y-3],[x+2,y],[x,y],[x+2,y+3]],el);
  /* arms */
  const lh=act?[26,32]:[20,40];v2limb(p,25,27,lh[0],lh[1],2.4,2,S);p.ell(lh[0],lh[1],2,2,S);
  v2limb(p,39,27,hx-1,hy,2.4,2,S);p.ell(hx,hy,2,2,S);
  v2fx(p,tk.length?tk:(act?['gather']:[]),hx,hy,ang,el,0,0);
  if(!act&&!hurt)for(const d of [-3,0,3])p.set(hx+d,hy-4-(d?0:1),'#ffffff');
  /* head: spiky lightning hair */
  p.ell(32,15,7,7.4,S);p.poly([[25,14],[39,14],[37.5,19],[35,21.5],[32,22.5],[29,21.5],[26.5,19]],S);
  for(let i=0;i<7;i++){const a=Math.PI*(1.05+i*.15);p.poly([[32+Math.cos(a)*6,12+Math.sin(a)*5],[32+Math.cos(a+.1)*16,12+Math.sin(a+.1)*14],[32+Math.cos(a+.2)*6,12+Math.sin(a+.2)*5]],el);}
  p.ell(32,9,8,4,el);
  if(hurt){p.line(27,15,30,15,N);p.line(34,15,37,15,N);}
  else{v2eye(p,27,14,'#c06a10',p.R(S)[2],true);v2eye(p,33,14,'#c06a10',p.R(S)[2],false);p.line(26,12,30,13,N);p.line(34,13,38,12,N);}
  if(act)p.poly([[30,19],[34,19],[33,21],[31,21]],'#7a3a10');else p.line(30,19,34,19,N);
  if(st>=3)v2spark(p,[[8,40],[56,44],[6,60]],'#fff6c8');
  p.finish();return p;}
PIXU.shade=(st,g,mood)=>pxShade2(Math.max(1,Math.min(3,st||1)),mood);
PIXU.wind=(st,g,mood)=>pxWind2(Math.max(1,Math.min(3,st||1)),mood);
PIXU.bolt=(st,g,mood)=>pxBolt2(Math.max(1,Math.min(3,st||1)),mood);

/* ---------- dragon-kin on one body, three-quarter view facing right: horned head with a snout, wings, a thick tail,
   digitigrade legs, scaled belly. kinds:
   whelp (Dragonling): small, green, little wings, a small sword;   salam (Salamander): flat lizard head, flame crest and tail tip;
   star (Star Dragon): blue-violet with star-speckled wings;         dawn (Dawn Dragon): big, red-gold, long horns, whiskers, sun halo;
   rain (Mireu): blue serpent-dragon, no wings, long whiskers, a pearl and a rain cloud.
   frames: tokens breath/spit from the mouth, gather spreads the wings, fb2 orb from the hand, C claw swipe, tail whip ---------- */
const DRAKE={whelp:{F:'#6ab04a',L:'#f3e3a0',horn:'#f1ece0',wing:'#4a8a3a',el:'#ffb347',size:.86},
  salam:{F:'#f07a2f',L:'#ffd08a',horn:'#8a2a1a',wing:null,el:'#ff8a3d',size:.92},
  star:{F:'#7a86f0',L:'#dfe4ff',horn:'#ffc94d',wing:'#3a3a9a',el:'#c8d0ff',size:1},
  dawn:{F:'#d0403a',L:'#ffd9a0',horn:'#ffc94d',wing:'#a83030',el:'#ffb347',size:1.08},
  rain:{F:'#3a50a0',L:'#dff6ff',horn:'#ffc94d',wing:null,el:'#9fe3ff',size:1}};
function pxDrake2(kind,st,mood){
  const K=DRAKE[kind],p=Pix4(64,72),F=K.F,L=K.L,fd=p.R(F),N='#1e1418',claw='#ece6d8',el=st>=3&&kind==='salam'?'#9fe3ff':K.el;
  let tk=v2tk(mood);if(typeof mood==='number'){if(mood===2||mood===8)tk=['gather'];if(mood===5||mood===6||mood===11)tk=kind==='whelp'?[]:['C'];}
  const T=new Set(tk),walk=mood===3?1:mood===4?2:0,fL=walk===1?-3:walk===2?3:0,hurt=mood===1,small=kind==='whelp',z=K.size;
  const dy=small?6:0,open=T.has('breath')||T.has('spit')||T.has('C')||T.has('gather');
  /* star 3 of the dawn dragon: sun halo; rain dragon: cloud */
  if(kind==='dawn'&&st>=3)for(let i=0;i<14;i++){const t=i/14*6.283;p.line(34+Math.cos(t)*12,14+Math.sin(t)*12,34+Math.cos(t)*(i%2?16:19),14+Math.sin(t)*(i%2?16:19),'#ffe58a');}
  if(kind==='rain')for(const [x,y,r] of [[10,8,5],[18,5,6],[26,7,5],[6,14,4]])p.ell(x,y,r,r*.8,'#c8d8f0');
  /* wings (spread when gathering power) */
  if(K.wing){const W=K.wing,sp=T.has('gather'),ws=small?.6:z,sx=24,sy=28+dy;
    const tips=sp?[[-20,-24],[-26,-12],[-24,0]]:[[-14,-10],[-18,0],[-14,8]];
    for(const [tx,ty] of tips)v2limb(p,sx,sy,sx+tx*ws,sy+ty*ws,1.6,.8,p.R(W)[2]);
    p.poly([[sx,sy],[sx+tips[0][0]*ws,sy+tips[0][1]*ws],[sx+tips[1][0]*ws*.8,sy+tips[1][1]*ws*.9+3],[sx+tips[2][0]*ws,sy+tips[2][1]*ws],[sx-2,sy+10*ws]],W);
    if(kind==='star')for(const [x,y] of [[-10,-6],[-16,-2],[-8,2],[-18,-12]])p.set(sx+x*ws,sy+y*ws,'#fff6c8');}
  /* tail */
  const tl=kind==='rain'?30:22;v2ribbon(p,[[24,52],[14,56],[8,62],[3+(T.has('tail')?-2:0),66]],small?3.4:4.6,F);
  for(const [x,y] of [[16,54],[10,59],[5,64]])p.poly([[x-2,y],[x,y-4],[x+2,y]],kind==='rain'?'#ffc94d':L);
  if(kind==='salam'){p.ell(3,66,3.4,3.4,el);p.ell(3,65,1.6,1.6,'#ffffff');}
  /* legs (the rain dragon floats on its long body instead) */
  if(kind!=='rain')for(const [x,f] of [[26,fL],[38,-fL]]){const up=f<0&&walk?1:0;p.ell(x,54+dy*.5,6*z,6.5*z,F);v2limb(p,x+1,58+dy*.5,x+4+f,63-up,4*z,3*z,F);v2limb(p,x+4+f,63-up,x+2+f,67-up,3*z,2.6*z,F);
    p.ell(x+4+f,68.5-up,4.2,2,F);for(const d of [-2,0,2])p.line(x+6+f+d,69-up,x+7+f+d,70-up,claw);}
  else{v2ribbon(p,[[34,46],[40,56],[34,64],[24,66]],6,F);for(let i=0;i<5;i++)p.line(36+i*.8,50+i*3,40+i*.6,50+i*3,L);}
  /* body with a scaled belly */
  p.ell(31,42+dy*.6,12*z,12*z,F);p.ell(35,43+dy*.6,6.5*z,9.5*z,L);for(let y=36;y<53;y+=3)p.line(31,y+dy*.6,39,y+dy*.6,p.R(L)[2]);
  for(const [x,y] of [[22,38],[24,48],[28,34]])p.set(x,y+dy*.6,fd[0]);
  /* star 2: chest piece by kind */
  if(st>=2&&kind!=='whelp'){const g=kind==='star'||kind==='dawn'||kind==='rain'?'#ffc94d':'#c8a040';p.ell(36,34+dy*.6,4,2.4,g);p.set(36,33+dy*.6,'#ffffff');}
  if(small&&st>=2){p.poly([[25,38],[39,38],[40,50],[24,50]],'#7a5232');p.line(32,38,32,50,'#5a3a22');}
  /* far arm */
  v2limb(p,24,34+dy,21,47+dy,3.4,2.8,fd[2]);p.ell(21,49+dy,3,2.6,fd[2]);
  /* near arm: claw swipe, orb, sword (whelp) or idle */
  let hx=44,hy=46+dy,ang=-1;
  if(small){[hx,hy,ang]=v2pose(mood,V2BLADE,8,10);const trk=v2tk(mood).join('+')||(V2BLADE[mood]||V2BLADE[0])[3];
    if(trk)v2trail(p,trk,hx,hy,ang,null);v2limb(p,38,34+dy,hx-1,hy,3,2.6,F);pxBladeAt(p,'blade',p.R(st>=3?'#fff2b0':'#c9d2de'),p.R(st>=3?'#ffd45a':'#8a6a3a'),p.R('#4a3a30'),hx,hy,ang);p.ell(hx,hy,2.6,2.4,F);}
  else if(T.has('C')){v2limb(p,38,34,48,40,4,3.4,F);v2limb(p,48,40,52,46,3.4,3,F);p.ell(53,48,4.2,3.6,F);for(const d of [-3,-1,1,3])p.line(53+d,51,54+d,55,claw);}
  else if(T.has('fb2')){v2limb(p,38,34,48,34,4,3.4,F);p.ell(50,34,3.6,3.2,F);hx=52;hy=34;ang=0;}
  else{v2limb(p,38,34,43,44,4,3.4,F);p.ell(44,47,3.8,3.2,F);for(const d of [-2,0,2])p.line(44+d,50,45+d,53,claw);}
  /* head: neck, horns, crest, snout, eye; mouth open when attacking */
  const hy0=dy,HX=small?1:0;v2limb(p,31,36+hy0,34,22+hy0,6*z,5*z,F);
  const hl=kind==='dawn'?14:10;p.poly([[29,12+hy0],[29-hl*.8,2+hy0-hl*.2],[27,8+hy0],[33,10+hy0]],K.horn);p.poly([[34,10+hy0],[34+hl*.3,hy0-hl*.5],[37,9+hy0]],K.horn);
  if(kind==='salam'||(kind==='whelp'&&st>=3)){for(const [x,h] of [[26,8],[30,10],[34,7]])p.poly([[x-2,10+hy0],[x,10+hy0-h],[x+2,10+hy0]],kind==='salam'?el:'#ffd45a');}
  p.ell(33,16+hy0,8.4*z,7.4*z,F);
  const snL=kind==='salam'?14:12;p.poly([[36,13+hy0],[36+snL,15+hy0],[38+snL,18+hy0],[36+snL,21+hy0],[37,22+hy0]],F);p.poly([[38,19+hy0],[36+snL,19.5+hy0],[35+snL,21.6+hy0],[38,22+hy0]],L);
  p.set(46+snL-12,15.5+hy0,N);
  if(open){p.poly([[38,20+hy0],[36+snL,20+hy0],[34+snL,25+hy0],[39,24+hy0]],'#4a141c');for(const x of [40,44,47])p.poly([[x,20+hy0],[x+1.3,20+hy0],[x+.6,22.4+hy0]],'#ffffff');}
  if(hurt){p.line(33,13+hy0,36,14+hy0,N);}else{p.poly([[33,12.6+hy0],[37,12+hy0],[36.4,14.6+hy0],[33,14.6+hy0]],'#ffd23a');p.line(35,12.4+hy0,35,14.6+hy0,N);p.line(32,(open?10:11)+hy0,37,11+hy0,N);}
  if(kind==='dawn'||kind==='rain'){v2ribbon(p,[[44,22+hy0],[48,28+hy0],[46,34+hy0]],1,'#f4e0a0');v2ribbon(p,[[40,22+hy0],[42,30+hy0],[39,36+hy0]],.9,'#f4e0a0');}
  if(kind==='rain'){p.ell(hx+4,hy-6,3.4,3.4,'#cfefff');p.ell(hx+3,hy-7,1.4,1.4,'#ffffff');if(st>=3)for(let i=0;i<6;i++)p.line(8+i*4,14,6+i*4,20,'#9fe3ff');}
  v2fx(p,tk.filter(t=>t!=='C'||!small),hx,hy,ang,el,38+snL,21+hy0);
  if(st>=3)v2spark(p,[[8,30],[58,8],[56,56]],kind==='star'||kind==='rain'?'#c8d0ff':'#ffe58a');
  p.finish();return p;}
for(const [id,kind] of [['whelp','whelp'],['salam','salam'],['stardrake','star'],['elder','dawn'],['mireu','rain']])PIXU[id]=(st,g,mood)=>pxDrake2(kind,Math.max(1,Math.min(3,st||1)),mood);

/* mist serpent (imugi, a serpent not yet a dragon): coiled S-shaped body rising from the ground, small horn nubs,
   teal scales with a cream belly, mist around it. frames: bite (head forward, jaws wide), tail whip, coil (W).
   star 2: a pearl held in the coil; star 3: budding dragon horns, glowing pearl, sparkles */
function pxImugi2(st,mood){
  const p=Pix4(64,72),F='#3a9a9a',L='#e8f4e0',N='#122020',fd=p.R(F),el='#9fe3ff';
  let tk=v2tk(mood);if(typeof mood==='number'){if(mood===2||mood===8)tk=['W'];if(mood===5||mood===6||mood===11)tk=['bite'];}
  const T=new Set(tk),bite=T.has('bite')||(typeof mood==='string'&&!T.has('tail')&&!T.has('W')&&+mood.split(',')[0]>40),hurt=mood===1,sw=mood===3?2:mood===4?-2:0,X=bite?4:0;
  /* mist */
  for(const [x,y,r] of [[10,62,5],[20,66,6],[44,66,6],[54,60,4.5]])p.ell(x,y,r,r*.7,'#c8dcdc');
  /* coils: ground loop, middle loop, neck */
  const body=[[14+sw,64],[30,68],[46,62],[44,52],[26,50],[18,42],[26,34],[38,32]];v2ribbon(p,body,7,F);
  for(let i=0;i<body.length-1;i++){const [x0,y0]=body[i],[x1,y1]=body[i+1];for(let t=0;t<1;t+=.2)p.line(x0+(x1-x0)*t,y0+(y1-y0)*t+3,x0+(x1-x0)*t+2,y0+(y1-y0)*t+3,L);}
  for(const [x,y] of [[24,64],[40,60],[30,50],[22,40]])p.set(x,y-3,fd[0]);
  if(T.has('W'))for(let i=0;i<10;i++){const t=i/10*6.28;p.set(32+Math.cos(t)*16,48+Math.sin(t)*12,'#ffffff');}
  if(st>=2){p.ell(30,46,3.4,3.4,st>=3?'#fff6c8':'#cfefff');p.ell(29,45,1.4,1.4,'#ffffff');}
  /* neck and head */
  v2limb(p,38,32,40+X,22,5,4.6,F);
  p.ell(40+X,17,7.6,6.6,F);p.poly([[43+X,14],[54+X,16],[56+X,19],[53+X,22],[44+X,22]],F);p.poly([[45+X,19.5],[54+X,20],[53+X,22],[45+X,22]],L);
  p.set(53+X,16.5,N);
  const hn=st>=3?'#ffc94d':'#cfe8e0';p.poly([[36+X,12],[34+X,6],[38+X,10]],hn);p.poly([[41+X,11],[41+X,5],[44+X,10]],hn);
  if(bite){p.poly([[45+X,21],[56+X,21],[54+X,27],[46+X,26]],'#4a141c');for(const x of [47,51,54])p.poly([[x+X,21],[x+1.3+X,21],[x+.6+X,23.6]],'#ffffff');p.poly([[48+X,24],[52+X,24],[50+X,28]],'#d86a7a');}
  else{p.line(45+X,22,54+X,21,N);p.line(53+X,21,57+X,24,'#d86a7a');p.line(57+X,24,59+X,22,'#d86a7a');p.line(57+X,24,59+X,26,'#d86a7a');}
  if(hurt)p.line(40+X,15,43+X,16,N);else{p.poly([[40+X,14.6],[44+X,14],[43.4+X,16.6],[40+X,16.6]],'#ffd23a');p.line(42+X,14.4,42+X,16.6,N);}
  v2fx(p,[...T].filter(t=>t==='tail'||t==='T'),44,40,0,el,0,0);
  if(st>=3)v2spark(p,[[8,30],[58,8],[60,44]],el);
  p.finish();return p;}

/* General Duduri, General of the Club: a big blue goblin general, wild black hair and one horn, gold earrings, tiger pelt,
   iron bracers, a big grin, a golden wish-granting club. star 2: gold armour pieces; star 3: coin sparkles */
function pxDuduri2(st,mood){
  const p=Pix4(64,72),G='#5a9ad8',N='#1e1a22',tiger='#e0a040',gold='#e3b341',iron='#5a5f70';
  const [hx,hy,ang,tr]=v2pose(mood,V2BLADE,8,7),walk=mood===3?1:mood===4?2:0,fL=walk===1?-3:walk===2?3:0,hurt=mood===1,act=!!tr||mood===2||mood===8;
  if(tr)v2trail(p,tr,hx,hy,ang,'#fff2a0');
  for(const [x,f] of [[24,fL],[39,-fL]]){const up=f<0&&walk?1:0;p.poly([[x-6,52],[x+6,52],[x+6+f,64-up],[x-6+f,64-up]],G);p.poly([[x-7+f,60-up],[x+7+f,60-up],[x+7+f,63-up],[x-7+f,63-up]],iron);p.ell(x+f,66.5-up,8,3.6,G);}
  p.ell(32,40,17,15,G);p.ell(32,43,9,9,p.R(G)[0]);
  p.poly([[16,48],[48,48],[46,58],[18,58]],tiger);for(const x of [21,27,33,39,44])p.line(x,49,x+2,56,N);p.poly([[14,46],[50,46],[50,49],[14,49]],'#6a3a22');p.ell(32,47.5,2.6,2,gold);
  if(st>=2){for(const s of [-1,1]){const sx=32+s*15;p.ell(sx,28,7,5,gold);p.line(sx-6,30,sx+6,30,p.R(gold)[3]);}p.poly([[26,30],[38,30],[37,38],[27,38]],gold);}
  const lh=act?[22,38]:[14,48];v2limb(p,19,30,lh[0],lh[1],5,4.4,p.R(G)[2]);p.ell(lh[0],lh[1]+2,4.4,3.8,p.R(G)[2]);
  v2limb(p,45,30,hx-1,hy-1,5,4.4,G);{const mx=(45+hx)/2,my=(30+hy)/2;v2limb(p,mx-1,my,mx+1,my,4.8,4.8,iron);}
  v2club(p,hx,hy,ang,true);{const c=Math.cos(ang),s=Math.sin(ang);for(let i=10;i<26;i+=4)p.set(hx+c*i-s*2,hy+s*i+c*2,'#ffe58a');}
  p.ell(hx,hy,4.2,3.8,G);
  /* head: wild hair, one horn, earrings, big grin */
  for(const [x,y,h] of [[20,14,10],[25,8,12],[39,8,12],[44,14,10]])p.poly([[x-4,y+6],[x,y+6-h],[x+4,y+6]],N);
  p.poly([[29,6],[32,-3],[35,6]],'#f1ece0');
  p.ell(32,15,11,9.5,G);p.ell(32,8,10,4,N);
  p.ell(21,18,1.6,2.4,gold);p.ell(43,18,1.6,2.4,gold);
  if(hurt){p.line(25,14,29,14,N);p.line(35,14,39,14,N);}
  else for(const ex of [25,35]){p.ell(ex+2,14,2.6,2.4,'#ffffff');p.ell(ex+2.6,14.4,1.4,1.6,N);p.set(ex+2,13,'#ffffff');p.line(ex-1,11,ex+4,12,N);}
  p.poly([[24,19],[40,19],[38,25],[26,25]],N);for(const x of [26,29,32,35,38])p.poly([[x,19],[x+2,19],[x+1,21.5]],'#ffffff');p.ell(32,23.5,3,1.2,'#e05a6a');
  if(st>=3)v2spark(p,[[8,24],[58,14],[56,54],[6,50]],'#ffd45a');
  p.finish();return p;}

/* General Baeksan, the White Tiger: white fur with black stripes, blue eyes, an armoured shoulder and a blue sash, claws.
   frames like the panther. star 2: steel shoulder and bracer; star 3: gold armour, glowing blue eyes, sparkles */
function pxBaeksan2(st,mood){
  if(typeof mood==='string')mood=mood.split(',')[3].split('+').indexOf('C')>=0?5:2;
  if(mood===6)mood=5;if(mood===8)mood=2;if(mood===9||mood===7)mood=0;
  const p=Pix4(64,72),F='#eef0f6',S='#2a2a36',N='#1a1418',fd=p.R(F),claw='#ece6d8',eye=st>=3?'#7fd0ff':'#3d8bff',armor=st>=3?'#e3b341':st>=2?'#b8c0d0':'#7a8aa8';
  const walk=mood===3?1:mood===4?2:0,fL=walk===1?-3:walk===2?3:0,bite=mood===11,X=bite?3:0,Y=bite?1:0,open=bite||mood===2||mood===5;
  const stripes=(x0,y0,x1,y1,n)=>{for(let i=0;i<n;i++){const t=(i+.5)/n,x=x0+(x1-x0)*t,y=y0+(y1-y0)*t;p.line(x-2,y-1,x+2,y+1,S);}};
  for(let i=0;i<24;i++){const t=i/23,x=20-t*15,y=48-t*18-Math.sin(t*4)*3;p.ell(x,y,2.3-t*.6,2.3-t*.6,F);if(i%4===2)p.line(x-1,y-2,x+1,y+2,S);}p.ell(5,30,2,2,S);
  for(const [x,f] of [[24,fL],[39,-fL]]){const up=f<0&&walk?1:0;p.ell(x,54,6,6.5,F);v2limb(p,x+1,58,x+5+f,63-up,4,3,F);v2limb(p,x+5+f,63-up,x+2+f,67-up,3,2.6,F);
    p.ell(x+4+f,68.5-up,4.2,2,F);for(const d of [-2,0,2])p.line(x+6+f+d,69-up,x+7+f+d,70-up,claw);stripes(x-4,50,x+4,58,3);}
  p.ell(31,42,12.5,12.5,F);stripes(20,34,24,50,4);stripes(40,34,42,50,4);
  v2limb(p,31,34,33,20,7,6,F);
  p.poly([[19,48],[44,48],[44,51],[19,51]],'#3a5a9a');p.poly([[27,50],[37,50],[36,57],[28,57]],'#3a5a9a');
  p.ell(40,30,6.5,5,armor);for(const y of [29,31,33])p.line(34,y,46,y,p.R(armor)[3]);p.poly([[37,26],[42,28],[25,50],[21,48]],'#3a5a9a');
  v2limb(p,24,34,21,50,4,3.2,fd[2]);p.ell(21,52,3.6,3,fd[2]);stripes(21,38,22,48,2);
  const arm=(bx,by,px,py,up)=>{v2limb(p,38,32,bx,by,4.4,3.6,F);v2limb(p,bx,by,px,py,3.6,3.2,F);p.ell(px,py,4.4,3.8,F);stripes(38,34,bx,by,2);for(const d of [-3,-1,1,3])p.line(px+d,py+(up?-3:3),px+d+1,py+(up?-7:7),claw);
    if(st>=2){const mx=(bx+px)/2,my=(by+py)/2;v2limb(p,mx-1,my,mx+1,my,4,4,armor);}};
  if(mood===2)arm(44,24,47,14,1);
  else if(mood===5){arm(48,40,53,46,0);for(const o of [0,4,8])for(let i=0;i<18;i++)p.set(Math.round(41+o+i*.7),Math.round(10+i*1.9),i%3?'#ffffff':'#bfe0ff');}
  else arm(43+(bite?-2:0),45,45+(bite?-2:0),53,0);
  /* tiger head: round ears, wide face, stripes, short muzzle */
  p.ell(27+X,7+Y,3.6,3.4,F);p.ell(27+X,7.4+Y,1.8,1.6,S);p.ell(39+X,7+Y,3.6,3.4,F);p.ell(39+X,7.4+Y,1.8,1.6,S);
  p.ell(33+X,15+Y,10,8.6,F);for(const [x0,y0,x1,y1] of [[33,7,33,11],[30,8,31,11],[36,8,35,11],[24,13,27,14],[24,16,27,16]])p.line(x0+X,y0+Y,x1+X,y1+Y,S);
  p.ell(26+X,18+Y,3,3.4,F);p.ell(39+X,19+Y,6.4,4.6,'#ffffff');p.ell(36+X,20+Y,3,2.6,'#ffffff');p.poly([[40.6+X,15.6+Y],[44.4+X,15.6+Y],[42.5+X,17.8+Y]],'#e88a98');p.line(42.5+X,17.8+Y,42.5+X,19+Y,N);
  if(open){p.poly([[36+X,21+Y],[44+X,21+Y],[43+X,25+Y],[37+X,25+Y]],'#4a141c');for(const x of [37,42])p.poly([[x+X,21+Y],[x+1.4+X,21+Y],[x+.7+X,23.6+Y]],'#ffffff');}
  else{p.line(40+X,21+Y,42.5+X,20+Y,N);p.line(42.5+X,20+Y,45+X,21+Y,N);}
  for(const s of [-1,1]){p.set(40+X,19+Y+s,N);p.set(44+X,19+Y+s,N);p.line(45+X,19+Y+s,49+X,19+Y+s*2,'#9a96a8');}
  if(mood===1){p.line(31+X,13+Y,34+X,14+Y,N);p.line(36+X,13+Y,38+X,13+Y,N);}
  else for(const ex of [31,36]){p.poly([[ex+X,13+Y],[ex+3+X,12.2+Y],[ex+2.6+X,14.6+Y],[ex+X,14.6+Y]],eye);p.line(ex+1.5+X,12.6+Y,ex+1.5+X,14.4+Y,N);p.line(ex-1+X,(open?11:12)+Y,ex+3+X,12+Y,N);}
  if(st>=3)v2spark(p,[[8,14],[58,10],[56,56]],'#bfe6ff');
  p.finish();return p;}

/* General Gaon, General of the Gate: a pale armoured ghost floating on mist, gate-crest helmet with an empty dark face and
   glowing eyes, a ghost-fire lantern, a long sword. star 2: gold trims; star 3: blue ghost-fire aura, glowing blade */
function pxGaon2(st,mood){
  const p=Pix4(64,72),A='#9aa6c8',D='#2a3050',el='#9fd0ff',gold='#e3b341';
  const [hx,hy,ang,tr]=v2pose(mood,V2BLADE),walk=mood===3?2:mood===4?-2:0,hurt=mood===1,act=!!tr||mood===2||mood===8;
  if(st>=3)p.ell(32,34,20,26,'#2a3a6a');
  if(tr)v2trail(p,tr,hx,hy,ang,el);
  for(const [x,y,r] of [[32,52,12],[28+walk,60,9],[36+walk,62,7],[30+walk*1.5,67,5]])p.ell(x,y,r,r*.8,'#c8d0e8');
  p.poly([[19,26],[45,26],[46,44],[48,56],[16,56],[18,44]],A);for(let y=29;y<56;y+=3){p.line(18,y,46,y,p.R(A)[2]);}
  if(st>=2){p.line(19,26,16,56,gold);p.line(45,26,48,56,gold);p.poly([[18,42],[46,42],[46,46],[18,46]],gold);}else p.poly([[18,42],[46,42],[46,46],[18,46]],D);
  for(const s of [-1,1]){const sx=32+s*14;p.ell(sx,27,7,5,A);p.line(sx-6,29,sx+6,29,p.R(A)[3]);}
  p.line(20,46,20,49,'#5a5f70');p.poly([[17,49],[23,49],[22,55],[18,55]],'#3a3f5a');p.ell(20,52,1.8,2.2,el);
  const lh=act?[24,36]:[16,46];v2limb(p,20,29,lh[0],lh[1],3.6,3.2,A);p.ell(lh[0],lh[1]+1,3,2.7,D);
  v2limb(p,44,29,hx-1,hy-1,3.6,3.2,A);v2longblade(p,hx,hy,ang,32,st>=3?'#dff4ff':'#b8c4d8',st>=2?gold:'#5a5f70','#2a2a3a');
  if(st>=3&&!tr){const c=Math.cos(ang),s=Math.sin(ang);for(let i=6;i<32;i+=3)p.set(hx+c*i-s*3,hy+s*i+c*3,el);}
  p.ell(hx,hy,3,2.7,D);
  p.ell(32,14,9,8.6,A);p.ell(32,15,6.6,6.4,D);p.poly([[22,10],[42,10],[43,13],[21,13]],A);
  p.poly([[27,2],[37,2],[37,8],[27,8]],st>=2?gold:A);p.line(29,2,29,8,D);p.line(35,2,35,8,D);p.line(27,4,37,4,D);
  if(hurt){p.line(28,16,31,16,el);p.line(33,16,36,16,el);}else for(const ex of [29,35]){p.ell(ex,16,1.8,1.4,el);p.set(ex,16,'#ffffff');}
  for(const [x,y] of [[10,24],[54,30]])p.ell(x,y,2.4,3,el);
  if(st>=3)v2spark(p,[[8,40],[58,14],[56,56]],el);
  p.finish();return p;}
PIXU.wyvern=(st,g,mood)=>pxImugi2(Math.max(1,Math.min(3,st||1)),mood);
PIXU.duduri=(st,g,mood)=>pxDuduri2(Math.max(1,Math.min(3,st||1)),mood);
PIXU.baeksan=(st,g,mood)=>pxBaeksan2(Math.max(1,Math.min(3,st||1)),mood);
PIXU.gaon=(st,g,mood)=>pxGaon2(Math.max(1,Math.min(3,st||1)),mood);
