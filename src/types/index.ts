import { Dispatch, SetStateAction } from "react"

interface IProduct {
    id: number;
    title: string;
    desc: string;
    price: string;
    tag: string;
}

export interface IModalState {
  openDepositModal: boolean,
  setDepositModal: Dispatch<SetStateAction<boolean>>
  openCalculatorModal: boolean,
  setCalculatorModal: Dispatch<SetStateAction<boolean>>;
  openPayModal: boolean;
  setOpenPayModal: Dispatch<SetStateAction<boolean>>;
  selectedProduct: IProduct;
  setSelectedProduct: Dispatch<SetStateAction<IProduct>>;
}
