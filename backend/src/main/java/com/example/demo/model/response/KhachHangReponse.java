package com.example.demo.model.response;

import org.springframework.beans.factory.annotation.Value;

import java.util.Date;

public interface KhachHangReponse {
    @Value("#{target.id}")
    String getId();

//    @Value("#{target.anh_dai_dien}")
//    String getHinhAnh();

    @Value("#{target.ma}")
    String getMa();

    @Value("#{target.ho_ten}")
    String getHoTen();

    @Value("#{target.gioi_tinh}")
    String getGioiTinh();

    @Value("#{target.email}")
    String getEmail();

    @Value("#{target.so_dien_thoai}")
    String getSoDienThoai();

    @Value("#{target.mat_khau}")
    String getMatKhau();

    @Value("#{target.ngay_sinh}")
    Date getNgaySinh();

    @Value("#{target.trang_thai}")
    Integer getTrangThai();

    @Value("#{target.ngay_tao}")
    Date getNgayTao();

    @Value("#{target.mo_ta}")
    String getMoTa();

    @Value("#{target.phuong_xa}")
    String getPhuongXa();

    @Value("#{target.tinh_thanh_pho}")
    String getTinhThanhPho();

    @Value("#{target.quan_huyen}")
    String getQuanHuyen();


}
