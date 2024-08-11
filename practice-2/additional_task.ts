import { Keypair, PublicKey } from "@solana/web3.js";

console.log("Start task");

const prefix = "anza".toLowerCase();

const startTime = Date.now();
let iterations = 0;
let keypair: Keypair;

while (true) {
    keypair = Keypair.generate();
    const publicKey = new PublicKey(keypair.publicKey.toBase58());
    const publicKeyStr = publicKey.toBase58().toLowerCase();
    iterations++;

    if (publicKeyStr.includes(prefix)) {
        const endTime = Date.now();

        console.log(`Keypair: ${publicKey}`);
        console.log(`iterations: ${iterations}`);
        console.log(`time: ${endTime - startTime}`);
        console.log(`End task`);
        break;
    }
}

