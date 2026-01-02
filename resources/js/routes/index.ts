import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../wayfinder'
/**
* @see \Laravel\Fortify\Http\Controllers\AuthenticatedSessionController::login
 * @see vendor/laravel/fortify/src/Http/Controllers/AuthenticatedSessionController.php:47
 * @route '/login'
 */
export const login = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: login.url(options),
    method: 'get',
})

login.definition = {
    methods: ["get","head"],
    url: '/login',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Laravel\Fortify\Http\Controllers\AuthenticatedSessionController::login
 * @see vendor/laravel/fortify/src/Http/Controllers/AuthenticatedSessionController.php:47
 * @route '/login'
 */
login.url = (options?: RouteQueryOptions) => {
    return login.definition.url + queryParams(options)
}

/**
* @see \Laravel\Fortify\Http\Controllers\AuthenticatedSessionController::login
 * @see vendor/laravel/fortify/src/Http/Controllers/AuthenticatedSessionController.php:47
 * @route '/login'
 */
login.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: login.url(options),
    method: 'get',
})
/**
* @see \Laravel\Fortify\Http\Controllers\AuthenticatedSessionController::login
 * @see vendor/laravel/fortify/src/Http/Controllers/AuthenticatedSessionController.php:47
 * @route '/login'
 */
login.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: login.url(options),
    method: 'head',
})

    /**
* @see \Laravel\Fortify\Http\Controllers\AuthenticatedSessionController::login
 * @see vendor/laravel/fortify/src/Http/Controllers/AuthenticatedSessionController.php:47
 * @route '/login'
 */
    const loginForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: login.url(options),
        method: 'get',
    })

            /**
* @see \Laravel\Fortify\Http\Controllers\AuthenticatedSessionController::login
 * @see vendor/laravel/fortify/src/Http/Controllers/AuthenticatedSessionController.php:47
 * @route '/login'
 */
        loginForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: login.url(options),
            method: 'get',
        })
            /**
* @see \Laravel\Fortify\Http\Controllers\AuthenticatedSessionController::login
 * @see vendor/laravel/fortify/src/Http/Controllers/AuthenticatedSessionController.php:47
 * @route '/login'
 */
        loginForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: login.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    login.form = loginForm
/**
* @see \Laravel\Fortify\Http\Controllers\AuthenticatedSessionController::logout
 * @see vendor/laravel/fortify/src/Http/Controllers/AuthenticatedSessionController.php:100
 * @route '/logout'
 */
export const logout = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: logout.url(options),
    method: 'post',
})

logout.definition = {
    methods: ["post"],
    url: '/logout',
} satisfies RouteDefinition<["post"]>

/**
* @see \Laravel\Fortify\Http\Controllers\AuthenticatedSessionController::logout
 * @see vendor/laravel/fortify/src/Http/Controllers/AuthenticatedSessionController.php:100
 * @route '/logout'
 */
logout.url = (options?: RouteQueryOptions) => {
    return logout.definition.url + queryParams(options)
}

/**
* @see \Laravel\Fortify\Http\Controllers\AuthenticatedSessionController::logout
 * @see vendor/laravel/fortify/src/Http/Controllers/AuthenticatedSessionController.php:100
 * @route '/logout'
 */
logout.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: logout.url(options),
    method: 'post',
})

    /**
* @see \Laravel\Fortify\Http\Controllers\AuthenticatedSessionController::logout
 * @see vendor/laravel/fortify/src/Http/Controllers/AuthenticatedSessionController.php:100
 * @route '/logout'
 */
    const logoutForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: logout.url(options),
        method: 'post',
    })

            /**
* @see \Laravel\Fortify\Http\Controllers\AuthenticatedSessionController::logout
 * @see vendor/laravel/fortify/src/Http/Controllers/AuthenticatedSessionController.php:100
 * @route '/logout'
 */
        logoutForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: logout.url(options),
            method: 'post',
        })
    
    logout.form = logoutForm
/**
* @see \Laravel\Fortify\Http\Controllers\RegisteredUserController::register
 * @see vendor/laravel/fortify/src/Http/Controllers/RegisteredUserController.php:41
 * @route '/register'
 */
export const register = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: register.url(options),
    method: 'get',
})

register.definition = {
    methods: ["get","head"],
    url: '/register',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Laravel\Fortify\Http\Controllers\RegisteredUserController::register
 * @see vendor/laravel/fortify/src/Http/Controllers/RegisteredUserController.php:41
 * @route '/register'
 */
register.url = (options?: RouteQueryOptions) => {
    return register.definition.url + queryParams(options)
}

/**
* @see \Laravel\Fortify\Http\Controllers\RegisteredUserController::register
 * @see vendor/laravel/fortify/src/Http/Controllers/RegisteredUserController.php:41
 * @route '/register'
 */
register.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: register.url(options),
    method: 'get',
})
/**
* @see \Laravel\Fortify\Http\Controllers\RegisteredUserController::register
 * @see vendor/laravel/fortify/src/Http/Controllers/RegisteredUserController.php:41
 * @route '/register'
 */
register.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: register.url(options),
    method: 'head',
})

    /**
* @see \Laravel\Fortify\Http\Controllers\RegisteredUserController::register
 * @see vendor/laravel/fortify/src/Http/Controllers/RegisteredUserController.php:41
 * @route '/register'
 */
    const registerForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: register.url(options),
        method: 'get',
    })

            /**
* @see \Laravel\Fortify\Http\Controllers\RegisteredUserController::register
 * @see vendor/laravel/fortify/src/Http/Controllers/RegisteredUserController.php:41
 * @route '/register'
 */
        registerForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: register.url(options),
            method: 'get',
        })
            /**
* @see \Laravel\Fortify\Http\Controllers\RegisteredUserController::register
 * @see vendor/laravel/fortify/src/Http/Controllers/RegisteredUserController.php:41
 * @route '/register'
 */
        registerForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: register.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    register.form = registerForm
/**
 * @see routes/web.php:16
 * @route '/'
 */
export const home = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: home.url(options),
    method: 'get',
})

home.definition = {
    methods: ["get","head"],
    url: '/',
} satisfies RouteDefinition<["get","head"]>

/**
 * @see routes/web.php:16
 * @route '/'
 */
home.url = (options?: RouteQueryOptions) => {
    return home.definition.url + queryParams(options)
}

/**
 * @see routes/web.php:16
 * @route '/'
 */
home.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: home.url(options),
    method: 'get',
})
/**
 * @see routes/web.php:16
 * @route '/'
 */
home.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: home.url(options),
    method: 'head',
})

    /**
 * @see routes/web.php:16
 * @route '/'
 */
    const homeForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: home.url(options),
        method: 'get',
    })

            /**
 * @see routes/web.php:16
 * @route '/'
 */
        homeForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: home.url(options),
            method: 'get',
        })
            /**
 * @see routes/web.php:16
 * @route '/'
 */
        homeForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: home.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    home.form = homeForm
/**
 * @see routes/web.php:32
 * @route '/dashboard'
 */
export const dashboard = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: dashboard.url(options),
    method: 'get',
})

dashboard.definition = {
    methods: ["get","head"],
    url: '/dashboard',
} satisfies RouteDefinition<["get","head"]>

/**
 * @see routes/web.php:32
 * @route '/dashboard'
 */
dashboard.url = (options?: RouteQueryOptions) => {
    return dashboard.definition.url + queryParams(options)
}

/**
 * @see routes/web.php:32
 * @route '/dashboard'
 */
dashboard.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: dashboard.url(options),
    method: 'get',
})
/**
 * @see routes/web.php:32
 * @route '/dashboard'
 */
dashboard.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: dashboard.url(options),
    method: 'head',
})

    /**
 * @see routes/web.php:32
 * @route '/dashboard'
 */
    const dashboardForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: dashboard.url(options),
        method: 'get',
    })

            /**
 * @see routes/web.php:32
 * @route '/dashboard'
 */
        dashboardForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: dashboard.url(options),
            method: 'get',
        })
            /**
 * @see routes/web.php:32
 * @route '/dashboard'
 */
        dashboardForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: dashboard.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    dashboard.form = dashboardForm
/**
 * @see routes/web.php:36
 * @route '/dashboard2'
 */
export const dashboard2 = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: dashboard2.url(options),
    method: 'get',
})

dashboard2.definition = {
    methods: ["get","head"],
    url: '/dashboard2',
} satisfies RouteDefinition<["get","head"]>

/**
 * @see routes/web.php:36
 * @route '/dashboard2'
 */
dashboard2.url = (options?: RouteQueryOptions) => {
    return dashboard2.definition.url + queryParams(options)
}

/**
 * @see routes/web.php:36
 * @route '/dashboard2'
 */
dashboard2.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: dashboard2.url(options),
    method: 'get',
})
/**
 * @see routes/web.php:36
 * @route '/dashboard2'
 */
dashboard2.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: dashboard2.url(options),
    method: 'head',
})

    /**
 * @see routes/web.php:36
 * @route '/dashboard2'
 */
    const dashboard2Form = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: dashboard2.url(options),
        method: 'get',
    })

            /**
 * @see routes/web.php:36
 * @route '/dashboard2'
 */
        dashboard2Form.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: dashboard2.url(options),
            method: 'get',
        })
            /**
 * @see routes/web.php:36
 * @route '/dashboard2'
 */
        dashboard2Form.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: dashboard2.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    dashboard2.form = dashboard2Form
/**
 * @see routes/web.php:40
 * @route '/dashboard3'
 */
export const dashboard3 = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: dashboard3.url(options),
    method: 'get',
})

dashboard3.definition = {
    methods: ["get","head"],
    url: '/dashboard3',
} satisfies RouteDefinition<["get","head"]>

/**
 * @see routes/web.php:40
 * @route '/dashboard3'
 */
dashboard3.url = (options?: RouteQueryOptions) => {
    return dashboard3.definition.url + queryParams(options)
}

/**
 * @see routes/web.php:40
 * @route '/dashboard3'
 */
dashboard3.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: dashboard3.url(options),
    method: 'get',
})
/**
 * @see routes/web.php:40
 * @route '/dashboard3'
 */
dashboard3.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: dashboard3.url(options),
    method: 'head',
})

    /**
 * @see routes/web.php:40
 * @route '/dashboard3'
 */
    const dashboard3Form = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: dashboard3.url(options),
        method: 'get',
    })

            /**
 * @see routes/web.php:40
 * @route '/dashboard3'
 */
        dashboard3Form.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: dashboard3.url(options),
            method: 'get',
        })
            /**
 * @see routes/web.php:40
 * @route '/dashboard3'
 */
        dashboard3Form.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: dashboard3.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    dashboard3.form = dashboard3Form
/**
 * @see routes/web.php:44
 * @route '/dashboard4'
 */
export const dashboard4 = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: dashboard4.url(options),
    method: 'get',
})

dashboard4.definition = {
    methods: ["get","head"],
    url: '/dashboard4',
} satisfies RouteDefinition<["get","head"]>

/**
 * @see routes/web.php:44
 * @route '/dashboard4'
 */
dashboard4.url = (options?: RouteQueryOptions) => {
    return dashboard4.definition.url + queryParams(options)
}

/**
 * @see routes/web.php:44
 * @route '/dashboard4'
 */
dashboard4.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: dashboard4.url(options),
    method: 'get',
})
/**
 * @see routes/web.php:44
 * @route '/dashboard4'
 */
dashboard4.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: dashboard4.url(options),
    method: 'head',
})

    /**
 * @see routes/web.php:44
 * @route '/dashboard4'
 */
    const dashboard4Form = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: dashboard4.url(options),
        method: 'get',
    })

            /**
 * @see routes/web.php:44
 * @route '/dashboard4'
 */
        dashboard4Form.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: dashboard4.url(options),
            method: 'get',
        })
            /**
 * @see routes/web.php:44
 * @route '/dashboard4'
 */
        dashboard4Form.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: dashboard4.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    dashboard4.form = dashboard4Form
/**
 * @see routes/web.php:48
 * @route '/dashboard5'
 */
export const dashboard5 = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: dashboard5.url(options),
    method: 'get',
})

dashboard5.definition = {
    methods: ["get","head"],
    url: '/dashboard5',
} satisfies RouteDefinition<["get","head"]>

/**
 * @see routes/web.php:48
 * @route '/dashboard5'
 */
dashboard5.url = (options?: RouteQueryOptions) => {
    return dashboard5.definition.url + queryParams(options)
}

/**
 * @see routes/web.php:48
 * @route '/dashboard5'
 */
dashboard5.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: dashboard5.url(options),
    method: 'get',
})
/**
 * @see routes/web.php:48
 * @route '/dashboard5'
 */
dashboard5.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: dashboard5.url(options),
    method: 'head',
})

    /**
 * @see routes/web.php:48
 * @route '/dashboard5'
 */
    const dashboard5Form = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: dashboard5.url(options),
        method: 'get',
    })

            /**
 * @see routes/web.php:48
 * @route '/dashboard5'
 */
        dashboard5Form.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: dashboard5.url(options),
            method: 'get',
        })
            /**
 * @see routes/web.php:48
 * @route '/dashboard5'
 */
        dashboard5Form.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: dashboard5.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    dashboard5.form = dashboard5Form
/**
 * @see routes/web.php:52
 * @route '/dashboard6'
 */
export const dashboard6 = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: dashboard6.url(options),
    method: 'get',
})

dashboard6.definition = {
    methods: ["get","head"],
    url: '/dashboard6',
} satisfies RouteDefinition<["get","head"]>

/**
 * @see routes/web.php:52
 * @route '/dashboard6'
 */
dashboard6.url = (options?: RouteQueryOptions) => {
    return dashboard6.definition.url + queryParams(options)
}

/**
 * @see routes/web.php:52
 * @route '/dashboard6'
 */
dashboard6.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: dashboard6.url(options),
    method: 'get',
})
/**
 * @see routes/web.php:52
 * @route '/dashboard6'
 */
dashboard6.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: dashboard6.url(options),
    method: 'head',
})

    /**
 * @see routes/web.php:52
 * @route '/dashboard6'
 */
    const dashboard6Form = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: dashboard6.url(options),
        method: 'get',
    })

            /**
 * @see routes/web.php:52
 * @route '/dashboard6'
 */
        dashboard6Form.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: dashboard6.url(options),
            method: 'get',
        })
            /**
 * @see routes/web.php:52
 * @route '/dashboard6'
 */
        dashboard6Form.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: dashboard6.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    dashboard6.form = dashboard6Form
/**
 * @see routes/web.php:62
 * @route '/change_lang/{locale}'
 */
export const lang = (args: { locale: string | number } | [locale: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: lang.url(args, options),
    method: 'get',
})

lang.definition = {
    methods: ["get","head"],
    url: '/change_lang/{locale}',
} satisfies RouteDefinition<["get","head"]>

/**
 * @see routes/web.php:62
 * @route '/change_lang/{locale}'
 */
lang.url = (args: { locale: string | number } | [locale: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { locale: args }
    }

    
    if (Array.isArray(args)) {
        args = {
                    locale: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        locale: args.locale,
                }

    return lang.definition.url
            .replace('{locale}', parsedArgs.locale.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
 * @see routes/web.php:62
 * @route '/change_lang/{locale}'
 */
lang.get = (args: { locale: string | number } | [locale: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: lang.url(args, options),
    method: 'get',
})
/**
 * @see routes/web.php:62
 * @route '/change_lang/{locale}'
 */
lang.head = (args: { locale: string | number } | [locale: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: lang.url(args, options),
    method: 'head',
})

    /**
 * @see routes/web.php:62
 * @route '/change_lang/{locale}'
 */
    const langForm = (args: { locale: string | number } | [locale: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: lang.url(args, options),
        method: 'get',
    })

            /**
 * @see routes/web.php:62
 * @route '/change_lang/{locale}'
 */
        langForm.get = (args: { locale: string | number } | [locale: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: lang.url(args, options),
            method: 'get',
        })
            /**
 * @see routes/web.php:62
 * @route '/change_lang/{locale}'
 */
        langForm.head = (args: { locale: string | number } | [locale: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: lang.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    lang.form = langForm