import React from "react";
import { useForm } from "react-hook-form";

import {
  Center, FormControl,
  FormLabel,
  Image, Input,
  Select
} from "@chakra-ui/react";
import React, { useState } from "react";
import BloodDrop from '../../../../assets/bloodDrop.svg';
import { citiesAndStates } from '../../../../utils/citiesAndState';


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

export default function BloodDonor() {
  const [state, setState] = useState('')
  return (
    <>
      <Center>
        <Image src={BloodDrop}
          boxSize="100px"
          objectFit="cover"
        />
      </Center>
      <FormControl mt={4}  >
        <FormLabel >Full Name</FormLabel>
        <Input variant='filled' placeholder=" Name" />
      </FormControl>
      <FormControl mt={4}>
        <FormLabel >State</FormLabel>
        <Select variant='filled' placeholder="Select your state" onChange={(e) => setState(e.target.value)}>
          {Object.keys(citiesAndStates).map(stateName => {
            return (
              <option value={stateName}>{stateName}</option>
            )
          })}
        </Select>
      </FormControl>
      <FormControl mt={4}>
        <FormLabel >City</FormLabel>
        <Select variant='filled' placeholder="Select your city">
          {citiesAndStates[state].map(city => {
            return (
              <option value={city}>{city}</option>
            )
          })}
        </Select>
      </FormControl>
      <FormControl mt={4}>
        <FormLabel >Pin Code</FormLabel>
        <Input variant='filled' placeholder="Pin Code" />
      </FormControl>
      <FormControl mt={4}>
        <FormLabel >Phone Number</FormLabel>
        <Input variant='filled' placeholder="Phone Number" />
      </FormControl>
      <FormControl mt={4}>
        <FormLabel >BloodGroup</FormLabel>
        <Select variant='filled' placeholder="Select BloodGroup">
          {bloodgroups.map(item => {
            return (
              <option value="option1">{item}</option>
            )
          })}
        </Select>
      </FormControl>
      <FormControl mt={4}>
        <FormLabel >Mates Affiliation <small>(if any)</small></FormLabel>
        <Input variant='filled' placeholder="Mates Affiliation" />
      </FormControl>
      <FormControl mt={4} >
        <FormLabel >Date of last of Blood Donation</FormLabel>
        <Input variant='filled' placeholder="Date of last of Blood Donation" type="date" />
      </FormControl>



    </>
  );
}

export default BloodDonor;
