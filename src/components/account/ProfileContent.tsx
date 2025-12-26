import { useState } from "react";
import type { RefObject, ChangeEvent } from "react";

import type { AccountSection, ProfileTab } from "@/types/account.ts";
import ProfileTabs from "@/components/account/profile/ProfileTabs.tsx";
import ProfileInfoTab from "@/components/account/profile/ProfileInfoTab.tsx";
import ProfileAddressTab from "@/components/account/profile/ProfileAddressTab.tsx";

interface ProfileContentProps {
    activeSection: AccountSection;
    avatarUrl?: string;
    fileInputRef: RefObject<HTMLInputElement | null>;
    onAvatarChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

export default function ProfileContent({
                                           activeSection,
                                           avatarUrl,
                                           fileInputRef,
                                           onAvatarChange,
                                       }: ProfileContentProps) {
    const [activeTab, setActiveTab] = useState<ProfileTab>("info");

    if (activeSection !== "profile") {
        return (
            <div className="col-12 col-md-8 col-lg-9">
                <div className="card p-4 shadow-sm border-0">
                    <p className="mb-0 text-muted">
                        Section <strong>{activeSection}</strong> đang được phát triển.
                    </p>
                </div>
            </div>
        );
    }

    return (
        <div className="col-12 col-md-8 col-lg-9">
            <ProfileTabs activeTab={activeTab} onChange={setActiveTab} />

            <div className="tab-content">
                {activeTab === "info" && (
                    <ProfileInfoTab
                        avatarUrl={avatarUrl}
                        fileInputRef={fileInputRef}
                        onAvatarChange={onAvatarChange}
                    />
                )}

                {activeTab === "address" && <ProfileAddressTab />}
            </div>
        </div>
    );
}
