<?php
/**
 * Marcenaria Premium Theme Functions
 *
 * @package Marcenaria_Premium
 * @version 1.0.0
 */

if (!defined('ABSPATH')) {
    exit;
}

/**
 * Theme Setup
 */
function marcenaria_premium_setup() {
    // Add default posts and comments RSS feed links to head
    add_theme_support('automatic-feed-links');

    // Let WordPress manage the document title
    add_theme_support('title-tag');

    // Enable support for Post Thumbnails
    add_theme_support('post-thumbnails');

    // Register navigation menus
    register_nav_menus(array(
        'primary' => __('Menu Principal', 'marcenaria-premium'),
        'footer'  => __('Menu Footer', 'marcenaria-premium'),
    ));

    // Switch default core markup to output valid HTML5
    add_theme_support('html5', array(
        'search-form',
        'comment-form',
        'comment-list',
        'gallery',
        'caption',
        'style',
        'script',
    ));

    // Add theme support for selective refresh for widgets
    add_theme_support('customize-selective-refresh-widgets');

    // Custom logo support
    add_theme_support('custom-logo', array(
        'height'      => 80,
        'width'       => 200,
        'flex-width'  => true,
        'flex-height' => true,
    ));
}
add_action('after_setup_theme', 'marcenaria_premium_setup');

/**
 * Enqueue scripts and styles
 */
function marcenaria_premium_scripts() {
    // Google Fonts
    wp_enqueue_style(
        'marcenaria-fonts',
        'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Playfair+Display:wght@400;500;600;700&display=swap',
        array(),
        null
    );

    // Theme stylesheet
    wp_enqueue_style(
        'marcenaria-style',
        get_stylesheet_uri(),
        array('marcenaria-fonts'),
        wp_get_theme()->get('Version')
    );

    // Theme scripts
    wp_enqueue_script(
        'marcenaria-scripts',
        get_template_directory_uri() . '/assets/js/main.js',
        array(),
        wp_get_theme()->get('Version'),
        true
    );

    // Localize script for AJAX
    wp_localize_script('marcenaria-scripts', 'marcenariaPremium', array(
        'ajaxUrl' => admin_url('admin-ajax.php'),
        'nonce'   => wp_create_nonce('marcenaria_form_nonce'),
    ));
}
add_action('wp_enqueue_scripts', 'marcenaria_premium_scripts');

/**
 * Custom Theme Options
 */
function marcenaria_premium_customize_register($wp_customize) {
    // Hero Section
    $wp_customize->add_section('hero_section', array(
        'title'    => __('Hero Section', 'marcenaria-premium'),
        'priority' => 30,
    ));

    // Hero Headline
    $wp_customize->add_setting('hero_headline', array(
        'default'           => 'Sua Marcenaria não deveria depender apenas de indicações.',
        'sanitize_callback' => 'sanitize_text_field',
    ));

    $wp_customize->add_control('hero_headline', array(
        'label'   => __('Headline', 'marcenaria-premium'),
        'section' => 'hero_section',
        'type'    => 'text',
    ));

    // Hero Subtitle
    $wp_customize->add_setting('hero_subtitle', array(
        'default'           => 'Implementamos um sistema previsível de vendas para fechar projetos acima de R$ 25 mil todos os meses.',
        'sanitize_callback' => 'sanitize_textarea_field',
    ));

    $wp_customize->add_control('hero_subtitle', array(
        'label'   => __('Subtítulo', 'marcenaria-premium'),
        'section' => 'hero_section',
        'type'    => 'textarea',
    ));

    // Hero Background Image
    $wp_customize->add_setting('hero_bg_image', array(
        'default'           => '',
        'sanitize_callback' => 'esc_url_raw',
    ));

    $wp_customize->add_control(new WP_Customize_Image_Control($wp_customize, 'hero_bg_image', array(
        'label'   => __('Imagem de Fundo', 'marcenaria-premium'),
        'section' => 'hero_section',
    )));

    // Contact Section
    $wp_customize->add_section('contact_section', array(
        'title'    => __('Contato', 'marcenaria-premium'),
        'priority' => 40,
    ));

    // WhatsApp Number
    $wp_customize->add_setting('whatsapp_number', array(
        'default'           => '',
        'sanitize_callback' => 'sanitize_text_field',
    ));

    $wp_customize->add_control('whatsapp_number', array(
        'label'       => __('Número WhatsApp', 'marcenaria-premium'),
        'description' => __('Formato: 5551999999999', 'marcenaria-premium'),
        'section'     => 'contact_section',
        'type'        => 'text',
    ));

    // Email
    $wp_customize->add_setting('contact_email', array(
        'default'           => '',
        'sanitize_callback' => 'sanitize_email',
    ));

    $wp_customize->add_control('contact_email', array(
        'label'   => __('Email de Contato', 'marcenaria-premium'),
        'section' => 'contact_section',
        'type'    => 'email',
    ));
}
add_action('customize_register', 'marcenaria_premium_customize_register');

/**
 * Handle Form Submission via AJAX
 */
function marcenaria_handle_form_submission() {
    // Verify nonce
    if (!wp_verify_nonce($_POST['nonce'], 'marcenaria_form_nonce')) {
        wp_send_json_error(array('message' => 'Erro de segurança.'));
        return;
    }

    // Sanitize form data
    $form_data = array(
        'nome'              => sanitize_text_field($_POST['nome'] ?? ''),
        'empresa'           => sanitize_text_field($_POST['empresa'] ?? ''),
        'localizacao'       => sanitize_text_field($_POST['localizacao'] ?? ''),
        'whatsapp'          => sanitize_text_field($_POST['whatsapp'] ?? ''),
        'instagram'         => sanitize_text_field($_POST['instagram'] ?? ''),
        'ticket_medio'      => sanitize_text_field($_POST['ticket_medio'] ?? ''),
        'projetos_mes'      => sanitize_text_field($_POST['projetos_mes'] ?? ''),
        'desafio'           => sanitize_text_field($_POST['desafio'] ?? ''),
        'marketing_pago'    => sanitize_text_field($_POST['marketing_pago'] ?? ''),
        'investimento'      => sanitize_text_field($_POST['investimento'] ?? ''),
        'timing'            => sanitize_text_field($_POST['timing'] ?? ''),
    );

    // Validate required fields
    if (empty($form_data['nome']) || empty($form_data['whatsapp'])) {
        wp_send_json_error(array('message' => 'Por favor, preencha todos os campos obrigatórios.'));
        return;
    }

    // Save as custom post type (optional)
    $post_id = wp_insert_post(array(
        'post_type'   => 'lead',
        'post_title'  => $form_data['nome'] . ' - ' . $form_data['empresa'],
        'post_status' => 'private',
        'meta_input'  => $form_data,
    ));

    // Send email notification
    $admin_email = get_option('admin_email');
    $subject = 'Nova Aplicação: ' . $form_data['nome'];
    
    $message = "Nova aplicação recebida:\n\n";
    $message .= "Nome: {$form_data['nome']}\n";
    $message .= "Empresa: {$form_data['empresa']}\n";
    $message .= "Localização: {$form_data['localizacao']}\n";
    $message .= "WhatsApp: {$form_data['whatsapp']}\n";
    $message .= "Instagram/Site: {$form_data['instagram']}\n";
    $message .= "Ticket Médio: {$form_data['ticket_medio']}\n";
    $message .= "Projetos/Mês: {$form_data['projetos_mes']}\n";
    $message .= "Desafio Principal: {$form_data['desafio']}\n";
    $message .= "Marketing Pago: {$form_data['marketing_pago']}\n";
    $message .= "Investimento Mensal: {$form_data['investimento']}\n";
    $message .= "Timing: {$form_data['timing']}\n";

    wp_mail($admin_email, $subject, $message);

    wp_send_json_success(array(
        'message' => 'Aplicação enviada com sucesso!',
        'post_id' => $post_id,
    ));
}
add_action('wp_ajax_marcenaria_form_submit', 'marcenaria_handle_form_submission');
add_action('wp_ajax_nopriv_marcenaria_form_submit', 'marcenaria_handle_form_submission');

/**
 * Register Lead Custom Post Type
 */
function marcenaria_register_lead_cpt() {
    register_post_type('lead', array(
        'labels' => array(
            'name'          => __('Leads', 'marcenaria-premium'),
            'singular_name' => __('Lead', 'marcenaria-premium'),
            'menu_name'     => __('Leads', 'marcenaria-premium'),
            'all_items'     => __('Todos os Leads', 'marcenaria-premium'),
            'view_item'     => __('Ver Lead', 'marcenaria-premium'),
            'search_items'  => __('Buscar Leads', 'marcenaria-premium'),
        ),
        'public'       => false,
        'show_ui'      => true,
        'show_in_menu' => true,
        'menu_icon'    => 'dashicons-businessperson',
        'supports'     => array('title'),
        'capabilities' => array(
            'create_posts' => false,
        ),
        'map_meta_cap' => true,
    ));
}
add_action('init', 'marcenaria_register_lead_cpt');

/**
 * Add meta boxes for Lead CPT
 */
function marcenaria_lead_meta_boxes() {
    add_meta_box(
        'lead_details',
        __('Detalhes do Lead', 'marcenaria-premium'),
        'marcenaria_lead_meta_box_callback',
        'lead',
        'normal',
        'high'
    );
}
add_action('add_meta_boxes', 'marcenaria_lead_meta_boxes');

function marcenaria_lead_meta_box_callback($post) {
    $fields = array(
        'nome'           => 'Nome',
        'empresa'        => 'Empresa',
        'localizacao'    => 'Localização',
        'whatsapp'       => 'WhatsApp',
        'instagram'      => 'Instagram/Site',
        'ticket_medio'   => 'Ticket Médio',
        'projetos_mes'   => 'Projetos/Mês',
        'desafio'        => 'Desafio Principal',
        'marketing_pago' => 'Marketing Pago',
        'investimento'   => 'Investimento Mensal',
        'timing'         => 'Timing',
    );

    echo '<table class="form-table">';
    foreach ($fields as $key => $label) {
        $value = get_post_meta($post->ID, $key, true);
        echo '<tr>';
        echo '<th>' . esc_html($label) . '</th>';
        echo '<td>' . esc_html($value) . '</td>';
        echo '</tr>';
    }
    echo '</table>';
}

/**
 * Add custom columns for Lead CPT
 */
function marcenaria_lead_columns($columns) {
    $new_columns = array(
        'cb'         => $columns['cb'],
        'title'      => $columns['title'],
        'whatsapp'   => __('WhatsApp', 'marcenaria-premium'),
        'ticket'     => __('Ticket Médio', 'marcenaria-premium'),
        'timing'     => __('Timing', 'marcenaria-premium'),
        'date'       => $columns['date'],
    );
    return $new_columns;
}
add_filter('manage_lead_posts_columns', 'marcenaria_lead_columns');

function marcenaria_lead_column_content($column, $post_id) {
    switch ($column) {
        case 'whatsapp':
            echo esc_html(get_post_meta($post_id, 'whatsapp', true));
            break;
        case 'ticket':
            echo esc_html(get_post_meta($post_id, 'ticket_medio', true));
            break;
        case 'timing':
            echo esc_html(get_post_meta($post_id, 'timing', true));
            break;
    }
}
add_action('manage_lead_posts_custom_column', 'marcenaria_lead_column_content', 10, 2);
