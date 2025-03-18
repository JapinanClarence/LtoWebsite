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
  const [activeDrivers, setActiveDrivers] = useState([]);
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
      }));
      setActiveDrivers(driverData);
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
  return (
    <div className="p-4">
      <section className="text-xl md:text-3xl font-bold mb-5">Drivers</section>
      <section>
        <Tabs defaultValue="account" className="">
          <TabsList className="grid grid-cols-2 w-fit">
            <TabsTrigger value="account">Active Drivers</TabsTrigger>
            <TabsTrigger value="password">Deactivated Drivers</TabsTrigger>
          </TabsList>
          <TabsContent value="account" className="">
            <TableComponent
              // showAddButton={"Add Driver"}
              data={activeDrivers}
              searchPlaceholder={"Search Driver..."}
              filters={["fullname", "licenseNo"]}
              tableColumn={driverColumns}
              // onAdd={handleAdd}
              loading={loading}
              onManage={onManage}
            />
          </TabsContent>
          <TabsContent value="password">Tab 2</TabsContent>
        </Tabs>
      </section>
    </div>
  );
};

export default DriverPage;
