document.addEventListener('DOMContentLoaded', () => {

    /* --- MOBILE MENU LOGIC --- */
    const menuBtn = document.getElementById('menu-btn');
    const closeBtn = document.getElementById('close-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    const mobileNavItems = document.querySelectorAll('.mobile-nav-item');

    function openMenu() {
        mobileMenu.classList.add('active');
        document.body.style.overflow = 'hidden'; 
    }

    function closeMenuLogic() {
        mobileMenu.classList.remove('active');
        document.body.style.overflow = 'auto';
    }

    if(menuBtn) menuBtn.addEventListener('click', openMenu);
    if(closeBtn) closeBtn.addEventListener('click', closeMenuLogic);
    
    if(mobileMenu) {
        mobileMenu.addEventListener('click', (e) => {
            if (e.target === mobileMenu) closeMenuLogic();
        });
    }

    mobileNavItems.forEach(item => {
        item.addEventListener('click', closeMenuLogic);
    });

    /* --- SEARCH BAR LOGIC --- */
    const searchToggle = document.querySelector('.search-toggle');
    const searchDropdown = document.getElementById('search-dropdown');
    const desktopSearchBtn = document.getElementById('desktop-search-btn');
    const desktopSearchInput = document.getElementById('desktop-search-input');

    if(searchToggle) {
        searchToggle.addEventListener('click', () => {
            searchDropdown.classList.toggle('active');
            if(searchDropdown.classList.contains('active')){
                desktopSearchInput.focus();
            }
        });
    }

    if(desktopSearchBtn) {
        desktopSearchBtn.addEventListener('click', () => {
            if(desktopSearchInput.value.trim() !== '') {
                alert(`Searching for: ${desktopSearchInput.value}`);
                searchDropdown.classList.remove('active');
            }
        });
    }

    /* --- STICKY NAV & SCROLL SPY --- */
    const header = document.getElementById('main-header');
    const sections = document.querySelectorAll('.section-block');
    const navLinksDesktop = document.querySelectorAll('.nav-links .nav-item');
    const navLinksMobile = document.querySelectorAll('.mobile-links .mobile-nav-item');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }

        let current = '';
        if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight - 50) {
            current = 'about';
        } else {
            sections.forEach(section => {
                const sectionTop = section.offsetTop;
                if (scrollY >= (sectionTop - 200)) { 
                    current = section.getAttribute('id');
                }
            });
        }

        const updateLinks = (links) => {
            links.forEach(link => {
                link.classList.remove('active');
                if (current && link.getAttribute('href').includes(current)) {
                    link.classList.add('active');
                }
            });
        };

        updateLinks(navLinksDesktop);
        updateLinks(navLinksMobile);
    });

    /* --- FILTER BUTTONS LOGIC --- */
    function setupFilters(filterContainerId, galleryContainerId) {
        const filterBtns = document.querySelectorAll(`#${filterContainerId} .filter-btn`);
        const galleryItems = document.querySelectorAll(`#${galleryContainerId} > div`);

        filterBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                filterBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');

                const filterValue = btn.getAttribute('data-filter');

                galleryItems.forEach(item => {
                    if (filterValue === 'all' || item.getAttribute('data-category') === filterValue) {
                        item.style.display = 'block';
                    } else {
                        item.style.display = 'none';
                    }
                });
            });
        });
    }

    setupFilters('explore-filters', 'explore-gallery');
    setupFilters('artist-filters', 'artist-gallery');

    /* --- HERO CAROUSEL AUTO-ROTATE (4 Images) --- */
    const carouselData = [
        { main: 'https://via.placeholder.com/350x500/9F4E38/FFFFFF?text=Classic+Artwork+1', sub: 'https://via.placeholder.com/150x400/53667B/FFFFFF?text=Landscape+1' },
        { main: 'https://via.placeholder.com/350x500/53667B/FFFFFF?text=Classic+Artwork+2', sub: 'https://via.placeholder.com/150x400/EAE2D6/1C1C1C?text=Sculpture+2' },
        { main: 'https://via.placeholder.com/350x500/1C1C1C/FFFFFF?text=Modern+Art+3', sub: 'https://via.placeholder.com/150x400/9F4E38/FFFFFF?text=Portrait+3' },
        { main: 'https://via.placeholder.com/350x500/EAE2D6/1C1C1C?text=Contemporary+4', sub: 'https://via.placeholder.com/150x400/1C1C1C/FFFFFF?text=Abstract+4' }
    ];

    let currentSlide = 0;
    const mainImg = document.getElementById('main-carousel-img');
    const subImg = document.getElementById('sub-carousel-img');
    const nextBtn = document.getElementById('next-slide');
    const prevBtn = document.getElementById('prev-slide');

    if(mainImg && subImg) {
        function updateCarousel(index) {
            mainImg.style.opacity = 0;
            subImg.style.opacity = 0;
            setTimeout(() => {
                mainImg.src = carouselData[index].main;
                subImg.src = carouselData[index].sub;
                mainImg.style.opacity = 1;
                subImg.style.opacity = 1;
            }, 200);
        }

        function autoSlide() {
            currentSlide = (currentSlide + 1) % carouselData.length;
            updateCarousel(currentSlide);
        }

        let slideInterval = setInterval(autoSlide, 7000);

        if(nextBtn) {
            nextBtn.addEventListener('click', () => {
                clearInterval(slideInterval);
                autoSlide();
                slideInterval = setInterval(autoSlide, 7000);
            });
        }

        if(prevBtn) {
            prevBtn.addEventListener('click', () => {
                clearInterval(slideInterval);
                currentSlide = (currentSlide - 1 + carouselData.length) % carouselData.length;
                updateCarousel(currentSlide);
                slideInterval = setInterval(autoSlide, 7000);
            });
        }
    }
});
