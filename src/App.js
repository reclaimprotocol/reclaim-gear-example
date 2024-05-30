import "./App.css";
import { Reclaim } from "@reclaimprotocol/js-sdk";
import { useState } from "react";
import QRCode from "react-qr-code";
import VerifyProof from "./VerifyProof";
import ConnectButton from "./ConnectButton";
import { withProviders } from "./gearJs/GearjsContext";

function App() {
  const [url, setUrl] = useState("");
  const [ready, setReady] = useState(true);
  const [proof, setProof] = useState({
    "identifier": "0x9ec8f9f52623234433ce5ea0cc0f5aac0dfbeef553e68d2d403633bd9192e365",
    "claimData": {
      "provider": "http",
      "parameters": "{\"body\":\"\",\"geoLocation\":\"in\",\"method\":\"GET\",\"paramValues\":{\"CLAIM_DATA\":\"76561199614512180\"},\"responseMatches\":[{\"type\":\"contains\",\"value\":\"_steamid\\\">Steam ID: {{CLAIM_DATA}}</div>\"}],\"responseRedactions\":[{\"jsonPath\":\"\",\"regex\":\"_steamid\\\">Steam ID: (.*)</div>\",\"xPath\":\"id(\\\"responsive_page_template_content\\\")/div[@class=\\\"page_header_ctn\\\"]/div[@class=\\\"page_content\\\"]/div[@class=\\\"youraccount_steamid\\\"]\"}],\"url\":\"https://store.steampowered.com/account/\"}",
      "owner": "0xa1b6e6ffb85df5bdf78e6558d3224ab87f7cc4c7",
      "timestampS": 1717053708,
      "context": "{\"contextAddress\":\"user's address\",\"contextMessage\":\"for acmecorp.com on 1st january\",\"extractedParameters\":{\"CLAIM_DATA\":\"76561199614512180\"},\"providerHash\":\"0x5f5312e27124dc7605f70a7d884e169049679b93f91c137b4d18a8569d825900\"}",
      "identifier": "0x9ec8f9f52623234433ce5ea0cc0f5aac0dfbeef553e68d2d403633bd9192e365",
      "epoch": 1
    },
    "signatures": [
      "0xcbad077154cc5c8e494576d4336f57972f7412058c1a637e05832c6bdabd018f4da18ad973f29553921d7d030370032addac1159146b77ec6cc5dab4133ffec01c"
    ],
    "witnesses": [
      {
        "id": "0x244897572368eadf65bfbc5aec98d8e5443a9072",
        "url": "https://reclaim-node.questbook.app"
      }
    ]
  });

  const reclaimClient = new Reclaim.ProofRequest("0x3ea68eA270b74442818C534B3071359136571Bb1"); //TODO: replace with your applicationId

  async function generateVerificationRequest() {
    const providerId = "1bba104c-f7e3-4b58-8b42-f8c0346cdeab"; //TODO: replace with your provider ids you had selected while creating the application

    reclaimClient.addContext(
      `user's address`,
      "for acmecorp.com on 1st january"
    );

    await reclaimClient.buildProofRequest(providerId);

    reclaimClient.setSignature(
      await reclaimClient.generateSignature(
        "0x190177013620ff7952630e1fcff4cdd8d51fb159f42557836fd5fd1548649575" //TODO : replace with your APP_SECRET
      )
    );

    const { requestUrl, statusUrl } =
      await reclaimClient.createVerificationRequest();

    setUrl(requestUrl);

    await reclaimClient.startSession({
      onSuccessCallback: (proofs) => {
        console.log("Verification success", proofs);
        setReady(true);
        setProof(proofs[0]);
        // Your business logic here
      },
      onFailureCallback: (error) => {
        console.error("Verification failed", error);
        // Your business logic here to handle the error
      },
    });
  }

  return (
    <div className="App">
      <ConnectButton />
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          height: "50vh",
        }}
      >
        {!url && (
          <button onClick={generateVerificationRequest}>
            Create Claim QrCode
          </button>
        )}
        {url && <QRCode value={url} />}
      </div>
      {ready && <VerifyProof proof={proof}></VerifyProof>}
    </div>
  );
}

export default withProviders(App);