import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import {ThemeProvider} from './contexts/ThemeContext';
import {FormDataProvider} from './contexts/FormDataContext';
import Layout from './components/Layout';
import HomePage from './pages/HomePage';
import DeferredWageTimesheet from './components/DeferredWageTimesheet';
import ContractPage from "./pages/ContractPage.tsx";
import VestingPage from './pages/VestingPage.tsx';
import DeferredCompensationCalculator from './components/DeferredCompensationCalculator.tsx';

function App() {
    return (
        <ThemeProvider>
            <FormDataProvider>
                <Router>
                    <Layout>
                        <Routes>
                            <Route path="/" element={<ContractPage/>}/>
                            <Route path="/summary" element={<HomePage/>}/>
                            <Route path="/vesting" element={<VestingPage/>}/>
                            <Route path="/deferred-wage" element={<DeferredCompensationCalculator/>}/>
                            <Route path="/timesheets" element={<DeferredWageTimesheet/>}/>
                        </Routes>
                    </Layout>
                </Router>
            </FormDataProvider>
        </ThemeProvider>
    );
}

export default App
