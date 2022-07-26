const gparent = document.getElementById("gparent-id");
const parent = Array.from(document.getElementsByClassName("parent"));
//getElementsByClassName returns array of elements

const parent2 = document.querySelector("#second-parent");
// querySelector selects like CSS selectors. If ."name" is used it selects first element it could find.

const parent3 = document.querySelectorAll("#second-parent");
// querySelectorAll selects like CSS selectors.

// All of the above works with elements as well

const parents = Array.from(gparent.children);
const childs1 = parents[0].children;

const childOne = document.querySelector("#child1");
const parent_of_child = childOne.parentElement;
const gparent_of_child = childOne.closest(".gparent");

changeColor(gparent, "#333");

parent.forEach((element) => {
  changeColor(element, "#aaa");
});

changeColor(parent2, "#777");

parents.forEach((element) => {
  changeColor(childs1[0], "#aba");
});

changeColor(gparent, "#333");

changeColor(childOne, "#8b8");
changeColor(parent_of_child, "#8f8");
changeColor(gparent_of_child, "#8dd");

function changeColor(element, color) {
  element.style.backgroundColor = color;
}
