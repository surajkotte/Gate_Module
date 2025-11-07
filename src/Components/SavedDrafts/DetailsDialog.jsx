import { useState, useEffect } from "react";
import VehicleWithPOInputForm from "../VehicleEntryComponents/VehicleWithPOInputForm";
import VehicleWithoutPOInputForm from "../VehicleEntryComponents/VehicleWithoutPoInputForm";
import VacantVehicle from "../VehicleEntryComponents/VacantVehicle";
import OtherVehicle from "../VehicleEntryComponents/OtherVehicle";
const DetailsDialog = ({ type, id }) => {
  const renderForm = (entry) => {
    const type_info = { with_po: 1, without_po: 2, vacant: 3, other: 4 };
    const entry_type = type_info[entry];
    console.log("Entry Type:", entry_type);
    switch (entry_type) {
      case 1:
        return (
          <VehicleWithPOInputForm
            onSaveClick={() => {}}
            onSumbitClick={() => {}}
            displayOnly={true}
            id={id}
          />
        );
      case 2:
        return (
          <VehicleWithoutPOInputForm
            onSaveClick={() => {}}
            onSumbitClick={() => {}}
            displayOnly={true}
            id={id}
          />
        );
      case 3:
        return (
          <VacantVehicle
            onSaveClick={() => {}}
            onSubmitClick={() => {}}
            displayOnly={true}
            id={id}
          />
        );
      case 4:
        return (
          <OtherVehicle
            onSaveClick={() => {}}
            onSubmitClick={() => {}}
            displayOnly={true}
            id={id}
          />
        );
      default:
        return (
          <div className="text-center py-8">
            {/* <Truck className="mx-auto h-12 w-12 text-gray-400 mb-4" /> */}
            <p className="text-gray-500">
              Invalid type selected for vehicle entry form
            </p>
          </div>
        );
    }
  };
  return <div>{renderForm(type)}</div>;
};

export default DetailsDialog;
