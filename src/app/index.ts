import { default as templateModule } from './template';
import { default as templateImageModule } from './template-image';
import { default as pdfGeneratorModule } from './pdf-generator';

export default () => {
  templateModule();
  templateImageModule();
  pdfGeneratorModule();
};
