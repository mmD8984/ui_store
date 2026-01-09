import {useState} from "react";
import {Edit2, Trash2   } from "lucide-react";
import {deleteAddress, setDefaultAddress, updateAddress} from "@/api/address.api";
import type { UserAddress } from "@/api/address.api";

import AddressForm from "@/common/AddressForm";
import type { ShippingInfo } from "@/common/AddressForm";

interface Props {
    address: UserAddress;
    onChange: () => void;
}

export default function AddressCard({ address, onChange }: Props) {
    const [showEdit, setShowEdit] = useState(false);
    const [saving, setSaving] = useState(false);

    const handleDelete = async () => {
        await deleteAddress(address.id);
        onChange();
    };

    const handleSetDefault = async () => {
        await setDefaultAddress(address.id);
        onChange();
    };

    const handleUpdate = async (info: ShippingInfo) => {
        try {
            setSaving(true);

            await updateAddress(address.id, {
                recipientName: info.recipientName,
                phone: info.phone,
                province: info.province,
                district: info.district,
                ward: info.ward,
                addressLine: info.addressLine,
                isDefault: info.isDefault,
            });

            setShowEdit(false);
            onChange();
        } finally {
            setSaving(false);
        }
    };

    return (
        <>
            <div className={`card shadow-sm ${address.isDefault ? "border border-dark bg-transparent" : "border-0"}`}>
                <div className="card-header bg-transparent d-flex justify-content-between">
                    {address.isDefault ? (
                        <button className="btn btn-sm btn-success" disabled style={{backgroundColor: "#0dcaf0", borderColor: "#0dcaf0", opacity: 1, cursor: "default"}}>
                            Mặc định
                        </button>
                    ) : (
                        <button
                            className="btn btn-outline-dark btn-sm d-flex align-items-center gap-2"
                            onClick={handleSetDefault}
                        >
                            Đặt mặc định
                        </button>
                    )}
                    <div className="d-flex gap-2">
                        <button
                            className="btn btn-outline-dark btn-sm d-flex align-items-center gap-2"
                            onClick={() => setShowEdit(true)}
                        >
                            <Edit2 size={16} /> Sửa
                        </button>

                        {!address.isDefault && (
                            <button
                                className="btn btn-sm btn-outline-danger"
                                onClick={handleDelete}
                            >
                                <Trash2 size={16} />
                            </button>
                        )}
                    </div>
                </div>

                <div className="card-body">
                    <p className="fw-semibold mb-1">{address.recipientName}</p>
                    <p className="small text-muted mb-1">{address.phone}</p>
                    <p className="small text-muted mb-1">{address.addressLine}</p>
                    <p className="small text-muted">
                        {address.ward}, {address.district}, {address.province}
                    </p>
                </div>
            </div>

            {showEdit && (
                <>
                    <div className="modal fade show d-block" tabIndex={-1}>
                        <div className="modal-dialog modal-lg modal-dialog-centered">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h5 className="fw-semibold">Sửa địa chỉ</h5>
                                    <button
                                        className="btn-close"
                                        onClick={() => setShowEdit(false)}
                                    />
                                </div>
                                <div className="modal-body">
                                    <AddressForm
                                        value={{
                                            recipientName: address.recipientName,
                                            phone: address.phone,
                                            province: address.province,
                                            district: address.district,
                                            ward: address.ward,
                                            addressLine: address.addressLine,
                                            isDefault: address.isDefault,
                                        }}
                                        onSubmit={handleUpdate}
                                    />
                                </div>
                                {saving && (
                                    <div className="modal-footer">
                                        <span className="text-muted">Đang lưu...</span>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                    <div className="modal-backdrop fade show" />
                </>
            )}
        </>
    );
}
