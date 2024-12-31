import { absoluteUrl } from "../utils/absolute-url";

export function Footer() {
  return (
    <footer class="m-2">
      <nav
        aria-label="Footer navigation"
        class="flex flex-col gap-1 items-center md:flex-row md:gap-4 prose"
      >
        <span>© Nathan Smith {new Date().toLocaleDateString()}</span>
        <a href={absoluteUrl("/feed.xml")}>RSS</a>
        <a href="contact.md">Contact</a>
      </nav>
    </footer>
  );
}
