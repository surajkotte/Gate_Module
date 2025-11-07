const apiUrl = import.meta.env.VITE_SERVER_URL;

export const saveVehicleEntries = async (data, type) => {
  try {
    const response = await fetch(`${apiUrl}/entry/save`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ data, type }),
    });
    const result = await response.json();
    return result;
  } catch (error) {
    console.error("Error saving vehicle entries:", error.message);
    throw error;
  }
};

export const getVehicleEntryConfig = async ({ type }) => {
  try {
    const response = await fetch(`${apiUrl}/config/${type}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const result = await response.json();
    return result;
  } catch (error) {
    console.error("Error fetching vehicle entry config:", error.message);
    throw { messageType: "E", message: error.message };
  }
};

export const getVehicleEntries = async () => {
  try {
    const response = await fetch(`${apiUrl}/entries`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Failed to fetch vehicle entries");
    }

    const result = await response.json();
    return result;
  } catch (error) {
    console.error("Error fetching vehicle entries:", error.message);
    throw error;
  }
};

export const getDefaultConfig = async () => {
  try {
    const response = await fetch(`${apiUrl}/default-entries`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const result = await response.json();
    return result;
  } catch (error) {
    console.error("Error fetching default config:", error.message);
    throw error;
  }
};

export const getSavedVehicleData = async () => {
  try {
    const response = await fetch(`${apiUrl}/saved-entries`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const result = await response.json();
    return result;
  } catch (error) {
    console.error("Error fetching saved vehicle data:", error.message);
    throw error;
  }
};

export const getSavedEntriesById = async (id) => {
  try {
    const response = await fetch(`${apiUrl}/saved-entry/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const result = await response.json();
    return result;
  } catch (error) {
    console.error("Error fetching saved entries by type:", error.message);
    throw error;
  }
};
