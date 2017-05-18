import startMixerBoxMainScript from './main';
import startPlayerIframeScript from './player';

if (window.location.host.includes('cdn-network1.com')) {
  startPlayerIframeScript();
} else if (window.location.host.includes('mixerbox.com')) {
  startMixerBoxMainScript();
}
