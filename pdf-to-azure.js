const { BlobServiceClient } = require("@azure/storage-blob");
require('dotenv').config();

async function main() {
  // Create Blob Service Client from Account connection string or SAS connection string
  // Account connection string example - `DefaultEndpointsProtocol=https;AccountName=myaccount;AccountKey=accountKey;EndpointSuffix=core.windows.net`
  // SAS connection string example - `BlobEndpoint=https://myaccount.blob.core.windows.net/;QueueEndpoint=https://myaccount.queue.core.windows.net/;FileEndpoint=https://myaccount.file.core.windows.net/;TableEndpoint=https://myaccount.table.core.windows.net/;SharedAccessSignature=sasString`
  const STORAGE_CONNECTION_STRING = process.env.STORAGE_CONNECTION_STRING || "";
  // Note - Account connection string can only be used in node.
  const blobServiceClient = BlobServiceClient.fromConnectionString(STORAGE_CONNECTION_STRING);
  const containerName = "snapshots-pdf-container";
  const containerClient = blobServiceClient.getContainerClient(containerName);
  const blobName = "snapshots-filestage.pdf"
  const blobOptions = { blobHTTPHeaders: { blobContentType: 'application/pdf' } };
  const filePath = "./snapshots-filestage.pdf";

  let i = 1;
  for await (const container of blobServiceClient.listContainers()) {
    console.log(`Container ${i++}: ${container.name}`);
  }

  const blockBlobClient = containerClient.getBlockBlobClient(blobName);
  await blockBlobClient.uploadFile(filePath, blobOptions);

}

main().catch((err) => {
  console.error("Error running sample:", err.message);
});