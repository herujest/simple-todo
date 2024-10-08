// ./src/api/activityApi.ts

import {getDeviceId, getUniqueId} from 'react-native-device-info';
import {supabase} from '../supabaseClient';

// Create an activity
export const createActivity = async (activityName: string) => {
  const {data, error} = await supabase
    .from('activities')
    .insert([{name: activityName, created_at: new Date().toISOString()}]);

  if (error) throw new Error(error.message);
  return data;
};

// Get all activities
export const getActivities = async () => {
  const deviceId = getDeviceId();
  const uniqueId = await getUniqueId();
  console.log('deviceId', deviceId, uniqueId);

  const {data, error} = await supabase.from('activities').select('*');

  console.log('data', data);
  console.log('error', error);

  if (error) throw new Error(error.message);
  return data;
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
