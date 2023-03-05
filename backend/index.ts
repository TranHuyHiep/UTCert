import type { BrowserWallet, UTxO, Wallet } from "@meshsdk/core";
import axios from "axios";

const instance = axios.create({
  baseURL: `/api/`,
  withCredentials: true,
});

export async function post(route: string, body = {}) {
  return await instance
    .post(`${route}`, body)
    .then(({ data }) => {
      return data;
    })
    .catch((error) => {
      throw error;
    });
}

export async function createTransaction(
  recipientAddress: string,
  utxos: UTxO[],
  wallet: BrowserWallet,
) {
  return await post(`create-mining-transaction`, { recipientAddress, utxos, wallet });
}

export async function signTransaction(
  assetName: string,
  signedTx: string,
  originalMetadata: string,
  wallet: BrowserWallet,
) {
  return await post(`sign-transaction`, {
    assetName,
    signedTx,
    originalMetadata,
    wallet
  });
}
