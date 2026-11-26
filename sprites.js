/* ---------- sprites: every character is drawn in a -1..1 box, feet near y=.85 ----------
   mood: 0 calm, 1 hurt, 2 attacking.  part: 0 body, 1 weapon arm (drawn on top and swung separately) */
const HAS_ARM={sword:1,sling:1,mage:1,archer:1,skull:1,shaman:1,ninja:1,paladin:1,mugyeol:1,hanbyeol:1,hanbyeol0:1,hanbyeol1:1,hanbyeol2:1,hanbyeol3:1,hanbyeol4:1,hanbyeol5:1};
function drawSprite(c,id,st,mood,part){let stage=0;if(id.indexOf('hanbyeol')===0){stage=+id.slice(8)||0;id='hanbyeol';}
  if(typeof PIXU!=='undefined'&&PIXU[id]){if(part)return;drawPixInBox(c,id,st,stage,mood||0);return;}
  mood=mood||0;part=part||0;if(part&&!HAS_ARM[id])return;
  const OL='#1b1730',GOLD='#ffc94d',SILV='#cfd6e6',metal=st>2?GOLD:SILV,PI=Math.PI,SK='#ffd9b3';
  c.lineWidth=.07;c.lineJoin='round';c.lineCap='round';
  const fs=(f,s)=>{if(f){c.fillStyle=f;c.fill();}if(s){c.strokeStyle=s;c.stroke();}};
  const circ=(x,y,r,f,s=OL)=>{c.beginPath();c.arc(x,y,r,0,7);fs(f,s);};
  const ell=(x,y,rx,ry,f,s=OL,rot=0)=>{c.beginPath();c.ellipse(x,y,rx,ry,rot,0,7);fs(f,s);};
  const poly=(p,f,s=OL)=>{c.beginPath();for(let i=0;i<p.length;i+=2)i?c.lineTo(p[i],p[i+1]):c.moveTo(p[i],p[i+1]);c.closePath();fs(f,s);};
  const line=(p,s,w=.07)=>{c.beginPath();for(let i=0;i<p.length;i+=2)i?c.lineTo(p[i],p[i+1]):c.moveTo(p[i],p[i+1]);c.strokeStyle=s;c.lineWidth=w;c.stroke();c.lineWidth=.07;};
  const mir=(p,f,s=OL)=>{poly(p,f,s);poly(p.map((v,i)=>i%2?v:-v),f,s);};
  /* soft shadow on the lower right and a highlight on the upper left of a round shape */
  const shade=(x,y,r)=>{c.save();c.beginPath();c.arc(x,y,r-.03,0,7);c.clip();c.beginPath();c.arc(x,y,r,0,7);c.arc(x-r*.2,y-r*.22,r*.98,0,7,true);c.fillStyle='rgba(27,23,48,.22)';c.fill('evenodd');
    c.beginPath();c.ellipse(x-r*.38,y-r*.45,r*.26,r*.15,-.6,0,7);c.fillStyle='rgba(255,255,255,.3)';c.fill();c.restore();};
  const ball=(x,y,r,f)=>{circ(x,y,r,f);shade(x,y,r);};
  const eyes=(y,dx,col=OL,r=.075)=>{for(const k of [-1,1]){const x=k*dx;
    if(mood===1){line([x+k*r,y-r,x-k*r*.6,y,x+k*r,y+r],OL,.05);continue;}
    circ(x,y,r,col,null);circ(x+.025,y-.03,r*.4,'#fff',null);circ(x-.025,y+.03,r*.18,'#fff',null);
    if(mood===2)line([x+k*r*1.5,y-r*2.2,x-k*r*.9,y-r*1.35],OL,.055);}};
  const mouth=(y,w=.09)=>{if(mood===1)circ(0,y+.02,w*.55,OL,null);else if(mood===2){c.beginPath();c.arc(0,y-.02,w,0,PI);c.closePath();fs('#7a2030',OL);}
    else{c.beginPath();c.arc(0,y-w*.5,w,.2*PI,.8*PI);c.strokeStyle=OL;c.lineWidth=.045;c.stroke();c.lineWidth=.07;}};
  const cheeks=(y,dx)=>{circ(-dx,y,.07,'rgba(255,110,110,.5)',null);circ(dx,y,.07,'rgba(255,110,110,.5)',null);};
  const spikes=(x,y,r1,r2,n,a0,a1,f,s=OL)=>{const da=(a1-a0)/n/2;for(let i=0;i<n;i++){const a=a0+(a1-a0)*(i+.5)/n;
    poly([x+Math.cos(a-da)*r1,y+Math.sin(a-da)*r1,x+Math.cos(a)*r2,y+Math.sin(a)*r2,x+Math.cos(a+da)*r1,y+Math.sin(a+da)*r1],f,s);}};
  const feet=(col='#3a2a2e',dx=.15)=>{ell(-dx,.87,.13,.07,col);ell(dx,.87,.13,.07,col);};
  const body=(col,w=.3)=>{c.beginPath();c.roundRect(-w,.2,w*2,.64,.14);fs(col,OL);c.save();c.beginPath();c.roundRect(-w+.03,.23,w*2-.06,.58,.11);c.clip();c.fillStyle='rgba(27,23,48,.2)';c.fillRect(w*.35,.2,w,.7);
    c.fillStyle='rgba(255,255,255,.18)';c.fillRect(-w,.2,w*.35,.7);c.restore();};
  const cape=col=>{poly([-.36,.22,.36,.22,.56,.9,.3,.82,0,.9,-.3,.82,-.56,.9],col);line([-.2,.4,-.3,.8],'rgba(27,23,48,.3)',.04);line([.2,.4,.3,.8],'rgba(27,23,48,.3)',.04);};
  const crown=(y,w=.24)=>{poly([-w,y,-w,y-.2,-w/2,y-.07,0,y-.26,w/2,y-.07,w,y-.2,w,y],GOLD);circ(0,y-.07,.035,'#e0455a',null);};
  const cap=(x,y,r,a0,a1,f)=>{c.beginPath();c.arc(x,y,r,a0,a1);c.closePath();fs(f,OL);};
  const glow=(x,y,r,col)=>{const g=c.createRadialGradient(x,y,0,x,y,r);g.addColorStop(0,col);g.addColorStop(1,'rgba(255,255,255,0)');c.fillStyle=g;c.beginPath();c.arc(x,y,r,0,7);c.fill();};
  const belt=()=>{line([-.28,.63,.28,.63],OL,.11);line([-.27,.63,.27,.63],'#6b4a2a',.06);poly([-.055,.575,.055,.575,.055,.685,-.055,.685],st>1?metal:'#c9a36a',OL);};
  const human=(skin,hair,outfit,capeCol)=>{if(st>2)cape(capeCol||'#d6455a');feet();body(outfit);belt();poly([-.13,.22,.13,.22,0,.37],'rgba(255,255,255,.4)',null);circ(-.36,.5,.085,skin);
    ball(0,-.2,.46,skin);cap(0,-.2,.46,PI*1.1,PI*1.9,hair);mir([-.32,-.36,-.22,-.22,-.1,-.39],hair,null);poly([-.07,-.39,0,-.26,.07,-.39],hair,null);eyes(-.1,.17);cheeks(.02,.28);mouth(.1);};
  const arm=(skin,sleeve)=>{line([.3,.36,.53,.52],OL,.2);line([.3,.36,.53,.52],sleeve,.12);circ(.55,.52,.085,skin);};
  const sword=col=>{line([.56,.66,.56,.44],'#6b4a2a',.1);circ(.56,.69,.045,st>1?metal:'#6b4a2a');line([.42,.42,.7,.42],st>1?metal:'#6b4a2a',.09);poly([.49,.4,.63,.4,.63,-.22,.56,-.4,.49,-.22],col);
    line([.56,.36,.56,-.28],'rgba(255,255,255,.6)',.03);};
  const bow=col=>{c.beginPath();c.arc(.4,.32,.42,-1.1,1.1);c.strokeStyle=OL;c.lineWidth=.16;c.stroke();c.strokeStyle=col;c.lineWidth=.08;c.stroke();c.lineWidth=.07;line([.59,-.05,.59,.69],'#fff',.03);line([.76,.26,.86,.38],OL,.05);};
  const staff=(orb,r)=>{line([.56,.86,.56,-.3],OL,.14);line([.56,.86,.56,-.3],'#9a6a3a',.07);if(st>1)poly([.47,-.28,.56,-.2,.65,-.28,.56,-.36],metal);if(st>2)glow(.56,-.46,r+.2,'rgba(127,224,255,.7)');circ(.56,-.46,r,orb);circ(.52,-.51,r*.3,'#fff',null);};
  const flame=(x,y,s,f)=>{c.beginPath();c.moveTo(x,y-.85*s);c.bezierCurveTo(x+.65*s,y-.2*s,x+.62*s,y+.78*s,x,y+.8*s);c.bezierCurveTo(x-.62*s,y+.78*s,x-.65*s,y-.2*s,x,y-.85*s);fs(f,OL);};
  const blob=(list,f)=>{for(const b of list){c.beginPath();c.arc(b[0],b[1],b[2],0,7);c.strokeStyle=OL;c.lineWidth=.14;c.stroke();}c.lineWidth=.07;for(const b of list)circ(b[0],b[1],b[2],f,null);};
  const whisk=()=>{for(const k of [-1,1]){line([k*.2,.03,k*.44,-.02],OL,.025);line([k*.2,.08,k*.43,.1],OL,.025);}};
  const fangs=y=>{if(mood===2){poly([-.13,y,-.05,y,-.09,y+.13],'#fff',OL);poly([.05,y,.13,y,.09,y+.13],'#fff',OL);}};
  const dragon=(col,dark,belly,horn,ws)=>{mir([-.24,.2,-.5-ws*.5,-.3-ws*.2,-.86*ws-.1,.1,-.6*ws-.1,.14,-.56*ws-.06,.44,-.3,.4],dark);
    c.beginPath();c.moveTo(.2,.74);c.bezierCurveTo(.66,.86,.86,.5,.66,.3);c.strokeStyle=OL;c.lineWidth=.22;c.stroke();c.strokeStyle=col;c.lineWidth=.13;c.stroke();c.lineWidth=.07;poly([.58,.34,.78,.12,.74,.38],horn);
    feet(dark,.17);body(col,.3);ell(0,.56,.17,.24,belly,null);for(const y of [.44,.56,.68])line([-.12,y,.12,y],'rgba(27,23,48,.25)',.03);for(const k of [-1,1])circ(k*.36,.48,.09,col);
    mir([-.2,-.56,-.36,-.98,-.06,-.64],horn);spikes(0,-.2,.42,.6,3,PI*1.35,PI*1.65,dark);ball(0,-.2,.46,col);ell(0,.03,.26,.18,belly);for(const k of [-1,1])circ(k*.08,-.03,.025,OL,null);
    eyes(-.2,.19);fangs(.12);if(mood!==2)line([-.12,.11,0,.15,.12,.11],OL,.035);cheeks(-.04,.33);};
  const D={
  hanbyeol(){if(part){arm(SK,'#a8916a');sword(stage>2?GOLD:stage>0?SILV:'#c79a5e');if(stage>=4)glow(.56,-.1,.32,'rgba(255,201,77,.7)');return;}
    if(stage>=4){glow(0,-.1,1,'rgba(255,220,120,.4)');spikes(0,-.2,.56,.78,8,0,PI*2,'rgba(255,229,150,.85)',null);}
    feet();body('#a8916a');belt();poly([-.13,.22,.13,.22,0,.37],'rgba(255,255,255,.4)',null);circ(-.36,.5,.085,SK);
    const hc='#3a2a1e';circ(0,-.7,.1,hc);ball(0,-.2,.46,SK);cap(0,-.2,.46,PI*1.1,PI*1.9,hc);mir([-.32,-.36,-.22,-.22,-.1,-.39],hc,null);poly([-.07,-.39,0,-.26,.07,-.39],hc,null);
    if(stage>=3)mir([-.36,-.34,-.3,-.24,-.24,-.36],GOLD,null);line([-.46,-.4,.46,-.4],OL,.12);line([-.46,-.4,.46,-.4],'#3f6fb5',.07);
    eyes(-.1,.17,stage>=2?'#c98f1a':OL);cheeks(.02,.28);mouth(.1);},
  mugyeol(){if(part){arm(SK,'#4a4f6a');sword(SILV);return;}
    cape('#7a2030');feet('#2a2440');body('#4a4f6a',.33);belt();for(const k of [-1,1])circ(k*.38,.3,.15,'#6f7890');circ(-.38,.52,.085,SK);
    ball(0,-.2,.46,SK);cap(0,-.24,.5,PI,PI*2,'#6f7890');line([-.5,-.24,.5,-.24],OL);line([0,-.24,0,-.06],OL,.07);poly([0,-.74,-.08,-1,.18,-.92,.08,-.72],'#e0455a');
    eyes(-.1,.17);poly([-.2,.02,.2,.02,.12,.22,0,.26,-.12,.22],'#3a2a1e',null);},
  duduri(){feet('#3a2a50',.2);body('#5a8a4a',.36);poly([-.36,.62,.36,.62,.28,.84,-.28,.84],'#e8c94d');for(const x of [-.2,0,.2])line([x,.64,x,.82],'#3a2a1e',.04);
    line([.44,.5,.68,-.32],OL,.24);line([.44,.5,.68,-.32],'#9a6a3a',.15);for(const q of [0,.3,.6])circ(.66-q*.2,-.26+q*.6,.045,SILV,null);
    ball(0,-.2,.5,'#6fa8dc');poly([-.07,-.66,.07,-.66,0,-1],'#f1f0e6');for(const k of [-1,1])circ(k*.2,-.22,.1,'#fff');eyes(-.22,.2);fangs(.12);mouth(.1,.12);
    circ(-.4,.48,.1,'#6fa8dc');circ(.44,.5,.1,'#6fa8dc');},
  baeksan(){c.beginPath();c.moveTo(.2,.7);c.bezierCurveTo(.7,.8,.9,.3,.6,.05);c.strokeStyle=OL;c.lineWidth=.2;c.stroke();c.strokeStyle='#f1f1f5';c.lineWidth=.11;c.stroke();c.lineWidth=.07;
    feet('#c9cbd6',.18);body('#eef0f6',.32);ell(0,.58,.16,.2,'#fff',null);for(const y of [.34,.48])for(const k of [-1,1])line([k*.32,y,k*.18,y+.04],OL,.04);
    for(const k of [-1,1]){circ(k*.34,-.56,.15,'#eef0f6');circ(k*.34,-.56,.07,'#f0a5b0',null);}
    ball(0,-.2,.48,'#f4f5fa');ell(0,.04,.22,.15,'#fff');circ(0,-.05,.05,'#f0a5b0',null);whisk();
    for(const k of [-1,1]){line([k*.44,-.32,k*.3,-.27],OL,.04);line([k*.45,-.16,k*.32,-.14],OL,.04);}line([-.06,-.6,0,-.5,.06,-.6],OL,.04);line([0,-.5,0,-.42],OL,.04);
    eyes(-.22,.2,'#3d8bff');fangs(.1);if(mood!==2)line([-.07,.1,0,.14,.07,.1],OL,.035);line([-.3,.27,.3,.27],OL,.16);line([-.3,.27,.3,.27],'#3a6a9a',.09);},
  mireu(){glow(0,0,1,'rgba(120,200,230,.35)');dragon('#3a8a9a','#246070','#cfeee8','#f1f0e6',1.2);glow(-.62,.3,.3,'rgba(191,239,255,.9)');circ(-.62,.3,.12,'#bfefff');
    for(const x of [-.5,-.2,.1])line([x,-.8,x-.06,-.64],'#9fe3ff',.04);},
  gaon(){glow(0,.1,.95,'rgba(120,140,220,.4)');line([.62,.86,.62,-.6],OL,.12);line([.62,.86,.62,-.6],'#9a6a3a',.06);poly([.54,-.6,.7,-.6,.62,-.94],SILV);
    c.beginPath();c.moveTo(0,-.6);c.bezierCurveTo(.6,-.6,.58,.3,.54,.82);c.lineTo(.3,.66);c.lineTo(.1,.86);c.lineTo(-.1,.66);c.lineTo(-.3,.86);c.lineTo(-.54,.82);c.bezierCurveTo(-.58,.3,-.6,-.6,0,-.6);fs('#3a4470',OL);
    poly([-.3,.1,.3,.1,.26,.5,-.26,.5],'#6f7890');cap(0,-.3,.44,PI,PI*2,'#2a2440');line([-.44,-.3,.44,-.3],OL);poly([-.08,-.72,.08,-.72,0,-.98],GOLD);
    for(const k of [-1,1]){if(mood===1)line([k*.24,-.16,k*.1,-.1],'#fff',.05);else ell(k*.16,-.12,.07,.09,'#bfe6ff',null);}},
  geumbyeol(){glow(0,-.1,1,'rgba(255,220,120,.5)');spikes(0,-.2,.55,.88,10,0,PI*2,'rgba(255,229,150,.85)',null);cape('#c98f1a');feet('#8a6420');body('#ffd76a',.33);
    poly([-.08,.22,.08,.22,.08,.84,-.08,.84],'#fff7d6',null);circ(-.36,.5,.085,SK);ball(0,-.2,.46,SK);cap(0,-.2,.48,PI*1.05,PI*1.95,'#f2e2a0');
    poly([-.48,-.3,-.38,.34,-.26,-.2],'#f2e2a0');poly([.48,-.3,.38,.34,.26,-.2],'#f2e2a0');crown(-.6,.26);eyes(-.1,.17,'#c98f1a');mouth(.1);},
  paladin(){if(part){arm(SK,GOLD);line([.56,.7,.56,.44],'#6b4a2a',.11);line([.38,.42,.74,.42],GOLD,.11);poly([.47,.4,.65,.4,.65,-.42,.56,-.62,.47,-.42],st>1?'#fff7d6':'#e8eefc');line([.56,.34,.56,-.46],'rgba(255,201,77,.8)',.04);
      glow(.56,-.1,.3+st*.06,'rgba(255,201,77,.6)');return;}
    cape(st>2?'#fff7d6':'#d6455a');feet('#b8862a');body(GOLD,.32);poly([-.2,.26,.2,.26,.12,.56,0,.66,-.12,.56],'#fff7d6');poly([-.05,.34,.05,.34,.05,.52,-.05,.52],'#e0455a',null);for(const k of [-1,1])circ(k*.38,.3,.15,GOLD);circ(-.38,.52,.085,SK);
    ball(0,-.2,.46,SK);cap(0,-.24,.5,PI,PI*2,GOLD);line([-.5,-.24,.5,-.24],OL);line([0,-.24,0,-.04],OL,.07);mir([-.44,-.4,-.86,-.74,-.6,-.34],'#fff');if(st>1)mir([-.46,-.3,-.8,-.44,-.56,-.2],'#fff');
    eyes(-.1,.17);cheeks(.02,.28);mouth(.1);if(st>2){crown(-.7,.2);glow(0,-.2,.9,'rgba(255,229,150,.25)');}},
  elder(){glow(0,0,1,'rgba(255,90,60,.3)');dragon('#c93a3a','#8f2222','#ffd9a0',GOLD,[0,1.25,1.4,1.55][st]);poly([-.1,.16,.1,.16,0,.42],'#fff7d6');for(const k of [-1,1])line([k*.14,.06,k*.4,.2],'#fff7d6',.04);
    spikes(0,-.2,.44,.7,5,PI*1.25,PI*1.75,GOLD);if(st>1)flame(0,-.86,.2,'#ff7a2f');if(st>2){crown(-.6,.26);flame(-.3,-.8,.16,'#ffd24a');flame(.3,-.8,.16,'#ffd24a');}},
  phoenix(){const w=[0,.44,.52,.6][st],o=st>2?'#fff1b8':'#ffb347';glow(0,.1,1,'rgba(255,150,60,.4)');for(const k of [-1,1]){ell(k*.56,.16,w,.2,'#ff7a2f',OL,-k*.6);ell(k*.6,.24,w*.7,.12,'#ffd24a',null,-k*.6);flame(k*.84,0,.2,'#ff7a2f');}
    for(const x of [-.14,0,.14])flame(x,.86,.16,'#ff7a2f');ell(0,.34,.3,.44,'#ff8a3d');ell(0,.46,.18,.26,o,null);spikes(0,-.3,.26,.66,5,PI*1.2,PI*1.8,'#ffd24a');ball(0,-.25,.35,o);
    if(mood===2){poly([-.09,-.2,.09,-.2,0,-.08],'#e0455a');poly([-.07,-.04,.07,-.04,0,.06],'#b3334a');}else poly([-.09,-.18,.09,-.18,0,.04],'#e0455a');eyes(-.32,.15);if(st>2)crown(-.62,.2);},
  wolfking(){spikes(0,-.2,.42,.8,11,PI*.8,PI*2.2,'#dfe8ff');poly([.2,.62,.6,.2,.84,.36,.7,.62,.5,.82,.26,.8],'#e6ebf7');feet('#aeb8d0',.17);body('#cfd6ea',.3);ell(0,.58,.16,.2,'#fff',null);
    mir([-.46,-.42,-.36,-1.02,-.08,-.58],'#dfe6f5');mir([-.37,-.5,-.33,-.82,-.18,-.6],'#9fb4ff',null);ball(0,-.2,.48,'#eef2fb');ell(0,.03,.22,.16,'#fff');circ(0,-.06,.055,OL,null);whisk();eyes(-.22,.2,'#3d8bff');fangs(.1);
    if(mood!==2)line([-.07,.1,0,.14,.07,.1],OL,.035);c.beginPath();c.arc(.04,-.5,.1,PI*.3,PI*1.7);c.strokeStyle=GOLD;c.lineWidth=.06;c.stroke();c.lineWidth=.07;
    line([-.28,.27,.28,.27],OL,.16);line([-.28,.27,.28,.27],GOLD,.09);if(st>1)crown(-.64,.22);if(st>2)glow(0,-.2,.95,'rgba(159,180,255,.35)');},
  shade(){if(st>2)spikes(0,-.3,.4,.8,7,PI*1.1,PI*1.9,'#6a4bd0');glow(0,.1,.9,'rgba(140,90,255,.35)');if(st>1){flame(-.56,.4,.36,'#3a2a5c');flame(.56,.4,.36,'#3a2a5c');}
    c.beginPath();c.moveTo(0,-.72);c.bezierCurveTo(.62,-.7,.6,.3,.56,.8);c.lineTo(.36,.64);c.lineTo(.18,.84);c.lineTo(0,.66);c.lineTo(-.18,.84);c.lineTo(-.36,.64);c.lineTo(-.56,.8);c.bezierCurveTo(-.6,.3,-.62,-.7,0,-.72);fs('#3a2a5c',OL);
    c.beginPath();c.ellipse(-.22,-.3,.16,.3,.3,0,7);fs('rgba(255,255,255,.12)',null);
    for(const k of [-1,1]){if(mood===1)line([k*.3,-.18,k*.12,-.1,k*.3,-.02],'#fff',.05);else{ell(k*.2,-.1,.1,mood===2?.07:.12,st>2?'#ffe566':'#fff',null);circ(k*.2,-.08,.04,'#6a4bd0',null);}}
    if(mood===2){c.beginPath();c.arc(0,.2,.14,0,PI);c.closePath();fs('#1b1730',null);}},
  ninja(){if(part){arm(SK,'#2f3a5c');line([.56,.56,.56,.44],'#6b4a2a',.09);poly([.5,.42,.62,.42,.62,.1,.56,-.04,.5,.1],st>1?metal:'#cfd6e6');line([.44,.43,.68,.43],OL,.07);if(st>2)glow(.56,.2,.25,'rgba(255,201,77,.6)');return;}
    if(st>2)cape('#7a2030');feet('#1f2740');body('#2f3a5c');line([-.28,.63,.28,.63],OL,.11);line([-.27,.63,.27,.63],'#e0455a',.06);line([-.2,.26,.2,.5],'#1f2740',.05);circ(-.36,.5,.085,'#2f3a5c');
    ball(0,-.2,.46,'#2f3a5c');poly([-.36,-.3,.36,-.3,.38,-.06,-.38,-.06],SK,OL);eyes(-.18,.17);
    if(st>1){const hc=st>2?GOLD:'#e0455a';line([-.46,-.36,.46,-.36],OL,.14);line([-.46,-.36,.46,-.36],hc,.08);poly([-.46,-.38,-.7,-.3,-.62,-.5],hc);poly([-.46,-.34,-.72,-.12,-.56,-.4],hc);}},
  panther(){if(st>2)spikes(0,-.2,.4,.7,9,PI*.85,PI*2.15,'#8a5cf0');c.beginPath();c.moveTo(.2,.7);c.bezierCurveTo(.7,.8,.9,.3,.6,.05);c.strokeStyle=OL;c.lineWidth=.2;c.stroke();c.strokeStyle='#2f2f3d';c.lineWidth=.11;c.stroke();c.lineWidth=.07;
    feet('#22222e',.16);body('#2f2f3d',.28);ell(0,.58,.14,.18,'#4a4a5c',null);mir([-.44,-.44,-.4,-.9,-.12,-.58],'#2f2f3d');mir([-.37,-.5,-.37,-.74,-.2,-.6],'#f0a5b0',null);
    ball(0,-.2,.46,'#3a3a4a');ell(0,.04,.2,.14,'#55556a');circ(0,-.05,.05,'#f0a5b0',null);whisk();
    for(const k of [-1,1]){if(mood===1)line([k*.3,-.3,k*.12,-.22,k*.3,-.14],OL,.05);else{ell(k*.2,-.22,.1,.075,st>2?'#ffe566':'#c8e04a',OL);ell(k*.2,-.22,.025,.07,OL,null);if(mood===2)line([k*.34,-.38,k*.1,-.3],OL,.055);}}
    fangs(.1);if(mood!==2)line([-.07,.1,0,.14,.07,.1],OL,.035);if(st>1){line([-.27,.27,.27,.27],OL,.16);line([-.27,.27,.27,.27],'#8a5cf0',.09);circ(0,.3,.06,st>2?GOLD:'#6fe3ff');}},
  whelp(){dragon('#7ac356','#4f9a3c','#f3e3a0',st>2?GOLD:'#f1f0e6',[0,.7,.9,1.1][st]);if(st>1)poly([-.16,.3,.16,.3,.1,.52,0,.6,-.1,.52],metal);if(st>2){crown(-.62);glow(.72,.14,.3,'rgba(255,122,47,.8)');flame(.72,.1,.2,'#ff7a2f');}},
  salam(){dragon('#f08a3c','#c95f1f','#ffe0a8',st>2?GOLD:'#7a2f1a',[0,.5,.6,.75][st]);if(st>1)glow(0,-.7,.45,'rgba(255,122,47,.5)');for(const x of [-.22,0,.22])flame(x,-.66-(x?0:.06),st>1?.2:.15,st>2?'#3d8bff':'#ff7a2f');
    glow(-.62,.3,[0,.22,.28,.34][st],'rgba(255,122,47,.9)');circ(-.62,.3,[0,.08,.1,.13][st],st>2?'#bfefff':'#ffd24a');},
  stardrake(){glow(0,0,1,'rgba(127,160,255,.35)');dragon('#6f7ff0','#4b56c0','#dfe4ff',GOLD,[0,.9,1.05,1.2][st]);for(const [x,y] of [[-.28,-.34],[.3,-.4],[.02,-.5]])spikes(x,y,.02,.07,4,0,PI*2,'#fff',null);
    if(st>1)spikes(-.66,-.5,.04,.14,5,0,PI*2,GOLD);if(st>2){spikes(.66,-.56,.04,.16,5,0,PI*2,GOLD);crown(-.62);}},
  wyvern(){dragon('#2f6f7a','#1f4a55','#9fd6d0',st>2?GOLD:'#cfd6e6',[0,1.1,1.25,1.4][st]);if(st>1)line([-.3,-.42,-.1,-.12],'#e0455a',.04);if(st>2){glow(-.2,-.2,.18,'rgba(255,229,102,.9)');glow(.2,-.2,.18,'rgba(255,229,102,.9)');}},
  sword(){if(part){arm(SK,'#5b7fbf');sword(st>1?metal:'#c79a5e');if(st>2)glow(.56,-.1,.3,'rgba(255,201,77,.55)');return;}
    human(SK,'#7a4a2a','#5b7fbf');if(st>1){cap(0,-.24,.49,PI,PI*2,metal);line([-.49,-.24,.49,-.24],OL);line([0,-.24,0,-.06],OL,.06);c.save();c.beginPath();c.arc(0,-.24,.46,PI,PI*2);c.clip();c.fillStyle='rgba(255,255,255,.35)';c.fillRect(-.4,-.7,.18,.4);c.restore();
      if(st>2)poly([0,-.72,-.12,-1,.2,-.92,.1,-.72],'#e0455a');}},
  sling(){if(part){arm(SK,'#5aa86b');line([.56,.82,.56,.36],OL,.15);line([.56,.36,.42,.1],OL,.15);line([.56,.36,.7,.1],OL,.15);line([.56,.82,.56,.36],'#9a6a3a',.08);line([.56,.36,.42,.1],'#9a6a3a',.08);line([.56,.36,.7,.1],'#9a6a3a',.08);
      line([.42,.1,.56,.2,.7,.1],'#3a2a2e',.035);if(st>2)glow(.56,.14,.28,'rgba(255,138,61,.8)');circ(.56,.14,st>2?.12:st>1?.1:.08,st>2?'#ff8a3d':'#9aa0b5');return;}
    human(SK,'#e8843a','#5aa86b','#3f8f58');poly([-.2,.4,.2,.4,.16,.56,-.16,.56],'rgba(27,23,48,.18)',null);if(st>1){line([-.44,-.34,.44,-.34],OL,.16);line([-.44,-.34,.44,-.34],st>2?GOLD:'#e0455a',.09);poly([-.44,-.36,-.6,-.2,-.5,-.44],st>2?GOLD:'#e0455a');}},
  mage(){if(part){arm('#ffe0c2','#7a5cc9');staff('#7fe0ff',[0,.12,.15,.19][st]);return;}
    human('#ffe0c2','#6b5b95','#7a5cc9','#4b3a9a');for(const y of [.36,.5])circ(0,y,.035,GOLD,null);ell(0,-.46,.56,.1,'#5a3fb0');poly([-.36,-.48,.36,-.48,.2,-.9,.3,-1.02,.06,-.98],'#5a3fb0');
    line([-.2,-.6,.12,-.9],'rgba(255,255,255,.25)',.05);if(st>1)line([-.33,-.52,.33,-.52],GOLD,.08);if(st>2)spikes(-.02,-.72,.04,.13,5,0,PI*2,GOLD,null);},
  archer(){if(part){arm(SK,'#3d8b55');bow(st>1?metal:'#9a6a3a');if(st>2){glow(.3,.32,.24,'rgba(255,201,77,.7)');line([.05,.32,.7,.32],GOLD,.05);poly([.7,.24,.86,.32,.7,.4],GOLD);}return;}
    if(st>2)cape('#2f7d4f');feet();body('#3d8b55');belt();poly([-.3,.26,-.14,.2,.24,.6,.1,.66],'#6b4a2a');circ(-.36,.5,.085,SK);ball(0,-.22,.52,'#2f7d4f');circ(0,-.14,.37,SK);
    poly([-.2,-.47,0,-.36,.2,-.47,0,-.6],'#27693f',null);eyes(-.12,.15);cheeks(-.02,.24);mouth(.06,.07);if(st>1)poly([-.3,-.62,-.52,-1,-.12,-.72],st>2?GOLD:'#e0455a');},
  wolf(){if(st>2)spikes(0,-.2,.4,.72,9,PI*.85,PI*2.15,'#bfe6ff');poly([.2,.62,.56,.3,.74,.42,.62,.62,.46,.8,.26,.8],'#7f869c');poly([.56,.3,.74,.42,.66,.5],'#e6e8f0',null);
    feet('#6d7389',.16);body('#7f869c',.28);ell(0,.58,.15,.2,'#dfe2ec',null);mir([-.44,-.42,-.34,-.98,-.08,-.58],'#8d93a6');mir([-.36,-.5,-.32,-.8,-.18,-.6],'#f0a5b0',null);
    ball(0,-.2,.46,'#9aa0b5');ell(0,.03,.22,.16,'#f1f1f5');circ(0,-.06,.055,OL,null);circ(-.015,-.075,.018,'#fff',null);whisk();eyes(-.22,.2,st>2?'#1e9bff':OL);fangs(.1);
    if(mood!==2)line([-.07,.1,0,.14,.07,.1],OL,.035);
    if(st>1){line([-.3,-.42,-.1,-.12],'#e0455a',.04);line([-.27,.27,.27,.27],OL,.16);line([-.27,.27,.27,.27],st>2?GOLD:'#e0455a',.09);spikes(0,.27,.02,.12,3,PI*.2,PI*.8,metal);}},
  bear(){feet('#6f4729',.2);body('#8a5a3a',.36);ell(0,.56,.2,.22,'#b98a5e',null);circ(-.4,.48,.12,'#8a5a3a');circ(.4,.48,.12,'#8a5a3a');for(const k of [-1,1])circ(k*.4,.5,.045,'#e8c9a0',null);
    circ(-.36,-.58,.17,'#8a5a3a');circ(.36,-.58,.17,'#8a5a3a');circ(-.36,-.58,.08,'#e8c9a0',null);circ(.36,-.58,.08,'#e8c9a0',null);
    ball(0,-.2,.48,'#9c6a45');ell(0,.03,.21,.17,'#e8c9a0');circ(0,-.07,.065,OL,null);circ(-.02,-.09,.02,'#fff',null);eyes(-.22,.2);cheeks(-.02,.34);fangs(.08);if(mood!==2)line([0,-.01,0,.07,-.07,.11],OL,.035);
    if(st>1){for(const k of [-1,1]){circ(k*.4,.3,.17,metal);circ(k*.4,.3,.07,'rgba(27,23,48,.25)',null);}poly([-.14,.36,.14,.36,0,.62],metal);}if(st>2)crown(-.62);},
  fox(){for(let i=0;i<st;i++){const r=-.9+i*.55;c.save();c.translate(.25,.6);c.rotate(r);ell(.42,0,.36,.15,'#f08a3c');ell(.66,0,.13,.11,'#fff',null);c.restore();}
    feet('#3a2a2a',.14);body('#f08a3c',.26);poly([-.15,.22,.15,.22,.09,.5,0,.6,-.09,.5],'#fff',null);mir([-.46,-.4,-.42,-1,-.06,-.58],'#f08a3c');mir([-.4,-.72,-.42,-1,-.26,-.82],'#3a2a2a',null);mir([-.36,-.5,-.37,-.74,-.2,-.58],'#ffd9c2',null);
    ball(0,-.2,.44,'#f59a4a');ell(-.2,.01,.2,.15,'#fff',null);ell(.2,.01,.2,.15,'#fff',null);circ(0,-.04,.05,OL,null);eyes(-.2,.19);mouth(.06,.06);
    if(st>2)poly([0,-.58,-.07,-.46,0,-.34,.07,-.46],GOLD);glow(-.62,.2,[0,.24,.3,.36][st],'rgba(197,139,255,.8)');circ(-.62,.2,[0,.09,.11,.14][st],'#c58bff');circ(-.65,.17,.03,'#fff',null);},
  hawk(){const w=[0,.3,.38,.46][st];for(const k of [-1,1]){ell(k*.52,.2,w,.17,'#7a4a2a',OL,-k*.55);for(let i=0;i<3;i++)line([k*(.4+i*.1),.2+i*.03,k*(.5+i*.11),.34+i*.04],'#4f2f1a',.03);}
    if(st>2){ell(-.66,.38,.16,.08,GOLD,OL,.55);ell(.66,.38,.16,.08,GOLD,OL,-.55);}
    for(const k of [-1,1])line([k*.12,.76,k*.12,.88,k*.2,.9],'#f4b63a',.05);ell(0,.34,.3,.44,'#8a5a3a');ell(0,.46,.18,.26,'#e8d2b0',null);for(const y of [.36,.48,.6])line([-.08,y,0,y+.05,.08,y],'#c9a880',.025);
    if(st>1)spikes(0,-.3,.26,.56,3,PI*1.25,PI*1.75,st>2?GOLD:'#7a4a2a');ball(0,-.25,.35,'#f7f4ec');
    if(mood===2){poly([-.09,-.2,.09,-.2,0,-.08],'#f4b63a');poly([-.07,-.04,.07,-.04,0,.06],'#e09a1a');}else poly([-.09,-.18,.09,-.18,0,.04],'#f4b63a');
    for(const k of [-1,1])circ(k*.15,-.32,.1,'#f4b63a',null);eyes(-.32,.15);},
  ember(){const o=st>2?'#3d8bff':'#ff7a2f',i=st>2?'#bfefff':'#ffd24a';glow(0,.1,1,st>2?'rgba(61,139,255,.35)':'rgba(255,122,47,.35)');if(st>2)spikes(0,-.1,.5,.95,7,PI*1.1,PI*1.9,'#8fc4ff');
    if(st>1){flame(-.55,.38,.42,o);flame(.55,.38,.42,o);}flame(0,.05,[0,.86,.95,1][st],o);
    c.beginPath();c.moveTo(0,-.2);c.bezierCurveTo(.4,.2,.36,.74,0,.76);c.bezierCurveTo(-.36,.74,-.4,.2,0,-.2);fs(i,null);c.beginPath();c.moveTo(0,.2);c.bezierCurveTo(.2,.4,.18,.7,0,.72);c.bezierCurveTo(-.18,.7,-.2,.4,0,.2);fs('rgba(255,255,255,.55)',null);
    eyes(.32,.16);cheeks(.44,.26);mouth(.5,.07);for(const [x,y] of [[-.4,-.4],[.36,-.55],[.5,-.1]])circ(x,y,.035,i,null);},
  rock(){ell(-.3,.86,.16,.07,'#6f7387');ell(.3,.86,.16,.07,'#6f7387');poly([-.6,.84,-.74,.2,-.46,-.4,0,-.58,.5,-.42,.74,.16,.6,.84],'#8b8fa3');poly([-.46,-.4,0,-.58,.5,-.42,.2,-.2,-.25,-.18],'#a9adc0',null);
    poly([.5,-.42,.74,.16,.6,.84,.34,.84,.2,-.2],'rgba(27,23,48,.2)',null);line([-.46,-.4,-.25,-.18,-.36,.1],'#5f6377',.04);line([.2,-.2,.34,.2],'#5f6377',.04);
    if(st===1){ell(-.08,-.5,.3,.1,'#6fbf6a');circ(-.2,-.56,.04,'#ffb7c5',null);}
    if(st>1){const k=st>2?GOLD:'#6fe3ff';poly([-.3,-.46,-.2,-.98,-.02,-.52],k);poly([.04,-.54,.24,-.9,.36,-.46],k);line([-.22,-.5,-.2,-.9],'rgba(255,255,255,.6)',.03);line([-.36,.1,-.2,.4],k,.04);if(st>2){poly([-.56,-.2,-.72,-.62,-.4,-.4],k);line([-.2,.56,0,.66,.2,.56],GOLD,.06);}}
    eyes(.12,.22,OL,.085);if(mood===2)line([-.12,.4,.12,.4],OL,.08);else line([-.1,.38,.1,.38],OL,.05);},
  wind(){if(st>2)ell(0,.1,.92,.26,null,GOLD,-.3);poly([-.22,.5,.22,.5,.06,.96],'#a9efe6');blob([[-.32,.12,.32],[.32,.12,.32],[0,-.22,.42],[0,.3,.34]],'#a9efe6');
    circ(-.12,-.34,.2,'rgba(255,255,255,.45)',null);circ(.34,.24,.2,'rgba(27,23,48,.1)',null);
    c.beginPath();c.arc(-.05,-.42,.16,PI*.9,PI*2.3);c.strokeStyle='#4fbfb4';c.lineWidth=.06;c.stroke();c.lineWidth=.07;
    if(st>1)for(const k of [-1,1]){c.beginPath();c.arc(k*.72,-.1,.18,k>0?PI*1.2:PI*.2,k>0?PI*2.6:PI*1.8);c.strokeStyle=st>2?GOLD:'#7fe0d6';c.lineWidth=.08;c.stroke();c.lineWidth=.07;}
    eyes(.06,.17);cheeks(.2,.3);mouth(.24,.07);},
  bolt(){const n=[0,8,10,12][st];glow(0,0,1,'rgba(255,229,102,.4)');spikes(0,0,.36,[0,.74,.82,.92][st],n,0,PI*2,st>2?'#ffb347':'#ffd93b');
    ball(0,0,.46,st>2?'#fffbe0':'#ffe566');poly([.04,-.4,-.12,-.16,-.02,-.16,-.08,.02,.14,-.24,.03,-.24],'#ff9a2f',null);eyes(.08,.18);cheeks(.22,.3);mouth(.26,.07);
    if(st>1)for(let i=0;i<st*2;i++){const a=i*PI/st+.4;circ(Math.cos(a)*.9,Math.sin(a)*.9,.05,'#fff',null);}},
  grunt(){feet('#3a3350');body('#6b4f8a',.28);poly([-.28,.72,-.18,.84,-.08,.72,.02,.84,.12,.72,.22,.84,.28,.72,.28,.86,-.28,.86],'#1b1730',null);for(const y of [.4,.52])line([.32,y,.62,y-.04],'#8fce7a',.1);
    spikes(0,-.2,.4,.6,5,PI*1.2,PI*1.8,'#4f7f45');ball(0,-.2,.44,'#8fce7a');line([-.3,-.46,-.1,-.5],OL,.035);for(const x of [-.25,-.18,-.11])line([x,-.52,x+.01,-.43],OL,.025);
    circ(-.17,-.24,.085,'#fff');circ(-.17,-.24,.035,OL,null);line([.1,-.31,.24,-.17],OL,.05);line([.24,-.31,.1,-.17],OL,.05);
    if(mood===2){c.beginPath();c.arc(0,.0,.12,0,PI);c.closePath();fs('#3a2030',OL);}else line([-.2,.02,-.1,-.04,0,.02,.1,-.04,.2,.02],OL,.05);},
  bat(){mir([-.24,-.05,-.96,-.5,-.86,.06,-.66,-.04,-.54,.3],'#7a4bb0');for(const k of [-1,1]){line([k*.26,0,k*.86,.06],'#5a3490',.03);line([k*.26,0,k*.66,-.04],'#5a3490',.03);}
    mir([-.3,-.3,-.34,-.72,-.08,-.42],'#8d5fd0');mir([-.28,-.36,-.3,-.6,-.16,-.44],'#f0a5b0',null);ball(0,.02,.38,'#8d5fd0');ell(0,.16,.16,.12,'#b08fe6',null);
    eyes(-.06,.15,'#ff4d6a',.08);poly([-.12,.14,-.04,.14,-.08,.3],'#fff',OL);poly([.04,.14,.12,.14,.08,.3],'#fff',OL);},
  skull(){if(part){line([.3,.36,.53,.52],OL,.16);line([.3,.36,.53,.52],'#f1f0e6',.08);circ(.55,.52,.07,'#f1f0e6');bow('#d8d6c8');return;}
    feet('#2a2440');body('#3a3350',.27);poly([-.27,.74,-.14,.86,0,.74,.14,.86,.27,.74,.27,.88,-.27,.88],'#1b1730',null);ball(0,-.16,.54,'#3a3350');ball(0,-.1,.4,'#f1f0e6');
    circ(-.15,-.14,.11,OL,null);circ(.15,-.14,.11,OL,null);circ(-.15,-.14,mood===2?.06:.04,'#ff4d6a',null);circ(.15,-.14,mood===2?.06:.04,'#ff4d6a',null);
    poly([0,-.02,-.05,.08,.05,.08],OL,null);line([-.16,.2,.16,.2],OL,.04);for(const x of [-.08,0,.08])line([x,.14,x,.26],OL,.03);},
  shield(){feet('#4f566b');body('#6f7890',.3);line([-.3,.5,.3,.5],'#4f566b',.05);ball(0,-.2,.42,'#8fce7a');cap(0,-.24,.45,PI,PI*2,'#9aa5bd');line([0,-.24,0,-.04],OL,.1);line([0,-.24,0,-.04],'#9aa5bd',.05);
    eyes(-.1,.16);line([-.14,.08,.14,.08],OL,.05);poly([-.76,-.02,-.18,-.02,-.18,.5,-.47,.84,-.76,.5],'#b8c2d8');poly([-.76,-.02,-.47,-.02,-.47,.84,-.76,.5],'rgba(255,255,255,.25)',null);
    poly([-.47,.14,-.36,.36,-.47,.6,-.58,.36],'#e0455a');},
  shaman(){if(part){arm('#d9c9a8','#5a3f7a');line([.56,.86,.56,-.3],OL,.14);line([.56,.86,.56,-.3],'#9a6a3a',.07);glow(.56,-.42,.3,'rgba(58,210,159,.8)');circ(.56,-.42,.13,'#3ad29f');
      for(const k of [-1,1])line([.56,-.2,.56+k*.14,-.06],'#e0455a',.04);return;}
    feet('#3a2850');body('#5a3f7a',.28);for(const x of [-.14,0,.14])circ(x,.42,.04,'#f1f0e6');spikes(0,-.45,.2,.6,5,PI*1.15,PI*1.85,'#3ad29f');ball(0,-.2,.5,'#5a3f7a');
    ell(0,-.12,.3,.36,'#d9c9a8');line([-.2,-.3,-.06,-.26],'#c0392b',.05);line([.2,-.3,.06,-.26],'#c0392b',.05);eyes(-.14,.14,'#1f8f6a',.08);poly([-.1,0,.1,0,0,.16],'#c0392b',OL);line([-.14,.14,.14,.14],'#c0392b',.03);},
  bomber(){ell(-.22,.82,.14,.08,'#3a2a2e');ell(.22,.82,.14,.08,'#3a2a2e');line([0,-.4,.18,-.68],OL,.13);line([0,-.4,.18,-.68],'#c9a36a',.06);glow(.2,-.72,.3,'rgba(255,179,71,.9)');spikes(.2,-.72,.03,.17,6,0,PI*2,'#ffb347',null);circ(.2,-.72,.05,'#fff',null);
    ball(0,.14,.58,'#2a2a36');poly([-.14,-.44,.14,-.44,.12,-.36,-.12,-.36],'#6f7387');eyes(.1,.2,'#ff4d6a',.09);line([-.18,.38,-.06,.31,.06,.38,.18,.31],'#fff',.05);},
  ogre(){feet('#7a2f2c',.22);body('#a8423f',.4);ell(0,.5,.24,.2,'#c96a5c',null);poly([-.4,.66,.4,.66,.3,.86,.1,.74,0,.88,-.1,.74,-.3,.86],'#6b4a2a');for(const k of [-1,1])circ(k*.46,.46,.13,'#d85a50');
    mir([-.3,-.5,-.52,-.98,-.1,-.62],'#f1f0e6');ball(0,-.18,.5,'#d85a50');circ(-.19,-.2,.11,'#fff');circ(.19,-.2,.11,'#fff');circ(-.17,-.18,.05,OL,null);circ(.17,-.18,.05,OL,null);
    line([-.34,-.4,-.08,-.3],OL,.08);line([.34,-.4,.08,-.3],OL,.08);if(mood===2){c.beginPath();c.arc(0,.1,.2,0,PI);c.closePath();fs('#5a1820',OL);}else line([-.22,.1,.22,.1],OL,.06);
    poly([-.22,.1,-.12,.1,-.17,-.08],'#fff');poly([.12,.1,.22,.1,.17,-.08],'#fff');}};
  const BOSS={boss5:['#6a3fc0','#9a72ea'],boss10:['#b3334a','#ea6577'],boss15:['#23805a','#57cf9f'],boss20:['#2a2440','#55497a']};
  if(BOSS[id]){const [d,l]=BOSS[id];mir([-.3,.1,-1,-.5,-.92,.2,-.7,.1,-.6,.5,-.4,.36],d);for(const k of [-1,1]){line([k*.32,.12,k*.92,.2],'rgba(27,23,48,.4)',.03);line([k*.32,.12,k*.7,.1],'rgba(27,23,48,.4)',.03);line([k*.32,.12,k*.6,.5],'rgba(27,23,48,.4)',.03);}
    feet(d,.24);body(d,.42);for(const y of [.36,.5,.64])line([-.2,y,0,y+.06,.2,y],l,.04);mir([-.26,-.52,-.62,-1,-.06,-.66],'#f1f0e6');mir([-.3,-.6,-.5,-.86,-.2,-.7],'rgba(27,23,48,.15)',null);
    ball(0,-.18,.52,l);glow(-.22,-.24,.2,'rgba(255,201,77,.7)');glow(.22,-.24,.2,'rgba(255,201,77,.7)');mir([-.34,-.34,-.1,-.22,-.3,-.1],GOLD);
    if(mood===2){c.beginPath();c.arc(0,.08,.24,0,PI);c.closePath();fs('#3a0f18',OL);}else line([-.24,.1,-.12,.02,0,.1,.12,.02,.24,.1],OL,.06);
    poly([-.2,.08,-.1,.08,-.15,.26],'#fff');poly([.1,.08,.2,.08,.15,.26],'#fff');if(id==='boss20')crown(-.64,.3);return;}
  (D[id]||D.grunt)();
}
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
