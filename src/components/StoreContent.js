import { Web3Storage } from "web3.storage";
const web3storage_key = process.env.REACT_APP_WEB3STORAGE_TOKEN;
function GetAccessToken() {
  return web3storage_key;
}

function MakeStorageClient() {
  return new Web3Storage({ token: GetAccessToken() });
}

export const StoreContent = async (files) => {
  console.log("Uploading files to IPFS with web3.storage....");
  const client = MakeStorageClient();
  const cid = await client.put([files]);
  return cid;
};