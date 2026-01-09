import AddressForm from "@/common/AddressForm";
import type { ShippingInfo } from "@/common/AddressForm";
import { addAddress } from "@/api/address.api";

interface Props {
    show: boolean;
    onClose: () => void;
    onSuccess: () => void;
}

export default function AddAddress({ show, onClose, onSuccess }: Props) {
    if (!show) return null;

    const handleSubmit = async (info: ShippingInfo) => {
        await addAddress({
            recipientName: info.recipientName,
            phone: info.phone,
            addressLine: info.addressLine,
            ward: info.ward,
            district: info.district,
            province: info.province,
            isDefault: info.isDefault,
        });

        onSuccess();
        onClose();
    };

    return (
        <>
            <div className="modal-backdrop fade show" />
            <div className="modal fade show d-block" tabIndex={-1}>
                <div className="modal-dialog modal-lg modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="fw-semibold">Thêm địa chỉ</h5>
                            <button
                                className="btn-close"
                                onClick={onClose}
                            />
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
