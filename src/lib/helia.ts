
/**
 * Mock implementation of IPFS/Helia functionality
 * This is a simplified version that doesn't require actual IPFS dependencies
 */

// Function to simulate adding a file to IPFS
export async function addFileToIPFS(content: string): Promise<string> {
  console.log("Mock: Adding file to IPFS", content.substring(0, 20) + "...");
  
  // Generate a fake CID
  const fakeCid = `Qm${Math.random().toString(36).substring(2, 15)}${Math.random().toString(36).substring(2, 15)}`;
  
  return Promise.resolve(fakeCid);
}

// Function to simulate getting a file from IPFS
export async function getFileFromIPFS(cid: string): Promise<string> {
  console.log("Mock: Getting file from IPFS with CID:", cid);
  
  // Return mock data
  return Promise.resolve("This is mock IPFS content retrieved with CID: " + cid);
}

export default {
  addFileToIPFS,
  getFileFromIPFS
};
