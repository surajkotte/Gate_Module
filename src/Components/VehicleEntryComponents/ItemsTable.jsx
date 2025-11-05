import React from "react";
import { Input } from "@/components/ui/input";

const ItemsTable = ({
  config,
  handleInputChange,
  removeRow,
  index,
  displayOnly,
}) => {
  return (
    <tbody>
      <tr key={index} className="border-b hover:bg-gray-50">
        <td className="p-2 border-r text-center">{index + 1}</td>

        {config
          .sort((a, b) => a.sequence - b.sequence)
          .map((field) => (
            <td key={field.fieldName} className="p-2 border-r">
              {field.fieldType === "textarea" ? (
                <textarea
                  rows={2}
                  value={field.value || ""}
                  onChange={(e) =>
                    handleInputChange(index, field.fieldName, e.target.value)
                  }
                  disabled={displayOnly}
                  placeholder={`Enter ${field.fieldLabel.toLowerCase()}...`}
                  className="w-full px-2 py-1 border border-gray-200 rounded-md 
                      focus:ring-2 focus:ring-blue-500 focus:border-transparent 
                      transition-all duration-200 bg-gray-50 text-black resize-none"
                />
              ) : (
                <Input
                  type={field.fieldType || "text"}
                  value={field.value || ""}
                  onChange={(e) =>
                    handleInputChange(index, field.fieldName, e.target.value)
                  }
                  disabled={displayOnly}
                  placeholder={`Enter ${field.fieldLabel.toLowerCase()}`}
                  className="w-full px-2 py-1 border border-gray-200 rounded-md 
                      focus:ring-2 focus:ring-blue-500 focus:border-transparent 
                      transition-all duration-200 bg-gray-50 text-black"
                />
              )}
            </td>
          ))}

        <td className="p-2 text-center">
          {!displayOnly && (
            <button
              onClick={() => removeRow(index)}
              className="text-red-500 hover:text-red-700 text-sm"
            >
              ✕
            </button>
          )}
        </td>
      </tr>
    </tbody>
  );
};

export default ItemsTable;
