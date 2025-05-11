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

langToggle.addEventListener('click', (e) => {
    e.preventDefault();
    langDropdown.classList.toggle('show-lang');
});

// Close dropdown if clicked out
document.addEventListener('click', (e) => {
    if (!langToggle.contains(e.target) && !langDropdown.contains(e.target)) {
        langDropdown.classList.remove('show-lang');
    }
});

// ======= Language Change (Basic) =======
const translations = {
    en: {
        home: "Home",
        about: "About",
        skills: "Skills",
        portfolio: "Portfolio",
        cv: "CV",
        contact: "Contact",
        language: "🇬🇧 Language"
    },
    ru: {
        home: "Главная",
        about: "Обо мне",
        skills: "Навыки",
        portfolio: "Портфолио",
        cv: "Резюме",
        contact: "Контакты",
        language: "🇷🇺 Язык"
    }
};

let currentLang = 'en'; // Initial language

document.querySelectorAll('.lang-option').forEach((option) => {
    option.addEventListener('click', (e) => {
        e.preventDefault();
        const lang = option.getAttribute('data-lang');
        changeLanguage(lang);
        langDropdown.classList.remove('show-lang'); // Cerrar dropdown
    });
});

const translatableElements = document.querySelectorAll('[data-translate]');
function changeLanguage(lang) {
    translatableElements.forEach((el) => {
        el.textContent = translations[lang][el.dataset.translate];
    });
    
    document.documentElement.setAttribute('lang', lang);
    document.body.setAttribute('lang', lang);
    
    // Optional: Save preference in localStorage
    localStorage.setItem('lang', lang);
}


// Opcional: Recuperar idioma guardado en localStorage
document.addEventListener('DOMContentLoaded', () => {
    const savedLang = localStorage.getItem('lang');
    if (savedLang && translations[savedLang]) {
        changeLanguage(savedLang);
    }
});


/*===== SCROLL SECTIONS ACTIVE LINK =====*/
const sections = document.querySelectorAll('section[id]')

window.addEventListener('scroll', scrollActive)

function scrollActive(){
    const scrollY = window.pageYOffset

    sections.forEach(current =>{
        const sectionHeight = current.offsetHeight
        const sectionTop = current.offsetTop - 50;
        sectionId = current.getAttribute('id')

        if(scrollY > sectionTop && scrollY <= sectionTop + sectionHeight){
            document.querySelector('.nav__menu a[href*=' + sectionId + ']').classList.add('active')
        }else{
            document.querySelector('.nav__menu a[href*=' + sectionId + ']').classList.remove('active')
        }
    })
}

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
sr.reveal('.skills__img', {delay: 400})


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




