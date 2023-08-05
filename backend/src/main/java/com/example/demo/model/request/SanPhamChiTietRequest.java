package com.example.demo.model.request;

 import com.example.demo.entity.KichThuocChiTiet;
 import lombok.Builder;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

 import java.util.ArrayList;
 import java.util.UUID;

@Getter
@Setter
@Builder
@ToString
public class SanPhamChiTietRequest {

    private Double gia;

    private String daXoa;

    private String maSanPham;

    private String tenSanPham;

    private String moTa;

    private ArrayList<KichThuocChiTiet> kichThuocChiTiets;

    private UUID idChatLieu;

    private UUID idPhongCach;

    private UUID idHoaTiet;

    private UUID idCoAo;

    private UUID idTayAo;

    private UUID idMauSac;

}
