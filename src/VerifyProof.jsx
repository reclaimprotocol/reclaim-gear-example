import { useState, useEffect } from "react";
import { Reclaim } from "@reclaimprotocol/js-sdk";
import { useAccount } from "@gear-js/react-hooks/";
import { useSendReclaimMessage } from "./gearJs/hooks";

export default function VerifyProof(props) {
  const [proof, setProof] = useState({});
  const [verified, setVerified] = useState(false);

  const { account, accounts, login } = useAccount();

  const loginFunc = async () => {
    if (accounts){
    await login(accounts[0])
    console.log(account)
    console.log(account.decodedAddress)
    }
  }

  loginFunc().then(() => {})

  const sendMessage = useSendReclaimMessage();

  useEffect(() => {
    
    const newProof = Reclaim.transformForOnchain(props.proof);

    newProof.signedClaim.signatures[0] = newProof.signedClaim.signatures[0].replace("0x","");
    newProof.signedClaim.claim.owner = newProof.signedClaim.claim.owner.replace("0x","");
    newProof.signedClaim.claim.identifier = newProof.signedClaim.claim.identifier.replace("0x","");
    
    setProof(newProof);
  }, []);

  return ( 
    account &&
    <div>
      <button
        className="button"
        onClick={async () => {
          try {
            
            const payload = {
              VerifyProof: proof,
            };

            sendMessage(payload, {
              onSuccess: () => {
                setVerified(true);
              },
              onError: () => {
                setVerified(false)
              }
            });
          } catch (e) {
            console.error(e);
          } finally {
            setVerified(false);
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
