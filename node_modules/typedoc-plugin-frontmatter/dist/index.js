/**
 * The plugin entrypoint and bootstrapping of the plugin.
 *
 * @module
 */
import * as path from 'path';
import { MarkdownPageEvent, } from 'typedoc-plugin-markdown';
import * as yaml from 'yaml';
import { declarations } from './options/index.js';
import { getResolvedTags } from './tags.js';
export function load(app) {
    Object.entries(declarations).forEach(([name, option]) => {
        app.options.addDeclaration({
            name,
            ...option,
        });
    });
    app.renderer.on(MarkdownPageEvent.BEGIN, (page) => {
        const entryFileName = app.options.getValue('entryFileName');
        const frontmatterGlobals = app.options.getValue('frontmatterGlobals');
        const readmeFrontmatter = app.options.getValue('readmeFrontmatter');
        const indexFrontmatter = app.options.getValue('indexFrontmatter');
        const resolvedFrontmatterTags = getResolvedTags(app, page.model?.comment);
        page.frontmatter = {
            ...(page.frontmatter || {}),
            ...frontmatterGlobals,
            ...resolvedFrontmatterTags,
        };
        if (path.parse(page.url).name === path.parse(entryFileName).name) {
            page.frontmatter = {
                ...page.frontmatter,
                ...readmeFrontmatter,
            };
        }
        if (path.parse(page.url).name === path.parse(page.project?.url || '').name) {
            page.frontmatter = {
                ...page.frontmatter,
                ...indexFrontmatter,
            };
        }
    });
    app.renderer.on(MarkdownPageEvent.END, (page) => {
        if (page.frontmatter && Object.keys(page.frontmatter)?.length) {
            page.contents = page?.contents
                ?.replace(/^/, `---\n${yaml.stringify(page.frontmatter)}---\n\n`)
                .replace(/[\r\n]{3,}/g, '\n\n');
        }
    });
}
