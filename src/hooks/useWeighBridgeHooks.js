import React, { useEffect, useMemo, useState } from "react";
import { getVehicleEntries } from "../API/api";
import { se } from "date-fns/locale/se";
const useWeighBridgeHooks = () => {
  const [vehicleData, setVehicleData] = React.useState([]);
  const [itemsPerPage, setItemsPerPage] = React.useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [weighbridgeAction, setWeighbridgeAction] = useState({ vehicleId: "" });
  const filteredCourses = useMemo(() => {
    if (!vehicleData) return [];

    if (searchTerm !== "") {
      return vehicleData.filter((vehicle) => {
        const vehicleNo = vehicle.vehicleNo
          ?.toLowerCase()
          .includes(searchTerm.toLowerCase());
        const transporterName = vehicle.transporterName
          ?.toLowerCase()
          .includes(searchTerm.toLowerCase());
        const driverName = vehicle.driverName
          ?.toLowerCase()
          .includes(searchTerm.toLowerCase());

        return vehicleNo || transporterName || driverName;
      });
    } else {
      return vehicleData;
    }
  }, [vehicleData, searchTerm]);

  const totalPages = Math.ceil(filteredCourses?.length / itemsPerPage);
  const paginatedCourses =
    filteredCourses &&
    filteredCourses?.slice(
      (currentPage - 1) * itemsPerPage,
      currentPage * itemsPerPage
    );
  useEffect(() => {
    // Fetch vehicle entries when the component mounts
    const fetchData = async () => {
      const response = await getVehicleEntries();
      if (response.messageType === "S") {
        setVehicleData(response.data);
      } else {
        console.error("Failed to fetch vehicle entries");
      }
    };
    fetchData();
  }, []);
  return {
    setCurrentPage,
    setSearchTerm,
    setWeighbridgeAction,
    vehicleData,
    totalPages,
    currentPage,
    paginatedCourses,
    weighbridgeAction,
  };
};

export default useWeighBridgeHooks;
