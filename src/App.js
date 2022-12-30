import './App.css';
import {useState, useEffect} from "react";
import Left from "./components/Left";
import Right from "./components/Right";
import Center from "./components/Center";

function App() {

  const [currAcct, setCurrAcct] = useState('');
  const [trueNet, setTrueNet] = useState(false);

  const connectWallet = async() => {
    try {
      const {ethereum} = window

      if(!ethereum){
        console.log('Metamask not detected')
        alert('Metamask not detected')
        return;
      }

      let chainId = await ethereum.request({method: 'eth_chainId'})
      console.log('Connected to blockchain with chain id: ' + chainId);

      const goerliId = '0x5';

      if(chainId !== goerliId)
      {
        console.log('You are not connected to Goerli Network! Change your Network!')
        alert('You are not connected to Goerli Network! Change your Network!')
        setTrueNet(false);
        return;
      }
      else
      {
        setTrueNet(true);
      }

      const accounts = await ethereum.request({method: 'eth_requestAccounts'})

      console.log("Found account with address : ", accounts[0])
      setCurrAcct(accounts[0]);
    } catch(error) {
      console.log("Error connecting metamask/goerli", error);
    }
  }

  const checkTrueNet = async () => {
    const { ethereum } = window
    let chainId = await ethereum.request({ method: 'eth_chainId' })
    console.log('Connected to chain:' + chainId)

    const goerliId = '0x5'

    if (chainId !== goerliId) {
      setTrueNet(false)
    } else {
      setTrueNet(true)
    }
  }

  useEffect(() => {
    connectWallet();
    checkTrueNet();
  })

  return (
    <div>
    {currAcct === '' ? 
      (
        <button
        className='text-2xl font-bold py-3 px-12 bg-[#f1c232] rounded-lg mb-10 hover:scale-105 transition duration-500 ease-in-out'
        onClick={connectWallet}
        >
        Connect Wallet
        </button>
      ) : 
      trueNet ? 
      (
          <div className="app">
            <script>{console.log('inside')}</script>
            <Left />
            <Center />
            <Right />
          </div>
      ) : 
      (
        <div className='flex flex-col justify-center items-center mb-20 font-bold text-2xl gap-y-3'>
        <div>----------------------------------------</div>
        <div>Please connect to the Goerli Testnet</div>
        <div>and reload the page</div>
        <div>----------------------------------------</div>
        </div>
      )
    }
    </div>
  );
}

export default App;
