import { useEffect, useState } from "react";
import { Inertia } from "@inertiajs/inertia";
import { Head, Link } from "@inertiajs/react";

const Notifications = ({ notifications }) => {

    const [data, setData] = useState(notifications);

    useEffect(() => {
        window.Echo.channel('tasks-channel')
            .listen('.task.assigned', (e) => {
                setData((prev) => [...prev, { id: e.task.id, data: { title: e.task.title, description: e.task.description, task_id: e.task.id } }]);
            });
        return () => {
            window.Echo.leaveChannel('tasks-channel');
        }
    }, []);

    return (
        <>
            <Head title="Notifications" />
            <div className="bg-white p-4 rounded-md shadow-md">
                <h1 className="text-2xl font-bold mb-4">Notifications</h1>
                <ul className="divide-y divide-gray-300">
                    {data.map((notification, index) =>
                        <li key={index} className="py-4">
                            <h4 className="text-lg font-medium">{notification.data.title}</h4>
                            <p className="text-gray-600">{notification.data.description}</p>
                            <Link className="text-blue-500 hover:text-blue-700 transition duration-150 ease-in-out" href={route('tasks.show', notification.data.task_id)}>View</Link>
                        </li>
                    )}
                </ul>
            </div>
        </>
    );
}

export default Notifications;