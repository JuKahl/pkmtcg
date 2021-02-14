import "./tcg.css";
import { createElement } from "../../utils/createElement";
import {
  getBaseCharizard,
  pokemon,
  getPokemons,
  getPokemon,
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

//* multiple pokemon *//

type pkmsFromAPIFilterProps = {
  loaded: {
    pokemons: pokemon[];
  };
};
export const pkmsFromAPIFilter = (
  args,
  { loaded: { pokemons } }: pkmsFromAPIFilterProps
) => {
  const input = createElement("input", {
    onchange: async () => {
      const newPkms = await getPokemons(input.value);
      // console.log({ newPkms });
      // * attention *//
      const newCards = newPkms.map((pokemonTCG) => createCard(pokemonTCG));
      pkmContainer.innerHTML = "";
      pkmContainer.append(...newCards);
    },
  });
  const pkmContainer = createElement("div", {
    className: "container",
    childs: pokemons.map((pokemonTCG) => createCard(pokemonTCG)),
  });
  const container = createElement("div", {
    className: "",
    childs: [input, pkmContainer],
  });
  return container;
};

pkmsFromAPIFilter.loaders = [
  async () => ({
    pokemons: await getPokemons(),
  }),
];

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
