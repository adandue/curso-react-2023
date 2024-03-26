import React from 'react';
import { TodoHeader } from '../TodoHeader'
import { TodoCounter} from '../TodoCounter'
import { TodoSearch } from '../TodoSearch'
import { TodoList } from '../TodoList';
import { TodoItem } from '../TodoItem';
import { TodosLoading } from '../TodosLoading';
import { TodosError } from '../TodosError';
import { EmptyTodos } from '../EmptyTodos';
import { CreateTodoButton } from '../CreateTodoButton';
import { TodoContext } from '../TodoContext';
import { Modal } from '../Modal';
import { TodoForm } from '../TodoForm';


function AppUI() {

const {
        loading,
        error,
        searchedTodos,
        completeTodo,
        deleteTodo,
        openModal,
        setOpenModal,
        completedTodos,
        totalTodos,
        searchValue,
        setSearchValue,
} = React.useContext( TodoContext );

    return (
        <>
        <TodoHeader>
            <TodoCounter 
            totalTodos={totalTodos}
            completedTodos={completedTodos}
            />
            <TodoSearch 
            searchValue={searchValue}
            setSearchValue={setSearchValue}
            />
            </TodoHeader>
        <TodoList>
            { loading && <TodosLoading />}
            { error && <TodosError />}
            { (!loading && searchedTodos.length === 0 ) && <EmptyTodos />}
            
            {searchedTodos.map(todo => (
        <TodoItem
            key={todo.text}
            text={todo.text}
            completed={todo.completed}
            onComplete={() => completeTodo(todo.text)}
            onDelete={() => deleteTodo(todo.text)}
        />
        ))}
        </TodoList>
        
        <CreateTodoButton 
            setOpenModal={ setOpenModal }
        />
        { openModal  && (
        <Modal>
            <TodoForm />
        </Modal>
        )}
        </>
    );
}

export { AppUI };