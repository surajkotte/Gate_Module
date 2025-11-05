import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ChevronRight, Bold } from "lucide-react";
import { FieldEditorDialog } from "./FieldEditorDialog";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { FieldList } from "./FieldList";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
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
  const [isWeighbridgeInDialogOpen, setIsWeighbridgeInDialogOpen] =
    useState(false);
  const [isAddingWeighbridgeInField, setIsAddingWeighbridgeInField] =
    useState(false);
  const [isAddingWeighbridgeOutField, setIsAddingWeighbridgeOutField] =
    useState(false);
  const [isWeighbridgeOutDialogOpen, setIsWeighbridgeOutDialogOpen] =
    useState(false);
  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between p-4 rounded-lg border bg-card">
        <div className="space-y-0.5">
          <Label
            htmlFor="weighbridge-toggle"
            className="text-base font-semibold"
          >
            Weighbridge Inward Configuration
          </Label>
          <p className="text-sm text-muted-foreground">
            Enable weighbridge fields for this configuration
          </p>
        </div>
        <Switch
          id="weighbridge-toggle"
          checked={config.isWeighbridgeInEnabled || false}
          onCheckedChange={(checked) =>
            onUpdate({ ...config, isWeighbridgeInEnabled: checked })
          }
        />
      </div>
      <div className="flex items-center justify-between p-4 rounded-lg border bg-card">
        <div className="space-y-0.5">
          <Label
            htmlFor="weighbridge-toggle"
            className="text-base font-semibold"
          >
            Weighbridge Outward Configuration
          </Label>
          <p className="text-sm text-muted-foreground">
            Enable weighbridge fields for this configuration
          </p>
        </div>
        <Switch
          id="weighbridge-toggle"
          checked={config.isWeighbridgeOutEnabled || false}
          onCheckedChange={(checked) =>
            onUpdate({ ...config, isWeighbridgeOutEnabled: checked })
          }
        />
      </div>
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
      {config.isWeighbridgeInEnabled && (
        <button
          onClick={() => setIsWeighbridgeInDialogOpen(true)}
          className="w-full flex items-center justify-between p-4 rounded-lg border bg-card hover:bg-accent/50 transition-colors text-left group"
        >
          <div>
            <h4 className="font-semibold text-foreground">
              Weighbridge Inward Fields
            </h4>
            <p className="text-sm text-muted-foreground">
              {(config.WeighbridgeInFieldConfigurations || []).length} field(s)
              configured
            </p>
          </div>
          <ChevronRight className="h-5 w-5 text-muted-foreground group-hover:text-foreground transition-colors" />
        </button>
      )}
      {config.isWeighbridgeOutEnabled && (
        <button
          onClick={() => setIsWeighbridgeOutDialogOpen(true)}
          className="w-full flex items-center justify-between p-4 rounded-lg border bg-card hover:bg-accent/50 transition-colors text-left group"
        >
          <div>
            <h4 className="font-semibold text-foreground">
              Weighbridge Outward Fields
            </h4>
            <p className="text-sm text-muted-foreground">
              {(config.WeighbridgeOutFieldConfigurations || []).length} field(s)
              configured
            </p>
          </div>
          <ChevronRight className="h-5 w-5 text-muted-foreground group-hover:text-foreground transition-colors" />
        </button>
      )}
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
            <div className="flex justify-end gap-3">
              <Button onClick={() => setIsAddingItemField(true)} size="sm">
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
              fields={config.ItemFieldConfigurations}
              onUpdate={(fields) =>
                onUpdate({ ...config, ItemFieldConfigurations: fields })
              }
              fieldType="item"
            />
          </div>
        </DialogContent>
      </Dialog>

      <Dialog
        open={isWeighbridgeInDialogOpen}
        onOpenChange={setIsWeighbridgeInDialogOpen}
      >
        <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Weighbridge Fields Configuration</DialogTitle>
            <DialogDescription>
              Manage fields for the weighbridge section
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="flex justify-end gap-3">
              <Button
                onClick={() => setIsAddingWeighbridgeInField(true)}
                size="sm"
              >
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
              fields={config.WeighbridgeInFieldConfigurations || []}
              onUpdate={(fields) =>
                onUpdate({
                  ...config,
                  WeighbridgeInFieldConfigurations: fields,
                })
              }
              fieldType="weighbridge"
            />
          </div>
        </DialogContent>
      </Dialog>
      <Dialog
        open={isWeighbridgeOutDialogOpen}
        onOpenChange={setIsWeighbridgeOutDialogOpen}
      >
        <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Weighbridge Out Fields Configuration</DialogTitle>
            <DialogDescription>
              Manage fields for the weighbridge section
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="flex justify-end gap-3">
              <Button
                onClick={() => setIsAddingWeighbridgeOutField(true)}
                size="sm"
              >
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
              fields={config.WeighbridgeOutFieldConfigurations || []}
              onUpdate={(fields) =>
                onUpdate({
                  ...config,
                  WeighbridgeOutFieldConfigurations: fields,
                })
              }
              fieldType="weighbridge"
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

      <FieldEditorDialog
        open={isAddingWeighbridgeInField}
        onOpenChange={setIsAddingWeighbridgeInField}
        onSave={(field) => {
          onUpdate({
            ...config,
            WeighbridgeInFieldConfigurations: [
              ...(config.WeighbridgeInFieldConfigurations || []),
              field,
            ],
          });
          setIsAddingWeighbridgeInField(false);
        }}
      />

      <FieldEditorDialog
        open={isAddingWeighbridgeOutField}
        onOpenChange={setIsAddingWeighbridgeOutField}
        onSave={(field) => {
          onUpdate({
            ...config,
            WeighbridgeOutFieldConfigurations: [
              ...(config.WeighbridgeOutFieldConfigurations || []),
              field,
            ],
          });
          setIsAddingWeighbridgeOutField(false);
        }}
      />
    </div>
  );
};
