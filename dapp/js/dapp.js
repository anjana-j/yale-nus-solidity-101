window.addEventListener('load', async () => {
    // Modern dapp browsers...
    if (window.ethereum) {
        window.web3 = new Web3(ethereum);
        try {
            // Request account access if needed
            await ethereum.enable();
            
            // Acccounts now exposed
            const accounts = await web3.eth.getAccounts();
            web3.eth.defaultAccount = accounts[0];
  
  
            // Click Event
            $('#store').click((e) => {
              
              // prevent default
              e.preventDefault();
              
              // info related to execution
              async function Exec() {
  
                // constance
                const GAS_LIMIT      = 5000000;
                const GAS_PRICE      = 5000000000; //5 Gwei
                const GAS_PRICE_GWEI = "8";
  
                const TX_ID          = '';
                const CONTRACT_OWNER = '';
  
                /* ABI */
                const ABI = '';
  
                /* get contract info via Transaction ID */
                const tx_receipt = await web3.eth.getTransactionReceipt(TX_ID);
  
                /* fetch contract address */
                let contractAddress = tx_receipt.contractAddress;
  
                /* load contract from ABI */
                let contract = new web3.eth.Contract(ABI, contractAddress);
  
                let formNumber = $('#uintField').val();
  
                  /* initiate datastore */
                  contract.methods.set(
                      formNumber
                  ).send({
                      from : web3.eth.defaultAccount,
                      gas: web3.utils.toHex(GAS_LIMIT),
                      gasPrice: web3.utils.toHex(web3.utils.toWei(GAS_PRICE_GWEI, 'gwei'))
  
                  }).on('transactionHash', function(transactionHash){
                      console.log('tx hash : '+transactionHash);
                      $("#transaction-info").find("#hash").text(transactionHash);
                      
  
  
  
                  }).on('confirmation', function(conf){  
                      console.log('confirmation : '+conf);
  
                  }).on('receipt', function(receipt){  
  
                      console.log(receipt);
                      // $("#transaction-info").find("#nonce").text(transactionInfo.nonce);
                      // $("#transaction-info").find("#block-hash").text(transactionInfo.blockHash);
                      // $("#transaction-info").find("#block-number").text(transactionInfo.blockNumber);
                      // $("#transaction-info").find("#gas-usage").text(transactionInfo.gas);
                      // $("#transaction-info").find("#transaction-index").text(transactionInfo.transactionIndex);
  
                  }).on('error', function(error){  
                      console.log('errors : '+error);
  
                  }); 
                
              }
          
              let run = async ()=>{
                Exec();
              }
          
              run();
  
            });
  
        } catch (error) {
            // User denied account access...
        }
    }
    // Legacy dapp browsers...
    else if (window.web3) {
        window.web3 = new Web3(web3.currentProvider);
        // Acccounts always exposed
        web3.eth.sendTransaction({/* ... */});
    }
    // Non-dapp browsers...
    else {
        console.log('Non-Ethereum browser detected. You should consider trying MetaMask!');
    }
  });
  