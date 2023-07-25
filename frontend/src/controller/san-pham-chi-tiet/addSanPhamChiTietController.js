window.addSanPhamChiTietController = function ($http, $scope) {
  $scope.listSanPhamChiTiet = [];
  $scope.listDanhMucTrangThai = [];
  $scope.listChatLieuTrangThai = [];
  $scope.listSanPhamTrangThai = [];
  $scope.listHoaTietTrangThai = [];
  $scope.listPhongCachTrangThai = [];
  $scope.listMauSacTrangThai = [];
  $scope.listKichThuocTrangThai = [];
  $scope.listHoaTietTrangThai = [];
  $scope.listHoaTietTrangThai = [];
  $scope.listKieuDangTrangThai = [];

  $scope.currentPage = 0;
  $scope.totalPages = [];

  $scope.products = [];
  $scope.product = {
    idSanPham: "",
    idDanhMuc: "",
    idMauSac: "",
    idPhongCach: "",
    idChatLieu: "",
    idHoaTiet: "",
    idKichThuoc: "",
    gia: "",
    daXoa: false,
    soLuong: "",
  };
  $scope.addSizeAndQuanlity = function () {
    $scope.products.post($scope.product);
  };
  $scope.saveProduct = function (event) {
    event.preventDefault();
    $http
      .post(sanPhamChiTietAPI + "/add", $scope.products)
      .then(function (response) {
        alert("Them thanh cong");
      });
  };

  $http.get(chatLieuAPI + "/trang-thai").then(function (response) {
    $scope.listChatLieuTrangThai = response.data;
  });

  $http.get(danhMucAPI + "/trang-thai").then(function (response) {
    $scope.listDanhMucTrangThai = response.data;
  });

  $http.get(sanPhamAPI + "/trang-thai").then(function (response) {
    $scope.listSanPhamTrangThai = response.data;
  });

  $http.get(kieuDangAPI + "/trang-thai").then(function (response) {
    $scope.listKieuDangTrangThai = response.data;
  });

  $http.get(hoaTietAPI + "/trang-thai").then(function (response) {
    $scope.listHoaTietTrangThai = response.data;
  });

  $http.get(phongCachAPI + "/trang-thai").then(function (response) {
    $scope.listPhongCachTrangThai = response.data;
  });

  $http.get(mauSacAPI + "/trang-thai").then(function (response) {
    $scope.listMauSacTrangThai = response.data;
  });

  $http.get(kichThuocAPI + "/trang-thai").then(function (response) {
    $scope.listKichThuocTrangThai = response.data;
  });
};
