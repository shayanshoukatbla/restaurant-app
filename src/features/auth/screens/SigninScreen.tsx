import React from 'react';
import {
  View,
  Text,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import type { AuthStackScreenProps } from '@app-types/navigation';
import type { ApiError } from '@app-types/api';
import { AppInput, Button, Logo } from '@components/index';
import { authApi } from '@features/auth/api/authApi';
import { useAuthStore } from '@features/auth/store/useAuthStore';
import { signinSchema, type SigninFields } from '../schemas/signin.schema';

type Props = AuthStackScreenProps<'Signin'>;

export default function SigninScreen({ navigation }: Props): React.JSX.Element {
  const { setAuth } = useAuthStore();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<SigninFields>({
    resolver: zodResolver(signinSchema),
    defaultValues: { email: '', password: '' },
  });

  const {
    mutate: signin,
    isPending,
    error: apiError,
  } = useMutation({
    mutationFn: authApi.login,
    onSuccess: (data) => setAuth(data.token, data.user),
  });

  const serverError = apiError ? (apiError as unknown as ApiError).error : null;

  const onSubmit = (values: SigninFields): void => {
    signin({
      email: values.email.trim(),
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

          <View className="w-full rounded-3xl bg-blue p-4 pt-6 gap-6 h-fit">
            {/* Inputs + Button */}
            <View className="w-full gap-6">
              <Controller
                control={control}
                name="email"
                render={({ field: { onChange, value } }) => (
                  <AppInput
                    label="Email"
                    placeholder="Escribe tu email"
                    value={value}
                    onChangeText={onChange}
                    keyboardType="email-address"
                    autoCapitalize="none"
                    autoCorrect={false}
                    theme="light"
                    error={errors.email?.message}
                  />
                )}
              />
              <Controller
                control={control}
                name="password"
                render={({ field: { onChange, value } }) => (
                  <AppInput
                    label="Contraseña"
                    placeholder="Escribe tu contraseña"
                    value={value}
                    onChangeText={onChange}
                    secureTextEntry
                    autoCapitalize="none"
                    theme="light"
                    error={errors.password?.message}
                  />
                )}
              />
              {serverError ? (
                <Text className="font-roobert text-sm text-center" style={{ color: '#FFB3B3' }}>
                  {serverError}
                </Text>
              ) : null}
              <Button
                label="Entrar"
                onPress={handleSubmit(onSubmit)}
                variant="solid-white"
                loading={isPending}
                disabled={isPending}
              />
            </View>

            {/* Register link */}
            <TouchableOpacity onPress={() => navigation.navigate('Signup')}>
              <Text className="font-roobert text-base text-canvas text-center">
                ¿No tienes cuenta?{' '}
                <Text className="font-roobert text-base text-canvas underline">Regístrate</Text>
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
