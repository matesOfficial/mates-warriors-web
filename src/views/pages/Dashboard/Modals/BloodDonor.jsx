import React from "react";
import { useForm } from "react-hook-form";

import {
  Center,
  FormControl,
  Image,
  Input,
  Select,
  Stack,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
  Formik,
  Form,
  Field,
  validateName,
  Button,
} from "@chakra-ui/react";

import BloodDrop from "../../../../assets/bloodDrop.svg";

function BloodDonor({callback}) {
  let cities = [
    "Delhi",
    "Gurgaon",
    "Bangalore",
    "Pune",
    "Ahmedabad",
    "Mumbai",
    "Thane",
    "Nashik",
    "Kolkata",
    "Lucknow",
    "Noida",
    "Faridabad",
    "Prayagraj",
    "Patna",
    "Ranchi",
    "Jaipur",
    "Agra",
    "Chandigarh",
    "Nagpur",
    "Chennai",
    "Bhopal",
    "Indore",
    "Hyderabad",
    "Kerala",
    "Bihar",
    "Gujarat",
    "Maharashtra",
    "Karnataka",
    "Madhya Pradesh",
    "Orissa",
    "Uttar Pradesh",
    "Telangana",
    "Andhra Pradesh",
    "Chhatisgarh",
    "Tamil Nadu",
    "West Bengal",
    "Haryana",
    "Uttrakhand",
    "J&K",
    "Himachal Pradesh",
    "Jharkhand",
    "Rajasthan",
    "Goa",
    "Assam",
    "Punjab",
    "Saurashtra & South Gujarat",
    "Uttar Pradesh East",
    "Uttar Pradesh West",
    "Bundelkhand",
    "Other",
  ];

  let bloodgroups = ["O-", "O+", "B-", "B+", "A-", "A+", "AB-", "AB+"];

  const getData = () => {};
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => {
    callback(1,data)
  }
  const cssOfInput = {
    width: "100%",
    background: "#edf2f7",
    border: "1px ",
    padding: "5px 16px",
    borderRadius: "10px",
    font: "1rem 20px Arial",
    transition: "all 0.2s ease 0s",
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Center>
          <Image src={BloodDrop} boxSize="100px" objectFit="cover" />
        </Center>
        <FormControl mt={4}>
          <input
            style={cssOfInput}
            type="text"
            placeholder="Name"
            {...register("name", { required: true, maxLength: 80 })}
          />
        </FormControl>
        <FormControl mt={4}>
          <input
            style={cssOfInput}
            type="tel"
            placeholder="Phone Number"
            {...register("phone_number", {
              required: true,
              minLength: 6,
              maxLength: 12,
            })}
          />
        </FormControl>
        <FormControl mt={4}>
          <select 
            style={cssOfInput}
            {...register("Blood Group", { required: true })}
          >
            <option  value="">Blood Group</option>;
            {bloodgroups.map((item) => {
              return <option value={item}>{item}</option>;
            })}
          </select>
        </FormControl>
        <FormControl mt={4}>
          <select
            {...register("city", { required: true, maxLength: 100 })}
            style={cssOfInput}
            variant="filled"
          >
                        <option  value="">Select City</option>;

            {cities.map((item) => {
              return <option value={item}>{item}</option>;
            })}
          </select>
        </FormControl>
        <FormControl mt={4}>
          <input
            style={cssOfInput}
            type="number"
            placeholder="Pin-Code"
            {...register("pin_code", { required: true, maxLength: 100 })}
          />
        </FormControl>

        <FormControl mt={4}>
          <select placeholder="Mates Affiliation"
            style={cssOfInput}
            {...register("MATES Affiliation", { required: true })}
          >
            <option value="Student">Student</option>
            <option value="Alumni">Alumni</option>
            <option value="Faculty">Faculty</option>
            <option value="Administrative Staff">Administrative Staff</option>
            <option value="Trustee">Trustee</option>
            <option value="Other">Other</option>
          </select>
        </FormControl>

    
        <FormControl mt={4}>
          <input  style={cssOfInput}

            type="date"
            {...register("last_blood_donation_timestamp", { required: true })}
          />
        </FormControl>
        <FormControl mt={4}>
          <input type="submit" />
        </FormControl>
      </form>
    </>
  );
}

export default BloodDonor;
