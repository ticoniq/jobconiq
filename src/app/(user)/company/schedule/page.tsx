import React from 'react'

type Props = {}

function schedulePage({}: Props) {
  return (
    <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-10">
      <div className="flex flex-col justify-start items-start space-y-2">
        <p className="text-lg font-clash font-semibold md:text-2xl">Schedule Page</p>
      </div>
      <div>Schedule Page Coming Soon</div>
    </main>
  )
}

export default schedulePage