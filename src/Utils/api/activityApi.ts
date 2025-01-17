import {getDeviceId, getUniqueId} from 'react-native-device-info';
import {supabase} from '../supabaseClient';
import {showToast} from '../helpers';

export const createActivityWithTasks = async (payload: {
  activity: {
    title: string;
    description: string;
    asset_icon_name: string;
  };
  tasks: {
    title: string;
    description: string;
    due_date?: string | null;
    is_completed: boolean;
  }[];
}) => {
  const {activity, tasks} = payload;
  const deviceId = getDeviceId();
  const uniqueId = await getUniqueId();
  const user_device = `${uniqueId}_${deviceId}`;

  try {
    const {data: activityData, error: activityError} = await supabase
      .from('activities')
      .insert([
        {
          title: activity.title,
          description: activity.description,
          asset_icon_name: activity.asset_icon_name,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
          user_device: user_device,
        },
      ])
      .select('id')
      .single();

    if (activityError)
      throw new Error(`Activity creation error: ${activityError.message}`);

    const activityId = activityData.id;

    const taskPayload = tasks.map(task => ({
      title: task.title,
      description: task.description,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      due_date: task.due_date || null,
      is_completed: task.is_completed,
      user_device: user_device,
      activity_id: activityId,
    }));

    const {error: taskError} = await supabase.from('tasks').insert(taskPayload);

    if (taskError) throw new Error(`Task creation error: ${taskError.message}`);

    return {
      success: true,
      activityId,
      message: 'Activity and tasks created successfully',
    };
  } catch (error: any) {
    showToast('error', error.message, 'Error creating activity and tasks');
    throw new Error(`Error creating activity and tasks: ${error.message}`);
  }
};

export const getActivities = async () => {
  const deviceId = getDeviceId();
  const uniqueId = await getUniqueId();
  const deviceUniqueId = `${uniqueId}_${deviceId}`;

  try {
    const {data, error} = await supabase
      .from('activities')
      .select(
        `
          id,
          title,
          description,
          created_at,
          updated_at,
          user_device,
          asset_icon_name,
          tasks (
            title,
            description,
            created_at,
            updated_at,
            due_date,
            is_completed
          )
        `,
      )
      .eq('user_device', deviceUniqueId)
      .order('updated_at', {ascending: false});

    if (error) throw new Error(`Error fetching activities: ${error.message}`);

    const formattedData = data.map(activity => ({
      activities: {
        id: activity.id,
        title: activity.title,
        description: activity.description,
        created_at: activity.created_at,
        updated_at: activity.updated_at,
        user_device: activity.user_device,
        asset_icon_name: activity.asset_icon_name,
      },
      tasks: activity.tasks || [],
    }));

    formattedData.sort((a, b) => {
      const allTasksCompletedA =
        a.tasks.length > 0 && a.tasks.every(task => task.is_completed);
      const allTasksCompletedB =
        b.tasks.length > 0 && b.tasks.every(task => task.is_completed);

      if (allTasksCompletedA && !allTasksCompletedB) return 1;
      if (!allTasksCompletedA && allTasksCompletedB) return -1;

      const updatedAtA = new Date(a.activities.updated_at).getTime();
      const updatedAtB = new Date(b.activities.updated_at).getTime();

      return updatedAtB - updatedAtA;
    });

    return formattedData;
  } catch (error: any) {
    console.error('Error:', error.message);
    showToast('error', error.message, 'Unable to fetch activities');
    throw new Error('Unable to fetch activities');
  }
};

export const updateActivity = async (
  activityId: number,
  updates: Partial<{
    title: string;
    description: string;
    asset_icon_name: string;
  }>,
) => {
  try {
    const {data, error} = await supabase
      .from('activities')
      .update(updates)
      .eq('id', activityId);

    if (error) throw new Error(`Error updating activity: ${error.message}`);

    return {
      success: true,
      data: data,
    };
  } catch (error: any) {
    console.error('Error updating activity:', error.message);
    showToast('error', error.message, 'Error updating activity');
    throw new Error(error.message);
  }
};

export const deleteActivity = async (activityId: number) => {
  try {
    const {error: taskError} = await supabase
      .from('tasks')
      .delete()
      .eq('activity_id', activityId);

    if (taskError)
      throw new Error(`Error deleting tasks: ${taskError.message}`);

    const {data, error: activityError} = await supabase
      .from('activities')
      .delete()
      .eq('id', activityId);

    if (activityError)
      throw new Error(`Error deleting activity: ${activityError.message}`);

    return {
      success: true,
      message: 'Activity and linked tasks deleted successfully',
      data: data,
    };
  } catch (error: any) {
    console.error('Error deleting activity:', error.message);
    showToast('error', error.message, 'Error deleting activity');
    throw new Error(error.message);
  }
};

export const getActivityDetails = async (activityId: number) => {
  const deviceId = getDeviceId();
  const uniqueId = await getUniqueId();
  const deviceUniqueId = `${uniqueId}_${deviceId}`;

  try {
    const {data, error} = await supabase
      .from('activities')
      .select(
        `
        title,
        description,
        created_at,
        updated_at,
        user_device,
        asset_icon_name,
        tasks (
          id,
          title,
          description,
          due_date,
          is_completed,
          created_at,
          updated_at
        )
      `,
      )
      .eq('id', activityId)
      .eq('user_device', deviceUniqueId)
      .single();

    if (error) throw new Error(error.message);

    return {
      success: true,
      data,
    };
  } catch (error: any) {
    console.error('Error fetching activity details:', error.message);
    showToast('error', error.message, 'Error fetching activity details');
    throw new Error('Unable to fetch activity details');
  }
};
