import React from 'react'

type Props = {}

function page({}: Props) {
  return (
    <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-10">
      <div className="flex flex-col justify-start items-start space-y-2">
        <p className="text-lg font-clash font-semibold md:text-2xl">Application History Page</p>
      </div>
      <div>Application History Page Coming Soon</div>
    </main>
  )
}

export default page