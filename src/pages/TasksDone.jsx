import React, { useEffect, useState } from 'react';
import Sidebar from '../components/Sidebar.jsx';
import api from '../services/api.js';
import { RiCheckboxCircleFill, RiBookFill } from 'react-icons/ri'; // Importa el icono de cuaderno desde react-icons
import '../styles.css';

const TasksDone = () => {
    const [completedTasks, setCompletedTasks] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await api.get('/tareas/');
                setCompletedTasks(response.data.filter(task => task.estado === 'Completada'));
                setLoading(false);
            } catch (error) {
                console.error('Error al obtener datos:', error);
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    const handleTaskCompletion = async (task) => {
        try {
            const updatedTask = { ...task, estado: 'No completada' };
            await api.put(`/tareas/${task.id}/`, updatedTask);
            setCompletedTasks(completedTasks.filter(t => t.id !== task.id));
        } catch (error) {
            console.error('Error al cambiar el estado de completitud de la tarea:', error);
        }
    };

    return (
        <div className="flex flex-col md:flex-row mt-6">
            <Sidebar />
            <div className="flex-1 relative">
                <div className="p-4">
                    <h2 className="text-xl font-semibold mb-4">Tareas Completadas</h2>
                    {loading && <p>Cargando tareas...</p>}
                    {!loading && completedTasks.length === 0 && (
                        <div className="flex flex-col items-center justify-center h-full">
                            <p className="text-2xl mb-4">Aquí aparecerán las tareas que vayas completando</p>
                            <RiBookFill className="text-9xl text-gray-300" /> {/* Usa el icono de cuaderno */}
                        </div>
                    )}
                    {!loading && completedTasks.map((task) => (
                        <div key={task.id} className="flex items-center mb-4 border rounded-md p-4 line-through">
                            <button
                                onClick={() => handleTaskCompletion(task)}
                                className="rounded-full h-6 w-6 mr-2 flex items-center justify-center bg-green-500"
                            >
                                <RiCheckboxCircleFill className="text-white" />
                            </button>
                            <h3>{task.titulo}</h3>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default TasksDone;