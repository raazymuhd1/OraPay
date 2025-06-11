import { Dispatch, SetStateAction } from "react"

interface IProduct {
    id: number;
    title: string;
    desc: string;
    price: string;
    tag: string;
}

type Network = {
    chainId: number;
    userAddr: `0x${string}`
}

export interface IModalState {
  holdingsResult: string;
  userDeposits: BigInt[];
  holdingLoading: boolean;
  userDepositLoading: boolean;
  userDepositStatus: string;
  holdingStatus: string;
  openDepositModal: boolean,
  setDepositModal: Dispatch<SetStateAction<boolean>>
  openCalculatorModal: boolean,
  setCalculatorModal: Dispatch<SetStateAction<boolean>>;
  openPayModal: boolean;
  setOpenPayModal: Dispatch<SetStateAction<boolean>>;
  openWithdrawModal: boolean;
  setOpenWithdrawModal: Dispatch<SetStateAction<boolean>>;
  selectedProduct: IProduct;
  setSelectedProduct: Dispatch<SetStateAction<IProduct>>;
  setTokenToAmount:  Dispatch<SetStateAction<number>>;
  tokenToAmount: number;
  showTxResult: boolean;
  setShowTxResult:  Dispatch<SetStateAction<boolean>>;
  showTxsRecord: boolean;
  setShowTxsRecord: Dispatch<SetStateAction<boolean>>;
  showLoadingState: boolean;
  setShowLoadingState: Dispatch<SetStateAction<boolean>>;
  network: Network;
}

export interface ITxsRecord<T> {
   id: number;
   action: T;
   date: Date;
   value: T;
}

export interface IState {
   from?: {
     name?: string;
     address: string;
     amount: number;
   },
   to?: {
     name?: string;
     address: string;
     amount: number;
   }
}