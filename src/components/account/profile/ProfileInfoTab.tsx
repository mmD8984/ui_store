import { User, Camera } from "lucide-react";
import React, {type ChangeEvent, type RefObject, useState} from "react";
import { Snackbar, Alert } from "@mui/material";

import { updateProfile } from "@/api/profile.api";
import type { UserProfile } from "@/api/profile.api";

interface ProfileInfoTabProps {
    profile: UserProfile;
    fileInputRef: RefObject<HTMLInputElement | null>;
    onAvatarChange: (e: ChangeEvent<HTMLInputElement>) => void;
    onProfileUpdated: (p: UserProfile) => void;
}

export default function ProfileInfoTab({
                                           profile,
                                           fileInputRef,
                                           onAvatarChange,
                                           onProfileUpdated,
                                       }: ProfileInfoTabProps) {
    const [fullName, setFullName] = useState(profile.profile.fullName ?? "");
    const [phone, setPhone] = useState(profile.profile.phone ?? "");
    const [birthDate, setBirthDate] = useState(profile.profile.birthDate ?? "");

    const isDirty =
        fullName !== (profile.profile.fullName ?? "") ||
        phone !== (profile.profile.phone ?? "") ||
        birthDate !== (profile.profile.birthDate ?? "");

    const [snackbar, setSnackbar] = useState({
        open: false,
        message: "",
        severity: "success" as "success" | "error",
    });

    const handleSave = async () => {
        try {
            const updated = await updateProfile({
                profile: { fullName, phone, birthDate },
            });
            onProfileUpdated(updated);
            setSnackbar({ open: true, message: "Lưu thay đổi thành công!", severity: "success" });
        } catch (error: unknown) {
            if (error instanceof Error) {
                setSnackbar({open: true, message: "Lưu thất bại, thử lại!", severity: "error"});
            }
        }
    };

    return (
        <div className="card shadow-sm border-0">
            <div className="card-header bg-white border-0 pb-0">
                <h5 className="card-title mb-1">Thông tin cá nhân</h5>
                <p className="card-subtitle mb-0 text-muted">
                    Cập nhật thông tin cá nhân và thông tin liên lạc của bạn.
                </p>
            </div>

            <div className="card-body">
                {/* Avatar */}
                <div className="d-flex flex-column align-items-center gap-3 pb-4 mb-4 border-bottom">
                    <div className="position-relative">
                        <div
                            className="rounded-circle bg-primary bg-opacity-10 d-flex align-items-center justify-content-center overflow-hidden border border-4 border-white shadow"
                            style={{ width: 96, height: 96 }}
                        >
                            {profile.profile.avatarUrl ? (
                                <img
                                    src={profile.profile.avatarUrl}
                                    alt="Avatar"
                                    className="w-100 h-100 object-fit-cover rounded-circle"
                                />
                            ) : (
                                <User className="h-12 w-12 text-primary" />
                            )}
                        </div>

                        <button
                            type="button"
                            className="btn btn-outline-secondary btn-sm position-absolute bottom-0 end-0 rounded-circle shadow border-2 border-white"
                            style={{ width: 32, height: 32 }}
                            onClick={() => fileInputRef.current?.click()}
                        >
                            <Camera className="h-4 w-4" />
                        </button>
                    </div>

                    <input
                        ref={fileInputRef}
                        type="file"
                        className="d-none"
                        accept="image/*"
                        onChange={onAvatarChange}
                    />
                </div>

                {/* Form */}
                <div className="row g-4">
                    <div className="col-md-6">
                        <label className="form-label">Họ và tên</label>
                        <input className="form-control" value={fullName} onChange={(e) => setFullName(e.target.value)} />
                    </div>

                    <div className="col-md-6">
                        <label className="form-label">Email</label>
                        <input type="email" className="form-control" value={profile.email} disabled/>
                        <small className="text-muted">Email không thể thay đổi</small>
                    </div>

                    <div className="col-md-6">
                        <label className="form-label">Số điện thoại</label>
                        <input className="form-control" value={phone} onChange={(e) => setPhone(e.target.value)} />
                    </div>

                    <div className="col-md-6">
                        <label className="form-label">Ngày sinh</label>
                        <input type="date" className="form-control" value={birthDate} onChange={(e) => setBirthDate(e.target.value)} />
                    </div>
                </div>

                <div className="d-flex justify-content-end mt-4">
                    <button className="btn btn-dark px-4" disabled={!isDirty} onClick={handleSave}>Lưu thay đổi</button>
                </div>

                <Snackbar
                    open={snackbar.open}
                    autoHideDuration={3000}
                    onClose={() => setSnackbar({ ...snackbar, open: false })}
                >
                    <Alert severity={snackbar.severity}>{snackbar.message}</Alert>
                </Snackbar>
            </div>
        </div>
    );
}
