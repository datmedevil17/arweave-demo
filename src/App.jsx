import React,{useState} from 'react'
import {ArweaveWalletKit, ConnectButton} from "arweave-wallet-kit"
import { createDataItemSigner, message, result } from '@permaweb/aoconnect'

import "./App.css"
const App = () => {
    const [userMessage,setUserMessage] = useState(null)
    const [messageResponse, setMessageResponse] = useState(null)
    const myProcess = "z1zbsz-WHN8XGtpEvUTxzRg9CjcYZCscjx404XzPXCY"

    const handleMessageChange = (event) => {
        setUserMessage(event.target.value);
    };

    async function sendAOMessage() {
		    const response = await message({
		        process: myProcess,
		        tags: [{ name: "Action", value: "Dumify" }],
		        signer: createDataItemSigner(window.arweaveWallet),
		        data: userMessage
		    })
		    const r = await result({
		        message: response,
		        process: myProcess
		    });
		    setMessageResponse(r.Messages[0].Data)
    }

  return (
    <ArweaveWalletKit config={{
        permissions: ["ACCESS_ADDRESS", "SIGN_TRANSACTION"],
        ensurePermissions: true
    }}>

    <div className='App'>
        <h1>dumnotes</h1>
        <ConnectButton profileModal={true}/>
        <input type="text" value={userMessage}
								    onChange={handleMessageChange}
								    placeholder="Hello World!"
								 />
	    <button onClick={sendAOMessage}>send message</button>
		<p>{messageResponse || ""}</p>

    </div>
    </ArweaveWalletKit>
  )
}

export default App
