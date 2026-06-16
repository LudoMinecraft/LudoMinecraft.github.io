document.addEventListener('DOMContentLoaded', () => {
  // Data
  const projectsData = [
    {
      title: 'Minecraft but My XP = World Size',
      type: 'Plugin Spigot · YouTube',
      thumbnail: 'https://i.ytimg.com/vi/vD4UxduMOYI/maxresdefault.jpg',
      description: "La world border grandit à chaque XP. Gestion fine des events et de la WorldBorder.",
      technologies: ['Java 21', 'Spigot API', 'Minecraft 1.17'],
      youtubeId: 'vD4UxduMOYI',
      githubLink: null,
      archiveLink: 'https://mega.nz/file/KMJTVRpT#JiajPcs0EByY6sEoFyg4tOe6rA-v3tbyktdtenIA4cY',
      discordLink: null,
    },
    {
      title: 'Minecraft but everything I Touch turns to Lava',
      type: 'Plugin Spigot · YouTube',
      thumbnail: 'https://i.ytimg.com/vi/FSw7U6tdxAQ/maxresdefault.jpg',
      description: "Tout ce que je touche devient de la lave. Gestion des interactions et des blocs.",
      technologies: ['Java 21', 'Spigot API', 'Minecraft 1.17'],
      youtubeId: 'FSw7U6tdxAQ',
      githubLink: '',
      archiveLink: 'https://mega.nz/file/WRYkgbba#lunWq52OXehaPmES8I9KbwpvayAmRsMMx-AJ0fHokS0',
      discordLink: null,
    },
    {
      title: "Minecraft but there's Only One Block",
      type: 'Plugin Spigot · YouTube',
      thumbnail: 'https://i.ytimg.com/vi/FnqZoJNkpEQ/maxresdefault.jpg',
      description: "One Block infini avec phases et loot évolutifs.",
      technologies: ['Java 21', 'Spigot API', 'Minecraft 1.17'],
      youtubeId: 'FnqZoJNkpEQ',
      githubLink: null,
      archiveLink: 'https://mega.nz/file/rEhkiDCJ#jR0hMIVEImUOqtPhq11L78C5UB6_zTuLP8aY1aMSoI8',
      discordLink: null,
    },
    {
      title: 'Plugin Feu — pour Exra',
      type: 'Plugin Paper · Commandé',
      thumbnail: 'https://yt3.googleusercontent.com/NsFp25yC6O0VzcgfduMOkAci_wEIcPs4HnSaUiURj67alol4PenQ-FUS9M9GO6yNcDsJVuOFQQ=s800-c-k-c0x00ffffff-no-rj',
      description: "Plugin créé pour le YouTubeur Exra : le joueur est constamment en feu, sauf dans l'eau et dans les chaudrons remplis d'eau. Simple mais efficace — la vidéo n'est jamais sortie.",
      technologies: ['Java 21', 'Paper API', 'Minecraft 1.20'],
      youtubeId: null,
      githubLink: null,
      archiveLink: null,
      discordLink: null,
    },
    {
      title: 'HeadLifes SMP',
      type: 'Plugin Paper · SMP',
      thumbnail: 'https://cdn.discordapp.com/icons/1377340027612168212/9d0d47c2936d295f37b454d18ad2d9ac.png?size=256',
      description: "SMP custom : les joueurs droppent leur tête à la mort. À la Forge, poser 5 têtes permet de fabriquer une arme cheat. Des NPCs permettent d'obtenir de la bière.",
      technologies: ['Java 21', 'Paper API', 'Minecraft 1.20'],
      youtubeId: null,
      githubLink: null,
      archiveLink: null,
      discordLink: 'https://discord.gg/Wrf3m75Qhb',
    },
    {
      title: 'Réputation SMP',
      type: 'Plugin Paper · SMP',
      thumbnail: 'https://cdn.discordapp.com/icons/1514952705695809586/64c0872a0859bfe46f17e1b079b95917.png?size=256',
      description: "SMP avec système de réputation : points gagnés via succès, kills de joueurs et de boss. /shop pour acheter des effets de potion. Crafts custom disponibles avec ces mêmes points.",
      technologies: ['Java 25', 'Paper API', 'Minecraft 1.21'],
      youtubeId: null,
      githubLink: null,
      archiveLink: null,
      discordLink: 'https://discord.gg/ZmwRd6TpE3',
    },
  ];

  const skills = [
    { name: 'Java', tag: 'langage', desc: 'Langage principal, écosystème JVM', logo: 'https://raw.githubusercontent.com/devicons/devicon/master/icons/java/java-original.svg' },
    { name: 'Spigot API', tag: 'api serveur', desc: 'Plugins pour serveurs Minecraft', logo: './images/spigot.webp' },
    { name: 'Minestom', tag: 'api serveur', desc: 'Serveurs Minecraft sur mesure', logo: './images/minestom.webp' },
    { name: 'Fabric', tag: 'modding', desc: 'Mods Minecraft légers et rapides', logo: 'https://fabricmc.net/assets/logo.png' },
    { name: 'Git', tag: 'versioning', desc: 'Suivi de version & collaboration', logo: 'https://raw.githubusercontent.com/devicons/devicon/master/icons/git/git-original.svg' },
    { name: 'Maven', tag: 'build', desc: 'Build & gestion des dépendances', logo: 'https://raw.githubusercontent.com/devicons/devicon/master/icons/maven/maven-original.svg' },
    { name: 'Gradle', tag: 'build', desc: 'Build & gestion des dépendances', logo: 'https://raw.githubusercontent.com/devicons/devicon/master/icons/gradle/gradle-original.svg' },
  ];

  // Utilities
  const els = (sel) => Array.from(document.querySelectorAll(sel));
  const clamp = (v, min, max) => Math.min(Math.max(v, min), max);

  function showToast(msg) {
    const t = document.getElementById('toast');
    if (!t) return;
    t.textContent = msg;
    t.classList.add('show');
    setTimeout(() => t.classList.remove('show'), 1600);
  }

  // Stack grid
  function setupStack() {
    const grid = document.getElementById('stack-grid');
    if (!grid) return;
    grid.innerHTML = skills.map((s) => `
      <div class="stack-card">
        <div class="stack-card-head">
          <img src="${s.logo}" alt="${s.name}" width="32" height="32" loading="lazy" onerror="this.onerror=null;this.src='https://placehold.co/32x32/13151a/e7e9ec?text=%20'">
          <div class="stack-card-text">
            <span class="stack-name">${s.name}</span>
            <span class="stack-tag">${s.tag}</span>
          </div>
        </div>
        <p class="stack-desc">${s.desc}</p>
      </div>
    `).join('');
  }

  // Projects grid
  function setupProjects() {
    const grid = document.getElementById('projects-grid');
    if (!grid) return;
    grid.innerHTML = '';
    projectsData.forEach((p, i) => {
      const card = document.createElement('div');
      card.className = 'project-card';
      card.dataset.index = String(i);
      card.innerHTML = `
        <div class="project-file-bar"><span class="term-dot"></span><span>${p.technologies[0].toLowerCase().replace(/\s+/g, '-')}.replay</span></div>
        <img src="${p.thumbnail}" alt="Miniature ${p.title}" class="project-thumbnail" width="640" height="360" loading="lazy" onerror="this.onerror=null;this.src='https://placehold.co/600x400/13151a/e7e9ec?text=Image'">
        <div class="project-info">
          <h3 class="project-title">${p.title}</h3>
          <p class="project-type">${p.type}</p>
        </div>
      `;
      grid.appendChild(card);
    });
  }

  // Modal
  function setupModal() {
    const modal = document.getElementById('project-modal');
    const closeBtn = modal?.querySelector('.close-button');
    const grid = document.getElementById('projects-grid');
    if (!modal || !closeBtn || !grid) return;

    const title = document.getElementById('modal-title');
    const desc = document.getElementById('modal-description');
    const tech = document.getElementById('modal-tech');
    const links = document.getElementById('modal-links');
    const iframe = document.getElementById('modal-video');

    function open(project) {
      title.textContent = project.title;
      desc.textContent = project.description;
      tech.innerHTML = project.technologies.map(t => `<span class="skill-pill">${t}</span>`).join('');
      links.innerHTML = '';

      const videoContainer = modal.querySelector('.modal-video-container');
      if (project.youtubeId) {
        iframe.src = `https://www.youtube.com/embed/${project.youtubeId}`;
        if (videoContainer) videoContainer.style.display = '';
      } else {
        iframe.src = '';
        if (videoContainer) videoContainer.style.display = 'none';
      }

      if (project.githubLink) {
        const a = document.createElement('a');
        a.href = project.githubLink; a.target = '_blank'; a.rel = 'noopener';
        a.className = 'btn btn-ghost'; a.textContent = 'Code source';
        links.appendChild(a);
      }
      if (project.archiveLink) {
        const a = document.createElement('a');
        a.href = project.archiveLink; a.target = '_blank'; a.rel = 'noopener';
        a.className = 'btn btn-primary'; a.textContent = 'Télécharger';
        links.appendChild(a);
      }
      if (project.discordLink) {
        const a = document.createElement('a');
        a.href = project.discordLink; a.target = '_blank'; a.rel = 'noopener';
        a.className = 'btn btn-primary'; a.textContent = 'Rejoindre le Discord';
        links.appendChild(a);
      }
      modal.classList.add('open');
      modal.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden';
    }

    function close() {
      modal.classList.remove('open');
      modal.setAttribute('aria-hidden', 'true');
      iframe.src = '';
      document.body.style.overflow = '';
      const videoContainer = modal.querySelector('.modal-video-container');
      if (videoContainer) videoContainer.style.display = '';
    }

    grid.addEventListener('click', (e) => {
      const card = e.target.closest('.project-card');
      if (!card) return;
      const idx = Number(card.dataset.index);
      const project = projectsData[idx];
      if (project) open(project);
    });

    closeBtn.addEventListener('click', close);
    modal.addEventListener('click', (e) => { if (e.target === modal) close(); });
    window.addEventListener('keydown', (e) => { if (e.key === 'Escape' && modal.classList.contains('open')) close(); });
  }

  // Reveal on scroll
  function setupAnimations() {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) entry.target.classList.add('is-visible');
      });
    }, { threshold: 0.15 });
    els('.flow-node').forEach((node) => observer.observe(node));
  }

  // Contact
  function setupContact() {
    const btn = document.getElementById('discord-username-btn');
    if (!btn) return;
    btn.addEventListener('click', async () => {
      try {
        await navigator.clipboard.writeText('@tiktoks');
        showToast('Pseudo Discord copié');
      } catch {
        showToast('Impossible de copier');
      }
    });
  }

  // Mobile nav
  function setupMobileNav() {
    const toggle = document.getElementById('navToggle');
    const nav = document.getElementById('siteNav');
    if (!toggle || !nav) return;

    toggle.addEventListener('click', () => {
      const isOpen = nav.classList.toggle('open');
      toggle.setAttribute('aria-expanded', String(isOpen));
    });

    nav.addEventListener('click', (e) => {
      if (e.target.closest('a')) {
        nav.classList.remove('open');
        toggle.setAttribute('aria-expanded', 'false');
      }
    });
  }

  // init
  setupStack();
  setupProjects();
  setupModal();
  setupAnimations();
  setupContact();
  setupMobileNav();
});