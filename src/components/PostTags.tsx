import type { FunctionComponent } from "preact";
import { jsxJoin } from "../utils/jsx-join";

export const PostTags: FunctionComponent<{
  tags: string[];
  filter?: string[];
}> = (props) => {
  const { tags, filter } = props;
  const _filterTags = !filter || filter.length === 0 ? ["post"] : filter;
  const displayTags = tags.filter((t) => !_filterTags.includes(t));
  const tagItems = displayTags.map((t) => <a href={`/tagged/${t}/`}>{t}</a>);
  return jsxJoin(tagItems);
};
