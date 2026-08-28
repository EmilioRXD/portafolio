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
                title: "Windows 11 en Chromebook",
                image: "public/services/pic-compu-01.jpg",
                description: "Instalé Windows 11 en una Chromebook que originalmente traía Chrome OS, ampliando la versatilidad del equipo para nuevos usos."
            },
            {
                title: "Windows 10 corporativo",
                image: "public/services/pic-compu-02.jpg",
                description: "Realicé el mantenimiento e instalé Windows 10 corporativo, con su licencia y programas, en 3 equipos de una oficina."
            },
            {
                title: "Reparación de equipo",
                image: "public/services/pic-compu-03.jpg",
                description: "El equipo no encendía: diagnostiqué la falla, reemplacé el componente defectuoso y volvió a funcionar. Aproveché para aplicar el mantenimiento recomendado."
            },
            {
                title: "Limpieza de virus y optimización",
                image: "public/services/pic-compu-04.jpg",
                description: "Eliminé virus y optimicé el equipo, que presentaba serios problemas de rendimiento."
            },
            {
                title: "Restauración de arranque",
                image: "public/services/pic-compu-05.jpg",
                description: "El arranque de Windows estaba estropeado: respaldé los datos del usuario y restauré el arranque del sistema."
            },
            {
                title: "Ensamblaje de equipo gamer",
                image: "public/services/pic-compu-06.jpg",
                description: "Ensamblé un equipo de alta potencia de cómputo, pensado para juegos y diseño."
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
                autoplay: {
                    delay: 5000,
                    disableOnInteraction: false,
                    pauseOnMouseEnter: true
                },
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

// Datos de proyectos: se cargan desde archivos Markdown en /projects
let projectsData = [];
let projectBySlug = {};

// ============================================
// Carga de proyectos desde Markdown
// ============================================
// Añade aquí la ruta de cada proyecto nuevo (projects/*.md)
const PROJECT_FILES = [
    "projects/control-de-acceso-iuta.md",
    "projects/water-tank-iot.md",
    "projects/inventoryapp.md"
];

function escapeHtml(str) {
    return String(str).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

function inlineMarkdown(text) {
    return escapeHtml(text).replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');
}

function parseProjectMarkdown(md) {
    // Front matter: bloque --- clave: valor ---
    const fmMatch = md.match(/^---\s*\n([\s\S]*?)\n---\s*\n([\s\S]*)$/);
    const fm = {};
    let body = md;
    if (fmMatch) {
        fmMatch[1].split('\n').forEach(line => {
            const idx = line.indexOf(':');
            if (idx === -1) return;
            const key = line.slice(0, idx).trim();
            const value = line.slice(idx + 1).trim().replace(/^['"]|['"]$/g, '');
            fm[key] = value;
        });
        body = fmMatch[2];
    }

    const tags = fm.tags ? fm.tags.split(',').map(t => t.trim()).filter(Boolean) : [];

    // Cuerpo: párrafos (con **negrita**) y medios de galería
    // @video src="..." [thumb="..."] [desc="..."]
    // @image src="..." [thumb="..."] [desc="..."]
    const content = [];
    let paragraph = [];
    const flush = () => {
        if (paragraph.length) {
            content.push({ type: 'text', html: paragraph.map(l => inlineMarkdown(l)).join(' ') });
            paragraph = [];
        }
    };

    const attrRe = /(\w+)="([^"]*)"/g;

    body.split('\n').forEach(line => {
        const mediaMatch = line.match(/^@(video|image)\b/);
        if (mediaMatch) {
            flush();
            const attrs = {};
            let m;
            attrRe.lastIndex = 0;
            while ((m = attrRe.exec(line)) !== null) attrs[m[1]] = m[2];
            content.push({
                type: mediaMatch[1],
                src: attrs.src || '',
                thumb: attrs.thumb || attrs.poster || '',
                desc: attrs.desc || attrs.caption || ''
            });
        } else if (line.trim() === '') {
            flush();
        } else {
            paragraph.push(line.trim());
        }
    });
    flush();

    return {
        title: fm.title || 'Sin título',
        category: fm.category || '',
        date: fm.date || '',
        image: fm.image || '',
        tags,
        content
    };
}

function yearOf(project) {
    const m = String(project.date).match(/\d{4}/);
    return m ? Number(m[0]) : 0;
}

function renderProjectCard(project) {
    const card = document.createElement('div');
    card.className = 'project-card fade-in';
    const chips = project.tags.slice(0, 3)
        .map(t => `<span class="chip">${escapeHtml(t)}</span>`)
        .join('');
    const image = escapeHtml(project.image).replace(/"/g, '&quot;');
    const title = escapeHtml(project.title);
    card.innerHTML = `
        <div class="project-image">
            <img src="${image}" alt="${title}" loading="lazy">
            <div class="project-overlay">
                <div class="project-chips">${chips}</div>
            </div>
        </div>
        <h3 class="project-title">${title}</h3>
        <p class="project-category">${escapeHtml(project.date)} · ${escapeHtml(project.category)}</p>
    `;
    return card;
}

async function loadProjects() {
    const projectsGrid = document.querySelector('.projects-grid');
    try {
        const projects = await Promise.all(
            PROJECT_FILES.map(async file => {
                const res = await fetch(file);
                if (!res.ok) throw new Error(`HTTP ${res.status} al cargar ${file}`);
                return parseProjectMarkdown(await res.text());
            })
        );
        // Orden: más reciente primero
        projects.sort((a, b) => yearOf(b) - yearOf(a));

        projectsData = projects;
        projectBySlug = {};
        projects.forEach(p => { projectBySlug[slugify(p.title)] = p; });

        const frag = document.createDocumentFragment();
        projects.forEach(p => {
            const card = renderProjectCard(p);
            card.addEventListener('click', () => openModal(p));
            frag.appendChild(card);
        });
        projectsGrid.innerHTML = '';
        projectsGrid.appendChild(frag);
        projectsGrid.querySelectorAll('.fade-in').forEach(el => observer.observe(el));

        // Compatibilidad: una URL con #project/<slug> sigue abriendo el proyecto
        const match = location.hash.match(/^#project\/(.+)$/);
        if (match && projectBySlug[match[1]]) openModal(projectBySlug[match[1]]);
    } catch (err) {
        console.error('No se pudieron cargar los proyectos:', err);
    }
}

// Slug para enrutado por hash (botón "atrás" del navegador)
function slugify(str) {
    return str.toLowerCase()
        .normalize('NFD').replace(/[\u0300-\u036f]/g, '')
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-+|-+$/g, '');
}

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
        // Visor a pantalla completa (galería)
        const mediaViewer = document.getElementById('mediaViewer');
        const viewerCarouselEl = document.getElementById('viewerCarousel');
        const viewerDescription = document.getElementById('viewerDescription');
        const viewerCounter = document.getElementById('viewerCounter');
        const viewerClose = document.getElementById('viewerClose');
        const viewerPrev = document.getElementById('viewerPrev');
        const viewerNext = document.getElementById('viewerNext');
        const viewerZoomBar = document.getElementById('viewerZoomBar');
        const zoomInBtn = document.getElementById('zoomIn');
        const zoomOutBtn = document.getElementById('zoomOut');
        const zoomResetBtn = document.getElementById('zoomReset');

        let gallerySwiper = null;
        let viewerSwiper = null;
        let currentMedia = [];

        const PLAY_ICON = '<span class="gallery-play" aria-hidden="true"><svg viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg></span>';

        function createVideoElement(item) {
            const video = document.createElement('video');
            video.controls = true;
            video.playsInline = true;
            video.loop = true;
            video.muted = true;
            video.preload = 'metadata';
            if (item.thumb || item.poster) video.poster = item.thumb || item.poster;
            const source = document.createElement('source');
            source.src = item.src;
            source.type = 'video/mp4';
            video.appendChild(source);
            return video;
        }

        // Galería: miniaturas 1:1 dentro del artículo
        function buildGallery(mediaItems) {
            const gallery = document.createElement('section');
            gallery.className = 'article-gallery';

            const title = document.createElement('h3');
            title.className = 'article-gallery-title';
            title.textContent = 'Galería';
            gallery.appendChild(title);

            const wrap = document.createElement('div');
            wrap.className = 'swiper gallery-carousel';

            const track = document.createElement('div');
            track.className = 'swiper-wrapper';

            mediaItems.forEach((item, index) => {
                const slide = document.createElement('div');
                slide.className = 'swiper-slide';

                const thumb = document.createElement('button');
                thumb.type = 'button';
                thumb.className = 'gallery-thumb' + (item.type === 'video' ? ' gallery-thumb--video' : '');
                thumb.setAttribute('aria-label', item.desc || 'Abrir en el visor');
                thumb.addEventListener('click', () => openViewer(index));

                if (item.type === 'image' || item.thumb) {
                    const img = document.createElement('img');
                    img.src = item.thumb || item.src;
                    img.alt = item.desc || '';
                    img.loading = 'lazy';
                    img.draggable = false;
                    thumb.appendChild(img);
                } else {
                    const video = document.createElement('video');
                    video.preload = 'metadata';
                    video.muted = true;
                    video.playsInline = true;
                    const source = document.createElement('source');
                    source.src = item.src;
                    source.type = 'video/mp4';
                    video.appendChild(source);
                    thumb.appendChild(video);
                }
                if (item.type === 'video') {
                    thumb.insertAdjacentHTML('beforeend', PLAY_ICON);
                }
                slide.appendChild(thumb);
                track.appendChild(slide);
            });

            wrap.appendChild(track);
            gallery.appendChild(wrap);
            return gallery;
        }

        function initGallerySwiper(el) {
            if (gallerySwiper) { gallerySwiper.destroy(true, true); gallerySwiper = null; }
            gallerySwiper = new Swiper(el, {
                slidesPerView: 2.4,
                spaceBetween: 12,
                grabCursor: true,
                breakpoints: {
                    640: { slidesPerView: 3.5, spaceBetween: 16 },
                    1024: { slidesPerView: 4.5, spaceBetween: 20 }
                }
            });
        }

        // Artículo: párrafos primero, galería al final
        function renderArticle(project) {
            modalDescription.innerHTML = '';
            currentMedia = (project.content || []).filter(b => b.type === 'video' || b.type === 'image');
            const textBlocks = (project.content || []).filter(b => b.type === 'text');

            if (textBlocks.length) {
                textBlocks.forEach(block => {
                    const p = document.createElement('p');
                    p.innerHTML = block.html;
                    modalDescription.appendChild(p);
                });
            } else if (project.description) {
                // Compatibilidad con el formato anterior (párrafos sin content)
                modalDescription.innerHTML = project.description.map(p => `<p>${p}</p>`).join('');
            }

            if (currentMedia.length) {
                const gallery = buildGallery(currentMedia);
                modalDescription.appendChild(gallery);
                initGallerySwiper(gallery.querySelector('.gallery-carousel'));
            }
        }

        function clearVideos() {
            modal.querySelectorAll('video').forEach(video => {
                video.pause();
                video.removeAttribute('src');
                video.load();
            });
            if (mediaViewer) mediaViewer.querySelectorAll('video').forEach(video => {
                video.pause();
                video.removeAttribute('src');
                video.load();
            });
        }

        // ============================================
        // Visor a pantalla completa (lightbox)
        // ============================================
        function createViewerSlide(item) {
            const slide = document.createElement('div');
            slide.className = 'swiper-slide';
            if (item.type === 'image') {
                const zoomBox = document.createElement('div');
                zoomBox.className = 'swiper-zoom-container';
                const img = document.createElement('img');
                img.src = item.src;
                img.alt = item.desc || '';
                img.draggable = false;
                zoomBox.appendChild(img);
                slide.appendChild(zoomBox);
            } else {
                slide.appendChild(createVideoElement(item));
            }
            return slide;
        }

        function pauseViewerVideos() {
            viewerCarouselEl.querySelectorAll('video').forEach(v => v.pause());
        }

        function playActiveVideo() {
            if (!viewerSwiper) return;
            const slide = viewerSwiper.slides[viewerSwiper.activeIndex];
            if (!slide) return;
            const video = slide.querySelector('video');
            if (video) video.play().catch(() => {});
        }

        function updateViewerInfo() {
            if (!viewerSwiper) return;
            const item = currentMedia[viewerSwiper.realIndex];
            viewerDescription.textContent = item ? item.desc : '';
            viewerCounter.textContent = currentMedia.length ? `${viewerSwiper.realIndex + 1} / ${currentMedia.length}` : '';

            const isImage = item && item.type === 'image';
            viewerZoomBar.classList.toggle('hidden', !isImage);
            if (viewerSwiper.zoom) {
                if (isImage) viewerSwiper.zoom.enable(); else viewerSwiper.zoom.disable();
            }
            playActiveVideo();
        }

        function openViewer(index) {
            if (!currentMedia.length || mediaViewer.classList.contains('open')) return;
            const track = viewerCarouselEl.querySelector('.swiper-wrapper');
            track.innerHTML = '';
            currentMedia.forEach(item => track.appendChild(createViewerSlide(item)));

            if (viewerSwiper) { viewerSwiper.destroy(true, true); viewerSwiper = null; }

            viewerSwiper = new Swiper(viewerCarouselEl, {
                initialSlide: index,
                loop: currentMedia.length > 1,
                keyboard: { enabled: true, onlyInViewport: false },
                navigation: { prevEl: viewerPrev, nextEl: viewerNext },
                zoom: { maxRatio: 4 },
                on: {
                    slideChangeTransitionStart: pauseViewerVideos,
                    slideChangeTransitionEnd: updateViewerInfo
                }
            });

            mediaViewer.classList.add('open');
            document.body.classList.add('no-scroll');
            updateViewerInfo();
        }

        function closeViewer() {
            if (!mediaViewer.classList.contains('open')) return;
            mediaViewer.classList.remove('open');
            document.body.classList.remove('no-scroll');
            pauseViewerVideos();
            if (viewerSwiper) { viewerSwiper.destroy(true, true); viewerSwiper = null; }
            viewerCarouselEl.querySelector('.swiper-wrapper').innerHTML = '';
        }

        viewerClose.addEventListener('click', closeViewer);
        zoomInBtn.addEventListener('click', () => viewerSwiper && viewerSwiper.zoom && viewerSwiper.zoom.in());
        zoomOutBtn.addEventListener('click', () => viewerSwiper && viewerSwiper.zoom && viewerSwiper.zoom.out());
        zoomResetBtn.addEventListener('click', () => viewerSwiper && viewerSwiper.zoom && viewerSwiper.zoom.reset());

        function openModal(project) {
            const wasOpen = modal.classList.contains('open');
            modalImage.src = project.image;
            modalImage.alt = project.title;
            modalCategory.textContent = project.date ? `${project.date} · ${project.category}` : project.category;
            modalTitle.textContent = project.title;
            renderArticle(project);
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
            closeViewer();
            clearVideos();
            if (gallerySwiper) { gallerySwiper.destroy(true, true); gallerySwiper = null; }
            scrollbarTarget = window;
            if (window.updateCustomScrollbar) requestAnimationFrame(window.updateCustomScrollbar);
        }

        function requestClose() {
            if (!modal.classList.contains('open')) return;
            closeModal();
            if (history.state && history.state.modalOpen) history.back();
        }

        modalClose.addEventListener('click', requestClose);

        document.addEventListener('keydown', (e) => {
            if (e.key !== 'Escape') return;
            if (mediaViewer.classList.contains('open')) closeViewer();
            else if (modal.classList.contains('open')) requestClose();
        });

        // El botón "atrás" del móvil cierra el modal
        window.addEventListener('popstate', () => {
            if (modal.classList.contains('open')) closeModal();
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

        // Cargar proyectos desde Markdown (asíncrono)
        loadProjects();
