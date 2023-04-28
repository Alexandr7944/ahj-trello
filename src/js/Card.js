/* eslint-disable prettier/prettier */
class Card {
  #el;
  #styles;

  constructor(element) {
    this.#el = element;
    this.#styles = window.getComputedStyle(element);
  }

  clear() {
    this.#el.remove();
  }

  set styles(text) {
    this.#el.style.cssText = text;
  }

  get styles() {
    return this.#styles;
  }

  get proection() {
    return (() => {
      const div = document.createElement("div");
      div.classList.add("proection");
      const { width, height } = this.styles;
      div.style.cssText = `
	 			width: ${width};
		 		height: ${height};
		 		margin: 10px 0;
			`;
      return div;
    })();
  }

  get element() {
    return this.#el;
  }
}

export default Card;
