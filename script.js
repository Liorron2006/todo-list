document.addEventListener("DOMContentLoaded", loadTasks);

function saveTasksToLocalStorage() {
  const tasks = [];
  const items = document.querySelectorAll("#task-list li");

  items.forEach(function(li) {
    const text = li.querySelector("span").textContent;
    const img = li.querySelector("img");
    const imageUrl = img ? img.src : "";
    tasks.push({ text: text, image: imageUrl });
  });

  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function loadTasks() {
  const saved = localStorage.getItem("tasks");
  if (saved) {
    const tasks = JSON.parse(saved);
    tasks.forEach(function(task) {
      addTask(task.text, task.image);
    });
  }
}

function addTask(taskText, imageUrl) {
  const input = document.getElementById("task-input");
  const value = taskText || input.value.trim();

  if (value === "") {
    alert("אנא הכנס משימה לפני ההוספה.");
    return;
  }

  const ul = document.getElementById("task-list");
  const li = document.createElement("li");
  li.className = "task-item";

  const topRow = document.createElement("div");
  topRow.className = "task-top-row";

  const span = document.createElement("span");
  span.textContent = value;

  const editBtn = document.createElement("button");
  editBtn.textContent = "✏️";
  editBtn.className = "edit-btn";

  const deleteBtn = document.createElement("button");
  deleteBtn.textContent = "🗑️";
  deleteBtn.className = "delete-btn";

  const imageBtn = document.createElement("button");
  imageBtn.textContent = "🖼️";
  imageBtn.className = "image-btn";

  topRow.appendChild(span);
  topRow.appendChild(editBtn);
  topRow.appendChild(deleteBtn);
  topRow.appendChild(imageBtn);

  li.appendChild(topRow);

  if (imageUrl) {
    const img = document.createElement("img");
    img.src = imageUrl;
    img.className = "task-image";
    li.appendChild(img);
  }

  ul.appendChild(li);

  deleteBtn.onclick = function () {
    ul.removeChild(li);
    saveTasksToLocalStorage();
  };

  editBtn.onclick = function () {
    const newText = prompt("ערוך את המשימה:", span.textContent);
    if (newText !== null && newText.trim() !== "") {
      span.textContent = newText.trim();
      saveTasksToLocalStorage();
    }
  };

  imageBtn.onclick = function () {
    const url = prompt("הכנס כתובת URL לתמונה:");
    if (url) {
      const img = document.createElement("img");
      img.src = url;
      img.className = "task-image";
      const oldImage = li.querySelector("img");
      if (oldImage) li.removeChild(oldImage);
      li.appendChild(img);
      saveTasksToLocalStorage();
    }
  };

  if (!taskText) {
    input.value = "";
    saveTasksToLocalStorage();
  }
}

function clearAllTasks() {
  const ul = document.getElementById("task-list");
  if (ul.children.length === 0) {
    alert("אין משימות למחיקה.");
    return;
  }

  if (confirm("האם אתה בטוח שברצונך למחוק את כל המשימות?")) {
    ul.innerHTML = "";
    localStorage.removeItem("tasks");
  }
}
