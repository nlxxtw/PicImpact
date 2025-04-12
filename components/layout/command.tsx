'use client'

import {
  GalleryHorizontal,
  SquareTerminal,
  MoonStar,
  SunMedium,
  User,
  LoaderPinwheel
} from 'lucide-react'
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator
} from '~/components/ui/command'
import { useButtonStore } from '~/app/providers/button-store-providers'
import { useRouter } from 'next-nprogress-bar'
import { useSession } from 'next-auth/react'
import { useTheme } from 'next-themes'
import { useTranslations } from 'next-intl'
import type { AlbumDataProps } from '~/types/props'
import type { AlbumType } from '~/types'

export default function Command(props: Readonly<AlbumDataProps>) {
  const { command, setCommand } = useButtonStore(
    (state) => state,
  )
  const { data: session } = useSession()
  const router = useRouter()
  const { resolvedTheme, setTheme } = useTheme()
  const t = useTranslations()

  const iconClasses = 'text-xl text-default-500 pointer-events-none shrink-0'
  const closeClasses = 'flex items-center space-x-2 w-full p-1 rounded-small active:scale-95 duration-200 ease-in-out cursor-pointer'

  return (
    <>
      <CommandDialog open={command} onOpenChange={setCommand}>
        <CommandInput placeholder="Type a command or search..." />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          {Array.isArray(props.data) && props.data.length > 0 &&
            <>
              <CommandGroup heading="Album">
                <CommandItem
                  className={closeClasses}
                  onSelect={() => {
                    setCommand(false)
                    router.push('/')
                  }}
                >
                  <LoaderPinwheel />
                  <span>{t('Link.home')}</span>
                </CommandItem>
                {props.data.map((album: AlbumType) => (
                  <CommandItem
                    className={closeClasses}
                    key={album.id}
                    onSelect={() => {
                      setCommand(false)
                      router.push(album.album_value)
                    }}
                  >
                    <GalleryHorizontal />
                    <span>{album.name}</span>
                  </CommandItem>
                ))}
              </CommandGroup>
              <CommandSeparator />
            </>
          }
          {session ?
            <CommandGroup heading="Menu">
              <CommandItem className={closeClasses} onSelect={() => {
                router.push('/admin')
                setCommand(false)
              }}>
                <SquareTerminal />
                <span>{t('Link.dashboard')}</span>
              </CommandItem>
            </CommandGroup> :
            <CommandGroup heading="Menu">
              <CommandItem className={closeClasses} onSelect={() => {
                router.push('/login')
                setCommand(false)
              }}>
                <User />
                <span>{t('Login.login')}</span>
              </CommandItem>
            </CommandGroup>
          }
          <CommandSeparator />
          <CommandGroup heading="Settings">
            <CommandItem className={closeClasses} onSelect={() => setTheme(resolvedTheme === 'light' ? 'dark' : 'light')}>
              {resolvedTheme === 'light' ? <MoonStar size={20} className={iconClasses} /> : <SunMedium size={20} className={iconClasses} />}
              <p>{ resolvedTheme === 'light' ? '切换至⌈常夜⌋' : '切换至⌈白夜⌋' }</p>
            </CommandItem>
            <CommandItem className="justify-end">
              <a
                className="text-xs text-zinc-600 flex items-center gap-0.25"
                href="https://github.com/besscroft/PicImpact"
                target="_blank"
              >
                GitHub
                <svg
                  fill="none"
                  height="16"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  width="16"
                  aria-hidden="true"
                  className="w-3 h-3 ml-1"
                >
                  <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6"></path>
                  <path d="M15 3h6v6"></path>
                  <path d="M10 14L21 3"></path>
                </svg>
              </a>
            </CommandItem>
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </>
  )
}