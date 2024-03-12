import React from "react";
import './todo.css';
import { v4 as uuidv4 } from 'uuid';

const getCurrentDate = () => {
    const currentDate = new Date().toISOString().slice(0, 10);
    return currentDate;
};

const Modal = ({ showModal, closeModal, modalMode, title, description, date, setTitle, setDescription, setDate, setTodos, modalTitle, modalDescription, modalDate, setModalTitle, setModalDescription, setModalDate, handleSaveChanges }) => {
    const handleSave = () => {
        if (modalMode === 'update') {
            handleSaveChanges();
        }
        if (modalMode === 'add') {
            if (title.length < 2 || title.length > 60) {
                alert('Title must be between 2 and 60 characters long.');
                return;
            }
            if (description.length < 2 || description.length > 120) {
                alert('Description must be between 2 and 120 characters long.');
                return;
            }
            const newTodo = { id: uuidv4(), title, description, date };
            setTodos(prevTodos => [...prevTodos, newTodo]);
            setTitle('');
            setDescription('');
            setDate(getCurrentDate());
        }
        closeModal();
    };
    return (
        showModal &&
        <div className="modal" tabIndex="-1" role="dialog">
            <div className="modal-dialog" role="document">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">{modalMode === 'add' ? 'Add Todo' : 'Update Todo'}</h5>
                        <button type="button" className="close" onClick={closeModal} aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>

                    <form>
                        <div className="form-group">
                            <label htmlFor="exampleFormControlInput1">Title</label>
                            <input type="text" className="form-control" id="exampleFormControlInput1" value={modalMode === 'add' ? title : modalTitle} onChange={(e) => modalMode === 'add' ? setTitle(e.target.value) : setModalTitle(e.target.value)} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="exampleFormControlTextarea1">Description</label>
                            <textarea className="form-control" id="exampleFormControlTextarea1" value={modalMode === 'add' ? description : modalDescription} onChange={(e) => modalMode === 'add' ? setDescription(e.target.value) : setModalDescription(e.target.value)} rows="3"></textarea>
                        </div>
                        <div className="form-group">
                            <label htmlFor="exampleFormControlTextarea1" style={{ marginRight: '10px' }}>Date:</label>
                            <input
                                className='date-input'
                                type="date"
                                value={modalMode === 'add' ? getCurrentDate() : modalDate}
                                // value={modalDate}
                                onChange={(e) => modalMode === 'add' ? setDate(e.target.value) : setModalDate(e.target.value)}
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

export default Modal