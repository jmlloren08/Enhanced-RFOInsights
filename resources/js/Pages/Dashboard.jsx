import StatCard from "@/Components/Cards/StatCard";
import CommendationTrends from "@/Components/Charts/Commendation/CommendationTrends";
import EbossTypeBreakdown from "@/Components/Charts/Eboss/EbossTypeBreakdown";
import InspectionOutcomesChart from "@/Components/Charts/Inspection/InspectionOutcomeChart";
import OrientationParticipationChart from "@/Components/Charts/Orientation/OrientationParticipantPieChart";
import ViewAll from "@/Components/Links/ViewAll";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import { useEffect, useState } from "react";
import {
    FaAward,
    FaChartLine,
    FaClipboardCheck,
    FaUsers,
} from "react-icons/fa";

const Dashboard = ({
    totalEboss,
    totalCommendation,
    totalInspection,
    totalOrientation,
    typeOfBoss,
    commendations,
    inspections,
    orientations,
}) => {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (
            totalEboss ||
            totalCommendation ||
            totalInspection ||
            totalOrientation
        ) {
            setLoading(false);
        }
    }, [totalEboss, totalCommendation, totalInspection, totalOrientation]);

    return (
        <AuthenticatedLayout header="Overall Dashboard">
            <Head title="Dashboard" />
            {loading ? (
                <div className="flex items-center justify-center space-x-2">
                    <div className="w-4 h-4 rounded-full animate-pulse bg-violet-400"></div>
                    <div className="w-4 h-4 rounded-full animate-pulse bg-violet-400"></div>
                    <div className="w-4 h-4 rounded-full animate-pulse bg-violet-400"></div>
                </div>
            ) : (
                <div className="py-6">
                    <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
                            {/* eBOSS Stats */}
                            <StatCard
                                title={"eBOSS"}
                                desc={
                                    "(Total Inspections, 100% Compliant LGUs)"
                                }
                                value={totalEboss}
                                icon={<FaChartLine className="text-blue-500" />}
                                children={
                                    <ViewAll link={route("eboss.index")} />
                                }
                                txSize='text-lg'
                            />
                            {/* Commendation Stats */}
                            <StatCard
                                title={"Commendations"}
                                desc={"(Recognized LGUs for Full Automation)"}
                                value={totalCommendation}
                                icon={<FaAward className="text-blue-500" />}
                                children={
                                    <ViewAll
                                        link={route("commendation.index")}
                                    />
                                }
                                txSize='text-lg'
                            />
                            {/* Inspection Stats */}
                            <StatCard
                                title={"Inspections"}
                                desc={"(Citizen Charter Compliance Checks)"}
                                value={totalInspection}
                                icon={
                                    <FaClipboardCheck className="text-blue-500" />
                                }
                                children={
                                    <ViewAll link={route("inspection.index")} />
                                }
                                txSize='text-lg'
                            />
                            {/* Orientation Stats */}
                            <StatCard
                                title={"Orientations"}
                                desc={"(RA 11032 Training Sessions Conducted)"}
                                value={totalOrientation}
                                icon={<FaUsers className="text-blue-500" />}
                                children={
                                    <ViewAll
                                        link={route("orientation.index")}
                                    />
                                }
                                txSize='text-lg'
                            />
                        </div>
                    </div>
                    <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                        <div className="mt-6 grid grid-cols-12 gap-6">
                            <div className="col-span-12 sm:col-span-4 p-6 rounded-lg shadow-md flex flex-col">
                                <EbossTypeBreakdown data={typeOfBoss} />
                            </div>
                            <div className="col-span-12 sm:col-span-8 p-6 rounded-lg shadow-md">
                                <CommendationTrends data={commendations} />
                            </div>
                        </div>
                    </div>
                    <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                        <div className="mt-6 grid grid-cols-12 gap-6">
                            <div className="col-span-12 sm:col-span-8 p-6 rounded-lg shadow-md">
                                <InspectionOutcomesChart data={inspections} />
                            </div>
                            <div className="col-span-12 sm:col-span-4 p-6 rounded-lg shadow-md flex flex-col">
                                <OrientationParticipationChart
                                    data={orientations}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </AuthenticatedLayout>
    );
};

export default Dashboard;
