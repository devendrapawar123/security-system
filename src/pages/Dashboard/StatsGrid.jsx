import {
    FaUsers,
} from "react-icons/fa";

import {
    MdComputer,
    MdSecurity,
    MdOutlinePhotoCamera,
} from "react-icons/md";

import {
    IoNotifications,
} from "react-icons/io5";

import {
    HiChartBar,
} from "react-icons/hi";

import StatCard from "./StatCard";

const stats = [

    {
        title: "Registered Users",
        value: "125",
        icon: FaUsers,
        color: "bg-blue-600",
        change: "+12%",
        progress: 80,
        subtitle: "This Month",
    },

    {
        title: "Active Sessions",
        value: "38",
        icon: MdComputer,
        color: "bg-green-600",
        change: "+5%",
        progress: 72,
        subtitle: "Online",
    },

    {
        title: "Security Alerts",
        value: "07",
        icon: MdSecurity,
        color: "bg-red-600",
        change: "-8%",
        progress: 40,
        subtitle: "Today",
    },

    {
        title: "Intruders",
        value: "03",
        icon: MdOutlinePhotoCamera,
        color: "bg-orange-500",
        change: "+2",
        progress: 35,
        subtitle: "Detected",
    },

    {
        title: "Notifications",
        value: "14",
        icon: IoNotifications,
        color: "bg-purple-600",
        change: "+18%",
        progress: 90,
        subtitle: "Unread",
    },

    {
        title: "System Health",
        value: "99%",
        icon: HiChartBar,
        color: "bg-cyan-600",
        change: "Stable",
        progress: 99,
        subtitle: "Healthy",
    },

];

function StatsGrid() {

    return (

        <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">

            {

                stats.map((item) => (

                    <StatCard

                        key={item.title}

                        {...item}

                    />

                ))

            }

        </div>

    );

}

export default StatsGrid;