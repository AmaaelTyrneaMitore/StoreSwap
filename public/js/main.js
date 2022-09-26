const reader = new FileReader();
const fileInput = document.querySelector('.img-input');
const imageContainer = document.querySelector('.img-container');
const imageIcon = document.querySelector('.img-icon');
const imageText = document.querySelector('.img-icon+p');
let filename;

reader.onload = (event) => {
  imageContainer.style.backgroundImage = `linear-gradient(rgba(34, 34, 34, 0.6), rgba(34, 34, 34, 0.6)), url(${event.target.result})`;
  imageContainer.style.backgroundSize = 'cover';
  imageContainer.style.backgroundPosition = 'center';
  imageIcon.style.display = 'none';
  imageText.style.color = '#fff';
  imageText.textContent = filename;
};

fileInput.addEventListener('change', (event) => {
  const file = event.target.files[0];
  filename = truncate(file.name);
  reader.readAsDataURL(file);
});

function truncate(string) {
  const [name, extension] = string.split('.');
  if (string.length > 30) {
    return `${name.slice(0, 10)}...${name.slice(-10)}${
      extension ? '.' + extension : ''
    }`;
  }
  return string;
}
