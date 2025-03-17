import { useState } from 'react'
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import { marketplaceDatas } from '@/constants'

const MarketTabs = () => {
    const [marketDatas, setMarketDatas] = useState(marketplaceDatas)

  return (
    <Tabs defaultValue='all-items'>
        <TabsList className="flex items-center gap-[10px]">
           <TabsTrigger value="all-items"> All Items </TabsTrigger>
           <TabsTrigger value="subscriptions"> Subscriptions </TabsTrigger>
           <TabsTrigger value="products"> Products </TabsTrigger>
           <TabsTrigger value="courses"> Courses </TabsTrigger>
        </TabsList>
        <TabsContent value="all-items">

        </TabsContent>
    </Tabs>
  )
}

export default MarketTabs