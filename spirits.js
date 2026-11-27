/* ---------- goblins, spirits and dragons (ASCII only): ember, stone and shadow goblins, wind and bolt spirits,
   the dragon family, the mist serpent, Duduri and Gaon ---------- */
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
PIXU.ember=(st,g,mood)=>pxEmber2(Math.max(1,Math.min(3,st||1)),mood);
PIXU.rock=(st,g,mood)=>pxRock2(Math.max(1,Math.min(3,st||1)),mood);
PIXU.shade=(st,g,mood)=>pxShade2(Math.max(1,Math.min(3,st||1)),mood);
PIXU.wind=(st,g,mood)=>pxWind2(Math.max(1,Math.min(3,st||1)),mood);
PIXU.bolt=(st,g,mood)=>pxBolt2(Math.max(1,Math.min(3,st||1)),mood);
for(const [id,kind] of [['whelp','whelp'],['salam','salam'],['stardrake','star'],['elder','dawn'],['mireu','rain']])PIXU[id]=(st,g,mood)=>pxDrake2(kind,Math.max(1,Math.min(3,st||1)),mood);
PIXU.wyvern=(st,g,mood)=>pxImugi2(Math.max(1,Math.min(3,st||1)),mood);
PIXU.duduri=(st,g,mood)=>pxDuduri2(Math.max(1,Math.min(3,st||1)),mood);
PIXU.gaon=(st,g,mood)=>pxGaon2(Math.max(1,Math.min(3,st||1)),mood);
