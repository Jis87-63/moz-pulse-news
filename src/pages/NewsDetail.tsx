import { useParams, useNavigate } from "react-router-dom";
import { mockNews } from "@/data/mockNews";
import { Header } from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Share2, Clock, User, Calendar } from "lucide-react";
import { toast } from "sonner";

const NewsDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const article = mockNews.find((news) => news.id === id);

  if (!article) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container mx-auto px-4 py-20 text-center">
          <h1 className="text-4xl font-bold mb-4">Notícia não encontrada</h1>
          <Button onClick={() => navigate("/")} className="cosmic-gradient text-white">
            Voltar à página inicial
          </Button>
        </div>
      </div>
    );
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("pt-PT", {
      day: "numeric",
      month: "long",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const handleShare = async () => {
    const shareData = {
      title: article.title,
      text: `${article.summary}\n\nLeia mais em:`,
      url: `${window.location.origin}/news/${article.id}`,
    };

    try {
      if (navigator.share) {
        await navigator.share(shareData);
        toast.success("Notícia compartilhada com sucesso!");
      } else {
        await navigator.clipboard.writeText(
          `${article.title}\n\n${article.summary}\n\nLeia mais: ${window.location.origin}/news/${article.id}`
        );
        toast.success("Link copiado para a área de transferência!");
      }
    } catch (error) {
      console.error("Error sharing:", error);
      toast.error("Erro ao compartilhar notícia");
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <article className="container mx-auto px-4 py-8 max-w-4xl">
        <Button
          onClick={() => navigate("/")}
          variant="ghost"
          className="mb-6 hover:bg-primary/10"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Voltar
        </Button>

        <div className="space-y-6 animate-fade-in">
          <div className="space-y-4">
            <Badge className="cosmic-gradient text-white border-0">
              {article.category}
            </Badge>

            <h1 className="text-4xl md:text-5xl font-bold leading-tight">
              {article.title}
            </h1>

            <p className="text-xl text-muted-foreground">
              {article.summary}
            </p>

            <div className="flex flex-wrap items-center gap-6 text-sm text-muted-foreground py-4 border-y border-border/50">
              <div className="flex items-center gap-2">
                <User className="h-4 w-4" />
                <span>{article.author}</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                <span>{formatDate(article.publishedAt)}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4" />
                <span>{article.readTime} min de leitura</span>
              </div>
              <Button
                onClick={handleShare}
                variant="ghost"
                size="sm"
                className="ml-auto hover:bg-primary/10"
              >
                <Share2 className="h-4 w-4 mr-2" />
                Compartilhar
              </Button>
            </div>
          </div>

          <div className="relative overflow-hidden rounded-xl aspect-video">
            <img
              src={article.imageUrl}
              alt={article.title}
              className="w-full h-full object-cover"
            />
          </div>

          <div className="prose prose-invert prose-lg max-w-none">
            {article.content.split("\n\n").map((paragraph, index) => (
              <p key={index} className="text-foreground/90 leading-relaxed mb-4">
                {paragraph}
              </p>
            ))}
          </div>

          {article.videoUrl && (
            <div className="space-y-3">
              <h3 className="text-xl font-semibold">Vídeo relacionado</h3>
              <div className="aspect-video rounded-xl overflow-hidden">
                <iframe
                  src={article.videoUrl}
                  className="w-full h-full"
                  allowFullScreen
                  title="Video"
                />
              </div>
            </div>
          )}

          {article.audioUrl && (
            <div className="space-y-3">
              <h3 className="text-xl font-semibold">Áudio relacionado</h3>
              <audio controls className="w-full">
                <source src={article.audioUrl} type="audio/mpeg" />
                Seu navegador não suporta o elemento de áudio.
              </audio>
            </div>
          )}

          <div className="pt-8 border-t border-border/50">
            <div className="flex items-center justify-between">
              <p className="text-sm text-muted-foreground">
                Fonte: {article.source}
              </p>
              <Button
                onClick={handleShare}
                className="cosmic-gradient text-white hover:opacity-90"
              >
                <Share2 className="h-4 w-4 mr-2" />
                Compartilhar esta notícia
              </Button>
            </div>
          </div>
        </div>
      </article>
    </div>
  );
};

export default NewsDetail;
