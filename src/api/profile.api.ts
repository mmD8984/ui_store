import axiosClient from "@/lib/axiosClient";

export interface UserProfile {
    id: string;
    email: string;
    isEmailVerified: boolean;
    role: string;
    profile: {
        fullName: string | null;
        phone: string | null;
        birthDate: string | null;
        avatarUrl: string | null;
    };
}

export interface UpdateProfileRequest {
    profile: {
        fullName?: string;
        phone?: string;
        birthDate?: string;
    };
}


export const getProfile = async (): Promise<UserProfile> => {
    const res = await axiosClient.get("/user/profile");
    return res.data;
};

export const updateProfile = async (data: UpdateProfileRequest): Promise<UserProfile> => {
    const res = await axiosClient.put("/user/profile", data);
    return res.data;
};

export const uploadAvatar = async (file: File): Promise<UserProfile> => {
    const form = new FormData();
    form.append("file", file);
    const res = await axiosClient.put("/user/profile/avatar", form, {
        headers: { "Content-Type": "multipart/form-data" },});
    return res.data;
};