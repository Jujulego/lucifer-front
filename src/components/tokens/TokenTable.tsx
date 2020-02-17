import moment from 'moment';
import React from 'react';
import { useSelector } from 'react-redux';

import {
  Paper,
  TableHead, TableCell, TableContainer
} from '@material-ui/core';

import Token from 'data/token';
import { AppState } from 'store';
import { ip2int } from 'utils/ip';

import {
  Table, TableToolbar, TableBody, TableRow, TableSortCell, TablePagination,
  TableProps
} from 'components/basics';

// Types
export type TokenTableProps = Omit<TableProps<Token>, 'toolbar' | 'blacklist'>;

// Component
const TokenTable = (props: TokenTableProps) => {
  // Redux
  const currentToken = useSelector((state: AppState) => state.auth.tokenId!);

  // Render
  const ip = (token: Token) => ip2int(token.from);

  return (
    <Paper>
      <TableContainer>
        <Table {...props}
          blacklist={[currentToken]}
          toolbar={<TableToolbar title="Tokens" />}
          pagination={<TablePagination component="div" rowsPerPageOptions={[5, 10, 20]} />}
        >
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