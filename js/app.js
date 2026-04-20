document.addEventListener('DOMContentLoaded', () => {
    // Remove loader
    setTimeout(() => {
        const loader = document.getElementById('loader');
        loader.style.opacity = '0';
        setTimeout(() => loader.style.display = 'none', 500);
    }, 800);

    // Navbar Scroll Effect
    const navbar = document.getElementById('navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Mobile Menu Toggle
    const mobileBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');
    const mobileBtnIcon = mobileBtn ? mobileBtn.querySelector('i') : null;

    if (mobileBtn && navLinks) {
        mobileBtn.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            if (mobileBtnIcon) {
                mobileBtnIcon.classList.toggle('fa-bars');
                mobileBtnIcon.classList.toggle('fa-times');
            }
        });

        // Close menu when a link is clicked
        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
                if (mobileBtnIcon) {
                    mobileBtnIcon.classList.add('fa-bars');
                    mobileBtnIcon.classList.remove('fa-times');
                }
            });
        });
    }

    // Initialize Vanilla-tilt (Only on products, service-cards use CSS flips)
    if (window.VanillaTilt) {
        VanillaTilt.init(document.querySelectorAll(".product-card"), {
            max: 10,
            speed: 400,
            glare: true,
            "max-glare": 0.15,
            scale: 1.02
        });
    }

    // Hero Background Slider
    const slides = document.querySelectorAll('.hero-slider .slide');
    if (slides.length > 0) {
        let currentSlide = 0;
        setInterval(() => {
            slides[currentSlide].classList.remove('active');
            currentSlide = (currentSlide + 1) % slides.length;
            slides[currentSlide].classList.add('active');
        }, 5000); // Change image every 5 seconds
    }

    // Custom Cursor tracking
    const cursor = document.querySelector('.custom-cursor');
    const follower = document.querySelector('.cursor-follower');
    
    if (cursor && follower) {
        document.addEventListener('mousemove', (e) => {
            cursor.style.left = e.clientX + 'px';
            cursor.style.top = e.clientY + 'px';
            
            setTimeout(() => {
                follower.style.left = e.clientX + 'px';
                follower.style.top = e.clientY + 'px';
            }, 50);
        });

        const hoverables = document.querySelectorAll('a, button, .service-card, .product-card, input, select, textarea');
        hoverables.forEach(el => {
            el.addEventListener('mouseenter', () => document.body.classList.add('cursor-hover'));
            el.addEventListener('mouseleave', () => document.body.classList.remove('cursor-hover'));
        });
    }

    // Typing effect for Hero
    const typeTarget = document.querySelector('.type-effect');
    if (typeTarget) {
        const words = ['Intelligent Software', 'AI Solutions', 'Future Technologies'];
        let wordIndex = 0;
        let charIndex = 0;
        let isDeleting = false;

        function type() {
            const currentWord = words[wordIndex];
            
            if (isDeleting) {
                typeTarget.textContent = currentWord.substring(0, charIndex - 1);
                charIndex--;
            } else {
                typeTarget.textContent = currentWord.substring(0, charIndex + 1);
                charIndex++;
            }

            let typeSpeed = isDeleting ? 40 : 100;

            if (!isDeleting && charIndex === currentWord.length) {
                typeSpeed = 2000;
                isDeleting = true;
            } else if (isDeleting && charIndex === 0) {
                isDeleting = false;
                wordIndex = (wordIndex + 1) % words.length;
                typeSpeed = 400;
            }

            setTimeout(type, typeSpeed);
        }
        
        setTimeout(type, 1000); // Start after 1 second intro
    }

    // ----------------------------------------------------
    // Form Mailto Submission
    // ----------------------------------------------------
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(event) {
            event.preventDefault();
            
            const name = document.getElementById('user_name').value;
            const email = document.getElementById('user_email').value;
            const service = document.getElementById('user_service').value;
            const message = document.getElementById('message').value;
            
            const subject = encodeURIComponent(`New Inquiry: ${service} from ${name}`);
            const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\nService: ${service}\n\nMessage:\n${message}`);
            
            window.location.href = `mailto:hello@neurobraintec.com?subject=${subject}&body=${body}`;
        });
    }

    // ----------------------------------------------------
    // Cookie Popup Logic
    // ----------------------------------------------------
    const cookiePopup = document.getElementById('cookie-popup');
    const acceptBtn = document.getElementById('accept-cookies');
    const declineBtn = document.getElementById('decline-cookies');

    if (cookiePopup) {
        if (!localStorage.getItem('cookie_consent')) {
            setTimeout(() => {
                cookiePopup.classList.add('show');
            }, 3000); // Show after 3 seconds
        }

        const closePopup = (status) => {
            localStorage.setItem('cookie_consent', status);
            cookiePopup.classList.remove('show');
        };

        if (acceptBtn) acceptBtn.addEventListener('click', () => closePopup('accepted'));
        if (declineBtn) declineBtn.addEventListener('click', () => closePopup('declined'));
    }

    // ----------------------------------------------------
    // Welcome Popup Logic
    // ----------------------------------------------------
    const welcomeOverlay = document.getElementById('welcome-overlay');
    const closeWelcomeBtn = document.getElementById('close-welcome');
    const exploreBtn = document.getElementById('explore-btn');

    if (welcomeOverlay) {
        if (!sessionStorage.getItem('welcome_shown')) {
            setTimeout(() => {
                welcomeOverlay.classList.add('show');
            }, 800); // Show shortly after load

            const closeWelcome = () => {
                welcomeOverlay.classList.remove('show');
                sessionStorage.setItem('welcome_shown', 'true');
            };

            if (closeWelcomeBtn) closeWelcomeBtn.addEventListener('click', closeWelcome);
            if (exploreBtn) exploreBtn.addEventListener('click', closeWelcome);
        }
    }

    // ----------------------------------------------------
    // ----------------------------------------------------
    const themeToggleBtn = document.getElementById('theme-toggle');
    const themeIcon = document.getElementById('theme-icon');
    
    // Check saved theme
    const savedTheme = localStorage.getItem('site_theme');
    if (savedTheme === 'light') {
        document.body.removeAttribute('data-theme');
        if (themeIcon) {
            themeIcon.classList.remove('fa-sun');
            themeIcon.classList.add('fa-moon');
        }
    } else {
        document.body.setAttribute('data-theme', 'dark');
        if (themeIcon) {
            themeIcon.classList.remove('fa-moon');
            themeIcon.classList.add('fa-sun');
        }
    }

    if (themeToggleBtn) {
        themeToggleBtn.addEventListener('click', () => {
            const currentTheme = document.body.getAttribute('data-theme');
            if (currentTheme === 'dark') {
                document.body.removeAttribute('data-theme');
                localStorage.setItem('site_theme', 'light');
                themeIcon.classList.remove('fa-sun');
                themeIcon.classList.add('fa-moon');
                setTimeout(() => { 
                    if (scene && fogLight && pMaterial && lineMaterial) { 
                        scene.fog = fogLight; 
                        pMaterial.color.setHex(0x0ea5e9); 
                        pMaterial.blending = THREE.NormalBlending;
                        pMaterial.needsUpdate = true;
                        lineMaterial.color.setHex(0x3b82f6);
                        lineMaterial.blending = THREE.NormalBlending;
                        lineMaterial.opacity = 0.3;
                        lineMaterial.needsUpdate = true;
                        
                        if (typeof brainMaterial !== 'undefined' && brainNodesMaterial) {
                            brainMaterial.color.setHex(0x0ea5e9);
                            brainNodesMaterial.color.setHex(0x8b5cf6);
                        }
                    } 
                }, 10);
            } else {
                document.body.setAttribute('data-theme', 'dark');
                localStorage.setItem('site_theme', 'dark');
                themeIcon.classList.remove('fa-moon');
                themeIcon.classList.add('fa-sun');
                setTimeout(() => { 
                    if (scene && fogDark && pMaterial && lineMaterial) { 
                        scene.fog = fogDark; 
                        pMaterial.color.setHex(0x00f0ff); 
                        pMaterial.blending = THREE.AdditiveBlending;
                        pMaterial.needsUpdate = true;
                        lineMaterial.color.setHex(0x7b2cbf);
                        lineMaterial.blending = THREE.AdditiveBlending;
                        lineMaterial.opacity = 0.15;
                        lineMaterial.needsUpdate = true;
                        
                        if (typeof brainMaterial !== 'undefined' && brainNodesMaterial) {
                            brainMaterial.color.setHex(0x00f0ff);
                            brainNodesMaterial.color.setHex(0x7b2cbf);
                        }
                    } 
                }, 10);
            }
        });
    }

    // ----------------------------------------------------
    // Three.js Neural Network/Particle Background
    // ----------------------------------------------------
    let scene, fogLight, fogDark, pMaterial, lineMaterial;
    
    initThreeJS();
    initAIBrainScroll();
    initScrollAnimations();
});

// ----------------------------------------------------
// GSAP Scroll-Triggered Entrance Animations
// ----------------------------------------------------
function initScrollAnimations() {
    if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') return;
    gsap.registerPlugin(ScrollTrigger);

    // Helper: create a scroll-triggered animation
    function scrollAnim(selector, fromVars, toVars, staggerVal) {
        const elements = document.querySelectorAll(selector);
        if (!elements.length) return;
        elements.forEach(el => {
            gsap.fromTo(el, fromVars, {
                ...toVars,
                scrollTrigger: {
                    trigger: el,
                    start: 'top 88%',
                    end: 'top 60%',
                    toggleActions: 'play none none none',
                }
            });
        });
    }

    // --- Section Headers: Slide up + fade ---
    gsap.utils.toArray('.section-header').forEach(header => {
        gsap.fromTo(header,
            { y: 60, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out',
              scrollTrigger: { trigger: header, start: 'top 88%' }
            }
        );
    });

    // --- Service Cards: Alternate left/right slide ---
    gsap.utils.toArray('.service-card').forEach((card, i) => {
        const fromX = i % 2 === 0 ? -120 : 120;
        gsap.fromTo(card,
            { x: fromX, opacity: 0, rotateY: i % 2 === 0 ? 15 : -15 },
            { x: 0, opacity: 1, rotateY: 0, duration: 0.9, ease: 'power3.out',
              scrollTrigger: { trigger: card, start: 'top 90%' },
              delay: (i % 3) * 0.1
            }
        );
    });

    // --- Product Cards: Scale up from bottom ---
    gsap.utils.toArray('.product-card').forEach((card, i) => {
        gsap.fromTo(card,
            { y: 80, opacity: 0, scale: 0.85 },
            { y: 0, opacity: 1, scale: 1, duration: 0.7, ease: 'back.out(1.4)',
              scrollTrigger: { trigger: card, start: 'top 90%' },
              delay: (i % 4) * 0.08
            }
        );
    });

    // --- Case Study Cards: Slide from left ---
    gsap.utils.toArray('.case-card').forEach((card, i) => {
        gsap.fromTo(card,
            { x: -100, opacity: 0, rotateZ: -3 },
            { x: 0, opacity: 1, rotateZ: 0, duration: 0.8, ease: 'power3.out',
              scrollTrigger: { trigger: card, start: 'top 88%' },
              delay: i * 0.15
            }
        );
    });

    // --- Team Cards: Pop from bottom with stagger ---
    gsap.utils.toArray('.team-card').forEach((card, i) => {
        gsap.fromTo(card,
            { y: 100, opacity: 0, scale: 0.8, rotateX: 10 },
            { y: 0, opacity: 1, scale: 1, rotateX: 0, duration: 0.8, ease: 'back.out(1.6)',
              scrollTrigger: { trigger: card, start: 'top 90%' },
              delay: i * 0.12
            }
        );
    });

    // --- Office Cards: Slide from right ---
    gsap.utils.toArray('.office-card').forEach((card, i) => {
        gsap.fromTo(card,
            { x: 120, opacity: 0 },
            { x: 0, opacity: 1, duration: 0.7, ease: 'power3.out',
              scrollTrigger: { trigger: card, start: 'top 90%' },
              delay: i * 0.1
            }
        );
    });

    // --- About Container: Slide from left ---
    gsap.utils.toArray('.about-container').forEach(el => {
        gsap.fromTo(el,
            { x: -150, opacity: 0 },
            { x: 0, opacity: 1, duration: 1, ease: 'power3.out',
              scrollTrigger: { trigger: el, start: 'top 85%' }
            }
        );
    });

    // --- Partners Container: Slide from right ---
    gsap.utils.toArray('.partners-container').forEach(el => {
        gsap.fromTo(el,
            { x: 150, opacity: 0 },
            { x: 0, opacity: 1, duration: 1, ease: 'power3.out',
              scrollTrigger: { trigger: el, start: 'top 85%' }
            }
        );
    });

    // --- Career Box: Scale up from center ---
    gsap.utils.toArray('.career-box').forEach(el => {
        gsap.fromTo(el,
            { scale: 0.8, opacity: 0, y: 60 },
            { scale: 1, opacity: 1, y: 0, duration: 0.9, ease: 'power3.out',
              scrollTrigger: { trigger: el, start: 'top 85%' }
            }
        );
    });

    // --- CTA Section: Fade up ---
    gsap.utils.toArray('.cta-section').forEach(el => {
        gsap.fromTo(el,
            { y: 80, opacity: 0 },
            { y: 0, opacity: 1, duration: 1, ease: 'power3.out',
              scrollTrigger: { trigger: el, start: 'top 85%' }
            }
        );
    });

    // --- Contact Container: Slide from bottom ---
    gsap.utils.toArray('.contact-container').forEach(el => {
        gsap.fromTo(el,
            { y: 100, opacity: 0 },
            { y: 0, opacity: 1, duration: 1, ease: 'power3.out',
              scrollTrigger: { trigger: el, start: 'top 88%' }
            }
        );
    });

    // --- Stat items / Counter cards: Alternate left-right ---
    gsap.utils.toArray('.stat-item').forEach((el, i) => {
        const fromX = i % 2 === 0 ? -80 : 80;
        gsap.fromTo(el,
            { x: fromX, opacity: 0 },
            { x: 0, opacity: 1, duration: 0.7, ease: 'power3.out',
              scrollTrigger: { trigger: el, start: 'top 90%' },
              delay: i * 0.1
            }
        );
    });

    // --- Partner boxes: Scale pop ---
    gsap.utils.toArray('.partner-box').forEach((el, i) => {
        gsap.fromTo(el,
            { scale: 0.5, opacity: 0 },
            { scale: 1, opacity: 1, duration: 0.5, ease: 'back.out(1.8)',
              scrollTrigger: { trigger: el, start: 'top 92%' },
              delay: i * 0.06
            }
        );
    });

    // --- Footer: Slide up ---
    gsap.utils.toArray('.footer-grid').forEach(el => {
        gsap.fromTo(el,
            { y: 60, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out',
              scrollTrigger: { trigger: el, start: 'top 95%' }
            }
        );
    });

    // --- Trusted By Logos Marquee: Fade in ---
    gsap.utils.toArray('.trusted-by').forEach(el => {
        gsap.fromTo(el,
            { opacity: 0, y: 40 },
            { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out',
              scrollTrigger: { trigger: el, start: 'top 90%' }
            }
        );
    });
}

function initThreeJS() {
        const canvas = document.getElementById('webgl-canvas');
        if (!canvas || !window.THREE) return;

        scene = new THREE.Scene();

        // Theme colors for 3D
        fogLight = new THREE.FogExp2(0xf8fafc, 0.003);
        fogDark = new THREE.FogExp2(0x050508, 0.003);
        
        scene.fog = document.body.hasAttribute('data-theme') ? fogDark : fogLight;

        const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 2000);
        camera.position.z = 400;

        const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.setPixelRatio(window.devicePixelRatio);

        // Particles and Connections configuration
        const particleCount = 200;
        const particles = new THREE.BufferGeometry();
        const positions = new Float32Array(particleCount * 3);
        const velocities = [];

        const range = 800;

        for (let i = 0; i < particleCount; i++) {
            positions[i * 3] = (Math.random() - 0.5) * range;
            positions[i * 3 + 1] = (Math.random() - 0.5) * range;
            positions[i * 3 + 2] = (Math.random() - 0.5) * range;

            velocities.push({
                x: (Math.random() - 0.5) * 0.5,
                y: (Math.random() - 0.5) * 0.5,
                z: (Math.random() - 0.5) * 0.5
            });
        }

        particles.setAttribute('position', new THREE.BufferAttribute(positions, 3));

        // Material for nodes
        pMaterial = new THREE.PointsMaterial({
            color: document.body.hasAttribute('data-theme') ? 0x00f0ff : 0x0ea5e9,
            size: 3,
            transparent: true,
            opacity: 0.8,
            blending: document.body.hasAttribute('data-theme') ? THREE.AdditiveBlending : THREE.NormalBlending
        });

    const particleSystem = new THREE.Points(particles, pMaterial);
    scene.add(particleSystem);

    // Material for connection lines
    lineMaterial = new THREE.LineBasicMaterial({
        color: document.body.hasAttribute('data-theme') ? 0x7b2cbf : 0x3b82f6,
        transparent: true,
        opacity: document.body.hasAttribute('data-theme') ? 0.15 : 0.3,
        blending: document.body.hasAttribute('data-theme') ? THREE.AdditiveBlending : THREE.NormalBlending
    });

    let lineGeometry = new THREE.BufferGeometry();
    let linesMesh = new THREE.LineSegments(lineGeometry, lineMaterial);
    scene.add(linesMesh);

    // Mouse Interaction
    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;
    const windowHalfX = window.innerWidth / 2;
    const windowHalfY = window.innerHeight / 2;

    document.addEventListener('mousemove', (event) => {
        mouseX = (event.clientX - windowHalfX);
        mouseY = (event.clientY - windowHalfY);
    });

    window.addEventListener('resize', () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    });

    const maxDistance = 100; // max distance to connect neurons

    function animate() {
        requestAnimationFrame(animate);

        targetX = mouseX * 0.2;
        targetY = mouseY * 0.2;
        
        // Smooth camera movement based on mouse
        camera.position.x += (targetX - camera.position.x) * 0.02;
        camera.position.y += (-targetY - camera.position.y) * 0.02;
        camera.lookAt(scene.position);

        // Move particles
        const posAttribute = particles.getAttribute('position');
        const posArray = posAttribute.array;

        for (let i = 0; i < particleCount; i++) {
            posArray[i * 3] += velocities[i].x;
            posArray[i * 3 + 1] += velocities[i].y;
            posArray[i * 3 + 2] += velocities[i].z;

            // Bounce back if they go too far
            if (Math.abs(posArray[i * 3]) > range/2) velocities[i].x *= -1;
            if (Math.abs(posArray[i * 3 + 1]) > range/2) velocities[i].y *= -1;
            if (Math.abs(posArray[i * 3 + 2]) > range/2) velocities[i].z *= -1;
        }
        posAttribute.needsUpdate = true;

        // Build active lines
        const linePositions = [];
        const lineColors = [];

        for (let i = 0; i < particleCount; i++) {
            for (let j = i + 1; j < particleCount; j++) {
                const dx = posArray[i * 3] - posArray[j * 3];
                const dy = posArray[i * 3 + 1] - posArray[j * 3 + 1];
                const dz = posArray[i * 3 + 2] - posArray[j * 3 + 2];
                const distSq = dx*dx + dy*dy + dz*dz;

                if (distSq < maxDistance * maxDistance) {
                    
                    linePositions.push(
                        posArray[i * 3], posArray[i * 3 + 1], posArray[i * 3 + 2],
                        posArray[j * 3], posArray[j * 3 + 1], posArray[j * 3 + 2]
                    );

                    // Dynamic alpha fading line based on distance could be added using VertexColors, 
                    // but for simplicity line group handles basic line creation
                }
            }
        }

        lineGeometry.setAttribute('position', new THREE.Float32BufferAttribute(linePositions, 3));
        
        // Rotate the entire system slightly
        particleSystem.rotation.y += 0.001;
        linesMesh.rotation.y += 0.001;

        renderer.render(scene, camera);
    }

    animate();
}

// ----------------------------------------------------
// Scroll-Driven Interactive AI Robot Brain
// ----------------------------------------------------
let brainScene, brainMaterial, brainNodesMaterial;

function initAIBrainScroll() {
    const canvas = document.getElementById('brain-canvas');
    if (!canvas || !window.THREE || typeof gsap === 'undefined') return;

    brainScene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 100);
    camera.position.z = 8;
    
    const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);

    // Create the "Brain" - A complex glowing Icosahedron showing multiple connections
    const geometry = new THREE.IcosahedronGeometry(2, 2);
    
    // Wireframe material for the tech look
    brainMaterial = new THREE.MeshBasicMaterial({ 
        color: document.body.hasAttribute('data-theme') ? 0x00f0ff : 0x0ea5e9, 
        wireframe: true, 
        transparent: true, 
        opacity: 0.5 
    });
    const brain = new THREE.Mesh(geometry, brainMaterial);
    brainScene.add(brain);
    
    // Add glowing nodes at vertices
    const pointsMat = new THREE.PointsMaterial({
        color: document.body.hasAttribute('data-theme') ? 0x7b2cbf : 0x8b5cf6,
        size: 0.12,
        transparent: true,
        opacity: 0.9
    });
    brainNodesMaterial = pointsMat;
    const brainNodes = new THREE.Points(geometry, pointsMat);
    brainScene.add(brainNodes);

    renderer.render(brainScene, camera);

    // GSAP ScrollTrigger Sequence
    gsap.registerPlugin(ScrollTrigger);

    // Timeline that controls the Brain and bubbles
    const tl = gsap.timeline({
        scrollTrigger: {
            trigger: "#ai-brain-section",
            start: "top top",      // When section hits top of viewport
            end: "+=3000",         // Lock scroll for 3000px
            pin: true,             // Pin the section
            scrub: 1,              // Smooth scrubbing
        }
    });

    // 1. Rotate the brain 360 degrees (in Radians = Math.PI * 2)
    tl.to(brain.rotation, { y: Math.PI * 2, duration: 2, ease: "none" }, 0);
    tl.to(brainNodes.rotation, { y: Math.PI * 2, duration: 2, ease: "none" }, 0);
    
    // Also rotate slightly on X and Z axis for dynamic depth
    tl.to(brain.rotation, { x: Math.PI / 4, z: Math.PI / 6, duration: 2, ease: "none" }, 0);
    tl.to(brainNodes.rotation, { x: Math.PI / 4, z: Math.PI / 6, duration: 2, ease: "none" }, 0);
    
    // 2. Animate Bubbles popping up at intervals
    const bubbles = document.querySelectorAll('.brain-bubble');
    const radius = window.innerWidth > 768 ? 400 : 200; // Radius distance for bubbles
    
    bubbles.forEach((bubble, index) => {
        const total = bubbles.length;
        const angle = (index / total) * Math.PI * 2 - (Math.PI / 2); // Start from top
        const xPos = Math.cos(angle) * radius;
        const yPos = Math.sin(angle) * (radius * 0.6); // slight ellipse

        // Start them from center
        gsap.set(bubble, { x: 0, y: 0, xPercent: -50, yPercent: -50, scale: 0, opacity: 0 });

        // Enter timeline
        tl.to(bubble, {
            x: xPos,
            y: yPos,
            xPercent: -50,
            yPercent: -50,
            scale: 1,
            opacity: 1,
            duration: 0.3,
            ease: "back.out(1.5)"
        }, (index * 0.25)); // stagger entrance timing alongside rotation
    });

    // Render loop synced to scroll
    gsap.ticker.add(() => {
        renderer.render(brainScene, camera);
    });

    // Handle Window Resize
    window.addEventListener('resize', () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    });
}
