import { prisma } from '@ducky/db';

class DbService {
    async findCommand(msg: string) {
        const storedCommands = await this.getStoredCommands();
        return storedCommands.find((command) => {
            return msg.includes(command.matches.toLowerCase());
        });
    }

    private async getStoredCommands() {
        return await prisma.command.findMany();
    }
}
const dbService = new DbService();
export { dbService };
