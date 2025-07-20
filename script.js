document.addEventListener('DOMContentLoaded', () => {
    // --- DATA ---
    const projectsData = [
        {
            title: "Minecraft but My XP = World Size",
            thumbnail: "https://i.ytimg.com/vi/vD4UxduMOYI/maxresdefault.jpg",
            description: "Un plugin de challenge où la bordure du monde s'agrandit à chaque fois que le joueur gagne de l'expérience. Un concept simple mais qui demande une gestion précise des événements du jeu et de la world border.",
            technologies: ["Java 21", "Spigot API", "Minecraft 1.17"],
            youtubeId: "vD4UxduMOYI",
            githubLink: null,
            archiveLink: "https://mega.nz/file/KMJTVRpT#JiajPcs0EByY6sEoFyg4tOe6rA-v3tbyktdtenIA4cY"
        },
        {
            title: "Minecraft but everything I Touch turns to Lava",
            thumbnail: "https://i.ytimg.com/vi/FSw7U6tdxAQ/maxresdefault.jpg", 
            description: "Un plugin de challenge où tout ce que le joueur touche se transforme en lave. Cela nécessite une gestion précise des événements de bloc et des interactions du joueur.",
            technologies: ["Java", "Spigot API"],
            youtubeId: "FSw7U6tdxAQ", 
            githubLink: "",
            archiveLink: "https://mega.nz/file/WRYkgbba#lunWq52OXehaPmES8I9KbwpvayAmRsMMx-AJ0fHokS0"
        },
        {
            title: "Minecraft but there's Only One Block",
            thumbnail: "https://i.ytimg.com/vi/FnqZoJNkpEQ/maxresdefault.jpg",
            description: "Le fameux concept 'One Block'. Un plugin qui génère un monde contenant un seul bloc qui se régénère à l'infini avec des ressources aléatoires, évoluant à travers différentes phases de jeu.",
            technologies: ["Java", "Spigot API", "World Generation"],
            youtubeId: "FnqZoJNkpEQ",
            githubLink: null,
            archiveLink: "https://mega.nz/file/rEhkiDCJ#jR0hMIVEImUOqtPhq11L78C5UB6_zTuLP8aY1aMSoI8"
        }
    ];

    const skills = [
        { name: 'Java', logo: 'https://raw.githubusercontent.com/devicons/devicon/master/icons/java/java-original.svg' },
        { name: 'Spigot API', logo: './images/spigot.png' },
        { name: 'Git', logo: 'https://raw.githubusercontent.com/devicons/devicon/master/icons/git/git-original.svg' },
        { name: 'Maven', logo: 'https://raw.githubusercontent.com/devicons/devicon/master/icons/maven/maven-original.svg' },
        { name: 'Minestom', logo: './images/minestom.png' },
    ];

    // --- SETUP FUNCTIONS ---

    function setupProjects() {
        const projectsGrid = document.getElementById('projects-grid');
        if (!projectsGrid) return;
        projectsData.forEach((project, index) => {
            const card = document.createElement('div');
            card.className = 'project-card';
            card.dataset.index = index;
            card.innerHTML = `<img src="${project.thumbnail}" alt="Miniature du projet ${project.title}" class="project-thumbnail" onerror="this.onerror=null;this.src='https://placehold.co/600x400/1a1a1a/f0f0f0?text=Image+introuvable';"><h3 class="project-title">${project.title}</h3>`;
            projectsGrid.appendChild(card);
        });
    }

    function setupModal() {
        const modal = document.getElementById('project-modal');
        const closeButton = document.querySelector('.close-button');
        const projectsGrid = document.getElementById('projects-grid');
        if (!modal || !closeButton || !projectsGrid) return;

        projectsGrid.addEventListener('click', (e) => {
            const card = e.target.closest('.project-card');
            if (card) {
                const projectIndex = card.dataset.index;
                const project = projectsData[projectIndex];
                
                document.getElementById('modal-title').textContent = project.title;
                document.getElementById('modal-video').src = `https://www.youtube.com/embed/${project.youtubeId}`;
                document.getElementById('modal-description').textContent = project.description;

                const techContainer = document.getElementById('modal-tech');
                techContainer.innerHTML = '';
                project.technologies.forEach(tech => {
                    techContainer.innerHTML += `<div class="skill-pill">${tech}</div>`;
                });

                const linksContainer = document.getElementById('modal-links');
                linksContainer.innerHTML = '';
                if (project.githubLink) linksContainer.innerHTML += `<a href="${project.githubLink}" target="_blank" class="contact-btn">Voir le code</a>`;
                if (project.archiveLink) linksContainer.innerHTML += `<a href="${project.archiveLink}" target="_blank" class="contact-btn">Voir l'archive</a>`;
                
                modal.style.display = 'flex';
            }
        });

        const closeModal = () => {
            modal.style.animation = 'slideOutModal 0.4s ease-out forwards';
            setTimeout(() => {
                modal.style.display = 'none';
                modal.style.animation = 'slideInModal 0.4s ease-out';
                document.getElementById('modal-video').src = '';
            }, 400);
        };

        closeButton.addEventListener('click', closeModal);
        modal.addEventListener('click', (e) => { if (e.target === modal) closeModal(); });
    }

    function setupMindMap() {
        const mindmapSection = document.querySelector('.mindmap-section');
        const svgContainer = document.getElementById('mindmap-svg');
        if (!mindmapSection || !svgContainer || window.innerWidth <= 768) return;

        const hubLogo = document.getElementById('hub-logo');
        if (hubLogo) hubLogo.src = './pdp.jpg';

        const radius = 250;
        const angleStep = (2 * Math.PI) / skills.length;

        skills.forEach((skill, i) => {
            const angle = i * angleStep - (Math.PI / 2);
            const x = Math.cos(angle) * radius + (mindmapSection.offsetWidth / 2);
            const y = Math.sin(angle) * radius + (mindmapSection.offsetHeight / 2);

            const skillNode = document.createElement('div');
            skillNode.className = 'skill-node';
            skillNode.style.left = `${x - 80}px`; // Ajusté pour la nouvelle largeur (160px/2 = 80px)
            skillNode.style.top = `${y - 35}px`;  // Ajusté pour la nouvelle hauteur
            skillNode.innerHTML = `
                <img src="${skill.logo}" alt="${skill.name}" onerror="this.style.display='none'">
                <span>${skill.name}</span>
            `;
            mindmapSection.appendChild(skillNode);

            const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
            line.setAttribute('x1', mindmapSection.offsetWidth / 2);
            line.setAttribute('y1', mindmapSection.offsetHeight / 2);
            line.setAttribute('x2', x);
            line.setAttribute('y2', y);
            
            const length = Math.hypot(x - mindmapSection.offsetWidth / 2, y - mindmapSection.offsetHeight / 2);
            line.style.strokeDasharray = length;
            line.style.strokeDashoffset = length;
            svgContainer.appendChild(line);
        });

        new IntersectionObserver(entries => {
            const lines = svgContainer.querySelectorAll('line');
            if (entries[0].isIntersecting) {
                lines.forEach((line, i) => {
                    setTimeout(() => line.style.strokeDashoffset = '0', i * 150);
                });
            } else {
                 lines.forEach(line => {
                    line.style.strokeDashoffset = line.getTotalLength();
                 });
            }
        }, {threshold: 0.6}).observe(mindmapSection);
    }

    function setupAnimations() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                entry.target.classList.toggle('is-visible', entry.isIntersecting);
            });
        }, { root: null, rootMargin: '0px', threshold: 0.2 });

        document.querySelectorAll('.flow-node').forEach(el => observer.observe(el));

        const mainConnector = document.getElementById('main-connector');
        if (mainConnector) {
            const path = mainConnector.querySelector('path');
            const length = path.getTotalLength();
            path.style.strokeDasharray = length;
            path.style.strokeDashoffset = length;

            new IntersectionObserver(entries => {
                const entry = entries[0];
                path.style.strokeDashoffset = entry.isIntersecting ? '0' : length;
            }, { threshold: 0.1 }).observe(mainConnector);
        }
    }

    function setupContact() {
        const contactSkin = document.getElementById('contact-skin');
        if (contactSkin) contactSkin.src = './images/skin.png';

        document.getElementById('discord-username-btn').addEventListener('click', (e) => {
            navigator.clipboard.writeText('tiktok').then(() => {
                const originalText = e.target.textContent;
                e.target.textContent = 'Copié !';
                setTimeout(() => { e.target.textContent = 'Discord: tiktok'; }, 2000);
            });
        });
    }

    function setupJourney() {
        // Animation de la barre d'XP officielle
        const xpBar = document.getElementById('xp-progress');
        const journeySteps = document.querySelectorAll('.journey-step');
        const timelineItems = document.querySelectorAll('.timeline-item');
        
        // Observer pour la barre d'XP
        const xpObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    // Animation fluide de la barre d'XP
                    let progress = 0;
                    const targetProgress = 78; // 78% de progression
                    
                    const animateXP = () => {
                        if (progress < targetProgress) {
                            progress += 1;
                            xpBar.style.width = progress + '%';
                            
                            // Effet de particules d'XP à certains paliers
                            if (progress % 15 === 0) {
                                createXPBurst();
                            }
                            
                            setTimeout(animateXP, 30);
                        }
                    };
                    
                    setTimeout(animateXP, 800);
                }
            });
        }, { threshold: 0.5 });
        
        if (xpBar) {
            xpObserver.observe(xpBar.parentElement);
        }

        // Observer pour les éléments de timeline détaillée
        const timelineObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-visible');
                    
                    // Effet de pop sur l'icône
                    const icon = entry.target.querySelector('.timeline-icon');
                    setTimeout(() => {
                        icon.style.transform = 'scale(1.2)';
                        setTimeout(() => {
                            icon.style.transform = 'scale(1)';
                        }, 200);
                    }, 300);
                }
            });
        }, { threshold: 0.3 });

        timelineItems.forEach(item => {
            timelineObserver.observe(item);
        });

        // Animations des milestones du parcours court
        const milestones = document.querySelectorAll('.journey-milestone');
        milestones.forEach((milestone, index) => {
            milestone.addEventListener('mouseenter', () => {
                createMinecraftParticles(milestone.querySelector('.milestone-icon'));
            });
        });
    }

    function createXPBurst() {
        const xpBar = document.getElementById('xp-progress');
        if (!xpBar) return;
        
        const rect = xpBar.getBoundingClientRect();
        
        for (let i = 0; i < 6; i++) {
            const particle = document.createElement('div');
            particle.style.cssText = `
                position: fixed;
                width: 8px;
                height: 8px;
                background: radial-gradient(circle, #00d4ff, #0099cc);
                border-radius: 50%;
                pointer-events: none;
                z-index: 1000;
                left: ${rect.right - 30 + Math.random() * 60}px;
                top: ${rect.top + rect.height / 2}px;
                box-shadow: 0 0 10px rgba(0, 212, 255, 0.8);
            `;
            
            document.body.appendChild(particle);
            
            const angle = Math.random() * Math.PI * 2;
            const distance = 40 + Math.random() * 50;
            const duration = 1000 + Math.random() * 500;
            
            particle.animate([
                { 
                    transform: 'translate(0, 0) scale(1)',
                    opacity: 1
                },
                { 
                    transform: `translate(${Math.cos(angle) * distance}px, ${Math.sin(angle) * distance - 30}px) scale(0)`,
                    opacity: 0
                }
            ], {
                duration: duration,
                easing: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)'
            }).onfinish = () => particle.remove();
        }
    }

    function createMinecraftParticles(element) {
        for (let i = 0; i < 8; i++) {
            const particle = document.createElement('div');
            particle.style.cssText = `
                position: absolute;
                width: 6px;
                height: 6px;
                background: radial-gradient(circle, #00d4ff, #0099cc);
                border-radius: 50%;
                pointer-events: none;
                z-index: 1000;
                box-shadow: 0 0 8px rgba(0, 212, 255, 0.6);
            `;
            
            const rect = element.getBoundingClientRect();
            particle.style.left = (rect.left + rect.width / 2) + 'px';
            particle.style.top = (rect.top + rect.height / 2) + 'px';
            
            document.body.appendChild(particle);
            
            const angle = (i / 8) * Math.PI * 2;
            const distance = 30 + Math.random() * 25;
            const duration = 800 + Math.random() * 400;
            
            particle.animate([
                { 
                    transform: 'translate(0, 0) scale(1)',
                    opacity: 1
                },
                { 
                    transform: `translate(${Math.cos(angle) * distance}px, ${Math.sin(angle) * distance - 15}px) scale(0)`,
                    opacity: 0
                }
            ], {
                duration: duration,
                easing: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)'
            }).onfinish = () => particle.remove();
        }
    }

    // --- INITIALIZE ---
    setupProjects();
    setupModal();
    setupMindMap();
    setupAnimations();
    setupJourney();
    setupContact();
    setupScrollToProjects();
});

// Animation de scroll vers les projets
function setupScrollToProjects() {
    const goToProjectsBtn = document.getElementById('goToProjects');
    if (!goToProjectsBtn) return;

    goToProjectsBtn.addEventListener('click', () => {
        // Animation de particules
        createScrollParticles(goToProjectsBtn);
        
        // Scroll fluide vers les projets avec effet rebond
        setTimeout(() => {
            const projectsSection = document.getElementById('projects');
            if (projectsSection) {
                projectsSection.scrollIntoView({ 
                    behavior: 'smooth',
                    block: 'start'
                });
                
                // Effet de highlight sur la section projets
                projectsSection.style.transform = 'scale(1.02)';
                projectsSection.style.transition = 'transform 0.3s ease';
                setTimeout(() => {
                    projectsSection.style.transform = 'scale(1)';
                }, 300);
            }
        }, 200);
    });
}

// Créer des particules lors du clic
function createScrollParticles(button) {
    const rect = button.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    for (let i = 0; i < 8; i++) {
        const particle = document.createElement('div');
        particle.style.cssText = `
            position: fixed;
            width: 6px;
            height: 6px;
            background: radial-gradient(circle, #00d4ff, #0099cc);
            border-radius: 50%;
            pointer-events: none;
            z-index: 10000;
            left: ${centerX}px;
            top: ${centerY}px;
            box-shadow: 0 0 10px #00d4ff;
        `;

        document.body.appendChild(particle);

        const angle = (i / 8) * Math.PI * 2;
        const distance = 100 + Math.random() * 50;
        const endX = centerX + Math.cos(angle) * distance;
        const endY = centerY + Math.sin(angle) * distance;

        particle.animate([
            { 
                left: `${centerX}px`, 
                top: `${centerY}px`, 
                opacity: 1, 
                transform: 'scale(1)' 
            },
            { 
                left: `${endX}px`, 
                top: `${endY}px`, 
                opacity: 0, 
                transform: 'scale(0)' 
            }
        ], {
            duration: 600 + Math.random() * 200,
            easing: 'cubic-bezier(0.4, 0, 0.2, 1)',
            fill: 'forwards'
        }).addEventListener('finish', () => {
            particle.remove();
        });
    }
}
