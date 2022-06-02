// Fetch existing todos from localStorage
const getSavedTodos = function () {
    const todosJSON = localStorage.getItem('todos')

    if (todosJSON !== null) {
        return JSON.parse(todosJSON)
    } else {
        return []
    }
}

// Save todos to localStorage
const saveTodos = function (todos) {
    localStorage.setItem('todos', JSON.stringify(todos))
}



// Render application todos based on filters
const renderTodos = function (todos, filters) {
    const filteredTodos = todos.filter(function (todo) {
        const searchTextMatch = todo.text.toLowerCase().includes(filters.searchText.toLowerCase())
        const hideCompletedMatch = !filters.hideCompleted || !todo.completed

        return searchTextMatch && hideCompletedMatch
    })

    const incompleteTodos = filteredTodos.filter(function (todo) {
        return !todo.completed
    })

    document.querySelector('#todos').innerHTML = ''
    document.querySelector('#todos').appendChild(generateSummaryDOM(incompleteTodos))

    filteredTodos.forEach(function (todo) {
        document.querySelector('#todos').appendChild(generateTodoDOM(todo))
    })
}

// Get the DOM elements for an individual note
const generateTodoDOM = function (todo) {
    const toDoElement = document.createElement('div')
    const checkbox = document.createElement('input')
    checkbox.setAttribute('type', 'checkbox')
    checkbox.checked = todo.completed
    checkbox.addEventListener('change', function(e) {
        todo.completed = e.target.checked
        saveTodos(todos)
        renderTodos(todos, filters)
})
    toDoElement.appendChild(checkbox)
    const p = document.createElement('span')
    const button = document.createElement('button')
    button.textContent = 'x'
    button.addEventListener('click', function() {
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
const generateSummaryDOM = function (incompleteTodos) {
    const summary = document.createElement('h2')
    summary.textContent = `You have ${incompleteTodos.length} todos left`
    return summary
}

//removeto do

function removeToDo (id) {
    const todoIndex = todos.findIndex(function(todo) {
return todo.id === id 

    })
    if(todoIndex > -1 ) {
        todos.splice(todoIndex, 1)
    }

}