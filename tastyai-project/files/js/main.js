// TastyAI - Основные скрипты

document.addEventListener('DOMContentLoaded', function() {
  // Переключение вкладок в форме авторизации
  const tabButtons = document.querySelectorAll('.tab-button');
  const tabContents = document.querySelectorAll('.tab-content');
  
  if (tabButtons.length > 0) {
    tabButtons.forEach(button => {
      button.addEventListener('click', function() {
        // Убираем активный класс со всех кнопок и вкладок
        tabButtons.forEach(btn => btn.classList.remove('active'));
        tabContents.forEach(content => content.classList.remove('active'));
        
        // Добавляем активный класс выбранной кнопке и соответствующей вкладке
        this.classList.add('active');
        const tabId = this.getAttribute('data-tab');
        document.getElementById(tabId).classList.add('active');
      });
    });
  }

  // Создание теста
  const addFirstQuestionBtn = document.getElementById('add-first-question');
  
  if (addFirstQuestionBtn) {
    let questionCounter = 0;
    const questionsContainer = document.getElementById('questions-list');
    const emptyQuestionsBlock = document.getElementById('empty-questions');
    const addQuestionContainer = document.getElementById('add-question-container');
    const saveTestContainer = document.getElementById('save-test-container');
    
    // Обработчик первого добавления вопроса
    addFirstQuestionBtn.addEventListener('click', function() {
      addNewQuestion();
      emptyQuestionsBlock.style.display = 'none';
      questionsContainer.style.display = 'flex';
      addQuestionContainer.style.display = 'flex';
      saveTestContainer.style.display = 'flex';
    });
    
    // Обработчик добавления дополнительных вопросов
    const addQuestionBtn = document.getElementById('add-question');
    if (addQuestionBtn) {
      addQuestionBtn.addEventListener('click', addNewQuestion);
    }
    
    // Обработчик отправки формы
    const testForm = document.getElementById('testForm');
    if (testForm) {
      testForm.addEventListener('submit', function(e) {
        e.preventDefault();
        alert('Тест успешно создан!');
        this.reset();
        
        // Очищаем все вопросы
        questionsContainer.innerHTML = '';
        questionsContainer.style.display = 'none';
        emptyQuestionsBlock.style.display = 'block';
        addQuestionContainer.style.display = 'none';
        saveTestContainer.style.display = 'none';
        questionCounter = 0;
      });
    }
    
    // Функция добавления нового вопроса
    function addNewQuestion() {
      questionCounter++;
      
      // Создаем элемент вопроса
      const questionCard = document.createElement('div');
      questionCard.className = 'question-card';
      questionCard.dataset.questionId = 'question-' + Date.now();
      
      questionCard.innerHTML = `
        <div class="question-header">
          <div class="question-number">Вопрос <span class="question-index">${questionCounter}</span></div>
          <button type="button" class="remove-question" title="Удалить вопрос">✕</button>
        </div>
        
        <div class="form-group">
          <label>Заголовок вопроса</label>
          <input type="text" class="question-title" placeholder="Введите заголовок вопроса" required>
        </div>
        
        <div class="form-group">
          <label>Текст вопроса</label>
          <textarea class="question-text" rows="2" placeholder="Введите текст вопроса" required></textarea>
        </div>
        
        <div class="form-group">
          <label>Тип ответа</label>
          <select class="question-type" required>
            <option value="text">Текстовый ответ</option>
            <option value="checkbox">Варианты ответов</option>
          </select>
        </div>
        
        <div class="answer-section text-answer">
          <div class="form-group">
            <label>Правильный ответ</label>
            <input type="text" class="correct-answer" placeholder="Введите правильный ответ">
          </div>
        </div>
        
        <div class="answer-section checkbox-answer" style="display: none;">
          <div class="options-header">
            <label>Варианты ответов</label>
            <button type="button" class="add-option">+ Добавить вариант</button>
          </div>
          
          <div class="options-container"></div>
        </div>
      `;
      
      // Обработчик изменения типа вопроса
      const questionTypeSelect = questionCard.querySelector('.question-type');
      questionTypeSelect.addEventListener('change', function() {
        const textAnswer = questionCard.querySelector('.text-answer');
        const checkboxAnswer = questionCard.querySelector('.checkbox-answer');
        const optionsContainer = checkboxAnswer.querySelector('.options-container');
        
        if (this.value === 'text') {
          textAnswer.style.display = 'block';
          checkboxAnswer.style.display = 'none';
        } else {
          textAnswer.style.display = 'none';
          checkboxAnswer.style.display = 'block';
          
          // Если нет вариантов, добавляем два начальных
          if (optionsContainer.children.length === 0) {
            addOption(questionCard.dataset.questionId, optionsContainer);
            addOption(questionCard.dataset.questionId, optionsContainer);
          }
        }
      });
      
      // Обработчик удаления вопроса
      const removeQuestionBtn = questionCard.querySelector('.remove-question');
      removeQuestionBtn.addEventListener('click', function() {
        questionCard.remove();
        
        // Пересчитываем номера оставшихся вопросов
        const remainingQuestions = questionsContainer.querySelectorAll('.question-card');
        remainingQuestions.forEach((q, index) => {
          q.querySelector('.question-index').textContent = index + 1;
        });
        
        // Если вопросов не осталось, показываем пустой блок
        if (remainingQuestions.length === 0) {
          questionsContainer.style.display = 'none';
          emptyQuestionsBlock.style.display = 'block';
          addQuestionContainer.style.display = 'none';
          saveTestContainer.style.display = 'none';
          questionCounter = 0;
        }
      });
      
      // Обработчик добавления варианта ответа
      const addOptionBtn = questionCard.querySelector('.add-option');
      if (addOptionBtn) {
        addOptionBtn.addEventListener('click', function() {
          const optionsContainer = questionCard.querySelector('.options-container');
          addOption(questionCard.dataset.questionId, optionsContainer);
        });
      }
      
      // Добавляем вопрос в контейнер
      questionsContainer.appendChild(questionCard);
    }
    
    // Функция добавления варианта ответа
    function addOption(questionId, container) {
      const optionRow = document.createElement('div');
      optionRow.className = 'option-row';
      optionRow.dataset.optionId = 'option-' + Date.now() + Math.floor(Math.random() * 1000);
      
      optionRow.innerHTML = `
        <input type="radio" name="correct-${questionId}" class="option-radio">
        <input type="text" class="option-input" placeholder="Вариант ответа" required>
        <button type="button" class="remove-option" title="Удалить вариант">✕</button>
      `;
      
      // Обработчик удаления варианта
      const removeBtn = optionRow.querySelector('.remove-option');
      removeBtn.addEventListener('click', function() {
        // Проверяем, что останется хотя бы 2 варианта
        if (container.children.length > 2) {
          optionRow.remove();
        }
      });
      
      // Добавляем вариант в контейнер
      container.appendChild(optionRow);
    }
  }

  // Прохождение теста
  const questionsSlides = document.querySelectorAll('.question-slide');
  
  if (questionsSlides.length > 0) {
    // Активация кнопок при вводе текста
    document.querySelectorAll('textarea').forEach(textarea => {
      textarea.addEventListener('input', function() {
        const slide = this.closest('.question-slide');
        const nextButton = slide.querySelector('.next-question');
        
        if (this.value.trim().length > 0) {
          nextButton.disabled = false;
        } else {
          nextButton.disabled = true;
        }
      });
    });
    
    // Переход к следующему вопросу
    document.querySelectorAll('.next-question').forEach(button => {
      button.addEventListener('click', function() {
        const currentSlide = this.closest('.question-slide');
        const nextSlide = currentSlide.nextElementSibling;
        
        if (nextSlide) {
          currentSlide.style.display = 'none';
          nextSlide.style.display = 'block';
          
          // Обновляем индикатор прогресса
          updateProgress();
        }
      });
    });
    
    // Переход к предыдущему вопросу
    document.querySelectorAll('.prev-question').forEach(button => {
      button.addEventListener('click', function() {
        const currentSlide = this.closest('.question-slide');
        const prevSlide = currentSlide.previousElementSibling;
        
        if (prevSlide) {
          currentSlide.style.display = 'none';
          prevSlide.style.display = 'block';
          
          // Обновляем индикатор прогресса
          updateProgress();
        }
      });
    });
    
    // Обновление индикатора прогресса
    function updateProgress() {
      const total = questionsSlides.length;
      let current = 0;
      
      questionsSlides.forEach((slide, index) => {
        if (slide.style.display !== 'none') {
          current = index + 1;
        }
      });
      
      // Обновляем номер текущего вопроса
      const currentQuestionEl = document.getElementById('current-question');
      if (currentQuestionEl) {
        currentQuestionEl.textContent = current;
      }
      
      // Обновляем прогресс-бар
      const progressFill = document.querySelector('.progress-fill');
      if (progressFill) {
        const progress = (current / total) * 100;
        progressFill.style.width = `${progress}%`;
      }
    }
  }
});
