// Fetch existing todos from localStorage
const getSavedTodos = () => {
    const todosJSON = localStorage.getItem('todos')

    if (todosJSON !== null) {
        return JSON.parse(todosJSON)
    } else {
        return []
    }
}

// Save todos to localStorage
const saveTodos =  (todos) => {
    localStorage.setItem('todos', JSON.stringify(todos))
}



// Render application todos based on filters
const renderTodos = (todos, filters) => {
    const filteredTodos = todos.filter((todo) => {
        const searchTextMatch = todo.text.toLowerCase().includes(filters.searchText.toLowerCase())
        const hideCompletedMatch = !filters.hideCompleted || !todo.completed

        return searchTextMatch && hideCompletedMatch
    })

    const incompleteTodos = filteredTodos.filter((todo) => {
        return !todo.completed
    })

    document.querySelector('#todos').innerHTML = ''
    document.querySelector('#todos').appendChild(generateSummaryDOM(incompleteTodos))

    filteredTodos.forEach((todo) => {
        document.querySelector('#todos').appendChild(generateTodoDOM(todo))
    })
}

// Get the DOM elements for an individual note
const generateTodoDOM =  (todo) => {
    const toDoElement = document.createElement('div')
    const checkbox = document.createElement('input')
    checkbox.setAttribute('type', 'checkbox')
    checkbox.checked = todo.completed
    checkbox.addEventListener('change', (e) => {
        todo.completed = e.target.checked
        saveTodos(todos)
        renderTodos(todos, filters)
})
    toDoElement.appendChild(checkbox)
    const p = document.createElement('span')
    const button = document.createElement('button')
    button.textContent = 'x'
    button.addEventListener('click', () => {
        removeToDo(todo.id)
        saveTodos(todos)
        renderTodos(todos, filters)
    })
    
    p.textContent = todo.text
    
   
    toDoElement.appendChild(p)
    toDoElement.appendChild(button)
    return toDoElement
}

// Get the DOM elements for list summary
const generateSummaryDOM = (incompleteTodos) => {
    const summary = document.createElement('h2')
    summary.textContent = `You have ${incompleteTodos.length} todos left`
    return summary
}

//removeto do

function removeToDo (id) {
    const todoIndex = todos.findIndex((todo) =>todo.id === id )
    if(todoIndex > -1 ) {
        todos.splice(todoIndex, 1)
    }

}