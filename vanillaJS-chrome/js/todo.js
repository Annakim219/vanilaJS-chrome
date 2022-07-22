const toDoForm = document.getElementById("todo-form");
const toDoInput = toDoForm.querySelector("input");
const toDoList = document.getElementById("todo-list");

function deleteTodo(event) {
  // 버튼 클릭시 발생하는 evevt를 함수 인자로 넣어줌.
  const li = event.target.parentElement; // event.target(=button)의 부모 요소.
  li.remove(); // li를 삭제시킴.
}

function PaintToDo(newTodo) {
  const li = document.createElement("li"); // li 요소 생성
  const span = document.createElement("span"); // span 요소 생성
  span.innerText = newTodo; // input으로 입력되는 텍스트를 span innerText로 넣어줌.
  const button = document.createElement("button"); // button 요소 생성
  button.innerText = "❌"; // button에 아이콘 삽입
  li.appendChild(span); // span을 li의 자식요소로 넣어줌.
  li.appendChild(button); // button을 li의 자식요소로 넣어줌
  button.addEventListener("click", deleteTodo);
  // 버튼 실행시 todo 내용을 삭제 시키기 위한 이벤트를 발생시킴.
  toDoList.appendChild(li); // li를 ul(toDoList)의 자식요소로 넣어줌.
}

function handleInputSubmit(event) {
  // form submit시 일어난 event가 핸들러함수의 인자가 됨.
  event.preventDefault(); // submit의 기본동작인 '새로고침'을 막아줌.
  const newTodo = toDoInput.value;
  // newTodo에 최근 value 값을 할당(복사)
  toDoInput.value = "";
  // input은 공란으로 비워줌.
  PaintToDo(newTodo);
  // PaintToDo 함수의 인자로 newTodo를 넣어줌.
}

toDoForm.addEventListener("submit", handleInputSubmit);
// toDoForm이 submit 될 때, handleInpuSubmit 함수가 실행됨.
