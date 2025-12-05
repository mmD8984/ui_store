import React, { useState } from "react";
import axios from "axios";
import { Box, Button, Typography, CircularProgress } from "@mui/material";

const UploadImage: React.FC = () => {
    const [preview, setPreview] = useState<string | null>(null);
    const [file, setFile] = useState<File | null>(null);
    const [loading, setLoading] = useState(false);
    const [uploadedUrl, setUploadedUrl] = useState<string | null>(null);
    const [publicId, setPublicId] = useState<string | null>(null);


    const handleChooseFile = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files[0]) {
            const selected = event.target.files[0];
            setFile(selected);
            setPreview(URL.createObjectURL(selected));
        }
    };

    const handleUpload = async () => {
        if (!file) return;

        const formData = new FormData();
        formData.append("file", file);

        setLoading(true);

        try {
            const res = await axios.post(
                "http://localhost:8080/api/images/upload",
                formData,
                {
                    headers: { "Content-Type": "multipart/form-data" }
                }
            );

            if (res.data.success) {
                setUploadedUrl(res.data.url);
                setPublicId(res.data.public_id);
            } else {
                alert("Upload lỗi: " + res.data.message);
            }

        } catch (error) {
            console.error(error);
            alert("Upload thất bại!");
        }

        setLoading(false);
    };

    return (
        <Box sx={{ width: "100%", maxWidth: 420, mx: "auto", textAlign: "center", mt: 4 }}>
            <Typography variant="h6" sx={{ mb: 2 }}>
                Upload ảnh
            </Typography>

            <Box>
                <Button variant="contained" component="label" sx={{ backgroundColor: "#FF0800" }}>
                    Chọn ảnh
                    <input type="file" hidden accept="image/*" onChange={handleChooseFile} />
                </Button>
            </Box>

            {preview && (
                <Box sx={{ mt: 2 }}>
                    <img
                        src={preview}
                        alt="preview"
                        style={{ width: "100%", borderRadius: 8 }}
                    />
                </Box>
            )}

            <Box>
                <Button
                    variant="contained"
                    sx={{ mt: 2, backgroundColor: file ? "#32CD32" : undefined, }}
                    onClick={handleUpload}
                    disabled={loading || !file}
                >
                    {loading ? <CircularProgress size={24} /> : "Upload"}
                </Button>
            </Box>

            {uploadedUrl && (
                <Box sx={{ mt: 2 }}>
                    <Typography color="green">Upload thành công!</Typography>
                    <Typography mt={2} sx={{ whiteSpace: "nowrap" }}>
                        <strong>URL:</strong> {uploadedUrl}
                    </Typography>
                    <Typography>
                        <strong>public_id:</strong> {publicId}
                    </Typography>
                </Box>
            )}
        </Box>
    );
};

export default UploadImage;
