const i = 0;
const txt = '';
const speed = 50;

function typeWriter() {
  if (i < txt.length) {
    document.querySelector('label').innerHTML += txt.charAt(i);
    i++;
    setTimeout(typeWriter, speed);
  }
}

typeWriter();

const hamburger_btn = document.querySelector('.menu_btn');
let menuOpen = false;
const menuContainer = document.querySelector('.app_menu');
const appMinimized = document.querySelector('.small_side-nav');
const appMaximized = document.querySelector('.large_side-nav');
const mainNav = document.querySelector('.side_nav');

hamburger_btn.addEventListener('click', () => {
  if (!menuOpen) {
    hamburger_btn.classList.add('open');
    menuContainer.style.width = '50%';
    appMaximized.classList.remove('d-none');
    appMinimized.classList.add('d-none');
    menuOpen = true;
  } else {
    hamburger_btn.classList.remove('open');
    menuContainer.style.width = '100%';
    appMaximized.classList.add('d-none');
    appMinimized.classList.remove('d-none');
    menuOpen = false;
  }
});

// const filterBtn = document.querySelectorAll('.filter_btn');
// const criteriaList = document.querySelectorAll('.criteria_list');
// const filterCriteria = document.querySelectorAll('.filter_criteria');
// const mobileFilter = document.querySelector('.mobile_filter_btn');
// filterBtn.forEach((btn) => {
//   btn.addEventListener('click', (e) => {
//     filterCriteria.forEach((criteria) => {
//       criteria.classList.toggle('show');
//     });
//   });
// });
// mobileFilter.forEach((btn) => {
//   btn.addEventListener('click', (e) => {
//     criteriaList.forEach((criteria) => {
//       if (criteria.classList.contains('show_options')) {
//         criteria.classList.remove('show_options');
//       } else {
//         criteria.classList.add('show_options');
//       }
//     });
//   });
// });
// mobileFilter.addEventListener('click', (e) => {
//   criteriaList.forEach((criteria) => {
//     if (criteria.classList.contains('show_options')) {
//       criteria.classList.remove('show_options');
//     } else {
//       criteria.classList.add('show_options');
//     }
//   });
// });

// filterCriteria.forEach((criteria) => {
//   const criteriaBtn = criteria.querySelector('.criteria_btn');

//   criteriaBtn.addEventListener('click', (e) => {
//     e.preventDefault;
//     const list = criteriaBtn.nextElementSibling;
//     if (list.classList.contains('d-none')) {
//       list.classList.remove('d-none');
//     } else {
//       list.classList.add('d-none');
//     }

//     // list.classList.toggle('d-none');
//   });
// });
