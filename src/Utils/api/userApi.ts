import {getDeviceId, getUniqueId} from 'react-native-device-info';
import {supabase} from '../supabaseClient';
import {showToast} from '../helpers';

export const createUser = async (device_id: string) => {
  const {data, error} = await supabase.from('users').insert([{device_id}]);

  if (error) throw new Error(error.message);
  return data;
};

export const getUserByDeviceId = async (device_id: string) => {
  const {data, error} = await supabase
    .from('users')
    .select('*')
    .eq('device_id', device_id);

  if (error) throw new Error(error.message);
  return data;
};

export const fetchOrCreateUser = async () => {
  try {
    const deviceId = getDeviceId();
    const uniqueId = await getUniqueId();
    const deviceUniqueId = `${uniqueId}_${deviceId}`;

    const {data: existingUser, error} = await supabase
      .from('users')
      .select('*')
      .eq('device_id', deviceUniqueId)
      .single();

    if (error && error.code !== 'PGRST116') {
      throw new Error('Error fetching user: ' + error.message);
    }

    if (existingUser) {
      return existingUser;
    }

    const {data: newUser, error: createError} = await supabase
      .from('users')
      .insert([{device_id: deviceUniqueId, created_at: new Date()}])
      .single();

    if (createError) {
      throw new Error('Error creating user: ' + createError.message);
    }

    const {data: newlyCreatedUser, error: fetchError} = await supabase
      .from('users')
      .select('*')
      .eq('device_id', deviceUniqueId)
      .single();

    if (fetchError) {
      throw new Error(
        'Error fetching newly created user: ' + fetchError.message,
      );
    }

    return newlyCreatedUser;
  } catch (err: any) {
    console.error('Error in fetchOrCreateUser:', err.message);
    showToast('error', err.message, 'Error in fetchOrCreateUser');
    return null;
  }
};
