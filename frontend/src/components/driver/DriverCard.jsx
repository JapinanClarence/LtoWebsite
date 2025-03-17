import React, { useEffect, useState } from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardDescription,
  CardFooter
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import apiClient from "@/api/axios";
import { useAuth } from "@/context/AuthContext";
import { createCategoryMap } from "@/util/categoryMap";
import { formatSimpleDate } from "@/util/dateFormatter";
import { useNavigate, useParams } from "react-router-dom";
import { Edit, Trash } from "lucide-react";

const sexMap = createCategoryMap({
    0: "Male",
    1: "Female",
  });
  
  const civilStatusMap = createCategoryMap({
    0: "Single",
    1: "Married",
    3: "Divorced",
  });
  
const DriverCard = () => {
  const params = useParams();
  const [loading, setLoading] = useState(true);
  const { token } = useAuth();
  const [driverData, setDriverData] = useState();
  const navigate = useNavigate();
  const fetchDriver = async () => {
    try {
      const { data } = await apiClient.get(`/driver/${params.id}`, {
        headers: {
          Authorization: token,
        },
      });

      if (data) {
        setDriverData(data.data);
      }
    } catch (error) {
      const statusCode = error.response.status;

      if (statusCode) {
        navigate("/404");
      }
    }
  };
  useEffect(() => {
    fetchDriver();
  }, []);
  return (
    <Card className="lg:col-span-2 row-span-2 border md:shadow-none">
      <CardHeader className="border-b">
        <CardTitle className="text-3xl font-bold">
          {driverData?.fullname}
        </CardTitle>
        <CardDescription>{driverData?.licenseNo}</CardDescription>
      </CardHeader>
      <CardContent className="pt-6">
        <div className="grid grid-cols-2 text-sm gap-4 mb-2">
          <h2 className="text-muted-foreground ">Sex:</h2>
          <p className="font-semibold w-full">{sexMap.get(driverData?.sex)}</p>
          <h2 className="text-muted-foreground ">Date of Birth:</h2>
          <p className="font-semibold w-full">
            {formatSimpleDate(driverData?.birthDate)}
          </p>
          <h2 className="text-muted-foreground ">Civil Status:</h2>
          <p className="font-semibold w-full">
            {civilStatusMap.get(driverData?.civilStatus)}
          </p>
          <h2 className="text-muted-foreground ">Nationality:</h2>
          <p className="font-semibold w-full">{driverData?.nationality}</p>

          <h2 className="text-muted-foreground ">Street:</h2>
          <p className="font-semibold w-full">{driverData?.address?.street}</p>
          <h2 className="text-muted-foreground ">Barangay:</h2>
          <p className="font-semibold w-full">
            {driverData?.address?.barangay}
          </p>
          <h2 className="text-muted-foreground ">Municipality:</h2>
          <p className="font-semibold w-full">
            {driverData?.address?.municipality}
          </p>
          <h2 className="text-muted-foreground ">Province:</h2>
          <p className="font-semibold w-full">
            {driverData?.address?.province}
          </p>
          <h2 className="text-muted-foreground ">Birthplace:</h2>
          <p className="font-semibold w-full">{driverData?.birthPlace}</p>
          <h2 className="text-muted-foreground ">Issue Date:</h2>
          <p className="font-semibold w-full">
            {formatSimpleDate(driverData?.issueDate)}
          </p>
          <h2 className="text-muted-foreground ">Expiry Date:</h2>
          <p className="font-semibold w-full">
            {formatSimpleDate(driverData?.expiryDate)}
          </p>
        </div>
      </CardContent>
      <CardFooter className="gap-2 text-sm ">
        <Button onClick={() => navigate(`/driver/edit/${params.id}`)} size="sm" className="font-bold" variant="outline">
          <Edit />
          Edit
        </Button>
        <Button
          className="border-red-400 bg-red-100 text-red-400 font-bold"
          size="sm"
          variant="outline"
        >
          <Trash />
          Delete
        </Button>
      </CardFooter>
    </Card>
  );
};

export default DriverCard;
