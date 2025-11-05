import { useEffect, useState } from "react";
import ItemsTable from "./ItemsTable";
import { Button } from "@/Components/ui/button";
import useVehicleEntryHooks from "../../hooks/useVehicleEntryHooks";
import DynamicForm from "./DynamicForm";
import {
  Truck,
  User,
  Package,
  IdCard,
  Calendar,
  FileText,
  Weight,
  Eye,
  Plus,
  Save,
  Send,
} from "lucide-react";

const iconMap = {
  Truck,
  User,
  Package,
  IdCard,
  Calendar,
  FileText,
  Weight,
};
const OtherVehicle = ({ onSaveClick, onSubmitClick, displayOnly = false }) => {
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
  const handleItemChange = (index, fieldName, value) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      ItemFieldConfigurations: prevFormData.ItemFieldConfigurations.map(
        (row, rowIndex) =>
          rowIndex === index
            ? row.map((field) =>
                field.fieldName === fieldName ? { ...field, value } : field
              )
            : row
      ),
    }));
  };

  const addRow = () => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      ItemFieldConfigurations: [
        ...prevFormData.ItemFieldConfigurations,
        prevFormData.ItemFieldConfigurations[0]?.map((field) => ({
          ...field,
          index: prevFormData.ItemFieldConfigurations?.length + 1,
          value: "",
        })) || [],
      ],
    }));
  };

  const removeRow = (index) => {
    if (formData?.ItemFieldConfigurations?.length > 1) {
      setFormData((prevFormData) => ({
        ...prevFormData,
        ItemFieldConfigurations: prevFormData.ItemFieldConfigurations.filter(
          (_, rowIndex) => rowIndex !== index
        ),
      }));
    }
  };

  useEffect(() => {
    const fetchConfig = async () => {
      const config = await getConfig("other");
      if (config.messageType === "S") {
        console.log("Fetched other config:", config);
        setFormData({
          HeaderFieldConfigurations:
            config?.data?.[0]?.HeaderFieldConfigurations?.map((obj) => ({
              ...obj,
              value: "",
            })) || [],
          ItemFieldConfigurations: [
            config?.data?.[0]?.ItemFieldConfigurations?.map((obj, index) => ({
              ...obj,
              value: "",
              index: index,
            })) || [],
          ],
        });
      } else {
        console.error("Failed to fetch other config");
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
          {!displayOnly && (
            <>
              <Button
                variant="secondary"
                onClick={() => onSaveClick(formData, "other_vehicle")}
                className="gap-2"
              >
                <Save className="h-4 w-4" />
                Save Draft
              </Button>

              <Button
                className="gap-2"
                variant="default"
                onClick={() => onSubmitClick(formData, "other_vehicle")}
              >
                <Send className="h-4 w-4" />
                Submit
              </Button>
            </>
          )}
        </div>
      </div>
      <div className="bg-blue-50 p-4 rounded-lg border-l-4 border-blue-400">
        <p className="text-blue-700 text-sm">
          For Other Vehicle entries, please ensure all mandatory fields are
          accurately filled to facilitate smooth processing.
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
            displayOnly={displayOnly}
          />
        ) : (
          <div className="text-center py-8">
            <Eye className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-medium mb-2">
              No Header Fileds Configured
            </h3>
          </div>
        )}
      </div>
      {formData && formData?.ItemFieldConfigurations[0]?.length != 0 ? (
        <div className="flex w-full flex-col gap-2">
          <div className="flex w-full justify-between">
            <h1 className=" text-black font-bold">Item Details</h1>
            <div className="flex p-3">
              {!displayOnly && (
                <button
                  onClick={addRow}
                  className="px-4 py-2 bg-blue-500 text-white text-sm rounded-md hover:bg-blue-600 transition"
                >
                  + Add Row
                </button>
              )}
            </div>
          </div>
          <div className="w-full overflow-x-auto border rounded-xl bg-white shadow-sm">
            <table className="min-w-full border-collapse table-fixed">
              <thead className="bg-gray-50 border-b">
                <tr>
                  <th className="px-4 py-2 text-center text-sm font-medium text-gray-700">
                    Item No
                  </th>
                  {formData?.ItemFieldConfigurations[0]
                    ?.sort((a, b) => a.sequence - b.sequence)
                    .map((field) => {
                      const Icon = iconMap[field.icon] || FileText;
                      return (
                        <th
                          key={field.fieldName}
                          className="px-4 py-2 text-sm font-medium text-gray-700 text-left"
                        >
                          <div className="flex items-center gap-2">
                            <Icon className="w-4 h-4" />
                            {field.fieldLabel}
                            {field.isRequired && (
                              <span className="text-red-500">*</span>
                            )}
                          </div>
                        </th>
                      );
                    })}
                  <th className="px-4 py-2 text-center text-sm font-medium text-gray-700">
                    Actions
                  </th>
                </tr>
              </thead>

              {formData?.ItemFieldConfigurations?.map((data, index) => (
                <ItemsTable
                  key={index + "itemRow"}
                  index={index}
                  config={data}
                  handleInputChange={handleItemChange}
                  removeRow={removeRow}
                  displayOnly={displayOnly}
                />
              ))}
            </table>
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

export default OtherVehicle;
