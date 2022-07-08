const loginInput = document.querySelector("#login-form input");
const loginForm = document.querySelector("#login-form");
const greeting = document.querySelector("#greeting");

const HIDDEN_CLASSLIST = "hidden";
const USERNAME_KEY = "username";

const onloginSubmit = (event) => {
  event.preventDefault(); // 브라우저의 기본 동작을 막아줌 -> in here : form submit 새로고침을 막아줌.
  loginForm.classList.add(HIDDEN_CLASSLIST);
  const username = loginInput.value;
  localStorage.setItem(USERNAME_KEY, username);
  paintGreeting(username);
};

const paintGreeting = (username) => {
  greeting.classList.remove(HIDDEN_CLASSLIST);
  greeting.innerText = `Hello! ${username} :)`;
};

const savedUsername = localStorage.getItem(USERNAME_KEY); // 로컬 스토리지(API) 확인
if (savedUsername === null) {
  loginForm.classList.remove(HIDDEN_CLASSLIST);
  loginForm.addEventListener("submit", onloginSubmit);
} else {
  greeting.classList.remove(HIDDEN_CLASSLIST);
  paintGreeting(savedUsername);
}
