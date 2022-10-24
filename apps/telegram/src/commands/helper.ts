import { Command } from '@ducky/prisma/prisma-client';

import { logger } from '../Logger';

export const inTime = (comando: Command): boolean => {
    const tActual = new Date();
    const mTms = 60000;
    logger.info(`inTime | Tactual  ${(tActual.getTime() - comando.lastCall.getTime()) / mTms}`);

    if (tActual.getTime() - comando.lastCall.getTime() >= comando.timer * mTms) {
        comando.lastCall = tActual;
        logger.info(`inTime | Ultima  ${comando.lastCall.getTime() / mTms}`);

        return true;
    }
    return false;
};
