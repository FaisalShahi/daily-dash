import React, { useState, useEffect, useMemo, useCallback } from 'react';
import './todo.css';

const getCurrentDate = () => {
    const currentDate = new Date().toISOString().slice(0, 10);
    return currentDate;
};

const TodoItem = ({ todo, index, onDelete, onUpdate, onShowMore, expanded }) => {
    return (
        <tr>
            <th scope="row">{index + 1}.</th>
            <td>
                <span>
                    {expanded ? (
                        <>{todo.title}</>
                    ) : (
                        <>
                            {todo.title.slice(0, 30)}
                            {todo.title.length > 30 && "..."}
                            {todo.title.length > 30 && <br />}
                            {todo.title.length > 30 && <button className="btn btn-link" onClick={() => onShowMore(index)}>more</button>}
                        </>
                    )}
                </span>
            </td>
            <td>
                <span>
                    {expanded ? (
                        <>{todo.description}</>
                    ) : (
                        <>
                            {todo.description.slice(0, 60)}
                            {todo.description.length > 60 && "..."}
                            {todo.description.length > 60 && <br />}
                            {todo.description.length > 60 && <button className="btn btn-link" onClick={() => onShowMore(index)}>more</button>}
                        </>
                    )}
                </span>
            </td>
            <td>{todo.date}</td>
            <td>
                <button style={{ marginRight: '10px' }} type="button" className="btn btn-danger" onClick={() => onDelete(index)}>Delete</button>
                <button type="button" className="btn btn-primary" onClick={() => onUpdate(index, todo.title, todo.description, todo.date)}>Update</button>
            </td>
        </tr>
    );
};

const Modal = ({ showModal, closeModal, modalTitle, modalDescription, modalDate, setModalTitle, setModalDescription, setModalDate, handleSaveChanges }) => {
    const handleSave = () => {
        handleSaveChanges();
        closeModal();
    };
    return (
        showModal &&
        <div className="modal" tabIndex="-1" role="dialog">
            <div className="modal-dialog" role="document">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">Update Todo</h5>
                        <button type="button" className="close" onClick={closeModal} aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>

                    <form>
                        <div className="form-group" style={{ paddingLeft: '10px', paddingRight: '10px', paddingTop: '10px', textAlign: 'left' }}>
                            <label htmlFor="exampleFormControlInput1">Title</label>
                            <input type="text" className="form-control" id="exampleFormControlInput1" value={modalTitle} onChange={(e) => setModalTitle(e.target.value)} />
                        </div>
                        <div className="form-group" style={{ paddingLeft: '10px', paddingRight: '10px', paddingTop: '10px', textAlign: 'left' }}>
                            <label htmlFor="exampleFormControlTextarea1">Description</label>
                            <textarea className="form-control" id="exampleFormControlTextarea1" value={modalDescription} onChange={(e) => setModalDescription(e.target.value)} rows="3"></textarea>
                        </div>
                        <div className="form-group" style={{ paddingLeft: '10px', paddingRight: '10px', paddingTop: '10px', textAlign: 'left' }}>
                            <label htmlFor="exampleFormControlTextarea1" style={{ marginRight: '10px' }}>Date:</label>
                            <input
                                className='date-input'
                                type="date"
                                value={modalDate}
                                onChange={(e) => setModalDate(e.target.value)}
                            />
                        </div>
                    </form>

                    <div className="modal-footer">
                        <button type="button" className="btn btn-primary" onClick={handleSave}>Save Changes</button>
                    </div>
                </div>
            </div>
        </div>
    );
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
    const [filterDate, setFilterDate] = useState(getCurrentDate());
    const [expandedTodoIndex, setExpandedTodoIndex] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [modalData, setModalData] = useState();
    const [modalTitle, setModalTitle] = useState('');
    const [modalDescription, setModalDescription] = useState('');
    const [modalDate, setModalDate] = useState('');

    const handleAddTodo = useCallback(() => {
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
        setTodos(prevTodos => [...prevTodos, newTodo]);
        setTitle('');
        setDescription('');
        setDate(getCurrentDate());
    }, [title, description, date]);

    const handleDeleteTodo = useCallback((index) => {
        const newTodos = [...todos];
        newTodos.splice(index, 1);
        setTodos(newTodos);
    }, [todos]);

    const handleUpdateTodo = useCallback(
        (index, updatedTitle, updatedDescription, updatedDate) => {
            setShowModal(true);
            console.log('todo=>', index, ':', todos[index]);
            setModalData(todos[index]);
            setModalTitle(updatedTitle)
            setModalDescription(updatedDescription)
            setModalDate(updatedDate)
            const updatedTodos = [...todos];
            updatedTodos[index].title = updatedTitle;
            updatedTodos[index].description = updatedDescription;
            updatedTodos[index].date = updatedDate
            setTodos(updatedTodos);
        },
        [todos]
    );

    const handleShowMore = useCallback((index) => {
        setExpandedTodoIndex(expandedTodoIndex === index ? null : index);
    }, [expandedTodoIndex]);

    const handleSaveChanges = () => {
        handleUpdateTodo(
            todos.findIndex(todo => todo === modalData),
            modalTitle,
            modalDescription,
            modalDate
        );
        closeModal()
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
                <input
                    className='title-input'
                    type="text"
                    placeholder="Title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
                <input
                    className='description-input'
                    type="text"
                    placeholder="Description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />
                <input
                    className='date-input'
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                />
                <button type="button" className="btn btn-success" onClick={handleAddTodo}>Add Todo</button>
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
                            key={index}
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