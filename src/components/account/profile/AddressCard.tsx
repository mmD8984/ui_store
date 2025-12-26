import { Trash2 } from "lucide-react";

interface AddressCardProps {
    name: string;
    phone: string;
    addressLine: string;
    city: string;
    isDefault?: boolean;
}

export default function AddressCard({
                                        name,
                                        phone,
                                        addressLine,
                                        city,
                                        isDefault = false,
                                    }: AddressCardProps) {
    return (
        <div
            className={`card shadow-sm ${
                isDefault
                    ? "border border-dark bg-transparent"
                    : "border-0"
            }`}
        >
            <div className="card-header bg-transparent pb-2 border-0">
                <div className="d-flex align-items-center justify-content-between">
                    {/* Left */}
                    {isDefault ? (
                        <span className="badge bg-dark">Mặc định</span>
                    ) : (
                        <button
                            type="button"
                            className="btn btn-sm btn-outline-secondary"
                        >
                            Đặt làm mặc định
                        </button>
                    )}

                    {/* Right */}
                    <div className="d-flex gap-2">
                        <button
                            type="button"
                            className="btn btn-sm btn-outline-dark"
                        >
                            Sửa
                        </button>

                        {!isDefault && (
                            <button
                                type="button"
                                className="btn btn-sm btn-outline-danger"
                            >
                                <Trash2 size={16} />
                            </button>
                        )}
                    </div>
                </div>
            </div>

            <div className="card-body py-3">
                <p className="fw-medium mb-1">{name}</p>
                <p className="text-muted mb-1 small">{phone}</p>
                <p className="text-muted mb-1 small">{addressLine}</p>
                <p className="text-muted small">{city}</p>
            </div>
        </div>
    );
}
