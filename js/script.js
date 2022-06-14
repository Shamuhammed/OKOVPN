let flexBlock = document.querySelectorAll('.flex-block');
let statusImage = 0;

window.addEventListener('resize', domconfig);
function domconfig() {
   let width = window.innerWidth;

   flexBlock.forEach(elem => {
      if (width <= 1432 && statusImage < 2) {
         changeImageOn(elem);
      } else if (width > 1432 && statusImage > 0) {
         getImagePlace(elem);
      }
   });
   if (width > 1432) adaptiveListHeight();
};
domconfig();

function changeImageOn(elem) {
   let image = elem.querySelector('.flex-block__image');
   let link = elem.querySelector('.flex-block__link')
   imageClone = image.cloneNode(true);
   image.parentElement.removeChild(image);
   link.parentElement.insertBefore(imageClone, link);
   statusImage++;
}

function getImagePlace(elem) {
   let image = elem.querySelector('.flex-block__image');
   imageClone = image.cloneNode(true);
   if (image.classList.contains('before')) image.closest('.flex-block').appendChild(imageClone);
   else image.closest('.flex-block').insertBefore(imageClone, image.closest('.flex-block__content'));
   image.parentElement.removeChild(image);
   statusImage--;
}
//flags
let flagNames = document.querySelectorAll('#columnName');
flagNames.forEach(elem => {
   elem.addEventListener('click', openFlagColumn);
});

function openFlagColumn(e) {
   if (window.innerWidth > 1432) return;
   let target = e.target;
   target.closest('.column').classList.toggle('active');
   changeListHeight(target);
}
function changeListHeight(elem) {
   let list = elem.nextElementSibling;
   let height = window.getComputedStyle(list, null).getPropertyValue('height')
   if (height[0] == 0) list.style.height = list.scrollHeight + 'px';   
   else list.style.height = '0px';
}
function adaptiveListHeight() {
   let lists = document.querySelectorAll('columnList');
   lists.forEach(elem => {
      elem.style.cssText = '';
   });
}

//slider
let comparison = new Swiper(".comparison__block", {
   watchOverflow: true,
   loop: false,

   scrollbar: {
      el: '.swiper-scrollbar',
      draggable: true,
   },

   slidesPerView: 4,
   spaceBetween: 67,
   slidesPerGroup: 1,
   freeMode: true,
   speed: 800,

   breakpoints: {
      320: {
         slidesPerView: 1,
      },
      420: {
         slidesPerView: 1.2,
      },
      470: {
         slidesPerView: 1.3,
      },
      480: {
         slidesPerView: 1.4,
      },
      672: {
         slidesPerView: 2,
      },
      992: {
         slidesPerView: 3,
      },
      1432: {
         slidesPerView: 4,
      },
   },
});

//menu
const iconMenu = document.querySelector('.top-menu__icon');
const topMenu = document.querySelector('.top-menu');
if (iconMenu) {
   iconMenu.addEventListener('click', function(e) {
      document.body.classList.toggle('lock');
      topMenu.classList.toggle('active');
   });
}

//прокрутка к секции
const menuLinks = document.querySelectorAll('.top-menu__link[data-goto]');
if (menuLinks.length > 0) { 
   menuLinks.forEach(menuLink => {
      menuLink.addEventListener('click', onMenuLinkClick);
   });

   function onMenuLinkClick(e) {
      const menuLink = e.target;//целевая ссылка 
      if (menuLink.dataset.goto && document.querySelector(menuLink.dataset.goto)) {
         const gotoBlock = document.querySelector(menuLink.dataset.goto);
         const gotoBlockValue = gotoBlock.getBoundingClientRect().top + pageYOffset;

         if (topMenu.classList.contains('active')) {
            document.body.classList.remove('lock');
            topMenu.classList.remove('active');
         }

         window.scrollTo({ 
            top: gotoBlockValue, 
            behavior: 'smooth' 
         });
         e.preventDefault(); 
      }
   }
} 

//up
const up = document.querySelector('.goto-up');
const effectUp = up.querySelector('span');
up.addEventListener('click', gotoUp);
function gotoUp() {
   effectUp.classList.add('active');
   window.scrollTo({ 
      top: 0, 
      behavior: 'smooth' 
   });
   
}
window.addEventListener('scroll', function () {
   let height = document.querySelector('.banner').clientHeight;
   if (window.pageYOffset > height) up.classList.add('active');
   else up.classList.remove('active');
});