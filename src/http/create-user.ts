export async function createUser(user: { username: string; password: string }) {
  try {
    const response = await fetch('http://localhost:8080/user/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(user),
    })

    if (!response.ok) {
      throw new Error('Something went wrong!')
    }

    const data = await response.json()
    return data?.token
  } catch (error) {
    throw new Error('Something went wrong!')
  }
}
