import React, { useState, useLayoutEffect } from "react";
import { cn } from "@/lib/utils";
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
import { LoaderCircle, CalendarIcon } from "lucide-react";
import { format, addMonths, setYear, setMonth } from "date-fns";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import DatePicker from "../calendar/DatePicker";

const FormComponent = () => {
  const [submitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();
  const { token } = useAuth();
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
      birthDate: undefined,
      civilStatus: "",
      birthPlace: "",
      issueDate: undefined,
      expiryDate: "",
    },
  });

  const onSubmit = async (formData) => {
    setIsSubmitting(true);
    try {
      const content = {
        licenseNo: formData.licenseNo,
        firstName: formData.firstName,
        lastName: formData.lastName,
        middleName: formData.middleName,
        birthDate: formData.birthDate,
        sex: formData.sex,
        civilStatus: formData.civilStatus,
        address: {
          street: formData.street,
          barangay: formData.barangay,
          municipality: formData.municipality,
          province: formData.province,
        },
        zipCode: formData.zipCode,
        nationality: formData.nationality,
        birthPlace: formData.birthPlace,
        issueDate: formData.issueDate,
        expiryDate: formData.expiryDate,
      };

      const { data } = await apiClient.post("/driver", content, {
        headers: {
          Authorization: token,
        },
      });

      if (data.success) {
        toast.success("Driver has been added", {
          description: date,
        });
        setIsSubmitting(false);
        form.reset()
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

            <div className="grid md:grid-cols-2 lg:grid-cols-6 gap-x-3">
              <FormField
                control={form.control}
                name="firstName"
                render={({ field }) => (
                  <FormItem className="lg:col-span-2">
                    <FormLabel
                      className={cn(
                        "text-muted-foreground",
                        form.formState.errors.firstName && "text-red-400"
                      )}
                    >
                      Firstname
                    </FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        type="text"
                        className={cn(
                          "border border-input focus:ring-0",
                          form.formState.errors.firstName && "border-red-400"
                        )}
                      />
                    </FormControl>
                    <FormMessage className="text-xs text-red-400" />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="middleName"
                render={({ field }) => (
                  <FormItem className="lg:col-span-2">
                    <FormLabel className="text-muted-foreground">
                      Middlename
                    </FormLabel>
                    <FormControl>
                      <Input {...field} type="text" />
                    </FormControl>
                    <FormMessage className="text-xs text-red-400" />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="lastName"
                render={({ field }) => (
                  <FormItem className="lg:col-span-2">
                    <FormLabel
                      className={cn(
                        "text-muted-foreground",
                        form.formState.errors.lastName && "text-red-400"
                      )}
                    >
                      Lastname
                    </FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        type="text"
                        className={cn(
                          "text-muted-foreground",
                          form.formState.errors.lastName && "border-red-400"
                        )}
                      />
                    </FormControl>
                    <FormMessage className="text-xs text-red-400" />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="sex"
                render={({ field }) => (
                  <FormItem className="lg:col-span-3">
                    <FormLabel
                      className={cn(
                        "text-muted-foreground",
                        form.formState.errors.sex && "text-red-400"
                      )}
                    >
                      Sex
                    </FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger
                          className={cn(
                            "text-muted-foreground",
                            form.formState.errors.sex && "border-red-400"
                          )}
                        >
                          <SelectValue placeholder="Choose sex" />
                        </SelectTrigger>
                      </FormControl>

                      <SelectContent className="bg-white border-zinc-400">
                        <SelectGroup>
                          {/* <SelectLabel>Sex</SelectLabel> */}
                          <SelectItem value="0">Male</SelectItem>
                          <SelectItem value="1">Female</SelectItem>
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                    <FormMessage className="text-xs text-red-400" />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="birthDate"
                render={({ field }) => (
                  <FormItem className="lg:col-span-3">
                    <FormLabel
                      className={cn(
                        "text-muted-foreground",
                        form.formState.errors.birthDate && "text-red-400"
                      )}
                    >
                      Birthday
                    </FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant="outline"
                            className={cn(
                              "w-full text-left font-normal justify-start",
                              !field.value && "text-muted-foreground",
                              form.formState.errors.birthDate &&
                                "border-red-400"
                            )}
                          >
                            <CalendarIcon className="h-4 w-4 opacity-50" />
                            {field.value ? (
                              format(field.value, "PPP")
                            ) : (
                              <span>Pick a date</span>
                            )}
                          </Button>
                        </FormControl>
                      </PopoverTrigger>

                      <PopoverContent
                        className="w-auto p-2 space-y-2"
                        align="start"
                      >
                        <DatePicker
                          fieldValue={field.value}
                          dateValue={(date) =>
                            form.setValue("birthDate", date, {
                              shouldValidate: true,
                            })
                          }
                        />
                      </PopoverContent>
                    </Popover>
                    <FormMessage className="text-xs text-red-400" />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="civilStatus"
                render={({ field }) => (
                  <FormItem className="lg:col-span-3">
                    <FormLabel
                      className={cn(
                        "text-muted-foreground",
                        form.formState.errors.civilStatus && "text-red-400"
                      )}
                    >
                      Civil Status
                    </FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger
                          className={cn(
                            "text-muted-foreground",
                            form.formState.errors.civilStatus &&
                              "border-red-400"
                          )}
                        >
                          <SelectValue placeholder="Choose civil status" />
                        </SelectTrigger>
                      </FormControl>

                      <SelectContent className="bg-white border-zinc-400">
                        <SelectGroup>
                          {/* <SelectLabel>Sex</SelectLabel> */}
                          <SelectItem value="0">Single</SelectItem>
                          <SelectItem value="1">Married</SelectItem>
                          <SelectItem value="3">Divorced</SelectItem>
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                    <FormMessage className="text-xs text-red-400" />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="nationality"
                render={({ field }) => (
                  <FormItem className="md:col-span-2 lg:col-span-3">
                    <FormLabel
                      className={cn(
                        "text-muted-foreground",
                        form.formState.errors.nationality && "text-red-400"
                      )}
                    >
                      Nationality
                    </FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        type="text"
                        className={cn(
                          "text-muted-foreground",
                          form.formState.errors.nationality && "border-red-400"
                        )}
                      />
                    </FormControl>
                    <FormMessage className="text-xs text-red-400" />
                  </FormItem>
                )}
              />
            </div>
          </div>
          <div>
            <Label>Address</Label>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-x-3">
              <FormField
                control={form.control}
                name="street"
                render={({ field }) => (
                  <FormItem className="col-span-1 lg:col-span-2">
                    <FormLabel
                      className={cn(
                        "text-muted-foreground",
                        form.formState.errors.street && "text-red-400"
                      )}
                    >
                      Street
                    </FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        type="text"
                        className={cn(
                          "text-muted-foreground",
                          form.formState.errors.street && "border-red-400"
                        )}
                      />
                    </FormControl>
                    <FormMessage className="text-xs text-red-400" />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="barangay"
                render={({ field }) => (
                  <FormItem className="col-span-1 lg:col-span-2">
                    <FormLabel
                      className={cn(
                        "text-muted-foreground",
                        form.formState.errors.barangay && "text-red-400"
                      )}
                    >
                      Barangay
                    </FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        type="text"
                        className={cn(
                          "text-muted-foreground",
                          form.formState.errors.barangay && "border-red-400"
                        )}
                      />
                    </FormControl>
                    <FormMessage className="text-xs text-red-400" />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="municipality"
                render={({ field }) => (
                  <FormItem className="col-span-1 lg:col-span-2">
                    <FormLabel
                      className={cn(
                        "text-muted-foreground",
                        form.formState.errors.municipality && "text-red-400"
                      )}
                    >
                      Municipality
                    </FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        type="text"
                        className={cn(
                          "text-muted-foreground",
                          form.formState.errors.municipality && "border-red-400"
                        )}
                      />
                    </FormControl>
                    <FormMessage className="text-xs text-red-400" />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="province"
                render={({ field }) => (
                  <FormItem className="col-span-1 lg:col-span-3">
                    <FormLabel
                      className={cn(
                        "text-muted-foreground",
                        form.formState.errors.province && "text-red-400"
                      )}
                    >
                      Province
                    </FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        type="text"
                        className={cn(
                          "text-muted-foreground",
                          form.formState.errors.province && "border-red-400"
                        )}
                      />
                    </FormControl>
                    <FormMessage className="text-xs text-red-400" />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="zipCode"
                render={({ field }) => (
                  <FormItem className="col-span-1 lg:col-span-3">
                    <FormLabel
                      className={cn(
                        "text-muted-foreground",
                        form.formState.errors.zipCode && "text-red-400"
                      )}
                    >
                      Zip-code
                    </FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        type="text"
                        className={cn(
                          "text-muted-foreground",
                          form.formState.errors.zipCode && "border-red-400"
                        )}
                      />
                    </FormControl>
                    <FormMessage className="text-xs text-red-400" />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="birthPlace"
                render={({ field }) => (
                  <FormItem className="lg:col-span-6">
                    <FormLabel
                      className={cn(
                        "text-muted-foreground",
                        form.formState.errors.birthPlace && "text-red-400"
                      )}
                    >
                      Birthplace
                    </FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        type="text"
                        className={cn(
                          "text-muted-foreground",
                          form.formState.errors.birthPlace && "border-red-400"
                        )}
                      />
                    </FormControl>
                    <FormMessage className="text-xs text-red-400" />
                  </FormItem>
                )}
              />
            </div>
          </div>
          <div>
            <Label>Other</Label>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-x-3">
              <FormField
                control={form.control}
                name="licenseNo"
                render={({ field }) => (
                  <FormItem className="md:col-span-2 lg:col-span-1">
                    <FormLabel
                      className={cn(
                        "text-muted-foreground",
                        form.formState.errors.licenseNo && "text-red-400"
                      )}
                    >
                      License No.
                    </FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        type="text"
                        placeholder="00L-00-000000"
                        className={cn(
                          "text-muted-foreground",
                          form.formState.errors.licenseNo && "border-red-400"
                        )}
                      />
                    </FormControl>
                    <FormMessage className="text-xs text-red-400" />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="issueDate"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel
                      className={cn(
                        "text-muted-foreground",
                        form.formState.errors.issueDate && "text-red-400"
                      )}
                    >
                      Issued Date
                    </FormLabel>
                    <FormControl>
                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant="outline"
                              className={cn(
                                "w-full text-left font-normal justify-start",
                                !field.value && "text-muted-foreground",
                                form.formState.errors.issueDate &&
                                  "border-red-400"
                              )}
                            >
                              <CalendarIcon className="h-4 w-4 opacity-50" />
                              {field.value ? (
                                format(field.value, "PPP")
                              ) : (
                                <span>Pick a date</span>
                              )}
                            </Button>
                          </FormControl>
                        </PopoverTrigger>

                        <PopoverContent
                          className="w-auto p-2 space-y-2"
                          align="start"
                        >
                          <DatePicker
                            fieldValue={field.value}
                            dateValue={(date) =>
                              form.setValue("issueDate", date, {
                                shouldValidate: true,
                              })
                            }
                          />
                        </PopoverContent>
                      </Popover>
                    </FormControl>
                    <FormMessage className="text-xs text-red-400" />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="expiryDate"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel
                      className={cn(
                        "text-muted-foreground",
                        form.formState.errors.expiryDate && "text-red-400"
                      )}
                    >
                      Expiration Date
                    </FormLabel>
                    <FormControl>
                    <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant="outline"
                              className={cn(
                                "w-full text-left font-normal justify-start",
                                !field.value && "text-muted-foreground",
                                form.formState.errors.expiryDate &&
                                  "border-red-400"
                              )}
                            >
                              <CalendarIcon className="h-4 w-4 opacity-50" />
                              {field.value ? (
                                format(field.value, "PPP")
                              ) : (
                                <span>Pick a date</span>
                              )}
                            </Button>
                          </FormControl>
                        </PopoverTrigger>

                        <PopoverContent
                          className="w-auto p-2 space-y-2"
                          align="start"
                        >
                          <DatePicker
                            fieldValue={field.value}
                            dateValue={(date) =>
                              form.setValue("expiryDate", date, {
                                shouldValidate: true,
                              })
                            }
                          />
                        </PopoverContent>
                      </Popover>
                    </FormControl>
                    <FormMessage className="text-xs text-red-400" />
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
