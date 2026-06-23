'use client';
import css from './RegistrationForm.module.css';
import { ErrorMessage, Field, Form, Formik, FormikHelpers } from 'formik';
import { useId, useState } from 'react';
import Link from 'next/link';
import { RegistrationFormValidationSchema } from './RegistrationFormValidation';
import EyeOnIcon from '@/components/icon/open-eye-icon.svg';
import EyeOffIcon from '@/components/icon/close-eye-icon.svg';
import { useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';

import { useAuthStore } from '@/stores/authStore';

import { register } from '@/lib/api/client';

import { useRouter } from 'next/navigation';
import { toast } from 'react-hot-toast';

import { Oval } from 'react-loader-spinner';

interface RegisterFormValues {
  email: string;
  username: string;
  password: string;
  confirmPassword: string;
}

const initialValues: RegisterFormValues = {
  email: '',
  username: '',
  password: '',
  confirmPassword: '',
};

const RegistrationForm = () => {
  const fieldId = useId();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const router = useRouter();
  const setUser = useAuthStore(state => state.setUser);

  const mutation = useMutation({
    mutationFn: register,
    onSuccess: res => {
      if (res) {
        if (res.newUser?._id) {
          localStorage.setItem('userId', res.newUser._id);
        }
        setUser(res.newUser);
        toast.success('Registration successful!');
        router.push('/');
      }
    },
    onError: (error: AxiosError<{ error?: string }>) => {
      const errorMessage = error.response?.data?.error ?? error.message ?? 'Oops... some error';
      toast.error(errorMessage);
    },
  });

  const handleSubmit = async (
    values: RegisterFormValues,
    actions: FormikHelpers<RegisterFormValues>
  ) => {
  const payload = {
    name: values.username.trim(),
    email: values.email.trim().toLowerCase(),
    password: values.password,
  };
    mutation.mutate(payload);
    actions.setSubmitting(false);
  };

  return (
    <div className={css.formCard}>
      <h1 className={css.formTitle}>Register</h1>
      <p className={css.formSubTitle}>
        Join our community of culinary enthusiasts, save your favorite recipes, and share your
        cooking creations
      </p>

      <Formik
        initialValues={initialValues}
        validateOnMount
        onSubmit={handleSubmit}
        validationSchema={RegistrationFormValidationSchema}
      >
        {({ isValid, dirty }) => (
          <Form className={css.form}>
            <div className={css.formGroup}>
              <label className={css.label} htmlFor={`${fieldId}-email`}>
                Enter your email address
              </label>
              <Field
                className={css.input}
                type="email"
                name="email"
                placeholder="email@gmail.com"
                id={`${fieldId}-email`}
              />
              <ErrorMessage component="span" name="email" className={css.isError} />
            </div>

            <div className={css.formGroup}>
              <label className={css.label} htmlFor={`${fieldId}-username`}>
                Enter your name
              </label>
              <Field
                className={css.input}
                type="name"
                name="username"
                id={`${fieldId}-username`}
                placeholder="Max"
              />
              <ErrorMessage component="span" name="username" className={css.isError} />
            </div>

            <div className={css.formGroup}>
              <label className={css.label} htmlFor={`${fieldId}-password`}>
                Create a strong password
              </label>
              <div className={css.passwordWrapper}>
                <Field
                  className={`${css.input} ${css.passwordInput}`}
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  id={`${fieldId}-password`}
                  placeholder="*********"
                />

                <button
                  type="button"
                  className={css.eyeButton}
                  onClick={() => setShowPassword(prev => !prev)}
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                  aria-pressed={showPassword}
                >
                  {showPassword ? (
                    <img src="/icons/open-eye-icon.svg" alt="eye on" />
                  ) : (
                    <img src="/icons/close-eye-icon.svg" alt="eye off" />
                  )}
                </button>
              </div>

              <ErrorMessage component="span" name="password" className={css.isError} />
            </div>

            <div className={css.formGroup}>
              <label className={css.label} htmlFor={`${fieldId}-confirm-password`}>
                Repeat your password
              </label>
              <div className={css.passwordWrapper}>
                <Field
                  className={`${css.input} ${css.passwordInput}`}
                  type={showConfirmPassword ? 'text' : 'password'}
                  name="confirmPassword"
                  id={`${fieldId}-confirm-password`}
                  placeholder="*********"
                />

                <button
                  type="button"
                  className={css.eyeButton}
                  onClick={() => setShowConfirmPassword(prev => !prev)}
                  aria-label={showConfirmPassword ? 'Hide password' : 'Show password'}
                  aria-pressed={showConfirmPassword}
                >
                  {showConfirmPassword ? (
                    <img src="/icons/open-eye-icon.svg" alt="eye on" />
                  ) : (
                    <img src="/icons/close-eye-icon.svg" alt="eye off" />
                  )}
                </button>
              </div>
              <ErrorMessage component="span" name="confirmPassword" className={css.isError} />
            </div>

            <button
              type="submit"
              className={css.submitButton}
              disabled={!dirty || !isValid || mutation.isPending}
            >
              {mutation.isPending ? (
                <Oval height={20} width={20} strokeWidth={5} color="#fff" />
              ) : (
                'Create account'
              )}
            </button>
          </Form>
        )}
      </Formik>

      <p className={css.redirectText}>
        Already have an account?
        <Link className={css.redirectLink} href="/auth/login">
          Log In
        </Link>
      </p>
    </div>
  );
};

export default RegistrationForm;
