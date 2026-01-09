import { useState } from "react";
import type { RefObject, ChangeEvent } from "react";

import type { ProfileTab } from "@/types/account.ts";
import ProfileTabs from "@/components/account/profile/ProfileTabs.tsx";
import ProfileInfoTab from "@/components/account/profile/ProfileInfoTab.tsx";
import ProfileAddressTab from "@/components/account/profile/ProfileAddressTab.tsx";

import type { UserProfile } from "@/api/profile.api";

interface ProfileContentProps {
    profile: UserProfile;
    fileInputRef: RefObject<HTMLInputElement | null>;
    onAvatarChange: (e: ChangeEvent<HTMLInputElement>) => void;
    onProfileUpdated: (p: UserProfile) => void;
}

export default function ProfileContent({
                                           profile,
                                           fileInputRef,
                                           onAvatarChange,
                                           onProfileUpdated,
                                       }: ProfileContentProps) {
    const [activeTab, setActiveTab] = useState<ProfileTab>("info");

    return (
        <div className="col-12 col-md-8 col-lg-9">
            <ProfileTabs activeTab={activeTab} onChange={setActiveTab} />

            <div className="tab-content">
                {activeTab === "info" && (
                    <ProfileInfoTab
                        profile={profile}
                        fileInputRef={fileInputRef}
                        onAvatarChange={onAvatarChange}
                        onProfileUpdated={onProfileUpdated}
                    />
                )}

                {activeTab === "address" && <ProfileAddressTab />}
            </div>
        </div>
    );
}
