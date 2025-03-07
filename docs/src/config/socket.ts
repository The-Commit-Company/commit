const host = window.location.hostname;
const web_port = window.location.port ? `:${window.location.port}` : '';
const protocol = web_port ? 'http' : 'https';

export const web_url = `${protocol}://${host}${web_port}`;