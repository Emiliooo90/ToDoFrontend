import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaRegStickyNote, FaRegCheckCircle, FaRegClock, FaStar, FaBars, FaTimes, FaSearch } from 'react-icons/fa';
import api from '../services/api';
import '../styles.css';

const Sidebar = () => {
    const [pendingTasksCount, setPendingTasksCount] = useState(0);
    const [sidebarVisible, setSidebarVisible] = useState(false);

    useEffect(() => {
        const fetchPendingTasks = async () => {
            try {
                const response = await api.get('/tareas/');
                const pendingTasks = response.data.filter(task => task.fecha_fin !== null && task.estado !== 'Completada');
                setPendingTasksCount(pendingTasks.length);
            } catch (error) {
                console.error('Error fetching pending tasks:', error);
            }
        };

        fetchPendingTasks();
    }, []);

    const handleResize = () => {
        if (window.innerWidth < 768) {
            setSidebarVisible(false);
        } else {
            setSidebarVisible(true);
        }
    };

    useEffect(() => {
        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    const toggleSidebar = () => {
        setSidebarVisible(!sidebarVisible);
    };

    const closeSidebar = () => {
        setSidebarVisible(false);
    };

    return (
        <div>
            {!sidebarVisible && (
                <div className="fixed top-0 left-0 z-50 p-2 text-4xl cursor-pointer hover:text-blue-600" onClick={toggleSidebar}>
                    <FaBars size={30} />
                </div>
            )}
            {sidebarVisible && (
                <div className="fixed top-0 left-0 z-50 p-2 text-4xl cursor-pointer hover:text-blue-600" onClick={closeSidebar}>
                    <FaTimes size={30} />
                </div>
            )}
            <div className={`relative flex flex-col bg-clip-border rounded-xl bg-white text-gray-700 h-[calc(110vh-2rem)] w-full max-w-[20rem] p-4 shadow-xl shadow-blue-gray-900/5 ${!sidebarVisible ? 'hidden' : ''}`}>
                <div className="mb-2 p-4">
                    <h5 className="block antialiased tracking-normal font-sans text-xl font-semibold leading-snug text-gray-900">To Do</h5>
                </div>
                <nav className="flex flex-col gap-1 min-w-[240px] p-2 font-sans text-base font-normal text-gray-700">
                    <Link to="/" className="flex items-center w-full p-3 rounded-lg text-start leading-tight transition-all hover:bg-blue-50 hover:bg-opacity-80 focus:bg-blue-50 focus:bg-opacity-80 active:bg-blue-50 active:bg-opacity-80 hover:text-blue-900 focus:text-blue-900 active:text-blue-900 outline-none">
                        <div className="grid place-items-center mr-4">
                            <FaRegStickyNote className="h-5 w-5" />
                        </div>
                        Tareas
                    </Link>
                    <Link to="/done_tasks" className="flex items-center w-full p-3 rounded-lg text-start leading-tight transition-all hover:bg-blue-50 hover:bg-opacity-80 focus:bg-blue-50 focus:bg-opacity-80 active:bg-blue-50 active:bg-opacity-80 hover:text-blue-900 focus:text-blue-900 active:text-blue-900 outline-none">
                        <div className="grid place-items-center mr-4">
                            <FaRegCheckCircle className="h-5 w-5" />
                        </div>Completadas
                    </Link>
                    <Link to="/pending_tasks" className="flex items-center w-full p-3 rounded-lg text-start leading-tight transition-all hover:bg-blue-50 hover:bg-opacity-80 focus:bg-blue-50 focus:bg-opacity-80 active:bg-blue-50 active:bg-opacity-80 hover:text-blue-900 focus:text-blue-900 active:text-blue-900 outline-none">
                        <div className="grid place-items-center mr-4">
                            <FaRegClock className="h-5 w-5" />
                        </div>Pendientes
                        {pendingTasksCount > 0 && (
                            <div className="grid place-items-center ml-auto justify-self-end">
                                <div className="relative grid items-center font-sans font-bold uppercase whitespace-nowrap select-none bg-blue-500/20 text-blue-900 py-1 px-2 text-xs rounded-full">
                                    <span className="">{pendingTasksCount}</span>
                                </div>
                            </div>
                        )}
                    </Link>
                    <Link to="/important_tasks" className="flex items-center w-full p-3 rounded-lg text-start leading-tight transition-all hover:bg-blue-50 hover:bg-opacity-80 focus:bg-blue-50 focus:bg-opacity-80 active:bg-blue-50 active:bg-opacity-80 hover:text-blue-900 focus:text-blue-900 active:text-blue-900 outline-none">
                        <div className="grid place-items-center mr-4">
                            <FaStar className="h-5 w-5" />
                        </div>Importantes
                    </Link>
                    <Link to="/search_tasks" className="flex items-center w-full p-3 rounded-lg text-start leading-tight transition-all hover:bg-blue-50 hover:bg-opacity-80 focus:bg-blue-50 focus:bg-opacity-80 active:bg-blue-50 active:bg-opacity-80 hover:text-blue-900 focus:text-blue-900 active-text-blue-900 outline-none">
                        <div className="grid place-items-center mr-4">
                            <FaSearch className="h-5 w-5"/>
                        </div>Buscar
                    </Link>
                </nav>
            </div>
        </div>
    );
};

export default Sidebar;