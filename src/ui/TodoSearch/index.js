import React from 'react';

import './TodoSearch.css';
import { useSearchParams } from 'react-router-dom';

function TodoSearch({ setSearchValue, loading}) {

    const [searchParams, setSearchParams] = useSearchParams()
    const paramsValue = searchParams.get('search')

    const onSearchValueChange = ({target: {value}}) => {
        setSearchValue(value)
        setSearchParams({search: value})
    }

return (
    <input
    placeholder="Utiliza este campo para filtrar tus TODOs"
    className="TodoSearch"
    value={paramsValue ?? ''}
    onChange={onSearchValueChange}
    disabled = {loading}
    />
);
}

export { TodoSearch };