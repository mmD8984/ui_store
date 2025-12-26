import type { ReactNode } from "react";

interface SidebarItemProps {
    icon: ReactNode;
    label: string;
    active: boolean;
    onClick: () => void;
}

export function SidebarItem({
                                icon,
                                label,
                                active,
                                onClick,
                            }: SidebarItemProps) {
    return (
        <button
            type="button"
            className={`list-group-item list-group-item-action d-flex align-items-center gap-3 border-0 px-0 py-3 ${
                active
                    ? "bg-dark bg-opacity-10 text-dark fw-medium"
                    : "text-muted"
            }`}
            onClick={onClick}
        >
            {icon}
            <span>{label}</span>
        </button>
    );
}
