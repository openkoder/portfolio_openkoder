/*===== MENU SHOW =====*/ 
const showMenu = (toggleId, navId) =>{
    const toggle = document.getElementById(toggleId),
    nav = document.getElementById(navId)

    if(toggle && nav){
        toggle.addEventListener('click', ()=>{
            nav.classList.toggle('show')
        })
    }
}
showMenu('nav-toggle','nav-menu')

/*===== REMOVE MENU MOBILE =====*/
const navLink = document.querySelectorAll('.nav__list > .nav__item:not(.nav__lang) > .nav__link')

function linkAction(){
    const navMenu = document.getElementById('nav-menu')
    navMenu.classList.remove('show')
}
navLink.forEach(n => n.addEventListener('click', linkAction))


// ======= Toggle Language Dropdown =======
const langToggle = document.getElementById('lang-toggle');
const langDropdown = document.getElementById('lang-dropdown');

// Opens or closes the dropdown list on click
langToggle.addEventListener('click', (e) => {
    e.preventDefault();
    langDropdown.classList.toggle('show-lang');
});

// Closes the dropdown list if clicked outside of it
document.addEventListener('click', (e) => {
    if (!langToggle.contains(e.target) && !langDropdown.contains(e.target)) {
        langDropdown.classList.remove('show-lang');
    }
});

// ======= Language Change (Basic) =======

// Closing dropdown when selecting a language
document.querySelectorAll('.lang-option').forEach((link) => {
	link.addEventListener('click', () => {
		// Get language from data attribute (e.g., "en", "ru")
		const lang = link.dataset.lang || 'en';
		
		// Save the selected language to localStorage
		changeLanguage(lang);
		
		// Close the language dropdown menu
		langDropdown.classList.remove('show-lang');
		// The browser will follow the link automatically (no need to manually redirect)
	});
});


function changeLanguage(lang) {    
    // Optional: Save preference in localStorage
    localStorage.setItem('lang', lang);
}


// Optional: Retrieve language saved in localStorage
/*
document.querySelectorAll('.lang-option').forEach((option) => {
	option.addEventListener('click', () => {
		langDropdown.classList.remove('show-lang');
	});
});
*/

document.addEventListener('DOMContentLoaded', () => {
	const savedLang = localStorage.getItem('lang');
	console.log('savedLang:', savedLang);
	
	if (savedLang) {
		const currentPath = window.location.pathname || '/'; // Если пусто — берём '/'

		console.log('Current path:', currentPath);
		console.log('Base path:', basePath);
		
		if (savedLang === 'en') {
			// If English is saved, but we're not in root → redirect to root
			if (currentPath !== '/' && currentPath !== '/index.html' && !currentPath.endsWith('/en/') && !currentPath.endsWith('/en/index.html')) {
				// GitHub Pages project URL fix (e.g., /portfolio_openkoder/)
				const basePath = window.location.pathname.split('/').slice(0, -1).join('/') || '/';
				console.log('Base path:', basePath); //
				
				window.location.href = `${basePath}/`;
			} else {
			  // For other languages (ru, es...), redirect to /lang/ folder
				if (!currentPath.endsWith(`/${savedLang}/`) && !currentPath.endsWith(`/${savedLang}/index.html`)) {
					const basePath = window.location.pathname.split('/').slice(0, -1).join('/') || '/';
					console.log('Base path:', basePath);
					window.location.href = `${basePath}/${savedLang}/`;
				}
			}
		}
	}
});


/*===== SCROLL SECTIONS ACTIVE LINK =====*/
const sections = document.querySelectorAll('section[id]')
const navLinks = document.querySelectorAll('.nav__link'); // закэшировали ссылки
const headerHeight = document.querySelector('.l-header').offsetHeight; // закэшировали высоту шапки

let ticking = false;

window.addEventListener('scroll', function() {
  if (!ticking) {
    ticking = true;
    window.requestAnimationFrame(function() {
      scrollActive();
      ticking = false;
    });
  }
});

function scrollActive(){
    const scrollY = Math.ceil(window.pageYOffset)

	// Сначала удаляем .active у всех ссылок
    navLinks.forEach(link => link.classList.remove('active'));

    sections.forEach(current =>{
		const sectionHeight = current.offsetHeight
		//const sectionTop = current.offsetTop - 50;
        const sectionTop = current.offsetTop - headerHeight; // Вот тут меняем -50 на -headerHeight
		sectionId = current.getAttribute('id')

        if(scrollY >= sectionTop && scrollY < sectionTop + sectionHeight){
			// Отладочный вывод
			console.log(`Section: ${sectionId}, Top: ${sectionTop}, Height: ${sectionHeight}, ScrollY: ${scrollY}`);
            document.querySelector('.nav__menu a[href*=' + sectionId + ']').classList.add('active')
		}
    })
}

// Фикс для перезагрузки с #якорем
document.addEventListener('DOMContentLoaded', function() {
  setTimeout(scrollActive, 100); 
});

/*===== SCROLL REVEAL ANIMATION =====*/
const sr = ScrollReveal({
    origin: 'top',
    distance: '80px',
    duration: 2000,
    reset: true
});

/*SCROLL HOME*/
//sr.reveal('.home__title', {})
//sr.reveal('.home__scroll', {delay: 200})
//sr.reveal('.home__img', {origin:'right', delay: 400})

sr.reveal('.home__title', { origin: 'top' });
sr.reveal('.home__scroll', { origin: 'top', delay: 200 });

document.addEventListener('DOMContentLoaded', () => {
    const homeImg = document.querySelector('.home__img');

    // Настраиваем Intersection Observer
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Если изображение в области видимости, добавляем класс visible
                homeImg.classList.add('visible');
            } else {
                // Если изображение выходит из области видимости, удаляем класс visible (опционально)
                homeImg.classList.remove('visible');
            }
        });
    }, {
        threshold: 0.1 // 10% элемента должно быть видно, чтобы сработал эффект
    });

    // Наблюдаем за изображением
    observer.observe(homeImg);
});

// Настраиваем правильный скролл при нажатии PgDn и PgUp
document.addEventListener('keydown', (e) => {
  if (e.key === 'PageDown' || e.key === 'PageUp') {
	e.preventDefault(); // Отменяем стандартное поведение

	const headerHeight = parseInt(getComputedStyle(document.querySelector('.l-header')).height);
	const scrollStep = window.innerHeight - headerHeight;
	const currentScroll = window.scrollY;

	if (e.key === 'PageDown') {
	  window.scrollTo({ top: currentScroll + scrollStep, behavior: 'smooth' });
	} else {
	  window.scrollTo({ top: Math.max(0, currentScroll - scrollStep), behavior: 'smooth' });
	}
  }
});

// Принудительная перерисовка шапки l-header
/*
if (window.matchMedia("(max-width: 768px)").matches) {
  window.addEventListener('scroll', function() {
    document.querySelector('.l-header').style.transform = 'translateY(0)';
  }, { passive: true });
}
*/


/*SCROLL ABOUT*/

//sr.reveal('.about__img', {delay: 500})
sr.reveal('.about__img', { origin: 'left', delay: 500 }); // слева
sr.reveal('.about__subtitle', {delay: 300})
sr.reveal('.about__profession', {delay: 400})
sr.reveal('.about__text', {delay: 500})
sr.reveal('.about__social-icon', {delay: 600, interval: 200})


/*SCROLL SKILLS*/
sr.reveal('.skills__subtitle', {})
//sr.reveal('.skills__name', {distance: '20px', delay: 50, interval: 100})
sr.reveal('.skills__name', { origin: 'bottom', distance: '20px', delay: 50, interval: 100 }); // снизу
sr.reveal('.skills__img  img', {
  origin: 'right',
  distance: '100%',
  delay: 400,
  interval: 400, // каждая следующая картинка будет появляться на 200мс позже
  viewFactor: 0,
  reset: true // чтобы повторялась при повторном скролле
});


/*SCROLL PORTFOLIO*/
sr.reveal('.portfolio__img', {interval: 200})


/* 
 * Modal 
 * */

// Function to open the modal
function openModal(modalId) {
	var modal = document.getElementById(modalId);
	if (modal) {
		modal.style.display = "block";
	}
}

// Function to close the modal
function closeModal(modalId) {
	var modal = document.getElementById(modalId);
	if (modal) {
		modal.style.display = "none";
	}
}

// Close modal when clicking outside of it
function closeModal(modalId) {
        document.getElementById(modalId).style.display = "none";
}

window.addEventListener('click', function(event) {
        if (event.target.classList.contains('modal')) {
                event.target.style.display = "none";
        }
});


/*SCROLL CV*/
sr.reveal('.cv__subtitle', {})
sr.reveal('.cv__text', {interval: 200})

/*SCROLL CONTACT*/
sr.reveal('.contact__subtitle', {})
sr.reveal('.contact__text', {interval: 200})
sr.reveal('.contact__input', {delay: 400})
sr.reveal('.contact__button', {delay: 600})




