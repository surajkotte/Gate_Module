import React from "react";
import { Truck, User, Package, IdCard, Calendar, FileText } from "lucide-react";
import { Input } from "@/components/ui/input"; // your custom Input

const iconMap = {
  Truck,
  User,
  Package,
  IdCard,
  Calendar,
  FileText,
};

const DynamicForm = ({ config, formData, handleInputChange, displayOnly }) => {
  const sortedFields = [...config].sort((a, b) => a.sequence - b.sequence);

  const renderField = (field) => {
    const Icon = iconMap[field?.icon] || FileText;

    if (field?.fieldType === "textarea") {
      return (
        <div
          key={field?._id + "" + field?.fieldName}
          className="space-y-2 w-full"
        >
          <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
            {Icon && <Icon className="w-4 h-4" />}
            {field.fieldLabel}
            {field.isRequired && <span className="text-red-500">*</span>}
          </label>
          <textarea
            value={
              formData?.find((data) => data?.fieldName === field?.fieldName)
                ?.value || ""
            }
            onChange={(e) =>
              handleInputChange(field?.fieldName, e.target.value)
            }
            rows={4}
            placeholder={`Enter ${field.fieldLabel.toLowerCase()}...`}
            disabled={displayOnly}
            className="w-full px-4 py-3 border border-gray-200 rounded-xl 
                       focus:ring-2 focus:ring-blue-500 focus:border-transparent 
                       transition-all duration-200 bg-gray-50 text-black resize-none"
          />
        </div>
      );
    }

    return (
      <div
        key={field?._id + "" + field?.fieldName}
        className="space-y-2 w-full"
      >
        <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
          {Icon && <Icon className="w-4 h-4" />}
          {field?.fieldLabel}
          {field?.isRequired && <span className="text-red-500">*</span>}
        </label>
        <Input
          type={field?.fieldType}
          value={
            formData?.find((data) => data?.fieldName === field?.fieldName)
              ?.value || ""
          }
          disabled={displayOnly}
          onChange={(e) => handleInputChange(field?.fieldName, e.target.value)}
          placeholder={`Enter ${field.fieldLabel.toLowerCase()}`}
          className="w-full px-4 py-3 border border-gray-200 rounded-xl 
                     focus:ring-2 focus:ring-blue-500 focus:border-transparent 
                     transition-all duration-200 text-black bg-gray-50"
        />
      </div>
    );
  };

  const rows = [];
  let i = 0;
  while (i < sortedFields.length) {
    const current = sortedFields[i];

    if (current.width === "flex") {
      const next = sortedFields[i + 1];
      if (next && next.width === "flex") {
        rows.push(
          <div
            key={current._id + "-pair"}
            className="grid grid-cols-1 sm:grid-cols-2 gap-4"
          >
            {renderField(current)}
            {renderField(next)}
          </div>
        );
        i += 2;
      } else {
        rows.push(<div key={current._id}>{renderField(current)}</div>);
        i += 1;
      }
    } else {
      rows.push(<div key={current._id}>{renderField(current)}</div>);
      i += 1;
    }
  }

  return <div className="flex flex-col gap-4 w-full">{rows}</div>;
};

export default DynamicForm;
