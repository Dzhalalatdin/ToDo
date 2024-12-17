const inputElement = document.getElementById("title");
const buttonElement = document.getElementById("create");
const listElement = document.getElementById("list");

const notes = [
  {
    title: "Note 1",
    content: "This is the first note.",
    id: 1,
    completeNumbersWithAction: false,
  },
  {
    title: "Note 2",
    content: "This is the second note.",
    id: 2,
    completeNumbersWithAction: true,
  },
];

function render() {
  listElement.innerHTML = "";
  if (notes.length === 0) {
    listElement.textContent = "Нет задач";
    return;
  }
  for (let i = 0; i < notes.length; i++) {
    listElement.insertAdjacentHTML("afterbegin", getNoteTemplate(notes[i], i));
  }
}

render();

buttonElement.addEventListener("click", () => {
  if (inputElement.value.length === 0) {
    return;
  }
  const newNote = {
    title: inputElement.value,
    content: "",
    id: notes.length + 1,
    completeNumbersWithAction: false,
  };

  notes.push(newNote);
  render();

  inputElement.value = "";
});

listElement.addEventListener("click", (event) => {
  // console.log(event.target.dataset.index);
  if (event.target.dataset.index) {
    const index = parseInt(event.target.dataset.index);
    const type = event.target.dataset.type;

    if (type === "toggle") {
      notes[index].completeNumbersWithAction =
        !notes[index].completeNumbersWithAction;
      render();
      console.log("toggle", index, notes[index].completeNumbersWithAction);
    } else if (type === "delete") {
      notes.splice(index, 1);
      render();
      console.log("delete", index);
    }
  }
});

function getNoteTemplate(note, index) {
  console.log(note.completeNumbersWithAction);
  return `
    <li class="list-group-item d-flex justify-content-between align-items-center">
      <span class="${
        note.completeNumbersWithAction ? "text-decoration-line-through" : ""
      }">${note.title}</span>
      <span>
        <span class="btn btn-small btn-${
          note.completeNumbersWithAction ? "warning" : "success"
        }" data-type="toggle" data-index="${index}")">&check;</span>
        <span class="btn btn-small btn-danger" data-type="delete" data-index="${index}">&times;</span>
      </span>
    </li>
  `;
}

// Object Theory

// const person = {
//   name: "Dzhal",
//   age: 24,
//   hasGirlFriend: false,
//   languages: ["English", "Russian"],
//   friends: [
//     { name: "Mikhail", age: 25 },
//     { name: "Vasiliy", age: 30 },
//   ],
//   greet() {
//     console.log(`Hello, my name is ${this.name}!`);
//   },
// };

// console.log(person.age);
// console.log(person["languages"]);
// const key = "hasGirlFriend";
// console.log(person[key]);
// person.hasGirlFriend = true;
// console.log(person[key]);
