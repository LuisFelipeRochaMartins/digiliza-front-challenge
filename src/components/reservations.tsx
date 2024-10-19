import { Label } from '@radix-ui/react-label'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from './ui/card'
import { Input } from './ui/input'
import { Button } from './ui/button'
import { Separator } from './ui/separator'
import { type ChangeEvent, FormEvent, useState } from 'react'
import { Popover, PopoverTrigger } from '@radix-ui/react-popover'
import { cn } from '../lib/utils'
import { CalendarIcon } from 'lucide-react'
import { format } from 'date-fns'
import { PopoverContent } from './ui/popover'
import { Calendar } from './ui/calendar'
import { ReservationList } from './reservation-list'
import Cookies from 'js-cookie'


export function Reservations() {
  const [capacity, setCapacity] = useState<number>(0)
  const [date, setDate] = useState<Date | undefined>()
  const [startTime, setStartTime] = useState<string>('')
  const [endTime, setEndTime] = useState<string>('')
  const [timeError, setTimeError] = useState<string>('')

  function handleStartTimeChange(e: ChangeEvent<HTMLInputElement>) {
    const timeValue = e.target.value;
    const isValidTime = validateTimeInRange(timeValue, "18:00", "23:59");
  
    if (isValidTime) {
      setStartTime(timeValue + ":00");
    } else {
      setTimeError('Informe um horário entre 18h e 23:59')
    }
  }
  
  function handleEndTimeChange(e: ChangeEvent<HTMLInputElement>) {
    const timeValue = e.target.value;
    const isValidTime = validateTimeInRange(timeValue, "18:00", "23:59");
  
    if (isValidTime) {
      setEndTime(timeValue + ":00");
    } else {
      alert("End time must be between 18:00 and 23:59");
    }
  }
  
  function validateTimeInRange(time: string, min: string, max: string): boolean {
    return time >= min && time <= max;
  }

  async function createNewReservation(e: FormEvent<HTMLFormElement>) {
    const reservation = {capacity, date: date?.toISOString().slice(0,10), startDate: startTime, endDate: endTime}
    const response = await fetch('http://localhost:8080/reservations', {
      method: 'POST',
      headers: {
        'Content-Type' : 'application/json',
        'Authorization': `${Cookies.get('jwt_token')}`
      },
      body: JSON.stringify(reservation)
    })

    return await response.json()
  }

  return (
    <main className="flex flex-row justify-center items-center h-screen p-10">
      <section className="flex flex-col justify-center items-center w-1/2">
        <Card>
          <form onSubmit={createNewReservation} className="flex flex-col gap-2">
          <CardHeader>
            <CardTitle>Fazer uma Reserva</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
              <div className="space-y-1">
                <Label htmlFor="capacity">Quantidade de pessoas</Label>
                <Input
                  id="capacity"
                  value={capacity}
                  onChange={e => setCapacity(Number(e.target.value))}
                />
              </div>
              <div className="flex flex-col gap-1 space-y-1">
                <Label>Data</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant={'outline'}
                      className={cn(
                        'w-[280px] justify-start text-left font-normal',
                        !date && 'text-muted-foreground'
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {date ? (
                        format(date, 'PPP')
                      ) : (
                        <span>Escolha uma data</span>
                      )}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={date}
                      onSelect={setDate}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>
              <div className="space-y-1">
                <Label>Hora de Início</Label>
                <Input
                  type="time"
                  value={startTime}
                  onChange={handleStartTimeChange}
                  min="18:00" 
                  max="23:59"
                />
              </div>
              <div className="space-y-1">
                <Label>Hora de Término</Label>
                <Input
                  type="time"
                  value={endTime}
                  onChange={handleEndTimeChange}
                  min="18:00" 
                  max="23:59"
                />
              </div>
              {timeError && <span className='font-semibold text-red-600'>{timeError}</span>}
          </CardContent>
          <CardFooter>
            <Button type="submit">Criar Reserva</Button>
          </CardFooter>
        </form>
        </Card>
      </section>
      <Separator orientation="vertical" className="mx-5" />
      <ReservationList />
    </main>
  )
}
