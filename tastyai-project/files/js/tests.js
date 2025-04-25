document.addEventListener('DOMContentLoaded', function() {
  // Мобильное меню
  const menuButton = document.querySelector('.menu-button');
  const mobileMenu = document.querySelector('.mobile-menu');
  
  if (menuButton && mobileMenu) {
    menuButton.addEventListener('click', function() {
      if (mobileMenu.style.display === 'none' || mobileMenu.style.display === '') {
        mobileMenu.style.display = 'block';
        menuButton.querySelector('.menu-icon').innerHTML = '✕';
      } else {
        mobileMenu.style.display = 'none';
        menuButton.querySelector('.menu-icon').innerHTML = '☰';
      }
    });
  }
  
  // Добавляем класс active для текущей страницы в навигации
  const currentPath = window.location.pathname;
  const navLinks = document.querySelectorAll('.nav-link');
  
  navLinks.forEach(link => {
    const linkPath = link.getAttribute('href');
    if (currentPath.includes(linkPath) || 
        (currentPath.endsWith('/tests.html') && linkPath === 'tests.html')) {
      link.classList.add('active');
      link.style.color = '#db9e36';
    }
  });
  
  // Фильтрация тестов по категориям
  const categories = document.querySelectorAll('.category');
  const testCards = document.querySelectorAll('.test-card');
  
  categories.forEach(category => {
    category.addEventListener('click', function() {
      // Удалить класс active со всех категорий
      categories.forEach(cat => cat.classList.remove('active'));
      
      // Добавить класс active на выбранную категорию
      this.classList.add('active');
      
      // Получить выбранную категорию
      const selectedCategory = this.getAttribute('data-category');
      
      // Показать/скрыть тесты на основе выбранной категории
      testCards.forEach(card => {
        if (selectedCategory === 'all' || card.getAttribute('data-category') === selectedCategory) {
          card.style.display = 'block';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });
  
  // Пагинация
  const pageItems = document.querySelectorAll('.page-item:not(.disabled)');
  
  pageItems.forEach(item => {
    item.addEventListener('click', function() {
      // Если страница уже активна, ничего не делать
      if (this.classList.contains('active')) {
        return;
      }
      
      // Удалить класс active со всех страниц пагинации
      pageItems.forEach(page => page.classList.remove('active'));
      
      // Добавить класс active на выбранную страницу
      this.classList.add('active');
      
      // В реальном приложении здесь будет загрузка новых тестов для выбранной страницы
      // В демонстрационных целях просто скроллим к верху секции
      window.scrollTo({
        top: document.querySelector('section').offsetTop - 100,
        behavior: 'smooth'
      });
    });
  });
  
  // Анимация для элементов, которые должны анимироваться при прокрутке
  const animateOnScroll = function() {
    const elements = document.querySelectorAll('.animate-fade-in:not(.animated), .animate-scale-in:not(.animated)');
    
    elements.forEach(element => {
      const elementTop = element.getBoundingClientRect().top;
      const elementBottom = element.getBoundingClientRect().bottom;
      
      // Если элемент видим в области просмотра
      if (elementTop < window.innerHeight && elementBottom > 0) {
        element.classList.add('animated');
      }
    });
  };
  
  // Запускаем анимацию при загрузке и при прокрутке
  animateOnScroll();
  window.addEventListener('scroll', animateOnScroll);
  
  // Фиксация хедера при прокрутке
  let lastScrollTop = 0;
  const header = document.querySelector('.header');
  
  window.addEventListener('scroll', function() {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    if (scrollTop > lastScrollTop) {
      // Прокрутка вниз
      if (scrollTop > 100) {
        header.style.transform = 'translateY(-100%)';
        header.style.transition = 'transform 0.3s ease-in-out';
      }
    } else {
      // Прокрутка вверх
      header.style.transform = 'translateY(0)';
    }
    
    lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
  });
  
  // Обработка поисковой формы
  const searchForm = document.querySelector('form');
  if (searchForm) {
    searchForm.addEventListener('submit', function(e) {
      e.preventDefault();
      const searchTerm = this.querySelector('input').value.toLowerCase();
      
      // Фильтрация тестов на основе поискового запроса
      testCards.forEach(card => {
        const title = card.querySelector('h3').textContent.toLowerCase();
        const description = card.querySelector('p').textContent.toLowerCase();
        const category = card.getAttribute('data-category').toLowerCase();
        
        if (title.includes(searchTerm) || description.includes(searchTerm) || category.includes(searchTerm)) {
          card.style.display = 'block';
        } else {
          card.style.display = 'none';
        }
      });
      
      // Сбросить активную категорию
      categories.forEach(cat => cat.classList.remove('active'));
      document.querySelector('.category[data-category="all"]').classList.add('active');
    });
  }
});
