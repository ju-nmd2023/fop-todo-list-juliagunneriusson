function addTask() {
  // Get task input value
  let taskInput = document.getElementById("taskInput");
  let taskText = taskInput.value.trim();

  // Check if task is not empty
  if (taskText !== "") {
    // Create new list item
    let li = document.createElement("li");
    li.textContent = taskText;

    // Create checkbox
    let checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.addEventListener("change", toggleTaskCompletion); // Add event listener to toggle task completion
    li.appendChild(checkbox);
    

    // Include delete emoji within the list item
    let deleteEmoji = document.createTextNode("❎");
    li.appendChild(deleteEmoji);

    // Add event listener to delete task when clicking the delete emoji
    li.addEventListener("click", deleteTask);

    // Append list item to task list
    document.getElementById("taskList").appendChild(li);

    // Clear input field
    taskInput.value = "";
  }
}



function toggleTaskCompletion(event) {
    let checkbox = event.target;
    let li = checkbox.parentNode;
  
    if (checkbox.checked) {
        li.classList.add("completed");
        checkbox.checked = true; // 
    } else {
        li.classList.remove("completed");
        checkbox.checked = false; // Manually set the checkbox state to unchecked
    }
}

// Function to delete task
function deleteTask() {
  this.parentNode.removeChild(this);
}


