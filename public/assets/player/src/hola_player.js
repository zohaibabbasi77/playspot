'use strict';
var videojs = window.videojs = require('video.js');
require('./css/videojs.css'); // auto injected
var mime = require('./mime.js');
var util = require('./util.js');
var id3 = require('./id3.js');
var hlsjs_source_handler = require('@hola.org/hap.js/lib/hola_videojs_hls.js');
var flashls_source_handler = require('./flashls_source_handler.js');
var url = require('url');
var _ = {
    map: require('lodash/map'),
    pick: require('lodash/pick'),
    omit: require('lodash/omit'),
    values: require('lodash/values'),
    find: require('lodash/find'),
    merge: require('lodash/merge'),
    includes: require('lodash/includes'),
};

var E = window.hola_player = module.exports = hola_player;
E.VERSION = '__VERSION__';
E.players = {};
var hola_conf, customer;
try {
    /* global hola_player_api */
    hola_conf = JSON.parse(hola_player_api&&hola_player_api.zdot('json'));
} catch(e){}
hola_conf = hola_conf||{};

E.log = {
    info: log.bind(E.log, 'info'),
    warn: log.bind(E.log, 'warn'),
    error: log.bind(E.log, 'error'),
};

(function(){
    try {
        var script = util.current_script();
        customer = script && url.parse(script.src, true, true).query.customer;
        hlsjs_source_handler.attach();
        flashls_source_handler();
        load_cdn_loader();
        license_init();
    } catch(err){ E.log.error(err.stack||err); }
})();

function get_geoip(){
    var res = {};
    try {
        var json;
        if (json = localStorage.getItem('hola_geoip'))
            res = JSON.parse(json);
    } catch(e){}
    return res;
}

function parse_re(v){
    if (v.__RegExp__)
    {
        var parsed = /^\/(.*)\/(\w*)$/.exec(v.__RegExp__);
        if (!parsed)
            throw v;
        return new RegExp(parsed[1], parsed[2]);
    }
    return v;
}

function get_spark_conf(){
    var conf = hola_conf&&hola_conf.spark||{};
    if (!conf.zones)
        return conf;
    var zones = _.values(conf.zones);
    zones.sort(function(a, b){ return a.order-b.order; });
    var c = _.find(zones, function(r){
        function url_match(){
            return (r.by_frame_url ? location.href : get_top_url())
                .match(parse_re(r.match));
        }
        function country_match(){
            var code =  get_geoip().country;
            var include = r.country ? r.country.include : [];
            var exclude = r.country ? r.country.exclude : [];
            return (!include.length || _.includes(include, code)) &&
                (!exclude.length || !_.includes(exclude, code));
        }
        return url_match() && country_match();
    });
    c = c||conf;
    ['player', 'playlist'].forEach(function(feature){
        if ((c[feature]||{use_default_conf: true}).use_default_conf)
            c[feature] = conf[feature];
    });
    return _.merge({general: conf.general}, c);
}

function hola_player(opt, ready_cb){
    if (typeof opt=='function')
    {
        ready_cb = opt;
        opt = {};
    }
    opt = videojs.mergeOptions(opt); // clone
    var pl = opt.player && typeof opt.player!='string' && opt.player.length
        ? opt.player[0] : opt.player;
    var element = !pl ? document.querySelector('video, object, embed') :
        videojs.isEl(pl) ? pl : document.querySelector(pl);
    if (!element)
        return null;
    if (element.hola_player)
        return element.hola_player;
    if (opt = set_defaults(element, opt))
        return new Player(element, opt, ready_cb);
}

function set_defaults(element, opt){
    var next_conf, player_conf, spark_conf = get_spark_conf();
    var url = get_top_url();
    if (player_conf = spark_conf.player)
    {
        player_conf = _.omit(player_conf, 'strings');
        opt = videojs.mergeOptions(player_conf, opt);
    }
    E.debug = spark_conf.debug || opt.debug ||
        url.indexOf('hola_debug_spark')!=-1;
    opt.autoplay = opt.auto_play || opt.autoplay; // allow both
    // disable autoplay if spark autoplay is enabled
    if (spark_conf.autoplay && spark_conf.autoplay.enable)
        opt.autoplay = false;
    opt.base_url = opt.base_url||'https://player2.h-cdn.com';
    if (opt.video_url)
    {
        opt.sources = [{
            src: opt.video_url,
            type: opt.video_type||mime.guess_link_type(opt.video_url),
        }];
    }
    else if (opt.sources && !opt.sources.length)
        opt.sources = undefined;
    if (['VIDEO', 'DIV', 'OBJECT', 'EMBED'].indexOf(element.tagName)<0)
        return;
    if (element.tagName=='VIDEO')
    {
        if (!opt.sources)
        {
            var sources = element.querySelectorAll('source');
            if (!sources.length)
                return;
            opt.sources =
                Array.prototype.map.call(sources, videojs.getAttributes);
        }
        opt = videojs.mergeOptions(videojs.getAttributes(element), opt);
    }
    if (opt.sources)
    {
        opt.sources.forEach(function(s){
            s.type = s.type||mime.guess_link_type(s.src);
        });
    }
    if (opt.share===undefined)
        opt.share = {};
    if (!opt.share || opt.share.buttons && !opt.share.buttons.length)
        opt.share = undefined;
    else
        opt.share = videojs.mergeOptions(opt.share, {title: opt.title});
    if ((next_conf = spark_conf.playlist) && next_conf.next_btn &&
        ((next_conf.enable || window.hola_ve_playlist || (url &&
        url.match(/hola_ve_playlist=(1|on)/)))))
    {
        opt.next = {};
    }
    if (opt.watermark && !opt.watermark.fadeTime)
        opt.watermark.fadeTime = null;
    return opt.sources && opt;
}

function load_deps(deps){
    deps = deps||{};
    if (!window.WebVTT)
        require('videojs-vtt.js');
    require('@hola.org/videojs-osmf');
    require('@hola.org/videojs-contrib-media-sources');
    if (deps['videojs-settings'])
    {
        require('@hola.org/videojs-settings');
        require('./css/videojs-settings.css');
    }
    if (deps['videojs-hola-skin'])
    {
        require('@hola.org/videojs-hola-skin');
        require('./css/videojs-hola-skin.css');
    }
    if (deps['videojs-thumbnails'])
    {
        require('@hola.org/videojs-thumbnails');
        require('./css/videojs-thumbnails.css');
    }
    if (deps['videojs-contrib-ads'])
    {
        require('@hola.org/videojs-contrib-ads');
        require('./css/videojs-contrib-ads.css');
    }
    if (deps['videojs-ima'])
    {
        require('@hola.org/videojs-ima');
        require('./css/videojs-ima.css');
    }
    if (deps['videojs-contrib-dash'])
    {
        window.dashjs = {
            MediaPlayer: require('@hola.org/dashjs/dist/dash.mediaplayer.debug.js'),
        };
        require('videojs-contrib-dash');
    }
    if (deps.dvr)
    {
        require('./dvr.js');
        require('./css/dvr.css');
    }
    if (deps.share)
    {
        require('./share.js');
        require('./css/share.css');
    }
    if (deps.next)
    {
        require('./next.js');
        require('./css/next.css');
    }
    if (deps.series)
    {
        require('./series.js');
        require('./css/series.css');
    }
    if (deps.custom)
    {
        require('./custom.js');
    }
    if (deps.hotkeys)
    {
        require('./hotkeys.js');
    }
    if (deps['videojs-watermark'])
    {
        require('videojs-watermark');
        require('./css/videojs-watermark.css');
    }
}

function Player(element, opt, ready_cb){
    E.log.info('init Spark Player v'+E.VERSION);
    this.ready_cb = ready_cb;
    this.opt = opt;
    this.element = this.init_element(element);
    this.vjs = this.init_vjs();
    this.tech_call_rewrites = {};
    this.vjs.hola = this.vjs.hola||{};
    this.vjs.hola.tech_call = this.tech_call.bind(this);
    E.players[this.id = this.vjs.id()] = this;
}

Player.prototype.init_element = function(element){
    var opt = this.opt;
    if (element.tagName=='VIDEO')
    {
        element.autoplay = false;
        element.controls = false;
        // with Spark Player wrapper there is no autoSetup mode
        element.removeAttribute('data-setup');
        if (opt.poster)
            element.poster = opt.poster;
        // XXX bahaa: find a better solution
        reset_native_hls(element, opt.sources);
    }
    else
    {
        // special case when using a div container or flash object - create
        // video tag instead
        var style = window.getComputedStyle(element);
        var attrs = {
            id: util.unique_id('hola_player'),
            class: 'video-js',
            preload: opt.preload||'auto',
        };
        var auto_height = !opt.height || isNaN(opt.height);
        var auto_width = !opt.width || isNaN(opt.width);
        if (!auto_height)
            attrs.height = opt.height||parseFloat(style.height);
        if (!auto_width)
            attrs.width = opt.width||parseFloat(style.width);
        if (opt.poster)
            attrs.poster = opt.poster;
        var videoel = videojs.createEl('video', {}, attrs);
        if (auto_width)
            videoel.style.width = '100%';
        if (auto_height)
            videoel.style.height = '100%';
        videojs.appendContent(videoel, opt.sources.map(function(source){
            return videojs.createEl('source', {}, source);
        }));
        videoel.style.position = style.position=='static' ?
            'relative' : style.position;
        videoel.style.left = style.left;
        videoel.style.top = style.top;
        // $(videoel).insertAfter(element);
        element.parentNode.insertBefore(videoel, element.nextSibling);
        element.style.display = 'none';
        element.hola_player = this;
        element = videoel;
    }
    if (!element.id)
        element.id = util.unique_id('hola_player');
    element.setAttribute('playsinline', '');
    // disable forced native controls in Facebook Instant Articles
    element.setAttribute('data-fb-disable-controls', '');
    element.hola_player = this;
    return element;
};

Player.prototype.add_languages = function(){
    var player_conf = get_spark_conf().player;
    var strings = player_conf&&player_conf.strings, langs;
    try {
        langs = strings&&JSON.parse(strings);
    } catch(e){}
    if (!langs)
        return;
    for (var key in langs)
    {
        if (langs[key] && typeof langs[key]=='object')
            videojs.addLanguage(key, langs[key]);
    }
};

Player.prototype.init_vjs = function(){
    var opt = this.opt, cb = this.ready_cb, hola_player = this;
    var vjs_opt = this.get_vjs_opt();
    load_deps({
        'videojs-settings': !!vjs_opt.plugins.settings,
        'videojs-hola-skin': !!vjs_opt.plugins.hola_skin,
        'videojs-thumbnails': !!opt.thumbnails || opt.thumbnails===undefined,
        'videojs-contrib-ads': !!opt.ads,
        'videojs-ima': !!opt.ads,
        'videojs-contrib-dash': opt.sources.some(is_dash),
        dvr: opt.dvr,
        custom: opt.custom,
        hotkeys: opt.hotkeys,
        next: opt.next,
        series: opt.series,
        'videojs-watermark': !!vjs_opt.plugins.watermark,
    });
    var element = this.element;
    this.add_languages();
    return videojs(this.element, vjs_opt, function(){
        var player = this;
        // enable tap events to make popup menu and ads work correctly
        player.emitTapEvents();
        if (player.tech_ && opt.controls)
            player.controls(true);
        if (opt.thumbnails)
            player.thumbnails(opt.thumbnails);
        hola_player.init_ads(player);
        hola_player.init_captions(player, element);
        // call init_watermark after watermark plugin was initialized
        setTimeout(function(){ hola_player.init_watermark(player, opt); });
        player.on('pause', function(e){
            if (player.scrubbing()) // XXX bahaa: do we need this?
                e.stopImmediatePropagation();
        }).on('fullscreenchange', function(e){
            var orientation = window.screen && window.screen.orientation;
            // ios doesn't support orientation api
            if (!videojs.browser.IS_ANDROID || !orientation ||
                !orientation.lock)
            {
                return;
            }
            if (player.isFullscreen())
            {
                orientation.lock(player.videoWidth()>player.videoHeight() ?
                    'landscape' : 'portrait');
            }
            else
                orientation.unlock();
        }).on('save_logs', function(e){
            // XXX bahaa: TODO
        }).on('problem_report', function(e){
            // XXX bahaa: TODO
        }).on('cdn_graph_overlay', on_cdn_graph_overlay);
        if (cb)
            try { cb(player); } catch(e){ E.log.error(e.stack||e); }
        if (opt.autoplay)
        {
            util.can_autoplay(function(res){
                E.log.info('can autoplay: '+res);
                if (!res || opt.autoplay=='sound'&&res!='sound')
                    return;
                if (res=='muted')
                    player.muted(true);
                player.play();
                player.autoplay(true);
            });
        }
    }).on('error', function (){
        var player = this;
        var error = player.error;
        if (!error || error.code!=error.MEDIA_ERR_SRC_NOT_SUPPORTED)
            return;
        var only_flash = opt.sources.every(function(s){
            return mime.is_hds_link(s.src) || mime.is_flv_link(s.src);
        });
        var flash = videojs.getTech('Flash');
        var modal = player.getChild('errorDisplay');
        if (modal && only_flash && (!flash || !flash.isSupported()))
        {
            modal.fillWith(player.localize(
                'Flash plugin is required to play this media'));
           E.log.error('flash plugin is required');
        }
    });
};

function on_cdn_graph_overlay(){
    var hola_cdn = window.hola_cdn;
    var bws = hola_cdn && hola_cdn._get_bws();
    if (window.cdn_graph || !bws || hola_cdn._get_mode()!='cdn')
        return;
    try {
        var gopt = {
            graph: 'newgraph_progress_mode_highlight_tips',
            player_obj: bws.player,
            video: bws.player.vjs
        };
        var url = 'https://player.h-cdn.com'+
            hola_cdn.require.zdot('cdngraph_js');
        hola_cdn.util.load_script(url, function(){
            window.cdn_graph.init(gopt, bws, hola_cdn); });
    } catch(err){ E.log.error(err.stack||err); }
}

Player.prototype.get_settings_opt = function(){
    var opt = this.opt, s = opt.settings;
    if (s===false)
        return;
    s = videojs.mergeOptions({
        graph: opt.graph,
        volume: opt.volume,
        embed_code: opt.embed_code,
        copy_url: opt.copy_url,
        copy_url_with_time: opt.copy_url_with_time,
    }, s);
    var sources = opt.sources && opt.sources.filter(function(source){
        return !is_adaptive(source);
    });
    if (s.quality!==false)
        s.quality = {sources: sources};
    return s;
};

Player.prototype.get_vjs_opt = function(){
    var opt = this.opt;
    var origin_opts = this.opt['data-setup']||{};
    if (origin_opts && typeof origin_opts=='string')
    {
        try {
            origin_opts = JSON.parse(origin_opts);
        } catch(e){}
    }
    // XXX: maybe we should merge all data-setup conf with vjs_opt
    origin_opts = _.pick(origin_opts, ['playbackRates']);
    var is_mobile = videojs.browser.IS_ANDROID || videojs.browser.IS_IOS;
    var class_name = is_mobile&&!opt.use_desktop_skin ? 'vjs-ios-skin' :
        undefined;
    return videojs.mergeOptions({
        sources: opt.sources,
        // XXX arik: unite swf to one
        osmf: {swf: opt.osmf_swf||
            opt.base_url+'/videojs-osmf.swf?customer='+customer
        },
        flash: {
            swf: opt.swf||opt.base_url+'/videojs.swf?customer='+customer,
            accelerated: opt.accelerated,
        },
        html5: {
            hlsjsConfig: {
                debug: false,
                fragLoadingLoopThreshold: 1000,
                manifestLoadingTimeOut: 20*1000,
                manifestLoadingMaxRetry: 4,
                levelLoadingTimeOut: 20*1000,
                levelLoadingMaxRetry: 4,
                xhrSetup: opt.withCredentials && function(xhr){
                    xhr.withCredentials = true;
                },
            },
            nativeTextTracks: false,
        },
        inactivityTimeout: opt.inactivity_timeout===undefined ?
            2000 : opt.inactivity_timeout,
        poster: opt.poster,
        loop: opt.loop,
        muted: opt.muted,
        preload: opt.preload,
        language: opt.force_language,
        techOrder:
            (opt.tech=='flash' ? ['flash', 'html5'] : ['html5', 'flash'])
            .concat('osmf'),
        tooltips: true,
        plugins: {
            settings: this.get_settings_opt(),
            dvr: opt.dvr,
            custom: opt.custom,
            hotkeys: opt.hotkeys,
            next: opt.next,
            series: opt.series,
            watermark: opt.watermark,
            hola_skin: opt.skin ? false : {
                css: false,
                className: class_name,
                show_controls_before_start: opt.show_controls_before_start,
                show_time_for_live: opt.show_time_for_live,
                play_button_color: opt.play_button_color,
                seek_bar_color: opt.seek_bar_color,
                title: opt.title,
                hide_skip_buttons: opt.hide_skip_buttons,
            },
        },
        // hola-custom component configuration
        errorDisplay: {ignoreErr: opt.hide_err_display},
    }, origin_opts, opt.videojs_options);
};

function get_existing_handler(list, method, fn) {
    if (!list || !list[method])
        return;
    return list[method].filter(function(handler){
        return handler==fn; })[0];
}

Player.prototype.add_rewrite = function(method, fn){
    var handlers = this.tech_call_rewrites[method];
    if (get_existing_handler(handlers, method, fn))
        return;
    if (!handlers)
        handlers = this.tech_call_rewrites[method] = [];
    handlers.push(fn);
};

Player.prototype.remove_rewrite = function(method, fn){
    var handlers = this.tech_call_rewrites[method];
    var existing = get_existing_handler(handlers, method, fn);
    if (!existing)
        return;
    var index = handlers.indexOf(existing);
    if (index>=0)
        handlers.splice(index, 1);
};

Player.prototype.tech_call = function(method, arg){
    var handlers = this.tech_call_rewrites[method];
    if (!handlers)
        return false;
    var preventDefault = false;
    handlers.forEach(function(handler){
        if (handler(method, arg))
            preventDefault = true;
    });
    return preventDefault;
};

Player.prototype.init_ads = function(player){
    var opt = this.opt;
    if (!opt.ads)
        return;
    if(!window.google || !window.google.ima)
    {
        util.load_script('https://imasdk.googleapis.com/js/sdkloader/ima3.js',
            this.init_ads.bind(this, player));
        E.log.info('loading imasdk...');
        return;
    }
    if (opt.ads.id3)
        opt.ads.manual = true;
    if (opt.ads.schedule)
        opt.ads.adsResponse = generate_vmap(opt.ads.schedule);
    if (!opt.ads.adTagUrl && !opt.ads.adsResponse && !opt.ads.manual)
        return E.log.error('missing Ad Tag');
    if (!window.google) // missing external <script> or blocked by AdBlocker
        return E.log.error('missing IMA HTML5 SDK');
    if (!player.ads || !player.ima) // shouldn't happen as they're bundled
        return E.log.error('missing ad modules');
    player.ima(videojs.mergeOptions({
        id: player.id(),
        vjsControls: true,
        contribAdsSettings: {
            prerollTimeout: 10000,
            postrollTimeout: 1000,
            disablePlayContentBehindAd: true,
        },
    }, opt.ads));
    E.log.info('init ima plugin');
    if (player.ima.adContainerDiv)
    {
        player.ima.adContainerDiv.style.cursor = 'pointer';
        // XXX andrey: workaround for an old android versions (4.4) where click
        // on imasdk iframe doesn't start the video. Need to check whether
        // we can enable it by default
        if (opt.ads.hideAdContainer)
            player.ima.adContainerDiv.style.display = 'none';
    }
    function init(e){
        player.off(['tap', 'click', 'play'], init);
        if (player.ima.adContainerDiv)
        {
            player.ima.adContainerDiv.style.cursor = '';
            if (opt.ads.hideAdContainer)
                player.ima.adContainerDiv.style.display = 'block';
        }
        E.log.info('init ad container');
        player.ima.initializeAdDisplayContainer();
        if (opt.ads.manual)
        {
            player.trigger('nopreroll');
            player.trigger('adsready');
        }
        else
            player.ima.requestAds();
        if (e && e.type!='play')
            player.play();
    }
    function get_ima(){
        var ima = player.ima;
        if (!ima || !ima.adsActive)
            return;
        return ima;
    }
    function handle_play_pause(method, arg){
        var ima = get_ima();
        // proceed with default action if no ima active
        if (!ima)
            return;
        if (method=='play')
        {
            if (ima.adPlaying)
                return true;
            E.log.info('resume ad');
            ima.resumeAd();
        }
        if (method=='pause')
        {
            if (!ima.adPlaying)
                return true;
            E.log.info('pause ad');
            ima.pauseAd();
        }
        return true;
    }
    this.add_rewrite('play', handle_play_pause);
    this.add_rewrite('pause', handle_play_pause);
    if (player.paused())
        player.on(['tap', 'click', 'play'], init);
    else
        init();
    if (opt.ads.id3)
        init_ads_id3(player);
};

Player.prototype.init_captions = function(player, element){
    if (!element || !element.textTracks || !player)
        return;
    var tt = element.textTracks;
    // native text tracks are not working in IE10
    if (!tt || !tt.addEventListener)
      return;
    // push native text tracks to simulated vjs text tracks
    var hook = function(obj, method, fn){
        var orig = obj[method];
        obj[method] = function(){
            fn.apply(this, arguments);
            return orig.apply(this, arguments);
        };
    };
    tt.addEventListener('addtrack', function(e){
        var track = e&&e.track;
        if (!track)
            return;
        var opt = {
            kind: track.kind,
            label: track.label,
            language: track.language,
            mode: track.mode,
        };
        opt['default'] = track['default'];
        E.log.info('add text track');
        var new_track = player.addRemoteTextTrack(opt).track;
        for (var i=0; i<track.cues.length; i++)
            new_track.addCue(track.cues[i]);
        hook(track, 'addCue', function(cue){
            for (var i=0; i<new_track.cues.length; i++)
            {
                if (new_track.cues[i].startTime==cue.startTime &&
                    new_track.cues[i].text==cue.text)
                {
                    new_track.removeCue(new_track.cues[i]);
                }
            }
            new_track.addCue(cue);
        });
        hook(track, 'removeCue', function(cue){ new_track.removeCue(cue); });
    });
};

Player.prototype.init_watermark = function(player, opt){
    var controls_opt, tooltip, img;
    if (controls_opt = opt.controls_watermark)
    {
        if (typeof controls_opt=='string')
            controls_opt = {image: controls_opt};
        var el = player.getChild('controlBar').addChild('controlsWatermark',
            controls_opt).el();
        if ((tooltip = controls_opt.tooltip) &&
            (img = el.querySelector('img')))
        {
            img.alt = tooltip;
        }
    }
    if (!(tooltip = opt.watermark && opt.watermark.tooltip) ||
        !(img = player.el().querySelector('.vjs-watermark-content img')))
    {
        return;
    }
    img.alt = tooltip;
    img.title = tooltip;
};

function format_time(t){
    if (!isFinite(t))
        return;
    var hh = Math.floor(t/3600);
    t = t%3600;
    var mm = Math.floor(t/60);
    var ss = t%60;
    hh = hh<10 ? '0'+hh : hh;
    mm = mm<10 ? '0'+mm : mm;
    ss = ss<10 ? '0'+ss.toFixed(3) : ss.toFixed(3);
    return hh+':'+mm+':'+ss;
}

function generate_vmap(schedule){
    if (!Array.isArray(schedule))
        return void E.log.error('ads.schedule param must be an array');
    var vmap = '<?xml version="1.0" encoding="UTF-8"?>\n<vmap:VMAP '+
        'xmlns:vmap="http://www.iab.net/videosuite/vmap" version="1.0">\n';
    for (var i=0; i<schedule.length; i++)
    {
        var ad = schedule[i];
        var time = ad.time=='start'||ad.time=='end' ? ad.time :
            format_time(ad.time);
        if (!time)
            return void E.log.error('wrong ad time format');
        if (!ad.tag)
            return void E.log.error('ad tag not found');
        var type = ad.type || 'linear,nonlinear';
        vmap +=
        ' <vmap:AdBreak timeOffset="'+time+'" breakType="'+type+'">\n'+
        '  <vmap:AdSource allowMultipleAds="false" followRedirects="true">\n'+
        '   <vmap:AdTagURI templateType="vast3">\n'+
        '    <![CDATA['+ad.tag+']]>\n'+
        '   </vmap:AdTagURI>\n'+
        '  </vmap:AdSource>\n'+
        ' </vmap:AdBreak>\n';
    }
    return vmap+'</vmap:VMAP>';
}

function init_ads_id3(player){
    var cues = [], played_cues = {};
    player.on('timeupdate', function(){
        var cur = player.currentTime();
        cues.forEach(function(cue){
            if (played_cues[cue.time] || cur<cue.time || cur-cue.time>0.5)
                return;
            player.ima.playAd(cue.ad);
            played_cues[cue.time] = true;
        });
    });
    player.tech_.on('parsedmetadata', function(e, data){
        var sample = data && data.samples && data.samples[0];
        var tags = id3.parse_id3(sample.data||sample.unit);
        var ad = tags.TXXX && tags.TXXX.adID;
        if (ad && cues.indexOf(sample.dts)<0)
        {
            cues.push({ad: ad, time: sample.dts});
            player.trigger('ads-cuepoints', _.map(cues, 'time'));
        }
    });
}

function is_hls(s){
    return mime.is_hls_link(s.src) || mime.is_hls_type(s.type);
}

function is_dash(s){
    return mime.is_dash_link(s.src) || mime.is_dash_type(s.type);
}

function is_hds(s){
    return mime.is_hds_link(s.src) || mime.is_hds_type(s.type);
}

function is_adaptive(s){
    return is_hls(s) || is_dash(s) || is_hds(s);
}

function reset_native_hls(el, sources){
    // not using el.currentSrc because it might not be selected yet.
    if (!el.canPlayType('application/x-mpegurl') || !sources.some(is_hls))
        return;
    // if source is hls and browser supports hls natively reset video element
    // so videojs will select our hls source handler instead of native.
    el.src = '';
    el.load();
}

function load_cdn_loader(){
    if (!customer)
        return;
    if (document.querySelector('script[src*="//player.h-cdn.com/loader"]'))
    {
        E.log.warn('Spark loader.js is included with Spark Player. '
            +'There is no need to load it separately');
        return;
    }
    E.log.info('Adding CDN loader...');
    util.load_script('https://player.h-cdn.com/loader.js?customer='+customer,
        undefined, {async: true, crossOrigin: 'anonymous'});
}

function license_init(){
    if (Math.random()>0.1)
        return;
    var xhr = new XMLHttpRequest();
    var script = util.current_script();
    var opt = {
        v: E.VERSION,
        loader: window.hola_cdn && window.hola_cdn.ver,
        hls: window.Hls && window.Hls.version,
        customer: customer,
        hosted: !script || !script.src.match(/^(https?:)?\/\/\w*\.h-cdn\.com/),
        url: get_top_url(),
    };
    var qs = Object.keys(opt)
        .filter(function(key){ return !!opt[key]; })
        .map(function(key){ return key+'='+encodeURIComponent(opt[key]); })
        .join('&');
    xhr.open('GET', 'https://perr.h-cdn.com/hola_player/license_init?'+qs);
    xhr.send();
}

function pad(num, size){
    return ('000'+num).slice(-size);
}

function date_str(){
    var d = new Date();
    return pad(d.getUTCFullYear(), 4)+'-'+pad(d.getUTCMonth()+1, 2)
    +'-'+pad(d.getUTCDate(), 2)
    +' '+pad(d.getUTCHours(), 2)+':'+pad(d.getUTCMinutes(), 2)
    +':'+pad(d.getUTCSeconds(), 2)
    +'.'+pad(d.getUTCMilliseconds(), 3);
}

function log(type, msg){
    if (type=='info' && !E.debug)
        return;
    console[type=='info' ? 'log' : type](date_str()+' hola_player: '+msg);
}

function get_top_url(){
    return window.top==window ? location.href : document.referrer;
}
