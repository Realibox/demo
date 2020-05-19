const db = require('../core/db.js');
class Base  {
	constructor(args) {
		this.db = db;
		// this.table = ''; // implements
		// this.table_log = '';
		this.tables = [];
	}
	update(data, id, index=0){

		return this.db.update(data, this.tables[index], id);
	}
	add(data, index=0){
		return this.db.add(data, this.tables[index]);
	}

}

module.exports = Base;