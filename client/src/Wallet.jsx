import server from "./server";

import * as secp from "ethereum-cryptography/secp256k1"
import {toHex} from "ethereum-cryptography/utils"

function Wallet({ address, setAddress, balance, setBalance,privateKey,setPrivateKey }) {
  async function onChange(evt) {
    const privateKey = evt.target.value;
    setPrivateKey(privateKey);
    const address=toHex(secp.getPublicKey(privateKey));
    setAddress(address);
    if (address) {
      const {
        data: { balance },
      } = await server.get(`balance/${address}`);
      setBalance(balance);
    } else {
      setBalance(0);
    }
  }

  return (
    <div className="container wallet">
      <h1>Your Wallet</h1>

      <label>
        Private Key
        <input placeholder="Type private key" value={privateKey} onChange={onChange}></input>
      </label>

      <div>
        ADDRESS:{address.slice(0,10)}...
      </div>

      <div className="balance">Balance: {balance}</div>
    </div>
  );
}

export default Wallet;
// 05c15e20fc1a44526c1b3b85e1347797a423dfc6f7e0309a09b74ae9219f2183
// d965d44fe3db39eb8a3075e8016fa97427da28cb77cdb46e47e7c2fb6368f0af
// 35ee4977972f6e35f79e0f171ae859bea3f708d7a48365608a3c4c40fca8b3f0