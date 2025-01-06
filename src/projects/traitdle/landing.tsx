import type { FunctionComponent } from "preact";
import { getIndexToday } from "./util";
import { ALL_TRAITS } from "./data";
import { Selector } from "./components/selector";

export const Landing: FunctionComponent = (props) => {
  const index = getIndexToday(ALL_TRAITS);
  return (
    <div>
      Today's index is {index}, and its trait is: {ALL_TRAITS[index]?.name}
      <Selector traits={ALL_TRAITS} />
    </div>
  );
};
