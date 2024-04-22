import React, { useEffect, useState } from "react";

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
      className="w-[95%] bg-[#ffa63191] text-[red] rounded-[5px] p-[12px] flex flex-col justify-start items-center mb-[30px]"
    >
      <section className="w-full flex justify-between items-center font-medium">
        {/* Bonus name */}
        <span className="p-[10px] bg-[#ffa631] text-white rounded-[30px]">
          {name}
        </span>

        <section className="flex justify-start items-center">
          <span className="p-[10px] bg-white text-[#ffa631] rounded-[30px] mr-[10px]">
            {exchange?.toUpperCase()}
          </span>

          <span
            className={`p-[10px] ${
              status == "new" ? "bg-[green]" : "bg-[red]"
            } text-white rounded-[30px]`}
          >
            {status}
          </span>
        </section>
      </section>

      {/* Bonus description */}
      <span className="block w-full text-left font-medium text-[#000000] my-[12px]">
        {description}
      </span>

      <section className="mt-[6px] bg-white w-full flex justify-center items-center h-[120px] rounded-[12px]">
        <figure className="relative w-[80%] h-[60%]">
          <img src={bannerUrl} alt="Bonus banner" className="w-full h-full" />
        </figure>
      </section>
    </a>
  );
};


const tele = (window as any).Telegram.WebApp;
const App = () => {

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
    <main className="flex flex-col justify-start items-center pt-[30px]">
      {/* Bonus header */}
      <header className="w-full py-[20px] fixed top-0 left-0 flex justify-center items-center bg-[white] z-[5]">
        <section className="rounded-[10px] bg-[#ffa631] font-[Inter] font-medium text-[#fff] py-[15px] px-[20px] text-center w-[90%] flex justify-center items-center">
          Top Crypto Sign-Up Bonus Offers & Promotions
        </section>
      </header>

      {/* Bonus list wrapper */}
      <section className="mt-[100px] w-full flex flex-col justify-start items-center font-[Inter]">
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

export default App;