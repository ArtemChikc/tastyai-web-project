document.addEventListener('DOMContentLoaded', function() {
  // Мобильное меню
  const menuButton = document.querySelector('.menu-button');
  const mobileMenu = document.querySelector('.mobile-menu');
  
  if (menuButton && mobileMenu) {
    menuButton.addEventListener('click', function() {
      const isOpen = mobileMenu.style.display === 'block';
      mobileMenu.style.display = isOpen ? 'none' : 'block';
      
      // Изменить иконку меню
      const menuIcon = menuButton.querySelector('.menu-icon');
      if (menuIcon) {
        menuIcon.textContent = isOpen ? '☰' : '✕';
      }
    });
  }
  
  // Анимация появления элементов
  const animatedElements = document.querySelectorAll('.animate-fade-in, .animate-scale-in');
  
  function checkScroll() {
    animatedElements.forEach(element => {
      const elementTop = element.getBoundingClientRect().top;
      const elementVisible = 150;
      
      if (elementTop < window.innerHeight - elementVisible) {
        element.style.opacity = "1";
      }
    });
  }
  
  // Инициализация элементов с анимацией
  animatedElements.forEach(element => {
    element.style.opacity = "0";
  });
  
  // Запустить проверку при загрузке
  checkScroll();
  
  // Запустить проверку при скролле
  window.addEventListener('scroll', checkScroll);
});
