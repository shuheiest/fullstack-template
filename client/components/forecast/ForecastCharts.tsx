import { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell } from 'recharts';

type SegmentData = {
  name: string;
  value: number;
  maxCustomers: number;
  color: string;
};

type ForecastDataPoint = {
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

type ForecastChartsProps = {
  pieData: SegmentData[];
  forecast: ForecastDataPoint[];
  investmentRecoveryMonth: number | null;
  initialInvestment: number;
};

export const ForecastCharts = ({ 
  pieData, 
  forecast, 
  investmentRecoveryMonth, 
  initialInvestment 
}: ForecastChartsProps) => {
  const [currencyUnit, setCurrencyUnit] = useState<'万円' | '百万円' | '円'>('百万円');
  
  const convertValue = (value: number) => {
    switch (currencyUnit) {
      case '万円':
        return value / 10000;
      case '百万円':
        return value / 1000000;
      case '円':
        return value;
      default:
        return value;
    }
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('ja-JP', {
      style: 'currency',
      currency: 'JPY',
      maximumFractionDigits: 0
    }).format(value);
  };

  const formatNumber = (value: number) => {
    return new Intl.NumberFormat('ja-JP').format(value);
  };

  const formatAxisValue = (value: number | undefined) => {
    if (value === undefined) return '';
    const converted = convertValue(value);
    if (currencyUnit === '百万円') {
      return `${converted.toFixed(1)}百万`;
    } else if (currencyUnit === '万円') {
      return `${converted.toFixed(0)}万`;
    } else {
      // 円の場合、大きな数字は省略表記
      if (value >= 1000000) {
        return `${(value / 1000000).toFixed(0)}百万`;
      } else if (value >= 10000) {
        return `${(value / 10000).toFixed(0)}万`;
      } else {
        return `${value.toLocaleString()}`;
      }
    }
  };

  return (
    <>
      {/* 市場セグメント分析 */}
      {pieData.length > 0 && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <h2 className="text-xl font-semibold mb-4 text-gray-900">市場セグメント分布</h2>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                  label={({name, value}) => `${name}: ${formatNumber(value)}`}
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => formatNumber(value as number)} />
              </PieChart>
            </ResponsiveContainer>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <h2 className="text-xl font-semibold mb-4 text-gray-900">獲得可能顧客数</h2>
            <div className="space-y-3">
              {pieData.map((segment, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded">
                  <div className="flex items-center">
                    <div 
                      className="w-4 h-4 rounded mr-3" 
                      style={{backgroundColor: segment.color}}
                    ></div>
                    <span className="font-medium text-gray-900">{segment.name}</span>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-gray-900">{formatNumber(segment.maxCustomers)}人</p>
                    <p className="text-sm text-gray-700">（{formatNumber(segment.value)}人中）</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
      
      {/* グラフセクション */}
      {forecast.length > 0 && (
        <div className="space-y-8">
          {/* 単位選択コントロール */}
          <div className="flex items-center justify-end">
            <span className="text-sm font-medium text-gray-900 mr-3">表示単位:</span>
            <div className="flex bg-gray-100 rounded-lg p-1">
              {(['円', '万円', '百万円'] as const).map((unit) => (
                <button
                  key={unit}
                  onClick={() => setCurrencyUnit(unit)}
                  className={`px-3 py-1 text-sm rounded transition-colors ${
                    currencyUnit === unit
                      ? 'bg-blue-500 text-white'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  {unit}
                </button>
              ))}
            </div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <h2 className="text-xl font-semibold mb-4 text-gray-900">累積キャッシュフロー推移（投資回収分析）</h2>
            <ResponsiveContainer width="100%" height={400}>
              <LineChart data={forecast} margin={{ left: 40, right: 20, top: 20, bottom: 20 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis tickFormatter={formatAxisValue} width={100} />
                <Tooltip formatter={(value) => formatCurrency(value as number)} />
                <Legend />
                <Line 
                  type="monotone" 
                  dataKey="cumulativeProfit" 
                  stroke="#10B981" 
                  name="累積利益" 
                  strokeWidth={2} 
                />
                <Line 
                  type="monotone" 
                  dataKey="cumulativeCashFlow" 
                  stroke="#3B82F6" 
                  name="投資回収後キャッシュフロー" 
                  strokeWidth={3} 
                />
                <Line 
                  type="monotone" 
                  dataKey={() => 0} 
                  stroke="#6B7280" 
                  strokeDasharray="5 5" 
                  name="損益分岐点"
                  dot={false}
                />
              </LineChart>
            </ResponsiveContainer>
            {investmentRecoveryMonth && (
              <div className="mt-4 p-3 bg-blue-50 rounded-lg">
                <p className="text-sm text-blue-800">
                  <strong>投資回収:</strong> {investmentRecoveryMonth}ヶ月目（{Math.round(investmentRecoveryMonth / 12 * 10) / 10}年目）で初期投資{formatCurrency(initialInvestment)}を回収
                </p>
              </div>
            )}
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <h2 className="text-xl font-semibold mb-4 text-gray-900">収益・コスト・損益推移</h2>
            <ResponsiveContainer width="100%" height={400}>
              <LineChart data={forecast} margin={{ left: 40, right: 20, top: 20, bottom: 20 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis tickFormatter={formatAxisValue} width={100} />
                <Tooltip formatter={(value) => formatCurrency(value as number)} />
                <Legend />
                <Line type="monotone" dataKey="revenue" stroke="#3B82F6" name="売上" strokeWidth={2} />
                <Line type="monotone" dataKey="totalCosts" stroke="#EF4444" name="総コスト" strokeWidth={2} />
                <Line type="monotone" dataKey="profit" stroke="#10B981" name="月次利益" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <h2 className="text-xl font-semibold mb-4 text-gray-900">セグメント別顧客獲得推移</h2>
            <ResponsiveContainer width="100%" height={400}>
              <LineChart data={forecast} margin={{ left: 40, right: 20, top: 20, bottom: 20 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis width={80} />
                <Tooltip />
                <Line type="monotone" dataKey="innovators" stroke="#8B5CF6" name="イノベーター" strokeWidth={2} />
                <Line type="monotone" dataKey="earlyAdopters" stroke="#3B82F6" name="アーリーアダプター" strokeWidth={2} />
                <Line type="monotone" dataKey="earlyMajority" stroke="#10B981" name="アーリーマジョリティ" strokeWidth={2} />
                <Line type="monotone" dataKey="lateMajority" stroke="#F59E0B" name="レイトマジョリティ" strokeWidth={2} />
                <Line type="monotone" dataKey="laggards" stroke="#EF4444" name="ラガード" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
            {/* カスタム凡例 */}
            <div className="flex flex-wrap gap-4 mt-4 justify-center">
              {[
                { name: 'イノベーター', color: '#8B5CF6' },
                { name: 'アーリーアダプター', color: '#3B82F6' },
                { name: 'アーリーマジョリティ', color: '#10B981' },
                { name: 'レイトマジョリティ', color: '#F59E0B' },
                { name: 'ラガード', color: '#EF4444' }
              ].map((segment) => (
                <div key={segment.name} className="flex items-center">
                  <div 
                    className="w-3 h-0.5 mr-2" 
                    style={{ backgroundColor: segment.color }}
                  ></div>
                  <span className="text-sm text-gray-700">{segment.name}</span>
                </div>
              ))}
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <h2 className="text-xl font-semibold mb-4 text-gray-900">投資回収期間比較</h2>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={forecast.filter((_, index) => index % 6 === 0)} margin={{ left: 40, right: 20, top: 20, bottom: 20 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis tickFormatter={formatAxisValue} width={100} />
                <Tooltip formatter={(value) => formatCurrency(value as number)} />
                <Legend />
                <Bar dataKey="cumulativeCashFlow" fill="#3B82F6" name="投資回収後キャッシュフロー" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}
      
      <div className="mt-8 p-4 bg-yellow-50 rounded-lg border border-yellow-200">
        <h3 className="text-sm font-medium text-yellow-800 mb-2">投資回収分析について</h3>
        <p className="text-sm text-yellow-700 mb-2">
          <strong>運営黒字化:</strong> 月次の収益が月次コストを上回る時点（初期投資は除く）<br/>
          <strong>投資回収:</strong> 累積利益が初期投資額を上回り、実際にキャッシュがプラスになる時点
        </p>
        <p className="text-sm text-yellow-700">
          イノベーター理論に基づく段階的な市場浸透により、現実的な成長カーブと投資回収期間を予測します。
          各セグメントの参入タイミングと浸透率を調整することで、様々なシナリオを検証できます。
        </p>
      </div>
    </>
  );
};