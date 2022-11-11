'use strict';

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const closeBtn = document.querySelector('.close-modal');
const showBtn = document.querySelectorAll('.show-modal');
const body = document.querySelector('body');

// Event when modal shows !!
// Event-listener when click is happened outside the modal!!

const closedModal = e => {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

const openModal = e => {
  // modal.style.display = 'block'; // or we can do this
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};
for (let i = 0; i < showBtn.length; i++) {
  showBtn[i].addEventListener('click', openModal);
}
closeBtn.addEventListener('click', closedModal);
overlay.addEventListener('click', closedModal);
body.addEventListener('keyup', e => {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closedModal();
  }
});

// Keyboard Events are Global Events which means It never happen on a single element Instead on a whole document!! so we have to select a global element like document!!
