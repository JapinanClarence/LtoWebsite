import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import React, { useState, useLayoutEffect } from "react";
import AddForm from "@/components/driver/AddForm";

const DriverForm = () => {
  return (
    <>
      {/* <section className="text-3xl font-bold">Add Driver</section> */}
      <Card>
        <CardHeader>
          <CardTitle className="text-xl md:text-3xl font-bold">Add Driver</CardTitle>
          <CardDescription>
            Fill in required fields to add driver.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <AddForm />
        </CardContent>
      </Card>
    </>
  );
};

export default DriverForm;
