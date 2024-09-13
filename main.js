// greetings
const greetingElement = document.getElementById('usernameMobile');

async function updateGreeting() {
  try {
    const response = await fetch('userData.json');
    const data = await response.json();
    const userName = data.person1.name;
    greetingElement.innerHTML += `سلام ${userName}`;
  } catch (error) {
    console.error('Error fetching JSON data:', error);
  }
}
updateGreeting();

//calendar requirements
const date = new Date();
const todaysDateMobile = document.getElementById('todaysDateMobile');
todaysDateMobile.innerHTML += new Intl.DateTimeFormat('fa-IR', { dateStyle: 'medium' }).format(date);
// const todaysDateDesktop = document.getElementById('todaysDateDesktop');
// todaysDateDesktop.innerHTML += new Intl.DateTimeFormat('fa-IR', {dateStyle: 'medium'}).format(date);

//hamburger menu operations
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');
const closeMenu = document.getElementById('closeMenu');
const overlay = document.getElementById('overlay');

const closeMobileMenu = () => {
  mobileMenu.classList.add('translate-x-full');
  overlay.classList.add('hidden');
};

hamburger.addEventListener('click', () => {
  mobileMenu.classList.remove('translate-x-full');
  overlay.classList.remove('hidden');
});

closeMenu.addEventListener('click', closeMobileMenu);
overlay.addEventListener('click', closeMobileMenu);


//toggle dark or light mode ------------------------------
// const toggle = document.getElementById('darkModeToggle');
// if (localStorage.getItem('theme') === 'dark') {
//   document.documentElement.classList.add('dark');
//   toggle.checked = true;
// }
// toggle.addEventListener('change', function () {
//   if (toggle.checked) {
//     document.documentElement.classList.add('dark');
//     localStorage.setItem('theme', 'dark');
//   } else {
//     document.documentElement.classList.remove('dark');
//     localStorage.setItem('theme', 'light');
//   }
// });
// ---------------------------------------------------------

//creating a new task
document.addEventListener('DOMContentLoaded', function () {
  const mainDiv = document.getElementById('main');
  const todoDiv = document.getElementById('todo');
  const doneDiv = document.getElementById('done');
  const newTodoDiv = document.getElementById('newtodo');
  const emptyDiv = document.getElementById('empty');
  const todoCountSpan = document.getElementById('todoCount');
  const doneCountSpan = document.getElementById('doneCount');
  let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
  let editingTaskId = null; // Track the task being edited

  // rendering savedtasks onload
  function renderTasks() {
    todoDiv.innerHTML = '';
    doneDiv.innerHTML = '';
    let todoCount = 0;
    let doneCount = 0;

    tasks.forEach(task => {
      createTaskElement(task);
      if (task.completed) {
        doneCount++;
      } else {
        todoCount++;
      }
    });

    updateCounts(todoCount, doneCount);
    checkEmptyState(todoCount);
  }

  // updating counts for  each task
  function updateCounts(todoCount, doneCount) {
    if (todoCount > 0) {
      todoCountSpan.textContent = `${todoCount} تسک را باید انجام دهید.`;
    } else {
      todoCountSpan.textContent = 'تسکی برای امروز نداری!';
    }

    if (doneCount > 0) {
      doneCountSpan.textContent = `${doneCount} تسک را انجام داده‌اید.`;
    } else {
      doneCountSpan.textContent = 'تسک انجام‌شده‌ای وجود ندارد.';
    }
  }

  // visibility of the 'empty' div
  function checkEmptyState(todoCount) {
    if (todoCount === 0) {
      emptyDiv.style.display = 'flex';  // Show
    } else {
      emptyDiv.style.display = 'none';  // Hide
    }
  }

  // create a new task view
  function createTaskElement(task) {
    const taskDiv = document.createElement('div');
    taskDiv.className = 'flex flex-col gap-2 items-start justify-between p-4 border rounded-lg my-4';  // Added 'my-4' for spacing
    taskDiv.setAttribute('data-id', task.id);

    const leftSide = document.createElement('div');
    leftSide.className = 'flex flex-row items-center gap-4';

    const checkBox = document.createElement('input');
    checkBox.type = 'checkbox';
    checkBox.checked = task.completed;
    checkBox.className = 'cursor-pointer';

    const taskTitle = document.createElement('span');
    taskTitle.textContent = task.title;
    if (task.completed) {
      taskTitle.classList.add('line-through', 'text-gray-500');
    }

    checkBox.addEventListener('click', () => toggleTaskCompletion(task.id));

    leftSide.appendChild(checkBox);
    leftSide.appendChild(taskTitle);
    taskDiv.appendChild(leftSide);

    // description
    if (task.description) {
      const taskDescription = document.createElement('p');
      taskDescription.textContent = task.description;
      taskDescription.className = 'text-sm text-gray-500';
      taskDiv.appendChild(taskDescription);
    }

    //  options 
    const moreOptions = document.createElement('button');
    moreOptions.className = 'cursor-pointer relative self-end';
    moreOptions.textContent = '⋮';

    const optionsMenu = document.createElement('div');
    optionsMenu.className = 'absolute bg-white border rounded-lg shadow-lg p-2 hidden';
    moreOptions.appendChild(optionsMenu);

    // hide and showing options onclick
    moreOptions.addEventListener('click', function () {
      optionsMenu.classList.toggle('hidden');
    });

    // delete
    const deleteIcon = document.createElement('button');
    deleteIcon.textContent = '🗑️';
    deleteIcon.className = 'block px-4 py-2';
    deleteIcon.addEventListener('click', function () {
      deleteTask(task.id);
    });
    optionsMenu.appendChild(deleteIcon);

    // edit but only for todo tasks
    if (!task.completed) {
      const editIcon = document.createElement('button');
      editIcon.textContent = '✏️';
      editIcon.className = 'block px-4 py-2';
      editIcon.addEventListener('click', function () {
        editTask(task.id);
      });
      optionsMenu.appendChild(editIcon);
    }

    taskDiv.appendChild(moreOptions);

    if (task.completed) {
      doneDiv.appendChild(taskDiv);
    } else {
      todoDiv.appendChild(taskDiv);
    }
  }

  //  new task creation
  newTodoDiv.addEventListener('click', function () {
    openTaskCreation();
  });

  function openTaskCreation(task = null) {
    const creatingDiv = document.createElement('div');
    creatingDiv.id = 'creating';
    creatingDiv.className = 'flex flex-col gap-4 p-4 border rounded-lg';

    const titleInput = document.createElement('input');
    titleInput.type = 'text';
    titleInput.placeholder = 'نام تسک';
    titleInput.className = 'border p-2 rounded';

    const descInput = document.createElement('textarea');
    descInput.placeholder = 'توضیحات';
    descInput.className = 'border p-2 rounded';

    if (task) {
      titleInput.value = task.title;
      descInput.value = task.description || '';
      editingTaskId = task.id;
    } else {
      editingTaskId = null;
    }

    const buttonRow = document.createElement('div');
    buttonRow.className = 'flex justify-between';

    const addButton = document.createElement('button');
    addButton.textContent = task ? 'ویرایش تسک' : 'اضافه کردن تسک';
    addButton.className = 'bg-blue-500 text-white px-4 py-2 rounded cursor-pointer';
    addButton.addEventListener('click', function () {
      if (editingTaskId) {
        const taskToEdit = tasks.find(t => t.id === editingTaskId);
        taskToEdit.title = titleInput.value;
        taskToEdit.description = descInput.value;
      } else {
        const newTask = {
          id: Date.now(),
          title: titleInput.value,
          description: descInput.value || '',
          completed: false,
        };
        tasks.push(newTask);
      }

      localStorage.setItem('tasks', JSON.stringify(tasks));
      renderTasks();
      mainDiv.style.display = 'block';
      creatingDiv.remove();
    });

    const abortButton = document.createElement('button');
    abortButton.textContent = 'X';
    abortButton.className = 'bg-slate-500 text-white px-4 py-2 rounded cursor-pointer';
    abortButton.addEventListener('click', function () {
      mainDiv.style.display = 'block';
      creatingDiv.remove();
    });

    buttonRow.appendChild(addButton);
    buttonRow.appendChild(abortButton);

    creatingDiv.appendChild(titleInput);
    creatingDiv.appendChild(descInput);
    creatingDiv.appendChild(buttonRow);

    mainDiv.style.display = 'none';
    mainDiv.parentNode.insertBefore(creatingDiv, mainDiv);
  }

  // toggle for task completion
  function toggleTaskCompletion(taskId) {
    const task = tasks.find(t => t.id === taskId);
    task.completed = !task.completed;
    localStorage.setItem('tasks', JSON.stringify(tasks));
    renderTasks();
    // update counts and list containers
  }

  // deleting a task
  function deleteTask(taskId) {
    tasks = tasks.filter(task => task.id !== taskId);
    localStorage.setItem('tasks', JSON.stringify(tasks));
    renderTasks();
    // render tasks
  }

  // editing a task
  function editTask(taskId) {
    const task = tasks.find(t => t.id === taskId);
    openTaskCreation(task);
    // open the task creation form pre-filled with task details instead of alerting -errore qabli
  }

  renderTasks();
});