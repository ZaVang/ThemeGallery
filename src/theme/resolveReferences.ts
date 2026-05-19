import type { ComponentValue } from '../types/theme';

const EXACT_REFERENCE = /^\{([^}]+)\}$/;
const EMBEDDED_REFERENCE = /"?\{([^}]+)\}"?/g;

type ReferenceContext = Record<string, unknown>;

function readPath(context: ReferenceContext, path: string): unknown {
  return path.split('.').reduce<unknown>((current, segment) => {
    if (current && typeof current === 'object' && segment in current) {
      return (current as Record<string, unknown>)[segment];
    }

    return undefined;
  }, context);
}

function cloneValue(value: unknown): ComponentValue {
  if (Array.isArray(value)) {
    return value.map(cloneValue);
  }

  if (value && typeof value === 'object') {
    return Object.fromEntries(
      Object.entries(value as Record<string, unknown>).map(([key, child]) => [key, cloneValue(child)]),
    );
  }

  if (['string', 'number', 'boolean'].includes(typeof value) || value === null) {
    return value as ComponentValue;
  }

  return String(value);
}

function stringifyReference(value: unknown): string {
  if (['string', 'number', 'boolean'].includes(typeof value)) {
    return String(value);
  }

  return JSON.stringify(value);
}

export function resolveReferences<T extends ComponentValue>(
  value: T,
  context: ReferenceContext,
  warnings: string[],
  location = 'token',
): T {
  if (typeof value === 'string') {
    const exact = value.match(EXACT_REFERENCE);
    if (exact) {
      const resolved = readPath(context, exact[1]);
      if (resolved === undefined) {
        warnings.push(`Unresolved token reference "{${exact[1]}}" at ${location}.`);
        return value;
      }

      return cloneValue(resolved) as T;
    }

    return value.replace(EMBEDDED_REFERENCE, (match: string, path: string) => {
      const resolved = readPath(context, path);
      if (resolved === undefined) {
        warnings.push(`Unresolved token reference "${match}" at ${location}.`);
        return match;
      }

      return stringifyReference(resolved);
    }) as T;
  }

  if (Array.isArray(value)) {
    return value.map((item: ComponentValue, index: number) =>
      resolveReferences(item, context, warnings, `${location}[${index}]`),
    ) as T;
  }

  if (value && typeof value === 'object') {
    return Object.fromEntries(
      Object.entries(value).map(([key, child]) => [
        key,
        resolveReferences(child as ComponentValue, context, warnings, `${location}.${key}`),
      ]),
    ) as T;
  }

  return value;
}
