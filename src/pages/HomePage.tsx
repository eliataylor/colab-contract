import React from 'react';
import {
  Button,
  Chip
} from '@mui/material';
import {
  Security,
  TrendingUp,
  Calculate,
  Business,
  People
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import {
  PageContainer,
  HeroSection,
  PageTitle,
  MainPageTitle,
  Description,
  ChipContainer,
  TwoColumnGrid,
  StyledCard,
  CardHeader,
  CardBody,
  CardFooter,
  CardTitle,
  PrimaryButton,
  SecondaryButton,
  FlexCenter,
  FadeIn
} from '../components/styled/StyledComponents';

const HomePage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <PageContainer>
      <FadeIn>
        {/* Hero Section */}
        <HeroSection elevation={3}>
          <MainPageTitle variant="h2" component="h1">
            Founding Contributor Engagement Agreement
          </MainPageTitle>
          
          <Description variant="h5" sx={{ maxWidth: '800px', mx: 'auto', opacity: 0.9 }}>
            A transparent framework for building startups with confidence. Define ownership, compensation, and shared commitment in your founding team.
          </Description>
          
          <ChipContainer>
            <Chip 
              icon={<Security />} 
              label="Define Protections" 
              variant="outlined" 
              sx={{ color: 'white', borderColor: 'white' }}
            />
            <Chip 
              icon={<TrendingUp />} 
              label="Structure Compensations" 
              variant="outlined" 
              sx={{ color: 'white', borderColor: 'white' }}
            />
          </ChipContainer>
        </HeroSection>

        {/* Main Content Cards */}
        <TwoColumnGrid>
          <StyledCard>
            <CardBody>
              <CardTitle variant="h4" color="primary">
                <Security /> Protections
              </CardTitle>
              <Description>
                This agreement protects our shared vision and ensures consistent, high-impact contributions. 
                It safeguards intellectual property while respecting individual freedom to pursue other opportunities.
              </Description>
              <Description variant="body2">
                • IP ownership and protection<br/>
                • Mutual commitment and accountability<br/>
                • Non-solicitation clauses<br/>
                • Code reuse restrictions
              </Description>
            </CardBody>
            <CardFooter>
              <Button onClick={() => navigate('/contract')}>Learn More</Button>
            </CardFooter>
          </StyledCard>
          
          <StyledCard>
            <CardBody>
              <CardTitle variant="h4" color="primary">
                <TrendingUp /> Compensations
              </CardTitle>
              <Description>
                Transparent and fair compensation through accelerating equity vesting and deferred wage systems. 
                Every contribution is valued and accounted for.
              </Description>
              <Description variant="body2">
                • Accelerating equity vesting schedule<br/>
                • Deferred wage accrual system<br/>
                • Pro-rata payment distribution<br/>
                • 6-month cliff period
              </Description>
            </CardBody>
            <CardFooter>
              <Button onClick={() => navigate('/vesting')}>Calculate Equity</Button>
              <Button onClick={() => navigate('/compensation')}>Calculate Wages</Button>
            </CardFooter>
          </StyledCard>
        </TwoColumnGrid>

        {/* Quick Actions */}
        <FadeIn>
          <PageTitle variant="h4">
            Get Started
          </PageTitle>
          <FlexCenter sx={{ flexDirection: { xs: 'column', sm: 'row' }, gap: 2 }}>
            <PrimaryButton
              variant="contained"
              startIcon={<Calculate />}
              onClick={() => navigate('/vesting')}
            >
              Vesting Calculator
            </PrimaryButton>
            <PrimaryButton
              variant="contained"
              startIcon={<TrendingUp />}
              onClick={() => navigate('/compensation')}
            >
              Compensation Calculator
            </PrimaryButton>
            <SecondaryButton
              variant="outlined"
              startIcon={<Business />}
              onClick={() => navigate('/founder')}
            >
              Founder Form
            </SecondaryButton>
            <SecondaryButton
              variant="outlined"
              startIcon={<People />}
              onClick={() => navigate('/contributor')}
            >
              Contributor Form
            </SecondaryButton>
          </FlexCenter>
        </FadeIn>
      </FadeIn>
    </PageContainer>
  );
};

export default HomePage;
