package com.example.demo.service;

import com.example.demo.model.request.KieuDangRequest;
import org.springframework.data.domain.Page;

import java.util.List;
import java.util.UUID;

public interface KieuDangService {

    Page<KieuDang> getAll(Integer pageNo);

    List<KieuDang> getListStatus();

    KieuDang add(KieuDangRequest kieuDangRequest);

    KieuDang update(KieuDangRequest kieuDangRequest, UUID id);

    KieuDang detail(UUID id);

    void delete(UUID id);
}
