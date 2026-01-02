import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../wayfinder'
/**
* @see \App\Http\Controllers\Settings\ProfileController::deleteMethod
 * @see app/Http/Controllers/Settings/ProfileController.php:86
 * @route '/settings/profile/delete-profile-avatar'
 */
export const deleteMethod = (options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: deleteMethod.url(options),
    method: 'delete',
})

deleteMethod.definition = {
    methods: ["delete"],
    url: '/settings/profile/delete-profile-avatar',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\Settings\ProfileController::deleteMethod
 * @see app/Http/Controllers/Settings/ProfileController.php:86
 * @route '/settings/profile/delete-profile-avatar'
 */
deleteMethod.url = (options?: RouteQueryOptions) => {
    return deleteMethod.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Settings\ProfileController::deleteMethod
 * @see app/Http/Controllers/Settings/ProfileController.php:86
 * @route '/settings/profile/delete-profile-avatar'
 */
deleteMethod.delete = (options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: deleteMethod.url(options),
    method: 'delete',
})

    /**
* @see \App\Http\Controllers\Settings\ProfileController::deleteMethod
 * @see app/Http/Controllers/Settings/ProfileController.php:86
 * @route '/settings/profile/delete-profile-avatar'
 */
    const deleteMethodForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: deleteMethod.url({
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'DELETE',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Settings\ProfileController::deleteMethod
 * @see app/Http/Controllers/Settings/ProfileController.php:86
 * @route '/settings/profile/delete-profile-avatar'
 */
        deleteMethodForm.delete = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: deleteMethod.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'DELETE',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
    
    deleteMethod.form = deleteMethodForm
const currentUserAvatar = {
    delete: Object.assign(deleteMethod, deleteMethod),
}

export default currentUserAvatar