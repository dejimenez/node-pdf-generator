import { get, registerProvider } from '../../../../../src/core';

import { PDF_GENERATOR_ENGINE } from '../../../../../src/app/pdf-generator/constants';
import { PuppeteerPdfGeneratorEngine } from '../../../../../src/app/pdf-generator/infrastructure/service/puppeteer-pdf-generator-engine';

import fs from 'fs';
import path from 'path';

const readPdfInfo = (pdfBuffer: Buffer) => {
  return new Promise((resolve, reject) => {
    var PdfReader = require('pdf2json/pdfparser');
    const pdfParser = new PdfReader();

    pdfParser.on('pdfParser_dataError', (error: any) => {
      reject(error);
    });

    pdfParser.on('pdfParser_dataReady', function (pdfData: any) {
      resolve(pdfData);
    });

    pdfParser.parseBuffer(pdfBuffer, 0);
  });
};

describe('GeneratePdfFromTemplatePostController', () => {
  let puppeteerPdfGeneratorEngine: PuppeteerPdfGeneratorEngine;

  beforeAll(async () => {
    registerProvider(PDF_GENERATOR_ENGINE, PuppeteerPdfGeneratorEngine);
    puppeteerPdfGeneratorEngine = get(PDF_GENERATOR_ENGINE);
  });

  it('should be defined', () => {
    expect(puppeteerPdfGeneratorEngine).toBeDefined();
  });

  it('should generate a pdf', async () => {
    const pdf = fs.readFileSync(path.resolve(__dirname, 'test.pdf'));
    const builtTemplate = '<p>Name</p><p>Try other thing</p>';

    const pdfInfo1 = await readPdfInfo(pdf);

    const result = await puppeteerPdfGeneratorEngine.generate(builtTemplate);
    const pdfInfo2 = await readPdfInfo(result);

    expect(pdfInfo1).toEqual(pdfInfo2);
  });
});
