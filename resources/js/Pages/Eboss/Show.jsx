import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { ArrowLeftIcon, PaperClipIcon } from "@heroicons/react/16/solid";
import { Head } from "@inertiajs/react";

const Show = ({ eboss }) => {
    const formatSize = (bytes) => {
        if (bytes === 0) return "0 Bytes";
        const k = 1024;
        const sizes = ["Bytes", "KB", "MB", "GB", "TB"];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
    };

    const attachments = Array.isArray(eboss.attachments)
        ? eboss.attachments
        : eboss.attachments
        ? [eboss.attachments]
        : [];
    const totalSize = attachments.reduce(
        (acc, file) => acc + (file.size || 0),
        0
    );

    return (
        <AuthenticatedLayout
            header="Information"
            buttonText={<ArrowLeftIcon className="size-4 shrink-0" />}
            buttonRoute={route("eboss.index")}
        >
            <Head title="eBOSS" />
            <div>
                <div className="px-4 sm:px-0">
                    <h3 className="text-base/7 font-semibold text-gray-900">
                        Electronic Business One-Stop Shop (eBOSS) Overview
                    </h3>
                    <p className="mt-1 max-w-2xl text-sm/6 text-gray-500">
                        Explore comprehensive details and insights about the
                        eBOSS system, including inspection dates, regions, and
                        administrative divisions.
                    </p>
                </div>
                <div className="mt-6 border-t border-gray-100">
                    <dl className="divide-y divide-gray-100">
                        <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                            <dt className="text-sm/6 font-medium text-gray-900">
                                Date of Inspection
                            </dt>
                            <dd className="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">
                                {eboss.date_of_inspection}
                            </dd>
                        </div>
                        <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                            <dt className="text-sm/6 font-medium text-gray-900">
                                Region
                            </dt>
                            <dd className="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">
                                {eboss.regions.name}
                            </dd>
                        </div>
                        <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                            <dt className="text-sm/6 font-medium text-gray-900">
                                State / Province
                            </dt>
                            <dd className="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">
                                {eboss.provinces.name}
                            </dd>
                        </div>
                        <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                            <dt className="text-sm/6 font-medium text-gray-900">
                                City / Municipality
                            </dt>
                            <dd className="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">
                                {eboss.cities.name}
                            </dd>
                        </div>
                        <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                            <dt className="text-sm/6 font-medium text-gray-900">
                                eBOSS Submission Date
                            </dt>
                            <dd className="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">
                                {eboss.eboss_submission_date}
                            </dd>
                        </div>
                        <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                            <dt className="text-sm/6 font-medium text-gray-900">
                                Type of eBOSS
                            </dt>
                            <dd className="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">
                                <span
                                    className={`${
                                        eboss.type_of_eboss ===
                                        "Fully-Automated"
                                            ? "bg-green-500"
                                            : eboss.type_of_eboss ===
                                              "Partly-Automated"
                                            ? "bg-blue-500"
                                            : eboss.type_of_eboss ===
                                              "Physical/Collocated BOSS"
                                            ? "bg-yellow-500"
                                            : eboss.type_of_eboss ===
                                              "No Collocated BOSS"
                                            ? "bg-red-500"
                                            : "bg-gray-500"
                                    } py-1 px-2 rounded-full text-white`}
                                >
                                    {eboss.type_of_eboss}
                                </span>
                            </dd>
                        </div>
                        <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                            <dt className="text-sm/6 font-medium text-gray-900">
                                Deadline of Action Plan
                            </dt>
                            <dd className="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">
                                {eboss.deadline_of_action_plan}
                            </dd>
                        </div>
                        <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                            <dt className="text-sm/6 font-medium text-gray-900">
                                Submission of Action Plan
                            </dt>
                            <dd className="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">
                                {eboss.submission_of_action_plan}
                            </dd>
                        </div>
                        <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                            <dt className="text-sm/6 font-medium text-gray-900">
                                About
                            </dt>
                            <dd className="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">
                                {eboss.remarks}
                            </dd>
                        </div>
                        <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                            <dt className="text-sm/6 font-medium text-gray-900">
                                BPLO Head
                            </dt>
                            <dd className="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">
                                {eboss.bplo_head}
                            </dd>
                        </div>
                        <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                            <dt className="text-sm/6 font-medium text-gray-900">
                                Contact Number
                            </dt>
                            <dd className="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">
                                {eboss.contact_no}
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
                                                    {eboss.attachments}
                                                </span>
                                                <span className="shrink-0 text-gray-400">
                                                    {formatSize(totalSize)}
                                                </span>
                                            </div>
                                        </div>
                                        <div className="ml-4 shrink-0">
                                            <a
                                                href={
                                                    eboss.attachment_type ===
                                                    "File"
                                                        ? `/storage/${eboss.attachments}`
                                                        : eboss.attachments
                                                }
                                                target="_blank"
                                                rel="noreferrer"
                                                className="font-medium text-indigo-600 hover:text-indigo-500"
                                            >
                                                {eboss.attachment_type ===
                                                "File"
                                                    ? "Download"
                                                    : eboss.attachment_type ===
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
