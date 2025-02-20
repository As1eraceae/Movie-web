// seeders/seedAdmin.js
const Admin = require('../models/Admin');

async function seedAdmin() {
  // Xóa sạch dữ liệu cũ nếu cần (chỉ dùng cho thử nghiệm)
  await Admin.destroy({ where: {} });

  // Tạo admin với thông tin mẫu
  await Admin.create({
    username: 'superadmin',
    email: 'admin@example.com',
    password: 'adminpassword'  
  });
  console.log('Seed admin thành công!');
}

seedAdmin().catch(err => console.error(err));
