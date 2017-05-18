import musicIcon from './assets/musical-note.svg';

export function createDownloadMP3Button(videoId) {
  const mp3ButtonIcon = document.createElement('img');
  mp3ButtonIcon.src = musicIcon;
  mp3ButtonIcon.style.width = '18px';
  mp3ButtonIcon.style.height = '18px';
  mp3ButtonIcon.style.verticalAlign = 'middle';

  const mp3Button = document.createElement('a');
  mp3Button.setAttribute('href', '#');
  mp3Button.appendChild(mp3ButtonIcon);
  mp3Button.style.marginLeft = '10px';

  mp3Button.addEventListener('click', function(event) {
    event.preventDefault();
    event.stopPropagation();
    window.open('https://www.youtubeinmp3.com/fetch/?video=' + encodeURIComponent('https://www.youtube.com/watch?v=' + videoId));
  });

  return mp3Button;
}
