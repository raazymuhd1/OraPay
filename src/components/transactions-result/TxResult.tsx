import { Dispatch, SetStateAction } from 'react'
import { CustomButton } from "@/components"
import { checkMark } from '@/assets'
import Image from "next/image"

type IProps = {
    title: string;
    msg: string;
    showTxResult: boolean;
    setShowTxResult: Dispatch<SetStateAction<boolean>>;
    closeTxResult: Dispatch<SetStateAction<boolean>>;
}

const TxResult = ({ title, msg, showTxResult, setShowTxResult, closeTxResult }: IProps) => {

  return (
    // <div className={`w-full h-screen fixed top-0 glass-modal`}>
        <article className={`${showTxResult ? "w-full opacity-[1] translate-x-[0px] absolute top-[60px] left-0 h-[60%] grid grid-cols-1 grid-rows-[repeat(2,minmax(50px,150px))]" : "opacity-[0] translate-x-[-100px]"} gap-[10px] p-[20px]  rounded-[10px] transition-all items-center duration-500 glass-card z-[9]`}>
            <div className="flex w-full flex-col items-center gap-[10px]">
                <Image src={checkMark} alt="check" className="object-cover w-[50px] h-[50px]" />
                <h2 className="font-bold">{title} </h2>
                <p className="font-medium"> {msg} </p>
            </div>

              <CustomButton
                onClick={() => {
                    setShowTxResult(false)
                    closeTxResult(false)
                }} 
                disabled={false}
                style={`bg-gradient h-[fit-content]`}
                    >
                  Done
            </CustomButton>
        </article>  
    // </div>
  )
}

export default TxResult