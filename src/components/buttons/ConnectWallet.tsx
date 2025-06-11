import { ConnectButton } from '@rainbow-me/rainbowkit';
import { CustomButton } from "@/components" 
import { LuWallet } from "react-icons/lu";

const CustomConnectBtn = () => {

  return (
    <ConnectButton.Custom>
      {({
        account,
        chain,
        openAccountModal,
        openChainModal,
        openConnectModal,
        mounted,
      }) => {
     
        const connected = mounted && account && chain
         
        return (
          <div
            {...(!mounted && {
              'aria-hidden': true,
              'style': {
                opacity: 0,
                pointerEvents: 'none',
                userSelect: 'none',
              },
            })}
          >
            {(() => {
              const btnStyles = `text-textWhite font-semibold text-[.8vmax] bg-secondaryAlt py-[8px] px-[10px] rounded-[8px]`

              if (!connected) {
                return (
                  <CustomButton
                    onClick={openConnectModal}
                    disabled={false}
                    style={`bg-gradient min-w-[fit-content]`}
                    >
                    <LuWallet size={20}/>
                    { connected ? `${account.address?.slice(0, 5)}...${account.address?.slice(35, account.address?.length-1)}` : "Connect Wallet"}
                </CustomButton>
                );
              }
              if (chain.unsupported) {
                return (
                  <CustomButton 
                    style={`bg-gradient min-w-[fit-content]`}
                    onClick={openChainModal}
                    disabled={false}
                    >
                    Wrong network
                  </CustomButton>
                );
              }

              return (
                <div className="flex gap-[12px]">
                  <CustomButton
                    style={`bg-gradient min-w-[fit-content]`}
                    onClick={openChainModal}
                    disabled={false}
                  >
                    {chain.hasIcon && (
                      <div
                        className={`bg-[${chain.iconBackground}] w-[12px] h-[12px] rounded-[50%] overflow-hidden mr-[4px]`}
                      >
                        {chain.iconUrl && (
                          <img
                            alt={chain.name ?? 'Chain icon'}
                            src={chain.iconUrl}
                            className="w-[25px] h-[25px] object-cover"
                          />
                        )}
                      </div>
                    )}
                    {chain.name}
                  </CustomButton>

                  <CustomButton 
                    style={`bg-gradient min-w-[fit-content]`}
                    onClick={openAccountModal}
                    disabled={false}>
                    {account.displayName}
                    {account.displayBalance
                      ? ` (${account.displayBalance})`
                      : ''}
                  </CustomButton>
                </div>
              );
            })()}
          </div>
        );
      }}

    </ConnectButton.Custom>
  );
};

export default CustomConnectBtn;