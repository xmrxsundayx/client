import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import Popup from 'reactjs-popup';

const TaskForm = ({ allTasks, setAllTasks }) => {
    return (
        <Popup trigger={<button className="button"> Open Modal </button>} modal nested>
            {close => (
                <div className="modal">
                    <button className="close" onClick={close}>
                        &times;
                    </button>
                    <div className="header"> Modal Title </div>
                    <div className="content">
                        {' '}
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Atque, a nostrum. Dolorem, repellat quidem ut, minima sint vel eveniet quibusdam voluptates delectus doloremque, explicabo tempore dicta adipisci fugit amet dignissimos?
                        <br />
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Consequatur sit commodi beatae optio voluptatum sed eius cumque, delectus saepe repudiandae explicabo nemo nam libero ad, doloribus, voluptas rem alias. Vitae?
                    </div>
                    <div className="actions">
                        <Popup trigger={<button className="button"> Trigger </button>} position="top center" nested>
                            <span>
                                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Beatae magni omnis delectus nemo, maxime molestiae dolorem numquam mollitia, voluptate ea, accusamus excepturi deleniti ratione sapiente! Laudantium, aperiam doloribus. Odit, aut.
                            </span>
                        </Popup>
                        <button
                            className="button"
                            onClick={() => {
                                console.log('modal closed ');
                                close();
                            }}
                        >
                            close modal
                        </button>
                    </div>
                </div>
            )}
        </Popup>
    );
};

export default TaskForm;






//     const [title, setTitle] = useState('');
//     const [start, setStart] = useState('');
//     const [end, setEnd] = useState('');
//     const [complete, setComplete] = useState(false);
//     const [critical, setCritical] = useState(false);
//     const navigate = useNavigate();
//     const [errors, setErrors] = useState({});
//     const [showPopup, setShowPopup] = useState(false);

//     const handleNewTaskSubmit = (e) => {
//         e.preventDefault();
//         axios
//             .post('http://localhost:8000/api/task', {
//                 title,
//                 start,
//                 end,
//                 complete,
//                 critical
//             })
//             .then((res) => {
//                 setAllTasks([...allTasks, res.data]);
//                 setTitle('');
//                 setStart('');
//                 setEnd('');
//                 setComplete(false);
//                 setCritical(false);
//             })
//             .catch((err) => {
//                 setErrors(err.response.data.errors);
//             });
//     };

//     const handleUpdate = (e) => {
//         setAllTasks({
//             ...allTasks,
//             [e.target.name]: e.target.value
//         });
//     };

//     const handleCancel = (e) => {
//         navigate('/');
//     };

//     <popup
//         trigger={ className='pop'}>
//         {close => (
//             <div className='modal'>
//                 <a className='close' onClick={close}>
//                     &times;
//                 </a>
//                 <div className='header'> Task Form </div>
//                 <div className='content'>
//                     {' '}
//                     <form action='' onSubmit={handleNewTaskSubmit}>
                        
//     return (
//         <div className='container form-group'>
//                 <form action='' onSubmit={handleNewTaskSubmit}>
//                     <div className='input-group mb-3'>
//                         <input
//                             className='form-control'
//                             type='text'
//                             name='title'
//                             value={title}
//                             onChange={handleChange}
//                         />
//                         <button className='btn btn-outline-secondary' type='submit' onClick={handleNewTaskSubmit}>
//                             ADD
//                         </button>
//                         <button className='btn btn-outline-secondary' type='submit' onClick={handleUpdate}>
//                             UPDATE
//                         </button>
//                         <button className='btn btn-outline-secondary' type='button' onClick={handleCancel}>
//                 CANCEL
//                         </button>
//                     </div>
//                 </form>
//             </popup>
//         </div>
//     );
// };

// export default TaskForm;
