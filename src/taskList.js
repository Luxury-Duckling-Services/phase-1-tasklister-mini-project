class TaskList {
    constructor() {
        this.tasks = [];
    }
  
    createNewTask(description , color , priority) {
        const newTask = new Task(description , color , priority);
        let position = parseInt(priority)
        this.tasks.splice(position -1 , 0 , newTask);
    }
  
    renderTasks() {
        return this.tasks.map((task) => task.render()).join("");
    }
  
    deleteTask(description) {
        this.tasks = this.tasks.filter((task) => task.description !== description);
    }

    moveTaskUp(description) {
        let actionDone = false
        this.tasks.forEach((task , index) => {
            if (actionDone === false && index !== 0 && task.description === description) {
                let prev = this.tasks[index - 1]
                this.tasks[index - 1] = this.tasks[index]
                this.tasks[index] = prev
            }
        })
    }

    moveTaskDown(description) {
        let actionDone = false
        this.tasks.forEach((task , index) => {
            if (actionDone === false && index !== this.tasks.length-1  && task.description === description) {
                let behind = this.tasks[index + 1]
                this.tasks[index + 1] = this.tasks[index]
                this.tasks[index] = behind
                actionDone = true
            }
        })
    }

  }
  