const navLinks=document.querySelector('.nav__links');
const closeMenu=document.querySelector('.closeMenu');
const openMenu=document.querySelector('.openMenu');

openMenu.addEventListener('click',show);
closeMenu.addEventListener('click',close);

function show(){
    navLinks.style.display = 'flex';
    navLinks.style.top = '0';
}
function close(){
    navLinks.style.top = '-100%';
}