// CategoryPieChart.tsx

import React from "react";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { FinancialRecord } from "../../context/financial-record-context";

ChartJS.register(ArcElement, Tooltip, Legend);

interface CategoryPieChartProps {
  records: FinancialRecord[];
}

const CategoryPieChart: React.FC<CategoryPieChartProps> = ({ records }) => {
  const getChartData = () => {
    const categoryTotals = records.reduce((acc:{[key: string]: number}, record) => {
      acc[record.category] = (acc[record.category] || 0) + record.amount;
      return acc;
    }, {});

    return {
      labels: Object.keys(categoryTotals),
      datasets: [
        {
          data: Object.values(categoryTotals),
          backgroundColor: [
            "#FF6384", // Customize colors as needed
            "#36A2EB",
            "#FFCE56",
            "#4BC0C0",
            "#9966FF",
          ],
        },
      ],
    };
  };

  return (
    <div className="mt-8">
      <h2 className="text-xl font-semibold text-center mb-4">Category Breakdown</h2>
      <div style={{ width: "300px", height: "300px", margin: "0 auto" }}>
      <Pie data={getChartData()} />
    </div>
    </div>
  );
};

export default CategoryPieChart;
