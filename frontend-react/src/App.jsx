import 'font-awesome/css/font-awesome.css'
import { Toaster } from 'react-hot-toast'
import Header from './components/template/Header'
import Footer from './components/template/Footer'
import Menu from './components/template/Menu'
import Content from './components/template/Content'
import Loading from './components/template/Loading'
import styled from 'styled-components'
import { useSelector } from 'react-redux'
import useValidateToken from './hooks/useValidateToken'

const StyledGrid = styled.div`
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;

  height: 100vh;
  display: grid;
  grid-template-rows: 60px 1fr 40px;
  grid-template-columns: 300px 1fr;
  grid-template-areas:
    'header header'
    '${({ renderMenu }) => (renderMenu ? 'menu' : 'content')} content'
    '${({ renderMenu }) => (renderMenu ? 'menu' : 'footer')} footer';
`

function App() {
  const isMenuVisible = useSelector((state) => state.menu.isMenuVisible)
  const isUserSet = useSelector((state) => state.user.info)
  const [validatingToken] = useValidateToken()

  return (
    <>
      <StyledGrid className="App" renderMenu={isMenuVisible && isUserSet}>
        <Header title="Cod3r - Base de Conhecimento" />
        {isUserSet && <Menu />}
        {validatingToken ? <Loading /> : <Content />}
        <Footer />
      </StyledGrid>
      <Toaster
        toastOptions={{
          position: 'top-right',
          duration: 3000,
        }}
      />
    </>
  )
}

export default App
