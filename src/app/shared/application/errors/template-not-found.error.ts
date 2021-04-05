
export class TemplateNotFoundError extends Error {
  constructor(public readonly templateId: string) {
    super(`[TemplateNotFoundError] The template with id: ${templateId} was not found`);
  }
}
