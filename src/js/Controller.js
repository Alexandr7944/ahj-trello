/* eslint-disable prettier/prettier */
import Card from "./Card";

class Controller {
  constructor(container) {
    this.container = container;
    this.draggingElement = null;
    this.draggingProection = null;
  }

  setDraggingElement(node) {
    this.draggingElement = new Card(node);
  }

  replaceDragging() {
    this.draggingProection.replaceWith(this.draggingElement.element);
    this.draggingElement.element.style = this.draggingElement.styles;
  }

  clear() {
    this.draggingElement = null;
    this.draggingProection = null;
  }

  onMouseDown = (evt) => {
    const target = evt.target.closest('.item');

    if (!target) return;
    this.shiftX = evt.offsetX;
    this.shiftY = evt.offsetY;
    this.setDraggingElement(target);
    this.draggingElement.style = `
      left: ${evt.pageX - this.shiftX}px;
      top: ${evt.pageY - this.shiftY}px;
    `;
    this.proectionAct(evt);
  };

  onMouseUp = () => {
    if (this.draggingElement) {
      this.replaceDragging();
      this.clear();
    }
  };

  // Рассчёт позиции вставки проекции и вставка или удаление
  proectionAct(evt) {
    const target = evt.target;
    const element = this.draggingElement;
    const proection = this.draggingProection;
    
    if (
      target.classList.contains("item") &&
      !target.classList.contains("proection")
    ) {
      const { y, height } = target.getBoundingClientRect();
      const appendPosition =
        y + height / 2 > evt.clientY ? "beforebegin" : "afterend";

      if (!proection) {
        this.draggingProection = element.proection;
      } else {
        proection.remove();
        target.insertAdjacentElement(appendPosition, proection);
      }
    } else if (
        target.classList.contains("item-wrapper") &&
        proection
      ) {
      target.prepend(proection.closest('.proection'));
    }
  }
  
  onMouseMove = (evt) => {
    if (this.draggingElement) {
      const { pageX, pageY } = evt;
      const element = this.draggingElement;
      const { width, height } = this.draggingElement.styles;
      element.styles = `
				position: absolute;
		 		left: ${pageX - this.shiftX}px;
		 		top: ${pageY - this.shiftY}px;
		 		pointer-events: none;
				width: ${width};
				height: ${height};
			`;
      this.proectionAct(evt);
    }
  };
}

export default Controller;
