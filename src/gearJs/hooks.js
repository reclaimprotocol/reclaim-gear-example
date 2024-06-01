
import { useSendMessage } from '@gear-js/react-hooks';
import { ProgramMetadata } from '@gear-js/api';

import { METADATA, CONTRACT } from '../config/constants';


function useSendReclaimMessage() {
    const metadata = ProgramMetadata.from(METADATA)
    return useSendMessage(CONTRACT, metadata)
}

export { useSendReclaimMessage }

