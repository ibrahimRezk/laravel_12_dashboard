<?php

namespace App\Http\Requests;

use App\Models\Departement;
use App\Models\AdminJob;
use App\Models\Role;
use App\Models\ShiftType;
use App\Models\User;
use CodeZero\UniqueTranslation\UniqueTranslationRule;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;
use Illuminate\Validation\Rules\Password;

class AdminRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\Rule|array|string>
     */
    public function rules(): array
    {
        $model = $this->id ?? null;
        $passwordRule = $model ? ['nullable'] : ['required'];

        return [
            'name.*' => ['bail', 'required', 'string', 'max:255' ,UniqueTranslationRule::for('users', 'name')->ignore($this->id)],
            'email' => ['bail', 'required', 'email', 'max:255', Rule::unique(User::class)->ignore($model ?? null)],
            'password' => ['bail', ...$passwordRule, Password::defaults()],
            'passwordConfirmation' => ['bail', ...$passwordRule, 'same:password'],


            'phone' => ['bail', 'nullable', 'string', 'max:255'],
            'active' => ['bail', 'boolean'],

            // 'roleId' => ['bail',  'required', Rule::exists(Role::class, 'id')],


        ];
    }
}
