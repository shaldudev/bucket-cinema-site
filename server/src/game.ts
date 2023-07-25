import { PrismaClient, Prisma } from "@prisma/client";

//create server class that handles all the game logic
export default class Game {

    maxProgressTimeInSeconds = 600;
    currentProgressTimeInSeconds = 0;

    prisma = new PrismaClient();

    constructor() {
        this.startProgressTime();
    }

    getCurrentTime() {
        return this.currentProgressTimeInSeconds;
    }

    getMaxTime() {
        return this.maxProgressTimeInSeconds;
    }

    //progressloop
    startProgressTime() {
        setInterval(() => {
            this.currentProgressTimeInSeconds++;
            if (this.currentProgressTimeInSeconds >= this.maxProgressTimeInSeconds) {
                this.currentProgressTimeInSeconds = 0;
                this.givePlayerIncomeCredits();
            }
            //log every 10 seconds
            if (this.currentProgressTimeInSeconds % 60 == 0) {
                console.log(this.currentProgressTimeInSeconds);
            }
        }, 1000);
    }

    async givePlayerIncomeCredits() {
        try {
            // Step 1: Retrieve all users along with their passiveIncome
            const usersWithPassiveIncome = await this.prisma.user.findMany({
                include: {
                    currency: true,
                },
            });

            // Step 2: Calculate the total credits for each user by adding their passiveIncome
            const updates = usersWithPassiveIncome.map((user) => this.prisma.user.update({
                where: { id: user.id },
                data: {
                    currency: {
                        update: {
                            credits: (user.currency?.credits ?? 0) + (user.currency?.passiveIncome ?? 0),
                        },
                    },
                },
            }));

            await this.prisma.$transaction(updates);

            console.log('Credits updated successfully!');
        } catch (error) {

        }
    }
}