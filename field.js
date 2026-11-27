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
    if(m===0){const kind=Math.floor(x/(cs*.95))%3;if(kind===0){c.fillStyle='#6a4a32';c.fillRect(x-cs*.07,y-cs*.62,cs*.14,cs*.62);ellF(x,y-cs*.66,cs*.11,cs*.13,'#7a5a3a','#22161c',1.5);c.fillStyle='#22161c';c.fillRect(x-cs*.13,y-cs*.82,cs*.26,cs*.07);ellF(x-cs*.045,y-cs*.68,cs*.025,cs*.02,'#f4ecd8');ellF(x+cs*.045,y-cs*.68,cs*.025,cs*.02,'#f4ecd8');c.fillStyle='#b3334a';c.fillRect(x-cs*.05,y-cs*.58,cs*.1,cs*.025);c.fillStyle='#f4ecd8';c.fillRect(x-cs*.03,y-cs*.45,cs*.06,cs*.3);}else if(kind===1){c.strokeStyle='#4a3424';c.lineWidth=cs*.04;c.beginPath();c.moveTo(x,y);c.lineTo(x,y-cs*.8);c.stroke();ellF(x+cs*.02,y-cs*.84,cs*.09,cs*.04,'#5a4030');c.beginPath();c.moveTo(x+cs*.1,y-cs*.86);c.lineTo(x+cs*.15,y-cs*.84);c.lineTo(x+cs*.1,y-cs*.82);c.closePath();c.fillStyle='#e0a040';c.fill();}else{c.fillStyle='#e8dcc0';c.fillRect(x-cs*.24,y-cs*.26,cs*.48,cs*.26);c.fillStyle='#5a4030';c.fillRect(x-cs*.06,y-cs*.18,cs*.12,cs*.18);c.beginPath();c.moveTo(x-cs*.34,y-cs*.22);c.quadraticCurveTo(x,y-cs*.62,x+cs*.34,y-cs*.22);c.closePath();c.fillStyle='#b8925a';c.fill();c.strokeStyle='#5a4030';c.lineWidth=1.5;c.stroke();c.strokeStyle='#8a6a3a';c.beginPath();c.moveTo(x-cs*.22,y-cs*.3);c.quadraticCurveTo(x,y-cs*.5,x+cs*.22,y-cs*.3);c.stroke();}}
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
    const roof=(x,y,w,h,col,ridge)=>{c.beginPath();c.moveTo(x-w,y-h*.32);c.quadraticCurveTo(x,y+h*.12,x+w,y-h*.32);c.quadraticCurveTo(x+w*.62,y-h*.42,x+w*.5,y-h);
      c.lineTo(x-w*.5,y-h);c.quadraticCurveTo(x-w*.62,y-h*.42,x-w,y-h*.32);c.closePath();c.fillStyle=col;c.fill();c.strokeStyle='#08050a';c.lineWidth=1.5;c.stroke();
      c.strokeStyle='rgba(255,255,255,.12)';c.lineWidth=1;for(let t=-.8;t<=.8;t+=.2){c.beginPath();c.moveTo(x+w*.5*t,y-h*.95);c.lineTo(x+w*.82*t,y-h*.12);c.stroke();}
      c.fillStyle=ridge;c.fillRect(x-w*.52,y-h*1.04,w*1.04,h*.12);};
  if(wy>0){g=c.createLinearGradient(0,0,0,wy);g.addColorStop(0,P.sky[0]);g.addColorStop(1,P.sky[1]);c.fillStyle=g;c.fillRect(0,0,FW,wy);
    for(let x=cs*.7;x<FW;x+=cs*2.1){if(Math.abs(x-mx)<cs*1.5)continue;const th=Math.min(wy*.8,cs*(.55+R()*.35)),tw=cs*.62;
      if(m===3){c.beginPath();c.moveTo(x-tw,wy);c.lineTo(x-tw*.3,wy-th);c.lineTo(x+tw*.2,wy-th*.6);c.lineTo(x+tw,wy);c.closePath();c.fillStyle='#16262c';c.fill();continue;}
      c.fillStyle=m===2?'#3a4458':'#2a1c22';c.fillRect(x-tw/2,wy-th,tw,th);c.fillStyle=m===4?'#5a1a24':'#7a2a2a';for(const d of [-.45,-.15,.15,.45])c.fillRect(x+tw*d-cs*.025,wy-th,cs*.05,th);
      c.fillStyle='rgba('+P.glow+',.7)';c.fillRect(x-cs*.12,wy-th*.7,cs*.24,cs*.12);
      roof(x,wy-th,tw*.95,cs*.36,m===2?'#5a6478':'#1a141c',m===2?'#f4f8ff':'#3a3040');}}
  /* stone wall with a tiled coping */
  c.fillStyle=P.wall;c.fillRect(0,wy,FW,wh);c.strokeStyle='rgba(0,0,0,.35)';c.lineWidth=1;
  for(let r=0;r<3;r++){const yy=wy+wh*.28+r*wh*.24;c.beginPath();c.moveTo(0,yy);c.lineTo(FW,yy);c.stroke();for(let x=(r%2)*cs*.14;x<FW;x+=cs*.28){c.beginPath();c.moveTo(x,yy);c.lineTo(x,yy+wh*.24);c.stroke();}}
  c.fillStyle=m===2?'#e8eef8':'#1a141c';c.beginPath();c.moveTo(-4,wy+wh*.28);c.lineTo(-4,wy+wh*.06);c.lineTo(FW+4,wy+wh*.06);c.lineTo(FW+4,wy+wh*.28);c.closePath();c.fill();
  for(let x=0;x<FW;x+=cs*.14)ellF(x,wy+wh*.28,cs*.05,cs*.035,m===2?'#c8d2e2':'#2a2230');
  g=c.createRadialGradient(mx,wy,0,mx,wy,cs*(m===4?3.2:2.4));g.addColorStop(0,'rgba('+P.glow+','+(m===4?.75:.55)+')');g.addColorStop(1,'rgba('+P.glow+',0)');c.fillStyle=g;c.fillRect(mx-cs*3.2,wy,cs*6.4,cs*3.4);
  if(m!==4){c.fillStyle='#5a5058';c.fillRect(mx-cs*1.05,wy-cs*.05,cs*2.1,wh+cs*.05);c.strokeStyle='rgba(0,0,0,.4)';c.lineWidth=1;for(let r=0;r<3;r++){const yy=wy+r*wh*.33;c.beginPath();c.moveTo(mx-cs*1.05,yy);c.lineTo(mx+cs*1.05,yy);c.stroke();}
    c.fillStyle='#2a1c22';c.fillRect(mx-cs*.85,wy-cs*.42,cs*1.7,cs*.38);c.fillStyle='#7a2a2a';for(const d of [-.8,-.4,0,.4,.8])c.fillRect(mx+cs*d-cs*.03,wy-cs*.42,cs*.06,cs*.38);
    c.fillStyle='rgba('+P.glow+',.6)';c.fillRect(mx-cs*.55,wy-cs*.32,cs*.3,cs*.12);c.fillRect(mx+cs*.25,wy-cs*.32,cs*.3,cs*.12);
    roof(mx,wy-cs*.42,cs*1.25,cs*.48,m===2?'#5a6478':'#1a141c',m===2?'#f4f8ff':'#3a3040');}
  c.beginPath();c.moveTo(mx-cs*.62,wy+wh+2);c.lineTo(mx-cs*.62,wy+cs*.22);c.arc(mx,wy+cs*.22,cs*.62,PI,0);c.lineTo(mx+cs*.62,wy+wh+2);c.closePath();c.fillStyle='#120a12';c.fill();c.strokeStyle=m===4?'#b3334a':'#3a3036';c.lineWidth=3;c.stroke();
  if(m===4){c.fillStyle='#b3334a';for(const d of [-1,1])c.fillRect(mx+d*cs*1.0-cs*.07,wy-cs*.7,cs*.14,wh+cs*.75);c.fillRect(mx-cs*1.15,wy-cs*.66,cs*2.3,cs*.09);c.fillRect(mx-cs*1.15,wy-cs*.42,cs*2.3,cs*.07);
    for(let x=mx-cs*.95;x<=mx+cs*.96;x+=cs*.12){c.fillRect(x-cs*.02,wy-cs*.95,cs*.04,cs*.3);c.beginPath();c.moveTo(x-cs*.045,wy-cs*.95);c.lineTo(x,wy-cs*1.05);c.lineTo(x+cs*.045,wy-cs*.95);c.closePath();c.fill();}
    ellF(mx,wy-cs*.82,cs*.14,cs*.14,'#f4ecd8','#3a1620',2);c.fillStyle='#3a1620';c.beginPath();c.arc(mx,wy-cs*.82,cs*.14,PI*.5,PI*1.5);c.fill();}
  /* our camp: pointed wooden stockade tied with straw rope, open at the road */
  for(let x=ox+cs*.3-Math.ceil((ox+cs*.3)/(cs*.2))*cs*.2;x<FW+cs;x+=cs*.2){if(Math.abs(x-mx)<cs*1.25)continue;
    c.beginPath();c.moveTo(x-cs*.065,ln+cs*.14);c.lineTo(x-cs*.065,ln-cs*.12);c.lineTo(x,ln-cs*.22);c.lineTo(x+cs*.065,ln-cs*.12);c.lineTo(x+cs*.065,ln+cs*.14);c.closePath();
    c.fillStyle='#8a6440';c.fill();c.strokeStyle='#3a2a1e';c.lineWidth=1.5;c.stroke();c.fillStyle='rgba(255,230,180,.25)';c.fillRect(x-cs*.05,ln-cs*.1,cs*.025,cs*.22);}
  for(const yy of [ln-cs*.06,ln+cs*.06]){c.strokeStyle='#d8bf86';c.lineWidth=2.5;c.setLineDash([cs*.05,cs*.03]);
    for(const [x0,x1] of [[0,mx-cs*1.25],[mx+cs*1.25,FW]]){c.beginPath();c.moveTo(x0,yy);c.lineTo(x1,yy);c.stroke();}c.setLineDash([]);}
  /* five-colour banners on the gateposts of our camp */
  for(const [x,d,cols] of [[ox+cs*.55,1,['#2f6fc0','#f4ecd8','#c8343c']],[ox+W-cs*.55,-1,['#c8343c','#e3b341','#2f6fc0']]]){c.strokeStyle='#3a2a1e';c.lineWidth=3;c.beginPath();c.moveTo(x,ln+cs*.3);c.lineTo(x,ln-cs*.62);c.stroke();
    ellF(x,ln-cs*.64,cs*.04,cs*.04,'#e3b341');const bw=cs*.26,bx=d>0?x+2:x-2-bw;
    for(let j=0;j<3;j++){c.fillStyle=cols[j];c.fillRect(bx,ln-cs*.56+j*cs*.15,bw,cs*.15);}
    c.beginPath();c.moveTo(bx,ln-cs*.11);c.lineTo(bx+bw/2,ln-cs*.01);c.lineTo(bx+bw,ln-cs*.11);c.closePath();c.fillStyle=cols[2];c.fill();c.strokeStyle='#1b1730';c.lineWidth=1.2;c.strokeRect(bx,ln-cs*.56,bw,cs*.45);}
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
