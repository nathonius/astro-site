import type { VNode } from "preact";

export function jsxJoin(elements: VNode[], separator: string = ", ") {
  const result = elements.reduce((result, item) => (
    <>
      {result}
      {separator}
      {item}
    </>
  ));
  return result;
}
