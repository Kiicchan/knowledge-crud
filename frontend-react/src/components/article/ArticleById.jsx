import React, { useEffect } from 'react'
import PageTitle from '../template/PageTitle'
import useLoadData from '../../hooks/useLoadData'
import { useParams } from 'react-router-dom'
import styled from 'styled-components'
import { sanitize } from 'dompurify'
import 'highlight.js/styles/dracula.css'
import hljs from 'highlight.js'

const StyledContent = styled.div`
  & {
    background-color: #fff;
    border-radius: 8px;
    padding: 25px;
  }

  & pre {
    padding: 20px;
    border-radius: 8px;
    font-size: 1.2rem;
    background-color: #1e1e1e;
    color: #fff;
  }

  & img {
    max-width: 100%;
  }

  & :last-child {
    margin-bottom: 0px;
  }
`

export default function ArticleById() {
  const { id: articleId } = useParams()
  const [article] = useLoadData(`/articles/${articleId}`, {
    name: '',
    description: '',
    content: '',
  })

  useEffect(() => {
    document.querySelectorAll('pre').forEach((el) => {
      hljs.highlightElement(el)
    })
  })
  return (
    <div className="article-by-id">
      <PageTitle
        icon="fa fa-file-o"
        main={article.name}
        sub={article.description}
      />
      <StyledContent
        dangerouslySetInnerHTML={{
          __html: sanitize(article.content),
        }}
      />
    </div>
  )
}
