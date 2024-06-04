
'use strict';
var vjs = require('video.js');
var fs = require('fs');
vjs.plugin('next', function(opt){
    var player = this;


    player.ready(function(){
        //console.log(opt);
        var b, controlBar = player.controlBar;
        b = controlBar.nextVideo = controlBar.addChild('nextButton', opt||{});
        var priviewButton = b.addChild('PreviewButton', opt||{});
        priviewButton.hide();
        b.on('mouseenter', function(){
            b.addClass('vjs-next-suggestion-show');
            priviewButton.show();
            controlBar.getChild('progressControl').hide();
        });
        b.on('mouseleave', function(){
            b.removeClass('vjs-next-suggestion-show');
            priviewButton.hide();
            controlBar.getChild('progressControl').show();
        });
    });
});
var events = ['touchstart', 'touchend', 'click'];
var prevent_click = function(event){
    event.stopPropagation();
};

var Button = vjs.getComponent('Button');
var Component = vjs.getComponent('Component');
vjs.registerComponent('NextButton', vjs.extend(Button, {
    controlText_: 'Next',
    constructor: function(player, options){
        Button.call(this, player, options);
        this.on(events, prevent_click);
    },
    createEl: function(){
        var el = Button.prototype.createEl.apply(this, arguments);
        el.appendChild(vjs.createEl('div', {
            className: 'vjs-button-icon',
            innerHTML: fs.readFileSync('./src/img/skip_next.svg', 'utf8'),
        }));
        return el;
    },
    buildCSSClass: function(){
        return 'vjs-next-button '+Button.prototype.buildCSSClass.call(this);
    },
    handleClick: function(event){
        this.player_.trigger('next_suggestion_play'); },
}));



vjs.registerComponent('PreviewButton', vjs.extend(Component, {
    controlText_: 'Preview video',
    constructor: function(player, options){
        this.options = options;
        Component.call(this, player, options);
        this.on(events, prevent_click);
        this.addClass('vjs-next-menu-parent');
    },
    createEl: function(){
        var innterHTML = 
                '<div class="block_nextdtls">'+
                    '<div class="headline">Next Episode</div>'+
                    '<div class="thumbinner">'+
                    '<span class="hover-icon">'+fs.readFileSync('./src/img/play_arrow.svg', 'utf8')+'</span>'+
                        '<img src="'+this.options.image+'">'+
                    '</div>'+
                    '<div class="nexttext">'+
                    '<div class="vjs-next-title">'+this.options.title+'</div>'+
                        '<span>'+this.options.description+'</span>'+
                    '</div>'+
                '</div>';
        var el = Component.prototype.createEl.apply(this, arguments);
        el.appendChild(vjs.createEl('div', {
            className: 'vjs-next-menu',
            innerHTML: innterHTML,
        }));
        return el;
    },
    buildCSSClass: function(){
        return 'vjs-next-menu '+Component.prototype.buildCSSClass.call(this);
    },
    handleClick: function(event){
        //do nothing
    },
}));


