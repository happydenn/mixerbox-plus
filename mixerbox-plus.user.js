// ==UserScript==
// @name         MixerBox+
// @namespace    https://github.com/happydenn/mixerbox-plus
// @version      0.1
// @description  Custom controls for MixerBox Web.
// @author       happydenn
// @grant        none
// @match        *://www.mixerbox.com/*
// @match        *://spider1.cdn-network1.com/*
// ==/UserScript==

function initScript() {
  if (window.location.host.includes('cdn-network1.com')) {
    onPlayerFrameLoaded();
  } else if (window.location.host.includes('mixerbox.com')) {
    onMixerBoxLoaded();
  }
}

function onMixerBoxLoaded() {
  console.log('MixerBox+ by happydenn. Version 0.1 (20170517)');
  console.log('MixerBox loaded.');

  var iframe = document.getElementById('MB-player-iframe');

  if (!iframe) {
    return;
  }

  iframe.setAttribute('allowfullscreen', '');
}

function onPlayerFrameLoaded() {
  console.log('Player frame loaded.');

  window.onYouTubeIframeAPIReady = function() {
    window.MBYTPlayer = new YT.Player('yt-player-div', {
      height: '100%',
      width: '100%',
      playerVars: {
        'playsinline': 1,
        'controls': 1,
        'showinfo': 0,
        'rel': 0,
        'start': 0,
        'enablejsapi': 1,
        'iv_load_policy': 3,
        'origin': window.MB_DOMAIN_NAME
      },
      events: {
        'onReady': window.onPlayerReady,
        'onStateChange': window.onPlayerStateChange,
        'onError': window.onPlayerError
      }
    });

    var player = window.MBYTPlayer;

    player.addEventListener('onStateChange', function(event) {
      if (event.data === YT.PlayerState.PLAYING) {
        var levels = player.getAvailableQualityLevels();
        var currentLevel = player.getPlaybackQuality();

        if (levels[0] !== currentLevel) {
          console.log('Automatically changing quality level to ' + levels[0]);
          player.setPlaybackQuality(levels[0]);
        }
      }
    });
  };
}

initScript();
