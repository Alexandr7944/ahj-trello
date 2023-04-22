import { handlerRemoveItem } from "./app";

class ItemTrello {
  constructor(parentEl) {
    this.parentEl = parentEl;
  }

  addItem(itemObj) {
    const itemEl = document.createElement("div");
    itemEl.className = "item";
    itemEl.innerHTML = `
      <div class="item-content">${itemObj.content}</div>
      <button class="remove-btn">&#10006;</button>
    `;
    this.parentEl.querySelector(".item-wrapper").append(itemEl);

    itemEl.addEventListener("click", (event) => {
      if (event.target.className !== "remove-btn") return;
      handlerRemoveItem(itemEl, itemObj);
    });
  }
}

export default ItemTrello;
