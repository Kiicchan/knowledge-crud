import React, { useState, useMemo } from 'react'
import axios from 'axios'
import { baseApiUrl, showError, showSuccess } from '../../global'
import FormGroupControl from '../utils/FormGroupControl'
import DataSelect from '../utils/DataSelect'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import useObjectState from '../../hooks/useObjectState'
import useLoadData from '../../hooks/useLoadData'
import DataTable from '../utils/DataTable'

export default function CategoryAdmin() {
  const [mode, setMode] = useState('save')
  const [validated, setValidated] = useState(false)
  const initialCategory = {
    id: undefined,
    name: '',
    parentId: null,
  }
  const [category, setCategory] = useObjectState(initialCategory)
  const [categories, loadCategories] = useLoadData('/categories')
  const fields = useMemo(() => {
    const loadCategory = (category, mode = 'save') => {
      setMode(mode)
      setCategory({ ...category })
    }
    return [
      { key: 'id', label: 'Código', sortable: true },
      { key: 'name', label: 'Nome', sortable: true },
      { key: 'path', label: 'Caminho', sortable: true },
      {
        key: 'actions',
        label: 'Ações',
        formatter: (item) => {
          return (
            <div className="d-flex gap-2 flex-wrap">
              <Button variant="warning" onClick={() => loadCategory(item)}>
                <i className="fa fa-pencil"></i>
              </Button>
              <Button
                variant="danger"
                onClick={() => loadCategory(item, 'remove')}>
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
    setCategory(initialCategory)
    setValidated(false)
  }

  const submit = () => {
    setValidated(true)
    const method = mode === 'remove' ? 'delete' : category.id ? 'put' : 'post'
    const id = category.id ? `/${category.id}` : ''
    axios[method](`${baseApiUrl}/categories${id}`, category)
      .then(() => {
        showSuccess()
        reset()
        loadCategories()
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
        <input type="hidden" id="category-id" value={category.id || ''} />
        <FormGroupControl
          type="name"
          value={category.name}
          label="Nome:"
          controlId={'category-name'}
          placeholder="Digite o Nome da Categoria"
          required
          readOnly={mode === 'remove'}
          onChange={(e) => setCategory({ name: e.target.value })}
        />
        <Form.Group controlId="category-parent-id">
          <Form.Label>
            {mode === 'save' ? 'Categoria Pai:' : 'Caminho:'}
          </Form.Label>
          {mode === 'save' ? (
            <DataSelect
              value={category.parentId}
              items={categories.map((category) => {
                return { ...category, text: category.path, value: category.id }
              })}
              onChange={(e) =>
                setCategory({ parentId: e.target.value || null })
              }
            />
          ) : (
            <Form.Control type="text" value={category.path} readOnly />
          )}
        </Form.Group>
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
      <DataTable hover striped responsive items={categories} fields={fields} />
    </div>
  )
}
