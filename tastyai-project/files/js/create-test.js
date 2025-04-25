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
  
  // Система шагов
  const steps = document.querySelectorAll('.step');
  const stepContents = document.querySelectorAll('.step-content');
  const nextButtons = document.querySelectorAll('.step-next');
  const prevButtons = document.querySelectorAll('.step-prev');
  
  // Текущий шаг
  let currentStep = 0;
  
  // Функция для обновления отображения шагов
  function updateSteps() {
    steps.forEach((step, index) => {
      step.classList.remove('active', 'completed');
      
      if (index < currentStep) {
        step.classList.add('completed');
      } else if (index === currentStep) {
        step.classList.add('active');
      }
    });
    
    stepContents.forEach((content, index) => {
      if (index === currentStep) {
        content.classList.add('active');
        content.style.display = 'block';
      } else {
        content.classList.remove('active');
        content.style.display = 'none';
      }
    });
  }
  
  // Инициализация
  updateSteps();
  
  // Кнопки навигации
  nextButtons.forEach(button => {
    button.addEventListener('click', function() {
      if (currentStep < steps.length - 1) {
        currentStep++;
        updateSteps();
      }
    });
  });
  
  prevButtons.forEach(button => {
    button.addEventListener('click', function() {
      if (currentStep > 0) {
        currentStep--;
        updateSteps();
      }
    });
  });
  
  // Кнопка генерации теста
  const generateButton = document.getElementById('generate-test');
  if (generateButton) {
    generateButton.addEventListener('click', function() {
      // Имитация загрузки
      this.disabled = true;
      this.innerHTML = '<span class="loading-icon">⏳</span> Генерация...';
      
      // Имитация задержки
      setTimeout(() => {
        currentStep++;
        updateSteps();
        this.disabled = false;
        this.innerHTML = 'Сгенерировать тест';
      }, 2000);
    });
  }
  
  // Анимация появления
  const animatedElements = document.querySelectorAll('.animate-fade-in');
  
  animatedElements.forEach(element => {
    element.style.opacity = "0";
    setTimeout(() => {
      element.style.opacity = "1";
    }, 100);
  });
});
