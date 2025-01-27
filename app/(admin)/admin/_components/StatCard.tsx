import clsx from "clsx";
import Image from "next/image";
import Link from "next/link";

type StatCardProps = {
    count: number;
    label: string;
    icon: string;
    href: string;
};

export const StatCard = ({ count = 0, label, icon, href }: StatCardProps) => {
    return (
        <Link href={href}
            className={clsx("stat-card",)}
        >
            <div className="flex items-center gap-4">
                <Image
                    src={icon}
                    height={32}
                    width={32}
                    alt="appointments"
                    className="size-8 w-fit"
                />
                <h2 className="text-32-bold text-white">{count}</h2>
            </div>

            <p className="text-14-regular">{label}</p>
        </Link>
    );
};
