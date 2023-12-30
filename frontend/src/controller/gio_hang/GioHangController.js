window.GioHangController = function (
  $http,
  $scope,
  $routeParams,
  $route,
  $filter,
  $window,
  $rootScope
) {
  if (!$rootScope.idKhachHang) {
    console.error("idKhachHang is not set in $rootScope.");
    return;
  }
  $scope.idKhachHang = $rootScope.idKhachHang;
  $http
    .get(gioHangAPI + "/hien-thi/" + $scope.idKhachHang)
    .then(function (response) {
      $scope.gioHangList = response.data;
      console.log("response.data", response.data);
      $rootScope.soLuongGioHangList = $scope.gioHangList.length;
      console.log("so luong gio hang:", $rootScope.soLuongGioHangList);

      // Tính tổng giá trị từ đơn giá
      $scope.tongGiaTri = 0;
      angular.forEach($scope.gioHangList, function (item) {
        // Chuyển đổi donGia sang kiểu số
        var donGia = parseFloat(item.donGia);

        // Kiểm tra xem có phải là số không
        if (!isNaN(donGia)) {
          item.donGia = $filter("number")(donGia, 0);
          // Tính toán tổng giá trị từ đơn giá
          $scope.tongGiaTri += donGia;

          // In ra console log để kiểm tra từng bước tính toán
          console.log("donGia:", donGia);
          console.log("Partial tongGiaTri:", $scope.tongGiaTri);
        } else {
          console.error("Invalid donGia:", item);
        }
      });

      // In ra console log để kiểm tra giá trị cuối cùng của tongGiaTri
      console.log("Final tongGiaTri:", $scope.tongGiaTri);
    })
    .catch(function (error) {
      console.error("Error fetching gio hang:", error);
    });

  $scope.xoaGioHang = function (goiHangId) {
    // Hộp thoại xác nhận trước khi xóa
    var xacNhan = confirm("Bạn có chắc chắn muốn xóa giỏ hàng này không?");
    if (!xacNhan) {
      return; // Người dùng đã hủy xác nhận
    }

    $http
      .delete(gioHangAPI + "/delete/" + goiHangId)
      .then(function (response) {
        console.log("Xóa gio hang thành công:", response.data);
        $route.reload();
      })
      .catch(function (error) {
        console.error("Lỗi xóa sản phẩm:", error.data);
      });
  };
  $scope.increaseQuantity = function (item) {
    if (item.soLuong < item.soLuongSp) {
      item.soLuong++; // Tăng số lượng

      $scope.capNhatGioHangChiTiet(item); // Cập nhật giỏ hàng
      $route.reload();
    } else {
      window.alert("Số lượng vượt quá tồn kho của sản phẩm");
      // Hoặc có thể sử dụng một thư viện cảnh báo như SweetAlert2 để tạo thông báo đẹp hơn.
    }
  };

  $scope.decreaseQuantity = function (item) {
    if (item.soLuong > 1) {
      item.soLuong--; // Giảm số lượng, nhưng không thể dưới 1
      $scope.capNhatGioHangChiTiet(item); // Cập nhật giỏ hàng
      $route.reload();
    } else {
      // Nếu số lượng là 1, gọi hàm xóa sản phẩm
      $scope.xoaGioHang(item.idGioHang);
    }
  };

  $scope.capNhatGioHangChiTiet = function (item) {
    var gioHangChiTietRequest = {
      gioHangChiTietId: item.idGioHangChiTiet,
      sanPhamChiTietId: item.idSanPhamChiTiet,
      khachHangId: item.idKhachHang,
      soLuong: item.soLuong,
    };

    $http
      .put(gioHangAPI + "/update", gioHangChiTietRequest)
      .then(function (response) {
        console.log("Cập nhật gio hang chi tiet thành công:", response.data);
      })
      .catch(function (error) {
        console.error("Lỗi cập nhật giỏ hàng chi tiết:", error.data);
      });
  };
};