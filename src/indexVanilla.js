import { createStore } from "redux";

// const add = document.getElementById("add");
// const minus = document.getElementById("minus");
// const number = document.querySelector("span");

// let count = 0;

// const countModifire = (state = 0, action) => {
//   // console.log(count, action);
//   if (action.type === "ADD") {
//     return count++;
//   } else if (action.type === "MINUS") {
//     return count--;
//   } else {
//     return count;
//   }
// };
// // ** data를 변경해주는 것은 오직 여기 reducer안!

// // 2. reducer를 만들어야함, 리듀서는 function이다 : 당신의 data를 modify하는
// // ex) count를 increase하거나 decrease함

// // 유일하게 data를 바꿀 수 있는 곳

// // * modify : 조정

// number.innerText = 0;

// const countStore = createStore(countModifire);
// // 1. store 생성 : data를 저장하고 곳

// const onChange = () => {
//   number.innerText = countStore.getState();
// };

// countStore.subscribe(onChange);
// // subscribe() : 변화를 알려주는 메서드

// const handleAdd = () => {
//   countStore.dispatch({ type: "ADD" });
// };
// const handleMinus = () => {
//   countStore.dispatch({ type: "MINUS" });
// };

// add.addEventListener("click", handleAdd);
// minus.addEventListener("click", handleMinus);

// Vanilla ToDo

const form = document.querySelector("form");
const input = document.querySelector("input");
const ul = document.querySelector("ul");

const ADD_TODO = "ADD_TODO";
const DELETE_TODO = "ADD_DELETE";

const addToDo = (text) => {
  return {
    type: ADD_TODO,
    text,
  };
};

const deleteToDo = (id) => {
  return {
    type: DELETE_TODO,
    id,
  };
};

const reducer = (state = [], action) => {
  console.log(action);
  switch (action.type) {
    case ADD_TODO:
      return [{ text: action.text, id: Date.now() }, ...state];
    // ** mutate대신 이런 식으로 하는 것이 가장 좋은 방법이다. **
    // 새로운 state를 create하고 그 새로운 state를 return 하는 것이 베스트
    // ... (스프레드 연산자) ES6 문법을 쓰는 것이다.
    // 스프레드 연산자의 뜻 : array가 아니라 안에 있는 content를 원하는 뜻이다.
    //그렇다면 저기 있는 return은 array의 컨텐츠로 새로운 object로 array를 만든다는 것

    case DELETE_TODO:
      const cleaned = state.filter((toDo) => toDo.id !== parseInt(action.id));
      return cleaned;
    default:
      return state;
  }

  // ** filter 메서드 : 조건에 맞춰 '새로운 배열'을 반환하기에 mutate 안하는 걸로 매우 적절
};

// ** Warning "Mutate"하지 말아야한다.
// Example) push 메서드를 쓰는 것
// mutate가 아니라 새로운 object를 리턴해야한다. 상태를 수정하는 것이 아니라. **

const store = createStore(reducer);

// const createTodo = (toDo) => {
//   const li = document.createElement("li");
//   li.innerText = toDo;
//   ul.appendChild(li);
// };

// *Vanilla JS Version :
// User가 Submit하면 리스트를 만들고 리스트 아이템을 리스트에 넣어주는
// CreateTodo를 호출한다.

// ----------------

//**Redux Version

// dispatch를 사용한다.

store.subscribe(() => console.log(store.getState()));

const dispatchAddToDo = (text) => {
  store.dispatch(addToDo(text));
};

const dispatchDeleteToDo = (e) => {
  const id = parseInt(e.target.parentNode.id);
  store.dispatch(deleteToDo(id));

  // target ParentNode 알아야함
  // * 삭제할때 id가 필요함
};

const paintToDos = () => {
  const toDos = store.getState();
  ul.innerHTML = "";
  // 리스트가 연속해서 나타나는 현상 고치기위한 innerHTML
  // forEach에서 paint 해주기전 이미 paint된 ul안 li들을 없애주는 것
  toDos.forEach((toDo) => {
    const li = document.createElement("li");
    const btn = document.createElement("button");
    btn.innerText = "DEL";
    btn.type = "button";
    btn.addEventListener("click", dispatchDeleteToDo);
    li.id = toDo.id;
    console.log(toDo.id);
    li.innerText = toDo.text;
    li.appendChild(btn);
    ul.appendChild(li);
  });
};

store.subscribe(paintToDos);

const onSubmit = (e) => {
  e.preventDefault();
  const toDo = input.value;
  input.value = "";
  // 인풋 입력후 바로 비워주게 만드는 것 "" 공백 만들기
  dispatchAddToDo(toDo);
  //*Vanilla JS Version createTodo(toDo);
};

form.addEventListener("submit", onSubmit);
