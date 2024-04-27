// Page.tsx

import React, { useEffect, useState } from "react";
import "../../index.css";

type BonusProps = {
  status: string;
  bannerUrl: string;
  description: string;
  bonusUrl: string;
  bonusTitle?: string;
  couponCode?: string;
  tele: any
};

const Bonus = ({
  status,
  bannerUrl,
  description,
  bonusUrl,
  couponCode,
  tele,
}: BonusProps) => {
  return (
    <section className="my-[8px] w-full flex justify-between items-center h-[130px] shadow-c">
        <figure className="w-[30%] h-full">
            <img src={bannerUrl} alt={"Bonus image"} className="w-full h-full"/>
        </figure>

        <section className="w-[30%] h-full flex flex-col justify-center items-center">
            <span className="font-bold uppercase text-[14px] text-[#000] mb-[10px]">{description}</span>
            <span className="text-[silver] text-[10px]">Use code <span className="font-bold uppercase text-[#7a7a7a]">{couponCode}</span></span>
        </section>

        <section className="w-[30%] h-full flex justify-center items-center relative">
            <span className="absolute top-0 right-0 bg-black text-white text-[10px] py-[5px] px-[10px]">{status}</span>
            <span className="cursor-pointer bg-[#3bb43b] text-[#fff] font-bold text-[14px] rounded-[5px] px-[10px] py-[10px] mr-[5px]" onClick={()=>tele.openLink(bonusUrl)}>Get Bonus</span>
        </section>
    </section>
  );
};

const tele = (window as any).Telegram.WebApp;

const Home = () => {
  //Executes whenever query is changed
  useEffect(() => {
    tele.ready();
    tele.expand();
  }, []);

  const [bonusData, setBonusData] = useState([
    {
      name: "Gemini",
      status: "trending",
      bannerUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/71/Stake-com-logo-high-res.jpg/1200px-Stake-com-logo-high-res.jpg",
      exchange: "BTC",
      description: "$15 BTC Bonus",
      bonusUrl: "https://moneywise.com/investing/reviews/gemini",
      couponCode: "GEMINI15"
    },
  
    {
      name: "Okcoin",
      status: "hot",
      bannerUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSVYwadP1Ws01jZ76BaPKWF9_NYAJJbXy2Z8BWmzDJAVw&s",
      exchange: "BTC",
      description: "$30k offer",
      bonusUrl: "https://moneywise.com/investing/reviews/gemini",
      couponCode: "OKCOIN50"
    },

    {
        name: "Gemini",
        status: "new",
        bannerUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/71/Stake-com-logo-high-res.jpg/1200px-Stake-com-logo-high-res.jpg",
        exchange: "BTC",
        description: "5 BTC",
        bonusUrl: "https://moneywise.com/investing/reviews/gemini",
        couponCode: "GEMINI15"
      },
    
      {
        name: "Okcoin",
        status: "hot",
        bannerUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSVYwadP1Ws01jZ76BaPKWF9_NYAJJbXy2Z8BWmzDJAVw&s",
        exchange: "BTC",
        description: "$50 BTC Bonus",
        bonusUrl: "https://moneywise.com/investing/reviews/gemini",
        couponCode: "OKCOIN50"
      },

      {
        name: "Gemini",
        status: "trending",
        bannerUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/71/Stake-com-logo-high-res.jpg/1200px-Stake-com-logo-high-res.jpg",
        exchange: "BTC",
        description: "$15 BTC Bonus",
        bonusUrl: "https://moneywise.com/investing/reviews/gemini",
        couponCode: "GEMINI15"
      },
    
      {
        name: "Okcoin",
        status: "hot",
        bannerUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSVYwadP1Ws01jZ76BaPKWF9_NYAJJbXy2Z8BWmzDJAVw&s",
        exchange: "BTC",
        description: "$50 BTC Bonus",
        bonusUrl: "https://moneywise.com/investing/reviews/gemini",
        couponCode: "OKCOIN50"
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
      <section className="bonus-list-wrapper min-w-[400px]">
        {bonusData?.length > 0 &&
          bonusData.map((each, i) => {
            return (
              <Bonus
                tele={tele}
                key={i}
                status={each.status}
                bannerUrl={each.bannerUrl}
                description={each.description}
                bonusUrl={each.bonusUrl}
                couponCode={each.couponCode}
              />
            );
          })}
      </section>
    </main>
  );
};

export default Home;
