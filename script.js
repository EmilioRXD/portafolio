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

        // ============================================
        // Carrusel de Trabajo Independiente
        // ============================================
        const freelanceData = [
            {
                title: "Mantenimiento de equipos",
                image: "https://picsum.photos/id/0/800/600",
                description: "Placeholder: mantenimiento preventivo y correctivo de computadoras de escritorio y laptops para clientes particulares y pequeños negocios."
            },
            {
                title: "Instalación de software",
                image: "https://picsum.photos/id/1/800/600",
                description: "Placeholder: instalación y configuración de sistemas operativos, ofimática y aplicaciones de uso diario."
            },
            {
                title: "Redes y conectividad",
                image: "https://picsum.photos/id/2/800/600",
                description: "Placeholder: configuración de routers, puntos de acceso y solución de problemas de conectividad."
            },
            {
                title: "Soporte remoto",
                image: "https://picsum.photos/id/3/800/600",
                description: "Placeholder: atención y resolución de incidencias de forma remota, garantizando la continuidad operativa."
            },
            {
                title: "Recuperación de datos",
                image: "https://picsum.photos/id/4/800/600",
                description: "Placeholder: recuperación de información y resguardo de datos para evitar pérdidas irreversibles."
            }
        ];

        const track = document.getElementById('freelanceTrack');
        const prevBtn = document.getElementById('carouselPrev');
        const nextBtn = document.getElementById('carouselNext');

        function buildCard(job) {
            const card = document.createElement('article');
            card.className = 'freelance-card';
            card.innerHTML = `
                <div class="project-image">
                    <img src="${job.image}" alt="${job.title}" loading="lazy" draggable="false">
                </div>
                <div class="freelance-body">
                    <h3 class="freelance-title">${job.title}</h3>
                    <p class="freelance-desc">${job.description}</p>
                </div>
            `;
            return card;
        }

        if (track && freelanceData.length && window.Swiper) {
            const frag = document.createDocumentFragment();
            freelanceData.forEach(job => {
                const slide = document.createElement('div');
                slide.className = 'swiper-slide';
                slide.appendChild(buildCard(job));
                frag.appendChild(slide);
            });
            track.appendChild(frag);

            const swiper = new Swiper('#freelanceCarousel', {
                loop: true,
                slidesPerView: 1.2,
                centeredSlides: true,
                spaceBetween: 16,
                grabCursor: true,
                keyboard: {
                    enabled: true,
                    onlyInViewport: true
                },
                navigation: {
                    prevEl: prevBtn,
                    nextEl: nextBtn
                },
                breakpoints: {
                    640: {
                        slidesPerView: 2,
                        centeredSlides: false,
                        spaceBetween: 24
                    },
                    1024: {
                        slidesPerView: 3,
                        centeredSlides: false,
                        spaceBetween: 28
                    }
                }
            });
        }

        // Datos de proyectos
        const projectsData = [
            {
                title: "InventoryAPP",
                category: "Aplicación Web · Inventario & POS",
                date: "2022",
                image: "public/inventory-logo.png",
                description: [
                    "<strong>El reto:</strong> Los pequeños y medianos negocios necesitan controlar su inventario, ventas y gastos sin depender de planillas o herramientas dispersas. El sistema debía ser completo pero accesible para el personal no técnico.",
                    "<strong>Mi enfoque:</strong> Desarrollé una aplicación web integral de inventario y punto de venta (POS): alta, baja y edición de productos, control de stock mínimo con alertas, ventas con generación de tickets, apertura y cierre de caja, gestión de créditos a clientes, control de gastos y reportes de inventario, ventas, caja y bajas. Incluye gestión de usuarios y permisos.",
                    "<strong>El resultado:</strong> Un sistema listo para operar en negocios reales que unifica inventario, ventas y reportes en una sola herramienta, con valoración del inventario y datos configurables de la empresa."
                ],
                tags: ["PHP", "MySQL", "POS", "Bootstrap", "JavaScript"]
            },
            {
                title: "Water Tank IoT",
                category: "IoT · Monitoreo de Nivel de Agua",
                date: "2023",
                image: "public/watertank-icon.png",
                description: [
                    "<strong>El reto:</strong> Monitorear el nivel de agua de un tanque de forma remota y en tiempo real, evitando visitas manuales y permitiendo decidir cuándo bombear o llenar.",
                    "<strong>Mi enfoque:</strong> Construí una app móvil en React Native que consulta el nivel del tanque a través de un backend Node.js conectado por MQTT al dispositivo medidor. Las pantallas de nivel y del estado general del tanque muestran la información clara y actualizada para el usuario.",
                    "<strong>El resultado:</strong> Un sistema IoT funcional de punta a punta: del sensor del tanque hasta la pantalla del celular, demostrando integración de hardware, comunicación MQTT y desarrollo móvil."
                ],
                tags: ["React Native", "Node.js", "MQTT", "IoT", "Backend"]
            },
            {
                title: "Control de Acceso IUTA",
                category: "Proyecto Académico · IoT & RFID",
                date: "2025",
                image: "https://picsum.photos/id/180/800/600",
                description: [
                    "<strong>El reto:</strong> Automatizar el control de acceso del IUTA: registrar quién entra, validar credenciales y centralizar la lógica sin depender de lectores de baja programación.",
                    "<strong>Mi enfoque:</strong> Diseñé una arquitectura de dos capas: un backend en Python (API REST + MQTT) que valida credenciales y gestiona los registros, y un driver en C compuesto por módulos de lectura (reader) y escritura (writer) para interactuar con los dispositivos de tarjetas. La comunicación con los lectores se realiza vía MQTT.",
                    "<strong>El resultado:</strong> Un sistema completo de control de acceso con separación clara entre hardware (driver en C) y lógica de negocio (backend Python), validado como proyecto de titulación."
                ],
                tags: ["Python", "C", "MQTT", "RFID", "IoT"]
            }
        ];

        // Slug para enrutado por hash (botón "atrás" del navegador)
        function slugify(str) {
            return str.toLowerCase()
                .normalize('NFD').replace(/[\u0300-\u036f]/g, '')
                .replace(/[^a-z0-9]+/g, '-')
                .replace(/^-+|-+$/g, '');
        }

        const projectBySlug = {};
        projectsData.forEach(p => { projectBySlug[slugify(p.title)] = p; });

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
            const wasOpen = modal.classList.contains('open');
            modalImage.src = project.image;
            modalImage.alt = project.title;
            modalCategory.textContent = project.date ? `${project.date} · ${project.category}` : project.category;
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

            // Entrada de historial invisible (sin cambiar la URL) para que el
            // botón "atrás" del navegador cierre el modal en vez de salir del sitio
            if (!wasOpen) {
                try { history.pushState({ modalOpen: true }, ''); } catch (e) { /* file:// puede no permitirlo */ }
            }
        }

        function closeModal() {
            if (!modal.classList.contains('open')) return;
            modal.classList.remove('open');
            scrollbarTarget = window;
            if (window.updateCustomScrollbar) requestAnimationFrame(window.updateCustomScrollbar);
        }

        function requestClose() {
            if (!modal.classList.contains('open')) return;
            closeModal();
            if (history.state && history.state.modalOpen) history.back();
        }

        document.querySelectorAll('.project-card').forEach((card, index) => {
            card.addEventListener('click', () => openModal(projectsData[index]));
        });

        modalClose.addEventListener('click', requestClose);

        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && modal.classList.contains('open')) requestClose();
        });

        // El botón "atrás" del móvil cierra el modal
        window.addEventListener('popstate', () => {
            if (modal.classList.contains('open')) closeModal();
        });

        // Compatibilidad: una URL con #project/<slug> sigue abriendo el proyecto
        (function initFromHash() {
            const match = location.hash.match(/^#project\/(.+)$/);
            if (match && projectBySlug[match[1]]) openModal(projectBySlug[match[1]]);
        })();

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
