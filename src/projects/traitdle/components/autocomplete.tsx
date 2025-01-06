import { useMemo, useRef, useState } from "preact/hooks";

interface Props<T extends { name: string }> {
  placeholder?: string;
  items: T[];
  value: string;
  onChange(val: string): void;
}

export function Autocomplete<T extends { name: string }>(props: Props<T>) {
  const { items, value, onChange } = props;
  const ref = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState(false);
  const dropdownClasses = useMemo(() => {
    const classes = ["dropdown", "w-full"];
    if (open) {
      classes.push("dropdown-open");
    }
    return classes.join(", ");
  }, [open]);
  return (
    <div class={dropdownClasses} ref={ref}>
      <input
        type="text"
        className="input input-bordered w-full"
        value={value}
        onInput={(e) => onChange((e.target as HTMLInputElement).value)}
        placeholder="Type something.."
      />
      <div className="dropdown-content bg-base-200 top-14 max-h-96 overflow-auto flex-col rounded-md">
        <ul
          className="menu menu-compact"
          style={{ width: ref.current?.clientWidth }}
        >
          {items.map((item, index) => {
            return (
              <li
                key={index}
                onClick={() => {
                  onChange(item.name);
                  setOpen(false);
                }}
                className="border-b border-b-base-content/10 w-full"
              >
                <button>{item.name}</button>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
