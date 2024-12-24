import { htmlTable, link, table } from '../../../libs/markdown/index.js';
import { escapeChars } from '../../../libs/utils/index.js';
import { DocumentReflection, ReflectionKind, } from 'typedoc';
export function getGroupIndexTable(children) {
    const leftAlignHeadings = this.options.getValue('tableColumnSettings').leftAlignHeaders;
    const isHtmlTable = this.options.getValue('indexFormat') === 'htmlTable';
    const childKindStrings = children.map((child) => ReflectionKind.singularString(child.kind));
    const headers = [[...new Set(childKindStrings)].join(', ')];
    headers.push(this.i18n.theme_description());
    const rows = [];
    children.forEach((child) => {
        const row = [];
        if (child.url) {
            row.push(link(escapeChars(child.name), this.getRelativeUrl(child.url)));
        }
        const description = () => {
            if (child instanceof DocumentReflection) {
                return child.frontmatter.description;
            }
            const comment = child.comment || child.signatures?.[0]?.comment;
            if (!comment) {
                return null;
            }
            return isHtmlTable
                ? this.partials.comment(comment, {
                    isTableColumn: true,
                })
                : this.helpers.getDescriptionForComment(comment);
        };
        row.push(description()?.trim() || '-');
        rows.push(row);
    });
    return isHtmlTable
        ? htmlTable(headers, rows, leftAlignHeadings)
        : table(headers, rows, leftAlignHeadings);
}
