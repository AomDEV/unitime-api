import { prisma } from "./client";

// ** Json Files
import * as TaskJson from "./json/task.json";
import * as TaskInputJson from "./json/task_input.json";

async function main() {
    const transactions = await prisma.$transaction(async (tx) => {
        const tasks = await tx.task.createMany({
            data: TaskJson.map(task => ({
                ...task,
                input: TaskInputJson,
            })),
        })
        return {
            tasks
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