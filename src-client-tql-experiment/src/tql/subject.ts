export class TqlSubject<T> implements TqlObservable<T>{

    private _subscribers: TqlSubscriber<T>[] = [];
    private _value: T;

    constructor(initialValue?: T) {
        this._value = initialValue;
    }

    getValue() {
        return this._value;
    }

    setValue(v: T, shouldForce = false) {
        // console.log('setValue');
        if (!shouldForce && v === this._value) {
            // console.log('setValue SKIPPED');
            return;
        }

        const oldValue = this._value;
        this._value = v;
        this.notify(oldValue);
    }

    forceUpdate() {
        this.notify(this._value);
    }

    private notify(oldValue: T) {
        // console.log('notify');

        const v = this._value;
        for (let s of this._subscribers) {
            if (s) {
                s(v, oldValue);
            }
        }
    }

    subscribe(subscriber: TqlSubscriber<T>, shouldGetCurrentValue = false) {
        const id = this._subscribers.push(subscriber);

        if (shouldGetCurrentValue) {
            setTimeout(() => {
                subscriber(this._value, this._value);
            });
        }

        return id;
    }

    unsubscribe(id: number) {
        this._subscribers[id] = null;
    }

    transform<TOut>(transformer: TqlTransformer<T, TOut>): TqlObservable<TOut> {
        const s = new TqlSubject<TOut>(transformer(this._value));
        this.subscribe(v => {
            // console.log('transform...subscribe');
            s.setValue(transformer(v));
        });

        return s;
    }
}