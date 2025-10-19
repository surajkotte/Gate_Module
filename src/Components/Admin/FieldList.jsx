import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Edit, Trash2 } from "lucide-react";
import { useState } from "react";
import { FieldEditorDialog } from "./FieldEditorDialog";

export const FieldList = ({ fields, onUpdate, fieldType }) => {
  const [editingField, setEditingField] = useState(null);
  const [editingIndex, setEditingIndex] = useState(null);

  const handleEdit = (field, index) => {
    setEditingField(field);
    setEditingIndex(index);
  };

  const handleDelete = (index) => {
    const newFields = fields.filter((_, i) => i !== index);
    onUpdate(newFields);
  };

  const handleSaveEdit = (updatedField) => {
    if (editingIndex !== null) {
      const newFields = [...fields];
      newFields[editingIndex] = updatedField;
      onUpdate(newFields);
      setEditingField(null);
      setEditingIndex(null);
    }
  };

  if (fields.length === 0) {
    return (
      <div className="text-center py-8 text-muted-foreground">
        No fields configured. Click "Add Field" to get started.
      </div>
    );
  }

  return (
    <>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Field Name</TableHead>
            <TableHead>Label</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Icon</TableHead>
            <TableHead>Width</TableHead>
            <TableHead>Required</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {fields.map((field, index) => (
            <TableRow key={index}>
              <TableCell className="font-mono text-sm">
                {field.fieldName}
              </TableCell>
              <TableCell>{field.fieldLabel}</TableCell>
              <TableCell>
                <Badge variant="secondary">{field.fieldType}</Badge>
              </TableCell>
              <TableCell>
                <Badge variant="outline">{field.width}</Badge>
              </TableCell>
              <TableCell>
                {field.isRequired ? (
                  <Badge variant="default">Required</Badge>
                ) : (
                  <Badge variant="secondary">Optional</Badge>
                )}
              </TableCell>
              <TableCell className="text-right">
                <div className="flex justify-end gap-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleEdit(field, index)}
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleDelete(index)}
                  >
                    <Trash2 className="h-4 w-4 text-destructive" />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {editingField && (
        <FieldEditorDialog
          open={!!editingField}
          onOpenChange={(open) => {
            if (!open) {
              setEditingField(null);
              setEditingIndex(null);
            }
          }}
          field={editingField}
          onSave={handleSaveEdit}
        />
      )}
    </>
  );
};
