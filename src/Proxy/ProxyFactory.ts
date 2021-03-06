﻿/// <reference path='_all.ts' />

namespace TypeMoqIntern.Proxy {
    export class ProxyFactory implements IProxyFactory {
        createProxy<T>(interceptor: ICallInterceptor, instance: T): T {
            let proxy: T = <T><any> Proxy.of(instance, interceptor);
            return proxy;
        }
    }
}