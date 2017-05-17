import startMixerBoxMainScript from './mixerbox-main';
import startPlayerIframeScript from './player-iframe';

if (window.location.host.includes('cdn-network1.com')) {
  startPlayerIframeScript();
} else if (window.location.host.includes('mixerbox.com')) {
  startMixerBoxMainScript();
}
