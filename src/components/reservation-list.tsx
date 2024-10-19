import { useEffect, useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card'
import { getReservations } from '../http/get-reservations'
import { ReservationCard } from './reservation-card'

export interface Reservations {
  id: number
  date: Date
  startTime: string
  endTime: string
  capacity: number
  tableId: number
}

export function ReservationList() {
  const [reservations, setReservations] = useState<Reservations[]>([])

  useEffect(() => {
    const fetchReservations = async () => {
      try {
        const data = await getReservations()
        setReservations(data)
      } catch (err) {}
    }

    fetchReservations()
  }, [])

  return (
    <section className="flex flex-col gap-5 justify-center items-start w-1/2">
      <Card className="w-full">
        <CardHeader>
          <CardTitle>Histórico de Reservas</CardTitle>
        </CardHeader>
        <CardContent>
          <p>Aqui você pode conferir dados de reservas anteriores</p>
        </CardContent>
      </Card>
      <div className='w-full flex flex-col gap-4 overflow-y-auto max-h-[600px]'>
        {reservations.map(reservation => {
          return (<ReservationCard key={reservation.id} {...reservation}/>)
        })}
      </div>
    </section>
  )
}
