import React from 'react'
import { transactionsRecordHeaders } from "@/constants"
import { usePeyPeyContext } from '../PeyPeyContext'
import { X } from 'lucide-react'

interface ITxs<T> {
  id: number;
  action: T;
  date: Date;
  value: T;
}
interface ITxsRecord<T> {
   transactions: ITxs<T>[];
}

const TransactionsRecord = ({transactions}: ITxsRecord<string>) => {
      const { showTxsRecord, setShowTxsRecord } = usePeyPeyContext()

  return (
    <section className={`${showTxsRecord ? "w-full opacity-[1] h-full absolute top-0 left-0" : "opacity-[0] h-0 w-0"} glass-card transition-all duration-500 overflow-y-auto`}>
        <div className="w-full flex justify-end p-[20px]">
          <X className='w-[30px] cursor-pointer' onClick={() => setShowTxsRecord(false)} />
        </div>

        {/* header */}
        <header className="flex w-full items-center p-[20px] justify-between border-b-[1px]">
            { transactionsRecordHeaders.map(txRecHeader => (
               <h3 
                className="font-bold"  
                key={txRecHeader.id}> { txRecHeader.title } </h3>
            )) }
        </header>
        
        {/* transactions list */}
        <article className="flex flex-col gap-[10px] p-[20px]">
                { transactions.map(tx => (
                <aside 
                  key={tx.id}
                  className="flex items-center w-full justify-between">
                    <h3>  { tx.action } </h3>
                    <p>  { tx.date.toString().slice(0, 16) } </p>
                    <h4 className='font-bold'>  { tx.value } </h4>
                </aside>
                  )) }
        </article>
    </section>
  )
}

export default TransactionsRecord