import { heading, link } from '../../../libs/markdown/index.js';
import { escapeChars } from '../../../libs/utils/index.js';
export function sources(model, options) {
    const md = [];
    if (options.headingLevel !== -1) {
        md.push(heading(options.headingLevel, this.i18n.theme_defined_in()));
    }
    model.sources?.forEach((source, index) => {
        if (index === 0) {
            if (source.url) {
                md.push(link(`${escapeChars(source.fileName)}:${source.line}`, source.url));
            }
            else {
                md.push(`${escapeChars(source.fileName)}:${source.line}`);
            }
        }
    });
    return md.join('\n\n');
}
