export type ForecastInputsData = {
  totalMarketSize: number;
  targetSegmentRatio: number;
  innovatorPenetration: number;
  earlyAdopterPenetration: number;
  earlyMajorityPenetration: number;
  lateMajorityPenetration: number;
  laggardPenetration: number;
  initialPrice: number;
  churnRate: number;
  cac: number;
  fixedCosts: number;
  variableCostRate: number;
  forecastMonths: number;
  initialInvestment: number;
};

export type SegmentData = {
  name: string;
  value: number;
  maxCustomers: number;
  color: string;
};

export type ForecastDataPoint = {
  month: string;
  monthNumber: number;
  totalCustomers: number;
  newCustomers: number;
  revenue: number;
  totalCosts: number;
  profit: number;
  cumulativeProfit: number;
  cumulativeCashFlow: number;
  innovators: number;
  earlyAdopters: number;
  earlyMajority: number;
  lateMajority: number;
  laggards: number;
};

export type ForecastResult = {
  forecast: ForecastDataPoint[];
  pieData: SegmentData[];
  breakEvenMonth: number | null;
  investmentRecoveryMonth: number | null;
  marketAnalysis: {
    targetMarket: number;
    totalMaxCustomers: number;
  };
};

export const calculateForecast = (inputs: ForecastInputsData): ForecastResult => {
  const targetMarket = Math.round(inputs.totalMarketSize * (inputs.targetSegmentRatio / 100));
  
  const segmentSizes = {
    innovators: Math.round(targetMarket * 0.025),
    earlyAdopters: Math.round(targetMarket * 0.135),
    earlyMajority: Math.round(targetMarket * 0.34),
    lateMajority: Math.round(targetMarket * 0.34),
    laggards: Math.round(targetMarket * 0.16)
  };

  const segmentMaxCustomers = {
    innovators: Math.round(segmentSizes.innovators * (inputs.innovatorPenetration / 100)),
    earlyAdopters: Math.round(segmentSizes.earlyAdopters * (inputs.earlyAdopterPenetration / 100)),
    earlyMajority: Math.round(segmentSizes.earlyMajority * (inputs.earlyMajorityPenetration / 100)),
    lateMajority: Math.round(segmentSizes.lateMajority * (inputs.lateMajorityPenetration / 100)),
    laggards: Math.round(segmentSizes.laggards * (inputs.laggardPenetration / 100))
  };

  const pieData: SegmentData[] = [
    { name: 'イノベーター', value: segmentSizes.innovators, maxCustomers: segmentMaxCustomers.innovators, color: '#8B5CF6' },
    { name: 'アーリーアダプター', value: segmentSizes.earlyAdopters, maxCustomers: segmentMaxCustomers.earlyAdopters, color: '#3B82F6' },
    { name: 'アーリーマジョリティ', value: segmentSizes.earlyMajority, maxCustomers: segmentMaxCustomers.earlyMajority, color: '#10B981' },
    { name: 'レイトマジョリティ', value: segmentSizes.lateMajority, maxCustomers: segmentMaxCustomers.lateMajority, color: '#F59E0B' },
    { name: 'ラガード', value: segmentSizes.laggards, maxCustomers: segmentMaxCustomers.laggards, color: '#EF4444' }
  ];

  const segmentTimings = new Map([
    ['innovators', 1],
    ['earlyAdopters', 6], 
    ['earlyMajority', 18],
    ['lateMajority', 36],
    ['laggards', 48]
  ]);

  const segmentGrowthRates = new Map([
    ['innovators', 0.15],
    ['earlyAdopters', 0.12],
    ['earlyMajority', 0.08],
    ['lateMajority', 0.05],
    ['laggards', 0.03]
  ]);

  const monthsRange = [...Array(inputs.forecastMonths)].map((_, i) => i + 1);
  
  const forecastWithoutCumulative: Omit<ForecastDataPoint, 'cumulativeProfit' | 'cumulativeCashFlow'>[] = [];
  
  monthsRange.forEach((month, monthIndex) => {
    const segmentCustomers = Array.from(segmentTimings.entries()).reduce((acc, [segment, startMonth]) => {
      const key = segment as keyof typeof segmentMaxCustomers;
      if (month >= startMonth) {
        const maxForSegment = segmentMaxCustomers[key];
        const growthRate = segmentGrowthRates.get(segment) ?? 0;
        const monthsActive = month - startMonth + 1;
        const potentialNew = Math.round(maxForSegment * (1 - Math.exp(-growthRate * monthsActive / 12)));
        acc[key] = Math.min(potentialNew, maxForSegment);
      } else {
        acc[key] = 0;
      }
      return acc;
    }, {} as Record<keyof typeof segmentMaxCustomers, number>);

    const totalCustomers = Object.values(segmentCustomers).reduce((sum, val) => sum + val, 0);
    const churnedCustomers = Math.round(totalCustomers * (inputs.churnRate / 100));
    const netCustomers = Math.max(0, totalCustomers - churnedCustomers);

    const revenue = netCustomers * inputs.initialPrice;
    const variableCosts = revenue * (inputs.variableCostRate / 100);
    const previousCustomers: number = monthIndex > 0 ? (forecastWithoutCumulative[monthIndex - 1]?.totalCustomers ?? 0) : 0;
    const acquisitionCosts = Math.max(0, totalCustomers - previousCustomers) * inputs.cac;
    const totalCosts = inputs.fixedCosts + variableCosts + acquisitionCosts;
    const profit = revenue - totalCosts;

    forecastWithoutCumulative.push({
      month: `${month}ヶ月目`,
      monthNumber: month,
      totalCustomers: netCustomers,
      newCustomers: Math.max(0, totalCustomers - previousCustomers),
      revenue,
      totalCosts,
      profit,
      innovators: segmentCustomers.innovators,
      earlyAdopters: segmentCustomers.earlyAdopters,
      earlyMajority: segmentCustomers.earlyMajority,
      lateMajority: segmentCustomers.lateMajority,
      laggards: segmentCustomers.laggards
    });
  });

  const forecast: ForecastDataPoint[] = forecastWithoutCumulative.map((current, index) => {
    const cumulativeProfit = forecastWithoutCumulative
      .slice(0, index + 1)
      .reduce((sum: number, item) => sum + item.profit, 0) - inputs.initialInvestment;
    
    return {
      ...current,
      cumulativeProfit,
      cumulativeCashFlow: cumulativeProfit + inputs.initialInvestment
    };
  });

  const breakEvenMonth = forecast.findIndex((f: ForecastDataPoint) => f.profit > 0) + 1 || null;
  const investmentRecoveryMonth = forecast.findIndex((f: ForecastDataPoint) => f.cumulativeCashFlow > 0) + 1 || null;

  return { 
    forecast, 
    pieData, 
    breakEvenMonth, 
    investmentRecoveryMonth,
    marketAnalysis: {
      targetMarket,
      totalMaxCustomers: Object.values(segmentMaxCustomers).reduce((sum, val) => sum + val, 0)
    }
  };
};