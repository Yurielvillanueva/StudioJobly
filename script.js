const concepts = [
  {
    name: "For Loop",
    time: "5 min",
    photo: "img/Forloop2.png",
    badge: "Beginner",
    compat: 90,
    tags: ["Loops", "JavaScript", "Counting"],
    bio: "Use a for loop when you know exactly how many times to repeat something — like firing five web strands in a row.",
    code: `for (int i = 0; i < 5; i++) { 
            System.out.println(i); 
        }`,
    output: `0
1
2
3
4`,
    explain: "A for loop packs three things into one line: a starting point (i = 0), a condition to keep going (i < 5), and a step to take each time (i++). It runs until the condition is false, so here it fires exactly 5 web strands, then stops on its own."
  },
  {
    name: "While Loop",
    time: "5 min",
    photo: "img/whileloop.png",
    badge: "Beginner",
    compat: 82,
    tags: ["Loops", "JavaScript", "Condition"],
    bio: "A while loop checks its condition before every run — perfect when you don't know the exact count up front, just when to stop.",
    code: `Scanner scanner = new Scanner(System.in);
        String response = "no";
        while (response.equalsIgnoreCase("no")) 
        {
            System.out.println("Here is a new offer! Do you accept? (yes/no):");
            response = scanner.nextLine(); 
        }
        System.out.println("Offer accepted! Process completed.");
        scanner.close();`,
    output: `
Here is a new offer! Do you accept? (yes/no):
no
Here is a new offer! Do you accept? (yes/no):
yes
Offer accepted! Process completed.`,
    explain: "The condition (energy > 0) is checked first, then the loop body runs. If the condition were already false, the body would never run at all. That's the key difference from a do-while loop below."
  },
  {
    name: "Do-While Loop",
    time: "5 min",
    photo: "img/dowhileloop.png",
    badge: "Intermediate",
    compat: 75,
    tags: ["Loops", "JavaScript", "Guaranteed run"],
    bio: "A do-while loop runs the body first, then checks the condition — so it always executes at least once, no matter what.",
    code: `int i = 0;
        do {
            System.out.println(i);
            i++; 
        } 
        while (i < 5);`,
    output: `0
1
2
3
4`,
    explain: "Notice the condition is at the bottom this time. Even if peopleToRescue started at 0, rescueCitizen() would still run once before the check happens. Use this when an action must happen at least one time, like showing a menu before asking to repeat it."
  }
];

let index = 0;
const stackEl = document.getElementById('stack');
const sheetOverlay = document.getElementById('sheetOverlay');
const sheetTitle = document.getElementById('sheetTitle');
const sheetSub = document.getElementById('sheetSub');
const sheetCode = document.getElementById('sheetCode');
const sheetConsole = document.getElementById('sheetConsole');
const sheetExplain = document.getElementById('sheetExplain');
const matchOverlay = document.getElementById('matchOverlay');
const matchPhoto = document.getElementById('matchPhoto');
const matchText = document.getElementById('matchText');

function escapeHtml(str){
  return str.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
}

function renderStack(){
  stackEl.innerHTML = '';
  const visible = concepts.slice(index, index + 3);
  if(visible.length === 0){
    stackEl.innerHTML = `<div class="empty"><span>🕸️</span><div>You've been through every concept.<br/>Come back for more loops soon.</div></div>`;
    return;
  }
  visible.forEach((c, i) => {
    const card = document.createElement('div');
    card.className = 'card';
    card.innerHTML = `
      <div class="photo" style="background-image:url('${c.photo}')">
        <div class="badge">${c.badge}</div>
        <div class="stamp like">Clicked</div>
        <div class="stamp nope">Pass</div>
        <div class="caption"><h2>${c.name} <span class="time">${c.time}</span></h2></div>
      </div>
      <div class="details">
        <div class="compat">
          <div class="label">Confidence</div>
          <div class="gauge"><i style="width:${c.compat}%"></i></div>
          <div class="gauge-pct">${c.compat}%</div>
        </div>
        <div class="tags">${c.tags.map(t => `<span class="tag">${t}</span>`).join('')}</div>
        <div class="bio">${c.bio}</div>
        <div class="codebox">${escapeHtml(c.code)}</div>
        <div class="console"><span class="tag2">$</span> run<br/>${escapeHtml(c.output)}</div>
        <button class="infoBtn" data-idx="${index+i}">Full explanation →</button>
      </div>
    `;
    if(i === 0){ makeSwipeable(card, c); }
    stackEl.appendChild(card);
  });
  const topLink = stackEl.querySelector('.infoBtn');
  if(topLink){ topLink.addEventListener('click', () => openSheet(concepts[index])); }
}

function makeSwipeable(card, item){
  let startX = 0, startY = 0, dx = 0, dy = 0, dragging = false;
  const likeStamp = card.querySelector('.stamp.like');
  const nopeStamp = card.querySelector('.stamp.nope');

  function onDown(e){ dragging = true; startX = e.clientX; startY = e.clientY; card.style.transition = 'none'; card.setPointerCapture(e.pointerId); }
  function onMove(e){
    if(!dragging) return;
    dx = e.clientX - startX; dy = e.clientY - startY;
    const rot = dx / 18;
    card.style.transform = `translate(${dx}px, ${dy}px) rotate(${rot}deg)`;
    const opacity = Math.min(Math.abs(dx) / 90, 1);
    if(dx > 0){ likeStamp.style.opacity = opacity; nopeStamp.style.opacity = 0; }
    else { nopeStamp.style.opacity = opacity; likeStamp.style.opacity = 0; }
  }
  function onUp(){
    if(!dragging) return;
    dragging = false;
    card.style.transition = '';
    if(Math.abs(dx) > 110){ finishSwipe(dx > 0 ? 1 : -1); }
    else { card.style.transform = ''; likeStamp.style.opacity = 0; nopeStamp.style.opacity = 0; }
    dx = 0; dy = 0;
  }
  function finishSwipe(dir){
    card.removeEventListener('pointerdown', onDown);
    card.removeEventListener('pointermove', onMove);
    card.removeEventListener('pointerup', onUp);
    card.style.transform = `translate(${dir * 600}px, ${dy}px) rotate(${dir * 30}deg)`;
    card.style.opacity = '0';
    setTimeout(() => {
      index++;
      if(dir > 0) maybeMatch(item);
      else renderStack();
    }, 260);
  }

  card.addEventListener('pointerdown', onDown);
  card.addEventListener('pointermove', onMove);
  card.addEventListener('pointerup', onUp);
  card._swipeRight = () => finishSwipe(1);
  card._swipeLeft = () => finishSwipe(-1);
}

function maybeMatch(item){
  matchPhoto.style.backgroundImage = `url('${item.photo}')`;
  matchText.textContent = `${item.name} just clicked for you.`;
  matchOverlay.classList.add('open');
  matchOverlay.dataset.item = item.name;
}

function openSheet(item){
  sheetTitle.textContent = item.name;
  sheetSub.textContent = `${item.time} · ${item.tags.join(' · ')}`;
  sheetCode.textContent = item.code;
  sheetConsole.innerHTML = `<span class="tag2">$</span> run\n${escapeHtml(item.output)}`;
  sheetExplain.textContent = item.explain;
  sheetOverlay.classList.add('open');
}

document.getElementById('closeSheet').addEventListener('click', () => sheetOverlay.classList.remove('open'));
document.getElementById('keepSwiping').addEventListener('click', () => { matchOverlay.classList.remove('open'); renderStack(); });
document.getElementById('viewRecipe').addEventListener('click', () => {
  const item = concepts[index - 1];
  matchOverlay.classList.remove('open');
  openSheet(item);
  renderStack();
});
document.getElementById('nopeBtn').addEventListener('click', () => { const top = stackEl.querySelector('.card'); if(top && top._swipeLeft) top._swipeLeft(); });
document.getElementById('loveBtn').addEventListener('click', () => { const top = stackEl.querySelector('.card'); if(top && top._swipeRight) top._swipeRight(); });
document.getElementById('infoBtn').addEventListener('click', () => { if(concepts[index]) openSheet(concepts[index]); });

renderStack();
