(function ( $ ) {

  $.fn.selex = function(options) {
      var defaults = {
        containerAttrs: { class: 'selex', },
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
      var text = $(this).find('option:selected').text();

      $(this).next()
        .children('.selex-button')
        .text(text);
    });
  }

  function iPhoneClicker(button) {
    button.click(function(){
      var clicked = $(this)
      var select = clicked.parent().prev();

      select.show().focus();
      select.on('change', function(){
        var text = $(this).find('option:selected').text();

        clicked.text(text);
        $(this).hide();
      });
    });
  }

  function defaultClicker(button, option) {
    var doc = $(document);

    doc.off('click');
    doc.click(function(e){
      var clicked = $(e.target);

      if (clicked.is('.selex-button')) {
        toggleActiveState($(clicked));
      }
      else {
        cancelSelex();
      }
    });

    option.click(function(){
      var option = $(this);
      var options = $(this).parent('.selex-options');
      var value = option.attr('value');
      var text = option.text();
      var selex = options.parent('.selex-wrapper');
      var button = options.prev();
      var select = selex.prev();

      select.val(value);
      select.trigger('change');
      button.text(text);
    });
  }

  function buildSelex(select, settings, options) {
    var element = '<div></div>';
    var select = select.wrap(element);
    var container = select.parent()
      .attr(settings.containerAttrs)
      .addClass(select.attr('class'))
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
      var option = $(this);
      var value = option.val();
      var text = option.text();

      if (value) {
        return ['<div value="',value,'">',text,'</div>'].join('');
      }

    }).get().join('');

    return html;
  }

  function cancelSelex() {
    $('.active').removeClass('active')
      .next().hide();
  }


  function getSelectValue(select, options) {
    if(options.filter(':selected')) {
      var selected = options.filter(':selected');

      return selected.text()
    }
    else {
      return 'Select an Option'
    }
  }

  function toggleActiveState(clicked) {
    var active = clicked.hasClass('active');
    if (active) {
      clicked.removeClass('active')
        .next().hide();
    }

    else {
      cancelSelex();
      clicked.addClass('active')
        .next().show();
    }
  }
}( jQuery ));
