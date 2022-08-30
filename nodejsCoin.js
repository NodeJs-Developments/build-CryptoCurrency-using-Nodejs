//import that secure hash algorithm from the crypto-js package
const SHA256 = require("crypto-js/sha256");
const  Base64 = require('crypto-js/enc-base64');

//create a JavaScript class to represent a Block
class Block {
    //constructor(index, timestamp,data,previousHash){
    constructor(timestamp,data,previousHash){
        this.index = 0;
        this.timestamp = timestamp;
        this.data = data;
        this.previousHash = previousHash;
        this.hash = this.generateHash();
    }

    generateHash(){
        //console.log(Base64.stringify(SHA256(this.index + this.timestamp +this.previousHash + JSON.stringify((this.data)).toString())));
        return Base64.stringify(SHA256(this.index + this.timestamp +this.previousHash + JSON.stringify((this.data)).toString()));
    }
}

class Blockchain{

    constructor(){
        this.blockchain = [this.createGenesisBlock()];
    }

    createGenesisBlock(){
        return new Block("30/08/2022", "first block of the chain","0");
    }

    getTheLatestBlock(){
        return this.blockchain[this.blockchain.length - 1];
    }

    addNewBlock(newBlock){
            //console.log(this.validateChainIntegrity());
            newBlock.index = this.getTheLatestBlock().index + 1
            newBlock.previousHash = this.getTheLatestBlock().hash;
            newBlock.hash = newBlock.generateHash();
            if(this.isValidBlock(newBlock))
            {
                this.blockchain.push(newBlock);
            }
       
    }

    isValidBlock(newBlock){
        const prevBlock = this.getTheLatestBlock();
        if(newBlock.index > prevBlock.index && newBlock.previousHash === prevBlock.hash)
        {
            return true
        }
        return false
    }

    // testing the integrity of the chain
    validateChainIntegrity(){
            for(let i = 0; i<this.blockchain.length; i++){
                const currentBlock = this.blockchain[i];
                const previousBlock = this.blockchain[i-1];
                if(currentBlock.hash !== currentBlock.generateHash()){
                    return false;
                }
                if(currentBlock.previousHash !== previousBlock.hash){
                    return false;
                }
                return true;
            }
    }
}

let AnilCoin = new Blockchain()
console.log("mining AnilCoin in progress...");

console.log("Is BlockChain valid ? : ",AnilCoin.validateChainIntegrity());

// Add new Block
AnilCoin.addNewBlock(
                    new Block("30/08/2022",
                              { sender:"Anil Patidar",
                                recipient:"Ajay Dangi",
                                quantity:25
                            })
);

AnilCoin.addNewBlock(
    new Block("30/08/2022",
              { sender:"Jitu",
                recipient:"Anurag",
                quantity:50
            })
);

AnilCoin.addNewBlock(
    new Block("30/08/2022",
              { sender:"Ram",
                recipient:"Gaurav",
                quantity:10
            })
);



console.log(JSON.stringify(AnilCoin, null, 5))

//AnilCoin.addNewBlock(
//    new Block(1,"30/08/2022",
//              { sender:"Ram",
//                recipient:"Gaurav",
//                quantity:10
//            })
//);
