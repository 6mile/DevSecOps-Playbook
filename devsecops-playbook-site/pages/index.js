import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'

import { useState, useReducer } from 'react';

import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table'

// TODO : Convert 'securityFrameworks' to an array of strings
const developmentEnvironment = [
    {
        control: "1.1",
        name: "Secure Code Training",
        priority: "2",
        description: "Developers who receive Secure Code Training are less likely to introduce security bugs, be aware of tooling that can support them, and design systems with security in mind.",
        difficulty: "Medium",
        securityFrameworks: "CIS8APRA234, NIST 800-53B, SSDF1.1"
    },
    {
        control: "1.2",
        name: "Source Code Versioning",
        priority: "1",
        description: "Version Control Systems introduce peer review processes, an auditable history, and consistent work patterns between software engineers.",
        difficulty: "Easy",
        securityFrameworks: "APRA234CIS8, ISM GSD, ISO27001, NIST 800-53B, SSDF1.1"
    },
    {
        control: "1.3",
        name: ".gitignore",
        priority: "1",
        description: ".gitignore files help prevent accidental commits of sensitive, debug, or workstation specific data",
        difficulty: "Easy",
        securityFrameworks: "APRA234CIS8, NIST 800-53B, SSDF1.1"
    },
    {
        control: "1.4",
        name: "Pre-Commit Hook Scans",
        priority: "2",
        description: "A Pre-Commit Hook for security scans provides timely feedback to engineers and helps to prevent vulnerable code being introduced to a repository",
        difficulty: "Easy",
        securityFrameworks: "APRA234CIS8, NIST 800-53B, SSDF1.1"
    },
    {
        control: "1.5",
        name: "Commit Signing",
        priority: "2",
        description: "Sign all commits to verify that the author is genuine",
        difficulty: "Easy",
        securityFrameworks: "APRA234CIS8, NIST 800-53B, SSDF1.1"
    },
    {
        control: "1.6",
        name: "IDE plugins",
        priority: "2",
        description: "Most IDE's support the use of third-party plugins, and devs should implement these tools to highlight security issues as they happen in realtime while they are programming.",
        difficulty: "Easy",
        securityFrameworks: "APRA234CIS8, NIST 800-53B, SSDF1.1"
    },
    {
        control: "1.7",
        name: "Local Software Composition Analysis",
        priority: "1",
        description: "Helps you find and fix libraries with known security issues",
        difficulty: "Easy",
        securityFrameworks: "APRA234CIS8, ISM GSD, ISO27001, NIST 800-53B, SSDF1.1"
    },
    {
        control: "1.8",
        name: "Local Static Code Analysis",
        priority: "2",
        description: "Helps you find and fix security vulnerabilities in your source code",
        difficulty: "Easy",
        securityFrameworks: "APRA234CIS8, ISM GSD, ISO27001, NIST 800-53B, SSDF1.1"
    },
    {
        control: "1.9",
        name: "Local Sensitive Data Analysis",
        priority: "1",
        description: "Audits your repository for secrets, credentials, API keys and similar in dev environment. Secrets stored in source code are visible to other people",
        difficulty: "Easy",
        securityFrameworks: "APRA234CIS8, ISM GSD, ISO27001, NIST 800-53B, SSDF1.1"
    },
    {
        control: "1.10",
        name: "Application Baseline",
        priority: "3",
        description: "Create a \"recipe\" for building the application from ground up that takes into consideration its risk and compliance requirements, data sensitivity, stakeholders and relationships with other systems, as well as its technical components.",
        difficulty: "Medium",
        securityFrameworks: "APRA234, CIS8, ISM GSD, NIST 800-53B, SSDF1.1"
    },
];

const columnHelper = createColumnHelper()

const columns = [
  columnHelper.accessor('control', {
    cell: info => info.getValue(),
    header: () => <span>Control</span>,
    footer: info => info.column.id,
  }),
  columnHelper.accessor(row => row.name, {
    id: 'name',
    cell: info => <i>{info.getValue()}</i>,
    header: () => <span>Name</span>,
    footer: info => info.column.id,
  }),
  columnHelper.accessor('priority', {
    header: () => 'Priority',
    cell: info => info.renderValue(),
    footer: info => info.column.id,
  }),
  columnHelper.accessor('description', {
    header: () => <span>Description</span>,
    footer: info => info.column.id,
  }),
  columnHelper.accessor('difficulty', {
    header: 'Difficulty',
    footer: info => info.column.id,
    cell: info => {
      const val = info.renderValue().toLowerCase();
      let color = 'black';

      if (val.includes('difficult')) color = 'red';
      if (val.includes('medium')) color = 'orange';
      if (val.includes('easy')) color = 'green';

      return (
        <span style={{color: `${color}`}}>{info.renderValue()}</span>
      );
    }
  }),
  columnHelper.accessor('securityFrameworks', {
    header: 'Security Frameworks',
    footer: info => info.column.id,
  }),
];



export default function Home() {
  const [data, setData] = useState(() => [...developmentEnvironment])

  // const rerender = useReducer(() => ({}), {})[1]

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className={styles.container}>
      <Head>
        <title>DevSecOps Playbook</title>
        <meta name="description" content="An interactive version of the same playbook you know and love!" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
          <table>
            <thead>
              {table.getHeaderGroups().map(headerGroup => (
                <tr key={headerGroup.id}>
                  {headerGroup.headers.map(header => (
                    <th key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody>
              {table.getRowModel().rows.map(row => (
                <tr key={row.id}>
                  {row.getVisibleCells().map(cell => (
                    <td key={cell.id}>
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
            <tfoot>
              {table.getFooterGroups().map(footerGroup => (
                <tr key={footerGroup.id}>
                  {footerGroup.headers.map(header => (
                    <th key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.footer,
                            header.getContext()
                          )}
                    </th>
                  ))}
                </tr>
              ))}
            </tfoot>
          </table>
      </main>

      <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{' '}
          <span className={styles.logo}>
            <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
          </span>
        </a>
      </footer>
    </div>
  )
}
