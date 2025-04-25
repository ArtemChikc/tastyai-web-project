import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { PlusCircle, X, Save, AlertCircle } from 'lucide-react';

interface Question {
  id: string;
  title: string;
  question: string;
  type: 'text' | 'checkbox';
  options: { id: string; text: string; isCorrect: boolean }[];
  correctAnswer?: string;
}

const CreateTest = () => {
  const [testTitle, setTestTitle] = useState('');
  const [testDescription, setTestDescription] = useState('');
  const [questions, setQuestions] = useState<Question[]>([]);
  const [showSuccess, setShowSuccess] = useState(false);

  // Generate unique ID
  const generateId = () => Math.random().toString(36).substring(2, 9);

  // Add new question
  const addQuestion = () => {
    const newQuestion: Question = {
      id: generateId(),
      title: '',
      question: '',
      type: 'text',
      options: [],
      correctAnswer: ''
    };
    setQuestions([...questions, newQuestion]);
  };

  // Remove question
  const removeQuestion = (id: string) => {
    setQuestions(questions.filter(q => q.id !== id));
  };

  // Update question
  const updateQuestion = (id: string, field: keyof Question, value: any) => {
    setQuestions(questions.map(q => {
      if (q.id === id) {
        if (field === 'type' && value === 'checkbox' && q.options.length === 0) {
          // Initialize with 2 options when switching to checkbox
          return {
            ...q,
            [field]: value,
            options: [
              { id: generateId(), text: 'Вариант 1', isCorrect: false },
              { id: generateId(), text: 'Вариант 2', isCorrect: false }
            ]
          };
        }
        return { ...q, [field]: value };
      }
      return q;
    }));
  };

  // Add option to question
  const addOption = (questionId: string) => {
    setQuestions(questions.map(q => {
      if (q.id === questionId) {
        return {
          ...q,
          options: [...q.options, { id: generateId(), text: `Вариант ${q.options.length + 1}`, isCorrect: false }]
        };
      }
      return q;
    }));
  };

  // Remove option from question
  const removeOption = (questionId: string, optionId: string) => {
    setQuestions(questions.map(q => {
      if (q.id === questionId) {
        return {
          ...q,
          options: q.options.filter(o => o.id !== optionId)
        };
      }
      return q;
    }));
  };

  // Update option
  const updateOption = (questionId: string, optionId: string, field: 'text' | 'isCorrect', value: string | boolean) => {
    setQuestions(questions.map(q => {
      if (q.id === questionId) {
        return {
          ...q,
          options: q.options.map(o => {
            if (o.id === optionId) {
              return { ...o, [field]: value };
            }
            // If setting this option as correct, set others as incorrect
            if (field === 'isCorrect' && value === true) {
              return { ...o, isCorrect: o.id === optionId };
            }
            return o;
          })
        };
      }
      return q;
    }));
  };

  // Submit test
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Prepare test data
    const testData = {
      title: testTitle,
      description: testDescription,
      questions: questions.map(q => ({
        title: q.title,
        question: q.question,
        type: q.type,
        options: q.type === 'checkbox' ? q.options : [],
        correctAnswer: q.type === 'text' ? q.correctAnswer : undefined
      }))
    };
    
    // Save to localStorage
    localStorage.setItem('testData', JSON.stringify(testData));
    console.log('Test saved:', testData);
    
    // Show success message
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 3000);
  };
  
  return (
    <div className="container py-8 md:py-12 animate-fade-in">
      <div className="max-w-4xl mx-auto">
        <div className="flex flex-col items-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">Создание теста</h1>
          <p className="text-lg text-muted-foreground text-center">
            Создайте свой собственный тест с использованием искусственного интеллекта
          </p>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Test Information */}
          <div className="bg-card p-6 rounded-lg shadow-sm border">
            <h2 className="text-xl font-bold mb-4">Информация о тесте</h2>
            <div className="space-y-4">
              <div>
                <Label htmlFor="testTitle">Название теста</Label>
                <Input
                  id="testTitle"
                  value={testTitle}
                  onChange={(e) => setTestTitle(e.target.value)}
                  placeholder="Введите название теста"
                  required
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="testDescription">Описание теста</Label>
                <Textarea
                  id="testDescription"
                  value={testDescription}
                  onChange={(e) => setTestDescription(e.target.value)}
                  placeholder="Опишите ваш тест и его цель"
                  required
                  className="mt-1"
                  rows={3}
                />
              </div>
            </div>
          </div>
          
          {/* Questions */}
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-bold">Вопросы</h2>
            </div>
            
            {questions.length === 0 && (
              <div className="text-center py-8 border-2 border-dashed rounded-lg">
                <p className="text-muted-foreground">У вас пока нет вопросов. Добавьте первый вопрос!</p>
              </div>
            )}
            
            {questions.map((question, index) => (
              <div 
                key={question.id} 
                className="bg-card p-6 rounded-lg shadow-sm border animate-scale-in"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-lg font-semibold">Вопрос {index + 1}</h3>
                  <Button
                    type="button"
                    variant="outline"
                    size="icon"
                    onClick={() => removeQuestion(question.id)}
                    className="text-destructive"
                  >
                    <X size={16} />
                  </Button>
                </div>
                
                <div className="space-y-4">
                  <div>
                    <Label htmlFor={`question-title-${question.id}`}>Заголовок вопроса</Label>
                    <Input
                      id={`question-title-${question.id}`}
                      value={question.title}
                      onChange={(e) => updateQuestion(question.id, 'title', e.target.value)}
                      placeholder="Заголовок вопроса"
                      className="mt-1"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor={`question-text-${question.id}`}>Текст вопроса</Label>
                    <Textarea
                      id={`question-text-${question.id}`}
                      value={question.question}
                      onChange={(e) => updateQuestion(question.id, 'question', e.target.value)}
                      placeholder="Введите текст вопроса"
                      className="mt-1"
                      rows={2}
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor={`question-type-${question.id}`}>Тип ответа</Label>
                    <Select 
                      value={question.type} 
                      onValueChange={(value) => updateQuestion(question.id, 'type', value)}
                    >
                      <SelectTrigger id={`question-type-${question.id}`} className="mt-1">
                        <SelectValue placeholder="Выберите тип ответа" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="text">Текстовый</SelectItem>
                        <SelectItem value="checkbox">Варианты ответов</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  {question.type === 'text' ? (
                    <div>
                      <Label htmlFor={`question-answer-${question.id}`}>Правильный ответ</Label>
                      <Input
                        id={`question-answer-${question.id}`}
                        value={question.correctAnswer || ''}
                        onChange={(e) => updateQuestion(question.id, 'correctAnswer', e.target.value)}
                        placeholder="Введите правильный ответ"
                        className="mt-1"
                      />
                    </div>
                  ) : (
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <Label>Варианты ответов</Label>
                        <Button 
                          type="button" 
                          variant="outline" 
                          size="sm"
                          onClick={() => addOption(question.id)}
                          className="text-xs"
                        >
                          Добавить вариант
                        </Button>
                      </div>
                      
                      {question.options.length === 0 ? (
                        <p className="text-sm text-muted-foreground">Нет вариантов ответа</p>
                      ) : (
                        <div className="space-y-2">
                          {question.options.map((option, optIndex) => (
                            <div key={option.id} className="flex items-center gap-2">
                              <input
                                type="radio"
                                name={`question-${question.id}-correct`}
                                id={`option-${option.id}-correct`}
                                checked={option.isCorrect}
                                onChange={() => updateOption(question.id, option.id, 'isCorrect', true)}
                                className="h-4 w-4 text-tasty focus:ring-tasty"
                              />
                              <Input
                                value={option.text}
                                onChange={(e) => updateOption(question.id, option.id, 'text', e.target.value)}
                                placeholder={`Вариант ${optIndex + 1}`}
                                className="flex-1"
                              />
                              <Button
                                type="button"
                                variant="outline"
                                size="icon"
                                onClick={() => removeOption(question.id, option.id)}
                                className="text-destructive h-8 w-8"
                                disabled={question.options.length <= 2}
                              >
                                <X size={14} />
                              </Button>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            ))}
            
            {/* Add question button - now positioned at the bottom after all questions */}
            <div className="flex justify-center mt-4">
              <Button 
                type="button"
                onClick={addQuestion}
                className="bg-tasty hover:bg-tasty-dark text-white transition-all flex items-center gap-1"
              >
                <PlusCircle size={16} />
                Добавить вопрос
              </Button>
            </div>
          </div>
          
          {questions.length > 0 && (
            <div className="flex justify-center mt-8">
              <Button type="submit" className="bg-tasty hover:bg-tasty-dark text-white py-6 px-8 text-lg flex items-center gap-2">
                <Save size={20} />
                Сохранить тест
              </Button>
            </div>
          )}
        </form>
        
        {/* Success message */}
        {showSuccess && (
          <div className="fixed bottom-4 right-4 bg-green-600 text-white p-4 rounded-lg shadow-lg animate-fade-in flex items-center gap-2">
            <AlertCircle size={20} />
            Тест успешно сохранен!
          </div>
        )}
      </div>
    </div>
  );
};

export default CreateTest;
