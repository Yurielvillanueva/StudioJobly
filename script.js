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
    photo: 'img/ethan.jpg',
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
    photo: 'img/alex.jpg',
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
    photo: 'img/samantha.jpg',
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
    photo: 'img/priya.jpg',
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
    photo: 'img/david.jpg',
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
    photo: 'img/hannah.jpg',
    category: 'doWhile',
    roles: ['Java', 'API', 'Backend'],
    description: 'Design reliable services, improve APIs, and ensure backend systems stay efficient and secure under load.',
    requirements: ['REST API design', 'Database optimization', 'Performance tuning']
  }
];

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
const loopPromptLabel = document.getElementById('loopPromptLabel');
const livePrompt = document.getElementById('livePrompt');
const liveConsole = document.getElementById('liveConsole');
const liveOutput = document.getElementById('liveOutput');
const livePromptEditor = document.getElementById('livePromptEditor');
const liveConsoleEditor = document.getElementById('liveConsoleEditor');
const liveOutputEditor = document.getElementById('liveOutputEditor');

let currentLoopKey = 'for';

const loopPrompts = {
  for: {
    label: 'For loop',
    prompt: 'for (int i = 0; i < 5; i++) {\n    System.out.println(i);\n}',
    console: '0\n1\n2\n3\n4',
    output: 'Printed values: 0, 1, 2, 3, 4'
  },
  while: {
    label: 'While loop',
    prompt: 'int count = 0;\nwhile (count < 4) {\n    System.out.println("Step " + count);\n    count++;\n}',
    console: 'Step 0\nStep 1\nStep 2\nStep 3',
    output: 'Executed 4 loop cycles'
  },
  doWhile: {
    label: 'Do-while loop',
    prompt: 'int num = 1;\ndo {\n    System.out.println(num);\n    num++;\n} while (num <= 3);',
    console: '1\n2\n3',
    output: 'Loop ran at least once'
  }
};

function syncPromptEditorsToCurrentLoop() {
  if (!livePromptEditor || !liveConsoleEditor || !liveOutputEditor) return;

  const selectedLoop = loopPrompts[currentLoopKey] || loopPrompts.for;
  selectedLoop.prompt = livePromptEditor.value;
  selectedLoop.console = liveConsoleEditor.value;
  selectedLoop.output = liveOutputEditor.value;
  updateLoopConsole(currentLoopKey);
}

function updateLoopConsole(loopKey = 'for') {
  currentLoopKey = loopKey;
  const selectedLoop = loopPrompts[loopKey] || loopPrompts.for;

  if (loopPromptLabel) {
    loopPromptLabel.textContent = selectedLoop.label;
  }

  if (livePromptEditor) {
    livePromptEditor.value = selectedLoop.prompt;
  }

  if (liveConsoleEditor) {
    liveConsoleEditor.value = selectedLoop.console;
  }

  if (liveConsole) {
    liveConsole.textContent = selectedLoop.console;
  }

  if (liveOutputEditor) {
    liveOutputEditor.value = selectedLoop.output;
  }

  if (liveOutput) {
    liveOutput.textContent = selectedLoop.output;
  }
}

function setMiniPanelMessage(title, message) {
  if (!miniPanel) return;
  miniPanel.innerHTML = `
    <h4>${title}</h4>
    <p>${message}</p>
  `;
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
      <span class="detail-tag">${job.category === 'for' ? 'For loop' : job.category === 'while' ? 'While loop' : 'Do-while loop'}</span>
    </div>
    <div class="detail-company">
      <img src="${job.photo}" alt="${job.company} logo" />
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

  const activeLoopKey = filter === 'all' ? 'for' : filter;
  updateLoopConsole(activeLoopKey);

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
        <img class="company-photo" src="${job.photo}" alt="${job.company} logo" />
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

[livePromptEditor, liveConsoleEditor, liveOutputEditor].forEach((element) => {
  if (!element) return;
  element.addEventListener('input', () => {
    syncPromptEditorsToCurrentLoop();
  });
});

searchInput.addEventListener('input', (event) => {
  const activeFilter = document.querySelector('.loop-filter.active')?.dataset.filter || 'all';
  const selectedLoop = activeFilter === 'all' ? 'for' : activeFilter;
  updateLoopConsole(selectedLoop);
  renderJobs(activeFilter, event.target.value);
});

searchButton.addEventListener('click', () => {
  const activeFilter = document.querySelector('.loop-filter.active')?.dataset.filter || 'all';
  renderJobs(activeFilter, searchInput.value);
  const query = searchInput.value.trim();
  const actionText = query ? `Search results updated for “${query}”.` : 'Showing all available roles.';
  setMiniPanelMessage('Search', actionText);
  searchInput.focus();
});

resetButton.addEventListener('click', () => {
  searchInput.value = '';
  filterButtons.forEach((button) => button.classList.toggle('active', button.dataset.filter === 'all'));
  renderJobs('all', '');
  setMiniPanelMessage('Filters', 'Everything has been reset to the full job list.');
});

navLinks.forEach((link) => {
  link.addEventListener('click', (event) => {
    event.preventDefault();
    updateNavState(link);

    if (link.textContent.trim() === 'Home') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      setMiniPanelMessage('Home', 'Welcome back to SwipeCareer.');
      return;
    }

    if (link.textContent.trim() === 'Find Jobs') {
      document.querySelector('.jobs-column')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      setMiniPanelMessage('Find Jobs', 'Browsing the latest job opportunities.');
      return;
    }

    if (link.textContent.trim() === 'Companies') {
      setMiniPanelMessage('Companies', 'Company profiles and hiring teams are ready to explore.');
      return;
    }

    if (link.textContent.trim() === 'APP') {
      searchInput.focus();
      setMiniPanelMessage('App', 'The job search bar is ready.');
      return;
    }

    if (link.textContent.trim() === 'Career Guide') {
      setMiniPanelMessage('Career Guide', 'Career coaching tips are available for your next step.');
      return;
    }

    if (link.textContent.trim() === 'Remote Jobs') {
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

setMiniPanelMessage('Related Search', 'Try a role, company, or keyword to discover the best match.');
updateLoopConsole('for');
renderJobs('all', '');
