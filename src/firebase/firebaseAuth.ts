import { auth, googleProvider } from "./firebase";
import { signInWithPopup, signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth";

/** --- Google Login --- */
export const loginWithGoogle = async () => {
    try {
        const result = await signInWithPopup(auth, googleProvider);
        return result.user;
    } catch (error: unknown) {
        if (error instanceof Error) console.error("Google login error:", error.message);
        else console.error("Google login error:", error);
    }
};

/** --- Email/Password Login --- */
export const loginWithEmailPassword = async (email: string, password: string) => {
    try {
        const result = await signInWithEmailAndPassword(auth, email, password);
        return result.user;
    } catch (error: unknown) {
        if (error instanceof Error) console.error("Email login error:", error.message);
        else console.error("Email login error:", error);
        throw error;
    }
};

/** --- Email/Password Register --- */
export const registerWithEmailPassword = async (email: string, password: string) => {
    try {
        const result = await createUserWithEmailAndPassword(auth, email, password);
        return result.user;
    } catch (error: unknown) {
        if (error instanceof Error) console.error("Register error:", error.message);
        else console.error("Register error:", error);
        throw error;
    }
};
