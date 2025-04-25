// TastyAI - Основной скрипт

document.addEventListener('DOMContentLoaded', function() {
  // Анимация для элементов при прокрутке
  const animateOnScroll = () => {
    const elements = document.querySelectorAll('.feature-card, .step');
    
    elements.forEach((element, index) => {
      // Добавляем класс с задержкой для создания эффекта каскада
      setTimeout(() => {
        element.classList.add('animate-fade-in');
      }, index * 100);
    });
  };
  
  // Вызываем анимацию после загрузки страницы
  animateOnScroll();
  
  // Плавная прокрутка для навигационных ссылок
  const smoothScroll = () => {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
      link.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
          window.scrollTo({
            top: targetElement.offsetTop - 80,
            behavior: 'smooth'
          });
        }
      });
    });
  };
  
  smoothScroll();
  
  // Мобильное меню (для будущей реализации)
  const initMobileMenu = () => {
    const mobileMenuButton = document.querySelector('.mobile-menu-button');
    if (!mobileMenuButton) return;
    
    const mobileMenu = document.querySelector('.mobile-menu');
    
    mobileMenuButton.addEventListener('click', () => {
      mobileMenuButton.classList.toggle('active');
      mobileMenu.classList.toggle('active');
    });
  };
  
  // Активация соответствующего пункта меню
  const setActiveMenuItem = () => {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const menuItems = document.querySelectorAll('.nav-list a');
    
    menuItems.forEach(item => {
      const href = item.getAttribute('href');
      if (href === currentPage) {
        item.classList.add('active');
      } else {
        item.classList.remove('active');
      }
    });
  };
  
  setActiveMenuItem();
});
