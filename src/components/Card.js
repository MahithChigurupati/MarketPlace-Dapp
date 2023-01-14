import "./card.css";
import { ethers } from "ethers";
import ABI from "./contractABI.json";
import tokenABI from "./tokenABI.json";
import { useState, useEffect } from "react";

function Card(props) {
  const [Bought, setBought] = useState(false);

  const checkBought = async () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const currentAddress = await provider.getSigner().getAddress();
    const marketplaceContract = new ethers.Contract(
      "0xe50697fC5791E1e22AD50aC84822eeE835c8Ff32",
      ABI,
      signer
    );
    const bought = await marketplaceContract.alreadyBought(currentAddress);
    setBought(bought);
    console.log(Bought);
  };

  const connect = async () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    await provider.send("eth_requestAccounts");
    console.log("trying to connect");
  };

  const payInETH = async () => {
    connect();
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const currentAddress = await provider.getSigner().getAddress();
    const marketPlaceAddress = "0xe50697fC5791E1e22AD50aC84822eeE835c8Ff32";
    const marketplaceContract = new ethers.Contract(
      marketPlaceAddress,
      ABI,
      signer
    );
    const amount = await provider.getBalance(currentAddress);
    const formatted = ethers.utils.formatEther(amount);
    console.log(formatted);
    const price = await marketplaceContract.getPriceOfETH();
    console.log(price);
    console.log(amount);

    if (ethers.utils.formatEther(amount) >= ethers.utils.formatEther(price)) {
      const pay = await marketplaceContract.payInETH({ value: price });
      const receipt = await pay.wait();
      if (receipt.confirmations > 0) {
        setBought(pay);
        console.log(pay);
      }
      console.log(pay);
    } else {
    }
  };

  const payInUSDC = async () => {
    connect();
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const currentAddress = await provider.getSigner().getAddress();
    const marketPlaceAddress = "0xe50697fC5791E1e22AD50aC84822eeE835c8Ff32";
    const marketplaceContract = new ethers.Contract(
      marketPlaceAddress,
      ABI,
      signer
    );
    const token = new ethers.Contract(
      "0x1194D7A94fe9894Ce4f411DA64733a61720bff6a",
      tokenABI,
      signer
    );
    const totalBalance = await token.balanceOf(currentAddress);
    const allowance = await token.allowance(currentAddress, marketPlaceAddress);
    const price = await marketplaceContract.price();
    console.log("Total ->" + totalBalance);
    console.log("Totalallowed ->" + allowance);
    console.log("Price ->" + price);

    if (price <= totalBalance) {
      if (price < allowance) {
        const purchase = await marketplaceContract.payInUSDC();
        setBought(purchase);
      } else {
        const approve = await token.approve(marketPlaceAddress, price);
        const receipt = await approve.wait();
        if (receipt.confirmations > 0) {
          const purchase = await marketplaceContract.payInUSDC();
          setBought(purchase);
        }
      }
    } else {
    }
  };

  useEffect(() => {
    checkBought();
  }, []);

  return (
    <div className="card">
      <div className="card__image-container">
        <img src={props.imageURL} width="400" />
      </div>
      <div className="card__content">
        <p className="card__title text--medium">{props.name}</p>
        <div className="card__info">
          <p className="text--medium">{props.description} </p>
        </div>

        {Bought == true ? (
          <div>
            <p className="card__price text__price">
              <a href="/Item1">view your product</a>
            </p>
          </div>
        ) : (
          <div>
            <div>
              <img
                className="buyIcon"
                onClick={payInUSDC}
                src="https://imgur.com/MQHRBrg.png"
              ></img>
              <img
                className="buyIcon"
                onClick={payInUSDC}
                src="https://imgur.com/wndKTZS.png"
              ></img>
              <img
                className="buyIcon"
                onClick={payInETH}
                src="https://imgur.com/sQsv7UD.png"
              ></img>
            </div>
            <p onClick={payInETH}>checkBuy</p>
            <div>
              <p className="card__price text__price">$10</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Card;
