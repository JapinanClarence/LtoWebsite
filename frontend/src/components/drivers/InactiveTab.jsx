import React, { useState } from "react";
import { deactivatedDriverColumns } from "../table/columns";
import TableComponent from "../table/TableComponent";
import { toast } from "sonner";
import ActivateDialog from "./ActivateDialog";
import apiClient from "@/api/axios";
import { useAuth } from "@/context/AuthContext";

const InactiveTab = ({ data, loading, onRefresh }) => {
  const [showAlert, setShowAlert] = useState(false);
  const [currentDriver, setCurrentDriver] = useState("");
//   const [submitting, setIsSubmitting] = useState(false);
  const { token } = useAuth();

  const handleActivate = (data) => {
    setShowAlert(true);
    setCurrentDriver(data);
  };

  const confirmActivate = () => {
    onActivate(true); // Call the activate function
    setShowAlert(false); // Close the alert dialog after action
  };

  const cancelActivate = () => {
    setShowAlert(false); // Close the alert dialog
  };

  const onActivate = async (data) => {
    
    const promise = async () => {
      try {
        const response = await apiClient.patch(
          `/driver/${currentDriver}/updateStatus`,
          {
            isActive: data,
          },
          {
            headers: {
              Authorization: token,
            },
          }
        );

        return response.data; // Resolve with data for toast success message
      } catch (error) {
        const message = error.response?.data?.message || "An error occurred";
        throw new Error(message); // Reject with error for toast error message
      } finally{
        onRefresh()
      }
    };

    toast.promise(promise(), {
      loading: "Loading...",
      success: `Driver updated successfully`,
      error: (error) => error.message || "Failed to update driver",
    });
  };

  return (
    <>
      <TableComponent
        data={data}
        searchPlaceholder={"Search Driver..."}
        filters={["fullname", "licenseNo"]}
        tableColumn={deactivatedDriverColumns}
        loading={loading}
        onAction={handleActivate}
      />
      <ActivateDialog
        open={showAlert}
        onOpenChange={setShowAlert}
        cancelActivate={cancelActivate}
        confirmActivate={confirmActivate}
      />
    </>
  );
};

export default InactiveTab;
