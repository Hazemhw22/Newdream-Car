import React from "react";

interface SellerInfoCardProps {
  provider: string | { id?: any; name?: string };
}

export const SellerInfoCard: React.FC<SellerInfoCardProps> = ({ provider }) => {
  // إذا كان provider كائن (object)، استخرج الاسم، وإلا استخدم القيمة مباشرة
  const providerName =
    typeof provider === "object"
      ? provider.name || "יבואן רשמי"
      : provider || "יבואן רשמי";

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
      <h2 className="text-lg font-bold mb-4 text-right">פרטי המוכר</h2>
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-3">
          <div className="bg-cyan-100 text-cyan-800 px-3 py-2 rounded-xl text-sm font-bold">
            4.8 ★
          </div>
          <div className="text-sm text-gray-500">דירוג</div>
        </div>
        <div className="text-right">
          <div className="font-bold text-lg">{providerName}</div>
        </div>
      </div>
    </div>
  );
};
