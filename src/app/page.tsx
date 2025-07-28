"use client";

import { json } from "stream/consumers";
import { SpendingList } from "./components/SpendingList";

import { useState, useEffect } from "react";

export type Spending = {
  id: number;
  title: string;
  value: number;
  date: string;
};

export default function Home() {
  let [spendings, setSpendings] = useState([
    {
      id: 1,
      title: "Mua sách",
      value: 150000,
      date: "2025-07-28",
    },
    {
      id: 2,
      title: "Ăn trưa",
      value: 50000,
      date: "2025-07-28",
    },
  ]);

  // Spending state
  let [title, setTitle] = useState("");
  let [value, setValue] = useState(0);
  let [date, setDate] = useState(new Date().toISOString().split("T")[0]);

  const ValidateValue = (elm: HTMLInputElement) => {
    let currVal = Number(elm.value);
    if (currVal < 0) currVal = -currVal;

    setValue(currVal);

    elm.value = currVal.toString();
  };

  const addSpending = () => {
    title = title.trim();
    if (title.length == 0) {
      alert("Chưa nhập Tên khoản chi!");
      return;
    }

    if (value == 0) {
      alert("Chưa nhập Số tiền!");
      return;
    }

    setSpendings([
      {
        id: Date.now(),
        title: title,
        value: value,
        date: date,
      },
      ...spendings,
    ]);
  };

  // Remove spending

  const RemoveSpending = (id: number) => {
    setSpendings(spendings.filter((spending) => spending.id != id));
  };

  // Update spending

  const UpdateSpending = (spending: Spending) => {
    setSpendings(
      spendings.map((currSpending) =>
        currSpending.id == spending.id ? spending : currSpending
      )
    );
  };

  // Local storage

  useEffect(() => {
    const savedSpendings = localStorage.getItem("spendings");
    if (savedSpendings) setSpendings(JSON.parse(savedSpendings));
  }, []);

  useEffect(() => {
    localStorage.setItem("spendings", JSON.stringify(spendings));
  }, [spendings]);

  // Calc number of spending and sum of value

  const updateStatistics = () => {
    let numberOfSpending = document.getElementById("number-of-spending");
    if (numberOfSpending)
      numberOfSpending.textContent = spendings.length.toString();

    let sumOfValue = document.getElementById("sum-of-value");
    if (sumOfValue)
      sumOfValue.textContent = `-${spendings.reduce(
        (sum, item) => sum + item.value,
        0
      )}`;
  };

  useEffect(() => updateStatistics(), []);
  useEffect(() => updateStatistics(), [spendings]);

  // Component

  return (
    <div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
        <h1 className="w-full text-xl font-bold text-center">SỔ CHI TIÊU</h1>
        <div className="w-full flex items-center gap-2">
          <input
            type="text"
            placeholder="Tên khoản chi"
            className="p-1 focus:outline-none hover:-translate-y-0.5 transition-transform duration-300 ease-in-out"
            onChange={(event) => setTitle(event.target.value)}
          />
          <input
            type="number"
            placeholder="Số tiền"
            min={0}
            className="p-1 focus:outline-none hover:-translate-y-0.5 transition-transform duration-300 ease-in-out"
            onChange={(event) => ValidateValue(event.target)}
          />
          <input
            type="date"
            value={date}
            className="p-1 focus:outline-none hover:-translate-y-0.5 transition-transform duration-300 ease-in-out"
            onChange={(event) => setDate(event.target.value)}
          />
          <button
            className="text-white bg-gray-500 p-2 rounded hover:-translate-y-0.5 active:scale-95 transition-transform duration-300 ease-in-out"
            onClick={() => addSpending()}
          >
            Thêm
          </button>
        </div>
        <div className="w-full flex gap-5">
          <i>Số lần chi:</i> <strong id="number-of-spending">0</strong>
          <i>Tổng chi:</i>{" "}
          <strong id="sum-of-value" className="text-red-400">
            --
          </strong>
        </div>
        <SpendingList
          spendings={spendings}
          RemoveSpending={RemoveSpending}
          UpdateSpending={UpdateSpending}
        />
      </main>
    </div>
  );
}
