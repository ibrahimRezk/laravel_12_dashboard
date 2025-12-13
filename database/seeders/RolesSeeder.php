<?php

namespace Database\Seeders;

use App\Models\Role;
use App\Models\User;
use App\Models\PagePermission;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;
use Spatie\Permission\Models\Permission;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;

class RolesSeeder extends Seeder
{
    /**
     * Run the database seeds. 
     *
     * @return void
     */
    public function run()
    {


        Schema::disableForeignKeyConstraints();

        Role::truncate();
        Permission::truncate();
        PagePermission::truncate();

        Schema::enableForeignKeyConstraints();


        $superAdminRole = Role::where('name', '=', 'Super Admin')->first();
        $superAdminRole != null ? $superAdminRole->delete() : '';


        $data['name'] = 'Super Admin';
        $data['slug']['ar'] = 'المدير العام';
        $data['slug']['en'] = 'Super Admin';

        $data["guard_name"] = 'web';

        // dd($data) ;

        $superAdmin = Role::create($data);

        User::find(1)->assignRole($superAdmin);







        $employeeRole = Role::where('name', '=', 'Employee')->first();

        $employeeRole !== null ? $employeeRole->delete() : '';

        $employeeData['name'] = 'Employee';
        $employeeData['slug']['ar'] = 'موظف';
        $employeeData['slug']['en'] = 'Employee';

        $data["guard_name"] = 'web';

        $employeeRole = Role::create($employeeData);









        $absencesPagePermissions = [
            'view absences',
            'create absence',
            'edit absence',
            'delete absence',
            'print absence',
        ];
        $absencesPagePermissionsIds = [];
        foreach ($absencesPagePermissions as $item) {
            $permission = Permission::create(['name' => $item]);

            $firstWord = explode(' ', trim($item))[0];
            $absencesPagePermissionsIds[$firstWord] = $permission->id;
        }
        $absencesPageData['name']['en'] = 'absences';
        $absencesPageData['name']['ar'] = 'الغيابات';
        $absencesPageData['permissions'] = $absencesPagePermissionsIds;
        PagePermission::create($absencesPageData);




        $additionsPagePermissions = [
            'view additions',
            'create addition',
            'edit addition',
            'delete addition',
            'print addition',
        ];
        $additionsPagePermissionsIds = [];
        foreach ($additionsPagePermissions as $item) {
            $permission = Permission::create(['name' => $item]);

            $firstWord = explode(' ', trim($item))[0];
            $additionsPagePermissionsIds[$firstWord] = $permission->id;
        }
        $additionsPageData['name']['en'] = 'additions';
        $additionsPageData['name']['ar'] = 'الإضافات';
        $additionsPageData['permissions'] = $additionsPagePermissionsIds;
        PagePermission::create($additionsPageData);



        $adminsPagePermissions = [
            'view admins',
            'create admin',
            'edit admin',
            'delete admin',
        ];
        $adminsPagePermissionsIds = [];
        foreach ($adminsPagePermissions as $item) {
            $permission = Permission::create(['name' => $item]);

            $firstWord = explode(' ', trim($item))[0];
            $adminsPagePermissionsIds[$firstWord] = $permission->id;
        }
        $adminsPageData['name']['en'] = 'admins';
        $adminsPageData['name']['ar'] = 'المدراء';
        $adminsPageData['permissions'] = $adminsPagePermissionsIds;
        PagePermission::create($adminsPageData);


        $usersPagePermissions = [
            'view users',
            'create user',
            'edit user',
            'delete user',
        ];
        $usersPagePermissionsIds = [];
        foreach ($usersPagePermissions as $item) {
            $permission = Permission::create(['name' => $item]);

            $firstWord = explode(' ', trim($item))[0];
            $usersPagePermissionsIds[$firstWord] = $permission->id;
        }
        $usersPageData['name']['en'] = 'users';
        $usersPageData['name']['ar'] = 'المستخدمون';
        $usersPageData['permissions'] = $usersPagePermissionsIds;
        PagePermission::create($usersPageData);




        $allowancesPagePermissions = [
            'view allowances',
            'create allowance',
            'edit allowance',
            'delete allowance',
            'print allowance',
        ];
        $allowancesPagePermissionsIds = [];
        foreach ($allowancesPagePermissions as $item) {
            $permission = Permission::create(['name' => $item]);

            $firstWord = explode(' ', trim($item))[0];
            $allowancesPagePermissionsIds[$firstWord] = $permission->id;
        }
        $allowancesPageData['name']['en'] = 'allowances';
        $allowancesPageData['name']['ar'] = 'البدلات';
        $allowancesPageData['permissions'] = $allowancesPagePermissionsIds;
        PagePermission::create($allowancesPageData);





        $allowanceTypesPagePermissions = [
            'view allowance types',
            'create allowance type',
            'edit allowance type',
            'delete allowance type',
        ];
        $allowanceTypesPagePermissionsIds = [];
        foreach ($allowanceTypesPagePermissions as $item) {
            $permission = Permission::create(['name' => $item]);

            $firstWord = explode(' ', trim($item))[0];
            $allowanceTypesPagePermissionsIds[$firstWord] = $permission->id;
        }
        $allowanceTypesPageData['name']['en'] = 'allowance types';
        $allowanceTypesPageData['name']['ar'] = 'أنواع البدلات';
        $allowanceTypesPageData['permissions'] = $allowanceTypesPagePermissionsIds;
        PagePermission::create($allowanceTypesPageData);


        $terminationTypesPagePermissions = [
            'view termination types',
            'create termination type',
            'edit termination type',
            'delete termination type',
        ];
        $terminationTypesPagePermissionsIds = [];
        foreach ($terminationTypesPagePermissions as $item) {
            $permission = Permission::create(['name' => $item]);

            $firstWord = explode(' ', trim($item))[0];
            $terminationTypesPagePermissionsIds[$firstWord] = $permission->id;
        }
        $terminationTypesPageData['name']['en'] = 'employees termination types';
        $terminationTypesPageData['name']['ar'] = 'أنواع انهاء خدمات الموظفين';
        $terminationTypesPageData['permissions'] = $terminationTypesPagePermissionsIds;
        PagePermission::create($terminationTypesPageData);



        $terminationPagePermissions = [
            'view terminations',
            'create termination',
            'edit termination',
            'delete termination',
        ];
        $terminationPagePermissionsIds = [];
        foreach ($terminationPagePermissions as $item) {
            $permission = Permission::create(['name' => $item]);

            $firstWord = explode(' ', trim($item))[0];
            $terminationPagePermissionsIds[$firstWord] = $permission->id;
        }
        $terminationPageData['name']['en'] = 'employees termination';
        $terminationPageData['name']['ar'] = 'انهاء خدمات الموظفين';
        $terminationPageData['permissions'] = $terminationPagePermissionsIds;
        PagePermission::create($terminationPageData);


        $noticePeriodPagePermissions = [
            'view notice periods',
            'create notice period',
            'edit notice period',
            'delete notice period',
        ];
        $noticePeriodPagePermissionsIds = [];
        foreach ($noticePeriodPagePermissions as $item) {
            $permission = Permission::create(['name' => $item]);

            $firstWord = explode(' ', trim($item))[0];
            $noticePeriodPagePermissionsIds[$firstWord] = $permission->id;
        }
        $noticePeriodPageData['name']['en'] = 'employees notice period';
        $noticePeriodPageData['name']['ar'] = 'فترات اشعار الموظفين';
        $noticePeriodPageData['permissions'] = $noticePeriodPagePermissionsIds;
        PagePermission::create($noticePeriodPageData);




        $clearanceItemPagePermissions = [
            'view clearance items',
            'create clearance item',
            'edit clearance item',
            'delete clearance item',
        ];
        $clearanceItemPagePermissionsIds = [];
        foreach ($clearanceItemPagePermissions as $item) {
            $permission = Permission::create(['name' => $item]);

            $firstWord = explode(' ', trim($item))[0];
            $clearanceItemPagePermissionsIds[$firstWord] = $permission->id;
        }
        $clearanceItemPageData['name']['en'] = 'clearance item';
        $clearanceItemPageData['name']['ar'] = 'عناصر اخلاء الطرف';
        $clearanceItemPageData['permissions'] = $clearanceItemPagePermissionsIds;
        PagePermission::create($clearanceItemPageData);




        $employeeClearanceItemPagePermissions = [
            'view employee clearance items',
            'edit employee clearance item',
        ];
        $employeeClearanceItemPagePermissionsIds = [];
        foreach ($employeeClearanceItemPagePermissions as $item) {
            $permission = Permission::create(['name' => $item]);

            $firstWord = explode(' ', trim($item))[0];
            $employeeClearanceItemPagePermissionsIds[$firstWord] = $permission->id;
        }
        $employeeClearanceItemPageData['name']['en'] = 'employee clearance item';
        $employeeClearanceItemPageData['name']['ar'] = ' عناصر اخلاء طرف الموظف';
        $employeeClearanceItemPageData['permissions'] = $employeeClearanceItemPagePermissionsIds;
        PagePermission::create($employeeClearanceItemPageData);




        $annualLeaveBalancesPagePermissions = [
            'view annual leave balances',
        ];
        $annualLeaveBalancesPagePermissionsIds = [];
        foreach ($annualLeaveBalancesPagePermissions as $item) {
            $permission = Permission::create(['name' => $item]);

            $firstWord = explode(' ', trim($item))[0];
            $annualLeaveBalancesPagePermissionsIds[$firstWord] = $permission->id;
        }
        $annualLeaveBalancesPageData['name']['en'] = 'annual leave balances';
        $annualLeaveBalancesPageData['name']['ar'] = 'رصيد الإجازات السنوية';
        $annualLeaveBalancesPageData['permissions'] = $annualLeaveBalancesPagePermissionsIds;
        PagePermission::create($annualLeaveBalancesPageData);




        $attendancesPagePermissions = [
            'view attendances',
            'create attendance',

        ];
        $attendancesPagePermissionsIds = [];
        foreach ($attendancesPagePermissions as $item) {
            $permission = Permission::create(['name' => $item]);

            $firstWord = explode(' ', trim($item))[0];
            $attendancesPagePermissionsIds[$firstWord] = $permission->id;
        }
        $attendancesPageData['name']['en'] = 'attendances';
        $attendancesPageData['name']['ar'] = 'سجلات الحضور والانصراف';
        $attendancesPageData['permissions'] = $attendancesPagePermissionsIds;
        PagePermission::create($attendancesPageData);




        $fingerPrintAttendancesPagePermissions = [
            'view fingerprint attendances',
            'create fingerprint attendance',
            'approve fingerprint attendance',
            'print fingerprint attendance',
        ];
        $fingerPrintAttendancesPagePermissionsIds = [];
        foreach ($fingerPrintAttendancesPagePermissions as $item) {
            $permission = Permission::create(['name' => $item]);

            $firstWord = explode(' ', trim($item))[0];
            $fingerPrintAttendancesPagePermissionsIds[$firstWord] = $permission->id;
        }
        $fingerPrintAttendancesPageData['name']['en'] = 'fingerprint attendances';
        $fingerPrintAttendancesPageData['name']['ar'] = 'سجلات الحضور والانصراف بالبصمة';
        $fingerPrintAttendancesPageData['permissions'] = $fingerPrintAttendancesPagePermissionsIds;
        PagePermission::create($fingerPrintAttendancesPageData);






        $branchsPagePermissions = [
            'view branchs',
            'create branch',
            'edit branch',
            'delete branch',
        ];
        $branchsPagePermissionsIds = [];
        foreach ($branchsPagePermissions as $item) {
            $permission = Permission::create(['name' => $item]);

            $firstWord = explode(' ', trim($item))[0];
            $branchsPagePermissionsIds[$firstWord] = $permission->id;
        }
        $branchsPageData['name']['en'] = 'branchs';
        $branchsPageData['name']['ar'] = 'الفروع';
        $branchsPageData['permissions'] = $branchsPagePermissionsIds;
        PagePermission::create($branchsPageData);




        $departementsPagePermissions = [
            'view departements',
            'create departement',
            'edit departement',
            'delete departement',
        ];
        $departementsPagePermissionsIds = [];
        foreach ($departementsPagePermissions as $item) {
            $permission = Permission::create(['name' => $item]);

            $firstWord = explode(' ', trim($item))[0];
            $departementsPagePermissionsIds[$firstWord] = $permission->id;
        }
        $departementsPageData['name']['en'] = 'departements';
        $departementsPageData['name']['ar'] = 'الإدارات';
        $departementsPageData['permissions'] = $departementsPagePermissionsIds;
        PagePermission::create($departementsPageData);






        $directGrantsPagePermissions = [
            'view direct grants',
            'create direct grant',
            'edit direct grant',
            'delete direct grant',
            'approve direct grant',
            'print direct grant',
        ];
        $directGrantsPagePermissionsIds = [];
        foreach ($directGrantsPagePermissions as $item) {
            $permission = Permission::create(['name' => $item]);

            $firstWord = explode(' ', trim($item))[0];
            $directGrantsPagePermissionsIds[$firstWord] = $permission->id;
        }
        $directGrantsPageData['name']['en'] = 'direct grants';
        $directGrantsPageData['name']['ar'] = 'المنح المباشرة';
        $directGrantsPageData['permissions'] = $directGrantsPagePermissionsIds;
        PagePermission::create($directGrantsPageData);




        $directrewardsPagePermissions = [
            'view direct rewards',
            'create direct reward',
            'edit direct reward',
            'delete direct reward',
            'approve direct reward',
            'print direct reward',
        ];
        $directrewardsPagePermissionsIds = [];
        foreach ($directrewardsPagePermissions as $item) {
            $permission = Permission::create(['name' => $item]);

            $firstWord = explode(' ', trim($item))[0];
            $directrewardsPagePermissionsIds[$firstWord] = $permission->id;
        }
        $directrewardsPageData['name']['en'] = 'direct rewards';
        $directrewardsPageData['name']['ar'] = 'المكافئات المباشرة';
        $directrewardsPageData['permissions'] = $directrewardsPagePermissionsIds;
        PagePermission::create($directrewardsPageData);




        $discountsPagePermissions = [
            'view discounts',
            'create discount',
            'edit discount',
            'delete discount',
            'print discount',
        ];
        $discountsPagePermissionsIds = [];
        foreach ($discountsPagePermissions as $item) {
            $permission = Permission::create(['name' => $item]);

            $firstWord = explode(' ', trim($item))[0];
            $discountsPagePermissionsIds[$firstWord] = $permission->id;
        }
        $discountsPageData['name']['en'] = 'discounts';
        $discountsPageData['name']['ar'] = 'الخصومات';
        $discountsPageData['permissions'] = $discountsPagePermissionsIds;
        PagePermission::create($discountsPageData);




        $discountTypesPagePermissions = [
            'view discount types',
            'create discount type',
            'edit discount type',
            'delete discount type',
        ];
        $discountTypesPagePermissionsIds = [];
        foreach ($discountTypesPagePermissions as $item) {
            $permission = Permission::create(['name' => $item]);

            $firstWord = explode(' ', trim($item))[0];
            $discountTypesPagePermissionsIds[$firstWord] = $permission->id;
        }
        $discountTypesPageData['name']['en'] = 'discount types';
        $discountTypesPageData['name']['ar'] = 'أنواع الخصومات';
        $discountTypesPageData['permissions'] = $discountTypesPagePermissionsIds;
        PagePermission::create($discountTypesPageData);




        $employeesPagePermissions = [
            'view employees',
            'create employee',
            'edit employee',
            'delete employee',
        ];
        $employeesPagePermissionsIds = [];
        foreach ($employeesPagePermissions as $item) {
            $permission = Permission::create(['name' => $item]);

            $firstWord = explode(' ', trim($item))[0];
            $employeesPagePermissionsIds[$firstWord] = $permission->id;
        }
        $employeesPageData['name']['en'] = 'employees';
        $employeesPageData['name']['ar'] = 'الموظفون';
        $employeesPageData['permissions'] = $employeesPagePermissionsIds;
        PagePermission::create($employeesPageData);




        //// no need for this part
        // $fingerPrintMachineSettingssPagePermissions = [
        //     'view fingerprint machine settings',

        // ];
        // $fingerPrintMachineSettingssPagePermissionsIds = [];
        // foreach ($fingerPrintMachineSettingssPagePermissions as $item) {
        //     $permission = Permission::create(['name' => $item]);

        //     $firstWord = explode(' ', trim($item))[0];
        //     $fingerPrintMachineSettingssPagePermissionsIds[$firstWord] = $permission->id;
        // }
        // $fingerPrintMachineSettingssPageData['name']['en'] = 'fingerprint machine settings';
        // $fingerPrintMachineSettingssPageData['name']['ar'] = 'اعدادات ماكينة الحضور والانصراف بالبصمة';
        // $fingerPrintMachineSettingssPageData['permissions'] = $fingerPrintMachineSettingssPagePermissionsIds;
        // PagePermission::create($fingerPrintMachineSettingssPageData);





        $salariesPagePermissions = [
            'view salaries',
            'create salary',
            'edit salary',
            'delete salary',
            'close salary',
            'print salary',
        ];
        $salariesPagePermissionsIds = [];
        foreach ($salariesPagePermissions as $item) {
            $permission = Permission::create(['name' => $item]);

            $firstWord = explode(' ', trim($item))[0];
            $salariesPagePermissionsIds[$firstWord] = $permission->id;
        }
        $salariesPageData['name']['en'] = 'salaries';
        $salariesPageData['name']['ar'] = 'الرواتب';
        $salariesPageData['permissions'] = $salariesPagePermissionsIds;
        PagePermission::create($salariesPageData);




        $fiscalYearsPagePermissions = [
        ];
        $fiscalYearsPagePermissionsIds = [];
        foreach ($fiscalYearsPagePermissions as $item) {
            $permission = Permission::create(['name' => $item]);

            $firstWord = explode(' ', trim($item))[0];
            $fiscalYearsPagePermissionsIds[$firstWord] = $permission->id;
        }
        $fiscalYearsPageData['name']['en'] = 'fiscal months and years';
        $fiscalYearsPageData['name']['ar'] = 'الشهور والسنوات المالية';
        $fiscalYearsPageData['permissions'] = $fiscalYearsPagePermissionsIds;
        PagePermission::create($fiscalYearsPageData);




        $grantTypesPagePermissions = [
            'view grant types',
            'create grant type',
            'edit grant type',
            'delete grant type',
        ];
        $grantTypesPagePermissionsIds = [];
        foreach ($grantTypesPagePermissions as $item) {
            $permission = Permission::create(['name' => $item]);

            $firstWord = explode(' ', trim($item))[0];
            $grantTypesPagePermissionsIds[$firstWord] = $permission->id;
        }
        $grantTypesPageData['name']['en'] = 'grant types';
        $grantTypesPageData['name']['ar'] = 'أنواع المنح';
        $grantTypesPageData['permissions'] = $grantTypesPagePermissionsIds;
        PagePermission::create($grantTypesPageData);





        $investigationsPagePermissions = [
            'view investigations',
            'create investigation',
            'edit investigation',
            'approve investigation',
            'delete investigation',
            'print investigation',
        ];
        $investigationsPagePermissionsIds = [];
        foreach ($investigationsPagePermissions as $item) {
            $permission = Permission::create(['name' => $item]);

            $firstWord = explode(' ', trim($item))[0];
            $investigationsPagePermissionsIds[$firstWord] = $permission->id;
        }
        $investigationsPageData['name']['en'] = 'investigations';
        $investigationsPageData['name']['ar'] = 'التحقيقات';
        $investigationsPageData['permissions'] = $investigationsPagePermissionsIds;
        PagePermission::create($investigationsPageData);




        $jobsPagePermissions = [
            'view jobs',
            'create job',
            'edit job',
            'delete job',
        ];
        $jobsPagePermissionsIds = [];
        foreach ($jobsPagePermissions as $item) {
            $permission = Permission::create(['name' => $item]);

            $firstWord = explode(' ', trim($item))[0];
            $jobsPagePermissionsIds[$firstWord] = $permission->id;
        }
        $jobsPageData['name']['en'] = 'jobs';
        $jobsPageData['name']['ar'] = 'الوظائف';
        $jobsPageData['permissions'] = $jobsPagePermissionsIds;
        PagePermission::create($jobsPageData);



        $loansPagePermissions = [
            'view loans',
            'create loan',
            'edit loan',
            'delete loan',
            'print loan',
        ];
        $loansPagePermissionsIds = [];
        foreach ($loansPagePermissions as $item) {
            $permission = Permission::create(['name' => $item]);

            $firstWord = explode(' ', trim($item))[0];
            $loansPagePermissionsIds[$firstWord] = $permission->id;
        }
        $loansPageData['name']['en'] = 'monthly loans';
        $loansPageData['name']['ar'] = 'السلف الشهرية';
        $loansPageData['permissions'] = $loansPagePermissionsIds;
        PagePermission::create($loansPageData);





        $permenantLoanPagePermissions = [
            'view permenant loans',
            'create permenant loan',
            'edit permenant loan',
            'delete permenant loan',
            'print permenant loan',
        ];
        $permenantLoanPagePermissionsIds = [];
        foreach ($permenantLoanPagePermissions as $item) {
            $permission = Permission::create(['name' => $item]);

            $firstWord = explode(' ', trim($item))[0];
            $permenantLoanPagePermissionsIds[$firstWord] = $permission->id;
        }
        $permenantLoanPageData['name']['en'] = 'permenant loans';
        $permenantLoanPageData['name']['ar'] = 'السلف المستديمة';
        $permenantLoanPageData['permissions'] = $permenantLoanPagePermissionsIds;
        PagePermission::create($permenantLoanPageData);




        $nationalitiesPagePermissions = [
            'view nationalities',
            'create nationality',
            'edit nationality',
            'delete nationality',
        ];
        $nationalitiesPagePermissionsIds = [];
        foreach ($nationalitiesPagePermissions as $item) {
            $permission = Permission::create(['name' => $item]);

            $firstWord = explode(' ', trim($item))[0];
            $nationalitiesPagePermissionsIds[$firstWord] = $permission->id;
        }
        $nationalitiesPageData['name']['en'] = 'nationalities';
        $nationalitiesPageData['name']['ar'] = 'الجنسيات';
        $nationalitiesPageData['permissions'] = $nationalitiesPagePermissionsIds;
        PagePermission::create($nationalitiesPageData);




        $occationsPagePermissions = [
            'view occations',
            'create occation',
            'edit occation',
            'delete occation',
        ];
        $occationsPagePermissionsIds = [];
        foreach ($occationsPagePermissions as $item) {
            $permission = Permission::create(['name' => $item]);

            $firstWord = explode(' ', trim($item))[0];
            $occationsPagePermissionsIds[$firstWord] = $permission->id;
        }
        $occationsPageData['name']['en'] = 'occations';
        $occationsPageData['name']['ar'] = 'المناسبات';
        $occationsPageData['permissions'] = $occationsPagePermissionsIds;
        PagePermission::create($occationsPageData);



        $qualificationsPagePermissions = [
            'view qualifications',
            'create qualification',
            'edit qualification',
            'delete qualification',
        ];
        $qualificationsPagePermissionsIds = [];
        foreach ($qualificationsPagePermissions as $item) {
            $permission = Permission::create(['name' => $item]);

            $firstWord = explode(' ', trim($item))[0];
            $qualificationsPagePermissionsIds[$firstWord] = $permission->id;
        }
        $qualificationsPageData['name']['en'] = 'qualifications';
        $qualificationsPageData['name']['ar'] = 'المؤهلات';
        $qualificationsPageData['permissions'] = $qualificationsPagePermissionsIds;
        PagePermission::create($qualificationsPageData);



        $religionsPagePermissions = [
            'view religions',
            'create religion',
            'edit religion',
            'delete religion',
        ];
        $religionsPagePermissionsIds = [];
        foreach ($religionsPagePermissions as $item) {
            $permission = Permission::create(['name' => $item]);

            $firstWord = explode(' ', trim($item))[0];
            $religionsPagePermissionsIds[$firstWord] = $permission->id;
        }
        $religionsPageData['name']['en'] = 'religions';
        $religionsPageData['name']['ar'] = 'الديانات';
        $religionsPageData['permissions'] = $religionsPagePermissionsIds;
        PagePermission::create($religionsPageData);


        $rewardsPagePermissions = [
            'view rewards',
            'create reward',
            'edit reward',
            'delete reward',
            'print reward',
        ];
        $rewardsPagePermissionsIds = [];
        foreach ($rewardsPagePermissions as $item) {
            $permission = Permission::create(['name' => $item]); 

            $firstWord = explode(' ', trim($item))[0];
            $rewardsPagePermissionsIds[$firstWord] = $permission->id;
        }
        $rewardsPageData['name']['en'] = 'rewards';
        $rewardsPageData['name']['ar'] = 'المكافئات';
        $rewardsPageData['permissions'] = $rewardsPagePermissionsIds;
        PagePermission::create($rewardsPageData);




        $rewardTypesPagePermissions = [
            'view reward types',
            'create reward type',
            'edit reward type',
            'delete reward type',
        ];
        $rewardTypesPagePermissionsIds = [];
        foreach ($rewardTypesPagePermissions as $item) {
            $permission = Permission::create(['name' => $item]);

            $firstWord = explode(' ', trim($item))[0];
            $rewardTypesPagePermissionsIds[$firstWord] = $permission->id;
        }
        $rewardTypesPageData['name']['en'] = 'reward types';
        $rewardTypesPageData['name']['ar'] = 'أنواع المكافئات';
        $rewardTypesPageData['permissions'] = $rewardTypesPagePermissionsIds;
        PagePermission::create($rewardTypesPageData);





        $rolesPagePermissions = [
            'view roles',
            'create role',
            'edit role',
            'delete role',
        ];
        $rolesPagePermissionsIds = [];
        foreach ($rolesPagePermissions as $item) {
            $permission = Permission::create(['name' => $item]);

            $firstWord = explode(' ', trim($item))[0];
            $rolesPagePermissionsIds[$firstWord] = $permission->id;
        }
        $rolesPageData['name']['en'] = 'roles';
        $rolesPageData['name']['ar'] = 'الصلاحيات';
        $rolesPageData['permissions'] = $rolesPagePermissionsIds;
        PagePermission::create($rolesPageData);



        $sanctionsPagePermissions = [
            'view sanctions',
            'create sanction',
            'edit sanction',
            'delete sanction',
            'print sanction',
        ];
        $sanctionsPagePermissionsIds = [];
        foreach ($sanctionsPagePermissions as $item) {
            $permission = Permission::create(['name' => $item]);

            $firstWord = explode(' ', trim($item))[0];
            $sanctionsPagePermissionsIds[$firstWord] = $permission->id;
        }
        $sanctionsPageData['name']['en'] = 'sanctions';
        $sanctionsPageData['name']['ar'] = 'الجزاءات';
        $sanctionsPageData['permissions'] = $sanctionsPagePermissionsIds;
        PagePermission::create($sanctionsPageData);




        $settingsPagePermissions = [
            'view settings',
            'edit settings',
        ];
        $settingsPagePermissionsIds = [];
        foreach ($settingsPagePermissions as $item) {
            $permission = Permission::create(['name' => $item]);

            $firstWord = explode(' ', trim($item))[0];
            $settingsPagePermissionsIds[$firstWord] = $permission->id;
        }
        $settingsPageData['name']['en'] = 'settings';
        $settingsPageData['name']['ar'] = 'الإعدادات';
        $settingsPageData['permissions'] = $settingsPagePermissionsIds;
        PagePermission::create($settingsPageData);


        $settlementsPagePermissions = [
            'view settlements',
            'create settlement',
            'edit settlement',
            'delete settlement',
        ];
        $settlementsPagePermissionsIds = [];
        foreach ($settlementsPagePermissions as $item) {
            $permission = Permission::create(['name' => $item]);

            $firstWord = explode(' ', trim($item))[0];
            $settlementsPagePermissionsIds[$firstWord] = $permission->id;
        }
        $settlementsPageData['name']['en'] = 'settlements';
        $settlementsPageData['name']['ar'] = 'التسويات';
        $settlementsPageData['permissions'] = $settlementsPagePermissionsIds;
        PagePermission::create($settlementsPageData);





        $shiftTypesPagePermissions = [
            'view shift types',
            'create shift type',
            'edit shift type',
            'delete shift type',
        ];
        $shiftTypesPagePermissionsIds = [];
        foreach ($shiftTypesPagePermissions as $item) {
            $permission = Permission::create(['name' => $item]);

            $firstWord = explode(' ', trim($item))[0];
            $shiftTypesPagePermissionsIds[$firstWord] = $permission->id;
        }
        $shiftTypesPageData['name']['en'] = 'shift types';
        $shiftTypesPageData['name']['ar'] = 'أنواع الورديات';
        $shiftTypesPageData['permissions'] = $shiftTypesPagePermissionsIds;
        PagePermission::create($shiftTypesPageData);



        $alertMonitorPagePermissions = [
            'view alert monitor',
            'print alert monitor',

        ];
        $alertMonitorPagePermissionsIds = [];
        foreach ($alertMonitorPagePermissions as $item) {
            $permission = Permission::create(['name' => $item]);

            $firstWord = explode(' ', trim($item))[0];
            $alertMonitorPagePermissionsIds[$firstWord] = $permission->id;
        }
        $alertMonitorPageData['name']['en'] = 'System Event Logs';
        $alertMonitorPageData['name']['ar'] = 'سجلات الحركة على النظام';
        $alertMonitorPageData['permissions'] = $alertMonitorPagePermissionsIds;
        PagePermission::create($alertMonitorPageData);









        ////////////////////// special permissions ////////////////////

        // بداية المتغيرات اختصار للاسم
        // variables starts with name shortcut

        $ESPermission = Permission::create(['name' => 'edit setting']);
        $ESPageData['name']['en'] = 'edit system settings';
        $ESPageData['name']['ar'] = 'تعديل اعدادات النظام';
        $ESPageData['permissions']['id'] = $ESPermission->id;
        $ESPageData['type'] = 2;
        PagePermission::create($ESPageData);

        $ASPermission = Permission::create(['name' => 'approve settlement']);
        $ASPageData['name']['en'] = 'approve settlements';
        $ASPageData['name']['ar'] = 'اعتماد التسويات';
        $ASPageData['permissions']['id'] = $ASPermission->id;
        $ASPageData['type'] = 2;
        PagePermission::create($ASPageData);



        $FPMSPermission = Permission::create(['name' => 'edit fingerprint machine settings']);
        $FPMSPageData['name']['en'] = 'edit  fingerprint machine settings';
        $FPMSPageData['name']['ar'] = ' تعديل اعدادات آلة البصمة';
        $FPMSPageData['permissions']['id'] = $FPMSPermission->id;
        $FPMSPageData['type'] = 2;
        PagePermission::create($FPMSPageData);


        $VFYPermission = Permission::create(['name' => 'view fiscal years']);
        $VFYPageData['name']['en'] = 'view fiscal years';
        $VFYPageData['name']['ar'] = 'عرض السنوات والشهور المالية';
        $VFYPageData['permissions']['id'] = $VFYPermission->id;
        $VFYPageData['type'] = 2;
        PagePermission::create($VFYPageData);



        $CFYPermission = Permission::create(['name' => 'create fiscal year']);
        $CFYPageData['name']['en'] = 'create fiscal year';
        $CFYPageData['name']['ar'] = 'انشاء سنة مالية';
        $CFYPageData['permissions']['id'] = $CFYPermission->id;
        $CFYPageData['type'] = 2;
        PagePermission::create($CFYPageData);



        $EFYPermission = Permission::create(['name' => 'edit fiscal year']);
        $EFYPageData['name']['en'] = 'edit fiscal year';
        $EFYPageData['name']['ar'] = 'تعديل سنة مالية';
        $EFYPageData['permissions']['id'] = $EFYPermission->id;
        $EFYPageData['type'] = 2;
        PagePermission::create($EFYPageData);



        $DFYPermission = Permission::create(['name' => 'delete fiscal year']);
        $DFYPageData['name']['en'] = 'delete fiscal year';
        $DFYPageData['name']['ar'] = 'حذف سنة مالية ';
        $DFYPageData['permissions']['id'] = $DFYPermission->id;
        $DFYPageData['type'] = 2;
        PagePermission::create($DFYPageData);




        $ClFYPermission = Permission::create(['name' => 'close fiscal year']);
        $ClFYPageData['name']['en'] = 'close fiscal year';
        $ClFYPageData['name']['ar'] = 'اغلاق سنة مالية';
        $ClFYPageData['permissions']['id'] = $ClFYPermission->id;
        $ClFYPageData['type'] = 2;
        PagePermission::create($ClFYPageData);


        $HETRAMPermission = Permission::create(['name' => 'Handling Employee Termination Requests as a Manager']);
        $HETRAMPageData['name']['en'] = 'Handling Employee Termination Requests as a Manager';
        $HETRAMPageData['name']['ar'] = 'التعامل كمدير مع طلبات إنهاء خدمة الموظفين';
        $HETRAMPageData['permissions']['id'] = $HETRAMPermission->id;
        $HETRAMPageData['type'] = 2;
        PagePermission::create($HETRAMPageData);



        $HETRAHROPermission = Permission::create(['name' => 'Handling employee termination requests as a human resources officer']);
        $HETRAHROPageData['name']['en'] = 'Handling employee termination requests as a human resources officer';
        $HETRAHROPageData['name']['ar'] = 'التعامل مع طلبات إنهاء خدمة الموظفين كمسؤول موارد بشرية';
        $HETRAHROPageData['permissions']['id'] = $HETRAHROPermission->id;
        $HETRAHROPageData['type'] = 2;
        PagePermission::create($HETRAHROPageData);


        $SensitiveDataPermission = Permission::create(['name' => 'Handling employees sensitive data']);
        $SensitiveDataPageData['name']['en'] = 'Handling employees sensitive data';
        $SensitiveDataPageData['name']['ar'] = 'التعامل مع بيانات الموظفين الحساسة';
        $SensitiveDataPageData['permissions']['id'] = $SensitiveDataPermission->id;
        $SensitiveDataPageData['type'] = 2;
        PagePermission::create($SensitiveDataPageData);






    }
}
