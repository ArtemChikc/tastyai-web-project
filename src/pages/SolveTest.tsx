import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { AlertCircle, ChevronDown, ChevronUp } from 'lucide-react';

interface Question {
  question: string;
  answer: string;
}

interface TestData {
  questions: [string, string][];
  prompt: string;
}

const SolveTest = () => {
  const [testData, setTestData] = useState<TestData | null>(null);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [showSuccess, setShowSuccess] = useState(false);
  const [isFetching, setIsFetching] = useState(false);
  
  // Simulate loading test data
  useEffect(() => {
    // Sample data for development
    const sampleData: TestData = {
      questions: [
        ["Вопрос направленный на проверку 1 типа вопросов.", ""],
        ["Вопрос направленный на проверку 2 типа вопросов.", ""],
        ["Расскажите, что вы знаете о нейронных сетях?", ""],
        ["Как бы вы описали концепцию искусственного интеллекта простыми словами?", ""],
      ],
      prompt: "Тебе дают решёный тест, ты должна написать вывод на основе вопросов и ответов пользователя."
    };
    
    setTestData(sampleData);
    
    // In real application, you would get this from props or fetch
    // Try to parse from URL query params or similar
  }, []);
  
  const handleAnswerChange = (index: number, value: string) => {
    setAnswers({
      ...answers,
      [index]: value
    });
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsFetching(true);
    
    // Prepare data for submission
    const submissionData = {
      ...testData,
      questions: testData?.questions.map((q, index) => [q[0], answers[index] || ""]) || []
    };
    
    console.log('Submitting test answers:', submissionData);
    
    // Simulate API call
    setTimeout(() => {
      // In real application, you would send this to an API
      localStorage.setItem('testAnswers', JSON.stringify(submissionData));
      setIsFetching(false);
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 3000);
    }, 1500);
  };
  
  if (!testData) {
    return (
      <div className="container py-16 text-center">
        <div className="animate-pulse flex flex-col items-center">
          <div className="h-8 w-64 bg-gray-200 rounded mb-4"></div>
          <div className="h-4 w-96 bg-gray-200 rounded"></div>
        </div>
      </div>
    );
  }
  
  return (
    <div className="container py-8 md:py-12 animate-fade-in">
      <div className="max-w-3xl mx-auto">
        <div className="flex flex-col items-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">Прохождение теста</h1>
          <p className="text-lg text-muted-foreground text-center">
            Ответьте на все вопросы теста
          </p>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          {testData.questions.map((item, index) => (
            <div 
              key={index} 
              className="bg-card p-6 rounded-lg shadow-sm border animate-scale-in"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="mb-4">
                <h3 className="text-lg font-semibold mb-2">Вопрос {index + 1}</h3>
                <p className="text-foreground">{item[0]}</p>
              </div>
              
              <div>
                <Textarea
                  placeholder="Введите ваш ответ"
                  value={answers[index] || ''}
                  onChange={(e) => handleAnswerChange(index, e.target.value)}
                  rows={4}
                  className="w-full resize-y min-h-[100px]"
                />
              </div>
            </div>
          ))}
          
          <div className="flex justify-center mt-8">
            <Button 
              type="submit" 
              className="bg-tasty hover:bg-tasty-dark text-white py-6 px-8 text-lg"
              disabled={isFetching}
            >
              {isFetching ? (
                <>
                  <span className="animate-spin mr-2">⏳</span>
                  Отправляем...
                </>
              ) : 'Отправить ответы'}
            </Button>
          </div>
        </form>
        
        {/* Success message */}
        {showSuccess && (
          <div className="fixed bottom-4 right-4 bg-green-600 text-white p-4 rounded-lg shadow-lg animate-fade-in flex items-center gap-2">
            <AlertCircle size={20} />
            Ответы успешно отправлены!
          </div>
        )}
      </div>
    </div>
  );
};

export default SolveTest;
