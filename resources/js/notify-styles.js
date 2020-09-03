//agregando el style 'foo'
$.notify.addStyle('foo', {
    html: 
      "<div>" +
        "<div class='clearfix'>" +
          "<div class='title' data-notify-html='title'/>" +
          "<div class='buttons'>" +
            "<button class='no'>Cancelar</button>" +
            "<button class='yes' data-notify-text='button'></button>" +
          "</div>" +
        "</div>" +
      "</div>"
  });
  
  //listen for click events from this style
  $(document).on('click', '.notifyjs-foo-base .no', function() {
    //programmatically trigger propogating hide event
    $(this).trigger('notify-hide');
  });
  $(document).on('click', '.notifyjs-foo-base .yes', function() {
    //show button text
    alert($(this).text() + " clicked!");
    //hide notification
    $(this).trigger('notify-hide');
  });

  