(function ($) {
  Drupal.behaviors.special = {
    attach: function (context, settings) {
      $body = $('body.html');
      /*Fonts settings*/
      var $fonts = $('.font-settings');
      /*Set default fonts settngs*/
      $defFont = $('.control:first', $fonts);
      $defFont.addClass('active');
      $defFontSize = $defFont.data('font');
      $body.attr('data-font', $defFontSize);
      /*Cnange fonts settings*/
      $('.control', $fonts).click(function () {
        var setting = $(this).data('font');
        $body.attr('data-font', setting);
        $(this).siblings('.control').removeClass('active');
        $(this).addClass('active');
      });

      /*Colors settings*/
      var $colors = $('.color-settings');
      /*Set default colors settings*/
      var $defColor = $('.control:first', $colors);
      $defColor.addClass('active');
      var $defColorSetting = $defColor.data('bg');
      $body.attr('data-bg', $defColorSetting);
      $('.control:first', $colors).addClass('active');
      /*Change colors settings*/
      $('.control', $colors).click(function () {
        var setting = $(this).data('bg');
        $body.attr('data-bg', setting);
        $(this).siblings('.control').removeClass('active');
        $(this).addClass('active');
      });


      /*Images settings*/
      $body.attr('data-img', 'yes');
      $images = $('.images-settings'); 
      $images.addClass('active');
      $images.click(function () {
        $(this).toggleClass('active');
        $body.toggleClass('images-disbled');
      });
    }
  };
})(jQuery);