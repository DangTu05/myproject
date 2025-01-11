module.exports.Sort = (query) => {
  let sort = [
    {
      class: "",
      name: "Theo tên",
      sortKey:"product_name",
      sortValue:"asc"
    },
    {
      class: "",
      name: "Tăng dần",
      sortKey:"Price",
      sortValue:"asc"
    },
    {
      class: "",
      name: "Giảm dần",
      sortKey:"Price",
      sortValue:"desc"
    },
  ];
  if(query.sortKey && query.sortValue){
    const index=sort.findIndex((item)=>{
      return item.sortKey===query.sortKey && item.sortValue===query.sortValue
    })
    sort[index].class="active"
  }else{
    const index=sort.findIndex((item)=>{
      return item.class==="active"
    })
    sort[index].class=""
  }
  return sort;
};
