import apiClient from "@/api/axios";
import { vehicleColumns } from "@/components/table/columns";
import { useAuth } from "@/context/AuthContext";
import { createCategoryMap } from "@/util/categoryMap";
import { formatSimpleDate } from "@/util/dateFormatter";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import DriversTable from "@/components/drivers/DriversTable";
import ConfirmationDIalog from "@/components/dialog/ConfirmationDIalog";
import { toast } from "sonner";
import VehiclesTable from "@/components/vehicles/VehiclesTable";

const classificationMap = createCategoryMap({
  0: "Private",
  1: "For Hire",
  2: "Government",
});



const VehiclesPage = () => {
  const [vehicleData, setVehicleData] = useState([]);
  const { token } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [loading, setLoading] = useState(true);
  const [showAlert, setShowAlert] = useState(false);
  const [selectedVehicle, setSelectedVehicle] = useState("");

  useEffect(() => {
    fetchVehicles();
  }, []);

  const fetchVehicles = async () => {
    try {
      const { data } = await apiClient.get("/vehicle", {
        headers: {
          Authorization: token,
        },
      });
    
      const vehicleData = data.data.map((dData) => ({
        _id: dData._id,
        plateNo: dData.plateNo,
        color: dData.color,
        bodyType: dData.bodyType,
        dateRegistered: formatSimpleDate(dData.dateRegistered),
        type: dData.type,
        make: dData.make,
        series: dData.series,
        classification: classificationMap.get(dData.classification),
      }));

      setVehicleData(vehicleData);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
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
    setSelectedDriver(data);
  };

  const confirmDelete = () => {
    onDelete(false); // Call the delete function
    setShowAlert(false); // Close the alert dialog after deleting
  };

  const cancelDelete = () => {
    setShowAlert(false); // Close the alert dialog without deleting
  };
  return (
    <div className="p-4">
      <header className="text-xl md:text-3xl font-bold mb-5">Vehicles</header>
      <section>
        <VehiclesTable
          data={vehicleData}
          filters={["fullname", "licenseNo"]}
          tableColumn={vehicleColumns}
          onAdd={handleAdd}
          loading={loading}
          onManage={onManage}
          onDelete={handleDeactivate}
          onNavigate={handleNavigate}
        />
      </section>
      {/* <ConfirmationDIalog
        open={showAlert}
        onOpenChange={setShowAlert}
        confirm={confirmDelete}
        cancel={cancelDelete}
        title={"Are you sure?"}
        description={
          "This action cannot be undone. This will deactivate the driver."
        }
      /> */}
    </div>
  );
};

export default VehiclesPage;
