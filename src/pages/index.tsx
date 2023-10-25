import UseAppContext from '@/components/context/useContext'
import Home from './home'

export default function Index(){
  return <UseAppContext>
    <Home/>
  </UseAppContext>
}