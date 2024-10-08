import {getDeviceId, getUniqueId} from 'react-native-device-info';
import {supabase} from '../supabaseClient';

export const createActivityWithTasks = async (payload: {
  activity: {
    title: string;
    description: string;
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
    // Step 1: Insert the activity into the 'activities' table
    const {data: activityData, error: activityError} = await supabase
      .from('activities')
      .insert([
        {
          title: activity.title,
          description: activity.description,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
          user_device: user_device,
        },
      ])
      .select('id') // Select the ID of the inserted activity
      .single();

    if (activityError)
      throw new Error(`Activity creation error: ${activityError.message}`);

    const activityId = activityData.id;

    // Step 2: Insert tasks into the 'tasks' table, associating them with the created activity
    const taskPayload = tasks.map(task => ({
      title: task.title,
      description: task.description,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      due_date: task.due_date || null, // Allow due date to be null
      is_completed: task.is_completed,
      user_device: user_device,
      activity_id: activityId, // Associate task with activity
    }));

    const {error: taskError} = await supabase.from('tasks').insert(taskPayload);

    if (taskError) throw new Error(`Task creation error: ${taskError.message}`);

    return {
      success: true,
      activityId,
      message: 'Activity and tasks created successfully',
    };
  } catch (error) {
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
          title,
          description,
          created_at,
          updated_at,
          user_device,
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
      .eq('user_device', deviceUniqueId);

    if (error) throw new Error(`Error fetching activities: ${error.message}`);

    const formattedData = data.map(activity => ({
      activities: {
        title: activity.title,
        description: activity.description,
        created_at: activity.created_at,
        updated_at: activity.updated_at,
        user_device: activity.user_device,
      },
      tasks: activity.tasks || [],
    }));

    return formattedData;
  } catch (error) {
    console.error('Error:', error.message);
    throw new Error('Unable to fetch activities');
  }
};

// Update an activity
export const updateActivity = async (activityId: number, newName: string) => {
  const {data, error} = await supabase
    .from('activities')
    .update({name: newName})
    .eq('id', activityId);

  if (error) throw new Error(error.message);
  return data;
};

// Delete an activity
export const deleteActivity = async (activityId: number) => {
  const {data, error} = await supabase
    .from('activities')
    .delete()
    .eq('id', activityId);

  if (error) throw new Error(error.message);
  return data;
};
