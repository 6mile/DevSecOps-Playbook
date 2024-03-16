import { useState, useReducer } from 'react';

import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table'

const OrgTech = () => {
    const orgTech = [
        {
            control: "5.1",
            name: "Penetration Testing",
            priority: "2",
            description: "Have your application pentested regularly",
            difficulty: "Medium",
            securityFrameworks: "CIS8, ISM GSD, NIST 800-53B, SSDF1.1"
        },
        {
            control: "5.2",
            name: "Threat Modeling",
            priority: "3",
            description: "Build a collaborative way for developers and security staff to understand the threat landscape for an individual application",
            difficulty: "Difficult",
            securityFrameworks: "CIS8, ISM GSD, NIST 800-53B, SSDF1.1"
        },
        {
            control: "5.3",
            name: "SIEM",
            priority: "3",
            description: "Implement a SIEM and send all application, system and cloud logs to it",
            difficulty: "Difficult",
            securityFrameworks: "CIS8, NIST 800-53B, SSDF1.1"
        },
        {
            control: "5.4",
            name: "Attack Surface Management",
            priority: "1",
            description: "Identify public facing resources via automation",
            difficulty: "Easy",
            securityFrameworks: "CIS8, NIST 800-53B, SSDF1.1"
        },
        {
            control: "5.5",
            name: "Sovereignty",
            priority: "1",
            description: "Require that all code is written in, stored in, or otherwise served from a location and/or sovereignty that aligns with your org's requirements",
            difficulty: "Medium",
            securityFrameworks: "ISM GCSR, ISO27001"
        },
        {
            control: "5.6",
            name: "Vulnerability Disclosure",
            priority: "1",
            description: "Create and publish a set of procedures to let people contact you when they find security issues in your app",
            difficulty: "Easy",
            securityFrameworks: "CIS8, ISM GSD, SSDF1.1"
        },
        {
            control: "5.7",
            name: "Bug Bounty",
            priority: "3",
            description: "Setup a bug bounty program to incentivize security researchers to tell you about vulnerabilities they find",
            difficulty: "Medium",
            securityFrameworks: "CIS8, ISM GSD, NIST 800-53B, SSDF1.1"
        },
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
      ];
    
    const [data, setData] = useState(() => [...orgTech]);

    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
      })

    return (
        <>
            <h2>Organizational Techniques</h2>

            <p>
                People don't deploy applications, organizations do.  Some steps in the DevSecOps playbook 
                need to be owned by the Organization itself.
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

export default OrgTech;