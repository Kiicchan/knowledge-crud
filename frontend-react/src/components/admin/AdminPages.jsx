import React from 'react'
import PageTitle from '../template/PageTitle'
import ArticleAdmin from './ArticleAdmin'
import CategoryAdmin from './CategoryAdmin'
import UserAdmin from './UserAdmin'
import Nav from 'react-bootstrap/Nav'
import Tab from 'react-bootstrap/Tab'
import Card from 'react-bootstrap/Card'

export default function AdminPages() {
  return (
    <div>
      <PageTitle
        icon="fa fa-cogs"
        main="Administração do Sistema"
        sub="Cadastros & Cia"
      />
      <div>
        <Card>
          <Tab.Container defaultActiveKey={'articles'}>
            <Card.Header>
              <Nav variant="tabs">
                <Nav.Item>
                  <Nav.Link eventKey="articles" style={{ cursor: 'pointer' }}>
                    Artigos
                  </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link eventKey="categories" style={{ cursor: 'pointer' }}>
                    Categorias
                  </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link eventKey="users" style={{ cursor: 'pointer' }}>
                    Usuários
                  </Nav.Link>
                </Nav.Item>
              </Nav>
            </Card.Header>
            <Card.Body>
              <Tab.Content>
                <Tab.Pane eventKey={'articles'}>
                  <ArticleAdmin />
                </Tab.Pane>
                <Tab.Pane eventKey={'categories'}>
                  <CategoryAdmin />
                </Tab.Pane>
                <Tab.Pane eventKey={'users'}>
                  <UserAdmin />
                </Tab.Pane>
              </Tab.Content>
            </Card.Body>
          </Tab.Container>
        </Card>
      </div>
    </div>
  )
}
