import React from "react";
import { Shield, Bell } from "lucide-react";
import { Button, Card } from "react-bootstrap";

export default function SettingsContent(): React.ReactElement {
    return (
        <div className="mb-5">
            <h2 className="mb-4 fw-bold">Cài đặt tài khoản</h2>

            <div className="d-grid gap-4">
                {/* Security */}
                <Card className="shadow-sm">
                    <Card.Body>
                        <div className="mb-2 d-flex align-items-center gap-2">
                            <Shield className="text-dark" />
                            <h5 className="mb-0">Bảo mật</h5>
                        </div>
                        <p className="text-muted mb-3">
                            Quản lý mật khẩu và các tùy chọn bảo mật.
                        </p>

                        <div className="d-flex justify-content-between align-items-center py-2">
                            <div>
                                <p className="fw-medium mb-1">Mật khẩu</p>
                                <p className="text-muted mb-0 small">
                                    Thay đổi mật khẩu đăng nhập của bạn.
                                </p>
                            </div>
                            <Button variant="outline-dark" size="sm">Cập nhật</Button>
                        </div>

                        <hr />

                        <div className="d-flex justify-content-between align-items-center py-2">
                            <div>
                                <p className="fw-medium mb-1">Xác thực 2 yếu tố (2FA)</p>
                                <p className="text-muted mb-0 small">
                                    Tăng cường bảo mật cho tài khoản của bạn.
                                </p>
                            </div>
                            <Button variant="outline-dark" size="sm">Thiết lập</Button>
                        </div>
                    </Card.Body>
                </Card>

                {/* Notifications */}
                <Card className="shadow-sm">
                    <Card.Body>
                        <div className="mb-2 d-flex align-items-center gap-2">
                            <Bell className="text-dark" />
                            <h5 className="mb-0">Thông báo</h5>
                        </div>
                        <p className="text-muted mb-3">
                            Quản lý cách bạn nhận thông báo từ chúng tôi.
                        </p>

                        <div className="d-flex justify-content-between align-items-center py-2">
                            <div>
                                <p className="fw-medium mb-1">Email thông báo</p>
                                <p className="text-muted mb-0 small">
                                    Nhận thông tin về đơn hàng và khuyến mãi qua email.
                                </p>
                            </div>
                            <Button variant="outline-dark" size="sm">Cấu hình</Button>
                        </div>
                    </Card.Body>
                </Card>
            </div>
        </div>
    );
}
