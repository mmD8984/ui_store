import React, { useState, useEffect } from "react";
import { User, Phone } from "lucide-react";

// Kiểu dữ liệu cho form
export interface ShippingInfo {
    fullName: string;
    phone: string;
    address: string;
    city: string;
    district: string;
    ward: string;
    isDefault: boolean;
}

// Kiểu dữ liệu API
interface Province {
    province_id: string;
    province_name: string;
}

interface District {
    district_id: string;
    district_name: string;
}

interface Ward {
    ward_id: string;
    ward_name: string;
}

// Props của component
interface AddressFormProps {
    value?: ShippingInfo;
    onChange?: (info: ShippingInfo) => void;
    onSubmit?: (info: ShippingInfo) => void;
}

const AddressForm: React.FC<AddressFormProps> = ({ value, onChange, onSubmit }) => {
    const [shippingInfo, setShippingInfo] = useState<ShippingInfo>(
        value || {
            fullName: "",
            phone: "",
            address: "",
            city: "",
            district: "",
            ward: "",
            isDefault: false,
        }
    );

    const [cities, setCities] = useState<Province[]>([]);
    const [districts, setDistricts] = useState<District[]>([]);
    const [wards, setWards] = useState<Ward[]>([]);

    // Lấy danh sách tỉnh/thành phố
    useEffect(() => {
        fetch("https://api.vnappmob.com/api/v2/province/")
            .then(res => res.json())
            .then((data: { results: Province[] }) => setCities(data.results || []))
            .catch(() => setCities([]));
    }, []);

    // Lấy danh sách quận/huyện khi city thay đổi
    useEffect(() => {
        if (!shippingInfo.city) {
            setDistricts([]);
            setWards([]);
            return;
        }

        fetch(`https://api.vnappmob.com/api/v2/province/district/${shippingInfo.city}`)
            .then(res => res.json())
            .then((data: { results: District[] }) => setDistricts(data.results || []))
            .catch(() => setDistricts([]));
    }, [shippingInfo.city]);

    // Lấy danh sách phường/xã khi district thay đổi
    useEffect(() => {
        if (!shippingInfo.district) {
            setWards([]);
            return;
        }

        fetch(`https://api.vnappmob.com/api/v2/province/ward/${shippingInfo.district}`)
            .then(res => res.json())
            .then((data: { results: Ward[] }) => setWards(data.results || []))
            .catch(() => setWards([]));
    }, [shippingInfo.district]);

    // Cập nhật dữ liệu form và gọi callback onChange
    const handleChange = (field: keyof ShippingInfo, val: string | boolean) => {
        const updated = { ...shippingInfo, [field]: val };
        setShippingInfo(updated);
        onChange?.(updated);
    };

    // Submit form
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        onSubmit?.(shippingInfo);
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className="row g-3">
                {/* Họ tên */}
                <div className="col-md-6">
                    <label className="form-label">
                        <User size={14} className="me-1" />
                        Họ và tên *
                    </label>
                    <input
                        className="form-control"
                        required
                        value={shippingInfo.fullName}
                        onChange={e => handleChange("fullName", e.target.value)}
                    />
                </div>

                {/* SĐT */}
                <div className="col-md-6">
                    <label className="form-label">
                        <Phone size={14} className="me-1" />
                        Số điện thoại *
                    </label>
                    <input
                        className="form-control"
                        required
                        value={shippingInfo.phone}
                        onChange={e => handleChange("phone", e.target.value)}
                    />
                </div>

                {/* Tỉnh / Thành phố */}
                <div className="col-md-4">
                    <label className="form-label">Tỉnh / Thành phố *</label>
                    <select
                        className="form-select"
                        required
                        value={shippingInfo.city}
                        onChange={e => handleChange("city", e.target.value)}
                    >
                        <option value="">Chọn tỉnh</option>
                        {cities.map(c => (
                            <option key={c.province_id} value={c.province_id}>
                                {c.province_name}
                            </option>
                        ))}
                    </select>
                </div>

                {/* Quận / Huyện */}
                <div className="col-md-4">
                    <label className="form-label">Quận / Huyện *</label>
                    <select
                        className="form-select"
                        required
                        value={shippingInfo.district}
                        disabled={!shippingInfo.city}
                        onChange={e => handleChange("district", e.target.value)}
                    >
                        <option value="">Chọn quận</option>
                        {districts.map(d => (
                            <option key={d.district_id} value={d.district_id}>
                                {d.district_name}
                            </option>
                        ))}
                    </select>
                </div>

                {/* Phường / Xã */}
                <div className="col-md-4">
                    <label className="form-label">Phường / Xã *</label>
                    <select
                        className="form-select"
                        required
                        value={shippingInfo.ward}
                        disabled={!shippingInfo.district}
                        onChange={e => handleChange("ward", e.target.value)}
                    >
                        <option value="">Chọn phường</option>
                        {wards.map(w => (
                            <option key={w.ward_id} value={w.ward_id}>
                                {w.ward_name}
                            </option>
                        ))}
                    </select>
                </div>

                {/* Địa chỉ chi tiết */}
                <div className="col-12">
                    <label className="form-label">Địa chỉ chi tiết *</label>
                    <textarea
                        className="form-control"
                        rows={3}
                        required
                        value={shippingInfo.address}
                        onChange={e => handleChange("address", e.target.value)}
                        placeholder="Số nhà, tên đường..."
                    />
                </div>

                {/* Đặt làm mặc định */}
                <div className="col-12">
                    <div className="form-check">
                        <input
                            className="form-check-input"
                            type="checkbox"
                            checked={shippingInfo.isDefault}
                            onChange={e => handleChange("isDefault", e.target.checked)}
                            id="setDefault"
                        />
                        <label className="form-check-label" htmlFor="setDefault">
                            Đặt làm địa chỉ mặc định
                        </label>
                    </div>
                </div>

                {/* Nút submit */}
                <div className="col-12 mt-2">
                    <button type="submit" className="btn btn-dark">
                        Lưu địa chỉ
                    </button>
                </div>
            </div>
        </form>
    );
};

export default AddressForm;
