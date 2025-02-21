import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { ArrowLeftIcon, PaperClipIcon } from "@heroicons/react/16/solid";
import { Head } from "@inertiajs/react";

const Show = ({ commendation }) => {
    const formatSize = (bytes) => {
        if (bytes === 0) return "0 Bytes";
        const k = 1024;
        const sizes = ["Bytes", "KB", "MB", "GB", "TB"];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
    };

    const attachments = Array.isArray(commendation.attachments)
        ? commendation.attachments
        : commendation.attachments
        ? [commendation.attachments]
        : [];
    const totalSize = attachments.reduce(
        (acc, file) => acc + (file.size || 0),
        0
    );

    return (
        <AuthenticatedLayout
            header="Information"
            buttonText={<ArrowLeftIcon className="size-4 shrink-0" />}
            buttonRoute={route("commendation.index")}
        >
            <Head title="Commendation" />
            <div>
                <div className="px-4 sm:px-0">
                    <h3 className="text-base/7 font-semibold text-gray-900">
                        Commendation (Recognizing LGUs for 100% compliance and
                        full automation of eBOSS)
                    </h3>
                    <p className="mt-1 max-w-2xl text-sm/6 text-gray-500">
                        Explore comprehensive details and insights about the
                        commendation, including dates, regions, certificates,
                        photos and reports.
                    </p>
                </div>
                <div className="mt-6 border-t border-gray-100">
                    <dl className="divide-y divide-gray-100">
                        <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                            <dt className="text-sm/6 font-medium text-gray-900">
                                Date of Commendation
                            </dt>
                            <dd className="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">
                                {commendation.date_of_commendation}
                            </dd>
                        </div>
                        <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                            <dt className="text-sm/6 font-medium text-gray-900">
                                Region
                            </dt>
                            <dd className="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">
                                {commendation.regions.name}
                            </dd>
                        </div>
                        <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                            <dt className="text-sm/6 font-medium text-gray-900">
                                State / Province
                            </dt>
                            <dd className="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">
                                {commendation.provinces.name}
                            </dd>
                        </div>
                        <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                            <dt className="text-sm/6 font-medium text-gray-900">
                                City / Municipality
                            </dt>
                            <dd className="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">
                                {commendation.cities.name}
                            </dd>
                        </div>
                        <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                            <dt className="text-sm/6 font-medium text-gray-900">
                                Type of eBOSS
                            </dt>
                            <dd className="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">
                                <span
                                    className={`${
                                        commendation.type_of_eboss ===
                                        "Fully-Automated"
                                            ? "bg-green-500"
                                            : commendation.type_of_eboss ===
                                              "Partly-Automated"
                                            ? "bg-blue-500"
                                            : commendation.type_of_eboss ===
                                              "Physical/Collocated BOSS"
                                            ? "bg-yellow-500"
                                            : commendation.type_of_eboss ===
                                              "No Collocated BOSS"
                                            ? "bg-red-500"
                                            : "bg-gray-500"
                                    } py-1 px-2 rounded-full text-white`}
                                >
                                    {commendation.type_of_eboss}
                                </span>
                            </dd>
                        </div>
                        <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                            <dt className="text-sm/6 font-medium text-gray-900">
                                Certification Status (Certified/Not-Certified)
                            </dt>
                            <dd className="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">
                                {commendation.certification_status === "Certified"
                                    ? `✅ ${commendation.certification_status}`
                                    : commendation.certification_status ===
                                      "Not-Certified"
                                    ? `❌ ${commendation.certification_status}`
                                    : "N/A"}
                            </dd>
                        </div>
                        <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                            <dt className="text-sm/6 font-medium text-gray-900">
                                Date of Full Compliance
                            </dt>
                            <dd className="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">
                                {commendation.date_of_full_compliance}
                            </dd>
                        </div>
                        <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                            <dt className="text-sm/6 font-medium text-gray-900">
                                Remarks/Justification for Commendation
                            </dt>
                            <dd className="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">
                                {commendation.remarks_justification}
                            </dd>
                        </div>
                        <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                            <dt className="text-sm/6 font-medium text-gray-900">
                                Signatory/Approving Officer
                            </dt>
                            <dd className="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">
                                {commendation.signatory_approving_officer}
                            </dd>
                        </div>
                        <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                            <dt className="text-sm/6 font-medium text-gray-900">
                                Attachments (e.g., Certificate of Compliance,
                                Photos, Reports)
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
                                                    {commendation.attachments}
                                                </span>
                                                <span className="shrink-0 text-gray-400">
                                                    {formatSize(totalSize)}
                                                </span>
                                            </div>
                                        </div>
                                        <div className="ml-4 shrink-0">
                                            <a
                                                href={
                                                    commendation.attachment_type ===
                                                    "File"
                                                        ? `/storage/${commendation.attachments}`
                                                        : commendation.attachments
                                                }
                                                target="_blank"
                                                rel="noreferrer"
                                                className="font-medium text-indigo-600 hover:text-indigo-500"
                                            >
                                                {commendation.attachment_type ===
                                                "File"
                                                    ? "Download"
                                                    : commendation.attachment_type ===
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
