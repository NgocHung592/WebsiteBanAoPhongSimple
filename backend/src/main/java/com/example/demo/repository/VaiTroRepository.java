package com.example.demo.repository;

import com.example.demo.entity.HangKhachHang;
import com.example.demo.entity.VaiTro;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface VaiTroRepository extends JpaRepository<VaiTro, UUID> {
    @Query("select vt from VaiTro  vt where vt.trangThai=1")
    List<VaiTro> getListStatus();
}
