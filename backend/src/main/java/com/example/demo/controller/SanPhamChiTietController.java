package com.example.demo.controller;

import com.example.demo.model.request.SanPhamChiTietRequest;
import com.example.demo.model.request.UpdateSanPham;
import com.example.demo.service.SanPhamChiTietService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/san-pham-chi-tiet/")
@CrossOrigin(origins = {"*"}, maxAge = 4800, allowCredentials = "false")
public class SanPhamChiTietController {
    @Autowired
    private SanPhamChiTietService sanPhamChiTietService;

    @GetMapping("hien-thi")
    public ResponseEntity getSanPhamBanHang(@RequestParam(name = "pageNo", defaultValue = "0") String pageNo) {
        return new ResponseEntity(sanPhamChiTietService.getSanPhamBanHang(Integer.valueOf(pageNo)), HttpStatus.OK);
    }

    @GetMapping("trang-chu")
    public ResponseEntity getSanPhamTranChu() {
        return new ResponseEntity(sanPhamChiTietService.getSanPhamTrangChu(), HttpStatus.OK);
    }

    @GetMapping("hien-thi/{id}")
    public ResponseEntity getAll(@RequestParam(name = "pageNo", defaultValue = "0") String pageNo, @PathVariable("id") String id) {
        return new ResponseEntity(sanPhamChiTietService.getAll(Integer.valueOf(pageNo), UUID.fromString(id)), HttpStatus.OK);
    }

    @GetMapping("detail/{id}")
    public ResponseEntity detail(@PathVariable("id") String id) {
        return new ResponseEntity(sanPhamChiTietService.getOne(UUID.fromString(id)), HttpStatus.OK);
    }

    @GetMapping("detail-trang-chu/{id}")
    public ResponseEntity detailTrangChu(@PathVariable("id") String id) {
        return new ResponseEntity(sanPhamChiTietService.detailSanPham(UUID.fromString(id)), HttpStatus.OK);
    }

    @PostMapping("add")
    public ResponseEntity add(@RequestBody List<SanPhamChiTietRequest> sanPhamChiTietRequests) {
        return new ResponseEntity(sanPhamChiTietService.add(sanPhamChiTietRequests), HttpStatus.OK);
    }

    @PutMapping("update/{id}")
    public ResponseEntity update(@RequestBody SanPhamChiTietRequest sanPhamChiTietRequest, @PathVariable("id") String id) {
        return new ResponseEntity(sanPhamChiTietService.update(sanPhamChiTietRequest, UUID.fromString(id)), HttpStatus.OK);
    }

    @PutMapping("updatesl/{id}")
    public ResponseEntity updateSL(@RequestBody int soLuong, @PathVariable("id") String id) {
        return new ResponseEntity(sanPhamChiTietService.updateSL(soLuong, UUID.fromString(id)), HttpStatus.OK);
    }

    @PutMapping("update-so-luong")
    public ResponseEntity update(@RequestBody List<UpdateSanPham> updateSanPhams) {
        return new ResponseEntity(sanPhamChiTietService.updateSoLuong(updateSanPhams), HttpStatus.OK);
    }

}
