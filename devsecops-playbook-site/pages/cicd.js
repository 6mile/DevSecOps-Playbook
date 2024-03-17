import { useState, useReducer } from 'react';

import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table'

const CICD = () => {
    const cicd = [
        {
            control: "3.1",
            name: "CI/CD Pipeline",
            priority: "1",
            description: "Implement a CI/CD pipeline",
            difficulty: "Medium",
            securityFrameworks: "APRA234, CIS8, ISM GSD, ISO27001, SSDF1.1"
        },
        {
            control: "3.2",
            name: "Application Environments",
            priority: "2",
            description: "Create separate environments for dev, staging and prod, and treat each as independent with its own data, testing and requirements",
            difficulty: "Medium",
            securityFrameworks: "CIS8, ISM GSD, ISO27001, SSDF1.1"
        },
        {
            control: "3.3",
            name: "Application Data Separation",
            priority: "3",
            description: "Make sure that dev and test environments are **not** using the same data as production. If the use of live data is required then make sure that data is anonymized.",
            difficulty: "Difficult",
            securityFrameworks: "CIS8, ISM GSD, ISO27001, SSDF1.1"
        },
        {
            control: "3.4",
            name: "CI/CD Administration",
            priority: "3",
            description: "Create and enforce user or team roles so that only the appropriate people can change or disable tests and deployment requirements",
            difficulty: "Medium",
            securityFrameworks: "CIS8, ISM GSD, ISO27001, SSDF1.1"
        },
        {
            control: "3.5",
            name: "Credential Store",
            priority: "1",
            description: "Create a secure encrypted place to store senstive credentials like passwords, API keys, etc.",
            difficulty: "Medium",
            securityFrameworks: "APRA234, CIS8, ISM GSD, NIST 800-53.2b, SSDF1.1"
        },
        {
            control: "3.6",
            name: "Centralized Software Composition Analysis",
            priority: "1",
            description: "Scan source code for vulnerable libraries and open source software from within a CD stage",
            difficulty: "Easy",
            securityFrameworks: "APRA234, CIS8, ISM GSD, ISO27001, NIST 800-53.2a, SSDF1.1"
        },
        {
            control: "3.7",
            name: "Centralized Static Code Analysis",
            priority: "2",
            description: "Scan source code for vulnerabilities in the source code itself from within a CD stage",
            difficulty: "Easy",
            securityFrameworks: "APRA234, CIS8, ISM GSD, ISO27001, NIST 800-53.2b, SSDF1.1"
        },
        {
            control: "3.8",
            name: "Centralized Sensitive Data Analysis",
            priority: "2",
            description: "Scan source code for secrets, credentials, API keys and similar from within a CD stage",
            difficulty: "Easy",
            securityFrameworks: "APRA234, CIS8, ISM GSD, ISO27001, NIST 800-53B, SSDF1.1"
        },
        {
            control: "3.9",
            name: "DAST",
            priority: "3",
            description: "Scan running application for vulnerabilities",
            difficulty: "Medium",
            securityFrameworks: "CIS8, ISM GSD, ISO27001, NIST 800-53B, NIST 800-53B, SSDF1.1"
        },
        {
            control: "3.10",
            name: "Transient Test Compute",
            priority: "2",
            description: "Verify that the compute you use in CI/CD pipelines are up to date and using most recent applications and operating systems",
            difficulty: "Medium",
            securityFrameworks: "CIS8, ISM GSD, ISO27001, SSDF1.1"
        },
        {
            control: "3.11",
            name: "Harden Transient Compute",
            priority: "3",
            description: "Harden the transient compute you are using in your pipelines. Follow CIS guidelines for container hardening.",
            difficulty: "Difficult",
            securityFrameworks: "CIS8, ISM GSM, ISM GOSH, SSDF1.1"
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
    
    const [data, setData] = useState(() => [...cicd]);

    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
      })

    return (
        <>
            <h2>CI/CD Pipelines and Automation (CI/CD)</h2>

            <p>
                Modern web applications are built using modern continuous integration and deployment processes. 
                This means that you run tests specific to whatever environment you are pushing to whether that's DEV, 
                STAGING or PROD.
            </p>

            <div>
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
            </div>
        </>
    );
};

export default CICD;