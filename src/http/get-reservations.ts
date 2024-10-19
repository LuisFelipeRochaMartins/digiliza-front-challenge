import Cookies from 'js-cookie'
import type { Reservations } from '../components/reservation-list'

export async function getReservations(): Promise<Reservations[]> {
  const response = await fetch('http://localhost:8080/reservations', {
    headers: {
      Authorization: `Bearer ${Cookies.get('jwt_token')}`,
    },
  })

  if (!response.ok) {
    throw new Error('Network response was not ok')
  }

  return await response.json()
}
