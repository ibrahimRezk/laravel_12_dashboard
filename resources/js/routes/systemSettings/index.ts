import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../wayfinder'
/**
* @see \App\Http\Controllers\SystemSettingController::index
 * @see app/Http/Controllers/SystemSettingController.php:41
 * @route '/systemSettings'
 */
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/systemSettings',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\SystemSettingController::index
 * @see app/Http/Controllers/SystemSettingController.php:41
 * @route '/systemSettings'
 */
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\SystemSettingController::index
 * @see app/Http/Controllers/SystemSettingController.php:41
 * @route '/systemSettings'
 */
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\SystemSettingController::index
 * @see app/Http/Controllers/SystemSettingController.php:41
 * @route '/systemSettings'
 */
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\SystemSettingController::index
 * @see app/Http/Controllers/SystemSettingController.php:41
 * @route '/systemSettings'
 */
    const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: index.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\SystemSettingController::index
 * @see app/Http/Controllers/SystemSettingController.php:41
 * @route '/systemSettings'
 */
        indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\SystemSettingController::index
 * @see app/Http/Controllers/SystemSettingController.php:41
 * @route '/systemSettings'
 */
        indexForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    index.form = indexForm
/**
* @see \App\Http\Controllers\SystemSettingController::store
 * @see app/Http/Controllers/SystemSettingController.php:61
 * @route '/systemSettings'
 */
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/systemSettings',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\SystemSettingController::store
 * @see app/Http/Controllers/SystemSettingController.php:61
 * @route '/systemSettings'
 */
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\SystemSettingController::store
 * @see app/Http/Controllers/SystemSettingController.php:61
 * @route '/systemSettings'
 */
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\SystemSettingController::store
 * @see app/Http/Controllers/SystemSettingController.php:61
 * @route '/systemSettings'
 */
    const storeForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: store.url(options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\SystemSettingController::store
 * @see app/Http/Controllers/SystemSettingController.php:61
 * @route '/systemSettings'
 */
        storeForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: store.url(options),
            method: 'post',
        })
    
    store.form = storeForm
const systemSettings = {
    index: Object.assign(index, index),
store: Object.assign(store, store),
}

export default systemSettings