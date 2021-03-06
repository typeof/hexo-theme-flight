(function ($) {
    // Caption
    $('.entry').each(function (i) {
        $(this)
            .find('img')
            .not('.no-fancy')
            .each(function () {
                var alt = this.alt;

                if (alt) {
                    $(this).after('<span class="caption">' + alt + '</span>');
                }

                $(this).wrap('<a href="' + this.src + '" title="' + alt + '" class="fancybox" rel="gallery' + i + '" />');
            });
    });

    // Gallery
    var play = function (parent, item, callback) {
        var width = parent.width();

        item.imagesLoaded(function () {
            var _this   = this[0],
                nWidth  = _this.naturalWidth,
                nHeight = _this.naturalHeight;

            callback();
            this.animate({ opacity: 1 }, 500);
            parent.animate({ height: width * nHeight / nWidth }, 500);
        });
    };

    $('.gallery').each(function () {
        var $this    = $(this),
            current  = 0,
            photoset = $this.children('.photoset').children(),
            all      = photoset.length,
            loading  = true;

        play($this, photoset.eq(0), function () {
            loading = false;
        });

        $this.on('click', '.prev', function () {
            if (!loading) {
                var next = (current - 1) % all;
                loading  = true;

                play($this, photoset.eq(next), function () {
                    photoset.eq(current).animate({ opacity: 0 }, 500);
                    loading = false;
                    current = next;
                });
            }
        }).on('click', '.next', function () {
            if (!loading) {
                var next = (current + 1) % all;
                loading  = true;

                play($this, photoset.eq(next), function () {
                    photoset.eq(current).animate({ opacity: 0 }, 500);
                    loading = false;
                    current = next;
                });
            }
        });
    });

    // to2top

    $('#go2top').click(function () {
        $('html,body').animate({
            scrollTop: 0
        });
    });

    $(window).scroll(function () {
        $('#go2top')[$(this).scrollTop() > 100 ? 'fadeIn' : 'fadeOut'](400)
    });

})(jQuery);
