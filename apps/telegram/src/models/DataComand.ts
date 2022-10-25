import { Command } from '@ducky/db';

export type UserCommand = {
    bot: false;
    message_id: number;
    inTime: boolean;
    command: Command;
};
