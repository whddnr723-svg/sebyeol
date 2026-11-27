/* ---------- sound effects made in the browser (no files, ASCII only). sfx(name) plays one; each name has a short
   cooldown so a crowded battle does not turn into noise. Muting is remembered. Phones need one tap before sound starts. ---------- */
const SFX=(()=>{let ac=null,master=null,muted=false;const last={};
  try{muted=localStorage.getItem('sebyeol-mute')==='1';}catch(e){}
  function ctx(){if(ac)return ac;const C=typeof window!=='undefined'&&(window.AudioContext||window.webkitAudioContext);if(!C)return null;
    ac=new C();master=ac.createGain();master.gain.value=.5;master.connect(ac.destination);return ac;}
  function wake(){const a=ctx();if(a&&a.state==='suspended')a.resume();}
  if(typeof document!=='undefined'&&document.addEventListener){document.addEventListener('pointerdown',wake,{passive:true});document.addEventListener('keydown',wake);}
  const tone=(a,t,f0,f1,dur,type,vol)=>{const o=a.createOscillator(),g=a.createGain();o.type=type||'sine';o.frequency.setValueAtTime(f0,t);if(f1)o.frequency.exponentialRampToValueAtTime(f1,t+dur);
    g.gain.setValueAtTime(0,t);g.gain.linearRampToValueAtTime(vol,t+.008);g.gain.exponentialRampToValueAtTime(.0008,t+dur);o.connect(g);g.connect(master);o.start(t);o.stop(t+dur+.02);};
  let nbuf=null;const noise=(a,t,dur,freq,q,vol,sweep)=>{if(!nbuf){nbuf=a.createBuffer(1,a.sampleRate*.5,a.sampleRate);const d=nbuf.getChannelData(0);for(let i=0;i<d.length;i++)d[i]=Math.random()*2-1;}
    const s=a.createBufferSource(),f=a.createBiquadFilter(),g=a.createGain();s.buffer=nbuf;f.type='bandpass';f.frequency.setValueAtTime(freq,t);if(sweep)f.frequency.exponentialRampToValueAtTime(sweep,t+dur);f.Q.value=q||1;
    g.gain.setValueAtTime(vol,t);g.gain.exponentialRampToValueAtTime(.0008,t+dur);s.connect(f);f.connect(g);g.connect(master);s.start(t);s.stop(t+dur+.02);};
  const notes=(a,t,fs,step,dur,type,vol)=>fs.forEach((f,i)=>tone(a,t+i*step,f,0,dur,type,vol));
  const SOUNDS={
    hit:(a,t)=>{noise(a,t,.07,1400,1.2,.32);tone(a,t,160,70,.08,'sine',.18);},
    slash:(a,t)=>{noise(a,t,.13,4200,2,.22,900);},
    bite:(a,t)=>{noise(a,t,.06,900,1,.3);noise(a,t+.05,.06,700,1,.25);},
    shot:(a,t)=>{tone(a,t,1100,380,.09,'triangle',.12);noise(a,t,.03,3000,2,.08);},
    magic:(a,t)=>{tone(a,t,660,990,.22,'sine',.09);tone(a,t+.02,990,1480,.2,'sine',.06);},
    hex:(a,t)=>{tone(a,t,220,150,.25,'sawtooth',.05);tone(a,t,233,160,.25,'sine',.06);},
    boom:(a,t)=>{noise(a,t,.35,500,.7,.4,120);tone(a,t,120,40,.3,'sine',.25);},
    buy:(a,t)=>{notes(a,t,[988,1319],.06,.12,'triangle',.12);},
    merge:(a,t)=>{notes(a,t,[784,988,1175,1568],.07,.18,'triangle',.13);},
    start:(a,t)=>{tone(a,t,110,55,.25,'sine',.35);noise(a,t,.12,300,1,.2);tone(a,t+.18,110,55,.25,'sine',.3);},
    win:(a,t)=>{notes(a,t,[523,659,784,1047],.09,.3,'triangle',.13);},
    lose:(a,t)=>{notes(a,t,[392,330,262],.14,.35,'triangle',.12);},
    click:(a,t)=>{tone(a,t,1800,1200,.03,'square',.03);},
    tick:(a,t)=>{tone(a,t,1500,0,.05,'square',.04);}};
  const GAP={hit:.05,slash:.06,bite:.08,shot:.05,magic:.08,hex:.12,boom:.15,click:.04,tick:.3};
  function play(name){if(muted||!SOUNDS[name])return;const a=ctx();if(!a||a.state!=='running')return;const t=a.currentTime;if(last[name]&&t-last[name]<(GAP[name]||.02))return;last[name]=t;
    try{SOUNDS[name](a,t);}catch(e){}}
  function setMuted(m){muted=m;try{localStorage.setItem('sebyeol-mute',m?'1':'0');}catch(e){}}
  return {play,setMuted,get muted(){return muted;}};})();
function sfx(n){SFX.play(n);}
