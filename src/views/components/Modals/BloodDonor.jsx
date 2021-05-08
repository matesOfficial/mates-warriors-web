import { Center, Checkbox, FormControl, FormLabel, Image, Input, Select } from "@chakra-ui/react";
import React, { useState } from "react";

import BloodDrop from '../../../assets/bloodDrop.svg';
import { citiesAndStates, bloodgroups } from '../../../utils/citiesAndState';


export default function BloodDonor({ formControl }) {

  const { register, formState: { errors }, watch } = formControl;

  const stateLoc = watch('state');

  return (
    <>
      <Center>
        <Image src={BloodDrop}
          boxSize="100px"
          objectFit="cover"
        />
      </Center>
      <FormControl mt={4} isRequired >
        <FormLabel >Full Name</FormLabel>
        <Input variant='filled' placeholder="Name"
          isInvalid={!!errors?.name}
          {...register("name", { required: true, maxLength: 80 })}
        />
      </FormControl>
      <FormControl mt={4} isRequired >
        <FormLabel >Phone Number</FormLabel>
        <Input variant='filled' placeholder="Phone Number"
          isReadOnly={true}
          {...register("phone_number", {
            required: true,
            minLength: 9,
            maxLength: 16,
          })}
        />
      </FormControl>
      <FormControl mt={4} isRequired >
        <FormLabel >State</FormLabel>
        <Select variant='filled' placeholder="Select your state"
          isInvalid={!!errors?.state}
          {...register("state", { required: true })}
        >
          {Object.keys(citiesAndStates).map(stateName => {
            return (
              <option value={stateName}>{stateName}</option>
            )
          })}
        </Select>
      </FormControl>
      <FormControl mt={4} isRequired>
        <FormLabel >City</FormLabel>
        <Select variant='filled' placeholder="Select your city"
          isInvalid={!!errors?.city}
          {...register("city", { required: true })}
        >
          {citiesAndStates[stateLoc]?.map(city => {
            return (
              <option value={city}>{city}</option>
            )
          })}
        </Select>
      </FormControl>
      <FormControl mt={4} isRequired >
        <FormLabel >Pin Code</FormLabel>
        <Input variant='filled' placeholder="Pin Code"
          isInvalid={!!errors?.pin_code}
          {...register("pin_code", { required: true, maxLength: 10 })}
        />
      </FormControl>

      <FormControl mt={4} isRequired >
        <FormLabel >BloodGroup</FormLabel>
        <Select variant='filled' placeholder="Select BloodGroup"
          isInvalid={!!errors?.blood_group}
          {...register("blood_group", { required: true })}
        >
          {bloodgroups.map(item => {
            return (
              <option value={item}>{item}</option>
            )
          })}
        </Select>
      </FormControl>
      <FormControl mt={4} >
        <FormLabel >Mates Affiliation <small>(if any)</small></FormLabel>
        <Input variant='filled' placeholder="Mates Affiliation"
          isInvalid={!!errors?.mates_affiliation}
          {...register("mates_affiliation")}
        />
      </FormControl>
      <FormControl mt={4} isRequired >
        <FormLabel >Date of last of Blood Donation</FormLabel>
        <Input variant='filled' placeholder="Date of last of Blood Donation" type="date"
          isInvalid={!!errors?.last_blood_donation_date}
          {...register("last_blood_donation_date", { required: true })}
        />
      </FormControl>
      <FormControl mt={4} ml="2" isRequired >
        <Checkbox colorScheme="blue"
          isInvalid={!!errors?.is_blood_donor}
          {...register("is_blood_donor", { required: true })}
        >
          I am eligible for blood donation
        </Checkbox>
      </FormControl>
    </>
  )
}
