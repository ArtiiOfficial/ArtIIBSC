import DETH_ABI from '../ABI/DETH.json';
// let EnvName = 'local';
// let EnvName = 'production';
let EnvName = 'demo';

console.log('EnvName : api : ', EnvName);
let BNBPROVIDER="";
let Front_URL = '';
let Back_URL = '';
let v1Url = '';
let limit = '3';
let limitMax = '3000';
let decimalvalues = 1000000000000000000;
var fee = 0;
let toFixed = 5;
// let IPFS_IMG = "https://ipfs.infura.io/ipfs"
let IPFS_IMG =  "https://ipfs.io/ipfs";
let toasterOption = {
    position: "top-right",
    autoClose: 1000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: false,
    draggable: true,
    progress: undefined,
}

var swapFee = 0
var provider = null;
var currAddress = "";
var Accounts = "";

const singleType = 721;
const multipleType = 1155;
let PurchaseTransferType = 'currency';
let networkVersion = '56';
let currencySymbol = 'BNB';
let tokenSymbol = 'WBNB';
const adminAddress = "0x15ef25d309ba26f84771eb2de7043b1194b02bcf";
var tokenAddr = {
    WBNB: '0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c'      //live
    // WBNB: "0xcF54Db463e718241220b16C51a3a8CdabF9b5384"
}
var tokenABI = {
    WBNB: DETH_ABI,
}
const singleContract = "0x23Dc15bFbbEF62a0e10D6e74FD38126a024D6e4E";
const multipleContract = "0x3F5393D8f435b14733ea676d5127CE8Ae8655C04";
const exchangeAddress = "0xb45C318F00ac28b815E9CB91903Fe02CD836cFdC";

const single = "0x44F93237d73e66aCbDe6670b94503505362AEabe";
const multiple = "0xEb4E27b88dddFcCf10070A6310245b9e4dD7dFa2";

// var single = "0x55A561AbE39707E4Ac831d61D2dC231B1CF6B7a5";
// var multiple = "0xB4409Ef41437F984Bf63e78bC1CFd3a093b1769d";

if (EnvName === "production") {
    Front_URL = 'http://52.20.125.70';
    Back_URL = 'http://54.87.227.212:2053';
    v1Url = 'http://54.87.227.212:2053/v1';
}
else if (EnvName === "demo") {
    Front_URL = 'https://artii.org';
    Back_URL = 'https://api.artii.org';
    v1Url = 'https://api.artii.org/v1';
    var bscscan = 'https://bscscan.com/address/';
}
else {
    Front_URL = 'http://localhost:3000';
    Back_URL = 'http://localhost:4003';
    v1Url = 'http://localhost:4003/v1';
    var bscscan = 'https://testnet.bscscan.com/address/';
}

let key = {
    Front_URL: Front_URL,
    Back_URL: Back_URL,
    v1Url:v1Url,
    vUrl:v1Url,
    fee:fee,
    decimalvalues:decimalvalues,
    toFixed:toFixed,
    networkVersion: networkVersion,
    currencySymbol: currencySymbol,
    tokenSymbol: tokenSymbol,
    toasterOption: toasterOption,
    limit: limit,
    limitMax: limitMax,
    exchangeAddress: exchangeAddress,
    singleContract: singleContract,
    multipleContract: multipleContract,
    adminAddress : adminAddress,
    tokenAddr: tokenAddr,
    IPFS_IMG: IPFS_IMG,
    singleType: singleType,
    multipleType: multipleType,
    tokenABI:tokenABI,
    multiple: multiple,
    single: single,
    bscscan : bscscan,
    provider:provider,
    currAddress:currAddress,
    Accounts:Accounts,
    swapFee:swapFee,
    PurchaseTransferType : PurchaseTransferType
};

export default key;