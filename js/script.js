const dom = {
  new: document.querySelector('#new-task'),
  tasks: document.querySelector('#task')
}
let tasks = []
const tasksFromLocalStorage = JSON.parse(localStorage.getItem("tasks"))

if(tasksFromLocalStorage) {
  tasks = tasksFromLocalStorage
  taskRender(tasks)
} 
dom.new.addEventListener("keyup", (e) => {
  const newTaskText = dom.new.value; 
  if(e.keyCode === 13 && task && isNotHaveTask(newTaskText, tasks))  {
    addTask(newTaskText, tasks)
    dom.new.value = ""
    localStorage.setItem("tasks", JSON.stringify(tasks))
    taskRender(tasks)
  }
} ) 

function addTask(text, list) {
  const timestamp = Date.now()
  const task = {
    id:timestamp, 
    text, 
    isComplete:false
  }
  list.push(task)

}

function isNotHaveTask(text, list){ 
  let isNotHave = true
  if(!list.length){
    return true
  }
  list.forEach((task) => {
    if(task.text === text){
      alert('This task already exists')
      isNotHave=false
    }
  });
  return isNotHave
}

function taskRender(list){ 
  let htmlList = ''
  list.forEach((task) =>{
    const cls = task.isComplete
    ? 'todo__task todo__task-compl'
    : 'todo__task'
    const checked = task.isComplete ? 'checked' : ''

    const taskHtml = `        
    <div id = "${task.id}" class="${cls}">
    <label class="todo__checkbox">
      <input type="checkbox" ${checked}>
      <div class = "todo__checkbox-div"></div>
    </label>
    <div class="todo__task-text"> ${task.text}</div>
    <div class="todo__task-del"></div>
  </div>
  `
  htmlList += taskHtml
  })
  dom.tasks.innerHTML = htmlList
}

dom.tasks.addEventListener("click", (e) =>{
  const target = e.target
  const isCheckboxEl = target.classList.contains('todo__checkbox-div')
  const isDeleteEl = target.classList.contains('todo__task-del')
  if(isCheckboxEl){
    const task = target.parentElement.parentElement
    const taskId = task.getAttribute('id')
    changeTaskStatus (taskId, tasks)
    localStorage.setItem("tasks", JSON.stringify(tasks))
    taskRender(tasks)
  }
  if(isDeleteEl){
    const task = target.parentElement
    const taskId = task.getAttribute('id')
    deleteTask(taskId, tasks)
    localStorage.setItem("tasks", JSON.stringify(tasks))
    taskRender(tasks)
  }
})

function changeTaskStatus(id,list) {
  list.forEach((task)=> {
    if (task.id==id){
      task.isComplete = !task.isComplete
    }
  })
}

function deleteTask(id, list) {
  list.forEach((task,idx)=>{
    if(task.id==id){
      list.splice(idx, 1)
    }
  })
}

// delete list[idx]
// console.log(list[idx])