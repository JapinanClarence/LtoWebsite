import apiClient from "@/api/axios";
import { driverColumns } from "@/components/table/columns";
import { useAuth } from "@/context/AuthContext";
import { createCategoryMap } from "@/util/categoryMap";
import { formatSimpleDate } from "@/util/dateFormatter";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import DriversTable from "@/components/drivers/DriversTable";
import ConfirmationDIalog from "@/components/dialog/ConfirmationDIalog";
import { toast } from "sonner";

const sexMap = createCategoryMap({
  0: "Male",
  1: "Female",
});

const civilStatusMap = createCategoryMap({
  0: "Single",
  1: "Married",
  3: "Divorced",
});

const DriverPage = () => {
  const [driverData, setDriverData] = useState([]);
  const { token } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [loading, setLoading] = useState(true);
  const [showAlert, setShowAlert] = useState(false);
  const [currentDriver, setCurrentDriver] = useState("");

  useEffect(() => {
    fetchDrivers();
  }, []);

  const fetchDrivers = async () => {
    try {
      const { data } = await apiClient.get("/driver", {
        headers: {
          Authorization: token,
        },
      });

      const driverData = data.data.map((dData) => ({
        _id: dData._id,
        licenseNo: dData.licenseNo,
        fullname: dData.fullname,
        birthDate: formatSimpleDate(dData.birthDate),
        issueDate: formatSimpleDate(dData.issueDate),
        expiryDate: formatSimpleDate(dData.expiryDate),
        sex: sexMap.get(dData.sex),
        civilStatus: civilStatusMap.get(dData.civilStatus),
        isActive: dData.isActive,
      }));

      const active = driverData.filter((data) => data.isActive);
      setDriverData(active);

      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  const handleAdd = async () => {
    navigate(`${location.pathname}/create`);
  };

  const onManage = (id) => {
    navigate(`/driver/${id}`);
  };

  const handleNavigate = () => {
    navigate(`${location.pathname}/inactive`);
  };

  const handleDeactivate = (data) => {
    setShowAlert(true);
    setCurrentDriver(data)
  };

  const confirmDelete = () => {
    onDelete(false); // Call the delete function
    setShowAlert(false); // Close the alert dialog after deleting
  };

  const cancelDelete = () => {
    setShowAlert(false); // Close the alert dialog without deleting
  };

  const onDelete = async (data) => {
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
      } finally {
        fetchDrivers();
      }
    };

    toast.promise(promise(), {
      loading: "Loading...",
      success: `Driver deactivated`,
      error: (error) => error.message || "Failed to update driver",
    });
  };
  return (
    <div className="p-4">
      <header className="text-xl md:text-3xl font-bold mb-5">Drivers</header>
      <section>
        <DriversTable
          data={driverData}
          filters={["fullname", "licenseNo"]}
          tableColumn={driverColumns}
          onAdd={handleAdd}
          loading={loading}
          onManage={onManage}
          onDelete={handleDeactivate}
          onNavigate={handleNavigate}
        />
      </section>
      <ConfirmationDIalog
        open={showAlert}
        onOpenChange={setShowAlert}
        confirm={confirmDelete}
        cancel={cancelDelete}
        title={"Are you sure?"}
        description={
          "This action cannot be undone. This will deactivate the driver."
        }
      />
    </div>
  );
};

export default DriverPage;
