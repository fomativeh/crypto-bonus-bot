import React, {
  Dispatch,
  SetStateAction,
  memo,
  useEffect,
  useState,
} from "react";
import {
  deleteBonusFromDB,
  getBonuses,
  newBonus,
  updateBonus,
} from "../../apis/bonus";

type BonusProps = {
  status: string;
  bannerUrl: string;
  description: string;
  bonusUrl: string;
  bonusTitle?: string;
  couponCode?: string;
  tele: any;
  setIsEditing: Dispatch<SetStateAction<Boolean>>;
  setIsCreatingNewBonus: Dispatch<SetStateAction<Boolean>>;
  setUpdateId: Dispatch<SetStateAction<string>>;
  id: string;
  deleteBonus: (id: string) => void;
  setNewBonusData: Dispatch<any>;
};

const Bonus = memo(
  ({
    status,
    bannerUrl,
    description,
    bonusUrl,
    couponCode,
    tele,
    setIsCreatingNewBonus,
    setIsEditing,
    setUpdateId,
    id,
    deleteBonus,
    setNewBonusData,
  }: BonusProps) => {
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
            Use code
            <span className="ml-[4px] font-bold uppercase text-[#7a7a7a]">
              {couponCode}
            </span>
          </span>
        </section>

        <section className="w-[30%] h-full flex justify-center items-center relative">
          <span className="absolute top-0 right-0 bg-black text-white text-[10px] py-[5px] px-[10px]">
            {status}
          </span>
          <section className="flex flex-col justify-start items-center">
            <span
              className="cursor-pointer bg-[#cbce3c] text-[#fff] font-bold text-[14px] rounded-[5px] flex justify-center items-center w-[100px] h-[30px] mb-[10px]"
              onClick={() => {
                setIsCreatingNewBonus(true);
                setIsEditing(true);
                setUpdateId(id);
                setNewBonusData({
                  status,
                  description,
                  bonusUrl,
                  bannerUrl,
                  couponCode,
                });
              }}
            >
              Edit
            </span>

            <span
              className="cursor-pointer bg-[#b43b3b] text-[#fff] font-bold text-[14px] rounded-[5px] flex justify-center items-center w-[100px] h-[30px]"
              onClick={() => deleteBonus(id)}
            >
              Delete
            </span>
          </section>
        </section>
      </section>
    );
  }
);

const tele = (window as any).Telegram.WebApp;

const NewBonus = () => {
  //Executes whenever query is changed
  useEffect(() => {
    tele.ready();
    tele.expand();
  }, []);

  useEffect(() => {
    loadBonuses();
  }, []);

  const [bonusesData, setBonusesData] = useState([
  ]);

  const [isCreatingNewBonus, setIsCreatingNewBonus] = useState<Boolean>(false);
  const [isEditing, setIsEditing] = useState<Boolean>(false);
  const [updateId, setUpdateId] = useState<string>("");

  const deleteBonus = async (id: string) => {
    try {
      const deleteRes: any = await deleteBonusFromDB(id);
      if (!deleteRes?.success) {
        // alert("An error occured.");
      } else {
        alert("Bonus deleted");
        await loadBonuses();
      }
    } catch (error) {
      console.log(error);
      //   alert("Error loading bonuses");
    }
  };

  //I use this state when creating and editing data

  let initialState = {
    status: "",
    couponCode: "",
    description: "",
    bannerUrl: "",
    bonusUrl: "",
  };

  const [newBonusData, setNewBonusData] = useState<any>(initialState);

  const loadBonuses = async () => {
    setNewBonusData(initialState);
    try {
      const bonusesRes: any = await getBonuses();
      if (!bonusesRes?.success) {
        // alert("An error occured.");
      } else {
        setBonusesData(bonusesRes.data);
      }
    } catch (error) {
      console.log(error);
      //   alert("Error loading bonuses");
    }
  };

  const validateForm = () => {
    if (
      !newBonusData.status ||
      !newBonusData.couponCode ||
      !newBonusData.description ||
      !newBonusData.bannerUrl ||
      !newBonusData.bonusUrl
    ) {
      return false;
    }

    return true;
  };

  const handleSubmit = async () => {
    if (!validateForm()) {
    //   console.log(newBonusData);
      return alert("Please fill all fields.");
    }

    try {
      if (isEditing) {
        const updateBonusRes: any = await updateBonus(newBonusData, updateId);
        if (!updateBonusRes?.success) {
          alert("An error occured.");
        } else {
          alert("Bonus updated");
          //Reset state
          setIsCreatingNewBonus(false);
          setIsEditing(false);

          //Reload data
          await loadBonuses();
        }
      }

      //Use create bonus route if not editing
      if (!isEditing) {
        const createBonusRes: any = await newBonus(newBonusData);
        if (!createBonusRes?.success) {
          alert("An error occured.");
        } else {
          alert("Bonus created");
          //Reset state
          setIsCreatingNewBonus(false);

          //Reload data
          await loadBonuses();
        }
      }
    } catch (error) {
      console.log(error);
      alert("An error occured.");
    }
  };

  return (
    <main className="min-h-full w-[100%] max-w-[2000px] flex flex-col justify-center items-center">
      {!isCreatingNewBonus && (
        <section className="w-full flex flex-col justify-start items-center">
          <header className="z-[9] fixed top-0 left-0 bg-blac h-[80px] bg-black text-white w-full flex justify-center items-center">
            <section className="flex justify-between items-center h-[70%] w-full max-w-[500px] px-[10px]">
              <input
                type="text"
                className="h-full border-[1px] outline-none text-white bg-transparent border-white rounded-[10px] pl-[10px] w-[60%] min-w-[280px]"
                placeholder="Find a bonus..."
              />
              <button
                className="ml-[5px] w-[20%] text-[12px] px-[5px] h-full rounded-[5px] bg-white text-black"
                onClick={() => setIsCreatingNewBonus(true)}
              >
                New Bonus
              </button>
            </section>
          </header>

          <section className="mt-[100px] flex flex-col justify-start items-center w-[100vw] max-w-[800px] min-w-[320px] px-[10px]">
            {bonusesData?.length > 0 &&
              bonusesData.map((each: any, i) => {
                return (
                  <Bonus
                    setIsCreatingNewBonus={setIsCreatingNewBonus}
                    setIsEditing={setIsEditing}
                    tele={tele}
                    key={i}
                    status={each.status}
                    bannerUrl={each.bannerUrl}
                    description={each.description}
                    bonusUrl={each.bonusUrl}
                    couponCode={each.couponCode}
                    setUpdateId={setUpdateId}
                    id={each?._id}
                    deleteBonus={deleteBonus}
                    setNewBonusData={setNewBonusData}
                  />
                );
              })}
          </section>
        </section>
      )}

      {isCreatingNewBonus && (
        <form onSubmit={(e)=>e.preventDefault()} className="mt-[20px] w-[95vw] max-w-[700px] flex flex-col justify-start items-start shadow-c py-[20px] px-[15px] rounded-[12px]">
          <span className="block text-white bg-black rounded-[10px] px-[10px] py-[15px] mb-[20px]">
            {isEditing ? "Edit bonus" : "Add new bonus"}
          </span>

          <input
            type="text"
            placeholder="Status e.g Hot, trending, new"
            className="w-full rounded-[8px] border-[2px] border-[#505050] outline-none h-[40px] pl-[10px] my-[15px]"
            onChange={(e) =>
              setNewBonusData({ ...newBonusData, status: e.target.value })
            }
            value={newBonusData.status}
          />
          <input
            type="text"
            placeholder="Description e.g $15 BTC BONUS, $30K OFFER"
            className="w-full rounded-[8px] border-[2px] border-[#505050] outline-none h-[40px] pl-[10px] my-[15px]"
            onChange={(e) =>
              setNewBonusData({ ...newBonusData, description: e.target.value })
            }
            value={newBonusData.description}
          />
          <input
            type="text"
            placeholder="Bonus url"
            className="w-full rounded-[8px] border-[2px] border-[#505050] outline-none h-[40px] pl-[10px] my-[15px]"
            onChange={(e) =>
              setNewBonusData({ ...newBonusData, bonusUrl: e.target.value })
            }
            value={newBonusData.bonusUrl}
          />
          <input
            type="text"
            placeholder="Banner url"
            className="w-full rounded-[8px] border-[2px] border-[#505050] outline-none h-[40px] pl-[10px] my-[15px]"
            onChange={(e) =>
              setNewBonusData({ ...newBonusData, bannerUrl: e.target.value })
            }
            value={newBonusData.bannerUrl}
          />
          <input
            type="text"
            placeholder="Coupon code e.g Gemeni15, Okcoin50"
            className="w-full rounded-[8px] border-[2px] border-[#505050] outline-none h-[40px] pl-[10px] my-[15px]"
            onChange={(e) =>
              setNewBonusData({ ...newBonusData, couponCode: e.target.value })
            }
            value={newBonusData.couponCode}
          />

          <section className="flex w-full justify-center items-center">
            <button
              onClick={handleSubmit}
              className={`rounded-[5px] text-white px-[15px] py-[10px] ${
                isEditing ? `bg-[#cbce3c]` : `bg-green`
              } mr-[10px]`}
            >
              {isEditing ? "Update" : "Submit"}
            </button>
            <button
              className="rounded-[5px] text-white px-[15px] py-[10px] bg-[red]"
              onClick={() => {
                if (isEditing) {
                  setIsCreatingNewBonus(false);
                  setIsEditing(false);
                } else {
                  setIsCreatingNewBonus(false);
                }
              }}
            >
              Cancel
            </button>
          </section>
        </form>
      )}
    </main>
  );
};

export default NewBonus;
