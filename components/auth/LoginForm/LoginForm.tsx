'use client';
import { ErrorMessage, Field, Form, Formik, FormikHelpers } from 'formik';
import Link from 'next/link';
import { Toaster } from 'react-hot-toast';
import { useMutation } from '@tanstack/react-query';
import { toast } from 'react-hot-toast';
import { Oval } from 'react-loader-spinner';
import { useId, useState } from 'react';
import css from './LoginForm.module.css';
import { useRouter } from 'next/navigation';
import { login } from '../../../lib/api/client';
import { useAuthStore } from '../../../stores/authStore';
import Image from 'next/image';
import { RegisterLoginData } from '@/types/user';
import { validationLoginSchema } from '../LoginForm/LoginFormValidation';
import { AxiosError } from 'axios';

const Login = () => {
  const router = useRouter();
  const fieldId = useId();
  const [showPassword, setShowPassword] = useState(false);
  const setUser = useAuthStore(state => state.setUser);

  const mutation = useMutation({
    mutationFn: login,
    onSuccess: res => {
      if (res) {
        if (res._id) {
          localStorage.setItem('userId', res._id);
        }
        setUser(res);
        toast.success('Login successful!');
        router.push('/');
      }
    },
    onError: (error: AxiosError<{ message?: string; error?: string }>) => {
      const responseData = error.response?.data as Record<string, unknown> | undefined;
      const responseDirect = error.response as unknown as Record<string, unknown> | undefined;

      const serverMessage =
        (responseData?.message as string) ??
        (responseData?.error as string) ??
        (responseDirect?.message as string) ??
        '';

      let errorMessage = 'Incorrect email or password';

      if (error.response?.status !== 401 && !serverMessage.includes('credentials')) {
        errorMessage = error.message ?? 'Something went wrong';
      }

      toast.error(errorMessage);
    },
  });

  const handleSubmit = async (
    values: RegisterLoginData,
    actions: FormikHelpers<RegisterLoginData>
  ) => {
    mutation.mutate(values);
    actions.setSubmitting(false);
  };

  return (
    <div className={css.formContainer}>
      <h2 className={css.title}>Login</h2>

      <Formik<RegisterLoginData>
        initialValues={{ email: '', password: '' }}
        onSubmit={handleSubmit}
        validationSchema={validationLoginSchema}
        validateOnMount
      >
        {({ isValid, dirty }) => (
          <Form className={css.form}>
            <div className={css.fieldGroup}>
              <label htmlFor={`${fieldId}-email`} className={css.label}>
                Enter your email address
              </label>
              <Field
                id={`${fieldId}-email`}
                name="email"
                type="email"
                placeholder="email@gmail.com"
                className={css.input}
              />
              <ErrorMessage name="email" component="span" className={css.error} />
            </div>
            <div className={css.fieldGroup}>
              <label htmlFor={`${fieldId}-password`} className={css.label}>
                Enter your password
              </label>
              <div className={css.passwordWrapper}>
                <Field
                  id={`${fieldId}-password`}
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="*********"
                  className={css.input}
                />
                <button
                  type="button"
                  className={css.eyeButton}
                  onClick={() => setShowPassword(prev => !prev)}
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                  aria-pressed={showPassword}
                >
                  {showPassword ? (
                    <Image src="/icons/open-eye-icon.svg" alt="eye on" width={24} height={24} />
                  ) : (
                    <Image src="/icons/close-eye-icon.svg" alt="eye off" width={24} height={24} />
                  )}
                </button>
              </div>
              <ErrorMessage name="password" component="span" className={css.error} />
            </div>
            <button
              type="submit"
              disabled={!dirty || !isValid || mutation.isPending}
              className={css.button}
            >
              {mutation.isPending ? (
                <Oval height={20} width={20} strokeWidth={5} color="#fff" />
              ) : (
                'Login'
              )}
            </button>
          </Form>
        )}
      </Formik>
      <p className={css.registerwrapp}>
        Don&apos;t have an account?{' '}
        <Link href="/auth/register" className={css.registerwrapp_link}>
          Register
        </Link>
      </p>
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 4000,
          style: {
            background: '#fff',
            color: '#333',
            padding: '16px 20px',
            borderRadius: '12px',
            fontSize: '15px',
            fontWeight: '500',
            boxShadow: '0px 10px 30px rgba(0, 0, 0, 0.08)',
            border: '1px solid rgba(231, 76, 60, 0.2)',
          },
          error: {
            iconTheme: {
              primary: '#e74c3c',
              secondary: '#fff',
            },
          },
        }}
      />
    </div>
  );
};

export default Login;
