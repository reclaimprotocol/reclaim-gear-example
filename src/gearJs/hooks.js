import raw from './meta.txt';
import { GearApi, ProgramMetadata, GearKeyring } from "@gear-js/api";
import { useSendMessage } from '@gear-js/react-hooks';

const programId = "0x383951634434f94d4bf23ab1d7825bff90fe6a00ec2c3f389e7b8d771b053af8"

function useSendReclaimMessage() {
    let metadata = '0x'
    let meta
    fetch(raw)
        .then(r => r.text())
        .then(text => {
            metadata += text
            console.log(metadata)
            meta = ProgramMetadata.from(metadata)
            console.log(meta)

            // const message = {
            //     destination: programId,
            //     payload: {
            //         VerifyProof: proof
            //     },
            //     gasLimit: 750_000_000_000,
            // };

            // let extrinsic = gearApi.message.send(message, meta, meta.types.handle.input);

            // extrinsic.signAndSend(keyring).then((event) => {
            //     console.log(event.toHuman());
            // });
        });

    return useSendMessage(programId, meta)
}

export { useSendReclaimMessage }

