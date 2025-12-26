import React from "react";
import {
    User,
    Package,
    Heart,
    Settings,
    LogOut,
    Camera,
} from "lucide-react";
import { SidebarItem } from "@/components/account/sidebar/SidebarItem.tsx";

interface ProfileSidebarProps {
    avatarUrl?: string;
    activeSection: "profile" | "orders" | "wishlist" | "settings";
    onChangeSection: (section: ProfileSidebarProps["activeSection"]) => void;
    onChangeAvatarClick: () => void;
}

const AccountSidebar: React.FC<ProfileSidebarProps> = ({
                                                           avatarUrl,
                                                           activeSection,
                                                           onChangeSection,
                                                           onChangeAvatarClick,
                                                       }) => {
    return (
        <aside className="col-12 col-md-4 col-lg-3">
            {/* User Card */}
            <div className="card border-0 shadow-sm mb-4 bg-white">
                <div className="card-body p-4">
                    <div className="d-flex align-items-center gap-3 position-relative">
                        <div className="position-relative">
                            <div
                                className="d-flex align-items-center justify-content-center rounded-circle bg-primary bg-opacity-10 text-primary overflow-hidden border border-2 border-white shadow-sm"
                                style={{ width: 48, height: 48 }}
                            >
                                {avatarUrl ? (
                                    <img
                                        src={avatarUrl}
                                        alt="Avatar"
                                        className="w-100 h-100 object-fit-cover rounded-circle"
                                    />
                                ) : (
                                    <User className="h-5 w-5 text-dark" />
                                )}
                            </div>

                            <button
                                type="button"
                                className="btn btn-primary btn-sm position-absolute bottom-0 end-0 rounded-circle shadow-lg opacity-0 hover:opacity-100 transition-opacity"
                                style={{ width: 24, height: 24 }}
                                onClick={onChangeAvatarClick}
                            >
                                <Camera className="h-3 w-3" />
                            </button>
                        </div>

                        <div>
                            <h5 className="mb-1 fw-semibold">Nguyễn Văn A</h5>
                            <p className="mb-0 text-muted small">
                                Khách hàng thân thiết
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Navigation */}
            <nav className="list-group list-group-flush">
                <SidebarItem
                    icon={<User className="h-4 w-4" />}
                    label="Hồ sơ cá nhân"
                    active={activeSection === "profile"}
                    onClick={() => onChangeSection("profile")}
                />

                <SidebarItem
                    icon={<Package className="h-4 w-4" />}
                    label="Đơn hàng của tôi"
                    active={activeSection === "orders"}
                    onClick={() => onChangeSection("orders")}
                />

                <SidebarItem
                    icon={<Heart className="h-4 w-4" />}
                    label="Danh sách yêu thích"
                    active={activeSection === "wishlist"}
                    onClick={() => onChangeSection("wishlist")}
                />

                <SidebarItem
                    icon={<Settings className="h-4 w-4" />}
                    label="Cài đặt tài khoản"
                    active={activeSection === "settings"}
                    onClick={() => onChangeSection("settings")}
                />

                <hr className="my-2" />

                <button
                    type="button"
                    className="list-group-item list-group-item-action d-flex align-items-center gap-3 border-0 px-0 py-3 text-danger hover:bg-danger-subtle"
                >
                    <LogOut className="h-4 w-4 flex-shrink-0" />
                    <span>Đăng xuất</span>
                </button>
            </nav>
        </aside>
    );
};

export default AccountSidebar;
