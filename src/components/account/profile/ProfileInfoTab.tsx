import { User, Camera } from "lucide-react";
import type { ChangeEvent, RefObject } from "react";

interface ProfileInfoTabProps {
    avatarUrl?: string;
    fileInputRef: RefObject<HTMLInputElement | null>;
    onAvatarChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

export default function ProfileInfoTab({
                                           avatarUrl,
                                           fileInputRef,
                                           onAvatarChange,
                                       }: ProfileInfoTabProps) {
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
                            {avatarUrl ? (
                                <img
                                    src={avatarUrl}
                                    alt="Avatar"
                                    className="w-100 h-100 object-fit-cover rounded-circle"
                                />
                            ) : (
                                <User className="h-12 w-12 text-dark" />
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
                        <input className="form-control" defaultValue="Nguyễn Văn A" />
                    </div>

                    <div className="col-md-6">
                        <label className="form-label">Email</label>
                        <input className="form-control" defaultValue="nguyenvana@example.com" />
                    </div>

                    <div className="col-md-6">
                        <label className="form-label">Số điện thoại</label>
                        <input className="form-control" defaultValue="0901234567" />
                    </div>

                    <div className="col-md-6">
                        <label className="form-label">Ngày sinh</label>
                        <input type="date" className="form-control" defaultValue="1995-01-01" />
                    </div>
                </div>

                <div className="d-flex justify-content-end mt-4">
                    <button className="btn btn-primary px-4">Lưu thay đổi</button>
                </div>
            </div>
        </div>
    );
}
