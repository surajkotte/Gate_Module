import { getVehicleEntryConfig } from "../API/api.js";
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
  return {
    getConfig,
  };
};

export default useVehicleEntryHooks;
