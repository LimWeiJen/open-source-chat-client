import { CodeIcon } from 'lucide-react'
import { marked } from 'marked'
import React from 'react'

export const ChatMessage = ({ message, isUser }: { message: string, isUser: boolean }) => {
  return (
    <div className='flex'>
      {!isUser &&
        <div>
          <CodeIcon className='h-full' />
        </div>
      }
      <div className={`${isUser && 'bg-stone-800 w-3/4 shadow-lg rounded-2xl'} w-fit p-4 my-4 flex flex-col gap-4`} dangerouslySetInnerHTML={{ __html: marked.parse(message) }}>
      </div>
    </div>
  )
}
