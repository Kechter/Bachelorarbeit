class ToDoItem extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.shadowRoot.innerHTML = `
            <div>
                <p>Todo Item Component</p>
            </div>
        `;
    }
}

customElements.define('todo-item', ToDoItem)