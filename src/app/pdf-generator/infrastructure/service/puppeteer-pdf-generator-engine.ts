import { launch, PaperFormat } from 'puppeteer';
import { Injectable } from '../../../../core';
import { PdfGeneratorEngine } from '../../domain/service/pdf-generator-engine';

@Injectable()
export class PuppeteerPdfGeneratorEngine implements PdfGeneratorEngine {
  async generate(html: string, format: PaperFormat = 'a4') {
    const browser = await launch({ headless: true });
    const page = await browser.newPage();
    await page.setContent(html, {
      waitUntil: ['domcontentloaded', 'networkidle0'],
    });
    const pdf = await page.pdf({ format });

    await browser.close();
    return pdf;
  }

  async generateFromUrl(url: string, format: PaperFormat = 'a4') {
    const browser = await launch({ headless: true });
    const page = await browser.newPage();
    await page.goto(url, {
      waitUntil: 'networkidle0',
    });
    const pdf = await page.pdf({ format });

    await browser.close();
    return pdf;
  }

  private getRenderCode(content: string, opts: any) {
    const packages = opts.packages.map((gPackage: string) => {
      return `'${gPackage}',`;
    });
    return `
  <div id="chart_div" style="width: ${opts.width}; height: ${opts.height};"></div>
  <script type="text/javascript" src="https://www.gstatic.com/charts/loader.js"></script>
  <script type="text/javascript">
    const container = document.getElementById('chart_div');
    google.charts.load('current', {
      packages:[${packages}],
      mapsApiKey: '${opts.mapsApiKey}',
    });
    google.charts.setOnLoadCallback(getDrawChart());
    function getDrawChart() {
      const drawChartFn = function(window, document) {
        ${content}
        if (typeof drawChart === 'function') {
          drawChart();
        }
        if (typeof chart !== 'undefined') {
          return chart;
        }
      }
      return function() {
        window.chart = drawChartFn({}, {
          getElementById: () => { return container; },
        });
      }
    }
  </script>
  `;
  }

  async renderGoogleChart(contentRaw: any, optsRaw: any) {
    let content = contentRaw;
    if (typeof contentRaw === 'function') {
      content = contentRaw.toString();
    }

    let opts = Object.assign(
      {
        packages: ['corechart'],
        mapsApiKey: '',
        width: '100%',
        height: '100%',
      },
      optsRaw || {}
    );

    const browser = await launch();

    const page = await browser.newPage();

    page.on('pageerror', function (err: any) {
      console.log('Page error: ' + err.toString());
    });

    const renderCode = this.getRenderCode(content, opts);
    await page.setContent(renderCode);

    const imageBase64 = await page.evaluate(() => {
      if (
        !(window as any).chart ||
        typeof (window as any).chart.getImageURI === 'undefined'
      ) {
        return null;
      }
      return (window as any).chart.getImageURI();
    });

    let buf;
    if (imageBase64) {
      // Exported the chart via Google Charts API.
      buf = Buffer.from(
        imageBase64.slice('data:image/png;base64,'.length),
        'base64'
      );
    } else {
      const elt = await page.$('#chart_div');
      // Chart doesn't support export, take a screenshot
      buf = await elt?.screenshot();
    }

    await browser.close();

    return buf;
  }
}
