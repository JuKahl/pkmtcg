export type APIPKM = {
  data: {
    id: string;
    name: string;
    supertype: string;
    subtypes: [string];
    level: number;
    hp: number;
    types: [string];
    evolvesFrom: string;
    // attacks: [
    //   {
    //     name: string,
    //     cost: [
    //       "Fire"
    //     ],
    //     "convertedEnergyCost": 1,
    //     "damage": "20+",
    //     "text": "Discard all Fire Energy cards attached to Blaine's Charizard. If all Energy cards attached to Blaine's Charizard provide 2 Fire Energy, discard all of them. This attack does 20 damage plus 20 more damage for each Fire Energy discarded in this way."
    //   },
    //   {
    //     "name": "Flame Jet",
    //     "cost": [
    //       "Fire",
    //       "Fire"
    //     ],
    //     "convertedEnergyCost": 2,
    //     "damage": "",
    //     "text": "Flip a coin. If heads, choose 1 of your opponent's Pokémon. This attack does 40 damage to that Pokémon. Don't apply Weakness and Resistance for this attack. (Any other effects that would happen after applying Weakness and Resistance still happen.)"
    //   }
    // ],
    // "weaknesses": [
    //   {
    //     "type": "Water",
    //     "value": "×2"
    //   }
    // ],
    // "resistances": [
    //   {
    //     "type": "Fighting",
    //     "value": "-30"
    //   }
    // ],
    // "retreatCost": [
    //   "Colorless",
    //   "Colorless",
    //   "Colorless"
    // ],
    // "convertedRetreatCost": 3,
    set: {
      id: string;
      name: string;
      series: string;
      printedTotal: number;
      total: number;
      // legalities: {
      //   unlimited: "Legal";
      // };
      // ptcgoCode: "G2";
      // releaseDate: "2000/10/16";
      // updatedAt: "2020/08/14 09:35:00";
      images: {
        symbol: string;
        logo: string;
      };
    };
    number: number;
    artist: string;
    rarity: string;
    // nationalPokedexNumbers: [6];
    // legalities: {
    //   unlimited: "Legal";
    // };
    images: {
      small: string;
      large: string;
    };
    tcgplayer: {
      url: string;
      updatedAt: string;
      prices: {
        holofoil: {
          low: number;
          mid: number;
          high: number;
          market: number;
        };
        "1stEditionHolofoil": {
          low: number;
          mid: number;
          high: number;
          market: number;
        };
      };
    };
  };
};

export type APIPKMS = {
  data: APIPKM[];
  page: number;
  pageSize: number;
  count: number;
  totalCount: number;
};

export type pokemon = {
  data: {
    name: string;
    hp: number;
    types: [string];
    evolvesFrom: string;
    images: {
      small: string;
      large: string;

      // set: {
      //   name: string;
      //   series: string;
      // };
    };
  };
};

function convertToPkm(pkmChar: APIPKM): pokemon {
  return {
    data: {
      name: pkmChar.data.name,
      hp: pkmChar.data.hp,
      types: pkmChar.data.types,
      evolvesFrom: pkmChar.data.evolvesFrom,
      images: {
        large: pkmChar.data.images.large,
        small: pkmChar.data.images.small,
      },
    },
  };
}

export async function getBaseCharizard() {
  const response = await fetch("https://api.pokemontcg.io/v2/cards/base4-4", {
    headers: {
      "X-Auth-Token": "238e88e0-bf8b-4de6-b9c4-7f443d55fc45",
    },
  });
  const result = (await response.json()) as APIPKM;
  const charizard = convertToPkm(result);

  return charizard;
}

export async function getTCG() {
  const response = await fetch("https://api.pokemontcg.io/v2/cards", {
    headers: {
      "X-Auth-Token": "238e88e0-bf8b-4de6-b9c4-7f443d55fc45",
    },
  });
  const result = (await response.json()) as APIPKMS;
  const pokemons = result.data.map((pkmChar) => convertToPkm(pkmChar));
  return pokemons;
}
