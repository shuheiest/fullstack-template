'use client';

import { useState } from 'react';
import { DashboardHeader } from '../../components/dashboard/DashboardHeader';
import { Sidebar } from '../../components/dashboard/Sidebar';
import { ForecastCharts } from '../../components/forecast/ForecastCharts';
import { ForecastInputs } from '../../components/forecast/ForecastInputs';
import { ForecastSummary } from '../../components/forecast/ForecastSummary';
import type { ForecastInputsData } from '../../utils/forecastCalculator';
import { calculateForecast } from '../../utils/forecastCalculator';

export default function Dashboard() {
  const [inputs, setInputs] = useState<ForecastInputsData>({
    totalMarketSize: 1000000,
    targetSegmentRatio: 20,
    innovatorPenetration: 80,
    earlyAdopterPenetration: 60,
    earlyMajorityPenetration: 40,
    lateMajorityPenetration: 25,
    laggardPenetration: 15,
    initialPrice: 5000,
    churnRate: 5,
    cac: 8000,
    fixedCosts: 2000000,
    variableCostRate: 20,
    forecastMonths: 60,
    initialInvestment: 10000000,
  });

  const handleInputChange = (key: keyof ForecastInputsData, value: string) => {
    const numValue = parseFloat(value) || 0;
    setInputs((prev) => ({ ...prev, [key]: numValue }));
  };

  const { forecast, pieData, breakEvenMonth, investmentRecoveryMonth, marketAnalysis } =
    calculateForecast(inputs);

  const renderContent = () => {
    return (
      <div className="p-8 bg-white">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">収益予測ツール</h1>
        
        <ForecastInputs inputs={inputs} onInputChange={handleInputChange} />
        
        <ForecastSummary
          breakEvenMonth={breakEvenMonth}
          investmentRecoveryMonth={investmentRecoveryMonth}
          marketAnalysis={marketAnalysis}
          forecast={forecast}
          initialInvestment={inputs.initialInvestment}
        />

        <div className="mt-8">
          <ForecastCharts
            pieData={pieData}
            forecast={forecast}
            investmentRecoveryMonth={investmentRecoveryMonth}
            initialInvestment={inputs.initialInvestment}
          />
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <Sidebar activeItem="forecast" onItemSelect={() => {}} />
      
      <div className="flex-1 flex flex-col">
        <DashboardHeader />
        
        <main className="flex-1 overflow-auto">
          {renderContent()}
        </main>
      </div>
    </div>
  );
}
