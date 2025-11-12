import React, { useEffect, useMemo, useState } from "react";
import {
  getWeighbridgeHeader,
  getWeighbridgeVehicledata,
  updateWeighbridgeData,
} from "../API/api";
const useWeighBridgeHooks = () => {
  const [weighbridgeHeader, setWeighbridgeHeader] = useState("");
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

  const updateWeighbridge = async (
    WeighbridgeFieldConfigurations,
    vehicleDataModelId,
    id
  ) => {
    const response = await updateWeighbridgeData(
      WeighbridgeFieldConfigurations,
      vehicleDataModelId,
      id
    );
    return response;
  };
  useEffect(() => {
    const fetchData = async () => {
      const response = await getWeighbridgeVehicledata();
      if (response.messageType === "S") {
        setVehicleData(response.data);
      } else {
        console.error("Failed to fetch vehicle entries");
      }
    };
    fetchData();
  }, []);
  useEffect(() => {
    const fetchHeader = async () => {
      const response = await getWeighbridgeHeader();
      if (response?.messageType === "S") {
        setWeighbridgeHeader([
          ...(response?.data || []),
          { fieldType: "type", fieldLabel: "Weight In/Out" },
          { fieldType: "action", fieldLabel: "Action" },
        ]);
      }
    };
    fetchHeader();
  }, []);
  useEffect(() => {
    const fetchData = async () => {};
  }, []);
  return {
    setCurrentPage,
    setSearchTerm,
    setWeighbridgeAction,
    updateWeighbridge,
    weighbridgeHeader,
    vehicleData,
    totalPages,
    currentPage,
    paginatedCourses,
    weighbridgeAction,
  };
};

export default useWeighBridgeHooks;
