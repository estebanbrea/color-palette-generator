import { Application } from 'typedoc';
/**
 * The function that is called by TypeDoc to bootstrap the plugin.
 *
 * Here we expose additional TypeDoc options and make some adjustments.
 *
 * This method is not intended to be consumed in any other context that via the `plugin` option.
 */
export declare function load(app: Application): void;
/**
 * Export anything that is available publicly
 */
export * from './public-api.js';
