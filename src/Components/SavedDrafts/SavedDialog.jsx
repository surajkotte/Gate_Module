import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import DetailsDialog from "./DetailsDialog";

const SavedDialog = ({ type, id, dialogConf, vehicleData, onClose }) => {
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
                ?.HeaderFieldConfigurations?.find(
                  (f) => f.fieldName === dialogConf.type
                )?.value || "No Data Available"}
            </p>
          </div>
        </DialogContent>
      ) : (
        <DialogContent className="max-w-5xl max-h-full overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-lg font-semibold text-enterprise-navy">
              {dialogConf.type}
            </DialogTitle>
            <DialogDescription className="mt-2 text-sm text-muted-foreground">
              Detailed view of {dialogConf.type}
            </DialogDescription>
          </DialogHeader>
          <div className="mt-4">
            {console.log("Vehicle Data:", vehicleData)}
            <DetailsDialog
              type={
                vehicleData?.find((v) => v._id === dialogConf.id)?.entry_type
              }
              id={dialogConf.id}
            />
          </div>
        </DialogContent>
      )}
    </>
  );
};

export default SavedDialog;
