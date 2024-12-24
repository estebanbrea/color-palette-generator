import { Application, Context } from 'typedoc';
/**
 * Currently options set for packages are only stored on the converter and are destroyed before being passed to the Renderer.
 *
 * By intercepting the package options set in the converter and storing them on the renderer we can use them later in the theme.
 */
export declare function resolvePackages(app: Application, context: Context, packageDir: string): void;
