import {supabase} from '../supabaseClient';

// Create a task under a specific activity
export const createTask = async (activityId: number, taskName: string) => {
  const {data, error} = await supabase.from('tasks').insert([
    {
      activity_id: activityId,
      name: taskName,
      created_at: new Date().toISOString(),
    },
  ]);

  if (error) throw new Error(error.message);
  return data;
};

// Get all tasks for a specific activity
export const getTasksByActivity = async (activityId: number) => {
  const {data, error} = await supabase
    .from('tasks')
    .select('*')
    .eq('activity_id', activityId);

  if (error) throw new Error(error.message);
  return data;
};

// Update a task
export const updateTask = async (taskId: number, newName: string) => {
  const {data, error} = await supabase
    .from('tasks')
    .update({name: newName})
    .eq('id', taskId);

  if (error) throw new Error(error.message);
  return data;
};

// Delete a task
export const deleteTask = async (taskId: number) => {
  const {data, error} = await supabase.from('tasks').delete().eq('id', taskId);

  if (error) throw new Error(error.message);
  return data;
};
