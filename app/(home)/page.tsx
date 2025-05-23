import { Asset1, Asset2 } from "@/assets/mocks/_index";
import { DownloadButtons } from "@/components/download-buttons";
import ImportantNote from "@/components/important-note/important-note";
import { SignInWithdiscord } from "@/components/sign-in-with-discord";
import Iphone15Pro from "@/components/ui/iphone-15-pro";
import { NAME_APP } from "@/constants/misc";
import Link from "next/link";
import { HomeForm } from "./_components/home-form";

export default async function Home() {
  return <main className='w-full h-screen grid place-items-center relative'>
      <ImportantNote />

      <section className='flex justify-center items-center w-[935px]'>
        <div className='w-[380px]'>
          <div className='w-full h-[580px] relative'>
            <Iphone15Pro
              className='top-0 -left-20 absolute size-full'
              src={Asset2.src}
            />

            <Iphone15Pro
              className='top-4 left-4 absolute size-full'
              src={Asset1.src}
            />
          </div>
        </div>

        <div className='w-[350px] flex flex-col py-8 gap-2'>
          <div className='w-full border border-accent p-8 flex flex-col gap-2 items-center space-y-4'>
            <h2 className='text-4xl font-bold pb-5'>{NAME_APP}</h2>
            <HomeForm />

            <SignInWithdiscord
              isSeparator
              separatorPosition='top'
            />
          </div>

          <div className='w-full border border-accent p-8 '>
            <p className='text-sm text-center'>
              Don&apos;t have an account?{' '}
              <Link
                href='/account/sign-up'
                className='text-sky-500 dark:text-sky-400 hover:underline'
              >
                Sign up
              </Link>
            </p>
          </div>

          <DownloadButtons />
        </div>
      </section>
    </main>
}
