import { formatMarkdown } from '../libs/utils/index.js';
import { OutputFileStrategy } from '../options/maps.js';
import { NavigationBuilder, UrlBuilder } from '../theme/base/index.js';
import { MarkdownThemeContext } from '../theme/index.js';
import { ReflectionKind, Theme, } from 'typedoc';
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
export class MarkdownTheme extends Theme {
    constructor(renderer) {
        super(renderer);
    }
    /**
     * Renders a template and page model to a string.
     *
     * @internal
     */
    render(page, template) {
        try {
            return formatMarkdown(template(page));
        }
        catch (e) {
            this.application.logger.error(`Error rendering page ${page.url}. ${e}`);
            throw new Error(e);
        }
    }
    /**
     * Creates a new instance of the current theme context.
     *
     * This method can be overridden to provide an alternative theme context.
     */
    getRenderContext(page) {
        return new MarkdownThemeContext(this, page, this.application.options);
    }
    /**
     * Maps the models of the given project to the desired output files.
     */
    getUrls(project) {
        return new UrlBuilder(this, project).getUrls();
    }
    /**
     * Map the models of the given project to a navigation structure.
     */
    getNavigation(project) {
        return new NavigationBuilder(this, project).getNavigation();
    }
    /**
     * @internal
     */
    getTemplateMapping(kind, outputFileStrategy) {
        outputFileStrategy =
            outputFileStrategy ||
                this.application.options.getValue('outputFileStrategy');
        const directoryName = (reflectionKind) => {
            const pluralString = ReflectionKind.pluralString(reflectionKind);
            return pluralString.replace(/[\s_-]+/g, '-').toLowerCase();
        };
        const membersWithOwnFile = this.application.options.getValue('membersWithOwnFile');
        const memberMapping = (template, kind) => {
            return {
                template,
                directory: directoryName(kind),
                kind: kind,
            };
        };
        const mappings = {
            [ReflectionKind.Module]: {
                template: this.reflectionTemplate,
                directory: null,
                kind: ReflectionKind.Module,
            },
            [ReflectionKind.Namespace]: {
                template: this.reflectionTemplate,
                directory: directoryName(ReflectionKind.Namespace),
                kind: ReflectionKind.Namespace,
            },
            [ReflectionKind.Document]: {
                template: this.documentTemplate,
                directory: directoryName(ReflectionKind.Document),
                kind: ReflectionKind.Document,
            },
        };
        if (outputFileStrategy === OutputFileStrategy.Members &&
            membersWithOwnFile?.includes(ReflectionKind[ReflectionKind.Class])) {
            mappings[ReflectionKind.Class] = memberMapping(this.reflectionTemplate, ReflectionKind.Class);
        }
        if (outputFileStrategy === OutputFileStrategy.Members &&
            membersWithOwnFile?.includes(ReflectionKind[ReflectionKind.Interface])) {
            mappings[ReflectionKind.Interface] = memberMapping(this.reflectionTemplate, ReflectionKind.Interface);
        }
        if (outputFileStrategy === OutputFileStrategy.Members &&
            membersWithOwnFile?.includes(ReflectionKind[ReflectionKind.Enum])) {
            mappings[ReflectionKind.Enum] = memberMapping(this.reflectionTemplate, ReflectionKind.Enum);
        }
        if (outputFileStrategy === OutputFileStrategy.Members &&
            membersWithOwnFile?.includes(ReflectionKind[ReflectionKind.Function])) {
            mappings[ReflectionKind.Function] = memberMapping(this.reflectionTemplate, ReflectionKind.Function);
        }
        if (outputFileStrategy === OutputFileStrategy.Members &&
            membersWithOwnFile?.includes(ReflectionKind[ReflectionKind.TypeAlias])) {
            mappings[ReflectionKind.TypeAlias] = memberMapping(this.reflectionTemplate, ReflectionKind.TypeAlias);
        }
        if (outputFileStrategy === OutputFileStrategy.Members &&
            membersWithOwnFile?.includes(ReflectionKind[ReflectionKind.Variable])) {
            mappings[ReflectionKind.Variable] = memberMapping(this.reflectionTemplate, ReflectionKind.Variable);
        }
        return mappings[kind];
    }
    /**
     * @internal
     */
    documentTemplate = (page) => {
        return this.getRenderContext(page).templates.document(page);
    };
    /**
     * @internal
     */
    readmeTemplate = (page) => {
        return this.getRenderContext(page).templates.readme(page);
    };
    /**
     * @internal
     */
    projectTemplate = (page) => {
        return this.getRenderContext(page).templates.project(page);
    };
    /**
     * @internal
     */
    reflectionTemplate = (page) => {
        return this.getRenderContext(page).templates.reflection(page);
    };
}
