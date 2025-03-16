import React from 'react'
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import YieldOverview from './YieldOverview'

const YieldInfos = () => {
  return (
    <aside className="w-[80%] mx-auto rounded-[10px] p-[30px] border-[1px] border-[#7f7f80]">
       
       <Tabs defaultValue='overview w-[fit-content]'>
          <TabsList className="grid w-[20%] grid-cols-[repeat(3,minmax(100px,1fr))]">
             <TabsTrigger value="overview" className="cursor-pointer"> Overview </TabsTrigger>
             <TabsTrigger value="expected-returns" className="cursor-pointer"> Expected Returns </TabsTrigger>
             <TabsTrigger value="expiry" className="cursor-pointer"> Expiry Dates </TabsTrigger>
          </TabsList>
          <TabsContent value="overview">
              <YieldOverview />
          </TabsContent>
          <TabsContent value="expected-returns">
             <h2> Expected Returns </h2>
          </TabsContent>
          <TabsContent value="expiry">
            <h2> Expiry </h2>
          </TabsContent>
       </Tabs>

    </aside>
  )
}

export default YieldInfos