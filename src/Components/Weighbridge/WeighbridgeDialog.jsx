import { useEffect, useState } from "react";
import useWeighBridgeHooks from "../../hooks/useWeighBridgeHooks";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import WeighbridgeForm from "./WeighbridgeForm";
const WeighbridgeDialog = ({ type, id, dialogConf, vehicleData, onClose }) => {
  const selectedVehicleData = vehicleData?.find((data) => data?._id === id);
  return (
    <>
      {type === "textarea" ? (
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="text-lg font-semibold text-enterprise-navy">
              {dialogConf.type}
            </DialogTitle>
            <DialogDescription className="mt-2 text-sm text-muted-foreground">
              Detailed view of {dialogConf.type}
            </DialogDescription>
          </DialogHeader>
          <div className="mt-4">
            <p>
              {vehicleData
                ?.find((v) => v._id === dialogConf.id)
                ?.WeighbridgeFieldConfigurations?.find(
                  (f) => f.fieldName === "remarks"
                )?.value || "No Data Available"}
            </p>
          </div>
        </DialogContent>
      ) : (
        <DialogContent className="max-w-5xl">
          <DialogHeader>
            <DialogTitle className="text-lg font-semibold text-enterprise-navy">
              {dialogConf.type}
            </DialogTitle>
            <DialogDescription className="mt-2 text-sm text-muted-foreground">
              Detailed view of {dialogConf.type}
            </DialogDescription>
          </DialogHeader>
          <WeighbridgeForm
            onClose={onClose}
            vehicleData={selectedVehicleData}
            vehicleId={dialogConf.id}
          />
        </DialogContent>
      )}
    </>
  );
};

export default WeighbridgeDialog;
