import React, { useEffect, useState } from 'react';
import Sidebar from '../components/Sidebar.jsx';
import api from '../services/api.js';
import {
    RiCheckboxCircleFill,
    RiCheckboxBlankCircleLine,
    RiArrowDownSLine,
    RiArrowUpSLine,
    RiDeleteBin6Line,
    RiStarFill,
    RiStarLine,
    RiEditFill // Nuevo ícono de editar
} from 'react-icons/ri';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Swal from 'sweetalert2';
import '../styles.css';

const Tasks = () => {
    const [tasks, setTasks] = useState([]);
    const [completedTasks, setCompletedTasks] = useState([]);
    const [newTask, setNewTask] = useState('');
    const [showCompletedTasks, setShowCompletedTasks] = useState(false);
    const [selectedDate, setSelectedDate] = useState(null);
    const [editModalVisible, setEditModalVisible] = useState(false); // Nuevo estado para controlar la visibilidad del modal de edición
    const [editTask, setEditTask] = useState(null); // Nuevo estado para almacenar la tarea que se está editando
    const [editTaskTitle, setEditTaskTitle] = useState(''); // Nuevo estado para almacenar el título editado

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await api.get('/tareas/');
                setTasks(response.data.filter(task => task.estado === 'No completada'));
                setCompletedTasks(response.data.filter(task => task.estado === 'Completada'));
            } catch (error) {
                console.error('Error al obtener datos:', error);
            }
        };

        fetchData();
    }, []);

    const handleInputChange = (event) => {
        setNewTask(event.target.value);
    };

    const handleAddTask = async () => {
        if (newTask.trim() === '' || selectedDate === null) {
            Swal.fire({
                icon: 'warning',
                title: 'Error',
                text: 'Debes agregar una tarea y una fecha',
                confirmButtonColor: '#3085d6',
                confirmButtonText: 'OK'
            })
            return;
        }

        try {
            const response = await api.post('/tareas/', {
                titulo: newTask,
                estado: 'No completada',
                fecha_fin: selectedDate // Agregar la fecha seleccionada al objeto enviado a la API
            });
            setTasks([...tasks, response.data]);
            setNewTask('');
            setSelectedDate(null); // Limpiar la fecha seleccionada después de agregar la tarea
        } catch (error) {
            console.error('Error al agregar la tarea:', error);
        }
    };

    const handleTaskCompletion = async (task) => {
        try {
            const updatedTask = { ...task, estado: task.estado === 'Completada' ? 'No completada' : 'Completada' };
            await api.put(`/tareas/${task.id}/`, updatedTask);
            if (task.estado === 'Completada') {
                setCompletedTasks(completedTasks.filter(t => t.id !== task.id));
                setTasks([...tasks, updatedTask]);
            } else {
                setTasks(tasks.filter(t => t.id !== task.id));
                setCompletedTasks([...completedTasks, updatedTask]);
            }
        } catch (error) {
            console.error('Error al cambiar el estado de completitud de la tarea:', error);
        }
    };

    const handleDeleteTask = async (taskId) => {
        try {
            await api.delete(`/tareas/${taskId}/`);
            setTasks(tasks.filter(task => task.id !== taskId));
        } catch (error) {
            console.error('Error al eliminar la tarea:', error);
        }
    };

    const handleStarClick = async (task) => {
        try {
            const updatedTask = { ...task, categoria: task.categoria === 'Importante' ? 'No Importante' : 'Importante' };
            await api.put(`/tareas/${task.id}/`, updatedTask);
            setTasks(tasks.map(t => t.id === task.id ? { ...t, categoria: updatedTask.categoria } : t));
        } catch (error) {
            console.error('Error al marcar la tarea como importante:', error);
        }
    };

    const openEditModal = (task) => {
        setEditTask(task);
        setEditTaskTitle(task.titulo);
        setEditModalVisible(true);
    };

    const closeEditModal = () => {
        setEditTask(null);
        setEditTaskTitle('');
        setEditModalVisible(false);
    };

    const handleEditTask = async () => {
        try {
            const updatedTask = { ...editTask, titulo: editTaskTitle };
            await api.put(`/tareas/${editTask.id}/`, updatedTask);
            setTasks(tasks.map(t => t.id === editTask.id ? { ...t, titulo: editTaskTitle } : t));
            closeEditModal();
        } catch (error) {
            console.error('Error al editar la tarea:', error);
        }
    };

    return (
        <div className="flex flex-col md:flex-row mt-6">
            <Sidebar />
            <div className="flex-1 relative">
                <div className="p-4">
                    <h1 className="text-xl font-semibold">Agregar Tareas</h1>
                    <div className="flex">
                        <input
                            type="text"
                            value={newTask}
                            onChange={handleInputChange}
                            className="border rounded-md p-2 mt-2"
                            placeholder="Nueva tarea"
                        />
                        <DatePicker
                            selected={selectedDate}
                            onChange={date => setSelectedDate(date)}
                            className="border rounded-md p-2 mt-2 ml-4"
                            placeholderText="Fecha de vencimiento"
                            dateFormat="dd/MM/yyyy"
                            showTimeSelect
                            timeFormat="HH:mm"
                            timeIntervals={15}
                            timeCaption="Hora"
                        />
                        <button onClick={handleAddTask} className="bg-blue-500 text-white rounded-md p-2 mt-2 ml-4" title="Agregar tarea">
                            Agregar
                        </button>
                    </div>
                </div>
                <div className="p-4">
                    <h2 className="text-xl font-semibold mb-4">Tareas</h2>
                    {tasks.length === 0 && <p className="text-center">Agrega tus tareas acá</p>}
                    {tasks.map((task) => (
                        <div key={task.id} className="flex items-center mb-4 border rounded-md p-4 relative">
                            <button
                                onClick={() => handleTaskCompletion(task)}
                                className="rounded-full h-6 w-6 mr-2 flex items-center justify-center bg-gray-300"
                                title="Marcar como completada"
                            >
                                {task.estado === 'Completada' ? <RiCheckboxCircleFill className="text-white" /> : <RiCheckboxBlankCircleLine />}
                            </button>
                            <h3>{task.titulo}</h3>
                            <button
                                onClick={() => handleDeleteTask(task.id)}
                                className="ml-auto rounded-full h-6 w-6 flex items-center justify-center bg-black text-white hover:bg-blue-500"
                                title="Eliminar tarea"
                            >
                                <RiDeleteBin6Line />
                            </button>
                            <button
                                onClick={() => openEditModal(task)} // Nuevo botón para abrir el modal de edición
                                className="rounded-full h-6 w-6 flex items-center justify-center bg-gray-300 ml-2"
                                title="Editar tarea"
                            >
                                <RiEditFill />
                            </button>
                            <button
                                onClick={() => handleStarClick(task)}
                                className="rounded-full h-6 w-6 flex items-center justify-center bg-gray-300 ml-2"
                                title="Marcar como importante"
                            >
                                {task.categoria === 'Importante' ? <RiStarFill className="text-yellow-500" /> : <RiStarLine />}
                            </button>
                        </div>
                    ))}
                </div>
                <div className="p-4">
                    <h2 className="text-xl font-semibold mb-4 cursor-pointer" onClick={() => setShowCompletedTasks(!showCompletedTasks)}>Tareas Completadas
                        <span className="ml-2 transition-transform duration-300 transform inline-block">
                            {showCompletedTasks ? <RiArrowUpSLine /> : <RiArrowDownSLine />}
                        </span>
                    </h2>
                    {showCompletedTasks && (
                        <div>
                            {completedTasks.map((task) => (
                                <div key={task.id} className="flex items-center mb-4 border rounded-md p-4 line-through">
                                    <button
                                        onClick={() => handleTaskCompletion(task)}
                                        className="rounded-full h-6 w-6 mr-2 flex items-center justify-center bg-green-500"
                                    >
                                        {task.estado === 'Completada' ? <RiCheckboxCircleFill className="text-white" /> : <RiCheckboxBlankCircleLine />}
                                    </button>
                                    <h3>{task.titulo}</h3>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
            {/* Modal de edición */}
            {editModalVisible && (
                <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-800 bg-opacity-50 z-50">
                    <div className="bg-white p-4 rounded-md">
                        <h2 className="text-lg font-semibold mb-2">Editar Tarea</h2>
                        <input
                            type="text"
                            value={editTaskTitle}
                            onChange={(e) => setEditTaskTitle(e.target.value)}
                            className="border rounded-md p-2"
                            placeholder="Nuevo título de tarea"
                        />
                        <div className="flex justify-end mt-2">
                            <button onClick={closeEditModal} className="bg-gray-300 hover:bg-gray-400 rounded-md px-4 py-2 mr-2">
                                Cancelar
                            </button>
                            <button onClick={handleEditTask} className="bg-blue-500 text-white rounded-md px-4 py-2">
                                Guardar
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Tasks;