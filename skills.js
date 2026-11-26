/* ---------- one skill cast. G carries what the battle loop owns:
   B (battle state), hit, dist, fx (push an effect), near (foes in a radius), s3 (pick by star), d (damage), m (mage bonus), ang, st ---------- */
function castSkill(a,t,foes,allies,G){
  const {B,hit,dist,fx,near,s3,d,m,ang,st}=G,alive=()=>foes.filter(f=>f.hp>0);
  const jump=(v,ox,oy)=>{fx({k:'beam',w:2,x1:a.x,y1:a.y,x2:v.x,y2:v.y,t:.25,c:'#fff'});a.x=Math.max(.4,Math.min(6.6,v.x+ox));a.y=Math.max(.1,Math.min(5.6,v.y+oy));a.face=v.x<a.x?-1:1;};
  switch(a.spr.indexOf('hanbyeol')===0?'hanbyeol':a.spr){
  case 'sword':{const R=s3([1.2,1.5,1.9]);for(const f of near(a,R))hit(a,f,d*s3([2,2.3,2.7]));fx({k:'spin',x:a.x,y:a.y,r:R,t:.4,c:'#cfd6e6'});fx({k:'shock',x:a.x,y:a.y,r:R,t:.4,d:.12,c:'#fff'});break;}
  case 'wolf':hit(a,t,d*3);a.frenzy=B.t+s3([3,4,5]);fx({k:'bite',x:t.x,y:t.y,t:.4,big:1,c:'#ff4d6a'});fx({k:'spark',x:t.x,y:t.y,t:.3,d:.16,big:1,c:'#ff7d6b'});break;
  case 'sling':hit(a,t,d*2.5);t.stun=B.t+s3([1,1.5,2]);fx({k:'lob',x1:a.x,y1:a.y,x2:t.x,y2:t.y,t:.3});fx({k:'shock',x:t.x,y:t.y,r:.7,t:.4,d:.28,c:'#d8d6c8'});break;
  case 'ember':{const zc=st>2?'#3d8bff':'#ff7a2f';B.zones.push({x:t.x,y:t.y,r:s3([1.2,1.5,1.8]),until:B.t+3,dps:d*.9*m,src:a,c:zc,tick:0});fx({k:'lob',fire:1,x1:a.x,y1:a.y,x2:t.x,y2:t.y,t:.25,c:zc});break;}
  case 'hawk':{const v=alive().sort((p,q)=>p.hp-q.hp)[0]||t;hit(a,v,d*s3([3,3.6,4.5]));fx({k:'dive',x:v.x,y:v.y,t:.4,c:'#fff'});fx({k:'spark',x:v.x,y:v.y,t:.3,d:.2,big:1,c:'#ffe566'});break;}
  case 'mage':{const vs=alive().sort(()=>Math.random()-.5).slice(0,s3([3,4,6]));
    for(const f of vs){hit(a,f,d*1.6*m);f.slowU=B.t+2;f.slowA=Math.max(f.slowA||0,.4);fx({k:'ice',x:f.x,y:f.y,t:.5,d:Math.random()*.15,c:'#9fe3ff'});}break;}
  case 'rock':a.sh=(a.sh||0)+a.max*s3([.25,.35,.5]);for(const f of near(a,2.2)){f.taunt=a;f.tauntU=B.t+3;}hit(a,t,d*1.5);fx({k:'armor',x:a.x,y:a.y,r:2.2,t:.5,c:'#8fd0ff'});break;
  case 'wind':{for(const f of near(t,1.4)){hit(a,f,d*1.6);if(!f.big)f.y=Math.max(.1,f.y-s3([1.2,1.6,2.1]));f.stun=B.t+.4;}fx({k:'gust',x:t.x,y:t.y,r:1.4,t:.6,c:'#a9efe6'});break;}
  case 'bear':{for(const f of near(a,1.6)){f.stun=B.t+s3([1,1.5,2]);hit(a,f,d);}a.hp=Math.min(a.max,a.hp+a.max*s3([.15,.2,.3]));a.heal=.5;fx({k:'roar',x:a.x,y:a.y,r:1.6,t:.6,c:'#ffd9a0'});B.shake=.25;break;}
  case 'fox':{const w=allies.filter(f=>f.hp>0).sort((p,q)=>p.hp/p.max-q.hp/q.max)[0];
    if(w){w.hp=Math.min(w.max,w.hp+d*s3([4,5,7])*m);w.heal=.6;fx({k:'wisp',x1:a.x,y1:a.y,x2:w.x,y2:w.y,t:.35,c:'#5fd6a8'});fx({k:'plus',x:w.x,y:w.y,t:.8,d:.3,c:'#5fd6a8'});}
    hit(a,t,d*1.5*m);fx({p:'orb',x1:a.x,y1:a.y,x2:t.x,y2:t.y,t:.2,c:'#c58bff'});break;}
  case 'archer':{for(const f of foes){if(f.hp<=0)continue;const px=f.x-a.x,py=f.y-a.y;if(px*a.adx+py*a.ady>0&&Math.abs(px*a.ady-py*a.adx)<.55){hit(a,f,d*s3([3,3.6,4.5]));fx({k:'spark',x:f.x,y:f.y,t:.25,d:.08,c:'#ffe9a8'});}}
    fx({k:'pierce',x:a.x,y:a.y,a:ang,t:.45,c:'#ffe9a8'});break;}
  case 'bolt':{let from=t,prev=a;const used=[];for(let i=0;i<s3([4,6,9]);i++){hit(a,from,d*1.5*m);fx({k:'bolt',x1:prev.x,y1:prev.y,x2:from.x,y2:from.y,t:.3,d:i*.05,c:'#ffe566'});fx({k:'spark',x:from.x,y:from.y,t:.25,d:i*.05,c:'#fff'});used.push(from);prev=from;
      const nx=alive().filter(f=>!used.includes(f)&&dist(from,f)<=2.6).sort((p,q)=>dist(from,p)-dist(from,q))[0];if(!nx)break;from=nx;}break;}
  /* --- assassins --- */
  case 'shade':a.inv=B.t+s3([1.5,2,2.5]);a.amp=s3([3,3.5,4.5]);fx({k:'ring',x:a.x,y:a.y,r:.9,t:.4,c:'#8a5cf0'});fx({k:'spark',x:a.x,y:a.y,t:.3,big:1,c:'#8a5cf0'});break;
  case 'ninja':{jump(t,-a.adx*.55,-a.ady*.55);hit(a,t,d*s3([3,3.5,4.5]));if(t.hp<=0)a.n=a.skN-1;fx({k:'slash',big:1,x:t.x,y:t.y,a:ang,t:.3,c:'#e0455a'});fx({k:'spark',x:t.x,y:t.y,t:.3,d:.1,big:1,c:'#fff'});break;}
  case 'panther':{const v=alive().sort((p,q)=>p.y-q.y)[0]||t;jump(v,.45,.3);for(const f of near(v,1.1)){hit(a,f,d*s3([2.2,2.6,3.2]));f.burnU=B.t+2.5;f.burnD=Math.max(f.burnD||0,d*.4);}
    fx({k:'claw',x:v.x,y:v.y,a:.4,t:.35,c:'#8a5cf0'});fx({k:'shock',x:v.x,y:v.y,r:1.1,t:.4,d:.1,c:'#8a5cf0'});break;}
  case 'wyvern':{const v=alive().sort((p,q)=>p.hp-q.hp)[0]||t;jump(v,.5,.35);hit(a,v,d*s3([4,5,6.5]));fx({k:'dive',x:v.x,y:v.y,t:.4,c:'#9fd6d0'});fx({k:'spark',x:v.x,y:v.y,t:.3,d:.2,big:1,c:'#ffe566'});B.shake=.15;break;}
  /* --- dragons --- */
  case 'whelp':{const R=2.3;for(const f of foes){if(f.hp<=0||dist(a,f)>R)continue;let da=Math.atan2(f.y-a.y,f.x-a.x)-ang;da=Math.atan2(Math.sin(da),Math.cos(da));if(Math.abs(da)<.65)hit(a,f,d*s3([2.2,2.6,3.2]));}
    fx({k:'cone',x:a.x,y:a.y,a:ang,r:R,t:.45,c:'#ff7a2f'});break;}
  case 'salam':{const R=s3([1.2,1.4,1.7]);for(const f of near(t,R))hit(a,f,d*2.5);fx({k:'lob',fire:1,x1:a.x,y1:a.y,x2:t.x,y2:t.y,t:.25,c:'#ff7a2f'});fx({k:'boom',x:t.x,y:t.y,r:R,t:.5,d:.24,c:'#ff7a2f'});break;}
  case 'stardrake':{const vs=alive().sort(()=>Math.random()-.5).slice(0,s3([3,4,6]));
    for(const f of vs){hit(a,f,d*2*m);f.stun=Math.max(f.stun||0,B.t+.6);const dl=Math.random()*.2;fx({k:'meteor',x:f.x,y:f.y,t:.28,d:dl,c:'#9fb4ff'});fx({k:'shock',x:f.x,y:f.y,r:.6,t:.4,d:dl+.26,c:'#dfe4ff'});}B.shake=.2;break;}
  /* --- legendary --- */
  case 'paladin':{const R=2.2;for(const f of near(a,R))hit(a,f,d*s3([3,3.6,4.5]));for(const w of allies)if(w.hp>0){w.sh=(w.sh||0)+w.max*s3([.15,.2,.3]);fx({k:'plus',x:w.x,y:w.y,t:.7,d:.2,c:'#ffe566'});}
    fx({k:'spin',x:a.x,y:a.y,r:R,t:.45,c:'#ffe566'});fx({k:'boom',x:a.x,y:a.y,r:R,t:.5,d:.15,c:'#ffc94d'});B.shake=.3;break;}
  case 'elder':{for(const f of alive()){hit(a,f,d*s3([2.2,2.7,3.5])*m);f.burnU=B.t+3;f.burnD=Math.max(f.burnD||0,d*.3);}
    fx({k:'cone',x:a.x,y:a.y,a:-Math.PI/2,r:7,t:.7,c:'#ff4d2f'});fx({k:'cone',x:a.x,y:a.y,a:ang,r:5,t:.6,c:'#ffb347'});B.shake=.5;break;}
  case 'phoenix':{const vs=alive().sort(()=>Math.random()-.5).slice(0,3);for(const v of vs){for(const f of near(v,1.3))hit(a,f,d*s3([2.2,2.7,3.5]));const dl=Math.random()*.25;
      fx({k:'meteor',x:v.x,y:v.y,t:.28,d:dl,c:'#ffb347'});fx({k:'boom',x:v.x,y:v.y,r:1.3,t:.5,d:dl+.26,c:'#ff7a2f'});}B.shake=.3;break;}
  case 'wolfking':{const dur=s3([4,5,6]);for(const w of allies)if(w.hp>0)w.frenzy=B.t+dur;hit(a,t,d*s3([3,3.6,4.5]));fx({k:'roar',x:a.x,y:a.y,r:3,t:.7,c:'#9fb4ff'});fx({k:'bite',x:t.x,y:t.y,t:.4,big:1,c:'#9fb4ff'});B.shake=.3;break;}
  /* --- hero and the five generals --- */
  case 'hanbyeol':{const R=1.2+.15*(a.gens||0);for(const f of near(a,R))hit(a,f,d*2);fx({k:'spin',x:a.x,y:a.y,r:R,t:.4,c:'#ffe566'});fx({k:'shock',x:a.x,y:a.y,r:R,t:.4,d:.12,c:'#fff'});break;}
  case 'mugyeol':{for(const f of foes){if(f.hp<=0)continue;const px=f.x-a.x,py=f.y-a.y;if(px*a.adx+py*a.ady>0&&Math.abs(px*a.ady-py*a.adx)<.6&&Math.hypot(px,py)<4){hit(a,f,d*s3([3,3.6,4.5]));fx({k:'spark',x:f.x,y:f.y,t:.25,c:'#fff'});}}
    fx({k:'pierce',x:a.x,y:a.y,a:ang,t:.35,c:'#fff'});break;}
  case 'duduri':{const vs=alive().sort(()=>Math.random()-.5).slice(0,s3([3,4,6]));for(const f of vs){hit(a,f,d*2*m);f.stun=Math.max(f.stun||0,B.t+1);fx({k:'shock',x:f.x,y:f.y,r:.7,t:.4,d:Math.random()*.15,c:'#6fa8dc'});}B.shake=.2;break;}
  case 'baeksan':{const v=alive().sort((p,q)=>p.hp-q.hp)[0]||t;jump(v,.5,.35);hit(a,v,d*s3([4,5,6.5]));fx({k:'claw',x:v.x,y:v.y,a:.4,t:.35,c:'#fff'});fx({k:'spark',x:v.x,y:v.y,t:.3,d:.15,big:1,c:'#bfe6ff'});break;}
  case 'mireu':{for(const f of alive()){hit(a,f,d*s3([1.6,2,2.6])*m);f.slowU=B.t+2;f.slowA=Math.max(f.slowA||0,.4);fx({k:'ice',x:f.x,y:f.y,t:.5,d:Math.random()*.2,c:'#9fe3ff'});}break;}
  case 'gaon':{for(const w of allies)if(w.hp>0)w.sh=(w.sh||0)+w.max*s3([.2,.3,.45]);for(const f of near(a,2.4)){f.taunt=a;f.tauntU=B.t+3;}fx({k:'armor',x:a.x,y:a.y,r:2.4,t:.5,c:'#8fb0ff'});break;}
  default:hit(a,t,d*2);}
}
