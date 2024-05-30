import { useState, useEffect } from "react";
import { Reclaim } from "@reclaimprotocol/js-sdk";
import { gearFunctions } from "./gearJs/GearjsFunctions";
import { useAccount } from "@gear-js/react-hooks/";
import { useSendReclaimMessage } from "./gearJs/hooks";

export default function VerifyProof(props) {
  const [proof, setProof] = useState({});
  const [verified, setVerified] = useState(false);

  const { verifyProof } = gearFunctions();

  const { isAccountReady, account } = useAccount();
  console.log(account);

  const sendMessage = useSendReclaimMessage();

  useEffect(() => {
    
    const newProof = Reclaim.transformForOnchain(props.proof);
    console.log(newProof);
    setProof(newProof);
  }, []);

  return (
    <div>
      <button
        className="button"
        onClick={async () => {
          try {
            // await verifyProof(proof);
            //     payload: {
            //         VerifyProof: proof
            //     },
            const payload = {
              VerifyProof: proof,
            };

            sendMessage(payload, {
              onSuccess: () => {
                setVerified(true);
              },
            });
          } catch (e) {
            console.error(e);
          } finally {
            setVerified(true);
          }
        }}
      >
        Verify Proof
      </button>
      {verified && <p> Proof verified </p>}
      <style jsx="true">{`
        .container {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
        }
        .button {
          border: solid 1px #ccc;
          margin: 0 0 20px;
          border-radius: 3px;
        }
      `}</style>
    </div>
  );
}
