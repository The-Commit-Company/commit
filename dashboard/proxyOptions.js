let webserver_port = "8001";
try {
	const common_site_config = require('../../../sites/common_site_config.json');
	webserver_port = common_site_config.webserver_port;
} catch {

}

export default {
	'^/(app|api|assets|files|private)': {
		target: `http://localhost:${webserver_port}`,
		ws: true,
		router: function (req) {
			const site_name = req.headers.host.split(':')[0];
			return `http://${site_name}:${webserver_port}`;
		}
	}
};
