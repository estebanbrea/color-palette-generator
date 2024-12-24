import { ReflectionGroup, } from 'typedoc';
export function getGroupIndex(group) {
    if (this.options.getValue('indexFormat').toLowerCase().includes('table')) {
        return this.helpers.getGroupIndexTable(group.children, group instanceof ReflectionGroup ? group.owningReflection?.kind : null);
    }
    return this.helpers.getGroupIndexList(group.children);
}
