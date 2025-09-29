import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { X } from "lucide-react";

export const CookieConsent = () => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem("cookieConsent");
    if (!consent) {
      setShow(true);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem("cookieConsent", "accepted");
    setShow(false);
  };

  const handleDecline = () => {
    localStorage.setItem("cookieConsent", "declined");
    setShow(false);
  };

  if (!show) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm animate-fade-in">
      <Card className="relative max-w-2xl mx-4 p-8 card-gradient border-primary/20 glow-effect animate-scale-in">
        <button
          onClick={handleDecline}
          className="absolute top-4 right-4 text-muted-foreground hover:text-foreground smooth-transition"
          aria-label="Fechar"
        >
          <X className="h-5 w-5" />
        </button>

        <div className="space-y-6">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold bg-clip-text text-transparent cosmic-gradient">
              Bem-vindo ao O País
            </h2>
            <p className="text-muted-foreground text-lg">
              As melhores notícias de Moçambique
            </p>
          </div>

          <div className="space-y-4 text-sm text-muted-foreground">
            <p>
              Este site utiliza cookies e tecnologias semelhantes para melhorar a sua experiência de navegação, 
              personalizar conteúdo e anúncios, e analisar o tráfego do site.
            </p>
            <p>
              Ao continuar a navegar, você concorda com a nossa{" "}
              <a href="#" className="text-primary hover:underline">
                Política de Privacidade
              </a>{" "}
              e{" "}
              <a href="#" className="text-primary hover:underline">
                Termos de Uso
              </a>
              .
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <Button
              onClick={handleAccept}
              className="flex-1 cosmic-gradient text-white font-semibold hover:opacity-90 smooth-transition"
              size="lg"
            >
              Aceitar e Continuar
            </Button>
            <Button
              onClick={handleDecline}
              variant="outline"
              className="flex-1 border-primary/30 hover:bg-primary/10"
              size="lg"
            >
              Apenas Essenciais
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
};
