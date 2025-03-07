let webserver_port = "8001";
try {
	const common_site_config = require('../../../sites/common_site_config.json');
	webserver_port = common_site_config.webserver_port;
} catch {
	console.log("common_site_config.json not found");
}

export default {
	'^/(app|api|assets|files|private)': {
		target: `http://127.0.0.1:${webserver_port}`,
		ws: true,
		changeOrigin: true,
		secure: false,
		router: function (req) {
			const site_name = req.headers.host.split(':')[0];
			return `http://${site_name}:${webserver_port}`;
		},
	},
};
