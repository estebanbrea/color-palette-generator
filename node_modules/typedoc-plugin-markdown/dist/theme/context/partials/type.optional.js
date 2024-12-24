export function optionalType(model) {
    const result = this.partials.someType(model.elementType);
    return model.elementType.type === 'union' ? `(${result})?` : `${result}?`;
}
