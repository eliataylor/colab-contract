import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import {ThemeProvider} from './contexts/ThemeContext';
import {FormDataProvider} from './contexts/FormDataContext';
import Layout from './components/Layout';
import HomePage from './pages/HomePage';
import DeferredWageTimesheet from './components/DeferredWageTimesheet';
import ContractPage from "./pages/ContractPage.tsx";

function App() {
    return (
        <ThemeProvider>
            <FormDataProvider>
                <Router>
                    <Layout>
                        <Routes>
                            <Route path="/" element={<HomePage/>}/>
                            <Route path="/contract" element={<ContractPage/>}/>
                            <Route path="/timesheets" element={<DeferredWageTimesheet/>}/>
                        </Routes>
                    </Layout>
                </Router>
            </FormDataProvider>
        </ThemeProvider>
    );
}

export default App
