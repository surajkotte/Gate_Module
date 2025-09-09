import React, { useState } from "react";
import { saveVehicleEntries } from "../API/api";
import { set } from "date-fns/set";

const useVehicleEntryHooks = () => {
  const [formData, setFormData] = useState({
    vehicleNo: "",
    transporterName: "",
    driverName: "",
    licenseNumber: "",
    inDate: "",
    lrNumber: "",
    lrDate: "",
    comments: "",
    purchaseOrders: [""],
  });
  const handleInputChange = (field, value) => {
    setFormData({ ...formData, [field]: value });
  };
  const saveEntries = async (data) => {
    const response = await saveVehicleEntries(data);
    if (response.messageType === "S") {
      console.log("Vehicle entry saved successfully:", response);
    } else {
      console.error("Failed to save vehicle entry");
    }
  };
  return {
    saveEntries,
    handleInputChange,
    setFormData,
    formData,
  };
};

export default useVehicleEntryHooks;
