/**
 * Set up image control
 * 
 * @return {void}
 */
export default function(callback) {
  document.querySelectorAll('[action-select-image]').forEach(element => {
    element.addEventListener('click', async event => {
      const image = event.target;
      const menu = image.parentNode;
      const selectedMenu = document.querySelector('#stripContainer .selected');
      if (menu === selectedMenu) return;
      selectedMenu.classList.remove('selected');
      menu.classList.add('selected');
      await callback(image.getAttribute('src'));
    });
  });
  document.querySelector('[action-upload-image]').addEventListener('change', async event => {
    if (!event.target.files.length) return;
    await callback(event.target.files[0]);
  });
  // Show main image
  const firstImage = document.querySelector('#stripContainer .selected img');
  document.querySelector('#image').setAttribute('src', firstImage.getAttribute('src'));
}
