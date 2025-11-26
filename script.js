// Get HTML elements
const inputBox = document.getElementById("input-box");
const listContainer = document.getElementById("list-container");
const completedCounter = document.getElementById("completed-counter");
const uncompletedCounter = document.getElementById("uncompleted-counter");

// Function to update task counters
function updateCounters() {
  const completedTasks = document.querySelectorAll("li.completed").length;
  const uncompletedTasks = document.querySelectorAll("li:not(.completed)").length;

  completedCounter.textContent = completedTasks;
  uncompletedCounter.textContent = uncompletedTasks;
}

// Function to add a new task
function addTask() {
  const task = inputBox.value.trim();

  // If the input box is empty
  if (!task) {
    alert("Please write down a task");
    return;
  }

  // Create a new list item
  const li = document.createElement("li");

  // Add HTML structure of the task
  li.innerHTML = `
    <label>
      <input type="checkbox">
      <span>${task}</span>
    </label>
    <span class="edit-btn">Edit</span>
    <span class="delete-btn">Delete</span>
  `;

  // Add the list item to the list
  listContainer.appendChild(li);

  // Clear the input box
  inputBox.value = "";

  // Select task elements
  const checkbox = li.querySelector("input");
  const editBtn = li.querySelector(".edit-btn");
  const deleteBtn = li.querySelector(".delete-btn");
  const taskSpan = li.querySelector("label span");

  // Checkbox event → mark as completed or not
  checkbox.addEventListener("click", function () {
    li.classList.toggle("completed", checkbox.checked);
    updateCounters();
  });

  // Edit button → modify the task text
  editBtn.addEventListener("click", function () {
    const update = prompt("Edit task:", taskSpan.textContent);
    if (update !== null) {
      taskSpan.textContent = update;
      // Remove completed status if edited
      li.classList.remove("completed");
      checkbox.checked = false;
      updateCounters();
    }
  });

  // Delete button → remove the task
  deleteBtn.addEventListener("click", function () {
    if (confirm("Are you sure you want to delete this task?")) {
      li.remove();
      updateCounters();
    }
  });

  // Update counters on new task
  updateCounters();
}
