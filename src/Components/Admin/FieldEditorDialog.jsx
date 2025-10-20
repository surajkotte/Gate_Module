import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";

const fieldTypes = [
  "text",
  "number",
  "email",
  "tel",
  "date",
  "textarea",
  "select",
  "checkbox",
  "radio",
];

export const FieldEditorDialog = ({ open, onOpenChange, field, onSave }) => {
  const [formData, setFormData] = useState({
    fieldName: "",
    fieldType: "text",
    fieldLabel: "",
    isRequired: false,
    Value: null,
    width: "full",
    icon: null,
    sequence: null,
    options: [],
  });

  useEffect(() => {
    if (field) {
      setFormData(field);
    } else {
      setFormData({
        fieldName: "",
        fieldType: "text",
        fieldLabel: "",
        isRequired: false,
        Value: null,
        width: "full",
        options: [],
      });
    }
  }, [field, open]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  const needsOptions =
    formData.fieldType === "select" || formData.fieldType === "radio";

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[525px]">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>{field ? "Edit Field" : "Add New Field"}</DialogTitle>
            <DialogDescription>
              Configure the field properties for your form.
            </DialogDescription>
          </DialogHeader>

          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="fieldName">Field Name</Label>
              <Input
                id="fieldName"
                value={formData.fieldName}
                onChange={(e) =>
                  setFormData({ ...formData, fieldName: e.target.value })
                }
                placeholder="e.g., vehicleNumber"
                required
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="fieldLabel">Field Label</Label>
              <Input
                id="fieldLabel"
                value={formData.fieldLabel}
                onChange={(e) =>
                  setFormData({ ...formData, fieldLabel: e.target.value })
                }
                placeholder="e.g., Vehicle Number"
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="icon">Icon Name</Label>
              <Input
                id="icon"
                value={formData.icon}
                onChange={(e) =>
                  setFormData({ ...formData, icon: e.target.value })
                }
                placeholder="e.g., Lucide Icon Name"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="sequence">Sequence</Label>
              <Input
                id="sequence"
                type="number"
                value={formData.sequence}
                onChange={(e) =>
                  setFormData({ ...formData, sequence: e.target.value })
                }
                placeholder="e.g., 1"
                required
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="fieldType">Field Type</Label>
              <Select
                value={formData.fieldType}
                onValueChange={(value) =>
                  setFormData({ ...formData, fieldType: value })
                }
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {fieldTypes.map((type) => (
                    <SelectItem key={type} value={type}>
                      {type}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="grid gap-2">
              <Label htmlFor="width">Field Width</Label>
              <Select
                value={formData.width}
                onValueChange={(value) =>
                  setFormData({ ...formData, width: value })
                }
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="full">Full Width</SelectItem>
                  <SelectItem value="flex">Flexible</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {needsOptions && (
              <div className="grid gap-2">
                <Label htmlFor="options">Options (comma-separated)</Label>
                <Textarea
                  id="options"
                  value={formData.options.join(", ")}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      options: e.target.value
                        .split(",")
                        .map((opt) => opt.trim()),
                    })
                  }
                  placeholder="Option 1, Option 2, Option 3"
                />
              </div>
            )}

            <div className="flex items-center space-x-2">
              <Switch
                id="isRequired"
                checked={formData.isRequired}
                onCheckedChange={(checked) =>
                  setFormData({ ...formData, isRequired: checked })
                }
              />
              <Label htmlFor="isRequired" className="cursor-pointer">
                Required Field
              </Label>
            </div>
          </div>

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
            >
              Cancel
            </Button>
            <Button type="submit">Save Field</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
