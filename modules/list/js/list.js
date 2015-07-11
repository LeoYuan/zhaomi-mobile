require('../../../common/pkgs/button/button');
require('../css/list');
require('../../../lib/unslider/unslider');
require('../../../lib/event-swipe/event-swipe');

$(function() {


    var main = {
        init: function(){
            var $banner = $('.banner');

            this.initBanner($banner);
            this.initCateList();

        },
        initCateList: function() {
            var $cateList = $('#cateList');
            if ($cateList.length){
                $cateList.on('touchend', '.tab .tab-item', function(e) {
                    var $target = $(e.currentTarget);
                    $cateList.addClass('open');
                    var index = $cateList.find('.tab .tab-item').index($target);
                    var $tabContentItems = $cateList.find('.tab-content-item');
                    $tabContentItems.removeClass('active');
                    $tabContentItems.eq(index).addClass('active');
                    e.stopImmediatePropagation();

                }).on('touchend', '.tab-content', function() {
                    hideCateList($cateList);
                });
                $(document).on('touchend', function(){
                    hideCateList($cateList);
                });
                function hideCateList($cateList) {
                    setTimeout(function() {
                        $cateList.removeClass('open');
                    }, 50)
                }

            }

        },

        initBanner: function($banner) {
            $banner.unslider({
                dots: true
            });
        }

    };
    main.init();
});