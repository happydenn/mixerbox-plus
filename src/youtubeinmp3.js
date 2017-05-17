export function createDownloadMP3Button(videoId) {
  const mp3Button = document.createElement('a');
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
