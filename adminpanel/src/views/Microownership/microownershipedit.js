import React, { useState, useEffect } from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import CustomInput from "components/CustomInput/CustomInput.js";
import Button from "components/CustomButtons/Button.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardAvatar from "components/Card/CardAvatar.js";
import CardBody from "components/Card/CardBody.js";
import CardFooter from "components/Card/CardFooter.js";
import { useHistory, useParams } from "react-router-dom";
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import {CKEditor} from 'ckeditor4-react';
//import avatar from "assets/img/faces/marc.jpg";
import isEmpty from '../../lib/isEmpty';
import config from '../../lib/config';
import abi from '../../ABI/ABI.json';
import bep20abi from '../../ABI/bep20';
import "@metamask/legacy-web3"
import Web3 from 'web3';
import SINGLE from 'ABI/single.json';
import MULTIPLE from 'ABI/multiple.json';
import  ReactHTMLParser  from "react-html-parser";
import {  getfaq,updatefaq,getmicroData,updateMicro } from '../../actions/users';

const styles = {
cardCategoryWhite: {
	color: "rgba(255,255,255,.62)",
	margin: "0",
	fontSize: "14px",
	marginTop: "0",
	marginBottom: "0"
},
cardTitleWhite: {
	color: "#FFFFFF",
	marginTop: "0px",
	minHeight: "auto",
	fontWeight: "300",
	fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
	marginBottom: "3px",
	textDecoration: "none"
}
};

// toaster config
toast.configure();
let toasterOption = {
position: "top-right",
autoClose: 2000,
hideProgressBar: false,
closeOnClick: true,
pauseOnHover: true,
draggable: true,
progress: undefined,
}


const initialFormValue = {
'question': "",
'answer': "",

}

const useStyles = makeStyles(styles);

export default function Microownership(props) {
	const classes = useStyles();
	const history = useHistory();
	const dispatch = useDispatch();
	const [userdet, setUser] = useState();
	const [formValue, setFormValue] = useState(initialFormValue);
	const [validateError, setValidateError] = useState({});
	const { faqId } = useParams();
	console.log('faqId>>>>',faqId)
	// //console.lo(userId,"asdfdsfdsfdsf");
	const [price, setPrice] = useState("");
	const [question, setQuestion] = useState("");
	const [answer, setanswer] = useState("");
	const [currentMicro, setCurrentMicro] = useState("");
	const [slot, setSlot] = useState("");
	const [restrictSlot, setRestrictSlot] = useState("");
	const [availableSlot , setAvailableSlot] = useState('');
	const [accounts, setaccounts] = React.useState('');

// function
const onChange = (e) => {
	if (e.target.id === 'slot')  {
		setSlot(e.target.value)
		setAvailableSlot(e.target.value)
	}
	if (e.target.id === 'price')
		setPrice(e.target.value)
	if (e.target.id === 'restrictslot')
		setRestrictSlot(e.target.value)
	// console.log("question",question)
}
const onEditorChange = (evt) => {
	var description_text = evt.editor.getData() 
	console.log("setanswer",description_text)
	setanswer(description_text);
}

const getconnect=async()=> {
    
    if (window.ethereum) {
      var web3 = new Web3(window.ethereum);
    //   setweb3s(web3)
      try {
        if (typeof web3 !== 'undefined') {
         await window.ethereum.enable()
          .then(async()=> {
            const web3 = new Web3(window.web3.currentProvider)
            if (window.web3.currentProvider.isMetaMask === true) {
              var addrs = window.web3.eth.defaultAccount;
              var currAddr = (addrs).toLowerCase()
              var accVal = await web3.eth.getAccounts();
              var setacc = accVal[0];
              setaccounts(setacc);
            }
            // else if (window.web3.currentProvider.isMetaMask === false) {
            // //   setCreateItemDis(false)
            // //   setIsLoading(false)
            // }
            // else {
            // //   setCreateItemDis(false)
            // //   setIsLoading(false)
            // }
          })
           .catch((e) => {
             toast.warning("Please Add Metamask External 1", toasterOption)
			 console.log('error 1', e);
            //  document.getElementById('close10').click();
            //  setCreateItemDis(false)
            //  setIsLoading(false)
           })
        } else {
          toast.warning("Please Add Metamask External 2", toasterOption)
			//   setCreateItemDis(false)
			//   setIsLoading(false)
        }
      }
      catch (err) {
        toast.warning("Please Add Metamask External 3", toasterOption)
        // setCreateItemDis(false)
        // setIsLoading(false)
      }
    } else {
      toast.warning("Please Add Metamask External 4", toasterOption)
		//   setCreateItemDis(false)
		//   setIsLoading(false)
	}
  } 

const handleFormSubmit = async (e) => {
	e.preventDefault();
	var name = currentMicro.name;
	var symbol = currentMicro.name;
	var tokenCount = currentMicro.tokenCount;
	console.log('currentMicro>>>', name, symbol, 0, slot, config.singleAddress.toString());
	var web3 = new Web3(window.ethereum);
    const CoursetroContract = new web3.eth.Contract(SINGLE, config.singleAddress.toString());
    var adminAddress = await CoursetroContract.methods.owner().call();
	adminAddress = adminAddress.toLocaleLowerCase();
	console.log("test",adminAddress)
	
	var ByteCode = "60806040523480156200001157600080fd5b506040516200229038038062002290833981810160405260a08110156200003757600080fd5b81019080805160405193929190846401000000008211156200005857600080fd5b838201915060208201858111156200006f57600080fd5b82518660018202830111640100000000821117156200008d57600080fd5b8083526020830192505050908051906020019080838360005b83811015620000c3578082015181840152602081019050620000a6565b50505050905090810190601f168015620000f15780820380516001836020036101000a031916815260200191505b50604052602001805160405193929190846401000000008211156200011557600080fd5b838201915060208201858111156200012c57600080fd5b82518660018202830111640100000000821117156200014a57600080fd5b8083526020830192505050908051906020019080838360005b838110156200018057808201518184015260208101905062000163565b50505050905090810190601f168015620001ae5780820380516001836020036101000a031916815260200191505b5060405260200180519060200190929190805190602001909291908051906020019092919050505080806000806101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055508073ffffffffffffffffffffffffffffffffffffffff16600073ffffffffffffffffffffffffffffffffffffffff167f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e060405160405180910390a35084600690805190602001906200028b9291906200037e565b508360059080519060200190620002a49291906200037e565b5082600460006101000a81548160ff021916908360ff16021790555081600160008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002081905550816003819055508073ffffffffffffffffffffffffffffffffffffffff16600073ffffffffffffffffffffffffffffffffffffffff167fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef6003546040518082815260200191505060405180910390a350505050506200042d565b828054600181600116156101000203166002900490600052602060002090601f016020900481019282601f10620003c157805160ff1916838001178555620003f2565b82800160010185558215620003f2579182015b82811115620003f1578251825591602001919060010190620003d4565b5b50905062000401919062000405565b5090565b6200042a91905b80821115620004265760008160009055506001016200040c565b5090565b90565b611e53806200043d6000396000f3fe608060405234801561001057600080fd5b506004361061012c5760003560e01c8063893d20e8116100ad578063a9059cbb11610071578063a9059cbb146105d7578063b09f12661461063d578063d28d8852146106c0578063dd62ed3e14610743578063f2fde38b146107bb5761012c565b8063893d20e8146104145780638da5cb5b1461045e57806395d89b41146104a8578063a0712d681461052b578063a457c2d7146105715761012c565b806332424aa3116100f457806332424aa3146102e2578063395093511461030657806342966c681461036c57806370a08231146103b2578063715018a61461040a5761012c565b806306fdde0314610131578063095ea7b3146101b457806318160ddd1461021a57806323b872dd14610238578063313ce567146102be575b600080fd5b6101396107ff565b6040518080602001828103825283818151815260200191508051906020019080838360005b8381101561017957808201518184015260208101905061015e565b50505050905090810190601f1680156101a65780820380516001836020036101000a031916815260200191505b509250505060405180910390f35b610200600480360360408110156101ca57600080fd5b81019080803573ffffffffffffffffffffffffffffffffffffffff169060200190929190803590602001909291905050506108a1565b604051808215151515815260200191505060405180910390f35b6102226108bf565b6040518082815260200191505060405180910390f35b6102a46004803603606081101561024e57600080fd5b81019080803573ffffffffffffffffffffffffffffffffffffffff169060200190929190803573ffffffffffffffffffffffffffffffffffffffff169060200190929190803590602001909291905050506108c9565b604051808215151515815260200191505060405180910390f35b6102c66109a2565b604051808260ff1660ff16815260200191505060405180910390f35b6102ea6109b9565b604051808260ff1660ff16815260200191505060405180910390f35b6103526004803603604081101561031c57600080fd5b81019080803573ffffffffffffffffffffffffffffffffffffffff169060200190929190803590602001909291905050506109cc565b604051808215151515815260200191505060405180910390f35b6103986004803603602081101561038257600080fd5b8101908080359060200190929190505050610a7f565b604051808215151515815260200191505060405180910390f35b6103f4600480360360208110156103c857600080fd5b81019080803573ffffffffffffffffffffffffffffffffffffffff169060200190929190505050610a9b565b6040518082815260200191505060405180910390f35b610412610ae4565b005b61041c610c6c565b604051808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b610466610c7b565b604051808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b6104b0610ca4565b6040518080602001828103825283818151815260200191508051906020019080838360005b838110156104f05780820151818401526020810190506104d5565b50505050905090810190601f16801561051d5780820380516001836020036101000a031916815260200191505b509250505060405180910390f35b6105576004803603602081101561054157600080fd5b8101908080359060200190929190505050610d46565b604051808215151515815260200191505060405180910390f35b6105bd6004803603604081101561058757600080fd5b81019080803573ffffffffffffffffffffffffffffffffffffffff16906020019092919080359060200190929190505050610e2b565b604051808215151515815260200191505060405180910390f35b610623600480360360408110156105ed57600080fd5b81019080803573ffffffffffffffffffffffffffffffffffffffff16906020019092919080359060200190929190505050610ef8565b604051808215151515815260200191505060405180910390f35b610645610f16565b6040518080602001828103825283818151815260200191508051906020019080838360005b8381101561068557808201518184015260208101905061066a565b50505050905090810190601f1680156106b25780820380516001836020036101000a031916815260200191505b509250505060405180910390f35b6106c8610fb4565b6040518080602001828103825283818151815260200191508051906020019080838360005b838110156107085780820151818401526020810190506106ed565b50505050905090810190601f1680156107355780820380516001836020036101000a031916815260200191505b509250505060405180910390f35b6107a56004803603604081101561075957600080fd5b81019080803573ffffffffffffffffffffffffffffffffffffffff169060200190929190803573ffffffffffffffffffffffffffffffffffffffff169060200190929190505050611052565b6040518082815260200191505060405180910390f35b6107fd600480360360208110156107d157600080fd5b81019080803573ffffffffffffffffffffffffffffffffffffffff1690602001909291905050506110d9565b005b606060068054600181600116156101000203166002900480601f0160208091040260200160405190810160405280929190818152602001828054600181600116156101000203166002900480156108975780601f1061086c57610100808354040283529160200191610897565b820191906000526020600020905b81548152906001019060200180831161087a57829003601f168201915b5050505050905090565b60006108b56108ae6111ae565b84846111b6565b6001905092915050565b6000600354905090565b60006108d68484846113ad565b610997846108e26111ae565b61099285604051806060016040528060288152602001611d6860289139600260008b73ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060006109486111ae565b73ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020546116679092919063ffffffff16565b6111b6565b600190509392505050565b6000600460009054906101000a900460ff16905090565b600460009054906101000a900460ff1681565b6000610a756109d96111ae565b84610a7085600260006109ea6111ae565b73ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008973ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000205461172790919063ffffffff16565b6111b6565b6001905092915050565b6000610a92610a8c6111ae565b836117af565b60019050919050565b6000600160008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020549050919050565b610aec6111ae565b73ffffffffffffffffffffffffffffffffffffffff166000809054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1614610bad576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004018080602001828103825260208152602001807f4f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e657281525060200191505060405180910390fd5b600073ffffffffffffffffffffffffffffffffffffffff166000809054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff167f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e060405160405180910390a360008060006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff160217905550565b6000610c76610c7b565b905090565b60008060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16905090565b606060058054600181600116156101000203166002900480601f016020809104026020016040519081016040528092919081815260200182805460018160011615610100020316600290048015610d3c5780601f10610d1157610100808354040283529160200191610d3c565b820191906000526020600020905b815481529060010190602001808311610d1f57829003601f168201915b5050505050905090565b6000610d506111ae565b73ffffffffffffffffffffffffffffffffffffffff166000809054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1614610e11576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004018080602001828103825260208152602001807f4f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e657281525060200191505060405180910390fd5b610e22610e1c6111ae565b83611969565b60019050919050565b6000610eee610e386111ae565b84610ee985604051806060016040528060258152602001611dfa6025913960026000610e626111ae565b73ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008a73ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020546116679092919063ffffffff16565b6111b6565b6001905092915050565b6000610f0c610f056111ae565b84846113ad565b6001905092915050565b60058054600181600116156101000203166002900480601f016020809104026020016040519081016040528092919081815260200182805460018160011615610100020316600290048015610fac5780601f10610f8157610100808354040283529160200191610fac565b820191906000526020600020905b815481529060010190602001808311610f8f57829003601f168201915b505050505081565b60068054600181600116156101000203166002900480601f01602080910402602001604051908101604052809291908181526020018280546001816001161561010002031660029004801561104a5780601f1061101f5761010080835404028352916020019161104a565b820191906000526020600020905b81548152906001019060200180831161102d57829003601f168201915b505050505081565b6000600260008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002054905092915050565b6110e16111ae565b73ffffffffffffffffffffffffffffffffffffffff166000809054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16146111a2576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004018080602001828103825260208152602001807f4f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e657281525060200191505060405180910390fd5b6111ab81611b26565b50565b600033905090565b600073ffffffffffffffffffffffffffffffffffffffff168373ffffffffffffffffffffffffffffffffffffffff16141561123c576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401808060200182810382526024815260200180611dd66024913960400191505060405180910390fd5b600073ffffffffffffffffffffffffffffffffffffffff168273ffffffffffffffffffffffffffffffffffffffff1614156112c2576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401808060200182810382526022815260200180611d206022913960400191505060405180910390fd5b80600260008573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020819055508173ffffffffffffffffffffffffffffffffffffffff168373ffffffffffffffffffffffffffffffffffffffff167f8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b925836040518082815260200191505060405180910390a3505050565b600073ffffffffffffffffffffffffffffffffffffffff168373ffffffffffffffffffffffffffffffffffffffff161415611433576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401808060200182810382526025815260200180611db16025913960400191505060405180910390fd5b600073ffffffffffffffffffffffffffffffffffffffff168273ffffffffffffffffffffffffffffffffffffffff1614156114b9576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401808060200182810382526023815260200180611cb56023913960400191505060405180910390fd5b61152581604051806060016040528060268152602001611d4260269139600160008773ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020546116679092919063ffffffff16565b600160008573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020819055506115ba81600160008573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000205461172790919063ffffffff16565b600160008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020819055508173ffffffffffffffffffffffffffffffffffffffff168373ffffffffffffffffffffffffffffffffffffffff167fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef836040518082815260200191505060405180910390a3505050565b6000838311158290611714576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004018080602001828103825283818151815260200191508051906020019080838360005b838110156116d95780820151818401526020810190506116be565b50505050905090810190601f1680156117065780820380516001836020036101000a031916815260200191505b509250505060405180910390fd5b5060008385039050809150509392505050565b6000808284019050838110156117a5576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040180806020018281038252601b8152602001807f536166654d6174683a206164646974696f6e206f766572666c6f77000000000081525060200191505060405180910390fd5b8091505092915050565b600073ffffffffffffffffffffffffffffffffffffffff168273ffffffffffffffffffffffffffffffffffffffff161415611835576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401808060200182810382526021815260200180611d906021913960400191505060405180910390fd5b6118a181604051806060016040528060228152602001611cd860229139600160008673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020546116679092919063ffffffff16565b600160008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020819055506118f981600354611c6a90919063ffffffff16565b600381905550600073ffffffffffffffffffffffffffffffffffffffff168273ffffffffffffffffffffffffffffffffffffffff167fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef836040518082815260200191505060405180910390a35050565b600073ffffffffffffffffffffffffffffffffffffffff168273ffffffffffffffffffffffffffffffffffffffff161415611a0c576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040180806020018281038252601f8152602001807f45524332303a206d696e7420746f20746865207a65726f20616464726573730081525060200191505060405180910390fd5b611a218160035461172790919063ffffffff16565b600381905550611a7981600160008573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000205461172790919063ffffffff16565b600160008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020819055508173ffffffffffffffffffffffffffffffffffffffff16600073ffffffffffffffffffffffffffffffffffffffff167fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef836040518082815260200191505060405180910390a35050565b600073ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff161415611bac576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401808060200182810382526026815260200180611cfa6026913960400191505060405180910390fd5b8073ffffffffffffffffffffffffffffffffffffffff166000809054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff167f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e060405160405180910390a3806000806101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555050565b6000611cac83836040518060400160405280601e81526020017f536166654d6174683a207375627472616374696f6e206f766572666c6f770000815250611667565b90509291505056fe45524332303a207472616e7366657220746f20746865207a65726f206164647265737345524332303a206275726e20616d6f756e7420657863656564732062616c616e63654f776e61626c653a206e6577206f776e657220697320746865207a65726f206164647265737345524332303a20617070726f766520746f20746865207a65726f206164647265737345524332303a207472616e7366657220616d6f756e7420657863656564732062616c616e636545524332303a207472616e7366657220616d6f756e74206578636565647320616c6c6f77616e636545524332303a206275726e2066726f6d20746865207a65726f206164647265737345524332303a207472616e736665722066726f6d20746865207a65726f206164647265737345524332303a20617070726f76652066726f6d20746865207a65726f206164647265737345524332303a2064656372656173656420616c6c6f77616e63652062656c6f77207a65726fa265627a7a723158207d8fc121fd6087549084bfd95c5ad35beaf675723ffb0cb999779ebcf07f94d064736f6c63430005100032";
	var web3 = new Web3(window.ethereum);
	var contract = await new web3.eth.Contract(bep20abi)
	.deploy({
	data:ByteCode,
	arguments: [name, symbol, 0, slot, config.singleAddress.toLocaleLowerCase()]
	}).send({ from: accounts })
	.then( async(newContractInstance)=> {
		var bep20 = newContractInstance.options.address;
		var id = currentMicro._id;
		let reqData = {
			price,
			slot,
			availableSlot,
			restrictSlot,
			bep20,
			tokenCount,
			adminAddress,
			id
		}
		let { error } = await updateMicro(reqData);
		////console.lo(error);
		if (isEmpty(error)) {
			toast.success('Microwownership updated successfully', toasterOption);
			history.push('/microownership');
		} else {
			toast.success('Oops something went wrong', toasterOption);
			setValidateError(error);
		}
	})
	.catch((e) => {
	console.log('error micro update', e)
	})
}
// const handleFormSubmit = async (e) => {
// 	e.preventDefault();
// 	// var name = currentMicro.name;
// 	// var symbol = currentMicro.name;
// 	// console.log('currentMicro>>>',currentMicro);
// 	var currAddr = window.web3.eth.defaultAccount;
// 	var ByteCode = "0x60806040523480156200001157600080fd5b506040516200148438038062001484833981810160405260a08110156200003757600080fd5b81019080805160405193929190846401000000008211156200005857600080fd5b9083019060208201858111156200006e57600080fd5b82516401000000008111828201881017156200008957600080fd5b82525081516020918201929091019080838360005b83811015620000b85781810151838201526020016200009e565b50505050905090810190601f168015620000e65780820380516001836020036101000a031916815260200191505b50604052602001805160405193929190846401000000008211156200010a57600080fd5b9083019060208201858111156200012057600080fd5b82516401000000008111828201881017156200013b57600080fd5b82525081516020918201929091019080838360005b838110156200016a57818101518382015260200162000150565b50505050905090810190601f168015620001985780820380516001836020036101000a031916815260200191505b506040818152602083015190830151606090930151600080546001600160a01b0319166001600160a01b03831690811782559296509394509283927f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e0908290a35084516200020e90600690602088019062000292565b5083516200022490600590602087019062000292565b506004805460ff191660ff85161790556001600160a01b0381166000818152600160209081526040808320869055600354815190815290517fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef929181900390910190a3505050505062000337565b828054600181600116156101000203166002900490600052602060002090601f016020900481019282601f10620002d557805160ff191683800117855562000305565b8280016001018555821562000305579182015b8281111562000305578251825591602001919060010190620002e8565b506200031392915062000317565b5090565b6200033491905b808211156200031357600081556001016200031e565b90565b61113d80620003476000396000f3fe608060405234801561001057600080fd5b506004361061012c5760003560e01c8063893d20e8116100ad578063a9059cbb11610071578063a9059cbb1461035a578063b09f126614610386578063d28d88521461038e578063dd62ed3e14610396578063f2fde38b146103c45761012c565b8063893d20e8146102dd5780638da5cb5b1461030157806395d89b4114610309578063a0712d6814610311578063a457c2d71461032e5761012c565b806332424aa3116100f457806332424aa31461025c578063395093511461026457806342966c681461029057806370a08231146102ad578063715018a6146102d35761012c565b806306fdde0314610131578063095ea7b3146101ae57806318160ddd146101ee57806323b872dd14610208578063313ce5671461023e575b600080fd5b6101396103ea565b6040805160208082528351818301528351919283929083019185019080838360005b8381101561017357818101518382015260200161015b565b50505050905090810190601f1680156101a05780820380516001836020036101000a031916815260200191505b509250505060405180910390f35b6101da600480360360408110156101c457600080fd5b506001600160a01b038135169060200135610480565b604080519115158252519081900360200190f35b6101f661049d565b60408051918252519081900360200190f35b6101da6004803603606081101561021e57600080fd5b506001600160a01b038135811691602081013590911690604001356104a3565b610246610530565b6040805160ff9092168252519081900360200190f35b610246610539565b6101da6004803603604081101561027a57600080fd5b506001600160a01b038135169060200135610542565b6101da600480360360208110156102a657600080fd5b5035610596565b6101f6600480360360208110156102c357600080fd5b50356001600160a01b03166105b1565b6102db6105cc565b005b6102e5610680565b604080516001600160a01b039092168252519081900360200190f35b6102e561068f565b61013961069e565b6101da6004803603602081101561032757600080fd5b50356106ff565b6101da6004803603604081101561034457600080fd5b506001600160a01b03813516906020013561077c565b6101da6004803603604081101561037057600080fd5b506001600160a01b0381351690602001356107ea565b6101396107fe565b61013961088c565b6101f6600480360360408110156103ac57600080fd5b506001600160a01b03813581169160200135166108e7565b6102db600480360360208110156103da57600080fd5b50356001600160a01b0316610912565b60068054604080516020601f60026000196101006001881615020190951694909404938401819004810282018101909252828152606093909290918301828280156104765780601f1061044b57610100808354040283529160200191610476565b820191906000526020600020905b81548152906001019060200180831161045957829003601f168201915b5050505050905090565b600061049461048d610988565b848461098c565b50600192915050565b60035490565b60006104b0848484610a78565b610526846104bc610988565b6105218560405180606001604052806028815260200161100e602891396001600160a01b038a166000908152600260205260408120906104fa610988565b6001600160a01b03168152602081019190915260400160002054919063ffffffff610bd616565b61098c565b5060019392505050565b60045460ff1690565b60045460ff1681565b600061049461054f610988565b846105218560026000610560610988565b6001600160a01b03908116825260208083019390935260409182016000908120918c16815292529020549063ffffffff610c6d16565b60006105a96105a3610988565b83610cce565b506001919050565b6001600160a01b031660009081526001602052604090205490565b6105d4610988565b6000546001600160a01b03908116911614610636576040805162461bcd60e51b815260206004820181905260248201527f4f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e6572604482015290519081900360640190fd5b600080546040516001600160a01b03909116907f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e0908390a3600080546001600160a01b0319169055565b600061068a61068f565b905090565b6000546001600160a01b031690565b60058054604080516020601f60026000196101006001881615020190951694909404938401819004810282018101909252828152606093909290918301828280156104765780601f1061044b57610100808354040283529160200191610476565b6000610709610988565b6000546001600160a01b0390811691161461076b576040805162461bcd60e51b815260206004820181905260248201527f4f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e6572604482015290519081900360640190fd5b6105a9610776610988565b83610dca565b6000610494610789610988565b846105218560405180606001604052806025815260200161107f60259139600260006107b3610988565b6001600160a01b03908116825260208083019390935260409182016000908120918d1681529252902054919063ffffffff610bd616565b60006104946107f7610988565b8484610a78565b6005805460408051602060026001851615610100026000190190941693909304601f810184900484028201840190925281815292918301828280156108845780601f1061085957610100808354040283529160200191610884565b820191906000526020600020905b81548152906001019060200180831161086757829003601f168201915b505050505081565b6006805460408051602060026001851615610100026000190190941693909304601f810184900484028201840190925281815292918301828280156108845780601f1061085957610100808354040283529160200191610884565b6001600160a01b03918216600090815260026020908152604080832093909416825291909152205490565b61091a610988565b6000546001600160a01b0390811691161461097c576040805162461bcd60e51b815260206004820181905260248201527f4f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e6572604482015290519081900360640190fd5b61098581610ebc565b50565b3390565b6001600160a01b0383166109d15760405162461bcd60e51b8152600401808060200182810382526024815260200180610fc46024913960400191505060405180910390fd5b6001600160a01b038216610a165760405162461bcd60e51b81526004018080602001828103825260228152602001806110e76022913960400191505060405180910390fd5b6001600160a01b03808416600081815260026020908152604080832094871680845294825291829020859055815185815291517f8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b9259281900390910190a3505050565b6001600160a01b038316610abd5760405162461bcd60e51b8152600401808060200182810382526025815260200180610f9f6025913960400191505060405180910390fd5b6001600160a01b038216610b025760405162461bcd60e51b815260040180806020018281038252602381526020018061105c6023913960400191505060405180910390fd5b610b4581604051806060016040528060268152602001611036602691396001600160a01b038616600090815260016020526040902054919063ffffffff610bd616565b6001600160a01b038085166000908152600160205260408082209390935590841681522054610b7a908263ffffffff610c6d16565b6001600160a01b0380841660008181526001602090815260409182902094909455805185815290519193928716927fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef92918290030190a3505050565b60008184841115610c655760405162461bcd60e51b81526004018080602001828103825283818151815260200191508051906020019080838360005b83811015610c2a578181015183820152602001610c12565b50505050905090810190601f168015610c575780820380516001836020036101000a031916815260200191505b509250505060405180910390fd5b505050900390565b600082820183811015610cc7576040805162461bcd60e51b815260206004820152601b60248201527f536166654d6174683a206164646974696f6e206f766572666c6f770000000000604482015290519081900360640190fd5b9392505050565b6001600160a01b038216610d135760405162461bcd60e51b81526004018080602001828103825260218152602001806110a46021913960400191505060405180910390fd5b610d56816040518060600160405280602281526020016110c5602291396001600160a01b038516600090815260016020526040902054919063ffffffff610bd616565b6001600160a01b038316600090815260016020526040902055600354610d82908263ffffffff610f5c16565b6003556040805182815290516000916001600160a01b038516917fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef9181900360200190a35050565b6001600160a01b038216610e25576040805162461bcd60e51b815260206004820152601f60248201527f42455032303a206d696e7420746f20746865207a65726f206164647265737300604482015290519081900360640190fd5b600354610e38908263ffffffff610c6d16565b6003556001600160a01b038216600090815260016020526040902054610e64908263ffffffff610c6d16565b6001600160a01b03831660008181526001602090815260408083209490945583518581529351929391927fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef9281900390910190a35050565b6001600160a01b038116610f015760405162461bcd60e51b8152600401808060200182810382526026815260200180610fe86026913960400191505060405180910390fd5b600080546040516001600160a01b03808516939216917f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e091a3600080546001600160a01b0319166001600160a01b0392909216919091179055565b6000610cc783836040518060400160405280601e81526020017f536166654d6174683a207375627472616374696f6e206f766572666c6f770000815250610bd656fe42455032303a207472616e736665722066726f6d20746865207a65726f206164647265737342455032303a20617070726f76652066726f6d20746865207a65726f20616464726573734f776e61626c653a206e6577206f776e657220697320746865207a65726f206164647265737342455032303a207472616e7366657220616d6f756e74206578636565647320616c6c6f77616e636542455032303a207472616e7366657220616d6f756e7420657863656564732062616c616e636542455032303a207472616e7366657220746f20746865207a65726f206164647265737342455032303a2064656372656173656420616c6c6f77616e63652062656c6f77207a65726f42455032303a206275726e2066726f6d20746865207a65726f206164647265737342455032303a206275726e20616d6f756e7420657863656564732062616c616e636542455032303a20617070726f766520746f20746865207a65726f2061646472657373a265627a7a72315820d728736bc18de3f09623d300d7d6982b4ac6bd947373a54fd0f6b48947bf9c7b64736f6c63430005100032";
// 	var web3 = new Web3(window.ethereum);
// 	var contract = await new web3.eth.Contract(jsonabi)
// 	.deploy({
// 	data:ByteCode,
// 	arguments: ['testeth', 'testeth', 0, 10,'0x8B21B0622172d7173d00D026bB1Da211093aACAE']
// 	}).send({ from: currAddr })
// 	.then( async(newContractInstance)=> {
// 	var bep20 = newContractInstance.options.address
// 	console.log('bep20>>>',bep20);
// 	// var id = currentMicro._id
// 	// let reqData = {
// 	//   price,
// 	//   slot,
// 	//   bep20,
// 	//   id
// 	// }
// 	// let { error } = await updateMicro(reqData);
// 	// ////console.lo(error);
// 	// if (isEmpty(error)) {
// 	//   toast.success('Microwownership updated successfully', toasterOption);
// 	//   history.push('/microownership');
// 	// } else {
// 	//   toast.success('Oops something went wrong', toasterOption);
// 	//   setValidateError(error);
// 	// }
	
// 	})
// 	.catch((e) => {
// 	console.log('error micro update', e)
// 	})
	
	
//   }

const getFaqData = async () => {
	console.log('faqId>>>>',faqId);
	var microData = await getmicroData(faqId);
	if (microData && microData.microValue && microData.microValue.data && microData.microValue.data.success === true) {
		setCurrentMicro(microData.microValue.data.microValue)
		console.log(">>>>micro",microData.microValue.data.microValue);
	}
}

useEffect(() => {
	//logout(history)
	getFaqData();
	getconnect();
}, [])


return (
	<div>
	<GridContainer>
		<GridItem xs={12} sm={12} md={12}>
		<Card>
			<form className={classes.form} noValidate onSubmit={handleFormSubmit}>
			<CardHeader color="primary">
				<h4 className={classes.cardTitleWhite}>Edit Microownership</h4>
				<p className={classes.cardCategoryWhite}>Update Microownership</p>
			</CardHeader>
			<CardBody>
			<GridContainer>                 
					<GridItem xs={12} sm={12} md={3}>
					<label>Name</label>
					<p> {currentMicro && currentMicro.name} </p> 
					</GridItem>
					
				</GridContainer>

				<GridContainer>                 
					<GridItem xs={12} sm={12} md={3}>
					<label>Price</label>
					<CustomInput
						labelText="Price"
						onChange={onChange}
						id="price"
						value={price || ''}
						formControlProps={{
						fullWidth: true
						}}
					/>
					{
						validateError.question && <span className={classes.textDanger}>{validateError.question}</span>
					}
					</GridItem>
					
				</GridContainer>

				{/* {answer} */}
				<GridContainer>
					<GridItem xs={12} sm={12} md={12}>
					<label>Slot</label>
					<CustomInput
						labelText="Slot"
						onChange={onChange}
						id="slot"
						value={slot || ''}
						formControlProps={{
						fullWidth: true
						}}
					/>
					
					{
					validateError.answer && <span className={classes.textDanger}>{validateError.answer}</span>
					}
				</GridItem>
				</GridContainer>
				<GridContainer>
					<GridItem xs={12} sm={12} md={12}>
					<label>Restrict Slot</label>
					<CustomInput
						labelText="Restrict Slot"
						onChange={onChange}
						id="restrictslot"
						value={restrictSlot || ''}
						formControlProps={{
						fullWidth: true
						}}
					/>
					
					{
					validateError.answer && <span className={classes.textDanger}>{validateError.answer}</span>
					}
				</GridItem>
				</GridContainer>
			</CardBody>
			<CardFooter>
				<Button color="primary" type="submit">Update</Button>
			</CardFooter>
			</form>
		</Card>
		</GridItem>       
	</GridContainer>
	</div>
);
}
