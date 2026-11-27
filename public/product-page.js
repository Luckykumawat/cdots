const $=s=>document.querySelector(s);
const navTriggers=[$('#productMenu'),$('#servicesMenu')];const navPanels=[$('#productsDropdown'),$('#servicesDropdown')];let activeMenu=-1;
function closeNavMenu(returnFocus=false){const previous=activeMenu;activeMenu=-1;navPanels.forEach(p=>p.hidden=true);navTriggers.forEach(b=>b.setAttribute('aria-expanded','false'));$('#navBackdrop').hidden=true;document.body.classList.remove('mega-open');if(returnFocus&&previous>=0)navTriggers[previous].focus();}
function openNavMenu(index){if(activeMenu===index){closeNavMenu();return}activeMenu=index;navPanels.forEach((p,i)=>p.hidden=i!==index);navTriggers.forEach((b,i)=>b.setAttribute('aria-expanded',String(i===index)));$('#navBackdrop').hidden=false;document.body.classList.add('mega-open');}
navTriggers.forEach((b,i)=>{b.addEventListener('click',()=>openNavMenu(i));b.addEventListener('keydown',e=>{if(e.key==='ArrowDown'){e.preventDefault();if(activeMenu!==i)openNavMenu(i);navPanels[i].querySelector('a').focus()}})});
$('#navBackdrop').addEventListener('click',()=>closeNavMenu());document.querySelectorAll('.mega-close').forEach(b=>b.addEventListener('click',()=>closeNavMenu(true)));
document.addEventListener('keydown',e=>{if(e.key==='Escape'){closeNavMenu(true);$('header nav').classList.remove('open');$('.mobile-menu').setAttribute('aria-expanded','false')}});
document.addEventListener('focusin',e=>{if(activeMenu>=0&&!e.target.closest('.mega-panel')&&!e.target.closest('header'))closeNavMenu()});
$('.mobile-menu').addEventListener('click',()=>{closeNavMenu();const open=$('header nav').classList.toggle('open');$('.mobile-menu').setAttribute('aria-expanded',String(open))});
document.querySelectorAll('header nav a,.mega-panel a').forEach(a=>a.addEventListener('click',()=>{closeNavMenu();$('header nav').classList.remove('open');$('.mobile-menu').setAttribute('aria-expanded','false')}));

const faqButton=$('#expandPageFaq');if(faqButton)faqButton.addEventListener('click',()=>{const details=[...document.querySelectorAll('.faq details')];const open=details.some(d=>!d.open);details.forEach(d=>d.open=open);faqButton.textContent=open?'Collapse all':'Expand all'});
document.querySelectorAll('.faq details').forEach(d=>d.addEventListener('toggle',()=>{if(faqButton)faqButton.textContent=[...document.querySelectorAll('.faq details')].every(x=>x.open)?'Collapse all':'Expand all'}));
document.querySelectorAll('.close-dialog').forEach(b=>b.addEventListener('click',()=>b.closest('dialog').close()));$('#privacy')?.addEventListener('click',()=>$('#privacyDialog').showModal());if($('#year'))$('#year').textContent=new Date().getFullYear();
