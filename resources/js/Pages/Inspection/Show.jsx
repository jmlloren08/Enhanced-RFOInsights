import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { ArrowLeftIcon, PaperClipIcon } from "@heroicons/react/16/solid";
import { Head } from "@inertiajs/react";

const Show = ({ inspection }) => {
    const formatSize = (bytes) => {
        if (bytes === 0) return "0 Bytes";
        const k = 1024;
        const sizes = ["Bytes", "KB", "MB", "GB", "TB"];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
    };

    const attachments = Array.isArray(inspection.attachments)
        ? inspection.attachments
        : inspection.attachments
        ? [inspection.attachments]
        : [];
    const totalSize = attachments.reduce(
        (acc, file) => acc + (file.size || 0),
        0
    );

    return (
        <AuthenticatedLayout
            header="Information"
            buttonText={<ArrowLeftIcon className="size-4 shrink-0" />}
            buttonRoute={route("inspection.index")}
        >
            <Head title="Inspection" />
            <div>
                <div className="px-4 sm:px-0">
                    <h3 className="text-base/7 font-semibold text-gray-900">
                        Citizen Charter Inspection (Tracking inspections related
                        to Citizen's Charter compliance)
                    </h3>
                    <p className="mt-1 max-w-2xl text-sm/6 text-gray-500">
                        Explore comprehensive details and insights about the
                        Citizen Charter Inspection, including inspection dates,
                        regions, and administrative divisions, as well as the
                        compliance of the inspected offices with the Citizen's
                        Charter.
                    </p>
                </div>
                <div className="mt-6 border-t border-gray-100">
                    <dl className="divide-y divide-gray-100">
                        <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                            <dt className="text-sm/6 font-medium text-gray-900">
                                Date of Inspection
                            </dt>
                            <dd className="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">
                                {inspection.date_of_inspection}
                            </dd>
                        </div>
                        <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                            <dt className="text-sm/6 font-medium text-gray-900">
                                LGU/Office Name
                            </dt>
                            <dd className="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">
                                {inspection.lgu_office_name}
                            </dd>
                        </div>
                        <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                            <dt className="text-sm/6 font-medium text-gray-900">
                                Region
                            </dt>
                            <dd className="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">
                                {inspection.regions.name}
                            </dd>
                        </div>
                        <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                            <dt className="text-sm/6 font-medium text-gray-900">
                                State / Province
                            </dt>
                            <dd className="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">
                                {inspection.provinces.name}
                            </dd>
                        </div>
                        <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                            <dt className="text-sm/6 font-medium text-gray-900">
                                City / Municipality
                            </dt>
                            <dd className="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">
                                {inspection.cities.name}
                            </dd>
                        </div>
                        <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                            <dt className="text-sm/6 font-medium text-gray-900">
                                Department/Office Inspected
                            </dt>
                            <dd className="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">
                                {inspection.department_office_inspected}
                            </dd>
                        </div>
                        <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                            <dt className="text-sm/6 font-medium text-gray-900">
                                Compliance Rating
                            </dt>
                            <dd className="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">
                                {inspection.compliance_rating}
                            </dd>
                        </div>
                        <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                            <dt className="text-sm/6 font-medium text-gray-900">
                                Deadline for Compliance
                            </dt>
                            <dd className="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">
                                {inspection.deadline_for_compliance}
                            </dd>
                        </div>
                        <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                            <dt className="text-sm/6 font-medium text-gray-900">
                                Inspecting Officer
                            </dt>
                            <dd className="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">
                                {inspection.inspecting_officer}
                            </dd>
                        </div>
                        <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                            <dt className="text-sm/6 font-medium text-gray-900">
                                Findings/Observations
                            </dt>
                            <dd className="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">
                                {inspection.findings_observations}
                            </dd>
                        </div>
                        <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                            <dt className="text-sm/6 font-medium text-gray-900">
                                Deficiencies Noted
                            </dt>
                            <dd className="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">
                                {inspection.deficiences_noted}
                            </dd>
                        </div>
                        <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                            <dt className="text-sm/6 font-medium text-gray-900">
                                Recomendations for Improvement
                            </dt>
                            <dd className="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">
                                {inspection.recommendations_for_improvement}
                            </dd>
                        </div>
                        <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                            <dt className="text-sm/6 font-medium text-gray-900">
                                Follow-up Inspection Date
                            </dt>
                            <dd className="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">
                                {inspection.follow_up_inspection_date}
                            </dd>
                        </div>
                        <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                            <dt className="text-sm/6 font-medium text-gray-900">
                                Attachments
                            </dt>
                            <dd className="mt-2 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                                <ul
                                    role="list"
                                    className="divide-y divide-gray-100 rounded-md border border-gray-200"
                                >
                                    <li className="flex items-center justify-between py-4 pr-5 pl-4 text-sm/6">
                                        <div className="flex w-0 flex-1 items-center">
                                            <PaperClipIcon
                                                aria-hidden="true"
                                                className="size-5 shrink-0 text-gray-400"
                                            />
                                            <div className="ml-4 flex min-w-0 flex-1 gap-2">
                                                <span className="truncate font-medium">
                                                    {inspection.attachments}
                                                </span>
                                                <span className="shrink-0 text-gray-400">
                                                    {formatSize(totalSize)}
                                                </span>
                                            </div>
                                        </div>
                                        <div className="ml-4 shrink-0">
                                            <a
                                                href={
                                                    inspection.attachment_type ===
                                                    "File"
                                                        ? `/storage/${inspection.attachments}`
                                                        : inspection.attachments
                                                }
                                                target="_blank"
                                                rel="noreferrer"
                                                className="font-medium text-indigo-600 hover:text-indigo-500"
                                            >
                                                {inspection.attachment_type ===
                                                "File"
                                                    ? "Download"
                                                    : inspection.attachment_type ===
                                                      "Link"
                                                    ? "View"
                                                    : ""}
                                            </a>
                                        </div>
                                    </li>
                                </ul>
                            </dd>
                        </div>
                    </dl>
                </div>
            </div>
        </AuthenticatedLayout>
    );
};

export default Show;
