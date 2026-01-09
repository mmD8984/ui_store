import axiosClient from "@/lib/axiosClient";

export interface UserAddress {
    id: number;
    recipientName: string;
    phone: string;
    addressLine: string;
    ward: string;
    district: string;
    province: string;
    isDefault: boolean;
}

export const getAddresses = async (): Promise<UserAddress[]> => {
    const res = await axiosClient.get("/user/addresses");
    return res.data;
};

export const addAddress = async (data: Omit<UserAddress, "id">): Promise<UserAddress> => {
    const res = await axiosClient.post("/user/addresses", data);
    return res.data;
};

export const updateAddress = async (id: number, data: Partial<UserAddress>): Promise<UserAddress> => {
    const res = await axiosClient.put(`/user/addresses/${id}`, data);
    return res.data;
};

export const setDefaultAddress = async (id: number): Promise<UserAddress> => {
    const res = await axiosClient.put(`/user/addresses/${id}/default`);
    return res.data;
};

export const deleteAddress = async (id: number): Promise<void> => {
    await axiosClient.delete(`/user/addresses/${id}`);
};