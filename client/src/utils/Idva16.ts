export interface IModel {
    namespace: string,
    state?: any,
    reducers?: ReducersMapObject,
    effects?: Effect,
}

export type ReducersMapObject<S = any, A extends Action = Action> = {
    [K in keyof S]: Reducer<S[K], A>
}

export type Reducer<S = any, A extends Action = AnyAction> = (
    state: S | undefined,
    action: A
) => S

export interface Action<T = any> {
    type: T
}

export interface AnyAction extends Action {
    [extraProps: string]: any
}

export interface Effect {
    [key: string]: (action: AnyAction, effects: EffectsCommandMap) => void;
}

interface EffectsCommandMap {
    put: <A extends AnyAction>(action: A) => any,
    call: Function,
    select: Function,
    take: Function,
    cancel: Function,
    [key: string]: any,
}



