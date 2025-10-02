import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import {ThemeProvider} from './contexts/ThemeContext';
import {FormDataProvider} from './contexts/FormDataContext';
import Layout from './components/Layout';
import ErrorBoundary from './components/ErrorBoundary';
import Home from './pages/Home';
import VestingPage from './pages/VestingPage';
import DeferredWagePage from './pages/DeferredWagePage';
import Timesheets from './pages/Timesheets';

function App() {
    return (
        <ErrorBoundary>
            <ThemeProvider>
                <FormDataProvider>
                    <Router>
                        <Layout>
                            <Routes>
                                <Route path="/" element={<Home/>}/>
                                <Route path="/vesting" element={<VestingPage/>}/>
                                <Route path="/deferred-wage" element={<DeferredWagePage/>}/>
                                <Route path="/timesheets" element={<Timesheets/>}/>                        
                            </Routes>
                        </Layout>
                    </Router>
                </FormDataProvider>
            </ThemeProvider>
        </ErrorBoundary>
    );
}

export default App
