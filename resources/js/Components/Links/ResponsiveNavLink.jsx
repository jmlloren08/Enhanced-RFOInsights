import { Link } from '@inertiajs/react';

export default function ResponsiveNavLink({
    active = false,
    className = '',
    children,
    ...props
}) {
    return (
        <Link
        
            {...props}
            className={`flex w-full items-start py-2 pe-4 ps-3 ${
                active
                    ? 'bg-gray-900 text-white'
                    : 'text-gray-300 hover:bg-gray-700 hover:text-white'
            } block rounded-md px-3 py-2 text-base font-medium' ${className}`}
        >
            {children}
        </Link>
    );
}