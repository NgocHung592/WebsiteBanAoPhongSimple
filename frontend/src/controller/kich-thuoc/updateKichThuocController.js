window.updateKichThuocController = function (
  $http,
  $scope,
  $routeParams,
  $location,
  $rootScope
) {
  const toastLiveExample = document.getElementById("liveToast");
  const toastBootstrap = bootstrap.Toast.getOrCreateInstance(toastLiveExample);

  $scope.formKichThuoc = {
    id: "",
    ma: "",
    ten: "",
    trangThai: Boolean,
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
  $http
    .get(kichThuocAPI + "/detail/" + $routeParams.id)
    .then(function (response) {
      if (response.status == 200) {
        $scope.formKichThuoc = response.data;
      }
    });

  $scope.update = function (e, idKichThuoc) {
    e.preventDefault();

    if ($scope.formKichThuoc.ten === "") {
      $scope.message = "Tên kích thước không được trống";
      $scope.errorProgress();
      toastBootstrap.show();
      return;
    } else {
      $scope.updateKichThuoc = {
        ten: $scope.formKichThuoc.ten,
        ngaySua: new Date(),
        daXoa: $scope.formKichThuoc.daXoa,
      };
      $http
        .put(kichThuocAPI + "/update/" + idKichThuoc, $scope.updateKichThuoc)
        .then(function () {
          $rootScope.message = "Cập nhật thành công";
          $location.path("/kich-thuoc/hien-thi");
        });
    }
  };
};
