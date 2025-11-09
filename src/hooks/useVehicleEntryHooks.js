import {
  getVehicleEntryConfig,
  saveVehicleEntries,
  submitVehicleEntry,
} from "../API/api.js";
const useVehicleEntryHooks = () => {
  const getConfig = async (type) => {
    try {
      const response = await getVehicleEntryConfig({ type });
      return response;
    } catch (error) {
      console.error("Error in getConfig:", error);
      return { messageType: "E", message: error.message };
    }
  };
  const saveData = async (data, type) => {
    try {
      const response = await saveVehicleEntries(data, type);
      return response;
    } catch (error) {
      return { messageType: "E", message: error?.message };
    }
  };
  const submitData = async (data, type) => {
    try {
      const response = await submitVehicleEntry(data, type);
      return response;
    } catch (error) {
      return { messageType: "E", message: error.message };
    }
  };
  return {
    saveData,
    getConfig,
    submitData,
  };
};

export default useVehicleEntryHooks;
