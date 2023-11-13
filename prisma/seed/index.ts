import { prisma } from "./client";

// ** Json Files
import * as TaskJson from "./json/task.json";

async function main() {
    const transactions = await prisma.$transaction(async (tx) => {
        const task = await tx.task.createMany({
            data: TaskJson,
        })
        return {
            task
        };
    });
    for (let i = 0; i < Object.keys(transactions).length; i++) {
        const key = Object.keys(transactions)[i];
        console.log(`[${String(i+1).padStart(2, "0")}] Seeded ${key} with ${transactions[key].count} rows`);
    }
}

main().catch((e) => {
    console.log(e);
    process.exit(1);
});