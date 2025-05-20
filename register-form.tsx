// app/(auth)/register/register-form.tsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useLanguage } from "@/contexts/language-context";

export default function RegisterForm() {
  const router = useRouter();
  const { t } = useLanguage();
  
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isLoading, setIsLoading] = useState(false);
  const [registerError, setRegisterError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Очищаем ошибку при изменении поля
    if (errors[name]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};
    
    if (!formData.firstName) {
      newErrors.firstName = t("register.error.firstName.required");
    }
    
    if (!formData.lastName) {
      newErrors.lastName = t("register.error.lastName.required");
    }
    
    if (!formData.email) {
      newErrors.email = t("register.error.email.required");
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = t("register.error.email.invalid");
    }
    
    if (!formData.phone) {
      newErrors.phone = t("register.error.phone.required");
    } else if (!/^\+?[0-9]{10,15}$/.test(formData.phone.replace(/\s/g, ''))) {
      newErrors.phone = t("register.error.phone.invalid");
    }
    
    if (!formData.password) {
      newErrors.password = t("register.error.password.required");
    } else if (formData.password.length < 6) {
      newErrors.password = t("register.error.password.length");
    }
    
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = t("register.error.confirmPassword.match");
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setRegisterError("");
    
    if (!validateForm()) return;
    
    setIsLoading(true);
    
    try {
      const requestBody = {
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        phone: formData.phone,
        password: formData.password,
        role: "пользователь", // Включаем роль в запрос. Можно изменить, если есть другие роли.
        registrationDate: new Date().toISOString(), // Добавляем дату регистрации, если нужно
        status: "активен", // По умолчанию статус "активен"
      };
  
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || "Ошибка при регистрации");
      }
      
      // Перенаправляем на страницу логина
      router.push("/login?registered=true");
    } catch (error) {
      console.error("Registration error:", error);
      setRegisterError(error instanceof Error ? error.message : "Ошибка при регистрации");
    } finally {
      setIsLoading(false);
    }
  };
  

  return (
    <>
      <div className="text-center">
        <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
          {t("register.title")}
        </h2>
        <p className="mt-2 text-sm text-gray-600">
          {t("register.hasAccount")}{" "}
          <Link
            href="/login"
            className="font-medium text-blue-600 hover:text-blue-500"
          >
            {t("register.login")}
          </Link>{" "}
          {t("register.hasAccountEnd")}
        </p>
      </div>
      
      <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
        {registerError && (
          <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-4">
            <p className="text-red-700">{registerError}</p>
          </div>
        )}
        
        <div className="rounded-md shadow-sm -space-y-px">
          <div>
            <label htmlFor="firstName" className="sr-only">
              {t("register.firstName")}
            </label>
            <input
              id="firstName"
              name="firstName"
              type="text"
              autoComplete="given-name"
              required
              className={`appearance-none rounded-none relative block w-full px-3 py-2 border ${
                errors.firstName ? "border-red-300" : "border-gray-300"
              } placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm`}
              placeholder={t("register.firstName")}
              value={formData.firstName}
              onChange={handleChange}
            />
            {errors.firstName && (
              <p className="text-red-500 text-xs mt-1">{errors.firstName}</p>
            )}
          </div>
          <div>
            <label htmlFor="lastName" className="sr-only">
              {t("register.lastName")}
            </label>
            <input
              id="lastName"
              name="lastName"
              type="text"
              autoComplete="family-name"
              required
              className={`appearance-none rounded-none relative block w-full px-3 py-2 border ${
                errors.lastName ? "border-red-300" : "border-gray-300"
              } placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm`}
              placeholder={t("register.lastName")}
              value={formData.lastName}
              onChange={handleChange}
            />
            {errors.lastName && (
              <p className="text-red-500 text-xs mt-1">{errors.lastName}</p>
            )}
          </div>
          <div>
            <label htmlFor="email" className="sr-only">
              {t("register.email")}
            </label>
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              required
              className={`appearance-none rounded-none relative block w-full px-3 py-2 border ${
                errors.email ? "border-red-300" : "border-gray-300"
              } placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm`}
              placeholder={t("register.email")}
              value={formData.email}
              onChange={handleChange}
            />
            {errors.email && (
              <p className="text-red-500 text-xs mt-1">{errors.email}</p>
            )}
          </div>
          <div>
            <label htmlFor="phone" className="sr-only">
              {t("register.phone")}
            </label>
            <input
              id="phone"
              name="phone"
              type="tel"
              autoComplete="tel"
              required
              className={`appearance-none rounded-none relative block w-full px-3 py-2 border ${
                errors.phone ? "border-red-300" : "border-gray-300"
              } placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm`}
              placeholder={t("register.phone")}
              value={formData.phone}
              onChange={handleChange}
            />
            {errors.phone && (
              <p className="text-red-500 text-xs mt-1">{errors.phone}</p>
            )}
          </div>
          <div>
            <label htmlFor="password" className="sr-only">
              {t("register.password")}
            </label>
            <input
              id="password"
              name="password"
              type="password"
              autoComplete="new-password"
              required
              className={`appearance-none rounded-none relative block w-full px-3 py-2 border ${
                errors.password ? "border-red-300" : "border-gray-300"
              } placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm`}
              placeholder={t("register.password")}
              value={formData.password}
              onChange={handleChange}
            />
            {errors.password && (
              <p className="text-red-500 text-xs mt-1">{errors.password}</p>
            )}
          </div>
          <div>
            <label htmlFor="confirmPassword" className="sr-only">
              {t("register.confirmPassword")}
            </label>
            <input
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              autoComplete="new-password"
              required
              className={`appearance-none rounded-none relative block w-full px-3 py-2 border ${
                errors.confirmPassword ? "border-red-300" : "border-gray-300"
              } placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm`}
              placeholder={t("register.confirmPassword")}
              value={formData.confirmPassword}
              onChange={handleChange}
            />
            {errors.confirmPassword && (
              <p className="text-red-500 text-xs mt-1">{errors.confirmPassword}</p>
            )}
          </div>
        </div>

        <div>
          <button
            type="submit"
            disabled={isLoading}
            className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:bg-blue-300"
          >
            {isLoading ? (
              <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                <svg
                  className="animate-spin h-5 w-5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
              </span>
            ) : null}
            {t("register.button")}
          </button>
        </div>
        
        <div className="text-sm text-center">
          <p>
            {t("register.terms")}{" "}
            <Link
              href="/terms"
              className="font-medium text-blue-600 hover:text-blue-500"
            >
              {t("register.termsLink")}
            </Link>{" "}
            {t("register.and")}{" "}
            <Link
              href="/privacy"
              className="font-medium text-blue-600 hover:text-blue-500"
            >
              {t("register.privacyLink")}
            </Link>
          </p>
        </div>
      </form>
    </>
  );
}