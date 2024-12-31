export function activeRoute(value: string, baseRoute: string): boolean {
  if (
    (baseRoute === "/" && value.length < 2) ||
    (baseRoute !== "/" && value.startsWith(baseRoute))
  ) {
    return true;
  }
  return false;
}
