import React, { useState } from "react";

/**
 * HOC that turns a DynamicForm into a row-wise table of item forms.
 * @param {React.ComponentType} FormComponent - Your base form (DynamicForm)
 * @returns A new component that renders rows of the given form
 */
export function withItemsTable(FormComponent) {
  return function ItemsTableHOC({ config, initialRows = 1 }) {
    const [rows, setRows] = useState(
      Array.from({ length: initialRows }, () => [])
    );

    // Handle input change inside a specific row
    const handleRowInputChange = (rowIndex, fieldName, value) => {
      const updated = [...rows];
      const existingRow = updated[rowIndex] || [];
      const fieldIndex = existingRow.findIndex(
        (f) => f.fieldName === fieldName
      );

      if (fieldIndex !== -1) {
        existingRow[fieldIndex].value = value;
      } else {
        existingRow.push({ fieldName, value });
      }

      updated[rowIndex] = existingRow;
      setRows(updated);
    };

    // Add a new blank row
    const addRow = () => setRows([...rows, []]);

    // Remove a row
    const removeRow = (index) => setRows(rows.filter((_, i) => i !== index));

    return (
      <div className="w-full overflow-x-auto border rounded-xl bg-white shadow-sm">
        <table className="min-w-full border-collapse">
          <thead className="bg-gray-50 border-b">
            <tr>
              {config.map((field) => (
                <th
                  key={field.fieldName}
                  className="px-4 py-2 text-left text-sm font-medium text-gray-600"
                >
                  {field.fieldLabel}
                </th>
              ))}
              <th className="px-4 py-2 text-sm text-gray-600">Actions</th>
            </tr>
          </thead>

          <tbody>
            {rows.map((rowData, rowIndex) => (
              <tr key={rowIndex} className="border-b hover:bg-gray-50">
                <td colSpan={config.length}>
                  <FormComponent
                    config={config}
                    formData={rowData}
                    handleInputChange={(fieldName, value) =>
                      handleRowInputChange(rowIndex, fieldName, value)
                    }
                  />
                </td>
                <td className="text-center align-top pt-4">
                  <button
                    onClick={() => removeRow(rowIndex)}
                    className="text-red-500 hover:text-red-700 text-sm"
                  >
                    ✕
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="flex justify-center p-3">
          <button
            onClick={addRow}
            className="px-4 py-2 bg-blue-500 text-white text-sm rounded-md hover:bg-blue-600 transition"
          >
            + Add Row
          </button>
        </div>
      </div>
    );
  };
}
