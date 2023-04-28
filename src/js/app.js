import EnterText from "./EnterText";
import ItemTrello from "./ItemTrello";
import DataStor from "./DataStor";
import Controller from "./Controller";

const data = DataStor.getData();

const listEl = document.querySelectorAll(".list");
const list = {
  todo: new ItemTrello(document.querySelector(".list__todo")),
  progress: new ItemTrello(document.querySelector(".list__progress")),
  done: new ItemTrello(document.querySelector(".list__done")),
};

for (let row in data) {
  data[row].forEach((item) => list[row].addItem(item, data));
}

listEl.forEach((item) => {
  const addBtn = item.querySelector(".add-btn");

  addBtn.addEventListener("click", () => {
    const textContainer = new EnterText(addBtn).addContainerEl();
    const addCard = textContainer.querySelector(".add-card");
    const removeCard = textContainer.querySelector(".remove-card");

    textContainer.children[0].focus();

    addCard.addEventListener("click", () => {
      handlerAddCard(textContainer, item, addBtn);
    });

    textContainer.children[0].addEventListener("keydown", (e) => {
      if (e.key !== "Enter") return;
      handlerAddCard(textContainer, item, addBtn);
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
      content: text,
    };
    list[keys].addItem(itemObj);
    data[keys].push(itemObj);
    DataStor.changeData(data);
  });
  textContainer.replaceWith(addBtn);
}

export function handlerRemoveItem(itemEl, itemObj) {
  for (const keys in data) {
    data[keys] = data[keys].filter((item) => item.id !== itemObj.id);
  }
  DataStor.changeData(data);
  itemEl.remove();
}

const controller = new Controller(document.querySelector(".container"));

document.body.addEventListener("mousedown", controller.onMouseDown);
document.body.addEventListener("mouseup", controller.onMouseUp);
document.body.addEventListener("mousemove", controller.onMouseMove);
