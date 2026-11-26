/* ---------- English version: a Korean -> English table. The game keeps its Korean data; when LANG is 'en'
   every Korean string in the data objects and the page is swapped through this table once at load.
   LANG: ?lang=en / ?lang=ko, then the saved choice, then the browser language. Loaded after story.js. ---------- */
const LANG=(()=>{try{const q=new URLSearchParams(location.search).get('lang');if(q==='en'||q==='ko'){localStorage.setItem('sebyeol-lang',q);return q;}
  const s=localStorage.getItem('sebyeol-lang');if(s==='en'||s==='ko')return s;}catch(e){}
  return typeof navigator!=='undefined'&&!/^ko/i.test(navigator.language||'ko')?'en':'ko';})();
/* pick the Korean or the English text inline */
function L(ko,en){return LANG==='en'?en:ko;}
/* short race and class labels for the narrow chips and shop cards */
const SHORTN={human:'Sun',beast:'Moon',spirit:'Dawn',gold:'Gold',star:'Star',war:'War',arc:'Archer',mag:'Mage',asn:'Assn'};
function shortN(k){return LANG==='en'&&SHORTN[k]?SHORTN[k]:(RACE[k]||CLS[k]).n;}
function setLang(l){try{localStorage.setItem('sebyeol-lang',l);}catch(e){}location.reload();}
const I18N={
/* races, classes, synergies */
"해별":"Sunstar","달별":"Moonstar","샛별":"Dawnstar","가신":"Retainers","금별":"Goldstar",
"전사":"Warrior","궁수":"Archer","마법사":"Mage","암살자":"Assassin",
"4번째 공격마다 강타(2.5배)와 기절":"Every 4th hit is a smash (2.5x) that stuns",
"강타가 주변 적까지 때림":"The smash also hits nearby enemies",
"강타 범위가 넓어지고 기절이 길어짐":"Wider smash, longer stun",
"4번째 공격마다 두 명을 2배로 쏨":"Every 4th shot hits 2 enemies for 2x",
"4번째 공격마다 세 명을 2배로 쏨":"Every 4th shot hits 3 enemies for 2x",
"4번째 공격마다 사거리 안 모든 적을 쏨":"Every 4th shot hits every enemy in range",
"3번째 공격마다 주변을 폭발":"Every 3rd hit explodes around the target",
"폭발 범위가 넓어짐":"Bigger explosion",
"폭발 범위가 아주 넓어짐":"Much bigger explosion",
"해별의 백성 3종: 전투 시작 때 모든 아군에게 보호막 (체력의 15%)":"People of Sunstar (3): all allies start each battle with a shield (15% of HP)",
"6종: 보호막이 체력의 35%로 커짐":"(6): shield grows to 35% of HP",
"달별의 무리 3종: 달별 공격 속도 +25%, 때린 만큼 15% 회복":"Pack of Moonstar (3): Moonstar units +25% attack speed, heal 15% of damage dealt",
"6종: 공격 속도 +60%, 30% 회복":"(6): +60% attack speed, heal 30%",
"샛별의 물족 3종: 샛별 공격력 +20%, 맞은 적이 느려짐, 쓰러질 때 폭발":"Kin of Dawnstar (3): Dawnstar units +20% damage, hits slow, they explode when they fall",
"6종: 공격력 +50%, 더 느려짐, 폭발 2배":"(6): +50% damage, stronger slow, double explosion",
"전사 받는 피해 -20%, 위급할 때 2초 무적":"Warriors take 20% less damage, 2s invincible when nearly dead",
"전사 받는 피해 -40%, 위급할 때 3.5초 무적":"Warriors take 40% less damage, 3.5s invincible when nearly dead",
"궁수 공격력 +20%, 화살이 옆 적에게 1번 튕김":"Archers +20% damage, arrows bounce once",
"궁수 공격력 +50%, 화살이 2번 튕김":"Archers +50% damage, arrows bounce twice",
"마법사 스킬 +30%, 8초마다 운석이 떨어짐":"Mage skills +30%, a meteor falls every 8s",
"마법사 스킬 +80%, 5초마다 운석이 떨어짐":"Mage skills +80%, a meteor falls every 5s",
"암살자가 25% 확률로 2배 피해":"Assassins deal 2x damage 25% of the time",
"암살자가 50% 확률로 2배 피해":"Assassins deal 2x damage 50% of the time",
"금별의 가신 2종: 모든 아군 공격력 +15%":"Goldstar's Retainers (2): all allies +15% damage",
"4종: 모든 아군 공격력 +35%, 받는 피해 -10%":"(4): all allies +35% damage, take 10% less damage",
/* units */
"떠돌이 검객":"Wandering Blade","늑대":"Wolf","돌팔매 소년":"Sling Boy","도깨비불":"Goblin Flame","사냥매":"Hunting Hawk","젊은 도사":"Young Sage",
"돌도깨비":"Stone Goblin","바람 정령":"Wind Spirit","곰":"Bear","구미호 술사":"Nine-Tail Mystic","신궁":"Divine Archer","번개 정령":"Thunder Spirit",
"그림자 도깨비":"Shadow Goblin","자객":"Night Blade","꼬마 용":"Dragonling","먹표범":"Ink Panther","불도마뱀":"Salamander","별빛 용":"Star Dragon",
"안개 이무기":"Mist Serpent","해별의 무사":"Sun Knight","새벽 용":"Dawn Dragon","달빛 늑대":"Moon Wolf",
"장군 무결":"General Mugyeol","장군 두두리":"General Duduri","장군 백산":"General Baeksan","장군 미르":"General Mireu","장군 가온":"General Gaon","한별":"Hanbyeol",
/* skills */
"회전 베기":"Spin Slash","주변 적을 모두 벰 (2배)":"Slashes all nearby enemies (2x)","범위가 넓어지고 2.3배":"Wider, 2.3x","범위가 더 넓어지고 2.7배":"Even wider, 2.7x",
"물어뜯기":"Maul","3배 피해, 3초간 공격이 빨라짐":"3x damage, attacks faster for 3s","3배 피해, 4초간 빨라짐":"3x damage, faster for 4s","3배 피해, 5초간 빨라짐":"3x damage, faster for 5s",
"바위 던지기":"Rock Throw","2.5배 피해와 1초 기절":"2.5x damage and a 1s stun","2.5배 피해와 1.5초 기절":"2.5x damage and a 1.5s stun","2.5배 피해와 2초 기절":"2.5x damage and a 2s stun",
"불바다":"Sea of Fire","3초 동안 타는 불 장판을 깜":"Leaves burning ground for 3s","불 장판이 넓어짐":"Wider fire","파란 불, 장판이 더 넓어짐":"Blue fire, even wider",
"급강하":"Dive","체력이 가장 낮은 적을 3배로 쪼음":"Pecks the weakest enemy for 3x","3.6배로 쪼음":"Pecks for 3.6x","4.5배로 쪼음":"Pecks for 4.5x",
"얼음 비":"Ice Rain","적 3명을 얼려 느리게 함":"Freezes 3 enemies, slowing them","적 4명을 얼림":"Freezes 4 enemies","적 6명을 얼림":"Freezes 6 enemies",
"돌 갑옷":"Stone Armor","보호막을 두르고 주변 적의 공격을 끌어옴":"Gains a shield and taunts nearby enemies","보호막이 두꺼워짐":"Thicker shield","보호막이 아주 두꺼워짐":"Much thicker shield",
"돌풍":"Gust","적들을 뒤로 밀어냄":"Pushes enemies back","더 멀리 밀어냄":"Pushes them farther","아주 멀리 밀어냄":"Pushes them far away",
"포효":"Roar","주변 적 1초 기절, 체력 15% 회복":"Stuns nearby enemies 1s, heals 15% HP","1.5초 기절, 체력 20% 회복":"1.5s stun, heals 20% HP","2초 기절, 체력 30% 회복":"2s stun, heals 30% HP",
"여우불":"Foxfire","가장 다친 아군을 치료":"Heals the most wounded ally","치료량이 늘어남":"Heals more","치료량이 크게 늘어남":"Heals a lot more",
"관통 화살":"Piercing Arrow","일직선의 적을 모두 꿰뚫음 (3배)":"Pierces every enemy in a line (3x)","3.6배로 꿰뚫음":"Pierces for 3.6x","4.5배로 꿰뚫음":"Pierces for 4.5x",
"연쇄 번개":"Chain Lightning","번개가 적 4명에게 튐":"Lightning jumps to 4 enemies","적 6명에게 튐":"Jumps to 6 enemies","적 9명에게 튐":"Jumps to 9 enemies",
"은신":"Vanish","1.5초 무적, 다음 공격이 3배":"Invincible 1.5s, next hit 3x","2초 무적, 다음 공격이 3.5배":"Invincible 2s, next hit 3.5x","2.5초 무적, 다음 공격이 4.5배":"Invincible 2.5s, next hit 4.5x",
"그림자 베기":"Shadow Strike","적 뒤로 순간이동해 3배 피해. 쓰러뜨리면 곧바로 다시 씀":"Blinks behind an enemy for 3x. Recasts at once on a kill","3.5배 피해":"3.5x damage","4.5배 피해":"4.5x damage",
"불 뿜기":"Fire Breath","앞쪽 부채꼴의 적 모두에게 2.2배":"2.2x to every enemy in a cone ahead","2.6배":"2.6x","3.2배":"3.2x",
"도약":"Pounce","맨 뒤의 적에게 뛰어들어 주변을 할큄 (2.2배, 출혈)":"Leaps to the back line and claws around (2.2x, bleed)","2.6배, 출혈":"2.6x, bleed","3.2배, 출혈":"3.2x, bleed",
"화염구":"Fireball","터지는 불덩이 (주변 2.5배)":"An exploding fireball (2.5x around)","폭발 범위가 더 넓어짐":"Even bigger explosion",
"별똥별":"Shooting Stars","적 3명에게 별이 떨어져 2배 피해와 기절":"Stars fall on 3 enemies: 2x damage and stun","적 4명":"4 enemies","적 6명":"6 enemies",
"급습":"Ambush","체력이 가장 낮은 적에게 날아가 4배 피해":"Flies to the weakest enemy for 4x","5배 피해":"5x damage","6.5배 피해":"6.5x damage",
"심판의 빛":"Light of Judgment","주변 적에게 3배, 모든 아군에게 보호막":"3x to nearby enemies, shields every ally","3.6배, 보호막이 두꺼워짐":"3.6x, thicker shield","4.5배, 보호막이 더 두꺼워짐":"4.5x, even thicker shield",
"용의 숨결":"Dragon's Breath","모든 적을 불태움 (2.2배와 화상)":"Burns every enemy (2.2x and burn)","모든 적에게 2.7배와 화상":"2.7x and burn to every enemy","모든 적에게 3.5배와 화상":"3.5x and burn to every enemy",
"화염 폭풍":"Firestorm","세 곳에 불덩이가 떨어짐. 쓰러져도 한 번 되살아남":"Fireballs fall in three places. Revives once","불덩이가 강해짐":"Stronger fireballs","불덩이가 더 강해짐":"Even stronger fireballs",
"달의 포효":"Moon Howl","모든 아군의 공격이 4초간 빨라지고, 3배로 물어뜯음":"All allies attack faster for 4s, and it bites for 3x","5초간 빨라지고 3.6배":"Faster for 5s, 3.6x","6초간 빨라지고 4.5배":"Faster for 6s, 4.5x",
"별빛 베기":"Starlight Slash","주변 적을 2배로 벰. 장군을 풀어 줄 때마다 범위가 넓어지고 강해짐":"Slashes nearby enemies for 2x. Grows wider and stronger with each freed general","같음":"Same",
"일섬":"Flash Cut","앞에 한 줄로 선 적을 모두 3배로 벰":"Cuts every enemy in the line ahead for 3x","3.6배":"3.6x","4.5배":"4.5x",
"도깨비 방망이":"Goblin Club","적 3명을 내리쳐 2배 피해와 1초 기절":"Smashes 3 enemies: 2x damage and a 1s stun",
"흰 범의 도약":"White Tiger Leap","체력이 가장 낮은 적에게 뛰어들어 4배 피해":"Leaps at the weakest enemy for 4x","5배":"5x","6.5배":"6.5x",
"비구름":"Rain Cloud","모든 적에게 1.6배 피해, 2초간 느려짐":"1.6x to every enemy, slowed for 2s","2배":"2x",
"저승 문":"Underworld Gate","모든 아군에게 보호막(체력 20%), 주변 적을 끌어옴":"Shields every ally (20% HP) and pulls nearby enemies in","보호막 30%":"Shield 30%","보호막 45%":"Shield 45%",
/* enemies */
"좀비":"Zombie","특징 없이 떼로 몰려와요.":"Nothing special. They come in hordes.",
"박쥐":"Bat","빠르고, 맨 뒷줄에 선 유닛부터 덮쳐요. 뒷줄을 지킬 유닛을 두세요.":"Fast, and dives at your back row first. Keep a guard back there.",
"해골 궁수":"Skeleton Archer","멀리서 체력이 가장 낮은 유닛을 쏴요. 치료나 보호막이 좋아요.":"Shoots your weakest unit from afar. Heals and shields help.",
"오우거":"Ogre","튼튼하고, 세 번째 공격마다 주변을 내려찍어요. 뭉쳐 서면 위험해요.":"Tough, and every 3rd hit slams the area. Don't bunch up.",
"방패병":"Shieldbearer","화살과 마법 피해를 절반만 받아요. 전사로 잡으세요.":"Takes half damage from arrows and magic. Use warriors.",
"주술사":"Shaman","뒤에서 다른 적을 치료해요. 먼저 잡아야 해요.":"Heals other enemies from behind. Take it out first.",
"폭탄병":"Bomber","쓰러질 때 터져요. 멀리서 잡거나 흩어져 서세요.":"Explodes when it falls. Kill it from range or spread out.",
"보스":"Boss","체력이 아주 많고 세 번째 공격마다 주변을 휩쓸어요.":"Huge HP, and every 3rd hit sweeps the area.",
/* tactics */
"부자의 금고":"Rich Vault","이자를 최대 8골드까지 받아요. (원래 5)":"Interest caps at 8 gold instead of 5.",
"보급로":"Supply Line","라운드마다 기본 수입이 2골드 늘어요.":"+2 base gold every round.",
"단골 상점":"Regular Customer","새로 뽑기가 1골드로 싸져요.":"Rerolls cost only 1 gold.",
"교관":"Drill Master","라운드마다 경험치를 2 더 받아요. 레벨이 빨리 올라요.":"+2 XP every round. Level up faster.",
"철벽":"Iron Wall","앞줄 유닛이 받는 피해가 25% 줄어요. (원래 10%)":"Front row takes 25% less damage (normally 10%).",
"저격 진지":"Sniper Nest","뒷줄 유닛의 공격력이 30% 올라요. (원래 10%)":"Back row deals 30% more damage (normally 10%).",
"숙련":"Veterans","모든 유닛이 스킬을 공격 1번 더 빨리 써요.":"All units cast their skill one attack sooner.",
"불굴":"Undying","전투마다 처음 쓰러지는 아군 한 명이 체력 절반으로 다시 일어나요.":"Each battle, the first ally to fall gets back up with half HP.",
"수호의 깃발":"Guardian Banner","전투 시작 때 모든 아군이 체력 20%만큼 보호막을 받아요.":"All allies start each battle with a 20% HP shield.",
"소수 정예":"Elite Few","놓을 수 있는 수보다 2명 이상 적게 놓으면 모두 체력·공격력 +35%.":"Field 2+ fewer units than allowed: all get +35% HP and damage.",
"야전 병원":"Field Hospital","전투에서 져도 체력이 40% 덜 깎여요.":"Lose 40% less HP when you lose a battle.",
"별의 축복":"Star Blessing","별 2개 이상인 유닛의 공격력이 20% 올라요.":"Units with 2+ stars deal 20% more damage.",
"전리품":"Spoils","지금 바로 12골드를 받아요.":"Get 12 gold right now.",
"혼성 부대":"Mixed Troop","켜진 조합 하나마다 모든 아군의 공격 속도가 6% 빨라져요.":"+6% attack speed for all allies per active synergy.",
/* difficulty, items, legends */
"보통":"Normal","어려움":"Hard","지옥":"Hell",
"명검":"Fine Sword","공격력 +60%.":"+60% damage.","강철 갑옷":"Steel Armor","체력 +70%.":"+70% HP.","질풍 장갑":"Gale Gloves","공격 속도 +60%.":"+60% attack speed.",
"마법서":"Spellbook","스킬을 공격 2번 더 빨리 써요.":"Casts the skill two attacks sooner.","흡혈 송곳니":"Vampire Fang","때린 피해의 45%만큼 회복해요.":"Heals 45% of damage dealt.",
"수호 방패":"Guard Shield","받는 피해 -40%.":"-40% damage taken.","망원경":"Spyglass","사거리 +2, 공격력 +35%.":"+2 range, +35% damage.",
"수호 부적":"Ward Charm","전투 시작 때 체력 80% 보호막.":"Starts each battle with an 80% HP shield.","날카로운 발톱":"Sharp Claw","50% 확률로 2배 피해.":"50% chance to deal 2x damage.",
"해별의 가호":"Sunstar's Grace","모든 아군이 받는 피해 -10%":"All allies take 10% less damage","샛별의 가호":"Dawnstar's Grace","모든 아군의 공격력 +12%":"All allies +12% damage",
"달별의 가호":"Moonstar's Grace","모든 아군의 공격 속도 +12%":"All allies +12% attack speed",
/* memories, regions */
"하늘에 별이 넷이었다. 어릴 때 본 빈 자리는 헛것이 아니었다.":"There were four stars in the sky. The empty spot I saw as a child was real.",
"그 네 번째 별이 가장 밝았다. 모두가 웃던 잔칫날.":"That fourth star was the brightest. A feast day when everyone laughed.",
"그 별이 떨어지던 밤. 등 뒤에서 밀던 세 개의 손.":"The night that star fell. Three hands pushing from behind.",
"세 별이 떨어진 별의 빛을 셋으로 쪼개 삼키던 장면.":"The three stars splitting the fallen star's light in three and swallowing it.",
"장군들이 어둠 속까지 곁을 지킨 세월. 그 별이 바로 나였다.":"Years of generals standing by her, even into the dark. That star was me.",
"들머리 고을":"Gateway Village","도깨비 숲":"Goblin Woods","눈 고개":"Snow Pass","이무기 못":"Serpent Pond","저승 문턱":"Underworld Gate",
"금별이 다스리던 첫 고을. 검의 장군 무결이 지킨다.":"The first village Goldstar ruled. Guarded by Mugyeol, General of the Sword.",
"웃음을 잃은 도깨비들의 숲. 방망이의 장군 두두리가 기다린다.":"A wood of goblins who lost their laughter. Duduri, General of the Club, waits.",
"얼어붙은 산길. 흰 범 백산이 길을 막는다.":"A frozen mountain road. Baeksan the White Tiger blocks the way.",
"용이 되지 못한 이무기의 못. 비의 장군 미르가 잠겨 있다.":"The pond of a serpent that never became a dragon. Mireu, General of Rain, lies beneath.",
"저승으로 가는 마지막 문. 문의 장군 가온과 흑화된 금별이 있다.":"The last gate to the underworld. Gaon, General of the Gate, and the darkened Goldstar wait.",
/* story speakers and lines */
"해별의 제자":"Sunstar's disciple","달별의 제자":"Moonstar's disciple","샛별의 제자":"Dawnstar's disciple",
"무결":"Mugyeol","두두리":"Duduri","백산":"Baeksan","미르":"Mireu","가온":"Gaon","흑화된 금별":"Darkened Goldstar","세 별":"The Three Stars",
"하늘에는 별이 셋 떠 있었다. 해별, 달별, 샛별. 사람들은 그렇게 알고 있었다.":"Three stars hung in the sky. Sunstar, Moonstar, Dawnstar. That is what people believed.",
"어느 밤, 세 별이 하늘에서 떨어졌다. 저승 문이 열리고 어둠이 쏟아졌다.":"One night the three stars fell from the sky. The underworld gate opened and darkness poured out.",
"...또 보여. 별 셋 사이에 비어 있는 자리.":"...I see it again. An empty spot between the three stars.",
"한별! 넋 놓고 있을 때가 아니야. 해별님 조각을 찾으러 가야지.":"Hanbyeol! No time to daydream. We have to find Lady Sunstar's shard.",
"달별님도, 샛별님도. 조각 셋이 모이면 별이 다시 뜬대.":"Moonstar's and Dawnstar's too. They say the stars rise again when the three shards meet.",
"저승 문으로 가는 길에 옛 고을이 다섯 있어요. 거기서부터예요.":"There are five old villages on the road to the underworld gate. We start there.",
"좋아. 같이 가자.":"Alright. Let's go together.",
"멈춰라. 이 고을은 아무도 지나지 못한다.":"Halt. No one passes through this village.",
"약한 것은 다 벤다. 그날, 우리가 약해서 주군을 잃었으니.":"I cut down all that is weak. That day, we lost our lord because we were weak.",
"주군...?":"Your lord...?",
"이 빛은... 설마, 당신이...":"This light... could it be, you are...",
"기억하지 못하는군요. 그럼 이 칼을 가져가십시오. 언젠가 알게 되실 겁니다.":"You don't remember. Then take this sword. One day you will understand.",
"기억 한 조각: 하늘에 별이 넷이었다. 어릴 때 본 빈 자리는 헛것이 아니었다.":"A shard of memory: There were four stars in the sky. The empty spot I saw as a child was real.",
"그날 밤, 모닥불 앞.":"That night, by the campfire.",
"장군이라더니 왜 한별한테만 칼을 줬지?":"Some general. Why did he give his sword only to Hanbyeol?",
"한별 얼굴이 마음에 들었나 보지.":"Guess he liked Hanbyeol's face.",
"...별이 넷이었대. 나 어릴 때부터 그 자리가 보였거든.":"...He said there were four stars. I've seen that spot since I was little.",
"넷이요? 물족 어르신들 옛이야기에 그런 말이 있긴 해요.":"Four? The elders of my folk do tell an old tale like that.",
"헤헤... 아니, 안 웃겨. 이제 아무것도 안 웃겨.":"Hehe... no, it's not funny. Nothing is funny anymore.",
"우리 별님이 없는데 뭐가 웃기겠어. 너희도 여기 갇혀 있어라.":"Our star is gone, so what's there to laugh at? You stay trapped here too.",
"...이 따뜻한 빛. 별님이 웃으실 때 이랬는데.":"...This warm light. It felt like this when our star smiled.",
"기억 한 조각: 그 네 번째 별이 가장 밝았다. 모두가 웃던 잔칫날.":"A shard of memory: That fourth star was the brightest. A feast day when everyone laughed.",
"저 도깨비들, 원래는 누구를 모셨던 걸까.":"Who did those goblins serve, I wonder.",
"달별님은 아니겠지. 달별님 숲에 저런 애들은 없었어.":"Not Lady Moonstar. There were none like them in her woods.",
"(가장 밝았던 별... 왜 내가 그걸 기억하지?)":"(The brightest star... why do I remember that?)",
"크르르... 춥다. 배고프다. 별이 없는 밤은 너무 길다.":"Grrr... Cold. Hungry. A night without stars is far too long.",
"...그날 밤도 이렇게 어두웠다. 세 개의 빛이 그분을 밀었다.":"...That night was this dark too. Three lights pushed her.",
"기억 한 조각: 그 별이 떨어지던 밤. 등 뒤에서 밀던 세 개의 손.":"A shard of memory: The night that star fell. Three hands pushing from behind.",
"한별, 요즘 말이 없어요.":"Hanbyeol, you've been quiet lately.",
"...아무것도 아니야. 피곤해서 그래.":"...It's nothing. I'm just tired.",
"한별은 그 손이 누구의 것인지 알았다. 하지만 말하지 못했다.":"Hanbyeol knew whose hands they were. But he couldn't say it.",
"오래 기다렸습니다. 그 빛, 잊을 리가 없지요.":"I have waited long. How could I forget that light?",
"제자들이여, 저 벽화를 보아라. 너희가 모시는 세 별이 이분께 무슨 짓을 했는지.":"Disciples, look at that mural. See what the three stars you serve did to her.",
"...거짓말이야. 해별님이 그럴 리 없어.":"...That's a lie. Lady Sunstar would never.",
"부정하지 않으시는군요. 그럼 그 빛, 제가 받아 가겠습니다.":"You don't deny it. Then I will take that light from you.",
"용이 되고 싶었습니다. 훔친 빛으로라도. 부끄럽습니다.":"I wanted to become a dragon. Even with stolen light. I am ashamed.",
"기억 한 조각: 세 별이 떨어진 별의 빛을 셋으로 쪼개 삼키던 장면.":"A shard of memory: The three stars splitting the fallen star's light in three and swallowing it.",
"그날 밤, 모닥불 앞에는 한별 혼자 앉아 있었다.":"That night, Hanbyeol sat alone by the campfire.",
"저승 문턱. 아침이 밝자 한별은 혼자 떠날 채비를 했다.":"The underworld's edge. At dawn, Hanbyeol got ready to leave alone.",
"어디 가. 짐은 같이 싸야지.":"Where are you going? We pack together.",
"신이 잘못했으면, 제자가 바로잡는 거야.":"If our gods did wrong, it's on their disciples to set it right.",
"우리도 끝까지 갈게요. 친구니까요.":"We're going to the end too. We're friends.",
"...고마워.":"...Thank you.",
"주군 외에는 아무도 이 문을 지나지 못한다.":"None but my lord may pass this gate.",
"...그 눈빛. 돌아오셨군요. 그래도 이 문은 지켜야 합니다. 그분이 아직 저 안에 계시니.":"...Those eyes. You have returned. Still, I must guard this gate. She is still inside.",
"저희는 끝까지 곁에 있었습니다. 어둠 속에서도.":"We stayed by your side to the end. Even in the dark.",
"기억 한 조각: 장군들이 어둠 속까지 곁을 지킨 세월. 그 별이 바로 나였다.":"A shard of memory: Years of generals standing by her, even into the dark. That star was me.",
"...내가 금별이었구나.":"...I was Goldstar.",
"왔구나. 빛만 가진 나.":"You came. The me that kept only the light.",
"너희가 들고 온 그 빛이, 나를 떨어뜨린 빛이다.":"The light you carry is the light that cast me down.",
"알아. 그래도 여기까지 같이 왔어. 이 친구들이랑.":"I know. Even so, we came this far together. Me and my friends.",
"...나는 배신당한 기억만 가졌는데. 너는 무엇을 가졌지?":"...All I kept was the memory of betrayal. What did you keep?",
"친구.":"Friends.",
"한별은 어둠을 받아들였다. 둘은 하나가 되었고, 찬란한 금별이 다시 떠올랐다.":"Hanbyeol embraced the darkness. The two became one, and radiant Goldstar rose again.",
"...잘못했습니다. 당신의 빛이 부러웠습니다. 그래서 훔쳤습니다.":"...We were wrong. We envied your light. So we stole it.",
"제자들이 먼저 무릎을 꿇었다. 세 별이 그 뒤를 따라 빛을 내어놓았다.":"The disciples knelt first. The three stars followed and gave back the light.",
"다 받지는 않겠다. 너희가 다시 빛날 만큼은 남겨 두마.":"I won't take it all. I'll leave you enough to shine again.",
"혼돈 속에 있을 때 보았다. 나보다 훨씬 오래되고 큰 어둠을. 내가 문을 열었을 때, 그것도 눈을 떴다.":"In the chaos I saw it. A darkness far older and greater than me. When I opened the gate, it opened its eyes too.",
"이제 넷이서 막아야 한다.":"Now the four of us must hold it back.",
"저승 문 깊은 곳에서, 무언가 움직였다.  — 시즌 1 끝 —":"Deep beyond the underworld gate, something stirred.  — End of Season 1 —",
/* page text */
"세별 수호대":"Star Guardians","라운드":"Round","규칙":"Rules","배치 1/3":"Units 1/3","아이템 빼기":"Remove items","판매":"Sell",
"새로 뽑기":"Reroll","레벨업":"Level up","잠금":"Lock","전투 시작":"Fight!","건너뛰기":"Skip","눌러서 계속":"Tap to continue",
"하늘에서 가장 찬란하던 금별을 세 별이 시기해 떨어뜨렸어요. 잊힌 금별은 그믐별이 되어 복수했고, 저승 문이 열렸어요. 금별의 환생인 줄 모르는 소년 한별이 세 별의 제자들과 함께 다섯 고을을 넘어요.":
  "Goldstar was the brightest star in the sky, until three jealous stars cast her down. Forgotten, she turned into a dark star and took her revenge, and the underworld gate opened. Hanbyeol, a boy who doesn't know he is Goldstar reborn, sets out with the disciples of the three stars to cross five villages.",
"난이도를 고르세요":"Choose a difficulty","처음 해 보는 분께 맞아요.":"Good for your first run.","조합과 전술을 맞춰야 깰 수 있어요.":"You'll need the right synergies and tactics.",
"돈 관리, 자리, 적 대응까지 다 맞아야 해요.":"Gold, positioning and counters all have to be right.",
"전술을 하나 고르세요":"Choose a tactic","고른 전술은 이번 판이 끝날 때까지 이어져요.":"Your tactic lasts until the end of this run.",
"세별 수호대 규칙":"How to play","유닛과 스킬":"Units and skills","유닛마다 고유 스킬이 있어요. 체력 아래 파란 막대가 차면 스킬을 써요. 별이 오르면 스킬도 강해져요.":
  "Every unit has its own skill. It casts when the blue bar under its HP fills. More stars, stronger skill.",
"닫기":"Close","다시 하기":"Play again",
"사기":"Buy",": 아래 상점에서 유닛을 눌러 사요. 산 유닛은 대기석(맨 아랫줄)에 들어와요.":": Tap a unit in the shop below. It goes to your bench (the bottom row).",
"놓기":"Place",": 유닛을 끌어서 밝은 칸에 놓아요. 레벨만큼만 놓을 수 있어요.":": Drag units onto the bright tiles. You can field as many as your level.",
"합치기":"Merge",": 같은 유닛 3개를 모으면 별 2개로, 별 2개짜리 3개면 별 3개로 자동으로 합쳐져요. 별이 오르면 몸집이 커지고 은빛·금빛 후광이 생기며 스킬도 강해져요.":
  ": Three of the same unit merge into a 2-star; three 2-stars make a 3-star. Stars bring a bigger body, a silver or gold halo and a stronger skill.",
": 주인공이에요. 처음부터 판에 있고 팔 수 없어요. 장군을 풀어 줄 때마다 강해지고 모습이 바뀌어요.":": The hero. He starts on the board and can't be sold. He grows stronger and changes with every general you free.",
"장군":"Generals",": 10, 20, 30, 40, 45라운드에 금별의 장군이 흑화된 채 나와요. 이기면 어둠에서 풀려나 상점에 나와요. 지면 다음 라운드로 못 가고, 이길 때까지 다시 싸워요.":
  ": At rounds 10, 20, 30, 40 and 45, one of Goldstar's generals appears, corrupted. Win and they are freed and join the shop. Lose and you fight them again until you win.",
"조합":"Synergies",": 종족(해별의 백성, 달별의 무리, 샛별의 물족)은 서로 다른 유닛 3종, 6종, 직업과 금별의 가신은 2종, 4종을 모으면 특수 능력이 생겨요. 위쪽 칩을 누르면 어떤 능력인지 나와요. 조합이 켜진 유닛은 금색 테두리가 생겨요.":
  ": Field 3 or 6 different units of a race (Sunstar, Moonstar, Dawnstar), or 2 or 4 of a class or of Goldstar's Retainers, to unlock bonuses. Tap the chips at the top to see them. Units with an active synergy get a gold outline.",
"전투":"Battle",": 전투 시작을 누르면 알아서 싸워요. 45초 안에 적을 다 잡으면 이겨요.":": Press Fight! and they battle on their own. Defeat every enemy within 45 seconds to win.",
"돈":"Gold",": 라운드마다 5골드에, 가진 돈 10골드마다 이자 1골드(최대 5), 연승·연패 보너스가 붙어요.":": 5 gold each round, plus 1 interest per 10 gold you hold (max 5), plus win and loss streak bonuses.",
"팔기":"Sell",": 유닛을 상점 쪽으로 끌어다 놓거나, 유닛을 누른 뒤 판매를 눌러요.":": Drag a unit onto the shop, or tap it and press Sell.",
"자리":"Rows",": 앞줄(방어선 쪽)은 받는 피해가 줄고, 뒷줄은 공격력이 올라요.":": The front row (by the barricade) takes less damage; the back row deals more.",
"적의 버릇":"Enemy habits",": 준비 시간에 위쪽에 이번에 올 적이 보여요. 누르면 버릇이 나와요. 박쥐는 뒷줄을 덮치고, 방패병은 화살과 마법에 강해요. 적에 맞춰 자리와 조합을 바꾸세요.":
  ": The next enemies are shown at the top while you prepare. Tap them to see their habits. Bats dive your back row; shieldbearers shrug off arrows and magic. Adapt your rows and synergies.",
"아이템":"Items",": 아이템은 보스를 잡았을 때만 나와요(5라운드마다). 아이템을 누른 뒤 유닛을 누르면 장착돼요. 유닛 하나에 2개까지예요.":
  ": Items drop only from bosses (every 5 rounds). Tap an item, then a unit, to equip it. Up to 2 per unit.",
"전술":"Tactics",": 3라운드부터 4라운드마다 전술 3개 중 1개를 골라요. 판이 끝날 때까지 이어져요.":": From round 3, every 4 rounds, choose 1 of 3 tactics. They last the whole run.",
"전설 유닛":"Legendary units",": 5골드짜리 전설 유닛 4종은 레벨 7부터 아주 드물게 상점에 나와요(레벨 9에서도 4%). 금빛 카드로 보여요. 전설 유닛은 판에 놓기만 해도 혼자서 켜지는 고유 조합이 있어요.":
  ": Four 5-gold legends appear rarely from level 7 (4% even at level 9), shown as gold cards. Each has its own synergy that turns on by itself.",
"50라운드를 버티면 이겨요. 5라운드마다 보스가 나와요.":"Survive 50 rounds to win. A boss comes every 5 rounds."
};
/* swap every Korean string inside the game's data objects, in place (U shares the UNITS objects) */
function i18nWalk(o){if(!o||typeof o!=='object')return;for(const k in o){const v=o[k];if(typeof v==='string'){if(I18N[v]!==undefined)o[k]=I18N[v];}else i18nWalk(v);}}
if(LANG==='en'){
  for(const o of [RACE,CLS,SYN,UNITS,SK,EN,TAC,DIFF,ITEMS,LEG,MEM,MAPN,MAPT,SPK,SCENES])i18nWalk(o);
  document.documentElement.lang='en';document.title=I18N[document.title]||document.title;
  const tw=document.createTreeWalker(document.getElementById('app'),NodeFilter.SHOW_TEXT);const ns=[];while(tw.nextNode())ns.push(tw.currentNode);
  for(const n of ns){const t=n.nodeValue.trim();if(t&&I18N[t]!==undefined)n.nodeValue=n.nodeValue.replace(t,I18N[t]);}
  for(const e of document.querySelectorAll('[aria-label]')){const t=e.getAttribute('aria-label');if(I18N[t])e.setAttribute('aria-label',I18N[t]);}
  {const st=document.createElement('style');st.textContent='html[lang=en] .nm{white-space:normal;line-height:1.05;font-size:11.5px;text-overflow:clip}html[lang=en] .chip{font-size:11px}';document.head.appendChild(st);}
  const hb=document.querySelector('#help li:nth-child(4) b');if(hb)hb.textContent='Hanbyeol';
}
/* language switch on the start screen and in the rules */
if(typeof document.querySelector==='function')for(const id of ['diff','help']){const sh=document.querySelector('#'+id+' .sheet');if(!sh)continue;const b=document.createElement('button');b.type='button';b.className='langBtn';
  b.textContent=LANG==='en'?'한국어':'English';b.style.cssText='float:right;margin:0 0 6px 8px;padding:4px 10px;border-radius:10px;border:1px solid #6a7ab8;background:#232b4d;color:#dfe6ff;font:inherit;font-size:13px';
  b.onclick=()=>setLang(LANG==='en'?'ko':'en');sh.insertBefore(b,sh.firstChild);}
