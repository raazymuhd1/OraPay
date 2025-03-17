import React from 'react'
import Image, { StaticImageData } from "next/image"
import { CustomButton } from "@/components"

interface IProps {
  id: number;
  title: string;
  desc: string;
  price: string;
  tag: string;
  productImg: StaticImageData
}

const ProductCard = ({ id, title, desc, price, tag, productImg }: IProps) => {

  return (
     <div className="flex flex-col gap-[15px] rounded-[15px]">
        <Image src={productImg} alt={title} className="w-full h-[40%] object-cover" />

        <div className="h-[50%] flex flex-col gap-[10px] w-full p-[20px]">

           <div className="flex items-center w-full justify-between
           ">
              <h2> { title } </h2>
              <p> { price } </p>
           </div>

           <p> {desc} </p>
           <p> {tag} </p>
        </div>
     </div>
  )
}

export default ProductCard;
