declare namespace TypeMoqIntern {
    class Consts {
        static IMATCH_ID_VALUE: string;
        static IMATCH_ID_NAME: string;
        static IMATCH_MATCHES_NAME: string;
    }
}


declare namespace TypeMoqIntern {
    class CurrentInterceptContext<T> {
        call: proxy.IProxyCall<T>;
    }
}


declare namespace TypeMoqIntern {
    enum GlobalType {
        Class = 0,
        Function = 1,
        Value = 2,
    }
    class GlobalMock<T> implements IGlobalMock<T> {
        mock: Mock<T>;
        private _name;
        private _type;
        container: Object;
        constructor(mock: Mock<T>, _name: string, _type: GlobalType, container: Object);
        static ofInstance<U>(instance: U, globalName?: string, container?: Object, behavior?: MockBehavior): GlobalMock<U>;
        static ofType<U>(ctor: Ctor<U>, globalName?: string, container?: Object, behavior?: MockBehavior): GlobalMock<U>;
        object: T;
        name: string;
        behavior: MockBehavior;
        callBase: boolean;
        type: GlobalType;
        setup<TResult>(expression: IFunc2<T, TResult>): MethodCallReturn<T, TResult>;
        verify<TResult>(expression: IFunc2<T, TResult>, times: Times): void;
        verifyAll(): void;
    }
}


declare namespace TypeMoqIntern.Api {
    interface ICallback<T, TResult> {
        callback(action: IAction): IReturnsThrows<T, TResult>;
        callback(action: IAction1<T>): IReturnsThrows<T, TResult>;
    }
}


declare namespace TypeMoqIntern.Api {
    interface IReturns<T, TResult> {
        returns(valueFunction: IFuncN<any, TResult>): IReturnsResult<T>;
        callBase(): IReturnsResult<T>;
    }
    interface IReturnsResult<T> extends IVerifies {
    }
    interface IReturnsThrows<T, TResult> extends IReturns<T, TResult>, IThrows {
    }
}


declare namespace TypeMoqIntern.Api {
    interface ISetup<T, TResult> extends ICallback<T, TResult>, IReturnsThrows<T, TResult>, IVerifies {
    }
}


declare namespace TypeMoqIntern.Api {
    interface IThrows {
        throws<T extends error.Exception>(exception: T): IThrowsResult;
    }
    interface IThrowsResult extends IVerifies {
    }
}


declare namespace TypeMoqIntern.Api {
    interface IUsingResult {
        with(action: IAction): void;
    }
}


declare namespace TypeMoqIntern.Api {
    interface IVerifies {
        verifiable(times?: Times): void;
    }
}




declare namespace TypeMoqIntern {
    type Ctor<T> = {
        new (): T;
        prototype: Object;
    };
    type CtorWithArgs<T> = {
        new (...ctorArgs: any[]): T;
        prototype: Object;
    };
}


declare namespace TypeMoqIntern {
    type IAction = () => void;
    type IAction1<T> = (x: T) => void;
    type IActionN<T> = (...x: T[]) => void;
    type IFunc1<TResult> = () => TResult;
    type IFunc2<T, TResult> = (x: T) => TResult;
    type IFuncN<T, TResult> = (...x: T[]) => TResult;
}


declare namespace TypeMoqIntern {
    class PropertyRetriever {
        static getOwnEnumerables(obj: any): {
            name: string;
            desc: PropertyDescriptor;
        }[];
        static getOwnNonenumerables(obj: any): {
            name: string;
            desc: PropertyDescriptor;
        }[];
        static getOwnEnumerablesAndNonenumerables(obj: any): {
            name: string;
            desc: PropertyDescriptor;
        }[];
        static getPrototypeEnumerables(obj: any): {
            name: string;
            desc: PropertyDescriptor;
        }[];
        static getPrototypeNonenumerables(obj: any): {
            name: string;
            desc: PropertyDescriptor;
        }[];
        static getPrototypeEnumerablesAndNonenumerables(obj: any): {
            name: string;
            desc: PropertyDescriptor;
        }[];
        static getOwnAndPrototypeEnumerables(obj: any): {
            name: string;
            desc: PropertyDescriptor;
        }[];
        static getOwnAndPrototypeNonenumerables(obj: any): {
            name: string;
            desc: PropertyDescriptor;
        }[];
        static getOwnAndPrototypeEnumerablesAndNonenumerables(obj: any): {
            name: string;
            desc: PropertyDescriptor;
        }[];
        private static _enumerable(obj, prop);
        private static _notEnumerable(obj, prop);
        private static _enumerableAndNotEnumerable(obj, prop);
        private static _getPropertyNames(obj, iterateSelfBool, iteratePrototypeBool, includePropCb);
    }
}


declare namespace TypeMoqIntern {
    class Utils {
        static getUUID(): string;
        static functionName(fun: Object): string;
        static conthunktor<U>(ctor: CtorWithArgs<U>, args: any[]): U;
    }
}




declare namespace TypeMoqIntern.Error {
    class Exception implements Error {
        name: string;
        message: string;
        constructor(name?: string, message?: string);
        toString(): string;
    }
}


declare namespace TypeMoqIntern.Error {
    enum MockExceptionReason {
        NoSetup = 0,
        MoreThanOneSetupExpression = 1,
        InvalidSetupExpression = 2,
        InvalidMatcher = 3,
        InvalidProxyArgument = 4,
        UnknownGlobalType = 5,
        VerificationFailed = 6,
    }
    class MockException extends Exception {
        reason: MockExceptionReason;
        ctx: any;
        constructor(reason: MockExceptionReason, ctx: any, name?: string, message?: string);
    }
}




declare namespace TypeMoqIntern.Match {
    interface IMatch {
        ___id: string;
        ___matches(object: Object): boolean;
    }
}


declare namespace TypeMoqIntern.Match {
    class MatchAnyObject<T> implements IMatch {
        private _ctor;
        ___id: string;
        constructor(_ctor: Ctor<T>);
        ___matches(object: Object): boolean;
    }
    class MatchAny implements IMatch {
        ___id: string;
        ___matches(object: Object): boolean;
    }
    class MatchAnyString implements IMatch {
        ___id: string;
        ___matches(object: Object): boolean;
    }
    class MatchAnyNumber implements IMatch {
        ___id: string;
        ___matches(object: Object): boolean;
    }
}


declare namespace TypeMoqIntern.Match {
    class MatchPred<T> implements IMatch {
        private _pred;
        ___id: string;
        constructor(_pred: IFunc2<T, boolean>);
        ___matches(object: Object): boolean;
    }
}


declare namespace TypeMoqIntern.Match {
    class MatchValue<T> implements IMatch {
        private _value;
        ___id: string;
        constructor(_value: T);
        ___matches(object: any): boolean;
    }
}




declare namespace TypeMoqIntern.Proxy {
    interface ICallContext {
        args: IArguments;
        property: IPropertyInfo;
        returnValue: any;
        invokeBase(): void;
    }
}


declare namespace TypeMoqIntern.Proxy {
    interface ICallInterceptor {
        intercept(context: ICallContext): void;
    }
}


declare namespace TypeMoqIntern.Proxy {
    class MethodInvocation implements ICallContext {
        private _property;
        private _args;
        returnValue: any;
        constructor(_property: MethodInfo, _args?: IArguments);
        args: IArguments;
        property: PropertyInfo;
        invokeBase(): void;
    }
    class ValueGetterInvocation implements ICallContext {
        private _property;
        returnValue: any;
        constructor(_property: PropertyInfo, value: any);
        args: IArguments;
        property: PropertyInfo;
        invokeBase(): void;
    }
    class ValueSetterInvocation implements ICallContext {
        private _property;
        private _args;
        returnValue: any;
        constructor(_property: PropertyInfo, _args: IArguments);
        args: IArguments;
        property: PropertyInfo;
        invokeBase(): void;
    }
    class MethodGetterInvocation implements ICallContext {
        private _property;
        private _getter;
        returnValue: any;
        constructor(_property: PropertyInfo, _getter: () => any);
        args: IArguments;
        property: PropertyInfo;
        invokeBase(): void;
    }
    class MethodSetterInvocation implements ICallContext {
        private _property;
        private _setter;
        private _args;
        returnValue: any;
        constructor(_property: PropertyInfo, _setter: (v: any) => void, _args: IArguments);
        args: IArguments;
        property: PropertyInfo;
        invokeBase(): void;
    }
    class MethodInfo implements IPropertyInfo {
        obj: any;
        name: string;
        constructor(obj: any, name: string);
        toFunc: Function;
    }
    class PropertyInfo implements IPropertyInfo {
        obj: Object;
        name: string;
        constructor(obj: Object, name: string);
    }
    interface IPropertyInfo {
        obj: Object;
        name: string;
    }
}


declare namespace TypeMoqIntern.Proxy {
    interface IProxyCall<T> {
        id: string;
        setupExpression: IAction1<T>;
        setupCall: proxy.ICallContext;
        isVerifiable: boolean;
        expectedCallCount: Times;
        isInvoked: boolean;
        callCount: number;
        evaluatedSuccessfully(): void;
        matches(call: proxy.ICallContext): boolean;
        execute(call: proxy.ICallContext): void;
    }
}


declare namespace TypeMoqIntern.Proxy {
    interface IProxyFactory {
        createProxy<T>(interceptor: ICallInterceptor, instance: T): T;
    }
}


declare namespace TypeMoqIntern.Proxy {
    class Proxy<T> {
        constructor(interceptor: ICallInterceptor, instance: T);
        static of<U>(instance: U, interceptor: ICallInterceptor): any;
        private static check<U>(instance);
        private check<U>(instance);
        private static checkNotNull<U>(instance);
        private static isPrimitiveObject(obj);
        private defineMethodProxy(that, interceptor, instance, propName, propDesc?);
        private static methodProxyValue<U>(interceptor, instance, propName);
        private defineValuePropertyProxy(that, interceptor, instance, propName, propValue, propDesc?);
        private defineGetSetPropertyProxy(that, interceptor, instance, propName, get?, set?, propDesc?);
        private defineProperty(obj, name, desc);
    }
}


declare namespace TypeMoqIntern.Proxy {
    class ProxyFactory implements IProxyFactory {
        createProxy<T>(interceptor: ICallInterceptor, instance: T): T;
    }
}




import api = TypeMoqIntern.Api;
import error = TypeMoqIntern.Error;
import match = TypeMoqIntern.Match;
import proxy = TypeMoqIntern.Proxy;


declare namespace TypeMoqIntern {
    class GlobalScope implements api.IUsingResult {
        private _args;
        constructor(_args: IGlobalMock<any>[]);
        static using(...args: IGlobalMock<any>[]): api.IUsingResult;
        with(action: IAction): void;
    }
}


declare namespace TypeMoqIntern {
    interface IGlobalMock<T> extends IMock<T> {
        mock: Mock<T>;
        type: GlobalType;
        container: Object;
    }
}


declare namespace TypeMoqIntern {
    interface IMock<T> {
        object: T;
        name: string;
        behavior: MockBehavior;
        callBase: boolean;
        setup<TResult>(expression: IFunc2<T, TResult>): MethodCallReturn<T, TResult>;
        verify<TResult>(expression: IFunc2<T, TResult>, times: Times): void;
        verifyAll(): void;
    }
}


declare namespace TypeMoqIntern {
    enum InterceptionAction {
        Continue = 0,
        Stop = 1,
    }
    interface IInterceptStrategy<T> {
        handleIntercept(invocation: proxy.ICallContext, ctx: InterceptorContext<T>, localCtx: CurrentInterceptContext<T>): InterceptionAction;
    }
    class InterceptorContext<T> {
        behavior: MockBehavior;
        mock: IMock<T>;
        private _actualInvocations;
        private _orderedCalls;
        constructor(behavior: MockBehavior, mock: IMock<T>);
        addInvocation(invocation: proxy.ICallContext): void;
        actualInvocations(): proxy.ICallContext[];
        clearInvocations(): void;
        addOrderedCall(call: proxy.IProxyCall<T>): void;
        removeOrderedCall(call: proxy.IProxyCall<T>): void;
        orderedCalls(): proxy.IProxyCall<T>[];
    }
}


declare namespace TypeMoqIntern {
    class InterceptorExecute<T> implements Proxy.ICallInterceptor {
        private _interceptorContext;
        constructor(behavior: MockBehavior, mock: IMock<T>);
        interceptorContext: InterceptorContext<T>;
        intercept(invocation: proxy.ICallContext): void;
        addCall(call: proxy.IProxyCall<T>): void;
        verifyCall<T>(call: proxy.IProxyCall<T>, times: Times): void;
        verify(): void;
        private interceptionStrategies();
        private throwVerifyCallException(call, times);
    }
}


declare namespace TypeMoqIntern {
    class InterceptorSetup<T> implements Proxy.ICallInterceptor {
        private _interceptedCall;
        interceptedCall: proxy.ICallContext;
        intercept(invocation: proxy.ICallContext): void;
    }
}


declare namespace TypeMoqIntern {
    class AddActualInvocation<T> implements IInterceptStrategy<T> {
        handleIntercept(invocation: proxy.ICallContext, ctx: InterceptorContext<T>, localCtx: CurrentInterceptContext<T>): InterceptionAction;
    }
    class ExtractProxyCall<T> implements IInterceptStrategy<T> {
        handleIntercept(invocation: proxy.ICallContext, ctx: InterceptorContext<T>, localCtx: CurrentInterceptContext<T>): InterceptionAction;
    }
    class ExecuteCall<T> implements IInterceptStrategy<T> {
        private _ctx;
        handleIntercept(invocation: proxy.ICallContext, ctx: InterceptorContext<T>, localCtx: CurrentInterceptContext<T>): InterceptionAction;
    }
    class InvokeBase<T> implements IInterceptStrategy<T> {
        handleIntercept(invocation: proxy.ICallContext, ctx: InterceptorContext<T>, localCtx: CurrentInterceptContext<T>): InterceptionAction;
    }
    class HandleMockRecursion<T> implements IInterceptStrategy<T> {
        handleIntercept(invocation: proxy.ICallContext, ctx: InterceptorContext<T>, localCtx: CurrentInterceptContext<T>): InterceptionAction;
    }
}


declare namespace TypeMoqIntern {
    class It {
        static isValue<T>(x: T): T;
        static isAnyObject<T>(x: Ctor<T>): T;
        static isAny(): any;
        static isAnyString(): string;
        static isAnyNumber(): number;
        static is<T>(predicate: IFunc2<T, boolean>): T;
    }
}


declare namespace TypeMoqIntern {
    class MethodCall<T, TResult> implements proxy.IProxyCall<T>, api.IVerifies {
        mock: Mock<T>;
        private _setupExpression;
        protected _id: string;
        protected _setupCall: proxy.ICallContext;
        protected _setupCallback: IAction;
        protected _isVerifiable: boolean;
        protected _expectedCallCount: Times;
        protected _isInvoked: boolean;
        protected _callCount: number;
        protected _thrownException: error.Exception;
        protected _evaluatedSuccessfully: boolean;
        constructor(mock: Mock<T>, _setupExpression: IFunc2<T, TResult>);
        private generateId();
        private transformToMatchers(args);
        id: string;
        setupExpression: IAction1<T>;
        setupCall: proxy.ICallContext;
        isVerifiable: boolean;
        expectedCallCount: Times;
        isInvoked: boolean;
        callCount: number;
        evaluatedSuccessfully(): void;
        matches(call: proxy.ICallContext): boolean;
        execute(call: proxy.ICallContext): void;
        verifiable(times?: Times): void;
    }
}


declare namespace TypeMoqIntern {
    class MethodCallReturn<T, TResult> extends MethodCall<T, TResult> implements api.ISetup<T, TResult>, api.IReturnsResult<T> {
        protected _returnValueFunc: IFuncN<any, TResult>;
        hasReturnValue: boolean;
        protected _callBase: boolean;
        constructor(mock: Mock<T>, setupExpression: IFunc2<T, TResult>);
        execute(call: proxy.ICallContext): void;
        callback(action: IActionN<any>): api.IReturnsThrows<T, TResult>;
        throws(exception: Error): api.IThrowsResult;
        returns(valueFunc: IFuncN<any, TResult>): api.IReturnsResult<T>;
        callBase(): api.IReturnsResult<T>;
    }
}


declare namespace TypeMoqIntern {
    enum MockBehavior {
        Loose = 0,
        Strict = 1,
    }
    class Mock<T> implements IMock<T> {
        instance: T;
        private _behavior;
        static proxyFactory: proxy.IProxyFactory;
        private _id;
        private _name;
        private _interceptor;
        private _proxy;
        private _callBase;
        constructor(instance: T, _behavior?: MockBehavior);
        static ofInstance<U>(instance: U, behavior?: MockBehavior): Mock<U>;
        static ofType<U>(ctor: CtorWithArgs<U>, behavior?: MockBehavior, ...ctorArgs: any[]): Mock<U>;
        static ofType2<U>(ctor: CtorWithArgs<U>, ctorArgs: any[], behavior?: MockBehavior): Mock<U>;
        object: T;
        name: string;
        behavior: MockBehavior;
        callBase: boolean;
        private generateId();
        private getNameOf(instance);
        setup<TResult>(expression: IFunc2<T, TResult>): MethodCallReturn<T, TResult>;
        verify<TResult>(expression: IFunc2<T, TResult>, times: Times): void;
        verifyAll(): void;
    }
}


declare namespace TypeMoqIntern {
    class Times {
        private _condition;
        private _from;
        private _to;
        private static NO_MATCHING_CALLS_EXACTLY_N_TIMES;
        private static NO_MATCHING_CALLS_AT_LEAST_ONCE;
        private static NO_MATCHING_CALLS_AT_MOST_ONCE;
        private _lastCallCount;
        private _failMessage;
        constructor(_condition: IFunc2<number, boolean>, _from: number, _to: number, failMessage: string);
        failMessage: string;
        verify(callCount: number): boolean;
        static exactly(n: number): Times;
        static never(): Times;
        static once(): Times;
        static atLeastOnce(): Times;
        static atMostOnce(): Times;
    }
}


interface ITypeMoq {
    Mock: typeof TypeMoqIntern.Mock;
    MockBehavior: typeof TypeMoqIntern.MockBehavior;
    It: typeof TypeMoqIntern.It;
    Times: typeof TypeMoqIntern.Times;
    GlobalMock: typeof TypeMoqIntern.GlobalMock;
    GlobalScope: typeof TypeMoqIntern.GlobalScope;
    MockException: typeof TypeMoqIntern.Error.MockException;
}
declare module TypeMoq {
    export import Mock = TypeMoqIntern.Mock;
    export import MockBehavior = TypeMoqIntern.MockBehavior;
    export import It = TypeMoqIntern.It;
    export import Times = TypeMoqIntern.Times;
    export import GlobalMock = TypeMoqIntern.GlobalMock;
    export import GlobalScope = TypeMoqIntern.GlobalScope;
    export import MockException = TypeMoqIntern.Error.MockException;
}
declare let typemoq: ITypeMoq;




//# sourceMappingURL=output.d.ts.map