import { Request } from 'express';

export interface Pageable {
	limit: number;
	offset: number;
	order: [string, 'ASC' | 'DESC'];
	query: string;
}

const paginate = (req: Request) => {
	const page = req.query.page as string;
	const size = req.query.size as string;
	const sort = (req.query.sort as string) || '';
	const query = (req.query.query as string) || '';

	const maxLimit = 50;

	const pageNumber = parseInt(page) || 1;
	const sizeNumber = parseInt(size) || maxLimit;

	const limit = sizeNumber > 0 && sizeNumber <= maxLimit ? sizeNumber : maxLimit;
	const offset = ((pageNumber > 0 ? pageNumber : 1) - 1) * limit;

	const mySort = sort.split(',', 2);

	let sortBy = (mySort[0] || '').trim();
	let sorted = (mySort[1] || '').trim() as 'ASC' | 'DESC';
	sortBy = sortBy || 'id';
	sorted = sorted === 'ASC' || sorted === 'DESC' ? sorted : 'ASC';

	const order: [string, 'ASC' | 'DESC'] = [sortBy, sorted];

	const pagination: Pageable = {
		limit,
		offset,
		order,
		query
	};

	return pagination;
};

export default paginate;
