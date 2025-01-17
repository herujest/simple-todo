import {getDeviceId, getUniqueId} from 'react-native-device-info';
import {supabase} from '../supabaseClient';
import {showToast} from '../helpers';

export type CreateTaskDTO = {
  title: string;
  description?: string;
  dueDate?: string | null;
  isComplete?: boolean;
  activityId?: number | null;
};
export const createTask = async (payload: CreateTaskDTO) => {
  const deviceId = getDeviceId();
  const uniqueId = await getUniqueId();
  const user_device = `${uniqueId}_${deviceId}`;

  try {
    const {data, error} = await supabase.from('tasks').insert([
      {
        title: payload.title,
        description: payload.description || null,
        due_date: payload.dueDate || null,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        is_completed: payload.isComplete || false,
        user_device: user_device,
        activity_id: payload.activityId || null,
      },
    ]);

    if (error) throw new Error(error.message);

    const response = {
      success: true,
      data: data,
    };

    return response;
  } catch (error: any) {
    console.error('Error creating task:', error.message);
    showToast('error', error.message, 'Failed to create Task');
    throw new Error(error.message);
  }
};

export const getStandaloneTasksByDeviceId = async () => {
  const deviceId = getDeviceId();
  const uniqueId = await getUniqueId();
  const deviceUniqueId = `${uniqueId}_${deviceId}`;

  try {
    const {data, error} = await supabase
      .from('tasks')
      .select('*')
      .eq('user_device', deviceUniqueId)
      .is('activity_id', null) // Get tasks with no activity linked
      .order('is_completed', {ascending: true}) // Prioritize incomplete tasks (false first)
      .order('updated_at', {ascending: false}); // Sort by latest updated_at within each group

    if (error) throw new Error(error.message);

    return data;
  } catch (error: any) {
    console.error('Error fetching standalone tasks:', error.message);
    showToast('error', error.message, 'Error fetching standalone tasks');
    throw new Error(error.message);
  }
};

export const updateTaskCompletion = async (
  taskId: number,
  isComplete: boolean,
) => {
  try {
    const {data, error} = await supabase
      .from('tasks')
      .update({
        is_completed: isComplete,
        updated_at: new Date().toISOString(),
      })
      .eq('id', taskId);

    if (error) throw new Error(error.message);

    return {
      success: true,
      data: data,
    };
  } catch (error: any) {
    console.error('Error updating task:', error.message);
    showToast('error', error.message, 'Error updating task');
    throw new Error(error.message);
  }
};

export const updateTask = async (taskId: number, newName: string) => {
  const {data, error} = await supabase
    .from('tasks')
    .update({name: newName})
    .eq('id', taskId);

  if (error) throw new Error(error.message);
  return data;
};

export const deleteTask = async (taskId: number) => {
  try {
    const {data, error} = await supabase
      .from('tasks')
      .delete()
      .eq('id', taskId);

    if (error) throw new Error(error.message);

    return {
      success: true,
      data: data,
    };
  } catch (error: any) {
    console.error('Error deleting task:', error.message);
    showToast('error', error.message, 'Error deleting task');
    return {
      success: false,
      message: error.message,
    };
  }
};
