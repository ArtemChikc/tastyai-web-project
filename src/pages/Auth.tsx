import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Label } from '@/components/ui/label';
import { Link } from 'react-router-dom';
import { Eye, EyeOff, User, Lock } from 'lucide-react';

const Auth = () => {
  const [showLoginPassword, setShowLoginPassword] = useState(false);
  const [showRegisterPassword, setShowRegisterPassword] = useState(false);
  const [activeTab, setActiveTab] = useState('login');

  const toggleLoginPasswordVisibility = () => setShowLoginPassword(!showLoginPassword);
  const toggleRegisterPasswordVisibility = () => setShowRegisterPassword(!showRegisterPassword);

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Login logic here
    console.log('Login submitted');
  };

  const handleRegisterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Registration logic here
    console.log('Registration submitted');
  };

  return (
    <div className="container py-8 md:py-16 flex justify-center items-center">
      <div className="w-full max-w-md">
        <div className="bg-card shadow-lg rounded-lg p-6 md:p-8 animate-fade-in">
          <div className="text-center mb-6">
            <h1 className="text-2xl md:text-3xl font-bold text-foreground mb-2">
              Добро пожаловать в TastyAI
            </h1>
            <p className="text-muted-foreground">
              Авторизуйтесь или создайте новый аккаунт
            </p>
          </div>
          
          <Tabs 
            defaultValue="login" 
            value={activeTab} 
            onValueChange={setActiveTab}
            className="w-full"
          >
            <TabsList className="grid w-full grid-cols-2 mb-6">
              <TabsTrigger 
                value="login"
                className="data-[state=active]:bg-tasty data-[state=active]:text-white"
              >
                Вход
              </TabsTrigger>
              <TabsTrigger 
                value="register"
                className="data-[state=active]:bg-tasty data-[state=active]:text-white"
              >
                Регистрация
              </TabsTrigger>
            </TabsList>
            
            {/* Login Tab */}
            <TabsContent value="login" className="animate-fade-in">
              <form onSubmit={handleLoginSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="login-username">Имя пользователя</Label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                    <Input 
                      id="login-username" 
                      type="text" 
                      placeholder="username" 
                      className="pl-10"
                      required
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="login-password">Пароль</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                    <Input 
                      id="login-password" 
                      type={showLoginPassword ? "text" : "password"} 
                      placeholder="••••••••" 
                      className="pl-10"
                      required
                    />
                    <button 
                      type="button"
                      onClick={toggleLoginPasswordVisibility}
                      className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground hover:text-foreground"
                    >
                      {showLoginPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="remember-me"
                      className="h-4 w-4 rounded border-gray-300 text-tasty focus:ring-tasty"
                    />
                    <Label htmlFor="remember-me" className="ml-2 text-sm text-muted-foreground">
                      Запомнить меня
                    </Label>
                  </div>
                  <Link to="/forgot-password" className="text-sm font-medium text-tasty hover:underline">
                    Забыли пароль?
                  </Link>
                </div>
                <Button type="submit" className="w-full bg-tasty hover:bg-tasty-dark text-white">
                  Войти
                </Button>
              </form>
            </TabsContent>
            
            {/* Registration Tab */}
            <TabsContent value="register" className="animate-fade-in">
              <form onSubmit={handleRegisterSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="register-name">Имя пользователя</Label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                    <Input 
                      id="register-name" 
                      type="text" 
                      placeholder="username" 
                      className="pl-10"
                      required
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="register-password">Пароль</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                    <Input 
                      id="register-password" 
                      type={showRegisterPassword ? "text" : "password"} 
                      placeholder="••••••••" 
                      className="pl-10"
                      required
                    />
                    <button 
                      type="button"
                      onClick={toggleRegisterPasswordVisibility}
                      className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground hover:text-foreground"
                    >
                      {showRegisterPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
                </div>
                <div className="flex items-center">
                  <input
                    id="terms"
                    type="checkbox"
                    className="h-4 w-4 rounded border-gray-300 text-tasty focus:ring-tasty"
                    required
                  />
                  <Label htmlFor="terms" className="ml-2 text-sm text-muted-foreground">
                    Я согласен с <Link to="/terms" className="text-tasty hover:underline">условиями использования</Link>
                  </Label>
                </div>
                <Button type="submit" className="w-full bg-tasty hover:bg-tasty-dark text-white">
                  Создать аккаунт
                </Button>
              </form>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default Auth;
