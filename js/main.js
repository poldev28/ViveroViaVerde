/* ==========================================================================
   VIVERO VÍA VERDE — EDICIÓN BOTÁNICA & TIERRA VIVA (MAIN INTERACTIVE ENGINE)
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {

    /* ----------------------------------------------------------------------
       1. NAVBAR SCROLL & MOBILE MENU
       ---------------------------------------------------------------------- */
    const navbar = document.querySelector('.navbar');
    const menuToggle = document.getElementById('menuToggle');
    const navLinks = document.getElementById('navLinks');

    window.addEventListener('scroll', () => {
        if (!navbar) return;
        if (window.scrollY > 40) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    }, { passive: true });

    if (menuToggle && navLinks) {
        menuToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            const icon = menuToggle.querySelector('i');
            if (icon) {
                icon.className = navLinks.classList.contains('active')
                    ? 'fas fa-times'
                    : 'fas fa-bars';
            }
        });

        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
                const icon = menuToggle.querySelector('i');
                if (icon) icon.className = 'fas fa-bars';
            });
        });
    }

    /* ----------------------------------------------------------------------
       2. DECK INTERACTIVO DE NAVES & CULTIVO PROPIO (HERO)
       ---------------------------------------------------------------------- */
    const localSlidesData = [
        {
            num: 'NAVE 01',
            badge: 'Predio Productor & Gramíneas',
            footerSub: 'Calle Domingo Nazarre · Entre Matheu y Zelaya (A min. de Pilar del Este y San Sebastián)',
            title: '<i class="fas fa-warehouse"></i> Nuestras 5 Naves de Producción Propia',
            desc: 'Un predio amplio y cuidado en Calle Nazarre, entre Matheu y Zelaya. Producimos desde el esqueje ejemplares sanos, fuertes y aclimatados al suelo de Zona Norte.',
            img: 'images/local/local-1.jpg',
            sun: 'Cultivo a Cielo Abierto y Bajo Cubierta',
            water: 'Riego Controlado por Sector',
            use: 'Parquización de Lotes, Canteros y Jardines'
        },
        {
            num: 'NAVE 02',
            badge: 'Santa Ritas & Floración',
            footerSub: 'Ejemplares tutorados en flor listos para trasplante directo todo el año',
            title: '<i class="fas fa-sun-plant-wilt"></i> Nave de Santa Ritas, Jazmines & Trepadoras en Flor',
            desc: 'Cientos de ejemplares tutorados en caña en todos los colores (fucsia, violeta, naranja, rojo y blanco), listos para vestir pérgolas, galerías y cercos en Pilar del Este y San Sebastián.',
            img: 'images/local/local-2.jpg',
            sun: 'Sol Pleno / Media Sombra Luminosa',
            water: 'Riego Moderado',
            use: 'Pérgolas, Alambrados, Muros y Cercos con Flor'
        },
        {
            num: 'NAVE 03',
            badge: 'Esquejes & Suculentas',
            footerSub: 'Reproducción diaria de gajos, esquejes propios, crasas y suculentas de colección',
            title: '<i class="fas fa-seedling"></i> Mesadas de Reproducción Propia, Esquejes & Suculentas',
            desc: 'Como destacan nuestros clientes en Google Maps: acá ves a nuestro equipo preparando esquejes todos los días. Bandejas de Echeverias, Sedum y Crásulas 100% sanas.',
            img: 'images/local/local-3.jpg',
            sun: 'Luz Filtrada de Invernadero',
            water: 'Riego Espaciado',
            use: 'Colección, Macetas, Rocallas, Souvenirs y Mayorista'
        },
        {
            num: 'NAVE 04',
            badge: 'Arbustos & Cercos Vivos',
            footerSub: 'Especialistas en cierres perimetrales para barrios cerrados de Zelaya y Matheu',
            title: '<i class="fas fa-shield-heart"></i> Arbustos Perennes, Ficus Variegados & Cercos Vivos',
            desc: 'Especialistas en cierres perimetrales naturales para barrios cerrados y quintas en Zelaya y Matheu. Te calculamos la densidad exacta por metro lineal.',
            img: 'images/local/local-4.jpg',
            sun: 'Sol Directo o Media Sombra',
            water: 'Riego Regular en Implantación',
            use: 'Cierres Perimetrales, Privacidad y Pantallas Verdes'
        }
    ];

    const naveCardBtns = document.querySelectorAll('.nave-card-btn');
    const showcasePhotos = document.querySelectorAll('.showcase-photo');
    const heroBgSlides = document.querySelectorAll('.hero-bg-slide');
    const badgeNumEl = document.getElementById('showcaseBadgeNum');
    const badgeTextEl = document.getElementById('showcaseBadgeText');
    const footerSubEl = document.getElementById('showcaseFooterSub');
    const progressBarEl = document.getElementById('heroSlideProgress');
    const prevSlideBtn = document.getElementById('heroPrevSlide');
    const nextSlideBtn = document.getElementById('heroNextSlide');
    const captionTitleEl = document.getElementById('heroDynamicTitle');
    const captionDescEl = document.getElementById('heroDynamicDesc');

    const SLIDE_DURATION_MS = 5500;
    let currentSlideIndex = 0;
    let slideInterval = null;

    function restartProgressBar() {
        if (!progressBarEl) return;
        progressBarEl.style.transition = 'none';
        progressBarEl.style.width = '0%';
        void progressBarEl.offsetWidth;
        progressBarEl.style.transition = `width ${SLIDE_DURATION_MS}ms linear`;
        progressBarEl.style.width = '100%';
    }

    function activateNaveSlide(index) {
        if (!localSlidesData[index]) return;
        currentSlideIndex = index;
        const data = localSlidesData[index];

        naveCardBtns.forEach((btn, idx) => {
            btn.classList.toggle('active', idx === index);
        });

        showcasePhotos.forEach((img, idx) => {
            img.classList.toggle('active', idx === index);
        });

        heroBgSlides.forEach((bg, idx) => {
            bg.classList.toggle('active', idx === index);
        });

        if (badgeNumEl) badgeNumEl.textContent = data.num;
        if (badgeTextEl) badgeTextEl.textContent = data.badge;
        if (footerSubEl) footerSubEl.textContent = data.footerSub;

        restartProgressBar();

        if (captionTitleEl && captionDescEl) {
            captionTitleEl.style.opacity = '0';
            captionDescEl.style.opacity = '0';
            setTimeout(() => {
                captionTitleEl.innerHTML = data.title;
                captionDescEl.textContent = data.desc;
                captionTitleEl.style.opacity = '1';
                captionDescEl.style.opacity = '1';
            }, 160);
        }
    }

    function startNavesAutoPlay() {
        if (naveCardBtns.length === 0) return;
        stopNavesAutoPlay();
        restartProgressBar();
        slideInterval = setInterval(() => {
            const nextIdx = (currentSlideIndex + 1) % localSlidesData.length;
            activateNaveSlide(nextIdx);
        }, SLIDE_DURATION_MS);
    }

    function stopNavesAutoPlay() {
        if (slideInterval) {
            clearInterval(slideInterval);
            slideInterval = null;
        }
        if (progressBarEl) {
            progressBarEl.style.transition = 'none';
        }
    }

    if (naveCardBtns.length > 0) {
        naveCardBtns.forEach((btn, idx) => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                activateNaveSlide(idx);
                startNavesAutoPlay();
                btn.blur();
            });
            btn.addEventListener('mouseenter', stopNavesAutoPlay);
            btn.addEventListener('mouseleave', startNavesAutoPlay);
        });

        if (prevSlideBtn) {
            prevSlideBtn.addEventListener('click', (e) => {
                e.preventDefault();
                const prevIdx = (currentSlideIndex - 1 + localSlidesData.length) % localSlidesData.length;
                activateNaveSlide(prevIdx);
                startNavesAutoPlay();
            });
        }

        if (nextSlideBtn) {
            nextSlideBtn.addEventListener('click', (e) => {
                e.preventDefault();
                const nextIdx = (currentSlideIndex + 1) % localSlidesData.length;
                activateNaveSlide(nextIdx);
                startNavesAutoPlay();
            });
        }

        startNavesAutoPlay();
    }

    /* ----------------------------------------------------------------------
       3. FILTROS INTERACTIVOS DEL CATÁLOGO DE ESPECIES + MODAL FICHA BOTÁNICA
       ---------------------------------------------------------------------- */
    const filterButtons = document.querySelectorAll('.filter-pill-btn');
    const speciesCards = document.querySelectorAll('.species-card');

    filterButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const filter = btn.getAttribute('data-filter');
            filterButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            speciesCards.forEach(card => {
                const category = card.getAttribute('data-category');
                if (filter === 'all' || category === filter) {
                    card.classList.remove('is-hidden');
                } else {
                    card.classList.add('is-hidden');
                }
            });
        });
    });

    /* Modal Ficha Botánica & Zoom del Hero */
    const quickModal = document.getElementById('speciesQuickModal');
    const closeQuickModalBtn = document.getElementById('closeQuickModalBtn');
    const modalImg = document.getElementById('modalSpeciesImg');
    const modalBotanical = document.getElementById('modalSpeciesBotanical');
    const modalTitle = document.getElementById('modalSpeciesTitle');
    const modalDesc = document.getElementById('modalSpeciesDesc');
    const modalSun = document.getElementById('modalSpeciesSun');
    const modalWater = document.getElementById('modalSpeciesWater');
    const modalUse = document.getElementById('modalSpeciesUse');
    const modalWaBtn = document.getElementById('modalSpeciesWaBtn');
    const openLightboxBtn = document.getElementById('openLightboxBtn');

    function openBotanicalModal(info) {
        if (!quickModal) return;
        if (modalImg) modalImg.src = info.img;
        if (modalBotanical) modalBotanical.textContent = info.botanical;
        if (modalTitle) modalTitle.textContent = info.title;
        if (modalDesc) modalDesc.textContent = info.desc;
        if (modalSun) modalSun.textContent = info.sun;
        if (modalWater) modalWater.textContent = info.water;
        if (modalUse) modalUse.textContent = info.use;
        if (modalWaBtn) {
            const msg = encodeURIComponent(`Hola Vivero Vía Verde! Estuve viendo en la web "${info.title}" y quería consultar disponibilidad y precio.`);
            modalWaBtn.href = `https://wa.me/5493484319646?text=${msg}`;
        }
        quickModal.classList.add('open');
        quickModal.setAttribute('aria-hidden', 'false');
    }

    document.querySelectorAll('.quickview-trigger').forEach(trigger => {
        trigger.addEventListener('click', (e) => {
            e.preventDefault();
            const card = trigger.closest('.species-card');
            if (!card) return;
            openBotanicalModal({
                title: card.getAttribute('data-title') || '',
                botanical: card.getAttribute('data-botanical') || '',
                img: card.getAttribute('data-img') || '',
                sun: card.getAttribute('data-sun') || '',
                water: card.getAttribute('data-water') || '',
                use: card.getAttribute('data-use') || '',
                desc: card.getAttribute('data-desc') || ''
            });
        });
    });

    if (openLightboxBtn) {
        openLightboxBtn.addEventListener('click', () => {
            const slide = localSlidesData[currentSlideIndex];
            if (!slide) return;
            const cleanTitle = slide.title.replace(/<[^>]*>/g, '').trim();
            openBotanicalModal({
                title: cleanTitle,
                botanical: `Vivero Vía Verde · Sector ${slide.num}`,
                img: slide.img,
                sun: slide.sun,
                water: slide.water,
                use: slide.use,
                desc: slide.desc
            });
        });
    }

    if (closeQuickModalBtn && quickModal) {
        closeQuickModalBtn.addEventListener('click', () => {
            quickModal.classList.remove('open');
            quickModal.setAttribute('aria-hidden', 'true');
        });
        quickModal.addEventListener('click', (e) => {
            if (e.target === quickModal) {
                quickModal.classList.remove('open');
                quickModal.setAttribute('aria-hidden', 'true');
            }
        });
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && quickModal.classList.contains('open')) {
                quickModal.classList.remove('open');
                quickModal.setAttribute('aria-hidden', 'true');
            }
        });
    }

    /* ----------------------------------------------------------------------
       4. CALCULADORA INTERACTIVA DE CERCO VIVO & PARQUIZACIÓN POR WHATSAPP
       ---------------------------------------------------------------------- */
    const calcForm = document.getElementById('cercoCalcForm');
    const calcMetrosInput = document.getElementById('calcMetros');
    const calcZonaSelect = document.getElementById('calcZona');
    const calcObjetivoSelect = document.getElementById('calcObjetivo');
    const calcLuzSelect = document.getElementById('calcLuz');
    const calcPlantCountEl = document.getElementById('calcPlantCount');

    function updateCercoCalculation() {
        if (!calcMetrosInput || !calcObjetivoSelect || !calcPlantCountEl) return;
        const metros = Math.max(1, parseFloat(calcMetrosInput.value) || 1);
        const selectedOption = calcObjetivoSelect.options[calcObjetivoSelect.selectedIndex];
        const density = parseFloat(selectedOption.getAttribute('data-density')) || 2.5;
        const estimatedPlants = Math.ceil(metros * density);
        calcPlantCountEl.textContent = `~${estimatedPlants} ejemplares (${metros}m lineales)`;
        return {
            metros,
            estimatedPlants,
            objetivoText: selectedOption.text,
            zona: calcZonaSelect ? calcZonaSelect.value : 'Zona Matheu / Zelaya',
            luz: calcLuzSelect ? calcLuzSelect.value : 'Sol Pleno'
        };
    }

    if (calcMetrosInput && calcObjetivoSelect) {
        calcMetrosInput.addEventListener('input', updateCercoCalculation);
        calcObjetivoSelect.addEventListener('change', updateCercoCalculation);
        updateCercoCalculation();
    }

    if (calcForm) {
        calcForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const res = updateCercoCalculation();
            if (!res) return;
            const message = `Hola Vivero Vía Verde! Usé el calculador de la web y quisiera pedir presupuesto:\n` +
                `• Proyecto: ${res.objetivoText}\n` +
                `• Medida a cubrir: ${res.metros} metros lineales (aprox. ${res.estimatedPlants} ejemplares)\n` +
                `• Exposición solar: ${res.luz}\n` +
                `• Zona / Barrio: ${res.zona}\n` +
                `¿Me podrían asesorar con las especies recomendadas y precios? ¡Gracias!`;
            const waUrl = `https://wa.me/5493484319646?text=${encodeURIComponent(message)}`;
            window.open(waUrl, '_blank');
        });
    }

    /* ----------------------------------------------------------------------
       5. SCROLL REVEAL & CASCADING PARALLAX SUAVE
       ---------------------------------------------------------------------- */
    const revealEls = document.querySelectorAll('.reveal-up, .reveal-left, .reveal-right, .reveal-scale');
    if ('IntersectionObserver' in window) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-visible');
                }
            });
        }, { threshold: 0.12 });

        revealEls.forEach(el => observer.observe(el));
    } else {
        revealEls.forEach(el => el.classList.add('is-visible'));
    }

    /* Parallax suave en imágenes en cascada al hacer scroll */
    const cascadingWrap = document.querySelector('.cascading-visual-wrap');
    if (cascadingWrap) {
        const bgLayer = cascadingWrap.querySelector('.cascading-layer-bg');
        const mainLayer = cascadingWrap.querySelector('.cascading-layer-main');
        const floatCard = cascadingWrap.querySelector('.cascading-layer-floating-card');

        window.addEventListener('scroll', () => {
            const rect = cascadingWrap.getBoundingClientRect();
            const winH = window.innerHeight;
            if (rect.top < winH && rect.bottom > 0) {
                const progress = (winH - rect.top) / (winH + rect.height) - 0.5;
                if (bgLayer) bgLayer.style.transform = `translate3d(${progress * -20}px, ${progress * 30}px, 0)`;
                if (mainLayer) mainLayer.style.transform = `translate3d(0, ${progress * -18}px, 0)`;
                if (floatCard) floatCard.style.transform = `translate3d(${progress * 14}px, ${progress * -30}px, 0)`;
            }
        }, { passive: true });
    }

    /* Efecto 3D Tilt suave en las tarjetas de Servicios */
    const comboCards = document.querySelectorAll('.combo-kinetic-card');
    comboCards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            if (window.innerWidth < 900) return;
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const rotateY = ((x / rect.width) - 0.5) * 6;
            const rotateX = ((y / rect.height) - 0.5) * -6;
            card.style.transform = `perspective(950px) translateY(-8px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg)`;
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = '';
        });
    });

    /* ----------------------------------------------------------------------
       6. CARRUSELES DRAG & FLECHAS (PILARES DE CULTIVO Y RESEÑAS)
       ---------------------------------------------------------------------- */
    const strips = document.querySelectorAll('.brands-scroll-strip, .reviews-strip');
    strips.forEach(strip => {
        let isDown = false;
        let startX;
        let scrollLeft;

        strip.addEventListener('mousedown', (e) => {
            isDown = true;
            startX = e.pageX - strip.offsetLeft;
            scrollLeft = strip.scrollLeft;
        });
        strip.addEventListener('mouseleave', () => { isDown = false; });
        strip.addEventListener('mouseup', () => { isDown = false; });
        strip.addEventListener('mousemove', (e) => {
            if (!isDown) return;
            e.preventDefault();
            const x = e.pageX - strip.offsetLeft;
            const walk = (x - startX) * 1.8;
            strip.scrollLeft = scrollLeft - walk;
        });
    });

    document.querySelectorAll('.strip-arrow').forEach(arrow => {
        arrow.addEventListener('click', () => {
            const targetId = arrow.getAttribute('data-target');
            const container = document.getElementById(targetId);
            if (!container) return;
            const amount = container.clientWidth * 0.7;
            container.scrollBy({
                left: arrow.classList.contains('prev') ? -amount : amount,
                behavior: 'smooth'
            });
        });
    });

    /* ----------------------------------------------------------------------
       7. DETECTOR DEL DÍA ACTUAL EN LA TABLA DE HORARIOS
       ---------------------------------------------------------------------- */
    const now = new Date();
    const day = now.getDay(); // 0=Dom, 1=Lun, ..., 6=Sab

    const scheduleRows = document.querySelectorAll('.schedule-row');
    scheduleRows.forEach(row => {
        const daysAttr = row.getAttribute('data-days') || '';
        const daysList = daysAttr.split(',').map(Number);
        if (daysList.includes(day)) {
            row.classList.add('today');
        }
    });

    /* ----------------------------------------------------------------------
       8. WIDGET FLOTANTE DE WHATSAPP CON MENÚ RÁPIDO
       ---------------------------------------------------------------------- */
    const waLauncher = document.getElementById('waLauncherBtn');
    const waPopup = document.getElementById('waPopupMenu');
    const waClose = document.getElementById('waPopupClose');
    const waNotif = document.getElementById('waNotifBadge');

    if (waLauncher && waPopup) {
        waLauncher.addEventListener('click', (e) => {
            e.stopPropagation();
            waPopup.classList.toggle('open');
            if (waNotif) waNotif.style.display = 'none';
        });

        if (waClose) {
            waClose.addEventListener('click', (e) => {
                e.stopPropagation();
                waPopup.classList.remove('open');
            });
        }

        document.addEventListener('click', (e) => {
            if (!waPopup.contains(e.target) && !waLauncher.contains(e.target)) {
                waPopup.classList.remove('open');
            }
        });
    }
});
