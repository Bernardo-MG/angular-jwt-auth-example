/**
 * Application user. Part of the authentication model.
 */
export class User {
    /**
     * User username.
     */
    username: string = '';
    /**
     * Logged in flag. If it is true, then the user is logged in.
     */
    logged: boolean = false;
    /**
     * Authentication token for the user.
     */
    token: string = '';
}