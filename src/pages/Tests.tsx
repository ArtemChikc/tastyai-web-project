import { useState, useEffect } from 'react';
import { Search } from 'lucide-react';

// Test interface
interface Test {
  id: number;
  title: string;
  description: string;
  image: string;
  category: string;
}

// Sample tests data
const testData: Test[] = [
  {
    id: 1,
    title: "Тест на знание искусственного интеллекта",
    description: "Проверьте, насколько хорошо вы разбираетесь в современных технологиях ИИ",
    image: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=400&h=300&fit=crop",
    category: "Технологии"
  },
  {
    id: 2,
    title: "История древней Греции",
    description: "Увлекательный тест по истории и мифологии древней Греции",
    image: "https://images.unsplash.com/photo-1608730173883-cbf10b6b1a86?w=400&h=300&fit=crop",
    category: "История"
  },
  {
    id: 3,
    title: "Как хорошо вы знаете кино?",
    description: "Тест для настоящих киноманов: проверьте свои знания классики и современного кино",
    image: "https://images.unsplash.com/photo-1542204165-65bf26472b9b?w=400&h=300&fit=crop",
    category: "Развлечения"
  },
  {
    id: 4,
    title: "Психологический тест: кто вы из супергероев?",
    description: "Узнайте, какой супергерой соответствует вашей личности",
    image: "https://images.unsplash.com/photo-1558507334-57300f59f0bd?w=400&h=300&fit=crop",
    category: "Психология"
  },
  {
    id: 5,
    title: "География мира",
    description: "Проверьте свои знания стран, столиц и географических особенностей планеты",
    image: "https://images.unsplash.com/photo-1526778548025-fa2f459cd5ce?w=400&h=300&fit=crop",
    category: "География"
  },
  {
    id: 6,
    title: "Биология человека",
    description: "Тест на знание анатомии и физиологии человеческого организма",
    image: "https://images.unsplash.com/photo-1530026405186-ed1f139313f8?w=400&h=300&fit=crop",
    category: "Биология"
  }
];

// Categories derived from test data
const categories = ["Все", ...Array.from(new Set(testData.map(test => test.category)))];

const Tests = () => {
  const [tests, setTests] = useState<Test[]>([]);
  const [filteredTests, setFilteredTests] = useState<Test[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Все');
  const [isLoading, setIsLoading] = useState(true);

  // Simulate API fetch
  useEffect(() => {
    const fetchTests = async () => {
      // Simulate network delay
      await new Promise(resolve => setTimeout(resolve, 800));
      setTests(testData);
      setFilteredTests(testData);
      setIsLoading(false);
    };

    fetchTests();
  }, []);

  // Filter tests based on search query and category
  useEffect(() => {
    let result = tests;
    
    if (selectedCategory !== 'Все') {
      result = result.filter(test => test.category === selectedCategory);
    }
    
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(test => 
        test.title.toLowerCase().includes(query) || 
        test.description.toLowerCase().includes(query)
      );
    }
    
    setFilteredTests(result);
  }, [searchQuery, selectedCategory, tests]);

  // Handle click on test card
  const handleTestClick = (testId: number) => {
    console.log('Selected test:', testId);
    // Navigate to test page or show details
  };

  return (
    <div className="container py-8 md:py-12">
      <div className="flex flex-col items-center mb-10 animate-fade-in">
        <h1 className="text-3xl md:text-4xl font-bold mb-4">Готовые тесты</h1>
        <p className="text-lg text-muted-foreground text-center max-w-[800px]">
          Выберите один из наших тщательно созданных тестов и проверьте свои знания
        </p>
      </div>
      
      {/* Filters */}
      <div className="mb-8 animate-fade-in">
        <div className="flex flex-wrap gap-3 justify-center">
          {categories.map(category => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-3 py-1.5 rounded-full text-sm transition-colors ${
                selectedCategory === category 
                  ? 'bg-tasty text-white' 
                  : 'bg-secondary text-foreground hover:bg-tasty/20'
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>
      
      {/* Tests grid */}
      {isLoading ? (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {[1, 2, 3, 4, 5, 6].map(i => (
            <div key={i} className="rounded-lg bg-card/50 animate-pulse h-[280px]"></div>
          ))}
        </div>
      ) : filteredTests.length > 0 ? (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredTests.map((test, index) => (
            <div 
              key={test.id}
              onClick={() => handleTestClick(test.id)}
              className="rounded-lg bg-card shadow-sm overflow-hidden card-hover animate-scale-in cursor-pointer transform transition-all duration-300 hover:shadow-md hover:scale-[1.02]"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="aspect-video relative">
                <img 
                  src={test.image} 
                  alt={test.title}
                  className="object-cover w-full h-full"
                />
                <div className="absolute top-2 right-2 bg-tasty text-white text-xs px-2 py-1 rounded-full">
                  {test.category}
                </div>
              </div>
              <div className="p-4">
                <h3 className="font-bold text-xl mb-2">{test.title}</h3>
                <p className="text-muted-foreground text-sm">{test.description}</p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <p className="text-xl text-muted-foreground">По вашему запросу ничего не найдено</p>
          <button 
            onClick={() => {
              setSearchQuery('');
              setSelectedCategory('Все');
            }}
            className="mt-4 text-tasty hover:underline"
          >
            Сбросить фильтры
          </button>
        </div>
      )}
    </div>
  );
};

export default Tests;
