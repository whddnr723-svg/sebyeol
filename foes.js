/* ---------- v2 enemies (ASCII only): the same four-tone painter as chars.js. Loaded after chars.js. ---------- */
/* a small hand with claw-like fingers pointing along angle a */
function v2hand(p,x,y,a,c,nail){const cc=Math.cos(a),s=Math.sin(a);p.ell(x,y,2.6,2.3,c);for(const d of [-1.6,0,1.6])p.line(x+cc*2-s*d,y+s*2+cc*d,x+cc*4.6-s*d*1.3,y+s*4.6+cc*d*1.3,nail||p.R(c)[2]);}
/* string moods carry the hand position; numbers use the table */
const ZOMB={0:[46,36,0,''],7:[46,37,.1,''],9:[46,36,0,''],1:[42,40,.4,''],3:[47,35,0,''],4:[45,37,0,''],2:[42,22,-1,''],8:[42,22,-1,''],5:[53,34,0,'T'],6:[53,34,0,'T'],11:[53,34,0,'T']};

/* zombie: hunched, arms reaching forward, torn purple shirt, rotten green skin, one stitched eye, slack jaw, bare feet */
function pxZombie2(mood){
  const p=Pix4(64,72),S='#8fbf78',sd=p.R(S),shirt='#6b4f8a',pant='#4a4a5a',hurt=mood===1;
  const [hx,hy,ang,tr]=v2pose(mood,ZOMB),walk=mood===3?1:mood===4?2:0,fL=walk===1?-3:walk===2?3:0;
  if(tr.indexOf('T')>=0)for(const d of [-3,0,3])p.line(hx-15,hy+d,hx-7,hy+d,'#ffffff');
  for(const [x,f] of [[23,fL],[35,-fL]]){const up=f<0&&walk?1:0;p.poly([[x,49],[x+7,49],[x+7+f,61-up],[x+f,61-up]],pant);
    p.poly([[x+f,60-up],[x+2+f,63-up],[x+4+f,60-up],[x+6+f,63-up],[x+7+f,60-up]],pant);p.poly([[x+1+f,62-up],[x+6+f,62-up],[x+9+f,68-up],[x-1+f,68-up]],S);
    for(const d of [2,5,8])p.set(x+d+f,68-up,sd[2]);}
  v2limb(p,25,28,hx-6,hy+4,3,2.6,sd[2]);v2limb(p,25,28,(25+hx-6)/2,(28+hy+4)/2,3.4,3.2,p.R(shirt)[2]);v2hand(p,hx-6,hy+4,ang,sd[2]);
  p.poly([[21,27],[39,24],[43,50],[20,51]],shirt);
  for(const x of [20,25,30,35,40])p.poly([[x,49],[x+4,49],[x+1.5,55]],shirt);
  p.poly([[29,33],[34,31],[33,38],[30,37]],S);p.line(30,34,33,34,sd[2]);p.line(30,36,32,36,sd[2]);
  p.line(21,45,42,44,'#8a6a3a');p.line(21,46,42,45,'#5a4022');
  for(const [x,y,r] of [[25,40,1.8],[38,30,1.4]])p.ell(x,y,r,r*.8,'#4a3a5e');
  v2limb(p,37,27,hx,hy,3.2,2.8,S);v2limb(p,37,27,(37+hx)/2,(27+hy)/2,3.8,3.4,shirt);p.ell(36,41,1.8,1.4,'#5a8a4a');
  v2hand(p,hx,hy,ang,S);
  v2limb(p,31,26,35,20,3,3,sd[1]);
  p.ell(36,13,8,7.6,S);p.poly([[30,15],[44,15],[42,22],[32,22]],S);
  p.poly([[28,9],[30,3],[32,7],[35,2],[37,7],[40,4],[42,9],[36,7],[30,10]],'#3f5a3a');
  if(hurt){p.line(31,13,34,14,INK);p.line(37,13,40,13,INK);}
  else{p.line(31,11,34,14,INK);p.line(34,11,31,14,INK);p.ell(39,12.6,2.2,2,'#f4f0d8');p.set(40,13,INK);p.line(37,10,41,11,INK);}
  p.poly([[35,18],[43,18],[42,23],[36,22]],'#3a1a22');p.set(37,18,'#e8e0c8');p.set(40,18,'#e8e0c8');p.set(42,18,'#e8e0c8');
  p.line(30,15,30,20,INK);for(const y of [16,18])p.line(29,y,31,y,INK);
  p.ell(33,17,1.4,1.1,sd[2]);
  p.finish();return p;}

/* skeleton archer: tattered black hooded cloak, open front showing the ribcage, bone limbs, red-eyed skull, bone bow */
function pxSkull2(mood){
  const p=Pix4(64,72),B='#ebe6d4',bd=p.R(B),cloak='#2a2630',hurt=mood===1;
  let [hx,hy,ang,tr]=v2pose(mood,V2BOW);const drawn=tr.indexOf('B')>=0,walk=mood===3?1:mood===4?2:0,fL=walk===1?-3:walk===2?3:0;
  if(typeof mood==='string'&&!drawn)tr='T';
  p.poly([[19,22],[24,20],[31,40],[26,42]],'#3a2a20');for(const [x,y] of [[19,19],[21,18],[23,17]]){p.line(x,y,x+1,y+3,'#c8343c');p.set(x,y-1,'#f1ece0');}
  p.poly([[22,20],[41,20],[45,58],[41,55],[38,61],[34,56],[30,62],[26,56],[21,60],[19,55]],cloak);
  for(const [x,f] of [[27,fL],[36,-fL]]){const up=f<0&&walk?1:0;p.line(x,54,x+f,63-up,B);p.line(x+1,54,x+1+f,63-up,bd[2]);p.ell(x+.5+f*.5,58-up/2,1.6,1.4,B);
    p.poly([[x-1+f,63-up],[x+5+f,63-up],[x+6+f,67-up],[x-2+f,67-up]],bd[1]);for(const d of [0,2,4])p.set(x+d+f,67-up,bd[3]);}
  p.poly([[27,25],[38,25],[39,46],[26,46]],'#141218');p.line(32,25,32,48,B);
  for(let y=28;y<=42;y+=3){p.line(27,y+1,31,y,B);p.line(33,y,37,y+1,B);p.set(27,y+2,bd[2]);p.set(37,y+2,bd[2]);}
  p.poly([[27,45],[37,45],[35,50],[29,50]],B);p.set(30,47,INK);p.set(34,47,INK);
  v2limb(p,38,24,hx-1,hy,1.5,1.3,B);p.ell((38+hx)/2,(24+hy)/2,1.6,1.6,B);
  const nk=v2bow(p,hx,hy,ang,drawn,'#cfc8b0','#8a1a2a',drawn?'#ff8a9a':null);
  if(tr.indexOf('T')>=0)for(const d of [-3,0,3])p.line(hx+8,hy+d,hx+15,hy+d,'#ffffff');
  p.ell(hx,hy,1.9,1.9,B);
  const dh=drawn?nk:[29,33];v2limb(p,26,24,dh[0],dh[1],1.5,1.3,B);p.ell(dh[0],dh[1],1.8,1.8,B);
  p.poly([[21,16],[28,3],[38,2],[45,10],[45,21],[40,23],[24,23]],cloak);
  p.ell(34,13,7,6.6,B);p.poly([[29,16],[40,16],[39,22],[30,22]],B);
  if(hurt){p.line(29,12,33,12,INK);p.line(36,12,40,12,INK);}
  else for(const ex of [31,37]){p.ell(ex,12,2.1,2.3,INK);p.set(ex,12,'#ff4d6a');p.set(ex+1,12,'#ff8a9a');}
  p.poly([[34,15],[35.4,15],[34.7,17.4]],INK);
  p.line(30,19,39,19,bd[2]);for(let x=31;x<=38;x+=2)p.line(x,19,x,21,INK);
  p.poly([[22,14],[27,7],[26,22],[22,22]],p.R(cloak)[2]);
  if(drawn)for(const [x,y] of [[42,9],[44,13]])p.set(x,y,'#ff4d6a');
  p.finish();return p;}

/* ogre: huge red brute, small head with horns and a topknot, heavy brow, tusks, fur pelt on one shoulder,
   leather loincloth with a skull buckle, a big studded club */
function pxOgre2(mood){
  const p=Pix4(64,72),S='#d0564c',sd=p.R(S),hair='#26222c',lth='#7a4a2a',bone='#f1ece0',hurt=mood===1;
  const [hx,hy,ang,tr]=v2pose(mood,V2BLADE,8,8),walk=mood===3?1:mood===4?2:0,fL=walk===1?-3:walk===2?3:0,act=!!tr||mood===2||mood===8;
  if(tr)v2trail(p,tr,hx,hy,ang,'#ffd0a0');
  for(const [x,f] of [[23,fL],[41,-fL]]){const up=f<0&&walk?1:0;p.poly([[x-7,52],[x+7,52],[x+6+f,64-up],[x-6+f,64-up]],S);p.ell(x+f,67-up,8,3.4,sd[1]);
    for(const d of [-4,-1,2,5])p.set(x+d+f+1,69-up,sd[3]);p.line(x-6+f,61-up,x+6+f,61-up,lth);}
  p.ell(32,40,19,16,S);p.ell(35,44,10,9,sd[0]);p.line(26,32,32,34,sd[2]);p.line(38,34,44,32,sd[2]);
  p.poly([[14,47],[50,47],[47,59],[39,55],[32,60],[25,55],[17,59]],lth);for(const x of [20,28,36,44])p.line(x,50,x-1,56,p.R(lth)[2]);
  p.poly([[13,45],[51,45],[51,49],[13,49]],'#4a3020');p.ell(32,47,2.8,2.6,bone);p.set(31,46,INK);p.set(33,46,INK);p.set(32,48,INK);
  const lh=act?[22,40]:[14,50];v2limb(p,17,30,lh[0],lh[1],6,5,sd[2]);p.ell(lh[0],lh[1]+2,5,4.4,sd[2]);
  p.ell(16,27,9,6.4,'#8a6a4a');for(const [x,y,a] of [[9,26,3.4],[12,22,4],[18,21,4.6],[23,24,5.4],[10,31,2.6]])v2tuft(p,x,y,a,3.4,'#8a6a4a');for(const [x,y] of [[13,27],[18,26],[15,30]])p.set(x,y,'#5a4430');
  v2limb(p,46,30,hx-1,hy-1,6,5,S);{const mx=(46+hx)/2+(hx-46)*.2,my=(30+hy)/2+(hy-30)*.2;v2limb(p,mx-1,my,mx+1,my,5.6,5.6,lth);}
  v2club(p,hx,hy,ang,false);p.ell(hx,hy,4.8,4.4,S);
  p.ell(33,17,10,8.6,S);
  p.poly([[25,11],[18,3],[16,-1],[21,2],[28,8]],bone);p.poly([[41,10],[47,3],[50,-1],[45,1],[38,7]],bone);
  p.poly([[29,9],[33,2],[37,9]],hair);p.ell(33,3,2.4,2,hair);p.ell(23,17,2,3,S);
  p.poly([[25,11],[42,11],[41,14.4],[26,14.4]],sd[2]);
  if(hurt){p.line(28,15,31,15,INK);p.line(35,15,38,15,INK);}
  else for(const ex of [29.5,36.5]){p.ell(ex,15,1.7,1.3,'#ffe566');p.set(ex+.5,15,INK);}
  p.ell(34.5,18.4,2.6,1.9,sd[1]);p.set(33,19,sd[3]);p.set(36,19,sd[3]);
  p.poly([[26,21],[42,21],[41,25],[27,25]],'#5a1820');p.line(27,21,41,21,sd[2]);
  p.poly([[27.5,23],[29.5,23],[28.4,17]],bone);p.poly([[38.5,23],[40.5,23],[39.6,17]],bone);
  p.finish();return p;}

/* shield soldier: undead foot soldier in dark lamellar armour and a spiked helmet with a red plume,
   a tall tower shield held across the body, a short sword */
function pxShield2(mood){
  const p=Pix4(64,72),S='#8fbf78',arm='#5f6880',ad=p.R(arm),stl='#9aa5bd',sh='#b8c2d8',red='#9a2a30',hurt=mood===1;
  const [hx,hy,ang,tr]=v2pose(mood,V2BLADE),walk=mood===3?1:mood===4?2:0,fL=walk===1?-3:walk===2?3:0,bob=walk?1:0;
  if(tr)v2trail(p,tr,hx,hy,ang,'#dfe6f2');
  for(const [x,f] of [[25,fL],[34,-fL]]){const up=f<0&&walk?1:0;p.poly([[x,52],[x+6,52],[x+6+f,63-up],[x+f,63-up]],ad[2]);p.poly([[x+f,56-up],[x+6+f,56-up],[x+6+f,62-up],[x+f,62-up]],stl);
    p.poly([[x-1+f,63-up],[x+8+f,63-up],[x+9+f,69-up],[x-2+f,69-up]],'#3a3040');}
  p.poly([[20,40],[44,40],[46,55],[18,55]],arm);for(const y of [44,48,52])p.line(19,y,45,y,ad[2]);for(let x=22;x<44;x+=4)p.line(x,41,x,54,ad[3]);
  p.poly([[22,24],[42,24],[43,42],[21,42]],arm);for(let y=27;y<=40;y+=3){p.line(22,y,42,y,ad[2]);for(let x=23+(y%2);x<42;x+=3)p.set(x,y+1,ad[0]);}
  p.poly([[21,38],[43,38],[43,41],[21,41]],red);
  p.ell(41,26,5,3.6,stl);p.line(37,27,45,27,p.R(stl)[3]);
  v2limb(p,41,27,hx-1,hy-1,3,3.4,arm);
  pxBladeAt(p,'blade',p.R('#c9d2de'),p.R('#5a5f70'),p.R('#3a3040'),hx,hy,ang);p.ell(hx,hy,2.6,2.4,S);
  p.poly([[29,19],[35,19],[35,25],[29,25]],S);
  p.ell(32,15,7,7,S);
  if(hurt){p.line(28,15,31,15,INK);p.line(34,15,37,15,INK);}
  else for(const ex of [29.5,35.5]){p.ell(ex,15,1.6,1.3,'#f4f0d8');p.set(ex+.5,15,INK);}
  p.line(29,13,32,14,INK);p.line(34,14,37,13,INK);p.line(30,19,35,19,INK);p.set(31,20,INK);p.set(34,20,INK);
  p.poly([[24,12],[25,5],[32,2],[39,5],[40,12]],stl);p.line(32,3,32,11,p.R(stl)[2]);p.poly([[31,3],[33,3],[32,-1]],stl);
  p.poly([[22,11],[42,11],[42,14],[22,14]],p.R(stl)[2]);p.poly([[24,13],[27,13],[27,21],[24,19]],stl);p.poly([[37,13],[40,13],[40,19],[37,21]],stl);
  v2ribbon(p,[[32,2],[27,1],[22,4],[19,9]],1.8,red);
  const y0=bob;p.poly([[11,26+y0],[29,24+y0],[30,54+y0],[20,61+y0],[11,54+y0]],sh);
  p.line(11,26+y0,29,24+y0,p.R(sh)[3]);p.line(11,26+y0,11,54+y0,p.R(sh)[3]);p.line(29,24+y0,30,54+y0,p.R(sh)[3]);
  p.poly([[20,33+y0],[25,40+y0],[20,47+y0],[15,40+y0]],red);p.ell(20,40+y0,1.8,1.8,'#e3b341');
  for(const [x,y] of [[14,29],[26,28],[14,51],[27,51]])p.set(x,y+y0,'#e8ecf4');
  v2limb(p,24,28,22,37+y0,3,2.8,ad[2]);
  p.finish();return p;}

/* shaman: hunched robed figure, feathered hood, carved wooden mask with green eyes, bone necklace,
   gnarled staff topped with a skull and green spirit fire */
function pxShaman2(mood){
  const p=Pix4(64,72),robe='#5a3f7a',rd=p.R(robe),G='#3ad29f',S='#c9b88f',bone='#ebe6d4',wood='#7a5232',hurt=mood===1;
  const [hx,hy,ang,tr]=v2pose(mood,V2STAFF),cast=tr.indexOf('S')>=0,walk=mood===3?1:mood===4?2:0,fL=walk===1?-2:walk===2?2:0;
  p.poly([[22,24],[41,22],[47,63],[17+fL,65]],robe);for(const x of [25,31,37,42])p.line(x,30,x+(x<32?-3:3)+fL,62,rd[2]);
  for(let x=18;x<47;x+=4)p.poly([[x+fL*.5,62],[x+4+fL*.5,62],[x+2+fL*.5,67]],robe);
  p.line(18+fL,62,46,61,G);
  for(const x of [26,37])p.ell(x+(x<32?fL:-fL),68,3.6,2,'#3a2a22');
  for(let i=0;i<9;i++){const t=Math.PI*(.12+i*.095),x=32+Math.cos(t)*10,y=23+Math.sin(t)*7;if(i%2)p.ell(x,y,1.6,1.6,bone);else p.poly([[x-1,y-1],[x+1,y-1],[x,y+2.6]],bone);}
  for(const [x,c] of [[22,'#c8343c'],[24,G]]){p.line(x,40,x-1,50,'#3a2a22');p.poly([[x-2,49],[x+1,49],[x-.5,55]],c);}
  const lh=cast?[30,30]:[24,44];v2limb(p,25,27,lh[0],lh[1],3,2.6,rd[2]);p.ell(lh[0],lh[1],2.3,2.1,S);
  const c=Math.cos(ang),s=Math.sin(ang),wd=p.R(wood);
  for(let i=-24;i<=21;i++){const w=Math.sin(i*.5)*.8;p.set(hx+c*i-s*w,hy+s*i+c*w,wd[1]);p.set(hx+c*i-s*(w+1),hy+s*i+c*(w+1),wd[2]);}
  const tx=hx+c*24,ty=hy+s*24;p.ell(tx,ty,3.6,3.2,bone);p.poly([[tx-2.4,ty+1],[tx+2.4,ty+1],[tx+1.6,ty+4],[tx-1.6,ty+4]],bone);p.set(tx-1,ty,'#0f4a32');p.set(tx+1,ty,'#0f4a32');
  p.set(tx-1,ty,G);p.set(tx+1,ty,G);
  const fl=cast?10:6;p.poly([[tx-2.6,ty-3],[tx-1,ty-3-fl*.6],[tx,ty-3-fl],[tx+1.4,ty-3-fl*.5],[tx+2.6,ty-3]],G);p.set(tx,ty-4,'#e8fff4');
  if(cast)for(let i=0;i<7;i++){const t=i/7*6.28,r=9+(i%2)*3;p.ell(tx+Math.cos(t)*r,ty+Math.sin(t)*r,1.2,1.2,i%2?G:'#b8ffe0');}
  v2limb(p,39,26,hx-1,hy,3,2.6,robe);p.ell(hx,hy,2.3,2.1,S);
  p.poly([[21,16],[27,5],[38,3],[45,11],[44,23],[24,23]],rd[2]);
  for(const [x,y,a,col] of [[27,5,4.2,'#c8343c'],[31,3,4.6,G],[36,3,5.1,'#e0b83a'],[40,5,5.6,'#c8343c']])v2tuft(p,x,y,a,6,col);
  p.ell(35,14,6.4,7.2,'#a8763a');p.line(29,13,41,13,'#6a4420');
  p.line(31,10,31,19,G);p.line(39,10,39,19,G);p.line(33,20,37,20,'#c8343c');
  if(hurt){p.line(32,15,34,15,INK);p.line(36,15,38,15,INK);}
  else for(const ex of [33,37]){p.poly([[ex-1,14],[ex+1.4,14],[ex+.2,16.4]],INK);p.set(ex,15,G);}
  p.poly([[32,18],[38,18],[37,21],[33,21]],'#3a1a12');for(const x of [33,35,37])p.set(x,18,bone);
  p.finish();return p;}

/* bat: spread membrane wings with finger bones, furry body, big ears, red eyes, fangs. frames: wings up/down, dive bite */
function pxBat2(mood){
  if(typeof mood==='string')mood=mood.split(',')[3].indexOf('C')>=0?5:2;
  const p=Pix4(64,72),F='#4a3a5e',fd=p.R(F),mem='#6a4a7e',eye='#ff4d6a',hurt=mood===1;
  const atk=mood===5||mood===6||mood===11,ox=atk?4:0,oy=atk?5:0,wy=mood===3||mood===2||mood===8?-9:mood===4?7:0;
  for(const s of [-1,1]){const sx=32+s*5+ox,sy=34+oy,col=s<0?p.R(mem)[2]:mem,bn=s<0?fd[3]:fd[2];
    const tip=[sx+s*26,18+wy+oy],e=[sx+s*12,22+wy*.6+oy];
    p.poly([[sx,sy-3],e,tip,[sx+s*23,30+wy*.7+oy],[sx+s*24,36+wy*.6+oy],[sx+s*17,40+wy*.4+oy],[sx+s*16,46+wy*.3+oy],[sx+s*8,44+oy],[sx,42+oy]],col);
    p.line(sx,sy-3,e[0],e[1],bn);p.line(e[0],e[1],tip[0],tip[1],bn);p.line(e[0],e[1],sx+s*23,30+wy*.7+oy,bn);p.line(e[0],e[1],sx+s*17,40+wy*.4+oy,bn);
    p.poly([[e[0]-1,e[1]-1],[e[0]+s*2,e[1]-5],[e[0]+1,e[1]]],bn);}
  p.ell(32+ox,40+oy,8,10,F);p.ell(33+ox,42+oy,5,7,fd[0]);for(const [x,y] of [[30,38],[34,40],[31,44],[35,46]])p.set(x+ox,y+oy,fd[2]);
  for(const x of [29,35]){p.line(x+ox,49+oy,x+ox,54+oy,fd[2]);p.line(x+ox,54+oy,x-1+ox,56+oy,'#ece6d8');p.line(x+ox,54+oy,x+1+ox,56+oy,'#ece6d8');}
  p.poly([[27+ox,24+oy],[26+ox,12+oy],[32+ox,21+oy]],F);p.poly([[28+ox,21+oy],[27.5+ox,15+oy],[30.5+ox,21+oy]],'#c88a9a');
  p.poly([[36+ox,21+oy],[41+ox,11+oy],[41+ox,23+oy]],F);p.poly([[37.5+ox,21+oy],[40+ox,14+oy],[40+ox,21+oy]],'#c88a9a');
  p.ell(34+ox,27+oy,7.4,6.6,F);p.ell(39+ox,29+oy,3.2,2.6,fd[0]);p.poly([[39+ox,26+oy],[41+ox,26+oy],[40+ox,28+oy]],'#c88a9a');
  if(hurt){p.line(31+ox,26+oy,34+ox,26+oy,INK);p.line(36+ox,26+oy,38+ox,26+oy,INK);}
  else for(const ex of [32.5,37.5]){p.ell(ex+ox,25.6+oy,1.7,1.5,eye);p.set(ex+ox,25+oy,'#ffd0d8');}
  if(atk){p.poly([[34+ox,30+oy],[42+ox,30+oy],[41+ox,35+oy],[35+ox,34+oy]],'#4a141c');for(const x of [35,40])p.poly([[x+ox,30+oy],[x+1.4+ox,30+oy],[x+.7+ox,33+oy]],'#ffffff');}
  else{p.line(35+ox,31+oy,41+ox,31+oy,INK);for(const x of [36,40])p.line(x+ox,32+oy,x+ox,33+oy,'#ffffff');}
  p.finish();return p;}

/* bomber: a walking round bomb with angry eyes and a grin, iron band with rivets, stubby arms and feet, lit fuse */
function pxBomber2(mood){
  const p=Pix4(64,72),K='#3a3a4a',kd=p.R(K),hurt=mood===1,walk=mood===3?1:mood===4?2:0,fL=walk===1?-2:walk===2?2:0,bob=walk===1?-1:0,
    atk=mood===2||mood===5||mood===6||mood===8||typeof mood==='string';
  for(const [x,f] of [[25,fL],[39,-fL]]){p.line(x+f,58,x+f,63,kd[2]);p.ell(x+f,66,5,2.8,'#5a3a26');}
  v2limb(p,18,46+bob,atk?10:12,atk?34:52,2.6,2.2,K);p.ell(atk?10:12,atk?33:53,2.6,2.4,K);
  p.ell(32,45+bob,16,16,K);p.ell(25,38+bob,4,3,'#8a8aa0');p.set(24,37+bob,'#ffffff');
  p.poly([[16,45+bob],[48,45+bob],[48,49+bob],[16,49+bob]],'#8a6a3a');for(const x of [20,27,34,41,46])p.set(x,47+bob,'#e3b341');
  p.poly([[27,28+bob],[37,28+bob],[37,32+bob],[27,32+bob]],'#6a6a7a');
  v2ribbon(p,[[32,28+bob],[33,22+bob],[37,19+bob],[38,13+bob]],1,'#c9a24a');
  const sp=atk?6:4,fx=38,fy=12+bob;for(const [dx,dy] of [[0,-1],[1,0],[0,1],[-1,0],[.7,-.7],[-.7,-.7],[.7,.7],[-.7,.7]])p.line(fx,fy,fx+dx*sp,fy+dy*sp,Math.abs(dx)+Math.abs(dy)>1.2?'#ff8a3d':'#ffe566');p.set(fx,fy,'#ffffff');
  if(hurt){p.line(26,42+bob,30,42+bob,'#ffffff');p.line(34,42+bob,38,42+bob,'#ffffff');}
  else for(const ex of [28,36]){p.ell(ex,42+bob,2.6,2.8,'#ffffff');p.ell(ex+.8,42.6+bob,1.3,1.6,INK);}
  p.line(25,38+bob,30,40+bob,'#ffffff');p.line(39,38+bob,34,40+bob,'#ffffff');
  p.poly([[27,50+bob],[39,50+bob],[37,54+bob],[29,54+bob]],'#2a0f14');for(const x of [29,32,35])p.poly([[x,50+bob],[x+1.6,50+bob],[x+.8,52+bob]],'#ffffff');
  v2limb(p,46,46+bob,atk?54:52,atk?38:52,2.6,2.2,K);p.ell(atk?54:52,atk?37:53,2.6,2.4,K);
  p.finish();return p;}

/* mid bosses: winged horned demons, each with its own colour, face and weapon */
const DEMON={boss5:{F:'#7a52c8',w:'claw'},boss10:{F:'#b3334a',w:'club',oni:1},boss15:{F:'#23805a',w:'fork',scale:1},boss20:{F:'#3a3258',w:'sword',crown:1}};
function pxDemon2(k,mood){
  const d=DEMON[k],p=Pix4(64,72),F=d.F,fd=p.R(F),bone='#f1ece0',eye=d.crown?'#ff5a5a':'#ffe566',hurt=mood===1;
  const [hx,hy,ang,tr]=v2pose(mood,V2BLADE,8,8),walk=mood===3?1:mood===4?2:0,fL=walk===1?-3:walk===2?3:0,act=!!tr||mood===2||mood===8;
  if(d.crown){p.poly([[20,24],[44,24],[52,66],[12,66]],'#5a1424');p.poly([[22,24],[42,24],[46,64],[18,64]],'#7a1c30');}
  for(const s of [-1,1]){const W=s<0?fd[3]:fd[2],x=v=>32+s*v;
    p.poly([[x(8),28],[x(18),10],[x(30),3],[x(28),14],[x(31),22],[x(24),26],[x(27),36],[x(12),36]],W);
    for(const [a,b] of [[[18,10],[28,14]],[[18,10],[24,26]],[[18,10],[12,36]]])p.line(x(a[0]),a[1],x(b[0]),b[1],fd[3]);}
  if(tr)v2trail(p,tr.replace('C',''),hx,hy,ang,d.crown?'#ff9a9a':'#fff2a0');
  for(const [x,f] of [[24,fL],[40,-fL]]){const up=f<0&&walk?1:0;p.poly([[x-6,50],[x+6,50],[x+4+f,60-up],[x-5+f,60-up]],F);
    p.poly([[x-4+f,59-up],[x+4+f,59-up],[x+3+f,65-up],[x-3+f,65-up]],fd[2]);p.poly([[x-5+f,65-up],[x+6+f,65-up],[x+6+f,69-up],[x-5+f,69-up]],'#2a1a22');}
  p.poly([[17,26],[47,26],[43,47],[21,47]],F);p.line(32,30,32,46,fd[2]);p.line(22,31,31,33,fd[2]);p.line(33,33,42,31,fd[2]);for(const y of [37,41,45])p.line(27,y,37,y,fd[2]);
  if(d.scale)for(let y=29;y<46;y+=3)for(let x=19+(y%2)*2;x<46;x+=4)p.set(x,y,fd[0]);
  p.poly([[19,46],[45,46],[47,57],[17,57]],'#3a1a22');p.poly([[18,45],[46,45],[46,48],[18,48]],d.crown?'#e3b341':'#5a3020');
  p.ell(32,47,3,2.6,d.crown?'#c8343c':bone);if(!d.crown){p.set(31,46,'#1a0a10');p.set(33,46,'#1a0a10');}
  for(const s of [-1,1])for(const v of [12,17])p.poly([[32+s*(v-2),27],[32+s*(v+1),19],[32+s*(v+2),27]],bone);
  const lh=act?[20,40]:[14,48];v2limb(p,19,30,lh[0],lh[1],5,4,fd[2]);p.ell(lh[0],lh[1]+1,4,3.6,fd[2]);for(const dd of [-2,0,2])p.line(lh[0]+dd,lh[1]+4,lh[0]+dd,lh[1]+6,bone);
  v2limb(p,45,30,hx-1,hy-1,5,4.2,F);
  const c=Math.cos(ang),s=Math.sin(ang);
  if(d.w==='claw'){for(const dd of [-3,-1,1,3])p.line(hx+c*3-s*dd,hy+s*3+c*dd,hx+c*9-s*dd*1.5,hy+s*9+c*dd*1.5,bone);
    if(typeof mood==='string'&&mood.indexOf('C')>=0||mood===5||mood===11)for(const o of [0,4,8])for(let i=0;i<16;i++)p.set(hx-6+o+i*.6,hy-14+i*1.7,i%3?'#ffffff':'#e8d8ff');}
  else if(d.w==='club')v2club(p,hx,hy,ang,true);
  else if(d.w==='fork'){for(let i=-16;i<=26;i++){p.set(hx+c*i,hy+s*i,'#4a3a2a');p.set(hx+c*i-s,hy+s*i+c,'#2a1a12');}
    const tx=hx+c*26,ty=hy+s*26;p.line(tx-s*5,ty+c*5,tx+s*5,ty-c*5,'#c9d2de');for(const o of [-5,0,5]){const bx=tx-s*o,by=ty+c*o,L=o?7:10;p.line(bx,by,bx+c*L,by+s*L,'#dfe6f2');p.set(bx+c*L,by+s*L,'#ffffff');}}
  else{v2longblade(p,hx,hy,ang,30,'#c0c8d8','#e3b341','#2a2040');if(!tr)for(let i=6;i<30;i+=3)p.set(hx+c*i-s*2,hy+s*i+c*2,'#ff8a8a');}
  p.ell(hx,hy,4.2,3.8,F);
  p.ell(32,15,9,8.4,F);p.poly([[24,16],[40,16],[38,24],[26,24]],F);p.ell(23,15,2,3,F);p.ell(41,15,2,3,F);
  if(d.oni){p.poly([[29,8],[32,-1],[35,8]],bone);for(const [x,y,h] of [[22,12,9],[26,7,9],[38,7,9],[42,12,9]])p.poly([[x-3,y+4],[x,y+4-h],[x+3,y+4]],'#26222c');}
  else{p.poly([[25,10],[17,6],[13,0],[19,2],[27,6]],bone);p.poly([[39,10],[47,6],[51,0],[45,2],[37,6]],bone);}
  if(d.crown){p.poly([[24,8],[24,2],[27,5],[30,1],[32,4],[34,1],[37,5],[40,2],[40,8]],'#e3b341');p.ell(32,6,1.4,1.4,'#c8343c');}
  p.poly([[25,11],[39,11],[38,13],[26,13]],fd[3]);
  if(hurt){p.line(27,15,31,15,'#1a0a10');p.line(33,15,37,15,'#1a0a10');}
  else{p.poly([[26.6,13],[31,14.4],[31,16.4],[26.6,15]],eye);p.poly([[33,14.4],[37.4,13],[37.4,15],[33,16.4]],eye);}
  p.poly([[26,19],[38,19],[36,23.4],[28,23.4]],'#4a0f18');
  p.poly([[27,19],[29,19],[28,22.6]],bone);p.poly([[35,19],[37,19],[36,22.6]],bone);for(const x of [30,32])p.set(x,19,bone);
  if(d.oni){p.poly([[27,23],[29,23],[28,18]],bone);p.poly([[35,23],[37,23],[36,18]],bone);}
  p.finish();return p;}

/* the Golden Star: long golden hair, crown and halo, flowing gold-and-white robe with wide sleeves,
   a little star of light in her hand that she throws */
const V2STAR={0:[42,40,0,''],7:[42,41,0,''],9:[42,40,0,''],1:[40,42,0,''],3:[42,40,0,''],4:[42,40,0,''],2:[42,24,0,'S'],8:[42,24,0,'S'],5:[52,34,0,'T'],6:[52,34,0,'T'],11:[52,34,0,'T']};
function pxGeumbyeol2(mood){
  const p=Pix4(64,72),S='#f6d8b8',hair='#f2d872',gold='#e3b341',robe='#fff4d8',hurt=mood===1;
  const [hx,hy,ang,tr]=v2pose(mood,V2STAR),walk=mood===3?1:mood===4?2:0,fL=walk===1?-2:walk===2?2:0,cast=tr.indexOf('S')>=0||tr.indexOf('T')>=0||tr.indexOf('C')>=0||tr.indexOf('H')>=0;
  for(let i=0;i<16;i++){const t=i/16*6.28;p.set(32+Math.cos(t)*13,10+Math.sin(t)*4,i%2?'#fff6c8':gold);}
  p.poly([[25,10],[39,10],[44,40],[38,46],[26,46],[20,40]],hair);for(const x of [24,28,36,40])p.line(x,14,x+(x<32?-3:3),42,p.R(hair)[2]);
  p.poly([[22,24],[42,24],[48,66],[16+fL,67]],robe);for(const x of [25,30,35,40])p.line(x,30,x+(x<32?-4:4)+fL,64,p.R(robe)[2]);
  p.poly([[15,63],[49,63],[49,67],[15,67]],gold);p.line(32,26,32+fL,64,gold);
  p.poly([[26,24],[32,24],[34,34],[30,34]],gold);p.poly([[38,24],[32,24],[30,30],[32,31]],gold);
  p.poly([[21,37],[43,37],[43,41],[21,41]],gold);p.ell(32,39,2.2,2,'#c8343c');
  v2limb(p,23,27,cast?26:18,cast?32:44,3.4,4.6,robe);p.ell(cast?26:18,cast?34:47,2.2,2,S);
  v2limb(p,41,27,hx-1,hy,3.4,4.6,robe);p.poly([[hx-6,hy-1],[hx-1,hy-4],[hx-1,hy+4],[hx-6,hy+6]],gold);p.ell(hx,hy,2.4,2.2,S);
  const sx=hx+4,sy=hy-3,r=cast?5:3;for(const [dx,dy] of [[0,-1],[1,0],[0,1],[-1,0]])p.line(sx,sy,sx+dx*r,sy+dy*r,'#ffe58a');p.ell(sx,sy,1.6,1.6,'#ffffff');
  if(tr.indexOf('T')>=0)for(const dd of [-3,0,3])p.line(hx-14,hy+dd,hx-6,hy+dd,'#ffffff');
  if(tr.indexOf('S')>=0)for(let i=0;i<8;i++){const t=i/8*6.28;p.set(sx+Math.cos(t)*9,sy+Math.sin(t)*9,'#fff6c8');}
  p.poly([[29,19],[35,19],[35,25],[29,25]],S);
  const SF=[S,S,'#ecc8a4'];p.ell(32,15,7,7.4,SF);p.poly([[25,14],[39,14],[38,19],[32,22],[26,19]],SF);
  p.poly([[25,10],[39,10],[40,15],[37,12],[32,13],[27,12],[24,16]],hair);p.poly([[24,12],[26,12],[23,26]],hair);p.poly([[40,12],[38,12],[41,26]],hair);
  if(hurt){p.line(27,16,30,15,INK);p.line(34,15,37,16,INK);}
  else{v2eye(p,27,15,'#c98f1a',p.R(S)[2],true,1);v2eye(p,33,15,'#c98f1a',p.R(S)[2],false,1);}
  p.set(31,19,'#c8606a');p.set(32,20,'#c8606a');p.set(33,19,'#c8606a');p.ell(27.6,18,1.3,.8,'#f4a8a8');p.ell(36.4,18,1.3,.8,'#f4a8a8');
  p.poly([[25,9],[25,3],[28,6],[30,2],[32,5],[34,2],[36,6],[39,3],[39,9]],gold);p.ell(32,7,1.3,1.3,'#3d8bff');p.set(27,7,'#c8343c');p.set(37,7,'#c8343c');
  v2spark(p,[[8,22],[56,8],[58,48],[6,52]],'#ffe58a');
  p.finish();return p;}

PIXU.grunt=(st,g,mood)=>pxZombie2(mood);
PIXU.skull=(st,g,mood)=>pxSkull2(mood);
PIXU.ogre=(st,g,mood)=>pxOgre2(mood);
PIXU.shield=(st,g,mood)=>pxShield2(mood);
PIXU.shaman=(st,g,mood)=>pxShaman2(mood);
PIXU.bat=(st,g,mood)=>pxBat2(mood);
PIXU.bomber=(st,g,mood)=>pxBomber2(mood);
for(const k in DEMON)PIXU[k]=(st,g,mood)=>pxDemon2(k,mood);
PIXU.geumbyeol=(st,g,mood)=>pxGeumbyeol2(mood);
