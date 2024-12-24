import { MarkdownPageEvent } from '../events/index.js';
import { OutputFileStrategy } from '../options/maps.js';
import { MarkdownThemeContext } from '../theme/index.js';
import { RenderTemplate } from '../types/index.js';
import { DeclarationReflection, DocumentReflection, ProjectReflection, Reflection, ReflectionKind, Renderer, Theme } from 'typedoc';
/**
 * The main theme class for the plugin.
 *
 * The class controls how TypeDoc models are mapped to files and templates and extends TypeDoc's base Theme class.
 *
 * You would typically only be interested in overriding the the theme's render context instance.
 *
 * The API follows the implementation of [TypeDoc's custom theming](https://github.com/TypeStrong/typedoc/blob/master/internal-docs/custom-themes.md) with some minor adjustments.
 *
 * @group Theme Classes
 *
 * @internal
 */
export declare class MarkdownTheme extends Theme {
    constructor(renderer: Renderer);
    /**
     * Renders a template and page model to a string.
     *
     * @internal
     */
    render(page: MarkdownPageEvent<Reflection>, template: RenderTemplate<MarkdownPageEvent<Reflection>>): string;
    /**
     * Creates a new instance of the current theme context.
     *
     * This method can be overridden to provide an alternative theme context.
     */
    getRenderContext(page: MarkdownPageEvent<Reflection>): MarkdownThemeContext;
    /**
     * Maps the models of the given project to the desired output files.
     */
    getUrls(project: ProjectReflection): import("../types/index.js").UrlMapping<Reflection>[];
    /**
     * Map the models of the given project to a navigation structure.
     */
    getNavigation(project: ProjectReflection): import("../types/index.js").NavigationItem[];
    /**
     * @internal
     */
    getTemplateMapping(kind: ReflectionKind, outputFileStrategy?: OutputFileStrategy): any;
    /**
     * @internal
     */
    documentTemplate: (page: MarkdownPageEvent<DocumentReflection>) => string;
    /**
     * @internal
     */
    readmeTemplate: (page: MarkdownPageEvent<ProjectReflection>) => string;
    /**
     * @internal
     */
    projectTemplate: (page: MarkdownPageEvent<ProjectReflection>) => string;
    /**
     * @internal
     */
    reflectionTemplate: (page: MarkdownPageEvent<DeclarationReflection>) => string;
}
