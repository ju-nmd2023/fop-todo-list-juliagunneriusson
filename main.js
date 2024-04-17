function saveTask() {
    const nameElement = document.getElementById("next");
  
    let listitems = {
      name: nameElement.value,
    };
  
    if (localStorage.listitems === undefined) {
      localStorage.listitems = JSON.stringify([]);
    }
    let listitemsArray = JSON.parse(localStorage.listitems);
    listitemsArray.push(listitems);
    localStorage.listitems = JSON.stringify(listitemsArray);
  
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
      for (let items of listitemsArray) {
        const item = document.createElement("li");
        item.innerText = items.name;
        listitemsElement.appendChild(item);
  
        // Create checkbox
        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        item.appendChild(checkbox);
  
        //remove button
        const button = document.createElement("button");
        button.innerText = "Delete";
        item.appendChild(button);
        button.addEventListener("click", () => {
          listitemsArray.splice(listitemsArray.indexOf(items), 1);
          localStorage.setItem("listitems", JSON.stringify(listitemsArray));
  
          displayListitems();
        });
      }
  
      // Checkbox event listener to mark task as done
      const checkboxes = document.querySelectorAll('input[type="checkbox"]');
      checkboxes.forEach((checkbox, index) => {
        const taskName = listitemsElement.children[index].querySelector("span");
        checkbox.addEventListener("change", () => {
          if (checkbox.checked) {
            taskName.style.textDecoration = "line-through";
          } else {
            taskName.style.textDecoration = "none";
          }
        });
      });
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
  
