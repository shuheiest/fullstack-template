type ForecastInputsData = {
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

type ForecastInputsProps = {
  inputs: ForecastInputsData;
  onInputChange: (key: keyof ForecastInputsData, value: string) => void;
};

export const ForecastInputs = ({ inputs, onInputChange }: ForecastInputsProps) => {
  return (
    <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 mb-8">
      {/* 市場分析入力 */}
      <div className="bg-purple-50 p-6 rounded-lg">
        <h2 className="text-xl font-semibold mb-4 text-gray-900">市場分析</h2>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-800 mb-1">
              全体市場規模（人）
            </label>
            <input
              type="number"
              value={inputs.totalMarketSize}
              onChange={(e) => onInputChange('totalMarketSize', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-800 mb-1">
              ターゲットセグメント割合（%）
            </label>
            <input
              type="number"
              value={inputs.targetSegmentRatio}
              onChange={(e) => onInputChange('targetSegmentRatio', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500"
            />
          </div>
          
          <div className="border-t pt-4">
            <h3 className="text-md font-medium text-gray-900 mb-3">浸透率設定（%）</h3>
            
            <div className="space-y-2">
              {[
                { key: 'innovatorPenetration' as const, label: 'イノベーター' },
                { key: 'earlyAdopterPenetration' as const, label: 'アーリーアダプター' },
                { key: 'earlyMajorityPenetration' as const, label: 'アーリーマジョリティ' },
                { key: 'lateMajorityPenetration' as const, label: 'レイトマジョリティ' },
                { key: 'laggardPenetration' as const, label: 'ラガード' }
              ].map(({ key, label }) => (
                <div key={key}>
                  <label className="block text-xs text-gray-800">{label}</label>
                  <input
                    type="number"
                    value={inputs[key]}
                    onChange={(e) => onInputChange(key, e.target.value)}
                    className="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:ring-1 focus:ring-purple-500"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      
      {/* ビジネスモデル入力 */}
      <div className="bg-blue-50 p-6 rounded-lg">
        <h2 className="text-xl font-semibold mb-4 text-gray-900">ビジネスモデル</h2>
        
        <div className="space-y-4">
          {[
            { key: 'initialPrice' as const, label: '商品・サービス価格（月額）' },
            { key: 'churnRate' as const, label: '解約率（%）' },
            { key: 'cac' as const, label: '顧客獲得コスト（CAC）' },
            { key: 'fixedCosts' as const, label: '月間固定費' },
            { key: 'variableCostRate' as const, label: '変動費率（%）' },
            { key: 'forecastMonths' as const, label: '予測期間（月）' },
            { key: 'initialInvestment' as const, label: '初期投資額' }
          ].map(({ key, label }) => (
            <div key={key}>
              <label className="block text-sm font-medium text-gray-800 mb-1">
                {label}
              </label>
              <input
                type="number"
                value={inputs[key]}
                onChange={(e) => onInputChange(key, e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                {...(key === 'forecastMonths' && { min: "12", max: "120" })}
                {...(key === 'initialInvestment' && { placeholder: "5000000" })}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};