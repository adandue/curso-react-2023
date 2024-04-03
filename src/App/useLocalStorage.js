import React from "react";

function useLocalStorage(itemName, initialValue) {
    const [item, setItem] =React.useState(initialValue);
    const [loading, setLoading] =React.useState(true);
    const [error, setError] =React.useState(false);


    
    React.useEffect(() => {
        setTimeout(() => {
        try {
            const localStorageItem = localStorage.getItem(itemName);
        
            let parsedItem;
    
            if (!localStorageItem) {
                localStorage.setItem(itemName, JSON.stringify(initialValue));
                parsedItem = initialValue;
            } else {
                parsedItem = JSON.parse(localStorageItem);
                setItem(parsedItem);
            }
    
            setLoading(false);
        } catch(error) {
            setLoading(false);
            setError(true);
        }
        }, 2000);
    }, []);

    const saveItem = (newItem) => { 
        let stringifyNewTodos = JSON.stringify(newItem);
        localStorage.setItem(itemName, stringifyNewTodos);
        setItem(newItem);
    };

    return {
        item, 
        saveItem, 
        loading, 
        error,
    };
}

export { useLocalStorage };

// localStorage.removeItem('TODOS_V1');
// const defaultTodos = [
//   { text: 'Publicar Traxcavos en facebook', completed: true },
//   { text: 'Tomar el Curso de Intro a React.js', completed: false },
//   { text: 'Transferirle a Martha', completed: true },
//   { text: 'Checar fecha de entrega de Yeso Agrícola', completed: false },
// ];

// localStorage.setItem('TODOS_V1', JSON.stringify(defaultTodos));