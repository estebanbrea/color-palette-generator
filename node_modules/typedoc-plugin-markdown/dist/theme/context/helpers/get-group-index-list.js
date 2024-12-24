import { link } from '../../../libs/markdown/index.js';
import { escapeChars } from '../../../libs/utils/index.js';
export function getGroupIndexList(children) {
    const filteredChildren = children
        .filter((child) => Boolean(child.url))
        .map((child) => {
        return child.url
            ? `- ${link(escapeChars(child.name), this.getRelativeUrl(child.url))}`
            : '';
    }) || [];
    return filteredChildren.join('\n');
}
