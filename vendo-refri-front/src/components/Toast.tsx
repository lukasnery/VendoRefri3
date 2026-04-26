export function toast(msg: string) {
  const div = document.createElement("div");

  div.innerText = msg;

  div.style.position = "fixed";
  div.style.bottom = "20px";
  div.style.right = "20px";
  div.style.background = "#333";
  div.style.color = "#fff";
  div.style.padding = "10px";
  div.style.borderRadius = "8px";

  document.body.appendChild(div);

  setTimeout(() => {
    div.remove();
  }, 2000);
}