document.addEventListener("DOMContentLoaded", () => {
  // add colors
  const colorsChooser = document.getElementById("colors-chooser")
  const colorsList = ["black" , "red" , "blue" , "purple" , "green"]
  colorsList.forEach( (color)=> {
    let colorOption = document.createElement('option')
    colorOption.value = color
    colorOption.innerText = color
    colorOption.style.color = color
    colorsChooser.append(colorOption)
  })

  // initialize taskList class
  const taskList = new TaskList();
  //grab all the necessary DOM elements

  //form and relevant input fields
  const newTaskForm = document.getElementById("create-task-form");
  const newTaskDescription = document.getElementById("new-task-description");
  const newTaskPriority = document.getElementById("new-task-priority");
  
  // add priority chooser

  let priorityOption = document.createElement('option')
  priorityOption.value = '1'
  priorityOption.innerText = '1'
  newTaskPriority.append(priorityOption)

  //ul where new tasks will live on the DOM
  const taskUl = document.getElementById("tasks");

  const renderApp = () => (taskUl.innerHTML = taskList.renderTasks());
  
  //attach event listeners for color selector
   
  let colorChosen = 'black'

  colorsChooser.addEventListener("change" , (e)=>{
    colorChosen = e.target.value
    newTaskDescription.style.color = e.target.value
  })

  //attach event listeners for priority selector

  let priority = '1'

  newTaskPriority.addEventListener("change" , (e)=>{
    priority = (parseInt(e.target.value)).toString()
  })

  //attach event listeners for form

  newTaskForm.addEventListener("submit", (e) => {
    e.preventDefault();
    
    if (newTaskDescription.value.trim() === '') {
      alert('Please enter something to create new tasks.')
    } else{
      let existed = false

      taskList.tasks.forEach( (task) => {
        if (task.description.trim() === newTaskDescription.value.trim()) {
          existed = true
        }
      })

      if (!existed) {
        taskList.createNewTask(newTaskDescription.value , colorChosen , priority);
        
        // reset form
        e.target.reset();

        // reset color
        colorChosen = 'black'
        newTaskDescription.style.color = 'black'
        
        // reset priority

        priority = '1'
        priorityOption = document.createElement('option')
        priorityOption.value = (taskList.tasks.length + 1).toString()
        priorityOption.innerText = (taskList.tasks.length + 1).toString()
        newTaskPriority.append(priorityOption)

        // update tasks' priority

        taskList.tasks.forEach( (task , index) => {
          task.priority = (index + 1).toString()
        })

        // 

        renderApp();
      } else {
        alert("Task already exists.")
      }
    }

  });

  //attach event listeners for tasks

  taskUl.addEventListener("click", (e) => {
    if (e.target.className === "x") {
      taskList.deleteTask(e.target.dataset.description);
      newTaskPriority.removeChild(newTaskPriority.lastChild);

      // update tasks' priority

      taskList.tasks.forEach( (task , index) => {
        task.priority = (index + 1).toString()
      })

      renderApp();
    }

    if (e.target.className === "up") {
      taskList.moveTaskUp(e.target.dataset.description);
      
      // update tasks' priority

      taskList.tasks.forEach( (task , index) => {
        task.priority = (index + 1).toString()
      })
      
      renderApp();
    }

    if (e.target.className === "down") {
      taskList.moveTaskDown(e.target.dataset.description);
      
      // update tasks' priority

      taskList.tasks.forEach( (task , index) => {
        task.priority = (index + 1).toString()
      })
      
      renderApp();
    }

    if (e.target.className === "edit") {
      if (newTaskDescription.value.trim() !== '') {
        alert('Finish editting the current description first before editting other items.')
      } else {        
        taskList.tasks.forEach( (task , index)=> {
          if (task.description === e.target.dataset.description) {
              colorsChooser.value = task.color
              newTaskDescription.style.color = task.color
              colorChosen = task.color

              newTaskPriority.value = task.priority
              priority = task.priority
              
          }
        })

        taskList.deleteTask(e.target.dataset.description);
        newTaskPriority.removeChild(newTaskPriority.lastChild);
      
        newTaskDescription.value = e.target.dataset.description

        // update tasks' priority

        taskList.tasks.forEach( (task , index) => {
          task.priority = (index + 1).toString()
        })

        renderApp();
      }

    }

  });

});
