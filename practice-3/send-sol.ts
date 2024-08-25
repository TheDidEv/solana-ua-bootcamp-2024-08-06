require("dotenv").config({ path: __dirname + './../.env' });
import {
  Keypair,
  LAMPORTS_PER_SOL,
  PublicKey,
  SystemProgram,
  Transaction,
  clusterApiUrl,
  Connection,
  sendAndConfirmTransaction,
  TransactionInstruction
} from "@solana/web3.js";

let privateKey = "privateKey";
if (privateKey === undefined) {
  console.log("Add SECRET_KEY to .env!");
  process.exit(1);
}
const asArray = Uint8Array.from(JSON.parse(privateKey));
const sender = Keypair.fromSecretKey(asArray);

const connection = new Connection(clusterApiUrl("devnet"));

console.log(`Our public key is: ${sender.publicKey.toBase58()}`);


const recipient = new PublicKey("Fk3fj9x6EkYZp7ebTsdTHGJGyR7xTSbFWb7EtA8ezs9y");
console.log(`Attempting to send 0.01 SOL to ${recipient.toBase58()}...`);

const transaction = new Transaction();

const sendSolInstruction = SystemProgram.transfer({
  fromPubkey: sender.publicKey,
  toPubkey: recipient,
  lamports: 0.01 * LAMPORTS_PER_SOL,
});
transaction.add(sendSolInstruction);

const signature = await sendAndConfirmTransaction(connection, transaction, [
  sender,
]);

console.log(`Transaction confirmed, signature: ${signature}!`);


const memoProgram = new PublicKey(
    "MemoSq4gqABAXKb96qnH8TysNcWxMyWCqXgDLGmfcHr"
  );
  
  const memoText = "Hello my name is Yevhenii!";
  
  const addMemoInstruction = new TransactionInstruction({
    keys: [{ pubkey: sender.publicKey, isSigner: true, isWritable: true }],
    data: Buffer.from(memoText, "utf-8"),
    programId: memoProgram,
  });
  
  transaction.add(addMemoInstruction);
  
  console.log(`memo is: ${memoText}`);
  