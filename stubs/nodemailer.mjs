// Workers have no raw TCP sockets, so SMTP can never run here.
// nuxt-email imports nodemailer dynamically; the cloudflare preset forbids
// externals, so it must resolve to something at build time.
function unavailable() {
	throw new Error('[nuxt-email] The smtp provider is unavailable on this deployment target. Use an HTTP provider such as resend.')
}

export function createTransport() {
	unavailable()
}

export default { createTransport }
