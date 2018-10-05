(function ($) {
  Drupal.behaviors.special = {
    attach: function (context, settings) {
      const storage = window.localStorage;
      const $html = $('html').eq(0);
      const $fontSettingsContainer = $('.font-settings');
      const $colorSettingsContaier = $('.color-settings');
      const $imgSettingsContainer = $('.image-settings');
      if (storage.getItem('fontSize')) {
        let fontSizeClass = storage.getItem('fontSize');
        $html.addClass(fontSizeClass);
        $('.' + fontSizeClass, $fontSettingsContainer).addClass('active');
      } else {
        $html.addClass('font-small');
        $('.font-small', $fontSettingsContainer).addClass('active');
      }
      if (storage.getItem('colorScheme')) {
        let colorScheme = storage.getItem('colorScheme');
        $html.addClass(colorScheme);
        $('.' + colorScheme, $colorSettingsContaier).addClass('active');
      } else {
        $html.addClass('white-scheme');
        $('.white-scheme', $colorSettingsContaier).addClass('active');
      }
      if (storage.getItem('imagesMode') === 'on' || !storage.getItem('imagesMode')) {
        let $imagesControl = $('.images-settings-inner');
        $imagesControl.removeClass('images-off');
         $html.removeClass('images-off');
        storage.setItem('imagesMode', 'on');
      } else {
        $html.addClass('images-off');
        let $imagesControl = $('.images-settings-inner');
        $imagesControl.addClass('images-off');
        storage.setItem('imagesMode', 'off');
      }

      $imgSettingsContainer.click(function (e) {
        let imagesMode = storage.getItem('imagesMode');
        let $imagesControl = $('.images-settings-inner');

        if (!imagesMode || imagesMode === 'on') {
          $imagesControl.addClass('images-off');
          storage.setItem('imagesMode', 'off');
          $html.addClass('images-off');
        } else {
          $imagesControl.removeClass('images-off');
          storage.setItem('imagesMode', 'on');
          $html.removeClass('images-off');
        }
    

      });

      $colorSettingsContaier.click(function (e) {
        $colorControl = $(e.target).data('color');
        $html.removeClass('white-scheme');
        $html.removeClass('black-scheme');
        $html.removeClass('blue-scheme');
        $html.addClass($colorControl);
        $(e.target).siblings('.colors-control').removeClass('active');
        $(e.target).addClass('active');
        storage.setItem('colorScheme', $colorControl);
      });

      $fontSettingsContainer.click(function (e) {
        $fontClass = $(e.target).data('font');
        $html.removeClass('font-small');
        $html.removeClass('font-middle');
        $html.removeClass('font-big');
        $html.addClass($fontClass);
        $(e.target).siblings('.font-control').removeClass('active');
        $(e.target).addClass('active');
        storage.setItem('fontSize', $fontClass);
      });

    }
  };
})(jQuery);
   