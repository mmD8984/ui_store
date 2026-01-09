import React, {useState, useRef, useEffect} from "react"
import Header from "@/common/Header.tsx"
import Footer from "@/common/Footer.tsx"
import AccountSidebar from "@/components/account/sidebar/AccoutSidebar.tsx"
import type { AccountSection } from "@/types/account.ts"
import ProfileContent from "@/components/account/ProfileContent.tsx"
import OrdersContent from "@/components/account/OrdersContent.tsx"
import WishlistContent from "@/components/account/WishlistContent.tsx"
import SettingsContent from "@/components/account/SettingsContent.tsx"

import { getProfile, uploadAvatar } from "@/api/profile.api.ts";
import type { UserProfile } from "@/api/profile.api.ts";


export default function AccountPage(): React.ReactElement {
    const [activeSection, setActiveSection] = useState<AccountSection>("profile");
    const [profile, setProfile] = useState<UserProfile | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        getProfile().then(setProfile).catch(console.error);
    }, []);

    const handleAvatarChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (!file) return;

        try {
            const updated = await uploadAvatar(file);
            setProfile(updated);
        } catch (err) {
            console.error(err);
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
                            avatarUrl={profile?.profile.avatarUrl ?? undefined}
                            activeSection={activeSection}
                            onChangeSection={setActiveSection}
                            onChangeAvatarClick={() => fileInputRef.current?.click()}
                            fullName={profile?.profile.fullName}
                        />
                        {/* Main Content */}
                        <div className="col-12 col-md-8 col-lg-9">
                            {activeSection === "profile" && profile && (
                                <ProfileContent
                                    profile={profile}
                                    fileInputRef={fileInputRef}
                                    onAvatarChange={handleAvatarChange}
                                    onProfileUpdated={setProfile}
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
