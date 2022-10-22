import { Command } from '@prisma/client';

export const inTime = (comando: Command): boolean => {
    const tActual = new Date();
    const mTms = 60000;
    console.log(
        'Tactual  ' + (tActual.getTime() - comando.lastCall.getTime()) / mTms
    );

    if (
        tActual.getTime() - comando.lastCall.getTime() >=
        comando.timer * mTms
    ) {
        comando.lastCall = tActual;
        console.log('ultima  ' + comando.lastCall.getTime() / mTms);

        return true;
    }
    return false;
};
