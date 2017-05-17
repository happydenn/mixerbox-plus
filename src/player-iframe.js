let player;

export default function startPlayerIframeScript() {
  window.onYouTubeIframeAPIReady = () => {
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

    player = window.MBYTPlayer;

    player.addEventListener('onStateChange', (event) => {
      if (event.data === YT.PlayerState.PLAYING) {
        const levels = player.getAvailableQualityLevels();
        const currentLevel = player.getPlaybackQuality();

        if (levels[0] !== currentLevel) {
          console.log('Automatically changing quality level to ' + levels[0]);
          player.setPlaybackQuality(levels[0]);
        }
      }
    });
  };
}
