import { useState, Dispatch, SetStateAction } from 'react'
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import { marketplaceDatas } from '@/constants'
import ProductCard from "./ProductCard"

const MarketTabs = () => {
    const [marketDatas, setMarketDatas] = useState(marketplaceDatas)

    console.log(marketDatas['all-items']())

  return (
    <Tabs defaultValue='all-items' className="w-full">
        <TabsList className="flex items-center gap-[10px] bg-brown">
           <TabsTrigger value="all-items" className="cursor-pointer"> All Items </TabsTrigger>
           <TabsTrigger value="subscriptions" className="cursor-pointer"> Subscriptions </TabsTrigger>
           <TabsTrigger value="products" className="cursor-pointer"> Products </TabsTrigger>
           <TabsTrigger value="courses" className="cursor-pointer"> Courses </TabsTrigger>
        </TabsList>

        <TabsContent value="all-items" className="tabs-content">
           { marketDatas['all-items']().map(({ id, title, desc, price, tag, productImg }, idx) => (
              <ProductCard 
                key={idx}
                {
                  ...{ id, title, desc, price, tag, productImg }
                }
                />
           )) }
        </TabsContent>
        <TabsContent value="subscriptions" className='tabs-content'>
             { marketDatas.subs.map(({ id, title, desc, price, tag, productImg }, idx) => (
                <ProductCard
                  key={idx}
                  {
                  ...{ id, title, desc, price, tag, productImg }
                }
                />
             )) }
        </TabsContent>
        <TabsContent value="products" className='tabs-content'>
             { marketDatas.products.map(({ id, title, desc, price, tag, productImg }, idx) => (
                <ProductCard
                  key={idx}
                  {
                  ...{ id, title, desc, price, tag, productImg }
                }
                />
             )) }
        </TabsContent>
        <TabsContent value="courses" className='tabs-content'>
             { marketDatas.courses.map(({ id, title, desc, price, tag, productImg }, idx) => (
                <ProductCard
                  key={idx}
                  {
                  ...{ id, title, desc, price, tag, productImg }
                }
                />
             )) }
        </TabsContent>
    </Tabs>
  )
}

export default MarketTabs