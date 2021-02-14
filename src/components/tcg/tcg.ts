import { createElement } from "../../utils/createElement";
import { pokemon } from "../../utils/api";

export function createCard({
  data: { name, hp, types, evolvesFrom, images },
}: pokemon) {
  return createElement("div", {
    className: "card",
    childs: [
      createElement("div", {
        className: "card__inner",
        childs: [
          createElement("img", {
            className: "card__front",
            src: images.small,
          }),
          createElement("div", {
            className: "card__back",
            childs: [
              createElement("p", {
                innerText: name,
              }),
              createElement("p", {
                innerText: evolvesFrom,
              }),
            ],
          }),
        ],
      }),
    ],
  });
}
//   return createElement("div", {
//     className: "card",
//     childs: [
//       createElement("img", {
//         src: images.small,

//       }),
//       createElement("p", {
//         innerText: name,
//       }),
//     ],
//   });
// }
