import { Response } from 'express';
export class ApiResponse<T> {
	data: T = {} as T;
	message: string = 'Successfully!';
	status: number = 200;
	cookieName: String = 'hi';
	cookie: String = 'hi';

	constructor(data?: T, message?: string, status?: number, cookieName?: string, cookie?: string) {
		this.data = data;
		message && (this.message = message);
		status && (this.status = status);
		cookieName && (this.cookieName = cookieName);
		cookie && (this.cookie = cookie);
	}

	public send(res: Response): void {
		res.cookie(String(this.cookieName), this.cookie, {
			expires: new Date(Date.now() + 9000000000),
			httpOnly: true,
			secure: true
		});
		res.status(this.status).json({
			data: this.data,
			message: this.message,
			status: this.status
		});
	}
}
