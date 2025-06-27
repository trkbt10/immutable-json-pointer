import { 
  JSONPointer, 
  JSONPointerString, 
  CompiledPointer, 
  DictResult,
  ParsedPath 
} from "./types";
import * as jp from ".";

export const get = <T extends {}, P extends string>(
  json: T,
  pointer: P
): JSONPointer<T, P> => jp.get(json, pointer) as JSONPointer<T, P>;

export const has = <T extends {}, P extends string>(
  obj: T,
  pointer: P
): boolean => jp.has(obj, pointer);

export const set = <
  T extends {},
  P extends string,
  V extends JSONPointer<T, P>
>(
  doc: T,
  pointer: P,
  value: V
): T => jp.set(doc, pointer, value);

export const remove = <T extends {}, P extends string>(
  json: T,
  pointer: P
): T => jp.remove(json, pointer);

export const read = <T extends {}, P extends string>(
  json: T,
  pointer: P
): JSONPointer<T, P> | undefined =>
  jp.read(json, pointer) as JSONPointer<T, P> | undefined;

export const transform = <
  T extends {},
  P extends string,
  V extends JSONPointer<T, P>,
  R extends JSONPointer<T, P>
>(
  doc: T,
  pointer: P,
  fn: (value: V) => R
): T => jp.transform(doc, pointer, fn as any);

export const resolve = <T extends {}, P extends string>(
  doc: T,
  pointer: P,
  callback?: (
    value: JSONPointer<T, P>,
    key: string,
    parent: any,
    paths: string[]
  ) => void
): JSONPointer<T, P> =>
  jp.resolve(doc, pointer, callback as any) as JSONPointer<T, P>;

export const parse = <P extends string>(pointer: P): ParsedPath => 
  jp.parse(pointer);

export const compile = <E extends "uri" | undefined = undefined>(
  paths: (string | number)[], 
  encoding?: E
): CompiledPointer<E> => 
  jp.compile(paths, encoding) as CompiledPointer<E>;

export const dict = <T extends {}>(json: T): DictResult<T> => 
  jp.dict(json) as DictResult<T>;

export const compose = <
  T extends {},
  Initial extends T = T,
  Result extends any = T
>(
  entriesOrRecord: [JSONPointerString, any][] | Record<JSONPointerString, unknown>,
  initial?: Initial
): Result => 
  jp.compose(entriesOrRecord as any, initial) as Result;

export const { chain, escape, unescape } = jp;
