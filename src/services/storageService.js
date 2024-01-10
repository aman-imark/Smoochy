
const getUserToken = async () => {
  try {
    let usertoken = localStorage.getItem('userToken');
        
    return usertoken;

  } catch (error) {
    return null;
   }
} 



const setStore = async (key, value) => {
  try {
    // localStorage.setItem(key, JSON.stringify(value));
    localStorage.setItem(key, value);
    return true;
  } catch (error) {
    console.error('Error saving to local storage:', error);
    return false;
  }
};



const getStore = async (key) => {
  let defaultValue = null;
  try {
    const item = localStorage.getItem(key);
    return item ? item : defaultValue;
  } catch (error) {
    console.error('Error retrieving from local storage:', error);
    return defaultValue;
  }
}



const removeStore = async (key) => {
  try {
    localStorage.removeItem(key);
    return true;
  } catch (error) {
    console.error('Error removing from local storage:', error);
    return false;
  }
};



const clearStore = async () => {
  try {
    localStorage.clear();
  } catch (error) {
    console.error('Error clearing data:', error);
  }
};


export { setStore, getStore, getUserToken, removeStore, clearStore };