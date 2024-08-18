import "dotenv/config";
import { getExplorerLink } from "@solana-developers/helpers";
import {
  Connection,
  Keypair,
  PublicKey,
  clusterApiUrl,
} from "@solana/web3.js";
import { getOrCreateAssociatedTokenAccount } from "@solana/spl-token";

let privateKey = "[12,248,82,98,70,64,247,249,102,120,150,8,66,251,201,73,194,230,75,14,108,62,238,242,169,83,213,88,211,44,215,236,189,141,170,234,53,21,86,43,145,87,4,52,53,206,205,225,213,186,224,226,106,191,55,78,99,127,166,152,120,10,189,159]";
if (privateKey === undefined) {
  console.log("Add SECRET_KEY to .env!");
  process.exit(1);
}
const asArray = Uint8Array.from(JSON.parse(privateKey));
const sender = Keypair.fromSecretKey(asArray);

const connection = new Connection(clusterApiUrl("devnet"));

console.log(
  `🔑 Our pubic key is: ${sender.publicKey.toBase58()}`
);

const tokenMintAccount = new PublicKey(
    "Address that create-token-mint.tx created for you"
  );
  const recipient = new PublicKey("CHOOSE A RECIPIENT");
  
  const tokenAccount = await getOrCreateAssociatedTokenAccount(
    connection,
    sender,
    tokenMintAccount,
    recipient
  );
  
  console.log(`Token Account: ${tokenAccount.address.toBase58()}`);
  
  const link = getExplorerLink(
    "address",
    tokenAccount.address.toBase58(),
    "devnet"
  );
  
  console.log(`✅ Created token account: ${link}`);
  