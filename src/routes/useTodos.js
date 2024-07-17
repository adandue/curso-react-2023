import React from "react";
import { useLocalStorage } from "./useLocalStorage";

function useTodos () {
    const {
        item: todos, 
        saveItem: saveTodos,
        synchronizeItem: synchronizeTodos,
        loading,
        error,
    } = useLocalStorage('TODOS_V2', []);

    const [searchValue, setSearchValue] = React.useState('');
    const [openModal, setOpenModal] = React.useState(false);
    
    const completedTodos = todos.filter(
        todo => !!todo.completed
        ).length;
    
    const totalTodos = todos.length;
    
    let searchedTodos = []

    if(!searchValue.length >= 1) {
        searchedTodos = todos
    } else {
        searchedTodos = todos.filter(
        (todo) => {
        const todoText = todo.text.toLowerCase();
        const searchText = searchValue.toLowerCase();
        return todoText.includes(searchText);
        });
    }

    
    const addTodo = (text) => {
        const id = newTodoId(todos)
        const newTodos = [...todos];
        newTodos.push({
            text,
            completed: false,
            id,
        });
        saveTodos(newTodos);
    };

    const completeTodo = (id) => {
        const newTodos = [...todos];
        const todoIndex = newTodos.findIndex(
        (todo) => todo.id === id
        );
        newTodos[todoIndex].completed = !newTodos[todoIndex].completed;
        saveTodos(newTodos)
    };
    
    const deleteTodo = (id) => {
        const newTodos = [...todos];
        const todoIndex = newTodos.findIndex(
        (todo) => todo.id === id
        );
        newTodos.splice(todoIndex, 1);
        saveTodos(newTodos)
    };

    const states = {
        loading,
        error,
        totalTodos,
        completedTodos,
        searchValue,
        searchedTodos,
        openModal,
    }

    const stateUpdaters = {
        setSearchValue,
        addTodo,
        completeTodo,
        deleteTodo,
        setOpenModal,
        synchronizeTodos,
    }
    
    return { states, stateUpdaters };
}

const newTodoId = (todoList) => {
    if(!todoList.length) {
        return 1
    }
    
    const idList = todoList.map(todo => todo.id)
    const idMax = Math.max(...idList)
    return idMax + 1
}

export { useTodos };