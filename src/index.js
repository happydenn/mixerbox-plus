import startMixerBoxMainScript from './main';
import startPlayerIframeScript from './player';

const { host } = window.location

if (host.includes('cdn-network1.com') || host.includes('webyoutubeplayer.blogspot.com')) {
  startPlayerIframeScript();
} else if (host.includes('mixerbox.com')) {
  startMixerBoxMainScript();
}
