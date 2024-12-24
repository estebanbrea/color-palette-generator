import { backTicks } from '../../../libs/markdown/index.js';
export function indexSignature(model) {
    const md = [''];
    const params = model.parameters
        ? model.parameters.map((parameter) => {
            return parameter.type
                ? `${backTicks(parameter.name)}: ${this.partials.someType(parameter.type)}`
                : '';
        })
        : [];
    if (model.type) {
        md.push(`\\[${params.join('')}\\]: ${this.partials.someType(model.type)}`);
    }
    return md.join(' ');
}
