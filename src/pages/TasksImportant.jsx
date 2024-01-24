import React, { useEffect, useState } from 'react';
import Sidebar from '../components/Sidebar.jsx';
import api from '../services/api.js';
import {
    RiCheckboxCircleFill,
    RiCheckboxBlankCircleLine,
    RiStarFill,
    RiStarLine
} from 'react-icons/ri';
import '../styles.css';

const TasksImportant = () => {
    const [tasks, setTasks] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await api.get('/tareas/');
                setTasks(response.data.filter(task => task.categoria === 'Importante' && task.estado !== 'Completada'));
            } catch (error) {
                console.error('Error al obtener datos:', error);
            }
        };

        fetchData();
    }, []);

    const handleTaskCompletion = async (taskId) => {
        try {
            const updatedTask = { ...tasks.find(task => task.id === taskId), estado: 'Completada' };
            await api.put(`/tareas/${taskId}/`, updatedTask);
            setTasks(tasks.map(task => (task.id === taskId ? updatedTask : task)));
        } catch (error) {
            console.error('Error al cambiar el estado de completitud de la tarea:', error);
        }
    };

    const handleTaskUncompletion = async (taskId) => {
        try {
            const updatedTask = { ...tasks.find(task => task.id === taskId), estado: 'No completada' };
            await api.put(`/tareas/${taskId}/`, updatedTask);
            setTasks(tasks.map(task => (task.id === taskId ? updatedTask : task)));
        } catch (error) {
            console.error('Error al cambiar el estado de completitud de la tarea:', error);
        }
    };

    const handleToggleImportant = async (taskId) => {
        try {
            const taskToUpdate = tasks.find(task => task.id === taskId);
            const updatedTask = { ...taskToUpdate, categoria: taskToUpdate.categoria === 'Importante' ? 'No importante' : 'Importante' };
            await api.put(`/tareas/${taskId}/`, updatedTask);
            setTasks(tasks.map(task => (task.id === taskId ? updatedTask : task)));
        } catch (error) {
            console.error('Error al cambiar la importancia de la tarea:', error);
        }
    };

    return (
        <div className="flex flex-col md:flex-row mt-6">
            <Sidebar />
            <div className="flex-1 relative">
                <div className="p-4">
                    <h2 className="text-xl font-semibold mb-4">Tareas Importantes</h2>
                    {tasks.length === 0 && <p className="text-center">No hay tareas importantes</p>}
                    {tasks.map((task) => (
                        <div key={task.id} className="flex items-center mb-4 border rounded-md p-4 relative">
                            <button
                                onClick={() => task.estado === 'Completada' ? handleTaskUncompletion(task.id) : handleTaskCompletion(task.id)}
                                className="rounded-full h-6 w-6 mr-2 flex items-center justify-center bg-gray-300"
                                title={task.estado === 'Completada' ? "Desmarcar como completada" : "Marcar como completada"}
                            >
                                {task.estado === 'Completada' ? <RiCheckboxCircleFill className="text-white" /> : <RiCheckboxBlankCircleLine />}
                            </button>
                            <h3>{task.titulo}</h3>
                            <button
                                onClick={() => handleToggleImportant(task.id)}
                                className="rounded-full h-6 w-6 flex items-center justify-center bg-gray-300 ml-auto"
                                title={task.categoria === 'Importante' ? "Desmarcar como importante" : "Marcar como importante"}
                            >
                                {task.categoria === 'Importante' ? <RiStarFill className="text-yellow-500" /> : <RiStarLine />}
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default TasksImportant;