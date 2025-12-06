import React, { useState } from "react";
import axios from "axios";
import { Box, Button, Typography, CircularProgress } from "@mui/material";

interface UploadedImage {
    url: string;
    public_id: string;
}

const UploadImage: React.FC = () => {
    const [previews, setPreviews] = useState<string[]>([]);
    const [files, setFiles] = useState<File[]>([]);
    const [loading, setLoading] = useState(false);
    const [uploadedImages, setUploadedImages] = useState<UploadedImage[]>([]);

    // Chọn nhiều file
    const handleChooseFiles = (event: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFiles = event.target.files ? Array.from(event.target.files) : [];
        setFiles(selectedFiles);

        const previewUrls = selectedFiles.map(file => URL.createObjectURL(file));
        setPreviews(previewUrls);
    };

    // Upload nhiều file
    const handleUpload = async () => {
        if (files.length === 0) return;

        const formData = new FormData();
        files.forEach(file => formData.append("file", file));

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
                setUploadedImages(res.data.images);
                // alert("Upload thành công " + res.data.images.length + " ảnh!");
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
        <Box sx={{ width: "100%", maxWidth: 600, mx: "auto", textAlign: "center", mt: 4 }}>
            <Typography variant="h6" sx={{ mb: 2 }}>
                Upload ảnh
            </Typography>

            <Box>
                <Button variant="contained" component="label" sx={{ backgroundColor: "#FF0800" }}>
                    Chọn ảnh
                    <input
                        type="file"
                        multiple
                        hidden
                        accept="image/*"
                        onChange={handleChooseFiles}
                    />
                </Button>
            </Box>

            {previews.length > 0 && (
                <Box sx={{ mt: 2, display: "flex", gap: 2, flexWrap: "wrap", justifyContent: "center" }}>
                    {previews.map((url, index) => (
                        <img
                            key={index}
                            src={url}
                            alt={`preview-${index}`}
                            style={{ width: "120px", height: "120px", objectFit: "cover", borderRadius: 8 }}
                        />
                    ))}
                </Box>
            )}

            <Box>
                <Button
                    variant="contained"
                    sx={{ mt: 2, backgroundColor: files.length > 0 ? "#32CD32" : undefined }}
                    onClick={handleUpload}
                    disabled={loading || files.length === 0}
                >
                    {loading ? <CircularProgress size={24} /> : "Upload"}
                </Button>
            </Box>

            {uploadedImages.length > 0 && (
                <Box sx={{ mt: 4, textAlign: "left" }}>
                    <Typography color="green" variant="subtitle1" sx={{ textAlign: "center" }}>Upload thành công!</Typography>

                    {uploadedImages.map((img, index) => (
                        <Box key={index} sx={{ mt: 2 }}>
                            <Typography>
                                <strong>URL:</strong> <br /> {img.url}
                            </Typography>
                            <Typography>
                                <strong>public_id:</strong> <br /> {img.public_id}
                            </Typography>
                        </Box>
                    ))}
                </Box>
            )}
        </Box>
    );
};

export default UploadImage;
8