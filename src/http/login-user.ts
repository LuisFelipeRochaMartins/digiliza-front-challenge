export async function validateUser(user: {
  username: string
  password: string
}) {
  try {
    const response = await fetch('http://localhost:8080/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(user),
    })

    if (!response.ok) {
      throw new Error('Login Failed')
    }
    const data = await response.json()
    return data?.token
  } catch {
    throw new Error('Something went wrong!')
  }
}
