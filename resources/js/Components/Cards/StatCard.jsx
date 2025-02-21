const StatCard = ({
    title,
    value,
    icon,
    bgColor,
    txColor,
    txSize,
    valColor,
    children,
    desc,
}) => {
    return (
        <div
            className={`p-6 ${bgColor} rounded-lg shadow-md flex flex-col`}
            style={{
                transition: "all 0.3s ease-in-out",
            }}
            onMouseEnter={(e) => {
                e.target.style.transform = "scale(1.05)";
            }}
            onMouseLeave={(e) => {
                e.target.style.transform = "scale(1)";
            }}
        >
            <div className="flex items-center justify-between">
                <div className="flex items-center">
                    <div className="p-3 rounded-full bg-white shadow-md">
                        {icon}
                    </div>
                    <div className="ml-4">
                        <h3 className={`${txSize} font-semibold ${txColor}`}>
                            {title}
                        </h3>
                        <p className="text-[9px] text-gray-600">{desc}</p>
                        <p className={`text-2xl font-bold ${valColor}`}>
                            {value}
                        </p>
                    </div>
                </div>
            </div>
            <div className="flex justify-end">{children}</div>
        </div>
    );
};

export default StatCard;
