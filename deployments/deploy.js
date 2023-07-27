async function main() {
  const SimpleStorage = await ethers.getContractFactory("SimpleStorage");

  // Start deployment, returning a promise that resolves to a contract object
  const simplestorage = await SimpleStorage.deploy();
  console.log("SimpleStorage Contract deployed to address:", simplestorage.address);

}

main()
 .then(() => process.exit(0))
 .catch(error => {
   console.error(error);
   process.exit(1);
 });