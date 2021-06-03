const proxy = require("http-proxy-middleware");

// src/setupProxy.js
module.exports = function (app) {
	console.log('setUpProxy');
	console.log(app);
	app.use(
		proxy("/api", {
			target: "http://localhost:3000", // 비즈니스 서버 URL 설정
			changeOrigin: true,
		})
	);
};
