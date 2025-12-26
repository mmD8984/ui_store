import React, { useState, useRef } from "react"
import Header from "@/common/Header.tsx"
import Footer from "@/common/Footer.tsx"
import AccountSidebar from "@/components/account/sidebar/AccoutSidebar.tsx"
import type { AccountSection } from "@/types/account"
import ProfileContent from "@/components/account/ProfileContent.tsx"
import OrdersContent from "@/components/account/OrdersContent.tsx"
import WishlistContent from "@/components/account/WishlistContent.tsx"
import SettingsContent from "@/components/account/SettingsContent.tsx"


export default function AccountPage(): React.ReactElement {
    const [activeSection, setActiveSection] = useState<AccountSection>("profile");
    const [avatarUrl, setAvatarUrl] = useState<string>();
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleAvatarChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
        const file = event.target.files?.[0];
        if (file) {
            const url = URL.createObjectURL(file);
            setAvatarUrl(url);
            console.log("[v0] Avatar file selected:", file.name);
        }
    };

    return (
        <div className="d-flex flex-column min-vh-100">
            <Header />
            <main className="flex-grow-1 bg-light py-5">
                <div className="container px-4">
                    <div className="row g-5">
                        {/* Sidebar Navigation */}
                        <AccountSidebar
                            avatarUrl={avatarUrl}
                            activeSection={activeSection}
                            onChangeSection={setActiveSection}
                            onChangeAvatarClick={() => fileInputRef.current?.click()}
                        />
                        {/* Main Content */}
                        <div className="col-12 col-md-8 col-lg-9">
                            {activeSection === "profile" && (
                                <ProfileContent
                                    activeSection={activeSection}
                                    avatarUrl={avatarUrl}
                                    fileInputRef={fileInputRef}
                                    onAvatarChange={handleAvatarChange}
                                />
                            )}

                            {activeSection === "orders" && (
                                <OrdersContent />
                            )}

                            {activeSection === "wishlist" && (
                                <WishlistContent />
                            )}

                            {activeSection === "settings" && (
                                <SettingsContent />
                            )}
                        </div>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
}
