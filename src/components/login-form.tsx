import { Label } from '@radix-ui/react-label'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from './ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs'
import { Input } from './ui/input'
import { Button } from './ui/button'
import Cookies from 'js-cookie'
import { useState, type FormEvent, type ChangeEvent } from 'react'
import { validateUser } from '../http/login-user'

export function LoginForm() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  async function handleLogin(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()

    const token = await validateUser({ username, password })

    if (!token) {
      throw new Error('Invalid or expired JWT token')
    }

    Cookies.set('jwt_token', token, { expires: 1 / 12, sameSite: 'strict' })
  }

  async function registerNewUser(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()

    const form = new FormData(e.currentTarget)
    const confirmPassword = form.get('confirmPassword')?.toString()

    if (password !== confirmPassword) {
      setError('As senhas não são iguais!')
    }

    const token = await validateUser({ username, password })

    if (!token) {
      throw new Error()
    }

    Cookies.set('jwt_token', token, { expires: 1 / 12, sameSite: 'strict' })
  }

  function handleChangeUsername(e: ChangeEvent<HTMLInputElement>) {
    e.preventDefault()

    setUsername(e.target.value)
  }

  function handleChangePassword(e: ChangeEvent<HTMLInputElement>) {
    e.preventDefault()

    setPassword(e.target.value)
  }

  return (
    <Tabs defaultValue="account" className="w-[400px]">
      <TabsList className="grid w-full h-full grid-cols-2 gap-2">
        <TabsTrigger value="account" className="text-lg">
          Entrar
        </TabsTrigger>
        <TabsTrigger value="register" className="text-lg">
          Registre-se
        </TabsTrigger>
      </TabsList>
      <TabsContent value="account">
        <Card>
          <form onSubmit={handleLogin}>
            <CardHeader>
              <CardTitle className="text-2xl">Entrar</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="space-y-1">
                <Label htmlFor="usuario" className="text-lg">
                  Nome de Usuário
                </Label>
                <Input
                  id="usuario"
                  className="text-md font-semibold"
                  value={username}
                  onChange={handleChangeUsername}
                  maxLength={30}
                />
              </div>
              <div className="space-y-1">
                <Label htmlFor="senha" className="text-lg">
                  Senha
                </Label>
                <Input
                  id="senha"
                  type="password"
                  className="text-md"
                  value={password}
                  onChange={handleChangePassword}
                  maxLength={16}
                />
              </div>
              {error && <p className="text-red-600">{error}</p>}
            </CardContent>
            <CardFooter>
              <Button className="text-lg">Entrar</Button>
            </CardFooter>
          </form>
        </Card>
      </TabsContent>
      <TabsContent value="register">
        <Card>
          <form onSubmit={registerNewUser}>
            <CardHeader>
              <CardTitle className="text-2xl">Registre-se</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="space-y-1">
                <Label htmlFor="username" className="text-lg">
                  Nome de Usuário
                </Label>
                <Input
                  id="username"
                  className="text-md font-semibold"
                  value={username}
                  onChange={handleChangeUsername}
                  maxLength={30}
                />
              </div>
              <div className="space-y-1">
                <Label htmlFor="password" className="text-lg">
                  Senha
                </Label>
                <Input
                  id="password"
                  className="text-md font-semibold"
                  type="password"
                  value={password}
                  onChange={handleChangePassword}
                  maxLength={16}
                />
              </div>
              <div className="space-y-1">
                <Label htmlFor="password" className="text-lg">
                  Confirme sua Senha
                </Label>
                <Input
                  name="confirmPassword"
                  className="text-md font-semibold"
                  maxLength={16}
                />
              </div>
              {error && <p className="text-red-600">{error}</p>}
            </CardContent>
            <CardFooter>
              <Button className="text-lg">Criar uma Conta</Button>
            </CardFooter>
          </form>
        </Card>
      </TabsContent>
    </Tabs>
  )
}
