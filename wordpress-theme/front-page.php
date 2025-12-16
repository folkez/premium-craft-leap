<?php
/**
 * Front Page Template
 *
 * @package Marcenaria_Premium
 */

get_header();

// Get customizer values
$hero_headline = get_theme_mod('hero_headline', 'Sua Marcenaria não deveria depender apenas de indicações.');
$hero_subtitle = get_theme_mod('hero_subtitle', 'Implementamos um sistema previsível de vendas para fechar projetos acima de R$ 25 mil todos os meses, atraindo apenas o público Classe A no RS.');
$hero_bg = get_theme_mod('hero_bg_image', '');
?>

<!-- Hero Section -->
<section class="hero">
    <div class="hero-bg">
        <?php if ($hero_bg): ?>
            <img src="<?php echo esc_url($hero_bg); ?>" alt="Interior luxuoso">
        <?php endif; ?>
        <div class="hero-overlay"></div>
    </div>
    
    <div class="container">
        <div class="hero-content animate-fade-up">
            <span class="hero-badge">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
                </svg>
                Especialistas em Marcenarias Premium
            </span>
            
            <h1>
                <?php echo esc_html($hero_headline); ?>
            </h1>
            
            <p class="hero-subtitle">
                <?php echo esc_html($hero_subtitle); ?>
            </p>
            
            <div class="hero-buttons">
                <a href="#aplicar" class="btn btn-gold btn-lg">
                    Quero previsibilidade de vendas
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M5 12h14M12 5l7 7-7 7"/>
                    </svg>
                </a>
                <a href="#solucao" class="btn btn-gold-outline btn-lg">
                    Ver metodologia
                </a>
            </div>
            
            <div class="hero-stats">
                <div class="stat-item">
                    <div class="stat-value">R$ 2.3M+</div>
                    <div class="stat-label">Em projetos vendidos</div>
                </div>
                <div class="stat-item">
                    <div class="stat-value">47</div>
                    <div class="stat-label">Marcenarias atendidas</div>
                </div>
                <div class="stat-item">
                    <div class="stat-value">32%</div>
                    <div class="stat-label">Aumento médio ticket</div>
                </div>
            </div>
        </div>
    </div>
</section>

<!-- Pain Points Section -->
<section id="dores" class="section">
    <div class="container">
        <div class="section-header">
            <span class="section-badge">O Cenário Atual</span>
            <h2 class="section-title">Você se identifica com isso?</h2>
            <p class="section-description">
                Essas são as principais dores que marceneiros premium enfrentam todos os dias
            </p>
        </div>
        
        <div class="pain-grid">
            <?php
            $pain_points = array(
                array(
                    'icon'  => '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>',
                    'title' => 'Agenda Oscilando',
                    'desc'  => 'Meses excelentes seguidos de períodos vazios. A imprevisibilidade dificulta o planejamento e crescimento.'
                ),
                array(
                    'icon'  => '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>',
                    'title' => 'Curiosos Sem Orçamento',
                    'desc'  => 'Tempo perdido com leads que acham seu trabalho "caro demais" e só querem comparar preços.'
                ),
                array(
                    'icon'  => '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>',
                    'title' => 'Dependência de Indicações',
                    'desc'  => 'Seu negócio vive de indicações, mas elas são imprevisíveis e não escalam.'
                ),
                array(
                    'icon'  => '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>',
                    'title' => 'Falta de Posicionamento',
                    'desc'  => 'Estrutura técnica excelente, mas pouco reconhecimento de marca no mercado premium.'
                ),
                array(
                    'icon'  => '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="23 4 23 10 17 10"/><polyline points="1 20 1 14 7 14"/><path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"/></svg>',
                    'title' => 'Ciclo de Vendas Longo',
                    'desc'  => 'Propostas que demoram meses para fechar, travando seu fluxo de caixa.'
                ),
                array(
                    'icon'  => '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>',
                    'title' => 'Marketing Sem Retorno',
                    'desc'  => 'Já investiu em marketing, mas nunca viu resultados concretos em vendas qualificadas.'
                ),
            );

            foreach ($pain_points as $point):
            ?>
            <div class="card">
                <div class="card-icon">
                    <?php echo $point['icon']; ?>
                </div>
                <h3 class="card-title"><?php echo esc_html($point['title']); ?></h3>
                <p class="card-description"><?php echo esc_html($point['desc']); ?></p>
            </div>
            <?php endforeach; ?>
        </div>
    </div>
</section>

<!-- Solution Section -->
<section id="solucao" class="section" style="background: hsl(var(--card));">
    <div class="container">
        <div class="section-header">
            <span class="section-badge">Nossa Metodologia</span>
            <h2 class="section-title">A Solução High-Ticket</h2>
            <p class="section-description">
                Focamos em qualificação e posicionamento, não em volume de leads baratos
            </p>
        </div>
        
        <div class="solution-grid">
            <?php
            $solutions = array(
                array(
                    'step'  => '01',
                    'title' => 'Filtragem de Curiosos',
                    'desc'  => 'Estratégias que atraem apenas prospects com orçamento real para projetos premium.',
                    'items' => array('Segmentação por renda', 'Qualificação automática', 'Filtros inteligentes')
                ),
                array(
                    'step'  => '02',
                    'title' => 'Posicionamento High-End',
                    'desc'  => 'Construímos sua autoridade digital para atrair clientes que valorizam qualidade.',
                    'items' => array('Branding premium', 'Conteúdo estratégico', 'Prova social')
                ),
                array(
                    'step'  => '03',
                    'title' => 'Sistema Previsível',
                    'desc'  => 'Fluxo constante de leads qualificados para manter sua agenda sempre cheia.',
                    'items' => array('Pipeline automatizado', 'Métricas claras', 'Escala controlada')
                ),
            );

            foreach ($solutions as $solution):
            ?>
            <div class="card" style="position: relative; padding-top: 3rem;">
                <span style="position: absolute; top: 1rem; left: 1.5rem; font-family: 'Playfair Display', serif; font-size: 3rem; font-weight: 700; color: hsla(var(--gold), 0.2);">
                    <?php echo esc_html($solution['step']); ?>
                </span>
                <h3 class="card-title" style="margin-top: 1rem;"><?php echo esc_html($solution['title']); ?></h3>
                <p class="card-description"><?php echo esc_html($solution['desc']); ?></p>
                <ul style="margin-top: 1rem; list-style: none;">
                    <?php foreach ($solution['items'] as $item): ?>
                    <li style="display: flex; align-items: center; gap: 0.5rem; padding: 0.25rem 0; font-size: 0.875rem; color: hsl(var(--muted-foreground));">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="hsl(var(--gold))" stroke-width="2">
                            <polyline points="20 6 9 17 4 12"/>
                        </svg>
                        <?php echo esc_html($item); ?>
                    </li>
                    <?php endforeach; ?>
                </ul>
            </div>
            <?php endforeach; ?>
        </div>
    </div>
</section>

<!-- Qualification Section -->
<section id="qualificacao" class="section">
    <div class="container">
        <div class="section-header">
            <span class="section-badge">Qualificação</span>
            <h2 class="section-title">Para quem é este programa?</h2>
            <p class="section-description">
                Trabalhamos apenas com marcenarias que se encaixam em nosso perfil de parceiro ideal
            </p>
        </div>
        
        <div class="qual-grid">
            <!-- É para você -->
            <div class="card" style="border-color: hsla(142, 76%, 36%, 0.3);">
                <h3 style="display: flex; align-items: center; gap: 0.5rem; color: hsl(142 76% 36%); margin-bottom: 1.5rem;">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
                        <polyline points="22 4 12 14.01 9 11.01"/>
                    </svg>
                    É para você se...
                </h3>
                <ul class="checklist">
                    <li>
                        <svg class="checklist-icon check" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <polyline points="20 6 9 17 4 12"/>
                        </svg>
                        <span>Marcenaria com +3 anos de mercado</span>
                    </li>
                    <li>
                        <svg class="checklist-icon check" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <polyline points="20 6 9 17 4 12"/>
                        </svg>
                        <span>Ticket médio acima de R$ 15 mil</span>
                    </li>
                    <li>
                        <svg class="checklist-icon check" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <polyline points="20 6 9 17 4 12"/>
                        </svg>
                        <span>Capacidade produtiva disponível</span>
                    </li>
                    <li>
                        <svg class="checklist-icon check" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <polyline points="20 6 9 17 4 12"/>
                        </svg>
                        <span>Busca lucro, não apenas faturamento</span>
                    </li>
                    <li>
                        <svg class="checklist-icon check" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <polyline points="20 6 9 17 4 12"/>
                        </svg>
                        <span>Quer sair da guerra de preços</span>
                    </li>
                </ul>
            </div>
            
            <!-- Não é para você -->
            <div class="card" style="border-color: hsla(0, 84%, 60%, 0.3);">
                <h3 style="display: flex; align-items: center; gap: 0.5rem; color: hsl(0 84% 60%); margin-bottom: 1.5rem;">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <circle cx="12" cy="12" r="10"/>
                        <line x1="15" y1="9" x2="9" y2="15"/>
                        <line x1="9" y1="9" x2="15" y2="15"/>
                    </svg>
                    Não é para você se...
                </h3>
                <ul class="checklist">
                    <li>
                        <svg class="checklist-icon x" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <line x1="18" y1="6" x2="6" y2="18"/>
                            <line x1="6" y1="6" x2="18" y2="18"/>
                        </svg>
                        <span>Busca apenas leads baratos em volume</span>
                    </li>
                    <li>
                        <svg class="checklist-icon x" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <line x1="18" y1="6" x2="6" y2="18"/>
                            <line x1="6" y1="6" x2="18" y2="18"/>
                        </svg>
                        <span>Compete principalmente por preço</span>
                    </li>
                    <li>
                        <svg class="checklist-icon x" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <line x1="18" y1="6" x2="6" y2="18"/>
                            <line x1="6" y1="6" x2="18" y2="18"/>
                        </svg>
                        <span>Não tem capacidade de atender mais</span>
                    </li>
                    <li>
                        <svg class="checklist-icon x" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <line x1="18" y1="6" x2="6" y2="18"/>
                            <line x1="6" y1="6" x2="18" y2="18"/>
                        </svg>
                        <span>Espera resultados sem investimento</span>
                    </li>
                    <li>
                        <svg class="checklist-icon x" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <line x1="18" y1="6" x2="6" y2="18"/>
                            <line x1="6" y1="6" x2="18" y2="18"/>
                        </svg>
                        <span>Está apenas "pesquisando"</span>
                    </li>
                </ul>
            </div>
        </div>
        
        <div style="text-align: center; margin-top: 3rem;">
            <a href="#aplicar" class="btn btn-gold btn-lg">
                Verificar se me qualifico
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M5 12h14M12 5l7 7-7 7"/>
                </svg>
            </a>
        </div>
    </div>
</section>

<!-- Results Section -->
<section id="resultados" class="section" style="background: hsl(var(--card));">
    <div class="container">
        <div class="section-header">
            <span class="section-badge">Resultados Reais</span>
            <h2 class="section-title">Números que comprovam</h2>
            <p class="section-description">
                Métricas reais de marcenarias que implementaram nossa metodologia
            </p>
        </div>
        
        <div class="results-metrics">
            <div class="card metric-card">
                <div class="metric-value">R$ 2.3M+</div>
                <div class="metric-label">Em projetos vendidos pelos nossos clientes</div>
            </div>
            <div class="card metric-card">
                <div class="metric-value">47</div>
                <div class="metric-label">Marcenarias premium atendidas no RS</div>
            </div>
            <div class="card metric-card">
                <div class="metric-value">32%</div>
                <div class="metric-label">Aumento médio no ticket dos projetos</div>
            </div>
        </div>
    </div>
</section>

<!-- Multi-Step Form Section -->
<section id="aplicar" class="form-section">
    <div class="container">
        <div class="section-header">
            <span class="section-badge">Aplicação</span>
            <h2 class="section-title">Aplique para a Consultoria</h2>
            <p class="section-description">
                Preencha o formulário abaixo para analisarmos se sua marcenaria se qualifica
            </p>
        </div>
        
        <div class="form-container">
            <?php get_template_part('template-parts/multi-step-form'); ?>
        </div>
    </div>
</section>

<?php get_footer(); ?>
