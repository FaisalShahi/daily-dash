import React from "react";

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
                <button style={{ marginRight: '10px' }} type="button" className="btn btn-danger" onClick={() => onDelete(todo.id)}>Delete</button>
                <button type="button" className="btn btn-primary" onClick={() => onUpdate(todo.id)}>Update</button>
            </td>
        </tr>
    );
};

export default TodoItem