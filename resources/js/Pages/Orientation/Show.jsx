import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { ArrowLeftIcon, PaperClipIcon } from "@heroicons/react/16/solid";
import { Head } from "@inertiajs/react";

const Show = ({ orientation }) => {
    const formatSize = (bytes) => {
        if (bytes === 0) return "0 Bytes";
        const k = 1024;
        const sizes = ["Bytes", "KB", "MB", "GB", "TB"];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
    };

    const attachments = Array.isArray(orientation.attachments)
        ? orientation.attachments
        : orientation.attachments
        ? [orientation.attachments]
        : [];
    const totalSize = attachments.reduce(
        (acc, file) => acc + (file.size || 0),
        0
    );

    return (
        <AuthenticatedLayout
            header="Information"
            buttonText={<ArrowLeftIcon className="size-4 shrink-0" />}
            buttonRoute={route("orientation.index")}
        >
            <Head title="Orientation" />
            <div>
                <div className="px-4 sm:px-0">
                    <h3 className="text-base/7 font-semibold text-gray-900">
                    Orientation on RA 11032 (Tracking capacity-building activities for LGUs)
                    </h3>
                    <p className="mt-1 max-w-2xl text-sm/6 text-gray-500">
                        Explore comprehensive details and insights about the
                        RA 11032 capacity-building activities for LGUs, including
                        training dates, regions, and administrative divisions.
                    </p>
                </div>
                <div className="mt-6 border-t border-gray-100">
                    <dl className="divide-y divide-gray-100">
                        <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                            <dt className="text-sm/6 font-medium text-gray-900">
                                Date of Orientation
                            </dt>
                            <dd className="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">
                                {orientation.date_of_orientation}
                            </dd>
                        </div>
                        <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                            <dt className="text-sm/6 font-medium text-gray-900">
                                LGU/Office Name
                            </dt>
                            <dd className="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">
                                {orientation.lgu_office_name}
                            </dd>
                        </div>
                        <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                            <dt className="text-sm/6 font-medium text-gray-900">
                                Region
                            </dt>
                            <dd className="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">
                                {orientation.regions.name}
                            </dd>
                        </div>
                        <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                            <dt className="text-sm/6 font-medium text-gray-900">
                                State / Province
                            </dt>
                            <dd className="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">
                                {orientation.provinces.name}
                            </dd>
                        </div>
                        <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                            <dt className="text-sm/6 font-medium text-gray-900">
                                City / Municipality
                            </dt>
                            <dd className="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">
                                {orientation.cities.name}
                            </dd>
                        </div>
                        <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                            <dt className="text-sm/6 font-medium text-gray-900">
                                Type of Participants
                            </dt>
                            <dd className="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">
                                {orientation.type_of_participants}
                            </dd>
                        </div>
                        <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                            <dt className="text-sm/6 font-medium text-gray-900">
                                Total Number of Participants
                            </dt>
                            <dd className="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">
                                {orientation.total_number_of_participants}
                            </dd>
                        </div>
                        <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                            <dt className="text-sm/6 font-medium text-gray-900">
                                Training Mode
                            </dt>
                            <dd className="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">
                                {orientation.training_mode}
                            </dd>
                        </div>
                        <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                            <dt className="text-sm/6 font-medium text-gray-900">
                                Key Topics Discussed
                            </dt>
                            <dd className="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">
                                {orientation.key_topics_discussed}
                            </dd>
                        </div>
                        <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                            <dt className="text-sm/6 font-medium text-gray-900">
                                Resource Speakers
                            </dt>
                            <dd className="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">
                                {orientation.resource_speakers}
                            </dd>
                        </div>
                        <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                            <dt className="text-sm/6 font-medium text-gray-900">
                                Feedback/Assessment of Training
                            </dt>
                            <dd className="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">
                                {orientation.feedback_assessment_of_training}
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
                                                    {orientation.attachments}
                                                </span>
                                                <span className="shrink-0 text-gray-400">
                                                    {formatSize(totalSize)}
                                                </span>
                                            </div>
                                        </div>
                                        <div className="ml-4 shrink-0">
                                            <a
                                                href={
                                                    orientation.attachment_type ===
                                                    "File"
                                                        ? `/storage/${orientation.attachments}`
                                                        : orientation.attachments
                                                }
                                                target="_blank"
                                                rel="noreferrer"
                                                className="font-medium text-indigo-600 hover:text-indigo-500"
                                            >
                                                {orientation.attachment_type ===
                                                "File"
                                                    ? "Download"
                                                    : orientation.attachment_type ===
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