import React, { useState } from 'react';
import { RiCheckboxCircleFill, RiCheckboxBlankCircleLine } from 'react-icons/ri';

const TaskCard = ({ data, onTaskCompletionChange }) => {
    const [tasks, setTasks] = useState(data);

    const handleTaskCompletion = (taskId, completed) => {
        onTaskCompletionChange(taskId, completed);
    };

    const handleLocalTaskCompletion = (task) => {
        const updatedTasks = tasks.map((t) =>
            t.id === task.id ? { ...t, completed: !t.completed } : t
        );
        setTasks(updatedTasks);
        handleTaskCompletion(task.id, !task.completed);
    };

    return (
        <div className="flex justify-center p-4">
            <div className="flex justify-center">
                <div className="bg-white shadow-md rounded-lg p-6">
                    <h2 className="text-xl font-semibold mb-4">Tareas</h2>
                    {tasks && tasks.map((task) => (
                        <div key={task.id} className={`flex items-center mb-4 border rounded-md p-4 ${task.completed ? 'line-through' : ''}`}>
                            <button
                                onClick={() => handleLocalTaskCompletion(task)}
                                className={`rounded-full h-6 w-6 mr-2 flex items-center justify-center ${task.completed ? 'bg-green-500' : 'bg-gray-300'}`}
                            >
                                {task.completed ? <RiCheckboxCircleFill className="text-white" /> : <RiCheckboxBlankCircleLine />}
                            </button>
                            <h3>{task.titulo}</h3>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default TaskCard;