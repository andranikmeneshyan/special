<div class="main-wrapper">
 
    <div class="settings-wrapper">
      <div class="settings">
        <div class="font-settings settings-col">
          <span class="fonts-label label">Размер шрифта:</span>
          <span data-font="font-small" class="control font-control font-small">A</span>
          <span data-font="font-middle" class="control font-control font-middle">A</span>
          <span data-font="font-big" class="control font-control font-big">A</span>
        </div>
        <div class="color-settings settings-col">
          <span class="colors-label label">Цвет сайта:</span>
          <span data-color="white-scheme" class="white-control colors-control control white-scheme">Ц</span>
          <span data-color="black-scheme" class="black-control colors-control control black-scheme">Ц</span>
          <span data-color="blue-scheme" class="blue-control colors-control control blue-scheme">Ц</span>           
        </div> 
        <div class="image-settings settings-col"><span class="images-label label">Изображения:</span><span class="images-settings-inner"><span class="images-inner"></span></span></div>
      </div>
    </div>  
   
    <!--End of controls-->
    <div class="header-top">
      <?php if ($logo): ?>
        <a href="<?php print $front_page; ?>" title="<?php print t('Home'); ?>" id="logo">
          <img src="<?php print $logo; ?>" alt="<?php print t('Home'); ?>" />
        </a>
      <?php endif; ?>
      <?php if ($site_name): ?>
        <h2 class="site-name">
          <a href="<?php print $front_page; ?>" title="<?php print t('Home'); ?>"><span><?php print $site_name; ?></span></a>
        </h2>
      <?php endif; ?>
    </div>
    <!--End header top-->  
    <header class="header" class="clearfix">
      <?php print render($page['header']) ?>
    </header> <!-- /#footer -->
    <?php if ($page['highlighted']): ?><div id="highlighted"><?php print render($page['highlighted']); ?></div><?php endif; ?>
    <div class="title-wrapper">
      <?php print render($title_prefix); ?>
      <?php if ($title && !$is_front): ?><h1 class="title" id="page-title"><?php print $title; ?></h1><?php endif; ?>
      <?php print render($title_suffix); ?>
    </div>  
    <div class="content-wrapper">
      <?php print render($page['content']); ?>
    </div>
    <footer class="footer" class="clearfix">
      <?php print render($page['footer']) ?>
    </footer> <!-- /#footer -->
  </div>
</div> 