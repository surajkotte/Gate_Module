import React, { useState } from "react";
import { Package, AlertTriangle, Truck } from "lucide-react";
import { Button } from "@/components/ui/button";
import VehicleWithPOInputForm from "./VehicleWithPOInputForm";
import VehicleWithoutPOInputForm from "./VehicleWithoutPoInputForm";
import useVehicleEntryHooks from "../../hooks/useVehicleEntryHooks";
const EntryTypes = [
  {
    id: 1,
    name: "With PurchaseOrder",
    icon: <Package className="h-5 w-5 mr-2 text-blue-600" />,
    description: "Loaded vehicle with PO",
    formDescription: "For loaded vehicles coming in with Purchase Order",
  },
  {
    id: 2,
    name: "Without PurchaseOrder",
    icon: <AlertTriangle className="h-5 w-5 mr-2 text-blue-600" />,
    description: "Loaded vehicle without PO",
  },
  {
    id: 3,
    name: "Vacent Vehicle",
    icon: <Truck className="h-5 w-5 mr-2 text-blue-600" />,
    description: "Vecant vehicle entry",
  },
  {
    id: 4,
    name: "Other",
    icon: <Truck className="h-5 w-5 mr-2 text-blue-600" />,
    description: "Other vehicle entry",
  },
];

const VechicleEntry = () => {
  const [entryType, setEntryType] = useState("");
  const { saveData } = useVehicleEntryHooks();
  const handleSaveClick = async (data, type) => {
    console.log(data);
    const response = await saveData(data, type);
    if (response.messageType == "S") {
      console.log("Vehicle entry saved successfully:", response);
    } else {
      console.error("Failed to save vehicle entry");
    }
  };
  const renderForm = (entry) => {
    switch (entry) {
      case 1:
        return (
          <VehicleWithPOInputForm
            onSaveClick={handleSaveClick}
            onSumbitClick={handleSaveClick}
          />
        );
      case 2:
        return (
          <VehicleWithoutPOInputForm
            onSaveClick={handleSaveClick}
            onSumbitClick={handleSaveClick}
          />
        );
      case 3:
        return <div>Vacant Vehicle Form</div>;
      case 4:
        return <div>Other Vehicle Form</div>;
      default:
        return (
          <div className="text-center py-8">
            <Truck className="mx-auto h-12 w-12 text-gray-400 mb-4" />
            <p className="text-gray-500">
              Select a case type to begin vehicle entry process
            </p>
          </div>
        );
    }
  };

  return (
    <>
      <div className="w-[90%] h-full flex flex-col bg-gray-100 p-5">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">
          Select Entry Type
        </h1>
        <div className="w-full h-full grid sm:grid-cols-1 md:grid-cols-2 gap-2 p-3 ">
          {EntryTypes.map((type, index) => (
            <button
              key={index}
              onClick={() => setEntryType(type.id)}
              className={`w-full rounded-lg ${
                entryType === type?.id
                  ? "bg-gray-400 text-gray-500"
                  : "bg-white"
              } p-4 shadow-md hover:shadow-lg transition-shadow duration-300 cursor-pointer`}
            >
              <div className="flex items-center">
                {type.icon}
                <span className="text-lg font-semibold text-gray-600">
                  {type.name}
                </span>
              </div>
              <p className="text-sm text-gray-400 mt-1 text-start">
                {type.description}
              </p>
            </button>
          ))}
        </div>
      </div>
      <div className="w-[90%] h-full flex flex-col p-5">
        <div className="w-full h-full p-4 rounded-lg shadow-md mt-4">
          {renderForm(entryType)}
        </div>
      </div>
    </>
  );
};

export default VechicleEntry;
