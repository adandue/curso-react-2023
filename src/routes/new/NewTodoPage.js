import React from "react";
import { TodoForm } from "../../ui/TodoForm";

const NewTodoPage = () => {
    return (
        <TodoForm
            label='Escribe tu nuevo TODO'
            submitText='Añadir'
            submitEvent={() => console.log('Llamar a addTODO')}
        />
    )
}

export { NewTodoPage }