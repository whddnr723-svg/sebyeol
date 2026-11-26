/* ---------- attack poses: how a body moves during one attack (k: 0 -> 1) ---------- */
function atkPose(o,R,cs){
  const k=Math.min(1,Math.max(0,1-o.atkT/.3)),s=Math.sin(k*Math.PI),dx=o.adx||0,dy=o.ady||0,f=o.face||1;
  /* wind back, snap forward, settle */
  const st=k<.3?-k/.3:k<.5?-1+(k-.3)/.2*2:1-(k-.5)/.5;
  switch(o.mot){
  case 'slash':return [dx*st*cs*.26,dy*st*cs*.26,f*st*.55,1,1];
  case 'pounce':return [dx*st*cs*.34,dy*st*cs*.34-s*R*.45,f*st*.22,1+s*.1,1-s*.06];
  case 'swoop':return [dx*s*cs*.4,dy*s*cs*.4-s*R*.3,f*s*.4,1,1];
  case 'shoot':return [-dx*Math.max(0,st)*cs*.12,-dy*Math.max(0,st)*cs*.12,-f*Math.max(0,-st)*.16,1-Math.max(0,-st)*.06,1];
  case 'cast':return [0,-s*R*.28,f*Math.sin(k*Math.PI*2)*.08,1+s*.1,1+s*.1];
  case 'smash':{const up=k<.45?k/.45:0,dn=k>=.45?1-(k-.45)/.55:0;return [dx*dn*cs*.2,dy*dn*cs*.2-up*R*.7,f*up*-.25,1+dn*.18,1-dn*.22];}
  default:return [dx*s*cs*.3,dy*s*cs*.3,0,1,1];}
}

/* ---------- status marks drawn on a unit: stun stars, slow frost, frenzy ---------- */
function drawStatus(cx,cs,x,y,R,o,t){
  const now=performance.now()/1000;
  if(o.stun>t)for(let i=0;i<3;i++){const a=now*5+i*2.1,sx=x+Math.cos(a)*R*.6,sy=y-R*1.2+Math.sin(a)*R*.16;
    cx.beginPath();for(let j=0;j<8;j++){const r=j%2?cs*.035:cs*.085,b=j*Math.PI/4+now*3;cx.lineTo(sx+Math.cos(b)*r,sy+Math.sin(b)*r);}
    cx.closePath();cx.fillStyle='#ffe566';cx.fill();cx.strokeStyle='#1b1730';cx.lineWidth=1;cx.stroke();}
  if(o.slowU>t){cx.beginPath();cx.ellipse(x,y+R*.8,R*.85,R*.3,0,0,7);cx.strokeStyle='#9fe3ff';cx.lineWidth=2;cx.setLineDash([4,4]);cx.lineDashOffset=-now*20;cx.stroke();cx.setLineDash([]);}
  if(o.burnU>t)for(let i=0;i<2;i++){const fx=x+(i?.3:-.3)*R,fy=y-R*.2,h=R*(.5+.2*Math.sin(now*12+i*2));cx.beginPath();cx.moveTo(fx-R*.14,fy);cx.quadraticCurveTo(fx,fy-h,fx+R*.14,fy);cx.closePath();cx.fillStyle=i?'#ffd24a':'#ff7a2f';cx.fill();}
  if(o.frenzy>t)for(const k of [-1,1])for(let i=0;i<2;i++){const yy=y-((now*2.5+i*.5)%1)*R*1.2+R*.5;cx.beginPath();cx.moveTo(x+k*R*(.9+i*.15),yy);cx.lineTo(x+k*R*(.9+i*.15),yy-R*.3);cx.strokeStyle='#ff7d6b';cx.lineWidth=2;cx.stroke();}
}

/* ---------- burning ground ---------- */
function drawZone(cx,cs,z){
  const now=performance.now()/1000,x=z.x*cs,y=z.y*cs,r=z.r*cs;
  const g=cx.createRadialGradient(x,y,r*.1,x,y,r);g.addColorStop(0,z.c);g.addColorStop(1,'rgba(0,0,0,0)');
  cx.globalAlpha=.4+.1*Math.sin(now*9);cx.fillStyle=g;cx.beginPath();cx.arc(x,y,r,0,7);cx.fill();
  cx.globalAlpha=.9;
  for(let i=0;i<14;i++){const a=i*2.4+1,d=r*(.25+.7*((i*37%10)/10)),fx=x+Math.cos(a)*d,fy=y+Math.sin(a)*d*.8,h=cs*(.2+.12*Math.sin(now*8+i*1.9)),w=cs*.08;
    cx.beginPath();cx.moveTo(fx-w,fy);cx.quadraticCurveTo(fx-w*.4,fy-h*.5,fx,fy-h);cx.quadraticCurveTo(fx+w*.4,fy-h*.5,fx+w,fy);cx.closePath();cx.fillStyle=i%3?z.c:'#ffe9a8';cx.fill();}
  cx.globalAlpha=1;
}

/* ---------- one effect. f.t = time left, f.T = total, p = progress 0..1 ---------- */
function drawFx(cx,cs,W,f){
  const T=f.T||f.t||1,p=Math.min(1,Math.max(0,1-f.t/T)),fade=Math.min(1,f.t/T*2.5),PI=Math.PI,OL='#1b1730',c=f.c||'#fff',x=f.x*cs,y=f.y*cs;
  const L=(a,b,d,e)=>{cx.beginPath();cx.moveTo(a,b);cx.lineTo(d,e);cx.stroke();};
  const dot=(a,b,r)=>{cx.beginPath();cx.arc(a,b,Math.max(.1,r),0,7);cx.fill();};
  cx.save();cx.globalAlpha=fade;cx.strokeStyle=c;cx.fillStyle=c;cx.lineCap='round';cx.lineJoin='round';
  switch(f.k||(f.b?'beam':f.p?'proj':f.s?'slash':f.txt?'txt':f.fill?'shock':'ring')){
  case 'beam':{const w=2.5*(f.w||1);cx.globalAlpha=fade*.4;cx.lineWidth=w+4;L(f.x1*cs,f.y1*cs,f.x2*cs,f.y2*cs);cx.globalAlpha=fade;cx.lineWidth=w;L(f.x1*cs,f.y1*cs,f.x2*cs,f.y2*cs);
    cx.strokeStyle='#fff';cx.lineWidth=1;L(f.x1*cs,f.y1*cs,f.x2*cs,f.y2*cs);break;}
  case 'proj':{const px=(f.x1+(f.x2-f.x1)*p)*cs,py=(f.y1+(f.y2-f.y1)*p)*cs,an=Math.atan2(f.y2-f.y1,f.x2-f.x1);cx.globalAlpha=1;
    if(f.p==='arrow'){cx.translate(px,py);cx.rotate(an);cx.strokeStyle='rgba(255,255,255,.35)';cx.lineWidth=2;L(-cs*.7,0,-cs*.3,0);cx.strokeStyle=OL;cx.lineWidth=4;L(-cs*.3,0,0,0);cx.strokeStyle='#f1e2c0';cx.lineWidth=2;L(-cs*.3,0,0,0);
      cx.beginPath();cx.moveTo(cs*.1,0);cx.lineTo(-cs*.03,-cs*.07);cx.lineTo(-cs*.03,cs*.07);cx.closePath();cx.fillStyle='#fff';cx.fill();}
    else{const r=cs*(f.p==='rock'?.09:.11);if(f.p==='orb')for(let i=1;i<4;i++){cx.globalAlpha=.3/i;dot(px-Math.cos(an)*cs*.14*i,py-Math.sin(an)*cs*.14*i,r*(1.5-i*.3));}
      cx.globalAlpha=1;cx.fillStyle=f.p==='rock'?'#9aa0b5':c;dot(px,py,r);cx.strokeStyle=OL;cx.lineWidth=1.5;cx.stroke();cx.fillStyle='#fff';dot(px-r*.3,py-r*.3,r*.3);}break;}
  case 'slash':{cx.translate(x,y);cx.rotate(f.a);const s=cs*(f.big?.7:.46)*(.7+.5*p);cx.beginPath();cx.arc(-s*.5,0,s,-1.15,1.15);cx.arc(-s*.9,0,s*1.2,.85,-.85,true);cx.closePath();
    cx.fillStyle='#fff';cx.fill();cx.lineWidth=2;cx.strokeStyle=c;cx.stroke();break;}
  case 'spark':{const n=f.big?10:6;cx.lineWidth=f.big?3.5:2.5;for(let i=0;i<n;i++){const a=i*2*PI/n+f.x*3,r1=cs*(.1+.3*p),r2=r1+cs*(f.big?.3:.16)*(1-p);L(x+Math.cos(a)*r1,y+Math.sin(a)*r1,x+Math.cos(a)*r2,y+Math.sin(a)*r2);}
    cx.fillStyle='#fff';cx.globalAlpha=fade*(1-p);dot(x,y,cs*.12*(1-p));break;}
  case 'bite':{cx.translate(x,y);const s=cs*(f.big?.52:.32),gap=s*.9*(1-Math.min(1,p*2.4));cx.fillStyle='#fff';cx.strokeStyle=OL;cx.lineWidth=1.5;
    for(const k of [-1,1])for(let i=-1;i<=1;i++){cx.beginPath();cx.moveTo(i*s*.5-s*.24,k*(gap+s*.5));cx.lineTo(i*s*.5+s*.24,k*(gap+s*.5));cx.lineTo(i*s*.5,k*gap);cx.closePath();cx.fill();cx.stroke();}
    if(p>.42){cx.strokeStyle=c;cx.lineWidth=f.big?5:3;L(-s*.9,0,s*.9,0);}break;}
  case 'claw':{cx.translate(x,y);cx.rotate(f.a+.9);const s=cs*.36,q=Math.min(1,p*2.2);for(let i=-1;i<=1;i++){cx.strokeStyle=c;cx.lineWidth=5;L(-s,i*s*.38,-s+2*s*q,i*s*.38-s*.25*q);cx.strokeStyle='#fff';cx.lineWidth=2.5;L(-s,i*s*.38,-s+2*s*q,i*s*.38-s*.25*q);}break;}
  case 'ring':{cx.lineWidth=3;cx.beginPath();cx.arc(x,y,Math.max(.1,f.r*cs*(.35+.65*p)),0,7);cx.stroke();break;}
  case 'shock':{const r=f.r*cs,e=1-(1-p)*(1-p),g=cx.createRadialGradient(x,y,0,x,y,Math.max(1,r*e));g.addColorStop(0,'rgba(255,255,255,0)');g.addColorStop(.75,c);g.addColorStop(1,'rgba(255,255,255,0)');
    cx.globalAlpha=.5*(1-p);cx.fillStyle=g;dot(x,y,r*e);cx.globalAlpha=1-p;cx.lineWidth=cs*.12*(1-p)+1.5;cx.beginPath();cx.arc(x,y,Math.max(.1,r*e),0,7);cx.stroke();
    cx.fillStyle=c;for(let i=0;i<12;i++){const a=i*PI/6+f.x;dot(x+Math.cos(a)*(r*e+cs*.06),y+Math.sin(a)*(r*e+cs*.06)-p*cs*.15,cs*.05*(1-p));}
    cx.strokeStyle='rgba(27,23,48,.5)';cx.lineWidth=1.5;for(let i=0;i<6;i++){const a=i*PI/3+f.y;L(x,y,x+Math.cos(a)*r*.55*e,y+Math.sin(a)*r*.55*e);}break;}
  case 'boom':{const r=f.r*cs,e=1-Math.pow(1-p,3),g=cx.createRadialGradient(x,y,0,x,y,Math.max(1,r*e));g.addColorStop(0,'#fff');g.addColorStop(.35,'#ffe9a8');g.addColorStop(.7,c);g.addColorStop(1,'rgba(0,0,0,0)');
    cx.globalAlpha=1-p;cx.fillStyle=g;dot(x,y,r*e);cx.fillStyle=c;for(let i=0;i<14;i++){const a=i*2.4,d=r*e*(1+.25*((i*7)%4)/4);dot(x+Math.cos(a)*d,y+Math.sin(a)*d-Math.sin(p*PI)*cs*.3,cs*.07*(1-p));}
    cx.lineWidth=3;cx.beginPath();cx.arc(x,y,Math.max(.1,r*e),0,7);cx.stroke();break;}
  case 'spin':{const r=f.r*cs*.8,a0=p*PI*3.2;for(let i=0;i<12;i++){cx.globalAlpha=fade*(1-i/12);cx.strokeStyle=i<3?'#fff':c;cx.lineWidth=cs*.2*(1-i/12)+1;cx.beginPath();cx.arc(x,y,r,a0-i*.2-.22,a0-i*.2);cx.stroke();}break;}
  case 'lob':{const px=(f.x1+(f.x2-f.x1)*p)*cs,py=(f.y1+(f.y2-f.y1)*p)*cs,h=Math.sin(p*PI)*cs*1.4;cx.globalAlpha=.3;cx.fillStyle='#000';cx.beginPath();cx.ellipse(px,py+cs*.1,cs*.14,cs*.06,0,0,7);cx.fill();cx.globalAlpha=1;
    if(f.fire){cx.fillStyle='#ffe9a8';dot(px,py-h,cs*.2);cx.fillStyle=c;dot(px,py-h,cs*.14);}
    else{cx.translate(px,py-h);cx.rotate(p*9);cx.beginPath();for(let i=0;i<6;i++)cx.lineTo(Math.cos(i*PI/3)*cs*(i%2?.2:.16),Math.sin(i*PI/3)*cs*(i%2?.2:.16));cx.closePath();cx.fillStyle='#9aa0b5';cx.fill();cx.strokeStyle=OL;cx.lineWidth=2;cx.stroke();}break;}
  case 'dive':{if(p<.5){const q=p/.5,hx=x-cs*.7*(1-q),hy=y-cs*3*(1-q);cx.strokeStyle='rgba(255,255,255,.4)';cx.lineWidth=cs*.14;L(hx-cs*.3,hy-cs*1.3,hx,hy);cx.strokeStyle='#fff';cx.lineWidth=cs*.06;L(hx-cs*.2,hy-cs*.9,hx,hy);}
    else{const q=(p-.5)/.5,s=cs*(.3+.25*q);cx.globalAlpha=1-q;cx.lineWidth=5;cx.strokeStyle=c;L(x-s,y-s,x+s,y+s);L(x+s,y-s,x-s,y+s);cx.lineWidth=2;cx.strokeStyle='#ffe566';L(x-s,y-s,x+s,y+s);L(x+s,y-s,x-s,y+s);}break;}
  case 'ice':{if(p<.55){const q=p/.55,iy=y-cs*2.4*(1-q);cx.globalAlpha=1;cx.beginPath();cx.moveTo(x,iy+cs*.1);cx.lineTo(x-cs*.1,iy-cs*.22);cx.lineTo(x,iy-cs*.5);cx.lineTo(x+cs*.1,iy-cs*.22);cx.closePath();cx.fillStyle=c;cx.fill();cx.strokeStyle='#fff';cx.lineWidth=1.5;cx.stroke();}
    else{const q=(p-.55)/.45;cx.globalAlpha=1-q;cx.lineWidth=2;cx.beginPath();cx.arc(x,y,cs*.5*q+.1,0,7);cx.stroke();for(let i=0;i<6;i++){const a=i*PI/3+.3,d=cs*.5*q;cx.beginPath();cx.moveTo(x+Math.cos(a)*d,y+Math.sin(a)*d);cx.lineTo(x+Math.cos(a+.25)*(d+cs*.14),y+Math.sin(a+.25)*(d+cs*.14));cx.lineTo(x+Math.cos(a-.25)*(d+cs*.14),y+Math.sin(a-.25)*(d+cs*.14));cx.closePath();cx.fill();}}break;}
  case 'armor':{const r=cs*(.6+.9*(1-p));cx.lineWidth=3;cx.beginPath();for(let i=0;i<6;i++)cx.lineTo(x+Math.cos(i*PI/3+p)*r,y+Math.sin(i*PI/3+p)*r);cx.closePath();cx.stroke();cx.globalAlpha=fade*.2;cx.fill();
    cx.globalAlpha=fade;cx.lineWidth=2;const R2=f.r*cs*(1-p*.6);for(let i=0;i<10;i++){const a=i*PI/5;L(x+Math.cos(a)*R2,y+Math.sin(a)*R2,x+Math.cos(a)*(R2-cs*.3),y+Math.sin(a)*(R2-cs*.3));}break;}
  case 'gust':{const yy=y-p*cs*1.2;for(let i=0;i<4;i++){cx.lineWidth=4-i*.7;cx.globalAlpha=fade*(1-i*.18);cx.beginPath();cx.ellipse(x,yy+i*cs*.14,f.r*cs*(.3+i*.24),f.r*cs*(.12+i*.09),0,p*9+i*2.1,p*9+i*2.1+2.4);cx.stroke();}
    cx.fillStyle='#fff';for(let i=0;i<5;i++)dot(x+Math.cos(p*8+i*1.3)*f.r*cs*.7,yy-i*cs*.12+Math.sin(p*8+i*1.3)*cs*.25,cs*.035);break;}
  case 'roar':{for(let i=0;i<3;i++){const q=p*1.5-i*.22;if(q<=0||q>=1)continue;cx.globalAlpha=1-q;cx.lineWidth=cs*.14*(1-q)+1.5;cx.beginPath();for(let j=0;j<=40;j++){const a=j*PI/20,r=f.r*cs*q*(1+.05*Math.sin(a*8+p*20));cx.lineTo(x+Math.cos(a)*r,y+Math.sin(a)*r);}cx.stroke();}break;}
  case 'wisp':{const nx=-(f.y2-f.y1),ny=f.x2-f.x1;for(let i=4;i>=0;i--){const q=Math.max(0,p-i*.06),w=Math.sin(q*PI*3)*.18;cx.globalAlpha=(i?.5/i:1);cx.fillStyle=i?c:'#fff';
      dot((f.x1+(f.x2-f.x1)*q+nx*w*.3)*cs,(f.y1+(f.y2-f.y1)*q+ny*w*.3)*cs,cs*(.14-i*.022));}break;}
  case 'plus':{cx.lineWidth=3;for(const [ox,oy,d] of [[-.25,0,0],[0,-.15,.15],[.25,.05,.3]]){const q=Math.max(0,p-d);if(!q)continue;const px=x+ox*cs,py=y+oy*cs-q*cs*.8,s=cs*.09;cx.globalAlpha=Math.max(0,1-q*1.2);L(px-s,py,px+s,py);L(px,py-s,px,py+s);}break;}
  case 'pierce':{cx.translate(x,y);cx.rotate(f.a);const len=cs*9*Math.min(1,p*2.6);cx.globalAlpha=fade*.35;cx.lineWidth=cs*.24;L(0,0,len,0);cx.globalAlpha=fade;cx.lineWidth=cs*.09;cx.strokeStyle='#fff';L(0,0,len,0);
    if(p<.45){cx.fillStyle='#fff';cx.beginPath();cx.moveTo(len+cs*.3,0);cx.lineTo(len-cs*.05,-cs*.16);cx.lineTo(len-cs*.05,cs*.16);cx.closePath();cx.fill();}break;}
  case 'bolt':{const ax=f.x1*cs,ay=f.y1*cs,bx=f.x2*cs,by=f.y2*cs,d=Math.hypot(bx-ax,by-ay)||1,nx=-(by-ay)/d,ny=(bx-ax)/d,pts=[[ax,ay]];
    for(let i=1;i<6;i++){const j=(Math.random()-.5)*cs*.4;pts.push([ax+(bx-ax)*i/6+nx*j,ay+(by-ay)*i/6+ny*j]);}pts.push([bx,by]);
    for(const [w,col,al] of [[7,c,.45],[2.5,'#fff',1]]){cx.globalAlpha=fade*al;cx.strokeStyle=col;cx.lineWidth=w;cx.beginPath();for(const q of pts)cx.lineTo(q[0],q[1]);cx.stroke();}break;}
  case 'meteor':{const q=p*p,mx=x+cs*2.2*(1-q),my=y-cs*5*(1-q);cx.globalAlpha=.45;cx.strokeStyle='#ffb347';cx.lineWidth=cs*.3;L(mx+cs*.9,my-cs*2,mx,my);cx.globalAlpha=1;cx.fillStyle='#ff7a2f';dot(mx,my,cs*.3);cx.fillStyle='#ffe9a8';dot(mx,my,cs*.17);
    cx.globalAlpha=.25*p;cx.fillStyle='#000';cx.beginPath();cx.ellipse(x,y,cs*1.2*p,cs*.5*p,0,0,7);cx.fill();break;}
  case 'cone':{cx.translate(x,y);cx.rotate(f.a);const r=f.r*cs*Math.min(1,p*2.2),g=cx.createRadialGradient(0,0,0,0,0,Math.max(1,r));g.addColorStop(0,'#fff');g.addColorStop(.3,'#ffe9a8');g.addColorStop(.75,c);g.addColorStop(1,'rgba(0,0,0,0)');
    cx.fillStyle=g;cx.beginPath();cx.moveTo(0,0);cx.arc(0,0,Math.max(.1,r),-.65,.65);cx.closePath();cx.fill();break;}
  case 'txt':{cx.globalAlpha=Math.min(1,f.t*3);cx.font=Math.round(cs*.3)+'px Jua,sans-serif';cx.textAlign='center';cx.textBaseline='middle';
    const tx=Math.max(cs*.9,Math.min(W-cs*.9,x)),ty=(f.y-p*.45)*cs;cx.lineWidth=4;cx.strokeStyle='#141a2e';cx.strokeText(f.txt,tx,ty);cx.fillStyle='#fff';cx.fillText(f.txt,tx,ty);break;}
  }
  cx.restore();
}

/* ---------- weapon arm: swings on its own around the shoulder ---------- */
function armAngle(o){
  const now=performance.now()/1000+(o.ph||0);
  if(o.castT>0)return -Math.sin(o.castT/.45*Math.PI)*1.1;
  if(!(o.atkT>0))return Math.sin(now*2.6)*.06;
  const k=1-o.atkT/.3,st=k<.3?-k/.3:k<.5?-1+(k-.3)/.2*2:1-(k-.5)/.5;
  return o.mot==='slash'?st*1.25:o.mot==='shoot'?Math.min(0,st)*.5+Math.max(0,st)*.25:-Math.abs(st)*.7;
}
