import { Command as DbCommand } from '@prisma/client';

export type UserCommand = {
    bot: false;
    message_id: number;
    inTime: boolean;
    command: DbCommand;
};
