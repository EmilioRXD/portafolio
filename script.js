        // Calcular edad a partir del año de nacimiento
        const ageEl = document.getElementById('age');
        if (ageEl) {
            ageEl.textContent = new Date().getFullYear() - 2001;
        }

        // Alternar menú móvil
        const menuBtn = document.getElementById('menuBtn');
        const mobileMenu = document.getElementById('mobileMenu');
        menuBtn.addEventListener('click', () => {
            mobileMenu.classList.toggle('active');
        });

        // Cerrar menú móvil al hacer clic en un enlace
        mobileMenu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                mobileMenu.classList.remove('active');
            });
        });

        // Acordeones de la sección Experiencia
        document.querySelectorAll('.accordion-toggle').forEach(button => {
            button.addEventListener('click', () => {
                const accordion = button.parentElement.querySelector('.accordion');
                const isOpen = button.getAttribute('aria-expanded') === 'true';
                accordion.classList.toggle('open', !isOpen);
                button.setAttribute('aria-expanded', String(!isOpen));
                button.querySelector('.accordion-label').textContent = isOpen ? 'Ver más' : 'Ver menos';
            });
        });

        // Desplazamiento suave para enlaces de anclaje
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
            });
        });

        // Parallax sutil del fondo del hero
        const heroImg = document.querySelector('.hero-bg img');
        const heroSection = document.querySelector('.hero');
        let parallaxRaf = null;
        window.addEventListener('scroll', () => {
            if (parallaxRaf !== null) return;
            parallaxRaf = requestAnimationFrame(() => {
                parallaxRaf = null;
                const y = Math.min(window.scrollY, heroSection.offsetHeight);
                heroImg.style.transform = `translateY(${(-y * 0.3).toFixed(1)}px)`;
            });
        }, { passive: true });

        // Observador de intersección para animaciones Fade-in
        const observerOptions = {
            threshold: 0.1,
            rootMargin: "0px 0px -50px 0px"
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                }
            });
        }, observerOptions);

        document.querySelectorAll('.fade-in').forEach((el) => {
            observer.observe(el);
        });

        // Sección activa en la navegación (scrollspy)
        const navLinks = document.querySelectorAll('.nav-links a[href^="#"]');
        const navSections = [...navLinks]
            .map(link => document.querySelector(link.getAttribute('href')))
            .filter(Boolean);

        const sectionObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (!entry.isIntersecting) return;
                const id = entry.target.id;
                navLinks.forEach(link => {
                    link.classList.toggle('active', link.getAttribute('href') === '#' + id);
                });
            });
        }, { rootMargin: '-40% 0px -55% 0px' });

        navSections.forEach((s) => sectionObserver.observe(s));

        // Datos de proyectos
        const projectsData = [
            {
                title: "Finova Dashboard",
                category: "Diseño UI/UX · Aplicación Web",
                image: "https://picsum.photos/id/0/800/600",
                description: [
                    "<strong>El reto:</strong> Finova, una fintech en crecimiento, necesitaba transformar su panel de control empresarial. Los usuarios perdían tiempo buscando datos críticos entre decenas de pantallas sin jerarquía ni coherencia visual.",
                    "<strong>Mi enfoque:</strong> Comencé con una auditoría de usabilidad completa y entrevistas con 12 clientes clave. Identifiqué los flujos de uso más frecuentes y rediseñé la información arquitectura para poner los KPIs principales a un solo clic de distancia. Cada componente fue construido como pieza de un sistema de diseño modular.",
                    "<strong>El resultado:</strong> El nuevo dashboard redujo el tiempo de toma de decisiones en un 40% y mejoró la retención de usuarios en un 25% en los primeros tres meses. El sistema de diseño se extendió a toda la plataforma."
                ],
                tags: ["React", "D3.js", "Design System", "Figma", "User Research"]
            },
            {
                title: "Bloom Mobile App",
                category: "Diseño Móvil · iOS & Android",
                image: "https://picsum.photos/id/180/800/600",
                description: [
                    "<strong>El reto:</strong> Bloom quería crear una app de jardinería que se sintiera cálida y accesible, no técnica. El mercado estaba saturado de apps genéricas de recordatorios sin personalidad.",
                    "<strong>Mi enfoque:</strong> Investigación etnográfica con 20 usuarios: visité sus hogares para entender su relación con las plantas. Diseñé una interfaz que usa lenguaje natural (\"Tu monstera tiene sed\") en vez de datos crudos. La paleta de verdes orgánicos y las micro-animaciones refuerzan la conexión emocional con el cuidado de plantas.",
                    "<strong>El resultado:</strong> La app alcanzó 50,000 descargas en el primer mes con una calificación de 4.9 estrellas. El tiempo promedio de sesión superó los 3 minutos — alto para una app de utilidad."
                ],
                tags: ["Flutter", "Animaciones", "UX Research", "Prototyping", "Design Tokens"]
            },
            {
                title: "Terra E-commerce",
                category: "Identidad de Marca · Diseño Web",
                image: "https://picsum.photos/id/1/800/600",
                description: [
                    "<strong>El reto:</strong> Terra necesitaba una identidad visual y una tienda online que comunicaran sustentabilidad de verdad, no solo greenwashing. El público objetivo son compradores conscientes que desconfían de las promesas vacías.",
                    "<strong>Mi enfoque:</strong> Desarrollé una identidad de marca con texturas orgánicas, fotografía honesta y una paleta de tierra que evoca lo natural sin caer en el cliché del verde genérico. El flujo de compra fue optimizado con checkout de un solo paso y transparencia total en la huella de carbono de cada producto.",
                    "<strong>El resultado:</strong> El abandono del carrito se redujo un 35%. Terra fue destacada como \"Diseño del mes\" en Awwwards y el tráfico orgánico creció un 60% gracias al SEO optimizado."
                ],
                tags: ["Branding", "Shopify", "Mobile First", "SEO", "Estrategia"]
            },
            {
                title: "Vault Banking",
                category: "Diseño de Producto · Fintech",
                image: "https://picsum.photos/id/60/800/600",
                description: [
                    "<strong>El reto:</strong> Vault quería crear una app bancaria digital que fuera segura sin sentirse intimidante. El reto era balancear la confianza (necesaria en fintech) con la simplicidad (necesaria para la adopción).",
                    "<strong>Mi enfoque:</strong> Diseñé un sistema de autenticación biométrica que se siente como una extensión natural del flujo, no como una barrera. La interfaz usa jerarquía visual clara: acciones primarias en azul, información contextual en gris suave. Cada pantalla tiene un solo objetivo.",
                    "<strong>El resultado:</strong> La app alcanzó 4.8 estrellas en App Store y Google Play con más de 100,000 descargas en el primer trimestre. La tasa de completitud de onboarding subió del 62% al 91%."
                ],
                tags: ["Seguridad", "Biometría", "iOS", "Android", "Accesibilidad"]
            }
        ];

        // Objetivo activo del scrollbar personalizado (se declara aquí para
        // que tanto el modal como el IIFE del scrollbar lo compartan)
        let scrollbarTarget = window;

        // Modal
        const modal = document.getElementById('projectModal');
        const modalClose = document.getElementById('modalClose');
        const modalImage = document.getElementById('modalImage');
        const modalCategory = document.getElementById('modalCategory');
        const modalTitle = document.getElementById('modalTitle');
        const modalDescription = document.getElementById('modalDescription');
        const modalTags = document.getElementById('modalTags');

        function openModal(project) {
            modalImage.src = project.image;
            modalImage.alt = project.title;
            modalCategory.textContent = project.category;
            modalTitle.textContent = project.title;
            modalDescription.innerHTML = project.description
                .map(p => `<p>${p}</p>`)
                .join('');
            modalTags.innerHTML = project.tags
                .map(tag => `<span class="article-tag">${tag}</span>`)
                .join('');
            modal.classList.add('open');
            modal.scrollTop = 0;
            scrollbarTarget = modal;
            if (window.updateCustomScrollbar) requestAnimationFrame(window.updateCustomScrollbar);
        }

        function closeModal() {
            modal.classList.remove('open');
            scrollbarTarget = window;
            if (window.updateCustomScrollbar) requestAnimationFrame(window.updateCustomScrollbar);
        }

        document.querySelectorAll('.project-card').forEach((card, index) => {
            card.addEventListener('click', () => openModal(projectsData[index]));
        });

        modalClose.addEventListener('click', closeModal);

        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && modal.classList.contains('open')) closeModal();
        });

        // ============================================
        // Scrollbar 100% personalizado (simulado)
        // ============================================
        (function () {
            const track = document.getElementById('customScrollbarTrack');
            const thumb = document.getElementById('customScrollbarThumb');

            // El "objetivo" activo (window o el modal) vive en la variable
            // compartida scrollbarTarget, actualizada por openModal/closeModal
            let isDragging = false;
            let dragStartY = 0;
            let dragStartScrollTop = 0;

            function getScrollInfo(target) {
                if (target === window) {
                    return {
                        scrollTop: window.scrollY || document.documentElement.scrollTop,
                        scrollHeight: document.documentElement.scrollHeight,
                        clientHeight: window.innerHeight
                    };
                }
                return {
                    scrollTop: target.scrollTop,
                    scrollHeight: target.scrollHeight,
                    clientHeight: target.clientHeight
                };
            }

            function setScrollTop(target, value) {
                if (target === window) {
                    window.scrollTo({ top: value, left: 0, behavior: 'auto' });
                } else {
                    target.scrollTo({ top: value, left: 0, behavior: 'auto' });
                }
            }

            function updateThumb() {
                // Durante el arrastre, processDrag() ya posiciona el thumb a
                // mano en el mismo frame — recalcularlo aquí sería trabajo
                // duplicado (y forzaría layout reads innecesarios)
                if (isDragging) return;

                const { scrollTop, scrollHeight, clientHeight } = getScrollInfo(scrollbarTarget);
                const trackHeight = track.clientHeight;

                if (scrollHeight <= clientHeight + 1) {
                    track.classList.add('hidden');
                    return;
                }
                track.classList.remove('hidden');

                const minThumb = 30;
                const thumbHeight = Math.max((clientHeight / scrollHeight) * trackHeight, minThumb);
                const maxThumbTop = trackHeight - thumbHeight;
                const scrollableDistance = scrollHeight - clientHeight;
                const ratio = scrollableDistance > 0 ? scrollTop / scrollableDistance : 0;
                const thumbTop = ratio * maxThumbTop;

                thumb.style.height = thumbHeight + 'px';
                thumb.style.transform = `translateY(${thumbTop}px)`;
            }
            // Se expone para que openModal/closeModal puedan pedir un recálculo
            window.updateCustomScrollbar = updateThumb;

            // --- Arrastre optimizado: nada de layout reads en cada evento ---
            let dragScrollableDistance = 0;
            let dragMaxThumbTop = 0;
            let pendingClientY = null;
            let rafId = null;
            let dragTargetEl = null; // el elemento real al que se le desactiva el smooth-scroll
            let dragTargetPrevBehavior = '';

            function disableSmoothScroll(target) {
                // window no tiene "style" propio: el smooth-scroll real vive
                // en <html>, así que hay que tocar document.documentElement
                dragTargetEl = target === window ? document.documentElement : target;
                dragTargetPrevBehavior = dragTargetEl.style.scrollBehavior || '';
                dragTargetEl.style.scrollBehavior = 'auto';
            }

            function restoreSmoothScroll() {
                if (dragTargetEl) {
                    dragTargetEl.style.scrollBehavior = dragTargetPrevBehavior;
                    dragTargetEl = null;
                }
            }

            function startDrag(clientY) {
                isDragging = true;
                thumb.classList.add('dragging');
                dragStartY = clientY;

                // Mientras se arrastra, cero scroll suave — solo instantáneo
                disableSmoothScroll(scrollbarTarget);

                // Se miden las cosas UNA sola vez, al iniciar el arrastre
                const info = getScrollInfo(scrollbarTarget);
                dragStartScrollTop = info.scrollTop;
                dragScrollableDistance = info.scrollHeight - info.clientHeight;
                const trackHeight = track.clientHeight;
                const thumbHeight = thumb.offsetHeight;
                dragMaxThumbTop = trackHeight - thumbHeight;
            }

            function processDrag() {
                rafId = null;
                if (!isDragging || pendingClientY === null || dragMaxThumbTop <= 0) return;

                const deltaY = pendingClientY - dragStartY;
                const deltaScroll = (deltaY / dragMaxThumbTop) * dragScrollableDistance;
                let newScrollTop = dragStartScrollTop + deltaScroll;
                newScrollTop = Math.max(0, Math.min(newScrollTop, dragScrollableDistance));

                // Se mueve el thumb YA, en este mismo frame, sin esperar al
                // evento 'scroll' (que llega asíncrono y genera el delay)
                const ratio = dragScrollableDistance > 0 ? newScrollTop / dragScrollableDistance : 0;
                thumb.style.transform = `translateY(${ratio * dragMaxThumbTop}px)`;

                setScrollTop(scrollbarTarget, newScrollTop);
            }

            function onDragMove(clientY) {
                if (!isDragging) return;
                pendingClientY = clientY;
                // Solo se procesa una vez por frame, nunca más rápido de lo
                // que el navegador puede pintar — evita el delay acumulado
                if (rafId === null) {
                    rafId = requestAnimationFrame(processDrag);
                }
            }

            function endDrag() {
                if (!isDragging) return;
                isDragging = false;
                thumb.classList.remove('dragging');
                document.body.style.userSelect = '';
                pendingClientY = null;
                if (rafId !== null) {
                    cancelAnimationFrame(rafId);
                    rafId = null;
                }
                // Se devuelve el smooth-scroll para que los enlaces del menú
                // sigan animando como antes
                restoreSmoothScroll();
            }

            thumb.addEventListener('mousedown', (e) => {
                startDrag(e.clientY);
                document.body.style.userSelect = 'none';
                e.preventDefault();
            });

            window.addEventListener('mousemove', (e) => onDragMove(e.clientY));
            window.addEventListener('mouseup', endDrag);


            // Soporte táctil (tablets, laptops con pantalla táctil, etc.)
            thumb.addEventListener('touchstart', (e) => {
                startDrag(e.touches[0].clientY);
                e.preventDefault();
            }, { passive: false });

            window.addEventListener('touchmove', (e) => {
                if (!isDragging) return;
                onDragMove(e.touches[0].clientY);
                e.preventDefault();
            }, { passive: false });

            window.addEventListener('touchend', endDrag);

            // Clic en el track (fuera del thumb) = saltar a esa posición
            function jumpToPosition(clientY) {
                const rect = track.getBoundingClientRect();
                const clickY = clientY - rect.top;
                const { scrollHeight, clientHeight } = getScrollInfo(scrollbarTarget);
                const trackHeight = track.clientHeight;
                const thumbHeight = thumb.offsetHeight;
                const maxThumbTop = trackHeight - thumbHeight;
                const ratio = maxThumbTop > 0 ? (clickY - thumbHeight / 2) / maxThumbTop : 0;
                const scrollableDistance = scrollHeight - clientHeight;
                const newScrollTop = Math.max(0, Math.min(ratio * scrollableDistance, scrollableDistance));
                setScrollTop(scrollbarTarget, newScrollTop);
            }

            track.addEventListener('mousedown', (e) => {
                if (e.target === thumb) return;
                jumpToPosition(e.clientY);
            });

            track.addEventListener('touchstart', (e) => {
                if (e.target === thumb) return;
                jumpToPosition(e.touches[0].clientY);
            }, { passive: true });

            window.addEventListener('scroll', updateThumb, { passive: true });
            modal.addEventListener('scroll', updateThumb, { passive: true });
            window.addEventListener('resize', updateThumb);

            // Recalcula cuando cambia el tamaño del contenido (imágenes cargando, fade-ins, etc.)
            const resizeObserver = new ResizeObserver(() => updateThumb());
            resizeObserver.observe(document.body);
            resizeObserver.observe(modal.querySelector('.modal-article'));

            updateThumb();
        })();
