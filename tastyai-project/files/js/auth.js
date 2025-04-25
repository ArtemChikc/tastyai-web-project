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
  
  // Добавляем класс active для текущей страницы в навигации
  const currentPath = window.location.pathname;
  const navLinks = document.querySelectorAll('.nav-link');
  
  navLinks.forEach(link => {
    const linkPath = link.getAttribute('href');
    if (currentPath.includes(linkPath) || 
        (currentPath.endsWith('/auth.html') && linkPath === 'auth.html')) {
      link.classList.add('active');
      link.style.color = '#db9e36';
    }
  });
  
  // Табы авторизации
  const tabs = document.querySelectorAll('.auth-tab');
  const tabContents = document.querySelectorAll('.tab-content');
  const authSwitches = document.querySelectorAll('.auth-switch');
  
  // Функция для переключения табов
  function switchTab(tabId) {
    // Удалить класс active со всех табов
    tabs.forEach(tab => tab.classList.remove('active'));
    
    // Добавить класс active на выбранный таб
    document.querySelector(`.auth-tab[data-tab="${tabId}"]`).classList.add('active');
    
    // Скрыть все содержимое табов
    tabContents.forEach(content => {
      content.classList.remove('active');
      content.style.display = 'none';
    });
    
    // Показать выбранное содержимое
    const selectedContent = document.getElementById(`${tabId}-tab`);
    if (selectedContent) {
      selectedContent.classList.add('active');
      selectedContent.style.display = 'block';
      
      // Плавная анимация появления
      selectedContent.style.opacity = '0';
      setTimeout(() => {
        selectedContent.style.opacity = '1';
      }, 10);
    }
  }
  
  // Обработчики клика по табам
  tabs.forEach(tab => {
    tab.addEventListener('click', function() {
      const tabId = this.getAttribute('data-tab');
      switchTab(tabId);
    });
  });
  
  // Обработчики клика по ссылкам "Войти" и "Зарегистрироваться"
  authSwitches.forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      const targetTab = this.getAttribute('data-target');
      switchTab(targetTab);
    });
  });
  
  // Обработка отправки форм
  const forms = document.querySelectorAll('form');
  forms.forEach(form => {
    form.addEventListener('submit', function(e) {
      e.preventDefault();
      
      // Проверка валидности формы
      let isValid = true;
      const inputs = this.querySelectorAll('input[type="email"], input[type="password"], input[type="text"]');
      
      inputs.forEach(input => {
        if (!input.value.trim()) {
          isValid = false;
          input.classList.add('border-destructive');
        } else {
          input.classList.remove('border-destructive');
        }
      });
      
      if (isValid) {
        const submitButton = this.querySelector('button[type="submit"]');
        
        // Имитация отправки
        submitButton.disabled = true;
        submitButton.innerHTML = '<span class="loading-icon">⏳</span> Загрузка...';
        
        // Имитация задержки
        setTimeout(() => {
          alert('Форма успешно отправлена!');
          submitButton.disabled = false;
          submitButton.innerHTML = this.querySelector('.tab-content.active').id === 'login-tab' ? 'Войти' : 'Зарегистрироваться';
          
          // Перенаправление на главную страницу (в реальном приложении)
          // window.location.href = 'index.html';
        }, 1500);
      } else {
        alert('Пожалуйста, заполните все поля формы.');
      }
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
});
