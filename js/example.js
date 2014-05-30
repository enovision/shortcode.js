// Find all h2's and create a table of contents from them
var toggleShortcode = function($el) {
  // This switch is just for the toggle feature
  if (this.enabled) {
    var $contents = $('.contents');
    $contents.parent().addClass('code');
    $contents.replaceWith($contents.data('tag'));
    this.enabled = false;

  } else {

    // The goodies start here
    new Shortcode($el, {
      overview: function() {
        var $toc = $($('#toc').html());
        $toc.data('tag', this.tag);

        $el.find(this.options.target).each(function(index, el) {
          var text = $(el).text();
          var id = text.toLowerCase().replace(/\s/g, '-');

          $(this).attr('id', id);
          $toc.find('ul').append(
            $('<li>').append($('<a>', {
              text: text,
              href: '#' + id
            }))
          );
        });

        $el.find('.code').removeClass('code');

        return $toc;
      }
    });

    this.enabled = true;
  }
};

$(document).on('click', '.toggle-shortcode, .code', function(e) {
  e.preventDefault();
  toggleShortcode($('#root'));
});