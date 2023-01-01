import { Request } from 'express';
import { Statistics, Facility } from 'databases/models';
import ResponeCodes from 'utils/constants/ResponeCode';
import FacilityType from 'utils/constants/FacilityType';
import paginate from 'utils/helpers/pagination';
import { Op } from 'sequelize';

const getStatisticsProduce = async (req: Request) => {
	try {
		let data;
		let message: string;
		let status: number;

		let tk = await Statistics.findAll({
			order: [['createdAt', 'DESC']]
		});
		let statistic = [];
		for (let i in tk) {
			const facility = await Facility.findByPk(tk[i].facilityId);
			if (facility.type == FacilityType.PRODUCE) statistic.push(tk[i]);
		}
		if (!statistic) {
			data = null;
			message = 'Not found.';
			status = ResponeCodes.NOT_FOUND;
		} else {
			let time = [];
			let id = [];
			let warehouse = [];
			let work = [];
			let Produce = await Facility.findAll({where:{type : FacilityType.PRODUCE }})
			for(let p of Produce){
				time.push(p.name);
				id.push(p.id);
			}
			var d = new Date();
			let month = d.getMonth() + 1;
			let t;
			if (month < 10) {
				t = d.getFullYear() + '/' + '0' + month;
			} else {
				t = d.getFullYear() + '/' + month;
			}	
			let newtime = t;
			for (let i in time) {
				warehouse.push(0);
				work.push(0);
				for (let j in statistic) {
					if (statistic[j].time == newtime )
						if( statistic[j].facilityId == id[i] ) {
							warehouse[i] += statistic[j].warehouse;
							work[i] += statistic[j].work;
						}
				}
			}

			data = { time, warehouse, work };
			message = 'Get successfully!';
			status = ResponeCodes.OK;
		}
		return {
			data,
			message,
			status
		};
	} catch (error) {
		throw error;
	}
};

const getStatisticsDistribute = async (req: Request) => {
	try {
		let data;
		let message: string;
		let status: number;

		let tk = await Statistics.findAll({
			order: [['createdAt', 'DESC']]
		});
		let statistic = [];
		for (let i in tk) {
			const facility = await Facility.findByPk(tk[i].facilityId);
			if (facility.type == FacilityType.DISTRIBUTE) statistic.push(tk[i]);
		}
		if (!statistic) {
			data = null;
			message = 'Not found.';
			status = ResponeCodes.NOT_FOUND;
		} else {
			let time = [];
			let id = [];
			let warehouse = [];
			let work = [];
			let Produce = await Facility.findAll({where:{type : FacilityType.PRODUCE }})
			for(let p of Produce){
				time.push(p.name);
				id.push(p.id);
			}
			var d = new Date();
			let month = d.getMonth() + 1;
			let t;
			if (month < 10) {
				t = d.getFullYear() + '/' + '0' + month;
			} else {
				t = d.getFullYear() + '/' + month;
			}	
			let newtime = t;
			for (let i in time) {
				warehouse.push(0);
				work.push(0);
				for (let j in statistic) {
					if (statistic[j].time == newtime )
						if( statistic[j].facilityId == id[i] ) {
							warehouse[i] += statistic[j].warehouse;
							work[i] += statistic[j].work;
						}
				}
			}
			data = { time, warehouse, work };
			message = 'Get successfully!';
			status = ResponeCodes.OK;
		}
		return {
			data,
			message,
			status
		};
	} catch (error) {
		throw error;
	}
};

const getStatisticsGuarantee = async (req: Request) => {
	try {
		let data;
		let message: string;
		let status: number;

		let tk = await Statistics.findAll({
			order: [['createdAt', 'DESC']]
		});
		let statistic = [];
		for (let i in tk) {
			const facility = await Facility.findByPk(tk[i].facilityId);
			if (facility.type == FacilityType.GUARANTEE) statistic.push(tk[i]);
		}
		if (!statistic) {
			data = null;
			message = 'Not found.';
			status = ResponeCodes.NOT_FOUND;
		} else {
			let time = [];
			let id = [];
			let warehouse = [];
			let work = [];
			let Produce = await Facility.findAll({where:{type : FacilityType.PRODUCE }})
			for(let p of Produce){
				time.push(p.name);
				id.push(p.id);
			}
			var d = new Date();
			let month = d.getMonth() + 1;
			let t;
			if (month < 10) {
				t = d.getFullYear() + '/' + '0' + month;
			} else {
				t = d.getFullYear() + '/' + month;
			}	
			let newtime = t;
			for (let i in time) {
				warehouse.push(0);
				work.push(0);
				for (let j in statistic) {
					if (statistic[j].time == newtime )
						if( statistic[j].facilityId == id[i] ) {
							warehouse[i] += statistic[j].warehouse;
							work[i] += statistic[j].work;
						}
				}
			}
			data = { time, warehouse, work };
			message = 'Get successfully!';
			status = ResponeCodes.OK;
		}
		return {
			data,
			message,
			status
		};
	} catch (error) {
		throw error;
	}
};

const getStatisticsDacilityById = async (req: Request) => {
	try {
		let data;
		let message: string;
		let status: number;

		const id = req.facility.id;
		if (isNaN(id)) {
			data = null;
			message = 'Invalid identifier.';
			status = ResponeCodes.BAD_REQUEST;
		} else {
			let statistic = await Statistics.findAll({
				where: {
					facilityId: id
				},
				order: [['createdAt', 'DESC']]
			});
			if (!statistic) {
				data = null;
				message = 'Not found.';
				status = ResponeCodes.NOT_FOUND;
			} else {
				let time = [];
				let warehouse = [];
				let work = [];
				time.push(statistic[0].time);
				for (let i in statistic) {
					if (time.length > 12) break;
					if (statistic[i].time < time[time.length - 1]) {
						time.push(statistic[i].time);
					}
				}
				if (time.length > 12) time.pop();
				for (let i in time) {
					warehouse.push(0);
					work.push(0);
					for (let j in statistic) {
						if (statistic[j].time == time[i]) {
							warehouse[i] += statistic[j].warehouse;
							work[i] += statistic[j].work;
						}
					}
				}
				data = { time, warehouse, work };
				message = 'Get successfully!';
				status = ResponeCodes.OK;
			}
		}

		return {
			data,
			message,
			status
		};
	} catch (error) {
		throw error;
	}
};

export { getStatisticsProduce, getStatisticsDistribute, getStatisticsGuarantee, getStatisticsDacilityById };
