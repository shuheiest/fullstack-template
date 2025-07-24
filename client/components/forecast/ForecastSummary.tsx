type MarketAnalysisData = {
  targetMarket: number;
  totalMaxCustomers: number;
};

type ForecastData = {
  totalCustomers: number;
  revenue: number;
  profit: number;
  cumulativeProfit: number;
  cumulativeCashFlow: number;
};

type ForecastSummaryProps = {
  breakEvenMonth: number | null;
  investmentRecoveryMonth: number | null;
  marketAnalysis: MarketAnalysisData;
  forecast: ForecastData[];
  initialInvestment: number;
};

export const ForecastSummary = ({
  breakEvenMonth,
  investmentRecoveryMonth,
  marketAnalysis,
  forecast,
  initialInvestment,
}: ForecastSummaryProps) => {
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('ja-JP', {
      style: 'currency',
      currency: 'JPY',
      maximumFractionDigits: 0,
    }).format(value);
  };

  const formatNumber = (value: number) => {
    return new Intl.NumberFormat('ja-JP').format(value);
  };

  const lastForecast = forecast.length > 0 ? forecast[forecast.length - 1] : null;

  return (
    <div className="bg-green-50 p-6 rounded-lg">
      <h2 className="text-xl font-semibold mb-4 text-gray-900">予測サマリー</h2>

      <div className="space-y-4">
        <div className="bg-white p-4 rounded-md shadow-sm">
          <h3 className="text-lg font-medium text-gray-900 mb-2">運営黒字化</h3>
          {breakEvenMonth ? (
            <p className="text-xl font-bold text-green-600">{breakEvenMonth}ヶ月目</p>
          ) : (
            <p className="text-xl font-bold text-red-600">予測期間内で黒字化せず</p>
          )}
        </div>

        <div className="bg-white p-4 rounded-md shadow-sm">
          <h3 className="text-lg font-medium text-gray-900 mb-2">投資回収</h3>
          {investmentRecoveryMonth ? (
            <div>
              <p className="text-xl font-bold text-blue-600">{investmentRecoveryMonth}ヶ月目</p>
              <p className="text-sm text-gray-700 mt-1">
                （{Math.round((investmentRecoveryMonth / 12) * 10) / 10}年目）
              </p>
            </div>
          ) : (
            <p className="text-xl font-bold text-red-600">予測期間内で回収不可</p>
          )}
        </div>

        {marketAnalysis.targetMarket && (
          <div className="bg-white p-4 rounded-md shadow-sm">
            <h3 className="text-sm font-medium text-gray-900 mb-2">市場分析</h3>
            <p className="text-gray-900">
              <span className="font-medium">ターゲット市場:</span>{' '}
              {formatNumber(marketAnalysis.targetMarket)}人
            </p>
            <p className="text-gray-900">
              <span className="font-medium">最大獲得可能顧客:</span>{' '}
              {formatNumber(marketAnalysis.totalMaxCustomers)}人
            </p>
          </div>
        )}

        <div className="bg-white p-4 rounded-md shadow-sm">
          <h3 className="text-sm font-medium text-gray-900 mb-2">投資効率</h3>
          <p className="text-gray-900">
            <span className="font-medium">初期投資額:</span> {formatCurrency(initialInvestment)}
          </p>
          {investmentRecoveryMonth && lastForecast && (
            <p className="text-gray-900">
              <span className="font-medium">投資利益率:</span>{' '}
              {Math.round((lastForecast.cumulativeCashFlow / initialInvestment) * 100)}%
            </p>
          )}
        </div>

        {lastForecast && (
          <>
            <div className="bg-white p-4 rounded-md shadow-sm">
              <h3 className="text-sm font-medium text-gray-900">最終月の指標</h3>
              <div className="mt-2 space-y-1 text-sm text-gray-900">
                <p>
                  <span className="font-medium">顧客数:</span>{' '}
                  {formatNumber(lastForecast.totalCustomers)}人
                </p>
                <p>
                  <span className="font-medium">月収:</span> {formatCurrency(lastForecast.revenue)}
                </p>
                <p>
                  <span className="font-medium">月利益:</span> {formatCurrency(lastForecast.profit)}
                </p>
              </div>
            </div>

            <div className="bg-white p-4 rounded-md shadow-sm">
              <h3 className="text-sm font-medium text-gray-900">累積実績</h3>
              <div className="mt-2 space-y-1 text-sm text-gray-900">
                <p>
                  <span className="font-medium">累積利益:</span>
                  <span
                    className={`font-bold ml-1 ${
                      lastForecast.cumulativeProfit > 0 ? 'text-green-600' : 'text-red-600'
                    }`}
                  >
                    {formatCurrency(lastForecast.cumulativeProfit)}
                  </span>
                </p>
                <p>
                  <span className="font-medium">投資回収後:</span>
                  <span
                    className={`font-bold ml-1 ${
                      lastForecast.cumulativeCashFlow > 0 ? 'text-blue-600' : 'text-red-600'
                    }`}
                  >
                    {formatCurrency(lastForecast.cumulativeCashFlow)}
                  </span>
                </p>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};
