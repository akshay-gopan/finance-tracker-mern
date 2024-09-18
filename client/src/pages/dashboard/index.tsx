import React, { useMemo } from 'react'
import { useUser } from '@clerk/clerk-react'
import FinancialRecordForm from './financial-record-form';
import FinancialRecordList from './financial-record-list';
import { useFinancialRecords } from '../../context/financial-record-context';
import Navbar from '../../components/navbar';

function Dashboard() {
    const { user } = useUser();
    const { records } = useFinancialRecords();

    const totalMonthly  = useMemo( () => {
        let totalAmount = 0;
        records.forEach((record) => {
            totalAmount += record.amount
    })
    return totalAmount;
}, [records]);

  return (
    <>
        <div>
            <div>
               
                <Navbar />
                <FinancialRecordForm />
            </div>
            <div className='pl-4 mt-2 text-2xl font-semibold'>Total Monthly: {totalMonthly}</div>
            <div>
                <FinancialRecordList />
            </div>
        </div>
    </>
  )
}

export default Dashboard