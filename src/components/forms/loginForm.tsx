'use client'

import { Button } from '@/components/buttons/button'
import { Form } from '@/components/forms/form'
import { FormInput } from '@/components/forms/formInput'
import { useLogin } from '@/hooks/useAuth'
import { usePaths } from '@/hooks/usePaths'
import { zodResolver } from '@hookform/resolvers/zod'
import { useTransitionRouter } from 'next-view-transitions'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string(),
})

type LoginSchema = z.infer<typeof loginSchema>

export const LoginForm = () => {
  const router = useTransitionRouter()
  const { mutate, isPending, error, isSuccess } = useLogin()
  const { cardsPath } = usePaths()

  const loginText = isPending ? 'Logging in' : 'Login'

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginSchema>({
    defaultValues: {
      email: '',
      password: '',
    },
    resolver: zodResolver(loginSchema),
  })

  const onSubmit = handleSubmit(data => mutate(data))

  if (isSuccess) router.push(cardsPath)

  return (
    <Form onSubmit={onSubmit} error={error?.message}>
      <FormInput
        control={control}
        name='email'
        label='Email'
        type='email'
        placeholder='example@mail.com'
        required
        error={errors.email?.message}
        disabled={isPending}
      />
      <FormInput
        control={control}
        type='password'
        autoComplete='on'
        name='password'
        label='Password'
        placeholder='Password'
        required
        error={errors.password?.message}
        disabled={isPending}
      />
      <Button isLoading={isPending} disabled={isPending}>
        {loginText}
      </Button>
    </Form>
  )
}
