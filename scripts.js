const task = document.getElementById("todo-input");
const list = document.getElementById("todo-list");
const update = document.getElementById("update");
// const del = document.getElementById("delete");

update.addEventListener("click", addTask);
function addTask() {
  const taskText = task.value.trim();
  if (taskText === "") return;

  const taskObj = {
    text: taskText,
    complete: false,
  };
  // console.log(taskObj);

  const taskElement = createTaskElement(taskObj);
  list.appendChild(taskElement);

  task.value = "";
  saveTasks();
}

function createTaskElement(taskObj) {
  const li = document.createElement("li");
  if (taskObj.complete) li.classList.add("completed");

  const span = document.createElement("span");
  span.textContent = taskObj.text;
  // console.log(span.textContent);
  // console.log(taskObj);

  const del = document.createElement("button");
  del.textContent = "❌";
  del.addEventListener("click", () => {
    li.remove();
    saveTasks();
  });
  span.addEventListener("click", () => {
    li.classList.toggle("completed");
    saveTasks();
  });

  li.appendChild(span);
  li.appendChild(del);
  return li;
}

function saveTasks() {
  const tasks = [];
  document.querySelectorAll("#todo-list li").forEach((li) => {
    const text = li.querySelector("span").textContent;
    const complete = li.classList.contains("completed");
    tasks.push({ text, complete });
  });
  localStorage.setItem("todo-tasks", JSON.stringify(tasks));
}

window.addEventListener("DOMContentLoaded", () => {
  const saved = JSON.parse(localStorage.getItem("todo-tasks")) || [];
  // console.log(saved);
  saved.forEach((taskObj) => {
    // console.log(taskObj);
    const taskElement = createTaskElement(taskObj);
    // console.log(taskElement);
    list.appendChild(taskElement);
  });
  // console.log(list.value);
});

const filterButtons = document.querySelectorAll(".filter-btn");

filterButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    const filter = btn.dataset.filter;

    filterButtons.forEach((b) => {
      b.classList.remove("active");
    });
    btn.classList.add("active");

    filterTasks(filter);
  });
});

function filterTasks(filter) {
  const allTasks = document.querySelectorAll("#todo-list li");

  allTasks.forEach((li) => {
    const isCompleted = li.classList.contains("completed");

    if (filter === "all") li.style.display = "flex";
    else if (filter === "active")
      li.style.display = isCompleted ? "none" : "flex";
    else if (filter === "completed")
      li.style.display = isCompleted ? "flex" : "none";
  });
}
