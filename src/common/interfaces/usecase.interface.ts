export interface IUsecase<T> {
    execute(...args: any[]): T;
}