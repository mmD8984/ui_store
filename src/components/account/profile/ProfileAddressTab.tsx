import { MapPin } from "lucide-react";
import { useState } from "react";
import AddressCard from "./AddressCard";
import AddAddress from "./AddAddress";

export default function ProfileAddressTab() {
    const [showAddModal, setShowAddModal] = useState(false);

    return (
        <>
            {/* Header */}
            <div className="d-flex align-items-center justify-content-between mb-4">
                <h4 className="mb-0 fw-semibold">Địa chỉ của tôi</h4>
                <button
                    type="button"
                    className="btn btn-outline-dark btn-sm d-flex align-items-center gap-2"
                    onClick={() => setShowAddModal(true)}
                >
                    <MapPin className="h-4 w-4" />
                    Thêm địa chỉ mới
                </button>
            </div>

            {/* Address list */}
            <div className="d-flex flex-column gap-4">
                <AddressCard
                    name="Nguyễn Văn A"
                    phone="0901234567"
                    addressLine="123 Đường ABC, Phường 1, Quận 1"
                    city="Thành phố Hồ Chí Minh"
                    isDefault
                />

                <AddressCard
                    name="Nguyễn Văn A"
                    phone="0901234567"
                    addressLine="456 Đường XYZ, Phường 5, Quận Tân Bình"
                    city="Thành phố Hồ Chí Minh"
                />
            </div>

            {/* Add address modal */}
            <AddAddress
                show={showAddModal}
                onClose={() => setShowAddModal(false)}
            />
        </>
    );
}
