import { MarkdownThemeContext } from '../../../theme/index.js';
import { ReflectionGroup, ReflectionKind } from 'typedoc';
export declare function groups(this: MarkdownThemeContext, model: ReflectionGroup[], options: {
    headingLevel: number;
    kind: ReflectionKind;
}): string;
