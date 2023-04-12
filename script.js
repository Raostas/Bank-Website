'use strict';

///////////////////////////////////////
// Modal window

const modalWindow = document.querySelector('.modal-window');
const overlay = document.querySelector('.overlay');
const btnCloseModalWindow = document.querySelector('.btn--close-modal-window');
const btnsOpenModalWindow = document.querySelectorAll(
  '.btn--show-modal-window'
);
const tabs = document.querySelectorAll('.operations__tab');
const tabContainer = document.querySelector('.operations__tab-container');
const tabContents = document.querySelectorAll('.operations__content');

const nav = document.querySelector('.nav');
const section1 = document.querySelector('#section--1');

const openModalWindow = function () {
  modalWindow.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModalWindow = function (e) {
  e.preventDefault();
  modalWindow.classList.add('hidden');
  overlay.classList.add('hidden');
};

btnsOpenModalWindow.forEach(button =>
  button.addEventListener('click', openModalWindow)
);

btnCloseModalWindow.addEventListener('click', closeModalWindow);
overlay.addEventListener('click', closeModalWindow);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modalWindow.classList.contains('hidden')) {
    closeModalWindow();
  }
});

const message = document.createElement('div');
message.classList.add('cookie-message');
message.textContent = 'Mq kuki';
message.innerHTML =
  'Mq kuki <button class="btn btn--close-cookie">Ok!</button>';

const header = document.querySelector('.header');
header.append(message);

document
  .querySelector('.btn--close-cookie')
  .addEventListener('click', function () {
    message.remove();
    // message.parentElement.removeChild(message);
  });

// 1. Add EventListener for the common parent
document.querySelector('.nav__links').addEventListener('click', function (e) {
  e.preventDefault();
  // 2. choose target element
  console.log(e.target);
  if (e.target.classList.contains('nav__link')) {
    const href = e.target.getAttribute('href');
    console.log(href);
    document.querySelector(href).scrollIntoView({
      behavior: 'smooth',
    });
  }
});

// tabs

tabContainer.addEventListener('click', function (e) {
  const clickedButton = e.target.closest('.operations__tab');
  console.log(clickedButton);
  //Guard clause
  if (!clickedButton) return;

  //active tab
  tabs.forEach(tab => tab.classList.remove('operations__tab--active'));
  clickedButton.classList.add('operations__tab--active');

  //active content
  tabContents.forEach(content =>
    content.classList.remove('operations__content--active')
  );
  document
    .querySelector(`.operations__content--${clickedButton.dataset.tab}`)
    .classList.add('operations__content--active');
});

const navHeight = nav.getBoundingClientRect().height;

const getStickyNav = function (entries) {
  const entry = entries[0];
  if (!entry.isIntersecting) {
    nav.classList.add('sticky');
  } else {
    nav.classList.remove('sticky');
  }
};

const headerObserver = new IntersectionObserver(getStickyNav, {
  root: null,
  threshold: 0,
  rootMargin: `-${navHeight}px`,
});
headerObserver.observe(header);

//the appereance of parts of the site

const allSections = document.querySelectorAll('.section');

const appereanceSection = function (entries, observer) {
  const entry = entries[0];
  console.log(entry);
  if (!entry.isIntersecting) return;
  entry.target.classList.remove('section--hidden');
  observer.unobserve(entry.target);
};
const sectionObserver = new IntersectionObserver(appereanceSection, {
  root: null,
  threshold: 0.2,
});
allSections.forEach(function (section) {
  sectionObserver.observe(section);
  section.classList.add('section--hidden');
});

//implementation lazy loading for img

const lazyImages = document.querySelectorAll('img[data-src]');

const loadImages = function (entries, observer) {
  const entry = entries[0];

  if (!entry.isIntersecting) return;

  //Change resolution to high quality
  entry.target.src = entry.target.dataset.src;
  // entry.target.classList.remove('lazy-img');

  entry.target.addEventListener('load', function () {
    entry.target.classList.remove('lazy-img');
  });
  observer.unobserve(entry.target);
};

const lazyImagesObserver = new IntersectionObserver(loadImages, {
  root: null,
  threshold: 0.7,
});

lazyImages.forEach(image => lazyImagesObserver.observe(image));

//Slider creation
const slides = document.querySelectorAll('.slide');
const btnLeft = document.querySelector('.slider__btn--left');
const btnRight = document.querySelector('.slider__btn--right');
const dotContainer = document.querySelector('.dots');

let currentSlide = 0;
const slidesNumber = slides.length;

const slider = document.querySelector('.slider');
slider.style.transform = 'scale(0.2) transalteX(1000)';
slider.style.overflow = 'visible';

const moveToSlide = function (slide) {
  slides.forEach(
    (s, index) => (s.style.transform = `translateX(${(index - slide) * 100}%)`)
  );
};

moveToSlide(0);

const nextSlide = function () {
  if (currentSlide === slidesNumber - 1) {
    currentSlide = 0;
  } else {
    currentSlide++;
  }
  moveToSlide(currentSlide);
};

const previousSlide = function () {
  if (currentSlide === 0) {
    currentSlide = slidesNumber - 1;
  } else {
    currentSlide--;
  }
  moveToSlide(currentSlide);
};

btnRight.addEventListener('click', nextSlide);
btnLeft.addEventListener('click', previousSlide);

document.addEventListener('keydown', function (e) {
  if (e.key === 'ArrowRight') nextSlide();
  if (e.key === 'ArrowLeft') previousSlide();
});

const createDots = function () {
  slides.forEach(function (_, index) {
    dotContainer.insertAdjacentHTML(
      'beforeend',
      `<button class="dots__dot" 
    data-slide="${index}"></button>`
    );
  });
};

dotContainer.addEventListener('click', function (e) {
  if (e.target.classList.contains('dots__dot')) {
    const slide = e.target.dataset.slide;
    moveToSlide(slide);
  }
});

createDots();

// // Dom traversing

// const h1 = document.querySelector('h1');

// // bottom moving (parent)

// console.log(h1.querySelectorAll('.highlight'))
// console.log(h1.childNodes)
// console.log(h1.children)
// console.log(h1.firstElementChild)
// h1.firstElementChild.style.color = 'yellow'

// // Перемещение вверх (к родителям)

// console.log(h1.parentNode)
// console.log(h1.parentElement)

// h1.closest('.header')

// const h2 = document.querySelector('h2')
// console.log(h2)
// h2.closest('.section').style.backgroundColor = 'blue'
// h2.closest('h2').style.backgroundColor = 'green'

// // moving to sides
// console.log(h2.previousElementSibling)
// console.log(h2.nextElementSibling)
// console.log(h1.parentElement.children)

//events

// const h1 = document.querySelector('h1');
// const alertMouseEnterH1 = function(e) {
//   alert('addEventListener: You are now at the h1 element')
//   h1.removeEventListener('mouseenter',alertMouseEnterH1)
// }
// h1.addEventListener('mouseenter', alertMouseEnterH1);

// setTimeout(() => h1.removeEventListener('mouseenter', alertMouseEnterH1),5000)

// h1.onmouseenter = function(e) {

//   alert('hi')
// }

//Event propogation
//rgb (123,56,178)

// function getRandomIntInclusive(min, max) {
//   min = Math.ceil(min);
//   max = Math.floor(max);
//   return Math.floor(Math.random() * (max - min + 1) + min);
// }

// const getRandomColor = () => `rgb(${getRandomIntInclusive(0,255)},${getRandomIntInclusive(0,255)},${getRandomIntInclusive(0,255)})`

// console.log(getRandomColor())

// document.querySelector('.nav__link').addEventListener('click', function(e) {
//   this.style.backgroundColor = getRandomColor()
// console.log('Link', e.target, e.currentTarget)
// console.log(this === e.currentTarget)
// //stop propagation
// e.stopPropagation()
// })

// document.querySelector('.nav__links').addEventListener('click', function(e) {
//   this.style.backgroundColor = getRandomColor()
//   console.log('Links', e.target, e.currentTarget)
//   console.log(this === e.currentTarget)
//   })

// document.querySelector('.nav').addEventListener('click', function(e) {
//   this.style.backgroundColor = getRandomColor()
//   console.log('Links', e.target, e.currentTarget)
//   console.log(this === e.currentTarget)
//   })

//Sticky navigation - intersection observer API

// const observerCallback = function (entries, observer) {
//   entries.forEach(entry => {
//     console.log(entry);
//   });
// };
// const observerOptions = {
//   root: null,
//   threshold: [0, 0.2],
// };
// const observer = new IntersectionObserver(observerCallback, observerOptions);
// observer.observe(section1);
//animation navigation panel

// const navLinksHoverAnimation = function (e) {
//   if (e.target.classList.contains('nav__link')) {
//     const linkOver = e.target;
//     const siblingLinks = linkOver
//       .closest('.nav__links')
//       .querySelectorAll('.nav__link');
//     const logo = linkOver.closest('.nav').querySelector('img');
//     const logoText = linkOver.closest('.nav').querySelector('.nav__text');

//     siblingLinks.forEach(el => {
//       if (el !== linkOver) el.style.opacity = this;
//     });
//     logo.style.opacity = this;
//     logoText.style.opacity = this;
//   }
// };

//Work with arguments with bind() this
// nav.addEventListener('mouseover', navLinksHoverAnimation.bind(0.4));
// nav.addEventListener('mouseout', navLinksHoverAnimation.bind(1));

// //sticky navigation

// const section1Coords = section1.getBoundingClientRect();

// window.addEventListener('scroll', function () {
//   if (window.scrollY > section1Coords.top) {
//     nav.classList.add('sticky');
//   } else {
//     nav.classList.remove('sticky');
//   }
// });

// // Стили

// message.style.backgroundColor = '#076785';
// message.style.width = '120%';
// console.log(message.style.width);
// console.log(message.style.color);

// console.log(getComputedStyle(message).color);
// console.log(getComputedStyle(message).height);
// message.style.height =
//   Number.parseFloat(getComputedStyle(message).height) + 50 + 'px';
// console.log(getComputedStyle(message).height);

// document.documentElement.style.setProperty('--color-first', 'yellow');

// // Atributes
// const logo = document.querySelector('nav_logo');
// console.log(logo.alt);
// console.log(logo.src);
// console.log(logo.className);
// console.log(logo.getAttribute('src'))
// //Нестандартный Атрибут
// logo.alt = 'logo prekrasnqj bank';

// console.log(logo.developer);
// console.log(logo.getAttribute('developer'));
// logo.setAttribute('copyright', 'Masters Of Code');

// const link = document.querySelector('nav__link--btn')
// console.log(link.getAttribute('href'))

// //Data attributes
// console.log(logo.dataset.versionNumber)

// //Classes

// logo.classlist.add()
// logo.classlist.remove()
// logo.classlist.toggle()
// logo.classlist.contains()

// //Don't use

// logo.className = 'a'

// const btnScrollTo = document.querySelector('.btn--scroll-to')

// btnScrollTo.addEventListener('click', function(e) {

// const section1Coords = section1.getBoundingClientRect()
// console.log(section1Coords)
// console.log(e.target.getBoundingClientRect())
// console.log('Текущее прокручивание: x,y ', window.pageXOffset,window.pageYOffset)

// console.log(
//   'Ширина и высота viewport',
//   document.documentElement.clientWidth,
//   document.documentElement.clientHeight
// )

// window.scrollTo({
//   left: section1Coords.left + window.pageXOffset,
//   top: section1Coords.top + window.pageYOffset,
//   behavior: 'smooth',
// })

//   section1.scrollIntoView({behavior: 'smooth'})

// })

//Smooth page navigation

// document.querySelectorAll('.nav__link').forEach(function (htmlElement) {
//   htmlElement.addEventListener('click',function(e) {
//     e.preventDefault();
//     const href = this.getAttribute('href');
//     document.querySelector(href).scrollIntoView({behavior: 'smooth'});
//   });
// })
// header.prepend(message);
// header.append(message.cloneNode(true));
// header.before(message);
// header.after(message);

// удаление элементов

///////////////////
// Выбор элементов
// console.log(document.documentElement);
// console.log(document.head);
// console.log(document.body);

// console.log(document.querySelector('.header'));
// const sections = document.querySelectorAll('.section');
// console.log(sections);

// console.log(document.getElementById('section--1'));
// const buttons = document.getElementsByTagName('button');
// console.log(buttons);

// document.getElementsByClassName('btn');

// Создание и вставка элементов
//.insertAjacentHTML()
