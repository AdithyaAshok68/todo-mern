import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const TodoList = () => {
    const [todos, setTodos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    const navigate = useNavigate();

    useEffect(() => {
        const fetchTodos = async () => {
            try {
                const res = await axios.get('http://localhost:8080/api/todos');
                setTodos(res.data);
            } catch (err) {
                setError(err.message || 'Error fetching todos');
            } finally {
                setLoading(false);
            }
        };

        fetchTodos();
    }, []);

    if (loading) return <p className="text-center text-blue font-semibold mt-4">Loading todos...</p>;
    if (error) return <p className="text-center text-red font-semibold mt-4">{error}</p>;

    return (
        <div className="max-w-2xl mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
            <div className='flex items-center justify-between'>
            <h2 className="text-2xl font-bold mb-4">Todo List</h2>
            <button
                className="bg-green text-white px-3 py-1 rounded"
                onClick={() => navigate("/add")}
            >
                Add Todo
            </button>
            </div>
            {todos.length === 0 ? (
                <p className="text-gray">No todos found.</p>
            ) : (
                <ul className="space-y-4">
                    {todos.map(todo => (
                        <li
                            key={todo._id}
                            className="p-4 border rounded-md hover:shadow-sm transition duration-200"
                        >
                            <div className="flex justify-between items-center">
                                <div>
                                    <h3 className="text-lg font-semibold">{todo.title}</h3>
                                    <p className="text-sm">{todo.description || 'No description'}</p>
                                </div>
                                <span
                                    className={`px-3 py-1 text-sm rounded-full ${todo.status === 'completed'
                                            ? 'bg-green text-white'
                                            : todo.status === 'in-progress'
                                                ? 'bg-yellow text-white'
                                                : 'bg-black text-white'
                                        }`}
                                >
                                    {todo.status}
                                </span>
                                <div>
                                    <button
                                        className="bg-green text-white px-3 py-1 rounded"
                                        onClick={() => navigate(`/edit/${todo._id}`)}
                                    >
                                        Update
                                    </button>
                                </div>
                            </div>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default TodoList;
