// admin/layout.tsx
import React from 'react';
import Sidebar from './components/Sidebar/Sidebar';
import styles from "./index.module.css"; 
import Header from './components/Header/Header';
    
export default function AdminLayout({
  children 
}: {
  children: React.ReactNode;
}) { 
  return (  
    <div className={styles.page} > 
    
      <Sidebar /> 
        <main className={styles.pageModule}> 
          <Header />
          {children} 
        </main> 
      

    </div>
  );
}
