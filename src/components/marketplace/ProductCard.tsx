import { useState, Dispatch, SetStateAction } from 'react'
import Image, { StaticImageData } from "next/image"
import { CustomButton } from "@/components"
import { ShoppingBag, Tag } from 'lucide-react'
import { usePeyPeyContext } from "@/components/PeyPeyContext"
interface IProps {
  id: number;
  title: string;
  desc: string;
  price: string;
  tag: string;
  productImg: StaticImageData
}

const ProductCard = ({ id, title, desc, price, tag, productImg  }: IProps) => {
  const { setOpenPayModal, setSelectedProduct } = usePeyPeyContext()

  return (
     <div 
        className="flex flex-col gap-[15px] rounded-[15px] w-[300px] h-[400px] border-[1px] border-[#202021] overflow-hidden cursor-pointer">
        <Image src={productImg} alt={title} className="w-full h-[40%] object-cover hover:scale-[1.1] transition-all duration-500" />

        <div className="flex flex-col h-[50%] justify-between p-[10px]">

            <div className="h-[50%] flex flex-col gap-[10px] w-full">
              <div className="flex items-center w-full justify-between
              ">
                  <h2 className="font-bold resp-headerCard w-[70%]"> { title } </h2>
                  <p className="text-[#11afb8] resp-headerCard font-bold text-[1.9vmax] lg:text-[1.2vmax]"> ${ price } </p>
              </div>

              <p className="resp-paraphCard text-[#7f7f80]"> {desc} </p>
              <p className="flex items-center text-[#7f7f80] text-[clamp(10px,1vw,14px)] font-semibold">  <Tag className="w-[10px]" /> {tag} </p>
            </div>

              {/* action button */}
              <CustomButton
                onClick={() => {
                    setOpenPayModal(true)
                    setSelectedProduct({
                      id, title, desc, price, tag
                      })
                  }}
                disabled={false}
                style={`bg-gradient responsive-btnText`}
                      >
                <ShoppingBag className="w-[15px]" />
                Buy Now
            </CustomButton>

        </div>



     </div>
  )
}

export default ProductCard;
