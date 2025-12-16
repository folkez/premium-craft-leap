<!DOCTYPE html>
<html <?php language_attributes(); ?>>
<head>
    <meta charset="<?php bloginfo('charset'); ?>">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="description" content="<?php bloginfo('description'); ?>">
    
    <!-- Preconnect to Google Fonts -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    
    <?php wp_head(); ?>
</head>
<body <?php body_class(); ?>>
<?php wp_body_open(); ?>

<header class="site-header">
    <div class="container">
        <div class="header-inner">
            <!-- Logo -->
            <a href="<?php echo esc_url(home_url('/')); ?>" class="logo">
                <svg class="logo-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M12 2L2 7l10 5 10-5-10-5z"/>
                    <path d="M2 17l10 5 10-5"/>
                    <path d="M2 12l10 5 10-5"/>
                </svg>
                <span>Marcenaria<span class="text-gold">Premium</span></span>
            </a>

            <!-- Navigation -->
            <nav class="nav-menu">
                <a href="#dores" class="nav-link">O Cenário</a>
                <a href="#solucao" class="nav-link">Metodologia</a>
                <a href="#qualificacao" class="nav-link">Qualificação</a>
                <a href="#resultados" class="nav-link">Resultados</a>
            </nav>

            <!-- CTA Button -->
            <a href="#aplicar" class="btn btn-gold">
                Agendar Consultoria
            </a>
        </div>
    </div>
</header>
