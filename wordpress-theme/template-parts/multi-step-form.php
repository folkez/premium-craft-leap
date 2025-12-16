<?php
/**
 * Multi-Step Form Template Part
 *
 * @package Marcenaria_Premium
 */
?>

<form id="marcenaria-form" class="multi-step-form">
    <?php wp_nonce_field('marcenaria_form_nonce', 'marcenaria_nonce'); ?>
    
    <!-- Progress Bar -->
    <div class="progress-bar">
        <div class="progress-header">
            <span class="progress-step">Etapa <span id="current-step">1</span> de 4</span>
            <span class="progress-percent"><span id="progress-value">25</span>%</span>
        </div>
        <div class="progress-track">
            <div class="progress-fill" id="progress-fill" style="width: 25%"></div>
        </div>
    </div>

    <!-- Step 1: Dados Básicos -->
    <div class="form-step active" data-step="1">
        <h3 class="step-headline">Vamos conhecer sua marcenaria</h3>
        <p class="step-description">Informações básicas sobre você e sua empresa</p>
        
        <div class="form-group">
            <label class="form-label" for="nome">Nome completo *</label>
            <input type="text" id="nome" name="nome" class="form-input" placeholder="Seu nome completo" required>
        </div>
        
        <div class="form-group">
            <label class="form-label" for="empresa">Nome da marcenaria *</label>
            <input type="text" id="empresa" name="empresa" class="form-input" placeholder="Nome da sua empresa" required>
        </div>
        
        <div class="form-group">
            <label class="form-label" for="localizacao">Cidade / Estado *</label>
            <input type="text" id="localizacao" name="localizacao" class="form-input" placeholder="Ex: Porto Alegre / RS" required>
        </div>
        
        <div class="form-group">
            <label class="form-label" for="whatsapp">WhatsApp *</label>
            <input type="tel" id="whatsapp" name="whatsapp" class="form-input" placeholder="(51) 99999-9999" required>
        </div>
        
        <div class="form-group">
            <label class="form-label" for="instagram">Instagram ou Site</label>
            <input type="text" id="instagram" name="instagram" class="form-input" placeholder="@suamarcenaria ou site.com.br">
        </div>
    </div>

    <!-- Step 2: Qualificação do Negócio -->
    <div class="form-step" data-step="2">
        <h3 class="step-headline">Sobre seu momento atual</h3>
        <p class="step-description">Entenda melhor o perfil do seu negócio</p>
        
        <div class="form-group">
            <label class="form-label">Qual seu ticket médio por projeto? *</label>
            <div class="radio-cards cols-2">
                <?php
                $tickets = array('Até R$ 15 mil', 'R$ 15 mil a R$ 25 mil', 'R$ 25 mil a R$ 40 mil', 'Acima de R$ 40 mil');
                foreach ($tickets as $ticket):
                ?>
                <div class="radio-card">
                    <input type="radio" id="ticket_<?php echo sanitize_title($ticket); ?>" name="ticket_medio" value="<?php echo esc_attr($ticket); ?>" required>
                    <label class="radio-card-label" for="ticket_<?php echo sanitize_title($ticket); ?>">
                        <span class="radio-indicator"></span>
                        <span class="radio-card-text"><?php echo esc_html($ticket); ?></span>
                    </label>
                </div>
                <?php endforeach; ?>
            </div>
        </div>
        
        <div class="form-group">
            <label class="form-label">Quantos projetos completos consegue entregar/mês? *</label>
            <div class="radio-cards">
                <?php
                $projetos = array('1 a 2', '3 a 4', '5 ou mais');
                foreach ($projetos as $projeto):
                ?>
                <div class="radio-card">
                    <input type="radio" id="projetos_<?php echo sanitize_title($projeto); ?>" name="projetos_mes" value="<?php echo esc_attr($projeto); ?>" required>
                    <label class="radio-card-label" for="projetos_<?php echo sanitize_title($projeto); ?>">
                        <span class="radio-indicator"></span>
                        <span class="radio-card-text"><?php echo esc_html($projeto); ?></span>
                    </label>
                </div>
                <?php endforeach; ?>
            </div>
        </div>
        
        <div class="form-group">
            <label class="form-label">Qual seu principal desafio hoje? *</label>
            <div class="radio-cards cols-2">
                <?php
                $desafios = array('Leads sem orçamento', 'Falta de previsibilidade', 'Posicionamento premium', 'Agenda instável', 'Outro');
                foreach ($desafios as $desafio):
                ?>
                <div class="radio-card">
                    <input type="radio" id="desafio_<?php echo sanitize_title($desafio); ?>" name="desafio" value="<?php echo esc_attr($desafio); ?>" required>
                    <label class="radio-card-label" for="desafio_<?php echo sanitize_title($desafio); ?>">
                        <span class="radio-indicator"></span>
                        <span class="radio-card-text"><?php echo esc_html($desafio); ?></span>
                    </label>
                </div>
                <?php endforeach; ?>
            </div>
        </div>
    </div>

    <!-- Step 3: Maturidade em Marketing -->
    <div class="form-step" data-step="3">
        <h3 class="step-headline">Experiência com Investimentos</h3>
        <p class="step-description">Sobre sua maturidade em marketing digital</p>
        
        <div class="form-group">
            <label class="form-label">Você já investe ou investiu em marketing pago? *</label>
            <div class="radio-cards">
                <?php
                $marketing = array('Sim, atualmente', 'Já investi, mas parei', 'Nunca investi');
                foreach ($marketing as $option):
                ?>
                <div class="radio-card">
                    <input type="radio" id="marketing_<?php echo sanitize_title($option); ?>" name="marketing_pago" value="<?php echo esc_attr($option); ?>" required>
                    <label class="radio-card-label" for="marketing_<?php echo sanitize_title($option); ?>">
                        <span class="radio-indicator"></span>
                        <span class="radio-card-text"><?php echo esc_html($option); ?></span>
                    </label>
                </div>
                <?php endforeach; ?>
            </div>
        </div>
        
        <div class="form-group">
            <label class="form-label">Quanto estaria disposto a investir mensalmente? *</label>
            <div class="radio-cards cols-2">
                <?php
                $investimentos = array('Até R$ 2.000', 'R$ 2.000 a R$ 4.000', 'R$ 4.000 a R$ 7.000', 'Acima de R$ 7.000');
                foreach ($investimentos as $inv):
                ?>
                <div class="radio-card">
                    <input type="radio" id="inv_<?php echo sanitize_title($inv); ?>" name="investimento" value="<?php echo esc_attr($inv); ?>" required>
                    <label class="radio-card-label" for="inv_<?php echo sanitize_title($inv); ?>">
                        <span class="radio-indicator"></span>
                        <span class="radio-card-text"><?php echo esc_html($inv); ?></span>
                    </label>
                </div>
                <?php endforeach; ?>
            </div>
        </div>
    </div>

    <!-- Step 4: Intenção -->
    <div class="form-step" data-step="4">
        <h3 class="step-headline">Timing do Projeto</h3>
        <p class="step-description">Quando pretende iniciar a estruturação?</p>
        
        <div class="form-group">
            <label class="form-label">Quando pretende estruturar sua aquisição? *</label>
            <div class="radio-cards cols-2">
                <?php
                $timings = array('Imediatamente', 'Próximos 30 dias', '60–90 dias', 'Apenas pesquisando');
                foreach ($timings as $timing):
                ?>
                <div class="radio-card">
                    <input type="radio" id="timing_<?php echo sanitize_title($timing); ?>" name="timing" value="<?php echo esc_attr($timing); ?>" required>
                    <label class="radio-card-label" for="timing_<?php echo sanitize_title($timing); ?>">
                        <span class="radio-indicator"></span>
                        <span class="radio-card-text"><?php echo esc_html($timing); ?></span>
                    </label>
                </div>
                <?php endforeach; ?>
            </div>
        </div>
    </div>

    <!-- Success State -->
    <div class="form-step form-success-step" data-step="success" style="display: none;">
        <div class="form-success">
            <div class="success-icon">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <polyline points="20 6 9 17 4 12"/>
                </svg>
            </div>
            <h3 class="success-title">Aplicação Enviada!</h3>
            <p class="success-message">
                Recebemos sua aplicação com sucesso. Nossa equipe irá analisar seu perfil e entraremos em contato via WhatsApp em até 24 horas úteis.
            </p>
        </div>
    </div>

    <!-- Navigation -->
    <div class="form-nav" id="form-nav">
        <button type="button" class="btn btn-back" id="btn-back" style="display: none;">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M19 12H5M12 19l-7-7 7-7"/>
            </svg>
            Voltar
        </button>
        
        <button type="button" class="btn btn-gold" id="btn-next" disabled>
            Próximo
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M5 12h14M12 5l7 7-7 7"/>
            </svg>
        </button>
        
        <button type="submit" class="btn btn-gold btn-lg" id="btn-submit" style="display: none;">
            Enviar Aplicação para Análise
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z"/>
            </svg>
        </button>
    </div>
</form>
