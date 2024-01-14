package com.example.demo.repository;

import com.example.demo.entity.HoaDon;
import com.example.demo.model.response.ThongKeReponse;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import java.util.List;
import java.util.Date;
import java.util.UUID;

@Repository
public interface ThongKeRepository extends JpaRepository<HoaDon, UUID> {
    @Query(value = """
    SELECT
        MAX(ngay) AS ngay,
        MAX(thang) AS thang,
        MAX(nam) AS nam,
        MAX(tong_don_hang_ngay) AS tong_don_hang_ngay,
        MAX(tong_san_pham_ngay) AS tong_san_pham_ngay,
        MAX(tong_doanh_thu_ngay) AS tong_doanh_thu_ngay,
        MAX(tong_don_hang_thang) AS tong_don_hang_thang,
        MAX(tong_san_pham_thang) AS tong_san_pham_thang,
        MAX(tong_doanh_thu_thang) AS tong_doanh_thu_thang
    FROM (
        SELECT
            DAY(hd.ngay_thanh_toan) AS ngay,
            MONTH(hd.ngay_thanh_toan) AS thang,
            YEAR(hd.ngay_thanh_toan) AS nam,
            SUM(CASE WHEN CONVERT(DATE, hd.ngay_thanh_toan) = CONVERT(DATE, GETDATE()) THEN 1 ELSE 0 END) AS tong_don_hang_ngay,
            SUM(CASE WHEN CONVERT(DATE, hd.ngay_thanh_toan) = CONVERT(DATE, GETDATE()) THEN hdct.tong_so_luong ELSE 0 END) AS tong_san_pham_ngay,
            SUM(CASE WHEN CONVERT(DATE, hd.ngay_thanh_toan) = CONVERT(DATE, GETDATE()) THEN hd.tong_tien ELSE 0 END) AS tong_doanh_thu_ngay,
            SUM(CASE WHEN MONTH(hd.ngay_thanh_toan) = MONTH(GETDATE()) AND YEAR(hd.ngay_thanh_toan) = YEAR(GETDATE()) THEN 1 ELSE 0 END) AS tong_don_hang_thang,
            SUM(CASE WHEN MONTH(hd.ngay_thanh_toan) = MONTH(GETDATE()) AND YEAR(hd.ngay_thanh_toan) = YEAR(GETDATE()) THEN hdct.tong_so_luong ELSE 0 END) AS tong_san_pham_thang,
            SUM(CASE WHEN MONTH(hd.ngay_thanh_toan) = MONTH(GETDATE()) AND YEAR(hd.ngay_thanh_toan) = YEAR(GETDATE()) THEN hd.tong_tien ELSE 0 END) AS tong_doanh_thu_thang
        FROM
            hoa_don hd
        JOIN (
            SELECT
                hoa_don_id,
                SUM(so_luong) AS tong_so_luong
            FROM
                hoa_don_chi_tiet
            GROUP BY
                hoa_don_id
        ) hdct ON hd.id = hdct.hoa_don_id
        WHERE
            hd.trang_thai = 3
        GROUP BY
            YEAR(hd.ngay_thanh_toan), MONTH(hd.ngay_thanh_toan), DAY(hd.ngay_thanh_toan)
        WITH ROLLUP
    ) AS subquery
    WHERE (ngay IS NOT NULL OR thang IS NOT NULL)  -- Loại bỏ dòng tổng cộng cuối cùng của ROLLUP
    
""", nativeQuery = true)
    List<ThongKeReponse> getThongKeTongHop();

    @Query(value = """
        SELECT
            DAY(hd.ngay_thanh_toan) AS ngay,
            MONTH(hd.ngay_thanh_toan) AS thang,
            YEAR(hd.ngay_thanh_toan) AS nam,
            COUNT(hdct.id) AS tong_san_pham,
            SUM(hd.tong_tien) AS tong_doanh_thu,
            COUNT(*) AS tong_don_hang
        FROM
            hoa_don hd
        JOIN
            hoa_don_chi_tiet hdct ON hd.id = hdct.hoa_don_id
        WHERE
            hd.trang_thai = 3
            AND hd.ngay_thanh_toan BETWEEN :startDate AND :endDate
        GROUP BY
            YEAR(hd.ngay_thanh_toan), MONTH(hd.ngay_thanh_toan), DAY(hd.ngay_thanh_toan)
    """, nativeQuery = true)
    List<ThongKeReponse> getThongKeTongHopByDateRange(
             Date startDate,
             Date endDate
    );
}
