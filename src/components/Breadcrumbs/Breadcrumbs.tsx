// Breadcrumbs.js
import React from 'react'
import Link from 'next/link'

const Breadcrumbs = ({ paths }) => {
	return (
		<nav>
			{paths.map((path, index) => (
				<span key={index}>
					{index > 0 && ' > '}
					{index === paths.length - 1 ? (
						path.name
					) : (
						<Link href={path.href}>{path.name}</Link>
					)}
				</span>
			))}
		</nav>
	)
}

export default Breadcrumbs
