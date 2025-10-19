import { useEffect, useState } from "react";
import useAdminHooks from "../../hooks/useAdminHooks";
import ConfigurationHeader from "./ConfigurationHeader";
import { ConfigurationTabs } from "./ConfigurationTabs";
const Index = () => {
  const { saveAdminConfig, getAdminConfig } = useAdminHooks();
  const [withPoConfig, setWithPoConfig] = useState({
    HeaderFieldConfigurations: [],
    ItemFieldConfigurations: [],
  });
  const [withoutPoConfig, setWithoutPoConfig] = useState({
    HeaderFieldConfigurations: [],
    ItemFieldConfigurations: [],
  });
  const handleUpdateConfig = (type, config) => {
    if (type === "vehicle_with_po") {
      setWithPoConfig(config);
    } else {
      setWithoutPoConfig(config);
    }
  };
  const handleSaveConfig = async (type) => {
    try {
      const config =
        type === "vehicle_with_po" ? withPoConfig : withoutPoConfig;
      const response = await saveAdminConfig(type, config);
      if (response.messageType === "E") {
        console.error("Error saving config:", response.message);
        return;
      }
      if (type === "vehicle_with_po") {
        setWithPoConfig({
          HeaderFieldConfigurations:
            response?.data?.HeaderFieldConfigurations || [],
          ItemFieldConfigurations:
            response?.data?.ItemFieldConfigurations || [],
        });
      } else {
        setWithoutPoConfig({
          HeaderFieldConfigurations:
            response?.data?.HeaderFieldConfigurations || [],
          ItemFieldConfigurations:
            response?.data?.ItemFieldConfigurations || [],
        });
      }
    } catch (error) {
      console.error("Error saving config:", error);
    }
  };
  useEffect(() => {
    const fetchData = async () => {
      const result1 = await getAdminConfig("vehicle_with_po");
      const result2 = await getAdminConfig("vehicle_without_po");
      if (result1?.messageType === "S") {
        console.log("Fetched vehicle_with_po config:", result1);
        setWithPoConfig({
          HeaderFieldConfigurations:
            result1?.data?.HeaderFieldConfigurations || [],
          ItemFieldConfigurations: result1?.data?.ItemFieldConfigurations || [],
        });
      }
      if (result2?.messageType === "S") {
        console.log("Fetched vehicle_without_po config:", result2);
        setWithoutPoConfig({
          HeaderFieldConfigurations:
            result2?.data?.HeaderFieldConfigurations || [],
          ItemFieldConfigurations: result2?.data?.ItemFieldConfigurations || [],
        });
      }
    };
    fetchData();
  }, []);
  return (
    <div className="w-full h-full bg-background">
      <div className="container py-8 px-4">
        <ConfigurationHeader
          title="Admin Configuration"
          description="Configure field visibility and properties for vehicle purchase order forms"
        />

        <ConfigurationTabs
          withPoConfig={withPoConfig}
          withoutPoConfig={withoutPoConfig}
          onUpdateConfig={handleUpdateConfig}
          handleSaveConfig={handleSaveConfig}
        />
      </div>
    </div>
  );
};

export default Index;
