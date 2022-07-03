'use strict'

const getSavedTodos = () => {
    const todosJSON = localStorage.getItem('todos')

    try {
    return todosJSON ? JSON.parse(todosJSON):[] }
    catch (e) {return []}
    
}

const saveTodos =  (todos) => {
    localStorage.setItem('todos', JSON.stringify(todos))
}



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


    if (filteredTodos.length>0) {

    filteredTodos.forEach((todo) => {
        document.querySelector('#todos').appendChild(generateTodoDOM(todo))
    }) }

    else {

        const messageElement = document.createElement('p')
        messageElement.classList.add('empty-message')
        messageElement.textContent = "There are no tasks to show"
        document.querySelector("#todos").appendChild(messageElement)
    }
}

const generateTodoDOM =  (todo) => {
    const toDoElement = document.createElement('label')
    const containerElement = document.createElement('div')
    const checkbox = document.createElement('input')
    checkbox.setAttribute('type', 'checkbox')
    checkbox.checked = todo.completed
    checkbox.addEventListener('change', (e) => {
        todo.completed = e.target.checked
        saveTodos(todos)
        renderTodos(todos, filters)
})

toDoElement.appendChild(containerElement)
    containerElement.appendChild(checkbox)
    const p = document.createElement('span')
    const button = document.createElement('button')
    button.textContent = 'Remove'
    button.classList.add("button-text")
    button.addEventListener('click', () => {
        removeToDo(todo.id)
        saveTodos(todos)
        renderTodos(todos, filters)
    })
    
    p.textContent = todo.text

    toDoElement.appendChild(button)
    containerElement.appendChild(p)
    
    toDoElement.classList.add("list-item")
    containerElement.classList.add("list-item-container")  

    return toDoElement

}

// Get the DOM elements for list summary
const generateSummaryDOM = (incompleteTodos) => {
    const summary = document.createElement('h2')
    const plural = incompleteTodos.length === 1 ? "" : "s"
    summary.textContent = `You have  ${incompleteTodos.length} task${plural} left to do`
    return summary
}

//removeto do

function removeToDo (id) {
    const todoIndex = todos.findIndex((todo) =>todo.id === id )
    if(todoIndex > -1 ) {
        todos.splice(todoIndex, 1)
    }

}