import Cookies from 'js-cookie'

export async function makeNewReservation(reservation: {
  capacity: number
  date: Date
  startDate: string
  endDate: string
}) {
  const response = await fetch('http://localhost:8080/reservations', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${Cookies.get('jwt_token')}`,
    },
    body: JSON.stringify(reservation),
  })

  const data = await response.json()
}
