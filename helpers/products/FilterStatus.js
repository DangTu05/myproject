module.exports = (query) => {
  let FilterStatus = [
    {
      name: "Hoạt Động",
      status: "active",
      class: "",
    },
    {
      name: "Dừng Hoạt Động",
      status: "inactive",
      class: "",
    },
    {
      name: "Tất Cả",
      status: "",
      class: "",
    },
  ];

  if (query.status) {
    const index = FilterStatus.findIndex((item) => {
      return item.status === query.status;
    });
    FilterStatus[index].class = "active";
  } else {
    const index = FilterStatus.findIndex((item) => {
      return item.status === "";
    });
    FilterStatus[index].class = "active";
  }
  return FilterStatus;
};
