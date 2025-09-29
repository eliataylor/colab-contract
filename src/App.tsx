import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './contexts/ThemeContext';
import { FormDataProvider } from './contexts/FormDataContext';
import Layout from './components/Layout';
import HomePage from './pages/HomePage';
import VestingPage from './pages/VestingPage';
import CompensationPage from './pages/CompensationPage';
import FounderPage from './pages/FounderPage';
import ContributorPage from './pages/ContributorPage';
import ContractPage from './pages/ContractPage';
import DeferredWageTimesheet from './components/DeferredWageTimesheet';

function App() {
  return (
    <ThemeProvider>
      <FormDataProvider>
        <Router>
          <Layout>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/vesting" element={<VestingPage />} />
              <Route path="/compensation" element={<CompensationPage />} />
              <Route path="/founder" element={<FounderPage />} />
              <Route path="/contributor" element={<ContributorPage />} />
              <Route path="/contract" element={<ContractPage />} />
              <Route path="/timesheet" element={<DeferredWageTimesheet />} />
            </Routes>
          </Layout>
        </Router>
      </FormDataProvider>
    </ThemeProvider>
  );
}

export default App
