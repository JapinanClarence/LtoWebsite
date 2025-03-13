import { driverColumns } from '@/components/table/columns';
import TableComponent from '@/components/table/TableComponent';
import { Button } from '@/components/ui/button';
import React, { useState } from 'react'

const DriverPage = () => {
  const [driverData, setDriverData] = useState([]);
  return (
    <>
      <section className='text-3xl font-bold'>
         Drivers
      </section>
      <section>
        <TableComponent showAddButton={"Add Driver"} data={driverData} searchPlaceholder={"Search Driver..."} filters={["fullname", "licenseNo"]} tableColumn={driverColumns}/>
      </section>
    </>
  )
}

export default DriverPage
