import { Header } from '../../components/header';
import WelcomeMessage from '../../components/welcomeMessage';
import { AppLayout } from '../../components/layout/AppLayout';
import { UsersRegistered } from '@/components/dashboardTables/usersRegistered';
import { TicketsPurchased } from '@/components/dashboardTables/ticketsPurchased';
import { TotalRevenue } from '@/components/dashboardTables/totalRevenue';
import { ActiveUsers } from '@/components/dashboardTables/activeUsers';
import { useState } from 'react';

function Dashboard() {
  const [displayTables, setDisplayTables] = useState<string>('usersRegistered');

  return (
    <AppLayout logo=''>
      <div className='app-container pl-14 pr-10'>
        <Header />
        <div>
          <WelcomeMessage
            username='Ayo'
            description="Let's review today's insights"
          />
        </div>
        {displayTables === 'usersRegistered' ? (
          <UsersRegistered />
        ) : displayTables === 'ticketsPurchased' ? (
          <TicketsPurchased />
        ) : displayTables === 'totalRevenue' ? (
          <TotalRevenue />
        ) : displayTables === 'activeUsers' ? (
          <ActiveUsers />
        ) : (
          <></>
        )}
      </div>
    </AppLayout>
  );
}

export default Dashboard;
