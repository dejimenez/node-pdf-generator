export const TEMPLATE_IMAGE_REPOSITORY = 'TemplateImageRepository';
export const TEMPLATE_IMAGE_STORAGE_SERVICE = 'TemplateImageStorageService';
export const TEMPLATE_IMAGE_CONTROLLER_PATH = 'template-image';
export const TEMPLATE_IMAGE_UPLOAD_URL = 'TemplateImageUploadUrl';
export const TEMPLATE_IMAGE_CREATE = 'TemplateImageCreate';
export const TEMPLATE_IMAGE_LIST = 'TemplateImageList';
export const TEMPLATE_IMAGE_REMOVE = 'TemplateImageRemove';
export const TEMPLATE_IMAGE_WITH_VALID_URL = 'TemplateImageWithValidUrl';
export const MAX_EXPIRATION_TIME_IN_DAYS = 7;
// Here subtract 10 seconds to the expiration time 
// because the expiration date was giving error related to the maximum
// value allowed = 7 days => 604800 seconds
export const URL_EXPIRATION_TIME_RENOVATION = (24 * 60 * 60 - 10) * 1000; 