import { createElement } from "../../utils/createElement";
import { pokemon } from "../../utils/api";

export function createCard({
  data: { name, hp, types, evolvesFrom, images },
}: pokemon) {
  //   return createElement("div", {
  //     innerText: name,
  //   });
  return createElement("img", {
    src: images.small,
  });
}
