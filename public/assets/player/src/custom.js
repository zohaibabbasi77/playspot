
'use strict';
var vjs = require('video.js');
var fs = require('fs');
vjs.plugin('custom', function(opt){
    var player = this;
    var _options = opt;
    player.ready(function(){

        player.el().addEventListener('contextmenu', function(){ return false; });
        var playerObject = this.player_;
        var TopBar = '';
        var TitleDiv  = '';
        var customInterval = setInterval(function(){
        
          if (typeof playerObject.getChild('PopupMenu') != 'undefined'){
            playerObject.getChild('PopupMenu').children()[0].el().innerHTML = '<span class="vjs-menu-item-label">Powered by Vodlix 1.0</span>';
            //playerObject.getChild('PopupMenu').children()[7].el().innerHTML = '<a class="vjs-menu-link" target="_blank" href="https://vodlix.com">About Vodlix</a>';
            if (typeof playerObject.getChild('PopupMenu').children()[7] == 'object'){
                playerObject.getChild('PopupMenu').children()[7].el().innerHTML = '<a class="vjs-menu-link" target="_blank" href="https://vodlix.com">About Vodlix</a>';
            }else{
                playerObject.getChild('PopupMenu').children()[6].el().innerHTML = '<a class="vjs-menu-link" target="_blank" href="https://vodlix.com">About Vodlix</a>';
            }
          }

          if (typeof playerObject.childNameIndex_.TopBar != 'undefined'){
            TopBar = playerObject.childNameIndex_.TopBar;
            TitleDiv = TopBar.el().innerHTML = '';
            var backText = '<span class="back-browse"> Back To Browse</span>';
            backText += '<p id="video-title-text" class="video-title-text"> '+TopBar.options_.title;
            if (_options.episode_name){
                backText += '<span> '+_options.season_number+':'+_options.episode_number+' '+_options.episode_name+' </span>';
            }
            backText += '</p>';
            var innerHTML_ = fs.readFileSync('./src/img/backspace.svg', 'utf8')+backText;
            TopBar.el().appendChild(vjs.createEl('div', {className: 'vjs-video-title',
            innerHTML: innerHTML_}));
            
            TopBar.el().addEventListener('mouseover',function(){
                document.getElementById('video-title-text').className='video-title-text open';
            });
            TopBar.el().addEventListener('mouseout',function(){
                document.getElementById('video-title-text').className='video-title-text';
            });
            clearInterval(customInterval);
          }
        },500);


        var b, controlBar = player.controlBar;
        controlBar.addChild('backwardButton', opt||{});
        controlBar.addChild('forwardButton', opt||{});
        

    });
});

var events = ['touchstart', 'touchend', 'click'];
var prevent_click = function(event){
    event.stopPropagation();
};


var Button = vjs.getComponent('Button');
vjs.registerComponent('ForwardButton', vjs.extend(Button, {
    controlText_: 'Forward',
    constructor: function(player, options){
        Button.call(this, player, options);
        this.on(events, prevent_click);
    },
    createEl: function(){
        var el = Button.prototype.createEl.apply(this, arguments);
        el.appendChild(vjs.createEl('div', {
            className: 'vjs-button-icon',
            innerHTML: fs.readFileSync('./src/img/forward.svg', 'utf8'),
        }));
        return el;
    },
    buildCSSClass: function(){
        return 'vjs-forward-button '+Button.prototype.buildCSSClass.call(this);
    },
    handleClick: function(event){
        this.player_.currentTime(this.player_.currentTime() + 10);
    },
}));


vjs.registerComponent('BackwardButton', vjs.extend(Button, {
  controlText_: 'Backward',
  constructor: function(player, options){
      Button.call(this, player, options);
      this.on(events, prevent_click);
  },
  createEl: function(){
      var el = Button.prototype.createEl.apply(this, arguments);
      el.appendChild(vjs.createEl('div', {
          className: 'vjs-button-icon',
          innerHTML: fs.readFileSync('./src/img/replay.svg', 'utf8'),
      }));
      return el;
  },
  buildCSSClass: function(){
      return 'vjs-backward-button '+Button.prototype.buildCSSClass.call(this);
  },
  handleClick: function(event){
    this.player_.currentTime(this.player_.currentTime() - 10);
  },
}));





