import toast from 'react-hot-toast'

export const baseApiUrl = 'http://localhost:3000'
export const userKey = '__knowledge_user'

export function showError(e) {
  if (e && e.response && typeof e.response.data === 'string') {
    toast.error(e.response.data)
  } else if (typeof e === 'string') {
    toast.error(e)
  } else {
    toast.error('Ooops, ocorreu um erro inesperado!')
  }
}

export function showSuccess(e) {
  if (e && e.response && typeof e.response.data === 'string') {
    toast.success(e.response.data)
  } else if (typeof e === 'string') {
    toast.success(e)
  } else {
    toast.success('Operação realizada com sucesso!')
  }
}
