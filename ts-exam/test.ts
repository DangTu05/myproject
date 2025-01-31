interface product {
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: number | string;
}
interface cart {
  code: number;
  orderDate: Date;
  total: number;
}
const Product: product = {
  title: "Áo",
  price: 1000,
  description: "Sản phẩm đẹp",
  category: "Thời trang",
  image: "ao.jpg",
  rating: "4",
};
console.log(Product);

/// intersection type
type productInfo = product & cart;

/// generics
const array = <T>(array: T[]): T[] => {
  return array;
};
console.log(array([1, 2, 3, 4]));

/// Declaration merging (gộp 2 interface trùng tên thành 1)

/// Partial<Type> thay đổi tất cả các thuộc tính của đối tượng thành tùy chọn(optional)
interface User {
  name: string;
  age: number;
}
const user1: User = {
  name: "Tú",
  age: 19,
};
const user2: Partial<User> = {
  name: "Tú",
};
console.log(user2);

/// Required<Type> chuyển tất cả các thuộc tính của đối tượng thành bắt buộc

/// Omit<Type,Keys> Xóa 1 hoặc nhiều thuộc tính ra khỏi đối tượng
interface User {
  name: string;
  age: number;
}
const user3: Omit<User, "age"> = {
  name: "Tú",
};
console.log(user3);

///Pick<Type,Keys> Xóa tất cả thuộc tính ra khỏi đối tượng trừ thuộc tính muốn giữ lại
///Readonly<Type> Chuyển các thuộc tính thành chỉ đọc