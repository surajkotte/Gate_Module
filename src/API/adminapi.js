const apiUrl = import.meta.env.VITE_SERVER_URL;

export const fetchConfig = async (type) => {
  try {
    const endpoint =
      type === "vehicle_with_po"
        ? "admin/vehicle_with_po"
        : type === "vacant_vehicle"
        ? "admin/vacant_vehicle"
        : type === "other_vehicle"
        ? "admin/other_vehicle"
        : "admin/vehicle_without_po";

    const response = await fetch(`${apiUrl}/${endpoint}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const responseData = await response.json();
    return responseData;
  } catch (error) {
    console.error("Error fetching config:", error.message);
    throw error;
  }
};

export const updateConfig = async (type, config) => {
  try {
    const endpoint =
      type === "vehicle_with_po"
        ? "admin/vehicle_with_po"
        : type === "vacant_vehicle"
        ? "admin/vacant_vehicle"
        : type === "other_vehicle"
        ? "admin/other_vehicle"
        : "admin/vehicle_without_po";

    const response = await fetch(`${apiUrl}/${endpoint}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(config),
    });

    const responseData = await response.json();
    return responseData;
  } catch (error) {
    console.error("Error updating config:", error.message);
    throw error;
  }
};
