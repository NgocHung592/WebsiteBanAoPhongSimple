window.hienThiThongKeController = function ($scope) {
  //   $scope.chartData = [
  //     { date: "2023-01-01", value: 10 },
  //     { date: "2023-01-02", value: 20 },
  //     { date: "2023-01-03", value: 15 },
  //   ];

  //   $scope.chartLabels = $scope.chartData.map(function (item) {
  //     return moment(item.date).format("DD/MM/YYYY");
  //   });
  //   $scope.chartData = [
  //     { hour: 0, value: 10 },
  //     { hour: 1, value: 20 },
  //     { hour: 2, value: 15 },
  //     // ... thêm dữ liệu cho các giờ khác
  //   ];

  //   // Chuyển đổi định dạng giờ thành label mong muốn (giờ:phút)
  //   $scope.chartLabels = $scope.chartData.map(function (item) {
  //     return (item.hour < 10 ? "0" : "") + item.hour + ":00";
  //   });
  $scope.chartData = [
    { month: 1, value: 100000 },
    { month: 2, value: 20 },
    { month: 3, value: 15 },
    // ... thêm dữ liệu cho các tháng khác
  ];

  // Chuyển đổi định dạng tháng thành label mong muốn (tháng/năm)
  $scope.chartLabels = $scope.chartData.map(function (item) {
    return moment()
      .month(item.month - 1)
      .format("MM/YYYY");
  });
  var ctx = document.getElementById("myChart").getContext("2d");
  var myChart = new Chart(ctx, {
    type: "bar",
    data: {
      labels: $scope.chartLabels,
      datasets: [
        {
          label: "Doanh thu",
          data: $scope.chartData.map(function (item) {
            return item.value;
          }),
          backgroundColor: "rgba(75, 192, 192, 0.2)",
          borderColor: "rgba(75, 192, 192, 1)",
          borderWidth: 1,
        },
      ],
    },
    options: {
      scales: {
        y: {
          beginAtZero: true,
        },
      },
    },
  });
};
