import { useEffect, useState } from "react";
import { getDefaultConfig, getSavedVehicleData } from "../API/api";

const useSavedDrafts = () => {
  const [savedDrafts, setSavedDrafts] = useState([]);
  const [vehicleData, setVehicleData] = useState([]);
  const [defaultConfig, setDefaultConfig] = useState([]);
  const getConfig = async (type) => {
    try {
      const response = await getDefaultConfig(type);
      return response;
    } catch (error) {
      console.error("Error in getConfig:", error);
      return { messageType: "E", message: error.message };
    }
  };
  useEffect(() => {
    const fetchDefaultConfig = async () => {
      try {
        const response = await getDefaultConfig();
        if (response?.messageType === "S") {
          const fieldConfigData = response?.data?.map((config) => ({
            id: config.fieldName,
            fieldLabel: config.fieldLabel,
          }));
          setSavedDrafts([
            ...fieldConfigData,
            { id: "type", fieldLabel: "Vehicle Type" },
            { id: "action", fieldLabel: "Action" },
          ]);
        }
      } catch (error) {
        console.error("Error fetching saved drafts:", error);
      }
    };
    fetchDefaultConfig();
  }, []);
  useEffect(() => {
    const fetchSavedVehicleData = async () => {
      try {
        const response = await getSavedVehicleData();
        if (response?.messageType === "S") {
          const vehicleData = response?.data || [];
          setVehicleData(vehicleData);
        }
      } catch (error) {
        console.error("Error fetching saved vehicle data:", error);
      }
    };
    fetchSavedVehicleData();
  }, []);
  return { savedDrafts, vehicleData };
};

export default useSavedDrafts;
