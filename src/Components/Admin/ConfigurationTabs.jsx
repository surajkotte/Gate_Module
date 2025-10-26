import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { FieldConfigurationPanel } from "./FieldConfigurationPanel";

export const ConfigurationTabs = ({
  withPoConfig,
  withoutPoConfig,
  vacantConfig,
  otherConfig,
  onUpdateConfig,
  handleSaveConfig,
}) => {
  return (
    <Accordion type="single" collapsible className="w-full space-y-4">
      <AccordionItem value="with-po" className="border rounded-lg px-6 bg-card">
        <AccordionTrigger className="hover:no-underline">
          <div className="flex flex-col items-start">
            <h3 className="text-lg font-semibold">With Purchase Order</h3>
            <p className="text-sm text-muted-foreground">
              Vehicle With PO Configuration
            </p>
          </div>
        </AccordionTrigger>
        <AccordionContent className="pt-4">
          <FieldConfigurationPanel
            config={withPoConfig}
            onUpdate={(config) => onUpdateConfig("vehicle_with_po", config)}
            type="vehicle_with_po"
            saveFields={handleSaveConfig}
          />
        </AccordionContent>
      </AccordionItem>

      <AccordionItem
        value="without-po"
        className="border rounded-lg px-6 bg-card"
      >
        <AccordionTrigger className="hover:no-underline">
          <div className="flex flex-col items-start">
            <h3 className="text-lg font-semibold">Without Purchase Order</h3>
            <p className="text-sm text-muted-foreground">
              Vehicle Without PO Configuration
            </p>
          </div>
        </AccordionTrigger>
        <AccordionContent className="pt-4">
          <FieldConfigurationPanel
            config={withoutPoConfig}
            onUpdate={(config) => onUpdateConfig("vehicle_without_po", config)}
            type="vehicle_without_po"
            saveFields={handleSaveConfig}
          />
        </AccordionContent>
      </AccordionItem>
      <AccordionItem
        value="vacant-vehicle"
        className="border rounded-lg px-6 bg-card"
      >
        <AccordionTrigger className="hover:no-underline">
          <div className="flex flex-col items-start">
            <h3 className="text-lg font-semibold">Vacant Vehicle</h3>
            <p className="text-sm text-muted-foreground">
              Vacant Vehicle Configuration
            </p>
          </div>
        </AccordionTrigger>
        <AccordionContent className="pt-4">
          <FieldConfigurationPanel
            config={vacantConfig}
            onUpdate={(config) => onUpdateConfig("vacant_vehicle", config)}
            type="vacant_vehicle"
            saveFields={handleSaveConfig}
          />
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="Other" className="border rounded-lg px-6 bg-card">
        <AccordionTrigger className="hover:no-underline">
          <div className="flex flex-col items-start">
            <h3 className="text-lg font-semibold">Other</h3>
            <p className="text-sm text-muted-foreground">Other Configuration</p>
          </div>
        </AccordionTrigger>
        <AccordionContent className="pt-4">
          <FieldConfigurationPanel
            config={otherConfig}
            onUpdate={(config) => onUpdateConfig("other", config)}
            type="other "
            saveFields={handleSaveConfig}
          />
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};
