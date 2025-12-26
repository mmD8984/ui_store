import AddressForm from "@/common/AddressForm"
import type { ShippingInfo } from "@/common/AddressForm"
import { X } from "lucide-react";

interface AddAddressProps {
    show: boolean;
    onClose: () => void;
}

export default function AddAddress({ show, onClose }: AddAddressProps) {
    if (!show) return null;

    const handleSubmit = (info: ShippingInfo) => {
        console.log("Address:", info);
        onClose();
    };

    return (
        <>
            <div className="modal-backdrop fade show" />
            <div className="modal fade show d-block" tabIndex={-1} style={{ paddingTop: 96 }}>
                <div className="modal-dialog modal-lg modal-dialog-centered">
                    <div className="modal-content border-0 shadow">
                        <div className="modal-header">
                            <h5 className="modal-title fw-semibold">Thêm địa chỉ mới</h5>
                            <button type="button" className="btn btn-light btn-sm rounded-circle" onClick={onClose}>
                                <X size={18} />
                            </button>
                        </div>

                        <div className="modal-body">
                            <AddressForm onSubmit={handleSubmit} />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
