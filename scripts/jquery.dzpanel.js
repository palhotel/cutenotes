/*
features :
1. make it work for panels from html : <section class="dz-panel"></section>
2. create panels in javascript : $(selector).dzPanel(options);
 */
(function ($) {
    $.fn.dzPanel = function (options) {
        var opts = $.extend({}, $.fn.dzPanel.defaults, options);
        var panels = [];

        this.each(function (idx, item) {
            panels.push(createPanel(item));
        });
        return this;

        function createPanel(panel) {
            var panel = document.createElement('<section></section>')
        }

    };

    $.fn.dzPanel.defaults = {
        hasHeader: true,
        hasFooter: false,
        hasClose: false
    };

    $(document).ready(function(){
        $('.dz-panel').css({
            display: 'none',
            position : 'absolute',
            right: 0,
            top: 0,
            height: window.innerHeight - 20,
            border: '1px solid #cccccc',
            width: '20%',
            background: '#ffffff'
        });

        $('.dz-panel .header').css({
            background: '#99ccff',
            height:'60px',
            width: '100%',
            color: '#ffffff',
            'font-size': '24px',
            'font-weight': 'bold',
            'line-height': '60px',
            'padding-left': '20px'
        });

        $('.dz-panel .main').css({
            padding: '22px'
        });

        $('.dz-panel .footer').css({
            'padding-left': '22px',
            border: '1px solid #ccccff',
            position: 'absolute',
            bottom: '0',
            width: '100%'
        });
    });

    $.fn.dzPanel.togglePanel = function(){
            $('.dz-panel').toggle(300);
            return this;
        };

})(jQuery);

