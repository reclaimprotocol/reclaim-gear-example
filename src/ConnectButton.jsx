import { useContext } from "react";
import { GearjsContext } from "./gearJs/GearjsContext";

export default function ConnectButton() {
  const { polkaAddress, handleConnect } =
    useContext(GearjsContext);

  return (
    <div>
      <div>
        <button className="button" onClick={handleConnect}>
          Connect Polkadot.js
        </button>
      </div>
      <h2>
        {polkaAddress
          ? polkaAddress.slice(0, 4) + "...." + polkaAddress.slice(-4)
          : "Please connect wallet"}
      </h2>
    </div>
  );
}
