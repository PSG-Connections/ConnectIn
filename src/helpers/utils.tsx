import EncryptedStorage from 'react-native-encrypted-storage';

export async function getEncryptedItemByKey (key: string) {
  try {
    const storedData = await EncryptedStorage.getItem(key);

    if (storedData !== undefined) {
      const data = JSON.parse(storedData as string);
      return data;
    }
  } catch (error) {
    return error;
  }
}

export async function setEncryptedItemByKey (key: string, value: object) {
  try {
    const val = JSON.stringify(value);
    await EncryptedStorage.setItem(key, val);
  } catch (error) {
    return error;
  }
}

export async function clearEncryptedItemByKey (key: string) {
  try {
    await EncryptedStorage.removeItem(key);
  } catch (error) {
    return error;
  }
}

export async function clearAllEncryptedItems () {
  try {
    await EncryptedStorage.clear();
  } catch (error) {
    return error;
  }
}

export async function sleepByMilliSec (ms: any) {
  return await new Promise(resolve => setTimeout(resolve, ms));
}
