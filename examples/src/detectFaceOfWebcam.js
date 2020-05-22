import { FaceDetector } from 'xtejs-detection';
import setupWebcam from '~/shared/setupWebcam';
import '~/styles/detectFaceOfWebcam.css';

(async() => {

  // Open web camera
  await setupWebcam(document.querySelector('#webcam'));

  // Attach the face detector
  const detector = new FaceDetector(document.querySelector('#webcam'));
  await detector.attach({ models: 'dist/models' });

  // Detector event listeners
  detector.on('detected', results => {
    // Draw face bounding box
    for (let result of results || []) result.drawFaceRect();
  });

  // Start face detection
  detector.realTimeDetection();

  // Hide loading
  document.querySelector('#loader').style.display = 'none';
})();