import { useState, useEffect } from "react";
import { CookieConsent } from "@/components/CookieConsent";
import { LoadingScreen } from "@/components/LoadingScreen";
import { Header } from "@/components/Header";
import { NewsCard } from "@/components/NewsCard";
import { mockNews } from "@/data/mockNews";

const Index = () => {
  const [showLoading, setShowLoading] = useState(false);
  const [isReady, setIsReady] = useState(false);
  const [filteredNews, setFilteredNews] = useState(mockNews);
  const [selectedCategory, setSelectedCategory] = useState("Todas");

  useEffect(() => {
    const consent = localStorage.getItem("cookieConsent");
    if (consent) {
      setShowLoading(true);
    }
  }, []);

  useEffect(() => {
    if (selectedCategory === "Todas") {
      setFilteredNews(mockNews);
    } else {
      setFilteredNews(mockNews.filter((news) => news.category === selectedCategory));
    }
  }, [selectedCategory]);

  const handleLoadingComplete = () => {
    setShowLoading(false);
    setIsReady(true);
  };

  const handleSearch = (query: string) => {
    const filtered = mockNews.filter(
      (news) =>
        news.title.toLowerCase().includes(query.toLowerCase()) ||
        news.summary.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredNews(filtered);
  };

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
  };

  if (showLoading) {
    return <LoadingScreen onComplete={handleLoadingComplete} />;
  }

  if (!isReady) {
    return <CookieConsent />;
  }

  return (
    <div className="min-h-screen bg-background">
      <Header onSearch={handleSearch} onCategoryChange={handleCategoryChange} />

      <main className="container mx-auto px-4 py-8">
        <section className="mb-12 text-center space-y-4 animate-fade-in">
          <h1 className="text-5xl md:text-6xl font-bold bg-clip-text text-transparent cosmic-gradient">
            Notícias de Moçambique
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Fique informado com as últimas notícias de política, economia, desporto e muito mais
          </p>
        </section>

        <section className="space-y-8">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold">
              {selectedCategory === "Todas" ? "Últimas Notícias" : selectedCategory}
            </h2>
            <span className="text-sm text-muted-foreground">
              {filteredNews.length} {filteredNews.length === 1 ? "notícia" : "notícias"}
            </span>
          </div>

          {filteredNews.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-xl text-muted-foreground">
                Nenhuma notícia encontrada
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredNews.map((article, index) => (
                <div
                  key={article.id}
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <NewsCard article={article} />
                </div>
              ))}
            </div>
          )}
        </section>
      </main>

      <footer className="border-t border-border/40 mt-20">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center space-y-4">
            <p className="text-sm text-muted-foreground">
              © 2024 O País. Todos os direitos reservados.
            </p>
            <div className="flex justify-center gap-6 text-sm">
              <a href="#" className="text-muted-foreground hover:text-primary smooth-transition">
                Sobre
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary smooth-transition">
                Contacto
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary smooth-transition">
                Política de Privacidade
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary smooth-transition">
                Termos de Uso
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
