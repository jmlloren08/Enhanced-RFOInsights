import React from "react";
import Chart from "react-apexcharts";

const CommendationTrends = ({ data }) => {
    // Define months in order
    const months = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
    ];
    // Initialize counts to zero for all months
    const commendationCounts = new Array(12).fill(0);
    // Fill in commendation counts from API
    data.forEach(({ month, count }) => {
        const index = months.indexOf(month); // Get the month index
        if (index !== -1) {
            commendationCounts[index] = count; // Assign count to the correct index
        }
    });
    const options = {
        chart: {
            id: "commendation-trends",
            toolbar: { show: false },
        },
        xaxis: {
            categories: months.map((month) => month.slice(0, 3)), // Convert full month names to short format
        },
        stroke: {
            curve: "smooth",
        },
        colors: ["#28C76F"], // Green for commendations
        title: {
            text: "Commendation Trends Over Time",
            align: "left",
        },
    };

    const series = [
        {
            name: "Commendations",
            data: commendationCounts,
        },
    ];

    return (
        <>
            <Chart options={options} series={series} type="line" height={350} />
        </>
    );
};

export default CommendationTrends;
