// Breadcrumbs.js
import React from 'react';
import Link from 'next/link';
import styles from './Breadcrumbs.module.css';

const Breadcrumbs = ({ paths }) => { 
  return (
    <div className={styles.breadcrumbsContainers}>
    <div className={styles.breadcrumbsContainer}>
      <nav className={styles.breadcrumbsNav}>
        {paths.map((path, index) => (
          <span className={styles.breadcrumb} key={index}>
            {index > 0 && <span className={styles.separator}>/</span>}
            {index === paths.length - 1 ? (
              <span className={styles.active}>{path.name}</span>
            ) : (
              <Link className={styles.link} href={path.href}>{path.name}</Link>
            )}
          </span>
        ))}
      </nav>
    </div>

    </div>
  );
};

export default Breadcrumbs; 