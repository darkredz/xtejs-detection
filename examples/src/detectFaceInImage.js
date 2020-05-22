import { FaceDetector } from 'xtejs-detection';
import { Template } from 'xtejs-utils';
import awaitImageLoaded from '~/shared/awaitImageLoaded';
import setupImageControl from '~/shared/setupImageControl';
import '~/styles/detectFaceInImage.css';

(async() => {

  /**
   * Detection
   * 
   * @return {void}
   */
  async function detection() {
    const results = await detector.detection();
    JSON.stringify(results, null, '  ');
    // Draw face bounding box
    for (let result of results || []) result.drawFaceRect();
    resultList.innerHTML = template({ results });
  }

  const thumbnails = document.querySelector('#thumbnails');
  const template = Template.compile(document.querySelector('#template').innerHTML);

  // Set up image control
  setupImageControl(async imageSource => {
    await awaitImageLoaded(detector.input, imageSource);
    await detection();
  });

  // Attach the face detector
  const detector = new FaceDetector(document.querySelector('#image'));
  await detector.attach({ models: 'dist/models', motions: true });

  // Detect face
  await detection();

  // Hide loading
  document.querySelector('#loader').style.display = 'none';
})();