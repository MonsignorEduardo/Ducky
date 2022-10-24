import { Command as DbCommand } from '../../../../libs/prisma/prisma-client';

export type UserCommand = {
    bot: false;
    message_id: number;
    inTime: boolean;
    command: DbCommand;
};
