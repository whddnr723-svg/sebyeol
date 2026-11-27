/* ---------- attack motions (ASCII only): which weapon each sprite uses, three moves per weapon,
   and the sprites that have strike frames ---------- */
/* weapon of each sprite id */
const WEAPON={hanbyeol:'blade',sword:'blade',sling:'sling',mage:'staff',archer:'bow',ninja:'dagger',paladin:'blade',mugyeol:'blade',geumbyeol:'none',grunt:'none',skull:'bow',ogre:'club',shield:'blade',shaman:'staff',wolf:'claw',bear:'claw',fox:'fire',panther:'stalk',hawk:'talon',wolfking:'stalk',ember:'fire',rock:'club',shade:'shadow',wind:'wind',bolt:'bolt',whelp:'blade',salam:'salam',stardrake:'drake',wyvern:'serpent',elder:'drake',duduri:'club',baeksan:'stalk',mireu:'drake',gaon:'blade',bat:'claw',boss5:'claw',boss10:'club',boss15:'blade',boss20:'blade'};
/* three attack moves per weapon, used in turn: pose = body motion (fx.js atkPose), hit = mark on the target, keys = frames over the attack */
const MOVES={
  blade:[{pose:'slash',hit:'slash',keys:[[.14,8],[.3,2],[.42,6],[.68,5],[1,9]]},
    {pose:'thrust',hit:'spark',keys:[[.3,'32,30,-0.05,'],[.5,'45,28,-0.05,T'],[.78,'45,28,-0.05,'],[1,'42,32,-0.6,']]},
    {pose:'slash',hit:'slash',keys:[[.28,'40,38,1.25,'],[.45,'45,30,-0.2,U'],[.72,'42,22,-1.0,U'],[1,'38,30,-1.2,']]}],
  club:[{pose:'smash',hit:'slash',keys:[[.14,8],[.3,2],[.42,6],[.68,5],[1,9]]},
    {pose:'slash',hit:'slash',keys:[[.3,'30,30,2.6,'],[.48,'46,30,0.1,H'],[.75,'44,34,0.6,'],[1,'40,34,-0.8,']]},
    {pose:'smash',hit:'ring',keys:[[.4,'36,12,-1.45,'],[.55,'44,30,0.9,D'],[.85,'44,34,1.35,G'],[1,'40,33,-0.6,']]}],
  claw:[{pose:'punch',hit:'claw',keys:[[.35,2],[1,5]]},
    {pose:'pounce',hit:'bite',keys:[[.35,2],[1,11]]},
    {pose:'pounce',hit:'claw',keys:[[.25,'40,22,-1.3,'],[.5,'46,34,1.0,C'],[.7,'40,20,-1.3,'],[1,'46,34,1.0,C']]}],
  dagger:[{pose:'thrust',hit:'spark',keys:[[.3,'34,30,0,'],[.6,'48,28,0,T'],[1,'40,32,-0.8,']]},
    {pose:'slash',hit:'slash',keys:[[.3,'34,22,-2.4,'],[.55,'46,32,0.7,D'],[1,'42,34,1.2,']]},
    {pose:'thrust',hit:'spark',keys:[[.2,'34,30,0,'],[.4,'48,26,-0.1,T'],[.6,'34,32,0,'],[.8,'48,32,0.1,T'],[1,'40,32,-0.8,']]}],
  staff:[{pose:'cast',keys:[[.35,2],[1,5]]},
    {pose:'cast',keys:[[.4,'38,27,-1.4,S'],[1,'38,25,-1.4,SS']]},
    {pose:'cast',keys:[[.25,'40,28,-0.8,'],[.5,'40,28,0,'],[.75,'40,28,0.8,'],[1,'40,30,-1.57,S']]}],
  bow:[{pose:'shoot',keys:[[.35,2],[1,5]]},
    {pose:'shoot',keys:[[.45,'40,26,-0.6,B'],[1,'40,26,-0.6,']]},
    {pose:'shoot',keys:[[.2,'40,32,0,B'],[.45,'40,32,0,'],[.65,'40,32,0,B'],[1,'40,32,0,']]}],
  sling:[{pose:'shoot',keys:[[.35,2],[1,5]]},
    {pose:'shoot',keys:[[.2,'38,14,-2,W'],[.4,'38,14,0,W'],[.6,'38,14,2,W'],[1,'46,24,-0.3,T']]},
    {pose:'shoot',keys:[[.45,'36,42,2.2,'],[1,'46,30,-0.6,T']]}],
  none:[{pose:'punch',hit:'ring',keys:[[.35,'33,30,0,'],[1,'48,28,0,T']]},
    {pose:'punch',hit:'ring',keys:[[.35,'30,24,0,'],[1,'46,24,0,H']]},
    {pose:'pounce',hit:'claw',keys:[[.4,'38,16,0,'],[1,'45,36,0,C']]}]};
MOVES.fist=MOVES.none;
Object.assign(MOVES,{
  fire:[{pose:'cast',keys:[[.35,'34,26,-0.3,fb'],[1,'47,28,0,fb2+T']]},
    {pose:'cast',keys:[[.4,'38,22,-1.2,gather'],[1,'40,30,-0.5,burst']]},
    {pose:'cast',keys:[[.33,'40,26,-1,ring'],[.66,'40,26,0,ring+fb'],[1,'46,28,0,fb2']]}],
  bolt:[{pose:'cast',keys:[[.3,'36,26,0,'],[1,'46,28,0,zap']]},
    {pose:'cast',keys:[[.45,'38,12,-1.57,gather'],[1,'46,24,0.3,zapd']]},
    {pose:'cast',keys:[[.35,'36,30,0,'],[1,'46,30,0,zap+burst']]}],
  drake:[{pose:'cast',keys:[[.35,'38,30,0,gather'],[1,'38,32,0,breath']]},
    {pose:'cast',keys:[[.5,'40,18,-1.2,gather'],[1,'46,26,0,fb2']]},
    {pose:'pounce',hit:'claw',keys:[[.35,'40,20,-1.3,'],[1,'46,34,1,C']]}],
  salam:[{pose:'shoot',keys:[[.35,'36,30,0,'],[1,'38,32,0,spit']]},
    {pose:'cast',keys:[[.35,'38,30,0,gather'],[1,'38,32,0,breath']]},
    {pose:'slash',keys:[[.4,'36,30,0,'],[1,'36,30,0,tail']]}],
  talon:[{pose:'shoot',keys:[[.35,'40,22,-1,'],[1,'44,28,0,feath']]},
    {pose:'swoop',hit:'claw',keys:[[.4,'40,20,-1.3,'],[1,'46,34,1,C']]},
    {pose:'pounce',hit:'claw',keys:[[.4,'44,36,1,'],[1,'46,24,-0.5,C']]}],
  wind:[{pose:'shoot',keys:[[.35,'34,24,-0.5,'],[1,'46,28,0,wblade']]},
    {pose:'shoot',keys:[[.35,'36,30,0,'],[1,'46,30,0,gust']]},
    {pose:'cast',keys:[[.5,'40,26,0,ring'],[1,'46,28,0,ring+gust']]}],
  shadow:[{pose:'slash',hit:'claw',keys:[[.35,'40,22,-1.3,'],[1,'46,34,1,C']]},
    {pose:'thrust',hit:'slash',keys:[[.4,'36,30,0,smoke'],[1,'48,30,0,smoke+T']]},
    {pose:'smash',hit:'ring',keys:[[.4,'38,24,-1,'],[1,'44,36,1.2,gs']]}],
  serpent:[{pose:'lunge',hit:'bite',keys:[[.35,'36,28,0,'],[1,'44,32,0.3,']]},
    {pose:'slash',hit:'slash',keys:[[.4,'36,30,0,'],[1,'36,30,0,tail']]},
    {pose:'lunge',hit:'ring',keys:[[.5,'42,30,0,W'],[1,'42,30,0,W+T']]}],
  stalk:[{pose:'leap',hit:'claw',keys:[[.25,'38,36,0.5,'],[.75,'40,20,-1.3,'],[1,'46,34,1,C']]},
    {pose:'lunge',hit:'bite',keys:[[.35,'36,30,0,'],[1,'44,32,0.3,']]},
    {pose:'leap',hit:'claw',keys:[[.25,'38,36,0.5,'],[.5,'40,22,-1.3,'],[.75,'46,34,1.0,C'],[1,'46,34,1.0,C']]}]});
MOVES.dagger=[{pose:'thrust',hit:'spark',keys:[[.3,'34,30,0,'],[.6,'48,28,0,T'],[1,'40,32,-0.8,']]},
  {pose:'blink',hit:'slash',keys:[[.3,'34,30,0,smoke'],[.55,'46,32,0.7,D'],[1,'42,34,1.2,']]},
  {pose:'shoot',hit:'shuriken',keys:[[.35,'34,22,-0.6,'],[1,'48,26,0,T']]}];
MOVES.shadow[0].pose='blink';MOVES.shadow[1].pose='blink';
/* the move for the n-th attack (n counts from 1) and its frame at point k */
function moveOf(id,n){const mv=MOVES[WEAPON[id]||'blade']||MOVES.blade;return mv[Math.max(0,(n||1)-1)%mv.length];}
function moveFrame(id,n,k){const m=moveOf(id,n);for(const q of m.keys)if(k<=q[0])return q[1];return m.keys[m.keys.length-1][1];}
/* sprites with strike frames: every character except the bomber */
const STRIKE={};for(const k in WEAPON)STRIKE[k]=1;
