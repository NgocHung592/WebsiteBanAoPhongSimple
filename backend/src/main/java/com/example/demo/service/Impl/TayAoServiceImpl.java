package com.example.demo.service.Impl;

import com.example.demo.entity.CoAo;
import com.example.demo.entity.TayAo;
import com.example.demo.repository.TayAoRepository;
import com.example.demo.service.TayAoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.sql.Timestamp;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
public class TayAoServiceImpl implements TayAoService {

    @Autowired
    private TayAoRepository tayAoRepository;

    @Override
    public Page<TayAo> getAll(Integer pageNo) {
        Pageable pageable = PageRequest.of(pageNo, 10);
        return tayAoRepository.getAll(pageable);
    }

    @Override
    public List<TayAo> getAllByStatus() {
        return tayAoRepository.getAllByStatus();
    }

    @Override
    public TayAo add(TayAo tayAo) {
        if (tayAo.getMa().isBlank() || tayAo.getTen().isBlank()) {
            return null;
        }
        TayAo tayAoSave = TayAo.builder()
                .ma(tayAo.getMa())
                .ten(tayAo.getTen())
                .ngayTao(tayAo.getNgayTao())
                .nguoiTao("Hưng")
                .daXoa(tayAo.getDaXoa())
                .build();
        return tayAoRepository.save(tayAoSave);

    }

    @Override
    public TayAo update(TayAo tayAo, UUID id) {
        Optional<TayAo> optionalTayAo=tayAoRepository.findById(id);
        if (optionalTayAo.isPresent()) {
            optionalTayAo.map(tayAoUpdate->{
                tayAoUpdate.setTen(tayAo.getTen());
                tayAoUpdate.setNgaySua(tayAo.getNgaySua());
                tayAoUpdate.setNguoiSua("Hưng");
                tayAoUpdate.setDaXoa(tayAo.getDaXoa());
                return tayAoRepository.save(tayAoUpdate);

            }).orElse(null);

        }
        return null;

    }

    @Override
    public Optional<TayAo> detail(UUID id) {
        return tayAoRepository.findById(id);
    }

    @Override
    public void delete(UUID id) {
        tayAoRepository.deleteById(id);
    }
}
