export type SignUpUserDto = {
    first_name: string,
    last_name: string,
    email: string,
    password: string,
    alias?: string,
}

export type LoginUserDto = {
    email: string,
    password: string
}

export type Users = {
    id: number,
    created_at: Date,
    deleted_at: Date,
    first_name: string,
    last_name: string,
    email: string,
    alias?: string,
    role_id: number
}