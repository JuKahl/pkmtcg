import "./tcg.css";
import { createElement } from "../../utils/createElement";
import { getBaseCharizard, pokemon } from "../../utils/api";
import { createCard } from "./tcg";

export default {
  title: "Components/tcg",
  parameters: { layout: "centered" },
};

type pkmCharizard = {
  loaded: {
    charizard: pokemon;
  };
};
export const getBaseCharizardAPI = (
  args,
  { loaded: { charizard } }: pkmCharizard
) => {
  return createCard(charizard);
};

getBaseCharizardAPI.loaders = [
  async () => ({
    charizard: await getBaseCharizard(),
  }),
];
