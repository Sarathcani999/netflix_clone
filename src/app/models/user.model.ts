export class User {

	constructor(
		public email : string , 
		public localId : string ,
		private _token : string 
		) {}

	get token() {
		return this._token ;
	}
}