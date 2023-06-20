import React, { useEffect, useState } from 'react';
import axios from 'axios';

const TaskList = ({ allTasks, setAllTasks }) => {
    const [title, setTitle] = useState('');
    const [start, setStart] = useState('');
    const [end, setEnd] = useState('');
    const [errors, setErrors] = useState({});
    const [showModal, setShowModal] = useState(false);
    const [selectedTaskIndex, setSelectedTaskIndex] = useState(null);
    const [modalType, setModalType] = useState(''); // ["Create", "Update"

    // ****************************************
    // get all tasks - works and finished
    useEffect(() => {
        axios
            .get('http://localhost:8000/api/task')
            .then((res) => {
                setAllTasks(res.data);
            })
            .catch((err) => console.log(err));
    }, []);

    // ****************************************
    // delete task - works and finished
    const deleteTask = (index) => {
        axios
            .delete('http://localhost:8000/api/task/' + allTasks[index]._id)
            .then((res) => {
                const newTask = [...allTasks];
                newTask.splice(index, 1);
                setAllTasks(newTask);
            })
            .catch((err) => console.log(err));
    };

    // ****************************************
    // toggle complete - works and finished
    const toggleComplete = (index) => {
        const newTask = [...allTasks];
        newTask[index].isComplete = !newTask[index].isComplete;
        setAllTasks(newTask);
    };

    const openModal = (index, status) => {
        setSelectedTaskIndex(index);
        setShowModal(true);
        setModalType(status);
    };

    const closeModal = () => {
        setSelectedTaskIndex(null);
        setShowModal(false);
    };

    const createTask = (e) => {
        e.preventDefault();
        axios
            .post('http://localhost:8000/api/task', {
                title,
                start,
                end
            })
            .then((res) => {
                setAllTasks([...allTasks, res.data]);
                setTitle('');
                setStart('');
                setEnd('');
                closeModal();
            })
            .catch((err) => {
                setErrors(err.response.data.errors);
            });
    };

    const updateTask = (e) => {
        e.preventDefault();
        axios
            .patch(`http://localhost:8000/api/task/${allTasks[selectedTaskIndex]._id}`, {
                title,
                start,
                end
            })
            .then((res) => {
                const newTask = [...allTasks];
                newTask[selectedTaskIndex] = res.data;
                setAllTasks(newTask);
                setTitle('');
                setStart('');
                setEnd('');
                closeModal();
                console.log(res.data);
            })
            .catch((err) => {
                setErrors(err.response.data.errors);
            });
    };


    return (
        <>
            <div className='task-list-container p-3'>
                <h3 className='table-header mb-3'>CRITICAL TASKS</h3>
                <table className='table table-striped'>
                    <tbody>
                        {Array.from({ length: 3 }).map((_, index) => {
                            const task = allTasks[index];
                            return (
                                <tr key={index}>
                                    <td>
                                        {task ? (
                                            <div className='form-check'>
                                                <input
                                                    type='checkbox'
                                                    className='form-check-input'
                                                    onChange={() => toggleComplete(index)}
                                                    checked={task.isComplete || false}
                                                />
                                                <label
                                                    className='form-check-label w-100 text-left'
                                                    onClick={() => openModal(index, "Update")}
                                                >
                                                    <span
                                                        className={
                                                            task.isComplete ? 'text-decoration-line-through' : ''
                                                        }
                                                    >
                                                        {task.title}
                                                    </span>
                                                </label>
                                            </div>
                                        ) : (
                                            <div className='form-check'>
                                                <span
                                                    onClick={() => openModal(index, "Create")}
                                                    className='text-muted'>
                                                    Create A Task
                                                </span>
                                            </div>
                                        )}
                                    </td>
                                    <td className='text-end'>
                                        {task ? (
                                            <button
                                                className='btn btn-sm btn-outline-danger rounded-5'
                                                onClick={() => deleteTask(index)}
                                            >
                                                x
                                            </button>
                                        ) : (
                                            <span></span>
                                        )}
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
            <div className='task-list-container p-3'>
                <h3 className='table-header mb-3'>OTHER TASKS</h3>
                <table className='table table-striped'>
                    <tbody>
                        {allTasks.map((tasks, index) => {
                            const task = allTasks[index];
                            return (
                                <tr key={index}>
                                    <td>
                                        {task ? (
                                            <div className='form-check'>
                                                <input
                                                    type='checkbox'
                                                    className='form-check-input'
                                                    onChange={() => toggleComplete(index)}
                                                    checked={task.isComplete || false}
                                                />
                                                <label
                                                    className='form-check-label'
                                                    onClick={() => openModal(index, "Update")}
                                                >
                                                    <span
                                                        className={
                                                            task.isComplete ? 'text-decoration-line-through' : ''
                                                        }
                                                    >
                                                        {task.title}
                                                    </span>
                                                </label>
                                            </div>
                                        ) : (
                                            <div className='form-check'>
                                                <span
                                                    onClick={() => openModal(index, "Create")}
                                                    className='text-muted'>
                                                    No data
                                                </span>
                                            </div>
                                        )}
                                    </td>
                                    <td className='text-end'>
                                        {task ? (
                                            <button
                                                className='btn btn-sm btn-outline-danger rounded-5'
                                                onClick={() => deleteTask(index)}
                                            >
                                                x
                                            </button>
                                        ) : (
                                            <span></span>
                                        )}
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>

            {showModal && selectedTaskIndex !== null && (
                <div className='modal'>
                    <div className='modal-content'>
                        <span className='close' onClick={closeModal}>
                            &times;
                        </span>
                        <form onSubmit={modalType==="Create"?  createTask : updateTask}>
                            <input
                                type='text'
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                placeholder='Task title'
                            />
                            <input
                                type='text'
                                value={start}
                                onChange={(e) => setStart(e.target.value)}
                                placeholder='Start date'
                            />
                            <input
                                type='text'
                                value={end}
                                onChange={(e) => setEnd(e.target.value)}
                                placeholder='End date'
                            />
                            <button className='btn btn-sm btn-outline-primary rounded-5' type='submit'>
                                {modalType === "Create"? "Create" : "Update"}
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </>
    );
};

export default TaskList;