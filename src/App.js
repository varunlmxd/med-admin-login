import { initializeApp } from "https://www.gstatic.com/firebasejs/10.0.0/firebase-app.js";
import { getDatabase,ref,get,child,push } from "https://www.gstatic.com/firebasejs/10.0.0/firebase-database.js";
import { Contract } from 'web3-eth-contract';
import { Buffer } from "buffer";
import {  useEffect ,useState } from "react";
import { StoreContent } from "./components/StoreContent";
import SimpleStorageArtifact from './artifacts/contracts/SimpleStorage.sol/SimpleStorage.json'
import Web3 from "web3";
import React from "react";
import "./app.css"
window.Buffer = window.Buffer || Buffer;
const firebaseConfig = {
  apiKey: process.env.REACT_APP_YOUR_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_YOUR_FIREBASE_AUTH_DOMIAN,
  projectId: process.env.REACT_APP_YOUR_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_YOUR_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_YOUR_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_YOUR_FIREBASE_APP_ID
}
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);
function App() {

    const [Number,setNumber] = useState({
      data:"",
      message: "Loading data..."});
    const [Account,setAccount] = useState("")
    const [loadingState, setLoadingState] = useState({
      isLoading:false,
      message: "Loading data..."
    });
    
    const [Contractt,setContractt] = useState({
      d: SimpleStorageArtifact,
      message: "unchanged"
    });
    const initWeb3 = async () => {
      let web3;
  
    
      if (typeof window.ethereum !== 'undefined') {
        web3 = new Web3(window.ethereum);
        try {
          await window.ethereum.enable();
        } catch (error) {
          console.log('User denied account access...');
          return false;
        }
      }
      else if (typeof window.web3 !== 'undefined') {
        web3 = new Web3(window.web3.currentProvider);
      }
      else {
        window.alert('Please connect to Metamask.');
        return false;
      }
      return true;
    };
  
    const loadAccount = async () => {
      const web3 = new Web3(window.ethereum);
      const accounts = await web3.eth.getAccounts();
      if (accounts.length === 0) {
        console.log("No accounts found. Please make sure MetaMask is connected and has granted access.");
        return false;
      }
      const account = accounts[0];
      setAccount(account)
      return true;
    };

    const loadContract = async () => {
      
      const web3 = new Web3(window.ethereum);
      const contractAddress = process.env.REACT_APP_YOUR_CONTRACT_ADDRESS;
      const contractAbi = SimpleStorageArtifact.abi;
      const contract = new web3.eth.Contract(contractAbi, contractAddress);
      // Hydrate the smart contract with values from the blockchain
      setContractt({
        d: contract,
        message : "changed"
        });
      return true;
      
    };
  
    const doall = async () => {
  
      if(await initWeb3())
        if(await loadAccount())
          if(await loadContract()){
      setLoadingState({
        isLoading: true,
        message: "Data loaded"
      });
    }
    };
  
    useEffect(() => {
      doall();
    }, []);
      
    const [fileHash, setFileHash] = useState("");
    const [url, setUrl] = useState(null);
    const drawform = async()=>{
      const formElement = document.createElement("form");
      formElement.setAttribute("id", "otpForm");
  
      // Create the label element
      const labelElement = document.createElement("label");
      labelElement.setAttribute("for", "otp");
      labelElement.textContent = "Enter OTP:";
  
      // Create the input element
      const inputElement = document.createElement("input");
      inputElement.setAttribute("type", "text");
      inputElement.setAttribute("id", "otp");
      inputElement.setAttribute("name", "otp");
      inputElement.setAttribute("required", true);
  
      // Create the button element
      const buttonElement = document.createElement("button");
      buttonElement.setAttribute("type", "submit");
      buttonElement.textContent = "Verify OTP";
  
      // Append the elements to the form
      formElement.appendChild(labelElement);
      formElement.appendChild(inputElement);
      formElement.appendChild(buttonElement);
  
      // Append the form to the "formContainer" div in the DOM
      const formContainer = document.getElementById("formContainer");
      formContainer.appendChild(formElement);
    };
    //

    async function phone(num){
      const numb = num
      setNumber({
        data:numb,
        message: "data uploaded"});
      }
    const upload = async (file) => {
      
      const id = document.getElementById('id-input').value;
         await drawform();
         const h3 = document.createElement("h3");
         h3.setAttribute("id", "uploading");
        var upload = document.getElementById('otpForm');
        h3.innerHTML="Uploading";
        upload.insertAdjacentElement("afterend",h3);
      
      
      
        //-----------------
        try{
          get(child(ref(db), "user/" + id))
          .then((snapshot) => {
              const user = snapshot.val();
              const num = user.phno
              phone(num);
          })
          .catch((err)=>{
            console.log(err)
          });
      const response = await sendVerificationCode(Number.data);
      // Wait for the OTP form submission
      const otpPromise = new Promise((resolve) => {
        otpForm.addEventListener('submit', (event) => {
          event.preventDefault();
          const otp = document.getElementById('otp').value;
          resolve(verifyOTP(Number.data, otp));
        });
      });
  
      // Wait for OTP verification response
      const otpVerificationResponse = await otpPromise;
      if (otpVerificationResponse.status === 'approved') {
        alert('OTP verification successful!');
          const ciid = (await StoreContent(file)).toString();
          await Contractt.d.methods.set(ciid).send({from: Account});
          push(ref(db, "user/"+id+"/link/"),{ciid
        })
        .then(()=>{
            alert("Data added successfully");
        })
        .catch((error)=>{
            alert(error);
        });

          h3.innerHTML="Uploaded";
          upload.insertAdjacentElement("beforebegin",h3);
          const newUrl = `https://ipfs.io/ipfs/${ciid}`;
          setFileHash(ciid)
          return newUrl;
        } else {
          console.log('Invalid OTP. File upload failed.')
          alert('Invalid OTP. File upload failed.');
          return null;
        }   
        }
        catch(err){
          console.log(err)
        }
        
        
        
     
    };
  
    const handleUpload = async (event) => {
      event.preventDefault();
      const fileInput = document.getElementById("file-input");
      const file = fileInput.files[0];
      if (file) {
        
        const fileUrl = await upload(file);
        if (fileUrl) {
          console.log("File uploaded successfully");
          // Perform any necessary actions after successful upload
        } else {
          console.log("File upload failed.");
          // Handle upload failure
        }
        const elementToRemove = document.getElementById('otpForm');
        elementToRemove.remove();
        const elementRemove = document.getElementById('uploading');
        elementRemove.remove();
        
      }
    };
    ///////// otp/////
    const verifyOTP = async (phoneNumber, otp) => {
      const accountSid = process.env.REACT_APP_YOUR_TWILIO_ACCOUNT_SID ;
      const authToken = process.env.REACT_APP_YOUR_TWILIO_AUTH_TOKEN ;
      const serviceSid = process.env.REACT_APP_YOUR_TWILIO_SERVICE_SID ;

      try {
        const response = await fetch(`https://verify.twilio.com/v2/Services/${serviceSid}/VerificationCheck`, {
          method: 'POST',
          headers: {
            'Authorization': 'Basic ' + btoa(`${accountSid}:${authToken}`),
            'Content-Type': 'application/x-www-form-urlencoded'
          },
          body: `To=${encodeURIComponent(phoneNumber)}&Code=${encodeURIComponent(otp)}`
        });

        const responseData = await response.json();
        return responseData;
      } catch (error) {
        console.error('Error verifying OTP:', error);
        throw error;
      }
    }

    const sendVerificationCode = async(phoneNumber) => {
      const accountSid = process.env.REACT_APP_YOUR_TWILIO_ACCOUNT_SID ;
      const authToken = process.env.REACT_APP_YOUR_TWILIO_AUTH_TOKEN ;
      const serviceSid = process.env.REACT_APP_YOUR_TWILIO_SERVICE_SID ;

      try {
        const response = await fetch(`https://verify.twilio.com/v2/Services/${serviceSid}/Verifications`, {
          method: 'POST',
          headers: {
            'Authorization': 'Basic ' + btoa(`${accountSid}:${authToken}`),
            'Content-Type': 'application/x-www-form-urlencoded'
          },
          body: `To=${encodeURIComponent(phoneNumber)}&Channel=sms`
        });

        const responseData = await response.json();
        alert('Verification code sent successfully.');
        console.log('Verification code sent successfully.')
        return responseData;
      } catch (error) {
        alert('Error sending verification code.');
        console.error('Error sending verification:', error);
        throw error;
        
      }
    }
    ///////otp/////
    if (loadingState.isLoading) {
      return (
        <div className="dex" >
          <div className="head">
            <h1><img src="logo.png" style={{width:"50px"}}></img>Medecally</h1>
            <br />
            <h2 id="account">Account: {Account}</h2>
            <br></br>
          </div>
            <br />
            <br /><br /><br /><br /><br /><br />
            <div className="container">
            
            <form id="upload-form" onSubmit={handleUpload}>
                <p id="DbID" >Enter ID</p>
                <input type="text" id="id-input" required />
                <br />
                <input type="file" id="file-input" required />
                <br />
                <br />
                <button type="submit" id="upload">Upload</button>
            </form>
            <br />
            <p id ="formContainer"></p>
            <h3 id="display-button"hidden></h3>
          <h3 id ="link"></h3> 
          </div>   
        </div>
      );
  }
    else{
      return <div><h1>Connect to MetaMask Wallet</h1></div>;
    }
  }

  export default App;