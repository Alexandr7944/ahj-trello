/* eslint-disable prettier/prettier */
class EnterText {
  constructor(btn) {
    this.btn = btn;
  }

  addContainerEl() {
    const textContainer = document.createElement("div");
    textContainer.className = "text-container";
    textContainer.innerHTML = `
      <textarea class="enter-text"></textarea>
      <button class="add-card">Add Card</button>
      <button class="remove-card">&#10006;</button>
    `;
    this.btn.replaceWith(textContainer);
    return textContainer;
  }
}

export default EnterText;
