$(document).ready(function(){
  (function ( $ ) {

    $.fn.selex = function(options) {
        var defaults = {
          containerAttrs: { class: 'selex' },
          wrapperAttrs: { class: 'selex-wrapper' },
          buttonAttrs: { class: 'selex-button' },
          optionsAttrs: { class: 'selex-options' },
          optionAttrs: { class: 'selex-option' }
        }

        var settings = $.extend( true, {}, defaults, options );

        this.each(function(){
          var select = $(this);
          var options = select.children();

          buildSelex(select, settings, options);
        });

        bindSelexClick();

        return this;
    };

    function bindSelexClick() {
      var button = $('.selex-button');
      var option = $('.selex-option');

      if (/Android/i.test(navigator.userAgent)) { androidClicker() }
      else if (/iPhone/i.test(navigator.userAgent)) { iPhoneClicker(button) }
      else { defaultClicker(button, option) }

    }

    function androidClicker() {
      $('select').show();
      $('select').on('change', function(){
        var value = $(this).val();

        $(this).prev()
          .children('.selex-button')
          .text(value);
      });
    }

    function iPhoneClicker(button) {
      button.click(function(){
        var clicked = $(this)
        var select = clicked.parent().prev();

        select.show().focus();
        select.on('change', function(){
          clicked.text(select.val());
          $(this).hide();
        });
      });
    }

    function defaultClicker(button, option) {
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
      var select = select.wrap(element);
      var container = select.parent()
        .attr(settings.containerAttrs)
        .append(element);
      var wrapper = container.children().last()
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
      if(options.filter(':selected')) {
        var selected = options.filter(':selected');

        return selected.val()
      }
      else {
        return 'Select an Option'
      }
    }
  }( jQuery ));

  $('select').selex();
});
