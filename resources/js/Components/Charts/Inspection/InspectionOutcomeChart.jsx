import React from "react";
import Chart from "react-apexcharts";

const InspectionOutcomesChart = ({ inspections }) => {
    const groupedData = inspections.reduce((acc, inspection) => {
        const office = inspection.regions.name;
        if (!acc[office]) {
            acc[office] = {
                fully_compliant: 0,
                with_findings: 0,
                non_compliant: 0,
            };
        }
        if (inspection.compliance_rating === "Fully Compliant")
            acc[office].fully_compliant++;
        if (inspection.compliance_rating === "Needs Improvement")
            acc[office].with_findings++;
        if (inspection.compliance_rating === "Non-Compliant")
            acc[office].non_compliant++;
        return acc;
    }, {});

    // Extract categories (LGU Offices)
    const categories = Object.keys(groupedData);

    // Prepare series data
    const chartSeries = [
        {
            name: "Fully Compliant ✅",
            data: categories.map(
                (office) => groupedData[office].fully_compliant
            ),
        },
        {
            name: "With Findings ⚠️",
            data: categories.map((office) => groupedData[office].with_findings),
        },
        {
            name: "Non-Compliant ❌",
            data: categories.map((office) => groupedData[office].non_compliant),
        },
    ];

    const chartOptions = {
        chart: {
            type: "bar",
            stacked: true,
            toolbar: { show: false },
        },
        plotOptions: {
            bar: { horizontal: false, columnWidth: "60%" },
        },
        xaxis: {
            categories,
            title: { text: "Region" },
        },
        yaxis: {
            title: { text: "Number of Inspections" },
        },
        legend: { position: "top" },
        fill: { opacity: 1 },
        colors: ["#28a745", "#ffc107", "#dc3545"], // ✅⚠️❌ colors
        tooltip: {
            y: { formatter: (val) => `${val} Inspections` },
        },
    };

    return (
        <div>
            <h3 className="text-lg font-bold mb-2">Inspection Outcomes</h3>
            <Chart
                options={chartOptions}
                series={chartSeries}
                type="bar"
                height={350}
            />
        </div>
    );
};

export default InspectionOutcomesChart;
