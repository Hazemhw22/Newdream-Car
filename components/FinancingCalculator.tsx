import React from "react";

interface FinancingCalculatorProps {
  salePrice: number;
  downPayment: number;
  setDownPayment: (value: number) => void;
  finalPayment: number;
  setFinalPayment: (value: number) => void;
  selectedMonths: number;
  setSelectedMonths: (value: number) => void;
  interestRate: number;
  setInterestRate: (value: number) => void;
  monthlyPayment: number;
  formatPrice: (price: number) => string;
}

export const FinancingCalculator: React.FC<FinancingCalculatorProps> = ({
  salePrice,
  downPayment,
  setDownPayment,
  finalPayment,
  setFinalPayment,
  selectedMonths,
  setSelectedMonths,
  interestRate,
  setInterestRate,
  monthlyPayment,
  formatPrice,
}) => (
  <div className="space-y-4">
    {/* Down Payment */}
    <div className="bg-gray-50 dark:bg-gray-700 rounded-xl p-4">
      <div className="flex justify-between items-center mb-3">
        <span className="font-bold text-base">{formatPrice(downPayment)}</span>
        <span className="text-sm font-medium">מקדמה</span>
      </div>
      <input
        type="range"
        min={0}
        max={salePrice * 0.5}
        step={1000}
        value={downPayment}
        onChange={(e) => setDownPayment(Number(e.target.value))}
        className="w-full h-4 bg-gray-300 dark:bg-gray-600 rounded-full appearance-none cursor-pointer"
      />
      <div className="flex justify-between text-xs mt-2 text-gray-500">
        <span>{formatPrice(salePrice * 0.5)}</span>
        <span>{formatPrice(0)}</span>
      </div>
    </div>
    {/* Final Payment */}
    <div className="bg-gray-50 dark:bg-gray-700 rounded-xl p-4">
      <div className="flex justify-between items-center mb-3">
        <span className="font-bold text-base">{formatPrice(finalPayment)}</span>
        <span className="text-sm font-medium">תשלום אחרון</span>
      </div>
      <input
        type="range"
        min={0}
        max={salePrice * 0.6}
        step={1000}
        value={finalPayment}
        onChange={(e) => setFinalPayment(Number(e.target.value))}
        className="w-full h-4 bg-gray-300 dark:bg-gray-600 rounded-full appearance-none cursor-pointer"
      />
      <div className="flex justify-between text-xs mt-2 text-gray-500">
        <span>{formatPrice(salePrice * 0.6)}</span>
        <span>{formatPrice(0)}</span>
      </div>
    </div>
    {/* Payment Period */}
    <div className="bg-gray-50 dark:bg-gray-700 rounded-xl p-4">
      <div className="flex justify-between items-center mb-3">
        <span className="font-bold text-base">{selectedMonths} חודשים</span>
        <span className="text-sm font-medium">תקופת תשלומים</span>
      </div>
      <div className="grid grid-cols-5 gap-2">
        {[12, 24, 36, 48, 60].map((month) => (
          <button
            key={month}
            onClick={() => setSelectedMonths(month)}
            className={`py-3 text-sm font-semibold rounded-lg transition-all active:scale-95 ${
              selectedMonths === month
                ? "bg-cyan-500 text-white shadow-lg"
                : "bg-gray-200 dark:bg-gray-600 text-gray-700 dark:text-gray-300"
            }`}
          >
            {month}
          </button>
        ))}
      </div>
    </div>
    {/* Interest Rate */}
    <div className="bg-gray-50 dark:bg-gray-700 rounded-xl p-4">
      <div className="flex justify-between items-center mb-3">
        <span className="font-bold text-base">
          {(interestRate * 100).toFixed(1)}%
        </span>
        <span className="text-sm font-medium">ריבית שנתית</span>
      </div>
      <input
        type="range"
        min={0.01}
        max={0.1}
        step={0.005}
        value={interestRate}
        onChange={(e) => setInterestRate(Number(e.target.value))}
        className="w-full h-4 bg-gray-300 dark:bg-gray-600 rounded-full appearance-none cursor-pointer"
      />
      <div className="flex justify-between text-xs mt-2 text-gray-500">
        <span>10%</span>
        <span>1%</span>
      </div>
    </div>
    {/* Monthly Payment Result */}
    <div className="text-center py-4 px-4 bg-gradient-to-r from-yellow-400 to-yellow-500 rounded-xl shadow-lg">
      <div className="text-2xl font-bold text-yellow-900 mb-1">
        {formatPrice(monthlyPayment)}
      </div>
      <div className="text-sm font-semibold text-yellow-800">תשלום חודשי</div>
    </div>
  </div>
);
