const state={name:new URLSearchParams(location.search).get("name")||"Kamu",date:"Sabtu, 29 Agustus 2026",place:"Dinner 🍽️"};
document.querySelectorAll("[data-name]").forEach(el=>el.textContent=state.name);

function goTo(n){
  document.querySelectorAll(".screen").forEach(s=>s.classList.remove("active"));
  document.getElementById("screen-"+n).classList.add("active");
  window.scrollTo({top:0,behavior:"smooth"});
  if(n===2) makeConfetti();
}
function selectChoice(btn,group){
  document.querySelectorAll("#"+group+" .choice").forEach(x=>x.classList.remove("selected"));
  btn.classList.add("selected");
  if(group==="dateChoices") state.date=btn.dataset.value;
  if(group==="placeChoices") state.place=btn.dataset.value;
}
function nextFromDates(){
  if(!state.date){alert("Pilih tanggal dulu yaa 💗");return}
  goTo(4);
}
function nextFromPlaces(){
  if(!state.place){alert("Pilih tempat dulu yaa 💗");return}
  document.getElementById("summaryDate").textContent=state.date;
  document.getElementById("summaryPlace").textContent=state.place;
  goTo(5);
}
function finish(){
  document.getElementById("finalDate").textContent=state.date;
  document.getElementById("finalPlace").textContent=state.place;
  goTo(6);
  makeConfetti();
}
const noBtn=document.getElementById("noBtn");
function moveNo(){
  const pad=12;
  const maxX=Math.max(0,window.innerWidth-noBtn.offsetWidth-pad*2);
  const maxY=Math.max(0,window.innerHeight-noBtn.offsetHeight-pad*2);
  noBtn.style.position="fixed";
  noBtn.style.left=(pad+Math.random()*maxX)+"px";
  noBtn.style.top=(pad+Math.random()*maxY)+"px";
  noBtn.style.zIndex=20;
}
noBtn.addEventListener("mouseenter",moveNo);
noBtn.addEventListener("touchstart",(e)=>{e.preventDefault();moveNo()},{passive:false});
noBtn.addEventListener("click",moveNo);

function makeConfetti(){
  const box=document.getElementById("confetti"); if(!box)return;
  box.innerHTML="";
  const symbols=["♥","✦","•","◆","❤"];
  for(let i=0;i<55;i++){
    const p=document.createElement("span");
    p.className="piece";p.textContent=symbols[Math.floor(Math.random()*symbols.length)];
    p.style.left=Math.random()*100+"%";
    p.style.fontSize=(10+Math.random()*14)+"px";
    p.style.animationDelay=(Math.random()*.9)+"s";
    p.style.animationDuration=(1.8+Math.random()*1.8)+"s";
    p.style.color=["#ff5da5","#ffb1d2","#ffd166","#9e8cff","#fff"][Math.floor(Math.random()*5)];
    box.appendChild(p);
  }
}
setInterval(()=>{
  const h=document.createElement("div");h.className="float-heart";h.textContent=Math.random()>.35?"♥":"✦";
  h.style.left=Math.random()*100+"%";h.style.fontSize=(10+Math.random()*20)+"px";
  h.style.animationDuration=(7+Math.random()*7)+"s";h.style.color="#ff6cae";
  document.getElementById("hearts").appendChild(h);
  setTimeout(()=>h.remove(),15000);
},700);
