class Task {
    constructor(description , color , priority) {
      this.description = description;
      this.color = color
      this.priority = priority
    }
  
    render() {
      return `
        <li>
          <span data-description="${this.description}" style="color:${this.color}">${this.description}</span>
          <button data-description="${this.description}" class="x">X</button>
          <button data-description="${this.description}" class = "edit">Edit</button>
          <button data-description="${this.description}" class = "up">⬆️</button>
          <button data-description="${this.description}" class = "down">⬇️</button>
        </li>
        `;
    }
  }

  