import { compile } from 'handlebars';
import { Injectable } from '../../../../core';
import { TemplateEngine } from '../../domain/service/template-engine';

@Injectable()
export class HandlebarsTemplateEngine implements TemplateEngine {
    build(html: string, data: any) {
        const template = compile(html);
        return template(data);
    }
}
