const body = document.body;
body.append("Appended string");
// body.appendChild("Hello world"); Uncaught TypeError: Failed to execute 'appendChild' on 'Node': parameter 1 is not of type 'Node'. at test.js:3

const div = document.createElement("div");
div.innerText = "Appended div with text";
body.appendChild(div);
body.append(div); // not appending because it's already appended

const divt = document.querySelector("div");
console.log(divt.innerText); // equal to text shown on page
console.log(divt.textContent); // equal to text shown in html

const div2 = document.createElement("div");
div2.innerHTML = "<em>Appended div with text and hmtl code</em>";
body.append(div2);

const em = document.createElement("em");
em.innerText = "Appended text with em";
body.append(em);

const span = document.querySelector("#sp");
span.remove();

const span2 = document.querySelector("#sp2");
console.log(span2.getAttribute("id"));
console.log(span2.id);
console.log(span2.title);
span2.title = "new title";
console.log(span2.title);
span2.removeAttribute("Title");
console.log(span2.title);

console.log(span2.dataset);
console.log(span2.dataset.test);
console.log(span2.dataset.testName);
span2.dataset.test = "789";
span2.dataset.testName = "0";
console.log(span2.dataset.test);
console.log(span2.dataset.testName);

console.log(span2.classList);
span2.classList.remove("test2");
console.log(span2.classList);
span2.classList.add("test3");
console.log(span2.classList);
span2.classList.toggle("test");
console.log(span2.classList);
span2.classList.toggle("test3", false);
console.log(span2.classList);
span2.classList.toggle("test3", true);
console.log(span2.classList);

span2.style.backgroundColor = "red";

function changeImage() {
  const x = document.getElementById("img");
  if (x.getAttribute("src") == "/media/dog.jpg") {
    x.src = "/media/dog.gif";
  } else {
    x.src = "/media/dog.jpg";
  }
}
