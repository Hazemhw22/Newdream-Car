import React from "react";
import { Button } from "@/components/ui/button";

export const TradeInCard = () => (
  <div className="bg-gradient-to-r from-cyan-50 to-blue-50 dark:from-gray-700 dark:to-gray-600 rounded-2xl p-6 shadow-lg">
    <div className="text-center mb-4">
      <h3 className="text-lg font-bold mb-2">יש לך רכב ישן?</h3>
      <p className="text-gray-600 dark:text-gray-400">טרייד-אין זמין!</p>
    </div>
    <Button className="w-full bg-cyan-500 hover:bg-cyan-600 h-12 text-base font-semibold rounded-xl">
      תאם ושמור
    </Button>
  </div>
);
