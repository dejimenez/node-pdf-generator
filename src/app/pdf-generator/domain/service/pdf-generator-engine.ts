import { PaperFormat } from "../../../shared/domain/paper-format";

export interface PdfGeneratorEngine {
  generate: (html: string, format: PaperFormat) => Promise<Buffer>;
}