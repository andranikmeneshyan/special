<?php

/*
 * Implements hook_preprocess_page().
 */
define(ASSET_PATH, '/src');

function special_preprocess_page(&$vars) {
  $theme_path = drupal_get_path('theme', 'special');
  drupal_add_css($theme_path . ASSET_PATH . '/css/screen.css');
  drupal_add_css($theme_path . ASSET_PATH . '/css/sprite.css');
  drupal_Add_js($theme_path . ASSET_PATH . '/js/script.js');
}
