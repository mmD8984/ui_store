import React, {useState, useEffect, useRef} from "react";
import { User, Phone } from "lucide-react";

// Kiểu dữ liệu cho form
export interface ShippingInfo {
    recipientName: string;
    phone: string;
    addressLine: string;
    ward: string;
    district: string;
    province:string;
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
    const [form, setForm] = useState<ShippingInfo>(
        value || {
            recipientName: "",
            phone: "",
            addressLine: "",
            ward: "",
            district: "",
            province: "",
            isDefault: false,
        }
    );

    const [provinces, setProvinces] = useState<Province[]>([]);
    const [districts, setDistricts] = useState<District[]>([]);
    const [wards, setWards] = useState<Ward[]>([]);

    const mappedProvinceRef = useRef(false);
    const mappedDistrictRef = useRef(false);
    const mappedWardRef = useRef(false);


    // Lấy danh sách tỉnh/thành phố
    useEffect(() => {
        fetch("https://api.vnappmob.com/api/v2/province/")
            .then(res => res.json())
            .then((data: { results: Province[] }) => setProvinces(data.results || []))
            .catch(() => setProvinces([]));
    }, []);

    // Lấy danh sách quận/huyện khi province thay đổi
    useEffect(() => {
        if (!form.province) {
            setDistricts([]);
            setWards([]);
            return;
        }

        fetch(`https://api.vnappmob.com/api/v2/province/district/${form.province}`)
            .then(res => res.json())
            .then((data: { results: District[] }) => setDistricts(data.results || []))
            .catch(() => setDistricts([]));
    }, [form.province]);

    // Lấy danh sách phường/xã khi district thay đổi
    useEffect(() => {
        if (!form.district) {
            setWards([]);
            return;
        }

        fetch(`https://api.vnappmob.com/api/v2/province/ward/${form.district}`)
            .then(res => res.json())
            .then((data: { results: Ward[] }) => setWards(data.results || []))
            .catch(() => setWards([]));
    }, [form.district]);

    // Khi edit → đổ dữ liệu vào form
    useEffect(() => {
        if (!value || provinces.length === 0) return;
        if (mappedProvinceRef.current) return;

        const provinceId = getProvinceIdByName(value.province);
        if (!provinceId) return;

        mappedProvinceRef.current = true;

        setForm(prev => ({
            ...prev,
            province: provinceId,
        }));
    }, [value, provinces]);

    useEffect(() => {
        if (!value || !form.province || districts.length === 0) return;
        if (mappedDistrictRef.current) return;

        const districtId = getDistrictIdByName(value.district);
        if (!districtId) return;

        mappedDistrictRef.current = true;

        setForm(prev => ({
            ...prev,
            district: districtId,
        }));
    }, [districts, form.province]);


    useEffect(() => {
        if (!value || !form.district || wards.length === 0) return;
        if (mappedWardRef.current) return;

        const wardId = getWardIdByName(value.ward);
        if (!wardId) return;

        mappedWardRef.current = true;

        setForm(prev => ({
            ...prev,
            ward: wardId,
        }));
    }, [wards, form.district]);

    useEffect(() => {
        mappedProvinceRef.current = false;
        mappedDistrictRef.current = false;
        mappedWardRef.current = false;
    }, [value]);


    // convert id sang name
    const getProvinceName = (id: string) => provinces.find(p => p.province_id === id)?.province_name || "";
    const getDistrictName = (id: string) => districts.find(d => d.district_id === id)?.district_name || "";
    const getWardName = (id: string) => wards.find(w => w.ward_id === id)?.ward_name || "";

    // convert name sang id
    const getProvinceIdByName = (name: string) => provinces.find(p => p.province_name === name)?.province_id || "";
    const getDistrictIdByName = (name: string) => districts.find(d => d.district_name === name)?.district_id || "";
    const getWardIdByName = (name: string) => wards.find(w => w.ward_name === name)?.ward_id || "";

    // Cập nhật dữ liệu form và gọi callback onChange
    const handleChange = (field: keyof ShippingInfo, val: string | boolean) => {
        // Nếu đổi tỉnh → reset quận & phường
        if (field === "province") {
            setForm(prev => {
                const updated = {
                    ...prev,
                    province: val as string,
                    district: "",
                    ward: "",
                };
                onChange?.(updated);
                return updated;
            });
            return;
        }

        // Nếu đổi quận → reset phường
        if (field === "district") {
            setForm(prev => {
                const updated = {
                    ...prev,
                    district: val as string,
                    ward: "",
                };
                onChange?.(updated);
                return updated;
            });
            return;
        }

        // Các field khác
        if (form[field] !== val) {
            const updated = { ...form, [field]: val };
            setForm(updated);
            onChange?.(updated);
        }
    };

    // Submit form
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const submitData: ShippingInfo = {
            ...form,
            province: getProvinceName(form.province),
            district: getDistrictName(form.district),
            ward: getWardName(form.ward),
        };
        onSubmit?.(submitData);
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
                        value={form.recipientName}
                        onChange={e => handleChange("recipientName", e.target.value)}
                        placeholder="Trần Văn A"
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
                        value={form.phone}
                        onChange={e => handleChange("phone", e.target.value)}
                        placeholder="0123456789"
                    />
                </div>

                {/* Tỉnh / Thành phố */}
                <div className="col-md-4">
                    <label className="form-label">Tỉnh / Thành phố *</label>
                    <select
                        className="form-select"
                        required
                        value={form.province}
                        onChange={e => handleChange("province", e.target.value)}
                    >
                        <option value="">Chọn tỉnh</option>
                        {provinces.map(p => (
                            <option key={p.province_id} value={p.province_id}>
                                {p.province_name}
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
                        value={form.district}
                        disabled={!form.province}
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
                        value={form.ward}
                        disabled={!form.district}
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
                        value={form.addressLine}
                        onChange={e => handleChange("addressLine", e.target.value)}
                        placeholder="Số nhà, tên đường..."
                    />
                </div>

                {/* Đặt làm mặc định */}
                <div className="col-12">
                    <div className="form-check">
                        <input
                            className="form-check-input"
                            type="checkbox"
                            checked={form.isDefault}
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
