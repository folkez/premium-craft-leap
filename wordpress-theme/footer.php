<footer class="site-footer">
    <div class="container">
        <div class="footer-content">
            <!-- Logo -->
            <a href="<?php echo esc_url(home_url('/')); ?>" class="logo">
                <svg class="logo-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="width: 1.5rem; height: 1.5rem;">
                    <path d="M12 2L2 7l10 5 10-5-10-5z"/>
                    <path d="M2 17l10 5 10-5"/>
                    <path d="M2 12l10 5 10-5"/>
                </svg>
                <span style="font-size: 1rem;">Marcenaria<span class="text-gold">Premium</span></span>
            </a>

            <!-- Footer Links -->
            <nav class="footer-links">
                <a href="<?php echo esc_url(get_privacy_policy_url()); ?>" class="footer-link">
                    Política de Privacidade
                </a>
                <a href="#termos" class="footer-link">
                    Termos de Uso
                </a>
                <a href="#contato" class="footer-link">
                    Contato
                </a>
            </nav>
        </div>

        <p class="footer-copyright">
            © <?php echo date('Y'); ?> <?php bloginfo('name'); ?>. Todos os direitos reservados.
            <br>
            <span style="color: hsl(var(--muted-foreground)); opacity: 0.7;">
                Especialistas em Marketing para Marcenarias Premium no RS
            </span>
        </p>
    </div>
</footer>

<?php wp_footer(); ?>
</body>
</html>
