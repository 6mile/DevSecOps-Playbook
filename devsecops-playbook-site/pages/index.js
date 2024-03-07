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

const developmentEnvironment = [
  {
    control: '1.1',
    name: 'Secure Code Training',
    priority: '2',
    description: 'Developers who receive Secure Code Training are less likely to introduce security bugs, be aware of tooling that can support them, and design systems with security in mind.',
    difficulty: 'Medium',
    securityFrameworks: ['CIS8, APRA234', 'NIST 800-53B', 'SSDF1.1']
  }
]

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
]

export default function Home() {
  const [data, setData] = useState(() => [...developmentEnvironment])
  const rerender = useReducer(() => ({}), {})[1]

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  })

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
