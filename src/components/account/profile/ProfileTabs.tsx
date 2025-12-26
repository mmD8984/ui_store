import { User, MapPin } from "lucide-react"
import type { ProfileTab } from "@/types/account.ts"

interface ProfileTabsProps {
    activeTab: ProfileTab;
    onChange: (tab: ProfileTab) => void;
}

export default function ProfileTabs({
                                        activeTab,
                                        onChange,
                                    }: ProfileTabsProps) {
    return (
        <ul className="nav w-100 mb-4 d-flex" style={{ maxWidth: 420 }}>
            <li className="nav-item flex-fill">
                <button
                    className={`btn d-flex align-items-center justify-content-center gap-2 rounded-pill ${
                        activeTab === "info" ? "btn-dark text-white" : "btn-light text-dark"
                    }`}
                    type="button"
                    onClick={() => onChange("info")}
                >
                    <User size={16} />
                    Thông tin tài khoản
                </button>
            </li>

            <li className="nav-item flex-fill">
                <button
                    className={`btn d-flex align-items-center justify-content-center gap-2 rounded-pill ${
                        activeTab === "address" ? "btn-dark text-white" : "btn-light text-dark"
                    }`}
                    type="button"
                    onClick={() => onChange("address")}
                >
                    <MapPin size={16} />
                    Sổ địa chỉ
                </button>
            </li>
        </ul>

    );
}
