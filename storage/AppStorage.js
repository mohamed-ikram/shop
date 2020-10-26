import AsyncStorage from '@react-native-community/async-storage';

export const saveData = (field, data) => {
  AsyncStorage.setItem(field.toString(), data);
};
