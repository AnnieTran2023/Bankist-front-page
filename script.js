'use strict';

///////////////////////////////////////
// Modal window

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');
const btnScrollTo = document.querySelector('.btn--scroll-to');
const section1 = document.querySelector('#section--1');
const header = document.querySelector('.header');
const allSections = document.querySelectorAll('.section');
const sectionID = document.getElementById('section--1');

const openModal = function (e) {
  e.preventDefault();
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};
btnsOpenModal.forEach(btn => btn.addEventListener('click',openModal));

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});

// .insertAdjacentHTML
const message = document.createElement('div');
message.classList.add('cookie-message');
message.innerHTML = 'we use cookies to enhance your browsing experience <button class="btn btn--close-cookie">Got it</button>';
header.append(message);
document.querySelector('.btn--close-cookie').
addEventListener('click',function(){
  message.remove();
})
message.style.backgroundColor ='#37383d';
message.style.width = '120%';
console.log(message.style.backgroundColor);
console.log(getComputedStyle(message).height);
message.style.height =  Number.parseFloat(getComputedStyle(message).height,10) + 40 + 'px';

//Smooth scrolling
btnScrollTo.addEventListener('click', function (e) {
  // Get the coordinates of section1 and the button.
  const s1coords = section1.getBoundingClientRect();
  const buttonCoords = e.target.getBoundingClientRect();
  // Log the coordinates and current scroll position.
  console.log('s1coords:', s1coords);
  console.log('Button coords:', buttonCoords);
  console.log('Current scroll (X/Y)', window.pageXOffset, window.pageYOffset);
  // Scroll to section1 with smooth scrolling.
  section1.scrollIntoView({behavior:'smooth'});
});

//Page navigation -> handle same listeners to multiple child elements
// document.querySelectorAll('.nav__link').forEach(function(el){
//   el.addEventListener('click',function(e){
//     e.preventDefault();
//     const id = this.getAttribute('href');
//     document.querySelector(id).scrollIntoView({behavior:'smooth'});
//   })
// });

//Event delegation
//add event listener to common parent element
// determine what element originated the event
document.querySelector('.nav__links').addEventListener('click',function(e){
  e.preventDefault();
  console.log(e.target); 
  //match strategy
  if(e.target.classList.contains('nav__link')) {
    const id = e.target.getAttribute('href');
    document.querySelector(id).scrollIntoView({behavior:'smooth'});
  }
});

//Tabbed component
const tabs = document.querySelectorAll('.operations__tab');
const tabContainer = document.querySelector('.operations__tab-container');
const tabsContent = document.querySelectorAll('.operations__content');

tabContainer.addEventListener('click', function(e){
  const clicked = e.target.closest('.operations__tab');
  console.log(clicked);
  //guard clause
  if(!clicked) return;
  //active tab
  tabs.forEach(t => t.classList.remove('operations__tab--active'));
  clicked.classList.add('operations__tab--active');

  //active content area
  tabsContent.forEach(tab => tab.classList.remove('operations__content--active'));
  document.querySelector(`.operations__content--${clicked.dataset.tab}`)
  .classList.add('operations__content--active');
});
 
//Menu fade animation
const nav = document.querySelector('.nav');
const handleHover = function (e, opacity){

    if(e.target.classList.contains('nav__link')){
      const link = e.target;
      const siblings = link.closest('.nav').querySelectorAll('.nav__link');
      const logo = link.closest('.nav').querySelector('img');
      siblings.forEach(el => {
        if(el !== link) el.style.opacity = this;
      });
      logo.style.opacity = this;
    }
  };
//mouseenter does not bubble 
nav.addEventListener('mouseover',handleHover.bind(0.5));
nav.addEventListener('mouseout', handleHover.bind(1));