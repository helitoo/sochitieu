"use client";

import { useState, useEffect } from "react";

import { Spending } from "../page";

const Lock = ({ lock }: { lock: boolean }) => {
  if (lock)
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="size-6 text-gray-300 hover:-translate-y-0.5 active:scale-95 transition-transform duration-300 ease-in-out"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z"
        />
      </svg>
    );
  else
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="size-6 text-green-400 hover:-translate-y-0.5 active:scale-95 transition-transform duration-300 ease-in-out"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M13.5 10.5V6.75a4.5 4.5 0 1 1 9 0v3.75M3.75 21.75h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H3.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z"
        />
      </svg>
    );
};

export const SpendingItem = ({
  spending,
  RemoveSpending,
  UpdateSpending,
}: {
  spending: Spending;
  RemoveSpending: (id: number) => void;
  UpdateSpending: (spending: Spending) => void;
}) => {
  // Toggle lock state
  let [lock, setLock] = useState(true);

  // Update spending states
  let [title, setTitle] = useState(spending.title);
  let [value, setValue] = useState(spending.value);
  let [date, setDate] = useState(spending.date);

  const ValidateValue = (elm: HTMLInputElement) => {
    let currVal = Number(elm.value);
    if (currVal < 0) currVal = -currVal;

    setValue(currVal);

    elm.value = currVal.toString();
  };

  useEffect(() => {
    setTitle(spending.title);
    setValue(spending.value);
    setDate(spending.date);
  }, [spending]);

  useEffect(() => {
    if (lock && title.trim().length)
      UpdateSpending({
        id: spending.id,
        title: title,
        value: value,
        date: date,
      });
  }, [lock]);

  // Componenet

  return (
    <div
      className={`flex border-2 gap-2 ${
        lock ? `border-gray-300` : `border-green-400 shadow-green-400`
      } rounded mb-3 p-1`}
      style={
        !lock
          ? {
              boxShadow: "rgba(74, 222, 128, 0.05) 0px 5px 20px",
              transform: "translateY(-2px)",
              transition: "transform 0.3s ease",
            }
          : {
              transition: "transform 0.3s ease",
            }
      }
    >
      <input
        type="text"
        className="p-1 focus:outline-none"
        disabled={lock}
        value={title}
        onChange={(event) => setTitle(event.target.value)}
      />
      <input
        type="number"
        min={0}
        className="p-1 focus:outline-none"
        disabled={lock}
        value={value}
        onChange={(event) => ValidateValue(event.target)}
      />
      <input
        type="date"
        className="p-1 focus:outline-none"
        disabled={lock}
        value={date}
        onChange={(event) => setDate(event.target.value)}
      />
      <button onClick={() => setLock(!lock)}>
        <Lock lock={lock} />
      </button>
      <button onClick={() => RemoveSpending(spending.id)}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="size-6 text-red-400 hover:-translate-y-0.5 active:scale-95 transition-transform duration-300 ease-in-out"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
          />
        </svg>
      </button>
    </div>
  );
};
