import { Armchair, Clock, Users } from "lucide-react";
import { Reservations } from "./reservation-list";
import { Card, CardContent, CardHeader } from "./ui/card";
import { formatDate } from "../lib/utils";

export function ReservationCard({ date, startTime, endTime, capacity, tableId }: Reservations) {
  return (
    <Card className="w-full">
      <CardHeader>
        <span className="font-semibold">Data da Reserva {date.toString()}</span>
      </CardHeader>
      <CardContent>
        <div className="flex flex-row gap-2 items-center">
          <div className="flex flex-row gap-4 self-start mb-3">
            <Clock />
            <span>Início: {startTime} - Termino: {endTime} </span>
          </div>
        </div> 
        <div className="flex flex-row gap-4 self-start mb-3">
          <Users />
          <span>Capacidade: {capacity}</span>
        </div>  
        <div className="flex flex-row gap-4 self-start">
          <Armchair />
          <span>Mesa: {tableId}</span>
        </div>     
      </CardContent>
    </Card>
  )
}