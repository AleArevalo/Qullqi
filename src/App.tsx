import Header from './components/Header'
import Purse from './pages/Purse'

import './App.css'

const App = () => {
    return (
        <div className="flex flex-col min-h-screen">
            <Header />
            <Purse />
        </div>
    )
}

export default App
