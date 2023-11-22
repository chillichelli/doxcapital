import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from '@/components/ui/hover-card'
import { FC } from 'react'

interface TeamMember {
  src?: string
  username: string
  hasTwitter?: boolean
  caption?: string
  role?: string
}

export const TeamMember: FC<TeamMember> = ({
  src,
  username,
  hasTwitter = true,
  caption,
  role,
}) => {
  const content = hasTwitter ? (
    <a
      rel="noopener noreferrer"
      target="_blank"
      href={`https://twitter.com/${username.toLowerCase()}`}
      className="font-semibold text-xl text-blue cursor-pointer hover:underline underline-offset-4"
    >
      @{username}
    </a>
  ) : (
    <p className="font-semibold text-2xl">{username}</p>
  )
  return (
    <div className="flex items-center gap-3">
      <Avatar>
        <AvatarImage src={src} />
        <AvatarFallback>{username[0]}</AvatarFallback>
      </Avatar>
      {caption ? (
        <HoverCard>
          <HoverCardTrigger asChild>{content}</HoverCardTrigger>
          <HoverCardContent className="w-fit max-w-[320px]">
            <div className="flex justify-between items-start space-x-4">
              <Avatar>
                <AvatarImage src={src} />
                <AvatarFallback>{username[0]}</AvatarFallback>
              </Avatar>
              <div>
                <h4 className="text-lg font-semibold">{username}</h4>
                <p className="text-md">{caption}</p>
                {role ? (
                  <div className="flex items-center pt-2">
                    <span className="text-xs text-muted-foreground">
                      {role}
                    </span>
                  </div>
                ) : null}
              </div>
            </div>
          </HoverCardContent>
        </HoverCard>
      ) : (
        content
      )}
    </div>
  )
}
