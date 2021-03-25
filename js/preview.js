const DEFAULT_IMAGE_PREVIEW_PATH = 'img/muffin-grey.svg';
const PHOTO_PREVIEW_WIDTH = 70;
const PHOTO_PREVIEW_HEIGHT = 70;
const ALLOWED_FILE_TYPES = [
  'gif',
  'jpg',
  'jpeg',
  'png',
];

const avatarFileChooseElement = document.querySelector('#avatar');
const avatarPreviewElement = document.querySelector('.ad-form-header__preview img');
const housePhotoFileElement = document.querySelector('#images');
const housePhotoElement = document.querySelector('.ad-form__photo');
const housePhotoPreviewElement = document.createElement('img');

housePhotoPreviewElement.with = PHOTO_PREVIEW_WIDTH;
housePhotoPreviewElement.height = PHOTO_PREVIEW_HEIGHT;

housePhotoElement.appendChild(housePhotoPreviewElement);

const uploadImage = (fileInput, image) => {
  fileInput.addEventListener('change', () => {
    const [file] = fileInput.files;
    const fileName = file.name.toLowerCase();

    const matches = ALLOWED_FILE_TYPES.some((fileType) => fileName.endsWith(fileType));

    if (!matches) {
      return;
    }

    const fileReader = new FileReader();
    fileReader.addEventListener('load', () => {
      image.src = fileReader.result;
    });

    fileReader.readAsDataURL(file);
  });
}

export const resetPreviewImage = () => {
  avatarFileChooseElement.value = '';
  housePhotoFileElement.value = '';

  avatarPreviewElement.src = DEFAULT_IMAGE_PREVIEW_PATH;
  housePhotoPreviewElement.src = '';
};

uploadImage(avatarFileChooseElement, avatarPreviewElement);
uploadImage(housePhotoFileElement, housePhotoPreviewElement);
