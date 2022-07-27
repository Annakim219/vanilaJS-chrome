const toDoForm = document.getElementById("todo-form");
const toDoInput = toDoForm.querySelector("input");
const toDoList = document.getElementById("todo-list");

let toDos = [];
// toDos가 계속 빈값이면 새로 입력되는 값에 덮어쓰기됨. parsedTodo를 재할당해줌.

const TODOS_KEY = "todos";

function SaveTodos() {
  localStorage.setItem(TODOS_KEY, JSON.stringify(toDos));
  //JSON.stringify를 이용해서 toDos배열을 string으로 만들어 로컬스토리지로 저장
}

function deleteToDo(event) {
  // 버튼 클릭시 발생하는 evevt를 함수 인자로 넣어줌.
  const li = event.target.parentElement; // event.target(=button)의 부모 요소.
  li.remove(); // li를 삭제시킴.
  toDos = toDos.filter((toDo) => toDo.id !== parseInt(li.id)); // 필터를 사용해 삭제를 원하는 아이템을 제외한 새로운 어레이를 만들고
  SaveTodos(); // 저장해준다.
}

function PaintToDo(newTodo) {
  const li = document.createElement("li"); // li 요소 생성
  li.id = newTodo.id;
  const span = document.createElement("span"); // span 요소 생성
  span.innerText = newTodo.text; // input으로 입력되는 텍스트를 span innerText로 넣어줌.
  const button = document.createElement("button"); // button 요소 생성
  button.innerText = "❌"; // button에 아이콘 삽입
  li.appendChild(span); // span을 li의 자식요소로 넣어줌.
  li.appendChild(button); // button을 li의 자식요소로 넣어줌
  button.addEventListener("click", deleteToDo);
  // 버튼 실행시 todo 내용을 삭제 시키기 위한 이벤트를 발생시킴.
  toDoList.appendChild(li); // li를 ul(toDoList)의 자식요소로 넣어줌.
}

function handleInputSubmit(event) {
  // form submit시 일어난 event가 핸들러함수의 인자가 됨.
  event.preventDefault(); // submit의 기본동작인 '새로고침'을 막아줌.
  const newTodo = toDoInput.value;
  // newTodo에 최근 value 값을 할당(복사)
  const newTodoObj = { text: newTodo, id: Date.now() };
  toDoInput.value = "";
  // input은 공란으로 비워줌.
  toDos.push(newTodoObj); // 로컬 스토리지 저장을 위해 newTodo를 toDos로 추가(푸시)
  PaintToDo(newTodoObj);
  // PaintToDo 함수의 인자로 newTodo를 넣어줌.
  SaveTodos();
}

toDoForm.addEventListener("submit", handleInputSubmit);
// toDoForm이 submit 될 때, handleInpuSubmit 함수가 실행됨.

const savedTodos = localStorage.getItem(TODOS_KEY);
// 로컬스토리지에 저장된 todos를 받아옴.

if (savedTodos) {
  // savedTodos !== null과 같음., 저장된 데이터가 없으면 null
  const parsedToDos = JSON.parse(savedTodos);
  // 로컬스토리지에 저장된 string 데이터를 array로 parse해줌.
  toDos = parsedToDos; // 기존 데이터를 유지하면서, 로컬스토리지로 저장하기 위해.
  parsedToDos.forEach(PaintToDo);
  // forEach는 배열의 각 item들 마다 function을 적용시킬 수 있는 메소드.
}
