export interface TeamRequest {
    name: string;
    country_code: string;
    timezone: string;
    users: number[];
    working_days: number[];
    approvers: number[];
    is_import_holidays: boolean;
}