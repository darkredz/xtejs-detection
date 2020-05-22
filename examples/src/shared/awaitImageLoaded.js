/**
 * Wait for image loading
 * 
 * @param  {HTMLImageElement} image
 * @param  {string} source
 * @return {Promise<void>}
 */
export default async function (image, source) {
  if (source instanceof File) {
    const reader = new FileReader();
    reader.readAsDataURL(source);
    source = await new Promise(resolve => reader.addEventListener('load', () => resolve(reader.result)));
  }
  image.setAttribute('src', source);
  await new Promise(resolve => image.addEventListener('load', resolve, { once: true }));
}
