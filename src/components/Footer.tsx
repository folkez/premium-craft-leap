export const Footer = () => {
  return (
    <footer className="bg-charcoal-light border-t border-border">
      <div className="container px-6 py-12">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-sm bg-primary/20 flex items-center justify-center border border-primary/30">
              <span className="font-display text-sm text-primary font-bold">M</span>
            </div>
            <span className="font-display text-lg text-foreground tracking-wide">
              Método<span className="text-primary">Premium</span>
            </span>
          </div>

          {/* Links */}
          <nav className="flex items-center gap-6 text-sm text-muted-foreground">
            <a href="#" className="hover:text-foreground transition-colors">
              Política de Privacidade
            </a>
            <a href="#" className="hover:text-foreground transition-colors">
              Termos de Uso
            </a>
          </nav>

          {/* Copyright */}
          <p className="text-sm text-muted-foreground">
            © 2024 Método Premium. Todos os direitos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
};
