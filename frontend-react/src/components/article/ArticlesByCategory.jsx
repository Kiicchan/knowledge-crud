import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import PageTitle from '../template/PageTitle'
import useLoadPartialData from '../../hooks/useLoadPartialData'
import useLoadData from '../../hooks/useLoadData'
import Button from 'react-bootstrap/Button'
import { showError } from '../../global'
import ArticleItem from './ArticleItem'

export default function ArticlesByCategory() {
  const { id: categoryId } = useParams()
  const [category] = useLoadData(`/categories/${categoryId}`, {
    name: '',
    id: '',
  })
  const [articles, loadMoreArticles] = useLoadPartialData(
    `/categories/${categoryId}/articles?page=`
  )
  const [loadMoreButton, setLoadMoreButton] = useState(true)

  function handleClickMoreArticles() {
    loadMoreArticles()
      .then((res) => {
        if (res?.data?.length === 0) setLoadMoreButton(false)
      })
      .catch(showError)
  }

  useEffect(() => {
    setLoadMoreButton(true)
  }, [categoryId])

  return (
    <div>
      <PageTitle
        icon="fa fa-folder-o"
        main={category.name || ''}
        sub="Categoria"
      />
      <ul className="list-unstyled">
        {articles.map((article) => {
          return <ArticleItem key={article.id} article={article} />
        })}
      </ul>
      <div className="d-flex flex-column align-items-center">
        {loadMoreButton && (
          <Button
            type="button"
            variant="outline-primary"
            size="lg"
            onClick={handleClickMoreArticles}>
            Carregar Mais Artigos
          </Button>
        )}
      </div>
    </div>
  )
}
