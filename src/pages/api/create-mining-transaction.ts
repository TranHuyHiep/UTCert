import type { NextApiRequest, NextApiResponse } from "next";
import {
  AppWallet,
  ForgeScript,
  Transaction,
  KoiosProvider,
  largestFirst,
} from "@meshsdk/core";
import type { Mint } from "@meshsdk/core";
import {
  assetsMetadata,
  bankWalletAddress,
  costLovelace,
} from "../../config/mint";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const recipientAddress = req.body.recipientAddress;
  const utxos = req.body.utxos;

  const blockchainProvider = new KoiosProvider("preview");

  const appWallet = req.body.wallet;
  const appWalletAddress = bankWalletAddress;
  const forgingScript = ForgeScript.withOneSignature(appWalletAddress);

  /**
   * TODO: Here you want to select one of your NFT that has not been minted
   */

  const assetIdPrefix = "demo NFT";
  // In this starter template, we simply randomly pick one from.
  // let selectedAssetId = Math.floor(Math.random() * 10).toString();
  let selectedAssetId = 0;
  const assetMetadata = assetsMetadata[selectedAssetId];
  const assetName = `${assetIdPrefix}${selectedAssetId}`;

  const asset: Mint = {
    assetName: assetName,
    assetQuantity: "1",
    metadata: assetMetadata,
    label: "721",
    recipient: {
      address: recipientAddress,
    },
  };

  const selectedUtxos = largestFirst(costLovelace, utxos, true);

  const tx = new Transaction({ initiator: appWallet });
  tx.setTxInputs(selectedUtxos);
  tx.mintAsset(forgingScript, asset);
  tx.setChangeAddress(bankWalletAddress);

  const unsignedTx = await tx.build();

  const originalMetadata = Transaction.readMetadata(unsignedTx);

  /**
   * TODO: Here you want to save the `originalMetadata` in a database with the `assetName`
   */

  const maskedTx = Transaction.maskMetadata(unsignedTx);

  // In this starter template, we send `originalMetadata` to the frontend.
  // Not recommended, its better to save the `originalMetadata` in a database.
  res.status(200).json({ assetName, maskedTx, originalMetadata, appWallet });
}
