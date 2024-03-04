import React, { useState, useEffect } from 'react';

const Todo = () => {
    const [todos, setTodos] = useState([]);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [date, setDate] = useState('');
    const [filterDate, setFilterDate] = useState('');

    useEffect(() => {
        try {
            const storedTodos = JSON.parse(localStorage.getItem('todos'));
            setTodos(storedTodos);
        } catch (error) {
            console.error('Error loading todos from local storage:', error);
        }
    }, []);

    useEffect(() => {
        try {
            localStorage.setItem('todos', JSON.stringify(todos));
        } catch (error) {
            console.error('Error saving todos to local storage:', error);
        }
    }, [todos]);

    const handleAddTodo = () => {
        if (!title || !description || !date) return;
        if (title.length < 2 || title.length > 60) {
            alert('Title must be between 2 and 60 characters long.');
            return;
        }
        if (description.length < 2 || description.length > 120) {
            alert('Description must be between 2 and 120 characters long.');
            return;
        }
        const newTodo = { title, description, date };
        setTodos([...todos, newTodo]);
        setTitle('');
        setDescription('');
        setDate('');
    };

    const handleDeleteTodo = (index) => {
        const newTodos = [...todos];
        newTodos.splice(index, 1);
        setTodos(newTodos);
    };

    const handleUpdateTodo = (index, updatedTitle, updatedDescription, message) => {
        if (message === 'updateClicked') {
            if (updatedTitle.length < 2 || updatedTitle.length > 60) {
                alert('Title must be between 2 and 60 characters long.');
                return;
            }
            if (updatedDescription.length < 2 || updatedDescription.length > 120) {
                alert('Description must be between 2 and 120 characters long.');
                return;
            }
        }
        const updatedTodos = [...todos];
        updatedTodos[index].title = updatedTitle;
        updatedTodos[index].description = updatedDescription;
        setTodos(updatedTodos);
    };

    const filteredTodos = filterDate
        ? todos.filter(todo => todo.date === filterDate)
        : todos.filter(todo => {
            const today = new Date().toISOString().slice(0, 10);
            return todo.date === today;
        });

    return (
        <div>
            <h1>Todo App</h1>
            <div style={{ marginTop: '30px' }}>
                <input
                    style={{
                        marginRight: '10px',
                        padding: '8px',
                        borderRadius: '4px',
                        border: '1px solid #ccc',
                        fontFamily: 'Arial, sans-serif',
                        fontSize: '14px',
                        outline: 'none',
                        boxShadow: '0 0 5px rgba(0, 0, 0, 0.1)',
                    }}
                    type="text"
                    placeholder="Title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
                <input
                    style={{
                        width: '500px',
                        marginRight: '10px',
                        padding: '8px',
                        borderRadius: '4px',
                        border: '1px solid #ccc',
                        fontFamily: 'Arial, sans-serif',
                        fontSize: '14px',
                        outline: 'none',
                        boxShadow: '0 0 5px rgba(0, 0, 0, 0.1)',
                    }}
                    type="text"
                    placeholder="Description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />
                <input
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    style={{
                        marginRight: '10px',
                        padding: '8px 12px',
                        borderRadius: '4px',
                        border: '1px solid #ccc',
                        fontFamily: 'Arial, sans-serif',
                        fontSize: '14px',
                        outline: 'none',
                        boxShadow: '0 0 5px rgba(0, 0, 0, 0.1)',
                    }}
                />
                <button type="button" className="btn btn-success" onClick={handleAddTodo}>Add Todo</button>
            </div>
            <div>
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '30px' }}>
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                        <h4 style={{ marginRight: '10px' }}><i class="fa fa-filter"></i></h4>
                        <input
                            type="date"
                            value={filterDate}
                            onChange={(e) => setFilterDate(e.target.value)}
                            style={{
                                padding: '8px 12px',
                                borderRadius: '4px',
                                border: '1px solid #ccc',
                                fontFamily: 'Arial, sans-serif',
                                fontSize: '14px',
                                outline: 'none',
                                boxShadow: '0 0 5px rgba(0, 0, 0, 0.1)',
                            }}
                        />
                    </div>
                </div>

                <table className="table" style={{ marginTop: '30px' }}>
                    <thead>
                        <tr>
                            <th scope="col">S. No.</th>
                            <th scope="col">Title</th>
                            <th scope="col">Description</th>
                            <th scope="col">Date</th>
                            <th scope="col">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredTodos.map((todo, index) => (
                            <tr key={index}>
                                <th scope="row">{index + 1}.</th>
                                <td><input type="text" value={todo.title} onChange={(e) => handleUpdateTodo(index, e.target.value, todo.description)} /></td>
                                <td><input type="text" value={todo.description} onChange={(e) => handleUpdateTodo(index, todo.title, e.target.value)} /></td>
                                <td>{todo.date}</td>
                                <td>
                                    <button style={{ marginRight: '10px' }} type="button" className="btn btn-danger" onClick={() => handleDeleteTodo(index)}>Delete</button>
                                    <button type="button" className="btn btn-primary" onClick={() => handleUpdateTodo(index, todo.title, todo.description, 'updateClicked')}>Update</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

            </div>
        </div>
    );
};

export default Todo;