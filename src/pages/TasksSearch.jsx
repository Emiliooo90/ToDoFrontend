import React, { useState, useEffect } from 'react';
import { AiOutlineSearch } from 'react-icons/ai'; // Importa el ícono de búsqueda
import Sidebar from '../components/Sidebar.jsx';
import api from '../services/api.js';
import '../styles.css';

const TasksSearch = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [tasks, setTasks] = useState([]);
    const [filteredTasks, setFilteredTasks] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await api.get('/tareas/');
                setTasks(response.data);
            } catch (error) {
                console.error('Error al obtener datos:', error);
            }
        };

        fetchData();
    }, []);

    useEffect(() => {
        const filtered = tasks.filter(task =>
            task.titulo.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFilteredTasks(filtered);
    }, [searchTerm, tasks]);

    const handleSearchTermChange = (event) => {
        setSearchTerm(event.target.value);
    };

    return (
        <div className="flex mt-6">
            <Sidebar />
            <div className="flex-1 p-6">
                <h1 className="text-3xl font-bold mb-6">Buscar tareas</h1>
                <div className="relative">
                    <input
                        type="text"
                        value={searchTerm}
                        onChange={handleSearchTermChange}
                        placeholder="Busca entre todas tus tareas..."
                        className="pl-10 border border-gray-300 rounded-md px-4 py-2 w-full mb-6"
                    />
                    <div className="absolute top-0 left-0 flex items-center h-full ml-3 pointer-events-none">
                        <AiOutlineSearch className="text-black-500 h-ful mb-6" size={20} />
                    </div>
                </div>
                <div>
                    {filteredTasks.map(task => (
                        <div key={task.id} className={`shadow-md rounded-md p-4 mb-4 ${task.estado === 'Completada' ? 'bg-green-200' : 'bg-red-200'}`}>
                            <h3 className="text-lg font-semibold mb-2">{task.titulo}</h3>
                            <p className="text-gray-600">{/* Mostrar otros detalles de la tarea si es necesario */}</p>
                        </div>
                    ))}
                    {filteredTasks.length === 0 && (
                        <p className="text-gray-500 mt-4">No se encontraron tareas.</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default TasksSearch;