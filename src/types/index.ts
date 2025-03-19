import { Dispatch, SetStateAction } from "react"

export interface IModalState {
  openDepositModal: boolean,
  setDepositModal: Dispatch<SetStateAction<boolean>>
  openCalculatorModal: boolean,
  setCalculatorModal: Dispatch<SetStateAction<boolean>>;
  openPayModal: boolean;
  setOpenPayModal: Dispatch<SetStateAction<boolean>>;
}
