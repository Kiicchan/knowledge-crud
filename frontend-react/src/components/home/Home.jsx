import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { baseApiUrl } from '../../global'
import PageTitle from '../template/PageTitle'
import Stat from './Stat'
import styled from 'styled-components'

const StatList = styled.div`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 20px;
`

export default function Home() {
  const [stats, setStats] = useState({})

  useEffect(() => {
    axios
      .get(baseApiUrl + '/stats')
      .then((response) => {
        setStats(response.data)
      })
      .catch((error) => console.log(error.message))
  }, [])

  return (
    <div>
      <PageTitle
        icon="fa fa-home"
        main="Dashboard"
        sub="Base de Conhecimento"
      />
      <StatList>
        <Stat
          title="Categorias"
          value={stats.categories}
          icon="fa fa-folder"
          color="#d54d50"
        />
        <Stat
          title="Artigos"
          value={stats.articles}
          icon="fa fa-file"
          color="#3bc480"
        />
        <Stat
          title="Usuários"
          value={stats.users}
          icon="fa fa-user"
          color="#3282cd"
        />
      </StatList>
    </div>
  )
}
