<?php

namespace App\Http\Middleware;

use Illuminate\Foundation\Inspiring;
use Illuminate\Http\Request;
use Inertia\Middleware;
use Illuminate\Support\Facades\App;


class HandleInertiaRequests extends Middleware
{
    /**
     * The root template that's loaded on the first page visit.
     *
     * @see https://inertiajs.com/server-side-setup#root-template
     *
     * @var string
     */
    protected $rootView = 'app';

    /**
     * Determines the current asset version.
     *
     * @see https://inertiajs.com/asset-versioning
     */
    public function version(Request $request): ?string
    {
        return parent::version($request);
    }

    /**
     * Define the props that are shared by default.
     *
     * @see https://inertiajs.com/shared-data
     *
     * @return array<string, mixed>
     */
    public function share(Request $request): array
    {
        [$message, $author] = str(Inspiring::quotes()->random())->explode('-');

        return [
            ...parent::share($request),
            'name' => config('app.name'),
            'quote' => ['message' => trim($message), 'author' => trim($author)],
            'auth' => [
                'user' => $request->user(),
            ],
            'sidebarOpen' => ! $request->hasCookie('sidebar_state') || $request->cookie('sidebar_state') === 'true',




             'messages' => [
                'success' => $request->session()->get('success'),
                'error' => $request->session()->get('error'),
                'vital_error' => $request->session()->get('vital_error'),
            ],
            // 'itemIdToBeOpened' => $request->session()->get('itemIdToBeOpened'),
            // 'itemIdToBePrinted' => $request->session()->get('itemIdToBePrinted'),
            // 'locale' => App::getLocale(),
            'menus' => [
                [
                    'title' => 'Dashboard',
                    'href' => route('dashboard'),
                    'isActive' => $request->routeIs('dashboard'),
                    // 'isVisible' => $request->user()?->can('view dashboard'),
                ],
                [
                    'title' => 'Nationalities',
                    'href' => route('nationalities.index'),
                    'isActive' => $request->routeIs('nationalities.index'),
                    // 'isVisible' => $request->user()?->can('view dashboard'),
                ],
                [
                    'title' => 'Dashboard2',
                    'isActive' => $request->routeIs(['dashboard' , 'dashboard']),
                    // 'isVisible' => $request->user()?->can('view dashboard'),

                    'hasSubmenu' => true,
                    'open' => false,
                    'subMenus' => [
                        [
                            'title' => 'Dashboard3',
                            'href' => route('dashboard'),
                            'isActive' => $request->routeIs('dashboard'),
                            // 'isVisible' => $request->user()?->can('view dashboard'),
                        ],

                        [
                            'title' => 'Dashboard4',
                            'href' => route('dashboard'),
                            'isActive' => $request->routeIs('dashboard'),
                            // 'isVisible' => $request->user()?->can('view dashboard'),
                        ],
                    ]
                ],
                [
                    'title' => 'Dashboard5',
                    'isActive' => $request->routeIs(['dashboard']),
                    // 'isVisible' => $request->user()?->can('view dashboard'),
                    'hasSubmenu' => true,
                    'open' => false,
                    'subMenus' => [
                        [
                            'title' => 'Dashboard6',
                            'href' => route('dashboard'),
                            'isActive' => $request->routeIs('dashboard'),
                            // 'isVisible' => $request->user()?->can('view dashboard6'),
                        ],

                    ]
                ],
            ],

        ];
    }
}
