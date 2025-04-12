import Logo from '~/components/layout/logo'
import { fetchAlbumsShow } from '~/server/db/query/albums'
import type { AlbumDataProps } from '~/types/props'
import HeaderIconGroup from '~/components/layout/header-icon-group'
import type { AlbumType } from '~/types'

export default async function Header() {
  const getData = async () => {
    'use server'
    return await fetchAlbumsShow()
  }

  const data: AlbumType[] = await getData()

  const props: AlbumDataProps = {
    data: data
  }

  return (
    <div className="flex items-center w-full p-2 sm:w-[66.667%] mx-auto">
      <div className="justify-start">
        <Logo/>
      </div>
      <div className="flex gap-1 flex-1 select-none justify-center w-full">
      </div>
      <div className="flex h-full items-center space-x-2 justify-end">
        <HeaderIconGroup {...props} />
      </div>
    </div>
  );
}