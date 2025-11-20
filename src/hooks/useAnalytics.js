import { useEffect, useState } from "react";
import { getAnalytics } from "../API/api";

const useAnalytics = () => {
  const [data, setData] = useState();
  useEffect(() => {
    const fetchData = async () => {
      const response = await getAnalytics();
      if (response?.messageType === "S") {
        const fieldConfigurations = response?.data?.config;
        fieldConfigurations?.sort((a, b) => a.sequence - b.sequence);
        setData({
          fieldConfig: fieldConfigurations,
          vehicleData: response?.data?.data,
        });
      }
    };
    fetchData();
  }, []);
  return { data };
};

export default useAnalytics;
