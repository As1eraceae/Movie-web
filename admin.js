// admin.js
async function initAdmin() {
    // Sử dụng dynamic import để tải các module ESM của AdminJS
    const { default: AdminJS } = await import('adminjs');
    const { default: AdminJSExpress } = await import('@adminjs/express');
    const { default: AdminJSSequelize } = await import('@adminjs/sequelize');
  
    // Đăng ký adapter cho Sequelize
    if (typeof AdminJS.registerAdapter === 'function') {
      AdminJS.registerAdapter(AdminJSSequelize);
    } else {
      console.error('AdminJS.registerAdapter is not a function. Kiểm tra phiên bản AdminJS và adapter.');
    }
  
    // Import các model cần quản trị
    const Movie = require('./models/Movie');
    const Showtime = require('./models/Showtime');
    const User = require('./models/User');       // cho quản lý người dùng thông thường
    const Booking = require('./models/Booking');
    const Admin = require('./models/Admin');      // model admin riêng
  
    // Cấu hình AdminJS với các resource
    const adminJs = new AdminJS({
      resources: [
        { resource: Movie, options: {} },
        { resource: Showtime, options: {} },
        { resource: User, options: {} },
        { resource: Booking, options: {} },
        { resource: Admin, options: {} }  // cho phép quản lý admin nếu cần
      ],
      rootPath: '/admin',
      dashboard: {
        handler: async () => {
          const { fn, col } = require('sequelize');
          const totalRevenueData = await Booking.findAll({
            attributes: [[fn('SUM', col('price')), 'totalRevenue']],
            raw: true
          });
          const totalRevenue = totalRevenueData[0].totalRevenue || 0;
          return { totalRevenue };
        }
        // Có thể cấu hình dashboard component nếu cần
      }
    });
  
    // Hàm xác thực admin, dùng model Admin thay vì User
    const authenticate = async (email, password) => {
      // Lưu ý: Trong thực tế bạn nên băm mật khẩu và so sánh bằng bcrypt
      const adminUser = await Admin.findOne({ where: { email, password } });
      return adminUser ? adminUser.toJSON() : null;
    };
  
    // Xây dựng router AdminJS có xác thực
    const adminRouter = AdminJSExpress.buildAuthenticatedRouter(adminJs, {
      authenticate,
      cookiePassword: 'session-secret-password',
    });
  
    return { adminJs, adminRouter };
  }
  
  module.exports = initAdmin;
  