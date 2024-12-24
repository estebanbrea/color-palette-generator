import { heading } from '../../../libs/markdown/index.js';
import { ReflectionKind, } from 'typedoc';
export function groups(model, options) {
    const groupsWithChildren = model?.filter((group) => !group.allChildrenHaveOwnDocument());
    const md = [];
    const getGroupTitle = (groupTitle) => {
        return groupTitle;
    };
    groupsWithChildren?.forEach((group) => {
        const isEventProps = getGroupTitle(group.title) === 'Events';
        if (group.categories) {
            md.push(heading(options.headingLevel, getGroupTitle(group.title)));
            if (group.description) {
                md.push(this.helpers.getCommentParts(group.description));
            }
            md.push(this.partials.categories(group.categories, {
                headingLevel: options.headingLevel + 1,
            }));
        }
        else {
            const isPropertiesGroup = group.children.every((child) => child.kind === ReflectionKind.Property);
            const isEnumGroup = group.children.every((child) => child.kind === ReflectionKind.EnumMember);
            md.push(heading(options.headingLevel, getGroupTitle(group.title)));
            if (group.description) {
                md.push(this.helpers.getCommentParts(group.description));
            }
            if (isPropertiesGroup &&
                this.helpers.useTableFormat('properties', options.kind)) {
                md.push(this.partials.propertiesTable(group.children, {
                    isEventProps,
                }));
            }
            else if (isEnumGroup && this.helpers.useTableFormat('enums')) {
                md.push(this.partials.enumMembersTable(group.children));
            }
            else {
                if (group.children) {
                    md.push(this.partials.members(group.children, {
                        headingLevel: options.headingLevel + 1,
                        groupTitle: group.title,
                    }));
                }
            }
        }
    });
    return md.join('\n\n');
}
