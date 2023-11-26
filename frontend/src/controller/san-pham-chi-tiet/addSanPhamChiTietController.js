window.addSanPhamChiTietController = function (
  $http,
  $scope,
  $location,
  $rootScope
) {
  $scope.totalPages = [];
  $scope.products = [];
  $scope.productDetails = [];
  $scope.sizeAndQuantitys = [];
  $scope.colors = [];
  $scope.sizeAndColors = [];
  $scope.newSizeAndColors = [];
  $scope.selectedFiles = [];

  $scope.currentPage = 0;
  $scope.randoomSanPham = "SP" + Math.floor(Math.random() * 10000) + 1;
  const toastLiveExample = document.getElementById("liveToast");
  const toastBootstrap = bootstrap.Toast.getOrCreateInstance(toastLiveExample);
  $scope.product = {
    maSanPham: $scope.randoomSanPham,
    tenSanPham: "",
    moTa: "",
    idPhongCach: "",
    idChatLieu: "",
    idHoaTiet: "",
    idCoAo: "",
    idTayAo: "",
    idMauSac: "",
    daXoa: false,
  };
  $scope.sizeAndQuantity = {
    tenKichThuoc: "",
    soLuong: "",
    gia: "",
    urlImage: "",
  };
  $scope.color = {
    tenMauSac: "",
  };

  $scope.selectFile = function (tenMauSac, index) {
    var productImageInput = document.getElementById("product-image");

    productImageInput.click();

    productImageInput.addEventListener("change", handleImageChange);

    function handleImageChange(event) {
      $scope.$apply(function () {
        var selectedFiles = event.target.files;
        if (
          $scope.groupedProducts[tenMauSac] &&
          $scope.groupedProducts[tenMauSac].length > index
        ) {
          var product = $scope.groupedProducts[tenMauSac];
          product.forEach((product) => {
            for (const file of selectedFiles) {
              if (file == "") {
                $scope.newSizeAndColors.push(product);
                return;
              } else {
                var newProduct = Object.assign({}, product);
                newProduct.urlImage = file.name;
                $scope.newSizeAndColors.push(newProduct);
                return;
              }
            }
          });
        }
      });

      productImageInput.removeEventListener("change", handleImageChange);
    }
  };

  $scope.addKichThuoc = function (index) {
    $scope.listKichThuocTrangThai[index].checked =
      !$scope.listKichThuocTrangThai[index].checked;
    if ($scope.listKichThuocTrangThai[index].checked) {
      $scope.sizeAndQuantity = {
        tenKichThuoc: $scope.listKichThuocTrangThai[index].ten,
        soLuong: 10,
        gia: 100000,
        daXoa: false,
      };
      let newSizeAndQuantity = angular.copy($scope.sizeAndQuantity);
      $scope.sizeAndQuantitys.push(newSizeAndQuantity);
    } else {
      $scope.sizeAndQuantitys.splice(index, 1);
    }
  };
  $scope.addMauSac = function (index) {
    $scope.listMauSacTrangThai[index].checked =
      !$scope.listMauSacTrangThai[index].checked;
    if ($scope.listMauSacTrangThai[index].checked) {
      $scope.color = {
        tenMauSac: $scope.listMauSacTrangThai[index].ten,
      };
      let newColor = angular.copy($scope.color);
      $scope.colors.push(newColor);
    } else {
      $scope.colors.splice(index, 1);
    }
  };
  $scope.renderMota = function () {
    if ($scope.product.tenSanPham) {
      $http
        .get(sanPhamAPI + "/find/" + $scope.product.tenSanPham)
        .then(function (response) {
          if (response?.data?.moTa) {
            $scope.product.moTa = response.data.moTa;
          } else {
            return;
          }
        });
    } else {
      $scope.product.moTa = null;
    }
  };
  $scope.addSizeAndColor = function () {
    $scope.sizeAndQuantitys.forEach((size) => {
      $scope.colors.forEach((color) => {
        $scope.sizeAndColor = {
          tenKichThuoc: size.tenKichThuoc,
          tenMauSac: color.tenMauSac,
          soLuong: size.soLuong,
          gia: size.gia,
          urlImage: "",
        };
        let newSizeAndColor = angular.copy($scope.sizeAndColor);
        let exists = false;
        for (let i = 0; i < $scope.sizeAndColors.length; i++) {
          let existingItem = $scope.sizeAndColors[i];

          if (angular.equals(existingItem, newSizeAndColor)) {
            exists = true;
            break;
          }
        }

        if (exists) {
          // console.log(newSizeAndColor);
        } else {
          $scope.sizeAndColors.push(newSizeAndColor);
        }
        $scope.groupedProducts = {};

        $scope.sizeAndColors.forEach((product) => {
          if (!$scope.groupedProducts[product.tenMauSac]) {
            $scope.groupedProducts[product.tenMauSac] = [];
          }
          $scope.groupedProducts[product.tenMauSac].push(product);
        });
      });
    });
  };
  $scope.removeSize = function (tenMauSac, index) {
    if (
      $scope.groupedProducts[tenMauSac] &&
      $scope.groupedProducts[tenMauSac].length > index
    ) {
      $scope.groupedProducts[tenMauSac].splice(index, 1);
      console.log($scope.groupedProducts);
    }
  };
  $scope.addSanPhamChiTiet = function (event) {
    event.preventDefault();
    $scope.newSizeAndColors.forEach((sizeAndColor) => {
      const newProductDetail = {
        maSanPham: $scope.product.maSanPham,
        tenSanPham: $scope.product.tenSanPham,
        moTa: $scope.product.moTa,
        idPhongCach: $scope.product.idPhongCach,
        idChatLieu: $scope.product.idChatLieu,
        idHoaTiet: $scope.product.idHoaTiet,
        idCoAo: $scope.product.idCoAo,
        idTayAo: $scope.product.idTayAo,
        tenKichThuoc: sizeAndColor.tenKichThuoc,
        tenMauSac: sizeAndColor.tenMauSac,
        soLuong: sizeAndColor.soLuong,
        donGia: sizeAndColor.gia,
        urlImage: sizeAndColor.urlImage,
        ngayTao: new Date(),
        daXoa: $scope.product.daXoa,
      };
      $scope.productDetails.push(newProductDetail);
    });

    if ($scope.product.tenSanPham == "") {
      toastBootstrap.show();
      $scope.message = "Tên sản phẩm không được trống";
      $scope.errorProgress();
      $scope.showError = false;
      return;
    } else if ($scope.product.moTa == "") {
      toastBootstrap.show();
      $scope.message = "Mô tả không được trống";
      $scope.errorProgress();
      $scope.showError = false;
      return;
    } else if ($scope.product.idChatLieu == "") {
      toastBootstrap.show();
      $scope.message = "Hãy chọn chất liệu";
      $scope.errorProgress();
      $scope.showError = false;
      return;
    } else if ($scope.product.idPhongCach == "") {
      toastBootstrap.show();
      $scope.message = "Hãy chọn phong cách";
      $scope.errorProgress();
      $scope.showError = false;
      return;
    } else if ($scope.product.idHoaTiet == "") {
      toastBootstrap.show();
      $scope.message = "Hãy chọn họa tiết";
      $scope.errorProgress();
      $scope.showError = false;
      return;
    } else if ($scope.product.idCoAo == "") {
      toastBootstrap.show();
      $scope.message = "Hãy chọn cổ áo";
      $scope.errorProgress();
      $scope.showError = false;
      return;
    } else if ($scope.product.idTayAo == "") {
      toastBootstrap.show();
      $scope.message = "Hãy chọn tay áo";
      $scope.errorProgress();
      $scope.showError = false;
      return;
    } else if ($scope.sizeAndColors.length === 0) {
      toastBootstrap.show();
      $scope.message = "Hãy chọn kích thước và màu sắc";
      $scope.errorProgress();
      $scope.showError = false;
      return;
    } else if ($scope.newSizeAndColors.length === 0) {
      toastBootstrap.show();
      $scope.message = "Hãy chọn ảnh";
      $scope.errorProgress();
      $scope.showError = false;
      return;
    } else {
      $http
        .post(sanPhamChiTietAPI + "/add", $scope.productDetails)
        .then(function () {
          $rootScope.message = "Thêm thành công";
          $rootScope.showError = true;
          $location.path("/san-pham/hien-thi");
        });
    }
  };
  $scope.errorProgress = function () {
    let elem = document.getElementById("error");
    let width = 100;
    let id = setInterval(frame, 10);

    function frame() {
      if (width <= 0) {
        clearInterval(id);
      } else {
        width--;
        elem.style.width = width + "%";
      }
    }
  };

  //load thuoc tinh theo trang thai kich hoat
  $scope.getChatLieuTrangThai = function () {
    $http.get(chatLieuAPI + "/trang-thai").then(function (response) {
      $scope.listChatLieuTrangThai = response.data;
    });
  };
  $scope.getChatLieuTrangThai();

  $scope.getSanPhamTrangThai = function (response) {
    $http.get(sanPhamAPI + "/trang-thai").then(function (response) {
      $scope.listSanPhamTrangThai = response.data;
    });
  };
  $scope.getSanPhamTrangThai();

  $scope.getHoaTietTrangThai = function () {
    $http.get(hoaTietAPI + "/trang-thai").then(function (response) {
      $scope.listHoaTietTrangThai = response.data;
    });
  };
  $scope.getHoaTietTrangThai();

  $scope.getPhongCachTrangThai = function () {
    $http.get(phongCachAPI + "/trang-thai").then(function (response) {
      $scope.listPhongCachTrangThai = response.data;
    });
  };
  $scope.getPhongCachTrangThai();

  $scope.getKichThuocTrangThai = function () {
    $http.get(kichThuocAPI + "/trang-thai").then(function (response) {
      $scope.listKichThuocTrangThai = response.data;
    });
  };
  $scope.getKichThuocTrangThai();

  $scope.getMauSacTrangThai = function () {
    $http.get(mauSacAPI + "/trang-thai").then(function (response) {
      $scope.listMauSacTrangThai = response.data;
    });
  };
  $scope.getMauSacTrangThai();

  $scope.getCoAoTrangThai = function () {
    $http.get(coAoAPI + "/trang-thai").then(function (response) {
      $scope.listCoAoTrangThai = response.data;
    });
  };
  $scope.getCoAoTrangThai();

  $scope.getTayAoTrangThai = function () {
    $http.get(tayAoAPI + "/trang-thai").then(function (response) {
      $scope.listTayAoTrangThai = response.data;
    });
  };
  $scope.getTayAoTrangThai();

  //add nhanh thuoc tinh
  $scope.randoomCL = "CL" + Math.floor(Math.random() * 10000) + 1;

  $scope.formChatLieu = {
    ma: $scope.randoomCL,
    ten: "",
    ngayTao: new Date(),
    daXoa: false,
  };
  $scope.addChatLieu = function () {
    $http.post(chatLieuAPI + "/add", $scope.formChatLieu).then(function () {
      $scope.getChatLieuTrangThai();
    });
  };

  $scope.randoomPC = "PC" + Math.floor(Math.random() * 10000) + 1;

  $scope.formPhongCach = {
    ma: $scope.randoomPC,
    ten: "",
    ngayTao: new Date(),
    daXoa: false,
  };
  $scope.addPhongCach = function () {
    $http.post(phongCachAPI + "/add", $scope.formPhongCach).then(function () {
      $scope.getPhongCachTrangThai();
    });
  };
  $scope.randoomHT = "HT" + Math.floor(Math.random() * 10000) + 1;

  $scope.formHoaTiet = {
    ma: $scope.randoomHT,
    ten: "",
    ngayTao: new Date(),
    daXoa: false,
  };
  $scope.addHoaTiet = function () {
    $http.post(hoaTietAPI + "/add", $scope.formHoaTiet).then(function () {
      $scope.getHoaTietTrangThai();
    });
  };
  $scope.randoomCA = "CA" + Math.floor(Math.random() * 10000) + 1;

  $scope.formCoAo = {
    ma: $scope.randoomCA,
    ten: "",
    ngayTao: new Date(),
    daXoa: false,
  };
  $scope.addCoAo = function () {
    $http.post(coAoAPI + "/add", $scope.formCoAo).then(function () {
      $scope.getCoAoTrangThai();
    });
  };
  $scope.randoomTA = "TA" + Math.floor(Math.random() * 10000) + 1;

  $scope.formTayAo = {
    ma: $scope.randoomTA,
    ten: "",
    ngayTao: new Date(),
    daXoa: false,
  };
  $scope.addTayAo = function () {
    $http.post(tayAoAPI + "/add", $scope.formTayAo).then(function () {
      $scope.getTayAoTrangThai();
    });
  };
  $scope.randoomKT = "KT" + Math.floor(Math.random() * 10000) + 1;

  $scope.formKichThuoc = {
    ma: $scope.randoomKT,
    ten: "",
    ngayTao: new Date(),
    daXoa: false,
  };
  $scope.addNewKichThuoc = function () {
    console.log("a");
    if ($scope.formKichThuoc.ten === "") {
      return;
    } else {
      $http.post(kichThuocAPI + "/add", $scope.formKichThuoc).then(function () {
        $scope.getKichThuocTrangThai();
      });
    }
  };
  $scope.formMauSac = {
    ma: "",
    ten: "",
    ngayTao: new Date(),
    daXoa: false,
  };
  $scope.addNewMauSac = function () {
    let colorStr = document.getElementById("color").value;
    let color = colorStr.slice(1, 7);

    $http.get(api_url + "/id?hex=" + color).then(function (response) {
      $scope.formMauSac.ten = response.data.name.value;
      $http.post(mauSacAPI + "/add", $scope.formMauSac).then(function () {
        $scope.getMauSacTrangThai();
      });
    });
  };
};
