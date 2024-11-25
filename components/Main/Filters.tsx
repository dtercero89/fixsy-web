"use client"

import { useState } from 'react'
import { Button } from "@/ui/controls/button"
import { Input } from "@/ui/controls/input"
import { Label } from "@/ui/controls/label"
import { Slider } from "@/ui/controls/slider"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/ui/controls/sheet"
import { Filter } from 'lucide-react'

export function Filters() {
  const [priceRange, setPriceRange] = useState([0, 100])

  return (
    <>
      {/* Filtros para pantallas pequeñas */}
      <div className="lg:hidden">
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" className="w-full">
              <Filter className="mr-2 h-4 w-4" />
              Filtros
            </Button>
          </SheetTrigger>
          <SheetContent side="left">
            <SheetHeader>
              <SheetTitle>Filtros</SheetTitle>
              <SheetDescription>
                Ajusta los filtros para encontrar el servicio perfecto.
              </SheetDescription>
            </SheetHeader>
            <div className="grid gap-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="search">Buscar</Label>
                <Input id="search" placeholder="Buscar servicios..." />
              </div>
              <div className="space-y-2">
                <Label>Rango de Precio</Label>
                <Slider
                  min={0}
                  max={100}
                  step={1}
                  value={priceRange}
                  onValueChange={setPriceRange}
                />
                <div className="flex justify-between text-sm text-muted-foreground">
                  <span>${priceRange[0]}</span>
                  <span>${priceRange[1]}</span>
                </div>
              </div>
              {/* Aquí puedes agregar más filtros según sea necesario */}
            </div>
          </SheetContent>
        </Sheet>
      </div>

      {/* Filtros para pantallas grandes */}
      <div className="hidden lg:block">
        <div className="space-y-4">
          <div>
            <h3 className="mb-2 text-lg font-semibold">Filtros</h3>
            <Input placeholder="Buscar servicios..." />
          </div>
          <div className="space-y-2">
            <Label>Rango de Precio</Label>
            <Slider
              min={0}
              max={100}
              step={1}
              value={priceRange}
              onValueChange={setPriceRange}
            />
            <div className="flex justify-between text-sm text-muted-foreground">
              <span>${priceRange[0]}</span>
              <span>${priceRange[1]}</span>
            </div>
          </div>
          {/* Aquí puedes agregar más filtros según sea necesario */}
        </div>
      </div>
    </>
  )
}

