import { createDownloadMP3Button } from './youtubeinmp3';

let playerIframe;

export default function startMixerBoxMainScript() {
  console.log('MixerBox+ loaded.');
  playerIframe = document.getElementById('MB-player-iframe');

  if (!playerIframe) {
    return;
  }

  playerIframe.setAttribute('allowfullscreen', '');
  setInterval(detectPlaylistItems, 350);
}

function detectPlaylistItems() {
  const result = document.querySelectorAll('.playlist-item-container:not(.mbplus-annotated)');

  if (result.length === 0) {
    return;
  }

  result.forEach((playlist) => {
    const songRows = playlist.querySelectorAll('.song-row');

    songRows.forEach((row) => {
      const imgEl = row.querySelector('.thumbnailContainer > img');
      const videoId = imgEl.src.match(/.+:\/\/i\.ytimg\.com\/vi\/(.+)\/hqdefault\.jpg/i)[1];

      const titleEl = row.querySelector('.title');
      const mp3Button = createDownloadMP3Button(videoId);
      titleEl.appendChild(mp3Button);
    });

    playlist.classList.add('mbplus-annotated');
  });
}
