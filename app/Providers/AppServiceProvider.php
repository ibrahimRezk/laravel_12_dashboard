<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;

use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Gate;
use Illuminate\Support\Facades\Lang;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Http\Resources\Json\JsonResource;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
                $loader = \Illuminate\Foundation\AliasLoader::getInstance();
        // $loader->alias('Debugbar', \Barryvdh\Debugbar\Facades\Debugbar::class);
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        // Model::unguard();


        
        // to prevent destruction actives on database like :  Fresh , Refresh , Reset ,Rollback , Wipe
        DB::prohibitDestructiveCommands(app()->isProduction());
        
        JsonResource::withoutWrapping(); // this is to remove word data when calling data from any resource like usersResource collection
        
        
        /// to inform you if you have missing translation
        Lang::handleMissingKeysUsing(function ($key, $replace, $locale, $fallback) {
            Log::error("missing translation key: {$key} in locale : {$locale}");
        });
        

        
        // Model::shouldBeStrict(!app()->isProduction());  // this will prevent lazy loading , prevent silently discarding attributes , prevent accessing missing attributes  /// this make problems with model resources  need to be 'value' => $this->value ?? null  or it will not work

        // solution   in resource add this function 
        // protected function getAttributeSafely($key)
        // {
        //     return $this->resource->exists && 
        //            array_key_exists($key, $this->resource->getAttributes()) 
        //            ? $this->$key 
        //            : null;
        // }

        // then for every field call it like this 
        // 'account_nature' =>  $this->whenNotNull($this->getAttributeSafely('account_nature')),

        Model::preventLazyLoading(!app()->isProduction()); // previous one handle it
        Model::handleLazyLoadingViolationUsing(function ($model, $relation) { 
            $class = $model::class;
            info("attempted to lazy load [{$relation}] on model [{$class}]");
            // review this  https://www.youtube.com/watch?v=SARyrvUmM-c
        });


        
        Model::automaticallyEagerLoadRelationships();
        // dd( Model::isAutomaticallyEagerLoadingRelationships()); /// check for laravel 12.8  not working on previous versions

        // Password::defaults(function () {
        //     $rule = Password::min(8);

        //     return $this->app->isProduction()
        //         ? $rule->mixedCase()->number()->symbols()->uncompromised()
        //         : $rule;
        // });




        Gate::before(function ($user, $ability) {
            return $user->hasRole('Super Admin') ? true : null;
        });


        // Gate::before(function ($user, $ability) {
        //     return $user->hasRole('Employee') ? true : null;
        // });

    }
}
