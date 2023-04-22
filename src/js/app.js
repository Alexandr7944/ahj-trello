import EnterText from "./EnterText";
import ItemTrello from "./ItemTrello";
import DataStor from "./DataStor";

const data = DataStor.getData();

const listEl = document.querySelectorAll(".list");
const list = {
  todo: new ItemTrello(document.querySelector(".list__todo")),
  progress: new ItemTrello(document.querySelector(".list__progress")),
  done: new ItemTrello(document.querySelector(".list__done"))
}

for (let row in data) {
  data[row].forEach((item) => list[row].addItem(item, data));
}

const container = document.querySelector('.container');
let actualElement;

const onMouseOver = (e) => {
  actualElement.style.top = e.clientY + 'px';
  actualElement.style.left = e.clientX + 'px';
}

const onMouseUp = (e) => {
  const mouseUpItemWrapper = e.target.closest('.item-wrapper');
  const mouseUpItem = e.target.closest('.item');
  if (mouseUpItemWrapper && mouseUpItem) {
    mouseUpItemWrapper.prepend(actualElement);
    mouseUpItemWrapper.insertBefore(actualElement, mouseUpItem);
  }

  actualElement.classList.remove('dragged');
  actualElement = undefined;

  document.documentElement.removeEventListener('mouseup', onMouseUp);
  document.documentElement.removeEventListener('mouseover', onMouseOver);
}

container.addEventListener('mousedown', e => {
  e.preventDefault();
  actualElement = e.target.closest('.item');
  if (!actualElement || e.target.className.includes("remove-btn")) return;

  actualElement.classList.add('dragged');

  document.documentElement.addEventListener('mouseup', onMouseUp);
  document.documentElement.addEventListener('mouseover', onMouseOver);
})

listEl.forEach((item) => {
  const addBtn = item.querySelector(".add-btn");

  addBtn.addEventListener("click", () => {
    const textContainer = new EnterText(addBtn).addContainerEl();
    const addCard = textContainer.querySelector(".add-card");
    const removeCard = textContainer.querySelector(".remove-card");

    textContainer.children[0].focus();

    addCard.addEventListener("click", () => {
      handlerAddCard(textContainer, item, addBtn)
    });

    textContainer.children[0].addEventListener("keydown", (e) => {
      if (e.key !== 'Enter') return;
      handlerAddCard(textContainer, item, addBtn)
    });

    removeCard.addEventListener("click", () =>
      textContainer.replaceWith(addBtn)
    );
  });
});

function handlerAddCard(textContainer, item, addBtn) {
  const text = textContainer.children[0].value;

  if (!text.trim()) return textContainer.replaceWith(addBtn);
  Object.keys(list).forEach((keys) => {
    if (!item.className.includes(keys)) return;
    const itemObj = {
      id: Date.now(),
      content: text
    };
    list[keys].addItem(itemObj);
    data[keys].push(itemObj);
    DataStor.changeData(data);
  });
  textContainer.replaceWith(addBtn);
}

export function handlerRemoveItem(itemEl, itemObj) {
  for (const keys in data) {
    data[keys] = data[keys].filter(
      (item) => item.id !== itemObj.id
    );
  }
  DataStor.changeData(data);
  itemEl.remove();
}