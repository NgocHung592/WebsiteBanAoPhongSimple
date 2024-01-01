window.detailSanPhamController = function (
  $scope,
  $http,
  $routeParams,
  $rootScope
) {
  $scope.currentPage = 0;
  $scope.totalPages = [];
  $scope.listSanPhamChiTiet = [];
  $scope.listNewSanPhamChiTiet = [];
  $scope.showSPCT = false;

  $scope.getSanPhamChiTiet = function () {
    $http
      .get(
        sanPhamChiTietAPI +
          "/hien-thi/" +
          $routeParams.id +
          "?pageNo=" +
          $scope.currentPage
      )
      .then(function (response) {
        $scope.listSanPhamChiTiet = response?.data.content;
        console.log($scope.listSanPhamChiTiet);
        const groupedSanPham = {};
        $scope.listSanPhamChiTiet.forEach((sanPham) => {
          const tenSanPham = sanPham.tenSanPham;

          if (!groupedSanPham[tenSanPham]) {
            groupedSanPham[tenSanPham] = {
              ...sanPham,
              tenMauSac: [sanPham.tenMauSac],
              tenKichThuoc: [sanPham.tenKichThuoc],
              duongDan: [sanPham.duongDan],
              giaMin: sanPham.donGia,
              giaMax: sanPham.donGia,
            };
          } else {
            groupedSanPham[tenSanPham].giaMin = Math.min(
              groupedSanPham[tenSanPham].giaMin,
              sanPham.donGia
            );
            groupedSanPham[tenSanPham].giaMax = Math.max(
              groupedSanPham[tenSanPham].giaMax,
              sanPham.donGia
            );
            if (
              !groupedSanPham[tenSanPham].tenMauSac.includes(sanPham.tenMauSac)
            ) {
              groupedSanPham[tenSanPham].tenMauSac.push(sanPham.tenMauSac);
            }
            if (
              !groupedSanPham[tenSanPham].tenKichThuoc.includes(
                sanPham.tenKichThuoc
              )
            ) {
              groupedSanPham[tenSanPham].tenKichThuoc.push(
                sanPham.tenKichThuoc
              );
            }
            if (
              !groupedSanPham[tenSanPham].duongDan.includes(sanPham.duongDan)
            ) {
              groupedSanPham[tenSanPham].duongDan.push(sanPham.duongDan);
            }
          }
        });

        // Chuyển đổi object thành mảng
        $scope.listNewSanPhamChiTiet = Object.values(groupedSanPham);

        console.log($scope.listNewSanPhamChiTiet);
      });
  };
  $scope.getSanPhamChiTiet();
  $scope.selectdMauSac = function (mauSac) {
    $scope.searchMauSac = mauSac;
    $scope.listSanPhamChiTiet.filter((sanPham) => {
      if (
        sanPham.tenKichThuoc == $scope.searchKichThuoc &&
        sanPham.tenMauSac == $scope.searchMauSac
      ) {
        $scope.sanPhamCT = sanPham;
        console.log("list spct", sanPham);
        $scope.idSPCT = sanPham.idSanPhamChiTiet;
        console.log("id san pham chi tiet:", $scope.idSPCT);
        $scope.goiHang.sanPhamChiTietId = $scope.idSPCT;
        $scope.soLuongSp = sanPham.soLuong;
        console.log("so luong san pham chi tiet:", $scope.soLuongSp);
        $scope.showSPCT = true;
      }
    });
  };
  $scope.selectdKichThuoc = function (kichThuoc) {
    $scope.searchKichThuoc = kichThuoc;
    $scope.listSanPhamChiTiet.filter((sanPham) => {
      if (
        sanPham.tenKichThuoc == $scope.searchKichThuoc &&
        sanPham.tenMauSac == $scope.searchMauSac
      ) {
        $scope.idSPCT = sanPham.idSanPhamChiTiet;
        console.log("id san pham chi tiet:", $scope.idSPCT);
        $scope.sanPhamCT = sanPham;
        console.log("list spct", sanPham);
        $scope.soLuongSp = sanPham.soLuong;
        $scope.goiHang.sanPhamChiTietId = $scope.idSPCT;
        console.log("so luong san pham chi tiet:", $scope.soLuongSp);
        $scope.showSPCT = true;
      }
    });
  };
  if (!$rootScope.idKhachHang) {
    console.error("idKhachHang is not set in $rootScope.");
    return;
  }
  $scope.idKhachHang = $rootScope.idKhachHang;
  console.log("id:", $rootScope.idKhachHang);
  $scope.goiHang = {
    sanPhamChiTietId: $scope.idSPCT,
    khachHangId: $scope.idKhachHang,
    soLuong: 1,
  };

  $scope.incrementQuantity = function () {
    console.log("Incrementing quantity");
    $scope.goiHang.soLuong++;
  };

  $scope.decrementQuantity = function () {
    console.log("Decrementing quantity");
    if ($scope.goiHang.soLuong > 1) {
      $scope.goiHang.soLuong--;
    }
  };
  $scope.addGioHang = function () {
    $http.post(gioHangAPI + "/them", $scope.goiHang).then(function (response) {
      if (response.data && typeof response.data === "object") {
        if (response.data.status === "success") {
          // Hiển thị thông báo thành công
          alert(response.data.message);
        } else {
          // Hiển thị thông báo lỗi
          alert(
            "Có lỗi xảy ra khi thêm vào giỏ hàng: " + response.data.message
          );
        }
      } else {
        // Hiển thị thông báo lỗi nếu phản hồi không hợp lệ
        alert("Có lỗi xảy ra khi thêm vào giỏ hàng: Phản hồi không hợp lệ.");
      }
    });
  };
};
