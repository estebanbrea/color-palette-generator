/**
 * Wraps a string in backticks.
 * If the input string itself contains a backtick, pipe, or backslash (which can result in unwanted side effects) the string is escaped instead.
 */
export declare function backTicks(text: string): string;
