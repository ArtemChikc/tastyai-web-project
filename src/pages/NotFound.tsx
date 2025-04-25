import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Home } from "lucide-react";

const NotFound = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-secondary/30">
      <div className="text-center px-4 animate-fade-in">
        <h1 className="text-6xl md:text-9xl font-bold text-tasty">404</h1>
        <div className="h-2 w-16 bg-tasty mx-auto my-6 rounded-full"></div>
        <h2 className="text-2xl md:text-3xl font-bold mb-4">Страница не найдена</h2>
        <p className="text-muted-foreground max-w-md mx-auto mb-8">
          Кажется, вы попали на страницу, которой не существует. Проверьте URL или вернитесь на главную.
        </p>
        <Link to="/">
          <Button className="bg-tasty hover:bg-tasty-dark text-white">
            <Home className="mr-2 h-4 w-4" /> На главную
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
