"use client";

import { Spending } from "../page";
import { SpendingItem } from "./SpendingItem";

export const SpendingList = ({
  spendings,
  RemoveSpending,
  UpdateSpending,
  ValidateValue,
}: {
  spendings: Spending[];
  RemoveSpending: (id: number) => void;
  UpdateSpending: (spending: Spending) => void;
  ValidateValue: (elm: HTMLInputElement) => void;
}) => {
  return (
    <ul className="w-full">
      {spendings.map((spending) => (
        <li key={spending.id}>
          <SpendingItem
            spending={spending}
            RemoveSpending={RemoveSpending}
            UpdateSpending={UpdateSpending}
            ValidateValue={ValidateValue}
          />
        </li>
      ))}
    </ul>
  );
};
