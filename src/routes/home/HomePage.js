import React from 'react';
import { useTodos } from '../useTodos';
import { TodoHeader } from '../../ui/TodoHeader';
import { TodoCounter } from '../../ui/TodoCounter';
import { TodoSearch } from '../../ui/TodoSearch';
import { TodoList } from '../../ui/TodoList';
import { TodoItem } from '../../ui/TodoItem';
import { TodosError } from '../../ui/TodosError';
import { TodosLoading } from '../../ui/TodosLoading';
import { EmptyTodos } from '../../ui/EmptyTodos';
import { TodoForm } from '../../ui/TodoForm';
import { CreateTodoButton } from '../../ui/CreateTodoButton';
import { Modal } from '../../ui/Modal';
import { ChangeAlert } from '../../ui/ChangeAlert';

function HomePage() {
    const { states, stateUpdaters } = useTodos();

    const {
    loading,
    error,
    totalTodos,
    completedTodos,
    searchValue,
    searchedTodos,
    openModal,
    } = states

    const {
    setSearchValue,
    addTodo,
    completeTodo,
    deleteTodo,
    setOpenModal,
    synchronizeTodos,
    } = stateUpdaters

    return (
    <React.Fragment>
        <TodoHeader loading={loading}>
        <TodoCounter
            totalTodos={totalTodos}
            completedTodos={completedTodos}
        />
        <TodoSearch
            searchValue={searchValue}
            setSearchValue={setSearchValue}
        />
        </TodoHeader>

        <TodoList
            error={error}
            loading={loading}
            totalTodos={totalTodos}
            searchedTodos={searchedTodos}
            searchText={searchValue}
            onError={() => <TodosError />}
            onLoading={() => <TodosLoading />}
            onEmptyTodos={() => <EmptyTodos />}
            onEmptySearchResults={
            (searchText) => <p>No hay resultados para {searchText}</p>
        }
        >
        {todo => (
            <TodoItem
            key={todo.text}
            text={todo.text}
            completed={todo.completed}
            onComplete={() => completeTodo(todo.text)}
            onDelete={() => deleteTodo(todo.text)}
            />
        )}
        </TodoList>

        {!!openModal && (
        <Modal>
            <TodoForm
            addTodo={addTodo}
            setOpenModal={setOpenModal}
            />
        </Modal>
        )}

        <CreateTodoButton
        setOpenModal={setOpenModal}
        />

        <ChangeAlert
        synchronize={synchronizeTodos}
        />
    </React.Fragment>
    );
}

export { HomePage };