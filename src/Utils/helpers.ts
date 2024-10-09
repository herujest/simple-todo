import Toast from 'react-native-toast-message';

export const uuidv4 = () => {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    var r = (Math.random() * 16) | 0,
      v = c == 'x' ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
};

export const showToast = (
  type: 'success' | 'error' | 'info',
  message: string,
  title?: string,
) => {
  Toast.show({
    type,
    text1: title || (type === 'error' ? 'Error' : 'Notification'),
    text2: message,
    position: 'bottom',
    visibilityTime: 4000,
    autoHide: true,
    bottomOffset: 40,
  });
};
