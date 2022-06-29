import React, { useState, useMemo } from 'react'
import axios from 'axios'
import { baseApiUrl, showError, showSuccess } from '../../global'
import FormGroupControl from '../utils/FormGroupControl'
import DataSelect from '../utils/DataSelect'
import Form from 'react-bootstrap/Form'
import DataPagination from '../utils/DataPagination'
import Button from 'react-bootstrap/Button'
import useObjectState from '../../hooks/useObjectState'
import useLoadData from '../../hooks/useLoadData'
import DataTable from '../utils/DataTable'
import QuillEditor from '../utils/QuillEditor'

export default function ArticleAdmin() {
  const [mode, setMode] = useState('save')
  const [page, setPage] = useState(1)
  const [validated, setValidated] = useState(false)
  const initialArticle = {
    id: undefined,
    name: '',
    categoryId: undefined,
    description: '',
    content: '',
    imageUrl: '',
    userId: undefined,
  }
  const [article, setArticle] = useObjectState(initialArticle)
  const [articles, loadArticles] = useLoadData(`/articles?page=${page}`, {
    data: [],
    count: 0,
    limit: 1,
  })
  const [categories] = useLoadData('/categories')
  const [users] = useLoadData('/users')
  const fields = useMemo(() => {
    const loadArticle = (article, mode = 'save') => {
      axios
        .get(`${baseApiUrl}/articles/${article.id}`)
        .then((res) => {
          setArticle(res.data)
          setMode(mode)
        })
        .catch(showError)
    }
    return [
      { key: 'id', label: 'Código', sortable: true },
      { key: 'name', label: 'Nome', sortable: true },
      { key: 'description', label: 'Descrição', sortable: true },
      {
        key: 'actions',
        label: 'Ações',
        formatter: (item) => {
          return (
            <div className="d-flex gap-2 flex-wrap">
              <Button variant="warning" onClick={() => loadArticle(item)}>
                <i className="fa fa-pencil"></i>
              </Button>
              <Button
                variant="danger"
                onClick={() => loadArticle(item, 'remove')}>
                <i className="fa fa-trash"></i>
              </Button>
            </div>
          )
        },
      },
    ]
    // eslint-disable-next-line
  }, [])

  const reset = () => {
    setMode('save')
    setArticle(initialArticle)
    setValidated(false)
  }

  const submit = () => {
    setValidated(true)
    const method = mode === 'remove' ? 'delete' : article.id ? 'put' : 'post'
    const id = article.id ? `/${article.id}` : ''
    axios[method](`${baseApiUrl}/articles${id}`, article)
      .then(() => {
        showSuccess()
        reset()
        loadArticles()
      })
      .catch(showError)
  }

  return (
    <div>
      <Form
        className="d-grid gap-3"
        onReset={(e) => {
          e.preventDefault()
          reset()
        }}
        noValidate
        validated={validated}
        onSubmit={(e) => {
          e.preventDefault()
          submit()
        }}>
        <input type="hidden" id="article-id" value={article.id || ''} />
        <FormGroupControl
          type="name"
          value={article.name}
          label="Nome:"
          controlId={'article-name'}
          placeholder="Digite o Nome do Artigo..."
          required
          readOnly={mode === 'remove'}
          onChange={(e) => setArticle({ name: e.target.value })}
        />
        <FormGroupControl
          type="text"
          value={article.description}
          label="Descrição:"
          controlId={'article-description'}
          placeholder="Descreva o Artigo..."
          required
          readOnly={mode === 'remove'}
          onChange={(e) => setArticle({ description: e.target.value })}
        />
        {mode === 'save' && (
          <>
            <FormGroupControl
              type="text"
              value={article.imageUrl || ''}
              label="Imagem (URL):"
              controlId={'article-imageUrl'}
              placeholder="Informe a URL da Imagem..."
              readOnly={mode === 'remove'}
              onChange={(e) => setArticle({ imageUrl: e.target.value })}
            />
            <Form.Group controlId="article-category-id">
              <Form.Label>Categoria:</Form.Label>
              <DataSelect
                value={article.categoryId}
                items={categories.map((category) => {
                  return {
                    value: category.id,
                    text: category.path,
                  }
                })}
                required
                onChange={(e) =>
                  setArticle({ categoryId: e.target.value || null })
                }
              />
            </Form.Group>
            <Form.Group controlId="article-user-id">
              <Form.Label>Autor:</Form.Label>
              <DataSelect
                value={article.userId}
                items={users.map((user) => {
                  return {
                    value: user.id,
                    text: `${user.name} - ${user.email}`,
                  }
                })}
                required
                onChange={(e) => setArticle({ userId: e.target.value || null })}
              />
            </Form.Group>
            <Form.Group controlId="article-content">
              <Form.Label>Conteúdo:</Form.Label>
              <QuillEditor
                value={article.content}
                onChange={(content) => setArticle({ content })}
                placeholder="Escreva o Artigo..."
                required
              />
            </Form.Group>
          </>
        )}
        <div className="d-flex gap-2">
          {mode === 'save' ? (
            <Button variant="primary" type="submit">
              Salvar
            </Button>
          ) : (
            <Button variant="danger" type="submit">
              Excluir
            </Button>
          )}
          <Button variant="secondary" type="reset">
            Cancelar
          </Button>
        </div>
      </Form>
      <hr />
      <DataTable
        hover
        striped
        responsive
        items={articles.data}
        fields={fields}
      />
      <DataPagination
        count={articles.count}
        page={page}
        limit={articles.limit}
        onChange={setPage}
      />
    </div>
  )
}
