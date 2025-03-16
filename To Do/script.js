function addTask() {
  const taskInput = document.getElementById("taskInput");
  const taskList = document.getElementById("taskList");

  if (taskInput.value.trim() === "") return;

  const li = document.createElement("li");
  li.innerHTML = `<span>${taskInput.value}</span> <button class="remove-btn" onclick="removeTask(this)">Remove</button>`;
  taskList.appendChild(li);
  taskInput.value = "";
}

function removeTask(button) {
  button.parentElement.remove();
}
