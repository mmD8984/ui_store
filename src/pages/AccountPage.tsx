import {Box, Container, Divider, Link, Stack, Typography} from "@mui/material";
import React from "react";
// import AccountInformation   from "../../components/client/profile/AccountInformation";
import {Link as RouterLink, useLocation } from "react-router-dom";

const InformationPage = () => {
    const location = useLocation();
    const pathName = location.pathname.split("/")[2];

    return (
        <Box sx={{ my: 3}}>
            {/*title*/}
            <Box className="mb-4">
                <Typography variant="h4" fontWeight="bold" gutterBottom sx={{pt:2, textAlign: 'center' }}>
                    Tài khoản của bạn
                </Typography>
                <Box sx={{width: '70px', height: '4px', backgroundColor: '#333', margin: '0 auto', borderRadius: '2px'}}/>
            </Box>
            <Divider sx={{ my: 2, height: '1px', backgroundColor: 'black' }} />
            {/*content*/}
            <Container sx={{ mt: 5 }}>
                <Box className="col-md-12 col-sm-12 col-xs-12">
                    <Box className="row">
                        {/*tab menu*/}
                        <Box className="col-md-3 col-sm-12 col-xs-12">
                            <Typography variant="h6" fontWeight="bold" gutterBottom sx={{ pb: 4}}>TÀI KHOẢN</Typography>
                            <Stack spacing={2}>
                                <Link component={RouterLink} className={`pb-1 text-black text-decoration-none ${pathName === "information" ? "fw-bold" : ""}`} to={"/profile/information"}>Thông tin tài khoản</Link>
                                <Link component={RouterLink} className={`pb-1 text-black text-decoration-none ${pathName === "address" ? "fw-bold" : ""}`} to={"/profile/address"}>Danh sách địa chỉ</Link>
                            </Stack>
                        </Box>
                        {/*infor*/}
                        <Box className="col-md-9 col-sm-12 col-xs-12">
                            {/*<AccountInformation*/}
                            {/*    email="vanhafpt2018@gmail.com"*/}
                            {/*    lastName="Trần Văn"*/}
                            {/*    firstName="Hà"*/}
                            {/*    gender="male"*/}
                            {/*    dob="2002-08-09"*/}
                            {/*/>*/}
                        </Box>
                    </Box>
                </Box>
            </Container>
        </Box>
    );
}
export default InformationPage;