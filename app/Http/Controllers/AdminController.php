<?php

namespace App\Http\Controllers;

use Carbon\Carbon;
use App\Models\AdminJob;
use App\Models\Role;
use App\Models\User;
use Inertia\Inertia;
use App\Models\Store;
use App\Models\Salary;
use App\Models\Account;
use App\Models\Setting;
use App\Models\Admin;
use App\Models\Treasury;
use App\Models\ShiftType;
use App\Models\Attendance;
use App\Models\Departement;
use App\Models\AlertMonitor;
use App\Models\JournalEntry;
use App\Models\SalaryAction;
use App\Models\ServiceOrder;
use Illuminate\Http\Request;
use App\Models\PagePermission;
use App\Models\FiscalYearMonth;
use App\Models\JournalEntryDetail;
use Illuminate\Support\Facades\DB;
use App\Http\Resources\JobResource;
use App\Models\TreasuryTransaction;
use App\Http\Controllers\Controller;
use App\Http\Resources\RoleResource;
use App\Http\Resources\UserResource;
use Illuminate\Support\Facades\Hash;
use App\Http\Resources\StoreResource;
use App\Http\Requests\AdminRequest;
use Diglactic\Breadcrumbs\Breadcrumbs;
use App\Http\Traits\SalaryCalculations;
use App\Http\Resources\AdminResource;
use App\Http\Resources\TreasuryResource;
use App\Http\Resources\ShiftTypeResource;
use Illuminate\Database\Eloquent\Builder;
use App\Http\Resources\DepartementResource;
use App\Http\Resources\PagePermissionResource;

class AdminController extends Controller
{
    use SalaryCalculations;

    private string $routeResourceName = 'admins';


    public function __construct()
    {
        $this->middleware('can:view admins')->only('index', 'show');
        $this->middleware('can:create admin')->only(['store']);
        $this->middleware('can:edit admin')->only(['update']);
        $this->middleware('can:delete admin')->only('destroy');
    }

    public function index(Request $request)
    {
        // ddd($this);
        // dd($request);
        $users = User::query()
            ->select([
                'id',
                'name',
                'active',
                'email',
                'used_before',
                'profile_type',
                'profile_id',
                'created_at',
            ])
            ->with(['roles:roles.id,roles.name'])
            ->with('media')

            ->when($request->name, fn(Builder $builder, $name) => $builder->whereAny(['name->ar', 'name->en'], 'like', "%{$name}%"))


            ->when(
                $request->active !== null,
                fn(Builder $builder) => $builder->when(
                    $request->active,
                    fn(Builder $builder) => $builder->active(),
                    fn(Builder $builder) => $builder->inActive()
                )
            )



            ->latest('id')

            ->where('id', '<>', auth()->user()->id)


            ->paginate(pagination())->onEachSide(1)->appends(request()->query());



        $today = (int) date('d', strtotime(date('Y-m-d')));
        $year_and_month = date('Y-m', strtotime(date('Y-m-d')));
        $currentMonthData = FiscalYearMonth::where('year_and_month', $year_and_month)->where('status', 2)->first();



        $breadcrumbs = Breadcrumbs::render('admins');


        return Inertia::render('AdminsAndRoles/Admins/Index', [
            'title' => 'system admins',
            'currentMonthData' => $currentMonthData ?? null,
            'items' => UserResource::collection($users),
            'roles' => RoleResource::collection(Role::where('name', '!=', 'Super Admin')->get()),

            'headers' => [
                [
                    'label' => '#',
                    'name' => '#',
                ],

                [
                    'label' => 'name',
                    'name' => 'name',
                ],
                [
                    'label' => 'active',
                    'name' => 'active',
                ],


                [
                    'label' => 'phone',
                    'name' => 'phone',
                ],
                [
                    'label' => 'created_at',
                    'name' => 'created_at',
                ],
                [
                    'label' => 'actions',
                    'name' => 'actions',
                ],
            ],
            'filters' => (object) $request->all(),
            'routeResourceName' => $this->routeResourceName,

            'can' => [
                'view' => $request->user()->can('view admin'),
                'create' => $request->user()->can('create admin'),
                'delete' => $request->user()->can('delete admin'),
            ],

            'method' => 'index',
            'breadcrumbs' => $breadcrumbs['breadcrumbs'],


        ]);
    }




    public function show($id)
    {

        $user = User::with(['roles', 'permissions'])->where('id', '<>', 1)->findOrFail($id); // to prevent showint super admin  data

        $role = Role::find($user->roles[0]['id']);

        $role->load(['permissions:permissions.id,permissions.name']);

        $breadcrumbs = Breadcrumbs::render('adminData', $user);


        return Inertia::render('AdminsAndRoles/Admins/Show', [

            'title' => 'admin data',
            'role' => new RoleResource($role),
            'item' => new UserResource($user),
            'specialPermissions' => PagePermissionResource::collection(PagePermission::where('type', 2)->get(['id', 'name', 'permissions'])),

            'can' => [
                'editRole' => auth()->user()->can('edit role'),
            ],

            'headers' => [
                [
                    'label' => '#',
                    'name' => '#',
                ],

                [
                    'label' => 'name',
                    'name' => 'name',
                ],
                [
                    'label' => 'active',
                    'name' => 'active',
                ],

                // [
                //     'label' => 'role',
                //     'name' => 'role',
                // ],
                [
                    'label' => 'created_at',
                    'name' => 'created_at',
                ],
                [
                    'label' => 'actions',
                    'name' => 'actions',
                ],
            ],
            'method' => 'index',
            'breadcrumbs' => $breadcrumbs['breadcrumbs'],

        ]);
    }






    public function store(AdminRequest $request)
    {
        try {
            DB::beginTransaction();
            $data = $request->safe()->only([
                'email',
                'active',
            ]);

            $data["name"]["ar"] = $request->name['ar'];
            $data["name"]["en"] = $request->name['en'];
            $data["password"] = Hash::make($request->safe()->password);
            $user = User::create($data);

            // admin code

            $adminData = [
                'added_by' => auth()->user()->id,
                'phone' => $request->phone,
            ];

            $admin = Admin::create($adminData);

            // to add profile to the user we have two options 
            $admin->user()->save($user); 

            // $user->profile_id = $admin->id ;
            // $user->profile_type = 'App\Models\Admin' ;
            // $user->save();
            


            $user->assignRole($request->roleId);

            // update used before field
            $role = Role::find($request->roleId);
            $role->used_before = true;
            $role->save();


            // if ($request->image) {
            //     // if ($request->hasFile('image')) {
            //     ///////       $user->media()->delete();
            //     $user->addMediaFromRequest('image')
            //         ->withResponsiveImages() // this will create multipe sizes of the same image but it will take time on creating
            //         ->toMediaCollection();
            // }

            // alert monitor //////////////////////////////////////////////////////////////////////////////////////////////////////////////
            $monitoring_status = Setting::select('id', 'active_monitoring')->first()->active_monitoring;
            if ($monitoring_status == true) {
                $this->alertMonitor(null, $user, 'create');
            }
            ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


            DB::commit();
            // dd('$role');
            return redirect()->back()->with('success', 'item created successfully');
        } catch (\Throwable $th) {
            DB::rollBack();
            return redirect()->back()->with('error', $th->getMessage());
        }
    }



    public function update(AdminRequest $request, $id)
    {

        try {
            DB::beginTransaction();

            $user = User::find($id);
            $data = $request->safe()->only(['email', 'active']);

            $request->password !== null ? $data['password'] = bcrypt($request->safe()->password) : '';

            $data["name"]["ar"] = $request->name['ar'];
            $data["name"]["en"] = $request->name['en'];


            //////////////////////////////////////////////////////////////////////////////////////////////
            $monitoring_status = Setting::select('id', 'active_monitoring')->first()->active_monitoring;
            if ($monitoring_status == true) {
                $this->alertMonitor($user, $data, 'update');
            }
            //////////////////////////////////////////////////////////////////////////////////////////////
            ///////// end create attendance month for the admin ////////////////////////////////////////////////////////////////
            $user->update($data);

            $admin = Admin::find($user->profile->id);
            if ($admin !== null) {

                $admin->update([
                    'phone' => $request->phone,
                    'updated_by' => auth()->user()->id,
                ]);
            }

            $user->syncRoles($request->roleId);

            // update used before field
            $role = Role::find($request->roleId);
            $role->used_before = true;
            $role->save();

            DB::commit();
            return back()->with('success', 'item updated successfully');
        } catch (\Throwable $th) {
            DB::rollback();

            return redirect()->back()->with('error', $th->getMessage());
        }
    }



    public function destroy($ids)
    {
        try {
            DB::beginTransaction();
            $all_ids = explode(',', $ids);
            foreach ($all_ids as $id) {
                $user = User::find($id);
                $admin = Admin::find($user->profile_id);

                if (empty($admin)) {
                    continue;
                }

                if (!auth()->user()->can('delete admin') || $user->used_before == true) {
                    abort(403, 'general.you can not delete an item that has previous activity on the system or you do not have permission');
                }

                // alert monitor ///////////////////////////////////////////////////////////
                $monitoring_status = Setting::select('id', 'active_monitoring')->first()->active_monitoring;
                if ($monitoring_status == true) {
                    $this->alertMonitor($user, null, 'delete');
                }
                ////////////////////////////////////////////////////////////////////////////
                $admin->delete();
                $user->delete();


            }

            DB::commit();
            return redirect()->back()->with('success', 'item deleted successfully');
        } catch (\Throwable $th) {
            DB::rollback();
            return redirect()->back()->with('error', $th->getMessage());
        }
    }

    public function alertMonitor($oldUserData, $newUserData, $method)
    {


        if ($method == 'create') {
            $data['alert_module_code'] = 8;
            $data['alert_move_type_code'] = 8; // check
            $data['other_table_foreing_id'] = $newUserData->id;
            $data['other_table_name'] = 'App\Models\User';
            $data['added_by'] = auth()->user()->id;
            $data['description']['ar'] = 'اضافة حساب مدير نظام جديد بإسم: ' . $newUserData->getTranslation('name', 'ar');
            $data['description']['en'] = 'add a new admin account named : ' . $newUserData->getTranslation('name', 'en');
        } elseif ($method == 'update') {
            $data['alert_module_code'] = 8;
            $data['alert_move_type_code'] = 9; // check
            $data['other_table_foreing_id'] = $oldUserData->id;
            $data['other_table_name'] = 'App\Models\User';

            $data['added_by'] = auth()->user()->id;
            $data['description']['ar'] = ' : تعديل حساب مدير النظام ' . $oldUserData->getTranslation('name', 'ar');
            $data['description']['en'] = 'update an admin account :' . $oldUserData->getTranslation('name', 'en');

            if ($oldUserData->getTranslation('name', 'ar') !== $newUserData['name']['ar']) {
                $data['description']['ar'] .= ' وتم تغيير اسم حساب مدير النظام بالعربية الى ' . $newUserData['name']['ar'];
                $data['description']['en'] .= ' and an Admin account arabic name changed to ' . $newUserData['name']['ar'];
            }
            if ($oldUserData->getTranslation('name', 'en') !== $newUserData['name']['en']) {
                $data['description']['ar'] .= ' وتم تغيير اسم حساب مدير النظام بالانجليزية الى ' . $newUserData['name']['en'];
                $data['description']['en'] .= ' and an Admin account english name changed to ' . $newUserData['name']['en'];
            }
            if ($oldUserData->active !== $newUserData['active']) {
                $data['description']['ar'] .= ' وتم تغيير الحالة الى ' . ($newUserData['active'] == 1 ? 'نشط' : 'غير نشط');
                $data['description']['en'] .= ' and status changed to ' . ($newUserData['active'] == 1 ? 'active' : 'inactive');
            }
        } elseif ($method == 'delete') {
            $data['alert_module_code'] = 8;
            $data['alert_move_type_code'] = 10; // check
            $data['other_table_foreing_id'] = $oldUserData->id;
            $data['other_table_name'] = 'App\Models\User';
            $data['added_by'] = auth()->user()->id;
            $data['description']['ar'] = 'حذف حساب مدير النظام  :  ' . $oldUserData->getTranslation('name', 'ar');
            $data['description']['en'] = 'delete the Admin account : ' . $oldUserData->getTranslation('name', 'en');
        }


        return AlertMonitor::create($data);
    }
}
