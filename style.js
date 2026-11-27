/* \uc138\ubcc4 \uc218\ud638\ub300 \ud654\uba74 \uc2a4\ud0c0\uc77c. index.html \uc744 500\uc904 \uc544\ub798\ub85c \ub450\ub824\uace0 \ub530\ub85c \ube90\ub2e4. */
document.head.appendChild(Object.assign(document.createElement('style'),{textContent:`
/* layout: one-screen portrait game. status strip, synergy chips, battlefield canvas, shop tray. single night-time look. */
:root{
  color-scheme:dark;
  --bg:#141a2e; --sky1:#2a2f5e; --sky2:#1a1f3d; --sky3:#33263a; --panel:#1d2542; --panel2:#283158; --line:#3a4474;
  --fg:#eef1ff; --muted:#9aa5d1; --gold:#ffc94d; --hp:#ff6b7a; --ok:#5fd6a8;
  --t1:#9aa5d1; --t2:#4fc38a; --t3:#5aa2ff; --t4:#c58bff;
  --display:'Jua','Noto Sans KR',system-ui,sans-serif;
  --body:'Noto Sans KR',system-ui,'Apple SD Gothic Neo','Malgun Gothic',sans-serif;
}
html,body{height:100%}
body{background:var(--bg) linear-gradient(180deg,var(--sky1) 0%,var(--sky2) 38%,var(--sky3) 100%) fixed;color:var(--fg);font-family:var(--body);font-size:13px;
  padding-left:max(16px,env(safe-area-inset-left,0px));padding-right:max(16px,env(safe-area-inset-right,0px));
  display:flex;justify-content:center;overflow-x:hidden;overflow-y:auto;user-select:none;-webkit-user-select:none;touch-action:manipulation}
#app{box-sizing:border-box;width:100%;height:100%;min-height:600px;display:grid;grid-template-columns:minmax(0,1fr);grid-template-rows:minmax(0,1fr) auto auto;gap:6px;padding-block:8px;position:relative}
#top{grid-area:1/1;align-self:start;z-index:2;display:flex;flex-direction:column;gap:6px;pointer-events:none}
#top>*{pointer-events:auto}
#info{grid-row:2} #tray{grid-row:3}
button{font:inherit;color:inherit;cursor:pointer;border:1px solid var(--line);background:var(--panel2);border-radius:8px}
button:focus-visible{outline:2px solid var(--gold);outline-offset:1px}
button:disabled{opacity:.45;cursor:default}

#hud{display:flex;flex-direction:column;gap:6px}
#hudTop{display:flex;align-items:center;gap:8px}
#roundBox{font-family:var(--display);white-space:nowrap;line-height:1;text-shadow:0 1px 3px #000}
#roundBox small{font-family:var(--body);font-size:10px;color:var(--muted);margin-right:4px}
#roundBox b{font-weight:400;font-size:22px}
#roundBox span{color:var(--muted);font-size:13px}
#track{flex:1;display:grid;grid-template-columns:repeat(50,1fr);gap:1px;align-items:center;min-width:0}
#track i{height:6px;border-radius:3px;background:var(--panel2)}
#track i.boss{height:12px;background:#6b3552}
#track i.done{background:var(--ok)}
#track i.cur{background:var(--gold)}
#helpBtn{width:32px;height:32px;border-radius:50%;font-family:var(--display);font-size:16px;padding:0;flex:none}
#hudRow{display:grid;grid-template-columns:1.25fr .95fr 1.1fr;gap:6px}
.pill{background:var(--panel);border-radius:10px;padding:6px 8px;display:flex;align-items:center;gap:6px;min-width:0}
.pill b{font-family:var(--display);font-weight:400;font-size:17px;font-variant-numeric:tabular-nums;white-space:nowrap}
.pill small{font-size:10px;color:var(--muted);white-space:nowrap}
.pill.col{flex-direction:column;align-items:stretch;gap:3px;padding-block:4px}
.pill .r{display:flex;justify-content:space-between;align-items:baseline;gap:4px}
.bar{flex:1;height:8px;border-radius:4px;background:#0f1428;overflow:hidden;min-width:0}
.pill.col .bar{flex:none;height:5px}
.bar div{height:100%;border-radius:4px;transition:width .3s}
#hpFill{background:var(--hp)} #xpFill{background:var(--t3)}
#sHp b{color:var(--hp)} #sGold b{color:var(--gold)}
.heart{color:var(--hp);font-style:normal;font-size:15px;line-height:1}
.coin{width:13px;height:13px;border-radius:50%;background:var(--gold);box-shadow:inset 0 0 0 2px #c98f1a;flex:none;display:inline-block}

#syn{display:grid;grid-template-columns:repeat(8,1fr);gap:3px}
.chip{border:1px solid var(--line);background:rgba(29,37,66,.6);border-radius:8px;padding:3px 2px 5px;font-size:11px;color:var(--muted);display:flex;flex-direction:column;align-items:center;gap:3px;min-width:0;white-space:nowrap}
.chip .pips{display:flex;gap:1px}
.chip .pips i{width:5px;height:5px;border-radius:50%;background:var(--panel2)}

.chip .pips i.f{background:var(--muted)}
.chip.on{background:var(--panel2);color:var(--fg);border-color:var(--gold)}
.chip.on .pips i.f{background:var(--gold)}
.chip.on2{background:var(--gold);color:#2a2000;border-color:var(--gold);font-weight:700}
.chip.on2 .pips i{background:rgba(42,32,0,.25)}
.chip.on2 .pips i.f{background:#2a2000}

#stage{grid-area:1/1;margin:-8px -16px 0;min-height:300px;position:relative;overflow:hidden}
canvas{display:block;touch-action:none}
#toast{position:absolute;left:50%;top:38%;transform:translate(-50%,-50%);background:rgba(20,26,46,.92);border:1px solid var(--gold);
  border-radius:12px;padding:10px 16px;font-family:var(--display);font-size:18px;text-align:center;pointer-events:none;white-space:pre-line;max-width:90%}
#toast small{display:block;font-family:var(--body);font-size:12px;color:var(--muted);margin-top:4px}

#info{min-height:34px;display:flex;align-items:center;gap:8px;background:var(--panel);border-radius:8px;padding:4px 8px}
#infoText{flex:1;min-width:0;font-size:12px;line-height:1.35;color:var(--muted)}
#infoText b{color:var(--fg);font-weight:700}
#sellBtn{padding:6px 10px;white-space:nowrap;border-color:var(--hp);color:var(--hp)}

#tray{position:relative;display:flex;flex-direction:column;gap:6px}
#shop{display:grid;grid-template-columns:repeat(5,1fr);gap:5px;padding-top:6px}
.card{position:relative;padding:6px 2px 5px;display:flex;flex-direction:column;align-items:center;gap:1px;min-width:0;border-width:2px;background:linear-gradient(var(--panel2),var(--panel));border-radius:10px}
.card .em{width:46px;height:46px;display:block}
.card .nm{font-family:var(--display);font-size:12px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;max-width:100%}
.card .tg{font-size:10px;color:var(--muted);white-space:nowrap}
.card .co{position:absolute;top:-7px;right:-4px;min-width:20px;height:20px;border-radius:10px;background:var(--gold);color:#2a2000;font-family:var(--display);font-size:13px;line-height:20px;text-align:center;box-shadow:0 0 0 2px var(--bg)}
.card.empty{visibility:hidden}
.card.poor{opacity:.5}
.card.pair::after{content:'\ubcf4\uc720';position:absolute;top:-7px;left:-4px;padding:0 5px;height:16px;line-height:16px;border-radius:8px;background:var(--ok);color:#06281c;font-size:10px;font-weight:700;box-shadow:0 0 0 2px var(--bg)}
#ctl{display:grid;grid-template-columns:1fr 1fr auto;gap:5px}
#ctl button{padding:9px 4px;font-family:var(--display);font-size:14px;white-space:nowrap;display:flex;align-items:center;justify-content:center;gap:5px}
#ctl button i{font-style:normal;color:var(--gold)}
#lockBtn{padding-inline:14px}
#lockBtn.on{border-color:var(--gold);color:var(--gold)}
#goBtn{grid-column:1/-1;padding:13px 4px;font-size:18px;background:var(--gold);color:#2a2000;border-color:var(--gold);border-radius:12px}
#sellZone{position:absolute;inset:0;background:rgba(255,107,122,.92);color:#fff;border-radius:10px;display:flex;align-items:center;justify-content:center;
  font-family:var(--display);font-size:20px;pointer-events:none}

.modal{position:absolute;inset:0;background:rgba(10,13,26,.86);display:flex;align-items:center;justify-content:center;z-index:5;padding:12px}
.sheet{background:var(--panel);border:1px solid var(--line);border-radius:14px;padding:18px;max-width:420px;width:100%;max-height:100%;overflow:auto}
.sheet h2{font-family:var(--display);font-weight:400;font-size:24px;margin:0 0 8px;text-wrap:balance}
.sheet p,.sheet li{line-height:1.6;font-size:13px;color:var(--fg)}
.tcard{display:flex;flex-direction:column;gap:4px;width:100%;text-align:left;padding:12px;margin-top:8px;border:2px solid var(--line);border-radius:12px;background:var(--panel2)}
.tcard b{font-family:var(--display);font-weight:400;font-size:17px;color:var(--gold)}
.tcard span{font-size:13px;line-height:1.5}
#tacRow{display:flex;gap:4px;flex-wrap:wrap}
.tchip{font-size:11px;padding:2px 8px;border-radius:999px;border-color:var(--t4);color:var(--t4);background:rgba(29,37,66,.6)}
.dx{display:flex;gap:8px;align-items:center;padding:4px 0;font-size:12px;line-height:1.45}
.dx img{width:38px;height:38px;flex:none}
.dx small{color:var(--muted)}
.sheet ul{padding-left:18px;margin:8px 0}
.sheet .big{font-family:var(--display);font-size:16px;padding:10px 18px;background:var(--gold);color:#2a2000;border-color:var(--gold);margin-top:8px}

/* wide screens: battlefield in the middle at full height, status on the left, shop on the right */
@media (min-width:900px) and (min-height:480px){
  #app{grid-template-columns:minmax(220px,270px) minmax(0,1fr) minmax(260px,310px);grid-template-rows:auto minmax(0,1fr);column-gap:20px;row-gap:10px;padding-block:14px}
  #top{grid-area:1/1;gap:10px}
  #syn{grid-template-columns:repeat(4,1fr);gap:4px}
  .chip{font-size:13px;padding:6px 2px 7px}
  #info{grid-area:2/1;align-self:start;min-height:64px;padding:10px}
  #infoText{font-size:13px}
  #stage{grid-area:1/2/3/3;margin:-14px 0;min-height:0}
  #tray{grid-area:1/3/3/4;align-self:center;gap:10px}
  #shop{grid-template-columns:repeat(2,1fr);gap:12px 10px}
  .card{padding:10px 4px 8px}
  .card .em{width:64px;height:64px}
  .card .nm{font-size:15px}
  .card .tg{font-size:12px}
  #ctl button{padding:12px 4px;font-size:15px}
  #goBtn{padding:16px 4px;font-size:20px}
  #toast{font-size:22px}
}

/* items */
#bag{display:flex;gap:5px;flex-wrap:wrap;align-items:center}
#bag::before{content:'\uc544\uc774\ud15c';font-size:11px;color:var(--muted);margin-right:2px}
.it{width:40px;height:40px;padding:2px;border-radius:9px;background:var(--panel)}
.it img{width:100%;height:100%;display:block}
.it.on{border-color:var(--gold);box-shadow:0 0 0 2px var(--gold)}
#unBtn{padding:6px 10px;white-space:nowrap}
`}));
document.head.appendChild(Object.assign(document.createElement('style'),{textContent:'.card.leg{background:linear-gradient(#6b4f1e,#2a2140);box-shadow:0 0 10px rgba(255,179,71,.6)}'}));
document.head.appendChild(Object.assign(document.createElement('style'),{textContent:'.tchip.leg{border-color:var(--gold);color:var(--gold)}'}));
document.head.appendChild(Object.assign(document.createElement('style'),{textContent:`
#scene{position:absolute;inset:0;z-index:7;display:flex;align-items:flex-end;justify-content:center;background:linear-gradient(transparent 30%,rgba(8,6,18,.75));padding:12px;padding-bottom:max(16px,env(safe-area-inset-bottom,0px));cursor:pointer}
.sbox{width:100%;max-width:600px;display:flex;gap:12px;align-items:flex-start;background:#1d1830;border:2px solid var(--gold);border-radius:14px;padding:12px 14px;box-shadow:0 8px 30px rgba(0,0,0,.5)}
#sceneFace{width:84px;height:84px;flex:none;background:#2a2440;border-radius:10px;border:1px solid var(--line)}
#scene.nar #sceneFace{display:none}
.stx{flex:1;min-width:0;display:flex;flex-direction:column;gap:4px}
.stx b{font-family:var(--display);font-weight:400;font-size:18px;color:var(--gold)}
#scene.nar .stx b{display:none}
.stx p{margin:0;font-size:15px;line-height:1.65;color:var(--fg)}
#scene.nar .stx p{font-style:italic;color:#d8d2f0}
.stx small{align-self:flex-end;color:var(--muted);font-size:11px}
#sceneSkip{position:absolute;top:max(12px,env(safe-area-inset-top,0px));right:56px;padding:6px 12px;font-size:12px}
body{word-break:keep-all;overflow-wrap:anywhere}
#titleArt{display:block;width:calc(100% + 36px);margin:-18px -18px 10px;border-radius:14px 14px 0 0;image-rendering:pixelated;height:auto}
.sheet h2.title{font-size:28px;margin:4px 0 6px;background:linear-gradient(#fff3c4,#ffc94d);-webkit-background-clip:text;background-clip:text;color:transparent;letter-spacing:1px}
#muteBtn{width:32px;height:32px;border-radius:50%;padding:0;flex:none;display:grid;place-items:center}
#muteBtn .off{display:none}#muteBtn.muted .off{display:inline}#muteBtn.muted .on{display:none}#muteBtn.muted{opacity:.6}
#diff .sheet{position:relative}
#diff .langBtn{position:absolute;top:10px;right:10px;margin:0!important;background:rgba(20,26,46,.75)!important;z-index:2}
.sheet details{border:1px solid var(--line);border-radius:10px;margin:8px 0;padding:0 10px}
.sheet summary{cursor:pointer;padding:9px 0;font-family:var(--display);color:var(--gold);list-style:none}
.sheet summary::-webkit-details-marker{display:none}
.sheet summary::after{content:'+';float:right;color:var(--muted)}
.sheet details[open] summary::after{content:'-'}
`}));
