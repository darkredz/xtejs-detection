import { FaceDetector } from 'xtejs-detection';
import moment from 'moment';
import '~/styles/detectFaceInVideo.css';

(async() => {

  /**
   * Set up video control
   * 
   * @return {void}
   */
  function setupVideoControl() {
    const video = document.querySelector('#video');
    const current = document.querySelector('#current');
    const duration = document.querySelector('#duration');
    const playButton = document.querySelector('[action-play]');
    const progressBar = document.querySelector('#progressBar');
    duration.textContent = moment.utc(video.duration * 1000).format('m:ss');
    video.addEventListener('timeupdate', event => {
      current.textContent = moment.utc(video.currentTime * 1000).format('m:ss');
      progressBar.style.transform = `scaleX(${video.currentTime / video.duration})`;
    });
    playButton.addEventListener('click', () => {
      if (playButton.getAttribute('played') === 'true') {
        // Stop face detection when video stops
        playButton.setAttribute('played', 'false');
        video.pause();
        detector.cancelRealTimeDetection();
      } else {
        // Start face detection when video plays
        playButton.setAttribute('played', 'true');
        video.play();
        detector.realTimeDetection();
      }
    });
  }

  // Set up image control
  setupVideoControl();

  // Attach the face detector
  const detector = new FaceDetector(document.querySelector('#video'));
  await detector.attach({ models: 'dist/models' });

  // Detector event listeners
  detector.on('detected', results => {
    // Draw face bounding box
    for (let result of results || []) result.drawFaceRect();
  });

  // Hide loading
  document.querySelector('#loader').style.display = 'none';
})();