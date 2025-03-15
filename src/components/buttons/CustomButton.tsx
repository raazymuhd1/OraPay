import { ReactNode } from 'react'

interface IProps {
    children: ReactNode,
    onClick?: () => void,
    disabled?: boolean,
    style?: string,
}

const CustomButton = ({ children, onClick, disabled, style }: IProps) => {
  return (
    <button 
        onClick={onClick}
        className={`flex items-center justify-center gap-[10px] text-white font-semibold rounded-[10px] py-[6px] px-[10px] ${style} `}>
        { children }
    </button>
  )
}

export default CustomButton