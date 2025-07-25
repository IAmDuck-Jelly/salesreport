import React, { useState, useEffect } from 'react';
import { supabase } from '@/services/supabaseClient';

interface SalesDataPoint {
  date: string;
  count: number;
}

const SalesChart: React.FC = () => {
  const [salesData, setSalesData] = useState<SalesDataPoint[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchSalesData = async () => {
      try {
        // Fetch sales activities grouped by date
        const { data, error } = await supabase
          .from('sales_daily_activities')
          .select('activity_date')
          .order('activity_date', { ascending: true });

        if (error) {
          throw new Error(error.message);
        }

        // Group data by date and count activities per date
        const groupedData: Record<string, number> = {};
        data?.forEach(activity => {
          const date = activity.activity_date;
          groupedData[date] = (groupedData[date] || 0) + 1;
        });

        // Convert to array format
        const chartData: SalesDataPoint[] = Object.entries(groupedData)
          .map(([date, count]) => ({ date, count }))
          .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

        setSalesData(chartData);
        setLoading(false);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An unknown error occurred');
        setLoading(false);
      }
    };

    fetchSalesData();
  }, []);

  if (loading) {
    return <div className="sales-chart">Loading chart data...</div>;
  }

  if (error) {
    return <div className="sales-chart">Error: {error}</div>;
  }

  // Simple bar chart implementation
  const maxValue = Math.max(...salesData.map(d => d.count), 0);
  const chartHeight = 200;
  const barWidth = 30;
  const gap = 10;

  return (
    <div className="sales-chart">
      <h2>Sales Activities Over Time</h2>
      <div className="chart-container">
        <svg width="100%" height={chartHeight + 50}>
          {/* Y-axis labels */}
          <text x="0" y="10" fontSize="10">Count</text>
          <text x="0" y={chartHeight / 2 + 10} fontSize="10">{Math.round(maxValue / 2)}</text>
          <text x="0" y={chartHeight + 10} fontSize="10">0</text>
          
          {/* Bars */}
          {salesData.map((dataPoint, index) => {
            const barHeight = maxValue > 0 ? (dataPoint.count / maxValue) * chartHeight : 0;
            const x = index * (barWidth + gap) + 50;
            const y = chartHeight - barHeight;
            
            return (
              <g key={dataPoint.date}>
                <rect
                  x={x}
                  y={y}
                  width={barWidth}
                  height={barHeight}
                  fill="#4f46e5"
                />
                <text
                  x={x + barWidth / 2}
                  y={chartHeight + 20}
                  fontSize="10"
                  textAnchor="middle"
                >
                  {new Date(dataPoint.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                </text>
                <text
                  x={x + barWidth / 2}
                  y={y - 5}
                  fontSize="10"
                  textAnchor="middle"
                >
                  {dataPoint.count}
                </text>
              </g>
            );
          })}
        </svg>
      </div>
    </div>
  );
};

export default SalesChart;
