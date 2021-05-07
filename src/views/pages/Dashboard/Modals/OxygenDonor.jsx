import {
  Center, FormControl,
  FormLabel,
  Image, Input,
  ListItem,
  Select
} from "@chakra-ui/react";
import React, { useState } from "react";
import Oxygen from '../../../../assets/oxygen.svg';
import { citiesAndStates } from '../../../../utils/citiesAndState';



export default function OxygenDonor() {
  const [state, setState] = useState('')

  return (

    <>
      <Center>
        <Image src={Oxygen}
          boxSize="100px"
          objectFit="cover"
        />
      </Center>
      <FormControl mt={4}>
        <FormLabel >What do you want to donate</FormLabel>
        <Select variant='filled' placeholder="Type">
          <option value="cylinder">Cylinder</option>
          <option value="refill">Refill</option>
          <option value="concentrator">Concentrator</option>
        </Select>
      </FormControl>

      <FormControl mt={4}>
        <FormLabel >Name</FormLabel>
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
        <Input variant='filled' placeholder="Pin-Code" />
      </FormControl>
      <FormControl mt={4}>
        <FormLabel >Phone Number</FormLabel>
        <Input variant='filled' placeholder="Phone Number" />
      </FormControl>
      <FormControl mt={4} >
        <FormLabel >Mates Affiliation <small>(if any)</small></FormLabel>
        <Input variant='filled' placeholder="Mates Affiliation" />
      </FormControl>
      <FormControl mt={4}>
        <FormLabel >Quantity of Product</FormLabel>
        <Input variant='filled' placeholder="Quantity of Product" />
      </FormControl>
    </>
  )
}
