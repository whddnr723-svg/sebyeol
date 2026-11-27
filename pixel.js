/* ---------- pixel painter (ASCII only): the four-tone painter Pix4, shared drawing helpers (eyes, limbs, weapons,
   swing trails, spell effects), the sprite registry PIXU and the canvas cache. Characters are painted in
   people.js, beasts.js, spirits.js and foes.js; each registers PIXU[id](star, stage, mood). ---------- */
function hx(c){if(typeof c!=='string'||c[0]!=='#')return null;return [parseInt(c.slice(1,3),16),parseInt(c.slice(3,5),16),parseInt(c.slice(5,7),16)];}
const toHex=a=>'#'+a.map(v=>Math.max(0,Math.min(255,Math.round(v))).toString(16).padStart(2,'0')).join('');
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

/* a long bow held at (hx,hy) aimed at angle a: limbs curve back from the grip, gold tips; drawn = string pulled to the
   cheek with an arrow on it. Returns where the drawing hand sits. */
function v2bow(p,hx,hy,a,drawn,wood,gold,glow){const c=Math.cos(a),s=Math.sin(a),px=-s,py=c,L=27,wd=p.R(wood);
  for(let t=-1;t<=1.0001;t+=.025){const b=6*(1-t*t)*(drawn?1.25:1),x=hx-c*(b-3)+px*L*t,y=hy-s*(b-3)+py*L*t,tip=Math.abs(t)>.84;p.set(x,y,tip?gold:wd[1]);p.set(x+c,y+s,tip?p.R(gold)[2]:wd[2]);}
  const e1=[hx+c*3+px*L,hy+s*3+py*L],e2=[hx+c*3-px*L,hy+s*3-py*L],nk=drawn?[hx-c*13,hy-s*13]:[hx+c*2,hy+s*2];
  p.line(e1[0],e1[1],nk[0],nk[1],'#f1ece0');p.line(e2[0],e2[1],nk[0],nk[1],'#f1ece0');
  if(drawn){p.line(nk[0],nk[1],hx+c*9,hy+s*9,glow||'#e8d6b0');p.set(hx+c*10,hy+s*10,'#ffffff');for(const d of [-1,1])p.set(nk[0]-c+px*d,nk[1]-s+py*d,'#c8343c');}
  return nk;}
const V2BOW={0:[49,33,0,''],1:[49,34,.05,''],3:[49,33,0,''],4:[49,33,0,''],7:[49,33,0,''],2:[50,31,0,'B'],8:[50,31,0,'B'],5:[51,31,0,'T'],6:[51,31,0,'T'],9:[49,33,0,''],11:[51,31,0,'T']};

/* a staff held at (hx,hy) at angle a (pointing to the top end): wood shaft, a paper talisman at the top or a glowing orb */
function v2staff(p,hx,hy,a,orb,cast){const c=Math.cos(a),s=Math.sin(a),wd=p.R('#8a5a32');
  for(let i=-24;i<=22;i++){p.set(hx+c*i,hy+s*i,wd[1]);p.set(hx+c*i-s,hy+s*i+c,wd[2]);}
  const tx=hx+c*25,ty=hy+s*25;
  if(orb){p.ell(tx,ty,3.8,3.8,orb);p.set(tx-1,ty-1,'#ffffff');for(let i=0;i<8;i++){const t=i/8*6.28;p.set(tx+Math.cos(t)*6,ty+Math.sin(t)*6,p.R(orb)[0]);}}
  else{p.poly([[tx-3,ty-4],[tx+3,ty-4],[tx+3,ty+5],[tx-3,ty+5]],'#f5e9b0');p.line(tx,ty-3,tx,ty+4,'#c0392b');p.line(tx-2,ty-1,tx+2,ty-1,'#c0392b');p.line(tx-2,ty+2,tx+2,ty+2,'#c0392b');}
  if(cast)for(const [dx,dy,r] of [[-9,-6,0],[9,-9,1],[-11,6,1],[11,5,0]]){const x=tx+dx,y=ty+dy;p.poly([[x-1.6,y-3],[x+1.6,y-3],[x+1.6,y+3],[x-1.6,y+3]],'#ffe27a');p.line(x,y-2,x,y+2,'#d23a3a');if(r)p.set(x-1,y,'#d23a3a');}}
const V2STAFF={0:[46,42,-1.57,''],1:[46,43,-1.5,''],3:[46,42,-1.57,''],4:[46,42,-1.57,''],7:[46,42,-1.57,''],
  2:[44,32,-1.45,'S'],8:[44,32,-1.45,'S'],5:[50,34,-0.35,'S'],6:[50,34,-0.35,'S'],11:[50,34,-0.35,'S'],9:[46,42,-1.57,'']};

/* a short dagger at (hx,hy), angle a; edge = poison or glow colour along the blade */
function v2dagger(p,hx,hy,a,edge,steel){const c=Math.cos(a),s=Math.sin(a),st=p.R(steel||'#c9d2de');
  for(let i=1;i<13;i++){p.set(hx+c*i,hy+s*i,st[i<11?1:0]);p.set(hx+c*i-s,hy+s*i+c,st[2]);if(edge&&i>2&&i%2)p.set(hx+c*i+s,hy+s*i-c,edge);}
  p.line(hx-s*3,hy+c*3,hx+s*3,hy-c*3,'#8a6a3a');p.line(hx,hy,hx-c*3,hy-s*3,'#3a2a22');}
const V2DAG={0:[45,42,1.35,''],1:[45,43,1.2,''],3:[45,42,1.35,''],4:[45,42,1.35,''],7:[45,42,1.35,''],
  2:[42,30,-0.6,''],8:[42,30,-0.6,''],5:[56,34,0,'T'],6:[56,34,0,'T'],9:[45,42,1.35,''],11:[56,34,0,'T']};

/* a sling in the hand at (hx,hy): strap along angle a with the stone pocket at its end; empty after a throw */
function v2sling(p,hx,hy,a,stone,thrown){const c=Math.cos(a),s=Math.sin(a);p.line(hx,hy,hx+c*9-s,hy+s*9+c,'#6a4424');p.line(hx,hy,hx+c*9+s,hy+s*9-c,'#8a5a32');
  if(!thrown){p.ell(hx+c*10,hy+s*10,2.3,2.3,stone);p.set(hx+c*10-1,hy+s*10-1,'#ffffff');}}
const V2SLING={0:[44,50,1.45,''],1:[44,51,1.4,''],3:[44,50,1.45,''],4:[44,50,1.45,''],7:[44,50,1.45,''],
  2:[40,26,-2.3,''],8:[40,26,-2.3,''],5:[52,38,-0.3,'T'],6:[52,38,-0.3,'T'],9:[44,50,1.45,''],11:[52,38,-0.3,'T']};

/* sling boy: small frame and a big head, braided hair with a red ribbon, short jacket with rolled sleeves, trousers with
   knee wraps, straw sandals, a pouch of stones, freckles and a grin. star 2: green jacket, red headband, leather bracer;
   star 3: blue jacket with gold trim and a fire stone */
/* Hanbyeol, the 17-year-old hero, Goldstar reborn. He grows with each general freed (stage 0-5), each leaving a gift:
   0 village boy with a wooden sword; 1 Mugyeol's real sword and a bracer; 2 Duduri's goblin bead charm and an indigo vest;
   3 Baeksan's white tiger fur collar; 4 Mireu's blue cloud cloak; 5 awakened: white robe with gold, a gold star on the brow,
   a shining gold sword and starlight */
/* a long blade of length n at (hx,hy), angle a: wide steel with a fuller line, guard and a long grip */
function v2longblade(p,hx,hy,a,n,steel,guard,hilt){const c=Math.cos(a),s=Math.sin(a),st=p.R(steel);
  for(let i=2;i<n;i++){const x=hx+c*i,y=hy+s*i,tip=i>n-4;p.set(x,y,tip?st[0]:st[1]);p.set(x-s,y+c,st[2]);p.set(x+s,y-c,st[0]);if(!tip&&i>4){p.set(x-2*s,y+2*c,st[3]||st[2]);}if(i>5&&i<n-5&&i%3===0)p.set(x,y,'#ffffff');}
  p.line(hx+c*2-s*5,hy+s*2+c*5,hx+c*2+s*5,hy+s*2-c*5,p.R(guard)[1]);p.line(hx+c*3-s*5,hy+s*3+c*5,hx+c*3+s*5,hy+s*3-c*5,p.R(guard)[2]);
  p.line(hx,hy,hx-c*6,hy-s*6,p.R(hilt)[1]);p.ell(hx-c*7,hy-s*7,1.3,1.3,guard);}

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

/* a feathered wing from the shoulder (sx,sy) toward angle a, length len: covert band plus primary feathers fanned out */
function v2wing(p,sx,sy,a,len,col,bar,tip){const c=Math.cos(a),s=Math.sin(a),px=-s,py=c;
  p.poly([[sx+px*4,sy+py*4],[sx+c*len*.55+px*6,sy+s*len*.55+py*6],[sx+c*len*.55-px*3,sy+s*len*.55-py*3],[sx-px*3,sy-py*3]],col);
  for(let i=0;i<6;i++){const t=(i-2.5)*.16,cc=Math.cos(a+t),ss=Math.sin(a+t),bx=sx+c*len*.45+px*(i-2)*1.6,by=sy+s*len*.45+py*(i-2)*1.6;
    v2limb(p,bx,by,bx+cc*len*.6,by+ss*len*.6,1.8,1.1,i%2?col:p.R(col)[2]);p.set(bx+cc*len*.55,by+ss*len*.55,tip||bar);}
  for(let k=1;k<4;k++)p.line(sx+c*len*.15*k+px*4,sy+s*len*.15*k+py*4,sx+c*len*.15*k-px*3,sy+s*len*.15*k-py*3,bar);}

/* a dokkaebi club at (hx,hy), angle a: a thick wooden club widening to the end, iron studs, gold bands at star 3 */
function v2club(p,hx,hy,a,gold){const c=Math.cos(a),s=Math.sin(a),wd=p.R('#8a5a32');
  for(let i=-4;i<26;i++){const w=i<4?1.4:1.4+(i-4)*.17;for(let k=-Math.ceil(w);k<=Math.ceil(w);k++){if(Math.abs(k)>w)continue;p.set(hx+c*i-s*k,hy+s*i+c*k,k<-w*.3?wd[0]:k>w*.4?wd[2]:wd[1]);}}
  for(const [i,k] of [[10,-2],[13,2],[16,-3],[19,2],[22,-3],[22,3],[18,0],[24,0]]){p.set(hx+c*i-s*k,hy+s*i+c*k,'#d6dee9');p.set(hx+c*i-s*k+1,hy+s*i+c*k,'#5a5f70');}
  if(gold)for(const i of [8,25]){for(let k=-5;k<=5;k++)p.set(hx+c*i-s*k*.6,hy+s*i+c*k*.6,'#ffd45a');}}

/* stone goblin (dokkaebi): squat and wide, cracked grey stone skin with moss, two horns, blue crystals on the shoulders,
   underbite with tusks, small glowing eyes, tiger-skin loincloth, a studded club. star 2: more crystals and an iron bracelet;
   star 3: glowing crystal veins, gold-banded club */
/* shadow goblin: a smoky imp that dissolves into shadow below the waist (floats), long thin arms with long shadow claws,
   a tattered smoke hood with two small horns, glowing white eyes and a crescent grin. frames: idle hover, claw rake (C),
   crouch in smoke (smoke), claws driven into the ground with shadow spikes (gs). star 2: violet flame eyes, longer claws;
   star 3: violet rim glow, golden eyes, sparkles */
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

/* ---------- dragon-kin on one body, three-quarter view facing right: horned head with a snout, wings, a thick tail,
   digitigrade legs, scaled belly. kinds:
   whelp (Dragonling): small, green, little wings, a small sword;   salam (Salamander): flat lizard head, flame crest and tail tip;
   star (Star Dragon): blue-violet with star-speckled wings;         dawn (Dawn Dragon): big, red-gold, long horns, whiskers, sun halo;
   rain (Mireu): blue serpent-dragon, no wings, long whiskers, a pearl and a rain cloud.
   frames: tokens breath/spit from the mouth, gather spreads the wings, fb2 orb from the hand, C claw swipe, tail whip ---------- */
/* blade or club at angle a (radians, 0 = forward) from the hand */
/* blade or club at angle a (radians, 0 = forward) from the hand: used for the in-between frames */
function pxBladeAt(p,W,wpn,guard,hilt,hx,hy,a){const th=W==='club',c=Math.cos(a),s=Math.sin(a),n=th?24:27;
  for(let i=2;i<n;i++){const x=Math.round(hx+c*i),y=Math.round(hy+s*i);p.set(x,y,i<n-4?wpn[1]:wpn[0]);p.set(x-Math.round(s),y+Math.round(c),wpn[2]);p.set(x+Math.round(s),y-Math.round(c),wpn[0]);
    if(th&&i>8){p.set(x-2*Math.round(s),y+2*Math.round(c),wpn[2]);p.set(x+2*Math.round(s),y-2*Math.round(c),wpn[0]);}}
  if(!th)p.line(Math.round(hx+c*2-s*4),Math.round(hy+s*2+c*4),Math.round(hx+c*2+s*4),Math.round(hy+s*2-c*4),guard[1]);
  p.line(hx,hy,Math.round(hx-c*4),Math.round(hy-s*4),hilt[1]);}
const PIXU={};
const PIXCACHE={};
function pixCanvas(id,st,stage,mood){const k=id+'|'+st+'|'+stage+'|'+mood;if(PIXCACHE[k])return PIXCACHE[k];
  const p=PIXU[id](st||1,stage||0,mood||0),v=document.createElement('canvas');v.width=p.W;v.height=p.H;p.paint(v.getContext('2d'),1,0,0);return PIXCACHE[k]=v;}
/* draws a pixel character into drawSprite's -1..1 box, feet at .88 */
function drawPixInBox(c,id,st,stage,mood){const v=pixCanvas(id,st,stage,mood),h=2.0*Math.max(1,v.height/64),w=h*v.width/v.height,sm=c.imageSmoothingEnabled;
  c.imageSmoothingEnabled=false;c.drawImage(v,-w/2+.03,.9-h,w,h);c.imageSmoothingEnabled=sm;}

/* draws a character into a -1..1 box (feet near .9); part 1 (the old separate weapon arm) draws nothing */
function drawSprite(c,id,st,mood,part){let stage=0;if(id.indexOf('hanbyeol')===0){stage=+id.slice(8)||0;id='hanbyeol';}
  if(part||!PIXU[id])return;drawPixInBox(c,id,st,stage,mood||0);}
