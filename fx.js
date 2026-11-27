/* ---------- attack poses: how a body moves during one attack (k: 0 -> 1) ---------- */
function atkPose(o,R,cs){
  const mt=o.mvPose||o.mot,k=Math.min(1,Math.max(0,1-o.atkT/.3)),s=Math.sin(k*Math.PI),dx=o.adx||0,dy=o.ady||0,f=o.face||1;
  /* wind back, snap forward, settle */
  const st=k<.3?-k/.3:k<.5?-1+(k-.3)/.2*2:1-(k-.5)/.5;
  switch(mt){
  case 'blink':{const fa=k<.25?1-k/.25*.9:k<.35?.1+(k-.25)/.1*.9:k<.8?1:1-(k-.8)/.2*.6,at=k<.25?0:k<.8?1:Math.max(0,1-(k-.8)/.2*1.5);
    return [dx*at*cs*.85,dy*at*cs*.85,f*(k>.35&&k<.6?.12:0),1,1,k>=.8?Math.max(.4,fa):fa];}
  case 'leap':{const crouch=k<.25?k/.25:0,air=k>=.25&&k<.75?Math.sin((k-.25)/.5*Math.PI):0,e=k<.25?0:k<.75?(k-.25)/.5:1-(k-.75)/.25;
    return [dx*e*cs*.45,dy*e*cs*.45-air*R*1.1,f*(air*.25-crouch*.08),1+crouch*.12-air*.05,1-crouch*.18+air*.08];}
  case 'lunge':{const e=k<.3?-k/.3*.2:k<.5?-.2+(k-.3)/.2*1.2:1-Math.pow((k-.5)/.5,2);return [dx*Math.max(0,e)*cs*.3,dy*Math.max(0,e)*cs*.3,0,1+Math.max(0,e)*.35,1-Math.max(0,e)*.15];}
  case 'thrust':{const e=k<.3?-k/.3*.35:k<.5?-.35+(k-.3)/.2*1.35:1-Math.pow((k-.5)/.5,2);return [dx*e*cs*.32,dy*e*cs*.32,f*e*.06,1+Math.max(0,e)*.04,1-Math.max(0,e)*.03];}
  case 'slash':{const e=k<.3?-k/.3*.4:k<.45?-.4+(k-.3)/.15*1.4:1-Math.pow((k-.45)/.55,2);const imp=k>.38&&k<.6?Math.sin((k-.38)/.22*Math.PI):0;
    return [dx*e*cs*.2,dy*e*cs*.2,f*e*.1,1+imp*.06,1-imp*.05];}
  case 'maul':{if((o.n||0)%2){const e=k<.3?-k/.3*.3:k<.45?-.3+(k-.3)/.15*1.3:1-Math.pow((k-.45)/.55,2);return [dx*e*cs*.36,dy*e*cs*.36-Math.max(0,e)*R*.15,f*e*.16,1+Math.max(0,e)*.08,1-Math.max(0,e)*.06];}
    const e=k<.35?-k/.35*.25:k<.5?-.25+(k-.35)/.15*1.25:1-Math.pow((k-.5)/.5,2);return [dx*e*cs*.18,dy*e*cs*.18,f*e*.1,1,1];}
  case 'punch':{const e=k<.35?-k/.35*.3:k<.5?-.3+(k-.35)/.15*1.3:1-Math.pow((k-.5)/.5,2);return [dx*e*cs*.22,dy*e*cs*.22,f*e*.08,1+Math.max(0,e)*.05,1-Math.max(0,e)*.04];}
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
  if(o.poisonU>t){cx.fillStyle='#7be36a';for(let i=0;i<3;i++){const q=(now*1.2+i*.33)%1;cx.globalAlpha=1-q;cx.beginPath();cx.arc(x+(i-1)*R*.4,y-R*.3-q*R*.9,cs*.04*(1+q),0,7);cx.fill();}cx.globalAlpha=1;}
  if(o.vulnU>t){const vy=y-R*1.5,s=cs*.1;cx.strokeStyle='#9fe3ff';cx.lineWidth=2;cx.beginPath();cx.moveTo(x-s,vy-s);cx.lineTo(x+s,vy-s);cx.lineTo(x+s,vy+s*.3);cx.lineTo(x,vy+s*1.2);cx.lineTo(x-s,vy+s*.3);cx.closePath();cx.stroke();cx.beginPath();cx.moveTo(x,vy-s);cx.lineTo(x-s*.3,vy);cx.lineTo(x+s*.2,vy+s*.3);cx.lineTo(x,vy+s*1.2);cx.stroke();}
  if(o.bleedU>t){cx.fillStyle='#ff4d6a';for(let i=0;i<3;i++){const q=(now*1.6+i*.33)%1;cx.globalAlpha=1-q;cx.beginPath();cx.arc(x+(i-1)*R*.35,y-R*.2+q*R*.9,cs*.035,0,7);cx.fill();}cx.globalAlpha=1;}
  if(o.weakU>t){const ey=y-R*1.5,s=cs*.11;cx.fillStyle='#b05cff';cx.beginPath();cx.ellipse(x,ey,s*1.4,s*.8,0,0,7);cx.fill();cx.fillStyle='#1b1730';cx.beginPath();cx.arc(x,ey,s*.4,0,7);cx.fill();
    cx.fillStyle='#6fe08a';for(let i=0;i<3;i++){cx.beginPath();cx.arc(x+(i-1)*s,ey+s*(1+((now*2+i*.3)%1)*1.5),cs*.025,0,7);cx.fill();}}
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
    if(f.p==='shuriken'){cx.translate(px,py);cx.rotate(p*20);const s=cs*.14;cx.fillStyle='#d6dee9';cx.beginPath();for(let i=0;i<8;i++){const r2=i%2?s*.35:s;cx.lineTo(Math.cos(i*PI/4)*r2,Math.sin(i*PI/4)*r2);}cx.closePath();cx.fill();cx.strokeStyle='#2a1830';cx.lineWidth=1;cx.stroke();cx.fillStyle='#2a1830';dot(0,0,s*.18);}
    else if(f.p==='feather'){cx.translate(px,py);cx.rotate(p*16);const s=cs*.16;cx.fillStyle=c;cx.beginPath();cx.ellipse(0,0,s,s*.38,0,0,7);cx.fill();cx.strokeStyle='#fff';cx.lineWidth=1.2;L(-s,0,s,0);}
    else if(f.p==='crescent'){cx.translate(px,py);cx.rotate(an);const s=cs*.24;cx.fillStyle=c;cx.beginPath();cx.arc(0,0,s,-1.3,1.3);cx.arc(-s*.45,0,s*.9,1.1,-1.1,true);cx.closePath();cx.fill();cx.strokeStyle='#fff';cx.lineWidth=1.5;cx.beginPath();cx.arc(0,0,s,-1.1,1.1);cx.stroke();
      cx.globalAlpha=.4;for(let i=1;i<3;i++){cx.beginPath();cx.arc(-cs*.16*i,0,s*(1-i*.2),-1,1);cx.stroke();}}
    else if(f.p==='firebolt'){for(let i=1;i<5;i++){cx.globalAlpha=.4/i;cx.fillStyle=i%2?'#ffd24a':c;dot(px-Math.cos(an)*cs*.12*i,py-Math.sin(an)*cs*.12*i,cs*(.1-i*.012));}cx.globalAlpha=1;cx.translate(px,py);cx.rotate(an);
      cx.fillStyle=c;cx.beginPath();cx.moveTo(cs*.16,0);cx.lineTo(-cs*.06,-cs*.06);cx.lineTo(-cs*.06,cs*.06);cx.closePath();cx.fill();cx.fillStyle='#fff';dot(cs*.03,0,cs*.03);}
    else if(f.p==='talisman'){cx.translate(px,py);cx.rotate(p*14);const w=cs*.13,h=cs*.22;cx.fillStyle='#ffe27a';cx.fillRect(-w/2,-h/2,w,h);cx.strokeStyle='#b8862a';cx.lineWidth=1.2;cx.strokeRect(-w/2,-h/2,w,h);
      cx.strokeStyle='#d23a3a';cx.lineWidth=1.6;L(0,-h*.35,0,h*.35);L(-w*.3,-h*.1,w*.3,-h*.1);L(-w*.3,h*.15,w*.3,h*.15);}
    else if(f.p==='rune'){for(let i=1;i<4;i++){cx.globalAlpha=.3/i;cx.fillStyle=c;dot(px-Math.cos(an)*cs*.14*i,py-Math.sin(an)*cs*.14*i,cs*.1);}cx.globalAlpha=1;
      cx.fillStyle=c;dot(px,py,cs*.1);cx.fillStyle='#fff';dot(px,py,cs*.05);cx.strokeStyle=c;cx.lineWidth=1.5;cx.beginPath();cx.arc(px,py,cs*.2,0,7);cx.stroke();
      for(let i=0;i<4;i++){const a=p*12+i*PI/2;L(px+Math.cos(a)*cs*.2,py+Math.sin(a)*cs*.2,px+Math.cos(a)*cs*.28,py+Math.sin(a)*cs*.28);}}
    else if(f.p==='elem'){for(let i=5;i>=0;i--){const q=Math.max(0,p-i*.035),ex=(f.x1+(f.x2-f.x1)*q)*cs,ey=(f.y1+(f.y2-f.y1)*q)*cs+Math.sin(q*30+i)*cs*.05;cx.globalAlpha=i?.6/i:1;cx.fillStyle=i?c:'#fff';dot(ex,ey,cs*(.13-i*.016));}}
    else if(f.p==='curse'){for(let i=1;i<5;i++){cx.globalAlpha=.35/i;cx.fillStyle=i%2?'#6fe08a':c;dot(px-Math.cos(an)*cs*.12*i,py-Math.sin(an)*cs*.12*i-Math.sin(p*20+i)*cs*.04,cs*(.12-i*.015));}cx.globalAlpha=1;
      cx.fillStyle=c;dot(px,py,cs*.13);cx.fillStyle='#1b1730';dot(px-cs*.045,py-cs*.02,cs*.03);dot(px+cs*.045,py-cs*.02,cs*.03);}
    else if(f.p==='arrow'){cx.translate(px,py);cx.rotate(an);cx.strokeStyle='rgba(255,255,255,.35)';cx.lineWidth=2;L(-cs*.7,0,-cs*.3,0);cx.strokeStyle=OL;cx.lineWidth=4;L(-cs*.3,0,0,0);cx.strokeStyle='#f1e2c0';cx.lineWidth=2;L(-cs*.3,0,0,0);
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
  case 'seal':{cx.translate(x,y);const s=cs*.3*(.6+.6*p);cx.rotate(p*.6);cx.globalAlpha=fade;cx.strokeStyle='#d23a3a';cx.lineWidth=3;cx.strokeRect(-s,-s,s*2,s*2);cx.lineWidth=2;L(-s*.5,-s*.5,s*.5,s*.5);L(s*.5,-s*.5,-s*.5,s*.5);L(0,-s*.7,0,s*.7);
    cx.fillStyle='#ffe27a';for(let i=0;i<5;i++){const a=i*1.26+p*3,d=s*(1.2+p);cx.save();cx.translate(Math.cos(a)*d,Math.sin(a)*d);cx.rotate(a);cx.fillRect(-cs*.04,-cs*.07,cs*.08,cs*.14);cx.restore();}break;}
  case 'runes':{const r=cs*(.25+.35*p);cx.lineWidth=2.5;cx.beginPath();cx.arc(x,y,r,0,7);cx.stroke();cx.lineWidth=1.5;cx.beginPath();cx.arc(x,y,r*.7,0,7);cx.stroke();
    for(let i=0;i<6;i++){const a=i*PI/3+p*4;cx.save();cx.translate(x+Math.cos(a)*r*.85,y+Math.sin(a)*r*.85);cx.rotate(a);L(-cs*.04,-cs*.05,cs*.04,cs*.05);L(-cs*.04,cs*.05,cs*.04,-cs*.05);cx.restore();}break;}
  case 'hex':{cx.translate(x,y);const s=cs*.3*(.7+.4*p);cx.lineWidth=2.5;cx.beginPath();cx.ellipse(0,0,s,s*.55,0,0,7);cx.stroke();cx.fillStyle=c;dot(0,0,s*.3);cx.fillStyle='#1b1730';dot(0,0,s*.14);
    cx.fillStyle='#6fe08a';for(let i=0;i<4;i++)dot((i-1.5)*s*.45,s*.6+p*cs*.35*(1+i%2),cs*.035);break;}
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

/* ---------- a race's magic circle under a caster (school: tao / arcane / elem / hex), k = 0..1 progress ---------- */
function drawSchool(cx,cs,x,y,R,school,c,k){const PI=Math.PI,a=Math.sin(k*PI),now=performance.now()/1000;cx.save();cx.globalAlpha=Math.min(1,a*1.4);cx.translate(x,y+R*.8);
  const rx=R*1.25,ry=R*.45;
  if(school==='tao'){cx.lineWidth=2;cx.strokeStyle='#ffe27a';cx.beginPath();cx.ellipse(0,0,rx,ry,0,0,7);cx.stroke();
    cx.fillStyle='#d23a3a';cx.beginPath();cx.ellipse(0,0,rx*.45,ry*.45,0,0,PI);cx.fill();cx.fillStyle='#3d6fd8';cx.beginPath();cx.ellipse(0,0,rx*.45,ry*.45,0,PI,2*PI);cx.fill();
    cx.fillStyle='#ffe27a';for(let i=0;i<4;i++){const t=now*2+i*PI/2,px=Math.cos(t)*rx*1.05,py=Math.sin(t)*ry*1.05-R*(.6+.3*Math.sin(t*2))*a;cx.fillRect(px-cs*.04,py-cs*.08,cs*.08,cs*.16);cx.fillStyle='#d23a3a';cx.fillRect(px-cs*.01,py-cs*.05,cs*.02,cs*.1);cx.fillStyle='#ffe27a';}}
  else if(school==='arcane'){cx.strokeStyle=c;cx.lineWidth=2;for(const s of [1,.72]){cx.beginPath();cx.ellipse(0,0,rx*s,ry*s,0,0,7);cx.stroke();}
    cx.lineWidth=1.5;cx.beginPath();for(let i=0;i<=6;i++){const t=now*.8+i*PI*2/6*2;cx.lineTo(Math.cos(t)*rx*.72,Math.sin(t)*ry*.72);}cx.stroke();
    for(let i=0;i<8;i++){const t=-now*1.2+i*PI/4;cx.fillStyle=i%2?'#fff':c;cx.fillRect(Math.cos(t)*rx*.86-1.5,Math.sin(t)*ry*.86-1.5,3,3);}
    cx.globalAlpha*=.5;cx.fillStyle=c;for(let i=0;i<6;i++){const t=i*PI/3+now;cx.fillRect(Math.cos(t)*rx*.4-1,-R*a*(.4+(i%3)*.3)-1,2,2);}}
  else if(school==='elem'){for(let i=0;i<6;i++){const t=now*3+i*PI/3,px=Math.cos(t)*rx,py=Math.sin(t)*ry-R*.8*a;cx.fillStyle=c;cx.beginPath();cx.arc(px,py,cs*.07,0,7);cx.fill();cx.fillStyle='#fff';cx.beginPath();cx.arc(px,py,cs*.03,0,7);cx.fill();}
    cx.strokeStyle=c;cx.lineWidth=1.5;cx.beginPath();cx.ellipse(0,0,rx*.9,ry*.9,0,0,7);cx.stroke();}
  else if(school==='hex'){cx.strokeStyle=c;cx.lineWidth=2;cx.beginPath();cx.ellipse(0,0,rx,ry,0,0,7);cx.stroke();
    for(let i=0;i<5;i++){const t=i*PI*2/5-PI/2;const px=Math.cos(t)*rx*.8,py=Math.sin(t)*ry*.8;cx.fillStyle=i%2?'#6fe08a':c;const h=cs*.25*a*(.8+.3*Math.sin(now*9+i));
      cx.beginPath();cx.moveTo(px-cs*.06,py);cx.quadraticCurveTo(px,py-h*1.4,px+cs*.06,py);cx.fill();}
    cx.lineWidth=1.2;cx.beginPath();for(let i=0;i<=5;i++){const t=(i*2%5)*PI*2/5-PI/2;cx.lineTo(Math.cos(t)*rx*.8,Math.sin(t)*ry*.8);}cx.stroke();}
  cx.restore();}
