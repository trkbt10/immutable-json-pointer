/**
 * JSONPointer type implementation
 *  - JSON Pointer type definition based on RFC 6901
 *  - Paths are separated by `/` and each segment is escaped
 */

/** RFC-6901 unescape (`~0`→`~`, `~1`→`/`) */
type Unescape<S extends string> = S extends `${infer H}~0${infer T}`
  ? `${H}~${Unescape<T>}`
  : S extends `${infer H}~1${infer T}`
  ? `${H}/${Unescape<T>}`
  : S;

/** Check if string is numeric */
type IsNumeric<S extends string> = S extends `${number}` ? true : false;

/**
 *  Result of following path segment `Key` one step from current type `Cur`
 *    - For arrays, only numeric strings are allowed
 *    - For objects, access via keyof
 */
type SegmentAccess<Cur, Key extends string> =
  // Array (including readonly Tuple)
  Cur extends readonly (infer U)[]
    ? IsNumeric<Key> extends true
      ? U
      : never
    : // Object
    Cur extends object
    ? Key extends keyof Cur
      ? Cur[Key]
      : never
    : // Otherwise unreachable
      never;

/**
 * ---------------------------
 *  Recursive path resolution
 * ---------------------------
 */

/** Recursively process the remainder of paths starting with `/` */
type ResolveSegments<Cur, Path extends string> =
  // When `"/"` remains
  Path extends `${infer Seg}/${infer Rest}`
    ? ResolveSegments<SegmentAccess<Cur, Unescape<Seg>>, Rest>
    : // Final segment (doesn't contain `/`)
      SegmentAccess<Cur, Unescape<Path>>;

/**
 * JSONPointer<Obj, Pointer>
 *  - If Pointer is empty string, returns entire Obj
 *  - Resolves paths starting with `/` using `ResolveSegments`
 */
export type JSONPointer<Obj, Pointer extends string> = Pointer extends ""
  ? Obj
  : Pointer extends `/${infer P}`
  ? ResolveSegments<Obj, P>
  : never;

/**
 * Type for JSON Pointer string format
 */
export type JSONPointerString = "" | `/${string}`;

/**
 * Type for URI-encoded JSON Pointer
 */
export type URIEncodedJSONPointer = `#${JSONPointerString}`;

/**
 * Type for compile function return value
 */
export type CompiledPointer<Encoding extends "uri" | undefined = undefined> = 
  Encoding extends "uri" 
    ? URIEncodedJSONPointer 
    : JSONPointerString;

/**
 * Type for dict function return value
 */
export type DictResult<T> = {
  [K in JSONPointerString]: unknown;
};

/**
 * Parse result type - array of unescaped path segments
 */
export type ParsedPath = string[];
