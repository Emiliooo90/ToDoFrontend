import React, { useEffect, useState } from 'react';
import Sidebar from '../components/Sidebar.jsx';
import api from '../services/api.js';
import { FaClock } from 'react-icons/fa';
import '../styles.css';

const TasksPending = () => {
    const [pendingTasks, setPendingTasks] = useState([]);

    useEffect(() => {
        const fetchPendingTasks = async () => {
            try {
                const response = await api.get('/tareas/');
                // Filtrar solo las tareas con fecha_fin definido
                const filteredTasks = response.data.filter(task => task.fecha_fin !== null && task.estado !== 'Completada');
                setPendingTasks(filteredTasks);
            } catch (error) {
                console.error('Error fetching pending tasks:', error);
            }
        };

        fetchPendingTasks();
    }, []);

    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(dateString).toLocaleDateString('es-CL', options);
    };

    return (
        <div className="flex flex-col md:flex-row mt-6">
            <Sidebar />
            <div className="flex-1 relative">
                <div className="p-4">
                    <h2 className="text-xl font-semibold mb-4">Tareas Pendientes</h2>
                    {pendingTasks.length === 0 && <p className="text-center">No hay tareas pendientes</p>}
                    {pendingTasks.map((task) => (
                        <div key={task.id} className="flex items-center mb-4 border rounded-md p-4 relative">
                            <FaClock className="text-black mr-2" />
                            <h3>{task.titulo}</h3>
                            <p className="ml-auto">{formatDate(task.fecha_fin)}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default TasksPending;