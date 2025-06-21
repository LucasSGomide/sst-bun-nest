export interface ISubscriptionRepository {
    findAll: () => Promise<Array<any>>;
}
