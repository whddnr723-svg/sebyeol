/* ---------- beasts (ASCII only): moon bear, wolves, fox, panther, hawk, white tiger ---------- */
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
PIXU.bear=(st,g,mood)=>pxMoonBear(Math.max(1,Math.min(3,st||1)),mood);
PIXU.wolf=(st,g,mood)=>pxWolf2(Math.max(1,Math.min(3,st||1)),mood);
PIXU.wolfking=(st,g,mood)=>pxWolf2(Math.max(1,Math.min(3,st||1)),mood,{moon:1});
PIXU.fox=(st,g,mood)=>pxFox2(Math.max(1,Math.min(3,st||1)),mood);
PIXU.panther=(st,g,mood)=>pxPanther2(Math.max(1,Math.min(3,st||1)),mood);
PIXU.hawk=(st,g,mood)=>pxHawk2(Math.max(1,Math.min(3,st||1)),mood);
PIXU.baeksan=(st,g,mood)=>pxBaeksan2(Math.max(1,Math.min(3,st||1)),mood);
