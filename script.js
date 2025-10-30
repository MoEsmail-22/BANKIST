'use strict';

///////////////////////////////////////
// Modal window

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');

const openModal = function () {
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

btnsOpenModal.forEach(open => open.addEventListener('click', openModal));
btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});

////////////////////////////////////
//menu

const header = document.querySelector('.header');
const navLinks = document.querySelectorAll('.nav__link');
const nav = document.querySelector('.nav');
const sec = document.querySelectorAll('.section');

function navOps(o, e) {
  const click = e.target;
  if (!click.classList.contains('nav__link')) return;
  navLinks.forEach(n => (n.style.opacity = o));
  document.querySelector('.nav__logo').style.opacity = o;
  click.style.opacity = '1';
}
function smothScroll(e) {
  e.preventDefault();
  if (!e.target.classList.contains('nav__link')) return;
  const id = e.target.getAttribute('href');
  document.querySelector(`${id}`).scrollIntoView({ behavior: 'smooth' });
  console.log(id);
}
document
  .querySelector('.btn--scroll-to')
  .addEventListener('click', function (e) {
    e.preventDefault();

    document
      .querySelector('#section--1')
      .scrollIntoView({ behavior: 'smooth' });
  });
header.addEventListener('click', function (e) {
  smothScroll(e);
});

header.addEventListener('mouseover', function (e) {
  e.preventDefault();
  navOps('0.5', e);
});
header.addEventListener('mouseout', function (e) {
  e.preventDefault();
  navOps('1', e);
});
//stickyNav
const navCordinets = nav.getBoundingClientRect();

function navObs(entries) {
  const [entry] = entries;
  if (!entry.isIntersecting) nav.classList.add('sticky');
  else nav.classList.remove('sticky');
}
const navObserver = new IntersectionObserver(navObs, {
  root: null,
  threshold: 0.3,
  rootMargin: `${navCordinets.height}px`,
});

navObserver.observe(header);

////////////////////////////////////
//sections

const sections = document.querySelectorAll('.section');

// sections.forEach(s=>{
//   s.
// })

function sectionObs(entries, observer) {
  entries.forEach(e => {
    if (!e.isIntersecting) return;
    else e.target.classList.remove('section--hidden');
    observer.unobserve(e.target);
  });
}

const secObserver = new IntersectionObserver(sectionObs, {
  root: null,
  threshold: 0.2,
});

sections.forEach(s => {
  s.classList.add('section--hidden');
  secObserver.observe(s);
});
////////////////////////
//lazy image

const features = document.querySelector('.features');
const featImg = document.querySelectorAll('.features__img');

function showImg(entries, observer) {
  entries.forEach(e => {
    if (!e.isIntersecting) return;
    e.target.src = e.target.dataset.src;
    e.target.classList.remove('lazy-img');
    observer.unobserve(e.target);
  });
}

const lazyImgObs = new IntersectionObserver(showImg, {
  root: null,
  threshold: 0.1,
});

featImg.forEach(i => lazyImgObs.observe(i));
/////////////////////////////////////
//tab Componat

const operations = document.querySelector('.operations');
const tabs = document.querySelectorAll('.operations__tab');
const optetionContants = document.querySelectorAll('.operations__content');

operations.addEventListener('click', function (e) {
  const clicked = e.target;
  if (!clicked) return;
  if (clicked.classList.contains('operations__tab')) {
    tabs.forEach(t => t.classList.remove('operations__tab--active'));
    optetionContants.forEach(t =>
      t.classList.remove('operations__content--active')
    );
    clicked.classList.add('operations__tab--active');
    const tabNum = clicked.dataset.tab;

    document
      .querySelector(`.operations__content--${tabNum}`)
      .classList.add('operations__content--active');
  }
});
////////////////////////////
//sllider

const slider = document.querySelector('.slider');
const slides = document.querySelectorAll('.slide');
const leftBtn = document.querySelector('.slider__btn--left');
const rightBtn = document.querySelector('.slider__btn--right');
const dots = document.querySelector('.dots');

let slide = 0;
const maxDistanse = slides.length;
goToSlide();
slideAnimation();
insertDots();
activeDot();

function insertDots() {
  slides.forEach((_, i) =>
    dots.insertAdjacentHTML(
      'beforeend',
      `<button class="dots__dot " data-slide="${i}"></button>`
    )
  );
}
function activeDot(s = 0) {
  document.querySelectorAll('.dots__dot').forEach(d => {
    d.classList.remove('dots__dot--active');
    d.dataset.slide == s && d.classList.add('dots__dot--active');
  });
}
function goToSlide(slide = 0) {
  slides.forEach((s, i) => {
    s.style.transform = `translateX(${100 * (i - slide)}%)`;
  });
}
function slideAnimation() {
  slides.forEach(s => (s.style.transition = 'transform 1s ease'));
}
function nextSlide() {
  if (slide === maxDistanse - 1) {
    slide = 0;
  } else {
    slide++;
  }
  slideAnimation();
  goToSlide(slide);
  activeDot(slide);
}
function previceSlide() {
  if (slide === 0) {
    slide = maxDistanse - 1;
  } else {
    slide--;
  }
  slideAnimation();
  goToSlide(slide);
  activeDot(slide);
}

leftBtn.addEventListener('click', previceSlide);
rightBtn.addEventListener('click', nextSlide);

document.addEventListener('keydown', function (e) {
  e.key == 'ArrowLeft' && previceSlide();
  e.key == 'ArrowRight' && nextSlide();
});

dots.addEventListener('click', function (e) {
  if (!e.target.classList.contains('dots__dot')) return;
  else {
    slide = +e.target.dataset.slide;
    slideAnimation();
    goToSlide(slide);
    activeDot(slide);
  }
});
