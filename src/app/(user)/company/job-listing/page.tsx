import React from 'react'

type Props = {}

function jobListingPage({ }: Props) {
  return (
    <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-10">
      <div className="flex flex-col justify-start items-start space-y-2">
        <h3 className="text-sm font-clash font-semibold md:text-2xl">Job Listing</h3>
        <p>Here is your jobs listing status</p>
      </div>
      <div className="flex flex-1">
        <div className="flex flex-col gap-1">
          page
        </div>
      </div>
    </main>
  )
}

export default jobListingPage