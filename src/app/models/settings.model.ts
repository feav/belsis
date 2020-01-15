export class Settings {

	private host_address: string = 'http://belsis.cm/index.php';

	constructor() { }

	getHostAddress() {
		return this.host_address;
	}

	setHostAddress(host_address) {
		this.host_address = host_address;
	}

}
