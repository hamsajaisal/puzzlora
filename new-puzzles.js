/* Six animated Puzzlora games. Loaded before the main app script. */
function gameText(en,ml){return currentLang==='en'?en:ml;}

function hungryMonsterPuzzle(){return{
  id:'hungry-monster',emoji:'👾',name:'Hungry Monster',
  desc:{en:'Catch walking numbers and feed the exact total',ml:'നടക്കുന്ന സംഖ്യകളെ പിടിച്ച് കൃത്യമായ തുക നൽകൂ'},
  how:{en:'<p>The monster wants an <b>exact total</b>. Tap walking numbers to feed it. Some briefly hide!</p>',ml:'<p>മോൺസ്റ്ററിന് <b>കൃത്യമായ തുക</b> വേണം. നടക്കുന്ന സംഖ്യകളിൽ തൊടൂ. ചിലത് ഇടയ്ക്ക് ഒളിക്കും!</p>'},
  mount(area){
    const target=rint(9,18),a=rint(2,target-4),nums=shuffle([a,target-a,rint(1,8),rint(2,9),rint(1,7)]);let total=0,done=false;
    area.appendChild(el('p','pz-goal',gameText('Feed me exactly <span class="big">'+target+'</span>!','എനിക്ക് കൃത്യമായി <span class="big">'+target+'</span> തരൂ!')));
    const hud=el('div','game-hud'),tally=el('span','game-chip','🍽️ 0 / '+target);hud.appendChild(tally);area.appendChild(hud);
    const stage=el('div','game-stage'),mon=el('div','monster','👾');stage.appendChild(mon);area.appendChild(stage);
    nums.forEach((n,i)=>{const b=el('button','number-critter'+(i%3===0?' hidey':''),n);b.style.left=(7+i*19)+'%';b.style.top=(25+(i%2)*64)+'px';b.style.setProperty('--speed',(5+i%3)+'s');b.addEventListener('click',()=>{if(done||b.classList.contains('eaten'))return;total+=n;b.classList.add('eaten');tally.textContent='🍽️ '+total+' / '+target;mon.classList.add('chew');setTimeout(()=>mon.classList.remove('chew'),600);if(total===target){done=true;mon.textContent='😋';mon.classList.add('happy');win(gameText('Perfect meal! The monster is delighted! 👾🎉','കൃത്യമായ ഭക്ഷണം! മോൺസ്റ്റർ സന്തോഷിച്ചു! 👾🎉'));}else if(total>target){total-=n;b.classList.remove('eaten');tally.textContent='🍽️ '+total+' / '+target;mon.textContent='😵';lose(gameText('Too much! Try a smaller number.','കൂടിപ്പോയി! ചെറിയ സംഖ്യ പരീക്ഷിക്കൂ.'));setTimeout(()=>mon.textContent='👾',900);}});stage.appendChild(b);});
  }
};}

function balloonPuzzle(){return{
  id:'balloon-pop',emoji:'🎈',name:'Balloon Pop',
  desc:{en:'Pop the balloons that follow the number rule',ml:'സംഖ്യാ നിയമം പാലിക്കുന്ന ബലൂണുകൾ പൊട്ടിക്കൂ'},
  how:{en:'<p>Pop every balloon that follows the rule. There is no timer, so think before you tap!</p>',ml:'<p>നിയമം പാലിക്കുന്ന എല്ലാ ബലൂണുകളും പൊട്ടിക്കൂ. സമയപരിധിയില്ല.</p>'},
  mount(area){
    const even=Math.random()<.5,good=[],bad=[];while(good.length<4){const n=rint(2,24);if((n%2===0)===even&&!good.includes(n))good.push(n);}while(bad.length<4){const n=rint(1,23);if((n%2===0)!==even&&!bad.includes(n))bad.push(n);}let left=4,done=false;
    area.appendChild(el('p','pz-goal',gameText('Pop all the <span class="big">'+(even?'even':'odd')+' numbers</span>!','എല്ലാ <span class="big">'+(even?'ഇരട്ട':'ഒറ്റ')+' സംഖ്യകളും</span> പൊട്ടിക്കൂ!')));
    const stage=el('div','balloon-stage'),colors=['#FF8A3D','#FFC53D','#10B487','#7C5CE0','#EE78A8','#67B8FF'];area.appendChild(stage);
    shuffle(good.concat(bad)).forEach((n,i)=>{const b=el('button','balloon',n);b.style.left=(4+(i%4)*24)+'%';b.style.top=(-(i%3)*95)+'px';b.style.setProperty('--balloon',colors[i%colors.length]);b.style.setProperty('--speed',(8+i%4)+'s');b.style.animationDelay=(-i*1.1)+'s';b.addEventListener('click',()=>{if(done||b.classList.contains('pop'))return;if((n%2===0)===even){b.classList.add('pop');if(--left===0){done=true;win(gameText('Every correct balloon popped! 🎈✨','എല്ലാ ശരിയായ ബലൂണുകളും പൊട്ടിച്ചു! 🎈✨'));}}else{markBad(b);lose(gameText('That balloon does not follow the rule.','ആ ബലൂൺ നിയമം പാലിക്കുന്നില്ല.'));}});stage.appendChild(b);});
  }
};}

function pizzaPuzzle(){return{
  id:'pizza-maker',emoji:'🍕',name:'Fraction Pizza Maker',
  desc:{en:'Add toppings to make the ordered fraction',ml:'ഓർഡർ ചെയ്ത ഭിന്നസംഖ്യയ്ക്ക് ടോപ്പിംഗ് ചേർക്കൂ'},
  how:{en:'<p>Tap pizza slices to add or remove topping. Match the fraction, then press Check.</p>',ml:'<p>ടോപ്പിംഗ് ചേർക്കാനോ മാറ്റാനോ കഷണങ്ങളിൽ തൊടൂ. ശേഷം പരിശോധിക്കൂ.</p>'},
  mount(area){
    const den=choice([4,6,8]),num=rint(1,den-1),selected=new Set();area.appendChild(el('p','pz-goal',gameText('Make <span class="big">'+num+'/'+den+'</span> of the pizza!','പിസ്സയുടെ <span class="big">'+num+'/'+den+'</span> തയ്യാറാക്കൂ!')));
    const pizza=el('div','pizza');for(let i=0;i<den;i++){const s=el('button','pizza-slice');s.style.transform='rotate('+(i*360/den)+'deg)';s.setAttribute('aria-label','Slice '+(i+1));s.addEventListener('click',()=>{selected.has(i)?selected.delete(i):selected.add(i);s.classList.toggle('on');});pizza.appendChild(s);}area.appendChild(pizza);
    const act=el('div','pz-actions'),check=checkBtn(),clear=clearBtn();act.append(check,clear);area.appendChild(act);clear.addEventListener('click',()=>{selected.clear();pizza.querySelectorAll('.on').forEach(x=>x.classList.remove('on'));});check.addEventListener('click',()=>{if(selected.size===num){pizza.classList.add('done');win(gameText('Order complete — perfect pizza! 🍕','ഓർഡർ തയ്യാർ — പിസ്സ കൃത്യം! 🍕'));check.disabled=true;}else lose(gameText('You selected '+selected.size+' of '+den+' slices.','നിങ്ങൾ '+den+'-ൽ '+selected.size+' കഷണങ്ങൾ തിരഞ്ഞെടുത്തു.'));});
  }
};}

function launcherPuzzle(){return{
  id:'angle-launcher',emoji:'🚀',name:'Angle Launcher',
  desc:{en:'Aim the launcher at the requested angle',ml:'ആവശ്യപ്പെട്ട കോണിൽ ലോഞ്ചർ ലക്ഷ്യമിടൂ'},
  how:{en:'<p>Move the slider to aim, then launch. Get within <b>±8°</b>.</p>',ml:'<p>സ്ലൈഡർ നീക്കി ലക്ഷ്യമിടൂ. <b>±8°</b> പരിധിയിൽ എത്തണം.</p>'},
  mount(area){
    const target=choice([30,45,60,75]);let angle=45,done=false;area.appendChild(el('p','pz-goal',gameText('Hit the target at <span class="big">'+target+'°</span>','<span class="big">'+target+'°</span> കോണിൽ ലക്ഷ്യം തൊടൂ')));
    const stage=el('div','launcher'),cannon=el('div','cannon','🚀'),mark=el('div','target-mark','🎯'),shot=el('div','shot');stage.append(cannon,mark,shot);area.appendChild(stage);
    const slider=el('input','');slider.type='range';slider.min='15';slider.max='85';slider.value=45;slider.style.width='100%';const read=el('div','game-hud','<span class="game-chip">45°</span>');area.append(slider,read);const chip=read.firstChild;function aim(){angle=+slider.value;cannon.style.transform='rotate('+(-angle+45)+'deg)';chip.textContent=angle+'°';}slider.addEventListener('input',aim);aim();
    const act=el('div','pz-actions'),fire=el('button','btn primary','🚀 '+gameText('Launch','വിക്ഷേപിക്കുക'));act.appendChild(fire);area.appendChild(act);fire.addEventListener('click',()=>{if(done)return;shot.style.display='block';const anim=shot.animate([{transform:'translate(0,0)'},{transform:'translate(180px,'+(-Math.tan(angle*Math.PI/180)*105)+'px)'}],{duration:900,easing:'ease-out'});anim.onfinish=()=>{shot.style.display='none';const diff=Math.abs(angle-target);if(diff<=8){done=true;win(gameText('Direct hit! Your angle was '+angle+'°. 🎯','കൃത്യമായി തൊട്ടു! നിങ്ങളുടെ കോൺ '+angle+'° ആയിരുന്നു. 🎯'));}else lose(gameText(angle<target?'Aim a little higher!':'Aim a little lower!',angle<target?'കുറച്ചുകൂടി ഉയർത്തൂ!':'കുറച്ചുകൂടി താഴ്ത്തൂ!'));};});
  }
};}

function algebraLockPuzzle(){return{
  id:'algebra-lock',emoji:'🔐',name:'Algebra Lock',
  desc:{en:'Solve three equations to open the vault',ml:'മൂന്ന് സമവാക്യങ്ങൾ പരിഹരിച്ച് നിലവറ തുറക്കൂ'},
  how:{en:'<p>Each correct value of x opens one lock. Open all three.</p>',ml:'<p>x-ന്റെ ഓരോ ശരിയായ വിലയും ഓരോ പൂട്ടു തുറക്കും. മൂന്നും തുറക്കൂ.</p>'},
  mount(area){
    let level=0,ans;const locks=[],vault=el('div','vault'),door=el('div','vault-door','🔒'),lockRow=el('div','locks');for(let i=0;i<3;i++){const l=el('span','lock-dot');locks.push(l);lockRow.appendChild(l);}vault.append(door,lockRow);area.appendChild(vault);const q=el('p','pz-goal'),inp=numInput(4),act=el('div','pz-actions'),check=checkBtn();act.append(inp,check);area.append(q,act);function next(){ans=rint(2,12);const a=rint(2,6),b=rint(1,12);q.innerHTML='<span class="big">'+a+'x + '+b+' = '+(a*ans+b)+'</span>';inp.value='';}next();check.addEventListener('click',()=>{if(readInt(inp)===ans){locks[level++].classList.add('open');if(level===3){vault.classList.add('open');door.textContent='✨';check.disabled=true;win(gameText('Vault opened! Algebra mission complete. 🔓','നിലവറ തുറന്നു! ദൗത്യം പൂർത്തിയായി. 🔓'));}else{markGood(inp);setTimeout(next,350);}}else{markBad(inp);lose(gameText('That key does not fit. Solve for x again.','ആ താക്കോൽ ചേരുന്നില്ല. x വീണ്ടും കണ്ടെത്തൂ.'));}});
  }
};}

function spinnerPuzzle(){return{
  id:'probability-spinner',emoji:'🎡',name:'Probability Spinner',
  desc:{en:'Predict the most likely colour, then spin',ml:'ഏറ്റവും സാധ്യതയുള്ള നിറം പ്രവചിച്ച് കറക്കൂ'},
  how:{en:'<p>Half is orange; green and purple each cover one quarter. Choose the most likely colour, then spin.</p>',ml:'<p>പകുതി ഓറഞ്ചും കാൽഭാഗം വീതം പച്ചയും പർപ്പിളുമാണ്. ഏറ്റവും സാധ്യതയുള്ളത് തിരഞ്ഞെടുക്കൂ.</p>'},
  mount(area){
    area.appendChild(el('p','pz-goal',gameText('Which colour is <span class="big">most likely</span>?','ഏത് നിറത്തിനാണ് <span class="big">ഏറ്റവും സാധ്യത</span>?')));const row=el('div','pz-actions');let chosen=null;[['Orange','#FF8A3D'],['Green','#10B487'],['Purple','#7C5CE0']].forEach(([name,color])=>{const b=el('button','btn',name);b.style.background=color;b.style.color='#fff';b.addEventListener('click',()=>{chosen=name;row.querySelectorAll('button').forEach(x=>x.style.outline='');b.style.outline='4px solid #FFC53D';});row.appendChild(b);});area.appendChild(row);
    const wrap=el('div','spinner-wrap'),arrow=el('div','spinner-arrow','▼'),wheel=el('div','spinner-wheel');wrap.append(arrow,wheel);area.appendChild(wrap);const acts=el('div','pz-actions'),spin=el('button','btn primary','🎡 '+gameText('Spin','കറക്കൂ'));acts.appendChild(spin);area.appendChild(acts);let turns=0;spin.addEventListener('click',()=>{if(!chosen){lose(gameText('Choose your prediction first.','ആദ്യം പ്രവചനം തിരഞ്ഞെടുക്കൂ.'));return;}spin.disabled=true;turns+=5+rint(0,3);wheel.style.transform='rotate('+(turns*360+rint(0,359))+'deg)';setTimeout(()=>{spin.disabled=false;if(chosen==='Orange')win(gameText('Correct! Orange covers half, so it is most likely.','ശരി! ഓറഞ്ച് പകുതി മൂടുന്നതിനാൽ അതിനാണ് കൂടുതൽ സാധ്യത.'));else lose(gameText('Orange covers the largest part: 1/2.','ഓറഞ്ചാണ് ഏറ്റവും വലിയ ഭാഗം: 1/2.'));},2300);});
  }
};}

