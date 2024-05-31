
import { useSendMessage } from '@gear-js/react-hooks';

import { METADATA, CONTRACT } from '../config/constants';


function useSendReclaimMessage() {
    return useSendMessage(CONTRACT, METADATA)
}

export { useSendReclaimMessage }

