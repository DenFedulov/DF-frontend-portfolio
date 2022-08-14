const body = document.body;
body.append("Appended string");
// body.appendChild("Hello world"); Uncaught TypeError: Failed to execute 'appendChild' on 'Node': parameter 1 is not of type 'Node'. at test.js:3

const div = document.createElement("div");
div.innerText = "Appended div with text";
body.appendChild(div);
body.append(div); // not appending because it's already appended

const divt = document.querySelector("div");
wConsoleLog(divt.innerText); // equal to text shown on page
wConsoleLog(divt.textContent); // equal to text shown in html

const div2 = document.createElement("div");
div2.innerHTML = "<em>Appended div with text and hmtl code</em>";
body.append(div2);

const em = document.createElement("em");
em.innerText = "Appended text with em";
body.append(em);

const span = document.querySelector("#sp");
span.remove();

const span2 = document.querySelector("#sp2");
wConsoleLog(span2.getAttribute("id"));
wConsoleLog(span2.id);
wConsoleLog(span2.title);
span2.title = "new title";
wConsoleLog(span2.title);
span2.removeAttribute("Title");
wConsoleLog(span2.title);

wConsoleLog(span2.dataset);
wConsoleLog(span2.dataset.test);
wConsoleLog(span2.dataset.testName);
span2.dataset.test = "789";
span2.dataset.testName = "0";
wConsoleLog(span2.dataset.test);
wConsoleLog(span2.dataset.testName);

wConsoleLog(span2.classList);
span2.classList.remove("test2");
wConsoleLog(span2.classList);
span2.classList.add("test3");
wConsoleLog(span2.classList);
span2.classList.toggle("test");
wConsoleLog(span2.classList);
span2.classList.toggle("test3", false);
wConsoleLog(span2.classList);
span2.classList.toggle("test3", true);
wConsoleLog(span2.classList);

span2.style.backgroundColor = "red";

function changeImage() {
  const x = document.getElementById("img");
  if (x.getAttribute("src") == "/media/dog.jpg") {
    x.src = "/media/dog.gif";
  } else {
    x.src = "/media/dog.jpg";
  }
}
