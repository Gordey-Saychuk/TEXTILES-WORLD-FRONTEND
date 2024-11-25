import { InputHTMLAttributes } from "react";

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  placeholder?: string;
  search?: boolean;
  type?: "password" | "email" | "name";
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  value?: string;
  required?: boolean; // Добавляем свойство required
}
 