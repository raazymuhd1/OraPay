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
  const { setOpenPayModal } = usePeyPeyContext()

  return (
     <div className="flex flex-col gap-[15px] rounded-[15px] w-[300px] h-[400px] border-[1px] border-[#202021] overflow-hidden cursor-pointer">
        <Image src={productImg} alt={title} className="w-full h-[40%] object-cover hover:scale-[1.1] transition-all duration-500" />

        <div className="flex flex-col h-[50%] justify-between p-[10px]">

            <div className="h-[50%] flex flex-col gap-[10px] w-full">
              <div className="flex items-center w-full justify-between
              ">
                  <h2 className="font-bold text-[.9vmax] w-[70%]"> { title } </h2>
                  <p className="text-[#11afb8] font-bold text-[.9vmax]"> ${ price } </p>
              </div>

              <p className="text-[.8vmax] text-[#7f7f80]"> {desc} </p>
              <p className="flex items-center text-[#7f7f80] text-[.6vmax] font-semibold">  <Tag className="w-[10px]" /> {tag} </p>
            </div>

              {/* action button */}
              <CustomButton
                onClick={() => setOpenPayModal(true)}
                disabled={false}
                style={`bg-gradient`}
                      >
                <ShoppingBag className="" />
                Buy Now
            </CustomButton>

        </div>



     </div>
  )
}

export default ProductCard;
