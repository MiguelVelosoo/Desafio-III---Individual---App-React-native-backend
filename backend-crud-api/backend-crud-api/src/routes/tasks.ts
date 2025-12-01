import { useState, useEffect } from 'react';
import { api, Task } from '../services/api';

export const useTasks = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchTasks = async () => {
    try {
      setLoading(true);
      const { data } = await api.getTasks();
      setTasks(data);
    } catch (error) {
      console.error('Erro ao buscar tarefas:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const createTask = async (task: Omit<Task, '_id' | 'createdAt'>) => {
    try {
      const { data } = await api.createTask(task);
      setTasks(prev => [data, ...prev]);
      return data;
    } catch (error) {
      console.error('Erro ao criar tarefa:', error);
    }
  };

  const updateTask = async (id: string, task: Partial<Task>) => {
    try {
      const { data } = await api.updateTask(id, task);
      setTasks(prev => prev.map(t => t._id === id ? data : t));
      return data;
    } catch (error) {
      console.error('Erro ao atualizar tarefa:', error);
    }
  };

  const deleteTask = async (id: string) => {
    try {
      await api.deleteTask(id);
      setTasks(prev => prev.filter(t => t._id !== id));
    } catch (error) {
      console.error('Erro ao deletar tarefa:', error);
    }
  };

  return { tasks, loading, createTask, updateTask, deleteTask, refetch: fetchTasks };
};
