import React, {useEffect, useState, useRef} from 'react'
import './App.css';
import {ethers} from 'ethers'
import k1 from './images/k1.png'

function App() {

  const [Accounts, setAccounts] = useState([])
  const [contract, setcontract] = useState()
  const [marketplace, setMarketplace] = useState()
  const [balance, setBalance] = useState()
  const [navState, setNavState] = useState('CreateNft')
  const [owner, setOwner] = useState()
  const [createNftRes, setCreateNftRes] = useState()
  const [msgSigner, setMsgSigner] = useState()
  const [signedMessage, setSignedMessage] = useState()
  const [totalSupply, setTotalSupply] = useState()

  const nftId = useRef()
  const royalty = useRef()
  const uri = useRef()
  const aprId = useRef()
  const listId = useRef()
  const listPrice = useRef()
  const listEpoch = useRef()
  const buyId = useRef()
  const buyPrice = useRef()
  const buyEpoch = useRef()
  const buySig = useRef()

  useEffect(() => {

    const nftabi = [
      {
        "inputs": [
          {
            "internalType": "string",
            "name": "_name",
            "type": "string"
          },
          {
            "internalType": "string",
            "name": "_symbol",
            "type": "string"
          }
        ],
        "stateMutability": "nonpayable",
        "type": "constructor"
      },
      {
        "anonymous": false,
        "inputs": [
          {
            "indexed": true,
            "internalType": "address",
            "name": "owner",
            "type": "address"
          },
          {
            "indexed": true,
            "internalType": "address",
            "name": "approved",
            "type": "address"
          },
          {
            "indexed": true,
            "internalType": "uint256",
            "name": "tokenId",
            "type": "uint256"
          }
        ],
        "name": "Approval",
        "type": "event"
      },
      {
        "anonymous": false,
        "inputs": [
          {
            "indexed": true,
            "internalType": "address",
            "name": "owner",
            "type": "address"
          },
          {
            "indexed": true,
            "internalType": "address",
            "name": "operator",
            "type": "address"
          },
          {
            "indexed": false,
            "internalType": "bool",
            "name": "approved",
            "type": "bool"
          }
        ],
        "name": "ApprovalForAll",
        "type": "event"
      },
      {
        "inputs": [
          {
            "internalType": "address",
            "name": "to",
            "type": "address"
          },
          {
            "internalType": "uint256",
            "name": "tokenId",
            "type": "uint256"
          }
        ],
        "name": "approve",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "uint256",
            "name": "tokenId",
            "type": "uint256"
          },
          {
            "internalType": "uint96",
            "name": "royaltyPercentage",
            "type": "uint96"
          }
        ],
        "name": "changeRoyaltyPercent",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "uint96",
            "name": "royaltyPercentage",
            "type": "uint96"
          },
          {
            "internalType": "string",
            "name": "uri",
            "type": "string"
          }
        ],
        "name": "createNFT",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "uint256",
            "name": "tokenId",
            "type": "uint256"
          }
        ],
        "name": "destroyNFT",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
      },
      {
        "anonymous": false,
        "inputs": [
          {
            "indexed": true,
            "internalType": "address",
            "name": "previousOwner",
            "type": "address"
          },
          {
            "indexed": true,
            "internalType": "address",
            "name": "newOwner",
            "type": "address"
          }
        ],
        "name": "OwnershipTransferred",
        "type": "event"
      },
      {
        "inputs": [],
        "name": "renounceOwnership",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "address",
            "name": "from",
            "type": "address"
          },
          {
            "internalType": "address",
            "name": "to",
            "type": "address"
          },
          {
            "internalType": "uint256",
            "name": "tokenId",
            "type": "uint256"
          }
        ],
        "name": "safeTransferFrom",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "address",
            "name": "from",
            "type": "address"
          },
          {
            "internalType": "address",
            "name": "to",
            "type": "address"
          },
          {
            "internalType": "uint256",
            "name": "tokenId",
            "type": "uint256"
          },
          {
            "internalType": "bytes",
            "name": "_data",
            "type": "bytes"
          }
        ],
        "name": "safeTransferFrom",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "address",
            "name": "operator",
            "type": "address"
          },
          {
            "internalType": "bool",
            "name": "approved",
            "type": "bool"
          }
        ],
        "name": "setApprovalForAll",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
      },
      {
        "anonymous": false,
        "inputs": [
          {
            "indexed": true,
            "internalType": "address",
            "name": "from",
            "type": "address"
          },
          {
            "indexed": true,
            "internalType": "address",
            "name": "to",
            "type": "address"
          },
          {
            "indexed": true,
            "internalType": "uint256",
            "name": "tokenId",
            "type": "uint256"
          }
        ],
        "name": "Transfer",
        "type": "event"
      },
      {
        "inputs": [
          {
            "internalType": "address",
            "name": "from",
            "type": "address"
          },
          {
            "internalType": "address",
            "name": "to",
            "type": "address"
          },
          {
            "internalType": "uint256",
            "name": "tokenId",
            "type": "uint256"
          }
        ],
        "name": "transferFrom",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "address",
            "name": "newOwner",
            "type": "address"
          }
        ],
        "name": "transferOwnership",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "address",
            "name": "owner",
            "type": "address"
          }
        ],
        "name": "balanceOf",
        "outputs": [
          {
            "internalType": "uint256",
            "name": "",
            "type": "uint256"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "uint256",
            "name": "tokenId",
            "type": "uint256"
          }
        ],
        "name": "getApproved",
        "outputs": [
          {
            "internalType": "address",
            "name": "",
            "type": "address"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "address",
            "name": "owner",
            "type": "address"
          },
          {
            "internalType": "address",
            "name": "operator",
            "type": "address"
          }
        ],
        "name": "isApprovedForAll",
        "outputs": [
          {
            "internalType": "bool",
            "name": "",
            "type": "bool"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [],
        "name": "name",
        "outputs": [
          {
            "internalType": "string",
            "name": "",
            "type": "string"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [],
        "name": "owner",
        "outputs": [
          {
            "internalType": "address",
            "name": "",
            "type": "address"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "uint256",
            "name": "tokenId",
            "type": "uint256"
          }
        ],
        "name": "ownerOf",
        "outputs": [
          {
            "internalType": "address",
            "name": "",
            "type": "address"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "uint256",
            "name": "_tokenId",
            "type": "uint256"
          },
          {
            "internalType": "uint256",
            "name": "_salePrice",
            "type": "uint256"
          }
        ],
        "name": "royaltyInfo",
        "outputs": [
          {
            "internalType": "address",
            "name": "",
            "type": "address"
          },
          {
            "internalType": "uint256",
            "name": "",
            "type": "uint256"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "bytes4",
            "name": "interfaceId",
            "type": "bytes4"
          }
        ],
        "name": "supportsInterface",
        "outputs": [
          {
            "internalType": "bool",
            "name": "",
            "type": "bool"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [],
        "name": "symbol",
        "outputs": [
          {
            "internalType": "string",
            "name": "",
            "type": "string"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "uint256",
            "name": "index",
            "type": "uint256"
          }
        ],
        "name": "tokenByIndex",
        "outputs": [
          {
            "internalType": "uint256",
            "name": "",
            "type": "uint256"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "address",
            "name": "owner",
            "type": "address"
          },
          {
            "internalType": "uint256",
            "name": "index",
            "type": "uint256"
          }
        ],
        "name": "tokenOfOwnerByIndex",
        "outputs": [
          {
            "internalType": "uint256",
            "name": "",
            "type": "uint256"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "uint256",
            "name": "_tokenId",
            "type": "uint256"
          }
        ],
        "name": "TokenroyaltyOwner",
        "outputs": [
          {
            "internalType": "address",
            "name": "",
            "type": "address"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "uint256",
            "name": "tokenId",
            "type": "uint256"
          }
        ],
        "name": "tokenURI",
        "outputs": [
          {
            "internalType": "string",
            "name": "",
            "type": "string"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [],
        "name": "totalSupply",
        "outputs": [
          {
            "internalType": "uint256",
            "name": "",
            "type": "uint256"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      }
    ]

    const marketabi = [
      {
        "inputs": [
          {
            "internalType": "address",
            "name": "_nftContract",
            "type": "address"
          },
          {
            "internalType": "uint256",
            "name": "_tokenId",
            "type": "uint256"
          },
          {
            "internalType": "uint256",
            "name": "_SellerPrice",
            "type": "uint256"
          },
          {
            "internalType": "uint256",
            "name": "_timeOfOrder",
            "type": "uint256"
          },
          {
            "internalType": "uint256",
            "name": "_auctionDuraton",
            "type": "uint256"
          },
          {
            "internalType": "bytes",
            "name": "_signature",
            "type": "bytes"
          }
        ],
        "name": "auctionEnd",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "address",
            "name": "_nftContract",
            "type": "address"
          },
          {
            "internalType": "uint256",
            "name": "_tokenId",
            "type": "uint256"
          },
          {
            "internalType": "uint256",
            "name": "_SellerPrice",
            "type": "uint256"
          },
          {
            "internalType": "uint256",
            "name": "_timeOfOrder",
            "type": "uint256"
          },
          {
            "internalType": "uint256",
            "name": "_auctionDuraton",
            "type": "uint256"
          },
          {
            "internalType": "uint256",
            "name": "_BuyerPrice",
            "type": "uint256"
          },
          {
            "internalType": "bytes",
            "name": "_signature",
            "type": "bytes"
          }
        ],
        "name": "buyAtAuctionPrice",
        "outputs": [],
        "stateMutability": "payable",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "address",
            "name": "_nftContract",
            "type": "address"
          },
          {
            "internalType": "uint256",
            "name": "_tokenId",
            "type": "uint256"
          },
          {
            "internalType": "uint256",
            "name": "_price",
            "type": "uint256"
          },
          {
            "internalType": "uint256",
            "name": "_timeOfOrder",
            "type": "uint256"
          },
          {
            "internalType": "bytes",
            "name": "_signature",
            "type": "bytes"
          }
        ],
        "name": "buyAtFixedPrice",
        "outputs": [],
        "stateMutability": "payable",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "address",
            "name": "_nftContract",
            "type": "address"
          },
          {
            "internalType": "uint256",
            "name": "_tokenId",
            "type": "uint256"
          },
          {
            "internalType": "uint256",
            "name": "_SellerPrice",
            "type": "uint256"
          },
          {
            "internalType": "uint256",
            "name": "_timeOfOrder",
            "type": "uint256"
          },
          {
            "internalType": "uint256",
            "name": "_auctionDuraton",
            "type": "uint256"
          },
          {
            "internalType": "bytes",
            "name": "_signature",
            "type": "bytes"
          }
        ],
        "name": "CancelAuctionPriceNFTtSell",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
      },
      {
        "inputs": [],
        "name": "renounceOwnership",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "address",
            "name": "NftcreateAddress",
            "type": "address"
          }
        ],
        "name": "setNftCreationContract",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "uint256",
            "name": "_platformfees",
            "type": "uint256"
          }
        ],
        "stateMutability": "nonpayable",
        "type": "constructor"
      },
      {
        "anonymous": false,
        "inputs": [
          {
            "indexed": true,
            "internalType": "address",
            "name": "previousOwner",
            "type": "address"
          },
          {
            "indexed": true,
            "internalType": "address",
            "name": "newOwner",
            "type": "address"
          }
        ],
        "name": "OwnershipTransferred",
        "type": "event"
      },
      {
        "anonymous": false,
        "inputs": [
          {
            "indexed": true,
            "internalType": "address",
            "name": "NFTcontract",
            "type": "address"
          },
          {
            "indexed": false,
            "internalType": "uint256",
            "name": "tokenId",
            "type": "uint256"
          },
          {
            "indexed": false,
            "internalType": "uint256",
            "name": "price",
            "type": "uint256"
          }
        ],
        "name": "sellDetails",
        "type": "event"
      },
      {
        "inputs": [
          {
            "internalType": "uint256",
            "name": "_feesPercentage",
            "type": "uint256"
          }
        ],
        "name": "SetMarketPlaceFeesPercentage",
        "outputs": [
          {
            "internalType": "uint256",
            "name": "NewFee",
            "type": "uint256"
          }
        ],
        "stateMutability": "nonpayable",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "address",
            "name": "newOwner",
            "type": "address"
          }
        ],
        "name": "transferOwnership",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "address",
            "name": "",
            "type": "address"
          },
          {
            "internalType": "uint256",
            "name": "",
            "type": "uint256"
          }
        ],
        "name": "bids",
        "outputs": [
          {
            "internalType": "address",
            "name": "buyer",
            "type": "address"
          },
          {
            "internalType": "uint256",
            "name": "endingPrice",
            "type": "uint256"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "address",
            "name": "_nftContract",
            "type": "address"
          },
          {
            "internalType": "uint256",
            "name": "_tokenId",
            "type": "uint256"
          }
        ],
        "name": "currentHighestPrice",
        "outputs": [
          {
            "internalType": "address",
            "name": "buyer",
            "type": "address"
          },
          {
            "internalType": "uint256",
            "name": "price",
            "type": "uint256"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "bytes32",
            "name": "_messageHash",
            "type": "bytes32"
          }
        ],
        "name": "getEthSignedMessageHash",
        "outputs": [
          {
            "internalType": "bytes32",
            "name": "",
            "type": "bytes32"
          }
        ],
        "stateMutability": "pure",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "address",
            "name": "_nftContract",
            "type": "address"
          },
          {
            "internalType": "uint256",
            "name": "_tokenId",
            "type": "uint256"
          },
          {
            "internalType": "uint256",
            "name": "_SellerPrice",
            "type": "uint256"
          },
          {
            "internalType": "uint256",
            "name": "_timeOfOrder",
            "type": "uint256"
          },
          {
            "internalType": "uint256",
            "name": "_auctionDuraton",
            "type": "uint256"
          }
        ],
        "name": "getMessageHashAuctionSell",
        "outputs": [
          {
            "internalType": "bytes32",
            "name": "",
            "type": "bytes32"
          }
        ],
        "stateMutability": "pure",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "address",
            "name": "_NFTcontract",
            "type": "address"
          },
          {
            "internalType": "uint256",
            "name": "_tokenId",
            "type": "uint256"
          },
          {
            "internalType": "uint256",
            "name": "_price",
            "type": "uint256"
          },
          {
            "internalType": "uint256",
            "name": "_timeOfCreation",
            "type": "uint256"
          }
        ],
        "name": "getMessageHashFixSell",
        "outputs": [
          {
            "internalType": "bytes32",
            "name": "",
            "type": "bytes32"
          }
        ],
        "stateMutability": "pure",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "address",
            "name": "",
            "type": "address"
          }
        ],
        "name": "NFTcreates",
        "outputs": [
          {
            "internalType": "bool",
            "name": "",
            "type": "bool"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [],
        "name": "owner",
        "outputs": [
          {
            "internalType": "address",
            "name": "",
            "type": "address"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "address",
            "name": "",
            "type": "address"
          }
        ],
        "name": "pendingReturns",
        "outputs": [
          {
            "internalType": "uint256",
            "name": "",
            "type": "uint256"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [],
        "name": "PlatformFees",
        "outputs": [
          {
            "internalType": "uint256",
            "name": "",
            "type": "uint256"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "address",
            "name": "NFTcreate",
            "type": "address"
          },
          {
            "internalType": "uint256",
            "name": "_tokenId",
            "type": "uint256"
          },
          {
            "internalType": "uint256",
            "name": "_price",
            "type": "uint256"
          }
        ],
        "name": "priceOfNft",
        "outputs": [
          {
            "internalType": "uint256",
            "name": "priceTobePaid",
            "type": "uint256"
          },
          {
            "internalType": "uint256",
            "name": "royaltyAmount",
            "type": "uint256"
          },
          {
            "internalType": "address",
            "name": "royaltyOwner",
            "type": "address"
          },
          {
            "internalType": "uint256",
            "name": "platformCharge",
            "type": "uint256"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "bytes32",
            "name": "_ethSignedMessageHash",
            "type": "bytes32"
          },
          {
            "internalType": "bytes",
            "name": "_signature",
            "type": "bytes"
          }
        ],
        "name": "recoverSigner",
        "outputs": [
          {
            "internalType": "address",
            "name": "",
            "type": "address"
          }
        ],
        "stateMutability": "pure",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "bytes",
            "name": "_sig",
            "type": "bytes"
          }
        ],
        "name": "splitSignature",
        "outputs": [
          {
            "internalType": "bytes32",
            "name": "r",
            "type": "bytes32"
          },
          {
            "internalType": "bytes32",
            "name": "s",
            "type": "bytes32"
          },
          {
            "internalType": "uint8",
            "name": "v",
            "type": "uint8"
          }
        ],
        "stateMutability": "pure",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "address",
            "name": "_signer",
            "type": "address"
          },
          {
            "internalType": "address",
            "name": "_nftContract",
            "type": "address"
          },
          {
            "internalType": "uint256",
            "name": "_tokenId",
            "type": "uint256"
          },
          {
            "internalType": "uint256",
            "name": "_SellerPrice",
            "type": "uint256"
          },
          {
            "internalType": "uint256",
            "name": "_timeOfOrder",
            "type": "uint256"
          },
          {
            "internalType": "uint256",
            "name": "_auctionDuraton",
            "type": "uint256"
          },
          {
            "internalType": "bytes",
            "name": "_signature",
            "type": "bytes"
          }
        ],
        "name": "verifyAuctionSell",
        "outputs": [
          {
            "internalType": "bool",
            "name": "",
            "type": "bool"
          }
        ],
        "stateMutability": "pure",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "address",
            "name": "_signer",
            "type": "address"
          },
          {
            "internalType": "address",
            "name": "_NFTcontract",
            "type": "address"
          },
          {
            "internalType": "uint256",
            "name": "_tokenId",
            "type": "uint256"
          },
          {
            "internalType": "uint256",
            "name": "_price",
            "type": "uint256"
          },
          {
            "internalType": "uint256",
            "name": "_timeOfCreation",
            "type": "uint256"
          },
          {
            "internalType": "bytes",
            "name": "_signature",
            "type": "bytes"
          }
        ],
        "name": "verifyFixSell",
        "outputs": [
          {
            "internalType": "bool",
            "name": "",
            "type": "bool"
          }
        ],
        "stateMutability": "pure",
        "type": "function"
      }
    ]

    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const nft = new ethers.Contract( "0xd603e62ca9f699e24c13202bf9e50bd704ef3d97",nftabi,signer);
    const market = new ethers.Contract("0x00f20fd78cf57051928b3e3b0ac0b5bbeb6b5977", marketabi, signer);
    nft.totalSupply().then(res=> {setTotalSupply(parseInt(res._hex, 16))}).catch(err=>console.log(err))
    setMsgSigner(signer)
    setcontract(nft)
    setMarketplace(market)
    provider.listAccounts().then(res => setAccounts(res)).catch(err => console.log(err))
  }, [])

  function balanceCheck(address){
    contract.balanceOf(address).then(res => setBalance(parseInt(res._hex, 16))).catch(err => console.log(err))
  }
  
  function OwnerOf(id){
    contract.ownerOf(id).then(res => setOwner(res)).catch(err => setOwner('Token Does Not Exsist'))
  }

  function CreateNft(royalty, uri){
    contract.createNFT(royalty, uri).then(res => setCreateNftRes(res)).catch(err => console.log(err))
  }

  function ApproveMarket(address, tokenId){
    contract.approve(address, tokenId).then(res=>console.log(res)).catch(err=>console.log(err))
  }

  function ListNft(address, tokenId, price, epoch){
    marketplace.getMessageHashFixSell(address, tokenId, price, epoch).then(res=>{
      msgSigner.signMessage(ethers.utils.arrayify(res)).then(res=>{console.log(setSignedMessage(res))}).catch(err=>console.log(err))
      console.log(res)
    }).catch(err=>console.log(err))
  }

  function buy(address, tokenId, price, time, sig){
    const options = {value: ethers.utils.parseEther("1.0")}
    marketplace.buyAtFixedPrice(address, tokenId, price, time, sig, options).then(res=>console.log(res)).catch(err=>console.log(err))
  }

  return (
    <div className="App">
      <div className='header' >
        <div className='heading' >NFT Marketplace</div>
        <div>{Accounts[0]}</div>
      </div>
      <div className='navbar' >
        <div className='navItems' onClick={() => { setNavState('CreateNft') }} >Create NFT</div>
        <div className='navItems' onClick={() => { setNavState('OwnerOf') }} >Owner Check</div>
        <div className='navItems' onClick={() => { setNavState('Approval') }} >Approval</div>
        <div className='navItems' onClick={() => { setNavState('Balance') }} >Balance</div>
        <div className='navItems' onClick={() => { setNavState('Market') }} >Market</div>
        <div className='navItems' onClick={() => { setNavState('Listing') }} >Listing</div>
      </div>
      {
        navState === 'Balance'
        ?
        (
          <div className='container'>
            <div style={{ color: '#61dafb', fontWeight: '500', fontSize: '20px' }} >{balance}-NFTs Owned</div>
            <button className='btn' onClick={() => {balanceCheck(Accounts[0])}} >Refresh</button>
          </div>
        )
        :
        null
      }
      {
        navState === 'OwnerOf'
        ?
        (
          <div className='container' >
            <input className='inputfield' ref={nftId} placeholder='Enter NFT Id' ></input>
            <button className='btn' onClick={() => {OwnerOf(nftId.current.value)}}>Check</button>
            <div style={{ color: '#61dafb', fontWeight: '500', fontSize: '20px' }} >{owner}</div>
          </div>
        )
        :
        null
      }
      {
        navState === 'CreateNft'
        ?
        (
          <div className='container'>
            <input className='inputfield' ref={royalty} placeholder='Enter Royalty 1%=100' ></input>
            <input className='inputfield' ref={uri} placeholder='Enter URI' ></input>
            <button className='btn' onClick={() => {CreateNft(royalty.current.value, uri.current.value)}}>Create</button>
            {
              createNftRes
              ?
              (
                <pre style={{overflow: 'auto scroll', margin: '0', height: '35%', width: '95%', border: '2px solid black'}}>
                  <code>{JSON.stringify(createNftRes, null, 2)}</code>
                </pre>
              )
              :
              null
            }
          </div>
        )
        :
        null
      }
      {
        navState === 'Approval'
        ?
        (
          <div className='container'>
            <input className='inputfield' ref={aprId} placeholder='Enter NFT TokenId' ></input>
            <button className='btn' onClick={() => {ApproveMarket("0x00f20fd78cf57051928b3e3b0ac0b5bbeb6b5977", aprId.current.value)}}>Approve</button>
          </div>
        )
        :
        null
      }
      {
        navState === 'Listing'
        ?
        (
          <div className='container'>
            <input className='inputfield' ref={listId} placeholder='Enter Token Id' ></input>
            <input className='inputfield' ref={listPrice} placeholder='Enter Price of NFT' ></input>
            <input className='inputfield' ref={listEpoch} placeholder='Enter Epoch' ></input>
            <button className='btn' onClick={() => {ListNft('0xd603e62ca9f699e24c13202bf9e50bd704ef3d97', listId.current.value, listPrice.current.value, listEpoch.current.value)}}>List</button>
            <div style={{ color: '#61dafb', fontWeight: '500', fontSize: '20px' }} >{signedMessage}</div>
          </div>
        )
        :
        null
      }
      {
        navState === 'Market'
        ?
        (
          // <div className='market-container'>
          //   <div className='card-container' >
          //     <img className='card-img' src={k1} alt='bird flew awey'></img>
          //     <div className='card-bottom'>
          //       <button className='buy-btn'>BUY</button>
          //       <div>0.1 ETH</div>
          //     </div>
          //   </div>
          // </div>
          <div className='container'>
            <input className='inputfield' ref={buyId} placeholder='Enter Token Id' ></input>
            <input className='inputfield' ref={buyPrice} placeholder='Enter Price' ></input>
            <input className='inputfield' ref={buyEpoch} placeholder='Enter Listing Epoch' ></input>
            <input className='inputfield' ref={buySig} placeholder='Enter Signature' ></input>
            <button className='btn' onClick={() => {buy('0xd603e62ca9f699e24c13202bf9e50bd704ef3d97', buyId.current.value, buyPrice.current.value, buyEpoch.current.value, buySig.current.value)}}>BUY</button>
          </div>
        )
        :
        null
      }
    </div>
  );
}

export default App;
