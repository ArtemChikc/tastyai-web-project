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

  // Категории фильтрации
  const categories = document.querySelectorAll('.category');
  const testCards = document.querySelectorAll('.test-card');
  
  categories.forEach(category => {
    category.addEventListener('click', function() {
      // Активная категория
      categories.forEach(c => c.classList.remove('active'));
      this.classList.add('active');
      
      const filter = this.dataset.category;
      
      // Фильтрация карточек
      testCards.forEach(card => {
        const cardCategory = card.dataset.category;
        
        if (filter === 'all' || cardCategory === filter) {
          card.style.display = 'block';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });
  
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
  
  // Пагинация
  const paginationItems = document.querySelectorAll('.page-item');
  if (paginationItems.length) {
    paginationItems.forEach(item => {
      if (!item.classList.contains('disabled')) {
        item.addEventListener('click', function() {
          paginationItems.forEach(p => p.classList.remove('active'));
          this.classList.add('active');
        });
      }
    });
  }
});
