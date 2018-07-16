import musicIcon from './assets/musical-note.svg';

function getYoutubemp3ToFormParams(cb) {
  GM_xmlhttpRequest({
    method: 'GET',
    url: 'http://youtubemp3.to/',

    onload(res) {
      const html = res.responseText;

      const actionMatch = html.match(/<form class="yt1" action="(.+)" method="post">/);
      const action = actionMatch ? actionMatch[1] : null;

      const tokenMatch = html.match(/<input type="hidden" name="formToken" value="(.+)" \/>/);
      const formToken = tokenMatch ? tokenMatch[1] : null;

      if (!action || !formToken) {
        cb(new Error('action or formToken missing'), null);
        return;
      }

      cb(null, { action, formToken });
    },
  });
}

function getYoutubemp3ToResultPage(videoId, params, cb) {
  const youtubeUrl = `https://www.youtube.com/watch?v=${videoId}`;

  GM_xmlhttpRequest({
    method: 'POST',
    url: params.action,
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    data: `videoURL=${encodeURIComponent(youtubeUrl)}&ftype=3&submitForm=Convert&formToken=${params.formToken}&volume=`,
    onload(res) {
      const html = res.responseText;

      if (!html.match(/Your file was successfully converted/)) {
        cb(new Error('convert error'), null);
        return;
      }

      cb(null, html);
    },
  });
}

function getYoutubemp3ToDownloadUrl(videoId, cb) {
  getYoutubemp3ToFormParams((err, params) => {
    if (err) {
      cb(err, null);
      return;
    }

    getYoutubemp3ToResultPage(videoId, params, (err, result) => {
      if (err) {
        cb(err, null);
        return;
      }

      const urlMatch = result.match(/<h1 class="text-center">.+<div class="alert alert-success" role="alert">.+<div class="completed text-center">.+<a href="(.+)" class="button green-bg icon-right">Download<\/a>/);
      const url = urlMatch ? urlMatch[1] : null;

      cb(null, url);
    });
  });
}

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
    const button = this;
    event.preventDefault();
    event.stopPropagation();

    getYoutubemp3ToDownloadUrl(videoId, (err, url) => {
      console.log(url);

      const link = document.createElement('a');
      link.setAttribute('href', url);
      link.textContent = 'MP3';
      link.style.display = 'inline-block';
      link.style.marginLeft = '8px';

      link.addEventListener('click', function(event) {
        event.stopPropagation();
      })

      button.parentNode.appendChild(link);
    });
  });

  return mp3Button;
}
