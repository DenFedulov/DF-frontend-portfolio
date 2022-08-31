"use strict";

function createInternalLink(path, name) {
  let linkElem = document.createElement("a");

  linkElem.onclick = () => {
    return load("app", path);
  };
  linkElem.innerText = name;
  linkElem.href = path;

  return linkElem;
}

function createRegularLink(url, name) {
  let linkElem = document.createElement("a");
  linkElem.href = url;
  linkElem.target = "_blank";
  linkElem.innerText = name;

  return linkElem;
}

function splitTextByLines(text, array = []) {
  let noReturnsText = text.replace(/\r/g, "");
  for (const line of noReturnsText.split("\n")) {
    array.push(line);
  }
  return array;
}
