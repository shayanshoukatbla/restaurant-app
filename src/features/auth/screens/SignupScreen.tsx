import React, { useState } from 'react';
import { View, Text, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import type { AuthStackScreenProps } from '@app-types/navigation';
import type { ApiError } from '@app-types/api';
import { AppInput, Button, Logo } from '@components/index';
import { authApi } from '@features/auth/api/authApi';
import { useAuthStore } from '@features/auth/store/useAuthStore';
import {
  signupStepOneSchema,
  signupStepTwoSchema,
  type SignupStepOneFields,
  type SignupStepTwoFields,
} from '../schemas/signup.schema';

type Props = AuthStackScreenProps<'Signup'>;

export default function SignupScreen({ navigation }: Props): React.JSX.Element {
  const { setAuth } = useAuthStore();
  const [step, setStep] = useState<1 | 2>(1);
  const [stepOneValues, setStepOneValues] = useState<SignupStepOneFields>({ email: '', name: '' });

  const {
    control: control1,
    handleSubmit: handleSubmit1,
    formState: { errors: errors1 },
  } = useForm<SignupStepOneFields>({
    resolver: zodResolver(signupStepOneSchema),
    defaultValues: { email: '', name: '' },
  });

  const {
    control: control2,
    handleSubmit: handleSubmit2,
    formState: { errors: errors2 },
  } = useForm<SignupStepTwoFields>({
    resolver: zodResolver(signupStepTwoSchema),
    defaultValues: { password: '' },
  });

  const {
    mutate: signup,
    isPending,
    error: apiError,
  } = useMutation({
    mutationFn: authApi.signup,
    onSuccess: (data) => setAuth(data.token, data.user),
  });

  const serverError = apiError ? (apiError as unknown as ApiError).error : null;

  const onStepOneNext = (values: SignupStepOneFields): void => {
    setStepOneValues(values);
    setStep(2);
  };

  const onStepTwoSubmit = (values: SignupStepTwoFields): void => {
    signup({
      email: stepOneValues.email.trim(),
      name: stepOneValues.name.trim(),
      password: values.password,
    });
  };

  return (
    <SafeAreaView className="flex-1 bg-canvas" edges={['top', 'bottom', 'left', 'right']}>
      <KeyboardAvoidingView
        className="flex-1"
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <ScrollView
          className="flex-1"
          contentContainerClassName="flex-grow justify-between px-4 pt-10 pb-4"
          keyboardShouldPersistTaps="handled"
        >
          {/* Logo */}
          <View className="items-center">
            <Logo size="md" color="blue" />
          </View>

          <View className="w-full rounded-3xl bg-blue mt-6 p-4 pt-6 gap-10 h-[416px]">
            {/* Back button */}
            <View className="flex-row">
              <Button
                onPress={() => (step === 2 ? setStep(1) : navigation.goBack())}
                variant="outline-white"
                showArrowLeft
                className="w-auto px-6 "
              />
            </View>

            {/* Step 1: Email + Name */}
            {step === 1 && (
              <View className="w-full gap-6">
                <Controller
                  control={control1}
                  name="email"
                  render={({ field: { onChange, value } }) => (
                    <AppInput
                      label="Email"
                      placeholder="Añade tu email"
                      value={value}
                      onChangeText={onChange}
                      keyboardType="email-address"
                      autoCapitalize="none"
                      autoCorrect={false}
                      theme="light"
                      error={errors1.email?.message}
                    />
                  )}
                />
                <Controller
                  control={control1}
                  name="name"
                  render={({ field: { onChange, value } }) => (
                    <AppInput
                      label="Nombre de usuario"
                      placeholder="Añade tu nombre"
                      value={value}
                      onChangeText={onChange}
                      autoCapitalize="words"
                      theme="light"
                      error={errors1.name?.message}
                    />
                  )}
                />
                <Button
                  label="Siguiente"
                  onPress={handleSubmit1(onStepOneNext)}
                  variant="solid-white"
                />
              </View>
            )}

            {/* Step 2: Password */}
            {step === 2 && (
              <View className="w-full gap-6 mt-auto">
                <Controller
                  control={control2}
                  name="password"
                  render={({ field: { onChange, value } }) => (
                    <AppInput
                      label="Crea una nueva contraseña"
                      placeholder="Añade una contraseña"
                      value={value}
                      onChangeText={onChange}
                      secureTextEntry
                      autoCapitalize="none"
                      theme="light"
                      error={errors2.password?.message}
                    />
                  )}
                />
                {serverError ? (
                  <Text className="font-roobert text-sm text-center" style={{ color: '#FFB3B3' }}>
                    {serverError}
                  </Text>
                ) : null}
                <Button
                  label="Finalizar"
                  onPress={handleSubmit2(onStepTwoSubmit)}
                  variant="solid-white"
                  loading={isPending}
                  disabled={isPending}
                />
              </View>
            )}
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
