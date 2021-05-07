import {
  Center, Checkbox, FormControl,
  FormLabel,
  Image, Input,
  Select
} from "@chakra-ui/react";
import React, { useState } from "react";
import PlasmaDrop from '../../../../assets/plasmaDrop.svg';
import { citiesAndStates } from '../../../../utils/citiesAndState';



let bloodgroups = ['O-', 'O+', 'B-', 'B+', 'A-', 'A+', 'AB-', 'AB+']


export default function PlasmaDonor() {
  const [state, setState] = useState('')

  return (
    <>
      <Center>
        <Image src={PlasmaDrop}
          boxSize="100px"
          objectFit="cover"
        />
      </Center>

      <FormControl mt={4}>
        <FormLabel >Full Name</FormLabel>
        <Input variant='filled' placeholder="Name" />
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

      <FormControl mt={4} >
        <FormLabel >Mates Affiliation <small>(if any)</small></FormLabel>
        <Input variant='filled' placeholder="Mates Affiliation" />
      </FormControl>


      <FormControl mt={4} ml="2">
        <Checkbox colorScheme="blue" >
          I am eligible for plasma donation
        </Checkbox>
      </FormControl>
    </>
  )
}
