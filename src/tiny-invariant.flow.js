// @flow
// This file is not actually executed
// It is just used by flow for typing

export default function invariant(
  condition: any,
  message?: string | (() => string),
  prefix: string = "",
) {
  if (condition) {
    return;
  }

  const provided: string | undefined =
    typeof message === 'function' ? message() : message;

  if (provided &&prefix && !prefix.endsWith(": ")) prefix += ": "

  const value: string = provided ? `${prefix}${provided}` : prefix;
  throw new Error(value);
}
