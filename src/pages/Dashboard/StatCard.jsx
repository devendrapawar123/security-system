import { motion } from "framer-motion";

function StatCard({

    title,
    value,
    icon: Icon,
    color = "bg-blue-600",
    change = "+0%",
    progress = 50,
    subtitle,
}) {

    return (

        <motion.div

            whileHover={{
                y: -5,
                scale: 1.02,
            }}

            transition={{
                duration: 0.25,
            }}

            className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-all hover:shadow-xl"

        >

            <div className="flex items-center justify-between">

                <div>

                    <p className="text-sm font-medium text-slate-500">

                        {title}

                    </p>

                    <h2 className="mt-2 text-3xl font-bold text-slate-800">

                        {value}

                    </h2>

                </div>

                <div
                    className={`flex h-16 w-16 items-center justify-center rounded-2xl text-3xl text-white ${color}`}
                >
                    <Icon />
                </div>

            </div>

            <div className="mt-5 flex items-center justify-between">

                <span className="rounded-full bg-green-100 px-3 py-1 text-sm font-semibold text-green-700">

                    {change}

                </span>

                <span className="text-sm text-slate-500">

                    {subtitle}

                </span>

            </div>

            <div className="mt-5 h-2 overflow-hidden rounded-full bg-slate-200">

                <motion.div

                    initial={{
                        width: 0,
                    }}

                    animate={{
                        width: `${progress}%`,
                    }}

                    transition={{
                        duration: 1,
                    }}

                    className="h-full rounded-full bg-blue-600"

                />

            </div>

        </motion.div>

    );

}

export default StatCard;