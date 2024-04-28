// Page.tsx

import React, { useEffect, useState } from "react";
import "../../index.css";
import { getBonuses } from "../../apis/bonus";

type BonusProps = {
  status: string;
  bannerUrl: string;
  description: string;
  bonusUrl: string;
  bonusTitle?: string;
  couponCode?: string;
  tele: any;
};

const Bonus = ({
  status,
  bannerUrl,
  description,
  bonusUrl,
  couponCode,
  tele,
}: BonusProps) => {

  let url = !bonusUrl.startsWith("http") && "https://"+bonusUrl
  return (
    <section className="my-[8px] w-full flex justify-between items-center h-[130px] shadow-c">
      <figure className="w-[30%] h-full">
        <img src={bannerUrl} alt={"Bonus image"} className="w-full h-full" />
      </figure>

      <section className="w-[30%] h-full flex flex-col justify-center items-center">
        <span className="font-bold uppercase text-[12px] text-[#000] mb-[5px] text-center">
          {description}
        </span>
        <span className="text-[#9b9b9b] text-[10px] text-center">
          Use code{" "}
          <span className="font-bold uppercase text-[#7a7a7a]">
            {couponCode}
          </span>
        </span>
      </section>

      <section className="w-[30%] h-full flex justify-center items-center relative">
        <span className="absolute top-0 right-0 bg-black text-white text-[10px] py-[5px] px-[10px]">
          {status}
        </span>
        <span
          className="cursor-pointer bg-[#3bb43b] text-[#fff] font-bold text-[14px] rounded-[5px] px-[10px] py-[10px] mr-[5px]"
          onClick={() => {tele.openLink(url)}}
        >
          Get Bonus
        </span>
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

  const [bonusesData, setBonusesData] = useState<any>({});

  const loadBonuses = async () => {
    try {
      const bonusesRes: any = await getBonuses();
      if (!bonusesRes?.success) {
        // alert("An error occured.");
      } else {
        console.log(bonusesRes.data)

        setBonusesData(bonusesRes.data);
      }
    } catch (error) {
      console.log(error);
      //   alert("Error loading bonuses");
    }
  };

  useEffect(() => {
    loadBonuses();
  }, []);

  return (
    <main className="bonus-container">
      {/* Bonus header */}
      <header className="bonus-header">
        <section className="bonus-header-text">
          <span className="max-w-[90vw]">Hottest Crypto Bonuses & Rewards</span>
          <p className="max-w-[90vw]">
            Get your exclusive rewards at the largest community for your crypto
            rewards and bonuses from all major crypto websites.
          </p>
        </section>
      </header>

      {/* Bonus list wrapper */}
      <section className="bonus-list-wrapper min-w-[320px]">
        {bonusesData?.length > 0 &&
          bonusesData?.map((each:any, i:number) => {
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
