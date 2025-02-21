import { Link } from "@inertiajs/react";

const ViewAll = ({ link }) => {
    return (
        <Link
            href={link}
            className="mt-4 text-sm font-medium text-blue-600 hover:underline"
        >
            View All →
        </Link>
    );
};

export default ViewAll;
