import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../wayfinder'
/**
* @see \App\Http\Controllers\NationalityController::index
 * @see app/Http/Controllers/NationalityController.php:40
 * @route '/nationalities'
 */
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/nationalities',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\NationalityController::index
 * @see app/Http/Controllers/NationalityController.php:40
 * @route '/nationalities'
 */
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\NationalityController::index
 * @see app/Http/Controllers/NationalityController.php:40
 * @route '/nationalities'
 */
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\NationalityController::index
 * @see app/Http/Controllers/NationalityController.php:40
 * @route '/nationalities'
 */
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\NationalityController::index
 * @see app/Http/Controllers/NationalityController.php:40
 * @route '/nationalities'
 */
    const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: index.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\NationalityController::index
 * @see app/Http/Controllers/NationalityController.php:40
 * @route '/nationalities'
 */
        indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\NationalityController::index
 * @see app/Http/Controllers/NationalityController.php:40
 * @route '/nationalities'
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
* @see \App\Http\Controllers\NationalityController::create
 * @see app/Http/Controllers/NationalityController.php:0
 * @route '/nationalities/create'
 */
export const create = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})

create.definition = {
    methods: ["get","head"],
    url: '/nationalities/create',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\NationalityController::create
 * @see app/Http/Controllers/NationalityController.php:0
 * @route '/nationalities/create'
 */
create.url = (options?: RouteQueryOptions) => {
    return create.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\NationalityController::create
 * @see app/Http/Controllers/NationalityController.php:0
 * @route '/nationalities/create'
 */
create.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\NationalityController::create
 * @see app/Http/Controllers/NationalityController.php:0
 * @route '/nationalities/create'
 */
create.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: create.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\NationalityController::create
 * @see app/Http/Controllers/NationalityController.php:0
 * @route '/nationalities/create'
 */
    const createForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: create.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\NationalityController::create
 * @see app/Http/Controllers/NationalityController.php:0
 * @route '/nationalities/create'
 */
        createForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: create.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\NationalityController::create
 * @see app/Http/Controllers/NationalityController.php:0
 * @route '/nationalities/create'
 */
        createForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: create.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    create.form = createForm
/**
* @see \App\Http\Controllers\NationalityController::store
 * @see app/Http/Controllers/NationalityController.php:140
 * @route '/nationalities'
 */
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/nationalities',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\NationalityController::store
 * @see app/Http/Controllers/NationalityController.php:140
 * @route '/nationalities'
 */
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\NationalityController::store
 * @see app/Http/Controllers/NationalityController.php:140
 * @route '/nationalities'
 */
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\NationalityController::store
 * @see app/Http/Controllers/NationalityController.php:140
 * @route '/nationalities'
 */
    const storeForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: store.url(options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\NationalityController::store
 * @see app/Http/Controllers/NationalityController.php:140
 * @route '/nationalities'
 */
        storeForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: store.url(options),
            method: 'post',
        })
    
    store.form = storeForm
/**
* @see \App\Http\Controllers\NationalityController::show
 * @see app/Http/Controllers/NationalityController.php:0
 * @route '/nationalities/{nationality}'
 */
export const show = (args: { nationality: string | number } | [nationality: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

show.definition = {
    methods: ["get","head"],
    url: '/nationalities/{nationality}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\NationalityController::show
 * @see app/Http/Controllers/NationalityController.php:0
 * @route '/nationalities/{nationality}'
 */
show.url = (args: { nationality: string | number } | [nationality: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { nationality: args }
    }

    
    if (Array.isArray(args)) {
        args = {
                    nationality: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        nationality: args.nationality,
                }

    return show.definition.url
            .replace('{nationality}', parsedArgs.nationality.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\NationalityController::show
 * @see app/Http/Controllers/NationalityController.php:0
 * @route '/nationalities/{nationality}'
 */
show.get = (args: { nationality: string | number } | [nationality: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\NationalityController::show
 * @see app/Http/Controllers/NationalityController.php:0
 * @route '/nationalities/{nationality}'
 */
show.head = (args: { nationality: string | number } | [nationality: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: show.url(args, options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\NationalityController::show
 * @see app/Http/Controllers/NationalityController.php:0
 * @route '/nationalities/{nationality}'
 */
    const showForm = (args: { nationality: string | number } | [nationality: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: show.url(args, options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\NationalityController::show
 * @see app/Http/Controllers/NationalityController.php:0
 * @route '/nationalities/{nationality}'
 */
        showForm.get = (args: { nationality: string | number } | [nationality: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: show.url(args, options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\NationalityController::show
 * @see app/Http/Controllers/NationalityController.php:0
 * @route '/nationalities/{nationality}'
 */
        showForm.head = (args: { nationality: string | number } | [nationality: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: show.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    show.form = showForm
/**
* @see \App\Http\Controllers\NationalityController::edit
 * @see app/Http/Controllers/NationalityController.php:0
 * @route '/nationalities/{nationality}/edit'
 */
export const edit = (args: { nationality: string | number } | [nationality: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(args, options),
    method: 'get',
})

edit.definition = {
    methods: ["get","head"],
    url: '/nationalities/{nationality}/edit',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\NationalityController::edit
 * @see app/Http/Controllers/NationalityController.php:0
 * @route '/nationalities/{nationality}/edit'
 */
edit.url = (args: { nationality: string | number } | [nationality: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { nationality: args }
    }

    
    if (Array.isArray(args)) {
        args = {
                    nationality: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        nationality: args.nationality,
                }

    return edit.definition.url
            .replace('{nationality}', parsedArgs.nationality.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\NationalityController::edit
 * @see app/Http/Controllers/NationalityController.php:0
 * @route '/nationalities/{nationality}/edit'
 */
edit.get = (args: { nationality: string | number } | [nationality: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\NationalityController::edit
 * @see app/Http/Controllers/NationalityController.php:0
 * @route '/nationalities/{nationality}/edit'
 */
edit.head = (args: { nationality: string | number } | [nationality: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: edit.url(args, options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\NationalityController::edit
 * @see app/Http/Controllers/NationalityController.php:0
 * @route '/nationalities/{nationality}/edit'
 */
    const editForm = (args: { nationality: string | number } | [nationality: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: edit.url(args, options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\NationalityController::edit
 * @see app/Http/Controllers/NationalityController.php:0
 * @route '/nationalities/{nationality}/edit'
 */
        editForm.get = (args: { nationality: string | number } | [nationality: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: edit.url(args, options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\NationalityController::edit
 * @see app/Http/Controllers/NationalityController.php:0
 * @route '/nationalities/{nationality}/edit'
 */
        editForm.head = (args: { nationality: string | number } | [nationality: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: edit.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    edit.form = editForm
/**
* @see \App\Http\Controllers\NationalityController::update
 * @see app/Http/Controllers/NationalityController.php:163
 * @route '/nationalities/{nationality}'
 */
export const update = (args: { nationality: number | { id: number } } | [nationality: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

update.definition = {
    methods: ["put","patch"],
    url: '/nationalities/{nationality}',
} satisfies RouteDefinition<["put","patch"]>

/**
* @see \App\Http\Controllers\NationalityController::update
 * @see app/Http/Controllers/NationalityController.php:163
 * @route '/nationalities/{nationality}'
 */
update.url = (args: { nationality: number | { id: number } } | [nationality: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { nationality: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { nationality: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    nationality: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        nationality: typeof args.nationality === 'object'
                ? args.nationality.id
                : args.nationality,
                }

    return update.definition.url
            .replace('{nationality}', parsedArgs.nationality.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\NationalityController::update
 * @see app/Http/Controllers/NationalityController.php:163
 * @route '/nationalities/{nationality}'
 */
update.put = (args: { nationality: number | { id: number } } | [nationality: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})
/**
* @see \App\Http\Controllers\NationalityController::update
 * @see app/Http/Controllers/NationalityController.php:163
 * @route '/nationalities/{nationality}'
 */
update.patch = (args: { nationality: number | { id: number } } | [nationality: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: update.url(args, options),
    method: 'patch',
})

    /**
* @see \App\Http\Controllers\NationalityController::update
 * @see app/Http/Controllers/NationalityController.php:163
 * @route '/nationalities/{nationality}'
 */
    const updateForm = (args: { nationality: number | { id: number } } | [nationality: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: update.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'PUT',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\NationalityController::update
 * @see app/Http/Controllers/NationalityController.php:163
 * @route '/nationalities/{nationality}'
 */
        updateForm.put = (args: { nationality: number | { id: number } } | [nationality: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: update.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'PUT',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
            /**
* @see \App\Http\Controllers\NationalityController::update
 * @see app/Http/Controllers/NationalityController.php:163
 * @route '/nationalities/{nationality}'
 */
        updateForm.patch = (args: { nationality: number | { id: number } } | [nationality: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: update.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'PATCH',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
    
    update.form = updateForm
/**
* @see \App\Http\Controllers\NationalityController::destroy
 * @see app/Http/Controllers/NationalityController.php:190
 * @route '/nationalities/{nationality}'
 */
export const destroy = (args: { nationality: string | number } | [nationality: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/nationalities/{nationality}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\NationalityController::destroy
 * @see app/Http/Controllers/NationalityController.php:190
 * @route '/nationalities/{nationality}'
 */
destroy.url = (args: { nationality: string | number } | [nationality: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { nationality: args }
    }

    
    if (Array.isArray(args)) {
        args = {
                    nationality: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        nationality: args.nationality,
                }

    return destroy.definition.url
            .replace('{nationality}', parsedArgs.nationality.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\NationalityController::destroy
 * @see app/Http/Controllers/NationalityController.php:190
 * @route '/nationalities/{nationality}'
 */
destroy.delete = (args: { nationality: string | number } | [nationality: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

    /**
* @see \App\Http\Controllers\NationalityController::destroy
 * @see app/Http/Controllers/NationalityController.php:190
 * @route '/nationalities/{nationality}'
 */
    const destroyForm = (args: { nationality: string | number } | [nationality: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: destroy.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'DELETE',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\NationalityController::destroy
 * @see app/Http/Controllers/NationalityController.php:190
 * @route '/nationalities/{nationality}'
 */
        destroyForm.delete = (args: { nationality: string | number } | [nationality: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: destroy.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'DELETE',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
    
    destroy.form = destroyForm
const nationalities = {
    index: Object.assign(index, index),
create: Object.assign(create, create),
store: Object.assign(store, store),
show: Object.assign(show, show),
edit: Object.assign(edit, edit),
update: Object.assign(update, update),
destroy: Object.assign(destroy, destroy),
}

export default nationalities