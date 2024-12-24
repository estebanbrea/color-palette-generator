export function tupleType(model) {
    return `[${model.elements
        .map((element) => this.partials.someType(element))
        .join(', ')}]`;
}
