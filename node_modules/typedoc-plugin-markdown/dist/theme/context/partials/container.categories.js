import { heading } from '../../../libs/markdown/index.js';
import { ReflectionKind, } from 'typedoc';
export function categories(model, options) {
    const md = [];
    model
        ?.filter((category) => !category.allChildrenHaveOwnDocument())
        .forEach((category) => {
        const categoryChildren = category.children?.filter((child) => child.kind !== ReflectionKind.Constructor);
        if (categoryChildren.length) {
            md.push(heading(options.headingLevel, category.title));
            if (category.description) {
                md.push(this.helpers.getCommentParts(category.description));
            }
            md.push(this.partials.members(categoryChildren, {
                headingLevel: options.headingLevel + 1,
            }));
        }
    });
    return md.join('\n\n');
}
