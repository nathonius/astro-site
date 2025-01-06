import type { FunctionComponent } from "preact";
import type { Sims4Trait } from "../types";
import { useState } from "preact/hooks";
import { Autocomplete } from "./autocomplete";

interface SelectorProps {
  traits: Sims4Trait[];
}

export const Selector: FunctionComponent<SelectorProps> = (props) => {
  const { traits } = props;
  const [query, setQuery] = useState<string>("");
  const filtered = traits.filter((t) =>
    t.name.toLowerCase().includes(query.toLowerCase())
  );
  const visible = filtered.slice(0, 10);
  return (
    <div>
      <Autocomplete
        placeholder="Select a trait..."
        items={visible}
        value={query}
        onChange={(v) => {
          setQuery(v);
        }}
      />
    </div>
  );
};
