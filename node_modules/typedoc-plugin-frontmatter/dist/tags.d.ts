/**
 * Functionality to map options to tags.
 *
 * @module
 */
import { Comment } from 'typedoc';
import { MarkdownApplication } from 'typedoc-plugin-markdown';
import { FrontmatterNamingConvention } from './options/maps.js';
export declare function getResolvedTags(app: MarkdownApplication, comment?: Comment): {};
export declare function getFrontmatterTags(comment: Comment, frontmatterTags: string[], namingConvention: FrontmatterNamingConvention): {};
