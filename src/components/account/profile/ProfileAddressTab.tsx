import { MapPin } from "lucide-react";
import { useEffect, useState } from "react";
import AddressCard from "./AddressCard";
import AddAddress from "./AddAddress";
import { getAddresses } from "@/api/address.api";
import type { UserAddress } from "@/api/address.api";

export default function ProfileAddressTab() {
    const [addresses, setAddresses] = useState<UserAddress[]>([]);
    const [showAddModal, setShowAddModal] = useState(false);

    const loadAddresses = async () => {
        const data = await getAddresses();
        setAddresses(data);
    };

    useEffect(() => {
        loadAddresses();
    }, []);

    return (
        <>
            <div className="d-flex align-items-center justify-content-between mb-4">
                <h4 className="mb-0 fw-semibold">Địa chỉ của tôi</h4>
                <button
                    className="btn btn-outline-dark btn-sm d-flex align-items-center gap-2"
                    onClick={() => setShowAddModal(true)}
                >
                    <MapPin size={16} />
                    Thêm địa chỉ mới
                </button>
            </div>

            <div className="d-flex flex-column gap-4">
                {addresses.map(addr => (
                    <AddressCard
                        key={addr.id}
                        address={addr}
                        onChange={loadAddresses}
                    />
                ))}
            </div>

            <AddAddress
                show={showAddModal}
                onClose={() => setShowAddModal(false)}
                onSuccess={loadAddresses}
            />
        </>
    );
}
