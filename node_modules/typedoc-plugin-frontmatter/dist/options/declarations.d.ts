import { DeclarationOption } from 'typedoc';
/**
 *
 * ```yaml filename="YAML"
 * ---
 * layout: docs
 * sidebar: true
 * ---
 * ```
 *
 * @example  {"layout": "docs", "sidebar": true }
 */
export declare const frontmatterGlobals: Partial<DeclarationOption>;
/**
 * @example {"onReadme": "true" }
 */
export declare const readmeFrontmatter: Partial<DeclarationOption>;
/**
 * @example {"onIndex": "true" }
 */
export declare const indexFrontmatter: Partial<DeclarationOption>;
/**
 * Frontmatter variables can be added by extracting comments from block (@) tags.
 *
 * Please note tags must be added to the comment blocks of the symbol exported to a page.
 *
 *  ```ansi filename="Block Tags (someModule.ts)"
 *  \/**
 *  * \@author Joe Bloggs
 *  *
 *  * \@description A description that will be added to frontmatter.
 *  *\/
 *  ```
 *
 * ```yaml filename="YAML (someModule.md)"
 * ---
 * author: Joe Bloggs
 * description: A description that will be added to frontmatter.
 * ---
 * ````
 *
 * @example ["author", "description"]
 */
export declare const frontmatterCommentTags: Partial<DeclarationOption>;
export declare const preserveFrontmatterCommentTags: Partial<DeclarationOption>;
/**
 * Block tags have to be written in camelCase (see [tsdoc.org](https://tsdoc.org/pages/spec/tag_kinds)).
 *
 * This option can configure the output style of frontmatter variables when written to YAML.
 */
export declare const frontmatterNamingConvention: Partial<DeclarationOption>;
