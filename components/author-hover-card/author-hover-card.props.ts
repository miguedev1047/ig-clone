import { AuthorProps } from "@/types/user"

export type AuthorHoverCardProps = {
  user: AuthorProps | undefined
  showName?: boolean
  className?: string
}

export type AuthorHoverCardContentProps = {
  name: string | undefined
}
