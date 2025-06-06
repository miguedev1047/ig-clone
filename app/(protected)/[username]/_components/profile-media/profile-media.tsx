import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { SavedPosts } from '@/app/(protected)/[username]/_components/saved-posts'
import { YourPosts } from '@/app/(protected)/[username]/_components/your-posts'

export function ProfileMedia() {
  return (
    <Tabs
      defaultValue='tab-1'
      className='items-center w-full border-t'
    >
      <TabsList className='w-[200px] h-auto text-foreground gap-2 rounded-none border-0 bg-transparent px-0 py-1 uppercase'>
        <TabsTrigger
          value='tab-1'
          className='hover:bg-accent hover:text-foreground data-[state=active]:after:bg-primary data-[state=active]:hover:bg-accent relative after:absolute after:inset-x-0 after:top-0 after:-mb-1 after:h-0.5 data-[state=active]:bg-transparent data-[state=active]:shadow-none h-[48px] uppercase'
        >
          Posts
        </TabsTrigger>
        <TabsTrigger
          value='tab-2'
          className='hover:bg-accent hover:text-foreground data-[state=active]:after:bg-primary data-[state=active]:hover:bg-accent relative after:absolute after:inset-x-0 after:top-0 after:-mb-1 after:h-0.5 data-[state=active]:bg-transparent data-[state=active]:shadow-none h-[48px] uppercase'
        >
          Saved
        </TabsTrigger>
      </TabsList>

      <TabsContent value='tab-1'>
        <YourPosts />
      </TabsContent>
      <TabsContent value='tab-2'>
        <SavedPosts />
      </TabsContent>
    </Tabs>
  )
}
