import { Box } from '@chakra-ui/layout'
import { Table, Tbody, Td, Tr } from '@chakra-ui/table'
import { Tooltip } from '@chakra-ui/tooltip'
import React from 'react'

function DataCard({ donor }) {

  const phoneNumber = donor.phone_number

  const showPhoneNumber = () => {
    const mobileWindow = window.open("", "Phone Number",
      "top=100,left=100,width=600,height=400"
    )
    mobileWindow.document.write(`
      <p style="
        margin: 5rem auto;
        font-size: 3rem;
        font-weight: 900;
        text-align: center; "
      > Phone Number : <br/><br/>
        ${phoneNumber}
      </p>
    `)
  }

  return (
    <Tooltip label="Click to reveal Phone Number">
      <Box borderRadius="md" flex="1"
        borderWidth='2px'
        onClick={showPhoneNumber}
      >
        <Table variant="striped" size="sm">
          <Tbody>
            <Tr>
              <Td>Name</Td>
              <Td><b>{donor?.name || "-"}</b></Td>
            </Tr>
            <Tr>
              <Td>Blood Group</Td>
              <Td><b>{donor?.blood_group || "-"}</b></Td>
            </Tr>
            <Tr>
              <Td>State</Td>
              <Td><b>{donor?.state || "-"}</b></Td>
            </Tr>
            <Tr>
              <Td>City</Td>
              <Td><b>{donor?.city || "-"}</b></Td>
            </Tr>
            <Tr>
              <Td>PinCode</Td>
              <Td><b>{donor?.pin_code || "-"}</b></Td>
            </Tr>
            {/* <Tr>
            <Td>Last Donation:</Td>
            <Td><b>{donor?.last_blood_donation_date || "-"}</b></Td>
          </Tr> */}
            {/* <Tr>
            <Td>Phone No:</Td>
            <Td><b>{donor?.phone_number || "-"}</b></Td>
          </Tr> */}
          </Tbody>
        </Table>
      </Box>
    </Tooltip>

  )
}

export default DataCard
