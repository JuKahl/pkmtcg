import "./tcg.css";
import { createElement } from "../../utils/createElement";
import {
  getBaseCharizard,
  Pokemon,
  getPokemons,
  // getPokemon,
  getRdmBase,
} from "../../utils/api";
import { createCard } from "./tcg";

export default {
  title: "Components/tcg",
  parameters: { layout: "centered" },
};

//* only charizard *//

type pkmCharizard = {
  loaded: {
    charizard: Pokemon;
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

//* multiple pokemon *//

export const pkmsFromAPIFilter = () => {
  const input = createElement("input", {
    onchange: async () => {
      const newPkms = await getPokemons(input.value);
      console.log(newPkms);
      const newCards = newPkms.map((pokemon) => createCard(pokemon));
      pkmContainer.innerHTML = "";
      pkmContainer.append(...newCards);
    },
  });
  const pkmContainer = createElement("div", {
    className: "container",
    childs: [],
  });
  const container = createElement("div", {
    className: "",
    childs: [input, pkmContainer],
  });
  return container;
};

//* random base set pkm *//

export const randomPokemon = () => {
  const randomButton = createElement("button", {
    innerText: "Load random base set pokemon",
    onclick: async () => {
      const rdmNr = getRandom(0, 70);
      const pkm = await getRdmBase(rdmNr);
      console.log(pkm);
      const rdmCard = createCard(pkm);

      if (container.childNodes.length > 1) {
        container.removeChild(container.lastChild);
      }
      container.append(rdmCard);
    },
  });

  const container = createElement("div", {
    className: "container",
    childs: [randomButton],
  });
  return container;
};

function getRandom(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}
