import { useContext } from "react";
import { GearjsContext } from "./GearjsContext";
import { GearApi, ProgramMetadata, GearKeyring } from "@gear-js/api";
import raw from './meta.txt';

const programId = "0x383951634434f94d4bf23ab1d7825bff90fe6a00ec2c3f389e7b8d771b053af8"

const gearFunctions = () => {


  const verifyProof = async (proof) => {
    const gearApi = await GearApi.create({
      providerAddress: 'wss://testnet.vara.network',
    });

    let metadata = '0x'
    let meta
    fetch(raw)
      .then(r => r.text())
      .then(text => {
        metadata += text
        console.log(metadata)
        meta = ProgramMetadata.from(metadata)
        console.log(meta)

        const message = {
          destination: programId,
          payload: {
            VerifyProof: proof
          },
          gasLimit: 750_000_000_000,
        };

      });

  };

  return {
    verifyProof,
  };
};

export { gearFunctions };