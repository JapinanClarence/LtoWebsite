import React, { useEffect, useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { logs } from "@/components/table/columns";
import TableComponent from "@/components/table/TableComponent";
import apiClient from "@/api/axios";
import { useAuth } from "@/context/AuthContext";
import { createCategoryMap } from "@/util/categoryMap";
import { formatSimpleDateTime } from "@/util/dateFormatter";

const logTypeMap = createCategoryMap({
    0: "Registration",
    1: "Violation",
    2:"Accident"
})

const DriverLogs = () => {
  const [logData, setLogData] = useState([]);
  const { token } = useAuth();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const { data } = await apiClient.get("/logs", {
          headers: {
            Authorization: token,
          },
        });
        console.log(data)
        if (data.success) {
          const driverLogData = data.data.map((data) => ({
            id: data._id,
            fullname: data.driver.fullname,
            type: logTypeMap.get(data.type),
            createdAt: formatSimpleDateTime(data.createdAt),
          }));
          console.log(driverLogData)
          setLogData(driverLogData);
        }
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  return (
    <Card className="flex-grow lg:col-span-3  border md:shadow-none">
      <CardHeader>
        <CardTitle className="text-xl md:text-2xl font-bold">Driver Logs</CardTitle>
      </CardHeader>
      <CardContent>
        <TableComponent tableColumn={logs} data={logData} />
      </CardContent>
    </Card>
  );
};

export default DriverLogs;
