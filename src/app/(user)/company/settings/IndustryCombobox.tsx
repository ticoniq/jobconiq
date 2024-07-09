"use client";
import { useState } from "react";
import { Check, ChevronsUpDown } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

export const industries = [
  { value: "agriculture", label: "Agriculture" },
  { value: "automotive", label: "Automotive" },
  { value: "banking_finance", label: "Banking & Finance" },
  { value: "biotechnology", label: "Biotechnology" },
  { value: "chemical", label: "Chemical" },
  { value: "construction", label: "Construction" },
  { value: "consulting", label: "Consulting" },
  { value: "consumer_goods", label: "Consumer Goods" },
  { value: "ecommerce", label: "E-commerce" },
  { value: "education", label: "Education" },
  { value: "energy", label: "Energy" },
  { value: "entertainment", label: "Entertainment" },
  { value: "environmental_services", label: "Environmental Services" },
  { value: "fashion", label: "Fashion" },
  { value: "food_beverage", label: "Food & Beverage" },
  { value: "healthcare", label: "Healthcare" },
  { value: "hospitality_tourism", label: "Hospitality & Tourism" },
  { value: "information_technology", label: "Information Technology" },
  { value: "insurance", label: "Insurance" },
  { value: "legal_services", label: "Legal Services" },
  { value: "manufacturing", label: "Manufacturing" },
  { value: "marketing_advertising", label: "Marketing & Advertising" },
  { value: "media_communications", label: "Media & Communications" },
  { value: "mining", label: "Mining" },
  { value: "non_profit_charity", label: "Non-profit & Charity" },
  { value: "pharmaceuticals", label: "Pharmaceuticals" },
  { value: "real_estate", label: "Real Estate" },
  { value: "retail", label: "Retail" },
  { value: "telecommunications", label: "Telecommunications" },
  { value: "transportation_logistics", label: "Transportation & Logistics" },
  { value: "utilities", label: "Utilities" },
]

interface IndustryComboboxProps {
  value: string | undefined;
  onChange: (value: string) => void;
}

export function IndustryCombobox({ value, onChange }: IndustryComboboxProps) {
  const [open, setOpen] = useState(false)

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[300px] justify-between"
        >
          {value && industries.find((industry) => industry.value === value)
            ? industries.find((industry) => industry.value === value)?.label
            : "Select an industry..."}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[300px] p-0">
        <Command>
          <CommandInput placeholder="Search industry..." />
          <CommandEmpty>No industry found.</CommandEmpty>
          <CommandGroup>
            {industries.map((industry) => (
              <CommandItem
                key={industry.value}
                value={industry.value}
                onSelect={(currentValue) => {
                  onChange(currentValue === value ? "" : currentValue)
                  setOpen(false)
                }}
              >
                <Check
                  className={cn(
                    "mr-2 h-4 w-4",
                    value === industry.value ? "opacity-100" : "opacity-0"
                  )}
                />
                {industry.label}
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  )
}