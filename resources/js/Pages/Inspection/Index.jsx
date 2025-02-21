import { Head, Link, usePage } from "@inertiajs/react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { useEffect, useState } from "react";
import { EyeIcon } from "@heroicons/react/16/solid";
import InspectionOutcomesChart from "@/Components/Charts/Inspection/InspectionOutcomeChart";

const Index = ({ inspection, inspectionBarChart }) => {
    const { flash } = usePage().props;
    const [flashMessage, setFlashMessage] = useState(null);

    useEffect(() => {
        if (flash.success) {
            setFlashMessage(flash.success);
        }
        setTimeout(() => setFlashMessage(null), 3000);
    }, [flash]);

    return (
        <AuthenticatedLayout
            header="Inspection Dashboard"
            buttonText="Create"
            buttonRoute={route("inspection.create")}
        >
            <Head title="Inspection" />
            <div className="mx-auto max-w-7xl sm:px-6 lg:px-8 p-6">
                <div className="text-sm grid grid-cols-1">
                    <InspectionOutcomesChart data={inspectionBarChart} />
                </div>
                {/* Flash message */}
                {flashMessage && (
                    <div className="my-4 p-4 text-green-600 bg-green-100 border border-green-400">
                        {flashMessage}
                    </div>
                )}
                <div className="mt-6 rounded bg-white shadow p-6">
                    {inspection.data.length > 0 ? (
                        <>
                            <div className="overflow-x-auto relative">
                                <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                        <tr>
                                            <th
                                                scope="col"
                                                className="px-6 py-3"
                                            >
                                                Date of Inspection
                                            </th>
                                            <th
                                                scope="col"
                                                className="px-6 py-3"
                                            >
                                                Region
                                            </th>
                                            <th
                                                scope="col"
                                                className="px-6 py-3"
                                            >
                                                State / Province
                                            </th>
                                            <th
                                                scope="col"
                                                className="px-6 py-3"
                                            >
                                                City / Municipality
                                            </th>
                                            <th
                                                scope="col"
                                                className="px-6 py-3"
                                            >
                                                Department/Office Inspected
                                            </th>
                                            <th
                                                scope="col"
                                                className="px-6 py-3"
                                            >
                                                Compliance Rating
                                            </th>
                                            <th
                                                scope="col"
                                                className="px-6 py-3"
                                            ></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {inspection.data.map((ins, index) => (
                                            <tr
                                                key={index}
                                                className="hover:bg-gray-100 dark:hover:bg-gray-600"
                                            >
                                                <td className="px-6 py-4">
                                                    {ins.date_of_inspection}
                                                </td>
                                                <td className="px-6 py-4">
                                                    {ins.regions.name}
                                                </td>
                                                <td className="px-6 py-4">
                                                    {ins.provinces.name}
                                                </td>
                                                <td className="px-6 py-4">
                                                    {ins.cities.name}
                                                </td>
                                                <td className="px-6 py-4">
                                                    {
                                                        ins.department_office_inspected
                                                    }
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <span
                                                        className={`${
                                                            ins.compliance_rating ===
                                                            "Fully Compliant"
                                                                ? "bg-green-500"
                                                                : ins.compliance_rating ===
                                                                  "Needs Improvement"
                                                                ? "bg-yellow-500"
                                                                : ins.compliance_rating ===
                                                                  "Non-Compliant"
                                                                ? "bg-red-500"
                                                                : "bg-gray-500"
                                                        } py-1 px-2 rounded-full text-white text-xs`}
                                                    >
                                                        {ins.compliance_rating}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <Link
                                                        href={route(
                                                            "inspection.show",
                                                            ins.id
                                                        )}
                                                        title="More Info"
                                                    >
                                                        <EyeIcon
                                                            aria-hidden="true"
                                                            className="size-6 hover:text-blue-600"
                                                        />
                                                    </Link>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                            <div className="rounded-b-lg border-t border-gray-200 px-4 py-2">
                                <ol className="flex justify-end gap-1 text-xs font-medium">
                                    {inspection.links.map((link, index) => (
                                        <li key={index}>
                                            {link.url ? (
                                                <Link
                                                    href={link.url}
                                                    className={`inline-flex size-8 items-center justify-center rounded border ${
                                                        link.active
                                                            ? "border-blue-600 bg-blue-600 text-white"
                                                            : "border-gray-100 bg-white text-gray-900"
                                                    } text-center leading-8 rtl:rotate-180`}
                                                >
                                                    {link.label.includes(
                                                        "Previous"
                                                    ) ||
                                                    link.label.includes(
                                                        "Next"
                                                    ) ? (
                                                        <span className="sr-only">
                                                            {link.label}
                                                        </span>
                                                    ) : (
                                                        link.label
                                                    )}
                                                    {link.label.includes(
                                                        "Previous"
                                                    ) && (
                                                        <svg
                                                            xmlns="http://www.w3.org/2000/svg"
                                                            className="size-3"
                                                            viewBox="0 0 20 20"
                                                            fill="currentColor"
                                                        >
                                                            <path
                                                                fillRule="evenodd"
                                                                d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                                                                clipRule="evenodd"
                                                            />
                                                        </svg>
                                                    )}
                                                    {link.label.includes(
                                                        "Next"
                                                    ) && (
                                                        <svg
                                                            xmlns="http://www.w3.org/2000/svg"
                                                            className="size-3"
                                                            viewBox="0 0 20 20"
                                                            fill="currentColor"
                                                        >
                                                            <path
                                                                fillRule="evenodd"
                                                                d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                                                                clipRule="evenodd"
                                                            />
                                                        </svg>
                                                    )}
                                                </Link>
                                            ) : (
                                                <span
                                                    className={`inline-flex size-8 items-center justify-center rounded border ${
                                                        link.active
                                                            ? "border-blue-600 bg-blue-600 text-white"
                                                            : "border-gray-100 bg-white text-gray-900"
                                                    } text-center leading-8`}
                                                >
                                                    <span className="sr-only">
                                                        {link.label}
                                                    </span>
                                                </span>
                                            )}
                                        </li>
                                    ))}
                                </ol>
                            </div>
                        </>
                    ) : (
                        <div className="flex items-center justify-center text-gray-500 text-xs">
                            No data found.
                        </div>
                    )}
                </div>
            </div>
        </AuthenticatedLayout>
    );
};

export default Index;
