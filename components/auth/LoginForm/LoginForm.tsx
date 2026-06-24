'use client';
import { ErrorMessage, Field, Form, Formik, FormikHelpers } from 'formik';
import Link from 'next/link';
import { useMutation } from '@tanstack/react-query';
import { toast } from 'react-hot-toast';
import { Oval } from 'react-loader-spinner';
import { useId, useState } from 'react';
import css from './LoginForm.module.css';
import { useRouter } from 'next/navigation';
import { login } from '../../../lib/api/client';
import { useAuthStore } from '../../../stores/authStore';
import { useFavoritesStore } from '../../../stores/favoritesStore';
import Image from 'next/image';
import { RegisterLoginData } from '@/types/user';
import { validationLoginSchema } from '../LoginForm/LoginFormValidation';
import { AxiosError } from 'axios';

const Login = () => {
  const router = useRouter();
  const fieldId = useId();
  const [showPassword, setShowPassword] = useState(false);
  const setUser = useAuthStore(state => state.setUser);
  const loadFavorites = useFavoritesStore(state => state.loadFavorites);

  const mutation = useMutation({
    mutationFn: login,
    onSuccess: res => {
      if (res) {
        if (res._id) {
          localStorage.setItem('userId', res._id);
        }
        setUser(res);
        void loadFavorites();
        toast.success('Login successful!');
        router.push('/');
      }
    },
    onError: (error: AxiosError<{ message?: string; error?: string }>) => {
      const status = error.response?.status;

      let friendlyMessage = 'Something went wrong. Please try again later.';

      if (status === 401 || status === 400) {
        friendlyMessage = 'Invalid email or password.';
      } else if (status === 404) {
        friendlyMessage = 'Account with this email does not exist.';
      } else if (error.message === 'Network Error') {
        friendlyMessage = 'Network error. Please check your internet connection.';
      } else {
        friendlyMessage =
          error.response?.data?.message ?? error.response?.data?.error ?? error.message;
      }

      toast.error(friendlyMessage, { id: 'login-error' });
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
    <div className={css.pageWrapper}>
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
              <div className={`${css.fieldGroup} ${css.mb}`}>
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
      </div>
    </div>
  );
};

export default Login;
