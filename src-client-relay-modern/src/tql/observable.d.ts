declare type TqlSubscriber<T> = (value: T, oldValue: T) => void;
declare type TqlTransformer<T, TOut> = (value: T) => TOut;

declare interface TqlObservable<T> {
    subscribe(subscriber: TqlSubscriber<T>, shouldGetCurrentValue?: boolean): number;
    unsubscribe(id: number): void;
    transform<TOut>(transformer: TqlTransformer<T, TOut>): TqlObservable<TOut>;
}
