/**
 * Translations methods.
 *
 * @module
 */
import { en, jp, ko, zh } from '../internationalization/index.js';
/**
 * Returns subset of translatable strings for the plugin.
 *
 * These will then be merged with the main set of TypeDoc string.
 *
 * @category Methods
 */
export function getTranslatable(app) {
    const LOCALES = {
        en,
        jp,
        ko,
        zh,
    };
    return {
        ...LOCALES['en'],
        ...(app.lang !== 'en' && Object.keys(LOCALES).includes(app.lang)
            ? { ...LOCALES[app.lang] }
            : {}),
        ...app.options.getValue('locales')[app.lang],
    };
}
