import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import React, { useState, useLayoutEffect } from "react";
import FormComponent from "@/components/driver/FormComponent";

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
          <FormComponent />
        </CardContent>
      </Card>
    </>
  );
};

export default DriverForm;
