import { createContext, useState } from "react";
import {
  web3Accounts,
  web3Enable
} from '@polkadot/extension-dapp';

import {
  ApiProvider as GearApiProvider,
  AccountProvider,
} from '@gear-js/react-hooks';

import { GEAR_NODE } from "../config/constants";

function ApiProvider({ children }) {
  return <GearApiProvider initialArgs={{ endpoint: GEAR_NODE }}>{children}</GearApiProvider>;
}

const providers = [ApiProvider, AccountProvider];

function withProviders(Component) {
  return () => providers.reduceRight((children, Provider) => <Provider>{children}</Provider>, <Component />);
}

const GearjsContext = createContext(null);

const GearjsContextProvider = ({ children }) => {
  const [gearjs, setGearjs] = useState(null);
  const [polkaAddress, setPolkaAddress] = useState("");

  const handleConnect = () => {
    web3Enable('reclaim-gear')
      .then((injectedExtensions) => {
        if (!injectedExtensions.length) {
          return Promise.reject(new Error('NO_INJECTED_EXTENSIONS'));
        }

        return web3Accounts();
      })
      .then((accounts) => {
        if (!accounts.length) {
          return Promise.reject(new Error('NO_ACCOUNTS'));
        }
        setPolkaAddress(accounts[0].address);

      })

  };


  return (
    <GearjsContext.Provider
      value={{
        gearjs,
        setGearjs,
        polkaAddress,
        setPolkaAddress,
        handleConnect
      }}
    >
      {children}
    </GearjsContext.Provider>
  );
};

export { GearjsContext, GearjsContextProvider, withProviders };
