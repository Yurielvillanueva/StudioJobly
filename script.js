/* ---------- 1. Job data + avatar generator ---------- */

function hashString(str) {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = (hash * 31 + str.charCodeAt(i)) >>> 0;
  }
  return hash;
}

const AVATAR_PALETTE = ['#2e7ff0', '#5d6ef5', '#20b2a6', '#f0a93a', '#e2597e', '#7c5cf0', '#2fb08a', '#e0673f'];

function getInitials(name) {
  const words = name.trim().split(/\s+/).filter(Boolean);
  if (words.length === 0) return '?';
  if (words.length === 1) return words[0].slice(0, 2).toUpperCase();
  return (words[0][0] + words[1][0]).toUpperCase();
}

// Generates a small colored "initials" avatar as an inline SVG data URI,
// so job cards never depend on missing image files.
function avatarDataUri(name) {
  const initials = getInitials(name);
  const color = AVATAR_PALETTE[hashString(name) % AVATAR_PALETTE.length];
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="120" height="120">
    <rect width="120" height="120" rx="28" fill="${color}"/>
    <text x="50%" y="54%" dominant-baseline="middle" text-anchor="middle" font-family="Arial, sans-serif" font-size="46" font-weight="700" fill="#ffffff">${initials}</text>
  </svg>`;
  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
}

const jobs = [
  {
    title: 'Product Manager',
    salary: '$50k - $80k',
    location: 'Metro Manila',
    type: 'Full-time',
    experience: '4+ Yrs',
    education: 'Bachelor',
    company: 'LoopWorks',
    companyMeta: '100-500',
    category: 'for',
    roles: ['Product', 'Strategy', 'Research'],
    description: 'Lead product strategy, prioritize roadmap goals, and turn customer feedback into measurable growth.',
    requirements: ['Define product roadmap', 'Analyze product metrics', 'Coordinate with design and engineering'],
  },
  {
    title: 'Frontend Developer',
    salary: '$42k - $65k',
    location: 'Remote',
    type: 'Full-time',
    experience: '2-4 Yrs',
    education: 'Bachelor',
    company: 'CodeNest',
    companyMeta: '50-100',
    category: 'for',
    roles: ['UI', 'JavaScript', 'Frontend'],
    description: 'Build responsive interfaces and improve core user journey flows using modern frontend practices.',
    requirements: ['HTML, CSS, JavaScript', 'Responsive UI design', 'Accessibility and performance']
  },
  {
    title: 'Quality Assurance Specialist',
    salary: '$38k - $55k',
    location: 'Cebu',
    type: 'Hybrid',
    experience: '1-3 Yrs',
    education: 'College',
    company: 'CheckLoop',
    companyMeta: '100-500',
    category: 'while',
    roles: ['Testing', 'Bug Fixing', 'QA'],
    description: 'Validate product quality, document issues, and collaborate with engineering to improve release stability.',
    requirements: ['Test case planning', 'Bug reporting', 'Regression validation']
  },
  {
    title: 'Support Engineer',
    salary: '$36k - $52k',
    location: 'Quezon City',
    type: 'On-site',
    experience: '2-5 Yrs',
    education: 'Bachelor',
    company: 'NorthTrack',
    companyMeta: '50-100',
    category: 'while',
    roles: ['Monitoring', 'Support', 'Systems'],
    description: 'Monitor live systems, troubleshoot incidents, and keep customer operations reliable and responsive.',
    requirements: ['Incident handling', 'Customer communication', 'System monitoring']
  },
  {
    title: 'Data Analyst',
    salary: '$45k - $70k',
    location: 'Remote',
    type: 'Full-time',
    experience: '2-4 Yrs',
    education: 'Bachelor',
    company: 'DataLoop',
    companyMeta: '100-500',
    category: 'doWhile',
    roles: ['SQL', 'Reports', 'Analytics'],
    description: 'Turn business data into actionable insights and dashboards that improve hiring, operations, and growth decisions.',
    requirements: ['SQL and Excel', 'Data storytelling', 'Dashboard creation']
  },
  {
    title: 'Backend Engineer',
    salary: '$60k - $90k',
    location: 'Remote',
    type: 'Full-time',
    experience: '3-6 Yrs',
    education: 'Bachelor',
    company: 'ServerLoop',
    companyMeta: '50-100',
    category: 'doWhile',
    roles: ['Java', 'API', 'Backend'],
    description: 'Design reliable services, improve APIs, and ensure backend systems stay efficient and secure under load.',
    requirements: ['REST API design', 'Database optimization', 'Performance tuning']
  }
];

/* ---------- 2. Loop metadata ---------- */

const loopMeta = {
  for: {
    label: 'For loop',
    about: 'Prelim: basic for loop.',
    examples: [
      { label: 'For loop 1', prompt: 'for (int i = 1; i <= 3; i++) {\n    System.out.println(i);\n}' },
      { label: 'For loop 2', prompt: 'for (int x = 0; x < 2; x++) {\n    System.out.println(x);\n}' }
    ],
    defaultPrompt: 'for (int i = 1; i <= 3; i++) {\n    System.out.println(i);\n}',
    fallbackBullets: [
      'A for loop starts with a value.',
      'It repeats while the condition is true.',
      'It changes the value each time.'
    ]
  },
  while: {
    label: 'While loop',
    about: 'Prelim: basic while loop.',
    examples: [
      { label: 'While loop 1', prompt: 'int a = 1;\nwhile (a <= 3) {\n    System.out.println(a);\n    a++;\n}' },
      { label: 'While loop 2', prompt: 'int b = 0;\nwhile (b < 2) {\n    System.out.println(b);\n    b++;\n}' }
    ],
    defaultPrompt: 'int a = 1;\nwhile (a <= 3) {\n    System.out.println(a);\n    a++;\n}',
    fallbackBullets: [
      'A while loop checks the condition first.',
      'It runs if the condition is true.',
      'You must update the value inside.'
    ]
  },
  doWhile: {
    label: 'Do-while loop',
    about: 'Prelim: basic do-while loop.',
    examples: [
      { label: 'Do-while loop 1', prompt: 'int c = 1;\ndo {\n    System.out.println(c);\n    c++;\n} while (c <= 3);' },
      { label: 'Do-while loop 2', prompt: 'int d = 0;\ndo {\n    System.out.println(d);\n    d++;\n} while (d < 2);' }
    ],
    defaultPrompt: 'int c = 1;\ndo {\n    System.out.println(c);\n    c++;\n} while (c <= 3);',
    fallbackBullets: [
      'A do-while loop runs once first.',
      'Then it checks the condition.',
      'It repeats while the condition is true.'
    ]
  },
  unknown: {
    label: 'Unrecognized',
    about: 'Type a for, while, or do-while loop above and press Run & Explain.',
    fallbackBullets: [
      'We could not detect the loop pattern.',
      'Try to match the basic Java loop structure.'
    ]
  }
};

function getLoopExamples(loopKey) {
  const meta = loopMeta[loopKey] || loopMeta.for;
  if (Array.isArray(meta.examples) && meta.examples.length > 0) return meta.examples;
  return [{ label: meta.label || 'Example', prompt: meta.defaultPrompt || '' }];
}

function getLoopPrompt(loopKey, exampleIndex = 0) {
  const examples = getLoopExamples(loopKey);
  const safeIndex = Math.max(0, Math.min(exampleIndex, examples.length - 1));
  return examples[safeIndex]?.prompt || (loopMeta[loopKey] || loopMeta.for).defaultPrompt || '';
}
/* ---------- 3. Mini loop interpreter ---------- */
/* Parses simple Java-style counting loops and actually simulates
   them, so the site can show real output + a real explanation
   instead of canned text. */

const MAX_ITER = 200;
const MAX_DISPLAY_LINES = 40;

const FOR_RE = /for\s*\(\s*(?:int\s+)?([A-Za-z_]\w*)\s*=\s*(-?\d+)\s*;\s*\1\s*(<=|>=|<|>|==|!=)\s*(-?\d+)\s*;\s*\1\s*(\+\+|--|\+=\s*\d+|-=\s*\d+)\s*\)\s*\{([\s\S]*)\}/;
const DO_WHILE_RE = /(?:int\s+)?([A-Za-z_]\w*)\s*=\s*(-?\d+)\s*;\s*do\s*\{([\s\S]*?)\}\s*while\s*\(\s*\1\s*(<=|>=|<|>|==|!=)\s*(-?\d+)\s*\)\s*;?/;
const WHILE_RE = /(?:int\s+)?([A-Za-z_]\w*)\s*=\s*(-?\d+)\s*;\s*while\s*\(\s*\1\s*(<=|>=|<|>|==|!=)\s*(-?\d+)\s*\)\s*\{([\s\S]*)\}/;

function splitTopLevelPlus(expr) {
  const parts = [];
  let cur = '';
  let inQuote = null;
  for (let i = 0; i < expr.length; i++) {
    const ch = expr[i];
    if (inQuote) {
      cur += ch;
      if (ch === inQuote) inQuote = null;
    } else if (ch === '"' || ch === "'") {
      inQuote = ch;
      cur += ch;
    } else if (ch === '+') {
      parts.push(cur);
      cur = '';
    } else {
      cur += ch;
    }
  }
  parts.push(cur);
  return parts.map((p) => p.trim()).filter((p) => p.length);
}

function evalPrintExpr(expr, varName, varValue) {
  return splitTopLevelPlus(expr)
    .map((token) => {
      const strMatch = token.match(/^"([\s\S]*)"$/) || token.match(/^'([\s\S]*)'$/);
      if (strMatch) return strMatch[1];
      if (token === varName) return String(varValue);
      if (/^-?\d+(\.\d+)?$/.test(token)) return token;
      return token;
    })
    .join('');
}

function extractPrintLines(bodyText, varName, varValue) {
  const printRe = /System\.out\.println\s*\(([\s\S]*?)\)\s*;/g;
  const lines = [];
  let m;
  while ((m = printRe.exec(bodyText)) !== null) {
    lines.push(evalPrintExpr(m[1], varName, varValue));
  }
  return lines;
}

function findUpdateOp(bodyText, varName) {
  const escaped = varName.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const re = new RegExp(`${escaped}\\s*(\\+\\+|--|\\+=\\s*\\d+|-=\\s*\\d+)`);
  const m = bodyText.match(re);
  return m ? m[1].replace(/\s+/g, '') : null;
}

function applyUpdate(value, updateOp) {
  if (updateOp === '++') return value + 1;
  if (updateOp === '--') return value - 1;
  if (updateOp.startsWith('+=')) return value + parseInt(updateOp.slice(2), 10);
  if (updateOp.startsWith('-=')) return value - parseInt(updateOp.slice(2), 10);
  return value;
}

function checkCondition(value, operator, target) {
  switch (operator) {
    case '<': return value < target;
    case '<=': return value <= target;
    case '>': return value > target;
    case '>=': return value >= target;
    case '==': return value === target;
    case '!=': return value !== target;
    default: return false;
  }
}

function fallbackResult(guessType, reason) {
  return { type: guessType, fallback: true, reason };
}

function interpretLoopCode(code) {
  const trimmed = code.trim();
  let match;

  if ((match = DO_WHILE_RE.exec(trimmed))) {
    const [, varName, startStr, body, operator, targetStr] = match;
    const updateOp = findUpdateOp(body, varName);
    if (!updateOp) return fallbackResult('doWhile', 'Could not find an update statement (like num++) inside the loop body.');

    let value = parseInt(startStr, 10);
    const target = parseInt(targetStr, 10);
    const outputLines = [];
    let iterations = 0;
    let hitCap = false;
    do {
      outputLines.push(...extractPrintLines(body, varName, value));
      value = applyUpdate(value, updateOp);
      iterations += 1;
      if (iterations >= MAX_ITER) { hitCap = true; break; }
    } while (checkCondition(value, operator, target));

    return { type: 'doWhile', varName, start: parseInt(startStr, 10), operator, target, updateOp, outputLines, iterations, hitCap };
  }

  if ((match = FOR_RE.exec(trimmed))) {
    const [, varName, startStr, operator, targetStr, rawUpdateOp, body] = match;
    const updateOp = rawUpdateOp.replace(/\s+/g, '');
    let value = parseInt(startStr, 10);
    const target = parseInt(targetStr, 10);
    const outputLines = [];
    let iterations = 0;
    let hitCap = false;
    while (checkCondition(value, operator, target)) {
      outputLines.push(...extractPrintLines(body, varName, value));
      value = applyUpdate(value, updateOp);
      iterations += 1;
      if (iterations >= MAX_ITER) { hitCap = true; break; }
    }

    return { type: 'for', varName, start: parseInt(startStr, 10), operator, target, updateOp, outputLines, iterations, hitCap };
  }

  if ((match = WHILE_RE.exec(trimmed))) {
    const [, varName, startStr, operator, targetStr, body] = match;
    const updateOp = findUpdateOp(body, varName);
    if (!updateOp) return fallbackResult('while', 'Could not find an update statement (like count++) inside the loop body.');

    let value = parseInt(startStr, 10);
    const target = parseInt(targetStr, 10);
    const outputLines = [];
    let iterations = 0;
    let hitCap = false;
    while (checkCondition(value, operator, target)) {
      outputLines.push(...extractPrintLines(body, varName, value));
      value = applyUpdate(value, updateOp);
      iterations += 1;
      if (iterations >= MAX_ITER) { hitCap = true; break; }
    }

    return { type: 'while', varName, start: parseInt(startStr, 10), operator, target, updateOp, outputLines, iterations, hitCap };
  }

  const hasDo = /\bdo\b/.test(trimmed);
  const hasWhile = /\bwhile\b/.test(trimmed);
  const hasFor = /\bfor\b/.test(trimmed);
  let guess = 'unknown';
  if (hasDo && hasWhile) guess = 'doWhile';
  else if (hasFor) guess = 'for';
  else if (hasWhile) guess = 'while';

  return fallbackResult(guess, 'We couldn\u2019t fully read this code\u2019s pattern.');
}

// Turns a loop-type key into a readable word for sentences.
function typeLabel(type) {
  if (type === 'for') return 'for';
  if (type === 'while') return 'while';
  if (type === 'doWhile') return 'do-while';
  return 'unknown';
}

function buildExplanationList(result) {
  const items = [];

  if (result.fallback) {
    const meta = loopMeta[result.type] || loopMeta.unknown;
    meta.fallbackBullets.forEach((text) => items.push({ text }));
    items.push({ text: result.reason, warning: true });
    return items;
  }

  const { type, varName, start, operator, target, updateOp, iterations, hitCap } = result;

  items.push({ codeParts: [varName, ' starts at ', String(start), '.'] });

  if (type === 'doWhile') {
    items.push({ text: 'The code inside the { } runs first, no matter what.' });
    items.push({
      codeParts: ['Only afterward does it check ', `${varName} ${operator} ${target}`, ' to decide whether to run again.']
    });
    items.push({
      text: 'Because the check happens at the bottom, a do-while loop always runs at least once \u2014 even if the condition would have been false from the start.',
      emphasis: true
    });
  } else {
    items.push({
      codeParts: ['Before each round, it checks ', `${varName} ${operator} ${target}`, '. If that\u2019s true, the code inside the { } runs.']
    });
    if (type === 'while') {
      items.push({ text: 'Because the check happens at the top, a while loop can run zero times if the condition starts out false.' });
    }
  }

  items.push({ codeParts: ['After each round, ', `${varName}${updateOp}`, ' updates the variable.'] });
  items.push({ text: `This loop ran ${iterations} time${iterations === 1 ? '' : 's'}.` });

  if (hitCap) {
    items.push({
      text: `Stopped after ${MAX_ITER} rounds \u2014 this looks like it might run forever. Check whether ${varName}${updateOp} is actually moving ${varName} toward making the condition false.`,
      warning: true
    });
  } else if (result.outputLines.length === 0) {
    items.push({ text: 'No System.out.println(...) was found inside the loop body, so nothing was printed \u2014 but the loop logic above still ran.' });
  }

  return items;
}

// Renders explanation items into the DOM using textContent/createElement
// only (never innerHTML) so code containing "<" or "&" displays safely.
function renderExplanation(container, items) {
  container.innerHTML = '';
  const list = document.createElement('ul');

  items.forEach((item) => {
    const li = document.createElement('li');
    if (item.warning) li.classList.add('warning-line');

    if (item.codeParts) {
      item.codeParts.forEach((part, idx) => {
        if (idx % 2 === 1) {
          const code = document.createElement('code');
          code.textContent = part;
          li.appendChild(code);
        } else if (part) {
          li.appendChild(document.createTextNode(part));
        }
      });
    } else {
      li.textContent = item.text;
    }

    list.appendChild(li);
  });

  container.appendChild(list);
}

/* ---------- 4. Loop Playground UI wiring ---------- */

const livePromptEditor = document.getElementById('livePromptEditor');
const liveConsole = document.getElementById('liveConsole');
const explanationBox = document.getElementById('explanationBox');
const loopPromptLabel = document.getElementById('loopPromptLabel');
const loopAbout = document.getElementById('loopAbout');
const runExplainBtn = document.getElementById('runExplainBtn');
const resetPromptBtn = document.getElementById('resetPromptBtn');
const runStatus = document.getElementById('runStatus');

let currentLoopKey = 'for';
let debounceTimer = null;

function runExplain() {
  if (!livePromptEditor) return;
  const code = livePromptEditor.value;
  const result = interpretLoopCode(code);

  if (result.fallback) {
    liveConsole.textContent = '(Could not simulate output for this code \u2014 see explanation.)';
    runStatus.textContent = result.type === 'unknown'
      ? 'Couldn\u2019t detect a for/while/do-while pattern \u2014 check the tips below.'
      : `Showing a general ${typeLabel(result.type)} explanation instead.`;
    runStatus.classList.add('is-warning');
  } else {
    const lines = result.outputLines;
    let displayText = lines.length ? lines.join('\n') : '(no output)';
    if (lines.length > MAX_DISPLAY_LINES) {
      displayText = lines.slice(0, MAX_DISPLAY_LINES).join('\n') + `\n... (+${lines.length - MAX_DISPLAY_LINES} more lines)`;
    }
    liveConsole.textContent = displayText;

    if (result.hitCap) {
      runStatus.textContent = `Stopped after ${MAX_ITER} rounds \u2014 possible infinite loop.`;
      runStatus.classList.add('is-warning');
    } else {
      runStatus.textContent = `Ran ${result.iterations} time${result.iterations === 1 ? '' : 's'} \u00b7 ${lines.length} line${lines.length === 1 ? '' : 's'} printed.`;
      runStatus.classList.remove('is-warning');
    }
  }

  renderExplanation(explanationBox, buildExplanationList(result));
}

function isKnownLoopKey(key) {
  return Object.prototype.hasOwnProperty.call(loopMeta, key) && key !== 'unknown';
}

function updateLoopConsole(loopKey = 'for', exampleIndex = 0) {
  currentLoopKey = isKnownLoopKey(loopKey) ? loopKey : 'for';
  const meta = loopMeta[currentLoopKey] || loopMeta.for;
  const prompt = getLoopPrompt(currentLoopKey, exampleIndex);

  if (loopPromptLabel) loopPromptLabel.textContent = meta.label;
  if (loopAbout) loopAbout.textContent = meta.about;
  if (livePromptEditor) livePromptEditor.value = prompt;
  if (liveConsole) liveConsole.textContent = '';
  if (runStatus) {
    runStatus.textContent = '';
    runStatus.classList.remove('is-warning');
  }
  if (explanationBox) explanationBox.innerHTML = '';
}

if (runExplainBtn) {
  runExplainBtn.addEventListener('click', runExplain);
}

if (resetPromptBtn) {
  resetPromptBtn.addEventListener('click', () => {
    const prompt = getLoopPrompt(currentLoopKey, 0);
    if (livePromptEditor) livePromptEditor.value = prompt;
    if (liveConsole) liveConsole.textContent = '';
    if (runStatus) {
      runStatus.textContent = '';
      runStatus.classList.remove('is-warning');
    }
    if (explanationBox) explanationBox.innerHTML = '';
  });
}

if (livePromptEditor) {
  livePromptEditor.addEventListener('input', () => {
    if (liveConsole) liveConsole.textContent = '';
    if (runStatus) {
      runStatus.textContent = '';
      runStatus.classList.remove('is-warning');
    }
    if (explanationBox) explanationBox.innerHTML = '';
    clearTimeout(debounceTimer);
  });
}

/* ---------- 5. Job list / search / filter rendering ---------- */

const jobList = document.getElementById('jobList');
const searchInput = document.getElementById('searchInput');
const filterButtons = document.querySelectorAll('.loop-filter');
const jobDetails = document.getElementById('jobDetails');
const navLinks = document.querySelectorAll('.main-nav a');
const employerLink = document.querySelector('.employer');
const langButton = document.querySelector('.lang-btn');
const getStartedButton = document.querySelector('.started-btn');
const searchButton = document.querySelector('.search-btn');
const resetButton = document.querySelector('.reset-btn');
const promoButton = document.querySelector('.promo-blue button');
const miniPanel = document.querySelector('.mini-panel');

function setMiniPanelMessage(title, message) {
  if (!miniPanel) return;
  miniPanel.innerHTML = '';
  const h4 = document.createElement('h4');
  h4.textContent = title;
  const p = document.createElement('p');
  p.textContent = message;
  miniPanel.appendChild(h4);
  miniPanel.appendChild(p);
}

function updateNavState(activeLink) {
  navLinks.forEach((link) => {
    const isActive = link === activeLink;
    link.classList.toggle('active-nav', isActive);
    if (isActive) {
      link.setAttribute('aria-current', 'page');
    } else {
      link.removeAttribute('aria-current');
    }
  });
}

function categoryLabel(category) {
  if (category === 'for') return 'For loop';
  if (category === 'while') return 'While loop';
  return 'Do-while loop';
}

function updateDetails(job) {
  if (!job) {
    jobDetails.innerHTML = `
      <div class="detail-header">
        <span class="detail-tag">Selected job</span>
      </div>
      <h3>Choose a role to view details</h3>
      <p>Tap any listing to learn more about the role, salary, work setup, and responsibilities.</p>
    `;
    return;
  }

  jobDetails.innerHTML = `
    <div class="detail-header">
      <span class="detail-tag">${categoryLabel(job.category)}</span>
    </div>
    <div class="detail-company">
      <img src="${avatarDataUri(job.company)}" alt="${job.company} logo" />
      <div>
        <h3>${job.title}</h3>
        <p>${job.company}</p>
      </div>
    </div>
    <div class="detail-meta">
      <span>${job.location}</span>
      <span>${job.type}</span>
      <span>${job.salary}</span>
    </div>
    <p class="detail-description">${job.description}</p>
    <div class="detail-requirements">
      <h4>Requirements</h4>
      <ul>
        ${job.requirements.map((item) => `<li>${item}</li>`).join('')}
      </ul>
    </div>
    <button class="detail-apply" type="button">Apply now</button>
  `;
}

function renderJobs(filter = 'all', query = '') {
  const term = query.trim().toLowerCase();

  const filteredJobs = jobs.filter((job) => {
    const matchesFilter = filter === 'all' || job.category === filter;
    const haystack = `${job.title} ${job.company} ${job.roles.join(' ')} ${job.location}`.toLowerCase();
    const matchesQuery = haystack.includes(term);
    return matchesFilter && matchesQuery;
  });

  if (!filteredJobs.length) {
    jobList.innerHTML = `
      <div class="empty-state">
        <h3>No matching jobs found</h3>
        <p>Try another keyword or choose another loop category.</p>
      </div>
    `;
    updateDetails(null);
    return;
  }

  const activeJob = filteredJobs[0];
  updateDetails(activeJob);

  jobList.innerHTML = filteredJobs.map((job) => `
    <article class="job-card" data-title="${job.title}" tabindex="0">
      <div class="job-main">
        <div class="job-topline">
          <span class="remote-badge">${job.location}</span>
        </div>
        <h3 class="job-title">${job.title}</h3>
        <div class="job-salary">${job.salary}</div>
        <div class="job-meta">
          <span class="meta-item">${job.type}</span>
          <span class="meta-item">${job.experience}</span>
          <span class="meta-item">${job.education}</span>
        </div>
        <div class="job-footer">
          <span class="avatar" aria-hidden="true"></span>
          <span>${job.company}</span>
        </div>
      </div>

      <div class="job-company">
        <img class="company-photo" src="${avatarDataUri(job.company)}" alt="${job.company} logo" />
        <div class="company-box">
          <div class="company-name">${job.company}</div>
          <div class="company-stat">${job.companyMeta}</div>
        </div>
      </div>
    </article>
  `).join('');

  const cards = document.querySelectorAll('.job-card');
  cards.forEach((card) => {
    card.addEventListener('click', () => {
      const selected = jobs.find((job) => job.title === card.dataset.title);
      if (selected) {
        cards.forEach((item) => item.classList.remove('selected'));
        card.classList.add('selected');
        updateDetails(selected);
      }
    });

    card.addEventListener('keydown', (event) => {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        card.click();
      }
    });
  });
}

filterButtons.forEach((button) => {
  button.addEventListener('click', () => {
    filterButtons.forEach((btn) => btn.classList.toggle('active', btn === button));
    const selectedLoop = button.dataset.filter === 'all' ? 'for' : button.dataset.filter;
    updateLoopConsole(selectedLoop);
    renderJobs(button.dataset.filter, searchInput.value);
  });
});

searchInput.addEventListener('input', (event) => {
  const activeFilter = document.querySelector('.loop-filter.active')?.dataset.filter || 'all';
  renderJobs(activeFilter, event.target.value);
});

searchButton.addEventListener('click', () => {
  const activeFilter = document.querySelector('.loop-filter.active')?.dataset.filter || 'all';
  renderJobs(activeFilter, searchInput.value);
  const query = searchInput.value.trim();
  const actionText = query ? `Search results updated for \u201c${query}\u201d.` : 'Showing all available roles.';
  setMiniPanelMessage('Search', actionText);
  searchInput.focus();
});

resetButton.addEventListener('click', () => {
  searchInput.value = '';
  filterButtons.forEach((button) => button.classList.toggle('active', button.dataset.filter === 'all'));
  renderJobs('all', '');
  setMiniPanelMessage('Filters', 'Everything has been reset to the full job list.');
});

/* ---------- 6. Misc nav + button interactions ---------- */

navLinks.forEach((link) => {
  link.addEventListener('click', (event) => {
    event.preventDefault();
    updateNavState(link);

    const label = link.textContent.trim();

    if (label === 'Home') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      setMiniPanelMessage('Home', 'Welcome back to SwipeCareer.');
      return;
    }

    if (label === 'Find Jobs') {
      document.querySelector('.jobs-column')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      setMiniPanelMessage('Find Jobs', 'Browsing the latest job opportunities.');
      return;
    }

    if (label === 'Companies') {
      setMiniPanelMessage('Companies', 'Company profiles and hiring teams are ready to explore.');
      return;
    }

    if (label === 'APP') {
      searchInput.focus();
      setMiniPanelMessage('App', 'The job search bar is ready.');
      return;
    }

    if (label === 'Career Guide') {
      setMiniPanelMessage('Career Guide', 'Career coaching tips are available for your next step.');
      return;
    }

    if (label === 'Remote Jobs') {
      filterButtons.forEach((button) => button.classList.toggle('active', button.dataset.filter === 'all'));
      renderJobs('all', 'remote');
      searchInput.value = 'remote';
      setMiniPanelMessage('Remote Jobs', 'Remote opportunities are highlighted for you.');
    }
  });
});

employerLink.addEventListener('click', (event) => {
  event.preventDefault();
  setMiniPanelMessage('Employer', 'Employer hub opened. Create a hiring plan for your team.');
});

langButton.addEventListener('click', () => {
  const currentLanguage = langButton.textContent.trim();
  const nextLanguage = currentLanguage === 'EN' ? 'PH' : 'EN';
  langButton.textContent = nextLanguage;
  setMiniPanelMessage('Language', `Application language switched to ${nextLanguage}.`);
});

getStartedButton.addEventListener('click', () => {
  searchInput.focus();
  searchInput.value = 'Frontend Developer';
  renderJobs('all', 'Frontend Developer');
  setMiniPanelMessage('Get Started', 'A recommended role is ready for review.');
});

promoButton.addEventListener('click', () => {
  setMiniPanelMessage('Resume Builder', 'The resume guide is now ready to help you craft a strong application.');
});

jobDetails.addEventListener('click', (event) => {
  const applyButton = event.target.closest('.detail-apply');
  if (!applyButton) return;

  applyButton.textContent = 'Application sent';
  applyButton.disabled = true;
  applyButton.style.opacity = '0.85';
  setMiniPanelMessage('Application', `You applied for ${document.querySelector('.detail-company h3')?.textContent || 'this role'}.`);
});

/* ---------- Init ---------- */

setMiniPanelMessage('Related Search', 'Try a role, company, or keyword to discover the best match.');
updateLoopConsole('for');
renderJobs('all', '');



