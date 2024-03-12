import React, { useState, useEffect, useMemo, useCallback } from 'react';
import Modal from './Modal';
import TodoItem from './Item';
import './todo.css';

const getCurrentDate = () => {
    const currentDate = new Date().toISOString().slice(0, 10);
    return currentDate;
};

const Todo = () => {
    const [todos, setTodos] = useState(() => {
        try {
            const storedTodos = JSON.parse(localStorage.getItem('todos'));
            return storedTodos || [];
        } catch (error) {
            console.error('Error loading todos from local storage:', error);
            return [];
        }
    });
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [date, setDate] = useState(getCurrentDate());
    const [modalMode, setModalMode] = useState('');
    const [filterDate, setFilterDate] = useState(getCurrentDate());
    const [expandedTodoIndex, setExpandedTodoIndex] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [modalData, setModalData] = useState(null);
    const [modalTitle, setModalTitle] = useState('');
    const [modalDescription, setModalDescription] = useState('');
    const [modalDate, setModalDate] = useState('');

    const handleAddTodo = () => {
        setModalMode('add')
        setShowModal(true)
    }

    const handleDeleteTodo = useCallback((id) => {
        const newTodos = todos.filter(todo => todo.id !== id);
        setTodos(newTodos);
    }, [todos]);

    const handleUpdateTodo = useCallback(
        (id) => {
            setShowModal(true);
            setModalMode('update')
            const todo = todos.find(todo => todo.id === id);
            if (todo) {
                setModalData(todo);
                setModalTitle(todo.title);
                setModalDescription(todo.description);
                setModalDate(todo.date);
            }
        },
        [todos]
    );

    const handleShowMore = useCallback((index) => {
        setExpandedTodoIndex(expandedTodoIndex === index ? null : index);
    }, [expandedTodoIndex]);

    const handleSaveChanges = () => {
        const updatedTodos = todos.map(todo =>
            todo.id === modalData.id ? { ...todo, title: modalTitle, description: modalDescription, date: modalDate } : todo
        );
        if (modalTitle.length < 2 || modalTitle.length > 60) {
            alert('Title must be between 2 and 60 characters long.');
            return;
        }
        if (modalDescription.length < 2 || modalDescription.length > 120) {
            alert('Description must be between 2 and 120 characters long.');
            return;
        }
        setTodos(updatedTodos);
        closeModal();
    };

    const closeModal = () => {
        setShowModal(false);
    };

    useEffect(() => {
        try {
            localStorage.setItem('todos', JSON.stringify(todos));
        } catch (error) {
            console.error('Error saving todos to local storage:', error);
        }
    }, [todos]);

    const filteredTodos = useMemo(() => {
        return filterDate
            ? todos.filter(todo => todo.date === filterDate)
            : todos.filter(todo => {
                const today = new Date().toISOString().slice(0, 10);
                return todo.date === today;
            });
    }, [todos, filterDate]);

    return (
        <div>
            <Modal
                showModal={showModal}
                closeModal={closeModal}
                modalMode={modalMode}
                title={title}
                description={description}
                date={date}
                setTitle={setTitle}
                setDescription={setDescription}
                setDate={setDate}
                setTodos={setTodos}
                modalTitle={modalTitle}
                modalDescription={modalDescription}
                modalDate={modalDate}
                setModalTitle={setModalTitle}
                setModalDescription={setModalDescription}
                setModalDate={setModalDate}
                handleSaveChanges={handleSaveChanges}
            />
            <h1>Todo App</h1>
            <div style={{ marginTop: '30px' }}>
                <button type="button" className="btn btn-success btn-lg" onClick={handleAddTodo}>Add Todo</button>
            </div>
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '30px' }}>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                    <h4 style={{ marginRight: '10px' }}><i className="fa fa-filter"></i></h4>
                    <input
                        className='date-input'
                        type="date"
                        value={filterDate}
                        onChange={(e) => setFilterDate(e.target.value)}
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
                        <TodoItem
                            key={todo.id}
                            todo={todo}
                            index={index}
                            onDelete={handleDeleteTodo}
                            onUpdate={handleUpdateTodo}
                            onShowMore={handleShowMore}
                            expanded={expandedTodoIndex === index}
                        />
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Todo;