import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import {ThemeProvider} from './contexts/ThemeContext';
import {FormDataProvider} from './contexts/FormDataContext';
import Layout from './components/Layout';
import DeferredWageTimesheet from './components/DeferredWageTimesheet';
import ContractDocument from "./pages/ContractDocument.tsx";
import VestingPage from './pages/VestingPage.tsx';
import DeferredWagePage from './pages/DeferredWagePage.tsx';

function App() {
    return (
        <ThemeProvider>
            <FormDataProvider>
                <Router>
                    <Layout>
                        <Routes>
                            <Route path="/" element={<ContractDocument/>}/>
                            <Route path="/vesting" element={<VestingPage/>}/>
                            <Route path="/deferred-wage" element={<DeferredWagePage/>}/>
                            <Route path="/timesheets" element={<DeferredWageTimesheet/>}/>
                        </Routes>
                    </Layout>
                </Router>
            </FormDataProvider>
        </ThemeProvider>
    );
}

export default App
