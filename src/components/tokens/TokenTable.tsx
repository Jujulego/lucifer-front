import React from 'react';
import moment from 'moment';

import {
  Paper,
  TableHead, TableCell, TableContainer
} from '@material-ui/core';

import Token from 'data/token';

import {
  Table, TableToolbar, TableBody, TableRow, TableSortCell,
  TableProps
} from 'components/basics/Table';
import { ip2int } from 'utils/ip';

// Types
export type TokenTableProps = Omit<TableProps<Token>, 'toolbar'>;

// Component
const TokenTable = (props: TokenTableProps) => {
  // Render
  const ip = (token: Token) => ip2int(token.from);

  const toolbar = (
    <TableToolbar title="Tokens" />
  );

  return (
    <Paper>
      <TableContainer>
        <Table {...props} toolbar={toolbar}>
          <TableHead>
            <TableRow>
              <TableSortCell field={ip}>Adresse</TableSortCell>
              <TableSortCell<Token> field="createdAt">Date</TableSortCell>
            </TableRow>
          </TableHead>
          <TableBody>
            { (token: Token) => (
              <TableRow key={token._id} doc={token}>
                <TableCell>{ token.from }</TableCell>
                <TableCell>{ moment.utc(token.createdAt).local().format('LLLL') }</TableCell>
              </TableRow>
            ) }
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  )
};

export default TokenTable;