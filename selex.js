$(document).ready(function(){
  (function ( $ ) {

    $.fn.selex = function(options) {
        var defaults = {
          wrapperAttrs: { class: 'selex-wrapper' },
          buttonAttrs: { class: 'selex-button' },
          optionsAttrs: { class: 'selex-options' },
          optionAttrs: { class: 'selex-option' }
        }

        var settings = $.extend( true, {}, defaults, options );

        this.each(function(){
          var select = $(this);
          var options = select.children();

          select.before('<div></div>');

          buildSelex(select, settings, options)
        });

        bindSelexClick();

        return this;
    };

    function bindSelexClick() {
      var button = $('.selex-button');
      var option = $('.selex-option');

      button.click(function(){
        var options = $(this).next();

        options.toggle();
      });

      option.click(function(){
        var option = $(this);
        var options = $(this).parent('.selex-options');
        var value = option.text();
        var selex = options.parent('.selex-wrapper');
        var button = options.prev();
        var select = selex.next();

        select.val(value);
        options.toggle();
        button.text(value);

      });
    }

    function buildSelex(select, settings, options) {
      var element = '<div></div>';
      var wrapper = select.prev()
        .attr(settings.wrapperAttrs)
        .append(element);
      var button = wrapper.children()
        .attr(settings.buttonAttrs)
        .text(getSelectValue(select, options))
        .after(element);
      var options = button.next()
        .attr(settings.optionsAttrs)
        .append(buildSelexOption(options))
      var option = options.children()
        .attr(settings.optionAttrs)

    }

    function buildSelexOption(options) {
      var html = options.map(function(){
        var value = $(this).val();

        return ['<div>',value,'</div>'].join('');

      }).get().join('');

      return html;
    }


    function getSelectValue(select, options){
      if(options.filter(':selected'))
        return options.filter(':selected').val()
      else
        return 'Select an Option'
    }
  }( jQuery ));

  $('select').selex();
});
