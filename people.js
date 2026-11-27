/* ---------- people (ASCII only): swordsman, archer, sage, assassin, slinger, paladin, Hanbyeol, Mugyeol ---------- */
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
function pxHanbyeol2(stage,mood){
  const g=Math.max(0,Math.min(5,stage||0)),p=Pix4(64,72),S='#f0c48e',hair='#22202a',gold='#e3b341',
    jacket=g>=5?'#f4f1e8':'#d8c8a0',pant=g>=5?'#3a3f6e':'#6a6458',band=g>=5?gold:'#3d6fb8',dg=g>=5?gold:'#c8343c',goreum=g>=5?gold:'#6a3a8a',
    steel=g>=5?'#fff2b0':g>=1?'#d6dee9':null;
  const [hx,hy,ang,tr]=v2pose(mood,V2BLADE,8,7),walk=mood===3?1:mood===4?2:0,fL=walk===1?-3:walk===2?3:0,la=walk===1?2:walk===2?-2:0,hurt=mood===1,act=!!tr||mood===2||mood===8;
  /* stage 4+: blue cloud cloak behind */
  if(g>=4){const ck=g>=5?'#3d6fb8':'#2f5a9a';p.poly([[21,27],[43,27],[49,62],[40,60],[33,66],[26,61],[15,63]],ck);
    for(const [x,y] of [[22,46],[36,54],[42,40]]){p.ell(x,y,3,2,p.R(ck)[0]);p.ell(x+3,y-1,2.4,1.8,p.R(ck)[0]);}if(g>=5){p.line(15,63,21,28,gold);p.line(49,62,43,28,gold);}}
  /* long braid down the back with a daenggi ribbon at its end */
  {const br=[[27,12],[23,19],[21,28],[20,38]];v2ribbon(p,br,2,hair);for(let i=0;i<br.length-1;i++){const [x0,y0]=br[i],[x1,y1]=br[i+1];for(let k=.3;k<1;k+=.35)p.set(x0+(x1-x0)*k+1,y0+(y1-y0)*k,'#3a3640');}
   v2ribbon(p,[[20,38],[18+la,42],[18.5+la,45]],1.1,dg);v2ribbon(p,[[21,38],[22+la,42],[21.5+la,45]],1,dg);p.ell(20.5,38,1.4,1.1,dg);}
  if(tr)v2trail(p,tr,hx,hy,ang,g>=5?'#fff2a0':null);
  /* legs, leg wraps, sandals / boots */
  for(const [x,f] of [[25,fL],[34,-fL]]){const up=f<0&&walk?1:0;p.poly([[x-1.5,43],[x+7.5,43],[x+7.5+f,60-up],[x+f*.8+5.5,62-up],[x+f*.8+.5,62-up],[x-1.5+f,60-up]],pant);p.line(x+3,46,x+3+f*.6,58-up,p.R(pant)[2]);p.poly([[x+f*.8,59.5-up],[x+6+f*.8,59.5-up],[x+6+f*.8,61.5-up],[x+f*.8,61.5-up]],band);
    p.poly([[x-1+f,63-up],[x+8+f,63-up],[x+9+f,69-up],[x-2+f,69-up]],g>=3?'#4a3a30':'#c9a24a');}
  /* jacket to the hips, collar, belt */
  p.poly([[23,27],[41,27],[42.5,45],[21.5,45]],jacket);p.line(22,45,42,45,p.R(jacket)[2]);p.poly([[28,27],[32,27],[34,36],[31,36]],'#f4f0e6');p.poly([[36,27],[33,27],[30,33],[32,34]],'#f4f0e6');p.line(29,27,33.5,35,p.R(jacket)[3]);
  if(g>=5){p.line(21.5,45,42.5,45,gold);p.line(23,27,21.5,45,gold);p.line(41,27,42.5,45,gold);p.line(28,27,34,37,gold);}
  /* stage 2+: indigo vest */
  if(g>=2&&g<5){p.poly([[22,28],[29,28],[30,55],[20,57]],'#3b3f6e');p.poly([[42,28],[35,28],[34,55],[44,57]],'#3b3f6e');p.line(20,57,30,55,'#c8343c');p.line(34,55,44,57,'#c8343c');}
  v2ribbon(p,[[33,35],[35,41],[36,46]],1,goreum);v2ribbon(p,[[33,35],[32,40],[32.5,43]],.9,goreum);p.ell(33,35,1.3,1,goreum);
  /* stage 2+: Duduri's blue goblin bead charm */
  if(g>=2){p.line(36,47,36,49,'#c8343c');p.ell(36,51,2,2,'#4fb0e0');p.set(35,50,'#ffffff');}
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
  p.ell(32,9.5,8.2,5,hair);p.poly([[24,10],[31,8.5],[32,10],[33,8.5],[40,10],[39.5,14],[35,11],[32,12.5],[29,11],[24.5,14]],hair);p.poly([[24,10],[25.6,10],[24.8,15.5]],hair);p.poly([[40,10],[38.4,10],[39.2,15.5]],hair);
  p.line(32,6,32,10,'#3a3640');
  if(g>=5){p.ell(32,8,12,2.6,'#1a1820');p.ell(32,4.6,6.4,4,'#24222c');p.line(26,7,38,7,gold);v2ribbon(p,[[32,1],[28,3],[25,7]],1.6,'#c8343c');p.ell(32,1,1.6,1.4,gold);v2ribbon(p,[[34,2],[42,-1],[48,1]],1.2,'#2f8a6a');}
  if(g>=5){p.set(32,15,'#fff6c8');p.set(31,16,gold);p.set(33,16,gold);p.set(32,17,gold);p.set(32,14,gold);}
  if(hurt){p.line(27,17,30,17,INK);p.line(34,17,37,17,INK);}
  else{const ir=g>=5?'#c98f1a':'#4a3a2a';v2eye(p,27,16,ir,p.R(S)[2],true);v2eye(p,33,16,ir,p.R(S)[2],false);}
  p.line(26,act?13:14,30,14,hair);p.line(34,14,38,act?13:14,hair);
  p.set(32,19,p.R(S)[2]);if(act)p.poly([[30,21],[34,21],[33.5,22.5],[30.5,22.5]],'#7a2a30');else p.line(30.5,21.5,33.5,21.5,'#9a5040');
  if(g>=5)for(const [x,y] of [[6,24],[58,16],[8,52],[56,46],[46,4]]){p.set(x,y,'#fff6c8');p.set(x+1,y,'#ffe58a');p.set(x-1,y,'#ffe58a');p.set(x,y+1,'#ffe58a');p.set(x,y-1,'#ffe58a');}
  p.finish();return p;}
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
PIXU.sword=(st,g,mood)=>pxSword2(Math.max(1,Math.min(3,st||1)),mood);
PIXU.archer=(st,g,mood)=>pxArcher2(Math.max(1,Math.min(3,st||1)),mood);
PIXU.mage=(st,g,mood)=>pxMage2(Math.max(1,Math.min(3,st||1)),mood);
PIXU.ninja=(st,g,mood)=>pxNinja2(Math.max(1,Math.min(3,st||1)),mood);
PIXU.sling=(st,g,mood)=>pxSling2(Math.max(1,Math.min(3,st||1)),mood);
PIXU.paladin=(st,g,mood)=>pxPaladin2(Math.max(1,Math.min(3,st||1)),mood);
PIXU.hanbyeol=(st,stage,mood)=>pxHanbyeol2(stage,mood);
PIXU.mugyeol=(st,g,mood)=>pxMugyeol2(Math.max(1,Math.min(3,st||1)),mood);
