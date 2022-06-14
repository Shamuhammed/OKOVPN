const popLinks = document.querySelectorAll('.popup-link');//все ссылки на popup
const body = document.querySelector('body');//body
const lockPadding = document.querySelectorAll('.lock-padding');//фиксированные объекты

let unlock = true;//Нужно для того что бы не было довйных нажатий

const timeout = 800;//время transition

if (popLinks.length > 0) { //Проверка существуют ли popLinks
   for (let index = 0; index < popLinks.length; index++) {//каждую ссылку popLinks получаю в переменную popLink
      const popLink = popLinks[index];
      popLink.addEventListener('click', function (e) {//событие при клике на popLink
         const popupName = popLink.getAttribute('href').replace('#', '');//из атрибута href убираем #
         const currentPopup = document.getElementById(popupName); //получаем элемент popapName=popupId
         popupOpen(currentPopup);//открытие попапа
         e.preventDefault();//запрет на перезагрузку страницы / блокировка ссылки
      });
   }
}

const popupCloseIcon = document.querySelectorAll('.close-popup');
if (popupCloseIcon.length > 0) {//Проверка существуютли такие класы
   for (let index = 0; index < popupCloseIcon.length; index++) {
      const el = popupCloseIcon[index];//получаем конкретные объекты
      el.addEventListener('click', function (e) { //событие при клике
         popupClose(el.closest('.popup'));//отправляем в функцию закрытия ближайщий родитель с клссом popup
         e.preventDefault();
      });
   }
}

function popupOpen(currentPopup) {
   if (currentPopup && unlock) { //Ести ли такой объект и открытая ли переменная unlock
      const popupActive = document.querySelector('.popup.open'); //получаем открытый попап если он существуют то
      if (popupActive) {
         popupClose(popupActive, false);//закрываем если нет то 
      } else {
         bodyLock();//блочим боды скролл
      }
      currentPopup.classList.add('open'); //если выше условие не выполняется то добавляем к popup класс open
      currentPopup.addEventListener('click', function (e) {//событие только открывшемуся попапу
         if (!e.target.closest('.popup__content')) {//если у нажатого объекта нет класса popup__content
            popupClose(e.target.closest('.popup'));//то закрываем (темная область)
         }
      });
   }
}

function popupClose(popupActive, doUnlock = true) {
   if (unlock) {
      popupActive.classList.remove('open');//У активного попапа убираем класс opne
      if (doUnlock) {
         bodyUnLock();//Если попап открыт и поверх открывется новый то запрещем разлочить скролл
      }
   }
}

function bodyLock() {
   const lockPaddingValue = window.innerWidth - document.querySelector('.wrapper').offsetWidth + 'px';//Получаю ширину скролла

   if (lockPadding.length > 0) { //Проверка естли фиксированные объекты
      for (let index = 0; index < lockPadding.length; index++) {//находим фиксированные объекты
         const el = lockPadding[index];
         el.style.paddingRight = lockPaddingValue; //добавляем к фиксированным обхектам ширину сролла
      }
   }
   body.style.paddingRight = lockPaddingValue;//присваемваем ввиде паддинга ширину скролла
   body.classList.add('lock');

   unlock = false;//лочим что бы во время анимации небыло повторных нажатий по ссылке
   setTimeout(function () {
      unlock = true;
   }, timeout);
}


function bodyUnLock() {
   setTimeout(function () {
      if (lockPadding.length > 0) {
         for (let index = 0; index < lockPadding.length; index++) {
            const el = lockPadding[index];
            el.style.paddingRight = '0px';//убираем раддаинг у фиксированных элементов
         }
      }
      body.style.paddingRight = '0px';//убираем паддинг у боды
      body.classList.remove('lock');//убираеп класс лок у боды
   }, timeout);// все происходит через какое то время

   unlock = false;
   setTimeout(function () {
      unlock = true;
   }, timeout);
}

document.addEventListener('keydown', function (e) {
   if (e.which === 27) {
      const popupActive = document.querySelector('.popup.open');
      popupClose(popupActive);
   }
});

(function () {
   if (!Element.prototype.closest) {
      Element.prototype.closest = function (css) {
         var node = this;
         while (node) {
            if (node.matches(css)) return node;
            else node = node.parentElement;
         }
         return null
      };
   }
}) ();
(function () {
   if (Element.prototype.matches) {
      Element.prototype.matches = Element.prototype.matchesSelector ||
         Element.prototype.webkitMatchesSelector ||
         Element.prototype.mozMatchesSelector ||
         Element.prototype.msMatchesSelector;
   }
})();