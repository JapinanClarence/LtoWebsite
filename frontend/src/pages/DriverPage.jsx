import apiClient from "@/api/axios";
import { driverColumns } from "@/components/table/columns";
import TableComponent from "@/components/table/TableComponent";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/AuthContext";
import { createCategoryMap } from "@/util/categoryMap";
import { formatSimpleDate } from "@/util/dateFormatter";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const sexMap = createCategoryMap({
  0: "Male",
  1: "Female",
});

const civilStatusMap = createCategoryMap({
  0:"Single",
  1:"Married"
})


const DriverPage = () => {
  const [driverData, setDriverData] = useState([]);
  const { token } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

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
        licenseNo: dData.licenseNo,
        fullname: dData.fullname,
        birthDate: formatSimpleDate(dData.birthDate),
        issueDate: formatSimpleDate(dData.issueDate),
        expiryDate: formatSimpleDate(dData.expiryDate),
        sex: sexMap.get(dData.sex),
        civilStatus: civilStatusMap.get(dData.civilStatus)
      }));
      setDriverData(driverData);

    } catch (error) {
      console.log(error);
    }
  };

  const handleAdd = async () =>{
    navigate(`${location.pathname}/create`)
  }

  return (
    <div className="p-4">
      <section className="text-3xl font-bold">Drivers</section>
      <section>
        <TableComponent
          showAddButton={"Add Driver"}
          data={driverData}
          searchPlaceholder={"Search Driver..."}
          filters={["fullname", "licenseNo"]}
          tableColumn={driverColumns}
          onAdd={handleAdd}
        />
      </section>
    </div>
  );
};

export default DriverPage;
