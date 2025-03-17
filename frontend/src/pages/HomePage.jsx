import React, { useLayoutEffect, useState } from "react";
import apiClient from "@/api/axios";
import { useAuth } from "@/context/AuthContext";
import StatCard from "@/components/home/StatCard";
import { Users, Car, ChartSpline, ChartPie } from "lucide-react";
import { ViolationsChart } from "@/components/home/ViolationsChart";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { logs } from "@/components/table/columns";
import TableComponent from "@/components/table/TableComponent";
import { Calendar } from "@/components/ui/calendar";

const HomePage = () => {
  const loading = useState(false);
  return (
    <div className="p-4 space-y-4">
      <section className="text-3xl font-bold">Dashboard</section>
      <section className="max-h-full w-full grid grid-flow-row lg:grid-flow-col grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-4">
        <StatCard
          name={"Registered Drivers"}
          value={"130"}
          icon={Users}
          color={""}
          statuses={[
            { label: "100 Active", color: "#047857", bgColor: "#d1fae5" }, // Green
            { label: "30 Expired", color: "#dc2626", bgColor: "#fee2e2" }, // Red
          ]}
        />
        <StatCard
          name={"Registered Vehicles"}
          value={"100"}
          icon={Car}
          color={""}
          statuses={[
            { label: "87 Active", color: "#047857", bgColor: "#d1fae5" }, // Green
            { label: "13 Expired", color: "#dc2626", bgColor: "#fee2e2" }, // Red
          ]}
        />
        <StatCard
          name={"Violations"}
          value={"24,828"}
          icon={ChartSpline}
          color={""}
        />
        <StatCard
          name={"Accidents"}
          value={"25,010"}
          icon={ChartPie}
          color={""}
        />
      </section>

      <ViolationsChart />
      <section className="flex gap-4">
        <Card className="flex-grow lg:col-span-3  border md:shadow-none">
          <CardHeader>
            <CardTitle className="text-2xl font-bold">Driver Logs</CardTitle>
          </CardHeader>
          <CardContent>
            <TableComponent tableColumn={logs} data={[]} />
          </CardContent>
        </Card>
        <div className="p-5 border  w-min rounded-lg ">
          <Calendar
            mode="single"
            // selected={date}
            // onSelect={setDate}
            className="w-1/4"
          />
        </div>
      </section>
    </div>
  );
};

export default HomePage;
