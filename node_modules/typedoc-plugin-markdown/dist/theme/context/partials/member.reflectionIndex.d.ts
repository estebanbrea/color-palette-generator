import { MarkdownThemeContext } from '../../../theme/index.js';
import { DeclarationReflection, ProjectReflection } from 'typedoc';
export declare function reflectionIndex(this: MarkdownThemeContext, model: ProjectReflection | DeclarationReflection, options: {
    headingLevel: number;
}): string;
