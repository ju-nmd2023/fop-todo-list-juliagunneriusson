


function saveTask() {
  const nameElement = document.getElementById("next");

  let listitems = {
    name: nameElement.value,
    completed: false, 
  };

  if (localStorage.listitems === undefined) {
    localStorage.listitems = JSON.stringify([]);
  }
  let listitemsArray = JSON.parse(localStorage.listitems);
  listitemsArray.push(listitems);
  localStorage.setItem("listitems", JSON.stringify(listitemsArray));

  nameElement.value = "";

  displayListitems();
}

function displayListitems() {
  if (localStorage.listitems !== undefined) {
    let listitemsArray = JSON.parse(localStorage.listitems);
    listitemsArray.sort(function (a, b) {
      return b.items - a.items;
    });

    const listitemsElement = document.getElementById("listitems");
    listitemsElement.innerText = "";
    for (let i = 0; i < listitemsArray.length; i++) {
      const items = listitemsArray[i];
      const item = document.createElement("li");
      item.innerText = items.name;
      
      // Apply line-through style if task is completed
      if (items.completed) {
        item.style.textDecoration = "line-through";
      }

      listitemsElement.appendChild(item);

      // Create checkbox
      const checkbox = document.createElement("input");
      checkbox.type = "checkbox";
      checkbox.checked = items.completed;
      item.appendChild(checkbox);

      // Checkbox event listener to mark task as done
      checkbox.addEventListener("change", () => {
        items.completed = checkbox.checked; 
        localStorage.setItem("listitems", JSON.stringify(listitemsArray)); 
        updateTaskStyle(item, checkbox.checked); 
      });

      //remove button
      const button = document.createElement("button");
      button.innerText = "Delete";
      item.appendChild(button);
      button.addEventListener("click", () => {
        listitemsArray.splice(i, 1);
        localStorage.setItem("listitems", JSON.stringify(listitemsArray));
        displayListitems();
      });
    }
  }
}

function updateTaskStyle(taskElement, isChecked) {
  if (isChecked) {
    taskElement.style.textDecoration = "line-through";
  } else {
    taskElement.style.textDecoration = "none";
  }
}

function loadHandler() {
  const saveButton = document.getElementById("save");
  saveButton.addEventListener("click", function () {
    saveTask();
  });
}

window.addEventListener("load", loadHandler);
window.addEventListener("load", displayListitems);

document.addEventListener("DOMContentLoaded", function() {
  loadHandler();
  displayListitems();
});