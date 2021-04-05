import { default as templateModule } from './template';
import { default as pdfGeneratorModule } from './pdf-generator';

export default () => {
  templateModule();
  pdfGeneratorModule();
};
