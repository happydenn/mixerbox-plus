// ==UserScript==
// @name         MixerBox+
// @namespace    https://github.com/happydenn/mixerbox-plus
// @version      0.2.0
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
  console.log('MixerBox+ by happydenn. Version 0.2.0 (20170517)');
  console.log('MixerBox loaded.');

  var iframe = document.getElementById('MB-player-iframe');

  if (!iframe) {
    return;
  }

  iframe.setAttribute('allowfullscreen', '');
  setInterval(detectPlaylistItems, 350);
}

function detectPlaylistItems() {
  var result = document.querySelectorAll('.playlist-item-container:not(.mbplus-annotated)');

  if (result.length === 0) {
    return;
  }

  result.forEach(function(playlist) {
    var songRows = playlist.querySelectorAll('.song-row');

    songRows.forEach(function(row) {
      var imgEl = row.querySelector('.thumbnailContainer > img');
      var videoId = imgEl.src.match(/.+:\/\/i\.ytimg\.com\/vi\/(.+)\/hqdefault\.jpg/i)[1];

      var titleEl = row.querySelector('.title');
      var mp3Button = createDownloadMP3Button(videoId);
      titleEl.appendChild(mp3Button);
    });

    playlist.classList.add('mbplus-annotated');
  });
}

function createDownloadMP3Button(videoId) {
  var mp3Button = document.createElement('a');
  mp3Button.setAttribute('href', '#');
  mp3Button.textContent = 'Download MP3';

  mp3Button.style.marginLeft = '10px';
  mp3Button.style.display = 'inline-block';
  mp3Button.style.borderBottom = '1px dotted #37b9eb';
  mp3Button.style.color = '#37b9eb';

  mp3Button.addEventListener('click', function(event) {
    event.preventDefault();
    event.stopPropagation();
    window.open('https://www.youtubeinmp3.com/fetch/?video=' + encodeURIComponent('https://www.youtube.com/watch?v=' + videoId));
  });

  return mp3Button;
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
