const profiles = [
  { name: "Alex", age: 24, gender: "Male", role: "Frontend Web Developer", photo: "img/alex.jpg", badge: "Frontend", compat: 92, tags: ["React", "Next.js", "TypeScript", "Tailwind CSS", "REST APIs"], bio: "3 years of hands-on experience building fast, responsive web applications. Focused on page speed optimization, pixel-perfect UI rendering, and clean code architecture." },
  { name: "Samantha", age: 28, gender: "Female", role: "Backend Developer", photo: "img/samantha.jpg", badge: "Backend", compat: 90, tags: ["Node.js", "Express", "PostgreSQL", "MongoDB", "Docker"], bio: "Mid-level backend engineer specializing in scalable RESTful APIs, microservices, and database optimization. Track record of reducing database query latency by over 30%." },
  { name: "Ethan", age: 22, gender: "Male", role: "Junior Full-Stack Developer", photo: "img/ethan.jpg", badge: "Full-Stack", compat: 86, tags: ["Java", "Spring Boot", "MySQL", "HTML5/CSS3", "Git"], bio: "Recent IT graduate with strong Object-Oriented Programming fundamentals. Skilled in building full-stack web applications and quick to adapt to new frameworks in an agile environment." },
  { name: "Priya", age: 26, gender: "Female", role: "UI/UX Designer & Web Developer", photo: "img/priya.jpg", badge: "Design + Dev", compat: 94, tags: ["Figma", "Vue.js", "Tailwind CSS", "JavaScript", "Accessibility"], bio: "Hybrid designer and frontend engineer specializing in converting Figma wireframes into accessible, interactive components. Driven by user-centric design and smooth micro-interactions." },
  { name: "Marcus", age: 31, gender: "Male", role: "Cloud & DevOps Engineer", photo: "img/marcus.jpg", badge: "DevOps", compat: 89, tags: ["AWS", "Kubernetes", "Terraform", "CI/CD", "Linux"], bio: "6 years of experience managing enterprise cloud infrastructure and automating deployment workflows. Experienced in maintaining high availability, zero-downtime updates, and server security." },
  { name: "Chloe", age: 25, gender: "Female", role: "QA Automation Engineer", photo: "img/chloe.jpg", badge: "Quality", compat: 88, tags: ["Selenium", "Cypress", "JavaScript", "Python", "Postman", "Jest"], bio: "Detail-oriented QA specialist focused on end-to-end automated testing for web applications. Experienced in writing regression suites, stress testing APIs, and catching critical bugs prior to production release." },
  { name: "David", age: 29, gender: "Male", role: "Database Administrator & SQL Developer", photo: "img/david.jpg", badge: "Data", compat: 87, tags: ["PostgreSQL", "MySQL", "SQL Server", "Redis", "ETL"], bio: "Database specialist experienced in architecting relational schemas, optimizing complex SQL queries, and handling data migration projects while ensuring complete data integrity." },
  { name: "Jordan", age: 27, gender: "Non-binary", role: "Cross-Platform & Mobile Web Developer", photo: "img/jordan.jpg", badge: "Mobile Web", compat: 91, tags: ["React Native", "React.js", "TypeScript", "GraphQL", "Firebase"], bio: "Builds unified web and mobile experiences from a single codebase. Focused on efficient state management, offline-first capabilities, and smooth mobile web performance." },
  { name: "Hannah", age: 23, gender: "Female", role: "Application Security Specialist", photo: "img/hannah.jpg", badge: "Security", compat: 93, tags: ["OWASP Top 10", "Pen Testing", "Python", "Network Security", "OAuth 2.0"], bio: "Cybersecurity professional focused on auditing web application code, discovering security vulnerabilities, and implementing robust authentication and encryption standards." },
  { name: "Carlos", age: 33, gender: "Male", role: "Senior IT Systems & Network Administrator", photo: "img/carlos.jpg", badge: "Infrastructure", compat: 85, tags: ["Cisco Networking", "Active Directory", "Linux", "Hardware", "Troubleshooting"], bio: "8+ years overseeing enterprise IT infrastructure, configuring network topologies, and resolving critical system bottlenecks. Dedicated to maximum uptime and network reliability." }
];

let index = 0;
let matches = 0;
const stackEl = document.getElementById('stack');
const sheetOverlay = document.getElementById('sheetOverlay');
const sheetTitle = document.getElementById('sheetTitle');
const sheetSub = document.getElementById('sheetSub');
const sheetSkills = document.getElementById('sheetSkills');
const sheetExplain = document.getElementById('sheetExplain');
const matchOverlay = document.getElementById('matchOverlay');
const matchPhoto = document.getElementById('matchPhoto');
const matchText = document.getElementById('matchText');
const streakEl = document.querySelector('.streak');

function currentProfile(offset = 0) { return profiles[(index + offset) % profiles.length]; }
function updateCounter() { streakEl.textContent = `♥ ${matches} matches · ${index + 1} / ${profiles.length}`; }

function renderStack(){
  stackEl.innerHTML = '';
  let i = 0;
  while(i < 3){
    const c = currentProfile(i);
    const card = document.createElement('article');
    card.className = 'card';
    card.innerHTML = `
      <div class="photo" style="background-image:url('${c.photo}')">
        <div class="badge">${c.badge}</div><div class="deck-count">${((index + i) % profiles.length) + 1} / ${profiles.length}</div>
        <div class="stamp like">Liked</div><div class="stamp nope">Pass</div>
        <div class="caption"><h2>${c.name}, ${c.age}</h2><p>${c.role}</p></div>
      </div>
      <div class="details">
        <div class="compat"><div class="label">Match</div><div class="gauge"><i style="width:${c.compat}%"></i></div><div class="gauge-pct">${c.compat}%</div></div>
        <div class="tags">${c.tags.map(t => `<span class="tag">${t}</span>`).join('')}</div>
        <p class="bio">${c.bio}</p><button class="infoBtn">View full profile →</button>
      </div>`;
    if(i === 0) makeSwipeable(card, c);
    card.querySelector('.infoBtn').addEventListener('click', () => openSheet(c));
    stackEl.appendChild(card);
    i++;
  }
  updateCounter();
}

function makeSwipeable(card, item){
  let startX = 0, startY = 0, dx = 0, dy = 0, dragging = false;
  const likeStamp = card.querySelector('.stamp.like');
  const nopeStamp = card.querySelector('.stamp.nope');
  function onDown(e){ dragging = true; startX = e.clientX; startY = e.clientY; card.style.transition = 'none'; card.setPointerCapture(e.pointerId); }
  function onMove(e){ if(!dragging) return; dx = e.clientX - startX; dy = e.clientY - startY; card.style.transform = `translate(${dx}px, ${dy}px) rotate(${dx / 18}deg)`; const opacity = Math.min(Math.abs(dx) / 90, 1); likeStamp.style.opacity = dx > 0 ? opacity : 0; nopeStamp.style.opacity = dx < 0 ? opacity : 0; }
  function onUp(){ if(!dragging) return; dragging = false; card.style.transition = ''; if(Math.abs(dx) > 110) finishSwipe(dx > 0 ? 1 : -1); else { card.style.transform = ''; likeStamp.style.opacity = 0; nopeStamp.style.opacity = 0; } dx = 0; dy = 0; }
  function finishSwipe(dir){ card.style.transform = `translate(${dir * 680}px, ${dy}px) rotate(${dir * 30}deg)`; card.style.opacity = '0'; setTimeout(() => { if(dir > 0) { matches++; maybeMatch(item); } index = (index + 1) % profiles.length; if(dir < 0) renderStack(); }, 260); }
  card.addEventListener('pointerdown', onDown); card.addEventListener('pointermove', onMove); card.addEventListener('pointerup', onUp); card.addEventListener('pointercancel', onUp);
  card._swipeRight = () => finishSwipe(1); card._swipeLeft = () => finishSwipe(-1);
}

function maybeMatch(item){ matchPhoto.style.backgroundImage = `url('${item.photo}')`; matchText.textContent = `${item.name} just clicked for you.`; matchOverlay.classList.add('open'); }
function openSheet(item){ sheetTitle.textContent = `${item.name}, ${item.age}`; sheetSub.textContent = `${item.role} · ${item.gender}`; sheetSkills.innerHTML = item.tags.map(t => `<span class="tag">${t}</span>`).join(''); sheetExplain.textContent = item.bio; sheetOverlay.classList.add('open'); }
document.getElementById('closeSheet').addEventListener('click', () => sheetOverlay.classList.remove('open'));
document.getElementById('keepSwiping').addEventListener('click', () => { matchOverlay.classList.remove('open'); renderStack(); });
document.getElementById('viewRecipe').addEventListener('click', () => { matchOverlay.classList.remove('open'); openSheet(profiles[(index + profiles.length - 1) % profiles.length]); renderStack(); });
document.getElementById('nopeBtn').addEventListener('click', () => stackEl.querySelector('.card')?._swipeLeft());
document.getElementById('loveBtn').addEventListener('click', () => stackEl.querySelector('.card')?._swipeRight());
document.getElementById('infoBtn').addEventListener('click', () => openSheet(currentProfile()));
renderStack();
