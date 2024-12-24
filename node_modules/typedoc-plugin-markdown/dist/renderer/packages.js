import * as fs from 'fs';
import * as path from 'path';
/**
 * Currently options set for packages are only stored on the converter and are destroyed before being passed to the Renderer.
 *
 * By intercepting the package options set in the converter and storing them on the renderer we can use them later in the theme.
 */
export function resolvePackages(app, context, packageDir) {
    const packageJsonContents = fs
        .readFileSync(path.join(packageDir, 'package.json'))
        .toString();
    const packageJson = packageJsonContents
        ? JSON.parse(packageJsonContents)
        : {};
    const renderer = app.renderer;
    renderer.packagesMeta = {
        ...(renderer.packagesMeta || {}),
        [context.project.name]: {
            description: packageJson.description,
            options: app.options,
        },
    };
}
