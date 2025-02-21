import React from "react";
import Chart from "react-apexcharts";

const EbossTypeBreakdown = ({ data }) => {
    // Defined color for each type of BOSS
    const colorMapping = {
        "Fully-Automated": "#28C76F",
        "Partly-Automated": "#7367F0",
        "Physical/Collocated BOSS": "#FF9F43",
        "No Collocated BOSS": "#FF4560",
    };
    // Extract labels and series values dynamically
    const labels = data.map((item) => item.type_of_eboss);
    const series = data.map((item) => item.count);
    // Get colors based on type of BOSS
    const colors = labels.map((label) => colorMapping[label] || "#CCCCCC");

    const options = {
        chart: { type: "donut"},
        labels: labels,
        colors: colors,
        title: { text: "Breakdown of eBOSS Types", align: "left" },
        legend: {
          position: 'bottom'
        }
    };

    return (
        <Chart options={options} series={series} type="donut" height={350} />
    );
};

export default EbossTypeBreakdown;
