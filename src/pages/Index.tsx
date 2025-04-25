import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Brain, Award, Zap } from 'lucide-react';

const Index = () => {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 md:py-32 overflow-hidden">
        <div className="container px-4 md:px-6">
          <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
            <div className="space-y-4 animate-fade-in">
              <h1 className="text-4xl md:text-6xl font-bold tracking-tighter">
                <span className="text-tasty">Вкусные</span> тесты с&nbsp;искусственным интеллектом
              </h1>
              <p className="max-w-[600px] text-lg md:text-xl text-muted-foreground">
                Создавайте, проходите и делитесь уникальными тестами, созданными с помощью ИИ.
                TastyAI — это новый подход к онлайн-тестированию.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <Link to="/auth">
                  <Button className="bg-tasty hover:bg-tasty-dark text-white w-full sm:w-auto">
                    Войти
                  </Button>
                </Link>
                <Link to="/tests">
                  <Button variant="outline" className="border-tasty text-tasty hover:bg-tasty/10 w-full sm:w-auto">
                    Готовые тесты
                  </Button>
                </Link>
              </div>
            </div>
            <div className="relative lg:pl-10 animate-fade-in delay-150">
              <div className="relative rounded-2xl overflow-hidden shadow-xl animate-float">
                <img
                  src="https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?q=80&w=1170&auto=format&fit=crop"
                  alt="TastyAI интерфейс"
                  className="w-full h-auto object-cover aspect-video"
                />
                <div className="absolute inset-0 bg-gradient-to-tr from-tasty/40 to-transparent opacity-60"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-secondary/50">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center text-center mb-12 animate-fade-in">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Почему TastyAI?</h2>
            <p className="text-lg text-muted-foreground max-w-[800px]">
              Наш сервис предлагает уникальный подход к созданию и прохождению тестов
            </p>
          </div>
          <div className="grid gap-8 md:grid-cols-3">
            <div className="flex flex-col items-center text-center p-6 rounded-lg bg-card shadow-sm hover:shadow-md transition-all animate-scale-in">
              <div className="p-3 rounded-full bg-tasty/10 mb-4">
                <Brain className="w-8 h-8 text-tasty" />
              </div>
              <h3 className="text-xl font-bold mb-2">Интеллектуальная генерация</h3>
              <p className="text-muted-foreground">
                Используйте силу искусственного интеллекта для создания уникальных тестов на любую тематику.
              </p>
            </div>
            <div className="flex flex-col items-center text-center p-6 rounded-lg bg-card shadow-sm hover:shadow-md transition-all animate-scale-in delay-100">
              <div className="p-3 rounded-full bg-tasty/10 mb-4">
                <Award className="w-8 h-8 text-tasty" />
              </div>
              <h3 className="text-xl font-bold mb-2">Разнообразие контента</h3>
              <p className="text-muted-foreground">
                Готовая библиотека тестов на различные темы: от науки и истории до развлечений и хобби.
              </p>
            </div>
            <div className="flex flex-col items-center text-center p-6 rounded-lg bg-card shadow-sm hover:shadow-md transition-all animate-scale-in delay-200">
              <div className="p-3 rounded-full bg-tasty/10 mb-4">
                <Zap className="w-8 h-8 text-tasty" />
              </div>
              <h3 className="text-xl font-bold mb-2">Мгновенный результат</h3>
              <p className="text-muted-foreground">
                Получайте мгновенные результаты с детальным анализом и персональными рекомендациями.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
