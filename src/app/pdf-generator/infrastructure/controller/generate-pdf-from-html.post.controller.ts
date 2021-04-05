import { Body, Controller, Inject, Post } from "../../../../core";
import { GeneratePdfFromHtml } from "../../application/generate-pdf-from-html";
import { PDF_GENERATOR_GENERATE_FROM_HTML } from "../../constants";

@Controller('generate-pdf')
export class GeneratePdfFromHtmlPostController {
  constructor(
    @Inject(PDF_GENERATOR_GENERATE_FROM_HTML)
    private readonly generatePdfFromHtml: GeneratePdfFromHtml
  ) {}

  @Post('html')
  post(@Body('html') html: string, @Body('data') data: any) {
    return this.generatePdfFromHtml.generate(html, data);
  }
}