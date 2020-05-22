/**
 * Set up webcam
 * 
 * @param  {HTMLVideoElement} webcam
 * @return {Promise<void>}
 */
export default async function(webcam) {
  try {
    const stream = await navigator.mediaDevices.getUserMedia({
      video: {
        facingMode: 'environment'
      },
      audio: false
    });
    webcam.srcObject = stream;
    await new Promise(resolve => {
      webcam.addEventListener('loadedmetadata', () => {
        webcam.play();
        resolve();
      });
    });
  } catch (error) {
    alert(error);
    throw error;
  }
}
