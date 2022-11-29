<?php

namespace App\Http\Requests\Admin\Update;

use Illuminate\Foundation\Http\FormRequest;

class UpdatePasswordAdminRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        $user = $this->user();

        $tokenCan = $user->tokenCan('admin') || $user->tokenCan('super_admin');

        return $user != null && $tokenCan;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, mixed>
     */
    public function rules()
    {
        return [
            "oldPassword" => [
                "required",
                "string",
            ],
            "password" => [
                "required",
                "string",
                "min:6",
                "max:24",
            ],
            "confirmPassword" => [
                "required",
                "string",
                "min:6",
                "max:24",
            ],
        ];
    }
}
