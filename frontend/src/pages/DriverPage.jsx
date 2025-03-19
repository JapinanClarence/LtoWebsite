import apiClient from "@/api/axios";
import { driverColumns } from "@/components/table/columns";
import TableComponent from "@/components/table/TableComponent";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/AuthContext";
import { createCategoryMap } from "@/util/categoryMap";
import { formatSimpleDate } from "@/util/dateFormatter";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ActiveTab from "@/components/drivers/ActiveTab";
import InactiveTab from "@/components/drivers/InactiveTab";
import DriversTable from "@/components/drivers/DriversTable";

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

  const handleNavigate =  () =>{
    navigate(`${location.pathname}/inactive`);
  }
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
          onAction={onManage}
          onNavigate={handleNavigate}
        />
      </section>
    </div>
  );
};

export default DriverPage;
