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

    menuBtn.addEventListener('click', openMenu);
    closeBtn.addEventListener('click', closeMenuLogic);

    mobileMenu.addEventListener('click', (e) => {
        if (e.target === mobileMenu) closeMenuLogic();
    });

    mobileNavItems.forEach(item => {
        item.addEventListener('click', closeMenuLogic);
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            closeMenuLogic();
            searchDropdown.classList.remove('active');
        }
    });

    window.addEventListener('resize', () => {
        if (window.innerWidth > 600) closeMenuLogic();
    });

    /* --- SEARCH BAR LOGIC --- */
    const searchToggle = document.querySelector('.search-toggle');
    const searchDropdown = document.getElementById('search-dropdown');
    const desktopSearchBtn = document.getElementById('desktop-search-btn');
    const desktopSearchInput = document.getElementById('desktop-search-input');
    const mobileSearchBtn = document.getElementById('mobile-search-btn');
    const mobileSearchInput = document.getElementById('mobile-search-input');

    searchToggle.addEventListener('click', () => {
        searchDropdown.classList.toggle('active');
        if (searchDropdown.classList.contains('active')) {
            desktopSearchInput.focus();
        }
    });

    function handleSearch(query) {
        if (query.trim() !== '') {
            alert(`Searching for: ${query}\n(Search functionality placeholder)`);
            searchDropdown.classList.remove('active');
        }
    }

    desktopSearchBtn.addEventListener('click', () => handleSearch(desktopSearchInput.value));
    mobileSearchBtn.addEventListener('click', () => {
        handleSearch(mobileSearchInput.value);
        closeMenuLogic();
    });


    /* --- STICKY NAV & SCROLL SPY (Active Links) --- */
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
                if (window.scrollY >= (sectionTop - 200)) {
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


    /* --- HERO CAROUSEL INTERACTION --- */
    const carouselData = [
        { main: 'Images/Artworks/Spoliarium.jpg', sub: 'Images/Artworks/Las Virgenes Cristianas.jpg' },
        { main: 'Images/Artworks/Planting Rice.jpg', sub: 'Images/Artworks/The Builders.jpg' },
        { main: 'Images/Artworks/Manunggul Jar.jpg', sub: 'Images/Artworks/Genesis.jpg' },
        { main: 'Images/Artworks/Genesis.jpg', sub: 'Images/Artworks/Spoliarium.jpg' }
    ];

    carouselData.forEach(slide => {
        new Image().src = slide.main;
        new Image().src = slide.sub;
    });

    let currentSlide = 0;
    const FADE_MS = 400;
    const mainImg = document.getElementById('main-carousel-img');
    const subImg = document.getElementById('sub-carousel-img');
    const nextBtn = document.getElementById('next-slide');
    const prevBtn = document.getElementById('prev-slide');

    function updateCarousel(index) {
        mainImg.style.opacity = 0;
        subImg.style.opacity = 0;

        setTimeout(() => {
            mainImg.src = carouselData[index].main;
            subImg.src = carouselData[index].sub;
            mainImg.style.opacity = 1;
            subImg.style.opacity = 1;
        }, FADE_MS);
    }

    function autoSlide() {
        currentSlide = (currentSlide + 1) % carouselData.length;
        updateCarousel(currentSlide);
    }

    // Auto rotate every 7 seconds
    let slideInterval = setInterval(autoSlide, 7000);

    function restartInterval() {
        clearInterval(slideInterval);
        slideInterval = setInterval(autoSlide, 7000);
    }

    nextBtn.addEventListener('click', () => {
        autoSlide();
        restartInterval();
    });

    prevBtn.addEventListener('click', () => {
        currentSlide = (currentSlide - 1 + carouselData.length) % carouselData.length;
        updateCarousel(currentSlide);
        restartInterval();
    });
});
