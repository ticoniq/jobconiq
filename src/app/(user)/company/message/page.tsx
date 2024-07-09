import React from 'react'

type Props = {}

function MessagePage({ }: Props) {
  return (
    <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-10">
      <div className="flex flex-col justify-start items-start space-y-2">
        <p className="text-sm font-clash font-semibold md:text-2xl">Message Page</p>
      </div>
      <div>Message Page Coming Soon</div>
    </main>
  )
}

export default MessagePage