import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";
import { FieldEditorDialog } from "./FieldEditorDialog";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { FieldList } from "./FieldList";

export const FieldConfigurationPanel = ({
  config,
  onUpdate,
  type,
  saveFields,
}) => {
  const [isHeaderDialogOpen, setIsHeaderDialogOpen] = useState(false);
  const [isItemDialogOpen, setIsItemDialogOpen] = useState(false);
  const [isAddingHeaderField, setIsAddingHeaderField] = useState(false);
  const [isAddingItemField, setIsAddingItemField] = useState(false);

  return (
    <div className="space-y-3">
      <button
        onClick={() => setIsHeaderDialogOpen(true)}
        className="w-full flex items-center justify-between p-4 rounded-lg border bg-card hover:bg-accent/50 transition-colors text-left group"
      >
        <div>
          <h4 className="font-semibold text-foreground">Header Fields</h4>
          <p className="text-sm text-muted-foreground">
            {config?.HeaderFieldConfigurations?.length} field(s) configured
          </p>
        </div>
        <ChevronRight className="h-5 w-5 text-muted-foreground group-hover:text-foreground transition-colors" />
      </button>

      <button
        onClick={() => setIsItemDialogOpen(true)}
        className="w-full flex items-center justify-between p-4 rounded-lg border bg-card hover:bg-accent/50 transition-colors text-left group"
      >
        <div>
          <h4 className="font-semibold text-foreground">Item Fields</h4>
          <p className="text-sm text-muted-foreground">
            {config?.ItemFieldConfigurations?.length} field(s) configured
          </p>
        </div>
        <ChevronRight className="h-5 w-5 text-muted-foreground group-hover:text-foreground transition-colors" />
      </button>
      <Dialog open={isHeaderDialogOpen} onOpenChange={setIsHeaderDialogOpen}>
        <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Header Fields Configuration</DialogTitle>
            <DialogDescription>
              Manage fields for the header section
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="flex justify-end gap-3">
              <Button onClick={() => setIsAddingHeaderField(true)} size="sm">
                Add Field
              </Button>
              <Button
                onClick={() => saveFields(type)}
                size="sm"
                variant="destructive"
              >
                Save Fields
              </Button>
            </div>
            <FieldList
              fields={config.HeaderFieldConfigurations}
              onUpdate={(fields) =>
                onUpdate({ ...config, HeaderFieldConfigurations: fields })
              }
              fieldType="header"
            />
          </div>
        </DialogContent>
      </Dialog>
      <Dialog open={isItemDialogOpen} onOpenChange={setIsItemDialogOpen}>
        <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Item Fields Configuration</DialogTitle>
            <DialogDescription>
              Manage fields for the items section
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="flex justify-end">
              <Button onClick={() => setIsAddingItemField(true)} size="sm">
                Add Field
              </Button>
            </div>
            <FieldList
              fields={config.ItemFieldConfigurations}
              onUpdate={(fields) =>
                onUpdate({ ...config, ItemFieldConfigurations: fields })
              }
              fieldType="item"
            />
          </div>
        </DialogContent>
      </Dialog>
      <FieldEditorDialog
        open={isAddingHeaderField}
        onOpenChange={setIsAddingHeaderField}
        onSave={(field) => {
          onUpdate({
            ...config,
            HeaderFieldConfigurations: [
              ...config.HeaderFieldConfigurations,
              field,
            ],
          });
          setIsAddingHeaderField(false);
        }}
      />
      <FieldEditorDialog
        open={isAddingItemField}
        onOpenChange={setIsAddingItemField}
        onSave={(field) => {
          onUpdate({
            ...config,
            ItemFieldConfigurations: [...config.ItemFieldConfigurations, field],
          });
          setIsAddingItemField(false);
        }}
      />
    </div>
  );
};
