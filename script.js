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
    requirements: ['Define product roadmap', 'Analyze product metrics', 'Coordinate with design and engineering']
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
    renderJobs(button.dataset.filter, searchInput.value);
  });
});

searchInput.addEventListener('input', (event) => {
  const activeFilter = document.querySelector('.loop-filter.active')?.dataset.filter || 'all';
  renderJobs(activeFilter, event.target.value);
});

renderJobs('all', '');
