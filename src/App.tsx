
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Index from "./pages/Index";
import About from "./pages/About";
import Application from "./pages/Application";
import NotFound from "./pages/NotFound";
import Auth from "./pages/Auth";
import AdminNewsletter from "./pages/AdminNewsletter";
import AdminNewsletterEdit from "./pages/AdminNewsletterEdit";
import AdminArticle from "./pages/AdminArticle";
import AdminArticleEdit from "./pages/AdminArticleEdit";
import Newsletters from "./pages/Newsletters";
import NewsletterDetail from "./pages/NewsletterDetail";
import Articles from "./pages/Articles";
import ArticleDetail from "./pages/ArticleDetail";
import ResetPassword from "./pages/ResetPassword";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <div className="min-h-screen flex flex-col">
          <Header />
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/about" element={<About />} />
              <Route path="/apply" element={<Application />} />
              <Route path="/auth" element={<Auth />} />
              <Route path="/reset-password" element={<ResetPassword />} />
              <Route path="/admin/newsletter" element={<AdminNewsletter />} />
              <Route path="/admin/newsletter/edit/:id" element={<AdminNewsletterEdit />} />
              <Route path="/admin/article" element={<AdminArticle />} />
              <Route path="/admin/article/edit/:id" element={<AdminArticleEdit />} />
              <Route path="/newsletters" element={<Newsletters />} />
              <Route path="/newsletters/:id" element={<NewsletterDetail />} />
              <Route path="/articles" element={<Articles />} />
              <Route path="/articles/:id" element={<ArticleDetail />} />
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
