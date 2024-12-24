import { ProjectReflection, Renderer } from 'typedoc';
/**
 * The render method for the Markdown plugin
 *
 * This is essentially a copy the default theme render method with some adjustments.
 *
 * - Removes unnecessary async calls to load highlighters only required for html theme.
 * - Removes hooks logic that are jsx specific.
 * - Adds any logic specific to markdown rendering.
 */
export declare function render(renderer: Renderer, project: ProjectReflection, outputDirectory: string): Promise<void>;
