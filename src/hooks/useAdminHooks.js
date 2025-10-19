import { useState } from "react";
import { updateConfig, fetchConfig } from "../API/adminapi";
const useAdminHooks = () => {
  const saveAdminConfig = async (type, config) => {
    try {
      return await updateConfig(type, config);
    } catch (error) {
      console.error("Error in saveAdminConfig:", error);
      return;
    }
  };
  const getAdminConfig = async (type) => {
    try {
      return await fetchConfig(type);
    } catch (error) {
      console.error("Error in getAdminConfig:", error);
      return;
    }
  };
  return {
    saveAdminConfig,
    getAdminConfig,
  };
};

export default useAdminHooks;
