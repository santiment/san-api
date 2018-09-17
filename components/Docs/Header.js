import { Fragment } from 'react'
import markdownIt from 'markdown-it'
import markdownItAttrs from 'markdown-it-attrs'
import HeaderMD from './HeaderMD'

const md = markdownIt({ html: true })
md.use(markdownItAttrs)

export default () => {
  return (
    <div
      className='header'
      dangerouslySetInnerHTML={{
        __html: md.render(HeaderMD)
      }}
    />
  )
}
