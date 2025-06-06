import { AppSidebar } from '@/components/app-sidebar'
import { DialogPost } from '@/components/dialog-post'
import { SidebarProvider } from '@/components/ui/sidebar'
import { PostDialogProvider } from '@/providers/post-dialog-provider'

export default function FeedLayout(props: { children: React.ReactNode }) {
  const { children } = props

  return (
    <PostDialogProvider>
      <SidebarProvider>
        <AppSidebar />
        <main className='w-full'>{children}</main>
        <DialogPost />
      </SidebarProvider>
    </PostDialogProvider>
  )
}
