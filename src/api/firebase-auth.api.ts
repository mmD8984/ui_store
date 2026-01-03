import { auth, googleProvider } from "../firebase/firebase.ts";
import { FirebaseError } from "firebase/app";
import { signInWithPopup, signInWithEmailAndPassword, createUserWithEmailAndPassword, sendEmailVerification, sendPasswordResetEmail, signOut } from "firebase/auth";

/** --- Google Login --- */
export const loginWithGoogle = async () => {
    try {
        googleProvider.setCustomParameters({prompt: "select_account"});
        const result = await signInWithPopup(auth, googleProvider);
        return result.user;
    } catch (error: unknown) {
        let message = "Đăng nhập Google thất bại. Vui lòng thử lại.";
        if (error instanceof FirebaseError) {
            switch (error.code) {
                case "auth/popup-closed-by-user":
                    message = "Bạn đã đóng cửa sổ đăng nhập Google.";
                    break;
                case "auth/cancelled-popup-request":
                    message = "Bạn đang mở quá nhiều cửa sổ đăng nhập.";
                    break;
                case "auth/popup-blocked":
                    message = "Trình duyệt đã chặn cửa sổ đăng nhập Google.";
                    break;
            }
        }
        throw new Error(message);
    }
};

/** --- Email/Password Login --- */
export const loginWithEmailPassword = async (email: string, password: string) => {
    try {
        const result = await signInWithEmailAndPassword(auth, email, password);
        return result.user;
    } catch (error: unknown) {
        let message = "Đăng nhập thất bại. Vui lòng thử lại.";
        if (error instanceof FirebaseError) {
            switch (error.code) {
                case "auth/invalid-credential":
                    message = "Email hoặc mật khẩu không đúng.";
                    break;
                case "auth/user-disabled":
                    message = "Tài khoản của bạn đã bị vô hiệu hóa.";
                    break;
            }
        }
        throw new Error(message);
    }
};

/** --- Email/Password Register --- */
export const registerWithEmailPassword = async (email: string, password: string) => {
    try {
        const result = await createUserWithEmailAndPassword(auth, email, password);
        await sendEmailVerification(result.user);
        return result.user;
    } catch (error: unknown) {
        let message = "Đăng ký thất bại. Vui lòng thử lại.";
        if (error instanceof FirebaseError) {
            switch (error.code) {
                case "auth/email-already-in-use":
                    message = "Email này đã được đăng ký.";
                    break;
                case "auth/weak-password":
                    message = "Mật khẩu quá yếu, vui lòng đặt mật khẩu khác.";
                    break;
            }
        }
        throw new Error(message);
    }
};

/** --- Forgot Password --- */
export const sendPasswordReset = async (email: string) => {
    await sendPasswordResetEmail(auth, email);
};

/** --- Logout --- */
export const logoutUser = async () => {
    try {
        await signOut(auth);
        return true;
    } catch {
        throw new Error("Đăng xuất thất bại. Vui lòng thử lại.");
    }
};