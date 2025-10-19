import React, { useEffect, useState } from "react";
import { Trash2, Truck, Eye, Plus, Save, Send } from "lucide-react";
import { Button } from "@/Components/ui/button";
import { Input } from "@/Components/ui/input";
import useVehicleEntryHooks from "../../hooks/useVehicleEntryHooks";
import DynamicForm from "./DynamicForm";
const VehicleWithPOInputForm = ({ onSaveClick, onSubmitClick }) => {
  const [formData, setFormData] = useState("");
  const { getConfig } = useVehicleEntryHooks();
  const handleInputChange = (fieldName, value) => {
    const updatedHeaderFields = formData.HeaderFieldConfigurations.map(
      (field) => (field.fieldName === fieldName ? { ...field, value } : field)
    );
    setFormData({
      ...formData,
      HeaderFieldConfigurations: updatedHeaderFields,
    });
  };
  useEffect(() => {
    const fetchConfig = async () => {
      const config = await getConfig("vehicle_with_po");
      if (config.messageType === "S") {
        console.log("Fetched vehicle_with_po config:", config);
        setFormData({
          HeaderFieldConfigurations:
            config?.data?.[0]?.HeaderFieldConfigurations?.map((obj) => ({
              ...obj,
              value: "",
            })) || [],
          ItemFieldConfigurations:
            config?.data?.[0]?.ItemFieldConfigurations?.map((obj) => ({
              ...obj,
              value: "",
            })) || [],
        });
      } else {
        console.error("Failed to fetch vehicle_with_po config");
      }
    };
    fetchConfig();
  }, []);
  return (
    <div className="w-full flex flex-col gap-5">
      <div className="flex items-center gap-2 justify-between">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">
          Vehicle Entry Form
        </h1>
        <div className="flex gap-3">
          <Button
            variant="secondary"
            onClick={() => onSaveClick(formData)}
            className="gap-2"
          >
            <Save className="h-4 w-4" />
            Save Draft
          </Button>
          <Button
            className="gap-2"
            variant="default"
            onClick={() => onSubmitClick(formData)}
          >
            <Send className="h-4 w-4" />
            Submit
          </Button>
        </div>
      </div>
      <div className="bg-blue-50 p-4 rounded-lg border-l-4 border-blue-400">
        <p className="text-blue-700 text-sm">
          For loaded vehicles coming in with Purchase Order
        </p>
      </div>
      <div className="flex items-center mt-2 gap-2 p-2">
        <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center">
          <Truck className="w-5 h-5 text-blue-600" />
        </div>
        <h2 className="text-lg font-semibold text-gray-800">
          Vehicle Information
        </h2>
      </div>
      <div className="flex flex-col gap-3 w-full">
        {console.log("Form Data:", formData)}
        {formData && formData.HeaderFieldConfigurations?.length !== 0 ? (
          <DynamicForm
            config={formData?.HeaderFieldConfigurations}
            formData={formData?.HeaderFieldConfigurations}
            handleInputChange={handleInputChange}
          />
        ) : (
          <div className="text-center py-8">
            <Eye className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-medium mb-2">
              No Header Fileds Configured
            </h3>
          </div>
        )}

        {/* <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
            <Truck className="w-4 h-4" />
            Vehicle Number
          </label>
          <Input
            type="text"
            value={formData.vehicleNo}
            onChange={(e) => handleInputChange("vehicleNo", e.target.value)}
            className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-black bg-gray-50"
            placeholder="Enter vehicle number"
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
            <Package className="w-4 h-4" />
            Transporter Name
          </label>
          <Input
            type="text"
            value={formData?.transporterName}
            onChange={(e) =>
              handleInputChange("transporterName", e.target.value)
            }
            className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-gray-50 text-black"
            placeholder="Enter transporter name"
          />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
              <User className="w-4 h-4" />
              Driver Name
            </label>
            <Input
              type="text"
              value={formData?.driverName}
              onChange={(e) => handleInputChange("driverName", e.target.value)}
              className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-gray-50 text-black"
              placeholder="Driver name"
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
              <IdCard className="w-4 h-4" />
              License Number
            </label>
            <Input
              type="text"
              value={formData?.licenseNumber}
              onChange={(e) =>
                handleInputChange("licenseNumber", e.target.value)
              }
              className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-gray-50 text-black"
              placeholder="License number"
            />
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              In Date
            </label>
            <Input
              type="date"
              value={formData?.inDate}
              onChange={(e) => handleInputChange("inDate", e.target.value)}
              className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-gray-50 text-black"
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              LR Date
            </label>

            <Input
              type="date"
              value={formData?.lrDate}
              onChange={(e) => handleInputChange("lrDate", e.target.value)}
              className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-gray-50 text-black"
            />
          </div>
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
            <FileText className="w-4 h-4" />
            LR Number
          </label>
          <Input
            type="text"
            value={formData?.lrNumber}
            onChange={(e) => handleInputChange("lrNumber", e.target.value)}
            className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-gray-50 text-black"
            placeholder="Enter LR number"
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700">Comments</label>
          <textarea
            value={formData?.comments}
            onChange={(e) => handleInputChange("comments", e.target.value)}
            rows={4}
            className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-gray-50 text-black resize-none"
            placeholder="Enter any additional comments..."
          />
        </div> */}
      </div>
      {formData && formData?.ItemFieldConfigurations?.length != 0 ? (
        <div className="flex w-full flex-col gap-2">
          <h1 className=" text-black font-bold">Purchase Orders</h1>
          <div className="flex flex-col gap-2 w-full">
            <button
              onClick={() =>
                setFormData({
                  ...formData,
                  purchaseOrders: [...formData?.purchaseOrders, ""],
                })
              }
              className="w-full mb-6 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl font-medium hover:from-blue-700 hover:to-blue-800 transform hover:scale-[1.02] transition-all duration-200 flex items-center justify-center gap-2 shadow-lg hover:shadow-xl p-2"
            >
              <Plus className="w-5 h-5" />
              Add Purchase Order
            </button>
            <div className="flex flex-col overflow-auto h-[400px] w-full gap-2 py-2">
              {formData?.purchaseOrders?.map((po, index) => (
                <div className="flex w-full gap-2 items-center" key={index}>
                  <div className="flex-shrink-0 w-8 h-8 bg-blue-600 text-white rounded-lg flex items-center justify-center text-sm font-medium">
                    {index + 1}
                  </div>
                  <Input
                    type="text"
                    value={po}
                    onChange={(e) => {
                      const newPo = [...formData?.purchaseOrders];
                      newPo[index] = e.target.value;
                      setFormData({ ...formData, purchaseOrders: newPo });
                    }}
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-white text-black"
                    placeholder={`Enter PO number`}
                  />
                  <button
                    onClick={() => {
                      const newPo = formData?.purchaseOrders.filter(
                        (_, i) => i !== index
                      );
                      setFormData({ ...formData, purchaseOrders: newPo });
                    }}
                    disabled={formData?.purchaseOrders.length === 1}
                    className="flex-shrink-0 w-10 h-10 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 flex items-center justify-center group-hover:scale-105"
                    title="Remove Purchase Order"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : (
        <div className="text-center py-8">
          <Eye className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-medium mb-2">
            No Item Fileds Configured
          </h3>
        </div>
      )}
    </div>
  );
};

export default VehicleWithPOInputForm;
