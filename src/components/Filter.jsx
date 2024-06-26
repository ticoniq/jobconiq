"use client";
import { MinusIcon } from "lucide-react";

const filters = [
  {
    id: "type-of-employment",
    name: "Type of Employment",
    options: [
      { value: "white", label: "Full-time (3)"},
      { value: "beige", label: "Part-Time (5)"},
      { value: "blue", label: "Remote (2)" },
      { value: "brown", label: "Internship (24)"},
      { value: "green", label: "Contract (3)"},
    ],
  },
  {
    id: "job-level",
    name: "Job Level",
    options: [
      { value: "2l", label: "Entry Level (57)"},
      { value: "6l", label: "Mid Level (3)"},
      { value: "12l", label: "Senior Level (5)"},
      { value: "18l", label: "Director (12)"},
    ],
  },
  {
    id: "salary-range",
    name: "Salary Range",
    options: [
      { value: "2l", label: "$700 - $1000 (4)"},
      { value: "6l", label: "$700 - $1000 (4)"},
    ],
  },
];

export function Filter() {
  return (
    <form>
      {filters.map((section) => (
        <div key={section.id}>
          <>
            <h3 className="-my-3 flow-root">
              <div className="flex w-full items-center justify-between mt-10 text-sm">
                <span className="font-semibold font-clash">{section.name}</span>
                <span className="ml-6 flex items-center">
                  <MinusIcon className="h-5 w-5" aria-hidden="true" />
                </span>
              </div>
            </h3>
            <div className="mt-4">
              <div className="space-y-4">
                {section.options.map((option, optionIdx) => (
                  <div key={option.value} className="flex items-center gap-2">
                    <input
                      id={`filter-${section.id}-${optionIdx}`}
                      name={`${section.id}[]`}
                      defaultValue={option.value}
                      type="checkbox"
                      className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                    />
                    <label
                      htmlFor={`filter-${section.id}-${optionIdx}`}
                      className="ml-3 text-sm">
                      {option.label}
                    </label>
                  </div>
                ))}
              </div>
            </div>
          </>
        </div>
      ))}
    </form>
  );
}
