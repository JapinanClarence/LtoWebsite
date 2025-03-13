import React, { useState, useLayoutEffect } from "react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import apiClient from "@/api/axios";
import { useAuth } from "@/context/AuthContext";
import { useForm } from "react-hook-form";
import { CreateDriverSchema } from "@/schema";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Label } from "../ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
import { formatDate } from "@/util/dateFormatter";
import { useNavigate } from "react-router-dom";
import { LoaderCircle } from "lucide-react";

const FormComponent = () => {
  const [submitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();
  const {token} = useAuth();
  // const [loading, setIsLoading] = useState(true);
  const date = formatDate(Date.now());

  const form = useForm({
    resolver: zodResolver(CreateDriverSchema),
    defaultValues: {
      licenseNo: "",
      firstName: "",
      middleName: "",
      lastName: "",
      street: "",
      barangay: "",
      municipality: "",
      province: "",
      zipCode: "",
      nationality: "",
      sex: "",
      birthDate: "",
      civilStatus: "",
      birthBarangay: "",
      birthStreet: "",
      birthMunicipality: "",
      birthProvince: "",
      issueDate: "",
      expiryDate: "",
    },
  });

  const onSubmit = async (formData) => {
    setIsSubmitting(true)
    try {
      const content = {
        licenseNo: formData.licenseNo,
        firstName:formData.firstName,
        lastName: formData.lastName,
        middleName: formData.middleName,
        birthDate: formData.birthDate,
        sex: formData.sex,
        civilStatus: formData.civilStatus,
        address:{
          street: formData.street,
          barangay: formData.barangay,
          municipality: formData.municipality,
          province: formData.province
        },
        zipCode: formData.zipCode,
        nationality:formData.nationality,
        birthPlace:formData.birthPlace,
        issueDate:formData.issueDate,
        expiryDate:formData.expiryDate
      }

      const { data } = await apiClient.post("/driver", content, {
        headers: {
          Authorization: token,
        },
      });


      if (data.success) {
        toast.success("Driver has been added", {
          description: date,
        });
        setIsSubmitting(false)
      }
    } catch (error) {
      console.log(error);
      const message = error.response.data.message;
      setIsSubmitting(false);
      toast.error(message, {
        description: `${date}`,
      });
    }
  };
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="space-y-4">
          <div>
            <Label>Personal Information</Label>

            <div className="grid md:grid-cols-3 gap-x-3">
              <FormField
                control={form.control}
                name="firstName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-muted-foreground text-sm">
                      Firstname
                    </FormLabel>
                    <FormControl>
                      <Input {...field} type="text" />
                    </FormControl>
                    <FormMessage className="text-xs " />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="middleName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-muted-foreground text-sm">
                      Middlename
                    </FormLabel>
                    <FormControl>
                      <Input {...field} type="text" />
                    </FormControl>
                    <FormMessage className="text-xs " />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="lastName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-muted-foreground text-sm">
                      Lastname
                    </FormLabel>
                    <FormControl>
                      <Input {...field} type="text" />
                    </FormControl>
                    <FormMessage className="text-xs " />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="sex"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-muted-foreground text-sm">
                      Sex
                    </FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Choose sex" />
                        </SelectTrigger>
                      </FormControl>

                      <SelectContent className="bg-white border-zinc-300">
                        <SelectGroup>
                          {/* <SelectLabel>Sex</SelectLabel> */}
                          <SelectItem value="0">Male</SelectItem>
                          <SelectItem value="1">Female</SelectItem>
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                    <FormMessage className="text-xs " />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="birthDate"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-muted-foreground text-sm">
                      Birthday
                    </FormLabel>
                    <FormControl>
                      <Input {...field} type="date" />
                    </FormControl>
                    <FormMessage className="text-xs " />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="civilStatus"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-muted-foreground text-sm">
                      Civil Status
                    </FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Choose civil status" />
                        </SelectTrigger>
                      </FormControl>

                      <SelectContent className="bg-white border-zinc-300">
                        <SelectGroup>
                          {/* <SelectLabel>Sex</SelectLabel> */}
                          <SelectItem value="0">Single</SelectItem>
                          <SelectItem value="1">Married</SelectItem>
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                    <FormMessage className="text-xs " />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="nationality"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-muted-foreground text-sm">
                      Nationality
                    </FormLabel>
                    <FormControl>
                      <Input {...field} type="text" />
                    </FormControl>
                    <FormMessage className="text-xs " />
                  </FormItem>
                )}
              />
              
            </div>
          </div>
          <div>
            <Label>Address</Label>
            <div className="grid md:grid-cols-2 gap-x-3">
              <FormField
                control={form.control}
                name="street"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-muted-foreground text-sm">
                      Street
                    </FormLabel>
                    <FormControl>
                      <Input {...field} type="text" />
                    </FormControl>
                    <FormMessage className="text-xs " />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="barangay"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-muted-foreground text-sm">
                      Barangay
                    </FormLabel>
                    <FormControl>
                      <Input {...field} type="text" />
                    </FormControl>
                    <FormMessage className="text-xs " />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="municipality"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-muted-foreground text-sm">
                      Municipality
                    </FormLabel>
                    <FormControl>
                      <Input {...field} type="text" />
                    </FormControl>
                    <FormMessage className="text-xs " />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="province"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-muted-foreground text-sm">
                      Province
                    </FormLabel>
                    <FormControl>
                      <Input {...field} type="text" />
                    </FormControl>
                    <FormMessage className="text-xs " />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="zipCode"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-muted-foreground text-sm">
                      Zip-code
                    </FormLabel>
                    <FormControl>
                      <Input {...field} type="text" />
                    </FormControl>
                    <FormMessage className="text-xs " />
                  </FormItem>
                )}
              />
            </div>
            <div className="col-span-3">
              <FormField
                control={form.control}
                name="birthPlace"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-muted-foreground text-sm">
                      Birthplace
                    </FormLabel>
                    <FormControl>
                      <Input {...field} type="text" />
                    </FormControl>
                    <FormMessage className="text-xs " />
                  </FormItem>
                )}
              />
            </div>
          </div>
          <div>
            <Label>Other</Label>
            <div className="grid md:grid-cols-3 gap-x-3">
            <FormField
                control={form.control}
                name="licenseNo"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-muted-foreground text-sm">
                      License No.
                    </FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        type="text"
                        placeholder="00L-00-000000"
                      />
                    </FormControl>
                    <FormMessage className="text-xs " />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="issueDate"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-muted-foreground text-sm">
                      Issued Date
                    </FormLabel>
                    <FormControl>
                      <Input {...field} type="date" />
                    </FormControl>
                    <FormMessage className="text-xs " />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="expiryDate"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-muted-foreground text-sm">
                      Expiration Date
                    </FormLabel>
                    <FormControl>
                      <Input {...field} type="date" />
                    </FormControl>
                    <FormMessage className="text-xs " />
                  </FormItem>
                )}
              />
             
            </div>
          </div>
          <div className="space-x-2">
            <Button disabled={submitting} id="submit" className="w-20">
              {submitting ? (
                <LoaderCircle className="w-6 h-6 text-primary-foreground mx-auto animate-spin" />
              ) : (
                "Submit"
              )}
            </Button>
            <Button
              type="button"
              variant="secondary"
              onClick={() => navigate(-1)}
            >
              Cancel
            </Button>
          </div>
        </div>
      </form>
    </Form>
  );
};

export default FormComponent;
