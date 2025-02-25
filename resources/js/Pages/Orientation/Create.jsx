import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, useForm, usePage } from "@inertiajs/react";
import axios from "axios";
import React, { useState, useEffect } from "react";

const Create = ({ regions }) => {
    const { flash } = usePage().props;
    const { data, setData, post, processing, errors } = useForm({
        date_of_orientation: "",
        lgu_office_name: "",
        city_municipality: "",
        province: "",
        region: "",
        type_of_participants: "",
        total_number_of_participants: "",
        training_mode: "",
        key_topics_discussed: "",
        resource_speakers: "",
        feedback_assessment_of_training: "",
        attachments: "",
        attachment_type: "",
    });
    const [provinces, setProvinces] = useState([]);
    const [cities, setCities] = useState([]);
    const [flashMessage, setFlashMessage] = useState(null);

    useEffect(() => {
        // Fetch provinces by region
        if (data.region) {
            axios
                .get(
                    `/auth/verified/get-provinces-by-region?region_id=${data.region}`
                )
                .then((response) => {
                    setProvinces(response.data);
                })
                .catch((error) => {
                    console.log(error.response?.data?.message);
                });
        }
        // Fetch cities by province
        if (data.province) {
            axios
                .get(
                    `/auth/verified/get-cities-by-province?province_id=${data.province}`
                )
                .then((response) => {
                    setCities(response.data);
                })
                .catch((error) => {
                    console.log(error.response?.data?.message);
                });
        }
        // Set flash message
        if (flash.error) {
            setFlashMessage(flash.error);
        }
        setTimeout(() => setFlashMessage(null), 5000);
    }, [flash, data.region, data.province]);

    const submit = (e) => {
        e.preventDefault();
        post(route("orientation.store"), {
            onFinish: () =>
                setData({
                    date_of_orientation: "",
                    lgu_office_name: "",
                    city_municipality: "",
                    province: "",
                    region: "",
                    type_of_participants: "",
                    total_number_of_participants: "",
                    training_mode: "",
                    key_topics_discussed: "",
                    resource_speakers: "",
                    feedback_assessment_of_training: "",
                    attachments: "",
                    attachment_type: "",
                }),
        });
    };

    const handleRegionChange = (e) => {
        const regionId = e.target.value;
        setData((prevState) => ({
            ...prevState,
            region: regionId,
            province: "State / Province",
            city_municipality: "City / Municipality",
        }));
    };

    const handleProvinceChange = (e) => {
        const province = e.target.value;
        setData((prevState) => ({
            ...prevState,
            province,
            city_municipality: "City / Municipality",
        }));
    };

    return (
        <AuthenticatedLayout header="Orientation">
            <Head title="Orientation" />
            <div className="mx-auto max-w-7xl space-y-6 sm:px-6 lg:px-8">
                <form onSubmit={submit}>
                    @csrf
                    <div className="space-y-12">
                        <div className="border-b border-gray-900/10 pb-12">
                            <div className="border-b border-gray-900/10 pb-12">
                                {/* Flash message */}
                                {flashMessage && (
                                    <div className="my-4 p-4 text-red-600 bg-red-100 border border-red-400">
                                        {flashMessage}
                                    </div>
                                )}
                                {/* eBOSS Information */}
                                <h2 className="text-base/7 font-semibold text-gray-900">
                                    Create New Orientation Entry
                                </h2>
                                <p className="mt-1 text-sm/6 text-gray-600">
                                    Fill out the form below to add a new
                                    Orientation entry. Ensure all details are
                                    accurate and complete. Fields with asterisk
                                    (*) are required.
                                </p>
                                <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                                    <div className="sm:col-span-2 sm:col-start-1">
                                        <label className="block text-sm/6 font-medium text-gray-900">
                                            Date of Orientation{" "}
                                            <span
                                                className="text-red-500"
                                                title="Required"
                                            >
                                                *
                                            </span>
                                        </label>
                                        <div className="mt-2">
                                            <input
                                                type="date"
                                                placeholder="Date of Orientation"
                                                value={data.date_of_orientation}
                                                onChange={(e) =>
                                                    setData(
                                                        "date_of_orientation",
                                                        e.target.value
                                                    )
                                                }
                                                required
                                                className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                                            />
                                        </div>
                                    </div>
                                    <div className="sm:col-span-2">
                                        <label className="block text-sm/6 font-medium text-gray-900">
                                            LGU/Office Name{" "}
                                            <span
                                                className="text-red-500"
                                                title="Required"
                                            >
                                                *
                                            </span>
                                        </label>
                                        <div className="mt-2">
                                            <input
                                                type="text"
                                                value={data.lgu_office_name}
                                                onChange={(e) =>
                                                    setData(
                                                        "lgu_office_name",
                                                        e.target.value
                                                    )
                                                }
                                                className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm"
                                                required
                                            />
                                        </div>
                                    </div>
                                    <div className="sm:col-span-2 sm:col-start-1">
                                        <label className="block text-sm/6 font-medium text-gray-900">
                                            Region{" "}
                                            <span
                                                className="text-red-500"
                                                title="Required"
                                            >
                                                *
                                            </span>
                                        </label>
                                        <div className="mt-2">
                                            <select
                                                value={data.region.name}
                                                onChange={handleRegionChange}
                                                className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                                            >
                                                <option
                                                    value=""
                                                    selected
                                                    disabled
                                                >
                                                    Select Region
                                                </option>
                                                {regions.map(
                                                    (region, index) => (
                                                        <option
                                                            key={index}
                                                            value={region.id}
                                                        >
                                                            {region.name}
                                                        </option>
                                                    )
                                                )}
                                            </select>
                                        </div>
                                    </div>
                                    <div className="sm:col-span-2">
                                        <label className="block text-sm/6 font-medium text-gray-900">
                                            State / Province{" "}
                                            <span
                                                className="text-red-500"
                                                title="Required"
                                            >
                                                *
                                            </span>
                                        </label>
                                        <div className="mt-2">
                                            <select
                                                value={data.province.name}
                                                onChange={handleProvinceChange}
                                                className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                                            >
                                                <option
                                                    value=""
                                                    selected
                                                    disabled
                                                >
                                                    Select Province
                                                </option>
                                                {provinces.map(
                                                    (province, index) => (
                                                        <option
                                                            key={index}
                                                            value={province.id}
                                                        >
                                                            {province.name}
                                                        </option>
                                                    )
                                                )}
                                            </select>
                                        </div>
                                    </div>
                                    <div className="sm:col-span-2">
                                        <label className="block text-sm/6 font-medium text-gray-900">
                                            City / Municipality{" "}
                                            <span
                                                className="text-red-500"
                                                title="Required"
                                            >
                                                *
                                            </span>
                                        </label>
                                        <div className="mt-2">
                                            <select
                                                value={
                                                    data.city_municipality.name
                                                }
                                                onChange={(e) =>
                                                    setData(
                                                        "city_municipality",
                                                        e.target.value
                                                    )
                                                }
                                                required
                                                className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                                            >
                                                <option
                                                    value=""
                                                    selected
                                                    disabled
                                                >
                                                    Select City / Municipality
                                                </option>
                                                {cities.map((city, index) => (
                                                    <option
                                                        key={index}
                                                        value={city.id}
                                                    >
                                                        {city.name}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>
                                    </div>
                                    <div className="sm:col-span-3">
                                        <label className="block text-sm/6 font-medium text-gray-900">
                                            Type of Participants{" "}
                                            <span
                                                className="text-red-500"
                                                title="Required"
                                            >
                                                *
                                            </span>
                                        </label>
                                        <div className="mt-2 grid grid-cols-1">
                                            <select
                                                value={
                                                    data.type_of_participants
                                                }
                                                onChange={(e) =>
                                                    setData(
                                                        "type_of_participants",
                                                        e.target.value
                                                    )
                                                }
                                                required
                                                className="col-start-1 row-start-1 appearance-none rounded-md bg-white py-1.5 pr-8 pl-3 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                                                defaultValue="Select one"
                                            >
                                                <option value="" disabled>
                                                    Select one
                                                </option>
                                                <option value="BPLO Staff">
                                                    BPLO Staff
                                                </option>
                                                <option value="Local Officials">
                                                    Local Officials (Mayor, Vice
                                                    Mayor, Councilors, etc.)
                                                </option>
                                                <option value="Barangay Officials">
                                                    Barangay Officials
                                                </option>
                                                <option value="Business Owners">
                                                    Business Owners
                                                </option>
                                                <option value="Cooperative Representatives">
                                                    Cooperative Representatives
                                                </option>
                                                <option value="Chamber of Commerce Representatives">
                                                    Chamber of Commerce
                                                    Representatives
                                                </option>
                                                <option value="CSOs/NGOs">
                                                    Civil Society Organizations
                                                    (CSOs) / NGOs
                                                </option>
                                                <option value="Investors and Entrepreneurs">
                                                    Investors and Entrepreneurs
                                                </option>
                                                <option value="Academe">
                                                    Academe / Educational
                                                    Institutions
                                                </option>
                                                <option value="Law Enforcement">
                                                    Law Enforcement (PNP, BFP,
                                                    etc.)
                                                </option>
                                                <option value="LGU Employees">
                                                    LGU Employees (General
                                                    Staff)
                                                </option>
                                                <option value="Regulatory Agencies Representatives">
                                                    Regulatory Agencies
                                                    Representatives
                                                </option>
                                                <option value="Other Government Agencies Representatives">
                                                    Other Government Agencies
                                                    Representatives
                                                </option>
                                                <option value="Media Representatives">
                                                    Media Representatives
                                                </option>
                                                <option value="Others">
                                                    Others (Specify)
                                                </option>
                                            </select>
                                        </div>
                                    </div>
                                    <div className="sm:col-span-3">
                                        <label className="block text-sm/6 font-medium text-gray-900">
                                            Total Number of Participants{" "}
                                            <span
                                                className="text-red-500"
                                                title="Required"
                                            >
                                                *
                                            </span>
                                        </label>
                                        <div className="mt-2">
                                            <input
                                                type="number"
                                                placeholder="# of Participants"
                                                value={
                                                    data.total_number_of_participants
                                                }
                                                onChange={(e) =>
                                                    setData(
                                                        "total_number_of_participants",
                                                        e.target.value
                                                    )
                                                }
                                                className="block rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                                                required
                                            />
                                        </div>
                                    </div>
                                    <div className="sm:col-span-3">
                                        <label className="block text-sm/6 font-medium text-gray-900">
                                            Training Mode{" "}
                                            <span
                                                className="text-red-500"
                                                title="Required"
                                            >
                                                *
                                            </span>
                                        </label>
                                        <div className="mt-2 grid grid-cols-1">
                                            <select
                                                value={data.training_mode}
                                                onChange={(e) =>
                                                    setData(
                                                        "training_mode",
                                                        e.target.value
                                                    )
                                                }
                                                required
                                                className="col-start-1 row-start-1 appearance-none rounded-md bg-white py-1.5 pr-8 pl-3 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                                                defaultValue="Select one"
                                            >
                                                <option value="" disabled>
                                                    Select one
                                                </option>
                                                <option value="Face-to-Face">
                                                    Face-to-Face
                                                </option>
                                                <option value="Virtual">
                                                    Virtual
                                                </option>
                                                <option value="Hybrid">
                                                    Hybrid
                                                </option>
                                            </select>
                                        </div>
                                    </div>
                                    <div className="col-span-full">
                                        <label className="block text-sm/6 font-medium text-gray-900">
                                            Key Topics Discussed{" "}
                                            <span
                                                className="text-red-500"
                                                title="Required"
                                            >
                                                *
                                            </span>
                                        </label>
                                        <div className="mt-2">
                                            <textarea
                                                value={
                                                    data.key_topics_discussed
                                                }
                                                onChange={(e) =>
                                                    setData(
                                                        "key_topics_discussed",
                                                        e.target.value
                                                    )
                                                }
                                                rows={3}
                                                className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                                                required
                                            />
                                        </div>
                                    </div>
                                    <div className="sm:col-span-3">
                                        <label className="block text-sm/6 font-medium text-gray-900">
                                            Resource Speaker(s){" "}
                                            <span
                                                className="text-red-500"
                                                title="Required"
                                            >
                                                *
                                            </span>
                                        </label>
                                        <div className="mt-2">
                                            <input
                                                type="text"
                                                value={data.resource_speakers}
                                                onChange={(e) =>
                                                    setData(
                                                        "resource_speakers",
                                                        e.target.value
                                                    )
                                                }
                                                className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm"
                                                required
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                                <div className="col-span-full">
                                    <label className="block text-sm/6 font-medium text-gray-900">
                                        Feedback/Assessment of Training (Rating
                                        or Comments)
                                    </label>
                                    <div className="mt-2">
                                        <textarea
                                            value={
                                                data.feedback_assessment_of_training
                                            }
                                            onChange={(e) =>
                                                setData(
                                                    "feedback_assessment_of_training",
                                                    e.target.value
                                                )
                                            }
                                            rows={3}
                                            className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                                        />
                                    </div>
                                    <p className="mt-3 text-sm/6 text-gray-600">
                                        Please provide any additional
                                        information that will help evaluate your
                                        submission to the orientation on RA
                                        11032 (Tracking capacity-building
                                        activities for LGUs).
                                    </p>
                                </div>
                                <div className="col-span-full">
                                    <label className="block text-sm/6 font-medium text-gray-900">
                                        Attachment{" "}
                                        <span className="text-xs font-normal text-gray-500">
                                            (Minimum of 2MB)
                                        </span>
                                    </label>
                                    <div className="mt-2 flex items-center gap-x-3">
                                        <input
                                            type="file"
                                            name="attachments"
                                            onChange={(e) =>
                                                setData({
                                                    ...data,
                                                    attachments:
                                                        e.target.files[0],
                                                })
                                            }
                                            className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                                        />
                                        <input
                                            type="text"
                                            placeholder="or link"
                                            value={data.attachment_type}
                                            onChange={(e) =>
                                                setData(
                                                    "attachment_type",
                                                    e.target.value
                                                )
                                            }
                                            className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="mt-6 flex items-center justify-end gap-x-6">
                        <Link
                            href={route("orientation.index")}
                            className="text-xs font-semibold text-gray-900"
                        >
                            Cancel
                        </Link>
                        <button
                            type="submit"
                            className={`rounded-md bg-indigo-600 px-3 py-2 text-xs font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 ${
                                processing && "opacity-25 cursor-not-allowed"
                            }`}
                        >
                            {processing ? (
                                <span className="flex items-center justify-center">
                                    <svg
                                        aria-hidden="true"
                                        role="status"
                                        className="inline mr-3 w-4 h-4 text-white animate-spin"
                                        viewBox="0 0 100 101"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                                            fill="#E5E7EB"
                                        ></path>
                                        <path
                                            d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                                            fill="currentColor"
                                        ></path>
                                    </svg>
                                    Please wait...
                                </span>
                            ) : (
                                "Save"
                            )}
                        </button>
                    </div>
                </form>
            </div>
        </AuthenticatedLayout>
    );
};

export default Create;
