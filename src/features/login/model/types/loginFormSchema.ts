export interface LoginFormSchema {
  phone: string;
  password: string;
  isLoading: boolean;
  error?: string;
}
