<?php
/**
 * Main Index Template
 *
 * This is the most generic template file in a WordPress theme.
 * For landing page, we redirect to front-page.php
 *
 * @package Marcenaria_Premium
 */

get_header();

// If this is the front page, show the landing page content
if (is_front_page()) {
    get_template_part('front-page');
} else {
    // Default blog/posts template
    ?>
    <main class="section" style="padding-top: 120px;">
        <div class="container">
            <?php if (have_posts()) : ?>
                <div class="posts-grid" style="display: grid; gap: 2rem;">
                    <?php while (have_posts()) : the_post(); ?>
                        <article class="card">
                            <h2 class="card-title">
                                <a href="<?php the_permalink(); ?>" style="color: inherit; text-decoration: none;">
                                    <?php the_title(); ?>
                                </a>
                            </h2>
                            <div class="card-description">
                                <?php the_excerpt(); ?>
                            </div>
                            <a href="<?php the_permalink(); ?>" class="btn btn-gold-outline" style="margin-top: 1rem;">
                                Ler mais
                            </a>
                        </article>
                    <?php endwhile; ?>
                </div>
                
                <?php the_posts_pagination(array(
                    'prev_text' => '← Anterior',
                    'next_text' => 'Próximo →',
                )); ?>
                
            <?php else : ?>
                <div class="card" style="text-align: center; padding: 4rem;">
                    <h2>Nenhum post encontrado</h2>
                    <p class="text-muted">Não há conteúdo disponível no momento.</p>
                </div>
            <?php endif; ?>
        </div>
    </main>
    <?php
}

get_footer();
