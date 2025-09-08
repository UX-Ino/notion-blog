import dynamic from 'next/dynamic'
import type { NotionRendererProps } from 'react-notion-x'

import { Loading } from './Loading'

const NotionRenderer = dynamic(
  () => import('react-notion-x').then((m) => m.NotionRenderer),
  {
    ssr: false,
    loading: () => <Loading />
  }
)

export function ClientSideNotionRenderer(props: NotionRendererProps) {
  return <NotionRenderer {...props} />
}
