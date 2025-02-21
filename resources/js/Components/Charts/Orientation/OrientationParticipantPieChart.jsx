import React from "react";
import Chart from "react-apexcharts";

const OrientationParticipationChart = ({ data }) => {
    const participantTypes = {};

    data.forEach((item) => {
        const participantsArray = Array.isArray(item.type_of_participants)
            ? item.type_of_participants
            : [item.type_of_participants];

        participantsArray.forEach((type) => {
            if (participantTypes[type]) {
                participantTypes[type] += item.total_number_of_participants;
            } else {
                participantTypes[type] = item.total_number_of_participants;
            }
        });
    });

    const participantLabels = Object.keys(participantTypes);
    const series = Object.values(participantTypes);
    const dynamicColors = generateColors(participantLabels.length);

    const options = {
        chart: { type: "pie" },
        labels: participantLabels,
        colors: dynamicColors,
        title: { text: "Breakdown of Orientation Participants", align: "left" },
        legend: {
            position: "bottom",
        },
    };

    return <Chart options={options} series={series} type="pie" height={350} />;
};

// Function to dynamically generate distinct colors
const generateColors = (count) => {
    return Array.from(
        { length: count },
        (_, i) => `hsl(${(i * 360) / count}, 70%, 50%)`
    );
};

export default OrientationParticipationChart;
