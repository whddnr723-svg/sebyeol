/* ---------- battlefield scenery ---------- */
/* five regions: 0 village fields, 1 goblin forest, 2 snow pass, 3 serpent pond, 4 underworld gate.
   the 7x6 grid sits at (ox,oy); scenery runs past it to every edge of the canvas */
const FIELD_PAL=[
 {g:['#3a2c37','#514838','#56803f','#3f6e3c'],road:['#3a2c25','#4a3a35','#8a6d4b','#a8875a'],tuft:['#7fb565','#2f5a30'],flw:['#ffe9a8','#ffb7c5'],wall:'#3a2a2e',sky:['#150f1a','#2e1f2b'],glow:'255,90,110',vig:'10,10,30',stone:'#8d8f9c'},
 {g:['#14261c','#1f3a26','#2f5a34','#24472a'],road:['#1f2a1c','#3a3a28','#5a5236','#6e6440'],tuft:['#5fa36a','#1d3d22'],flw:['#9fffd0','#d6a6ff'],wall:'#2a2418',sky:['#0b1410','#1a2a1c'],glow:'120,255,180',vig:'5,20,15',stone:'#6f7a70'},
 {g:['#4a5468','#8a96ad','#dfe8f2','#c8d6e6'],road:['#7a8296','#9aa6bc','#c4cede','#d8e0ea'],tuft:['#ffffff','#a9b8cc'],flw:['#ffffff','#e6f0ff'],wall:'#5a6478',sky:['#2a3248','#5a6680'],glow:'160,200,255',vig:'20,30,60',stone:'#9aa6bc'},
 {g:['#10242a','#18363e','#1f4a4c','#163a3c'],road:['#14262a','#2a3a3a','#4a5a50','#5a6a5c'],tuft:['#4fa3a0','#164040'],flw:['#bfefff','#7fe0d6'],wall:'#1a2a30',sky:['#05101a','#10242e'],glow:'90,200,255',vig:'0,15,25',stone:'#5a6a70'},
 {g:['#1a0f1e','#2a1530','#2e1a36','#24142c'],road:['#1a0a12','#3a1620','#5a2030','#6a2838'],tuft:['#6a4a8a','#2a1a3a'],flw:['#8fb0ff','#ff6b7a'],wall:'#2a1020',sky:['#05020a','#1a0a1e'],glow:'255,60,80',vig:'10,0,20',stone:'#4a3a50'}];
function paintField(c,FW,FH,cs,ox,oy,m){
  m=Math.max(0,Math.min(4,m||0));const P=FIELD_PAL[m];
  const W=cs*7,H=cs*6,mx=ox+W/2,ln=oy+cs*3,k=Math.max(1,FW/W),PI=Math.PI;let seed=11+m*977;const R=()=>(seed=seed*16807%2147483647)/2147483647;
  const ellF=(x,y,rx,ry,f,s,w)=>{c.beginPath();c.ellipse(x,y,rx,ry,0,0,7);if(f){c.fillStyle=f;c.fill();}if(s){c.strokeStyle=s;c.lineWidth=w||1.5;c.stroke();}};
  let g=c.createLinearGradient(0,oy,0,oy+H);g.addColorStop(0,P.g[0]);g.addColorStop(.4,P.g[1]);g.addColorStop(.52,P.g[2]);g.addColorStop(1,P.g[3]);c.fillStyle=g;c.fillRect(0,0,FW,FH);
  /* road from the enemy gate down through our camp */
  const road=(w0,w1,col)=>{c.beginPath();c.moveTo(mx-w0,0);c.lineTo(mx-w0,oy);c.bezierCurveTo(mx-w0*1.5,oy+H*.35,mx-w1*.6,oy+H*.6,mx-w1,oy+H);c.lineTo(mx-w1,FH);c.lineTo(mx+w1,FH);c.lineTo(mx+w1,oy+H);
    c.bezierCurveTo(mx+w1*.6,oy+H*.6,mx+w0*1.5,oy+H*.35,mx+w0,oy);c.lineTo(mx+w0,0);c.closePath();c.fillStyle=col;c.fill();};
  g=c.createLinearGradient(0,oy,0,oy+H);g.addColorStop(0,P.road[1]);g.addColorStop(.5,P.road[2]);g.addColorStop(1,P.road[3]);road(cs*.85,cs*1.25,P.road[0]);road(cs*.75,cs*1.15,g);
  for(let i=0;i<26;i++)ellF(mx+(R()-.5)*cs*1.6,oy+R()*H,cs*.07,cs*.035,'rgba(0,0,0,.22)');
  /* region ground details */
  if(m===3)for(let i=0;i<5*k;i++){const x=R()*FW,y=oy+cs*.6+R()*cs*2;if(Math.abs(x-mx)<cs*1.3)continue;const r=cs*(.4+R()*.5);ellF(x,y,r,r*.45,'#1f5f74','#0c2a34',2);ellF(x-r*.3,y-r*.12,r*.35,r*.1,'rgba(191,239,255,.35)');
    for(let j=0;j<4;j++){const rx=x+r*(R()-.5)*1.8;c.strokeStyle='#4f8a5a';c.lineWidth=2;c.beginPath();c.moveTo(rx,y+r*.3);c.lineTo(rx+(R()-.5)*4,y-r*.6);c.stroke();}}
  else for(let i=0;i<9*k;i++){const x=R()*FW,y=oy+cs*.5+R()*cs*2.1,r=cs*(.16+R()*.2);ellF(x,y,r,r*.5,m===2?'rgba(255,255,255,.55)':'rgba(20,10,18,.4)',m===2?'rgba(160,180,210,.5)':'rgba(120,90,70,.35)',1);}
  for(let i=0;i<70*k;i++){const x=R()*FW,y=ln+cs*.1+R()*(FH-ln-cs*.2);if(Math.abs(x-mx)<cs*1.1)continue;c.strokeStyle=R()<.5?P.tuft[0]:P.tuft[1];c.lineWidth=1.5;
    c.beginPath();c.moveTo(x-3,y);c.lineTo(x-1,y-5);c.moveTo(x,y);c.lineTo(x,y-7);c.moveTo(x+3,y);c.lineTo(x+1,y-5);c.stroke();}
  for(let i=0;i<10*k;i++){const x=R()*FW,y=ln+cs*.2+R()*(FH-ln-cs*.4);if(Math.abs(x-mx)<cs*1.2)continue;ellF(x,y,2,2,R()<.5?P.flw[0]:P.flw[1]);}
  for(let i=0;i<12*k;i++){const x=R()*FW,y=oy+cs*.6+R()*(FH-oy-cs),r=cs*(.05+R()*.07);ellF(x,y,r*1.4,r,P.stone,'#2a2430',1.5);}
  /* region landmarks on the enemy side */
  for(let x=cs*.45;x<FW;x+=cs*.95){if(Math.abs(x-mx)<cs*1.7)continue;const y=oy+cs*(.9+R()*.6);
    if(m===0){c.strokeStyle='#22161c';c.lineWidth=cs*.07;c.lineCap='round';c.beginPath();c.moveTo(x,y);c.lineTo(x,y-cs*.5);c.moveTo(x,y-cs*.25);c.lineTo(x-cs*.2,y-cs*.48);c.moveTo(x,y-cs*.34);c.lineTo(x+cs*.18,y-cs*.56);c.stroke();}
    else if(m===1){c.fillStyle='#3a2a1a';c.fillRect(x-cs*.06,y-cs*.35,cs*.12,cs*.35);for(const [dx,dy,r] of [[0,-.6,.38],[-.22,-.42,.28],[.22,-.42,.28]])ellF(x+dx*cs,y+dy*cs,r*cs,r*cs*.85,'#1d4a2a','#0c2414',1.5);
      ellF(x-cs*.1,y-cs*.72,cs*.12,cs*.07,'rgba(160,255,190,.25)');}
    else if(m===2){c.fillStyle='#3a2a1e';c.fillRect(x-cs*.05,y-cs*.2,cs*.1,cs*.2);for(let j=0;j<3;j++){const w=cs*(.38-j*.1),ty=y-cs*(.2+j*.24);c.beginPath();c.moveTo(x-w,ty);c.lineTo(x,ty-cs*.36);c.lineTo(x+w,ty);c.closePath();c.fillStyle='#2f5a4a';c.fill();
      c.beginPath();c.moveTo(x-w*.55,ty-cs*.16);c.lineTo(x,ty-cs*.36);c.lineTo(x+w*.55,ty-cs*.16);c.closePath();c.fillStyle='#f4f8ff';c.fill();}}
    else if(m===3){c.beginPath();c.moveTo(x-cs*.35,y);c.lineTo(x-cs*.2,y-cs*.55);c.lineTo(x,y-cs*.3);c.lineTo(x+cs*.15,y-cs*.7);c.lineTo(x+cs*.35,y);c.closePath();c.fillStyle='#2a3a40';c.fill();c.strokeStyle='#0c1a20';c.lineWidth=1.5;c.stroke();}
    else{c.fillStyle='#4a3a50';c.beginPath();c.moveTo(x-cs*.16,y);c.lineTo(x-cs*.16,y-cs*.34);c.arc(x,y-cs*.34,cs*.16,PI,0);c.lineTo(x+cs*.16,y);c.closePath();c.fill();c.strokeStyle='#1a0f1e';c.lineWidth=1.5;c.stroke();
      const fy=y-cs*.75;g=c.createRadialGradient(x,fy,0,x,fy,cs*.25);g.addColorStop(0,'rgba(143,176,255,.9)');g.addColorStop(1,'rgba(143,176,255,0)');c.fillStyle=g;c.fillRect(x-cs*.25,fy-cs*.25,cs*.5,cs*.5);}}
  /* forest fireflies, falling snow */
  if(m===1||m===2)for(let i=0;i<40*k;i++)ellF(R()*FW,R()*FH,m===2?1.8:1.4,m===2?1.8:1.4,m===2?'rgba(255,255,255,.85)':'rgba(190,255,150,.8)');
  /* the enemy stronghold above the wall */
  const wh=cs*.42,wy=Math.max(0,oy-wh);
  if(wy>0){g=c.createLinearGradient(0,0,0,wy);g.addColorStop(0,P.sky[0]);g.addColorStop(1,P.sky[1]);c.fillStyle=g;c.fillRect(0,0,FW,wy);
    for(let x=cs*.7;x<FW;x+=cs*2.1){if(Math.abs(x-mx)<cs*1.5)continue;const th=Math.min(wy,cs*(.8+R()*.7)),tw=cs*.62;
      if(m===3){c.beginPath();c.moveTo(x-tw,wy);c.lineTo(x-tw*.3,wy-th);c.lineTo(x+tw*.2,wy-th*.6);c.lineTo(x+tw,wy);c.closePath();c.fillStyle='#16262c';c.fill();continue;}
      c.fillStyle=m===2?'#3a4458':'#231723';c.fillRect(x-tw/2,wy-th,tw,th);for(let j=0;j<3;j++)c.fillRect(x-tw/2+j*tw*.4,wy-th-cs*.1,tw*.2,cs*.1);
      if(m===2){c.fillStyle='#f4f8ff';c.fillRect(x-tw/2,wy-th-cs*.1,tw,cs*.05);}c.fillStyle='rgba('+P.glow+',.75)';c.fillRect(x-cs*.05,wy-th*.6,cs*.1,cs*.16);}}
  for(let x=-2;x<FW;x+=cs*.2){c.beginPath();c.moveTo(x,wy);c.lineTo(x,wy+wh*.8);c.lineTo(x+cs*.09,wy+wh);c.lineTo(x+cs*.18,wy+wh*.8);c.lineTo(x+cs*.18,wy);c.closePath();c.fillStyle=P.wall;c.fill();c.strokeStyle='#100a10';c.lineWidth=1.5;c.stroke();
    if(m===2){c.fillStyle='#f4f8ff';c.fillRect(x,wy,cs*.18,cs*.05);}}
  g=c.createRadialGradient(mx,wy,0,mx,wy,cs*(m===4?3.2:2.4));g.addColorStop(0,'rgba('+P.glow+','+(m===4?.75:.55)+')');g.addColorStop(1,'rgba('+P.glow+',0)');c.fillStyle=g;c.fillRect(mx-cs*3.2,wy,cs*6.4,cs*3.4);
  c.beginPath();c.moveTo(mx-cs*.8,wy);c.lineTo(mx-cs*.8,wy+cs*.3);c.arc(mx,wy+cs*.3,cs*.8,PI,0,true);c.lineTo(mx+cs*.8,wy);c.closePath();c.fillStyle='#120a12';c.fill();c.strokeStyle=m===4?'#b3334a':'#5a3a40';c.lineWidth=3;c.stroke();
  if(m===4)for(const d of [-1,1]){c.fillStyle='#3a1620';c.fillRect(mx+d*cs*.95-cs*.12,wy-cs*.2,cs*.24,cs*.9);c.fillStyle='#b3334a';c.fillRect(mx+d*cs*.95-cs*.16,wy-cs*.26,cs*.32,cs*.08);}
  /* our barricade along the defence line, open at the road */
  for(let x=ox+cs*.3-Math.ceil((ox+cs*.3)/(cs*.5))*cs*.5;x<FW+cs;x+=cs*.5){if(Math.abs(x-mx)<cs*1.25)continue;for(const [col,w] of [['#3a2a1e',5],['#c9a36a',2.5]]){c.strokeStyle=col;c.lineWidth=w;c.lineCap='round';
      c.beginPath();c.moveTo(x-cs*.16,ln+cs*.12);c.lineTo(x+cs*.16,ln-cs*.14);c.moveTo(x+cs*.16,ln+cs*.12);c.lineTo(x-cs*.16,ln-cs*.14);c.stroke();}}
  for(const q of [.12,6.88]){const x=ox+q*cs;c.strokeStyle='#3a2a1e';c.lineWidth=4;c.beginPath();c.moveTo(x,ln+cs*.25);c.lineTo(x,ln-cs*.14);c.stroke();}
  for(const [x,d] of [[ox+cs*.55,1],[ox+W-cs*.55,-1]]){c.strokeStyle='#3a2a1e';c.lineWidth=3;c.beginPath();c.moveTo(x,ln+cs*.3);c.lineTo(x,ln-cs*.55);c.stroke();
    c.beginPath();c.moveTo(x,ln-cs*.53);c.lineTo(x+d*cs*.42,ln-cs*.4);c.lineTo(x,ln-cs*.22);c.closePath();c.fillStyle='#4f8ef0';c.fill();c.strokeStyle='#1b1730';c.lineWidth=1.5;c.stroke();}
  const vr=Math.max(FW,FH);g=c.createRadialGradient(FW/2,oy+H*.55,vr*.25,FW/2,oy+H*.55,vr*.8);g.addColorStop(0,'rgba('+P.vig+',0)');g.addColorStop(1,'rgba('+P.vig+',.5)');c.fillStyle=g;c.fillRect(0,0,FW,FH);
}
/* ---------- item icons, drawn in a -1..1 box ---------- */
function drawItem(c,id){
  const OL='#1b1730';c.lineWidth=.1;c.lineJoin='round';c.lineCap='round';
  const P=(p,f)=>{c.beginPath();for(let i=0;i<p.length;i+=2)i?c.lineTo(p[i],p[i+1]):c.moveTo(p[i],p[i+1]);c.closePath();c.fillStyle=f;c.fill();c.strokeStyle=OL;c.stroke();};
  const C=(x,y,r,f)=>{c.beginPath();c.arc(x,y,r,0,7);c.fillStyle=f;c.fill();c.strokeStyle=OL;c.stroke();};
  C(0,0,.92,'#232a4d');
  switch(id){
  case 'blade':P([-.1,.3,.1,.3,.1,-.5,0,-.72,-.1,-.5],'#cfd6e6');P([-.34,.3,.34,.3,.34,.42,-.34,.42],'#ffc94d');P([-.08,.42,.08,.42,.08,.7,-.08,.7],'#9a6a3a');break;
  case 'armor':P([-.5,-.4,-.2,-.5,0,-.36,.2,-.5,.5,-.4,.42,.5,0,.66,-.42,.5],'#9aa5bd');P([-.14,-.1,.14,-.1,0,.3],'#ffc94d');break;
  case 'glove':P([-.4,.6,-.4,-.1,-.24,-.5,-.1,-.1,.02,-.6,.16,-.1,.3,-.5,.42,0,.4,.6],'#e0455a');P([-.44,.4,.44,.4,.44,.62,-.44,.62],'#ffc94d');break;
  case 'tome':P([-.5,-.5,.5,-.5,.5,.56,-.5,.56],'#7a5cc9');P([-.5,-.5,-.34,-.5,-.34,.56,-.5,.56],'#4b3a9a');C(.1,0,.2,'#7fe0ff');break;
  case 'fang':P([-.4,-.5,.4,-.5,.2,.1,0,.7,-.2,.1],'#f1f0e6');P([-.4,-.5,.4,-.5,.3,-.24,-.3,-.24],'#e0455a');break;
  case 'guard':P([-.52,-.5,.52,-.5,.52,.1,0,.7,-.52,.1],'#5aa2ff');P([-.2,-.3,.2,-.3,.2,0,0,.3,-.2,0],'#fff');break;
  case 'scope':P([-.6,-.1,.2,-.36,.3,-.06,-.5,.2],'#c9a36a');C(.38,-.24,.24,'#7fe0ff');P([-.2,.2,0,.14,.1,.64,-.1,.66],'#9a6a3a');break;
  case 'charm':C(0,.1,.46,'#5fd6a8');P([-.14,-.3,.14,-.3,.08,-.62,-.08,-.62],'#ffc94d');C(0,.1,.16,'#fff');break;
  case 'claw':for(const x of [-.36,0,.36])P([x-.12,.5,x+.12,.5,x+.2,-.2,x+.04,-.66,x-.1,-.2],'#ffe566');break;}
}
