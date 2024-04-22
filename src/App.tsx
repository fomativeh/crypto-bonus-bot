// Page.tsx

import React, { useEffect, useState } from "react";
import "./index.css"; // Import the CSS file


type BonusProps = {
  name: string;
  status: string;
  bannerUrl: string;
  exchange: string;
  description: string;
  bonusUrl: string;
};

const Bonus = ({
  name,
  status,
  bannerUrl,
  exchange,
  description,
  bonusUrl,
}: BonusProps) => {
  return (
    <a
      href={bonusUrl}
      className="bonus-item"
    >
      <section className="bonus-item-section">
        <span className="bonus-name">{name}</span>
        <section className="bonus-exchange-status">
          <span className="bonus-exchange">{exchange?.toUpperCase()}</span>
          <span className={`bonus-status ${status === "new" ? "bg-green" : "bg-red"}`}>{status}</span>
        </section>
      </section>

      <span className="bonus-description">{description}</span>

      <section className="bonus-image-section">
        <figure className="bonus-image">
          <img src={bannerUrl} alt="Bonus banner" />
        </figure>
      </section>
    </a>
  );
};

const tele = (window as any).Telegram.WebApp;

const Page = () => {
    //Executes whenever query is changed
    useEffect(() => {
      tele.ready();
      tele.expand();
    }, []);
  
    const [bonusData, setBonusData] = useState([
      {
        name: "Gemini",
        status: "new",
        bannerUrl:
          "https://media1.moneywise.com/cdn-cgi/image/fit=cover,g=left,width=260,height=58,f=auto,quality=90/topic/investing/cryptocurrency/cryptocurrency-sign-up-bonuses-445/gemini-770X170-768x170-1690317622.png",
        exchange: "BTC",
        description:
          "$15 in BTC after $100 of trading activity within the first 30 days or up to 25% trading fee revenue share for higher volumes.",
        bonusUrl: "https://moneywise.com/investing/reviews/gemini",
      },
  
      {
        name: "Okcoin",
        status: "expired",
        bannerUrl:
          "https://media1.moneywise.com/cdn-cgi/image/fit=cover,g=left,width=260,height=58,f=auto,quality=90/topic/investing/cryptocurrency/cryptocurrency-sign-up-bonuses-445/gemini-770X170-768x170-1690317622.png",
        exchange: "BTC",
        description: "$50 in BTC after making a trade of $100 or more.",
        bonusUrl: "https://moneywise.com/investing/reviews/gemini",
      },
  
      {
        name: "TradeStation",
        status: "expired",
        bannerUrl:
          "https://media1.moneywise.com/cdn-cgi/image/fit=cover,g=left,width=260,hight=58,f=auto,quality=90/topic/investing/cryptocurrency/cryptocurrency-sign-up-bonuses-445/gemini-770X170-768x170-1690317622.png",
        exchange: "BTC",
        description: "$50 in BTC after funding an account with $500.",
        bonusUrl: "https://moneywise.com/investing/reviews/gemini",
      },
  
      {
        name: "Juno",
        status: "new",
        bannerUrl:
          "https://media1.moneywise.com/cdn-cgi/image/fit=cover,g=left,width=260,height=58,f=auto,quality=90/topic/investing/cryptocurrency/cryptocurrency-sign-up-bonuses-445/gemini-770X170-768x170-1690317622.png",
        exchange: "USD",
        description:
          "$25 in USD after purchasing or depositing $50 or more in crypto.",
        bonusUrl: "https://moneywise.com/investing/reviews/gemini",
      },
  
      {
        name: "eToro",
        status: "expired",
        bannerUrl:
          "https://media1.moneywise.com/cdn-cgi/image/fit=cover,g=left,width=260,height=58,f=auto,quality=90/topic/investing/cryptocurrency/cryptocurrency-sign-up-bonuses-445/gemini-770X170-768x170-1690317622.png",
        exchange: "USD",
        description: "eToro $10 in cash after purchasing $100 worth of crypto.",
        bonusUrl: "https://moneywise.com/investing/reviews/gemini",
      },
  
      {
        name: "iTrustCapital",
        status: "new",
        bannerUrl:
          "https://media1.moneywise.com/cdn-cgi/image/fit=cover,g=left,width=260,height=58,f=auto,quality=90/topic/investing/cryptocurrency/cryptocurrency-sign-up-bonuses-445/gemini-770X170-768x170-1690317622.png",
        exchange: "USD",
        description:
          "iTrustCapital $100 for opening a new IRA account and depositing at least $1,000.",
        bonusUrl: "https://moneywise.com/investing/reviews/gemini",
      },
    ]);

  return (
    <main className="bonus-container">
      {/* Bonus header */}
      <header className="bonus-header">
        <section className="bonus-header-text">
          Top Crypto Sign-Up Bonus Offers & Promotions
        </section>
      </header>

      {/* Bonus list wrapper */}
      <section className="bonus-list-wrapper">
        {bonusData?.length > 0 &&
          bonusData.map((each, i) => {
            return (
              <Bonus
                key={i}
                name={each.name}
                status={each.status}
                bannerUrl={each.bannerUrl}
                exchange={each.exchange}
                description={each.description}
                bonusUrl={each.bonusUrl}
              />
            );
          })}
      </section>
    </main>
  );
};

export default Page;
