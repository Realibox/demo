const Base = require('./Base');
class Chance extends Base {
	constructor(args) {
		super(args);
		this.tables == ['chance'];
	}

	async getChance(product,min = 30, before_time = 'extract(epoch from now())*1000'){
		let sql = `
			select 
				extract(epoch from moment)*1000 as moment,
				product 
			from 
				chance 
			where product='${product}' and moment >= to_timestamp(${before_time}/1000) - INTERVAL '${min} minutes'
			order by moment desc
		`;
		// // limit 4
		// sql = `
		// 	select 
		// 		extract(epoch from moment)*1000/1 as moment,
		// 		product
		// 	from 
		// 		chance 
		// 	where product='${product}'
		// 	order by moment desc limit 1000;
		// `;
		let [err, data] = await this.db.query(sql);
		if(err)throw err;
		let rows = data.rows.reverse();

		return rows;
	}

}
const chance = new Chance();
module.exports = chance;